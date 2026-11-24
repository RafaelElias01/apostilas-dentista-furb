// Baixa normas oficiais, converte HTML em texto, monta um compilado único e confere os
// trechos literais ("trecho") das apostilas contra ele.
//
// Uso:
//   node scripts/leis-compilar-e-conferir.mjs baixar     (planalto.gov.br -> fontes/leis/planalto/*.htm, com SHA256)
//   node scripts/leis-compilar-e-conferir.mjs compilar   (HTML -> txt/*.txt + COMPILADO-planalto.txt)
//   node scripts/leis-compilar-e-conferir.mjs conferir   (cada "trecho" das apostilas dentro do texto oficial)
//   node scripts/leis-compilar-e-conferir.mjs buscar "termo"   (pesquisa no compilado, mostra o contexto)
//   node scripts/leis-compilar-e-conferir.mjs tudo       (baixar + compilar + conferir)
// Sem argumento extra de rede: o proxy vem das variáveis HTTPS_PROXY do ambiente (curl).
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// LEIS_RAIZ (se definida) substitui a raiz do projeto: permite testar em pasta temporária.
const RAIZ = process.env.LEIS_RAIZ
  ? path.resolve(process.env.LEIS_RAIZ)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const LEIS = path.join(RAIZ, 'fontes', 'leis');
const PLAN = path.join(LEIS, 'planalto');
const TXT = path.join(PLAN, 'txt');
const B = 'https://www.planalto.gov.br/ccivil_03';
const UA = 'Mozilla/5.0 Chrome/131.0';

// arquivo local -> URL oficial. Acrescentar aqui toda norma federal nova usada nas apostilas.
const NORMAS = {
  'constituicao-1988.htm': `${B}/constituicao/constituicao.htm`,
  'lei-8080-1990.htm': `${B}/leis/l8080.htm`,
  'lei-8142-1990.htm': `${B}/leis/l8142.htm`,
  'lc-141-2012.htm': `${B}/leis/lcp/lcp141.htm`,
  'decreto-7508-2011.htm': `${B}/_ato2011-2014/2011/decreto/d7508.htm`,
  'lei-14572-2023.htm': `${B}/_ato2023-2026/2023/lei/L14572.htm`,
  'lei-15126-2025.htm': `${B}/_ato2023-2026/2025/lei/L15126.htm`,
  'lei-5081-1966.htm': `${B}/leis/l5081.htm`,
  'lei-4324-1964.htm': `${B}/leis/1950-1969/l4324.htm`
};

const ENT = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', ordm: 'º', ordf: 'ª', sect: '§', deg: '°' };
Object.assign(ENT, {
  ndash: '–', mdash: '—', hellip: '…', laquo: '«', raquo: '»',
  ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', middot: '·', shy: ''
});
const MARCA = { acute: '́', grave: '̀', circ: '̂', tilde: '̃', uml: '̈', cedil: '̧' };
// UTF-8 por padrão; só cai para windows-1252 se houver U+FFFD E nenhuma letra acentuada válida no UTF-8.
// (arquivo UTF-8 correto com alguns U+FFFD isolados é mantido como está)
export const decodificar = (buf) => {
  const u = buf.toString('utf8');
  return u.includes('�') && !/[À-ÿ]/.test(u) ? new TextDecoder('windows-1252').decode(buf) : u;
};
export function htmlParaTexto(html) {
  return html
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|div|tr|li|h\d|table|center|blockquote)>|<br\s*\/?>/gi, '\n')
    .replace(/<\/t[dh]>|<t[dh](\s[^>]*)?>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    // entidades acentuadas (&uacute; &ccedil; &atilde; ...): letra base + marca combinante, recomposta em NFC
    .replace(/&([a-zA-Z])(acute|grave|circ|tilde|uml|cedil);/g, (_, l, a) => (l + MARCA[a]).normalize('NFC'))
    .replace(/&([a-z]+);/gi, (m, n) => ENT[n.toLowerCase()] ?? m)
    .replace(/[ \t ]+/g, ' ')
    .split('\n').map((l) => l.trim()).filter(Boolean).join('\n');
}
// Tira anotações legislativas entre parênteses ("Redação dada pela Lei nº ...") e normaliza para comparar.
export function normalizar(s) {
  return s
    .replace(/\([^()]*(Reda[cç][aã]o|Inclu[ií]d|Revogad|Vide|Vig[eê]ncia|VETAD|Regulament|Acrescid|Suprimid|Renumerad|Promulga|Mensagem)[^()]*\)/gi, ' ')
    .replace(/\([^()]*\b(Lei|Emenda|Decreto|Medida)[^()]*\d{4}[^()]*\)/g, ' ')
    .toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ').trim();
}
// Fallback para fontes com acento corrompido na origem (bvsms grava U+FFFD): sem NFD, toda letra acentuada
// e o U+FFFD viram espaço nos dois lados, então "saúde" e "sa�de" ficam iguais.
export function normalizarFraca(s) {
  return s
    .replace(/\([^()]*(Reda[cç][aã]o|Inclu[ií]d|Revogad|Vide|Vig[eê]ncia|VETAD|Regulament|Acrescid|Suprimid|Renumerad|Promulga|Mensagem)[^()]*\)/gi, ' ')
    .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}
