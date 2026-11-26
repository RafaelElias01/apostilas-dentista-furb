#!/usr/bin/env node
// Monitor diário dos certames listados em site/dados/concurso.json.
// Baixa cada URL oficial, extrai datas e links de documentos e compara com o
// estado de referência (curso/monitor-concursos-estado.json).
//
// Uso:
//   node scripts/monitorar-concursos.mjs [--entrada <json>] [--estado <json>]
//        [--relatorio <arquivo.md>] [--chave <arquivo>] [--atualizar] [--timeout <segundos>]
//
// --chave grava um texto estável que identifica o aviso (para o workflow deduplicar):
// código de saída, mudanças ordenadas e, quando não há mudança (código 4), as URLs
// inacessíveis e as de referência incompleta (só título+url, sem o motivo e sem horário).
// Ver montarChave().
//
// Saída: 0 = sem mudança, nada inacessível e referência completa;
//        3 = houve mudança (com ou sem inacessíveis);
//        4 = sem mudança, mas há URL inacessível ou referência incompleta (URL que nunca
//            tinha sido lida com sucesso: rode --atualizar); 2 = erro de uso/arquivo.
// URL de certame removido da entrada (título sumiu) é só informativa, não é mudança.
// Certame com encerraEm já passado não é baixado (só uma linha informativa no relatório).
// Sem --atualizar o script nunca grava no repositório (só o relatório, se pedido).

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ENTRADA_PADRAO = path.join(RAIZ, 'site', 'dados', 'concurso.json');
const ESTADO_PADRAO = path.join(RAIZ, 'curso', 'monitor-concursos-estado.json');
const USER_AGENT = 'monitor-concursos/1.0';
const TAMANHO_MAXIMO = 60 * 1024 * 1024; // 60 MB por URL
const PARALELO = 4;
const execFileAsync = promisify(execFile);

// ---------------------------------------------------------------------------
// Funções puras (exportadas para teste)
// ---------------------------------------------------------------------------

const MESES = {
  janeiro: 1, fevereiro: 2, marco: 3, abril: 4, maio: 5, junho: 6,
  julho: 7, agosto: 8, setembro: 9, outubro: 10, novembro: 11, dezembro: 12,
};

const ENTIDADES = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ordm: 'º', ordf: 'ª', deg: '°',
  aacute: 'á', agrave: 'à', acirc: 'â', atilde: 'ã', eacute: 'é', ecirc: 'ê', iacute: 'í',
  oacute: 'ó', ocirc: 'ô', otilde: 'õ', uacute: 'ú', uuml: 'ü', ccedil: 'ç',
  Aacute: 'Á', Agrave: 'À', Acirc: 'Â', Atilde: 'Ã', Eacute: 'É', Ecirc: 'Ê', Iacute: 'Í',
  Oacute: 'Ó', Ocirc: 'Ô', Otilde: 'Õ', Uacute: 'Ú', Uuml: 'Ü', Ccedil: 'Ç',
  ndash: '–', mdash: '—', hellip: '…', laquo: '«', raquo: '»', ldquo: '“', rdquo: '”',
  lsquo: '‘', rsquo: '’', middot: '·', sect: '§',
};

/** Decodifica entidades HTML básicas (nomeadas comuns e numéricas). */
export function decodificarEntidades(s) {
  return String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === '#') {
      const cod = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      try { return String.fromCodePoint(cod); } catch { return m; }
    }
    return Object.prototype.hasOwnProperty.call(ENTIDADES, e) ? ENTIDADES[e] : m;
  });
}

/** Normaliza texto: NFC, espaços colapsados, sem espaço nas pontas. */
export function normalizarTexto(texto) {
  return String(texto ?? '')
    .normalize('NFC')
    // Caracteres invisíveis de largura zero somem (não viram espaço).
    .replace(/[\u200B\u200C\u200D\u2060\uFEFF]/g, '')
    .replace(/[\u00A0\u2000-\u200A\u202F\u205F\u3000]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Converte HTML em texto visível (sem script/style/comentários/tags). */
export function htmlParaTexto(html) {
  const semBlocos = String(html)
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|template|svg)\b[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<(br|\/p|\/div|\/li|\/tr|\/h[1-6])\b[^>]*>/gi, '\n')
    // Tags inteiras, respeitando atributos entre aspas que contenham ">".
    .replace(/<[a-zA-Z/!?][^>"']*(?:(?:"[^"]*"|'[^']*')[^>"']*)*>/g, ' ');
  return normalizarTexto(decodificarEntidades(semBlocos));
}

