// CSS base e utilitarios das apostilas (compartilhado por gerar-apostila-materia.mjs e gerar-amostra-apostila.mjs).
// Projeto Apostilas Dentista FURB: sem curso/index.js nem curso.json; identidade fixa nas constantes abaixo.
const COR = '#0b57d0';
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

// ---------- identidade do projeto e leitura com erro claro ----------
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import crypto from 'node:crypto';

export const RAIZ = path.resolve(import.meta.dirname, '..');
export const NOME_CURSO = 'Apostilas Dentista FURB';
export const BANCA = 'FURB';
export const SEM_VINCULO = 'Material independente de estudo, sem vínculo com a FURB nem com as prefeituras de Blumenau ou de Balneário Camboriú. Não garante aprovação.';

// Le um arquivo do repositorio; se faltar, para com mensagem que diz o que criar.
export function lerObrigatorio(rel, dica) {
  const p = path.resolve(RAIZ, rel); // rel pode ser absoluto (outro drive, testes)
  if (!fs.existsSync(p)) { console.error(`Arquivo obrigatorio ausente: ${rel}${dica ? ' (' + dica + ')' : ''}`); process.exit(1); }
  return fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
}
export function lerJsonObrigatorio(rel, dica) {
  try { return JSON.parse(lerObrigatorio(rel, dica)); }
  catch (e) { if (e instanceof SyntaxError) { console.error(`JSON invalido em ${rel}: ${e.message}`); process.exit(1); } throw e; }
}
export const NAVEGADORES = ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'];

