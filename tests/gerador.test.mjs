// Testes do gerador de apostilas. Rodar: node --test tests/gerador.test.mjs   (no Node 24, "node --test tests/" NAO funciona)
// Usa so o executor nativo do Node (node:test). Toda saida vai para uma pasta temporaria do sistema, nunca para o repositorio.
import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const RAIZ = path.resolve(import.meta.dirname, '..');
const GERADOR = path.join(RAIZ, 'scripts', 'gerar-apostila-materia.mjs');
const AMOSTRA = path.join(RAIZ, 'scripts', 'gerar-amostra-apostila.mjs');
const MODELO = path.join(RAIZ, 'curso', 'apostila', '_modelo-portugues.json');
const HTML_NOME = 'apostila-01-lingua-portuguesa.html';
const PDF_NOME = 'apostila-01-lingua-portuguesa.pdf';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gerador-apostila-'));
test.after(() => fs.rmSync(tmp, { recursive: true, force: true }));
const pasta = (nome) => path.join(tmp, nome);
const rodar = (script, args, env = {}) => spawnSync(process.execPath, [script, ...args], { encoding: 'utf8', cwd: RAIZ, env: { ...process.env, ...env }, timeout: 300000, maxBuffer: 64 * 1024 * 1024 });

const css = await import(pathToFileURL(path.join(RAIZ, 'scripts', 'apostila-css.mjs')).href);

