// CSS base das apostilas Premium (compartilhado por gerar-apostila.mjs e gerar-apostila-materia.mjs). Cor da marca vem de curso/index.js.
import { MARCA } from '../curso/index.js';

// A cor primaria da apostila e a da marca (curso/curso.json > marca.corPrimaria); sem ela, mantem o azul padrao.
const COR = /^#[0-9a-f]{6}$/i.test(MARCA.corPrimaria || '') ? MARCA.corPrimaria : '#0b57d0';
const CSS_PADRAO = `:root{--tx:#1d1d1f;--mut:#555;--bd:#d0d7de;--bg:#fff;--soft:#f6f8fa;--azul:#0b57d0;--azul-f:#e8f0fe;--verde:#137333;--verde-f:#e6f4ea;--verm:#b3261e;--verm-f:#fdecea;--lar:#8a4500;--lar-b:#e37400;--lar-f:#fff4ce;--roxo:#6a1b9a;--roxo-f:#f3e5f5;--foco:#ff9800;--c1:#0b57d0;--c2:#137333;--c3:#e37400;--c4:#6a1b9a;--c5:#b3261e}
@media (prefers-color-scheme:dark){:root{--tx:#e6e6e6;--mut:#aaa;--bd:#3a3f45;--bg:#121417;--soft:#1c1f23;--azul:#8ab4f8;--azul-f:#1d2a3f;--verde:#81c995;--verde-f:#1b2b20;--verm:#f28b82;--verm-f:#3a1f1d;--lar:#fdd663;--lar-b:#fbbc04;--lar-f:#3a3016;--roxo:#d7aefb;--roxo-f:#2e2236;--c1:#8ab4f8;--c2:#81c995;--c3:#fbbc04;--c4:#d7aefb;--c5:#f28b82}}
*{box-sizing:border-box}body{font-family:"Segoe UI",Arial,sans-serif;color:var(--tx);background:var(--bg);max-width:960px;margin:0 auto;padding:24px 16px;line-height:1.55;font-size:16px}
a{color:var(--azul)}a:focus-visible{outline:3px solid var(--foco);outline-offset:2px}
h1{font-size:30px;border-bottom:3px solid var(--azul);padding-bottom:6px;margin-bottom:4px}h2{font-size:23px;margin-top:40px;color:var(--azul);page-break-before:always}h3{font-size:18px;margin:22px 0 6px}
.sub{color:var(--mut);font-size:14px}.sub1{color:var(--mut);margin-top:0}
.tw{overflow-x:auto}table{border-collapse:collapse;width:100%;margin:12px 0;font-size:14.5px}th,td{border:1px solid var(--bd);padding:6px 8px;vertical-align:top;text-align:left}th{background:var(--soft)}caption{text-align:left;font-weight:700;padding:4px 0;color:var(--mut)}td.n{white-space:nowrap}tr.fora td{color:var(--mut);background:var(--soft)}
.bar{display:inline-block;height:10px;border-radius:3px;margin-right:8px;vertical-align:middle;background:var(--azul)}.bar.n3{background:var(--lar-b)}.bar.n0{display:none}.alta{color:var(--lar)}
.box{border-left:5px solid var(--azul);background:var(--soft);padding:10px 14px;margin:14px 0;border-radius:4px}.atencao{border-left-color:var(--verm);background:var(--verm-f)}.cai{border-left-color:var(--lar-b);background:var(--lar-f)}.dica{border-left-color:var(--verde);background:var(--verde-f)}
.leg{border:2px solid var(--bd);border-radius:8px;padding:10px 14px;margin:14px 0;line-height:2}.leg span{display:inline-block;padding:1px 8px;border-radius:4px;margin:2px 4px 2px 0;font-size:13px;font-weight:700;border-left:5px solid}
.cz{background:var(--azul-f);border-color:var(--azul);color:var(--azul)}.cv{background:var(--verde-f);border-color:var(--verde);color:var(--verde)}.cl{background:var(--lar-f);border-color:var(--lar-b);color:var(--lar)}.cr{background:var(--verm-f);border-color:var(--verm);color:var(--verm)}.cx{background:var(--roxo-f);border-color:var(--roxo);color:var(--roxo)}
.sum{border:1px solid var(--bd);border-radius:8px;padding:10px 14px;background:var(--soft)}.sum ol{columns:2;margin:6px 0}
.cobra li{margin:4px 0}
.mapa{margin:16px 0;padding:10px;border:1px solid var(--bd);border-radius:8px;break-inside:avoid}.mapa .centro{margin:0 auto 12px;max-width:340px;text-align:center;font-weight:700;background:var(--azul);color:var(--bg);border-radius:24px;padding:8px 14px}
.ramos{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px}.ramo{border:2px solid var(--c1);border-radius:8px;padding:6px 10px;background:var(--soft)}.ramo .rt{font-weight:700;margin-bottom:2px}.ramo ul{margin:2px 0;padding-left:18px;font-size:14px}
.ramo.c2{border-color:var(--c2)}.ramo.c3{border-color:var(--c3)}.ramo.c4{border-color:var(--c4)}.ramo.c5{border-color:var(--c5)}.ramo.c1 .rt{color:var(--c1)}.ramo.c2 .rt{color:var(--c2)}.ramo.c3 .rt{color:var(--c3)}.ramo.c4 .rt{color:var(--c4)}.ramo.c5 .rt{color:var(--c5)}
figcaption{font-size:13px;color:var(--mut);text-align:center;margin-top:6px;font-weight:600}
.ql{padding-left:22px}.q{margin:16px 0;break-inside:avoid}.alts{list-style:none;padding-left:0}.alts li{margin:4px 0;padding:2px 6px;border-radius:4px}.alts li.certa{background:var(--verde-f);border-left:4px solid var(--verde)}
.grava{background:var(--verde-f);border-left:5px solid var(--verde);padding:6px 10px;border-radius:4px;margin-top:6px;font-weight:600}.peg{color:var(--verm);font-size:14px;margin-top:4px}
footer{margin-top:30px;border-top:1px solid var(--bd);padding-top:10px;font-size:13px;color:var(--mut)}
@media (max-width:768px){body{font-size:16px}h1{font-size:25px}h2{font-size:21px}.sum ol{columns:1}.sum a{display:inline-block;min-height:44px;line-height:44px}}
@media (max-width:600px){th,td{padding:5px 6px}.leg span{display:block}}
@media (max-width:480px){body{padding:16px}h1{font-size:22px}table{font-size:13px}.bar{display:none}}
@media print{body{max-width:none;font-size:12px}a{color:inherit;text-decoration:none}.tw{overflow:visible}h2,h3{break-after:avoid}table,tr,.box,.mapa,.q{break-inside:avoid}.sum a{min-height:0;line-height:inherit}}`;
export const CSS_BASE = CSS_PADRAO
  .replace('--azul:#0b57d0;--azul-f:#e8f0fe;', `--azul:${COR};--azul-f:color-mix(in srgb,${COR} 10%,white);`)
  .replace('--c1:#0b57d0;', `--c1:${COR};`);