function dataValida(a, m, d) {
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const dt = new Date(Date.UTC(a, m - 1, d));
  if (dt.getUTCFullYear() !== a || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d) return null;
  return `${String(a).padStart(4, '0')}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/**
 * Extrai datas (dd/mm/aaaa, dd/mm/aa, "dd de <mês> de aaaa") como aaaa-mm-dd, e dd/mm sem
 * ano como "--mm-dd"; ordenadas e únicas.
 */
export function extrairDatas(texto) {
  const datas = new Set();
  // Minúsculas e sem acento, para casar "março"/"marco".
  const t = String(texto ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const reNum = /(?<![\d/])(\d{1,2})\/(\d{1,2})\/(\d{4}|\d{2})(?![\d/])/g;
  for (const [, d, m, a] of t.matchAll(reNum)) {
    // Ano de 2 dígitos: 00–69 -> 20xx; 70–99 -> 19xx.
    const ano = a.length === 2 ? (Number(a) < 70 ? 2000 : 1900) + Number(a) : Number(a);
    const iso = dataValida(ano, Number(m), Number(d));
    if (iso) datas.add(iso);
  }

  // dd.mm.aaaa e dd-mm-aaaa: só com ano de 4 dígitos (evita telefone/CPF/números).
  const reSep = /(?<![\d.\-/])(\d{1,2})([.-])(\d{1,2})\2(\d{4})(?![\d.\-/]*\d)/g;
  for (const [, d, , m, a] of t.matchAll(reSep)) {
    const iso = dataValida(Number(a), Number(m), Number(d));
    if (iso) datas.add(iso);
  }

  const nomes = Object.keys(MESES).join('|');
  const reExt = new RegExp(`(?<!\\d)(\\d{1,2})\\s*\\.?\\s*(?:º|°|o)?\\s+de\\s+(${nomes})\\s+de\\s+(\\d{4})(?!\\d)`, 'g');
  for (const [, d, mes, a] of t.matchAll(reExt)) {
    const iso = dataValida(Number(a), MESES[mes], Number(d));
    if (iso) datas.add(iso);
  }

  // dd/mm SEM ano (cronogramas: "10/12", "03/12; 16/12"). Registradas como "--mm-dd"
  // (não colide com aaaa-mm-dd). Nada de dígito, barra ou ponto colado antes; nem dígito,
  // barra ou ",d"/".d" depois: assim dd/mm/aaaa, 123/2026, 1/2/3, 1,5/10 e 10/12,5 ficam de fora.
  // Pelo menos 3 dígitos no total ("1/2" é fração, não data); 29/02 aceito (ano bissexto de referência).
  const reSemAno = /(?<![\d/.,])(\d{1,2})\/(\d{1,2})(?![\d/]|[.,]\d)/g;
  for (const [, d, m] of t.matchAll(reSemAno)) {
    if (d.length + m.length < 3) continue;
    const iso = dataValida(2000, Number(m), Number(d));
    if (iso) datas.add(`--${iso.slice(5)}`);
  }
  return [...datas].sort();
}

/** true se a data extraída é dd/mm sem ano (formato "--mm-dd"). */
const ehSemAno = (x) => String(x).startsWith('--');

const PALAVRAS_DOCUMENTO = ['anexo', 'download', 'edital', 'retific', 'errata', 'cronograma'];

/** Extrai de um HTML os links (absolutos) que parecem documentos; ordenados e únicos. */
export function extrairLinksDocumento(html, base) {
  const links = new Set();
  const re = /<a\b[^>]*?\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  for (const m of String(html).matchAll(re)) {
    const bruto = decodificarEntidades((m[1] ?? m[2] ?? m[3] ?? '').trim());
    if (!bruto || /^(javascript|mailto|tel|data):/i.test(bruto) || bruto.startsWith('#')) continue;
    let url;
    try { url = new URL(bruto, base); } catch { continue; }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') continue;
    url.hash = '';
    const abs = url.href;
    let alvo;
    try { alvo = decodeURIComponent(url.pathname + url.search).toLowerCase(); } catch { alvo = (url.pathname + url.search).toLowerCase(); }
    if (url.pathname.toLowerCase().endsWith('.pdf') || PALAVRAS_DOCUMENTO.some((p) => alvo.includes(p))) {
      links.add(abs);
    }
  }
  return [...links].sort();
}

// Marcadores fortes: contam se estiverem no <title>, em página curta ou com HTTP 403/429/503.
const SINAIS_BLOQUEIO = [
  'verify you are human', 'verifique se voce e humano', 'access denied', 'acesso negado',
  'just a moment', 'checking your browser', 'attention required', 'are you a robot',
  'request blocked', 'ddos protection',
];
// Marcadores fracos (aparecem em formulários comuns com reCAPTCHA, até em página curta):
// só contam com HTTP 403/429/503 ou se estiverem no <title>.
const SINAIS_BLOQUEIO_FRACOS = ['captcha', 'nao sou um robo'];
const LIMITE_TEXTO_CURTO = 1500;

/**
 * Detecta página de bloqueio/anti-robô. Recebe o texto visível e, opcionalmente,
 * o HTML bruto (para marcadores de desafio do Cloudflare) e o status HTTP. Retorna o motivo ou null.
 */
export function ehBloqueio(texto, htmlBruto = '', statusHttp = null) {
  const simplificar = (s) => normalizarTexto(String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase());
  const html = String(htmlBruto ?? '');
  // Desafio do Cloudflare no HTML: sempre bloqueio.
  if (/cf-chl|challenge-platform|cf_chl_opt/i.test(html)) return 'desafio anti-robô (Cloudflare)';
  const t = simplificar(texto);
  // Marcadores fortes: contam no <title>, em página curta ou com HTTP 403/429/503
  // (evita "Acesso negado aos candidatos..." no corpo de página longa).
  // Marcadores fracos: só no <title> ou com HTTP 403/429/503 (página 200 curta com
  // reCAPTCHA de formulário de contato não é bloqueio).
  const statusSuspeito = [403, 429, 503].includes(Number(statusHttp));
  const suspeita = t.length < LIMITE_TEXTO_CURTO || statusSuspeito;
  const mTitulo = /<title\b[^>]*>([\s\S]*?)<\/title\s*>/i.exec(html);
  const titulo = mTitulo ? simplificar(decodificarEntidades(mTitulo[1])) : '';
  const achado = SINAIS_BLOQUEIO.find((s) => (suspeita && t.includes(s)) || titulo.includes(s));
  if (achado) return `página de bloqueio/verificação anti-robô ("${achado}")`;
  const fraco = SINAIS_BLOQUEIO_FRACOS.find((s) => (statusSuspeito && t.includes(s)) || titulo.includes(s));
  if (fraco) return `página de bloqueio/verificação anti-robô ("${fraco}")`;
  return null;
}

function diferenca(a = [], b = []) {
  const sb = new Set(b);
  return a.filter((x) => !sb.has(x));
}

/**
 * Achata o estado { "<titulo>": { "<url>": {...} } } em Map url -> { titulo, dados }.
 * URL repetida em dois certames: vale a primeira ocorrência (ordem das chaves).
 */
export function achatarEstado(estado = {}) {
  const mapa = new Map();
  for (const titulo of Object.keys(estado || {})) {
    for (const url of Object.keys(estado[titulo] || {})) {
      if (!mapa.has(url)) mapa.set(url, { titulo, dados: estado[titulo][url] });
    }
  }
  return mapa;
}

const porTituloEUrl = (x, y) => (x.titulo < y.titulo ? -1 : x.titulo > y.titulo ? 1 : x.url < y.url ? -1 : x.url > y.url ? 1 : 0);

/**
 * Compara o estado anterior com o atual (ambos no formato { "<titulo>": { "<url>": {...} } }).
 * As URLs são casadas pela própria URL (o título é só rótulo; vale o título atual).
 * Retorna { mudancas, inacessiveis, linhasBase, removidos }.
 * - mudança: URL nova (lida com sucesso), URL removida de certame que continua listado,
 *   ou datas/links de documento que entraram/saíram;
 * - inacessível: falha de acesso agora (não conta como mudança; URL nova inacessível leva urlNova: true);
 * - linha de base: URL que antes nunca foi lida com sucesso e agora foi (referência incompleta;
 *   não conta como mudança, mas o main sai com 4 até rodar --atualizar);
 * - removido: URL de certame cujo título não existe mais na entrada (certame tirado da lista):
 *   só informativo.
 * `titulosAtuais` (opcional): títulos presentes na entrada atual; padrão = títulos de `atual`.
 */
export function compararEstados(anterior = {}, atual = {}, { titulosAtuais } = {}) {
  const mudancas = [];
  const inacessiveis = [];
  const linhasBase = [];
  const removidos = [];
  const ant = achatarEstado(anterior);
  const atu = achatarEstado(atual);
  const titulos = new Set(titulosAtuais ?? Object.keys(atual || {}));
  const urls = [...new Set([...ant.keys(), ...atu.keys()])];

  for (const url of urls) {
    const a = ant.get(url)?.dados;
    const b = atu.get(url)?.dados;
    const titulo = (atu.get(url) || ant.get(url)).titulo;
    if (!a) {
      // URL nova inacessível não conta como mudança: vai só para inacessíveis.
      if (b.status !== 'ok') inacessiveis.push({ titulo, url, motivo: b.motivo || b.status, urlNova: true });
      else mudancas.push({ titulo, url, tipo: 'url-nova' });
      continue;
    }
    if (!b) {
      // Certame ainda listado que perdeu a URL: mudança. Certame removido da lista: informativo.
      if (titulos.has(titulo)) mudancas.push({ titulo, url, tipo: 'url-removida' });
      else removidos.push({ titulo, url });
      continue;
    }
    if (b.status !== 'ok') { inacessiveis.push({ titulo, url, motivo: b.motivo || b.status }); continue; }
    if (!Array.isArray(a.datas) || !Array.isArray(a.links)) { linhasBase.push({ titulo, url }); continue; }
    const ch = {
      datasEntraram: diferenca(b.datas, a.datas),
      datasSairam: diferenca(a.datas, b.datas),
      linksEntraram: diferenca(b.links, a.links),
      linksSairam: diferenca(a.links, b.links),
    };
    if (Object.values(ch).some((l) => l.length)) mudancas.push({ titulo, url, tipo: 'conteudo', ...ch });
  }
  mudancas.sort(porTituloEUrl);
  inacessiveis.sort(porTituloEUrl);
  linhasBase.sort(porTituloEUrl);
  removidos.sort(porTituloEUrl);
  return { mudancas, inacessiveis, linhasBase, removidos };
}

/**
 * Texto estável que identifica o aviso (para deduplicar no workflow). Inclui o código de
 * saída, as mudanças (certame, url, tipo, datas/links que entraram/saíram) e, se o código
 * não for 3, as URLs inacessíveis (só título e url: o motivo varia entre timeout, ECONNRESET, 503...).
 * Tudo ordenado; nada de horário. `resultado` é a saída de compararEstados().
 */
export function montarChave(resultado, codigo) {
  const ord = (l) => (Array.isArray(l) ? [...l].sort() : []);
  const mudancas = [...(resultado?.mudancas || [])].sort(porTituloEUrl).map((m) => ({
    titulo: m.titulo,
    url: m.url,
    tipo: m.tipo,
    datasEntraram: ord(m.datasEntraram),
    datasSairam: ord(m.datasSairam),
    linksEntraram: ord(m.linksEntraram),
    linksSairam: ord(m.linksSairam),
  }));
  // Com mudança (código 3), a chave é só das mudanças: uma página que oscila entre
  // acessível e inacessível não gera comentário repetido da mesma mudança pendente.
  const soTituloUrl = (l) => (Number(codigo) === 3 ? []
    : [...(l || [])].sort(porTituloEUrl).map((x) => ({ titulo: x.titulo, url: x.url })));
  const inacessiveis = soTituloUrl(resultado?.inacessiveis);
  const chave = { codigo: Number(codigo), mudancas, inacessiveis };
  // Referência incompleta (URLs lidas pela 1ª vez): entra na chave só se houver alguma,
  // para não mudar a chave dos avisos antigos.
  const linhasBase = soTituloUrl(resultado?.linhasBase);
  if (linhasBase.length) chave.referenciaIncompleta = linhasBase;
  return JSON.stringify(chave, null, 2) + '\n';
}

// Tela de login: segmento inteiro "login"/"signin"/"entrar" (não "/entrar-no-concurso"
// nem "/login.html") ou qualquer caminho com "/auth/".
const RE_LOGIN = /\/(login|signin|entrar)(?:\/|$|\?|#)/i;
const RE_AUTH = /\/auth\//i;

/** true se o caminho da URL parece tela de login (só o pathname é examinado). */
export function ehTelaLogin(url) {
  let caminho;
  try { caminho = new URL(url).pathname; } catch { caminho = String(url ?? ''); }
  return RE_LOGIN.test(caminho) || RE_AUTH.test(caminho);
}

/** true se o item tem encerraEm válido e já passado em relação a `agora` (ms). */
export function certameEncerrado(item, agora = Date.now()) {
  if (!item || typeof item.encerraEm !== 'string') return false;
  const t = Date.parse(item.encerraEm);
  return Number.isFinite(t) && t < agora;
}

/** Títulos dos certames com encerraEm já passado (não são monitorados). */
export function listarEncerrados(concurso, agora = Date.now()) {
  const saida = [];
  for (const item of concurso?.situacao || []) {
    if (item && typeof item.titulo === 'string' && certameEncerrado(item, agora) && !saida.includes(item.titulo)) saida.push(item.titulo);
  }
  return saida;
}

/** URLs de certames encerrados (para não contar a saída delas como mudança). */
function urlsDeEncerrados(concurso, agora) {
  const urls = new Set();
  for (const item of concurso?.situacao || []) {
    if (!item || typeof item.titulo !== 'string' || !certameEncerrado(item, agora)) continue;
    for (const l of item.links || []) if (l && typeof l.url === 'string' && l.url.trim()) urls.add(l.url.trim());
    for (const u of Array.isArray(item.monitorar) ? item.monitorar : []) if (typeof u === 'string' && u.trim()) urls.add(u.trim());
  }
  return urls;
}

/**
 * Lista { titulo: [urls] } a partir do concurso.json (links[].url + monitorar[] opcional).
 * Itens com encerraEm válido e já passado (em relação a `agora`, ms) ficam de fora.
 */
export function listarUrls(concurso, agora = Date.now()) {
  const saida = {};
  for (const item of concurso?.situacao || []) {
    if (!item || typeof item.titulo !== 'string') continue;
    if (certameEncerrado(item, agora)) continue;
    const urls = new Set(saida[item.titulo] || []);
    for (const l of item.links || []) if (l && typeof l.url === 'string' && l.url.trim()) urls.add(l.url.trim());
    for (const u of Array.isArray(item.monitorar) ? item.monitorar : []) if (typeof u === 'string' && u.trim()) urls.add(u.trim());
    saida[item.titulo] = [...urls];
  }
  return saida;
}

// ---------------------------------------------------------------------------
// Rede e extração
// ---------------------------------------------------------------------------

function detectarCharset(contentType, bytes) {
  const doHeader = /charset=["']?([\w-]+)/i.exec(contentType || '');
  if (doHeader) return doHeader[1];
  const inicio = Buffer.from(bytes.subarray(0, 4096)).toString('latin1');
  const doMeta = /<meta[^>]+charset=["']?([\w-]+)/i.exec(inicio);
  return doMeta ? doMeta[1] : 'utf-8';
}

function decodificar(bytes, charset) {
  try { return new TextDecoder(charset.toLowerCase()).decode(bytes); } catch { return new TextDecoder('utf-8').decode(bytes); }
}

function erroGrandeDemais(detalhe) {
  const e = new Error(`resposta grande demais (${detalhe}; limite ${TAMANHO_MAXIMO} bytes)`);
  e.code = 'GRANDE_DEMAIS';
  return e;
}

/**
 * Lê o corpo da resposta em stream, abortando sem ler tudo se passar de `limite` bytes
 * (content-length maior que o limite aborta antes de ler qualquer coisa).
 */
export async function lerCorpo(resp, limite = TAMANHO_MAXIMO) {
  const declarado = Number(resp.headers?.get?.('content-length'));
  if (Number.isFinite(declarado) && declarado > limite) {
    try { await resp.body?.cancel(); } catch { /* ignora */ }
    throw erroGrandeDemais(`content-length ${declarado} bytes`);
  }
  if (!resp.body) return new Uint8Array(0);
  const leitor = resp.body.getReader();
  const partes = [];
  let total = 0;
  for (;;) {
    const { done, value } = await leitor.read();
    if (done) break;
    total += value.byteLength;
    if (total > limite) {
      try { await leitor.cancel(); } catch { /* ignora */ }
      throw erroGrandeDemais(`mais de ${limite} bytes recebidos`);
    }
    partes.push(value);
  }
  const bytes = new Uint8Array(total);
  let pos = 0;
  for (const p of partes) { bytes.set(p, pos); pos += p.byteLength; }
  return bytes;
}

// Assíncrono (execFile): não bloqueia o event loop enquanto outros fetches correm com
// AbortSignal.timeout (spawnSync dava falsos "tempo esgotado"). Timeout próprio.
async function pdfParaTexto(bytes, timeoutMs = 30000) {
  const bin = process.env.PDFTOTEXT || 'pdftotext';
  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'monitor-concursos-'));
  try {
    const arq = path.join(dir, 'doc.pdf');
    await fs.promises.writeFile(arq, bytes);
    try {
      const { stdout } = await execFileAsync(bin, ['-enc', 'UTF-8', '-q', arq, '-'], {
        encoding: 'utf8', maxBuffer: 200 * 1024 * 1024, timeout: timeoutMs, windowsHide: true,
      });
      return stdout;
    } catch (e) {
      if (['ENOENT', 'EACCES', 'EPERM', 'ENOTDIR'].includes(e?.code)) throw new Error(`pdftotext indisponível (${e.code})`);
      if (e?.code === 'ERR_CHILD_PROCESS_STDIO_MAXBUFFER') throw new Error('pdftotext: texto grande demais');
      if (e?.killed || e?.signal) throw new Error(`pdftotext: tempo esgotado (${Math.round(timeoutMs / 1000)} s)`);
      throw new Error(`pdftotext falhou (código ${e?.code ?? e?.message})`);
    }
  } finally {
    await fs.promises.rm(dir, { recursive: true, force: true });
  }
}

/** Baixa e analisa uma URL. Nunca lança: falhas viram status "inacessivel". */
export async function verificarUrl(url, { timeoutMs = 30000 } = {}) {
  const verificadoEm = new Date().toISOString();
  const falha = (motivo) => ({ datas: null, links: null, sha: null, status: 'inacessivel', motivo, verificadoEm });
  let resp;
  try {
    resp = await fetch(url, {
      redirect: 'follow',
      signal: AbortSignal.timeout(timeoutMs),
      headers: { 'User-Agent': USER_AGENT, Accept: 'text/html,application/pdf;q=0.9,*/*;q=0.8' },
    });
  } catch (e) {
    const nome = e?.name === 'TimeoutError' || e?.name === 'AbortError' ? `tempo esgotado (${Math.round(timeoutMs / 1000)} s)` : null;
    const causa = e?.cause?.code || e?.cause?.message || e?.message || String(e);
    return falha(nome || `erro de rede: ${causa}`);
  }
  if (!resp.ok) {
    const motivoHttp = `HTTP ${resp.status}${resp.statusText ? ' ' + resp.statusText : ''}`;
    // Lê o corpo (com o mesmo limite) para distinguir bloqueio anti-robô de erro comum.
    try {
      const corpo = await lerCorpo(resp, TAMANHO_MAXIMO);
      const tipoErro = resp.headers.get('content-type') || '';
      const htmlErro = decodificar(corpo, detectarCharset(tipoErro, corpo));
      const textoErro = /html|xml/i.test(tipoErro) || /<html|<body|<a\s/i.test(htmlErro) ? htmlParaTexto(htmlErro) : normalizarTexto(htmlErro);
      const bloqueio = ehBloqueio(textoErro, htmlErro, resp.status);
      if (bloqueio) return falha(`bloqueio anti-robô (HTTP ${resp.status})`);
    } catch { /* corpo ilegível ou grande demais: fica o motivo HTTP */ }
    return falha(motivoHttp);
  }

  let bytes;
  try {
    bytes = await lerCorpo(resp, TAMANHO_MAXIMO);
  } catch (e) {
    if (e?.code === 'GRANDE_DEMAIS') return falha(e.message);
    return falha(`erro ao ler resposta: ${e?.name === 'TimeoutError' ? 'tempo esgotado' : e?.message}`);
  }

  // Redirecionou para tela de login: conteúdo restrito, não é mudança.
  const final = resp.url || url;
  if (ehTelaLogin(final) && !ehTelaLogin(url)) {
    return falha(`exige login (redirecionado para ${final})`);
  }

  const tipo = resp.headers.get('content-type') || '';
  const ehPdf = /application\/pdf/i.test(tipo) || Buffer.from(bytes.subarray(0, 5)).toString('latin1') === '%PDF-';
  // Conteúdo que não é HTML, texto nem PDF (docx, zip, imagem, octet-stream sem %PDF):
  // não passa por extração; registra só o sha256 dos bytes, com datas [] e links [] e
  // binario: true. Como o sha é só informativo, mudança apenas de hash NÃO conta como mudança.
  // Content-type ausente segue o caminho de texto (como antes).
  if (!ehPdf && tipo && !/html|xml|text\/|json|javascript/i.test(tipo)) {
    const sha = crypto.createHash('sha256').update(bytes).digest('hex');
    return { datas: [], links: [], sha, status: 'ok', binario: true, verificadoEm };
  }
  try {
    if (ehPdf) {
      const texto = normalizarTexto(await pdfParaTexto(bytes, timeoutMs));
      if (!texto) return falha('PDF sem texto extraível (imagem escaneada?)');
      return { datas: extrairDatas(texto), links: [], sha: sha256(texto), status: 'ok', verificadoEm };
    }
    const html = decodificar(bytes, detectarCharset(tipo, bytes));
    const texto = /html|xml/i.test(tipo) || /<html|<body|<a\s/i.test(html) ? htmlParaTexto(html) : normalizarTexto(html);
    const bloqueio = ehBloqueio(texto, html, resp.status);
    if (bloqueio) return falha(bloqueio);
    return { datas: extrairDatas(texto), links: extrairLinksDocumento(html, resp.url || url), sha: sha256(texto), status: 'ok', verificadoEm };
  } catch (e) {
    return falha(e?.message || String(e));
  }
}

function sha256(texto) {
  return crypto.createHash('sha256').update(texto, 'utf8').digest('hex');
}

async function emParalelo(tarefas, limite) {
  const resultados = new Array(tarefas.length);
  let i = 0;
  const trabalhadores = Array.from({ length: Math.min(limite, tarefas.length) }, async () => {
    while (i < tarefas.length) { const k = i++; resultados[k] = await tarefas[k](); }
  });
  await Promise.all(trabalhadores);
  return resultados;
}

// ---------------------------------------------------------------------------
// Relatório
// ---------------------------------------------------------------------------

const brData = (iso) => {
  if (ehSemAno(iso)) { const [m, d] = iso.slice(2).split('-'); return `${d}/${m} (sem ano)`; }
  const [a, m, d] = iso.split('-'); return `${d}/${m}/${a}`;
};

/** Dica para URLs não atualizadas: se a falha foi do pdftotext, lembrar de definir PDFTOTEXT. */
function dicaNaoAtualizadas(lista) {
  return lista.some((x) => /pdftotext/i.test(String(x.motivo || '')))
    ? 'Dica: pdftotext ausente/falhou → instale o poppler ou defina a variável PDFTOTEXT com o caminho do executável.'
    : 'Rode de novo com --atualizar quando essas URLs voltarem a responder.';
}

/**
 * `naoAtualizadas` (opcional, só com --atualizar): [{ titulo, url, motivo }] das URLs
 * inacessíveis cuja referência NÃO foi atualizada (ficaram os dados da última leitura boa).
 */
export function montarRelatorio({ comparacao, urlsPorTitulo, geradoEm, semReferencia, encerrados = [], naoAtualizadas = [] }) {
  const { mudancas, inacessiveis, linhasBase, removidos = [] } = comparacao;
  const L = [];
  L.push('# Monitor de concursos');
  L.push('');
  L.push(`Verificado em ${geradoEm}.`);
  L.push('');
  if (semReferencia) {
    L.push('Não havia estado de referência; esta execução criou a linha de base (nada a comparar).');
  } else if (!mudancas.length) {
    L.push('**Sem mudança** nas datas e nos links de documentos dos certames monitorados.');
  } else {
    L.push(`**Houve mudança** em ${new Set(mudancas.map((m) => m.titulo)).size} certame(s). Confira no site oficial antes de atualizar o site de estudo.`);
  }
  L.push('');

  if (!semReferencia && mudancas.length) {
    L.push('## Mudanças');
    L.push('');
    const porTitulo = new Map();
    for (const m of mudancas) { if (!porTitulo.has(m.titulo)) porTitulo.set(m.titulo, []); porTitulo.get(m.titulo).push(m); }
    for (const [titulo, lista] of porTitulo) {
      L.push(`### ${titulo}`);
      L.push('');
      const oficial = (urlsPorTitulo[titulo] || [])[0];
      if (oficial) { L.push(`URL oficial: ${oficial}`); L.push(''); }
      for (const m of lista) {
        if (m.tipo === 'url-nova') { L.push(`- URL nova na lista monitorada: ${m.url}`); continue; }
        if (m.tipo === 'url-removida') { L.push(`- URL removida da lista monitorada: ${m.url}`); continue; }
        L.push(`- Em ${m.url}:`);
        if (m.datasEntraram.length) L.push(`  - Datas que entraram: ${m.datasEntraram.map(brData).join(', ')}`);
        if (m.datasSairam.length) L.push(`  - Datas que saíram: ${m.datasSairam.map(brData).join(', ')}`);
        for (const l of m.linksEntraram) L.push(`  - Documento novo: ${l}`);
        for (const l of m.linksSairam) L.push(`  - Documento que saiu: ${l}`);
      }
      L.push('');
    }
  }

  if (linhasBase.length) {
    L.push('## Referência incompleta: rode --atualizar');
    L.push('');
    L.push('Estas URLs nunca tinham sido lidas com sucesso (sem datas/links no estado de referência) e por isso NÃO estão sendo vigiadas de fato. Agora foram lidas: rode com --atualizar para gravá-las como referência.');
    L.push('');
    for (const x of linhasBase) L.push(`- ${x.titulo}: ${x.url}`);
    L.push('');
  }

  if (removidos.length) {
    L.push('## Certames removidos da lista (rode --atualizar para limpar a referência)');
    L.push('');
    L.push('Só informativo (não conta como mudança): o certame não está mais na entrada.');
    L.push('');
    for (const x of removidos) L.push(`- ${x.titulo}: ${x.url}`);
    L.push('');
  }

  if (encerrados.length) {
    L.push('## Certames encerrados');
    L.push('');
    for (const t of encerrados) L.push(`- ${t}: certame encerrado, não monitorado`);
    L.push('');
  }

  L.push('## Inacessíveis');
  L.push('');
  if (!inacessiveis.length) {
    L.push('Nenhuma.');
  } else {
    L.push('Falha de acesso não conta como mudança; conferir manualmente se persistir.');
    L.push('');
    for (const x of inacessiveis) L.push(`- ${x.titulo}: ${x.url} (${x.urlNova ? 'URL nova na lista monitorada; ' : ''}${x.motivo})`);
  }
  L.push('');

  if (naoAtualizadas.length) {
    L.push('## Aviso: referência NÃO atualizada');
    L.push('');
    L.push('Com --atualizar, estas URLs estavam inacessíveis e mantiveram os dados antigos (ou nenhum) no estado de referência:');
    L.push('');
    for (const x of naoAtualizadas) L.push(`- ${x.titulo}: ${x.url} (${x.motivo})`);
    L.push('');
    L.push(dicaNaoAtualizadas(naoAtualizadas));
    L.push('');
  }
  return L.join('\n');
}

