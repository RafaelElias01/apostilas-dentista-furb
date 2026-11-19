'use strict';
/* Site estático de estudo. Só exibe o que está em dados/*.json. */

const LETRAS = ['A', 'B', 'C', 'D', 'E'];
const SECOES = {
  LP: 'Língua Portuguesa',
  CGL: 'Conhecimentos Gerais e Legislação',
  CE: 'Conhecimentos Específicos',
  RL: 'Raciocínio Lógico',
  MAT: 'Matemática',
};
const CHAVE = 'dentista-furb-v1';

/* ---------- armazenamento (funciona sem localStorage) ---------- */
let memoria = null;
// outra aba gravou: descarta o cache para reler do localStorage (evita uma aba apagar o progresso da outra)
window.addEventListener('storage', (e) => { if (e.key === null || e.key === CHAVE) memoria = null; });
function estado() {
  if (memoria) return memoria;
  let o = null;
  try {
    const bruto = window.localStorage.getItem(CHAVE);
    if (bruto) o = JSON.parse(bruto);
  } catch (e) { o = null; }
  if (!o || typeof o !== 'object') o = {};
  // saneia o que veio do localStorage (pode estar corrompido): descarta entradas fora do formato
  const limpa = (obj, vale) => {
    const r = {};
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) for (const [k, v] of Object.entries(obj)) if (k !== '__proto__' && vale(v)) r[k] = v;
    return r;
  };
  o.resp = limpa(o.resp, (v) => v && typeof v === 'object' && typeof v.ok === 'boolean'); // id -> {l: letra, ok: bool}
  o.erros = limpa(o.erros, (v) => v === true); // id -> true
  o.sims = Array.isArray(o.sims) ? o.sims.filter((x) => x && typeof x === 'object' && Number.isFinite(x.certas) && Number.isFinite(x.validas) && Number.isFinite(x.n) && Number.isFinite(x.min) && typeof x.d === 'string') : [];
  memoria = o;
  return o;
}
let storageOk = true;
function salvar() {
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(estado()));
  } catch (e) { storageOk = false; }
}

/* ---------- utilidades ---------- */
function h(tag, attrs, ...filhos) {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, v);
    }
  }
  for (const f of filhos.flat()) {
    if (f == null || f === false) continue;
    el.append(f.nodeType ? f : document.createTextNode(String(f)));
  }
  return el;
}
const embaralhar = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const temGabarito = (q) => LETRAS.includes(q.g);
const temTopico = (c) => typeof c === 'string' && Object.hasOwn(D.topicos, c);
const rotuloTopico = (c) => (temTopico(c) && D.topicos[c] ? D.topicos[c] : c);
const nomeSecao = (s) => SECOES[s] || s;
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

function selectCom(rotulo, id, opcoes, valor) {
  const s = h('select', { id }, opcoes.map(([v, t]) => h('option', { value: v }, t)));
  s.value = valor;
  return h('label', { for: id }, rotulo, s);
}

/* ---------- dados ---------- */
let carregado = false;
const D = { q: [], provas: [], topicos: {}, topicosLista: [], aviso: '', radar: null, apostilas: [], apostilasErro: '', porId: new Map() };
const provaPorId = (id) => D.provas.find((p) => p.id === id);
// revalidar=true: arquivos editados à mão (concurso.json, apostilas.json) são revalidados a cada carga
// para não mostrar versão antiga; os grandes e gerados (questoes.json, radar.json) usam o cache normal.
async function json(url, revalidar = false) {
  const r = await fetch(url, revalidar ? { cache: 'no-cache' } : undefined);
  if (!r.ok) { const e = new Error(`${url}: ${r.status}`); e.status = r.status; throw e; }
  return r.json();
}
// fallback se o questoes.json não trouxer topicosLista: deriva das questões
// ATENÇÃO: a mesma lógica existe no gerador (scripts/gerar-dados-site.mjs, "topicosLista"); mantenha as duas cópias iguais.
const topicoValido = (t) => typeof t === 'string' && t !== '' && !t.includes('?');
function derivarTopicos(questoes, rotulos) {
  const cont = new Map();
  for (const q of questoes) if (topicoValido(q.top)) cont.set(q.top, (cont.get(q.top) || 0) + 1);
  return [...cont.entries()].map(([c, n]) => ({ c, r: Object.hasOwn(rotulos, c) && rotulos[c] ? rotulos[c] : c, n }))
    .sort((a, b) => (a.c < b.c ? -1 : a.c > b.c ? 1 : 0));
}
async function carregar() {
  D.apostilasErro = '';
  const [qs, radar, apos] = await Promise.all([
    json('dados/questoes.json'),
    json('dados/radar.json'),
    // arquivo manual: só a ausência (404) é normal; JSON quebrado vira aviso na aba Apostilas
    json('dados/apostilas.json', true).catch((e) => { if (e.status === 404) return []; D.apostilasErro = e.message; return []; }),
  ]);
  D.q = qs.questoes;
  D.provas = qs.provas;
  D.topicos = qs.topicos || {};
  D.topicosLista = Array.isArray(qs.topicosLista) ? qs.topicosLista : derivarTopicos(qs.questoes, D.topicos);
  D.aviso = qs.aviso || '';
  D.radar = radar;
  if (!Array.isArray(apos) && !D.apostilasErro) D.apostilasErro = 'dados/apostilas.json: formato inesperado (esperava uma lista)';
  D.apostilas = Array.isArray(apos) ? apos : [];
  D.porId = new Map(D.q.map((q) => [q.id, q]));
}

