// Testes de scripts/monitorar-concursos.mjs (funções puras + CLI sem rede).
// Rodar isolado: node --test tests/monitorar-concursos.test.mjs
// Nenhum teste acessa a rede nem grava no repo: arquivos só em pastas de os.tmpdir(), apagadas no fim.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const SCRIPT = path.join(RAIZ, 'scripts', 'monitorar-concursos.mjs');

// Importação por namespace: função ausente derruba só o teste que a usa.
let M = {};
let erroImport = null;
try {
  M = await import(pathToFileURL(SCRIPT).href);
} catch (e) {
  erroImport = e;
}
function fn(nome) {
  if (erroImport) throw new Error(`scripts/monitorar-concursos.mjs não importa: ${erroImport.message}`);
  if (typeof M[nome] !== 'function') throw new Error(`função exportada ausente: ${nome}`);
  return M[nome];
}

function pastaTemp(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'monitor-test-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

// ---------- extrairDatas ----------
test('extrairDatas: dd/mm/aaaa e dd/mm/aa viram aaaa-mm-dd', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('Prova em 07/12/2026.'), ['2026-12-07']);
  assert.deepEqual(extrairDatas('Inscrições até 5/1/27'), ['2027-01-05']);
});

test('extrairDatas: por extenso, com "1º" e "20 de dezembro"', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('Prova no dia 1º de dezembro de 2026'), ['2026-12-01']);
  assert.deepEqual(extrairDatas('Resultado em 20 de dezembro de 2026.'), ['2026-12-20']);
  assert.deepEqual(extrairDatas('1o de janeiro de 2027'), ['2027-01-01']);
  assert.deepEqual(extrairDatas('20 DE DEZEMBRO DE 2026'), ['2026-12-20']);
});

test('extrairDatas: março com e sem acento', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('15 de março de 2027'), ['2027-03-15']);
  assert.deepEqual(extrairDatas('15 de marco de 2027'), ['2027-03-15']);
  // Acento decomposto (NFD) também casa.
  assert.deepEqual(extrairDatas('15 de março de 2027'), ['2027-03-15']);
});

test('extrairDatas: datas inválidas são ignoradas', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('31/02/2026 e 00/10/2026 e 10/13/2026 e 32/01/2026'), []);
  assert.deepEqual(extrairDatas('30 de fevereiro de 2026'), []);
  assert.deepEqual(extrairDatas('29/02/2028'), ['2028-02-29']); // bissexto válido
  assert.deepEqual(extrairDatas('29/02/2027'), []);
});

test('extrairDatas: sem duplicatas e em ordem', () => {
  const extrairDatas = fn('extrairDatas');
  const texto = '20/12/2026; 1º de dezembro de 2026; 20 de dezembro de 2026; 01/12/2026; 05/01/2027';
  assert.deepEqual(extrairDatas(texto), ['2026-12-01', '2026-12-20', '2027-01-05']);
});

test('extrairDatas: entrada vazia/nula e números que não são data', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas(''), []);
  assert.deepEqual(extrairDatas(null), []);
  assert.deepEqual(extrairDatas(undefined), []);
  assert.deepEqual(extrairDatas('Processo 123/2026 e 1/2/3/2026'), []);
});

// ---------- extrairLinksDocumento ----------
test('extrairLinksDocumento: pdf, anexo, retific e href relativo resolvido', () => {
  const extrair = fn('extrairLinksDocumento');
  const base = 'https://exemplo.org/concursos/edital-1/';
  const html = `
    <a href="edital.pdf">Edital</a>
    <a href='/arquivos/Anexo-I.docx'>Anexo</a>
    <a href="https://outro.org/retificacao-02">Retificação</a>
    <a href=../errata.html>Errata</a>
    <a class="x" href="Documento.PDF#page=2">Doc</a>`;
  assert.deepEqual(extrair(html, base), [
    'https://exemplo.org/arquivos/Anexo-I.docx',
    'https://exemplo.org/concursos/edital-1/Documento.PDF',
    'https://exemplo.org/concursos/edital-1/edital.pdf',
    'https://exemplo.org/concursos/errata.html',
    'https://outro.org/retificacao-02',
  ]);
});

test('extrairLinksDocumento: links comuns, âncoras, mailto e javascript são ignorados', () => {
  const extrair = fn('extrairLinksDocumento');
  const html = `
    <a href="/">Início</a>
    <a href="/contato">Contato</a>
    <a href="#topo">Topo</a>
    <a href="mailto:x@y.z">e-mail</a>
    <a href="javascript:void(0)">js</a>
    <a href="ftp://exemplo.org/edital.pdf">ftp</a>
    <link href="/estilo.pdf">`;
  assert.deepEqual(extrair(html, 'https://exemplo.org/'), []);
});

test('extrairLinksDocumento: duplicatas (inclusive com entidade &amp;) viram um só', () => {
  const extrair = fn('extrairLinksDocumento');
  const html = '<a href="/download?id=1&amp;t=2">a</a><a href="/download?id=1&t=2">b</a>';
  assert.deepEqual(extrair(html, 'https://exemplo.org/'), ['https://exemplo.org/download?id=1&t=2']);
});

// ---------- ehBloqueio ----------
test('ehBloqueio: captcha só com status suspeito ou no <title>; "Access Denied" curto é bloqueio', () => {
  const ehBloqueio = fn('ehBloqueio');
  // Marcador fraco em texto curto sem status: não é bloqueio.
  assert.equal(ehBloqueio('Por favor resolva o CAPTCHA para continuar'), null);
  assert.equal(ehBloqueio('Não sou um robô'), null);
  // Fraco com 403: bloqueio.
  assert.ok(ehBloqueio('Por favor resolva o CAPTCHA para continuar', '', 403));
  assert.ok(ehBloqueio('Não sou um robô', '', 403));
  // Fraco no <title>: bloqueio.
  assert.ok(ehBloqueio('Texto', '<html><head><title>CAPTCHA</title></head></html>', 200));
  assert.ok(ehBloqueio('Texto', '<html><head><title>Não sou um robô</title></head></html>'));
  assert.ok(ehBloqueio('Access Denied - You don\'t have permission'));
  assert.ok(ehBloqueio('Acesso negado'));
  assert.match(ehBloqueio('', '<script src="/cdn-cgi/challenge-platform/x.js"></script>'), /Cloudflare/);
});

test('ehBloqueio: página normal não é bloqueio', () => {
  const ehBloqueio = fn('ehBloqueio');
  assert.equal(ehBloqueio('Concurso Público 01/2026 - Edital de abertura. Inscrições até 20/12/2026.', '<html><body>ok</body></html>'), null);
  assert.equal(ehBloqueio(''), null);
  assert.equal(ehBloqueio(null), null);
});

// ---------- htmlParaTexto / decodificarEntidades / normalizarTexto ----------
test('htmlParaTexto: remove script, style e comentários', () => {
  const htmlParaTexto = fn('htmlParaTexto');
  const html = '<html><head><style>p{color:red}</style><script>var x = "1/1/2026";</script></head>'
    + '<body><!-- 02/02/2026 oculto --><p>Prova em 07/12/2026</p><noscript>ative js</noscript></body></html>';
  assert.equal(htmlParaTexto(html), 'Prova em 07/12/2026');
});

test('htmlParaTexto: atributo com ">" entre aspas não vaza para o texto', () => {
  const htmlParaTexto = fn('htmlParaTexto');
  assert.equal(htmlParaTexto('<a title="a > b" href="x">Edital</a>'), 'Edital');
  assert.equal(htmlParaTexto("<img alt='1 > 0 em 01/01/2026'>Texto"), 'Texto');
});

test('htmlParaTexto: decodifica entidades e colapsa espaços', () => {
  const htmlParaTexto = fn('htmlParaTexto');
  assert.equal(htmlParaTexto('<p>Retifica&ccedil;&atilde;o&nbsp;n&ordm;&#160;2</p>\n\n<div>  Fim </div>'), 'Retificação nº 2 Fim');
});

test('decodificarEntidades: nomeadas, decimais, hexadecimais e desconhecidas', () => {
  const dec = fn('decodificarEntidades');
  assert.equal(dec('&amp;&lt;&gt;&quot;&#39;&#x41;&eacute;'), '&<>"\'Aé');
  assert.equal(dec('&inexistente; &#xFFFFFFF;'), '&inexistente; &#xFFFFFFF;');
});

test('normalizarTexto: espaços colapsados, nbsp e pontas', () => {
  const norm = fn('normalizarTexto');
  assert.equal(norm('  a  b\n\tc  '), 'a b c');
  assert.equal(norm(null), '');
});

// ---------- compararEstados ----------
const ok = (datas, links = []) => ({ status: 'ok', datas, links });
const T = 'Concurso X';
const U = 'https://exemplo.org/c';

test('compararEstados: sem mudança', () => {
  const comparar = fn('compararEstados');
  const r = comparar({ [T]: { [U]: ok(['2026-12-01'], ['https://e/a.pdf']) } }, { [T]: { [U]: ok(['2026-12-01'], ['https://e/a.pdf']) } });
  assert.deepEqual(r, { mudancas: [], inacessiveis: [], linhasBase: [], removidos: [] });
});

test('compararEstados: data entrou e data saiu', () => {
  const comparar = fn('compararEstados');
  const r = comparar({ [T]: { [U]: ok(['2026-12-01']) } }, { [T]: { [U]: ok(['2026-12-20']) } });
  assert.equal(r.mudancas.length, 1);
  assert.equal(r.mudancas[0].tipo, 'conteudo');
  assert.deepEqual(r.mudancas[0].datasEntraram, ['2026-12-20']);
  assert.deepEqual(r.mudancas[0].datasSairam, ['2026-12-01']);
  assert.deepEqual(r.mudancas[0].linksEntraram, []);
});

test('compararEstados: documento entrou e documento saiu', () => {
  const comparar = fn('compararEstados');
  const r = comparar({ [T]: { [U]: ok([], ['https://e/edital.pdf']) } }, { [T]: { [U]: ok([], ['https://e/retificacao.pdf']) } });
  assert.equal(r.mudancas.length, 1);
  assert.deepEqual(r.mudancas[0].linksEntraram, ['https://e/retificacao.pdf']);
  assert.deepEqual(r.mudancas[0].linksSairam, ['https://e/edital.pdf']);
});

test('compararEstados: mesma URL com título novo não é mudança; vale o título atual', () => {
  const comparar = fn('compararEstados');
  const r = comparar({ [T]: { [U]: ok(['2026-12-01']) } }, { Outro: { [U]: ok(['2026-12-01']) } });
  assert.deepEqual(r, { mudancas: [], inacessiveis: [], linhasBase: [], removidos: [] });
  // Com mudança de conteúdo, o resultado leva o título atual.
  const r2 = comparar({ [T]: { [U]: ok(['2026-12-01']) } }, { Outro: { [U]: ok(['2026-12-20']) } });
  assert.equal(r2.mudancas.length, 1);
  assert.equal(r2.mudancas[0].titulo, 'Outro');
  assert.equal(r2.mudancas[0].tipo, 'conteudo');
});

test('compararEstados: URL removida de certame listado é url-removida; certame sumido vai para removidos', () => {
  const comparar = fn('compararEstados');
  const r = comparar({ [T]: { [U]: ok([]) } }, { [T]: {} });
  assert.deepEqual(r.mudancas, [{ titulo: T, url: U, tipo: 'url-removida' }]);
  assert.deepEqual(r.removidos, []);
  const r2 = comparar({ [T]: { [U]: ok([]) } }, {});
  assert.deepEqual(r2.mudancas, []);
  assert.deepEqual(r2.removidos, [{ titulo: T, url: U }]);
});