// ---------------------------------------------------------------------------
// Linha de comando
// ---------------------------------------------------------------------------

function lerArgs(argv) {
  const op = { entrada: ENTRADA_PADRAO, estado: ESTADO_PADRAO, relatorio: null, chave: null, atualizar: false, timeout: 30 };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const valor = () => { const v = argv[++i]; if (v === undefined || v.startsWith('--')) throw new Error(`faltou valor para ${a}`); return v; };
    if (a === '--entrada') op.entrada = path.resolve(valor());
    else if (a === '--estado') op.estado = path.resolve(valor());
    else if (a === '--relatorio') op.relatorio = path.resolve(valor());
    else if (a === '--chave') op.chave = path.resolve(valor());
    else if (a === '--atualizar') op.atualizar = true;
    else if (a === '--timeout') { op.timeout = Number(valor()); if (!(op.timeout > 0)) throw new Error('--timeout precisa ser um número positivo de segundos'); }
    else if (a === '--ajuda' || a === '-h' || a === '--help') op.ajuda = true;
    else throw new Error(`opção desconhecida: ${a}`);
  }
  return op;
}

/** Estado de referência válido: objeto (não array) com "itens" objeto (não array). */
export function estadoValido(obj) {
  const ehObjeto = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
  return ehObjeto(obj) && ehObjeto(obj.itens);
}

