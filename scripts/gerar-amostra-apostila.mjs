// Gera a AMOSTRA GRATIS da apostila de uma materia: capa, ranking dos assuntos e UMA licao completa.
// Parte do HTML gerado por gerar-apostila-materia.mjs (rascunho/apostila/<id>.html) e grava
// public/amostra-apostila-<slug>.pdf (publico de proposito: e so o cartao de visita, nunca a apostila inteira).
// Uso: node scripts/gerar-amostra-apostila.mjs portugues ortografia
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { MARCA } from '../curso/index.js';
import { RAIZ, NOME_CURSO, lerObrigatorio, lerJsonObrigatorio, NAVEGADORES, exigirNumeroApostila, exigirNomeArquivo, cssPaginas } from './apostila-css.mjs';

const [id, licao] = process.argv.slice(2);
if (!id || !licao || id.startsWith('--')) { console.error('Uso: node scripts/gerar-amostra-apostila.mjs <materia> <licao>  (rode antes gerar-apostila-materia.mjs <materia>)'); process.exit(id === '--help' ? 0 : 1); }
const A = lerJsonObrigatorio(`curso/apostila/${id}.json`, 'roteiro da apostila da materia');
if (!Array.isArray(A.licoes) || !A.arquivoPdf) { console.error(`curso/apostila/${id}.json: faltam "licoes" e/ou "arquivoPdf"`); process.exit(1); }
const NUM = exigirNumeroApostila(A, `curso/apostila/${id}.json`);
exigirNomeArquivo(A.arquivoPdf, NUM, `curso/apostila/${id}.json`);
const html = lerObrigatorio(`rascunho/apostila/${id}.html`, 'rode antes: node scripts/gerar-apostila-materia.mjs ' + id);
if (!A.licoes.some(l => l.id === licao)) { console.error(`Licao inexistente: ${licao}`); process.exit(2); }

const secoes = [...html.matchAll(/<section id="([^"]+)">[\s\S]*?<\/section>/g)];
const pega = (sid) => secoes.find(m => m[1] === sid)?.[0];
const ranking = pega('ranking'), aula = pega(`l-${licao}`), limites = pega('limites');
if (!ranking || !aula || !limites) { console.error('Estrutura do HTML inesperada: rode gerar-apostila-materia.mjs antes'); process.exit(2); }

const cabecaOriginal = html.slice(0, html.indexOf('<main>') + '<main>'.length);
const head = cabecaOriginal
  .replace(/<title>Apostila/, () => '<title>Amostra grátis - Apostila')
  .replace(/<h1>Apostila (\d+) —/, (_m, n) => `<h1>Amostra da Apostila ${n} —`)
  // Funcao no lugar de string: um "$&" no titulo nao pode virar padrao de substituicao.
  .replace('</style>', () => cssPaginas(`Amostra da ${NUM.rotulo} · ${A.titulo}`) + '</style>');
// Se o formato do h1/title do gerador mudar, a amostra nao pode sair com o titulo da apostila paga.
if (!/<h1>Amostra da Apostila \d+ —/.test(head) || !head.includes('<title>Amostra grátis - Apostila')) { console.error('Titulo da amostra nao foi trocado: o <h1>/<title> de gerar-apostila-materia.mjs mudou de formato.'); process.exit(2); }
const comoUsar = html.match(/<div class="box"><b>Como usar esta apostila\.[\s\S]*?<\/ul><\/div>/)?.[0] || '';
const legenda = html.match(/<div class="leg">[\s\S]*?<\/div>/)?.[0] || '';
const nomeCurso = NOME_CURSO;
const lic = A.licoes.map(l => l.titulo);
const cta = `<section id="completa"><h2>O que você ganha com a apostila completa</h2><div class="box"><p>Esta amostra traz <b>uma lição</b> de ${A.licoes.length}. A apostila completa de ${A.titulo} (Premium) tem as lições: ${lic.map(t => t.replace(/&/g, '&amp;')).join('; ')}.</p><p>Em cada uma: os assuntos que mais apareceram na análise da banca, quadro para decorar, pegadinhas, mapa mental e questões comentadas. No final, simulado e revisão de véspera.</p><p><b>Para liberar:</b> acesse ${MARCA.siteUrl || ''} e escolha o Premium.</p></div></section>`;
const saida = `${head}${comoUsar}${legenda}${ranking}${aula}${cta}${limites}</main><footer>${nomeCurso} · amostra gratuita de material do Premium.</footer></body></html>`;

const tmp = path.join(RAIZ, 'rascunho/apostila', `${id}-amostra.html`);
fs.writeFileSync(tmp, saida);
const nav = [process.env.NAVEGADOR_PDF, ...NAVEGADORES].filter(Boolean).find(p => fs.existsSync(p));
if (!nav) { console.error('Edge/Chrome nao encontrado (NAVEGADOR_PDF)'); process.exit(1); }
const slug = path.basename(A.arquivoPdf, '.pdf').replace(/^apostila-/, '');
const pdf = path.join(RAIZ, 'public', `amostra-apostila-${slug}.pdf`);
const r = spawnSync(nav, ['--headless', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, 'file:///' + tmp.split(path.sep).join('/')], { stdio: 'inherit' });
if (r.status !== 0 || !fs.existsSync(pdf)) { console.error('Falha ao gerar PDF'); process.exit(1); }
console.log('PDF:', pdf, `(${Math.round(fs.statSync(pdf).size / 1024)} KB)`);
