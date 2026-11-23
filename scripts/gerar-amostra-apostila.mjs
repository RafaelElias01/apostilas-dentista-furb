// Gera um RECORTE da apostila de uma disciplina: capa, ranking dos assuntos e UMA licao completa (PDF curto para conferir/mostrar).
// Uso:  node scripts/gerar-amostra-apostila.mjs <id|caminho.json> <licao> [--saida <pasta>] [--json-externo] [--sem-rodape] [--sem-conferir-rodape] [--teste --questoes <banco.json>]   (rode antes gerar-apostila-materia.mjs com as mesmas opcoes)
//   Le <pasta>/<apostila-0N-nome>.html (padrao: rascunho/apostila) e grava <pasta>/amostra-<apostila-0N-nome>.pdf. Falha se o HTML nao corresponde ao JSON/radar/banco atuais (hash gravado pelo gerador).
//   Rodape numerado: Chrome/Edge >= 131 (NAVEGADOR_PDF); com navegador menor FALHA, salvo --sem-rodape (arquivo -SEM-NUMERACAO, so conferencia).
import fs from 'fs';
import path from 'path';
import { RAIZ, NOME_CURSO, DIR_APOSTILAS, dentroDe, saidaSegura, hashEntradas, secaoLimites, lerJsonObrigatorio, exigirNumeroApostila, exigirNomeArquivo, cssPaginas, htmlParaPdf, opcao } from './apostila-css.mjs';

const [arg, licao] = process.argv.slice(2);
if (!arg || !licao || arg.startsWith('--') || licao.startsWith('--')) { console.error('Uso: node scripts/gerar-amostra-apostila.mjs <id|caminho.json> <licao> [--saida <pasta>] [--json-externo] [--sem-rodape] [--teste --questoes <banco.json>]  (rode antes gerar-apostila-materia.mjs)'); process.exit(arg === '--help' ? 0 : 1); }
const arqJson = arg.endsWith('.json') ? path.resolve(arg) : (/^[A-Za-z0-9_-]+$/.test(arg) ? path.join(DIR_APOSTILAS, `${arg}.json`) : null);
if (!arqJson) { console.error(`id invalido: ${JSON.stringify(arg)} (use so letras, numeros, - e _)`); process.exit(1); }
if (!dentroDe(arqJson, DIR_APOSTILAS) && !process.argv.includes('--json-externo')) { console.error(`${arqJson}: fora de curso/apostila (so com --json-externo, para testes)`); process.exit(1); }
const origemJson = dentroDe(arqJson, RAIZ) ? path.relative(RAIZ, arqJson) : arqJson;
const TESTE = process.argv.includes('--teste'), SEM_RODAPE = process.argv.includes('--sem-rodape'), SEM_CONFERIR = process.argv.includes('--sem-conferir-rodape');
const arqQuestoes = opcao('--questoes');
const saidaOpt = opcao('--saida') && saidaSegura(opcao('--saida'));
const MODELO = path.basename(arqJson).startsWith('_modelo-'), EXTERNO = !dentroDe(arqJson, DIR_APOSTILAS);
if (arqQuestoes && !TESTE) { console.error('--questoes (banco alternativo) so vale com --teste'); process.exit(1); }
if (TESTE && !saidaOpt) { console.error('--teste exige --saida <pasta>'); process.exit(1); }
const A = lerJsonObrigatorio(origemJson, 'roteiro da apostila da disciplina');
if (!Array.isArray(A.licoes) || !A.arquivoPdf) { console.error(`${origemJson}: faltam "licoes" e/ou "arquivoPdf"`); process.exit(1); }
const nomeJson = path.basename(arqJson, '.json');
if (nomeJson !== A.id && nomeJson !== `_modelo-${A.id}`) { console.error(`${origemJson}: o "id" (${A.id}) nao coincide com o nome do arquivo (${nomeJson}.json)`); process.exit(1); }
const NUM = exigirNumeroApostila(A, origemJson);
exigirNomeArquivo(A.arquivoPdf, NUM, origemJson);
const idxLicao = A.licoes.findIndex(l => l.id === licao);
if (idxLicao < 0) { console.error(`Licao inexistente: ${licao}`); process.exit(2); }
const base = path.basename(A.arquivoPdf, '.pdf');
const dir = saidaOpt || path.join(RAIZ, 'rascunho', 'apostila');
const arqOrigem = path.join(dir, `${base}.html`);
if (!fs.existsSync(arqOrigem)) { console.error(`Arquivo ausente: ${arqOrigem} (rode antes: node scripts/gerar-apostila-materia.mjs ${arg}${saidaOpt ? ' --saida ' + dir : ''})`); process.exit(1); }
const html = fs.readFileSync(arqOrigem, 'utf8');

