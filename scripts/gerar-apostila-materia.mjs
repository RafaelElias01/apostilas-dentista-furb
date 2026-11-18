// Gera a Apostila Premium de UMA materia (HTML autocontido + PDF) a partir de curso/apostila/<id>.json.
// Regra de precisao: todo "trecho" de lei do JSON precisa existir, palavra por palavra, no texto conferido da
// Constituicao (curso/planos/resumos/cf88-*.md, ignorando dispositivos tachados). Se nao bater, a geracao FALHA.
// Uso: node scripts/gerar-apostila-materia.mjs constitucional          -> rascunho/apostila/<id>.html
//      node scripts/gerar-apostila-materia.mjs constitucional --pdf    -> tambem material-premium/<arquivoPdf>
//      (outro navegador: variavel NAVEGADOR_PDF)
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { spawnSync } from 'child_process';
import { EXERCICIOS } from '../curso/questoes.js';
import { CSS_BASE, RAIZ, NOME_CURSO, SEM_VINCULO, lerObrigatorio, lerJsonObrigatorio, NAVEGADORES, exigirNumeroApostila, exigirNomeArquivo, cssPaginas } from './apostila-css.mjs';

const id = process.argv[2];
if (!id || id.startsWith('--')) { console.error('Uso: node scripts/gerar-apostila-materia.mjs <id> [--pdf]  (<id> = curso/apostila/<id>.json, igual ao id da materia em curso/materias.json)'); process.exit(id === '--help' ? 0 : 1); }
const A = lerJsonObrigatorio(`curso/apostila/${id}.json`, 'roteiro da apostila da materia: id, titulo, subtitulo, comoUsar, ranking, licoes, arquivoPdf');
for (const k of ['id', 'titulo', 'subtitulo', 'arquivoPdf']) if (!A[k] || typeof A[k] !== 'string') { console.error(`curso/apostila/${id}.json: falta "${k}"`); process.exit(1); }
const NUM = exigirNumeroApostila(A, `curso/apostila/${id}.json`);
exigirNomeArquivo(A.arquivoPdf, NUM, `curso/apostila/${id}.json`);
const TITULO_NUM = `${NUM.rotulo} — ${A.titulo}`;
for (const k of ['comoUsar', 'ranking', 'licoes']) if (!Array.isArray(A[k]) || !A[k].length) { console.error(`curso/apostila/${id}.json: falta o array "${k}"`); process.exit(1); }
const BANCO = Array.isArray(EXERCICIOS) ? EXERCICIOS : EXERCICIOS.questoes;
const LETRAS = ['A', 'B', 'C', 'D', 'E'];
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const nomeCurso = NOME_CURSO;

// ---------- confere os trechos de lei na fonte ----------
function textoFonte() {
  const dir = path.join(RAIZ, 'curso/planos/resumos');
  // Tachado so dentro da MESMA linha: o aviso no topo de cada arquivo cita "~~" solto e desalinharia os pares.
  const norm = (s) => s.replace(/~~[^~\n]*~~/g, ' ').replace(/\*\([^)]*\)\*/g, ' ').replace(/\s+/g, ' ').normalize('NFC'); // a fonte traz alguns acentos decompostos (NFD)
  return fs.readdirSync(dir).filter(f => (A.fontes || ['cf88-']).some(p => f.startsWith(p))).map(f => norm(fs.readFileSync(path.join(dir, f), 'utf8').replace(/\r\n/g, '\n'))).join(' ');
}
const FONTE = textoFonte();
// Cada prefixo de fonte precisa casar com ao menos um arquivo (erro de digitacao nao pode passar em silencio).
for (const p of (A.fontes || ['cf88-'])) if (!fs.readdirSync(path.join(RAIZ, 'curso/planos/resumos')).some(f => f.startsWith(p))) { console.error(`Fonte sem arquivo em curso/planos/resumos: ${p}`); process.exit(2); }
// O texto padrao de "Limites" fala da Constituicao: outras fontes (ou nenhuma) precisam dizer a propria.
if ((A.fontes || A.id !== 'constitucional') && !A.limiteFonte) { console.error('Defina limiteFonte no JSON (o texto padrao so vale para a Constituicao)'); process.exit(2); }
const norma = (s) => s.replace(/\s+/g, ' ').trim().normalize('NFC');
const falhas = [];
for (const l of A.licoes) for (const p of l.pontos) {
  if (!p.trecho) { if (!p.conceito) falhas.push(`${l.id} / ${p.ref}: sem "trecho" para conferir (use "conceito": true so para ponto sem texto de lei)`); continue; }
  if (!FONTE.includes(norma(p.trecho))) falhas.push(`${l.id} / ${p.ref}: trecho NAO encontrado na fonte conferida: "${p.trecho}"`);
}
if (falhas.length) { console.error('TRECHOS NAO CONFEREM COM A FONTE:\n- ' + falhas.join('\n- ')); process.exit(2); }