test('compararEstados: titulosAtuais explícito decide entre url-removida e removidos', () => {
  const comparar = fn('compararEstados');
  // Atual sem o título, mas titulosAtuais diz que ele continua listado: url-removida.
  const r = comparar({ [T]: { [U]: ok([]) } }, {}, { titulosAtuais: [T] });
  assert.deepEqual(r.mudancas, [{ titulo: T, url: U, tipo: 'url-removida' }]);
  assert.deepEqual(r.removidos, []);
  // Atual com o título, mas titulosAtuais não o inclui: removido (informativo).
  const r2 = comparar({ [T]: { [U]: ok([]) } }, { [T]: {} }, { titulosAtuais: ['Outro'] });
  assert.deepEqual(r2.mudancas, []);
  assert.deepEqual(r2.removidos, [{ titulo: T, url: U }]);
  // titulosAtuais vazio: tudo que sumiu é removido.
  const r3 = comparar({ [T]: { [U]: ok([]) }, B: { 'https://b/1': ok([]) } }, {}, { titulosAtuais: [] });
  assert.deepEqual(r3.mudancas, []);
  assert.deepEqual(r3.removidos, [{ titulo: 'B', url: 'https://b/1' }, { titulo: T, url: U }]);
});

test('compararEstados: URL nova é mudança url-nova', () => {
  const comparar = fn('compararEstados');
  const U2 = 'https://exemplo.org/nova';
  const r = comparar({ [T]: { [U]: ok([]) } }, { [T]: { [U]: ok([]), [U2]: ok([]) } });
  assert.deepEqual(r.mudancas, [{ titulo: T, url: U2, tipo: 'url-nova' }]);
});

test('compararEstados: mesma URL em dois certames vale a primeira ocorrência (determinístico)', () => {
  const comparar = fn('compararEstados');
  const atual = { A: { [U]: ok(['2026-12-01']) } };
  // Primeira ocorrência (A) igual ao atual: sem mudança, mesmo que B tenha outra data.
  const ant1 = { A: { [U]: ok(['2026-12-01']) }, B: { [U]: ok(['2026-12-20']) } };
  assert.deepEqual(comparar(ant1, atual).mudancas, []);
  assert.deepEqual(comparar(ant1, atual), comparar(ant1, atual));
  // Ordem invertida: primeira ocorrência é B, logo há mudança de conteúdo.
  const ant2 = { B: { [U]: ok(['2026-12-20']) }, A: { [U]: ok(['2026-12-01']) } };
  const r = comparar(ant2, atual);
  assert.equal(r.mudancas.length, 1);
  assert.equal(r.mudancas[0].titulo, 'A');
  assert.deepEqual(r.mudancas[0].datasEntraram, ['2026-12-01']);
  assert.deepEqual(r.mudancas[0].datasSairam, ['2026-12-20']);
  // No atual com URL repetida, também vale a primeira (título e dados).
  const r2 = comparar({ A: { [U]: ok(['2026-12-01']) } }, { A: { [U]: ok(['2026-12-01']) }, B: { [U]: ok(['2027-01-01']) } });
  assert.deepEqual(r2.mudancas, []);
});

test('compararEstados: inacessível não conta como mudança', () => {
  const comparar = fn('compararEstados');
  // Como o main() faz: falha mantém datas/links da última leitura boa.
  const atual = { status: 'inacessivel', motivo: 'HTTP 503', datas: ['2026-12-01'], links: [] };
  const r = comparar({ [T]: { [U]: ok(['2026-12-01']) } }, { [T]: { [U]: atual } });
  assert.deepEqual(r.mudancas, []);
  assert.deepEqual(r.inacessiveis, [{ titulo: T, url: U, motivo: 'HTTP 503' }]);
  // Mesmo se o atual viesse com datas nulas, não é mudança.
  const r2 = comparar({ [T]: { [U]: ok(['2026-12-01']) } }, { [T]: { [U]: { status: 'inacessivel', datas: null, links: null } } });
  assert.deepEqual(r2.mudancas, []);
  assert.deepEqual(r2.inacessiveis, [{ titulo: T, url: U, motivo: 'inacessivel' }]);
});

test('compararEstados: primeira leitura (antes inacessível) não conta como mudança', () => {
  const comparar = fn('compararEstados');
  const r = comparar({ [T]: { [U]: { status: 'inacessivel', datas: null, links: null } } }, { [T]: { [U]: ok(['2026-12-01']) } });
  assert.deepEqual(r.mudancas, []);
  assert.deepEqual(r.linhasBase, [{ titulo: T, url: U }]);
});

test('compararEstados: argumentos ausentes', () => {
  const comparar = fn('compararEstados');
  assert.deepEqual(comparar(), { mudancas: [], inacessiveis: [], linhasBase: [], removidos: [] });
});

// ---------- listarUrls ----------
test('listarUrls: junta links[].url e monitorar[], sem duplicata e ignorando lixo', () => {
  const listarUrls = fn('listarUrls');
  const concurso = {
    situacao: [
      { titulo: 'A', links: [{ url: ' https://a/1 ' }, { url: '' }, null, { texto: 'sem url' }], monitorar: ['https://a/2', 'https://a/1', 3] },
      { titulo: 'B' },
      { semTitulo: true },
      null,
    ],
  };
  assert.deepEqual(listarUrls(concurso), { A: ['https://a/1', 'https://a/2'], B: [] });
  assert.deepEqual(listarUrls({}), {});
  assert.deepEqual(listarUrls(null), {});
});

// ---------- montarRelatorio ----------
test('montarRelatorio: "Sem mudança"', () => {
  const montar = fn('montarRelatorio');
  const rel = montar({ comparacao: { mudancas: [], inacessiveis: [], linhasBase: [] }, urlsPorTitulo: {}, geradoEm: 'X', semReferencia: false });
  assert.match(rel, /Sem mudança/);
  assert.doesNotMatch(rel, /Houve mudança/);
  assert.match(rel, /Nenhuma\./);
});

test('montarRelatorio: "Houve mudança" com datas em dd/mm/aaaa e documentos', () => {
  const montar = fn('montarRelatorio');
  const comparacao = {
    mudancas: [{ titulo: T, url: U, tipo: 'conteudo', datasEntraram: ['2026-12-20'], datasSairam: ['2026-12-01'], linksEntraram: ['https://e/r.pdf'], linksSairam: [] }],
    inacessiveis: [{ titulo: 'Y', url: 'https://y', motivo: 'HTTP 403' }],
    linhasBase: [],
  };
  const rel = montar({ comparacao, urlsPorTitulo: { [T]: [U] }, geradoEm: 'X', semReferencia: false });
  assert.match(rel, /Houve mudança/);
  assert.match(rel, /Datas que entraram: 20\/12\/2026/);
  assert.match(rel, /Datas que saíram: 01\/12\/2026/);
  assert.match(rel, /Documento novo: https:\/\/e\/r\.pdf/);
  assert.match(rel, /HTTP 403/);
  assert.doesNotMatch(rel, /2026-12-20/);
});

test('montarRelatorio: sem referência não diz "Houve mudança"', () => {
  const montar = fn('montarRelatorio');
  const rel = montar({ comparacao: { mudancas: [{ titulo: T, url: U, tipo: 'url-nova' }], inacessiveis: [], linhasBase: [] }, urlsPorTitulo: {}, geradoEm: 'X', semReferencia: true });
  assert.doesNotMatch(rel, /Houve mudança/);
  assert.match(rel, /linha de base/);
});

// ---------- CLI (sem rede: entrada sem nenhuma URL) ----------
function rodar(args) {
  const env = { ...process.env };
  // Por garantia, qualquer tentativa de rede falharia rápido (mas a entrada não tem URL).
  env.HTTP_PROXY = env.HTTPS_PROXY = 'http://127.0.0.1:9';
  return spawnSync(process.execPath, [SCRIPT, ...args], { encoding: 'utf8', env, timeout: 30000 });
}

test('CLI: opção inválida sai com 2', () => {
  const r = rodar(['--nao-existe']);
  assert.equal(r.status, 2, r.stderr);
  assert.match(r.stderr, /opção desconhecida/);
});

test('CLI: opção sem valor e --timeout inválido saem com 2', () => {
  assert.equal(rodar(['--entrada']).status, 2);
  assert.equal(rodar(['--timeout', '0']).status, 2);
});

test('CLI: estado inexistente sem --atualizar sai com 2 e não cria arquivo', (t) => {
  const dir = pastaTemp(t);
  const entrada = path.join(dir, 'concurso.json');
  const estado = path.join(dir, 'estado.json');
  fs.writeFileSync(entrada, JSON.stringify({ situacao: [] }));
  const r = rodar(['--entrada', entrada, '--estado', estado]);
  assert.equal(r.status, 2, r.stderr);
  assert.match(r.stderr, /estado de referência inexistente/);
  assert.equal(fs.existsSync(estado), false);
});

test('CLI: --atualizar com entrada vazia sai com 0 e grava só nos arquivos temporários', (t) => {
  const dir = pastaTemp(t);
  const entrada = path.join(dir, 'concurso.json');
  const estado = path.join(dir, 'sub', 'estado.json');
  const relatorio = path.join(dir, 'rel.md');
  fs.writeFileSync(entrada, JSON.stringify({ situacao: [{ titulo: 'Vazio', links: [] }] }));
  const estadoRepo = path.join(RAIZ, 'curso', 'monitor-concursos-estado.json');
  const antes = fs.existsSync(estadoRepo) ? fs.readFileSync(estadoRepo, 'utf8') : null;

  const r = rodar(['--entrada', entrada, '--estado', estado, '--relatorio', relatorio, '--atualizar']);
  assert.equal(r.status, 0, r.stderr);
  const gravado = JSON.parse(fs.readFileSync(estado, 'utf8'));
  assert.deepEqual(gravado.itens, {});
  assert.ok(gravado.geradoEm);
  assert.match(fs.readFileSync(relatorio, 'utf8'), /linha de base/);
  // O estado do repositório não foi tocado.
  const depois = fs.existsSync(estadoRepo) ? fs.readFileSync(estadoRepo, 'utf8') : null;
  assert.equal(depois, antes);

  // Segunda rodada, agora com referência: sem mudança, código 0, relatório no stdout.
  const r2 = rodar(['--entrada', entrada, '--estado', estado]);
  assert.equal(r2.status, 0, r2.stderr);
  assert.match(r2.stdout, /Sem mudança/);
});

test('CLI: entrada com JSON inválido sai com 2', (t) => {
  const dir = pastaTemp(t);
  const entrada = path.join(dir, 'concurso.json');
  fs.writeFileSync(entrada, '{ quebrado');
  const r = rodar(['--entrada', entrada, '--estado', path.join(dir, 'e.json'), '--atualizar']);
  assert.equal(r.status, 2);
  assert.equal(fs.existsSync(path.join(dir, 'e.json')), false);
});

// ---------- Regras novas (2026-11-26) ----------
const textoLongo = (trecho) => `${'Edital de abertura do concurso público, com cronograma e anexos. '.repeat(30)} ${trecho} Formulário de contato.`;

test('ehBloqueio: marcador fraco em página longa (formulário com reCAPTCHA) não é bloqueio', () => {
  const ehBloqueio = fn('ehBloqueio');
  const t1 = textoLongo('Não sou um robô');
  const t2 = textoLongo('Protegido por reCAPTCHA');
  assert.ok(t1.length >= 1500 && t2.length >= 1500);
  assert.equal(ehBloqueio(t1), null);
  assert.equal(ehBloqueio(t2), null);
  assert.equal(ehBloqueio(t1, '<html></html>', 200), null);
});

