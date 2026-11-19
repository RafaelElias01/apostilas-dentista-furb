// Gera a apostila (HTML autocontido + PDF) de UMA disciplina a partir de curso/apostila/<id>.json. O gerador so FORMATA o que esta no JSON e nas provas reais; nao inventa conteudo.
// Uso:  node scripts/gerar-apostila-materia.mjs <id|caminho.json> [--pdf] [--saida <pasta>] [--sha] [--sem-rodape] [--sem-conferir-rodape] [--json-externo] [--teste --questoes <banco.json>]
//   <id> = curso/apostila/<id>.json (so letras, numeros, - e _). <caminho.json> fora de curso/apostila exige --json-externo (so para testes); o "id" do JSON tem de coincidir com o nome do arquivo (ou _modelo-<id>).
//   sem --pdf: so o HTML (rascunho/apostila/<apostila-0N-nome>.html); --pdf: tambem material-premium/<arquivoPdf>; --saida <pasta>: HTML e PDF vao para a pasta (testes; nao pode ser site/, fontes/, curso/ nem .git).
//   PDF numerado ("Apostila 0N · titulo · Pagina X de Y" no rodape) exige Chrome/Edge >= 131 (variavel NAVEGADOR_PDF): com navegador menor ou desconhecido o script FALHA e nao grava PDF.
//   --pdf EXIGE pdftotext (poppler) para conferir o rodape no PDF pronto, pagina a pagina (PATH ou variavel PDFTOTEXT; nesta maquina: C:/Users/rafael-ioppi/AppData/Local/Programs/Git/mingw64/bin/pdftotext.exe).
//     Sem pdftotext a geracao FALHA; --sem-conferir-rodape pula a conferencia (sem sha). O PDF e gerado num .tmp.pdf e so substitui o anterior se tudo conferir.
//   --saida nunca pode ser material-premium/ nem public/. sha so para apostila normal, conferida, sem --sem-rodape/--teste/_modelo/JSON externo.
//   --sem-rodape: so para conferencia visual com navegador antigo; grava <nome>-SEM-NUMERACAO.pdf fora de material-premium, sem sha. O .pdf-origem.sha256 so sai sem --saida ou com --sha (precisa estar no .gitignore).
//   --questoes <banco.json> (banco alternativo) so com --teste, que exige --saida e marca "BANCO DE TESTE" no HTML/PDF.
// Dados: curso/apostila/<id>.json (modelo: _modelo-portugues.json), curso/questoes-anteriores.json (questoes reais da FURB) e curso/radar-banca.json.
// Campos por licao: "topicosBanco": ["lp.crase", ...] (codigos de topico do radar) escolhe as questoes reais; sem ele a licao sai sem questoes (nada e inventado).
// Trechos de lei ("trecho"): so passam se forem um dispositivo COMPLETO (bloco inteiro, com ou sem o marcador "Art. N"/"§"/"I -") de UM HTML de fontes/leis listado em "fontes": [] do JSON
//   (campo "fonte" no ponto quando ha varias); se a "ref" citar "Art. N", o bloco tem de pertencer ao artigo N.
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { CSS_BASE, RAIZ, NOME_CURSO, SEM_VINCULO, DIR_APOSTILAS, DIR_LEIS, dentroDe, saidaSegura, hashEntradas, secaoLimites, lerJsonObrigatorio, exigirNumeroApostila, exigirNomeArquivo, cssPaginas, htmlParaPdf, opcao } from './apostila-css.mjs';

