// Testes de scripts/leis-compilar-e-conferir.mjs (relatório melhoria-recursiva, seção 7.2).
// Tudo é criado em os.tmpdir(); nada grava dentro do repositório e nada usa rede.
// Rodar: node --test tests/leis.test.mjs   (no Node 24, o arquivo isolado, não a pasta)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const SCRIPT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'scripts', 'leis-compilar-e-conferir.mjs');
// import por namespace: se um nome ainda não existir, só o teste que o usa falha (não o arquivo todo)
const L = await import(pathToFileURL(SCRIPT).href);

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 'leis-test-'));
const gravar = (arq, txt) => { fs.mkdirSync(path.dirname(arq), { recursive: true }); fs.writeFileSync(arq, txt); };
const limpar = (d) => fs.rmSync(d, { recursive: true, force: true });
const achou = (r) => (Array.isArray(r) ? r.length > 0 : Boolean(r));

const ART196 = 'Art. 196. A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas que visem à redução do risco de doença.';
const ART197 = 'Art. 197. São de relevância pública as ações e serviços de saúde, cabendo ao Poder Público dispor sobre sua regulamentação, fiscalização e controle.';

// monta uma raiz temporária com o layout que o script espera (fontes/leis/planalto/txt, curso/apostila)
function montarRaiz({ txts = {}, htmls = {}, apostila = {} }) {
  const raiz = tmp();
  const dirLeis = path.join(raiz, 'fontes', 'leis');
  const dirTxt = path.join(dirLeis, 'planalto', 'txt');
  const dirApostilas = path.join(raiz, 'curso', 'apostila');
  fs.mkdirSync(dirTxt, { recursive: true });
  fs.mkdirSync(dirApostilas, { recursive: true });
  for (const [n, t] of Object.entries(txts)) gravar(path.join(dirTxt, n), t);
  for (const [n, t] of Object.entries(htmls)) gravar(path.join(dirLeis, n), t);
  for (const [n, j] of Object.entries(apostila)) gravar(path.join(dirApostilas, n), JSON.stringify(j));
  return { raiz, dirLeis, dirTxt, dirApostilas };
}