test('ehBloqueio: marcador fraco em página longa com HTTP 403/429/503 é bloqueio', () => {
  const ehBloqueio = fn('ehBloqueio');
  for (const status of [403, 429, 503]) {
    assert.ok(ehBloqueio(textoLongo('Não sou um robô'), '', status), `status ${status}`);
    assert.ok(ehBloqueio(textoLongo('Protegido por reCAPTCHA'), '', status), `status ${status}`);
  }
});

test('ehBloqueio: marcador forte em página longa só com <title> ou HTTP 403; fraco em página curta é bloqueio', () => {
  const ehBloqueio = fn('ehBloqueio');
  // Forte só no corpo de página longa, status 200 ou ausente: não é bloqueio.
  assert.equal(ehBloqueio(textoLongo('Just a moment...')), null);
  assert.equal(ehBloqueio(textoLongo('Access Denied'), '<html><head><title>Concurso</title></head></html>', 200), null);
  // Com <title> ou 403, é.
  assert.ok(ehBloqueio(textoLongo('Just a moment...'), '<html><head><title>Just a moment...</title></head></html>', 200));
  assert.ok(ehBloqueio(textoLongo('Access Denied'), '', 403));
  // Fraco em página curta: só com status suspeito ou no <title>.
  assert.equal(ehBloqueio('Não sou um robô'), null);
  assert.ok(ehBloqueio('Não sou um robô', '', 403));
  assert.ok(ehBloqueio('Texto', '<html><head><title>Não sou um robô</title></head></html>', 200));
});

test('extrairDatas: ano de 2 dígitos (00–69 -> 20xx; 70–99 -> 19xx)', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('01/01/99'), ['1999-01-01']);
  assert.deepEqual(extrairDatas('01/01/69'), ['2069-01-01']);
  assert.deepEqual(extrairDatas('01/01/70'), ['1970-01-01']);
  assert.deepEqual(extrairDatas('01/01/00'), ['2000-01-01']);
});

test('extrairDatas: dd.mm.aaaa e d-m-aaaa reconhecidas; inválidas descartadas', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('Prova em 12.03.2026.'), ['2026-03-12']);
  assert.deepEqual(extrairDatas('Inscrições até 5-1-2027'), ['2027-01-05']);
  assert.deepEqual(extrairDatas('31.02.2026'), []);
  assert.deepEqual(extrairDatas('31-02-2026'), []);
});

test('extrairDatas: ano de 2 dígitos com ponto/hífen, CPF e telefone não viram data', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('12.03.26'), []);
  assert.deepEqual(extrairDatas('12-03-26'), []);
  assert.deepEqual(extrairDatas('CPF 123.456.789-01'), []);
  assert.deepEqual(extrairDatas('Telefone (47) 3321-2026'), []);
});

test('extrairDatas: "1.º de dezembro de 2026"', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('Prova no dia 1.º de dezembro de 2026'), ['2026-12-01']);
});

test('compararEstados: URL nova inacessível vai só para inacessíveis, com urlNova: true', () => {
  const comparar = fn('compararEstados');
  const r = comparar({}, { [T]: { [U]: { status: 'inacessivel', motivo: 'HTTP 404', datas: null, links: null } } });
  assert.deepEqual(r.mudancas, []);
  assert.deepEqual(r.inacessiveis, [{ titulo: T, url: U, motivo: 'HTTP 404', urlNova: true }]);
  assert.deepEqual(r.linhasBase, []);
  // Sem motivo, usa o status.
  const r2 = comparar({ [T]: {} }, { [T]: { [U]: { status: 'inacessivel', datas: null, links: null } } });
  assert.deepEqual(r2.inacessiveis, [{ titulo: T, url: U, motivo: 'inacessivel', urlNova: true }]);
});

test('compararEstados: URL nova lida com sucesso continua sendo mudança url-nova', () => {
  const comparar = fn('compararEstados');
  const r = comparar({}, { [T]: { [U]: ok(['2026-12-01']) } });
  assert.deepEqual(r.mudancas, [{ titulo: T, url: U, tipo: 'url-nova' }]);
  assert.deepEqual(r.inacessiveis, []);
});

test('montarRelatorio: inacessível com urlNova mostra "URL nova na lista monitorada"', () => {
  const montar = fn('montarRelatorio');
  const comparacao = {
    mudancas: [],
    inacessiveis: [
      { titulo: T, url: U, motivo: 'HTTP 404', urlNova: true },
      { titulo: 'Y', url: 'https://y', motivo: 'HTTP 403' },
    ],
    linhasBase: [],
  };
  const rel = montar({ comparacao, urlsPorTitulo: {}, geradoEm: 'X', semReferencia: false });
  assert.match(rel, /Sem mudança/);
  assert.ok(rel.includes(`- ${T}: ${U} (URL nova na lista monitorada; HTTP 404)`), rel);
  assert.ok(rel.includes('- Y: https://y (HTTP 403)'), rel);
});

// ---------- Contrato pós-review (2026-11-26): encerrados, achatarEstado, saídas 3/4, rede local, lerCorpo ----------
// Rede: só 127.0.0.1. Este PC tem HTTP(S)_PROXY no ambiente; NO_PROXY garante que nada vá ao proxy.
process.env.NO_PROXY = process.env.no_proxy = '127.0.0.1,localhost';

const AGORA = Date.parse('2026-11-26T12:00:00Z');

test('achatarEstado: formato url -> { titulo, dados }, primeira ocorrência e entrada vazia/nula', () => {
  const achatar = fn('achatarEstado');
  const d1 = ok(['2026-12-01']);
  const d2 = ok(['2026-12-20']);
  const mapa = achatar({ A: { [U]: d1, 'https://a/2': d2 }, B: { [U]: d2 } });
  assert.ok(mapa instanceof Map);
  assert.deepEqual([...mapa.keys()], [U, 'https://a/2']);
  assert.deepEqual(mapa.get(U), { titulo: 'A', dados: d1 });
  assert.deepEqual(mapa.get('https://a/2'), { titulo: 'A', dados: d2 });
  assert.equal(achatar().size, 0);
  assert.equal(achatar({}).size, 0);
  assert.equal(achatar(null).size, 0);
  assert.equal(achatar({ A: null, B: {} }).size, 0);
});

test('listarUrls(concurso, agora): encerraEm passado ou igual a agora fica fora; futuro, inválido, não-texto e ausente continuam', () => {
  const listarUrls = fn('listarUrls');
  const concurso = {
    situacao: [
      { titulo: 'Passado', encerraEm: '2026-11-25T12:00:00Z', links: [{ url: 'https://p/1' }] },
      { titulo: 'Futuro', encerraEm: '2026-12-31', links: [{ url: 'https://f/1' }] },
      { titulo: 'Invalido', encerraEm: 'não é data', links: [{ url: 'https://i/1' }] },
      { titulo: 'NaoString', encerraEm: 0, links: [{ url: 'https://n/1' }] },
      { titulo: 'Ausente', links: [{ url: 'https://a/1' }] },
      { titulo: 'Agora', encerraEm: new Date(AGORA).toISOString(), monitorar: ['https://g/1'] },
    ],
  };
  assert.deepEqual(listarUrls(concurso, AGORA), {
    Futuro: ['https://f/1'],
    Invalido: ['https://i/1'],
    NaoString: ['https://n/1'],
    Ausente: ['https://a/1'],
  });
  // Fronteira igual à do site (aberto só se prazo > agora): prazo == agora já é encerrado;
  // um milissegundo antes, "Agora" ainda é monitorado.
  assert.equal('Agora' in listarUrls(concurso, AGORA), false);
  assert.deepEqual(listarUrls(concurso, AGORA - 1).Agora, ['https://g/1']);
  // encerraEm não-texto (0) não é prazo: prazoMs dá NaN e o item segue aberto.
  const prazoMs = fn('prazoMs');
  assert.ok(Number.isNaN(prazoMs(0)), 'prazoMs(0) deve ser NaN');
  assert.ok(Number.isNaN(prazoMs(1790000000000)), 'prazoMs(1790000000000) deve ser NaN');
  assert.equal(fn('certameEncerrado')({ encerraEm: 0 }, AGORA), false);
});

test('certameEncerrado e listarEncerrados com agora injetado', () => {
  const certameEncerrado = fn('certameEncerrado');
  const listarEncerrados = fn('listarEncerrados');
  assert.equal(certameEncerrado({ encerraEm: '2026-11-25' }, AGORA), true);
  assert.equal(certameEncerrado({ encerraEm: '2026-11-27' }, AGORA), false);
  // prazo == agora: encerrado (o site só mostra aberto se prazo > agora); 1 ms antes, aberto.
  assert.equal(certameEncerrado({ encerraEm: new Date(AGORA).toISOString() }, AGORA), true);
  assert.equal(certameEncerrado({ encerraEm: new Date(AGORA).toISOString() }, AGORA - 1), false);
  assert.equal(certameEncerrado({ encerraEm: 'xx' }, AGORA), false);
  assert.equal(certameEncerrado({}, AGORA), false);
  assert.equal(certameEncerrado(null, AGORA), false);
  // O mesmo item muda de situação conforme o "agora".
  assert.equal(certameEncerrado({ encerraEm: '2026-11-25' }, Date.parse('2026-11-01')), false);

  const concurso = {
    situacao: [
      { titulo: 'X', encerraEm: '2026-01-01' },
      { titulo: 'Y', encerraEm: '2027-01-01' },
      { titulo: 'X', encerraEm: '2025-01-01' },
      { titulo: 'Z', encerraEm: '2026-11-26T11:59:59Z' },
      { encerraEm: '2020-01-01' },
      null,
    ],
  };
  assert.deepEqual(listarEncerrados(concurso, AGORA), ['X', 'Z']);
  assert.deepEqual(listarEncerrados(concurso, Date.parse('2020-06-01')), []);
  assert.deepEqual(listarEncerrados(null, AGORA), []);
});

test('montarRelatorio: seção "Certames encerrados" só aparece quando há encerrados', () => {
  const montar = fn('montarRelatorio');
  const comparacao = { mudancas: [], inacessiveis: [], linhasBase: [] };
  const com = montar({ comparacao, urlsPorTitulo: {}, geradoEm: 'X', semReferencia: false, encerrados: ['Concurso Velho'] });
  assert.match(com, /## Certames encerrados/);
  assert.ok(com.includes('- Concurso Velho: certame encerrado, não monitorado'), com);
  assert.match(com, /Sem mudança/);
  const sem = montar({ comparacao, urlsPorTitulo: {}, geradoEm: 'X', semReferencia: false });
  assert.doesNotMatch(sem, /Certames encerrados/);
  const semVazio = montar({ comparacao, urlsPorTitulo: {}, geradoEm: 'X', semReferencia: false, encerrados: [] });
  assert.doesNotMatch(semVazio, /Certames encerrados/);
});

// main() no próprio processo, com relatório em arquivo temporário (não suja o stdout do teste).
async function rodarMain(t, { entrada, estado, extra = [], agora = AGORA }) {
  const dir = pastaTemp(t);
  const arqEntrada = path.join(dir, 'concurso.json');
  const arqEstado = path.join(dir, 'estado.json');
  const arqRel = path.join(dir, 'rel.md');
  fs.writeFileSync(arqEntrada, JSON.stringify(entrada));
  if (estado !== undefined) fs.writeFileSync(arqEstado, JSON.stringify(estado));
  const codigo = await fn('main')(['--entrada', arqEntrada, '--estado', arqEstado, '--relatorio', arqRel, ...extra], { agora });
  return { codigo, relatorio: fs.existsSync(arqRel) ? fs.readFileSync(arqRel, 'utf8') : '' };
}

test('main: certame com encerraEm passado não gera url-removida e sai com 0', async (t) => {
  const UE = 'https://exemplo.org/encerrado';
  const entrada = { situacao: [{ titulo: 'Velho', encerraEm: '2026-11-01', links: [{ url: UE }] }] };
  const estado = { geradoEm: 'x', itens: { Velho: { [UE]: ok(['2026-10-01']) } } };
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado });
  assert.equal(codigo, 0, relatorio);
  assert.match(relatorio, /Sem mudança/);
  assert.doesNotMatch(relatorio, /URL removida/);
  assert.ok(relatorio.includes('- Velho: certame encerrado, não monitorado'), relatorio);
});