/* ---------- cartão de questão ---------- */
/* opts: {marcada, revelar, onEscolher, numero} */
function cartaoQuestao(q, opts) {
  const prova = provaPorId(q.prova) || {};
  const anulada = q.g === 'ANULADA';
  const semGab = q.g == null;
  const revelar = opts.revelar;
  const tags = [
    h('span', { class: 'tag' }, `${prova.municipio || q.prova} ${q.ano}`),
    prova.edital ? h('span', { class: 'tag' }, prova.edital) : null,
    prova.cargo ? h('span', { class: 'tag' }, prova.cargo) : null,
    h('span', { class: 'tag' }, nomeSecao(q.sec)),
    topicoValido(q.top) ? h('span', { class: 'tag' }, rotuloTopico(q.top)) : null,
    q.alvo ? h('span', { class: 'tag ok' }, 'cargo-alvo') : null,
    anulada ? h('span', { class: 'tag anulada' }, 'anulada') : null,
    semGab ? h('span', { class: 'tag anulada' }, 'sem gabarito') : null,
  ];
  const lista = h('ul', { class: 'alts' });
  q.alt.forEach((texto, i) => {
    const letra = LETRAS[i];
    let cls = 'alt';
    if (opts.marcada === letra) cls += ' sel';
    if (revelar && temGabarito(q)) {
      if (letra === q.g) cls += ' certa';
      else if (opts.marcada === letra) cls += ' errada';
    }
    const btn = h(
      'button',
      {
        type: 'button',
        class: cls,
        'aria-pressed': opts.marcada === letra ? 'true' : 'false',
        disabled: opts.travar || null,
        onclick: () => opts.onEscolher && opts.onEscolher(letra),
      },
      h('span', { class: 'letra' }, letra + ')'),
      h('span', null, texto, revelar && temGabarito(q) && letra === q.g ? ' (gabarito oficial)' : ''),
    );
    lista.append(h('li', null, btn));
  });

  const caixa = h('article', { class: 'card' },
    h('p', { class: 'suave' }, opts.numero || ''),
    h('div', null, tags),
    q.tb ? h('details', { open: true }, h('summary', null, 'Texto-base'), h('div', { class: 'textobase' }, q.tb)) : null,
    h('p', { class: 'enunciado' }, q.en),
    lista,
  );
  if (revelar) caixa.append(rodapeResultado(q, opts.marcada));
  return caixa;
}
function rodapeResultado(q, marcada) {
  const out = h('div', { 'aria-live': 'polite' });
  if (q.g === 'ANULADA') {
    out.append(h('p', { class: 'res anulada' }, 'Questão anulada pela banca: não conta na nota.'));
  } else if (q.g == null) {
    out.append(h('p', { class: 'res anulada' }, 'Sem gabarito nos dados: não conta na nota.'));
  } else if (marcada == null) {
    out.append(h('p', { class: 'res anulada' }, `Sem resposta. Gabarito oficial: ${q.g}.`));
  } else if (marcada === q.g) {
    out.append(h('p', { class: 'res ok' }, `Correto. Gabarito oficial: ${q.g}.`));
  } else {
    out.append(h('p', { class: 'res erro' }, `Errado (você marcou ${marcada}). Gabarito oficial: ${q.g}.`));
  }
  if (q.alt2) {
    out.append(h('p', { class: 'suave' }, `Gabarito alterado após o preliminar${q.gp ? ` (preliminar: ${q.gp})` : ''}; vale o oficial.`));
  }
  if (q.f) out.append(h('p', { class: 'suave' }, `Fonte: ${q.f}.`));
  return out;
}

/* registra resposta no progresso e no caderno de erros */
function registrar(q, letra) {
  if (!temGabarito(q)) return null;
  const st = estado();
  const ok = letra === q.g;
  st.resp[q.id] = { l: letra, ok };
  if (ok) delete st.erros[q.id];
  else st.erros[q.id] = true;
  salvar();
  return ok;
}