// ---------- navegador e PDF ----------
// O rodape "Pagina X de Y" (margin box @bottom-center + counter(pages)) so existe no Chrome/Edge >= 131.
export const VERSAO_MINIMA_RODAPE = 131;
// Se NAVEGADOR_PDF estiver definida, ela manda: caminho inexistente = sem navegador (nao cai em silencio num Edge/Chrome padrao).
export function escolherNavegador() {
  const env = process.env.NAVEGADOR_PDF;
  if (env) return fs.existsSync(env) ? env : undefined;
  return NAVEGADORES.find(p => fs.existsSync(p));
}
// Versao principal do navegador, lida do PROPRIO executavel (VersionInfo no Windows; senao "--version"). Devolve numero ou null (desconhecida).
export function versaoNavegador(nav) {
  if (process.platform === 'win32') {
    try {
      const r = spawnSync('powershell', ['-NoProfile', '-Command', `(Get-Item -LiteralPath '${nav.replace(/'/g, "''")}').VersionInfo.ProductVersion`], { encoding: 'utf8', timeout: 30000 });
      const m = /^(\d+)\./.exec((r.stdout || '').trim());
      if (m) return parseInt(m[1], 10);
    } catch { /* tenta --version */ }
  }
  try {
    const r = spawnSync(nav, ['--version'], { encoding: 'utf8', timeout: 15000 });
    const m = /(\d+)\.\d+\.\d+\.\d+/.exec(r.stdout || '');
    if (m) return parseInt(m[1], 10);
  } catch { /* desconhecida */ }
  return null;
}
// pdftotext (poppler): do PATH ou da variavel PDFTOTEXT. Nesta maquina: C:/Users/rafael-ioppi/AppData/Local/Programs/Git/mingw64/bin/pdftotext.exe (so esta no PATH do Git Bash).
export const PDFTOTEXT = process.env.PDFTOTEXT || 'pdftotext';
export function pdftotextDisponivel() { const r = spawnSync(PDFTOTEXT, ['-v'], { encoding: 'utf8' }); return !r.error; }
// Confere no TEXTO do PDF (pdftotext), pagina a pagina, que o rodape numerado saiu: cada pagina i de N traz "Pagina i de N" (tolerante a quebra de linha da
// margin box e a variacao do acento) e o prefixo do rotulo (ex.: "Apostila 01"). { verificado, ok, motivo }.
export function conferirRodape(pdf, rotulo) {
  const r = spawnSync(PDFTOTEXT, ['-enc', 'UTF-8', '-layout', pdf, '-'], { encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 });
  if (r.error || r.status !== 0) return { verificado: false, ok: false, motivo: 'pdftotext indisponivel ou falhou' };
  const paginas = r.stdout.split('\f'); if (paginas.length > 1 && !paginas[paginas.length - 1].trim()) paginas.pop();
  const N = paginas.length;
  const prefixo = String(rotulo).split(' · ')[0].replace(/\s+/g, ' ').trim();
  const faltam = [];
  paginas.forEach((p, i) => {
    const t = p.replace(/\s+/g, ' ');
    const okPag = new RegExp('P\\S{1,3}gina ' + (i + 1) + ' de ' + N + '(?!\\d)').test(t);
    if (!okPag || !t.includes(prefixo)) faltam.push(i + 1);
  });
  if (faltam.length) return { verificado: true, ok: false, motivo: `rodape "${prefixo} … Página X de ${N}" ausente em ${faltam.length} de ${N} pagina(s) (ex.: ${faltam.slice(0, 5).join(', ')})` };
  return { verificado: true, ok: true, motivo: '' };
}
// PDF plausivel: tamanho minimo e cabecalho %PDF (existsSync sozinho aceitaria um arquivo vazio ou lixo).
export function pdfValido(pdf) {
  try {
    if (fs.statSync(pdf).size < 2048) return false;
    const fd = fs.openSync(pdf, 'r'); const b = Buffer.alloc(5); fs.readSync(fd, b, 0, 5, 0); fs.closeSync(fd);
    return b.toString('latin1') === '%PDF-';
  } catch { return false; }
}
// Imprime o HTML em PDF (opts: { semRodape, semConferir, rotulo }). Apostila numerada e obrigatoria: com Chrome/Edge < 131 (ou versao desconhecida) o rodape
// "Pagina X de Y" nao e desenhado, entao FALHA (devolve null). Gera num temporario (<nome>.tmp.pdf), valida (tamanho, %PDF, rodape pagina a pagina via pdftotext) e SO
// ENTAO renomeia sobre o destino: em falha so o temporario e apagado e o PDF anterior fica. Sem pdftotext tambem FALHA, salvo semConferir (--sem-conferir-rodape).
// Com semRodape (--sem-rodape, conferencia visual) segue so com aviso. Sucesso: { comRodape, conferido }.
export function htmlParaPdf(arqHtml, pdf, { semRodape = false, semConferir = false, rotulo = null } = {}) {
  const nav = escolherNavegador();
  if (!nav) { console.error('Edge/Chrome nao encontrado: defina NAVEGADOR_PDF com o caminho do executavel (Chrome/Edge >= 131), ex.: C:/Program Files/Google/Chrome/Application/chrome.exe'); return null; }
  const ver = versaoNavegador(nav);
  const ok = ver !== null && ver >= VERSAO_MINIMA_RODAPE;
  if (!ok) {
    const motivo = ver === null ? `nao consegui descobrir a versao de ${nav}` : `${nav} e a versao ${ver} (< ${VERSAO_MINIMA_RODAPE})`;
    if (!semRodape) { console.error(`ERRO: ${motivo}. O rodape numerado "Apostila 0N · titulo · Pagina X de Y" (obrigatorio) exige Chrome/Edge >= ${VERSAO_MINIMA_RODAPE}. Defina NAVEGADOR_PDF com Chrome >= 131, ex.: C:/Program Files/Google/Chrome/Application/chrome.exe. Nenhum PDF foi gravado. (So para conferencia visual: --sem-rodape.)`); return null; }
    console.warn(`AVISO (--sem-rodape): ${motivo}. O PDF sai SEM rodape numerado e NAO e versao final.`);
  }
  const conferir = ok && !!rotulo && !semConferir;
  if (conferir && !pdftotextDisponivel()) { console.error('ERRO: pdftotext (poppler) nao encontrado: sem ele nao da para conferir o rodape numerado no PDF. Instale/aponte a variavel PDFTOTEXT (nesta maquina: C:/Users/rafael-ioppi/AppData/Local/Programs/Git/mingw64/bin/pdftotext.exe) ou use --sem-conferir-rodape (sem sha). Nada foi gravado.'); return null; }
  fs.mkdirSync(path.dirname(pdf), { recursive: true });
  const tmp = pdf.replace(/\.pdf$/i, '') + '.tmp.pdf';
  fs.rmSync(tmp, { force: true });
  const falha = (msg) => { console.error(msg + ' O PDF anterior (se havia) foi preservado.'); fs.rmSync(tmp, { force: true }); return null; };
  const r = spawnSync(nav, ['--headless', '--disable-gpu', '--no-pdf-header-footer', `--print-to-pdf=${tmp}`, pathToFileURL(path.resolve(arqHtml)).href], { stdio: 'inherit' });
  if (r.status !== 0 || !pdfValido(tmp)) return falha('ERRO: falha ao gerar PDF (arquivo ausente, pequeno demais ou sem cabecalho %PDF).');
  let conferido = false;
  if (conferir) {
    const c = conferirRodape(tmp, rotulo);
    if (!c.verificado) return falha('ERRO: nao consegui conferir o rodape (pdftotext falhou).');
    if (!c.ok) return falha(`ERRO: o PDF saiu SEM o rodape numerado esperado (${c.motivo}).`);
    conferido = true;
  } else if (ok && rotulo) console.warn('AVISO (--sem-conferir-rodape): rodape NAO conferido no PDF; nenhum sha sera gravado.');
  fs.renameSync(tmp, pdf); // so agora o destino e substituido
  return { comRodape: ok, conferido };
}
// Opcao "--nome valor" da linha de comando: caminho absoluto, ou undefined.
export function opcao(nome, argv = process.argv) {
  const i = argv.indexOf(nome);
  if (i < 0) return undefined;
  const v = argv[i + 1];
  if (!v || v.startsWith('--')) { console.error(`${nome} precisa de um valor`); process.exit(1); }
  return path.resolve(v);
}

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
  if (typeof nome !== 'string') throw new Error(`${origem}: "arquivoPdf" precisa ser uma string`);
  if (nome.includes('/') || nome.includes('\\') || nome.includes('..') || path.isAbsolute(nome)) throw new Error(`${origem}: "arquivoPdf" (${JSON.stringify(nome)}) deve ser um único nome de arquivo seguro, sem separadores ou ".."`);
  if (!nome.toLowerCase().endsWith('.pdf')) throw new Error(`${origem}: "arquivoPdf" (${JSON.stringify(nome)}) precisa terminar em ".pdf"`);
  if (!nome.startsWith(info.prefixo)) throw new Error(`${origem}: "arquivoPdf" (${JSON.stringify(nome)}) precisa comecar com "${info.prefixo}" (numero da apostila no nome do arquivo)`);
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

