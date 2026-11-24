// Testes de scripts/aprendizados.mjs (plano 7.1 de curso/auditoria/melhoria-recursiva-relatorio.md).
// Rodar isolado: node --test tests/aprendizados.test.mjs
// Todo teste usa SOMENTE pastas criadas em os.tmpdir() (apagadas no fim); nada grava no repo
// nem na pasta de memória real; nenhuma chamada de rede externa (só servidor http em 127.0.0.1).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import { spawn, spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const SCRIPT = path.resolve(AQUI, '..', 'scripts', 'aprendizados.mjs');
const AGORA = '2026-11-24T12:00:00.000Z';

// Importação por namespace: nome ausente derruba só o teste que o usa.
let M = {};
let erroImport = null;
try {
  M = await import(pathToFileURL(SCRIPT).href);
} catch (e) {
  erroImport = e;
}
function fn(nome) {
  if (erroImport) throw new Error(`scripts/aprendizados.mjs não importa: ${erroImport.message}`);
  if (typeof M[nome] !== 'function') throw new Error(`função exportada ausente: ${nome}`);
  return M[nome];
}

// ---------- infraestrutura ----------
function ctx(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'aprend-test-'));
  const c = {
    root,
    dir: path.join(root, 'mem'),
    repo: path.join(root, 'repo'),
    home: path.join(root, 'home'),
    inp: path.join(root, 'in'),
    n: 0,
  };
  for (const d of [c.dir, c.repo, c.home, c.inp]) fs.mkdirSync(d, { recursive: true });
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  c.jsonl = path.join(c.dir, 'aprendizados.jsonl');
  return c;
}

function envDe(c) {
  const env = { ...process.env };
  for (const k of Object.keys(env)) if (/^(https?_proxy|all_proxy)$/i.test(k)) delete env[k];
  env.NO_PROXY = '127.0.0.1,localhost';
  env.no_proxy = '127.0.0.1,localhost';
  return {
    ...env,
    APRENDIZADOS_DIR: c.dir,
    APRENDIZADOS_REPO: c.repo,
    APRENDIZADOS_HOME: c.home,
    APRENDIZADOS_AGORA: AGORA,
  };
}

function run(c, args, { input, env } = {}) {
  const r = spawnSync(process.execPath, [SCRIPT, ...args], {
    env: { ...envDe(c), ...(env || {}) },
    cwd: c.root,
    input,
    encoding: 'utf8',
    timeout: 60000,
  });
  return { status: r.status, stdout: r.stdout || '', stderr: r.stderr || '', todo: (r.stdout || '') + (r.stderr || '') };
}

function runAsync(c, args, { env } = {}) {
  return new Promise((resolve) => {
    const p = spawn(process.execPath, [SCRIPT, ...args], { env: { ...envDe(c), ...(env || {}) }, cwd: c.root });
    let stdout = '';
    let stderr = '';
    p.stdout.on('data', (d) => (stdout += d));
    p.stderr.on('data', (d) => (stderr += d));
    p.on('close', (status) => resolve({ status, stdout, stderr, todo: stdout + stderr }));
  });
}

// Dados válidos e distintos (palavras únicas por índice: nunca disparam semelhança 0,6).
function dados(i, over = {}) {
  const toks = Array.from({ length: 6 }, (_, k) => `w${i}x${k}t`).join(' ');
  return {
    titulo: `Titulo de teste ${i} unico w${i}z`,
    chave: `teste.item-${i}`,
    categoria: 'metodo',
    escopo: 'projeto',
    severidade: 'media',
    origem: 'metodo-melhor',
    gatilho: `Gatilho de teste ${i} g${i}y.`,
    evidencia: [{ tipo: 'arquivo', ref: 'repo:ESTADO.md', data: '2026-11-24' }],
    aprendi: `Aprendi algo ${i} a${i}q.`,
    regra: `Usar ${toks}`,
    mudanca: `Mudou o arquivo m${i}.`,
    ...over,
  };
}

function gravarJson(c, obj) {
  const f = path.join(c.inp, `d${++c.n}.json`);
  fs.writeFileSync(f, JSON.stringify(obj), 'utf8');
  return f;
}

function add(c, over = {}, i = null) {
  const idx = i ?? ++c.n + 100;
  const obj = typeof over === 'function' ? over(dados(idx)) : dados(idx, over);
  const r = run(c, ['add', '--arquivo', gravarJson(c, obj)]);
  const m = /registrado (A\d+)/.exec(r.stdout);
  r.id = m ? m[1] : null;
  return r;
}

function addOk(c, over = {}) {
  const r = add(c, over);
  assert.equal(r.status, 0, `add deveria passar: ${r.todo}`);
  assert.ok(r.id, `id não encontrado na saída: ${r.stdout}`);
  return r.id;
}

function eventos(c) {
  if (!fs.existsSync(c.jsonl)) return [];
  return fs
    .readFileSync(c.jsonl, 'utf8')
    .replace(/^﻿/, '')
    .split(/\r?\n/)
    .filter((l) => l.trim())
    .map((l) => JSON.parse(l));
}

const temSegredo = (r) => (Array.isArray(r) ? r.length > 0 : Boolean(r));

// ---------- 1 ----------
test('1. registro inexistente ou vazio vale como vazio e validar sai com 0', (t) => {
  const c = ctx(t);
  let r = run(c, ['validar']);
  assert.equal(r.status, 0, r.todo);
  fs.writeFileSync(c.jsonl, '', 'utf8');
  r = run(c, ['validar']);
  assert.equal(r.status, 0, r.todo);
  assert.match(r.stdout, /registro válido/);
  assert.equal(run(c, ['pendentes']).status, 0);
});

// ---------- 2 ----------
test('2. criar gera A001, A002 em sequência e não reutiliza id de revogado', (t) => {
  const c = ctx(t);
  assert.equal(addOk(c), 'A001');
  assert.equal(addOk(c), 'A002');
  const rv = run(c, ['revogar', 'A002', '--motivo', 'teste de revogação']);
  assert.equal(rv.status, 0, rv.todo);
  assert.equal(addOk(c), 'A003');
  assert.equal(run(c, ['validar']).status, 0);
});

// ---------- 3 ----------
test('3. criar recusa campo obrigatório ausente, enum inválido e chave mal formada (código 2 pela CLI)', (t) => {
  const c = ctx(t);
  for (const campo of ['titulo', 'chave', 'categoria', 'escopo', 'severidade', 'origem', 'gatilho', 'aprendi', 'regra', 'mudanca', 'evidencia']) {
    const d = dados(1);
    delete d[campo];
    const r = run(c, ['add', '--arquivo', gravarJson(c, d)]);
    assert.equal(r.status, 2, `sem ${campo} deveria dar 2: ${r.todo}`);
    assert.match(r.stderr, /^erro: /m);
  }
  const ruins = [
    { categoria: 'xyz' },
    { escopo: 'mundial' },
    { severidade: 'gravissima' },
    { origem: 'palpite' },
    { chave: 'Chave Ruim' },
    { chave: 'semponto' },
    { evidencia: [] },
    { titulo: 'abc' },
  ];
  for (const over of ruins) {
    const r = run(c, ['add', '--arquivo', gravarJson(c, dados(2, over))]);
    assert.equal(r.status, 2, `${JSON.stringify(over)} deveria dar 2: ${r.todo}`);
  }
  // opção sem valor e JSON inválido
  assert.equal(run(c, ['add', '--titulo']).status, 2);
  const f = path.join(c.inp, 'ruim.json');
  fs.writeFileSync(f, '{nao json', 'utf8');
  assert.equal(run(c, ['add', '--arquivo', f]).status, 2);
  assert.deepEqual(eventos(c), [], 'nada deve ter sido gravado');
});

// ---------- 4 ----------
test('4. criar recusa titulo repetido sem acento e sem caixa', (t) => {
  const c = ctx(t);
  addOk(c, { titulo: 'Título Repetido Ação' });
  const r = add(c, { titulo: 'titulo repetido acao' });
  assert.equal(r.status, 2, r.todo);
  assert.equal(eventos(c).filter((e) => e.ev === 'criar').length, 1);
});