/* ---------- filtros comuns ---------- */
function opcoesFiltro() {
  const secoes = [...new Set(D.q.map((q) => q.sec))];
  const anos = [...new Set(D.q.map((q) => q.ano))].sort();
  const topicos = D.topicosLista.filter((t) => t.n > 0); // {c: código, r: rótulo, n: questões}
  return { secoes, anos, topicos };
}
function aplicarFiltros(f) {
  let lista = D.q.filter((q) => {
    if (f.sec && q.sec !== f.sec) return false;
    if (f.ano && String(q.ano) !== f.ano) return false;
    if (f.prova && q.prova !== f.prova) return false;
    if (f.topico && q.top !== f.topico) return false;
    if (f.alvo && !q.alvo) return false;
    if (f.mun) {
      const p = provaPorId(q.prova);
      if (!p || p.municipio !== f.mun) return false;
    }
    return true;
  });
  if (f.dedup) {
    // mesma questão (grupo) no mesmo edital/ano: fica uma só, preferindo a que tem gabarito válido
    const chave = (q) => `${(provaPorId(q.prova) || {}).edital}|${q.ano}|${q.gr}`;
    const escolhida = new Map();
    for (const q of lista) {
      if (!q.gr) continue;
      const k = chave(q);
      const atual = escolhida.get(k);
      if (!atual || (!temGabarito(atual) && temGabarito(q))) escolhida.set(k, q);
    }
    lista = lista.filter((q) => !q.gr || escolhida.get(chave(q)) === q);
  }
  return lista;
}
function blocoFiltros(f, aoMudar, extras) {
  const { secoes, anos, topicos } = opcoesFiltro();
  const muns = [...new Set(D.provas.map((p) => p.municipio))];
  const ctl = [
    selectCom('Disciplina / seção', 'f-sec', [['', 'Todas'], ...secoes.map((s) => [s, nomeSecao(s)])], f.sec),
    selectCom('Tópico', 'f-topico', [['', 'Todos'], ...topicos.map((t) => [t.c, `${t.r} (${t.n} no banco)`])], f.topico),
    selectCom('Ano', 'f-ano', [['', 'Todos'], ...anos.map((a) => [String(a), String(a)])], f.ano),
    selectCom('Município', 'f-mun', [['', 'Todos'], ...muns.map((m) => [m, m])], f.mun),
    selectCom('Prova', 'f-prova', [['', 'Todas'], ...D.provas.map((p) => [p.id, `${p.municipio} ${p.ano} · ${p.cargo}`])], f.prova),
  ];
  const mapa = { 'f-sec': 'sec', 'f-topico': 'topico', 'f-ano': 'ano', 'f-mun': 'mun', 'f-prova': 'prova' };
  for (const l of ctl) {
    const s = l.querySelector('select');
    // valor do filtro que não existe nas opções (select ficou em branco): limpa o filtro
    if (s.value !== (f[mapa[s.id]] || '')) f[mapa[s.id]] = s.value;
    s.addEventListener('change', () => { f[mapa[s.id]] = s.value; aoMudar(); });
  }
  const chk = (id, rotulo, chave) => {
    const i = h('input', { type: 'checkbox', id, checked: f[chave] || null });
    i.addEventListener('change', () => { f[chave] = i.checked; aoMudar(); });
    return h('label', { class: 'check', for: id }, i, rotulo);
  };
  return h('form', { class: 'filtros', onsubmit: (e) => e.preventDefault() },
    ctl,
    chk('f-alvo', 'Só do cargo-alvo (Cirurgião-Dentista clínico/especialidades de Blumenau)', 'alvo'),
    chk('f-dedup', 'Ocultar questões repetidas (mesma questão em várias provas do mesmo edital)', 'dedup'),
    extras,
  );
}

const avisoDados = () => (D.aviso ? h('p', { class: 'aviso', role: 'note' }, D.aviso) : null);

/* ---------- TREINO ---------- */
const treino = { f: { sec: '', topico: '', ano: '', mun: '', prova: '', alvo: false, dedup: true, mostrar: '' }, i: 0, vistas: {} };