function lerJson(arquivo, rotulo) {
  try { return JSON.parse(fs.readFileSync(arquivo, 'utf8')); } catch (e) { throw new Error(`não consegui ler ${rotulo} (${arquivo}): ${e.message}`); }
}

export async function main(argv, { agora = Date.now() } = {}) {
  let op;
  try { op = lerArgs(argv); } catch (e) { console.error(`Erro: ${e.message}`); return 2; }
  if (op.ajuda) {
    console.log('Uso: node scripts/monitorar-concursos.mjs [--entrada <json>] [--estado <json>] [--relatorio <md>] [--chave <arquivo>] [--atualizar] [--timeout <s>]');
    return 0;
  }

  let concurso;
  let anterior = null;
  try {
    concurso = lerJson(op.entrada, 'a entrada');
    const existeEstado = fs.existsSync(op.estado);
    if (existeEstado) anterior = lerJson(op.estado, 'o estado');
    else if (!op.atualizar) throw new Error(`estado de referência inexistente (${op.estado}); rode antes com --atualizar`);
    if (existeEstado && !estadoValido(anterior)) {
      if (!op.atualizar) throw new Error(`estado de referência malformado: ${op.estado} (esperado objeto com "itens" objeto); corrija ou rode com --atualizar`);
      console.error(`AVISO: estado de referência malformado: ${op.estado}; será sobrescrito (sem comparação).`);
      anterior = null;
    }
  } catch (e) { console.error(`Erro: ${e.message}`); return 2; }

  const urlsPorTitulo = listarUrls(concurso, agora);
  const encerrados = listarEncerrados(concurso, agora);
  // Mesma URL em dois certames: baixa uma vez só e fica com o primeiro certame.
  const vistas = new Set();
  const pares = Object.entries(urlsPorTitulo).flatMap(([titulo, urls]) => urls.map((url) => ({ titulo, url })))
    .filter(({ url }) => (vistas.has(url) ? false : (vistas.add(url), true)));
  const resultados = await emParalelo(pares.map((p) => () => verificarUrl(p.url, { timeoutMs: op.timeout * 1000 })), PARALELO);

  const itensAnt = anterior?.itens || {};
  const antPorUrl = achatarEstado(itensAnt);
  const atual = {};
  pares.forEach(({ titulo, url }, k) => {
    let r = resultados[k];
    // Falha passageira não apaga a referência: mantém datas/links da última leitura boa.
    const prev = antPorUrl.get(url)?.dados;
    if (r.status !== 'ok' && prev && Array.isArray(prev.datas)) r = { ...r, datas: prev.datas, links: prev.links, sha: prev.sha };
    (atual[titulo] ||= {})[url] = r;
  });

  // URL que saiu porque o certame venceu não conta como mudança.
  const doEncerrado = urlsDeEncerrados(concurso, agora);
  const antComparavel = {};
  for (const [url, { titulo, dados }] of antPorUrl) {
    if (doEncerrado.has(url) && !vistas.has(url)) continue;
    (antComparavel[titulo] ||= {})[url] = dados;
  }

  const geradoEm = new Date().toISOString();
  const comparacao = compararEstados(antComparavel, atual, { titulosAtuais: Object.keys(urlsPorTitulo) });
  const naoAtualizadas = op.atualizar
    ? pares.flatMap(({ titulo, url }, k) => (resultados[k].status === 'ok' ? []
      : [{ titulo, url, motivo: resultados[k].motivo || resultados[k].status }]))
    : [];
  const relatorio = montarRelatorio({ comparacao, urlsPorTitulo, geradoEm, semReferencia: !anterior, encerrados, naoAtualizadas });
  const codigo = anterior && comparacao.mudancas.length ? 3
    // Referência incompleta só pesa sem --atualizar (com ele, essas URLs acabam de ser gravadas).
    : comparacao.inacessiveis.length || (!op.atualizar && comparacao.linhasBase.length) ? 4 : 0;

  try {
    if (op.relatorio) fs.writeFileSync(op.relatorio, relatorio, 'utf8');
    else process.stdout.write(relatorio + '\n');
    if (op.chave) fs.writeFileSync(op.chave, montarChave(comparacao, codigo), 'utf8');
    if (op.atualizar) {
      fs.mkdirSync(path.dirname(op.estado), { recursive: true });
      fs.writeFileSync(op.estado, JSON.stringify({ geradoEm, itens: atual }, null, 2) + '\n', 'utf8');
      console.error(`Estado de referência gravado em ${op.estado}`);
      if (naoAtualizadas.length) {
        console.error(`AVISO: referência NÃO atualizada para ${naoAtualizadas.length} URL(s) inacessível(is) (ficaram os dados antigos):`);
        for (const x of naoAtualizadas) console.error(`  - ${x.titulo}: ${x.url} (${x.motivo})`);
        console.error(dicaNaoAtualizadas(naoAtualizadas));
      }
    }
  } catch (e) { console.error(`Erro ao gravar: ${e.message}`); return 2; }

  return codigo;
}

function chamadoDiretamente() {
  if (!process.argv[1]) return false;
  try {
    return import.meta.url === pathToFileURL(fs.realpathSync(process.argv[1])).href
      || import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;
  } catch { return false; }
}

if (chamadoDiretamente()) {
  main(process.argv.slice(2)).then((codigo) => { process.exitCode = codigo; }, (e) => { console.error(e); process.exitCode = 2; });
}
