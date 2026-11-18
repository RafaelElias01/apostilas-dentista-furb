// Gera site/dados/questoes.json e site/dados/radar.json (enxutos) a partir de
// curso/questoes-anteriores.json e curso/radar-banca.json. Sem dependências.
// Uso: node scripts/gerar-dados-site.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const ler = (p) => JSON.parse(readFileSync(join(raiz, p), 'utf8'));
const saida = join(raiz, 'site', 'dados');

const qs = ler('curso/questoes-anteriores.json');
const radar = ler('curso/radar-banca.json');

// rótulos de tópico vindos do radar (nada inventado: sem rótulo, o site mostra o código)
const letras = ['A', 'B', 'C', 'D', 'E'];
const problemas = [];
const mapaTopicos = new Map(); // Map: aceita qualquer chave (ex.: "__proto__") sem efeito colateral
for (const a of radar.apostilas || []) {
  for (const t of a.topicos || []) {
    if (mapaTopicos.has(t.topico) && mapaTopicos.get(t.topico) !== t.rotulo) {
      problemas.push(`tópico ${t.topico}: rótulos divergentes entre apostilas ("${mapaTopicos.get(t.topico)}" x "${t.rotulo}")`);
    }
    mapaTopicos.set(t.topico, t.rotulo);
  }
}
const topicos = Object.fromEntries(mapaTopicos);
const idsVistos = new Set();
const questoes = qs.questoes.map((q) => {
  const idq = `${q.prova}#${q.num}`;
  if (idsVistos.has(idq)) problemas.push(`${idq}: id duplicado`);
  idsVistos.add(idq);
  const texto = (v) => typeof v === 'string' && v.trim() !== '';
  if (!texto(q.prova)) problemas.push(`${idq}: prova ausente`);
  if (q.num == null || q.num === '') problemas.push(`${idq}: num ausente`);
  if (!Number.isInteger(q.ano)) problemas.push(`${idq}: ano inválido (${q.ano})`);
  if (!texto(q.topico)) problemas.push(`${idq}: topico ausente ou não é texto`);
  if (!texto(q.secao)) problemas.push(`${idq}: secao ausente`);
  if (typeof q.enunciado !== 'string' || !q.enunciado.trim()) problemas.push(`${idq}: enunciado vazio`);
  if (q.fonte && (typeof q.fonte.arquivo !== 'string' || !q.fonte.arquivo.trim())) problemas.push(`${idq}: fonte sem arquivo`);
  const g = q.gabaritoOficial;
  if (!(letras.includes(g) || g === 'ANULADA' || g == null)) problemas.push(`${q.prova}#${q.num}: gabarito ${g}`);
  if (!Array.isArray(q.alternativas) || q.alternativas.length < 2 || q.alternativas.length > letras.length) {
    problemas.push(`${q.prova}#${q.num}: alternativas inválidas (${Array.isArray(q.alternativas) ? q.alternativas.length : 'não é lista'})`);
  } else if (letras.includes(g) && letras.indexOf(g) >= q.alternativas.length) {
    problemas.push(`${q.prova}#${q.num}: gabarito ${g} fora das alternativas`);
  }
  if (Array.isArray(q.alternativas) && q.alternativas.some((a) => !texto(a))) problemas.push(`${idq}: alternativa vazia ou que não é texto`);
  const o = {
    id: `${q.prova}#${q.num}`,
    prova: q.prova,
    ano: q.ano,
    sec: q.secao,
    n: q.num,
    en: q.enunciado,
    alt: q.alternativas,
    g: g ?? null, // letra, "ANULADA" ou null (sem gabarito)
    gr: q.grupo,
    top: q.topico,
    mc: q.metodoClassificacao,
  };
  if (q.alvo) o.alvo = 1;
  if (q.textoBase) o.tb = q.textoBase;
  if (q.alteradoAposPreliminar) {
    o.alt2 = 1;
    o.gp = q.gabaritoPreliminar ?? null;
  }
  if (q.fonte) o.f = q.fonte.pagina != null && q.fonte.pagina !== '' ? `${q.fonte.arquivo} (p. ${q.fonte.pagina})` : `${q.fonte.arquivo}`;
  return o;
});

// alvo da prova: vale se alguma questão for alvo; se as questões da mesma prova divergirem, aborta
const alvosPorProva = new Map();
for (const q of qs.questoes) {
  if (!alvosPorProva.has(q.prova)) alvosPorProva.set(q.prova, new Set());
  alvosPorProva.get(q.prova).add(!!q.alvo);
}
for (const [pid, v] of alvosPorProva) if (v.size > 1) problemas.push(`prova ${pid}: questões com "alvo" divergente`);
const provas = (radar.provas || []).map((p) => ({
  id: p.id,
  municipio: p.municipio,
  ano: p.ano,
  edital: p.edital,
  cargo: p.cargo,
  alvo: !!(alvosPorProva.get(p.id) || new Set()).has(true),
}));
// toda prova vem do radar: ids únicos, campos completos, e cada questão aponta para uma prova existente
const idsProvas = new Set();
for (const p of provas) {
  if (typeof p.id !== 'string' || !p.id.trim()) { problemas.push('prova do radar sem id'); continue; }
  if (idsProvas.has(p.id)) problemas.push(`prova ${p.id}: id duplicado no radar`);
  idsProvas.add(p.id);
  for (const campo of ['municipio', 'edital', 'cargo']) {
    if (typeof p[campo] !== 'string' || !p[campo].trim()) problemas.push(`prova ${p.id}: ${campo} ausente`);
  }
  if (!Number.isInteger(p.ano)) problemas.push(`prova ${p.id}: ano inválido`);
}
for (const q of qs.questoes) {
  if (!idsProvas.has(q.prova)) problemas.push(`${q.prova}#${q.num}: prova não existe em radar.provas`);
}

// lista única de tópicos para o filtro: código, rótulo (do radar, senão o próprio código) e nº de questões
const contagem = new Map();
for (const q of questoes) {
  if (typeof q.top === 'string' && q.top && !q.top.includes('?')) contagem.set(q.top, (contagem.get(q.top) || 0) + 1);
}
const topicosLista = [...contagem.entries()]
  .map(([c, n]) => ({ c, r: Object.hasOwn(topicos, c) && topicos[c] ? topicos[c] : c, n }))
  .sort((a, b) => (a.c < b.c ? -1 : a.c > b.c ? 1 : 0));

// valida tudo ANTES de gravar: com problema, aborta sem escrever nada
if (problemas.length) {
  console.error('Dados fora do padrão (nada foi gravado):', problemas.join('; '));
  process.exit(1);
}
mkdirSync(saida, { recursive: true });

writeFileSync(
  join(saida, 'questoes.json'),
  JSON.stringify({ aviso: qs.aviso, provas, topicos, topicosLista, questoes }),
);

writeFileSync(
  join(saida, 'radar.json'),
  JSON.stringify({
    geradoEm: radar.geradoEm,
    banca: radar.banca,
    aviso: radar.aviso,
    metodo: radar.metodo,
    edicoesBlumenau: radar.edicoesBlumenau,
    composicaoProvaBlumenau: radar.composicaoProvaBlumenau,
    apostilas: radar.apostilas,
  }),
);

console.log(`questoes.json: ${questoes.length} questões, ${provas.length} provas, ${Object.keys(topicos).length} rótulos de tópico`);
console.log(`radar.json: ${(radar.apostilas || []).length} apostilas`);