function viewTreino(raiz, param) {
  treino.vistas = {}; // ao entrar na tela, nenhuma questão fica travada
  let msgTopico = null;
  if (param) {
    if (D.topicosLista.some((t) => t.c === param && t.n > 0)) {
      treino.f = { sec: '', topico: param, ano: '', mun: '', prova: '', alvo: false, dedup: true, mostrar: '' };
      treino.i = 0;
    } else {
      msgTopico = `Não há questões para o tópico "${rotuloTopico(param)}" nos dados. Mostrando os filtros anteriores.`;
    }
  }
  const f = treino.f;
  const cabeca = h('div');
  const area = h('div');
  const extras = selectCom('Mostrar', 'f-mostrar', [['', 'Todas'], ['nova', 'Ainda não respondidas'], ['erro', 'Só as que errei']], f.mostrar);
  extras.querySelector('select').addEventListener('change', (e) => { f.mostrar = e.target.value; treino.i = 0; refazer(); desenhar(); });

  function lista() {
    let l = aplicarFiltros(f);
    const st = estado();
    if (f.mostrar === 'nova') l = l.filter((q) => !st.resp[q.id]);
    if (f.mostrar === 'erro') l = l.filter((q) => st.erros[q.id]);
    return l;
  }
  // lista congelada na sessão: só refaz ao entrar na tela ou mudar filtros, para a questão
  // recém-respondida não sumir antes de mostrar o gabarito
  let ids = [];
  function refazer() { ids = lista().map((q) => q.id); treino.vistas = {}; resumo(); }
  function desenhar() {
    const l = ids.map((id) => D.porId.get(id)).filter(Boolean);
    if (treino.i >= l.length) treino.i = Math.max(0, l.length - 1);
    area.replaceChildren();
    if (!l.length) {
      area.append(h('p', { class: 'card' }, 'Nenhuma questão com estes filtros.'));
      return;
    }
    const q = l[treino.i];
    const antes = estado().resp[q.id];
    const vista = Object.prototype.hasOwnProperty.call(treino.vistas, q.id);
    const marcada = vista ? treino.vistas[q.id] : null;
    const cartao = cartaoQuestao(q, {
      numero: `Questão ${treino.i + 1} de ${l.length}`,
      marcada,
      revelar: vista,
      travar: vista, // depois de respondida/gabarito visto, não registra de novo
      onEscolher: (letra) => {
        if (Object.prototype.hasOwnProperty.call(treino.vistas, q.id)) return;
        treino.vistas[q.id] = letra;
        registrar(q, letra);
        resumo();
        desenhar();
      },
    });
    if (antes && !vista) cartao.insertBefore(h('p', { class: 'suave' }, `Você já respondeu esta questão (${antes.ok ? 'acertou' : 'errou'}). Pode responder de novo.`), cartao.children[1]);
    area.append(cartao);
    const nav = h('div', { class: 'linha' },
      h('button', { type: 'button', class: 'sec', disabled: treino.i === 0 || null, onclick: () => { treino.i--; desenhar(); window.scrollTo(0, 0); } }, 'Anterior'),
      h('button', { type: 'button', class: 'sec', disabled: treino.i >= l.length - 1 || null, onclick: () => { treino.i++; desenhar(); window.scrollTo(0, 0); } }, 'Próxima'),
      !vista ? h('button', { type: 'button', class: 'sec', onclick: () => { treino.vistas[q.id] = null; desenhar(); } }, 'Ver gabarito sem responder') : null,
      vista && marcada !== q.g ? h('button', { type: 'button', class: 'sec', onclick: () => { delete treino.vistas[q.id]; desenhar(); } }, 'Tentar de novo') : null,
      h('button', { type: 'button', class: 'sec', onclick: () => { treino.i = Math.floor(Math.random() * l.length); desenhar(); window.scrollTo(0, 0); } }, 'Aleatória'),
    );
    area.append(nav);
  }
  const filtros = blocoFiltros(f, () => { treino.i = 0; refazer(); desenhar(); }, extras);
  function resumo() {
    const st = estado();
    const l = ids.map((id) => D.porId.get(id)).filter(Boolean); // lista congelada da sessão
    const resp = l.filter((q) => st.resp[q.id]);
    const certas = resp.filter((q) => st.resp[q.id].ok).length;
    cabeca.replaceChildren(h('p', { class: 'suave' },
      `${l.length} questões na lista atual (filtros e "Mostrar"). Respondidas: ${resp.length} (acertos: ${certas}, ${pct(certas, resp.length)}%). Questões anuladas ou sem gabarito não entram na conta.`));
  }
  raiz.append(h('h1', null, 'Treino de questões'), avisoDados(), msgTopico ? h('p', { class: 'aviso', role: 'alert' }, msgTopico) : null, h('div', { class: 'card' }, filtros), cabeca, area);
  refazer();
  desenhar();
}

/* ---------- SIMULADO ---------- */
const sim = { f: { sec: '', topico: '', ano: '', mun: '', prova: '', alvo: true, dedup: true }, n: 20, min: 60, timer: null };
let simAtivo = null;

function pararTimer() { if (sim.timer) { clearInterval(sim.timer); sim.timer = null; } }
const fmtTempo = (s) => {
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
};