// nivel precisa estar em 0..3 (senao o PDF pago sairia com "undefined")
for (const x of [...A.ranking, ...A.licoes]) if (![0, 1, 2, 3].includes(x.nivel)) { console.error(`nivel invalido (${x.nivel}) em: ${x.rotulo || x.titulo}`); process.exit(2); }

// ---------- questoes ----------
function indiceCorreta(q) { return typeof q.correta === 'number' ? q.correta : LETRAS.indexOf(String(q.correta).toUpperCase()); }
function htmlQuestao(q, num, comGabarito) {
  const ic = indiceCorreta(q);
  const alts = q.alternativas.map((a, i) => `<li${comGabarito && i === ic ? ' class="certa"' : ''}><b>${LETRAS[i]})</b> ${esc(a)}</li>`).join('');
  const gab = comGabarito ? `<div class="grava"><b>✅ Resposta para gravar:</b> (${LETRAS[ic]}) ${esc(q.alternativas[ic])}</div><div class="peg">${esc(q.explicacao || '')}</div>` : '';
  return `<li class="q" value="${num}"><div class="enun">${esc(q.enunciado).replace(/\n/g, '<br>')}</div><ol class="alts" type="A">${alts}</ol>${gab}</li>`;
}
const usados = new Set();
const treinoPorLicao = {};
for (const l of A.licoes) {
  const doGrupo = BANCO.filter(q => q.materia === A.id && q.grupo === l.grupoBanco).sort((a, b) => a.id - b.id);
  if (!doGrupo.length) { console.error(`Grupo sem questoes no banco: ${l.grupoBanco}`); process.exit(3); }
  const n = l.qtdQuestoes || (l.nivel === 1 ? 6 : 8);
  // Varias licoes podem dividir o mesmo grupo do banco: cada uma recebe questoes que as outras nao usaram.
  treinoPorLicao[l.id] = doGrupo.filter(q => !usados.has(q.id)).slice(0, n);
  if (treinoPorLicao[l.id].length < n) { console.error(`Banco sem questoes suficientes para a licao ${l.id} (pedi ${n}, achei ${treinoPorLicao[l.id].length})`); process.exit(3); }
  treinoPorLicao[l.id].forEach(q => usados.add(q.id));
}
// Uma lista por GRUPO do banco (licoes que dividem o grupo nao podem repetir questao no simulado).
const gruposDistintos = [...new Set(A.licoes.map(l => l.grupoBanco))];
const sobras = gruposDistintos.map(g => BANCO.filter(q => q.materia === A.id && q.grupo === g && !usados.has(q.id)).sort((a, b) => a.id - b.id));
const simulado = [];
for (let i = 0; simulado.length < 20 && sobras.some(s => s.length); i++) { const s = sobras[i % sobras.length]; if (s.length) simulado.push(s.shift()); }
if (simulado.length < 12) { console.error(`Simulado ficou com ${simulado.length} questoes (minimo 12): redistribua as questoes entre as licoes`); process.exit(3); }