test('main: URL que saiu da entrada por outro motivo é mudança (saída 3)', async (t) => {
  const UR = 'https://exemplo.org/removida';
  const entrada = { situacao: [{ titulo: 'Ativo', encerraEm: '2027-01-01', links: [] }] };
  const estado = { geradoEm: 'x', itens: { Ativo: { [UR]: ok(['2026-10-01']) } } };
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado });
  assert.equal(codigo, 3, relatorio);
  assert.match(relatorio, /Houve mudança/);
  assert.ok(relatorio.includes(`URL removida da lista monitorada: ${UR}`), relatorio);
});

test('CLI: certame encerrado (data fixa no passado) com URL no estado sai com 0', (t) => {
  const dir = pastaTemp(t);
  const UE = 'https://exemplo.org/encerrado';
  const entrada = path.join(dir, 'concurso.json');
  const estado = path.join(dir, 'estado.json');
  fs.writeFileSync(entrada, JSON.stringify({ situacao: [{ titulo: 'Velho', encerraEm: '2000-01-01', links: [{ url: UE }] }] }));
  fs.writeFileSync(estado, JSON.stringify({ itens: { Velho: { [UE]: ok([]) } } }));
  const r = rodar(['--entrada', entrada, '--estado', estado]);
  assert.equal(r.status, 0, r.stderr + r.stdout);
  assert.doesNotMatch(r.stdout, /URL removida/);
  assert.match(r.stdout, /certame encerrado, não monitorado/);
});

test('main: URL inacessível com estado vazio sai com 4, "Sem mudança" e URL nos inacessíveis', async (t) => {
  const UI = 'http://127.0.0.1:9/x';
  const entrada = { situacao: [{ titulo: 'Local', links: [{ url: UI }] }] };
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado: { itens: {} }, extra: ['--timeout', '5'] });
  assert.equal(codigo, 4, relatorio);
  assert.match(relatorio, /Sem mudança/);
  const secao = relatorio.slice(relatorio.indexOf('## Inacessíveis'));
  assert.ok(secao.includes(`- Local: ${UI} (URL nova na lista monitorada; `), relatorio);
});

// ---------- verificarUrl contra servidor http local ----------
test('verificarUrl: 403 anti-robô, 404 comum e 200 normal (servidor local)', async (t) => {
  const http = await import('node:http');
  const servidor = http.createServer((req, res) => {
    if (req.url === '/bloqueio') {
      res.writeHead(403, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><head><title>Just a moment...</title></head><body>Checking</body></html>');
    } else if (req.url === '/sumiu') {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body>Página não encontrada</body></html>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body><p>Prova em 07/12/2026</p><a href="/edital.pdf">Edital</a></body></html>');
    }
  });
  await new Promise((pronto) => servidor.listen(0, '127.0.0.1', pronto));
  t.after(() => new Promise((fim) => { servidor.closeAllConnections?.(); servidor.close(() => fim()); }));
  const base = `http://127.0.0.1:${servidor.address().port}`;
  const verificarUrl = fn('verificarUrl');

  const b = await verificarUrl(`${base}/bloqueio`, { timeoutMs: 5000 });
  assert.equal(b.status, 'inacessivel');
  assert.match(b.motivo, /bloqueio anti-robô \(HTTP 403\)/);

  const n = await verificarUrl(`${base}/sumiu`, { timeoutMs: 5000 });
  assert.equal(n.status, 'inacessivel');
  assert.match(n.motivo, /^HTTP 404/);
  assert.doesNotMatch(n.motivo, /bloqueio/);

  const o = await verificarUrl(`${base}/pagina`, { timeoutMs: 5000 });
  assert.equal(o.status, 'ok', o.motivo);
  assert.deepEqual(o.datas, ['2026-12-07']);
  assert.deepEqual(o.links, [`${base}/edital.pdf`]);
  assert.match(o.sha, /^[0-9a-f]{64}$/);
});

// ---------- lerCorpo ----------
function streamDe(pedacos, contador = { lidos: 0, cancelado: false }) {
  let i = 0;
  return new ReadableStream({
    pull(c) {
      if (i < pedacos.length) { contador.lidos++; c.enqueue(new TextEncoder().encode(pedacos[i++])); } else c.close();
    },
    cancel() { contador.cancelado = true; },
  });
}

test('lerCorpo: content-length acima do limite aborta sem ler', async () => {
  const lerCorpo = fn('lerCorpo');
  const cont = { lidos: 0, cancelado: false };
  const resp = new Response(streamDe(['abc'], cont), { headers: { 'content-length': '100' } });
  await assert.rejects(lerCorpo(resp, 10), (e) => e.code === 'GRANDE_DEMAIS');
  assert.equal(cont.lidos, 0);
});

test('lerCorpo: stream que passa do limite aborta; dentro do limite devolve os bytes', async () => {
  const lerCorpo = fn('lerCorpo');
  const cont = { lidos: 0, cancelado: false };
  const resp = new Response(streamDe(['1234', '5678', '9abc', 'defg'], cont));
  await assert.rejects(lerCorpo(resp, 6), (e) => e.code === 'GRANDE_DEMAIS');
  assert.ok(cont.lidos < 4, `leu ${cont.lidos} pedaços`);
  assert.equal(cont.cancelado, true);

  const bytes = await lerCorpo(new Response(streamDe(['12', '34'])), 4);
  assert.equal(new TextDecoder().decode(bytes), '1234');
});

test('lerCorpo: corpo nulo devolve 0 bytes', async () => {
  const lerCorpo = fn('lerCorpo');
  const bytes = await lerCorpo(new Response(null), 10);
  assert.ok(bytes instanceof Uint8Array);
  assert.equal(bytes.byteLength, 0);
});

// ---------- montarChave, ehTelaLogin, binário, --chave e login por redirecionamento (2026-11-26) ----------
test('montarChave: motivos diferentes e ordem diferente dão o mesmo texto; sem motivo nem horário', () => {
  const comparar = fn('compararEstados');
  const montarChave = fn('montarChave');
  const UA = 'https://exemplo.org/a';
  const UB = 'https://exemplo.org/b';
  const UC = 'https://exemplo.org/c2';
  const inac = (motivo) => ({ status: 'inacessivel', motivo, datas: ['2026-12-01'], links: [], verificadoEm: new Date().toISOString() });
  const ant = { A: { [UA]: ok(['2026-12-01']), [UB]: ok(['2026-12-01']) }, B: { [UC]: ok(['2026-12-01'], ['https://e/x.pdf']) } };
  const atual1 = { A: { [UA]: inac('tempo esgotado (30 s)'), [UB]: inac('erro de rede: ECONNRESET') }, B: { [UC]: ok(['2026-12-20', '2026-12-01'], ['https://e/z.pdf', 'https://e/y.pdf']) } };
  const atual2 = { B: { [UC]: ok(['2026-12-01', '2026-12-20'], ['https://e/y.pdf', 'https://e/z.pdf']) }, A: { [UB]: inac('HTTP 503 Service Unavailable'), [UA]: inac('HTTP 503') } };
  const r1 = comparar(ant, atual1);
  const r2 = comparar(ant, atual2);
  assert.equal(r1.inacessiveis.length, 2);
  assert.notDeepEqual(r1.inacessiveis.map((x) => x.motivo), r2.inacessiveis.map((x) => x.motivo));
  const c1 = montarChave(r1, 3);
  const c2 = montarChave(r2, 3);
  assert.equal(c1, c2);
  // Entradas da própria lista em outra ordem também dão o mesmo texto.
  const rInvertido = { mudancas: [...r1.mudancas].reverse(), inacessiveis: [...r1.inacessiveis].reverse() };
  assert.equal(montarChave(rInvertido, 3), c1);
  assert.equal(JSON.parse(c1).codigo, 3);
  assert.ok(c1.includes('"codigo": 3'), c1);
  assert.doesNotMatch(c1, /motivo/);
  assert.doesNotMatch(c1, /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/);
  assert.notEqual(montarChave(r1, 4), c1);
});

test('montarChave: url-nova sem undefined (listas viram [])', () => {
  const comparar = fn('compararEstados');
  const montarChave = fn('montarChave');
  const r = comparar({}, { [T]: { [U]: ok(['2026-12-01']) } });
  const chave = montarChave(r, 3);
  assert.doesNotMatch(chave, /undefined/);
  const obj = JSON.parse(chave);
  assert.deepEqual(obj.mudancas, [{ titulo: T, url: U, tipo: 'url-nova', datasEntraram: [], datasSairam: [], linksEntraram: [], linksSairam: [] }]);
  assert.deepEqual(obj.inacessiveis, []);
  // Resultado vazio/ausente também não quebra.
  assert.deepEqual(JSON.parse(montarChave(undefined, 0)), { codigo: 0, mudancas: [], inacessiveis: [] });
});

test('ehTelaLogin: segmento inteiro login/signin/entrar ou /auth/', () => {
  const ehTelaLogin = fn('ehTelaLogin');
  const b = 'https://exemplo.org';
  assert.equal(ehTelaLogin(`${b}/entrar-no-concurso/579`), false);
  assert.equal(ehTelaLogin(`${b}/login.html`), false);
  assert.equal(ehTelaLogin(`${b}/loginx`), false);
  assert.equal(ehTelaLogin(`${b}/login`), true);
  assert.equal(ehTelaLogin(`${b}/login/`), true);
  assert.equal(ehTelaLogin(`${b}/a/entrar?x=1`), true);
  assert.equal(ehTelaLogin(`${b}/signin#a`), true);
  assert.equal(ehTelaLogin(`${b}/area-candidato/auth/login?redir=/a`), true);
});

async function servidorLocal(t, tratar) {
  const http = await import('node:http');
  const servidor = http.createServer(tratar);
  await new Promise((pronto) => servidor.listen(0, '127.0.0.1', pronto));
  t.after(() => new Promise((fim) => { servidor.closeAllConnections?.(); servidor.close(() => fim()); }));
  return `http://127.0.0.1:${servidor.address().port}`;
}

test('verificarUrl: conteúdo binário vira ok com datas/links vazios e sha dos bytes; %PDF- não é binário', async (t) => {
  const crypto = await import('node:crypto');
  const corpoZip = Buffer.from('PK\u0003\u0004 Prova em 01/02/2026 <a href="/edital.pdf">Edital</a>', 'latin1');
  const corpoZip2 = Buffer.concat([corpoZip, Buffer.from('outro')]);
  const corpoPdf = Buffer.from('%PDF-1.4\nnao e um pdf de verdade 01/02/2026\n', 'latin1');
  const base = await servidorLocal(t, (req, res) => {
    if (req.url === '/arq.zip' || req.url === '/arq2.zip') {
      res.writeHead(200, { 'Content-Type': 'application/zip' });
      res.end(req.url === '/arq.zip' ? corpoZip : corpoZip2);
    } else {
      res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
      res.end(corpoPdf);
    }
  });
  const verificarUrl = fn('verificarUrl');

  const z = await verificarUrl(`${base}/arq.zip`, { timeoutMs: 5000 });
  assert.equal(z.status, 'ok', z.motivo);
  assert.equal(z.binario, true);
  assert.deepEqual(z.datas, []);
  assert.deepEqual(z.links, []);
  assert.equal(z.sha, crypto.createHash('sha256').update(corpoZip).digest('hex'));

  // octet-stream começando com %PDF- segue o caminho de PDF (pdftotext), nunca o binário.
  const p = await verificarUrl(`${base}/doc.bin`, { timeoutMs: 5000 });
  assert.notEqual(p.binario, true);
  if (p.status !== 'ok') assert.match(p.motivo, /pdftotext|PDF/, p.motivo);

  // Duas leituras binárias com sha diferente: nenhuma mudança.
  const z2 = await verificarUrl(`${base}/arq2.zip`, { timeoutMs: 5000 });
  assert.equal(z2.binario, true);
  assert.notEqual(z2.sha, z.sha);
  const r = fn('compararEstados')({ [T]: { [U]: z } }, { [T]: { [U]: z2 } });
  assert.deepEqual(r, { mudancas: [], inacessiveis: [], linhasBase: [], removidos: [] });
});

test('verificarUrl: redirecionamento para /entrar-no-concurso/1 não exige login; para /auth/login exige', async (t) => {
  const base = await servidorLocal(t, (req, res) => {
    if (req.url === '/x') { res.writeHead(302, { Location: '/entrar-no-concurso/1' }); res.end(); }
    else if (req.url === '/y') { res.writeHead(302, { Location: '/auth/login' }); res.end(); }
    else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body><p>Prova em 07/12/2026</p></body></html>');
    }
  });
  const verificarUrl = fn('verificarUrl');
  const a = await verificarUrl(`${base}/x`, { timeoutMs: 5000 });
  assert.equal(a.status, 'ok', a.motivo);
  assert.deepEqual(a.datas, ['2026-12-07']);
  const b = await verificarUrl(`${base}/y`, { timeoutMs: 5000 });
  assert.equal(b.status, 'inacessivel');
  assert.match(b.motivo, /exige login/);
});