const sha = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

// Recebe: buf (Buffer com os bytes baixados).
// Devolve: string com o motivo da recusa, ou '' (vazia) se o conteúdo parece uma norma de verdade.
export function validarDownload(buf) {
  if (buf.length < 2000) return `só ${buf.length} bytes (mínimo 2000)`;
  // testa nas duas codificações (UTF-8 e Latin-1): a página de erro pode vir em qualquer uma
  const ts = [buf.toString('utf8'), buf.toString('latin1')];
  if (!ts.some((t) => /<html/i.test(t))) return 'sem <html';
  if (ts.some((t) => /Skyhigh/i.test(t))) return 'página de bloqueio (Skyhigh)';
  if (ts.some((t) => /P.gina n.o encontrada|404 Not Found/i.test(t))) return 'página de erro (não encontrada)';
  return '';
}

function baixar() {
  fs.mkdirSync(PLAN, { recursive: true });
  const linhas = [];
  for (const [arq, url] of Object.entries(NORMAS)) {
    const dest = path.join(PLAN, arq);
    const tmp = `${dest}.tmp`;
    try {
      execFileSync('curl', ['-sL', '-m', '90', '-A', UA, '-f', '-o', tmp, url], { stdio: 'pipe' });
      const buf = fs.readFileSync(tmp);
      const motivo = validarDownload(buf);
      if (motivo) throw new Error(`download inválido: ${motivo}`);
      fs.renameSync(tmp, dest);
      linhas.push(`${arq}\t${url}\t${new Date().toISOString().slice(0, 10)}\t${buf.length}\t${sha(buf)}`);
      console.log('ok  ', arq, buf.length);
    } catch (e) {
      try { fs.rmSync(tmp, { force: true }); } catch { /* ignora */ }
      console.error('FALHOU', arq, url, String(e.message).split('\n')[0]);
      process.exitCode = 1;
    }
  }
  // não perde as linhas de normas cuja baixa falhou agora: lê o TSV existente (se houver) e troca só as baixadas
  const tsv = path.join(PLAN, 'ORIGEM-planalto.tsv');
  const antigas = new Map();
  if (fs.existsSync(tsv)) {
    for (const l of fs.readFileSync(tsv, 'utf8').split(/\r?\n/).slice(1)) if (l.trim()) antigas.set(l.split('\t')[0], l);
  }
  for (const l of linhas) antigas.set(l.split('\t')[0], l);
  const ordem = Object.keys(NORMAS);
  const finais = [...ordem.filter((a) => antigas.has(a)), ...[...antigas.keys()].filter((a) => !ordem.includes(a))].map((a) => antigas.get(a));
  fs.writeFileSync(tsv, ['arquivo\turl\tbaixado_em\ttamanho\tsha256', ...finais].join('\n') + '\n');
}