// ---------- html ----------
const ROT = { 3: 'Alta incidência', 2: 'Média', 1: 'Baixa', 0: 'Não apareceu na amostra' };
const htmlTabela = (t) => t ? `<div class="tw"><table><caption>${esc(t.titulo)}</caption><thead><tr>${t.cab.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${t.linhas.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>` : '';
const htmlMapa = (m) => `<figure class="mapa"><div class="centro">${esc(m.centro)}</div><div class="ramos">${m.ramos.map((r, i) => `<div class="ramo c${(i % 5) + 1}"><div class="rt">${esc(r.t)}</div><ul>${r.f.map(f => `<li>${esc(f)}</li>`).join('')}</ul></div>`).join('')}</div><figcaption>Mapa mental: ${esc(m.centro)}</figcaption></figure>`;
const ranking = `<div class="tw"><table><caption>Ranking dos assuntos</caption><thead><tr><th>Assunto</th><th>Incidência</th></tr></thead><tbody>${[...A.ranking].sort((a, b) => b.nivel - a.nivel).map(r => `<tr><td>${esc(r.rotulo)}</td><td class="n"><span class="bar n${r.nivel}" style="width:${r.nivel * 34 + 8}px"></span>${r.nivel === 3 ? '<b class="alta">Alta incidência</b>' : esc(ROT[r.nivel])}</td></tr>`).join('')}</tbody></table></div>`;

const licoes = A.licoes.map((l, k) => `<section id="l-${l.id}"><h2>Lição ${k + 1}: ${esc(l.titulo)}</h2>
<p><span class="nivel n${l.nivel}">${l.nivel === 3 ? 'Alta incidência' : l.nivel === 0 ? ROT[0] : 'Incidência ' + ROT[l.nivel].toLowerCase()}</span></p>
<div class="box">${esc(l.intro)}</div>
<h3>📖 ${esc(A.rotuloPontos || 'O que a lei diz (e o que isso significa)')}</h3>
${l.pontos.map(p => `<div class="ponto"><div class="ref">${esc(p.ref)}</div>${p.trecho ? `<blockquote class="trecho">“${esc(p.trecho)}”</blockquote>` : ''}<p>${esc(p.texto)}</p></div>`).join('')}
<h3>📊 Quadro para decorar</h3>${htmlTabela(l.tabela)}
<div class="box dica"><b>🔑 Macete.</b> ${esc(l.macete)}</div>
<h3>🚩 Pegadinhas desta lição</h3><ul class="peglista">${l.pegadinhas.map(p => `<li>${esc(p)}</li>`).join('')}</ul>
<h3>🎯 Como a banca cobra</h3><ul class="cobra">${l.cobra.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
<h3>🧠 Mapa mental</h3>${htmlMapa(l.mapa)}
<h3>✍️ Questões comentadas</h3><p class="sub">Marque antes de olhar. Grave a frase verde de cada questão.</p><ol class="ql">${treinoPorLicao[l.id].map((q, i) => htmlQuestao(q, i + 1, true)).join('')}</ol></section>`).join('\n');

const sumario = A.licoes.map((l, k) => `<li><a href="#l-${l.id}">Lição ${k + 1}: ${esc(l.titulo)}</a></li>`).join('');
const simHtml = simulado.map((q, i) => htmlQuestao(q, i + 1, false)).join('');
const simGab = simulado.map((q, i) => `<tr><td class="n">${i + 1}</td><td class="n"><b>${LETRAS[indiceCorreta(q)]}</b></td><td>${esc(q.alternativas[indiceCorreta(q)])}</td><td>${esc(q.explicacao || '')}</td></tr>`).join('');