test('main --chave: grava a chave com o código retornado; sem --chave não cria arquivo', async (t) => {
  const UR = 'https://exemplo.org/removida';
  const entrada = { situacao: [{ titulo: 'Ativo', encerraEm: '2027-01-01', links: [] }] };
  const estado = { geradoEm: 'x', itens: { Ativo: { [UR]: ok(['2026-10-01']) } } };
  const main = fn('main');
  const preparar = () => {
    const dir = pastaTemp(t);
    const arq = { dir, entrada: path.join(dir, 'concurso.json'), estado: path.join(dir, 'estado.json'), rel: path.join(dir, 'rel.md') };
    fs.writeFileSync(arq.entrada, JSON.stringify(entrada));
    fs.writeFileSync(arq.estado, JSON.stringify(estado));
    return arq;
  };

  const a = preparar();
  const arqChave = path.join(a.dir, 'chave.txt');
  const codigo = await main(['--entrada', a.entrada, '--estado', a.estado, '--relatorio', a.rel, '--chave', arqChave], { agora: AGORA });
  assert.equal(codigo, 3);
  const chave = JSON.parse(fs.readFileSync(arqChave, 'utf8'));
  assert.equal(chave.codigo, codigo);
  assert.deepEqual(chave.mudancas.map((m) => [m.url, m.tipo]), [[UR, 'url-removida']]);

  const b = preparar();
  const codigo2 = await main(['--entrada', b.entrada, '--estado', b.estado, '--relatorio', b.rel], { agora: AGORA });
  assert.equal(codigo2, 3);
  assert.deepEqual(fs.readdirSync(b.dir).sort(), ['concurso.json', 'estado.json', 'rel.md']);
});

// ---------- Rodada 2026-11-26 (b): datas sem ano, chave, bloqueio, invisíveis, --atualizar, pdftotext ----------
test('extrairDatas: dd/mm sem ano vira "--mm-dd"', () => {
  const extrairDatas = fn('extrairDatas');
  assert.deepEqual(extrairDatas('Prova em 10/12'), ['--12-10']);
  assert.deepEqual(extrairDatas('03/12; 16/12'), ['--12-03', '--12-16']);
  assert.deepEqual(extrairDatas('dia 3/12'), ['--12-03']);
  assert.deepEqual(extrairDatas('10/12/2026 e 10/12'), ['--12-10', '2026-12-10']);
  assert.deepEqual(extrairDatas('29/02'), ['--02-29']);
});

test('extrairDatas: frações, decimais, processos, leis, números e horas não viram data sem ano', () => {
  const extrairDatas = fn('extrairDatas');
  for (const s of ['1/2', '5/1', '1,5/10', '10/12,5', '123/2026', 'Lei 8.080/90', 'nº 05/26', '31/02', '12:30']) {
    assert.deepEqual(extrairDatas(s), [], s);
  }
});

test('montarRelatorio: data sem ano aparece como "dd/mm (sem ano)"', () => {
  const montar = fn('montarRelatorio');
  const comparacao = {
    mudancas: [{ titulo: T, url: U, tipo: 'conteudo', datasEntraram: ['--12-10'], datasSairam: [], linksEntraram: [], linksSairam: [] }],
    inacessiveis: [],
    linhasBase: [],
  };
  const rel = montar({ comparacao, urlsPorTitulo: { [T]: [U] }, geradoEm: 'X', semReferencia: false });
  assert.ok(rel.includes('Datas que entraram: 10/12 (sem ano)'), rel);
  assert.doesNotMatch(rel, /--12-10/);
});

test('montarChave: código 3 ignora inacessíveis; código 4 mantém a lista', () => {
  const montarChave = fn('montarChave');
  const mud = [{ titulo: T, url: U, tipo: 'conteudo', datasEntraram: ['2026-12-20'], datasSairam: [], linksEntraram: [], linksSairam: [] }];
  const inac = [{ titulo: 'Y', url: 'https://y', motivo: 'HTTP 503' }];
  const com = montarChave({ mudancas: mud, inacessiveis: inac }, 3);
  const sem = montarChave({ mudancas: mud, inacessiveis: [] }, 3);
  assert.deepEqual(JSON.parse(com).inacessiveis, []);
  assert.equal(com, sem);
  const c4 = JSON.parse(montarChave({ mudancas: [], inacessiveis: inac }, 4));
  assert.deepEqual(c4.inacessiveis, [{ titulo: 'Y', url: 'https://y' }]);
});

test('ehBloqueio: "Acesso negado" no corpo de página longa não é bloqueio; <title>, 403 e Cloudflare são', () => {
  const ehBloqueio = fn('ehBloqueio');
  const longo = textoLongo('Acesso negado aos candidatos sem inscrição.');
  assert.ok(longo.length >= 1500);
  const htmlNormal = '<html><head><title>Concurso Público 01/2026</title></head><body>...</body></html>';
  assert.equal(ehBloqueio(longo, htmlNormal, 200), null);
  assert.ok(ehBloqueio(textoLongo('Texto comum.'), '<html><head><title>Access Denied</title></head></html>', 200));
  assert.ok(ehBloqueio(longo, htmlNormal, 403));
  assert.match(ehBloqueio(textoLongo('Texto comum.'), '<html><body><div id="cf-chl-widget"></div></body></html>', 200), /Cloudflare/);
});

test('normalizarTexto: invisíveis somem e espaços especiais viram espaço', () => {
  const norm = fn('normalizarTexto');
  assert.equal(norm('a​b'), 'ab');
  assert.equal(norm('﻿x'), 'x');
  assert.equal(norm('a b'), 'a b');
});

test('main --atualizar: URL inacessível (503) avisa "referência NÃO atualizada" no relatório e no stderr', async (t) => {
  const base = await servidorLocal(t, (req, res) => {
    res.writeHead(503, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('Service Unavailable');
  });
  const UI = `${base}/fora`;
  const entrada = { situacao: [{ titulo: 'Local', links: [{ url: UI }] }] };
  const estado = { geradoEm: 'x', itens: { Local: { [UI]: ok(['2026-12-01']) } } };
  const linhas = [];
  t.mock.method(console, 'error', (...a) => { linhas.push(a.join(' ')); });
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado, extra: ['--atualizar', '--timeout', '5'] });
  t.mock.restoreAll();
  const stderr = linhas.join('\n');
  // Contrato: sem mudança e com inacessível = 4 (--atualizar não muda o código).
  assert.equal(codigo, 4, relatorio + stderr);
  assert.ok(relatorio.includes('referência NÃO atualizada'), relatorio);
  assert.ok(relatorio.includes(UI), relatorio);
  assert.ok(stderr.includes('referência NÃO atualizada'), stderr);
  assert.ok(stderr.includes(UI), stderr);
});

test('verificarUrl: PDF com pdftotext inexistente vira inacessível "indisponível"', async (t) => {
  const corpoPdf = Buffer.from('%PDF-1.4\nqualquer coisa\n', 'latin1');
  const base = await servidorLocal(t, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/pdf' });
    res.end(corpoPdf);
  });
  const anterior = process.env.PDFTOTEXT;
  process.env.PDFTOTEXT = path.join(os.tmpdir(), 'nao-existe-pdftotext-' + process.pid, 'pdftotext.exe');
  t.after(() => { if (anterior === undefined) delete process.env.PDFTOTEXT; else process.env.PDFTOTEXT = anterior; });
  const r = await fn('verificarUrl')(`${base}/doc.pdf`, { timeoutMs: 5000 });
  assert.equal(r.status, 'inacessivel');
  assert.match(r.motivo, /indisponível/);
});

// ---------- Contrato 2026-11-26 (c): referência incompleta, certames removidos, marcadores fracos ----------
const PAGINA_OK = '<html><body><p>Prova em 07/12/2026</p><a href="/edital.pdf">Edital</a></body></html>';
const servidorPaginaOk = (t) => servidorLocal(t, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(PAGINA_OK);
});
const nuncaLida = () => ({ status: 'inacessivel', motivo: 'HTTP 503', datas: null, links: null });

test('main: URL com datas/links null no estado que agora responde ok sai com 4 e "Referência incompleta"', async (t) => {
  const base = await servidorPaginaOk(t);
  const UL = `${base}/pagina`;
  const entrada = { situacao: [{ titulo: 'Local', links: [{ url: UL }] }] };
  const estado = { geradoEm: 'x', itens: { Local: { [UL]: nuncaLida() } } };
  const dir = pastaTemp(t);
  const arqChave = path.join(dir, 'chave.txt');
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado, extra: ['--timeout', '5', '--chave', arqChave] });
  assert.equal(codigo, 4, relatorio);
  assert.match(relatorio, /Sem mudança/);
  assert.ok(relatorio.includes('## Referência incompleta: rode --atualizar'), relatorio);
  const secao = relatorio.slice(relatorio.indexOf('## Referência incompleta'), relatorio.indexOf('## Inacessíveis'));
  assert.ok(secao.includes(`- Local: ${UL}`), relatorio);
  assert.ok(relatorio.slice(relatorio.indexOf('## Inacessíveis')).includes('Nenhuma.'), relatorio);
  const chave = JSON.parse(fs.readFileSync(arqChave, 'utf8'));
  assert.equal(chave.codigo, 4);
  assert.deepEqual(chave.mudancas, []);
  assert.deepEqual(chave.inacessiveis, []);
  assert.deepEqual(chave.referenciaIncompleta, [{ titulo: 'Local', url: UL }]);
});