function viewSimulado(raiz) {
  pararTimer();
  if (simAtivo && !simAtivo.fim) return desenharSimulado(raiz);
  if (simAtivo && simAtivo.fim) return resultadoSimulado(raiz);
  const f = sim.f;
  const info = h('p', { class: 'suave', 'aria-live': 'polite' });
  const inN = h('input', { type: 'number', id: 's-n', min: '1', max: '200', value: String(sim.n) });
  const inM = h('input', { type: 'number', id: 's-min', min: '1', max: '600', value: String(sim.min) });
  const poolDe = () => aplicarFiltros(f).filter(temGabarito);
  const atualiza = () => {
    const n = poolDe().length;
    const pedido = Math.min(200, Math.max(1, parseInt(inN.value, 10) || 1)); // mesmo limite aplicado em iniciar()
    info.textContent = `${n} questões com gabarito disponíveis nestes filtros (anuladas ficam de fora).` +
      (n > 0 && n < pedido ? ` Só há ${n}: o simulado terá ${n} questões e o tempo será ajustado proporcionalmente.` : '');
  };
  inN.addEventListener('input', atualiza);
  const filtros = blocoFiltros(f, atualiza, [
    h('label', { for: 's-n' }, 'Número de questões', inN),
    h('label', { for: 's-min' }, 'Tempo (minutos, você define)', inM),
  ]);
  const iniciar = () => {
    const pool = poolDe();
    sim.n = Math.min(200, Math.max(1, parseInt(inN.value, 10) || 1));
    sim.min = Math.min(600, Math.max(1, parseInt(inM.value, 10) || 1));
    if (!pool.length) { info.textContent = 'Nenhuma questão disponível com estes filtros.'; return; }
    const sel = embaralhar(pool).slice(0, sim.n);
    let dur = sim.min * 60;
    let aviso = null;
    if (sel.length < sim.n) { // pool menor que o pedido: avisa e ajusta o tempo proporcionalmente
      dur = Math.max(60, Math.round((dur * sel.length) / sim.n));
      aviso = `Você pediu ${sim.n} questões, mas só há ${sel.length} com estes filtros. O tempo foi ajustado para ${fmtTempo(dur)}.`;
    }
    simAtivo = { ids: sel.map((q) => q.id), resp: {}, ini: Date.now(), dur, fim: false, i: 0, aviso };
    render();
  };
  raiz.append(
    h('h1', null, 'Simulado cronometrado'),
    avisoDados(),
    h('p', null, 'Sorteia questões dos filtros abaixo, com tempo definido por você. A nota é calculada só sobre questões com gabarito oficial.'),
    h('div', { class: 'card' }, filtros),
    info,
    h('button', { type: 'button', onclick: iniciar }, 'Iniciar simulado'),
  );
  atualiza();
}
function restante() { return Math.max(0, simAtivo.dur - Math.floor((Date.now() - simAtivo.ini) / 1000)); }

function desenharSimulado(raiz) {
  const s = simAtivo;
  const tempo = h('span', { class: 'timer', role: 'timer' }, fmtTempo(restante()));
  const area = h('div');
  const q0 = () => D.porId.get(s.ids[s.i]);
  function pintar() {
    const q = q0();
    area.replaceChildren(
      cartaoQuestao(q, {
        numero: `Questão ${s.i + 1} de ${s.ids.length}`,
        marcada: s.resp[q.id],
        revelar: false,
        onEscolher: (l) => { s.resp[q.id] = l; pintar(); },
      }),
      h('div', { class: 'linha' },
        h('button', { type: 'button', class: 'sec', disabled: s.i === 0 || null, onclick: () => { s.i--; pintar(); } }, 'Anterior'),
        h('button', { type: 'button', class: 'sec', disabled: s.i >= s.ids.length - 1 || null, onclick: () => { s.i++; pintar(); } }, 'Próxima'),
        h('span', { class: 'suave' }, `Respondidas: ${Object.keys(s.resp).length} de ${s.ids.length}`),
      ),
    );
  }
  const terminar = (porTempo) => {
    pararTimer();
    finalizarSimulado(porTempo);
    render();
  };
  sim.timer = setInterval(() => {
    const r = restante();
    tempo.textContent = fmtTempo(r);
    if (r <= 0) terminar(true);
  }, 500);
  raiz.append(
    h('h1', null, 'Simulado em andamento'),
    s.aviso ? h('p', { class: 'aviso', role: 'note' }, s.aviso) : null,
    h('div', { class: 'linha' }, h('span', null, 'Tempo restante: '), tempo),
    area,
    h('div', { class: 'linha' },
      h('button', { type: 'button', onclick: () => { if (confirm('Encerrar o simulado e ver a nota?')) terminar(false); } }, 'Encerrar e ver nota'),
      h('button', { type: 'button', class: 'sec', onclick: () => { if (confirm('Descartar este simulado?')) { pararTimer(); simAtivo = null; render(); } } }, 'Descartar'),
    ),
  );
  pintar();
}
function finalizarSimulado(porTempo) {
  const s = simAtivo;
  const st = estado();
  let certas = 0, validas = 0, anuladas = 0, branco = 0;
  for (const id of s.ids) {
    const q = D.porId.get(id);
    if (!temGabarito(q)) { anuladas++; continue; }
    validas++;
    const l = s.resp[id];
    if (l === q.g) certas++;
    if (l) registrar(q, l);
    else branco++; // em branco (só entre as válidas): não altera o caderno
  }
  s.fim = true;
  s.res = { certas, validas, anuladas, porTempo, branco };
  st.sims.push({ d: new Date().toISOString().slice(0, 10), n: s.ids.length, certas, validas, min: Math.round(s.dur / 60) });
  st.sims = st.sims.slice(-30);
  salvar();
}
function resultadoSimulado(raiz) {
  const s = simAtivo;
  const r = s.res;
  raiz.append(
    h('h1', null, 'Resultado do simulado'),
    h('div', { class: 'card' },
      h('p', { class: 'timer' }, `${r.certas} de ${r.validas} (${pct(r.certas, r.validas)}%)`),
      h('p', null, `Questões em branco: ${r.branco}. Questões sem gabarito válido (não contadas): ${r.anuladas}.${r.porTempo ? ' O tempo acabou.' : ''}`),
      h('p', { class: 'suave' }, 'Erros foram adicionados ao Caderno de erros.'),
    ),
    h('div', { class: 'linha' },
      h('button', { type: 'button', onclick: () => { simAtivo = null; render(); } }, 'Novo simulado'),
    ),
    h('h2', null, 'Revisão'),
  );
  s.ids.forEach((id, i) => {
    const q = D.porId.get(id);
    raiz.append(cartaoQuestao(q, { numero: `Questão ${i + 1} de ${s.ids.length}`, marcada: s.resp[id], revelar: true, travar: true }));
  });
}