// ---------- identidade do curso (tudo vem de curso/) e leitura com erro claro ----------
import fs from 'node:fs';
import path from 'node:path';
import { CURSO } from '../curso/index.js';

export const RAIZ = path.resolve(import.meta.dirname, '..');
const cert = CURSO.certame || {};
export const NOME_CURSO = MARCA.nome || 'Curso';
export const BANCA = cert.banca || cert.baseadoEm?.banca || '';
export const LINHA_CURSO = [NOME_CURSO, cert.cargo, cert.orgao, BANCA && 'banca ' + BANCA].filter(Boolean).join(' · ');
export const SEM_VINCULO = 'Material independente de estudo, sem vínculo com '
  + ([cert.orgao, BANCA].filter(Boolean).join(' nem com ') || 'o órgão nem com a banca organizadora')
  + '. Não garante aprovação.';

// Le um arquivo do repositorio; se faltar, para com mensagem que diz o que criar.
export function lerObrigatorio(rel, dica) {
  const p = path.join(RAIZ, rel);
  if (!fs.existsSync(p)) { console.error(`Arquivo obrigatorio ausente: ${rel}${dica ? ' (' + dica + ')' : ''}`); process.exit(1); }
  return fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
}
export function lerJsonObrigatorio(rel, dica) {
  try { return JSON.parse(lerObrigatorio(rel, dica)); }
  catch (e) { if (e instanceof SyntaxError) { console.error(`JSON invalido em ${rel}: ${e.message}`); process.exit(1); } throw e; }
}
export const NAVEGADORES = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe'];

// ---------- numeracao das apostilas (regra permanente: toda apostila e numerada) ----------
// Valida o campo "numero" (inteiro >= 1) e devolve { numero, rotulo: "Apostila 01", prefixo: "apostila-01-" }.
// Lanca Error com mensagem clara (quem chama decide se imprime e sai).
export function infoNumeroApostila(A, origem = 'apostila') {
  const n = A?.numero;
  if (n === undefined || n === null) throw new Error(`${origem}: falta o campo obrigatorio "numero" (inteiro >= 1; toda apostila e numerada)`);
  if (!Number.isInteger(n) || n < 1) throw new Error(`${origem}: "numero" invalido (${JSON.stringify(n)}): use um inteiro >= 1`);
  const nn = String(n).padStart(2, '0');
  return { numero: n, rotulo: `Apostila ${nn}`, prefixo: `apostila-${nn}-` };
}
// O nome do PDF/HTML gerado precisa comecar com o prefixo numerado (apostila-0N-...).
export function validarNomeArquivo(nome, info, origem = 'apostila') {
  if (typeof nome !== 'string' || !nome.startsWith(info.prefixo)) throw new Error(`${origem}: "arquivoPdf" (${JSON.stringify(nome)}) precisa comecar com "${info.prefixo}" (numero da apostila no nome do arquivo)`);
  return nome;
}
// Versao para scripts: imprime a mensagem e sai com codigo 1.
export function exigirNumeroApostila(A, origem) {
  try { return infoNumeroApostila(A, origem); } catch (e) { console.error(e.message); process.exit(1); }
}
export function exigirNomeArquivo(nome, info, origem) {
  try { return validarNomeArquivo(nome, info, origem); } catch (e) { console.error(e.message); process.exit(1); }
}
// CSS de paginacao: rodape "<rotulo> · Pagina X de Y" em toda pagina do PDF (e da impressao do HTML).
// counter(pages) = total de paginas (Chrome/Edge 131+). O texto entra via "content" (aspas simples escapadas).
export function cssPaginas(rotulo) {
  const BARRA = String.fromCharCode(92);
  const r = String(rotulo).split(BARRA).join(BARRA + BARRA).split("'").join(BARRA + "'").split('<').join(BARRA + '3C ').replace(/\s+/g, ' '); // '<' escapado: um "</style>" no titulo nao fecha o bloco
  return `@page{size:A4;margin:16mm 14mm 20mm;@bottom-center{content:'${r} · Página ' counter(page) ' de ' counter(pages);font:10px "Segoe UI",Arial,sans-serif;color:#555}}`;
}