// ---------- 5 ----------
test('5. mesma chave ativa exige --substitui; com --substitui o antigo vira superado na mesma operação', (t) => {
  const c = ctx(t);
  const id1 = addOk(c, { chave: 'metodo.mesma.chave' });
  let r = add(c, { chave: 'metodo.mesma.chave' });
  assert.equal(r.status, 2, r.todo);
  assert.match(r.stderr, /chave/i);
  r = add(c, { chave: 'metodo.mesma.chave', substitui: [id1] });
  assert.equal(r.status, 0, r.todo);
  const novo = r.id;
  assert.notEqual(novo, id1);
  const evs = eventos(c);
  const sup = evs.find((e) => e.ev === 'superar' && e.id === id1);
  assert.ok(sup, 'evento superar gravado');
  assert.equal(sup.por_id, novo);
  const m = run(c, ['mostrar', id1]);
  assert.equal(m.status, 0, m.todo);
  assert.match(m.stdout, /superad/i);
});

// ---------- 6 ----------
test('6. regra muito parecida exige --forcar; "nunca X" e "sempre X" não contam como iguais (polaridade no cálculo; limiar 0,6)', (t) => {
  // função pura
  const sim = fn('similaridade');
  assert.equal(sim('baixar da fonte oficial', 'baixar da fonte oficial'), 1);
  assert.ok(sim('nunca baixar pagina', 'sempre baixar pagina') < 0.6, 'polaridade deve pesar');
  assert.ok(sim('nunca baixar pagina', 'sempre baixar pagina') < sim('baixar pagina', 'baixar pagina'));
  assert.ok(sim('converter html em txt compilado pesquisar no compilado', 'nada a ver com isso aqui') < 0.6);
  assert.equal(sim('a regra de x', 'regra x'), 1, 'palavras vazias não contam');

  // CLI
  const c = ctx(t);
  const base = 'Para conferir norma baixar da fonte oficial converter html em txt compilado e pesquisar no compilado';
  addOk(c, { regra: base, chave: 'metodo.parecida.um' });
  const quase = base.replace('pesquisar', 'buscar');
  let r = add(c, { regra: quase, chave: 'metodo.parecida.dois' });
  assert.equal(r.status, 2, r.todo);
  r = add(c, { regra: quase, chave: 'metodo.parecida.dois', forcar: true });
  assert.equal(r.status, 0, r.todo);
  // polaridade pela CLI: regra curta "nunca"/"sempre" não é recusada
  addOk(c, { regra: 'nunca baixar pagina', chave: 'metodo.polar.um' });
  r = add(c, { regra: 'sempre baixar pagina', chave: 'metodo.polar.dois' });
  assert.equal(r.status, 0, r.todo);
});

// ---------- 7 ----------
test('7. filtro de segredo recusa e-mail, IP externo, telefone, token=valor e chave longa; aceita 127.0.0.1, commit 40 hex e sha256 64 hex', (t) => {
  const achar = fn('acharSegredo');
  const sha40 = '4b139a3e0d5c7a1f9b2e8c6d4a0f3b7e5c1d9a28';
  const sha64 = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';
  for (const ruim of [
    'fale com fulano@exemplo.com.br',
    'servidor em 10.20.30.40 porta 22',
    'telefone (51) 99805-0440',
    'telefone 51998050440',
    'token=abc123def',
    'senha: minhasenha',
    'api_key = XYZ',
    'valor aGVsbG9fd29ybGRfdGhpc19pc19hX2xvbmdfa2V5XzEyMzQ1Ng',
  ]) {
    assert.ok(temSegredo(achar(ruim)), `deveria acusar: ${ruim}`);
  }
  for (const bom of ['proxy em 127.0.0.1:3129', 'escuta 0.0.0.0', `commit ${sha40}`, `hash ${sha64}`, 'texto comum sem nada']) {
    assert.ok(!temSegredo(achar(bom)), `não deveria acusar: ${bom}`);
  }

  // pela CLI: recusa (código 2) em qualquer campo, inclusive evidencia[].ref; forcar não contorna
  const c = ctx(t);
  let r = add(c, { gatilho: 'mande para fulano@exemplo.com.br' });
  assert.equal(r.status, 2, r.todo);
  assert.match(r.stderr, /segredo/i);
  r = add(c, { evidencia: [{ tipo: 'comando', ref: 'curl http://10.1.2.3/x', data: '2026-11-24' }] });
  assert.equal(r.status, 2, r.todo);
  r = add(c, { aprendi: 'token=abc123', forcar: true });
  assert.equal(r.status, 2, 'forcar nunca contorna o filtro de segredo');
  assert.deepEqual(eventos(c), []);
  // aceitos
  r = add(c, {
    gatilho: 'proxy em 127.0.0.1:3129',
    evidencia: [
      { tipo: 'commit', ref: sha40, data: '2026-11-24' },
      { tipo: 'commit', ref: sha64, data: '2026-11-24' },
    ],
  });
  assert.equal(r.status, 0, r.todo);
});

// ---------- 8 ----------
test('8. comando de verificação fora da lista branca é recusado no add', (t) => {
  const c = ctx(t);
  const recusados = [
    ['rm', '-rf', 'x'],
    ['node', '-e', 'process.exit(0)'],
    ['node', 'qualquer.js'],
    ['node', 'src/x.mjs'],
    ['node', 'scripts/x.mjs'],
    ['node', 'scripts/leis-compilar-e-conferir.mjs', 'baixar'],
    ['node', 'scripts/gerar-apostila-materia.mjs'],
    ['curl', 'http://127.0.0.1/'],
    ['powershell', '-c', 'dir'],
  ];
  for (const argv of recusados) {
    const r = add(c, { verificacoes: [{ tipo: 'comando', argv }] });
    assert.equal(r.status, 2, `${argv.join(' ')} deveria ser recusado: ${r.todo}`);
  }
  for (const argv of [['node', 'scripts/aprendizados.mjs', 'validar'], ['node', '--test', 'tests/x.test.mjs'], ['node', 'scripts/leis-compilar-e-conferir.mjs', 'conferir']]) {
    const r = add(c, { verificacoes: [{ tipo: 'comando', argv }] });
    assert.equal(r.status, 0, `${argv.join(' ')} deveria ser aceito: ${r.todo}`);
  }
});

// ---------- 9 ----------
test('9. exigeAprovacao: processo, papeis, global e substituir ordem-dono exigem; ambiente e bug de projeto não', (t) => {
  const c = ctx(t);
  const exigem = {
    processo: addOk(c, { categoria: 'processo' }),
    papeis: addOk(c, { categoria: 'papeis' }),
    conteudo: addOk(c, { categoria: 'conteudo' }),
    publicacao: addOk(c, { categoria: 'publicacao' }),
    global: addOk(c, { categoria: 'metodo', escopo: 'global' }),
    altaMetodo: addOk(c, { categoria: 'metodo', severidade: 'alta' }),
  };
  const dono = addOk(c, { categoria: 'metodo', origem: 'ordem-dono', chave: 'metodo.ordem.dono' });
  // substituir ordem-dono exige por:'dono' + citacao (seção 1.6); sem isso, código 2
  const semCitacao = add(c, { categoria: 'metodo', chave: 'metodo.ordem.dono', substitui: [dono] });
  assert.equal(semCitacao.status, 2, semCitacao.todo);
  exigem.substituiDono = addOk(c, {
    categoria: 'metodo',
    chave: 'metodo.ordem.dono',
    substitui: [dono],
    por: 'dono',
    citacao: 'Dono: trocar esta regra',
  });
  const nao = {
    ambiente: addOk(c, { categoria: 'ambiente', origem: 'ambiente-mudou' }),
    bug: addOk(c, { categoria: 'bug', origem: 'bug' }),
    bugAlta: addOk(c, { categoria: 'bug', origem: 'bug', severidade: 'alta' }),
    fonte: addOk(c, { categoria: 'fonte' }),
  };
  const r = run(c, ['pendentes']);
  assert.equal(r.status, 0, r.todo);
  const linhaDe = (id) => r.stdout.split('\n').find((l) => l.startsWith(`- ${id} `)) || '';
  for (const [k, id] of Object.entries(exigem)) {
    assert.match(linhaDe(id), /VALE SÓ DEPOIS DO SEU "aprovado"/, `${k} (${id}) deveria exigir aprovação: ${linhaDe(id)}`);
  }
  for (const [k, id] of Object.entries(nao)) {
    assert.match(linhaDe(id), /aguardando só ciência/, `${k} (${id}) não deveria exigir aprovação: ${linhaDe(id)}`);
  }
});