/* ---------- CADERNO DE ERROS ---------- */
function viewErros(raiz) {
  const st = estado();
  const ids = Object.keys(st.erros).filter((id) => D.porId.has(id));
  const resp = Object.keys(st.resp).filter((id) => D.porId.has(id));
  const certas = resp.filter((id) => st.resp[id].ok).length;
  raiz.append(
    h('h1', null, 'Caderno de erros e progresso'),
    ...(storageOk ? [] : [h('p', { class: 'aviso' }, 'Este navegador não permite salvar dados: o progresso vale só até fechar a página.')]),
    h('div', { class: 'card' },
      h('p', null, `Questões respondidas: ${resp.length}. Acertos: ${certas} (${pct(certas, resp.length)}%).`),
      h('p', null, `No caderno de erros: ${ids.length}. Uma questão sai do caderno quando você a acerta.`),
    ),
  );
  if (st.sims.length) {
    raiz.append(h('h2', null, 'Simulados feitos'), h('ul', { class: 'lista' }, st.sims.slice().reverse().map((s) =>
      h('li', null, `${s.d}: ${s.certas} de ${s.validas} (${pct(s.certas, s.validas)}%), ${s.n} sorteadas, ${s.min} min`))));
  }
  raiz.append(h('h2', null, 'Questões para rever'));
  if (!ids.length) raiz.append(h('p', null, 'Nada aqui por enquanto.'));
  for (const id of ids) {
    const q = D.porId.get(id);
    const marcada = st.resp[id] ? st.resp[id].l : null;
    const c = cartaoQuestao(q, { marcada, revelar: true, travar: true, numero: id });
    c.append(h('div', { class: 'linha' },
      h('button', { type: 'button', class: 'sec', onclick: () => { delete estado().erros[id]; salvar(); render(); } }, 'Remover do caderno')));
    raiz.append(c);
  }
  raiz.append(h('div', { class: 'linha' },
    h('button', { type: 'button', class: 'sec', onclick: () => {
      if (confirm('Apagar todo o progresso salvo neste navegador?')) {
        const s = estado(); s.resp = {}; s.erros = {}; s.sims = []; treino.vistas = {}; salvar(); render();
      }
    } }, 'Apagar progresso'),
  ));
}

/* ---------- O QUE MAIS CAI ---------- */
function viewRadar(raiz) {
  const R = D.radar;
  raiz.append(
    h('h1', null, 'O que mais cai'),
    h('div', { class: 'aviso', role: 'note' },
      h('p', null, R.aviso),
      h('p', null, h('strong', null, 'Método: '), R.metodo),
      h('p', null, `Banca: ${R.banca}. Dados gerados em ${R.geradoEm}.`),
    ),
  );
  if (R.composicaoProvaBlumenau) {
    const linhas = Object.entries(R.composicaoProvaBlumenau).map(([nome, c]) => h('tr', null,
      h('td', null, nome), h('td', null, c.LP), h('td', null, c.CGL), h('td', null, c.CE), h('td', null, c.total), h('td', null, c.valorQuestao)));
    raiz.append(
      h('h2', null, 'Composição das provas de Blumenau (nos dados)'),
      h('div', { class: 'rolavel' }, h('table', null,
        h('thead', null, h('tr', null, ['Prova', 'LP', 'CGL', 'CE', 'Total', 'Valor/questão'].map((t) => h('th', { scope: 'col' }, t)))),
        h('tbody', null, linhas))),
      h('p', { class: 'suave' }, 'LP: Língua Portuguesa. CGL: Conhecimentos Gerais e Legislação. CE: Conhecimentos Específicos.'),
    );
  }
  for (const a of R.apostilas || []) {
    const tops = a.topicos || [];
    const max = Math.max(1, ...tops.map((t) => t.questoesUnicas || 0));
    const sec = h('section', { class: 'card', 'aria-labelledby': `ra-${a.numero}` },
      h('h2', { id: `ra-${a.numero}`, style: 'margin-top:0' }, `Apostila ${String(a.numero).padStart(2, '0')} · ${a.titulo}`),
      a.questoesUnicasBlumenau != null ? h('p', { class: 'suave' }, `${a.questoesUnicasBlumenau} questões únicas de Blumenau nesta área.`) : null,
    );
    for (const t of tops.slice().sort((x, y) => (y.questoesUnicas || 0) - (x.questoesUnicas || 0))) {
      const ed = Object.entries(t.porEdicao || {}).map(([k, v]) => `${k}: ${v}`).join(' · ');
      sec.append(h('div', { class: 'barra-wrap' },
        h('div', { class: 'barra-rot' }, h('a', { href: `#treino/${encodeURIComponent(t.topico)}` }, t.rotulo || t.topico)),
        h('div', { class: 'barra', role: 'img', 'aria-label': `${t.questoesUnicas || 0} questões únicas` }, h('span', { style: `width:${pct(t.questoesUnicas || 0, max)}%` })),
        h('div', { class: 'num' }, t.questoesUnicas || 0),
        h('div', { class: 'suave barra-rot' }, `${ed}${t.anuladas ? ` · anuladas: ${t.anuladas}` : ''}`),
      ));
    }
    raiz.append(sec);
  }
}