const CSS = CSS_BASE + cssPaginas(`${NUM.rotulo} · ${A.titulo}`) + `
.capa{border:3px solid var(--azul);border-radius:12px;padding:22px;margin:8px 0 22px;background:var(--azul-f)}.capa h1{border:0;font-size:32px;margin:0}.capa .sub1{margin:6px 0 0}
.nivel{display:inline-block;font-weight:700;border-radius:10px;padding:2px 12px;font-size:13px;background:var(--cinza,#eceff1);color:var(--mut)}.nivel.n3{background:var(--lar-f);color:var(--lar);border:1px solid var(--lar-b)}.nivel.n2{background:var(--azul-f);color:var(--azul)}
.ponto{margin:12px 0;break-inside:avoid}.ponto .ref{font-weight:700;color:var(--roxo)}.trecho{margin:4px 0;padding:6px 12px;border-left:4px solid var(--azul);background:var(--soft);font-style:italic}.ponto p{margin:4px 0 0}
.peglista li{color:var(--verm);margin:4px 0}
`;
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(TITULO_NUM)} - ${esc(nomeCurso)}</title><style>${CSS}</style></head><body>
<header class="capa"><h1>${esc(NUM.rotulo)} — ${esc(A.titulo)}</h1><p class="sub1">${esc(A.subtitulo)}</p></header>
<main>
<div class="box"><b>Como usar esta apostila.</b><ul>${A.comoUsar.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
<div class="leg"><b>Cores:</b> <span class="cz">azul = conceito</span><span class="cv">verde = resposta para gravar</span><span class="cl">laranja = alta incidência</span><span class="cr">vermelho = pegadinha</span><span class="cx">roxo = artigo ou número</span></div>
<nav class="sum" aria-label="Sumário"><b>Sumário</b><ol>${sumario}<li><a href="#simulado">Simulado</a></li><li><a href="#revisao">Revisão de véspera</a></li><li><a href="#limites">Limites desta análise</a></li></ol></nav>
<section id="ranking"><h2>O que mais apareceu em ${esc(A.titulo)} na análise da banca</h2>${ranking}</section>
${licoes}
<section id="simulado"><h2>Simulado de ${esc(A.titulo)}</h2><p class="sub">${simulado.length} questões. Faça sem consultar e confira o gabarito logo abaixo.</p><ol class="ql">${simHtml}</ol>
<h3>Gabarito comentado</h3><div class="tw"><table><thead><tr><th>Nº</th><th>Resposta</th><th>Resposta para gravar</th><th>Por quê</th></tr></thead><tbody>${simGab}</tbody></table></div></section>
<section id="revisao"><h2>Revisão de véspera</h2><p class="sub">Uma olhada rápida em cada mapa e nos números. Se um ramo não vier à cabeça, volte à lição.</p>${A.licoes.map(l => `<h3>${esc(l.titulo)}</h3>${htmlMapa(l.mapa)}<div class="box dica"><b>🔑</b> ${esc(l.macete)}</div>`).join('')}</section>
<section id="limites"><h2>Limites desta análise</h2><ul><li>O ranking vem da nossa análise de questões da banca. É uma amostra, não uma previsão: ele não diz o que vai cair na sua prova.</li><li>"Alta incidência" quer dizer que o assunto apareceu mais vezes do que os outros nessa amostra.</li><li>${esc(A.limiteFonte || 'Os trechos entre aspas foram conferidos, palavra por palavra, no texto da Constituição. A Constituição muda por emenda: confira a versão vigente antes da prova.')}</li><li>As questões são de treino, criadas para esta plataforma, e não reproduzem provas.</li><li>${esc(SEM_VINCULO)}</li></ul></section>
</main><footer>${esc(nomeCurso)} · material de uso pessoal do assinante Premium. Proibida a redistribuição.</footer></body></html>`;

const saida = path.join(RAIZ, 'rascunho', 'apostila');
fs.mkdirSync(saida, { recursive: true });
const arqHtml = path.join(saida, `${A.id}.html`);
fs.writeFileSync(arqHtml, html);
const hashHtml = crypto.createHash('sha256').update(html).digest('hex');
console.log('HTML:', arqHtml, `(${Math.round(html.length / 1024)} KB, ${A.licoes.length} lições, ${simulado.length} no simulado)`);

if (process.argv.includes('--pdf')) {
  const nav = [process.env.NAVEGADOR_PDF, ...NAVEGADORES].filter(Boolean).find(p => fs.existsSync(p));
  if (!nav) { console.error('Edge/Chrome nao encontrado (defina NAVEGADOR_PDF com o caminho do executavel)'); process.exit(1); }
  fs.mkdirSync(path.join(RAIZ, 'material-premium'), { recursive: true });
  const pdf = path.join(RAIZ, 'material-premium', A.arquivoPdf);
  const r = spawnSync(nav, ['--headless', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${pdf}`, 'file:///' + arqHtml.replace(/\\/g, '/')], { stdio: 'inherit' });
  if (r.status !== 0 || !fs.existsSync(pdf)) { console.error('Falha ao gerar PDF'); process.exit(1); }
  fs.writeFileSync(path.join(RAIZ, 'curso', 'apostila', `${A.id}.pdf-origem.sha256`), hashHtml + String.fromCharCode(10));
  console.log('PDF:', pdf, `(${Math.round(fs.statSync(pdf).size / 1024)} KB)`);
}