// O HTML tem de ter sido gerado a partir das entradas ATUAIS (JSON da apostila + radar + banco de questoes): senao o recorte sairia defasado.
const mHash = /<!--entradas:([0-9a-f]{64});teste:([01])-->/.exec(html);
if (!mHash) { console.error('O HTML nao traz o hash das entradas (gerado por versao antiga do gerador): rode de novo gerar-apostila-materia.mjs'); process.exit(2); }
if (mHash[1] !== hashEntradas(arqJson, arqQuestoes, Array.isArray(A.fontes) ? A.fontes : [])) { console.error(`O HTML (${arqOrigem}) esta DEFASADO: o JSON da apostila, o radar, o banco de questoes, as fontes de lei ou o gerador mudaram desde que ele foi gerado (ou as opcoes --questoes/--teste diferem). Rode de novo gerar-apostila-materia.mjs.`); process.exit(2); }
if ((mHash[2] === '1') !== TESTE) { console.error('O HTML foi gerado com/sem --teste de forma diferente da desta execucao: repita as mesmas opcoes.'); process.exit(2); }
const ROTULO_TESTE = [TESTE && ' · BANCO DE TESTE', (MODELO || EXTERNO) && ' · MODELO/TESTE'].filter(Boolean).join('');
const esc = (x) => String(x).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const secoes = [...html.matchAll(/<section id="([^"]+)">[\s\S]*?<\/section>/g)];
const pega = (sid) => secoes.find(m => m[1] === sid)?.[0];
// A licao vem dos marcadores <!--licao:K-->...<!--/licao:K--> (K = posicao) emitidos pelo gerador principal: nao depende de regex de </section>.
const iIni = html.indexOf(`<!--licao:${idxLicao}-->`), iFim = html.indexOf(`<!--/licao:${idxLicao}-->`);
let aula = iIni >= 0 && iFim > iIni ? html.slice(iIni, iFim) : null;
// Radar do recorte: itens "ja contado na Licao N" remetem a licoes FORA do recorte e saem; sem itens restantes, a caixa inteira sai.
if (aula) {
  aula = aula.replace(/<li>[^<]*já contado na Lição \d+<\/li>/g, '');
  const caixa = aula.match(/<div class="box cai"><b>📡[\s\S]*?<\/div>/)?.[0];
  if (caixa && !caixa.includes('<li>')) aula = aula.replace(caixa, '');
}
const ranking = pega('ranking');
if (!ranking || !aula) { console.error('Estrutura do HTML inesperada: rode gerar-apostila-materia.mjs antes'); process.exit(2); }

const cabecaOriginal = html.slice(0, html.indexOf('<main>') + '<main>'.length);
const head = cabecaOriginal
  .replace(/<title>Apostila/, () => '<title>Amostra - Apostila')
  .replace(/<h1>Apostila (\d+) —/, (_m, n) => `<h1>Amostra da Apostila ${n} —`)
  // Funcao no lugar de string: um "$&" no titulo nao pode virar padrao de substituicao.
  .replace('</style>', () => cssPaginas(`Amostra da ${NUM.rotulo} · ${A.titulo}${ROTULO_TESTE}`) + '</style>');
if (!/<h1>Amostra da Apostila \d+ —/.test(head) || !head.includes('<title>Amostra - Apostila')) { console.error('Titulo da amostra nao foi trocado: o <h1>/<title> de gerar-apostila-materia.mjs mudou de formato.'); process.exit(2); }
const comoUsar = html.match(/<div class="box"><b>Como usar esta apostila\.[\s\S]*?<\/ul><\/div>/)?.[0] || '';
const legenda = html.match(/<div class="leg">[\s\S]*?<\/div>/)?.[0] || '';
// Banner e aviso de amostra pequena do radar saem do HTML da apostila; os Limites sao recalculados SO com os numeros da licao do recorte.
const banner = html.match(/<!--banner-->[\s\S]*?<!--\/banner-->/)?.[0] || '';
const avisoRadar = html.match(/<!--avisoradar-->[\s\S]*?<!--\/avisoradar-->/)?.[0] || '';
const mStats = new RegExp('<!--stats:' + idxLicao + ':(\\{[^>]*?\\})-->').exec(html);
if (!mStats) { console.error('HTML sem os numeros da licao (stats): rode de novo gerar-apostila-materia.mjs'); process.exit(2); }
const st = JSON.parse(mStats[1]);
const bancoJson = lerJsonObrigatorio(arqQuestoes || 'curso/questoes-anteriores.json', 'banco de questoes');
const RADAR_AMOSTRA = lerJsonObrigatorio('curso/radar-banca.json', 'radar da banca');
const TEM_RANKING_FURB = (RADAR_AMOSTRA.apostilas || []).some(a => a.id === A.id);
const limites = secaoLimites({
  limiteFonte: A.limiteFonte,
  trechos: { n: st.n, refOk: st.refOk, refArtSo: st.refArtSo, refSem: st.refSem, semMarcador: st.semMarcador, arquivos: st.arquivos },
  conceitos: st.conceitos,
  radar: !!aula && aula.includes('No radar da banca'),
  rankingFurb: TEM_RANKING_FURB,
  questoes: { n: st.q, teste: TESTE, bancoAviso: bancoJson.aviso, excl: null },
  amostra: true,
}, esc);
const saida = `${head}${banner}${comoUsar}${avisoRadar}${legenda}${ranking}${aula}${limites}</main><footer>${NOME_CURSO} · recorte de uma lição da apostila.${ROTULO_TESTE}</footer></body></html>`;

const tmp = path.join(dir, `amostra-${base}.html`);
fs.writeFileSync(tmp, saida);
const pdf = path.join(dir, SEM_RODAPE ? `amostra-${base}-SEM-NUMERACAO.pdf` : `amostra-${base}.pdf`);
const r = htmlParaPdf(tmp, pdf, { semRodape: SEM_RODAPE, semConferir: SEM_CONFERIR, rotulo: `Amostra da ${NUM.rotulo} · ${A.titulo}${ROTULO_TESTE}` });
if (!r) process.exit(1);
console.log('PDF:', pdf, `(${Math.round(fs.statSync(pdf).size / 1024)} KB)${r.comRodape ? '' : ' SEM rodape numerado: nao e versao final'}`);