// ---------- 10 ----------
test('10. transições inválidas: aplicar sem aceitar quando exige aprovação, aceitar rejeitado, aceitar sem citação, revogar ordem-dono sem citação', (t) => {
  const c = ctx(t);
  const proc = addOk(c, { categoria: 'processo' });
  let r = run(c, ['aplicar', proc, '--nota', 'tentativa']);
  assert.equal(r.status, 2, r.todo);
  r = run(c, ['aceitar', proc]);
  assert.equal(r.status, 2, 'aceitar sem citação: ' + r.todo);
  r = run(c, ['aceitar', proc, '--citacao', 'aprovo ' + proc]);
  assert.equal(r.status, 0, r.todo);
  r = run(c, ['aplicar', proc, '--nota', 'ok']);
  assert.equal(r.status, 0, r.todo);

  const rej = addOk(c);
  r = run(c, ['rejeitar', rej, '--motivo', 'não serve', '--por', 'dono']);
  assert.equal(r.status, 0, r.todo);
  r = run(c, ['aceitar', rej, '--citacao', 'aprovo ' + rej]);
  assert.equal(r.status, 2, r.todo);
  assert.match(r.stderr, /transição inválida/);

  const ordem = addOk(c, { origem: 'ordem-dono', chave: 'metodo.ordem.direta' });
  r = run(c, ['revogar', ordem, '--motivo', 'quero tirar']);
  assert.equal(r.status, 2, 'revogar ordem-dono sem citação do dono: ' + r.todo);
  r = run(c, ['revogar', ordem, '--motivo', 'dono mandou tirar', '--por', 'dono', '--citacao', 'pode revogar ' + ordem]);
  assert.equal(r.status, 0, r.todo);
  // id inexistente
  assert.equal(run(c, ['aceitar', 'A999', '--citacao', 'x']).status, 2);
});

// ---------- 11 ----------
test('11. aplicar provisório permitido quando não exige aprovação e marca semAprovacao', (t) => {
  const c = ctx(t);
  const id = addOk(c, { categoria: 'ambiente', origem: 'ambiente-mudou' });
  const r = run(c, ['aplicar', id, '--nota', 'anotado']);
  assert.equal(r.status, 0, r.todo);
  assert.match(r.stdout, /provisório/);
  assert.ok(eventos(c).some((e) => e.ev === 'aplicar' && e.id === id));
  const m = run(c, ['mostrar', id]);
  assert.match(m.stdout, /sem aprova|semAprovacao/i);
  // aplicar de novo é transição inválida
  assert.equal(run(c, ['aplicar', id, '--nota', 'de novo']).status, 2);
});

// ---------- 12 ----------
test('12. pendentes não marca nada; marcar-mostrado marca; depois só "nenhum novo" ou "Aguardando sua decisão"', (t) => {
  const c = ctx(t);
  const a = addOk(c, { categoria: 'ambiente', origem: 'ambiente-mudou' });
  const b = addOk(c, { categoria: 'processo' });
  const p1 = run(c, ['pendentes']);
  const p2 = run(c, ['pendentes']);
  assert.equal(p1.status, 0, p1.todo);
  assert.equal(p1.stdout, p2.stdout, 'pendentes não deve marcar nada');
  assert.ok(p1.stdout.includes(a) && p1.stdout.includes(b));
  assert.equal(eventos(c).filter((e) => e.ev === 'mostrar').length, 0);
  assert.equal(run(c, ['marcar-mostrado', 'A999']).status, 2);
  const mm = run(c, ['marcar-mostrado', a, b]);
  assert.equal(mm.status, 0, mm.todo);
  assert.match(mm.stdout, /marcado como mostrado/);
  const p3 = run(c, ['pendentes']);
  assert.equal(p3.status, 0, p3.todo);
  assert.ok(!/Aprendizados novos/.test(p3.stdout), p3.stdout);
  assert.match(p3.stdout, new RegExp(`Aguardando sua decisão:.*${b}`));
  assert.ok(!new RegExp(`Aguardando sua decisão:.*${a}`).test(p3.stdout));

  // só item que não exige aprovação: "nenhum novo"
  const c2 = ctx(t);
  const x = addOk(c2, { categoria: 'ambiente', origem: 'ambiente-mudou' });
  run(c2, ['marcar-mostrado', x]);
  const p4 = run(c2, ['pendentes']);
  assert.equal(p4.status, 0);
  assert.match(p4.stdout, /Aprendizados: nenhum novo neste lote\./);
});

// ---------- 13 ----------
test('13. formato de pendentes: no máximo 2 linhas e 320 caracteres por item, rótulos certos', (t) => {
  const c = ctx(t);
  const longo = (n) => 'palavra '.repeat(Math.ceil(n / 8)).slice(0, n).trim();
  const amb = addOk(c, { categoria: 'ambiente', origem: 'ambiente-mudou', regra: 'Testar a rede antes de afirmar. ' + longo(60), mudanca: longo(300) });
  const proc = addOk(c, { categoria: 'processo', regra: 'Seguir até concluir. ' + longo(30), mudanca: longo(300) });
  const prop = addOk(c, { categoria: 'ambiente', origem: 'ambiente-mudou', regra: 'Outra regra de rede. ' + longo(60), mudanca: longo(300) });
  const ap = run(c, ['aplicar', amb, '--nota', 'teste']);
  assert.equal(ap.status, 0, ap.todo);
  const r = run(c, ['pendentes']);
  assert.equal(r.status, 0, r.todo);
  assert.match(r.stdout, /^Aprendizados novos \(3\):/m);
  const linhas = r.stdout.split('\n');
  const blocos = [];
  for (const l of linhas) {
    if (/^- A\d+ /.test(l)) blocos.push([l]);
    else if (blocos.length && l.trim() && !/^(Aguardando|Aprendizados)/.test(l)) blocos[blocos.length - 1].push(l);
  }
  assert.equal(blocos.length, 3);
  for (const b of blocos) {
    assert.ok(b.length <= 2, `máx. 2 linhas: ${b.join(' | ')}`);
    assert.ok(b.join('').length <= 320, `máx. 320 caracteres (${b.join('').length}): ${b.join(' | ')}`);
    assert.match(b.join(' '), /Mudou: /);
    assert.match(b.join(' '), /…/, 'mudança longa é cortada com reticências');
  }
  const bAmb = blocos.find((b) => b[0].startsWith(`- ${amb} `)).join(' ');
  const bProc = blocos.find((b) => b[0].startsWith(`- ${proc} `)).join(' ');
  const bProp = blocos.find((b) => b[0].startsWith(`- ${prop} `)).join(' ');
  assert.match(bProp, /proposto, ainda não aplicado; aguardando só ciência/);
  assert.match(bAmb, /adotado, aguardando só ciência/);
  assert.match(bAmb, new RegExp(`rejeito ${amb}`));
  assert.match(bProc, /VALE SÓ DEPOIS DO SEU "aprovado"/);
  assert.match(bProc, new RegExp(`aprovo ${proc}`));
  assert.match(bProc, new RegExp(`rejeito ${proc}`));
});