test('main: referência incompleta + mudança em outra URL sai com 3 (chave sem referenciaIncompleta)', async (t) => {
  const base = await servidorPaginaOk(t);
  const UL = `${base}/pagina`;
  const UM = `${base}/outra`;
  const entrada = { situacao: [{ titulo: 'Local', links: [{ url: UL }, { url: UM }] }] };
  const estado = { geradoEm: 'x', itens: { Local: { [UL]: nuncaLida(), [UM]: ok(['2026-01-01'], [`${base}/edital.pdf`]) } } };
  const dir = pastaTemp(t);
  const arqChave = path.join(dir, 'chave.txt');
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado, extra: ['--timeout', '5', '--chave', arqChave] });
  assert.equal(codigo, 3, relatorio);
  assert.match(relatorio, /Houve mudança/);
  assert.ok(relatorio.includes('## Referência incompleta: rode --atualizar'), relatorio);
  const chave = JSON.parse(fs.readFileSync(arqChave, 'utf8'));
  assert.equal(chave.codigo, 3);
  assert.deepEqual(chave.mudancas.map((m) => [m.url, m.tipo]), [[UM, 'conteudo']]);
  assert.equal('referenciaIncompleta' in chave, false);
});

test('main --atualizar: referência incompleta não faz sair com 4', async (t) => {
  const base = await servidorPaginaOk(t);
  const UL = `${base}/pagina`;
  const entrada = { situacao: [{ titulo: 'Local', links: [{ url: UL }] }] };
  const estado = { geradoEm: 'x', itens: { Local: { [UL]: nuncaLida() } } };
  t.mock.method(console, 'error', () => {});
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado, extra: ['--atualizar', '--timeout', '5'] });
  t.mock.restoreAll();
  assert.notEqual(codigo, 4, relatorio);
  assert.equal(codigo, 0, relatorio);
});

test('main: certame tirado da entrada sai com 0, sem url-removida, com seção "Certames removidos da lista"', async (t) => {
  const UV = 'https://exemplo.org/velho';
  const entrada = { situacao: [{ titulo: 'Ativo', links: [] }] };
  const estado = { geradoEm: 'x', itens: { Sumiu: { [UV]: ok(['2026-10-01']) } } };
  const dir = pastaTemp(t);
  const arqChave = path.join(dir, 'chave.txt');
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado, extra: ['--chave', arqChave] });
  assert.equal(codigo, 0, relatorio);
  assert.match(relatorio, /Sem mudança/);
  assert.doesNotMatch(relatorio, /URL removida/);
  assert.ok(relatorio.includes('## Certames removidos da lista'), relatorio);
  assert.ok(relatorio.includes(`- Sumiu: ${UV}`), relatorio);
  const chave = JSON.parse(fs.readFileSync(arqChave, 'utf8'));
  assert.deepEqual(chave, { codigo: 0, mudancas: [], inacessiveis: [] });
  assert.doesNotMatch(JSON.stringify(chave), /removid/);
});

test('main: certame ainda listado que perdeu uma URL tem url-removida e sai com 3', async (t) => {
  const base = await servidorPaginaOk(t);
  const UA = `${base}/pagina`;
  const UR = `${base}/perdida`;
  const entrada = { situacao: [{ titulo: 'Ativo', links: [{ url: UA }] }] };
  const estado = { geradoEm: 'x', itens: { Ativo: { [UA]: ok(['2026-12-07'], [`${base}/edital.pdf`]), [UR]: ok(['2026-10-01']) } } };
  const { codigo, relatorio } = await rodarMain(t, { entrada, estado, extra: ['--timeout', '5'] });
  assert.equal(codigo, 3, relatorio);
  assert.ok(relatorio.includes(`URL removida da lista monitorada: ${UR}`), relatorio);
  assert.doesNotMatch(relatorio, /Certames removidos da lista/);
  assert.doesNotMatch(relatorio, /Em http/); // a URL que continua não mudou
});

test('ehBloqueio: "captcha" em página 200 curta é null; com 429/503 ou no <title> é bloqueio', () => {
  const ehBloqueio = fn('ehBloqueio');
  const curto = 'Fale conosco. Protegido por reCAPTCHA.';
  assert.ok(curto.length < 1500);
  assert.equal(ehBloqueio(curto, '<html><body>Fale conosco</body></html>', 200), null);
  assert.ok(ehBloqueio(curto, '', 429));
  assert.ok(ehBloqueio(curto, '', 503));
  assert.ok(ehBloqueio('Aguarde', '<html><head><title>Captcha</title></head><body>Aguarde</body></html>', 200));
});

test('verificarUrl: página 200 curta com reCAPTCHA de formulário é ok; 429 com captcha é bloqueio', async (t) => {
  const base = await servidorLocal(t, (req, res) => {
    if (req.url === '/limite') {
      res.writeHead(429, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><body>Resolva o captcha</body></html>');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<html><head><title>Contato</title></head><body><p>Prova em 07/12/2026</p><form>Protegido por reCAPTCHA</form></body></html>');
    }
  });
  const verificarUrl = fn('verificarUrl');
  const a = await verificarUrl(`${base}/contato`, { timeoutMs: 5000 });
  assert.equal(a.status, 'ok', a.motivo);
  assert.deepEqual(a.datas, ['2026-12-07']);
  const b = await verificarUrl(`${base}/limite`, { timeoutMs: 5000 });
  assert.equal(b.status, 'inacessivel');
  assert.match(b.motivo, /bloqueio anti-robô \(HTTP 429\)/);
});

// ---------- estadoValido e estado de referência malformado (2026-11-26) ----------
test('estadoValido: objeto com "itens" objeto é válido; o resto não', () => {
  const estadoValido = fn('estadoValido');
  assert.equal(estadoValido({ itens: {} }), true);
  assert.equal(estadoValido({ geradoEm: 'x', itens: { T: {} } }), true);
  for (const v of [{}, [], null, undefined, 42, 'x', { geradoEm: 'x' }, { itens: [] }, { itens: null }, { itens: 'x' }]) {
    assert.equal(estadoValido(v), false, `esperava false para ${JSON.stringify(v)}`);
  }
});

// Servidor local que conta requisições; main() no próprio processo com console.error capturado.
async function servidorContador(t) {
  const cont = { n: 0 };
  const base = await servidorLocal(t, (req, res) => {
    cont.n++;
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<html><body><p>Prova em 07/12/2026</p><a href="/edital.pdf">Edital</a></body></html>');
  });
  return { base, cont };
}

async function rodarMainCapturando(t, { entrada, estadoTexto, extra = [] }) {
  const dir = pastaTemp(t);
  const arqEntrada = path.join(dir, 'concurso.json');
  const arqEstado = path.join(dir, 'estado.json');
  const arqRel = path.join(dir, 'rel.md');
  fs.writeFileSync(arqEntrada, JSON.stringify(entrada));
  fs.writeFileSync(arqEstado, estadoTexto);
  const erros = [];
  const original = console.error;
  console.error = (...a) => { erros.push(a.join(' ')); };
  let codigo;
  try {
    codigo = await fn('main')(['--entrada', arqEntrada, '--estado', arqEstado, '--relatorio', arqRel, '--timeout', '5', ...extra], { agora: AGORA });
  } finally {
    console.error = original;
  }
  return { codigo, stderr: erros.join('\n'), arqEstado, relatorio: fs.existsSync(arqRel) ? fs.readFileSync(arqRel, 'utf8') : '' };
}

for (const estadoTexto of ['{}', '[]', 'null', '{"itens":[]}']) {
  test(`main: estado malformado ${estadoTexto} sem --atualizar sai com 2, sem nenhum acesso à rede`, async (t) => {
    const { base, cont } = await servidorContador(t);
    const entrada = { situacao: [{ titulo: 'Local', links: [{ url: `${base}/pagina` }] }] };
    const { codigo, stderr, arqEstado } = await rodarMainCapturando(t, { entrada, estadoTexto });
    assert.equal(codigo, 2, stderr);
    assert.match(stderr, /estado de referência malformado/);
    assert.equal(cont.n, 0, 'não deveria haver requisição');
    assert.equal(fs.readFileSync(arqEstado, 'utf8'), estadoTexto, 'estado não pode ser regravado');
  });
}

test('CLI: estado malformado [] sem --atualizar sai com 2 e "malformado" no stderr', (t) => {
  const dir = pastaTemp(t);
  const entrada = path.join(dir, 'concurso.json');
  const estado = path.join(dir, 'estado.json');
  fs.writeFileSync(entrada, JSON.stringify({ situacao: [] }));
  fs.writeFileSync(estado, '[]');
  const r = rodar(['--entrada', entrada, '--estado', estado]);
  assert.equal(r.status, 2, r.stderr);
  assert.match(r.stderr, /malformado/);
  assert.equal(fs.readFileSync(estado, 'utf8'), '[]');
});

test('CLI: --atualizar com estado [] e entrada vazia avisa e regrava com "itens" objeto', (t) => {
  const dir = pastaTemp(t);
  const entrada = path.join(dir, 'concurso.json');
  const estado = path.join(dir, 'estado.json');
  const relatorio = path.join(dir, 'rel.md');
  fs.writeFileSync(entrada, JSON.stringify({ situacao: [] }));
  fs.writeFileSync(estado, '[]');
  const r = rodar(['--entrada', entrada, '--estado', estado, '--relatorio', relatorio, '--atualizar']);
  assert.notEqual(r.status, 2, r.stderr);
  assert.notEqual(r.status, 3, r.stderr);
  assert.match(r.stderr, /AVISO: estado de referência malformado/);
  const gravado = JSON.parse(fs.readFileSync(estado, 'utf8'));
  assert.ok(gravado.geradoEm);
  assert.ok(gravado.itens && typeof gravado.itens === 'object' && !Array.isArray(gravado.itens));
  assert.deepEqual(gravado.itens, {});
  assert.equal(fn('estadoValido')(gravado), true);
});

test('main: estado válido {"itens":{}} com URL nova lida com sucesso sai com 3 (url-nova), não 2', async (t) => {
  const { base, cont } = await servidorContador(t);
  const UN = `${base}/pagina`;
  const entrada = { situacao: [{ titulo: 'Local', links: [{ url: UN }] }] };
  const { codigo, stderr, relatorio } = await rodarMainCapturando(t, { entrada, estadoTexto: '{"itens":{}}' });
  assert.notEqual(codigo, 2, stderr);
  assert.equal(codigo, 3, relatorio + stderr);
  assert.doesNotMatch(stderr, /malformado/);
  assert.ok(cont.n >= 1, 'a URL nova deveria ter sido lida');
  assert.match(relatorio, /Houve mudança/);
});

// ---------- prazoMs (fim do dia e hora sem fuso = Brasília) ----------
test('prazoMs: "AAAA-MM-DD" vira 23:59 de Brasília (com ou sem espaços)', () => {
  const prazoMs = fn('prazoMs');
  const esperado = Date.parse('2026-12-01T02:59:00Z');
  assert.equal(prazoMs('2026-11-30'), esperado);
  assert.equal(prazoMs('  2026-11-30 \n'), esperado);
});

test('prazoMs: ISO com hora e sem fuso é lido como -03:00', () => {
  const prazoMs = fn('prazoMs');
  assert.equal(prazoMs('2026-11-30T10:00'), Date.parse('2026-11-30T13:00:00Z'));
  assert.equal(prazoMs('2026-11-30T10:00:00'), Date.parse('2026-11-30T13:00:00Z'));
  assert.equal(prazoMs('2026-11-30T10:00:00.500'), Date.parse('2026-11-30T13:00:00.500Z'));
});

test('prazoMs: com fuso explícito segue Date.parse', () => {
  const prazoMs = fn('prazoMs');
  for (const s of ['2026-11-30T23:59:00Z', '2026-11-30T23:59:00-03:00', '2026-11-30T23:59:00+00:00']) {
    assert.equal(prazoMs(s), Date.parse(s), s);
  }
  assert.equal(prazoMs('2026-11-30T23:59:00Z'), prazoMs('2026-11-30T23:59:00+00:00'));
});

