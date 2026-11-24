// Garante que nenhum PDF publicado em site/apostilas/ esteja mais velho que o JSON da apostila.
// Erro de origem (24/11/2026): um commit de documentação disse "PDFs não gerados" quando estavam
// publicados, e não havia como provar sozinho qual estado era o real. Regra: JSON de apostila alterado
// => PDF regerado e copiado para site/apostilas/ no MESMO commit (ou depois).
// Rodar: node --test tests/pdf-em-dia.test.mjs   (no Node 24, o arquivo isolado, não a pasta)
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const git = (...a) => spawnSync('git', a, { cwd: RAIZ, encoding: 'utf8' });
const temGit = git('rev-parse', '--is-inside-work-tree').stdout.trim() === 'true';

// Momento da última mudança: arquivo com alteração não commitada = "agora"; senão, data do último commit.
function ultimaMudanca(rel) {
  if (git('status', '--porcelain', '--', rel).stdout.trim()) return Number.POSITIVE_INFINITY;
  const t = git('log', '-1', '--format=%ct', '--', rel).stdout.trim();
  return t ? Number(t) : 0;
}

const dirJson = path.join(RAIZ, 'curso', 'apostila');
const apostilas = fs.readdirSync(dirJson)
  .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
  .map((f) => ({ json: `curso/apostila/${f}`, pdf: JSON.parse(fs.readFileSync(path.join(dirJson, f), 'utf8')).arquivoPdf }));

test('toda apostila tem arquivoPdf e o PDF existe em site/apostilas/', () => {
  assert.ok(apostilas.length >= 10, `esperava 10 apostilas, achei ${apostilas.length}`);
  for (const a of apostilas) {
    assert.ok(a.pdf, `${a.json}: sem arquivoPdf`);
    assert.ok(fs.existsSync(path.join(RAIZ, 'site', 'apostilas', a.pdf)), `${a.json}: falta site/apostilas/${a.pdf}`);
  }
});

test('nenhum JSON de apostila mudou depois do seu PDF publicado', { skip: !temGit && 'sem git' }, () => {
  const atrasados = [];
  for (const a of apostilas) {
    const tj = ultimaMudanca(a.json);
    const tp = ultimaMudanca(`site/apostilas/${a.pdf}`);
    if (tj > tp) atrasados.push(`${a.json} mudou depois de site/apostilas/${a.pdf}: rode "node scripts/gerar-apostila-materia.mjs <id> --pdf" e copie o PDF`);
  }
  assert.deepEqual(atrasados, []);
});