/* ---------- APOSTILAS ---------- */
function viewApostilas(raiz) {
  const pub = new Map();
  const problemasNum = [];
  for (const a of D.apostilas) {
    const n = Number(a && a.numero);
    if (!a || !Number.isInteger(n) || n < 1) { problemasNum.push('numero inválido'); continue; }
    if (pub.has(n)) problemasNum.push(`numero ${n} duplicado`);
    else pub.set(n, a);
  }
  const erroApos = [D.apostilasErro, ...(problemasNum.length ? [`dados/apostilas.json: ${[...new Set(problemasNum)].join('; ')}`] : [])].filter(Boolean).join(' | ');
  raiz.append(
    h('h1', null, 'Apostilas'),
    h('p', null, 'Uma apostila em PDF por área, numeradas. As que ainda não estão prontas aparecem como "em preparação".'),
  );
  if (erroApos) raiz.append(h('p', { class: 'aviso', role: 'alert' }, `Problema na lista de apostilas publicadas (${erroApos}). Os links de PDF podem estar faltando.`));
  const ul = h('ul', { class: 'lista' });
  for (const a of D.radar.apostilas || []) {
    const nn = String(a.numero).padStart(2, '0');
    const p = pub.get(Number(a.numero));
    const li = h('li', null, h('strong', null, `Apostila ${nn} · ${a.titulo}`), ' ');
    if (p && p.arquivo) li.append(h('a', { class: 'btn', href: `apostilas/${encodeURIComponent(p.arquivo)}`, download: '' }, 'Baixar PDF'));
    else li.append(h('span', { class: 'tag anulada' }, 'em preparação'));
    ul.append(li);
  }
  raiz.append(h('div', { class: 'card' }, ul));
}

/* ---------- CONCURSO ---------- */
/* dados/concurso.json é mantido à mão e carregado só aqui: se faltar ou quebrar, só esta aba mostra aviso */
const txt = (v) => (typeof v === 'string' || typeof v === 'number' ? String(v) : '');
const lista_ = (v) => (Array.isArray(v) ? v : []);
const ehObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
const objs_ = (v) => lista_(v).filter(ehObj); // ignora itens nulos/não-objeto
function tabela(legenda, colunas, linhas) {
  return h('div', { class: 'rolavel', role: 'region', 'aria-label': legenda, tabindex: '0' }, h('table', null,
    h('caption', { class: 'so-leitor' }, legenda),
    h('thead', null, h('tr', null, colunas.map((t) => h('th', { scope: 'col' }, t)))),
    h('tbody', null, lista_(linhas).filter(Array.isArray).map((l) => {
      if (l.length > colunas.length) console.warn(`tabela "${legenda}": linha com ${l.length} células e só ${colunas.length} colunas; células extras ignoradas`);
      return h('tr', null, colunas.map((_, i) => h('td', null, txt(l[i]) || '—')));
    }))));
}
function desenharConcurso(raiz, C) {
  const ref = ehObj(C.referencia) ? C.referencia : {};
  const ant = ehObj(C.anteriores) ? C.anteriores : null;
  const bloco = (it) => h('div', null, h('h3', null, txt(it.titulo)), h('p', null, txt(it.texto)));
  if (txt(C.avisoTopo)) raiz.append(h('p', { class: 'aviso', role: 'note' }, txt(C.avisoTopo)));
  if (txt(C.atualizadoEm)) raiz.append(h('p', { class: 'suave' }, `Atualizado em ${txt(C.atualizadoEm)}.`));
  if (objs_(C.situacao).length) {
    raiz.append(h('h2', null, 'Situação'), h('div', { class: 'card' }, objs_(C.situacao).map(bloco)));
  }
  if (objs_(C.inscricao).length) {
    raiz.append(h('h2', null, 'Inscrição'), h('div', { class: 'card' }, objs_(C.inscricao).map((it) => h('div', null,
      h('h3', null, txt(it.titulo)), h('p', null, txt(it.texto)),
      txt(it.fonte) ? h('p', { class: 'suave' }, `Fonte: ${txt(it.fonte)}`) : null))));
  }
  if (txt(ref.titulo)) {
    const cron = ehObj(ref.cronograma) ? ref.cronograma : null, prova = ehObj(ref.prova) ? ref.prova : null, des = ehObj(ref.desempate) ? ref.desempate : null;
    raiz.append(h('h2', null, txt(ref.titulo)),
      h('div', { class: 'card' },
        objs_(ref.itens).map(bloco),
        cron ? [h('h3', null, txt(cron.titulo)), tabela(txt(cron.titulo), ['Etapa', 'Data'], cron.linhas)] : null,
        prova ? [h('h3', null, txt(prova.titulo)), h('p', null, txt(prova.texto)), tabela('Questões por disciplina', ['Disciplina', 'Questões'], prova.linhas)] : null,
        des ? bloco(des) : null,
        txt(ref.naoConfirmado) ? h('p', { class: 'aviso', role: 'note' }, txt(ref.naoConfirmado)) : null,
      ));
  }
  if (ant && lista_(ant.colunas).length) {
    raiz.append(h('h2', null, txt(ant.titulo)), tabela(txt(ant.titulo), ant.colunas.map(txt), ant.linhas),
      txt(ant.legenda) ? h('p', { class: 'suave' }, txt(ant.legenda)) : null);
  }
  if (txt(C.fonte)) raiz.append(h('p', { class: 'suave' }, txt(C.fonte)));
}
function viewConcurso(raiz) {
  raiz.append(h('h1', null, 'Concurso'));
  const area = h('div', null);
  raiz.append(area);
  const carregarConcurso = () => {
    area.replaceChildren(h('p', { role: 'status' }, 'Carregando...'));
    json('dados/concurso.json', true).then((C) => {
      if (!area.isConnected) return; // o usuário já mudou de aba
      if (!ehObj(C)) throw new Error('formato inesperado');
      area.replaceChildren();
      desenharConcurso(area, C);
    }).catch((e) => {
      console.error('concurso.json:', e);
      if (!area.isConnected) return;
      area.replaceChildren(h('p', { class: 'aviso', role: 'alert' },
        'Não foi possível carregar as informações do concurso. Confirme tudo no site oficial da FURB (concursos.furb.br).'),
      h('button', { type: 'button', onclick: carregarConcurso }, 'Tentar de novo'));
    });
  };
  carregarConcurso();
}