test('(1) gera o HTML do modelo com --teste e --saida', () => {
  const out = pasta('html');
  const r = rodar(GERADOR, [MODELO, '--json-externo', '--teste', '--saida', out]);
  assert.strictEqual(r.status, 0, r.stderr);
  const arq = path.join(out, HTML_NOME);
  assert.ok(fs.existsSync(arq), 'HTML nao foi gerado');
  const html = fs.readFileSync(arq, 'utf8');
  assert.match(html, /Apostila 01/);
  assert.match(html, /BANCO DE TESTE/);
  assert.match(html, /Página ' counter\(page\) ' de ' counter\(pages\)/);
});

test('(2) --pdf com o modelo e sem --saida e recusado', () => {
  const r = rodar(GERADOR, [MODELO, '--json-externo', '--pdf']);
  assert.notStrictEqual(r.status, 0);
  assert.match(r.stderr, /use --saida/);
  assert.ok(!fs.existsSync(path.join(RAIZ, 'material-premium', PDF_NOME)), 'nao pode gravar em material-premium');
});

test('(2b) --teste sem --saida e recusado', () => {
  const r = rodar(GERADOR, [MODELO, '--json-externo', '--teste']);
  assert.notStrictEqual(r.status, 0);
});

// Erro de origem (19/11/2026): NAVEGADOR_PDF apontando para arquivo inexistente era ignorado e o script usava outro navegador sem avisar.
test('(4a) NAVEGADOR_PDF inexistente falha e nao grava PDF', () => {
  const out = pasta('navegador-ruim');
  const r = rodar(GERADOR, [MODELO, '--json-externo', '--teste', '--pdf', '--saida', out], { NAVEGADOR_PDF: path.join(tmp, 'nao-existe.exe') });
  assert.notStrictEqual(r.status, 0, 'deveria falhar');
  assert.match(r.stderr, /Edge\/Chrome nao encontrado/);
  assert.ok(!fs.existsSync(path.join(out, PDF_NOME)), 'PDF nao pode existir');
});

test('(4a2) escolherNavegador respeita NAVEGADOR_PDF inexistente (sem cair em outro navegador)', () => {
  const antes = process.env.NAVEGADOR_PDF;
  process.env.NAVEGADOR_PDF = path.join(tmp, 'nao-existe.exe');
  try { assert.strictEqual(css.escolherNavegador(), undefined); }
  finally { if (antes === undefined) delete process.env.NAVEGADOR_PDF; else process.env.NAVEGADOR_PDF = antes; }
});

// Erro de origem (19/11/2026): a amostra nao repassava refArtSo (trechos com artigo conferido mas dispositivo nao conferido) para a secao "Limites".
test('(4b) a amostra repassa refArtSo para a secao Limites', () => {
  const fonte = fs.readFileSync(AMOSTRA, 'utf8');
  assert.match(fonte, /trechos:\s*\{[^}]*refArtSo:\s*st\.refArtSo/);
  const limites = css.secaoLimites({ limiteFonte: 'x', trechos: { n: 2, refOk: 1, refArtSo: 1, refSem: 0, semMarcador: 0, arquivos: ['a.html'] }, conceitos: 0, radar: false, questoes: { n: 0, teste: false, excl: null }, amostra: true }, (s) => s);
  assert.match(limites, /NÃO conferido em 1/);
});

// Erro de origem (19/11/2026): questoes que dependem de figura/imagem que o banco NAO tem (G0128, G0160, G0169...) entravam nas apostilas e no site,
// e o aluno nao conseguia responder. O banco marca "dependeDeFigura": true e o gerador deve deixar essas questoes de fora, com aviso.
test('(5a) banco de teste: questao com dependeDeFigura NAO entra no HTML, a normal entra, e o gerador avisa', () => {
  const dirJson = pasta('figura-json');
  fs.mkdirSync(dirJson, { recursive: true });
  const modelo = JSON.parse(fs.readFileSync(MODELO, 'utf8'));
  modelo.licoes[0].topicosBanco = ['teste.figura'];
  const arqApostila = path.join(dirJson, 'portugues.json');
  fs.writeFileSync(arqApostila, JSON.stringify(modelo));
  const q = (num, grupo, enunciado, extra = {}) => ({ prova: 'teste-1', municipio: 'Teste', ano: 2025, edital: 'EDITAL TESTE', cargo: 'Teste', alvo: true, num, secao: 'LP', textoBase: null, enunciado, alternativas: ['a1', 'a2', 'a3', 'a4', 'a5'], gabaritoOficial: 'B', alteradoAposPreliminar: false, grupo, topico: 'teste.figura', ...extra });
  const arqBanco = path.join(dirJson, 'banco-figura.json');
  fs.writeFileSync(arqBanco, JSON.stringify({ aviso: 'banco de teste', questoes: [q(1, 'GTESTE1', 'ENUNCIADO NORMAL QWERTY'), q(2, 'GTESTE2', 'ENUNCIADO COM FIGURA ZXCVB observe a figura', { dependeDeFigura: true, motivoFigura: 'teste' })] }));
  const out = pasta('figura-saida');
  const r = rodar(GERADOR, [arqApostila, '--json-externo', '--teste', '--questoes', arqBanco, '--saida', out]);
  assert.strictEqual(r.status, 0, r.stderr);
  const html = fs.readFileSync(path.join(out, HTML_NOME), 'utf8');
  assert.ok(html.includes('ENUNCIADO NORMAL QWERTY'), 'a questao normal deveria aparecer');
  assert.ok(!html.includes('ZXCVB'), 'a questao que depende de figura NAO pode aparecer');
  assert.match(r.stderr, /1 questão\(ões\) fora por depender de figura: GTESTE2 \(crase\)/);
});

test('(5b) banco real: G0128, G0160 e G0169 estao marcadas e nao aparecem nas apostilas 08 e 05', () => {
  const banco = JSON.parse(fs.readFileSync(path.join(RAIZ, 'curso', 'questoes-anteriores.json'), 'utf8')).questoes;
  for (const g of ['G0128', 'G0160', 'G0169']) {
    const copias = banco.filter(x => x.grupo === g);
    assert.ok(copias.length > 0, `${g} sumiu do banco`);
    assert.ok(copias.every(x => x.dependeDeFigura === true && typeof x.motivoFigura === 'string' && x.motivoFigura), `${g} perdeu a marca dependeDeFigura`);
  }
  const casos = [
    ['cirurgia-farmacologia-patologia', 'apostila-08-cirurgia-farmacologia-patologia.html', 'G0128', ['O tipo de fratura apresentado nas figuras B e D']],
    ['cariologia-prevencao-odontopediatria', 'apostila-05-cariologia-prevencao-odontopediatria.html', 'G0160, G0169', ['Criança do sexo feminino, 8 anos de idade, apresenta gengiva', 'A imagem radiográfica pode ser observada']],
  ];
  for (const [id, nomeHtml, grupos, trechos] of casos) {
    const out = pasta(`figura-real-${id}`);
    const r = rodar(GERADOR, [id, '--saida', out]);
    assert.strictEqual(r.status, 0, r.stderr);
    const html = fs.readFileSync(path.join(out, nomeHtml), 'utf8');
    for (const t of trechos) assert.ok(!html.includes(t), `${id}: questao que depende de figura apareceu no HTML ("${t}")`);
    for (const g of grupos.split(', ')) assert.match(r.stderr, new RegExp(`fora por depender de figura:.*${g}`), `${id}: sem aviso para ${g}`);
  }
});

// Erro de origem (19/11/2026): a G0001 (crase) esta no banco com "à" em todas as alternativas (transcricao do PDF), e entrava na apostila 01.
// O banco marca "transcricaoSuspeita": true e o gerador deve deixar a questao de fora, com aviso.
test('(6a) banco de teste: questao com transcricaoSuspeita NAO entra no HTML, a normal entra, e o gerador avisa', () => {
  const dirJson = pasta('transc-json');
  fs.mkdirSync(dirJson, { recursive: true });
  const modelo = JSON.parse(fs.readFileSync(MODELO, 'utf8'));
  modelo.licoes[0].topicosBanco = ['teste.transc'];
  const arqApostila = path.join(dirJson, 'portugues.json');
  fs.writeFileSync(arqApostila, JSON.stringify(modelo));
  const q = (num, grupo, enunciado, extra = {}) => ({ prova: 'teste-1', municipio: 'Teste', ano: 2025, edital: 'EDITAL TESTE', cargo: 'Teste', alvo: true, num, secao: 'LP', textoBase: null, enunciado, alternativas: ['a1', 'a2', 'a3', 'a4', 'a5'], gabaritoOficial: 'B', alteradoAposPreliminar: false, grupo, topico: 'teste.transc', ...extra });
  const arqBanco = path.join(dirJson, 'banco-transc.json');
  fs.writeFileSync(arqBanco, JSON.stringify({ aviso: 'banco de teste', questoes: [q(1, 'GTESTE1', 'ENUNCIADO NORMAL QWERTY'), q(2, 'GTESTE2', 'ENUNCIADO SUSPEITO ZXCVB', { transcricaoSuspeita: true, motivoTranscricao: 'teste' })] }));
  const out = pasta('transc-saida');
  const r = rodar(GERADOR, [arqApostila, '--json-externo', '--teste', '--questoes', arqBanco, '--saida', out]);
  assert.strictEqual(r.status, 0, r.stderr);
  const html = fs.readFileSync(path.join(out, HTML_NOME), 'utf8');
  assert.ok(html.includes('ENUNCIADO NORMAL QWERTY'), 'a questao normal deveria aparecer');
  assert.ok(!html.includes('ZXCVB'), 'a questao com transcricao suspeita NAO pode aparecer');
  assert.match(r.stderr, /1 questão\(ões\) fora por transcrição suspeita: GTESTE2 \(crase\)/);
});

test('(6b) banco real: G0001 esta marcada (todas as copias) e nao aparece na apostila portugues, com aviso', () => {
  const banco = JSON.parse(fs.readFileSync(path.join(RAIZ, 'curso', 'questoes-anteriores.json'), 'utf8')).questoes;
  const copias = banco.filter(x => x.grupo === 'G0001');
  assert.ok(copias.length > 0, 'G0001 sumiu do banco');
  assert.ok(copias.every(x => x.transcricaoSuspeita === true && x.motivoTranscricao), 'G0001 perdeu a marca transcricaoSuspeita em alguma copia');
  const out = pasta('transc-real');
  const r = rodar(GERADOR, ['portugues', '--saida', out]);
  assert.strictEqual(r.status, 0, r.stderr);
  const html = fs.readFileSync(path.join(out, HTML_NOME), 'utf8');
  // trechos das alternativas da G0001 (nao aparecem em nenhuma nota do autor no JSON da apostila; o enunciado dela tem hifenizacao do PDF, por isso nao serve)
  assert.ok(!html.includes('para manter à estrutura do município'), 'G0001 apareceu no HTML da apostila portugues');
  assert.ok(!html.includes('incrementar à receita'), 'G0001 apareceu no HTML da apostila portugues');
  assert.match(r.stderr, /fora por transcrição suspeita:.*G0001/);
});

function navegadorOk() {
  const nav = css.escolherNavegador();
  if (!nav) return 'Edge/Chrome nao encontrado';
  const v = css.versaoNavegador(nav);
  if (v === null || v < css.VERSAO_MINIMA_RODAPE) return `navegador com versao ${v} (< ${css.VERSAO_MINIMA_RODAPE})`;
  if (!css.pdftotextDisponivel()) return 'pdftotext nao encontrado (defina PDFTOTEXT)';
  return null;
}

test('(3) gera o PDF e confere "Apostila 01" e "Página X de N" em todas as paginas', (t) => {
  const motivo = navegadorOk();
  if (motivo) return t.skip('PULADO: ' + motivo);
  const out = pasta('pdf');
  const r = rodar(GERADOR, [MODELO, '--json-externo', '--teste', '--pdf', '--saida', out]);
  assert.strictEqual(r.status, 0, r.stderr);
  const pdf = path.join(out, PDF_NOME);
  assert.ok(css.pdfValido(pdf), 'PDF invalido');
  assert.ok(!fs.existsSync(path.join(out, 'apostila-01-lingua-portuguesa.tmp.pdf')), 'sobrou arquivo temporario');
  // conferencia independente do codigo do projeto
  const p = spawnSync(css.PDFTOTEXT, ['-enc', 'UTF-8', '-layout', pdf, '-'], { encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });
  assert.strictEqual(p.status, 0);
  const paginas = p.stdout.split('\f'); if (!paginas[paginas.length - 1].trim()) paginas.pop();
  const N = paginas.length;
  assert.ok(N > 1);
  paginas.forEach((pg, i) => {
    const txt = pg.replace(/\s+/g, ' ');
    assert.match(txt, new RegExp(`P\\S{1,3}gina ${i + 1} de ${N}(?!\\d)`), `pagina ${i + 1}: sem "Página ${i + 1} de ${N}"`);
    assert.ok(txt.includes('Apostila 01'), `pagina ${i + 1}: sem "Apostila 01"`);
  });

  // amostra (recorte de uma licao) sobre o HTML recem-gerado
  const a = rodar(AMOSTRA, [MODELO, 'crase', '--json-externo', '--teste', '--saida', out]);
  assert.strictEqual(a.status, 0, a.stderr);
  assert.ok(css.pdfValido(path.join(out, 'amostra-apostila-01-lingua-portuguesa.pdf')));
});