// ---------- contencao de caminhos ----------
export const DIR_APOSTILAS = path.join(RAIZ, 'curso', 'apostila');
export const DIR_LEIS = path.join(RAIZ, 'fontes', 'leis');
// Caminho "real": resolve links/junctions no ancestral EXISTENTE mais proximo e reanexa o resto (o destino pode nao existir ainda).
function real(p) {
  let atual = path.resolve(p); const resto = [];
  while (!fs.existsSync(atual)) { const pai = path.dirname(atual); if (pai === atual) break; resto.unshift(path.basename(atual)); atual = pai; }
  let base = atual; try { base = fs.realpathSync.native(atual); } catch { /* fica o lexical */ }
  return path.join(base, ...resto);
}
const chave = (p) => process.platform === 'win32' ? p.toLowerCase() : p; // Windows nao diferencia maiusculas
// Devolve o caminho absoluto se estiver DENTRO de base (ou igual a ela); senao null. Compara caminhos reais, sem diferenciar maiusculas no Windows.
export function dentroDe(p, base) {
  const rel = path.relative(chave(real(base)), chave(real(p)));
  return rel === '' || (rel.split(path.sep)[0] !== '..' && !path.isAbsolute(rel)) ? path.resolve(p) : null;
}
// Pasta de --saida: qualquer uma, menos site/, fontes/, curso/, .git, material-premium/ e public/ (material-premium so e destino POR PADRAO, nunca via --saida;
// assim teste/modelo/--sem-rodape nao sobrescrevem um PDF final nem arquivo publicado).
export function saidaSegura(dir) {
  for (const proibida of ['site', 'fontes', 'curso', '.git', 'material-premium', 'public']) if (dentroDe(dir, path.join(RAIZ, proibida))) { console.error(`--saida: nao grave dentro de ${proibida}/ (${dir})`); process.exit(1); }
  return dir;
}
// Hash das entradas: JSON da apostila + radar + banco de questoes + HTML das fontes de lei usadas + os proprios scripts geradores.
// O gerador grava no HTML e a amostra confere, para nao recortar um HTML defasado.
export function hashEntradas(arqJson, arqQuestoes, fontes = []) {
  const h = crypto.createHash('sha256');
  const arqs = [arqJson, path.join(RAIZ, 'curso', 'radar-banca.json'), arqQuestoes || path.join(RAIZ, 'curso', 'questoes-anteriores.json'),
    ...[...fontes].sort().map(f => path.join(DIR_LEIS, f)),
    path.join(RAIZ, 'scripts', 'gerar-apostila-materia.mjs'),
    path.join(RAIZ, 'scripts', 'apostila-css.mjs'),
    path.join(RAIZ, 'scripts', 'gerar-amostra-apostila.mjs')];
  for (const f of arqs) { h.update(f === arqJson ? 'json' : path.basename(f)).update('|'); h.update(fs.existsSync(f) ? fs.readFileSync(f) : 'AUSENTE').update('|'); }
  return h.digest('hex');
}
// Secao "Limites desta analise". Usada pela apostila inteira e pela amostra (so com os numeros da licao): cada frase so sai se for verdadeira.
// d = { limiteFonte, trechos: { n, refOk, refSem, semMarcador, arquivos[] }, conceitos, radar, questoes: { n, teste, bancoAviso, excl|null }, amostra }
export function secaoLimites(d, esc) {
  const t = d.trechos;
  const li = [];
  if (d.rankingFurb !== false) {
    li.push('O ranking vem da análise das provas anteriores da banca (FURB). É uma amostra pequena, não uma previsão: ele não diz o que vai cair na sua prova.');
    li.push('"Alta incidência" quer dizer que o assunto apareceu mais vezes do que os outros nessa amostra.');
  } else {
    li.push('Esta apostila complementar não usa contagens do radar da FURB. A ordem dos tópicos vem do programa do concurso e da estrutura deste material.');
  }
  if (d.amostra) li.push('Este é um RECORTE (uma lição) da apostila: os números abaixo valem só para a lição incluída.');
  if (d.limiteFonte) li.push(esc(d.limiteFonte));
  if (t.n) li.push(`${t.n} trecho(s) entre aspas conferido(s) contra ${t.arquivos.map(esc).join('; ')}: cada um é um dispositivo completo, literal, do texto em fontes/leis (nada resumido). Referência de artigo verificada em ${t.refOk}${t.refArtSo ? '; artigo conferido, mas dispositivo (caput/§/inciso) NÃO conferido em ' + t.refArtSo : ''}${t.refSem ? '; NÃO verificada em ' + t.refSem + ' (a referência não cita artigo)' : ''}. A lei pode mudar: confira a versão vigente antes da prova.`);
  if (t.semMarcador) li.push(`${t.semMarcador} trecho(s) aparecem sem o marcador de numeração do original (Art./§/inciso): o texto confere, mas a numeração do dispositivo vem da referência indicada e NÃO foi conferida.`);
  if (d.conceitos) li.push(`${d.conceitos} ponto(s) são explicações do autor, sem trecho de lei verificado.`);
  if (d.radar) li.push('As contagens do radar vêm de curso/radar-banca.json; as das questões listadas vêm do banco filtrado (só o cargo-alvo, sem anuladas nem divergentes) e podem diferir.');
  const q = d.questoes;
  if (q.n) li.push(q.teste ? '<b>BANCO DE TESTE:</b> as questões desta versão vêm de um banco alternativo de teste e NÃO são das provas oficiais.'
    : (q.excl ? `${q.n} questão(ões) marcadas FURB vêm de curso/questoes-anteriores.json, com o gabarito oficial. Ficaram de fora, entre os tópicos usados: ${q.excl.anuladas} anulada(s), ${q.excl.semGabarito} sem gabarito válido, ${q.excl.divergentes} com gabarito divergente entre as cópias, ${q.excl.figura || 0} dependente(s) de figura e ${q.excl.transcricao || 0} com transcrição suspeita.`
      : `${q.n} questão(ões) marcadas FURB vêm de curso/questoes-anteriores.json, com o gabarito oficial; anuladas, sem gabarito válido e divergentes ficam de fora.`) + (q.bancoAviso ? ' ' + esc(q.bancoAviso) : ''));
  li.push(esc(SEM_VINCULO));
  return `<section id="limites"><h2>Limites desta análise</h2><ul>${li.map(x => '<li>' + x + '</li>').join('')}</ul></section>`;
}