// entidade HTML que sobrou sem decodificar (&xxx; ou &#123; ou &#xAB;): sinal de bug na conversão
export function entidadesSobrando(texto) {
  return texto.match(/&[a-zA-Z]+;|&#\d+;|&#x[0-9a-f]+;/gi) ?? [];
}

function compilar() {
  fs.mkdirSync(TXT, { recursive: true });
  const htms = fs.readdirSync(PLAN).filter((x) => x.endsWith('.htm')).sort();
  // apaga só dentro de txt/: .txt órfão (sem .htm correspondente em planalto/)
  for (const o of fs.readdirSync(TXT)) {
    if (o.endsWith('.txt') && !htms.includes(o.replace(/\.txt$/, '.htm'))) { fs.rmSync(path.join(TXT, o)); console.log('órfão removido: txt/' + o); }
  }
  const partes = [];
  for (const f of htms) {
    const txt = htmlParaTexto(decodificar(fs.readFileSync(path.join(PLAN, f))));
    const sobra = entidadesSobrando(txt);
    if (sobra.length) {
      console.error(`entidade não decodificada em ${f}: ${[...new Set(sobra)].slice(0, 5).join(' ')} (${sobra.length} ocorrência(s))`);
      process.exitCode = 1;
    }
    fs.writeFileSync(path.join(TXT, f.replace('.htm', '.txt')), txt);
    partes.push(`\n\n########## ${f} ##########\n\n${txt}`);
    console.log('txt ', f, txt.length);
  }
  fs.writeFileSync(path.join(PLAN, 'COMPILADO-planalto.txt'), partes.join(''));
}

// corpo de cada fonte conhecida (normal e fraca): Planalto (txt) e as cópias da Câmara/bvsms em fontes/leis, recursivo
function listar(dir, base = '') {
  const r = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (e.name !== 'planalto') r.push(...listar(path.join(dir, e.name), `${base}${e.name}/`)); }
    else if (/\.html?$/i.test(e.name)) r.push(`${base}${e.name}`);
  }
  return r;
}
function carregarFontes(dirLeis, dirTxt) {
  const m = new Map();
  const add = (chave, texto) => m.set(chave, { n: normalizar(texto), f: normalizarFraca(texto) });
  for (const f of fs.existsSync(dirTxt) ? fs.readdirSync(dirTxt) : []) add(`planalto/${f.replace('.txt', '.htm')}`, fs.readFileSync(path.join(dirTxt, f), 'utf8'));
  for (const f of fs.existsSync(dirLeis) ? listar(dirLeis) : []) add(f, htmlParaTexto(decodificar(fs.readFileSync(path.join(dirLeis, f)))));
  return m;
}
function* trechos(no, caminho = '') {
  if (Array.isArray(no)) { for (let i = 0; i < no.length; i++) yield* trechos(no[i], `${caminho}[${i}]`); return; }
  if (no && typeof no === 'object') {
    if (typeof no.trecho === 'string' && no.trecho.length > 30) yield { caminho, trecho: no.trecho, fonte: no.fonte, ref: no.ref };
    for (const [k, v] of Object.entries(no)) yield* trechos(v, `${caminho}.${k}`);
  }
}
// "..." / "[...]" / "…" dividem o trecho em segmentos; cada segmento tem de existir no texto oficial
const cortar = (t) => t.split(/\[\s*\.{3}\s*\]|\.{3}|…/);
const longos = (t, norm, minimo = 12) => cortar(t).map(norm).filter((x) => x.length > minimo);
// o trecho existe na fonte se todos os segmentos aparecem (normalização normal, ou fraca para acento corrompido)
// lista vazia de segmentos NÃO conta como achado (`[].every` seria true): sem segmento, não há o que comparar
const achaTodos = (segs, corpo) => segs.length > 0 && segs.every((x) => corpo.includes(x));
// curto = nenhum segmento passa de 12 caracteres: então todos os segmentos não vazios têm de ser achados
const tem = (corpo, trecho, curto = false) => achaTodos(longos(trecho, normalizar, curto ? 0 : 12), corpo.n) ||
  achaTodos(longos(trecho, normalizarFraca, curto ? 0 : 12), corpo.f);