/* ---------- roteamento ---------- */
const VIEWS = { concurso: viewConcurso, treino: viewTreino, simulado: viewSimulado, erros: viewErros, radar: viewRadar, apostilas: viewApostilas };
function render() {
  pararTimer();
  if (!carregado) return; // dados ainda carregando: a tela mostra "Carregando..."
  const [rota, paramBruto] = (location.hash.replace(/^#/, '') || 'treino').split('/');
  let param = paramBruto;
  try { if (param != null) param = decodeURIComponent(param); } catch (e) { param = undefined; }
  const nome = Object.hasOwn(VIEWS, rota) ? rota : 'treino';
  const main = document.getElementById('conteudo');
  main.replaceChildren();
  try {
    VIEWS[nome](main, param);
  } catch (e) { // erro ao desenhar a tela: não é falha de carga, então não oferece recarregar os dados
    console.error(e);
    main.replaceChildren(h('p', { class: 'aviso', role: 'alert' }, `Erro ao exibir esta tela (${e && e.message ? e.message : e}). Tente outra aba do menu.`));
  }
  document.title = `${{ concurso: 'Concurso', treino: 'Treino', simulado: 'Simulado', erros: 'Caderno de erros', radar: 'O que mais cai', apostilas: 'Apostilas' }[nome]} · Estudo Dentista FURB`;
  document.querySelectorAll('#menu a').forEach((a) => {
    if (a.dataset.rota === nome) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}
// "Ir para o conteúdo": só dá foco, sem passar pelo roteador por hash
const pular = document.querySelector('a.pular');
if (pular) pular.addEventListener('click', (e) => { e.preventDefault(); document.getElementById('conteudo').focus(); });
let ultimaRota = null;
window.addEventListener('hashchange', () => {
  if (!carregado) return; // sem conteúdo ainda: não mexe em foco/rolagem (a rota é lida ao fim do carregamento)
  const nova = location.hash;
  if (nova === ultimaRota) return;
  ultimaRota = nova;
  render();
  document.getElementById('conteudo').focus({ preventScroll: true });
  window.scrollTo(0, 0);
});

function iniciar() {
  carregar().then(() => {
    carregado = true;
    ultimaRota = location.hash;
    render();
  }).catch((e) => {
    document.getElementById('conteudo').replaceChildren(
      h('p', { class: 'aviso' }, `Não foi possível carregar os dados (${e.message}). Abra o site por um servidor local (veja o README), não direto pelo arquivo.`),
      h('button', { type: 'button', onclick: () => { document.getElementById('conteudo').replaceChildren(h('p', null, 'Carregando...')); iniciar(); } }, 'Tentar de novo'),
    );
  });
}
iniciar();