test('prazoMs: inválido ou não-texto dá NaN', () => {
  const prazoMs = fn('prazoMs');
  for (const v of ['lixo', '', null, undefined, {}]) {
    assert.ok(Number.isNaN(prazoMs(v)), `esperava NaN para ${JSON.stringify(v)}`);
  }
});

test('certameEncerrado: "AAAA-MM-DD" só encerra depois do fim do dia em Brasília', () => {
  const certameEncerrado = fn('certameEncerrado');
  const item = { encerraEm: '2026-11-30' };
  assert.equal(certameEncerrado(item, Date.parse('2026-11-30T22:00:00-03:00')), false);
  assert.equal(certameEncerrado(item, Date.parse('2026-12-01T00:00:00-03:00')), true);
});

test('listarUrls/listarEncerrados: encerraEm "2026-11-30" às 22h de 29/11 (Brasília) continua monitorado', () => {
  const listarUrls = fn('listarUrls');
  const listarEncerrados = fn('listarEncerrados');
  const agora = Date.parse('2026-11-29T22:00:00-03:00');
  const concurso = { situacao: [{ titulo: 'C', encerraEm: '2026-11-30', links: [{ url: 'https://c/1' }] }] };
  assert.deepEqual(listarUrls(concurso, agora), { C: ['https://c/1'] });
  assert.deepEqual(listarEncerrados(concurso, agora), []);
});

test('prazoMs: resultado igual com TZ=UTC e TZ=America/Sao_Paulo', (t) => {
  fn('prazoMs');
  const dir = pastaTemp(t);
  const sonda = path.join(dir, 'sonda-prazo.mjs');
  const entradas = ['2026-11-30', ' 2026-11-30 ', '2026-11-30T10:00', '2026-11-30T10:00:00', '2026-11-30T10:00:00.500',
    '2026-11-30T23:59:00Z', '2026-11-30T23:59:00-03:00', '2026-11-30T23:59:00+00:00', 'lixo', '',
    '2026-11-30T10:00:00.123456'];
  const iLonga = entradas.length - 1;
  fs.writeFileSync(sonda, [
    `import { prazoMs } from ${JSON.stringify(pathToFileURL(SCRIPT).href)};`,
    `const entradas = ${JSON.stringify(entradas)};`,
    `process.stdout.write(JSON.stringify(entradas.map((e) => String(prazoMs(e)))));`,
  ].join('\n'));
  const rodar = (tz) => {
    const r = spawnSync(process.execPath, [sonda], { env: { ...process.env, TZ: tz }, encoding: 'utf8', timeout: 30000 });
    assert.equal(r.status, 0, `TZ=${tz}: ${r.stderr}`);
    return JSON.parse(r.stdout);
  };
  const utc = rodar('UTC');
  const sp = rodar('America/Sao_Paulo');
  assert.deepEqual(utc, sp);
  assert.equal(utc[0], String(Date.parse('2026-12-01T02:59:00Z')));
  assert.equal(utc[2], String(Date.parse('2026-11-30T13:00:00Z')));
  // Hora sem fuso (sem segundos e com casas decimais longas) = Brasília, igual nos dois fusos.
  assert.equal(utc[2], String(Date.parse('2026-11-30T10:00-03:00')));
  assert.equal(utc[iLonga], String(Date.parse('2026-11-30T10:00:00.123456-03:00')));
  assert.ok(Number.isFinite(Number(utc[iLonga])), 'casas decimais longas devem dar número');
});

// ---------- certificados do sistema (PC atrás de proxy que intercepta HTTPS) ----------
test('confiarNosCertificadosDoSistema: soma os do sistema sem perder os do Node', async (t) => {
  const tls = await import('node:tls');
  const { X509Certificate } = await import('node:crypto');
  const confiar = fn('confiarNosCertificadosDoSistema');
  if (typeof tls.setDefaultCACertificates !== 'function' || typeof tls.getCACertificates !== 'function') {
    assert.equal(confiar(), false); // Node antigo: não mexe em nada (só avisa no stderr)
    return;
  }
  const antes = tls.getCACertificates('default');
  t.after(() => tls.setDefaultCACertificates(antes)); // não deixa a troca vazar para os outros testes
  const legivel = (c) => { try { new X509Certificate(c); return true; } catch { return false; } };
  const sistema = tls.getCACertificates('system').filter(legivel); // ilegíveis são descartados de propósito
  assert.equal(confiar(), true);
  // o Node devolve o mesmo certificado com quebras de linha diferentes: comparar sem espaços
  const norm = (c) => c.replace(/\s+/g, '');
  const depoisLista = tls.getCACertificates('default');
  const depois = new Set(depoisLista.map(norm));
  assert.ok(antes.every((c) => depois.has(norm(c))), 'perdeu certificado padrão do Node');
  assert.ok(sistema.every((c) => depois.has(norm(c))), 'faltou certificado do sistema');
  assert.equal(depoisLista.length, depois.size, 'ficou certificado duplicado');
  assert.equal(confiar(), true, 'chamar de novo não pode falhar');
});

test('confiarNosCertificadosDoSistema: chamada uma única vez, dentro do bloco chamadoDiretamente, antes de main', () => {
  const fonte = fs.readFileSync(SCRIPT, 'utf8');
  const chamadas = fonte.match(/^\s*confiarNosCertificadosDoSistema\(\);/gm) || [];
  assert.equal(chamadas.length, 1, 'deve haver uma única chamada (a do bloco chamadoDiretamente)');
  const bloco = fonte.slice(fonte.lastIndexOf('if (chamadoDiretamente())'));
  assert.match(bloco, /^\s*confiarNosCertificadosDoSistema\(\);[^\n]*\n\s*main\(/m);
});

test('confiarNosCertificadosDoSistema: importar o script não troca os certificados padrão', async (t) => {
  const tls = await import('node:tls');
  if (typeof tls.getCACertificates !== 'function') { t.skip('Node sem tls.getCACertificates'); return; }
  // processo novo: importa o módulo e confere que a lista padrão (conteúdo, não só o tamanho) não mudou
  const codigo = `import tls from 'node:tls';
    const lista = () => tls.getCACertificates('default').map((c) => c.replace(/\\s+/g, '')).sort().join('|');
    const a = lista();
    await import(${JSON.stringify(pathToFileURL(SCRIPT).href)});
    console.log(a === lista() ? 'igual' : 'mudou');`;
  const r = spawnSync(process.execPath, ['--input-type=module', '-e', codigo], { encoding: 'utf8', timeout: 60000 });
  assert.equal(r.status, 0, r.stderr);
  assert.equal(r.stdout.trim(), 'igual', r.stderr);
});

// ---------- Rodada 2026-11-27: trechos das datas novas e sugestão de ajuste no site ----------
test('trechosDeData: acha dd/mm/aaaa, dd/mm/aa, por extenso com acento e sem ano; respeita max', () => {
  const trechosDeData = fn('trechosDeData');
  const texto = 'Inscrições de 19/11 a 21/12/2026 às 17h. Prova em 1º de Março de 2027. Recurso até 22/12/26. Cronograma: 05/01.';
  assert.match(trechosDeData(texto, '2026-12-21')[0], /19\/11 a 21\/12\/2026 às 17h/);
  assert.match(trechosDeData(texto, '2027-03-01')[0], /1º de Março de 2027/);
  assert.match(trechosDeData(texto, '2026-12-22')[0], /22\/12\/26/);
  assert.match(trechosDeData(texto, '--01-05')[0], /Cronograma: 05\/01/);
  assert.deepEqual(trechosDeData(texto, '2026-12-25'), []);
  const repetido = Array.from({ length: 5 }, (_, i) => `item ${i} em 10/10/2026 ${'x'.repeat(200)}`).join(' ');
  assert.equal(trechosDeData(repetido, '2026-10-10').length, 2);
  assert.equal(trechosDeData(repetido, '2026-10-10', { max: 1 }).length, 1);
  assert.ok(trechosDeData(repetido, '2026-10-10')[0].endsWith('…'));
});

test('trechosDeData: 21/12/2026 não casa dentro de 121/12/2026 nem 21/12/20260', () => {
  const trechosDeData = fn('trechosDeData');
  assert.deepEqual(trechosDeData('código 121/12/2026 e 21/12/20260', '2026-12-21'), []);
});

const mudConteudo = (o) => [{ titulo: T, url: U, tipo: 'conteudo', datasEntraram: [], datasSairam: [], linksEntraram: [], linksSairam: [], ...o }];
const atuais = (...datas) => ({ datasAtuais: new Map([[T, new Set(datas)]]) });
const tem = (lista, re) => lista.some((x) => re.test(x));

test('sugerirAjustes: prazo do site não aparece -> provável mudança; data do cartão ausente; documento novo; datas novas', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const concurso = { situacao: [{ titulo: T, encerraEm: '2026-12-15T17:00:00-03:00', texto: 'Inscrições até 15/12/2026; prova em 10/01/2027.' }] };
  const mud = mudConteudo({ datasEntraram: ['2026-12-21', '--01-05'], datasSairam: ['2026-12-15', '2027-01-10'], linksEntraram: ['https://x/retifica.pdf'] });
  const s = sugerirAjustes(mud, concurso, atuais('2026-12-21', '--01-05')).get(T);
  assert.ok(tem(s, /Datas novas nos documentos: 05\/01 \(sem ano\), 21\/12\/2026\./), s.join('\n'));
  assert.ok(tem(s, /Prazo no site: 15\/12\/2026.*NÃO foi encontrada/), s.join('\n'));
  assert.ok(tem(s, /cartão.*10\/01\/2027/), s.join('\n'));
  assert.ok(tem(s, /Documento novo publicado \(1\)/), s.join('\n'));
});

test('sugerirAjustes: nunca diz que está tudo bem; prazo presente é dito com ressalva e as datas novas aparecem', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const concurso = { situacao: [{ titulo: T, encerraEm: '2026-12-21', texto: 'até 21/12/2026' }] };
  const s = sugerirAjustes(mudConteudo({ datasEntraram: ['2027-02-02'] }), concurso, atuais('2026-12-21', '2027-02-02')).get(T);
  assert.ok(tem(s, /Datas novas nos documentos: 02\/02\/2027/), s.join('\n'));
  assert.ok(tem(s, /Prazo no site: 21\/12\/2026.*ainda aparece \(pode ser só no edital antigo\)/), s.join('\n'));
  assert.ok(!tem(s, /Nada indica|tudo certo|nada muda/i), s.join('\n'));
  assert.equal(sugerirAjustes([{ titulo: T, url: U, tipo: 'url-nova' }], concurso).size, 0);
  assert.equal(sugerirAjustes([], {}).size, 0);
});

test('sugerirAjustes: sem retrato do certame não confere prazo nem cartão (não chuta "NÃO aparece")', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const concurso = { situacao: [{ titulo: T, encerraEm: '2026-12-21', texto: 'até 21/12/2026' }] };
  const s = sugerirAjustes(mudConteudo({ datasEntraram: ['2027-02-02'] }), concurso).get(T);
  assert.ok(tem(s, /Sem retrato atual/), s.join('\n'));
  assert.ok(!tem(s, /NÃO foi encontrada|Prazo no site/), s.join('\n'));
});

test('presencaDaData: com ano, só sem ano e ausente; data sem ano casa com data completa do mesmo dia', () => {
  const p = fn('presencaDaData');
  assert.equal(p('2026-12-10', ['2026-12-10']), 'com ano');
  assert.equal(p('2026-12-10', ['--12-10']), 'sem ano');
  assert.equal(p('2026-12-10', ['2025-12-10']), 'nao');
  assert.equal(p('--12-10', ['2026-12-10']), 'com ano');
  assert.equal(p('--12-10', ['--12-10']), 'sem ano');
  assert.equal(p('--12-10', []), 'nao');
});