// Confere os "trecho" das apostilas (dirApostilas/*.json) contra as normas em dirLeis e dirTxt.
// Não imprime nem grava nada. fontes = quantas normas foram carregadas.
export function conferirEm({ dirLeis, dirApostilas, dirTxt }) {
  const fontes = carregarFontes(dirLeis, dirTxt);
  const todas = [...fontes.values()];
  let total = 0, ok = 0, semFonte = 0; const falhas = [];
  for (const arq of fs.readdirSync(dirApostilas).filter((x) => x.endsWith('.json') && !x.startsWith('_'))) {
    const j = JSON.parse(fs.readFileSync(path.join(dirApostilas, arq), 'utf8'));
    for (const t of trechos(j)) {
      total++;
      const segs = cortar(t.trecho).map(normalizar);
      if (!segs.some((x) => x.length > 0)) { falhas.push({ arq, ref: t.ref, motivo: 'trecho vazio após normalizar', fonte: t.fonte }); continue; }
      const curto = !segs.some((x) => x.length > 12);
      const corpoCitado = t.fonte && fontes.get(t.fonte);
      const noCitado = corpoCitado ? tem(corpoCitado, t.trecho, curto) : null;
      const emAlguma = noCitado === true || todas.some((c) => tem(c, t.trecho, curto));
      if (noCitado === null && !emAlguma) { semFonte++; falhas.push({ arq, ref: t.ref, motivo: 'fonte não carregada e trecho não achado em nenhuma norma', fonte: t.fonte }); }
      else if (noCitado === false && !emAlguma) falhas.push({ arq, ref: t.ref, motivo: 'trecho NÃO achado em nenhuma norma oficial carregada', fonte: t.fonte });
      else if (noCitado === null && t.fonte) { semFonte++; falhas.push({ arq, ref: t.ref, motivo: `fonte citada não carregada: ${t.fonte}`, fonte: t.fonte }); }
      else if (noCitado === false) falhas.push({ arq, ref: t.ref, motivo: 'achado, mas não na fonte citada', fonte: t.fonte });
      else ok++;
    }
  }
  return { total, ok, falhas, semFonte, fontes: fontes.size };
}

function conferir() {
  const { total, ok, falhas, semFonte, fontes } = conferirEm({ dirLeis: LEIS, dirApostilas: path.join(RAIZ, 'curso', 'apostila'), dirTxt: TXT });
  if (fontes === 0) { console.error(`nenhuma fonte carregada (${LEIS}): rode "baixar" e "compilar"`); process.exitCode = 1; }
  if (falhas.length > 0) process.exitCode = 1;
  console.log(`trechos: ${total} | conferidos: ${ok} | divergentes ou sem fonte: ${falhas.length} (sem fonte carregada: ${semFonte})`);
  fs.mkdirSync(PLAN, { recursive: true });
  fs.writeFileSync(path.join(PLAN, 'CONFERENCIA-trechos.json'), JSON.stringify(falhas, null, 1));
  for (const f of falhas.slice(0, 40)) console.log(`- ${f.arq} | ${f.ref} | ${f.motivo} | ${f.fonte ?? ''}`);
  if (falhas.length > 40) console.log(`... e mais ${falhas.length - 40} (ver CONFERENCIA-trechos.json)`);
}

function buscar(termo) {
  if (!termo) { console.error('uso: buscar "termo"'); process.exitCode = 1; return; }
  const arq = path.join(PLAN, 'COMPILADO-planalto.txt');
  if (!fs.existsSync(arq)) { console.error('compilado não existe: rode "compilar"'); process.exitCode = 1; return; }
  const linhas = fs.readFileSync(arq, 'utf8').split('\n');
  const alvo = normalizar(termo);
  let norma = '', n = 0;
  linhas.forEach((l, i) => {
    const h = l.match(/^########## (.+) ##########$/); if (h) norma = h[1];
    if (n < 30 && normalizar(l).includes(alvo)) { n++; console.log(`[${norma}:${i + 1}] ${l.slice(0, 240)}`); }
  });
  console.log(n ? `${n} resultado(s) (máx. 30)` : 'nenhum resultado');
}

const [cmd, arg] = process.argv.slice(2);
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (cmd === 'baixar') baixar();
  else if (cmd === 'compilar') compilar();
  else if (cmd === 'conferir') conferir();
  else if (cmd === 'buscar') buscar(arg);
  else if (cmd === 'tudo') { baixar(); compilar(); conferir(); }
  else console.log('uso: node scripts/leis-compilar-e-conferir.mjs baixar|compilar|conferir|buscar "termo"|tudo');
}