test('importar o módulo não executa comando nem imprime nada', () => {
  const dir = tmp();
  try {
    const r = spawnSync(process.execPath, ['-e', `import(${JSON.stringify(pathToFileURL(SCRIPT).href)}).then(() => process.exit(0), (e) => { console.error(e); process.exit(9); })`], { cwd: dir, encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
    assert.equal(r.stdout, '');
    assert.equal(r.stderr, '');
  } finally { limpar(dir); }
});

test('htmlParaTexto decodifica entidades (nomeadas, decimais, hexadecimais, nbsp, ndash) e não deixa entidade sobrando', () => {
  const out = L.htmlParaTexto('<p>a&uacute; &Aacute; &ccedil;&atilde;o &ocirc; &#233; &#xE9; x&nbsp;y &ndash; z</p>');
  assert.ok(out.includes('aú'), out);
  assert.ok(out.includes('Á'), out);
  assert.ok(out.includes('ção'), out);
  assert.ok(out.includes('ô'), out);
  assert.ok(out.includes('é é'), out);
  assert.ok(out.includes('x y'), out);
  assert.ok(out.includes('–'), out);
  assert.doesNotMatch(out, /&[a-zA-Z]+;|&#x?[0-9a-fA-F]+;/);
  assert.ok(!achou(L.entidadesSobrando(out)));
});

test('htmlParaTexto remove script/style e quebra linha em p, br, tr, li', () => {
  const out = L.htmlParaTexto('<style>.x{color:red}</style><script>var a = 1;</script><p>um</p><p>dois<br>tres</p><table><tr><td>quatro</td></tr><tr><td>cinco</td></tr></table><ul><li>seis</li><li>sete</li></ul>');
  assert.doesNotMatch(out, /color|var a/);
  assert.deepEqual(out.split('\n'), ['um', 'dois', 'tres', 'quatro', 'cinco', 'seis', 'sete']);
});

test('normalizar remove anotação "(Redação dada pela Lei nº 8.080, de 1990)" e acentos', () => {
  const n = L.normalizar('Art. 1º A saúde é um direito (Redação dada pela Lei nº 8.080, de 1990) de todos.');
  assert.equal(n, 'art 1 a saude e um direito de todos');
});

test('normalizarFraca iguala "saúde" e "sa\\uFFFDde"', () => {
  assert.equal(L.normalizarFraca('saúde'), L.normalizarFraca('sa�de'));
  assert.equal(L.normalizarFraca('A saúde é direito'), L.normalizarFraca('A sa�de � direito'));
});

test('normalizarFraca NÃO apaga texto comum com "regulamentar", "incluído", "vide" (regressão F4)', () => {
  const t = 'O SUS regulamentara a materia conforme lei; o item incluido foi dividido e vide o texto sobre vigencia e promulga';
  const n = L.normalizarFraca(t);
  assert.notEqual(n, '');
  for (const p of ['regulamentara', 'incluido', 'vide', 'vigencia', 'promulga']) assert.ok(n.includes(p), `${p} sumiu: "${n}"`);
  assert.equal(L.normalizarFraca('O SUS regulamentara a materia conforme lei'), 'o sus regulamentara a materia conforme lei');
});

test('trecho que vira vazio após normalizar não conta como conferido (regressão do [].every)', () => {
  const trecho = '(Revogado pela Lei nº 9.999, de 2001) (Vide Lei nº 8.080, de 1990) (Incluído pela Lei nº 1, de 2000)';
  assert.ok(trecho.length > 30);
  const { raiz, dirLeis, dirTxt, dirApostilas } = montarRaiz({
    txts: { 'lei-a.txt': ART196 },
    apostila: { 'a.json': { ref: 'x', trecho, fonte: 'planalto/lei-a.htm' } }
  });
  try {
    const r = L.conferirEm({ dirLeis, dirApostilas, dirTxt });
    assert.equal(r.total, 1);
    assert.equal(r.ok, 0);
    assert.equal(r.falhas.length, 1);
    assert.match(r.falhas[0].motivo, /vazio/);
  } finally { limpar(raiz); }
});

test('conferirEm acha trecho presente, acusa trecho ausente e acusa "achado, mas não na fonte citada"', () => {
  const { raiz, dirLeis, dirTxt, dirApostilas } = montarRaiz({
    txts: { 'lei-a.txt': ART196, 'lei-b.txt': ART197 },
    htmls: { 'camara/outra.html': `<html><body><p>${ART196}</p></body></html>` },
    apostila: {
      'a.json': {
        itens: [
          { ref: 'presente', trecho: ART196, fonte: 'planalto/lei-a.htm' },
          { ref: 'presente-html', trecho: ART196, fonte: 'camara/outra.html' },
          { ref: 'ausente', trecho: 'Art. 999. Texto totalmente inventado que não existe em nenhuma norma carregada.', fonte: 'planalto/lei-a.htm' },
          { ref: 'fonte-errada', trecho: ART197, fonte: 'planalto/lei-a.htm' }
        ]
      }
    }
  });
  try {
    const r = L.conferirEm({ dirLeis, dirApostilas, dirTxt });
    assert.equal(r.total, 4);
    assert.equal(r.ok, 2);
    assert.equal(r.falhas.length, 2);
    const por = Object.fromEntries(r.falhas.map((f) => [f.ref, f.motivo]));
    assert.match(por['ausente'], /N[ÃA]O achado em nenhuma norma/);
    assert.match(por['fonte-errada'], /achado, mas não na fonte citada/);
  } finally { limpar(raiz); }
});

test('trecho com "[...]" é conferido por segmentos', () => {
  const { raiz, dirLeis, dirTxt, dirApostilas } = montarRaiz({
    txts: { 'lei-a.txt': ART196 },
    apostila: {
      'a.json': [
        { ref: 'ok', trecho: 'A saúde é direito de todos e dever [...] garantido mediante políticas sociais e econômicas', fonte: 'planalto/lei-a.htm' },
        { ref: 'segmento-falso', trecho: 'A saúde é direito de todos e dever [...] garantido mediante cobrança de taxas obrigatórias', fonte: 'planalto/lei-a.htm' }
      ]
    }
  });
  try {
    const r = L.conferirEm({ dirLeis, dirApostilas, dirTxt });
    assert.equal(r.total, 2);
    assert.equal(r.ok, 1);
    assert.equal(r.falhas.length, 1);
    assert.equal(r.falhas[0].ref, 'segmento-falso');
  } finally { limpar(raiz); }
});

test('compilar acusa entidade não decodificada (entidadesSobrando)', () => {
  assert.ok(achou(L.entidadesSobrando('texto com &foo; sobrando')));
  assert.ok(achou(L.entidadesSobrando('texto com &#9999999; sobrando')));
  assert.ok(achou(L.entidadesSobrando('um &Ccedil; solto')));
  assert.ok(!achou(L.entidadesSobrando('texto limpo, com E & com R&D e 5 < 6')));
  assert.ok(!achou(L.entidadesSobrando('')));
});

test('CLI conferir sai com 1 quando há divergência e com 0 quando tudo confere (LEIS_RAIZ temporária)', () => {
  const ruim = montarRaiz({
    txts: { 'lei-a.txt': ART196 },
    apostila: { 'a.json': { ref: 'x', trecho: 'Art. 999. Texto totalmente inventado que não existe em nenhuma norma carregada.', fonte: 'planalto/lei-a.htm' } }
  });
  const bom = montarRaiz({
    txts: { 'lei-a.txt': ART196 },
    apostila: { 'a.json': { ref: 'x', trecho: ART196, fonte: 'planalto/lei-a.htm' } }
  });
  try {
    const rodar = (raiz) => spawnSync(process.execPath, [SCRIPT, 'conferir'], { encoding: 'utf8', env: { ...process.env, LEIS_RAIZ: raiz } });
    const r1 = rodar(ruim.raiz);
    assert.equal(r1.status, 1, r1.stdout + r1.stderr);
    const r0 = rodar(bom.raiz);
    assert.equal(r0.status, 0, r0.stdout + r0.stderr);
  } finally { limpar(ruim.raiz); limpar(bom.raiz); }
});

test('fonte citada não carregada, mas texto em outra norma: falha; sem campo fonte achado em alguma norma: conferido', () => {
  const { raiz, dirLeis, dirTxt, dirApostilas } = montarRaiz({
    txts: { 'lei-a.txt': ART196 },
    apostila: {
      'a.json': [
        { ref: 'citada-ausente', trecho: ART196, fonte: 'planalto/lei-inexistente.htm' },
        { ref: 'sem-fonte', trecho: ART196 }
      ]
    }
  });
  try {
    const r = L.conferirEm({ dirLeis, dirApostilas, dirTxt });
    assert.equal(r.total, 2);
    assert.equal(r.ok, 1);
    assert.equal(r.falhas.length, 1);
    assert.equal(r.falhas[0].ref, 'citada-ausente');
    assert.match(r.falhas[0].motivo, /fonte citada não carregada/);
  } finally { limpar(raiz); }
});

test('validarDownload recusa conteúdo pequeno, sem <html, Skyhigh e página de erro; aceita HTML válido grande', (t) => {
  if (typeof L.validarDownload !== 'function') { t.skip('validarDownload não é exportada pelo script (função interna; sem teste de rede)'); return; }
  const corpo = 'x'.repeat(3000);
  const recusa = (buf) => assert.ok(L.validarDownload(Buffer.from(buf)), `deveria recusar: ${String(buf).slice(0, 40)}`);
  recusa('<html>' + 'x'.repeat(1000) + '</html>');
  recusa(corpo);
  recusa(`<html>Skyhigh ${corpo}</html>`);
  recusa(`<html>Página não encontrada ${corpo}</html>`);
  recusa(`<html>404 Not Found ${corpo}</html>`);
  assert.ok(!L.validarDownload(Buffer.from(`<html><body>${ART196} ${corpo}</body></html>`)));
});

test('lei.HTM (maiúsculo) em dirLeis é carregado como fonte; x.xhtm não é', () => {
  const { raiz, dirLeis, dirTxt, dirApostilas } = montarRaiz({
    htmls: {
      'camara/lei.HTM': `<html><body><p>${ART196}</p></body></html>`,
      'camara/x.xhtm': `<html><body><p>${ART197}</p></body></html>`
    },
    apostila: {
      'a.json': [
        { ref: 'maiusculo', trecho: ART196, fonte: 'camara/lei.HTM' },
        { ref: 'xhtm', trecho: ART197, fonte: 'camara/x.xhtm' }
      ]
    }
  });
  try {
    const r = L.conferirEm({ dirLeis, dirApostilas, dirTxt });
    assert.equal(r.total, 2);
    assert.equal(r.ok, 1);
    assert.equal(r.falhas.length, 1);
    assert.equal(r.falhas[0].ref, 'xhtm');
  } finally { limpar(raiz); }
});

test('decodificar: UTF-8 com U+FFFD isolado continua UTF-8; Latin-1 vira acento certo; caminho completo acha "saúde"', () => {
  const utf = L.decodificar(Buffer.from('A saúde � é direito', 'utf8'));
  assert.ok(utf.includes('saúde'), utf);
  const lat = L.decodificar(Buffer.from('A saúde é direito', 'latin1'));
  assert.ok(lat.includes('saúde'), lat);
  const html = Buffer.from('<html><body><p>A saúde é direito � de todos</p></body></html>', 'utf8');
  const texto = L.htmlParaTexto(L.decodificar(html));
  assert.ok(texto.includes('saúde'), texto);
  assert.ok(L.normalizarFraca(texto).includes(L.normalizarFraca('saúde')), L.normalizarFraca(texto));
  assert.ok(L.normalizar(texto).includes('saude'));
});

test('htmlParaTexto separa células de tabela com espaço e não separa tags inline', () => {
  assert.ok(L.htmlParaTexto('<td>art. 1º</td><td>texto</td>').includes('art. 1º texto'));
  assert.equal(L.htmlParaTexto('<b>ab</b>c'), 'abc');
});

test('compilar (CLI, LEIS_RAIZ temporária) apaga txt órfão, avisa e mantém o txt do .htm existente', () => {
  const raiz = tmp();
  try {
    const plan = path.join(raiz, 'fontes', 'leis', 'planalto');
    gravar(path.join(plan, 'lei-a.htm'), `<html><body><p>${ART196}</p></body></html>`);
    gravar(path.join(plan, 'txt', 'orfao.txt'), 'sem html correspondente');
    gravar(path.join(plan, 'txt', 'lei-a.txt'), 'antigo');
    const r = spawnSync(process.execPath, [SCRIPT, 'compilar'], { encoding: 'utf8', env: { ...process.env, LEIS_RAIZ: raiz } });
    assert.equal(r.status, 0, r.stdout + r.stderr);
    assert.match(r.stdout, /órfão removido/);
    assert.ok(!fs.existsSync(path.join(plan, 'txt', 'orfao.txt')));
    const novo = fs.readFileSync(path.join(plan, 'txt', 'lei-a.txt'), 'utf8');
    assert.ok(novo.includes('A saúde é direito de todos'), novo);
  } finally { limpar(raiz); }
});

test('conferirEm: trecho só com segmentos curtos (<= 12 caracteres) falha se ausente e confere se presente', () => {
  const { raiz, dirLeis, dirTxt, dirApostilas } = montarRaiz({
    txts: { 'lei-a.txt': 'Aqui consta abc de e depois fgh ij e por fim klm no pq encerrando.' },
    apostila: {
      'a.json': [
        { ref: 'curto-presente', trecho: 'abc de [...] fgh ij [...] klm no pq', fonte: 'planalto/lei-a.htm' },
        { ref: 'curto-ausente', trecho: 'abc de [...] xyz wv [...] klm no pq', fonte: 'planalto/lei-a.htm' }
      ]
    }
  });
  try {
    const r = L.conferirEm({ dirLeis, dirApostilas, dirTxt });
    assert.equal(r.total, 2);
    assert.equal(r.ok, 1);
    assert.equal(r.falhas.length, 1);
    assert.equal(r.falhas[0].ref, 'curto-ausente');
  } finally { limpar(raiz); }
});