test('main: relatório traz o trecho da data nova e a sugestão; --atualizar não grava o texto no estado', async (t) => {
  const base = await servidorLocal(t, (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end('<html><body><p>Inscrições prorrogadas até 21/12/2026 às 17h.</p></body></html>');
  });
  const UL = `${base}/pagina`;
  const entrada = { situacao: [{ titulo: 'Local', encerraEm: '2099-12-15', texto: 'até 15/12/2099', links: [{ url: UL }] }] };
  const estadoAnt = { geradoEm: 'x', itens: { Local: { [UL]: ok(['2099-12-15']) } } };
  const dir = pastaTemp(t);
  const arq = { entrada: path.join(dir, 'c.json'), estado: path.join(dir, 'e.json'), rel: path.join(dir, 'r.md') };
  fs.writeFileSync(arq.entrada, JSON.stringify(entrada));
  fs.writeFileSync(arq.estado, JSON.stringify(estadoAnt));
  const arqChave = path.join(dir, 'chave.txt');
  const codigo = await fn('main')(['--entrada', arq.entrada, '--estado', arq.estado, '--relatorio', arq.rel, '--chave', arqChave, '--atualizar', '--timeout', '5'], { agora: AGORA });
  const rel = fs.readFileSync(arq.rel, 'utf8');
  assert.equal(codigo, 3, rel);
  assert.match(rel, /Trecho com 21\/12\/2026: `Inscrições prorrogadas até 21\/12\/2026 às 17h\.`/);
  assert.match(rel, /Sugestão de ajuste no site/);
  assert.match(rel, /Prazo no site: 15\/12\/2099.*NÃO foi encontrada/);
  assert.match(rel, /Para aplicar:/);
  assert.ok(rel.indexOf('Sugestão de ajuste') < rel.indexOf('Datas que entraram'), 'a sugestão vem antes da lista');
  const gravado = fs.readFileSync(arq.estado, 'utf8');
  assert.ok(!gravado.includes('prorrogadas'), 'o texto do documento não pode ir para o estado');
  assert.equal(JSON.parse(gravado).itens.Local[UL].texto, undefined);
  // a chave de deduplicação (hash do aviso) não leva trecho nem sugestão: só as mudanças
  const chave = fs.readFileSync(arqChave, 'utf8');
  assert.ok(!/prorrogadas|Sugest|Trecho/.test(chave), chave);
});

test('trechosDeData: segue as fronteiras do extrator (fração, número com ponto, ano de 2 dígitos)', () => {
  const trechosDeData = fn('trechosDeData');
  assert.deepEqual(trechosDeData('nota 5/1 apenas', '--01-05'), []); // "5/1" é fração
  assert.match(trechosDeData('nota 5/1; cronograma 05/01', '--01-05')[0], /05\/01/);
  assert.deepEqual(trechosDeData('versão 21.12.2026.1', '2026-12-21'), []);
  // positivos de dd.mm.aaaa e dd-mm-aaaa (o negativo acima só vale se estes casam)
  assert.equal(trechosDeData('até 15-12-2026', '2026-12-15').length, 1);
  assert.equal(trechosDeData('até 15.12.2026', '2026-12-15').length, 1);
  assert.equal(trechosDeData('em 2-2-2026', '2026-02-02').length, 1);
  assert.equal(trechosDeData('em 21.12.2026 às 17h', '2026-12-21').length, 1);
  assert.deepEqual(trechosDeData('em 01/01/69', '1969-01-01'), []); // o extrator lê 69 como 2069
  assert.equal(trechosDeData('em 01/01/69', '2069-01-01').length, 1);
});

test('sugerirAjustes: cronograma sem ano 15/12 -> 21/12 dá "NÃO aparece"; prazo só sem ano dá aviso de conferência', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const concurso = { situacao: [{ titulo: T, encerraEm: '2026-12-15T23:59:00-03:00', texto: '' }] };
  const mud = mudConteudo({ datasEntraram: ['--12-21'], datasSairam: ['--12-15'] });
  const a = sugerirAjustes(mud, concurso, atuais('--12-21')).get(T);
  assert.ok(tem(a, /15\/12\/2026.*NÃO foi encontrada/) && tem(a, /21\/12 \(sem ano\)/), a.join('\n'));
  // prazo mudou, mas o cronograma ainda cita "15/12" para outro evento: não esconde, pede conferência
  const b = sugerirAjustes(mud, concurso, atuais('2026-12-21', '--12-15')).get(T);
  assert.ok(tem(b, /só aparece sem o ano \(15\/12\): conferir/), b.join('\n'));
});

test('sugerirAjustes: data que só mudou de documento continua "aparece" (com ressalva); sumida de todos dá "NÃO aparece"', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const concurso = { situacao: [{ titulo: T, encerraEm: '2026-12-15', texto: '' }] };
  const mud = mudConteudo({ datasSairam: ['2026-12-15'] });
  assert.ok(tem(sugerirAjustes(mud, concurso, atuais('2026-12-15')).get(T), /ainda aparece/));
  assert.ok(tem(sugerirAjustes(mud, concurso, atuais()).get(T), /NÃO foi encontrada/));
});

test('sugerirAjustes: data do cartão sem ano é achada pela data completa; cargos/detalhes não viram "data do cartão"', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const concurso = { situacao: [{ titulo: T, texto: 'inscrições até 10/12', detalhes: [{ rotulo: 'carga', valor: '20/11 h' }] }] };
  const mud = mudConteudo({ datasEntraram: ['2026-12-15'], datasSairam: ['2026-12-10'] });
  const s = sugerirAjustes(mud, concurso, atuais('2026-12-15')).get(T);
  assert.ok(tem(s, /cartão.*10\/12 \(sem ano\)/), s.join('\n'));
  assert.ok(!tem(s, /20\/11/), s.join('\n'));
  assert.ok(!tem(sugerirAjustes(mud, concurso, atuais('2026-12-10')).get(T), /cartão/));
});

test('sugerirAjustes: documento que não abriu (com e sem leitura anterior) é avisado; datas novas com teto', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const concurso = { situacao: [{ titulo: T, encerraEm: '2026-12-15', texto: '' }] };
  const muitas = Array.from({ length: 12 }, (_, i) => `2027-03-${String(i + 1).padStart(2, '0')}`);
  const s = sugerirAjustes(mudConteudo({ datasEntraram: muitas }), concurso,
    { ...atuais(...muitas), naoAbriram: new Map([[T, 2]]), semLeitura: new Map([[T, 1]]) }).get(T);
  assert.ok(tem(s, /Datas novas nos documentos: .*\(\+4\)\./), s.join('\n'));
  assert.ok(tem(s, /1 documento\(s\) deste certame não abriram agora; para eles valeu a última leitura boa/), s.join('\n'));
  assert.ok(tem(s, /1 documento\(s\) deste certame nunca foram lidos/), s.join('\n'));
});

test('sugerirAjustes: encerraEm em UTC e às 00:00 são lidos no dia certo de Brasília; usa o certame aberto', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const mud = mudConteudo({ datasSairam: ['2026-12-21'] });
  const utc = { situacao: [{ titulo: T, encerraEm: '2026-12-22T02:59:00Z', texto: '' }] }; // 21/12 23h59 em Brasília
  assert.ok(tem(sugerirAjustes(mud, utc, atuais('2026-12-21')).get(T), /Prazo no site: 21\/12\/2026.*ainda aparece/));
  const meiaNoite = { situacao: [{ titulo: T, encerraEm: '2026-12-22T00:00:00-03:00', texto: '' }] }; // até o fim do dia 21
  assert.ok(tem(sugerirAjustes(mud, meiaNoite, atuais('2026-12-21')).get(T), /Prazo no site: 21\/12\/2026/));
  const dois = { situacao: [{ titulo: T, encerraEm: '2020-01-10', texto: '' }, { titulo: T, encerraEm: '2099-12-21', texto: '' }] };
  assert.ok(tem(sugerirAjustes(mud, dois, { ...atuais('2099-12-21'), agora: AGORA }).get(T), /Prazo no site: 21\/12\/2099/));
});

test('trechosDeData: "010/12/2026" não é data; emoji não é cortado ao meio', () => {
  const trechosDeData = fn('trechosDeData');
  assert.deepEqual(trechosDeData('protocolo 010/12/2026', '2026-12-10'), []);
  const emoji = '😀';
  // emoji ocupa as posições 88-89; a data começa em 91; raio 2 faz o corte cair em 89 (metade baixa do emoji)
  const t = trechosDeData(`${'x'.repeat(88)}${emoji} 10/12/2026`, '2026-12-10', { raio: 2 })[0];
  assert.ok(t.includes(emoji), t);
  assert.ok(!/[\uD800-\uDFFF]/.test(t.replace(/😀/g, '')), 'sobrou metade de par substituto');
});

test('montarRelatorio: teto de trechos e trecho como código inline (sem @, HTML nem comentário)', () => {
  const montarRelatorio = fn('montarRelatorio');
  const isos = Array.from({ length: 40 }, (_, i) => `2027-01-${String((i % 28) + 1).padStart(2, '0')}`).filter((x, i, a) => a.indexOf(x) === i);
  const mud = [{ titulo: T, url: U, tipo: 'conteudo', datasEntraram: isos, datasSairam: [], linksEntraram: [], linksSairam: [] }];
  const trechos = new Map([[U, new Map(isos.map((iso) => [iso, [`a ${iso} b`, `c ${iso} d`]]))]]);
  const rel = montarRelatorio({ comparacao: { mudancas: mud, inacessiveis: [], linhasBase: [] }, urlsPorTitulo: { [T]: [U] }, geradoEm: 'x', semReferencia: false, trechos });
  assert.equal((rel.match(/Trecho com/g) || []).length, 30);
  assert.match(rel, /trecho\(s\) omitido\(s\)/);
  const trechoSeguro = fn('trechoSeguro');
  assert.equal(trechoSeguro('até 21/12 @fulano <!-- x `y`'), '`até 21/12 @fulano <!-- x \'y\'`');
});

test('trechosDeDatas: toda data que extrairDatas acha tem pelo menos um trecho (consistência)', () => {
  const extrairDatas = fn('extrairDatas');
  const trechosDeDatas = fn('trechosDeDatas');
  const texto = 'Inscrições de 19/11 a 21/12/2026 às 17h; prova 1º de março de 2027; recurso 22/12/26; '
    + 'resultado 15-01-2027 e 16.01.2027; homologação em 3 de Fevereiro de 2027; cronograma 05/01, 10/12.';
  const datas = extrairDatas(texto);
  assert.ok(datas.length >= 9, datas.join(','));
  const t = trechosDeDatas(texto, datas);
  for (const iso of datas) assert.ok((t.get(iso) || []).length >= 1, `sem trecho para ${iso}`);
});
test('sugerirAjustes: mudança só de datas que saíram, sem prazo nem cartão, não gera sugestão nem "Para aplicar"', () => {
  const sugerirAjustes = fn('sugerirAjustes');
  const mud = mudConteudo({ datasSairam: ['2026-10-01'] });
  const sug = sugerirAjustes(mud, { situacao: [{ titulo: T, texto: '' }] }, atuais());
  assert.equal(sug.size, 0);
  const rel = fn('montarRelatorio')({ comparacao: { mudancas: mud, inacessiveis: [], linhasBase: [] }, urlsPorTitulo: { [T]: [U] }, geradoEm: 'x', semReferencia: false, sugestoes: sug });
  assert.ok(!rel.includes('Para aplicar'), rel);
});