const arg = process.argv[2];
if (!arg || arg.startsWith('--')) { console.error('Uso: node scripts/gerar-apostila-materia.mjs <id|caminho.json> [--pdf] [--saida <pasta>] [--sha] [--sem-rodape] [--json-externo] [--teste --questoes <banco.json>]  (<id> = curso/apostila/<id>.json)'); process.exit(arg === '--help' ? 0 : 1); }
const arqJson = arg.endsWith('.json') ? path.resolve(arg) : (/^[A-Za-z0-9_-]+$/.test(arg) ? path.join(DIR_APOSTILAS, `${arg}.json`) : null);
if (!arqJson) { console.error(`id invalido: ${JSON.stringify(arg)} (use so letras, numeros, - e _)`); process.exit(1); }
if (!dentroDe(arqJson, DIR_APOSTILAS) && !process.argv.includes('--json-externo')) { console.error(`${arqJson}: fora de curso/apostila (so com --json-externo, para testes)`); process.exit(1); }
const origemJson = dentroDe(arqJson, RAIZ) ? path.relative(RAIZ, arqJson) : arqJson;
const TESTE = process.argv.includes('--teste'), SEM_RODAPE = process.argv.includes('--sem-rodape'), SEM_CONFERIR = process.argv.includes('--sem-conferir-rodape');
const arqQuestoes = opcao('--questoes');
const saidaOpt = opcao('--saida') && saidaSegura(opcao('--saida'));
if (arqQuestoes && !TESTE) { console.error('--questoes (banco alternativo) so vale com --teste'); process.exit(1); }
if (TESTE && !saidaOpt) { console.error('--teste exige --saida <pasta> (nunca grava em material-premium)'); process.exit(1); }
const A = lerJsonObrigatorio(origemJson, 'roteiro da apostila da disciplina: id, numero, titulo, subtitulo, comoUsar, ranking, licoes, arquivoPdf');
for (const k of ['id', 'titulo', 'subtitulo', 'arquivoPdf']) if (!A[k] || typeof A[k] !== 'string') { console.error(`${origemJson}: falta "${k}"`); process.exit(1); }
const nomeJson = path.basename(arqJson, '.json');
if (nomeJson !== A.id && nomeJson !== `_modelo-${A.id}`) { console.error(`${origemJson}: o "id" (${A.id}) nao coincide com o nome do arquivo (${nomeJson}.json)`); process.exit(1); }
const NUM = exigirNumeroApostila(A, origemJson);
exigirNomeArquivo(A.arquivoPdf, NUM, origemJson);
const TITULO_NUM = `${NUM.rotulo} — ${A.titulo}`;
for (const k of ['comoUsar', 'ranking', 'licoes']) if (!Array.isArray(A[k]) || !A[k].length) { console.error(`${origemJson}: falta o array "${k}"`); process.exit(1); }
const LETRAS = ['A', 'B', 'C', 'D', 'E'];
for (const l of A.licoes) if (typeof l.id !== 'string' || !/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(l.id)) { console.error(`${origemJson}: id de licao invalido (${JSON.stringify(l.id)}): use so letras, numeros, - e _`); process.exit(2); }
{ const vistos = new Set(); for (const l of A.licoes) { if (vistos.has(l.id)) { console.error(`${origemJson}: id de licao DUPLICADO (${l.id}): cada licao precisa de um id unico`); process.exit(2); } vistos.add(l.id); } }
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nomeCurso = NOME_CURSO;
const aviso = [];
const MODELO = path.basename(arqJson).startsWith('_modelo-'), EXTERNO = !dentroDe(arqJson, DIR_APOSTILAS);
// Banco de teste, modelo (_modelo-*) e JSON externo nunca geram PDF "final": rotulo visivel no PDF e proibido gravar em material-premium.
const ROTULO_TESTE = [TESTE && ' · BANCO DE TESTE', (MODELO || EXTERNO) && ' · MODELO/TESTE'].filter(Boolean).join('');
if (process.argv.includes('--pdf') && (MODELO || EXTERNO) && !saidaOpt) { console.error('JSON de modelo (_modelo-*) ou externo nao gera PDF em material-premium: use --saida <pasta> (o PDF leva o rotulo MODELO/TESTE)'); process.exit(1); }