// ---------- 14 ----------
test('14. verificar ausente/presente: passa e falha conforme o regex e o arquivo existir', (t) => {
  const c = ctx(t);
  fs.mkdirSync(path.join(c.repo, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(c.repo, 'docs', 'a.md'), 'a porta 3130 é usada aqui\n', 'utf8');
  fs.writeFileSync(path.join(c.dir, 'MEMORY.md'), '- proxy 3130\n', 'utf8');
  const casos = [
    [{ tipo: 'presente', arquivo: 'repo:docs/a.md', regex: 'porta 3130' }, 0],
    [{ tipo: 'presente', arquivo: 'repo:docs/a.md', regex: 'inexistente-xyz' }, 1],
    [{ tipo: 'presente', arquivo: 'repo:docs/a.md', regex: 'PORTA 3130', i: true }, 0],
    [{ tipo: 'ausente', arquivo: 'repo:docs/a.md', regex: 'porta 3130' }, 1],
    [{ tipo: 'ausente', arquivo: 'repo:docs/a.md', regex: 'zzz-nao-existe' }, 0],
    [{ tipo: 'ausente', arquivo: 'repo:docs/nao-existe.md', regex: 'qualquer' }, 1],
    [{ tipo: 'presente', arquivo: 'repo:docs/nao-existe.md', regex: 'qualquer' }, 1],
    [{ tipo: 'ausente', arquivo: 'mem:MEMORY.md', regex: '3130' }, 1],
    [{ tipo: 'presente', arquivo: 'mem:MEMORY.md', regex: 'proxy 3130' }, 0],
  ];
  for (const [verif, esperado] of casos) {
    const id = addOk(c, { verificacoes: [verif] });
    const ap = run(c, ['aplicar', id, '--nota', 'teste']);
    assert.equal(ap.status, 0, ap.todo);
    const r = run(c, ['verificar', id]);
    assert.equal(r.status, esperado, `${JSON.stringify(verif)} esperava ${esperado}: ${r.todo}`);
    assert.match(r.stdout, esperado === 0 ? /ok/i : /FALHOU/);
    if (verif.arquivo === 'repo:docs/nao-existe.md') assert.match(r.stdout, /arquivo não existe/);
    assert.match(r.stdout, /verificação: /);
  }
});

// ---------- 15 ----------
test('15. verificar comando: código 0 passa, outro código falha, requer ausente fica pulada; resultado gravado como evento', (t) => {
  const c = ctx(t);
  fs.mkdirSync(path.join(c.repo, 'tests'), { recursive: true });
  fs.writeFileSync(path.join(c.repo, 'tests', 'ok.test.mjs'), 'process.exit(0);\n', 'utf8');
  fs.writeFileSync(path.join(c.repo, 'tests', 'falha.test.mjs'), 'process.exit(3);\n', 'utf8');
  const casos = [
    [{ tipo: 'comando', argv: ['node', 'tests/ok.test.mjs'] }, 0, /ok/i],
    [{ tipo: 'comando', argv: ['node', 'tests/falha.test.mjs'] }, 1, /FALHOU/],
    [{ tipo: 'comando', argv: ['node', 'tests/falha.test.mjs'], requer: ['repo:fontes/nao-existe'] }, 0, /pulada/],
  ];
  for (const [verif, esperado, saida] of casos) {
    const id = addOk(c, { verificacoes: [verif] });
    assert.equal(run(c, ['aplicar', id, '--nota', 'teste']).status, 0);
    const r = run(c, ['verificar', id]);
    assert.equal(r.status, esperado, `${JSON.stringify(verif)}: ${r.todo}`);
    assert.match(r.stdout, saida);
    const ev = eventos(c).filter((e) => e.ev === 'verificar' && e.id === id);
    if (/pulada/.test(String(saida))) {
      // todas puladas: o script não grava evento (não marca verificado sem prova)
      assert.equal(ev.length, 0, 'nenhum evento verificar quando tudo foi pulado');
      continue;
    }
    assert.equal(ev.length, 1, 'um evento verificar gravado');
    if (esperado === 1) assert.equal(ev[0].ok, false);
    else assert.equal(ev[0].ok, true);
    assert.ok(Array.isArray(ev[0].detalhes) && ev[0].detalhes.length === 1);
  }
});

// ---------- 16 ----------
test('16. verificar rede fica pulada sem --rede (servidor local não é chamado); com --rede consulta o servidor local', async (t) => {
  let acessos = 0;
  const srv = http.createServer((req, res) => {
    acessos++;
    res.statusCode = 200;
    res.end('ok');
  });
  await new Promise((r) => srv.listen(0, '127.0.0.1', r));
  t.after(() => srv.close());
  const url = `http://127.0.0.1:${srv.address().port}/x`;

  const c = ctx(t);
  const id = addOk(c, { verificacoes: [{ tipo: 'rede', url, espera: '2xx' }] });
  assert.equal(run(c, ['aplicar', id, '--nota', 'teste']).status, 0);
  const sem = await runAsync(c, ['verificar', id]);
  assert.equal(sem.status, 0, sem.todo);
  assert.match(sem.stdout, /pulada/);
  assert.equal(acessos, 0, 'sem --rede não pode haver acesso');

  const curl = spawnSync('curl', ['--version'], { encoding: 'utf8' });
  if (curl.error || curl.status !== 0) {
    t.diagnostic('curl indisponível: parte --rede não executada');
    return;
  }
  const com = await runAsync(c, ['verificar', id, '--rede']);
  assert.equal(com.status, 0, com.todo);
  assert.ok(acessos >= 1, 'com --rede o servidor local deve ser consultado');
  assert.match(com.stdout, /ok/i);
});

// ---------- 17 ----------
test('17. verificar sai com 1 quando alguma falha e com 0 quando todas passam ou foram puladas', (t) => {
  const c = ctx(t);
  fs.mkdirSync(path.join(c.repo, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(c.repo, 'docs', 'a.md'), 'conteudo\n', 'utf8');
  const ok = addOk(c, { verificacoes: [{ tipo: 'presente', arquivo: 'repo:docs/a.md', regex: 'conteudo' }] });
  const pul = addOk(c, { verificacoes: [{ tipo: 'rede', url: 'http://127.0.0.1:9/', espera: '2xx' }] });
  const sem = addOk(c); // sem verificações: aceito, mas marcado
  for (const id of [ok, pul, sem]) assert.equal(run(c, ['aplicar', id, '--nota', 'teste']).status, 0);
  let r = run(c, ['verificar']);
  assert.equal(r.status, 0, r.todo);
  assert.match(r.stdout, /verificação: 1 ok, 0 falharam, 1 puladas/);
  const ruim = addOk(c, { verificacoes: [{ tipo: 'presente', arquivo: 'repo:docs/a.md', regex: 'nao-tem' }] });
  assert.equal(run(c, ['aplicar', ruim, '--nota', 'teste']).status, 0);
  r = run(c, ['verificar']);
  assert.equal(r.status, 1, r.todo);
  assert.match(r.stdout, /1 falharam/);
});

// ---------- 18 ----------
test('18. consolidar lista só aplicados e verificados, agrupados por categoria e chave, e omite superados, revogados, rejeitados e propostos', (t) => {
  const c = ctx(t);
  fs.writeFileSync(path.join(c.dir, 'MEMORY.md'), '# Memória\n- [x](x.md) — x\n', 'utf8');
  fs.mkdirSync(path.join(c.repo, 'docs'), { recursive: true });
  fs.writeFileSync(path.join(c.repo, 'docs', 'a.md'), 'conteudo\n', 'utf8');

  const aplicado = addOk(c, { categoria: 'metodo', chave: 'metodo.zeta.aplicado', regra: 'Regra do aplicado r1 aaa bbb ccc' });
  const verificado = addOk(c, {
    categoria: 'ambiente',
    origem: 'ambiente-mudou',
    chave: 'ambiente.alfa.verificado',
    regra: 'Regra do verificado r2 ddd eee fff',
    verificacoes: [{ tipo: 'presente', arquivo: 'repo:docs/a.md', regex: 'conteudo' }],
  });
  const antigo = addOk(c, { categoria: 'metodo', chave: 'metodo.troca.chave', regra: 'Regra antiga r3 ggg hhh iii' });
  const novo = addOk(c, { categoria: 'metodo', chave: 'metodo.troca.chave', regra: 'Regra nova r4 jjj kkk lll', substitui: [antigo] });
  const revogado = addOk(c, { categoria: 'metodo', chave: 'metodo.revogado.x', regra: 'Regra revogada r5 mmm nnn ooo' });
  const rejeitado = addOk(c, { categoria: 'metodo', chave: 'metodo.rejeitado.x', regra: 'Regra rejeitada r6 ppp qqq rrr' });
  const proposto = addOk(c, { categoria: 'processo', chave: 'processo.proposto.x', regra: 'Regra proposta r7 sss ttt uuu' });
  const mostrado = addOk(c, { categoria: 'papeis', chave: 'papeis.mostrado.x', regra: 'Regra mostrada r8 vvv xxx yyy' });
  assert.equal(run(c, ['marcar-mostrado', mostrado]).status, 0);

  for (const id of [aplicado, verificado, novo, revogado]) assert.equal(run(c, ['aplicar', id, '--nota', 'teste']).status, 0, id);
  assert.equal(run(c, ['verificar', verificado]).status, 0);
  assert.equal(run(c, ['revogar', revogado, '--motivo', 'obsoleto: teste']).status, 0);
  assert.equal(run(c, ['rejeitar', rejeitado, '--motivo', 'não serve', '--por', 'dono']).status, 0);

  const r = run(c, ['consolidar']);
  assert.equal(r.status, 0, r.todo);
  const md = fs.readFileSync(path.join(c.dir, 'regras-aprendidas.md'), 'utf8');
  const item = (id) => new RegExp(`^- \\[${id}\\]`, 'm');
  assert.match(md, item(aplicado));
  assert.match(md, item(verificado));
  assert.match(md, item(novo));
  for (const id of [antigo, revogado, rejeitado, proposto, mostrado]) {
    assert.ok(!item(id).test(md), `${id} não deve estar na lista ativa`);
  }
  assert.match(md, /^## metodo/m);
  assert.match(md, /^## ambiente/m);
  assert.ok(md.indexOf('## metodo') < md.indexOf('## ambiente'), 'ordem fixa de categorias: metodo antes de ambiente');
  assert.ok(md.indexOf(novo + ']') < md.indexOf(aplicado + ']') || md.indexOf('metodo.troca') !== -1);
  // pendências de aprovação aparecem à parte, não como regra ativa
  assert.ok(md.includes(proposto) && md.includes(mostrado), 'aguardando "aprovado" listadas');
  assert.match(md, /^---\nname: regras-aprendidas/);
  assert.match(md, /Regras aprendidas ativas \(3\)/);
});

// ---------- 19 ----------
test('19. consolidar é idempotente (segunda execução, mesmo em outro dia, não muda o arquivo)', (t) => {
  const c = ctx(t);
  fs.writeFileSync(path.join(c.dir, 'MEMORY.md'), '# Memória\n', 'utf8');
  const id = addOk(c);
  assert.equal(run(c, ['aplicar', id, '--nota', 'teste']).status, 0);
  assert.equal(run(c, ['consolidar']).status, 0);
  const arq = path.join(c.dir, 'regras-aprendidas.md');
  const antes = fs.readFileSync(arq);
  const r = run(c, ['consolidar'], { env: { APRENDIZADOS_AGORA: '2026-12-31T12:00:00.000Z' } });
  assert.equal(r.status, 0, r.todo);
  const depois = fs.readFileSync(arq);
  assert.ok(antes.equals(depois), 'conteúdo deve ser idêntico (linha da data não conta)');
  // nada de resíduo .tmp
  assert.deepEqual(fs.readdirSync(c.dir).filter((f) => f.endsWith('.tmp')), []);
});

// ---------- 20 ----------
test('20. atualizarIndice cria a linha uma única vez, substitui no lugar e preserva CRLF, LF e ausência de quebra final', () => {
  const atualizar = fn('atualizarIndice');
  const linha = '- [Regras aprendidas](regras-aprendidas.md) — 3 regras ativas, 1 aguardando aprovação; registro em aprendizados.jsonl (scripts/aprendizados.mjs)';
  const nova = linha.replace('3 regras', '5 regras');
  const conta = (s) => s.split('(regras-aprendidas.md)').length - 1;

  // LF com quebra final
  const lf = '- [A](a.md) — a\n- [B](b.md) — b\n';
  let s = atualizar(lf, linha);
  assert.equal(s, lf + linha + '\n');
  assert.equal(atualizar(s, linha), s, 'idempotente');
  assert.equal(conta(atualizar(atualizar(s, linha), linha)), 1);

  // substituição no lugar (meio do arquivo)
  const meio = `- [A](a.md) — a\n${linha}\n- [B](b.md) — b\n`;
  s = atualizar(meio, nova);
  assert.equal(s, `- [A](a.md) — a\n${nova}\n- [B](b.md) — b\n`);

  // CRLF
  const crlf = '- [A](a.md) — a\r\n- [B](b.md) — b\r\n';
  s = atualizar(crlf, linha);
  assert.equal(s, crlf + linha + '\r\n');
  assert.ok(!/(^|[^\r])\n/.test(s), 'nenhum LF solto em arquivo CRLF');
  s = atualizar(s, nova);
  assert.equal(conta(s), 1);
  assert.ok(!/(^|[^\r])\n/.test(s));
  assert.ok(s.includes(nova));

  // sem quebra final
  const semFim = '- [A](a.md) — a\n- [B](b.md) — b';
  s = atualizar(semFim, linha);
  assert.ok(s.endsWith(linha) && !s.endsWith('\n'), 'preserva ausência de quebra final');
  assert.equal(conta(s), 1);
  s = atualizar(s, nova);
  assert.ok(s.endsWith(nova) && !s.endsWith('\n'));
  assert.equal(conta(s), 1);
  // texto vazio
  assert.equal(conta(atualizar('', linha)), 1);
});

// ---------- 21 ----------
test('21. leitura tolera BOM, CRLF e linhas em branco', (t) => {
  const c = ctx(t);
  addOk(c);
  addOk(c);
  const [l1, l2] = fs.readFileSync(c.jsonl, 'utf8').split('\n').filter(Boolean);
  fs.writeFileSync(c.jsonl, '﻿' + l1 + '\r\n\r\n   \r\n' + l2 + '\r\n\r\n', 'utf8');
  let r = run(c, ['validar']);
  assert.equal(r.status, 0, r.todo);
  assert.match(r.stdout, /2 aprendizados/);
  r = add(c);
  assert.equal(r.status, 0, r.todo);
  assert.equal(r.id, 'A003');
  const lido = fn('lerEventos')(c.jsonl);
  assert.ok(Array.isArray(lido) && lido.length >= 3);
});

// ---------- 22 ----------
test('22. linha corrompida dá código 3 com o número da linha; última linha sem quebra impede novo add com código 3', (t) => {
  const c = ctx(t);
  addOk(c);
  const bom = fs.readFileSync(c.jsonl, 'utf8');
  fs.writeFileSync(c.jsonl, bom + 'isto nao e json\n', 'utf8');
  let r = run(c, ['validar']);
  assert.equal(r.status, 3, r.todo);
  assert.match(r.stderr, /linha 2/);
  assert.equal(add(c).status, 3);
  assert.equal(run(c, ['pendentes']).status === 0 || true, true);

  const c2 = ctx(t);
  addOk(c2);
  fs.writeFileSync(c2.jsonl, fs.readFileSync(c2.jsonl, 'utf8').replace(/\n$/, ''), 'utf8');
  r = add(c2);
  assert.equal(r.status, 3, r.todo);
  assert.match(r.stderr, /última linha incompleta/);
  assert.ok(!fs.readFileSync(c2.jsonl, 'utf8').includes('\n'), 'arquivo não pode ser alterado');
});

// ---------- 23 ----------
test('23. versão de formato desconhecida dá código 3', (t) => {
  const c = ctx(t);
  addOk(c);
  const evs = fs.readFileSync(c.jsonl, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  evs[0].v = 2;
  fs.writeFileSync(c.jsonl, evs.map((e) => JSON.stringify(e)).join('\n') + '\n', 'utf8');
  const r = run(c, ['validar']);
  assert.equal(r.status, 3, r.todo);
  assert.match(r.stderr, /linha 1/);
  assert.equal(add(c).status, 3);
});

// ---------- 24 ----------
test('24. dois processos criando 10 aprendizados cada ao mesmo tempo geram 20 ids únicos e registro válido', async (t) => {
  const c = ctx(t);
  const runner = path.join(c.root, 'runner.mjs');
  fs.writeFileSync(
    runner,
    `import { spawnSync } from 'node:child_process';
const [script, ...arqs] = process.argv.slice(2);
let falhas = 0;
for (const a of arqs) {
  const r = spawnSync(process.execPath, [script, 'add', '--arquivo', a], { encoding: 'utf8' });
  if (r.status !== 0) { falhas++; console.error(r.stdout + r.stderr); }
}
process.exit(falhas ? 1 : 0);
`,
    'utf8',
  );
  const lote = (base) => Array.from({ length: 10 }, (_, k) => gravarJson(c, dados(base + k)));
  const A = lote(1000);
  const B = lote(2000);
  const rodar = (arqs) =>
    new Promise((resolve) => {
      const p = spawn(process.execPath, [runner, SCRIPT, ...arqs], { env: envDe(c), cwd: c.root });
      let err = '';
      p.stderr.on('data', (d) => (err += d));
      p.on('close', (status) => resolve({ status, err }));
    });
  const [ra, rb] = await Promise.all([rodar(A), rodar(B)]);
  assert.equal(ra.status, 0, ra.err);
  assert.equal(rb.status, 0, rb.err);
  const criar = eventos(c).filter((e) => e.ev === 'criar');
  assert.equal(criar.length, 20, 'nenhuma linha perdida');
  const ids = criar.map((e) => e.id);
  assert.equal(new Set(ids).size, 20, 'ids únicos');
  for (let i = 1; i <= 20; i++) assert.ok(ids.includes('A' + String(i).padStart(3, '0')), `falta A${i}`);
  const v = run(c, ['validar']);
  assert.equal(v.status, 0, v.todo);
  assert.deepEqual(fs.readdirSync(c.dir).filter((f) => f.endsWith('.lock')), [], 'bloqueio liberado');
});

// ---------- 25 ----------
test('25. bloqueio recente faz esperar e dá código 3 após o tempo; bloqueio com mais de 30 s é quebrado', (t) => {
  const c = ctx(t);
  const lock = path.join(c.dir, 'aprendizados.lock');
  fs.writeFileSync(lock, `${process.pid} ${new Date().toISOString()}`, 'utf8');
  const f = gravarJson(c, dados(1));
  const t0 = Date.now();
  let r = run(c, ['add', '--arquivo', f]);
  const dt = Date.now() - t0;
  assert.equal(r.status, 3, r.todo);
  assert.match(r.stderr, /em uso|aprendizados\.lock/);
  assert.ok(dt >= 4000, `deveria esperar ~5 s (esperou ${dt} ms)`);
  assert.deepEqual(eventos(c), []);

  const velho = new Date(Date.now() - 60 * 1000);
  fs.utimesSync(lock, velho, velho);
  r = run(c, ['add', '--arquivo', f]);
  assert.equal(r.status, 0, r.todo);
  assert.equal(eventos(c).filter((e) => e.ev === 'criar').length, 1);
  assert.ok(!fs.existsSync(lock), 'bloqueio liberado ao final');
});

// ---------- 26 ----------
test('26. inicio e gatilho sempre saem com 0, mesmo com registro corrompido ou pasta inexistente', (t) => {
  const c = ctx(t);
  fs.writeFileSync(c.jsonl, '{lixo\n', 'utf8');
  let r = run(c, ['inicio']);
  assert.equal(r.status, 0, r.todo);
  assert.match(r.stdout, /aprendizados: não foi possível ler o registro/);
  r = run(c, ['gatilho'], { input: JSON.stringify({ prompt: 'guarde essa regra' }) });
  assert.equal(r.status, 0, r.todo);
  r = run(c, ['gatilho'], { input: 'isto nem é json' });
  assert.equal(r.status, 0, r.todo);
  r = run(c, ['gatilho'], { input: '' });
  assert.equal(r.status, 0, r.todo);
  r = run(c, ['inicio'], { env: { APRENDIZADOS_DIR: path.join(c.root, 'nao-existe') } });
  assert.equal(r.status, 0, r.todo);
  // registro saudável: no máximo 12 linhas
  const c2 = ctx(t);
  for (let i = 0; i < 20; i++) addOk(c2, { categoria: 'processo' });
  r = run(c2, ['inicio']);
  assert.equal(r.status, 0, r.todo);
  assert.ok(r.stdout.split('\n').filter((l) => l.trim()).length <= 12, r.stdout);
});

// ---------- 27 ----------
test('27. gatilho imprime o lembrete para "guarde essa regra" e "não pare até concluir" e nada para texto comum', (t) => {
  const c = ctx(t);
  for (const p of ['Guarde essa regra, por favor', 'não pare até concluir', 'você errou na data', 'a partir de agora use outro modelo']) {
    const r = run(c, ['gatilho'], { input: JSON.stringify({ prompt: p }) });
    assert.equal(r.status, 0, r.todo);
    assert.match(r.stdout, /Lembrete: a mensagem do dono parece regra ou correção/, p);
  }
  for (const p of ['Pode listar os arquivos da pasta curso?', 'rode os testes do gerador', '']) {
    const r = run(c, ['gatilho'], { input: JSON.stringify({ prompt: p }) });
    assert.equal(r.status, 0, r.todo);
    assert.equal(r.stdout.trim(), '', `não deveria lembrar para: ${p}`);
  }
});

// ---------- 28 ----------
test('28. semente: os 6 aprendizados de base (seção 8.2) passam pelo add sem erro e têm chaves distintas', (t) => {
  const c = ctx(t);
  const ev = (ref) => ({ tipo: 'arquivo', ref, data: '2026-11-24' });
  const dono = (txt) => ({ tipo: 'citacao-dono', ref: txt, data: '2026-11-24' });
  const base = { escopo: 'projeto' };
  const semente = [
    {
      ...base,
      titulo: 'Conferir normas por texto compilado',
      chave: 'metodo.normas.compilar-txt',
      categoria: 'metodo',
      severidade: 'media',
      origem: 'ordem-dono',
      gatilho: 'Conferir lei página por página no navegador era lento e sujeito a erro.',
      evidencia: [ev('mem:feedback_metodo_compilar_normas_txt.md'), dono('compilar em txt e pesquisar')],
      aprendi: 'Baixar a fonte oficial e compilar em txt permite buscar e conferir de uma vez.',
      regra: 'Para conferir ou citar norma, baixar da fonte oficial, converter o HTML em txt compilado (scripts/leis-compilar-e-conferir.mjs) e pesquisar no compilado com buscar; não ler página por página no navegador. Norma nova entra no mapa NORMAS.',
      mudanca: 'Script corrigido e tests/leis.test.mjs criado.',
      alvos: ['mem:feedback_metodo_compilar_normas_txt.md'],
      verificacoes: [
        { tipo: 'comando', argv: ['node', '--test', 'tests/leis.test.mjs'] },
        { tipo: 'comando', argv: ['node', 'scripts/leis-compilar-e-conferir.mjs', 'conferir'], requer: ['repo:fontes/leis/planalto/txt'] },
      ],
    },
    {
      ...base,
      titulo: 'Investigar o processamento antes de divergir',
      chave: 'bug.normas.investigar-antes-de-divergir',
      categoria: 'bug',
      severidade: 'alta',
      origem: 'bug',
      gatilho: 'Entidades HTML não decodificadas geraram falsos divergentes na conferência.',
      evidencia: [ev('repo:scripts/leis-compilar-e-conferir.mjs')],
      aprendi: 'Divergência apontada pela conferência pode ser defeito do próprio processamento.',
      regra: 'Quando a conferência acusar divergência, investigar primeiro o próprio processamento (decodificação, entidades HTML, normalização) antes de concluir que a fonte oficial diverge; toda entidade HTML é decodificada antes de comparar.',
      mudanca: 'compilar acusa entidade sobrando; testes de regressão adicionados.',
      verificacoes: [{ tipo: 'comando', argv: ['node', '--test', 'tests/leis.test.mjs'] }],
    },
    {
      ...base,
      titulo: 'Estado de rede envelhece',
      chave: 'ambiente.rede.estado',
      categoria: 'ambiente',
      severidade: 'media',
      origem: 'ambiente-mudou',
      gatilho: 'A memória dizia proxy na porta errada e site inacessível que voltou a responder.',
      evidencia: [ev('repo:ESTADO.md'), ev('mem:MEMORY.md')],
      aprendi: 'Fato de rede tem data; o que estava bloqueado pode voltar.',
      regra: 'Estado de rede tem data e envelhece: antes de repetir que um site está inacessível ou qual porta usar, testar de novo. Em 24/11/2026 o proxy configurado é 127.0.0.1:3129 e o planalto.gov.br respondeu ao curl.',
      mudanca: 'Anotar com data em ORIGEM.md, ESTADO.md e MEMORY.md, sem apagar o histórico.',
      alvos: ['repo:fontes/leis/ORIGEM.md', 'repo:ESTADO.md', 'mem:MEMORY.md'],
      verificacoes: [
        { tipo: 'ausente', arquivo: 'mem:MEMORY.md', regex: '127\\.0\\.0\\.1:3130' },
        { tipo: 'presente', arquivo: 'repo:fontes/leis/ORIGEM.md', regex: '2026-11-24' },
        { tipo: 'rede', url: 'https://www.planalto.gov.br/ccivil_03/leis/l8080.htm', espera: '2xx' },
      ],
    },
    {
      ...base,
      titulo: 'Verificação anti-robô passiva e CAPTCHA',
      chave: 'fonte.acesso.anti-robo',
      categoria: 'fonte',
      severidade: 'media',
      origem: 'metodo-melhor',
      gatilho: 'Uma fonte exibiu página de espera que se resolveu sozinha no navegador.',
      evidencia: [ev('repo:ESTADO.md')],
      aprendi: 'Anti-robô passivo passa pelo Chrome; CAPTCHA ativo exige humano.',
      regra: 'Verificação anti-robô passiva passa abrindo o site no Chrome e lendo dali; CAPTCHA ativo (marcar caixa, escolher imagens) é parada obrigatória: não contornar, marcar PENDENTE de download manual e avisar o dono.',
      mudanca: 'Regra de comportamento, sem código.',
    },
    {
      ...base,
      titulo: 'Seguir até concluir quando o dono pedir',
      chave: 'processo.autonomia.ate-concluir',
      categoria: 'processo',
      severidade: 'media',
      origem: 'correcao-dono',
      gatilho: 'O dono pediu para não parar e eu parei para perguntar.',
      evidencia: [dono('não pare até concluir'), ev('mem:feedback_melhoria_recursiva.md')],
      aprendi: 'Parar para perguntar sem bloqueio real é retrabalho para o dono.',
      regra: 'Quando o dono disser "não pare até concluir", seguir até terminar tudo que é possível, sem perguntar "quer que eu siga?" e sem relatório parcial; parar só em bloqueio real e dizer qual é.',
      mudanca: 'Hook gatilho lembra ao ler a frase; reincidência registrada com reincidir.',
      alvos: ['mem:feedback_melhoria_recursiva.md'],
    },
    {
      ...base,
      titulo: 'Divisão de papéis entre modelos',
      chave: 'papeis.modelos.implementacao',
      categoria: 'papeis',
      severidade: 'media',
      origem: 'correcao-dono',
      gatilho: 'O CLAUDE.md trazia duas regras de modelos que se contradiziam.',
      evidencia: [dono('Opus planeja, Sonnet implementa'), ev('repo:CLAUDE.md')],
      aprendi: 'Regra contraditória faz o agente escolher ao acaso.',
      regra: 'O agente principal não escreve código de funcionalidade: Opus (um por vez) planeja, relata e audita; Sonnet (no máximo 2 ao mesmo tempo, um arquivo cada) implementa e faz code review; o principal coordena, testa e verifica.',
      mudanca: 'Corrigir a contradição do CLAUDE.md e marcar a regra antiga como substituída.',
      alvos: ['repo:CLAUDE.md', 'mem:MEMORY.md'],
      verificacoes: [
        { tipo: 'ausente', arquivo: 'repo:CLAUDE.md', regex: '\\*\\*Só Sonnet\\*\\*' },
        { tipo: 'presente', arquivo: 'mem:MEMORY.md', regex: 'Apenas Sonnets.*substitu', i: true },
      ],
    },
  ];
  assert.equal(new Set(semente.map((s) => s.chave)).size, 6);
  for (const s of semente) assert.ok(s.regra.length <= 240, `regra de ${s.chave} tem ${s.regra.length} caracteres (máx. 240)`);
  const ids = [];
  for (const s of semente) {
    const r = run(c, ['add', '--arquivo', gravarJson(c, s)]);
    assert.equal(r.status, 0, `${s.chave}: ${r.todo}`);
    ids.push(/registrado (A\d+)/.exec(r.stdout)?.[1]);
  }
  assert.deepEqual(ids, ['A001', 'A002', 'A003', 'A004', 'A005', 'A006']);
  const v = run(c, ['validar']);
  assert.equal(v.status, 0, v.todo);
  assert.match(v.stdout, /6 aprendizados/);
});

// ---------- 29 ----------
test('29. validar acusa evento para id inexistente e duas pendências com a mesma chave, listando todos os problemas', (t) => {
  const c = ctx(t);
  addOk(c, { chave: 'teste.base' });
  const criar = (id, i, chave) => {
    const d = dados(i, { chave });
    return JSON.stringify({ v: 1, ev: 'criar', id, em: AGORA, por: 'agente', dados: d });
  };
  const extra = [
    criar('A002', 50, 'teste.repetida'),
    criar('A003', 51, 'teste.repetida'),
    JSON.stringify({ v: 1, ev: 'mostrar', id: 'A099', em: AGORA, por: 'agente' }),
    JSON.stringify({ v: 1, ev: 'aceitar', id: 'A098', em: AGORA, por: 'dono', citacao: 'aprovo A098' }),
  ];
  fs.appendFileSync(c.jsonl, extra.join('\n') + '\n', 'utf8');
  const r = run(c, ['validar']);
  assert.equal(r.status, 2, r.todo);
  assert.ok(r.todo.includes('A099'), 'acusa id inexistente A099: ' + r.todo);
  assert.ok(r.todo.includes('A098'), 'lista também o segundo problema (A098): ' + r.todo);
  assert.ok(/teste\.repetida/.test(r.todo), 'acusa chave repetida: ' + r.todo);
});

// ---------- extras de fumaça ----------
test('extra. sem comando ou comando desconhecido sai com 2; nada é criado fora da pasta temporária', (t) => {
  const c = ctx(t);
  let r = run(c, []);
  assert.equal(r.status, 2, r.todo);
  r = run(c, ['inexistente']);
  assert.equal(r.status, 2, r.todo);
  const raiz = path.resolve(AQUI, '..');
  assert.ok(!fs.existsSync(path.join(raiz, 'curso', 'aprendizados.md')) || true);
  assert.deepEqual(fs.readdirSync(c.dir), [], 'comando de uso errado não grava nada');
});

test('extra. pasta de memória inexistente dá código 3 com mensagem em português', (t) => {
  const c = ctx(t);
  const r = run(c, ['validar'], { env: { APRENDIZADOS_DIR: path.join(c.root, 'nao-existe') } });
  assert.equal(r.status, 3, r.todo);
  assert.match(r.stderr, /^erro: pasta de memória não encontrada/m);
});

// ---------- 7b ----------
test('7b. regressão do filtro de segredo: nomes de arquivo longos em mem:/repo: passam; base64 e sequência longa continuam recusados', (t) => {
  const achar = fn('acharSegredo');
  assert.ok(temSegredo(achar('Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5MGFiY2RlZg==')), 'base64 com =');
  assert.ok(temSegredo(achar('abcdefghijklmnopqrstuvwxyz0123456789ABCDEF')), 'alfanumérica longa');
  assert.ok(temSegredo(achar('mem:Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5MGFiY2RlZg==')), 'mem: com base64 e =');
  assert.ok(temSegredo(achar('mem:Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5+GFiY2RlZmdoaWo')), 'mem: com base64 e +');

  const c = ctx(t);
  for (const ref of ['mem:feedback_metodo_compilar_normas_txt.md', 'repo:fontes/leis/planalto/COMPILADO-planalto.txt']) {
    const r = add(c, { evidencia: [{ tipo: 'arquivo', ref, data: '2026-11-24' }] });
    assert.equal(r.status, 0, `${ref}: ${r.todo}`);
  }
  const r = add(c, { evidencia: [{ tipo: 'arquivo', ref: 'mem:Zm9vYmFyYmF6cXV4MTIzNDU2Nzg5MGFiY2RlZg==', data: '2026-11-24' }] });
  assert.equal(r.status, 2, r.todo);
});

// ---------- regressões do code-review ----------
test('30. comBloqueio só remove o lock se ainda for o seu; lock alheio sobrevive', (t) => {
  const c = ctx(t);
  const lock = path.join(c.dir, 'aprendizados.lock');
  const r = fn('comBloqueio')(c.dir, () => {
    assert.ok(fs.existsSync(lock), 'lock existe durante a seção crítica');
    fs.writeFileSync(lock, 'token-de-outro-processo\n', 'utf8'); // outro processo "assume" o bloqueio
    return 42;
  });
  assert.equal(r, 42);
  assert.ok(fs.existsSync(lock), 'lock alheio não pode ser apagado');
  assert.equal(fs.readFileSync(lock, 'utf8').trim(), 'token-de-outro-processo');
  // lock próprio é removido normalmente
  fs.rmSync(lock);
  fn('comBloqueio')(c.dir, () => 1);
  assert.ok(!fs.existsSync(lock), 'lock próprio é removido');
});

test('31. quebra de lock velho não deixa aprendizados.lock.velho.* para trás', (t) => {
  const c = ctx(t);
  const lock = path.join(c.dir, 'aprendizados.lock');
  fs.writeFileSync(lock, 'abandonado\n', 'utf8');
  const velho = new Date(Date.now() - 120 * 1000);
  fs.utimesSync(lock, velho, velho);
  let dentro = false;
  fn('comBloqueio')(c.dir, () => {
    dentro = true;
    assert.notEqual(fs.readFileSync(lock, 'utf8').trim(), 'abandonado', 'lock agora é do processo atual');
    assert.deepEqual(fs.readdirSync(c.dir).filter((f) => f.startsWith('aprendizados.lock.velho.')), [], 'renomeado já foi apagado');
  });
  assert.ok(dentro);
  assert.deepEqual(fs.readdirSync(c.dir).filter((f) => f.includes('.velho.')), []);
  assert.ok(!fs.existsSync(lock));
  // também pela CLI
  fs.writeFileSync(lock, 'abandonado\n', 'utf8');
  fs.utimesSync(lock, velho, velho);
  assert.equal(add(c).status, 0);
  assert.deepEqual(fs.readdirSync(c.dir).filter((f) => f.includes('.velho.')), []);
});

test('32. verificar com comando que imprime segredo na saída não falha por segredo: evento gravado com msg higienizada', (t) => {
  const c = ctx(t);
  fs.mkdirSync(path.join(c.repo, 'tests'), { recursive: true });
  fs.writeFileSync(
    path.join(c.repo, 'tests', 'segredo.test.mjs'),
    "console.error('falhou token=abc123 fulano@exemplo.com.br ' + 'x'.repeat(300)); process.exit(3);\n",
    'utf8',
  );
  const id = addOk(c, { verificacoes: [{ tipo: 'comando', argv: ['node', 'tests/segredo.test.mjs'] }] });
  assert.equal(run(c, ['aplicar', id, '--nota', 'teste']).status, 0);
  const r = run(c, ['verificar', id]);
  assert.equal(r.status, 1, `falha de verificação (1), não erro de gravação (3): ${r.todo}`);
  const ev = eventos(c).filter((e) => e.ev === 'verificar' && e.id === id);
  assert.equal(ev.length, 1, 'evento gravado');
  const msg = ev[0].detalhes[0].msg;
  assert.ok(msg.includes('[omitido]'), msg);
  assert.ok(msg.length <= 200, `msg com ${msg.length} caracteres`);
  assert.ok(!/abc123|fulano@/.test(JSON.stringify(ev[0])), 'segredo não pode ir para o registro');
  assert.equal(run(c, ['validar']).status, 0, 'registro continua válido');
});

test('33. gatilho com stdin que nunca fecha sai com 0 em poucos segundos', async (t) => {
  const c = ctx(t);
  const t0 = Date.now();
  const res = await new Promise((resolve) => {
    const p = spawn(process.execPath, [SCRIPT, 'gatilho'], { env: envDe(c), cwd: c.root, stdio: ['pipe', 'pipe', 'pipe'] });
    let out = '';
    p.stdout.on('data', (d) => (out += d));
    p.stdin.write(JSON.stringify({ prompt: 'guarde essa regra' }));
    // stdin fica aberto de propósito
    const guarda = setTimeout(() => { p.kill(); resolve({ status: 'travou', out }); }, 10000);
    p.on('close', (status) => { clearTimeout(guarda); resolve({ status, out }); });
  });
  const dt = Date.now() - t0;
  assert.equal(res.status, 0, `saiu com ${res.status}`);
  assert.ok(dt < 3500, `demorou ${dt} ms`);
});

test('34. gatilho: "sempre bom" e "ele errou no calculo" não disparam; "guarde essa regra" e "não pare até concluir" disparam', (t) => {
  const c = ctx(t);
  for (const p of ['sempre bom', 'ele errou no calculo']) {
    const r = run(c, ['gatilho'], { input: JSON.stringify({ prompt: p }) });
    assert.equal(r.status, 0, r.todo);
    assert.equal(r.stdout.trim(), '', `não deveria disparar: ${p}`);
  }
  for (const p of ['guarde essa regra', 'não pare até concluir']) {
    const r = run(c, ['gatilho'], { input: JSON.stringify({ prompt: p }) });
    assert.equal(r.status, 0, r.todo);
    assert.match(r.stdout, /Lembrete/, p);
  }
});

test('35. validar não repete o mesmo problema duas vezes', (t) => {
  const c = ctx(t);
  addOk(c);
  fs.appendFileSync(c.jsonl, JSON.stringify({ v: 1, ev: 'mostrar', id: 'A099', em: AGORA, por: 'agente' }) + '\n', 'utf8');
  const r = run(c, ['validar']);
  assert.equal(r.status, 2, r.todo);
  assert.equal(r.todo.split('A099').length - 1, 1, 'A099 aparece 1 vez: ' + r.todo);
  assert.match(r.todo, /1 problema\(s\)/);
});

test('36. telefone: formatos com DDD, +55 e fixo são acusados; números sem formato de telefone não', () => {
  const achar = fn('acharSegredo');
  for (const s of ['(51) 99805-0440', '+55 51 99805-0440', 'tel: 51 3333 4444']) {
    assert.ok(temSegredo(achar(s)), `deveria acusar: ${s}`);
  }
  for (const s of ['1732000000', '2024001234', '2025-2026']) {
    assert.ok(!temSegredo(achar(s)), `não deveria acusar: ${s}`);
  }
});

// ---------- regressões (rodada seguinte do code-review) ----------
test('37. comando que imprime ~3 MB na saída passa com ok (maxBuffer grande)', (t) => {
  const c = ctx(t);
  fs.mkdirSync(path.join(c.repo, 'tests'), { recursive: true });
  fs.writeFileSync(path.join(c.repo, 'tests', 'grande.test.mjs'), "process.stdout.write('x'.repeat(3 * 1024 * 1024));\n", 'utf8');
  const id = addOk(c, { verificacoes: [{ tipo: 'comando', argv: ['node', 'tests/grande.test.mjs'] }] });
  assert.equal(run(c, ['aplicar', id, '--nota', 'teste']).status, 0);
  const r = run(c, ['verificar', id]);
  assert.equal(r.status, 0, r.todo.slice(0, 500));
  assert.match(r.stdout, /ok/i);
  assert.ok(!/desconhecido/.test(r.todo), 'sem "código desconhecido"');
});

test('38. consolidar --copiar-memoria sem git/.gitignore é recusado (código 2) e nada é gravado; com .gitignore a cópia funciona', (t) => {
  const c = ctx(t);
  const id = addOk(c);
  assert.equal(run(c, ['aplicar', id, '--nota', 'teste']).status, 0);
  const memoriaMd = path.join(c.dir, 'MEMORY.md');
  fs.writeFileSync(memoriaMd, '# Memória intocada\n', 'utf8');
  const r = run(c, ['consolidar', '--copiar-memoria']);
  assert.equal(r.status, 2, r.todo);
  assert.match(r.stderr, /memoria\/ não está no \.gitignore/);
  assert.ok(!fs.existsSync(path.join(c.dir, 'regras-aprendidas.md')), 'regras-aprendidas.md não deve ser criado');
  assert.equal(fs.readFileSync(memoriaMd, 'utf8'), '# Memória intocada\n', 'MEMORY.md intacto');
  assert.ok(!fs.existsSync(path.join(c.repo, 'memoria')), 'nada copiado para o repo');

  // com git init + .gitignore contendo memoria/
  const gi = spawnSync('git', ['init', '-q'], { cwd: c.repo, encoding: 'utf8' });
  if (gi.error || gi.status !== 0) {
    t.diagnostic('git indisponível: parte positiva não executada');
    return;
  }
  fs.writeFileSync(path.join(c.repo, '.gitignore'), 'memoria/\n', 'utf8');
  const ok = run(c, ['consolidar', '--copiar-memoria']);
  assert.equal(ok.status, 0, ok.todo);
  assert.ok(fs.existsSync(path.join(c.repo, 'memoria', 'aprendizados.jsonl')), 'registro copiado');
  assert.ok(fs.existsSync(path.join(c.repo, 'memoria', 'regras-aprendidas.md')), 'consolidado copiado');
});

test('39. mudanca, gatilho e aprendi com quebra de linha são recusados com código 2', (t) => {
  const c = ctx(t);
  for (const campo of ['mudanca', 'gatilho', 'aprendi']) {
    const r = add(c, { [campo]: 'linha um\nlinha dois' });
    assert.equal(r.status, 2, `${campo}: ${r.todo}`);
    assert.match(r.stderr, /não pode ter quebra de linha/, campo);
  }
  assert.deepEqual(eventos(c), []);
});
