// Testes da logica da aba Concurso do site (site/app.js): resumoChip, parentesesAbertos, prazoMs, partesSP, seloPrazo,
// certameNome e ordenacao; e a paridade de prazoMs entre o site e o monitor (scripts/monitorar-concursos.mjs).
// Rodar: node --test tests/site-concurso.test.mjs   (no Node 24, "node --test tests/" NAO funciona)
// site/app.js e um script de navegador (sem export): as funcoes sao extraidas pelo texto e avaliadas com stubs de txt/h.
// Todos os valores esperados sao instantes absolutos (fuso explicito), entao o resultado nao depende do TZ da maquina.
// Nao grava nada no repositorio nem usa rede.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const APP = path.join(RAIZ, 'site', 'app.js');
const MONITOR = path.join(RAIZ, 'scripts', 'monitorar-concursos.mjs');

const src = fs.readFileSync(APP, 'utf8');
const ini = src.indexOf('const ABREV_CHIP');
const fim = src.indexOf('function desenharCertame');
assert.ok(ini >= 0 && fim > ini, 'bloco ABREV_CHIP..desenharCertame nao encontrado em site/app.js');
const bloco = src.slice(ini, fim);
const mOrd = src.match(/const chave = \(it\) => \{[\s\S]*?\.map\(\(p\) => p\[0\]\);/);
assert.ok(mOrd, 'bloco de ordenacao nao encontrado em site/app.js');
const mNome = src.match(/function certameNome\(it\) \{[\s\S]*?\n\}/);
assert.ok(mNome, 'certameNome nao encontrado em site/app.js');

// stubs equivalentes aos do app.js: txt so aceita texto/numero; h devolve um no simples { tag, attrs, k }
const txt = (v) => (typeof v === 'string' || typeof v === 'number' ? String(v) : '');
const h = (tag, attrs, ...k) => ({ tag, attrs, k });
const site = new Function('txt', 'h',
  `${bloco}\nconst ordenar = (situacao) => { ${mOrd[0]}\n return ordenados; };\n` +
  'return { resumoChip, parentesesAbertos, prazoMs, partesSP, seloPrazo, ordenar };')(txt, h);
const certameNome = new Function('txt', `${mNome[0]}\nreturn certameNome;`)(txt);
const { resumoChip, parentesesAbertos, prazoMs, partesSP, seloPrazo, ordenar } = site;

const monitor = await import(pathToFileURL(MONITOR).href);

const BR = (iso) => Date.parse(`${iso}-03:00`); // instante absoluto em horario de Brasilia
const selo = (encerraEm, agoraIso, extra = {}) => seloPrazo({ encerraEm, ...extra }, BR(agoraIso));
const textoSelo = (s) => ({ data: s.k[0].k[0], falta: s.k[1].k[0], classe: s.attrs.class });

test('resumoChip: corta na 1a frase com " …" e sem ponto devolve inteiro', () => {
  assert.equal(resumoChip('R$ 3.000,00 para 20h. R$ 6.000,00 para 40h.'), 'R$ 3.000,00 para 20h …');
  assert.equal(resumoChip('Frase unica.'), 'Frase unica');
  assert.equal(resumoChip('R$ 100,00 (PENDENTE)'), 'R$ 100,00 (PENDENTE)');
  assert.equal(resumoChip(''), '');
  assert.equal(resumoChip(null), '');
  assert.equal(resumoChip('  texto  '), 'texto');
});

test('resumoChip: mantem parenteses e nao corta dentro deles', () => {
  const v = 'R$ 5.000,00 (20h semanais) e R$ 10.000,00 (40h semanais), conforme opção do candidato';
  assert.equal(resumoChip(v), v);
  assert.equal(resumoChip('R$ 9.885,71 (vencimento. Ver anexo II)'), 'R$ 9.885,71 (vencimento. Ver anexo II)');
  assert.equal(resumoChip('Texto (a) fecha. Depois.'), 'Texto (a) fecha …');
  assert.equal(resumoChip('Sobra ) aqui. Depois.'), 'Sobra ) aqui …');
  assert.equal(resumoChip('Graduação (Profa. Maria). Outra.'), 'Graduação (Profa. Maria) …');
});

test('resumoChip: abreviacoes (Prof./Profa./Aprox./Ltda./Cia./S.A./iniciais) nao cortam; "etc." corta', () => {
  assert.equal(resumoChip('Prof. Fulano de Tal. Outra.'), 'Prof. Fulano de Tal …');
  assert.equal(resumoChip('Aprox. R$ 5.000. Outra.'), 'Aprox. R$ 5.000 …');
  assert.equal(resumoChip('Av. Brasil, 10. Tel. 3333. OBS. Ver. Fim.'), 'Av. Brasil, 10 …');
  assert.equal(resumoChip('Srta. Ana. Obs. Nada. Fim.'), 'Srta. Ana …');
  assert.equal(resumoChip('Empresa X Ltda. Outra.'), 'Empresa X Ltda. Outra');
  assert.equal(resumoChip('Empresa X Ltda. Outra coisa. Fim.'), 'Empresa X Ltda. Outra coisa …');
  assert.equal(resumoChip('Banco Y S.A. Contrata. Fim.'), 'Banco Y S.A. Contrata …');
  assert.equal(resumoChip('Cia. Z. Fim.'), 'Cia. Z. Fim');
  assert.equal(resumoChip('J. Silva coordena. Outra.'), 'J. Silva coordena …');
  assert.equal(resumoChip('p. 12 do edital. Outra.'), 'p. 12 do edital …');
  assert.equal(resumoChip('Ver n. 5 do anexo. Outra.'), 'Ver n. 5 do anexo …');
  assert.equal(resumoChip('Prova objetiva, discursiva etc. Mais detalhes no edital.'), 'Prova objetiva, discursiva etc …');
});

test('parentesesAbertos: conta profundidade e ignora ")" sobrando', () => {
  assert.equal(parentesesAbertos(''), 0);
  assert.equal(parentesesAbertos('a (b'), 1);
  assert.equal(parentesesAbertos('a ((b) c'), 1);
  assert.equal(parentesesAbertos('a (b) c'), 0);
  assert.equal(parentesesAbertos(') ) ('), 1);
});

test('prazoMs: so data = 23h59 de Brasilia; hora sem fuso = -03:00; fuso explicito como veio', () => {
  assert.equal(prazoMs('2026-11-30'), Date.parse('2026-11-30T23:59:00-03:00'));
  assert.equal(prazoMs(' 2026-11-30 '), Date.parse('2026-11-30T23:59:00-03:00'));
  assert.ok(prazoMs('2026-11-30') > Date.parse('2026-11-30T22:00:00-03:00'), 'ainda aberto as 22h de 30/11');
  assert.equal(prazoMs('2026-11-30T23:59'), Date.parse('2026-11-30T23:59:00-03:00'));
  assert.equal(prazoMs('2026-11-30T23:59:00'), Date.parse('2026-11-30T23:59:00-03:00'));
  assert.equal(prazoMs('2026-11-30T10:00:00-03:00'), Date.parse('2026-11-30T10:00:00-03:00'));
  assert.equal(prazoMs('2026-11-30T23:59:00Z'), Date.parse('2026-11-30T23:59:00Z'));
  assert.equal(prazoMs('2026-11-30T23:59:00+01:00'), Date.parse('2026-11-30T23:59:00+01:00'));
  // valores absolutos em ms (independem do TZ da maquina)
  assert.equal(prazoMs('2026-11-30'), 1796093940000); // 2026-12-01T02:59:00Z
  assert.equal(prazoMs('2026-11-30T23:59:00Z'), 1796083140000);
});

test('prazoMs: fracoes de segundo com qualquer numero de casas = -03:00', () => {
  assert.equal(prazoMs('2026-11-30T10:00:00.5'), Date.parse('2026-11-30T10:00:00.500-03:00'));
  assert.equal(prazoMs('2026-11-30T10:00:00.123'), Date.parse('2026-11-30T10:00:00.123-03:00'));
  assert.equal(prazoMs('2026-11-30T10:00:00.1234'), Date.parse('2026-11-30T10:00:00.1234-03:00'));
  assert.ok(!Number.isNaN(prazoMs('2026-11-30T10:00:00.123456789')));
});

test('prazoMs: invalidos e nao-texto = NaN', () => {
  for (const v of ['lixo', '', '2026-13-40', null, undefined, 0, 1790000000000, {}, [], true]) {
    assert.ok(Number.isNaN(prazoMs(v)), `esperava NaN para ${JSON.stringify(v)}`);
  }
});

test('partesSP: partes no fuso de Brasilia para um instante absoluto', () => {
  assert.deepEqual(partesSP(Date.parse('2026-12-01T02:30:00Z')), { a: 2026, m: 11, d: 30, hh: '23', mm: '30' });
  assert.deepEqual(partesSP(Date.parse('2026-12-01T03:00:00Z')), { a: 2026, m: 12, d: 1, hh: '00', mm: '00' });
});

test('seloPrazo: texto "Inscrições até dd/mm/aaaa às hhhmm" e dias que faltam', () => {
  let s = textoSelo(selo('2026-11-30', '2026-11-26T12:00:00'));
  assert.equal(s.data, 'Inscrições até 30/11/2026 às 23h59');
  assert.equal(s.falta, 'Faltam 4 dias');
  assert.equal(s.classe, 'cc-selo');
  s = textoSelo(selo('2026-11-30T23:59', '2026-11-26T12:00:00'));
  assert.equal(s.data, 'Inscrições até 30/11/2026 às 23h59');
  s = textoSelo(selo('2026-11-30T18:00:00-03:00', '2026-11-26T12:00:00'));
  assert.equal(s.data, 'Inscrições até 30/11/2026 às 18h');
  s = textoSelo(selo('2026-11-30T21:00:00Z', '2026-11-26T12:00:00'));
  assert.equal(s.data, 'Inscrições até 30/11/2026 às 18h', 'Z convertido para Brasilia');
});

test('seloPrazo: "Faltam 3 dias" ja e urgente; "Termina amanhã"; "Último dia"', () => {
  let s = textoSelo(selo('2026-11-30', '2026-11-27T08:00:00'));
  assert.equal(s.falta, 'Faltam 3 dias');
  assert.equal(s.classe, 'cc-selo urgente');
  s = textoSelo(selo('2026-11-30', '2026-11-29T23:00:00'));
  assert.equal(s.falta, 'Termina amanhã');
  s = textoSelo(selo('2026-11-30', '2026-11-30T00:05:00'));
  assert.equal(s.falta, 'Último dia');
  assert.equal(s.classe, 'cc-selo urgente');
});

test('seloPrazo: meia-noite vira dia anterior as 23h59 (inclusive na virada do mes/ano)', () => {
  let s = textoSelo(selo('2026-12-01T00:00', '2026-11-26T12:00:00'));
  assert.equal(s.data, 'Inscrições até 30/11/2026 às 23h59');
  assert.equal(s.falta, 'Faltam 4 dias');
  s = textoSelo(selo('2027-01-01T00:00:00-03:00', '2026-12-30T12:00:00'));
  assert.equal(s.data, 'Inscrições até 31/12/2026 às 23h59');
  assert.equal(s.falta, 'Termina amanhã');
});

test('seloPrazo: destaque sem data = selo vermelho sem data; sem destaque e sem data = null', () => {
  const s = seloPrazo({ destaque: 'prazo-inscricao' }, BR('2026-11-26T12:00:00'));
  assert.equal(s.attrs.class, 'cc-selo urgente');
  assert.equal(s.k.length, 1);
  assert.equal(s.k[0].k[0], 'Prazo de inscrição em destaque');
  assert.equal(seloPrazo({ destaque: 'prazo-inscricao', encerraEm: 'lixo' }, BR('2026-11-26T12:00:00')).k[0].k[0], 'Prazo de inscrição em destaque');
  assert.equal(seloPrazo({}, BR('2026-11-26T12:00:00')), null);
  assert.equal(seloPrazo({ encerraEm: 'lixo' }, BR('2026-11-26T12:00:00')), null);
  // destaque com data longe: mostra a data e fica vermelho
  const d = textoSelo(selo('2026-12-20', '2026-11-26T12:00:00', { destaque: 'prazo-inscricao' }));
  assert.equal(d.falta, 'Faltam 24 dias');
  assert.equal(d.classe, 'cc-selo urgente');
});

test('certameNome: corta so em ": " e mantem titulo curto inteiro', () => {
  assert.equal(certameNome({ titulo: 'Edital 10:2026 FURB: Dentista' }), 'Edital 10:2026 FURB');
  assert.equal(certameNome({ titulo: 'X: Y' }), 'X: Y');
  assert.equal(certameNome({ titulo: 'Blumenau' }), 'Blumenau');
  assert.equal(certameNome({ titulo: '  Concurso BC: Dentista ' }), 'Concurso BC');
  assert.equal(certameNome({}), '');
});

test('ordenacao: destaque sem data primeiro, por prazo, sem data no fim (ordem do arquivo no empate)', () => {
  const lista = [
    { titulo: 'semdata1' },
    { titulo: 'tarde', encerraEm: '2026-12-20' },
    { titulo: 'destaque', destaque: 'prazo-inscricao' },
    { titulo: 'cedo', encerraEm: '2026-11-28T18:00:00-03:00' },
    { titulo: 'semdata2', encerraEm: 'invalido' },
    { titulo: 'destaque-com-data', destaque: 'prazo-inscricao', encerraEm: '2026-12-01' },
  ];
  assert.deepEqual(ordenar(lista).map((x) => x.titulo), ['destaque', 'cedo', 'destaque-com-data', 'tarde', 'semdata1', 'semdata2']);
});

test('paridade: prazoMs do site === prazoMs do monitor', () => {
  assert.equal(typeof monitor.prazoMs, 'function');
  const casos = [
    '2026-11-30', ' 2026-11-30 ', '2026-11-30T23:59', '2026-11-30T23:59:00', '2026-11-30T00:00',
    '2026-11-30T10:00:00.1', '2026-11-30T10:00:00.123', '2026-11-30T10:00:00.1234', '2026-11-30T10:00:00.123456789',
    '2026-11-30T23:59:00Z', '2026-11-30T23:59:00+01:00', '2026-11-30T23:59:00-03:00', '2027-02-29', '2026-02-28',
    'lixo', '', '2026-13-40', '30/11/2026', null, undefined, 0, 1764547140000, 1790000000000, {}, [], true,
  ];
  assert.ok(casos.length >= 20);
  for (const c of casos) assert.deepEqual(prazoMs(c), monitor.prazoMs(c), `divergiu em ${JSON.stringify(c)}`);
});