// ---------- confere os trechos de lei nas fontes (fontes/leis/*.html) ----------
// Regra: o trecho tem de ser um dispositivo COMPLETO (o bloco/paragrafo inteiro da fonte, com ou sem o marcador "Art. N"/"§ N"/"I -" e sem a nota
// final "(Redacao dada...)") de UM arquivo de fonte. So se normaliza espaco/quebra (e NFC); pontuacao e numeros nao sao relaxados. Pedaco do meio
// ("saude") e trecho que cruza dois paragrafos sao rejeitados. Se a "ref" cita "Art. N", o bloco tem de estar sob o artigo N da fonte.
const norma = (s) => s.replace(/\s+/g, ' ').trim().normalize('NFC');
const ENT = { nbsp: ' ', amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", ordm: 'º', ordf: 'ª', sect: '§', ndash: '–', mdash: '—', laquo: '«', raquo: '»', ldquo: '“', rdquo: '”', lsquo: '‘', rsquo: '’', hellip: '…', deg: '°', middot: '·', bull: '•', ccedil: 'ç', Ccedil: 'Ç', ntilde: 'ñ', copy: '©', shy: '' };
for (const [nome, marca] of [['acute', String.fromCharCode(0x301)], ['grave', String.fromCharCode(0x300)], ['circ', String.fromCharCode(0x302)], ['tilde', String.fromCharCode(0x303)], ['uml', String.fromCharCode(0x308)]]) for (const v of 'aeiouAEIOU') ENT[v + nome] = (v + marca).normalize('NFC');
function decodificar(t) {
  return t.replace(/&(?:#x([0-9a-f]+)|#(\d+)|([a-z][a-z0-9]*));/gi, (m, hex, dec, nome) => {
    if (nome) return Object.hasOwn(ENT, nome) ? ENT[nome] : m;
    const n = hex ? parseInt(hex, 16) : +dec;
    return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : m;
  });
}
// Lista de blocos (paragrafos) do HTML, sem tags e com entidades decodificadas. Tag em linha (a, span, b...) nao separa palavras.
function blocosHtml(h) {
  return h
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(del|s|strike|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ') // tachado (revogado), script e css nao contam
    .replace(/\s+/g, ' ') // quebra de linha do fonte NAO separa paragrafo: so as tags de bloco separam
    .replace(/<\/?(p|div|br|li|ul|ol|tr|td|th|table|h[1-6]|blockquote|section|article|center|hr)\b[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .split('\n').map(l => norma(decodificar(l))).filter(Boolean);
}
// Identificador de artigo completo: numero com ponto de milhar e sufixo (5º-A, 1.045). "Art. 5º-A" NAO e o "Art. 5º".
const ART_NUM = '(\\d+(?:\\.\\d{3})*)[º°]?(?:-([A-Z])(?![A-Za-zÀ-ÿ0-9]))?'; // sufixo (A, B...) so COLADO: 5º-A, 5-A; nunca depois de " - " com espacos
const ART_ABRE = new RegExp('^Art(?:igo)?s?\\.?\\s*' + ART_NUM, 'i');
const idArt = (m) => m[1].replace(/\./g, '') + (m[2] && m[2] === m[2].toUpperCase() ? '-' + m[2] : '');
// Cada bloco leva o artigo em vigor: so abre artigo o bloco que COMECA exatamente com "Art. N" e nao esta dentro de citacao
// (bloco que comeca com aspas, "NR" ou "Redacao dada", e os blocos seguintes ate fechar as aspas, nao contam).
function comArtigo(blocos) {
  let atual = null, emCitacao = false;
  return blocos.map(t => {
    const abre = (t.match(/[“«]/g) || []).length, fecha = (t.match(/[”»]/g) || []).length, retas = (t.match(/"/g) || []).length;
    const comecaCitacao = /^[“«"‘]/.test(t);
    const citado = emCitacao || comecaCitacao || /^(?:NR\b|Redação dada)/i.test(t);
    const m = citado ? null : ART_ABRE.exec(t);
    if (m) atual = idArt(m);
    if (!emCitacao && comecaCitacao && (abre > fecha || retas % 2 === 1)) emCitacao = true;
    else if (emCitacao && (fecha > abre || retas % 2 === 1 || /\bNR\W{0,3}$/.test(t))) emCitacao = false;
    return { t, art: atual, fm: formasCompletas(t) };
  });
}
const MARCA_RE = /^(?:(?:Art(?:igo)?\.?\s*\d+(?:\.\d{3})*[º°]?(?:-[A-Z](?![A-Za-zÀ-ÿ0-9]))?\.?|§\s*\d+[º°]?(?:-[A-Z](?![A-Za-zÀ-ÿ0-9]))?\.?)(?:\s+[-–—](?=\s))?|Parágrafo único\.?(?:\s+[-–—](?=\s))?|[IVXLC]+\s*[-–—]|[a-z]\)|\d+\s*[.)])\s*/;
const NOTA_RE = /\s*\((?:Redação|Incluíd|Vide|Revogad|Vetad|Regulament|Texto|Expressão|Vigência)[^)]*\)\s*$/i;
// com = bloco inteiro (com marcador), sem = bloco sem o marcador de numeracao; ambos tambem sem a nota final "(Redacao dada...)".
function formasCompletas(b) {
  const com = new Set(), sem = new Set();
  const variantes = (base, dest) => { let x = base.trim(); if (x) dest.add(x); while (NOTA_RE.test(x)) { x = x.replace(NOTA_RE, '').trim(); if (x) dest.add(x); } };
  variantes(b, com);
  const corpo = b.replace(MARCA_RE, '');
  if (corpo !== b) variantes(corpo, sem);
  return { com, sem };
}
// Artigos citados na "ref" ("Art. 5º", "Arts. 5º e 6º", "Art. 5º-A"); null se a ref nao cita artigo.
function artigosDaRef(ref) {
  const set = new Set(); let achou = false;
  const ini = new RegExp('\\bArt(?:igo)?s?\\.?\\s*(?=\\d)', 'gi');
  const num = new RegExp(ART_NUM, 'y'), sep = /\s*(,|\be\b|\ba\b|\bao\b|\bat[eé]\b)\s*(?=\d)/iy;
  let m;
  while ((m = ini.exec(ref || ''))) {
    achou = true;
    let pos = m.index + m[0].length, prev = null, intervalo = false;
    for (;;) {
      num.lastIndex = pos; const x = num.exec(ref);
      if (!x) break;
      const id = idArt(x); set.add(id);
      if (intervalo && prev !== null && /^\d+$/.test(id) && /^\d+$/.test(prev) && +id > +prev && +id - +prev <= 500) for (let n = +prev + 1; n < +id; n++) set.add(String(n)); // "Arts. 196 a 200"
      prev = id; pos = num.lastIndex;
      sep.lastIndex = pos; const y = sep.exec(ref);
      if (!y) break; // so continua a lista com "," / "e" / "a" / "ao" / "ate" colados a um numero: "inciso 3" e outros numeros soltos sao ignorados
      intervalo = /^(a|ao|at[eé])$/i.test(y[1]); pos = sep.lastIndex;
    }
  }
  return achou ? set : null;
}
const fontesLei = Array.isArray(A.fontes) ? A.fontes : [];
const BLOCOS = new Map(); // nome do arquivo -> [{ t, art }]
for (const f of fontesLei) {
  if (typeof f !== 'string' || !/\.html?$/i.test(f)) { console.error(`Fonte ${JSON.stringify(f)}: so e possivel conferir trechos em arquivos .html (use a versao HTML da Camara em fontes/leis)`); process.exit(2); }
  const arq = dentroDe(path.join(DIR_LEIS, f), DIR_LEIS);
  if (!arq) { console.error(`Fonte ${f}: caminho fora de fontes/leis (nao permitido)`); process.exit(2); }
  if (!fs.existsSync(arq)) { console.error(`Fonte de lei inexistente em fontes/leis: ${f}`); process.exit(2); }
  const bruto = fs.readFileSync(arq);
  // UTF-8 estrito primeiro; so se o arquivo nao for UTF-8 valido tenta windows-1252 (e avisa qual foi usada).
  let texto, cod = 'utf-8';
  try { texto = new TextDecoder('utf-8', { fatal: true }).decode(bruto); }
  catch { texto = new TextDecoder('windows-1252').decode(bruto); cod = 'windows-1252'; }
  console.log(`Fonte ${f}: lida como ${cod}`);
  if (texto.includes(String.fromCharCode(0xfffd))) aviso.push(`fonte ${f} contem U+FFFD (caractere de substituicao): trechos com acento nesse ponto nao vao conferir`);
  BLOCOS.set(f, comArtigo(blocosHtml(texto)));
}
if (fontesLei.length && !A.limiteFonte) { console.error('Defina limiteFonte no JSON quando houver "fontes" de lei (diga a lei e a data da versao conferida)'); process.exit(2); }
const falhas = [];
const conferidos = { n: 0, refOk: 0, refArtSo: 0, refSem: [], arquivos: new Set(), semMarcador: [], conceitos: [] };
const statsLicao = {}; // por licao: numeros usados na secao Limites da amostra
for (const l of A.licoes) {
  const st = statsLicao[l.id] = { n: 0, refOk: 0, refArtSo: 0, refSem: 0, semMarcador: 0, conceitos: 0, arquivos: new Set() };
  for (const p of (l.pontos || [])) {
    if (!p.trecho) { if (!p.conceito) falhas.push(`${l.id} / ${p.ref}: sem "trecho" para conferir (use "conceito": true so para ponto sem texto de lei)`); else { st.conceitos++; conferidos.conceitos.push(`${l.id} / ${p.ref}`); } continue; }
    if (!fontesLei.length) { falhas.push(`${l.id} / ${p.ref}: tem "trecho" mas o JSON nao lista "fontes" (arquivos de fontes/leis)`); continue; }
    // Qual arquivo: o ponto diz em "fonte"; se so ha uma fonte listada, e ela.
    const f = p.fonte || (fontesLei.length === 1 ? fontesLei[0] : null);
    if (!f) { falhas.push(`${l.id} / ${p.ref}: ha varias "fontes"; diga em qual arquivo esta o trecho com "fonte": "<arquivo>"`); continue; }
    if (!BLOCOS.has(f)) { falhas.push(`${l.id} / ${p.ref}: "fonte" ${JSON.stringify(f)} nao esta na lista "fontes" do JSON`); continue; }
    const t = norma(p.trecho);
    const achados = BLOCOS.get(f).filter(b => b.fm.com.has(t) || b.fm.sem.has(t));
    if (!achados.length) { falhas.push(`${l.id} / ${p.ref}: trecho NAO e um dispositivo completo (paragrafo inteiro, literal) de ${f}: pedaco do meio, texto alterado ou que cruza dois artigos/paragrafos nao passam: "${p.trecho}"`); continue; }
    const arts = artigosDaRef(p.ref);
    // Sem o marcador (Art./§/inciso) a numeracao do original foi descartada: so aceito se a ref trouxer artigo E caput/§/inciso/alinea.
    const semMarc = achados.every(b => !b.fm.com.has(t));
    if (semMarc && !(arts && /(caput|§|par[aá]grafo|inciso|inc\.|al[ií]nea)/i.test(p.ref))) { falhas.push(`${l.id} / ${p.ref}: o trecho esta sem o marcador de numeracao (Art./§/inciso) do original; inclua o marcador no trecho ou faca a ref citar artigo e caput/§/inciso/alinea`); continue; }
    if (arts) {
      if (!achados.some(b => b.art && arts.has(b.art))) { falhas.push(`${l.id} / ${p.ref}: o trecho existe em ${f}, mas sob o Art. ${[...new Set(achados.map(b => b.art))].join(' / ')}, e a ref cita Art. ${[...arts].join(', ')}`); continue; }
      // trecho sem marcador: so o NUMERO DO ARTIGO foi conferido (o dispositivo caput/§/inciso da ref nao)
      if (semMarc) { conferidos.refArtSo++; st.refArtSo++; } else { conferidos.refOk++; st.refOk++; }
    } else { conferidos.refSem.push(`${l.id} / ${p.ref}`); st.refSem++; }
    if (semMarc) { conferidos.semMarcador.push(`${l.id} / ${p.ref}`); st.semMarcador++; }
    conferidos.n++; st.n++; conferidos.arquivos.add(f); st.arquivos.add(f);
  }
}
if (falhas.length) { console.error('TRECHOS NAO CONFEREM COM A FONTE:\n- ' + falhas.join('\n- ')); process.exit(2); }
if (conferidos.n) console.log(`Trechos de lei conferidos: ${conferidos.n} (dispositivo completo, literal) contra ${[...conferidos.arquivos].join(', ')}; ref de artigo verificada em ${conferidos.refOk}; artigo conferido mas dispositivo (caput/§/inciso) NAO conferido em ${conferidos.refArtSo}; ref NAO verificada em ${conferidos.refSem.length}${conferidos.refSem.length ? ': ' + conferidos.refSem.join('; ') : ''}`);
if (conferidos.semMarcador.length) console.log(`Trecho SEM marcador de numeracao (Art./§/inciso): ${conferidos.semMarcador.length}: ${conferidos.semMarcador.join('; ')}`);
if (conferidos.conceitos.length) console.log(`Pontos "conceito" (explicacao do autor, SEM trecho de lei verificado): ${conferidos.conceitos.length}: ${conferidos.conceitos.join('; ')}`);

// nivel precisa estar em 0..3
for (const x of [...A.ranking, ...A.licoes]) if (![0, 1, 2, 3].includes(x.nivel)) { console.error(`nivel invalido (${x.nivel}) em: ${x.rotulo || x.titulo}`); process.exit(2); }
for (const l of A.licoes) for (const k of ['id', 'titulo', 'intro', 'macete']) if (!l[k]) { console.error(`licao ${l.id || '?'}: falta "${k}"`); process.exit(2); }
for (const l of A.licoes) for (const k of ['pontos', 'pegadinhas', 'cobra']) if (!Array.isArray(l[k])) { console.error(`licao ${l.id}: falta o array "${k}"`); process.exit(2); }
for (const l of A.licoes) if (!l.mapa || !l.mapa.centro || !Array.isArray(l.mapa.ramos)) { console.error(`licao ${l.id}: falta "mapa" (centro + ramos)`); process.exit(2); }

// ---------- radar e questoes reais (curso/) ----------
const RADAR = lerJsonObrigatorio('curso/radar-banca.json', 'radar da banca');
const radarAp = (RADAR.apostilas || []).find(a => a.id === A.id);
if (radarAp && radarAp.numero !== NUM.numero) aviso.push(`o numero da apostila no JSON (${NUM.numero}) difere do radar (${radarAp.numero}) para "${A.id}"`);
if (!radarAp) aviso.push(`"${A.id}" nao consta em curso/radar-banca.json: sem contagens do radar nas licoes`);
const topicoRadar = new Map((radarAp?.topicos || []).map(t => [t.topico, t]));
// --questoes <arquivo.json> (so com --teste): outro banco no mesmo formato; o padrao e curso/questoes-anteriores.json.
const BANCO_JSON = lerJsonObrigatorio(arqQuestoes || 'curso/questoes-anteriores.json', 'questoes reais transcritas das provas');
const BANCO = BANCO_JSON.questoes || [];
const indiceCorreta = (q) => LETRAS.indexOf(q.gabaritoOficial);
// Questao usavel no treino: gabarito oficial em letra valida, dentre as alternativas. As 5 especialidades repetem as mesmas questoes (mesmo "grupo"): fica uma so.
const valida = (q) => q.alvo === true && indiceCorreta(q) >= 0 && indiceCorreta(q) < (q.alternativas || []).length;
const topicosUsados = new Set(A.licoes.flatMap(l => l.topicosBanco || []));
// Agrupa TODAS as copias (uma por especialidade) de cada "grupo" e faz as checagens no grupo INTEIRO (antes de filtrar por topico). O grupo e
// descartado se qualquer copia estiver anulada/sem gabarito valido ou se o TEXTO da alternativa certa divergir entre as copias; so entra o consistente.
const grupos = new Map();
for (const q of BANCO) {
  if (q.alvo !== true) continue;
  const chave = q.grupo || `${q.prova}#${q.num}`;
  if (!grupos.has(chave)) grupos.set(chave, []);
  grupos.get(chave).push(q);
}
let anuladas = 0, semGabarito = 0, divergentes = 0;
const unicas = new Map();
for (const [chave, copias] of grupos) {
  const rep1 = copias.find(q => topicosUsados.has(q.topico));
  if (!rep1) continue; // grupo de topico que nenhuma licao usa: fora (as checagens abaixo ja olham TODAS as copias do grupo)
  if (copias.some(q => q.gabaritoOficial === 'ANULADA')) { anuladas++; continue; }
  if (copias.some(q => !valida(q))) { semGabarito++; continue; }
  // As copias podem ter as alternativas embaralhadas (a LETRA muda de uma especialidade para outra): divergencia = o TEXTO da alternativa certa difere.
  if (new Set(copias.map(q => norma(q.alternativas[indiceCorreta(q)]))).size > 1) { divergentes++; continue; }
  unicas.set(chave, rep1);
}
const porRecencia = (a, b) => b.ano - a.ano || a.num - b.num;
const usados = new Set();
const treinoPorLicao = {};
const dispPorLicao = {};
for (const l of A.licoes) {
  if (!Array.isArray(l.topicosBanco) || !l.topicosBanco.length) { aviso.push(`licao "${l.id}" sem "topicosBanco": sai sem questoes das provas`); treinoPorLicao[l.id] = []; dispPorLicao[l.id] = 0; continue; }
  const doTopico = [...unicas.values()].filter(q => l.topicosBanco.includes(q.topico)).sort(porRecencia);
  dispPorLicao[l.id] = doTopico.length;
  const n = l.qtdQuestoes || 8;
  treinoPorLicao[l.id] = doTopico.filter(q => !usados.has(q)).slice(0, n);
  if (treinoPorLicao[l.id].length < n && doTopico.length) aviso.push(`licao "${l.id}": so ${treinoPorLicao[l.id].length} questao(oes) reais ainda nao usadas por outras licoes (pedido: ${n}; topicos podem ser compartilhados)`);
  treinoPorLicao[l.id].forEach(q => usados.add(q));
}
const sobras = A.licoes.map(l => [...unicas.values()].filter(q => (l.topicosBanco || []).includes(q.topico) && !usados.has(q)).sort(porRecencia));
const simulado = [];
for (let i = 0; simulado.length < 20 && sobras.some(s => s.length); i++) { const s = sobras[i % sobras.length]; const q = s.shift(); if (q && !simulado.includes(q)) simulado.push(q); }
if (simulado.length < 5) aviso.push(`simulado com apenas ${simulado.length} questao(oes) (sobras das provas reais): a secao sai${simulado.length ? ' curta' : ' omitida'}`);

// ---------- html ----------
const rotFonte = (q) => TESTE ? 'QUESTÃO DE TESTE (banco fictício)' : `FURB · ${q.edital}${q.ano ? ' (' + q.ano + ')' : ''} · questão ${q.num}`;
const GAB = TESTE ? 'Gabarito (teste)' : 'Gabarito oficial';
function htmlQuestao(q, num, comGabarito) {
  const ic = indiceCorreta(q);
  const alts = q.alternativas.map((a, i) => `<li${comGabarito && i === ic ? ' class="certa"' : ''}><b>${LETRAS[i]})</b> ${esc(a)}</li>`).join('');
  const base = q.textoBase ? `<div class="tb">${esc(q.textoBase).replace(/\n/g, '<br>')}</div>` : '';
  const gab = comGabarito ? `<div class="grava"><b>✅ ${GAB}:</b> (${LETRAS[ic]}) ${esc(q.alternativas[ic])}</div>${q.alteradoAposPreliminar ? '<div class="peg">O gabarito mudou depois do preliminar; vale o definitivo.</div>' : ''}` : '';
  return `<li class="q" value="${num}"><div class="fonteq">${esc(rotFonte(q))}</div>${base}<div class="enun">${esc(q.enunciado).replace(/\n/g, '<br>')}</div><ol class="alts" type="A">${alts}</ol>${gab}</li>`;
}
const ROT = { 3: 'Alta incidência', 2: 'Média', 1: 'Baixa', 0: 'Não apareceu na amostra' };
const htmlTabela = (t) => t ? `<div class="tw"><table><caption>${esc(t.titulo)}</caption><thead><tr>${t.cab.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.linhas.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';
const htmlMapa = (m) => `<figure class="mapa"><div class="centro">${esc(m.centro)}</div><div class="ramos">${m.ramos.map((r, i) => `<div class="ramo c${(i % 5) + 1}"><div class="rt">${esc(r.t)}</div><ul>${r.f.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>`).join('')}</div><figcaption>Mapa mental: ${esc(m.centro)}</figcaption></figure>`;
const ranking = `<div class="tw"><table><caption>Ranking dos assuntos</caption><thead><tr><th>Assunto</th><th>Incidência</th></tr></thead><tbody>${[...A.ranking].sort((a, b) => b.nivel - a.nivel).map(r => `<tr><td>${esc(r.rotulo)}</td><td class="n"><span class="bar n${r.nivel}" style="width:${r.nivel * 34 + 8}px"></span>${r.nivel === 3 ? '<b class="alta">Alta incidência</b>' : esc(ROT[r.nivel])}</td></tr>`).join('')}</tbody></table></div>`;
// Radar da licao: tudo vem de curso/radar-banca.json (rotulo, questoesUnicas, porEdicao); cada topico e contado UMA vez no documento (repetido em outra licao so remete a primeira).
const radarVisto = new Map();
function htmlRadar(l, k) {
  const itens = [];
  for (const cod of new Set(l.topicosBanco || [])) {
    const t = topicoRadar.get(cod);
    if (!t) continue;
    if (radarVisto.has(cod)) { itens.push(`${esc(t.rotulo || cod)}: já contado na Lição ${radarVisto.get(cod)}`); continue; }
    radarVisto.set(cod, k + 1);
    const ed = Object.entries(t.porEdicao || {}).map(([e, n]) => `${esc(e)}: ${esc(n)}`).join('; ');
    itens.push(`${esc(t.rotulo || cod)}: ${esc(t.questoesUnicas ?? '?')} questão(ões) única(s)${ed ? ' (' + ed + ')' : ''}`);
  }
  if (!itens.length) return '';
  return `<div class="box cai"><b>📡 No radar da banca (curso/radar-banca.json):</b><ul>${itens.map(i => `<li>${i}</li>`).join('')}</ul><span class="sub">Esta contagem vem do radar. As questões listadas abaixo vêm do banco filtrado (só o cargo-alvo, sem anuladas nem divergentes) e podem ser em menor número. Amostra pequena: tendência, não garantia.</span></div>`;
}

const statsJson = (l) => { const st = statsLicao[l.id]; return JSON.stringify({ n: st.n, refOk: st.refOk, refArtSo: st.refArtSo, refSem: st.refSem, semMarcador: st.semMarcador, conceitos: st.conceitos, arquivos: [...st.arquivos], q: treinoPorLicao[l.id].length }).replace(/-/g, '\\u002d').replace(/>/g, '\\u003e'); };
const licoes = A.licoes.map((l, k) => `<!--licao:${k}--><!--stats:${k}:${statsJson(l)}--><section id="l-${esc(l.id)}"><h2>Lição ${k + 1}: ${esc(l.titulo)}</h2>
<p><span class="nivel n${l.nivel}">${l.nivel === 3 ? 'Alta incidência' : l.nivel === 0 ? ROT[0] : 'Incidência ' + ROT[l.nivel].toLowerCase()}</span></p>
${htmlRadar(l, k)}
<div class="box">${esc(l.intro)}</div>
<h3>📖 ${esc(A.rotuloPontos || 'O que a lei diz (e o que isso significa)')}</h3>
${l.pontos.map(p => `<div class="ponto"><div class="ref">${esc(p.ref)}</div>${!p.trecho ? '<span class="selo">explicação do autor, sem trecho de lei conferido</span>' : ''}${p.trecho ? `<blockquote class="trecho">“${esc(p.trecho)}”</blockquote>` : ''}<p>${esc(p.texto)}</p></div>`).join('')}
${l.tabela ? `<h3>📊 Quadro para decorar</h3>${htmlTabela(l.tabela)}` : ''}
<div class="box dica"><b>🔑 Macete.</b> ${esc(l.macete)}</div>
<h3>🚩 Pegadinhas desta lição</h3><ul class="peglista">${l.pegadinhas.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
<h3>🎯 Como a banca cobra</h3><ul class="cobra">${l.cobra.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
<h3>🧠 Mapa mental</h3>${htmlMapa(l.mapa)}
<h3>✍️ ${TESTE ? 'Questões de teste (banco fictício)' : 'Questões das provas anteriores (FURB)'}</h3>${treinoPorLicao[l.id].length ? `<p class="sub">${TESTE ? 'Questões de teste, de um banco fictício.' : 'Questões reais, com o gabarito oficial.'} Marque antes de olhar a resposta verde.</p><ol class="ql">${treinoPorLicao[l.id].map((q, i) => htmlQuestao(q, i + 1, true)).join('')}</ol>` : '<p class="sub">Nenhuma questão classificada neste assunto nas provas anteriores analisadas.</p>'}</section><!--/licao:${k}-->`).join('\n');

const sumario = A.licoes.map((l, k) => `<li><a href="#l-${esc(l.id)}">Lição ${k + 1}: ${esc(l.titulo)}</a></li>`).join('');
const temSim = simulado.length >= 5;
const simHtml = simulado.map((q, i) => htmlQuestao(q, i + 1, false)).join('');
const simGab = simulado.map((q, i) => `<tr><td class="n">${i + 1}</td><td class="n"><b>${LETRAS[indiceCorreta(q)]}</b></td><td>${esc(q.alternativas[indiceCorreta(q)])}</td></tr>`).join('');
const nQuestoes = Object.values(treinoPorLicao).reduce((x, y) => x + y.length, 0);
const bancoAviso = BANCO_JSON.aviso ? esc(BANCO_JSON.aviso) : '';
const limitesHtml = secaoLimites({
  limiteFonte: A.limiteFonte,
  trechos: { n: conferidos.n, refOk: conferidos.refOk, refArtSo: conferidos.refArtSo, refSem: conferidos.refSem.length, semMarcador: conferidos.semMarcador.length, arquivos: [...conferidos.arquivos] },
  conceitos: conferidos.conceitos.length,
  radar: !!radarAp,
  questoes: { n: nQuestoes + simulado.length, teste: TESTE, bancoAviso: BANCO_JSON.aviso, excl: { anuladas, semGabarito, divergentes } },
  amostra: false,
}, esc);
const bannerTeste = ROTULO_TESTE ? `<div class="box atencao"><b>${esc(ROTULO_TESTE.replace(/^ · /, ''))}.</b> Esta versão ${TESTE ? 'foi gerada com um banco de questões alternativo' : 'foi gerada a partir de um modelo ou JSON externo'}, só para teste. Não é material final.</div>` : '';
const hashIn = hashEntradas(arqJson, arqQuestoes, fontesLei);
const avisoRadar = RADAR.aviso ? `<div class="box cai"><b>⚠️ Amostra pequena.</b> ${esc(RADAR.aviso)}</div>` : '';

const CSS = CSS_BASE + cssPaginas(`${NUM.rotulo} · ${A.titulo}${ROTULO_TESTE}`) + `
.capa{border:3px solid var(--azul);border-radius:12px;padding:22px;margin:8px 0 22px;background:var(--azul-f)}.capa h1{border:0;font-size:32px;margin:0}.capa .sub1{margin:6px 0 0}
.nivel{display:inline-block;font-weight:700;border-radius:10px;padding:2px 12px;font-size:13px;background:var(--soft);color:var(--mut)}.nivel.n3{background:var(--lar-f);color:var(--lar);border:1px solid var(--lar-b)}.nivel.n2{background:var(--azul-f);color:var(--azul)}
.selo{display:inline-block;font-size:11px;color:var(--mut);border:1px solid var(--bd);border-radius:8px;padding:0 7px;margin:2px 0}.ponto{margin:12px 0;break-inside:avoid}.ponto .ref{font-weight:700;color:var(--roxo)}.trecho{margin:4px 0;padding:6px 12px;border-left:4px solid var(--azul);background:var(--soft);font-style:italic}.ponto p{margin:4px 0 0}
.peglista li{color:var(--verm);margin:4px 0}
.fonteq{font-size:12px;color:var(--mut);font-weight:600}.tb{border:1px solid var(--bd);background:var(--soft);padding:6px 10px;margin:4px 0;font-size:14px;border-radius:4px}
`;
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(TITULO_NUM)} - ${esc(nomeCurso)}${esc(ROTULO_TESTE)}</title><style>${CSS}</style></head><body>
<!--entradas:${hashIn};teste:${TESTE ? 1 : 0}-->
<header class="capa"><h1>${esc(NUM.rotulo)} — ${esc(A.titulo)}</h1><p class="sub1">${esc(A.subtitulo)}</p></header>
<main>
<!--banner-->${bannerTeste}<!--/banner--><div class="box"><b>Como usar esta apostila.</b><ul>${A.comoUsar.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
<!--avisoradar-->${avisoRadar}<!--/avisoradar-->
<div class="leg"><b>Cores:</b> <span class="cz">azul = conceito</span><span class="cv">verde = resposta para gravar</span><span class="cl">laranja = alta incidência</span><span class="cr">vermelho = pegadinha</span><span class="cx">roxo = artigo ou número</span></div>
<nav class="sum" aria-label="Sumário"><b>Sumário</b><ol>${sumario}${temSim ? '<li><a href="#simulado">Simulado</a></li>' : ''}<li><a href="#revisao">Revisão de véspera</a></li><li><a href="#limites">Limites desta análise</a></li></ol></nav>
<section id="ranking"><h2>O que mais apareceu em ${esc(A.titulo)} na análise da banca</h2>${ranking}</section>
${licoes}
${temSim ? `<section id="simulado"><h2>Simulado de ${esc(A.titulo)}</h2><p class="sub">${simulado.length} ${TESTE ? 'questões de teste' : 'questões reais das provas anteriores'} (as que não entraram nas lições). Faça sem consultar e confira o gabarito logo abaixo.</p><ol class="ql">${simHtml}</ol>
<h3>${GAB}</h3><div class="tw"><table><thead><tr><th>Nº</th><th>Resposta</th><th>Alternativa correta</th></tr></thead><tbody>${simGab}</tbody></table></div></section>` : ''}
<section id="revisao"><h2>Revisão de véspera</h2><p class="sub">Uma olhada rápida em cada mapa e nos macetes. Se um ramo não vier à cabeça, volte à lição.</p>${A.licoes.map(l => `<h3>${esc(l.titulo)}</h3>${htmlMapa(l.mapa)}<div class="box dica"><b>🔑</b> ${esc(l.macete)}</div>`).join('')}</section>
${limitesHtml}
</main><footer>${esc(nomeCurso)} · material de estudo de uso pessoal.${esc(ROTULO_TESTE)}</footer></body></html>`;

const base = path.basename(A.arquivoPdf, '.pdf');
const dirHtml = saidaOpt || path.join(RAIZ, 'rascunho', 'apostila');
fs.mkdirSync(dirHtml, { recursive: true });
const arqHtml = path.join(dirHtml, `${base}.html`);
fs.writeFileSync(arqHtml, html);
console.log('HTML:', arqHtml, `(${Math.round(html.length / 1024)} KB, ${A.licoes.length} lições, ${Object.values(treinoPorLicao).reduce((s, x) => s + x.length, 0)} questões nas lições, ${simulado.length} no simulado)`);
if (anuladas || semGabarito || divergentes) console.log(`(questões únicas dos tópicos usados que ficaram de fora: ${anuladas} anulada(s); ${semGabarito} sem gabarito em letra válida; ${divergentes} descartada(s) por divergência de gabarito entre as cópias)`);
for (const a of aviso) console.warn('AVISO:', a);

// HTML e do PDF: o PDF numerado (Apostila 0N · titulo · Pagina X de Y) vai para material-premium (ou --saida); com --sem-rodape
// (navegador antigo, so conferencia) vai com sufixo -SEM-NUMERACAO, fora de material-premium e sem sha.
if (process.argv.includes('--pdf')) {
  const nomePdf = SEM_RODAPE ? A.arquivoPdf.replace(/\.pdf$/i, '-SEM-NUMERACAO.pdf') : A.arquivoPdf;
  const dirPdf = saidaOpt || (SEM_RODAPE ? path.join(RAIZ, 'rascunho', 'apostila') : path.join(RAIZ, 'material-premium'));
  const pdf = path.join(dirPdf, nomePdf);
  const r = htmlParaPdf(arqHtml, pdf, { semRodape: SEM_RODAPE, semConferir: SEM_CONFERIR, rotulo: `${NUM.rotulo} · ${A.titulo}${ROTULO_TESTE}` });
  if (!r) process.exit(1);
  const shaOk = r.comRodape && r.conferido && !SEM_RODAPE && !TESTE && !MODELO && !EXTERNO;
  if (process.argv.includes('--sha') && !shaOk) console.warn('AVISO: --sha ignorado (so apostila normal, com rodape conferido no PDF, sem --teste/--sem-rodape/_modelo/JSON externo).');
  if (shaOk && (!saidaOpt || process.argv.includes('--sha'))) fs.writeFileSync(path.join(dirPdf, `${base}.pdf-origem.sha256`), crypto.createHash('sha256').update(html).digest('hex') + '\n');
  console.log('PDF:', pdf, `(${Math.round(fs.statSync(pdf).size / 1024)} KB)${r.comRodape ? '' : ' SEM rodape numerado: nao e versao final'}`);
}
