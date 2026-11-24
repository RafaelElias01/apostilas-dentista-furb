#!/usr/bin/env node
// Registro de aprendizados (melhoria recursiva das regras).
// Projeto: Apostilas Dentista FURB. Especificacao: curso/auditoria/melhoria-recursiva-relatorio.md (secoes 1 a 6).
//
// O registro e um arquivo JSONL de eventos so de acrescimo (aprendizados.jsonl), guardado em APRENDIZADOS_DIR
// (padrao: a pasta de memoria privada do projeto), NUNCA dentro de curso/ (o repositorio e publico).
// Este codigo nunca edita CLAUDE.md e nao configura hooks.
//
// Uso: node scripts/aprendizados.mjs <comando> [opcoes]   (sem comando: uso resumido, codigo 2)
// Codigos de saida: 0 ok; 1 verificacao falhou; 2 uso errado/validacao; 3 erro de leitura/gravacao.

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

// ---------------------------------------------------------------------------
// Constantes
// ---------------------------------------------------------------------------

export const VERSAO = 1;
export const ARQ_REGISTRO = 'aprendizados.jsonl';
export const ARQ_CONSOLIDADO = 'regras-aprendidas.md';
const ARQ_LOCK = 'aprendizados.lock';

export const CATEGORIAS = ['metodo', 'bug', 'ambiente', 'fonte', 'processo', 'papeis', 'conteudo', 'publicacao'];
const ORDEM_CATEGORIAS = ['processo', 'papeis', 'publicacao', 'conteudo', 'metodo', 'fonte', 'bug', 'ambiente'];
export const ESCOPOS = ['projeto', 'global'];
export const SEVERIDADES = ['alta', 'media', 'baixa'];
export const ORIGENS = ['ordem-dono', 'correcao-dono', 'erro-proprio', 'bug', 'metodo-melhor', 'ambiente-mudou'];
const TIPOS_EVIDENCIA = ['arquivo', 'comando', 'commit', 'url', 'citacao-dono'];
const TIPOS_VERIF = ['comando', 'ausente', 'presente', 'rede'];
const EVENTOS = ['criar', 'mostrar', 'aceitar', 'rejeitar', 'aplicar', 'verificar', 'reincidir', 'revogar', 'superar'];
const CAMPOS_DADOS = [
  'titulo', 'chave', 'categoria', 'escopo', 'severidade', 'origem', 'gatilho', 'evidencia', 'aprendi', 'regra',
  'mudanca', 'alvos', 'verificacoes', 'substitui', 'forcar',
];
const CATEGORIAS_APROVACAO = ['processo', 'papeis', 'conteudo', 'publicacao'];
const ORIGENS_DONO = ['ordem-dono', 'correcao-dono'];
const FINAIS = ['rejeitado', 'revogado', 'superado'];
const ATIVOS = ['aplicado', 'verificado'];
const NAO_FINAIS = ['proposto', 'mostrado', 'aceito', 'aplicado', 'verificado'];
const LIMITE_REGRAS = 60;
const LIMITE_BYTES_CONSOLIDADO = 10 * 1024;
const LIMITE_LINHAS_MEMORY = 150;
const LIMITE_BYTES_MEMORY = 12 * 1024;
const LIMIAR_SIMILARIDADE = 0.6;
const PALAVRAS_VAZIAS = new Set(
  'a o as os de da do das dos e em no na nos nas um uma para por com que se ao aos'.split(' '),
);

export class ErroApp extends Error {
  constructor(codigo, mensagem) {
    super(mensagem);
    this.name = 'ErroApp';
    this.codigo = codigo;
  }
}

// ---------------------------------------------------------------------------
// Utilitarios puros
// ---------------------------------------------------------------------------

export function norm(s) {
  return String(s ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tokens(s) {
  return norm(s).split(' ').filter((p) => p && !PALAVRAS_VAZIAS.has(p));
}

/** Jaccard dos conjuntos de palavras normalizadas, sem palavras vazias ("nao", "nunca", "sempre", "so" contam). */
export function similaridade(a, b) {
  const A = new Set(tokens(a));
  const B = new Set(tokens(b));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const p of A) if (B.has(p)) inter++;
  return inter / (A.size + B.size - inter);
}

/** Devolve a descricao do primeiro padrao de segredo/dado pessoal achado no texto, ou null. */
export function acharSegredo(texto) {
  let t = String(texto ?? '');
  t = t.replace(/\b[0-9a-fA-F]{64}\b/g, ' ').replace(/\b[0-9a-fA-F]{40}\b/g, ' ');
  if (/[\w.+-]+@[\w-]+\.[\w.-]+/.test(t)) return 'e-mail';
  for (const m of t.matchAll(/(?<![\d.])(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})(?![\d.]*\d)/g)) {
    const partes = [m[1], m[2], m[3], m[4]].map(Number);
    if (partes.some((n) => n > 255)) continue;
    const ip = partes.join('.');
    if (ip === '127.0.0.1' || ip === '0.0.0.0') continue;
    return 'endereço IPv4';
  }
  // Telefone: exige forma de telefone (DDD entre parenteses, +55, separadores ou palavra tel/fone/cel/whatsapp);
  // numero puro de 10/11 digitos (epoch, numero de processo) nao conta.
  if (
    /(?<![\w+])\+55[\s.-]?\(?\d{2}\)?[\s.-]?9?\d{4}[\s.-]?\d{4}(?!\d)/.test(t)
    || /(?<!\w)\(\d{2}\)\s?9?\d{4}[\s.-]?\d{4}(?!\d)/.test(t)
    || /(?<!\d)\d{2}[\s.-]9?\d{4}[\s.-]\d{4}(?!\d)/.test(t)
    || /(?:tel|fone|cel|whats\s?app|zap)\w*[\s:.]*\+?\(?\d[\d()\s.-]{6,}\d/i.test(t)
  ) return 'telefone';
  if (/(senha|password|token|secret|segredo|api[_-]?key|bearer)\s*[:=]\s*\S+/i.test(t)) return 'credencial (nome=valor)';
  // Referencias de arquivo (mem:/repo:/home: + caminho, ou token terminado em extensao conhecida) nao sao chaves.
  const semRefs = t
    .replace(/\b(?:mem|repo|home):[\w./\\-]*\.(?:md|mjs|jsonl|json|txt|html|htm|pdf|tsv|js)\b/g, ' ')
    .replace(/[^\s"'()]*\.(?:md|mjs|jsonl|json|txt|html|htm|pdf|tsv|js)(?![\w])/g, ' ');
  if (/[A-Za-z0-9+=_]{32,}/.test(semRefs)) return 'sequência longa (possível chave)';
  return null;
}

/** Percorre strings de um valor e devolve {campo, tipo} do primeiro segredo achado, ou null. */
export function acharSegredoEm(valor, campo = '') {
  if (typeof valor === 'string') {
    const tipo = acharSegredo(valor);
    return tipo ? { campo: campo || '(texto)', tipo } : null;
  }
  if (Array.isArray(valor)) {
    for (let i = 0; i < valor.length; i++) {
      const r = acharSegredoEm(valor[i], `${campo}[${i}]`);
      if (r) return r;
    }
    return null;
  }
  if (valor && typeof valor === 'object') {
    for (const [k, v] of Object.entries(valor)) {
      const r = acharSegredoEm(v, campo ? `${campo}.${k}` : k);
      if (r) return r;
    }
  }
  return null;
}

function iso(agora) {
  const d = agora instanceof Date ? agora : agora ? new Date(agora) : new Date();
  if (Number.isNaN(d.getTime())) throw new ErroApp(2, `data inválida: ${agora}`);
  return d.toISOString();
}

let _fmtData = null;
export function dataLocal(isoStr) {
  if (!isoStr) return '-';
  try {
    _fmtData ??= new Intl.DateTimeFormat('en-CA', {
      timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit',
    });
    return _fmtData.format(new Date(isoStr));
  } catch {
    return String(isoStr).slice(0, 10);
  }
}

function esperar(ms) {
  Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function semBom(t) {
  return t.charCodeAt(0) === 0xfeff ? t.slice(1) : t;
}

function cortar(s, n) {
  s = String(s);
  return s.length <= n ? s : s.slice(0, Math.max(0, n - 1)).trimEnd() + '…';
}

// ---------------------------------------------------------------------------
// Validacao dos dados de um aprendizado (1.2)
// ---------------------------------------------------------------------------

function refValida(ref) {
  if (typeof ref !== 'string') return false;
  const m = /^(mem|repo|home):(.+)$/.exec(ref);
  if (!m) return false;
  const resto = m[2];
  if (path.isAbsolute(resto) || /^[A-Za-z]:/.test(resto)) return false;
  return !resto.split(/[\\/]/).includes('..');
}

export function comandoPermitido(argv) {
  if (!Array.isArray(argv) || argv.length < 2 || argv.some((a) => typeof a !== 'string' || !a)) return false;
  if (argv[0] !== 'node') return false;
  let i = 1;
  while (i < argv.length && argv[i].startsWith('-')) {
    if (!['--test', '--no-warnings'].includes(argv[i])) return false;
    i++;
  }
  if (i >= argv.length) return false;
  const alvo = argv[i];
  const resto = argv.slice(i + 1);
  if (/^tests\/[^/\\]+\.test\.mjs$/.test(alvo)) return resto.length === 0;
  if (i !== 1) return false; // flags so valem com tests/*.test.mjs
  if (alvo === 'scripts/leis-compilar-e-conferir.mjs') {
    if (resto.length === 1 && resto[0] === 'conferir') return true;
    return resto.length === 2 && resto[0] === 'buscar' && !resto[1].startsWith('-');
  }
  if (alvo === 'scripts/aprendizados.mjs') return resto.length === 1 && resto[0] === 'validar';
  return false;
}

export const LISTA_BRANCA_TXT = 'só "node [--test|--no-warnings] tests/<nome>.test.mjs", "node scripts/leis-compilar-e-conferir.mjs conferir" ou "... buscar <termo>", e "node scripts/aprendizados.mjs validar"';

function validarVerificacao(v, i) {
  const p = [];
  const nome = `verificacoes[${i}]`;
  if (!v || typeof v !== 'object' || Array.isArray(v)) return [`${nome} deve ser objeto`];
  if (!TIPOS_VERIF.includes(v.tipo)) return [`${nome}.tipo inválido (use ${TIPOS_VERIF.join(', ')})`];
  if (v.tipo === 'comando') {
    if (!comandoPermitido(v.argv)) {
      p.push(`${nome}.argv fora da lista branca (${LISTA_BRANCA_TXT})`);
    }
    if (v.requer !== undefined && (!Array.isArray(v.requer) || !v.requer.every(refValida))) {
      p.push(`${nome}.requer deve ser lista de caminhos mem:/repo:/home:`);
    }
  } else if (v.tipo === 'ausente' || v.tipo === 'presente') {
    if (!refValida(v.arquivo)) p.push(`${nome}.arquivo deve começar com mem:, repo: ou home: (sem "..")`);
    if (typeof v.regex !== 'string' || !v.regex) p.push(`${nome}.regex obrigatório`);
    else {
      try { new RegExp(v.regex); } catch (e) { p.push(`${nome}.regex inválido: ${e.message}`); }
    }
    if (v.i !== undefined && typeof v.i !== 'boolean') p.push(`${nome}.i deve ser booleano`);
  } else if (v.tipo === 'rede') {
    if (typeof v.url !== 'string' || !/^https?:\/\/\S+$/.test(v.url)) p.push(`${nome}.url deve ser http(s)`);
    if (typeof v.espera !== 'string' || !/^(2xx|\d{3})$/.test(v.espera)) p.push(`${nome}.espera deve ser "2xx" ou um código de 3 dígitos`);
  }
  return p;
}

/** Normaliza (trim) os dados de um aprendizado, sem inventar campos. */
export function normalizarDados(d) {
  const o = {};
  for (const [k, v] of Object.entries(d ?? {})) {
    if (typeof v === 'string') o[k] = v.trim();
    else if (Array.isArray(v)) {
      o[k] = v.map((x) => {
        if (typeof x === 'string') return x.trim();
        if (x && typeof x === 'object' && !Array.isArray(x)) {
          const y = {};
          for (const [kk, vv] of Object.entries(x)) y[kk] = typeof vv === 'string' ? vv.trim() : vv;
          return y;
        }
        return x;
      });
    } else o[k] = v;
  }
  return o;
}

/** Lista de problemas de conteudo dos dados de um aprendizado (vazia = valido). */
export function validarDados(d) {
  const p = [];
  if (!d || typeof d !== 'object' || Array.isArray(d)) return ['dados devem ser um objeto'];
  for (const k of Object.keys(d)) if (!CAMPOS_DADOS.includes(k)) p.push(`campo desconhecido: ${k}`);
  const texto = (campo, min, max, umaLinha) => {
    const v = d[campo];
    if (typeof v !== 'string' || !v.trim()) { p.push(`campo obrigatório ausente: ${campo}`); return; }
    if (v.length < min || v.length > max) p.push(`campo ${campo} deve ter de ${min} a ${max} caracteres (tem ${v.length})`);
    if (umaLinha && /[\r\n]/.test(v)) p.push(`campo ${campo} não pode ter quebra de linha`);
  };
  texto('titulo', 5, 80, true);
  if (typeof d.chave !== 'string' || !d.chave) p.push('campo obrigatório ausente: chave');
  else {
    if (/[\r\n]/.test(d.chave)) p.push('campo chave não pode ter quebra de linha');
    if (!/^[a-z0-9]+(\.[a-z0-9-]+)+$/.test(d.chave)) p.push(`chave mal formada: "${d.chave}" (use pontos, ex.: ambiente.rede.proxy)`);
  }
  const enumerado = (campo, lista) => {
    if (d[campo] === undefined || d[campo] === '') p.push(`campo obrigatório ausente: ${campo}`);
    else if (!lista.includes(d[campo])) p.push(`${campo} inválido: "${d[campo]}" (use ${lista.join(', ')})`);
  };
  enumerado('categoria', CATEGORIAS);
  enumerado('escopo', ESCOPOS);
  enumerado('severidade', SEVERIDADES);
  enumerado('origem', ORIGENS);
  texto('gatilho', 1, 300, true);
  texto('aprendi', 1, 300, true);
  texto('regra', 1, 240, true);
  texto('mudanca', 1, 300, true);
  if (!Array.isArray(d.evidencia) || d.evidencia.length < 1) p.push('campo obrigatório ausente: evidencia (1 ou mais itens)');
  else {
    d.evidencia.forEach((e, i) => {
      if (!e || typeof e !== 'object' || Array.isArray(e)) { p.push(`evidencia[${i}] deve ser objeto {tipo, ref}`); return; }
      if (!TIPOS_EVIDENCIA.includes(e.tipo)) p.push(`evidencia[${i}].tipo inválido (use ${TIPOS_EVIDENCIA.join(', ')})`);
      if (typeof e.ref !== 'string' || !e.ref || e.ref.length > 300) p.push(`evidencia[${i}].ref obrigatório, até 300 caracteres`);
      if (e.data !== undefined && typeof e.data !== 'string') p.push(`evidencia[${i}].data deve ser texto`);
    });
  }
  if (d.alvos !== undefined) {
    if (!Array.isArray(d.alvos) || !d.alvos.every(refValida)) p.push('alvos deve ser lista de caminhos mem:/repo:/home: (sem "..")');
  }
  if (d.verificacoes !== undefined) {
    if (!Array.isArray(d.verificacoes)) p.push('verificacoes deve ser lista');
    else d.verificacoes.forEach((v, i) => p.push(...validarVerificacao(v, i)));
  }
  if (d.substitui !== undefined) {
    if (!Array.isArray(d.substitui) || !d.substitui.every((x) => /^A\d{3,}$/.test(x))) p.push('substitui deve ser lista de ids (A001...)');
  }
  if (d.forcar !== undefined && typeof d.forcar !== 'boolean') p.push('forcar deve ser booleano');
  return p;
}

/** Aprovacao exigida do dono (1.2). `todos` = lista de itens ou mapa id->item (para resolver `substitui`). */
export function exigeAprovacao(item, todos) {
  if (CATEGORIAS_APROVACAO.includes(item.categoria)) return true;
  if (item.escopo === 'global') return true;
  const mapa = Array.isArray(todos) ? Object.fromEntries(todos.map((t) => [t.id, t])) : todos ?? {};
  for (const id of item.substitui ?? []) {
    const alvo = mapa[id];
    if (alvo && ORIGENS_DONO.includes(alvo.origem)) return true;
  }
  return item.severidade === 'alta' && item.categoria !== 'bug';
}

// ---------------------------------------------------------------------------
// Leitura do registro, dobra de eventos e validacao (1.3, 1.4, 6.4)
// ---------------------------------------------------------------------------

export function caminhoRegistro(dir) {
  if (!dir || !fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) {
    throw new ErroApp(3, `pasta de memória não encontrada: ${dir} (defina APRENDIZADOS_DIR)`);
  }
  return path.join(dir, ARQ_REGISTRO);
}

/** Le o JSONL. Arquivo inexistente/vazio = []. Erros de leitura: codigo 3 com numero da linha. */
export function lerEventos(arq) {
  let texto;
  try {
    texto = fs.readFileSync(arq, 'utf8');
  } catch (e) {
    if (e.code === 'ENOENT') return [];
    throw new ErroApp(3, `não foi possível ler ${path.basename(arq)}: ${e.message}`);
  }
  texto = semBom(texto);
  const eventos = [];
  const linhas = texto.split(/\r?\n/);
  linhas.forEach((bruta, i) => {
    if (!bruta.trim()) return;
    const n = i + 1;
    let ev;
    try {
      ev = JSON.parse(bruta);
    } catch {
      throw new ErroApp(3, `${path.basename(arq)}: linha ${n} não é JSON válido`);
    }
    if (!ev || typeof ev !== 'object' || Array.isArray(ev)) throw new ErroApp(3, `${path.basename(arq)}: linha ${n} não é um evento (objeto)`);
    if (ev.v !== VERSAO) throw new ErroApp(3, `${path.basename(arq)}: linha ${n} com versão de formato desconhecida (v=${JSON.stringify(ev.v)})`);
    if (typeof ev.ev !== 'string' || typeof ev.id !== 'string') throw new ErroApp(3, `${path.basename(arq)}: linha ${n} sem "ev" ou "id"`);
    Object.defineProperty(ev, '_linha', { value: n, enumerable: false });
    eventos.push(ev);
  });
  return eventos;
}

/**
 * Dobra os eventos em ordem e devolve { itens, porId }.
 * Com `problemas` (array) acumula os erros e continua; sem ele, lanca ErroApp(2) no primeiro.
 */
export function dobrar(eventos, problemas = null) {
  const itens = [];
  const porId = {};
  eventos.forEach((e, idx) => {
    const L = e._linha ?? idx + 1;
    const falha = (msg) => {
      const m = `${msg} (linha ${L})`;
      if (problemas) problemas.push(m);
      else throw new ErroApp(2, m);
    };
    if (!EVENTOS.includes(e.ev)) { falha(`evento desconhecido: ${e.ev}`); return; }
    if (e.ev === 'criar') {
      if (porId[e.id]) { falha(`id repetido em criar: ${e.id}`); return; }
      if (!e.dados || typeof e.dados !== 'object') { falha(`criar ${e.id} sem dados`); return; }
      const item = {
        id: e.id, ...e.dados, estado: 'proposto', criadoEm: e.em, mostradoAoDono: false, aceito: false,
        semAprovacao: false, falhaVerificacao: false, reincidencias: 0, ultimaVerificacao: null,
        aplicadoEm: null, eventos: [e],
      };
      item.exigeAprovacao = exigeAprovacao(item, porId);
      itens.push(item);
      porId[e.id] = item;
      return;
    }
    const item = porId[e.id];
    if (!item) { falha(`evento ${e.ev} para id inexistente: ${e.id}`); return; }
    const inval = (hint = '') => falha(`transição inválida: ${item.estado} -> ${e.ev} em ${item.id}${hint}`);
    const st = item.estado;
    item.eventos.push(e);
    switch (e.ev) {
      case 'mostrar':
        if (FINAIS.includes(st)) break;
        item.mostradoAoDono = true;
        if (st === 'proposto') item.estado = 'mostrado';
        break;
      case 'aceitar':
        if (['proposto', 'mostrado'].includes(st)) {
          item.estado = 'aceito';
        } else if (ATIVOS.includes(st) && item.semAprovacao) {
          item.semAprovacao = false;
        } else { inval(); break; }
        item.aceito = true;
        item.mostradoAoDono = true;
        item.aceitoEm = e.em;
        item.citacao = e.citacao;
        break;
      case 'rejeitar':
        if (!NAO_FINAIS.includes(st)) { inval(); break; }
        item.estado = 'rejeitado';
        item.motivoRejeicao = e.motivo;
        break;
      case 'aplicar':
        if (st === 'aceito' || (['proposto', 'mostrado'].includes(st) && !item.exigeAprovacao)) {
          item.estado = 'aplicado';
          item.semAprovacao = !item.aceito;
          item.aplicadoEm = e.em;
          item.notaAplicacao = e.nota;
        } else inval(item.exigeAprovacao && !item.aceito ? ' (exige "aprovado" do dono: use aceitar antes)' : '');
        break;
      case 'verificar':
        if (!ATIVOS.includes(st)) { inval(); break; }
        item.ultimaVerificacao = e.em;
        if (e.ok === true) { item.estado = 'verificado'; item.falhaVerificacao = false; }
        else { item.estado = 'aplicado'; item.falhaVerificacao = true; }
        break;
      case 'reincidir':
        if (!['aplicado', 'verificado', 'aceito'].includes(st)) { inval(); break; }
        item.reincidencias++;
        break;
      case 'revogar':
        if (FINAIS.includes(st)) { inval(); break; }
        item.estado = 'revogado';
        item.motivoRevogacao = e.motivo;
        item.revogadoPor = e.por_id;
        item.revogadoEm = e.em;
        break;
      case 'superar':
        if (FINAIS.includes(st)) { inval(); break; }
        item.estado = 'superado';
        item.superadoPor = e.por_id;
        item.superadoEm = e.em;
        break;
      default:
        break;
    }
  });
  return { itens, porId };
}

function campoTexto(e, campo) {
  return typeof e[campo] === 'string' && e[campo].trim() !== '';
}

/** Valida o registro inteiro (sem rodar nada externo). Devolve lista de problemas (vazia = valido). */
export function validarRegistro(eventos) {
  const problemas = [];
  const vistos = new Map();
  eventos.forEach((e, idx) => {
    const L = e._linha ?? idx + 1;
    const add = (m) => problemas.push(`linha ${L}: ${m}`);
    if (e.v !== VERSAO) add(`versão de formato desconhecida (v=${JSON.stringify(e.v)})`);
    if (!EVENTOS.includes(e.ev)) { add(`evento desconhecido: ${e.ev}`); return; }
    if (!/^A\d{3,}$/.test(e.id ?? '')) add(`id fora do formato A000: ${e.id}`);
    if (typeof e.em !== 'string' || Number.isNaN(new Date(e.em).getTime())) add('campo "em" ausente ou data inválida');
    if (!['agente', 'dono'].includes(e.por)) add('campo "por" deve ser agente ou dono');
    if (e.ev === 'criar') {
      if (vistos.has(e.id)) add(`id repetido em criar: ${e.id}`);
      for (const pr of validarDados(e.dados)) add(`${e.id}: ${pr}`);
      for (const id of e.dados?.substitui ?? []) if (!vistos.has(id)) add(`${e.id}: substitui id inexistente (ou posterior): ${id}`);
      vistos.set(e.id, e.dados ?? {});
    } else {
      if (!vistos.has(e.id)) add(`evento ${e.ev} para id inexistente: ${e.id}`);
      if (e.por_id !== undefined && !vistos.has(e.por_id)) add(`${e.ev} ${e.id}: por_id inexistente: ${e.por_id}`);
      const origem = vistos.get(e.id)?.origem;
      if (e.ev === 'aceitar') {
        if (!campoTexto(e, 'citacao')) add(`aceitar ${e.id}: falta citacao do dono`);
        if (e.por !== 'dono') add(`aceitar ${e.id}: "por" deve ser dono`);
      }
      if (e.ev === 'rejeitar' && !campoTexto(e, 'motivo')) add(`rejeitar ${e.id}: falta motivo`);
      if (e.ev === 'revogar' && !campoTexto(e, 'motivo')) add(`revogar ${e.id}: falta motivo`);
      if (e.ev === 'verificar' && typeof e.ok !== 'boolean') add(`verificar ${e.id}: campo ok deve ser booleano`);
      if (e.ev === 'reincidir' && !campoTexto(e, 'evidencia')) add(`reincidir ${e.id}: falta evidencia`);
      if (['rejeitar', 'revogar', 'superar'].includes(e.ev) && ORIGENS_DONO.includes(origem)) {
        if (e.por !== 'dono' || !campoTexto(e, 'citacao')) add(`${e.ev} ${e.id}: origem ${origem} exige por=dono e citacao`);
      }
    }
    const { v, ev, id, em, por, ...resto } = e;
    const seg = acharSegredoEm(resto);
    if (seg) add(`possível segredo ou dado pessoal no campo ${seg.campo} (${seg.tipo})`);
  });
  const estado = dobrar(eventos, problemas);
  const porChave = new Map();
  for (const it of estado.itens) {
    if (!NAO_FINAIS.includes(it.estado) || !it.chave) continue;
    if (porChave.has(it.chave)) problemas.push(`chave ${it.chave} repetida entre ${porChave.get(it.chave)} e ${it.id}`);
    else porChave.set(it.chave, it.id);
  }
  // Mesma falha achada por validarRegistro e por dobrar (formatos "linha N: x" e "x (linha N)"): contar uma vez.
  const unicos = new Set();
  return problemas.filter((m) => {
    const chave = m.replace(/^linha \d+: /, '').replace(/ \(linha \d+\)$/, '');
    if (unicos.has(chave)) return false;
    unicos.add(chave);
    return true;
  });
}

// ---------------------------------------------------------------------------
// Escrita segura (6.3)
// ---------------------------------------------------------------------------

export function comBloqueio(dir, fn, { esperaMs = 5000, abandonoMs = 30000 } = {}) {
  caminhoRegistro(dir);
  const lock = path.join(dir, ARQ_LOCK);
  const inicio = Date.now();
  const token = `${process.pid}-${Math.random().toString(16).slice(2)}-${Date.now()}`;
  let fd = null;
  for (;;) {
    try {
      fd = fs.openSync(lock, 'wx');
      break;
    } catch (e) {
      if (e.code !== 'EEXIST' && e.code !== 'EPERM' && e.code !== 'EACCES') {
        throw new ErroApp(3, `não foi possível criar o bloqueio ${ARQ_LOCK}: ${e.message}`);
      }
      try {
        const idade = Date.now() - fs.statSync(lock).mtimeMs;
        if (idade > abandonoMs) {
          // Quebra atomica: renomeia para um nome unico (so um processo consegue); depois apaga o renomeado.
          const velho = `${lock}.velho.${token}`;
          fs.renameSync(lock, velho);
          let restaurar = false;
          try { restaurar = Date.now() - fs.statSync(velho).mtimeMs <= abandonoMs; } catch { /* ignora */ }
          if (restaurar) {
            // Peguei, por azar, um bloqueio novo de outro processo: devolve (melhor esforco).
            try { fs.renameSync(velho, lock); } catch { fs.rmSync(velho, { force: true }); }
          } else {
            fs.rmSync(velho, { force: true });
          }
          continue;
        }
      } catch { /* sumiu ou outro quebrou antes (ENOENT): tentar o wx de novo */ }
      if (Date.now() - inicio >= esperaMs) {
        throw new ErroApp(3, `registro em uso por outro processo (${ARQ_LOCK}); tente de novo`);
      }
      esperar(50);
    }
  }
  try {
    fs.writeSync(fd, `${token}\n`);
    return fn();
  } finally {
    try { fs.closeSync(fd); } catch { /* ignora */ }
    // So remove o bloqueio se ele ainda for o meu (um processo lento pode ter perdido o bloqueio por abandono).
    try {
      if (fs.readFileSync(lock, 'utf8').trim() === token) fs.rmSync(lock, { force: true });
    } catch { /* ignora */ }
  }
}

function checarFimDeLinha(arq) {
  if (!fs.existsSync(arq)) return;
  const texto = fs.readFileSync(arq, 'utf8');
  if (texto.length && !texto.endsWith('\n')) {
    const n = texto.split(/\r?\n/).length;
    throw new ErroApp(3, `última linha incompleta em ${ARQ_REGISTRO} (linha ${n}); conferir à mão`);
  }
}

/** Le, valida e anexa dentro do bloqueio. fn(estado, eventos) devolve { eventos: [...], ...resto }. */
export function transacao(dir, fn, opcoesBloqueio = {}) {
  const arq = caminhoRegistro(dir);
  return comBloqueio(dir, () => {
    const eventos = lerEventos(arq);
    const problemas = [];
    const estado = dobrar(eventos, problemas);
    if (problemas.length) throw new ErroApp(3, `registro inconsistente (rode "validar"): ${problemas[0]}`);
    const r = fn(estado, eventos) ?? {};
    const novos = r.eventos ?? [];
    if (novos.length) {
      checarFimDeLinha(arq);
      for (const n of novos) {
        const { v, ev, id, em, por, ...resto } = n;
        const seg = acharSegredoEm(resto);
        if (seg) throw new ErroApp(2, `possível segredo ou dado pessoal no campo ${seg.campo}: reescreva sem o valor`);
      }
      dobrar([...eventos, ...novos]);
      fs.appendFileSync(arq, novos.map((n) => JSON.stringify(n)).join('\n') + '\n', 'utf8');
    }
    return r;
  }, opcoesBloqueio);
}

export function escreverAtomico(arq, texto) {
  const tmp = `${arq}.${process.pid}.${Math.random().toString(16).slice(2)}.tmp`;
  try {
    fs.writeFileSync(tmp, texto, 'utf8');
    let ultimo = null;
    for (let i = 0; i < 5; i++) {
      try {
        fs.renameSync(tmp, arq);
        return;
      } catch (e) {
        ultimo = e;
        if (e.code !== 'EPERM' && e.code !== 'EBUSY') break;
        esperar(100);
      }
    }
    throw new ErroApp(3, `não foi possível gravar ${path.basename(arq)}: ${ultimo?.message}`);
  } finally {
    try { fs.rmSync(tmp, { force: true }); } catch { /* ignora */ }
  }
}

function ev(tipo, id, em, por, extra = {}) {
  return { v: VERSAO, ev: tipo, id, em, por, ...extra };
}

function proximoId(eventos) {
  let max = 0;
  for (const e of eventos) {
    if (e.ev === 'criar') {
      const m = /^A(\d+)$/.exec(e.id);
      if (m) max = Math.max(max, Number(m[1]));
    }
  }
  return `A${String(max + 1).padStart(3, '0')}`;
}

// ---------------------------------------------------------------------------
// Criar (1.5, 1.6)
// ---------------------------------------------------------------------------

/**
 * Cria um aprendizado. `opts`: { por, citacao } (para substituir regra de origem dono), { esperaMs }.
 * Devolve { id, exige, avisos, eventos }.
 */
export function criar(dir, dados, agora, opts = {}) {
  const em = iso(agora);
  const d = normalizarDados(dados);
  const probs = validarDados(d);
  if (probs.length) throw new ErroApp(2, probs.join('\n       '));
  const seg = acharSegredoEm(d);
  if (seg) throw new ErroApp(2, `possível segredo ou dado pessoal no campo ${seg.campo}: reescreva sem o valor`);
  const dia = dataLocal(em);
  d.evidencia = d.evidencia.map((e) => ({ tipo: e.tipo, ref: e.ref, data: e.data || dia }));
  const subst = d.substitui ?? [];
  if (new Set(subst).size !== subst.length) throw new ErroApp(2, 'substitui repete ids');
  return transacao(dir, (estado, eventos) => {
    const avisos = [];
    for (const sid of subst) {
      const alvo = estado.porId[sid];
      if (!alvo) throw new ErroApp(2, `substitui: id inexistente: ${sid}`);
      if (!NAO_FINAIS.includes(alvo.estado)) throw new ErroApp(2, `substitui: ${sid} já está ${alvo.estado}`);
      if (ORIGENS_DONO.includes(alvo.origem) && (opts.por !== 'dono' || !String(opts.citacao ?? '').trim())) {
        throw new ErroApp(2, `${sid} tem origem ${alvo.origem}: substituir exige --por dono --citacao "<texto do dono>"`);
      }
    }
    const outros = estado.itens.filter((it) => NAO_FINAIS.includes(it.estado) && !subst.includes(it.id));
    const tn = norm(d.titulo);
    for (const it of outros) {
      if (norm(it.titulo) === tn) throw new ErroApp(2, `título repetido: já existe em ${it.id} (${it.estado})`);
    }
    for (const it of outros) {
      if (it.chave === d.chave) {
        throw new ErroApp(2, `chave ${d.chave} já está em ${it.id} (${it.estado}); use --substitui ${it.id} ou outra chave`);
      }
    }
    if (!d.forcar && !subst.length) {
      for (const it of outros) {
        const s = similaridade(d.regra, it.regra);
        if (s >= LIMIAR_SIMILARIDADE) {
          throw new ErroApp(2, `regra parecida com ${it.id} (similaridade ${s.toFixed(2)}); use --forcar ou --substitui ${it.id}`);
        }
      }
    } else if (d.forcar) {
      for (const it of outros) {
        const s = similaridade(d.regra, it.regra);
        if (s >= LIMIAR_SIMILARIDADE) avisos.push(`aviso: regra parecida com ${it.id} (similaridade ${s.toFixed(2)}); criado com --forcar`);
      }
    }
    const id = proximoId(eventos);
    const exige = exigeAprovacao({ ...d }, estado.porId);
    if (!d.verificacoes?.length) avisos.push('aviso: sem verificação automática (aparece como "não verificável")');
    const novos = [ev('criar', id, em, 'agente', { dados: d })];
    for (const sid of subst) {
      const extra = { por_id: id };
      let por = 'agente';
      if (ORIGENS_DONO.includes(estado.porId[sid].origem)) { por = 'dono'; extra.citacao = String(opts.citacao).trim(); }
      novos.push(ev('superar', sid, em, por, extra));
    }
    return { id, exige, avisos, eventos: novos };
  }, { esperaMs: opts.esperaMs ?? 5000 });
}

// ---------------------------------------------------------------------------
// Apresentacao (3.2) e consolidacao (4.2, 4.3)
// ---------------------------------------------------------------------------

function rotuloItem(it) {
  if (it.exigeAprovacao) return `${it.categoria} · VALE SÓ DEPOIS DO SEU "aprovado"`;
  if (it.semAprovacao) return `${it.categoria} · adotado, aguardando só ciência`;
  if (it.estado === 'proposto' || it.estado === 'mostrado') return `${it.categoria} · proposto, ainda não aplicado; aguardando só ciência`;
  return `${it.categoria} · ${it.estado}`;
}

function linhaPendente(it) {
  const prefixo = `- ${it.id} [${rotuloItem(it)}] `;
  const sufixo = it.exigeAprovacao
    ? ` Responda "aprovo ${it.id}" ou "rejeito ${it.id} <motivo>".`
    : ` Se discordar: "rejeito ${it.id} <motivo>".`;
  const mudou = ` Mudou: ${cortar(it.mudanca, 120).replace(/[.…]?$/, (m) => m || '.')}`;
  let regra = it.regra;
  const total = () => prefixo.length + regra.length + mudou.length + sufixo.length;
  if (total() > 320) regra = cortar(regra, Math.max(20, 320 - prefixo.length - mudou.length - sufixo.length));
  let linha = prefixo + regra + mudou + sufixo;
  if (linha.length > 320) linha = cortar(prefixo + regra + cortar(mudou, 60) + sufixo, 320);
  return linha;
}

function listaAguardando(estado) {
  return estado.itens.filter((it) => it.exigeAprovacao && !it.aceito && ['proposto', 'mostrado'].includes(it.estado) && it.mostradoAoDono);
}

/** Bloco curto que o agente cola na resposta. Nao marca nada. */
export function formatarPendentes(estado) {
  const novos = estado.itens.filter((it) => NAO_FINAIS.includes(it.estado) && !it.mostradoAoDono);
  const aguard = listaAguardando(estado);
  const linhas = [];
  if (novos.length) {
    linhas.push(`Aprendizados novos (${novos.length}):`);
    for (const it of novos) linhas.push(linhaPendente(it));
  } else {
    linhas.push('Aprendizados: nenhum novo neste lote.');
  }
  if (aguard.length) linhas.push(`Aguardando sua decisão: ${aguard.map((i) => i.id).join(', ')}.`);
  return linhas.join('\n');
}

function sufixoItem(it) {
  const partes = [];
  if (it.falhaVerificacao) partes.push(`FALHANDO na verificação de ${dataLocal(it.ultimaVerificacao)}`);
  else if (it.estado === 'verificado') partes.push(`verificado ${dataLocal(it.ultimaVerificacao)}`);
  else if (it.verificacoes?.length) partes.push(`aplicado ${dataLocal(it.aplicadoEm)}, ainda não verificado`);
  else partes.push(`aplicado ${dataLocal(it.aplicadoEm)}, sem verificação automática`);
  if (it.semAprovacao) partes.push('provisório: sem aprovação');
  return partes.map((p) => `_(${p})_`).join(' ');
}

/** Texto completo de regras-aprendidas.md. */
export function gerarConsolidado(estado, agora) {
  const em = iso(agora);
  const ativos = estado.itens.filter((it) => ATIVOS.includes(it.estado));
  const linhas = [
    '---',
    'name: regras-aprendidas',
    'description: "Regras ativas aprendidas, geradas por scripts/aprendizados.mjs consolidar a partir de aprendizados.jsonl; não editar à mão"',
    'metadata:',
    '  type: feedback',
    '---',
    '',
    `# Regras aprendidas ativas (${ativos.length}) · gerado em ${dataLocal(em)}`,
    '',
  ];
  for (const cat of ORDEM_CATEGORIAS) {
    const doCat = ativos.filter((it) => it.categoria === cat).sort((a, b) => (a.chave < b.chave ? -1 : a.chave > b.chave ? 1 : a.id < b.id ? -1 : 1));
    if (!doCat.length) continue;
    linhas.push(`## ${cat}`);
    for (const it of doCat) linhas.push(`- [${it.id}] ${it.regra} ${sufixoItem(it)}`);
    linhas.push('');
  }
  const aguard = estado.itens.filter((it) => it.exigeAprovacao && !it.aceito && ['proposto', 'mostrado'].includes(it.estado));
  if (aguard.length) linhas.push(`Aguardando "aprovado" do dono (ainda NÃO valem): ${aguard.map((i) => i.id).join(', ')}.`);
  const aceitos = estado.itens.filter((it) => it.estado === 'aceito');
  if (aceitos.length) linhas.push(`Aceitas, ainda não aplicadas: ${aceitos.map((i) => i.id).join(', ')}.`);
  const corte = new Date(em).getTime() - 30 * 24 * 3600 * 1000;
  const trocadas = [];
  for (const it of estado.itens) {
    if (it.estado === 'superado' && new Date(it.superadoEm).getTime() >= corte) trocadas.push(`${it.id} -> ${it.superadoPor ?? '?'}`);
    if (it.estado === 'revogado' && new Date(it.revogadoEm).getTime() >= corte) trocadas.push(`${it.id} -> ${it.revogadoPor ?? 'revogada'}`);
  }
  if (trocadas.length) linhas.push(`Substituídas nos últimos 30 dias: ${trocadas.join(', ')}.`);
  while (linhas[linhas.length - 1] === '') linhas.pop();
  return linhas.join('\n') + '\n';
}

export function gerarLinhaIndice(ativas, aguardando) {
  return `- [Regras aprendidas](regras-aprendidas.md) — ${ativas} regras ativas, ${aguardando} aguardando aprovação; registro em aprendizados.jsonl (scripts/aprendizados.mjs)`;
}

/** Substitui no lugar a linha que contem "(regras-aprendidas.md)" ou acrescenta no fim; preserva o resto byte a byte. */
export function atualizarIndice(textoMemory, linha) {
  const texto = String(textoMemory ?? '');
  const re = /^[^\r\n]*\(regras-aprendidas\.md\)[^\r\n]*/m;
  if (re.test(texto)) return texto.replace(re, () => linha);
  if (!texto.length) return linha + '\n';
  const eol = texto.includes('\r\n') ? '\r\n' : '\n';
  if (/\r?\n$/.test(texto)) return texto + linha + eol;
  return texto + eol + linha;
}

function semDataGerado(t) {
  return t.replace(/· gerado em \S+/, '· gerado em X');
}

// ---------------------------------------------------------------------------
// Verificacoes (5.1)
// ---------------------------------------------------------------------------

export function resolverRef(ref, ctx) {
  const m = /^(mem|repo|home):(.+)$/.exec(ref);
  if (!m) throw new ErroApp(2, `caminho sem prefixo mem:/repo:/home: ${ref}`);
  const base = m[1] === 'mem' ? ctx.dir : m[1] === 'repo' ? ctx.repo : ctx.home;
  return path.join(base, m[2]);
}

function lerTexto(arq) {
  return semBom(fs.readFileSync(arq, 'utf8'));
}

/** Recusa (erro 2) se `destino` nao estiver ignorado pelo git (ou se git/repositorio nao estiverem disponiveis). */
export function garantirIgnorado(repo, destino) {
  const recusa = () => new ErroApp(2, 'memoria/ não está no .gitignore: não copio o registro (confira o .gitignore e se git está disponível e a pasta é um repositório)');
  try {
    // Testa um arquivo dentro da pasta: vale mesmo se a pasta ainda nao existe.
    execFileSync('git', ['check-ignore', '-q', path.join(destino, ARQ_REGISTRO)], { cwd: repo, stdio: 'pipe', timeout: 15000 });
  } catch {
    throw recusa();
  }
}

/** Mensagem curta (max. 200) sem nada que o filtro de segredo acusaria; nunca faz a gravacao falhar. */
export function higienizarMsg(msg) {
  let s = String(msg ?? '').replace(/[\r\n]+/g, ' ');
  if (acharSegredo(s)) {
    s = s.split(/(\s+)/).map((tok) => (tok.trim() && acharSegredo(tok) ? '[omitido]' : tok)).join('');
  }
  if (acharSegredo(s)) s = '[omitido]';
  s = cortar(s, 200);
  return acharSegredo(s) ? '[omitido]' : s;
}

/** Roda as verificacoes de um item. Devolve { ok, rodou, detalhes }; nao grava nada. */
export function verificarItem(item, ctx, { rede = false } = {}) {
  const detalhes = [];
  (item.verificacoes ?? []).forEach((v, i) => {
    const d = { i, tipo: v.tipo };
    try {
      if (v.tipo === 'comando') {
        const falta = (v.requer ?? []).find((r) => !fs.existsSync(resolverRef(r, ctx)));
        if (falta) Object.assign(d, { ok: null, pulada: true, msg: `pulada: falta ${falta}` });
        else if (!comandoPermitido(v.argv)) Object.assign(d, { ok: false, msg: 'comando fora da lista branca' });
        else {
          try {
            execFileSync(process.execPath, v.argv.slice(1), { cwd: ctx.repo, timeout: 180000, stdio: 'pipe', maxBuffer: 32 * 1024 * 1024 });
            Object.assign(d, { ok: true, msg: v.argv.join(' ') });
          } catch (e) {
            if (e.code === 'ENOBUFS') {
              Object.assign(d, { ok: false, msg: `${v.argv.join(' ')}: saída maior que o limite (32 MB)` });
            } else {
              const cauda = String(e.stderr || e.stdout || e.message || '').trim().split(/\r?\n/).slice(-2).join(' | ');
              Object.assign(d, { ok: false, msg: `${v.argv.join(' ')} saiu com código ${e.status ?? 'desconhecido'}: ${cortar(cauda, 200)}` });
            }
          }
        }
      } else if (v.tipo === 'ausente' || v.tipo === 'presente') {
        const arq = resolverRef(v.arquivo, ctx);
        const re = new RegExp(v.regex, v.i ? 'mi' : 'm');
        if (!fs.existsSync(arq)) {
          // Caminho errado ou arquivo apagado nao pode virar "verificado" (nem em `ausente`).
          Object.assign(d, { ok: false, msg: `arquivo não existe: ${v.arquivo}` });
        } else {
          const casa = re.test(lerTexto(arq));
          const ok = v.tipo === 'ausente' ? !casa : casa;
          Object.assign(d, { ok, msg: `${v.arquivo} /${v.regex}/ ${casa ? (v.tipo === 'ausente' ? 'ainda aparece' : 'aparece') : 'não aparece'}` });
        }
      } else if (v.tipo === 'rede') {
        if (!rede) Object.assign(d, { ok: null, pulada: true, msg: 'pulada: rede não pedida' });
        else {
          const nulo = process.platform === 'win32' ? 'NUL' : '/dev/null';
          let codigo = '';
          try {
            codigo = String(execFileSync('curl', ['-sS', '-o', nulo, '-w', '%{http_code}', '-m', '30', '-A', 'Mozilla/5.0', v.url], { stdio: 'pipe', timeout: 40000 })).trim();
          } catch (e) {
            codigo = `erro: ${cortar(String(e.stderr || e.message).trim(), 120)}`;
          }
          const ok = v.espera === '2xx' ? /^2\d\d$/.test(codigo) : codigo === v.espera;
          let msg = `${v.url} respondeu ${codigo} (esperado ${v.espera})`;
          if (!ok) {
            const docs = (item.verificacoes ?? []).filter((x) => x.tipo === 'ausente' || x.tipo === 'presente').map((x) => x.arquivo);
            if (docs.length) msg += `; documentação envelhecida? ${[...new Set(docs)].join(', ')} pode afirmar o contrário do teste de rede`;
          }
          Object.assign(d, { ok, msg });
        }
      }
    } catch (e) {
      Object.assign(d, { ok: false, msg: `erro ao verificar: ${e.message}` });
    }
    d.msg = higienizarMsg(d.msg);
    detalhes.push(d);
  });
  const rodadas = detalhes.filter((d) => !d.pulada);
  return { ok: rodadas.every((d) => d.ok === true), rodou: rodadas.length > 0, detalhes };
}

// ---------------------------------------------------------------------------
// Linha de comando
// ---------------------------------------------------------------------------

const USO = `uso: node scripts/aprendizados.mjs <comando> [opções]
comandos:
  add --arquivo <json> | add --titulo .. --chave .. --categoria .. --escopo .. --severidade .. --origem ..
      --gatilho .. --evidencia <tipo>:<ref> [--evidencia ..] --aprendi .. --regra .. --mudanca ..
      [--alvo ..] [--substitui A00X] [--forcar] [--por dono --citacao ".."]
  pendentes                       bloco curto para colar na resposta (não marca nada)
  marcar-mostrado <ids...>        marca como mostrado ao dono
  aceitar <id> --citacao ".."     aprovação do dono (texto literal)
  rejeitar <id> --motivo ".." [--por dono --citacao "<texto>"]   (--por dono --citacao obrigatórios p/ origem dono)
  aplicar <id> --nota ".."
  verificar [ids...] [--rede]
  reincidir <id> --evidencia ".."
  revogar <id> --motivo ".." [--por-id A00X] [--por dono --citacao ".."]
  listar [--estado <e>] [--categoria <c>] [--json]
  mostrar <id>
  consolidar [--copiar-memoria]
  validar | revisar | inicio | gatilho
ambiente: APRENDIZADOS_DIR, APRENDIZADOS_REPO, APRENDIZADOS_HOME, APRENDIZADOS_AGORA`;

const BOOLEANAS = ['forcar', 'rede', 'json', 'copiar-memoria'];
const COM_VALOR = [
  'arquivo', 'titulo', 'chave', 'categoria', 'escopo', 'severidade', 'origem', 'gatilho', 'evidencia', 'aprendi',
  'regra', 'mudanca', 'alvo', 'substitui', 'citacao', 'motivo', 'por', 'por-id', 'nota', 'estado',
];
const REPETIVEIS = ['evidencia', 'alvo', 'substitui'];

export function parseOpcoes(args) {
  const opts = {};
  const pos = [];
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (!a.startsWith('--')) { pos.push(a); continue; }
    let nome = a.slice(2);
    let valor;
    const eq = nome.indexOf('=');
    if (eq >= 0) { valor = nome.slice(eq + 1); nome = nome.slice(0, eq); }
    if (BOOLEANAS.includes(nome)) {
      if (valor !== undefined) throw new ErroApp(2, `opção --${nome} não aceita valor`);
      opts[nome] = true;
      continue;
    }
    if (!COM_VALOR.includes(nome)) throw new ErroApp(2, `opção desconhecida: --${nome}`);
    if (valor === undefined) {
      const prox = args[i + 1];
      if (prox === undefined || prox.startsWith('--')) throw new ErroApp(2, `opção --${nome} sem valor`);
      valor = prox;
      i++;
    }
    if (REPETIVEIS.includes(nome)) (opts[nome] ??= []).push(valor);
    else opts[nome] = valor;
  }
  return { opts, pos };
}

function exigirOpcao(opts, nome) {
  const v = opts[nome];
  if (typeof v !== 'string' || !v.trim()) throw new ErroApp(2, `falta a opção --${nome}`);
  return v.trim();
}

function exigirId(pos, estado) {
  const id = pos[0];
  if (!id) throw new ErroApp(2, 'falta o id (ex.: A001)');
  const it = estado.porId[id];
  if (!it) throw new ErroApp(2, `id inexistente: ${id}`);
  return it;
}

function dadosDeOpcoes(opts) {
  const d = {};
  for (const k of ['titulo', 'chave', 'categoria', 'escopo', 'severidade', 'origem', 'gatilho', 'aprendi', 'regra', 'mudanca']) {
    if (opts[k] !== undefined) d[k] = opts[k];
  }
  if (opts.evidencia) {
    d.evidencia = opts.evidencia.map((s) => {
      const i = s.indexOf(':');
      if (i <= 0) throw new ErroApp(2, `--evidencia deve ser <tipo>:<ref> (recebido: ${s})`);
      return { tipo: s.slice(0, i).trim(), ref: s.slice(i + 1).trim() };
    });
  }
  if (opts.alvo) d.alvos = opts.alvo;
  if (opts.substitui) d.substitui = opts.substitui;
  if (opts.forcar) d.forcar = true;
  return d;
}

function lerLeitura(ctx) {
  const arq = caminhoRegistro(ctx.dir);
  const eventos = lerEventos(arq);
  const problemas = [];
  const estado = dobrar(eventos, problemas);
  return { arq, eventos, estado, problemas };
}

function estadoOuErro(ctx) {
  const r = lerLeitura(ctx);
  if (r.problemas.length) throw new ErroApp(3, `registro inconsistente (rode "validar"): ${r.problemas[0]}`);
  return r.estado;
}

function exigirDono(item, opts, acao) {
  if (ORIGENS_DONO.includes(item.origem)) {
    if (opts.por !== 'dono' || !String(opts.citacao ?? '').trim()) {
      throw new ErroApp(2, `${item.id} tem origem ${item.origem}: ${acao} exige --por dono --citacao "<texto do dono>"`);
    }
  }
}

const CMDS = {
  add(ctx, args) {
    const { opts } = parseOpcoes(args);
    let dados;
    let extras = { por: opts.por, citacao: opts.citacao };
    if (opts.arquivo) {
      let bruto;
      try { bruto = semBom(fs.readFileSync(opts.arquivo, 'utf8')); } catch (e) { throw new ErroApp(2, `não foi possível ler ${opts.arquivo}: ${e.message}`); }
      try { dados = JSON.parse(bruto); } catch (e) { throw new ErroApp(2, `JSON inválido em ${opts.arquivo}: ${e.message}`); }
      if (!dados || typeof dados !== 'object' || Array.isArray(dados)) throw new ErroApp(2, 'o JSON deve ser um objeto com os campos do aprendizado');
      dados = { ...dados };
      if (dados.por !== undefined) { extras.por ??= dados.por; delete dados.por; }
      if (dados.citacao !== undefined) { extras.citacao ??= dados.citacao; delete dados.citacao; }
      Object.assign(dados, dadosDeOpcoes({ ...opts, arquivo: undefined, por: undefined, citacao: undefined }));
    } else {
      dados = dadosDeOpcoes(opts);
    }
    const r = criar(ctx.dir, dados, ctx.agora, { ...extras, esperaMs: ctx.esperaMs });
    const linhas = [`registrado ${r.id} (proposto; exige "aprovado": ${r.exige ? 'sim' : 'não'})`, ...r.avisos];
    return { out: linhas.join('\n'), code: 0 };
  },

  pendentes(ctx) {
    return { out: formatarPendentes(estadoOuErro(ctx)), code: 0 };
  },

  'marcar-mostrado'(ctx, args) {
    const { pos } = parseOpcoes(args);
    if (!pos.length) throw new ErroApp(2, 'falta pelo menos um id');
    const ids = [...new Set(pos)];
    transacao(ctx.dir, (estado) => {
      for (const id of ids) if (!estado.porId[id]) throw new ErroApp(2, `id inexistente: ${id}`);
      const novos = ids
        .filter((id) => !FINAIS.includes(estado.porId[id].estado) && !estado.porId[id].mostradoAoDono)
        .map((id) => ev('mostrar', id, ctx.agora, 'agente'));
      return { eventos: novos };
    }, { esperaMs: ctx.esperaMs });
    return { out: `marcado como mostrado: ${ids.join(', ')}`, code: 0 };
  },

  aceitar(ctx, args) {
    const { opts, pos } = parseOpcoes(args);
    const citacao = exigirOpcao(opts, 'citacao');
    const id = pos[0];
    let jaAplicado = false;
    transacao(ctx.dir, (estado) => {
      const it = exigirId(pos, estado);
      jaAplicado = ATIVOS.includes(it.estado);
      return { eventos: [ev('aceitar', id, ctx.agora, 'dono', { citacao })] };
    }, { esperaMs: ctx.esperaMs });
    return { out: jaAplicado ? `${id} aceito (já estava aplicado como provisório)` : `${id} aceito; falta aplicar`, code: 0 };
  },

  rejeitar(ctx, args) {
    const { opts, pos } = parseOpcoes(args);
    const motivo = exigirOpcao(opts, 'motivo');
    if (opts.por !== undefined && !['agente', 'dono'].includes(opts.por)) throw new ErroApp(2, '--por deve ser agente ou dono');
    const id = pos[0];
    let lembrete = '';
    transacao(ctx.dir, (estado) => {
      const it = exigirId(pos, estado);
      exigirDono(it, opts, 'rejeitar');
      if (ATIVOS.includes(it.estado) || it.estado === 'aceito') {
        lembrete = `\nlembrete: desfazer as mudanças em: ${(it.alvos ?? []).join(', ') || '(sem alvos registrados)'}`;
      }
      const extra = { motivo };
      if (opts.citacao) extra.citacao = opts.citacao.trim();
      return { eventos: [ev('rejeitar', id, ctx.agora, opts.por ?? 'agente', extra)] };
    }, { esperaMs: ctx.esperaMs });
    return { out: `${id} rejeitado${lembrete}`, code: 0 };
  },

  aplicar(ctx, args) {
    const { opts, pos } = parseOpcoes(args);
    const nota = exigirOpcao(opts, 'nota');
    const id = pos[0];
    let prov = false;
    transacao(ctx.dir, (estado) => {
      const it = exigirId(pos, estado);
      for (const alvo of it.alvos ?? []) {
        if (!fs.existsSync(resolverRef(alvo, ctx))) throw new ErroApp(2, `alvo inexistente: ${alvo} (escreva a regra no alvo antes de aplicar)`);
      }
      prov = !it.aceito;
      return { eventos: [ev('aplicar', id, ctx.agora, 'agente', { nota })] };
    }, { esperaMs: ctx.esperaMs });
    return { out: prov ? `${id} aplicado (provisório, sem aprovação)` : `${id} aplicado`, code: 0 };
  },

  verificar(ctx, args) {
    const { opts, pos } = parseOpcoes(args);
    const estado = estadoOuErro(ctx);
    let alvos;
    if (pos.length) {
      alvos = pos.map((id) => {
        const it = estado.porId[id];
        if (!it) throw new ErroApp(2, `id inexistente: ${id}`);
        if (!ATIVOS.includes(it.estado)) throw new ErroApp(2, `transição inválida: ${it.estado} -> verificar em ${id}`);
        return it;
      });
    } else alvos = estado.itens.filter((it) => ATIVOS.includes(it.estado));
    const linhas = [];
    let ok = 0; let falhas = 0; let puladas = 0;
    const eventos = [];
    for (const it of alvos) {
      if (!it.verificacoes?.length) continue;
      const r = verificarItem(it, ctx, { rede: !!opts.rede });
      for (const d of r.detalhes) {
        const marca = d.pulada ? 'pulada' : d.ok ? 'ok' : 'FALHOU';
        if (d.pulada) puladas++; else if (d.ok) ok++; else falhas++;
        linhas.push(`${marca.padEnd(6)} ${it.id} [${d.i}] ${d.tipo}: ${d.msg}`);
      }
      if (r.rodou) eventos.push(ev('verificar', it.id, ctx.agora, 'agente', { ok: r.ok, detalhes: r.detalhes }));
    }
    if (eventos.length) {
      transacao(ctx.dir, (est) => ({ eventos: eventos.filter((e) => ATIVOS.includes(est.porId[e.id]?.estado)) }), { esperaMs: ctx.esperaMs });
    }
    let falhaOrcamento = false;
    const ativas = estado.itens.filter((it) => ATIVOS.includes(it.estado)).length;
    if (ativas > LIMITE_REGRAS) {
      linhas.push(`FALHOU orçamento: ${ativas} regras ativas (máximo ${LIMITE_REGRAS}); junte regras com --substitui`);
      falhaOrcamento = true;
    }
    const arqCons = path.join(ctx.dir, ARQ_CONSOLIDADO);
    if (fs.existsSync(arqCons) && fs.statSync(arqCons).size > LIMITE_BYTES_CONSOLIDADO) {
      linhas.push(`FALHOU orçamento: ${ARQ_CONSOLIDADO} passa de ${LIMITE_BYTES_CONSOLIDADO} bytes`);
      falhaOrcamento = true;
    }
    const arqMem = path.join(ctx.dir, 'MEMORY.md');
    if (fs.existsSync(arqMem)) {
      const t = fs.readFileSync(arqMem, 'utf8');
      if (t.split(/\r?\n/).length > LIMITE_LINHAS_MEMORY || Buffer.byteLength(t) > LIMITE_BYTES_MEMORY) {
        linhas.push(`aviso: MEMORY.md passa de ${LIMITE_LINHAS_MEMORY} linhas ou ${LIMITE_BYTES_MEMORY} bytes (confirmar o limite real na documentação)`);
      }
    }
    linhas.push(`verificação: ${ok} ok, ${falhas} falharam, ${puladas} puladas`);
    return { out: linhas.join('\n'), code: falhas > 0 || falhaOrcamento ? 1 : 0 };
  },

  reincidir(ctx, args) {
    const { opts, pos } = parseOpcoes(args);
    const evidencia = exigirOpcao(opts, 'evidencia');
    const id = pos[0];
    let n = 0;
    transacao(ctx.dir, (estado) => {
      const it = exigirId(pos, estado);
      n = it.reincidencias + 1;
      return { eventos: [ev('reincidir', id, ctx.agora, 'agente', { evidencia })] };
    }, { esperaMs: ctx.esperaMs });
    return { out: `${id}: reincidência nº ${n} (ver "revisar")`, code: 0 };
  },

  revogar(ctx, args) {
    const { opts, pos } = parseOpcoes(args);
    const motivo = exigirOpcao(opts, 'motivo');
    if (opts.por !== undefined && !['agente', 'dono'].includes(opts.por)) throw new ErroApp(2, '--por deve ser agente ou dono');
    const id = pos[0];
    transacao(ctx.dir, (estado) => {
      const it = exigirId(pos, estado);
      exigirDono(it, opts, 'revogar');
      if (opts['por-id'] && !estado.porId[opts['por-id']]) throw new ErroApp(2, `--por-id: id inexistente: ${opts['por-id']}`);
      const extra = { motivo };
      if (opts['por-id']) extra.por_id = opts['por-id'];
      if (opts.citacao) extra.citacao = opts.citacao.trim();
      return { eventos: [ev('revogar', id, ctx.agora, opts.por ?? 'agente', extra)] };
    }, { esperaMs: ctx.esperaMs });
    return { out: `${id} revogado`, code: 0 };
  },

  listar(ctx, args) {
    const { opts } = parseOpcoes(args);
    const { itens } = estadoOuErro(ctx);
    let lista = itens;
    if (opts.estado) lista = lista.filter((i) => i.estado === opts.estado);
    if (opts.categoria) lista = lista.filter((i) => i.categoria === opts.categoria);
    if (opts.json) {
      return { out: JSON.stringify(lista.map(({ eventos, ...resto }) => resto), null, 2), code: 0 };
    }
    if (!lista.length) return { out: 'nenhum aprendizado', code: 0 };
    return {
      out: lista.map((i) => `${i.id}  ${dataLocal(i.criadoEm)}  ${i.estado.padEnd(9)}  ${i.categoria.padEnd(10)}  ${i.chave}  ${i.titulo}`).join('\n'),
      code: 0,
    };
  },

  mostrar(ctx, args) {
    const { pos } = parseOpcoes(args);
    const it = exigirId(pos, estadoOuErro(ctx));
    const { eventos, ...resto } = it;
    const linhas = [`${it.id} · ${it.titulo} · estado: ${it.estado}`];
    for (const [k, v] of Object.entries(resto)) {
      if (k === 'id' || k === 'titulo' || k === 'estado') continue;
      linhas.push(`${k}: ${typeof v === 'string' ? v : JSON.stringify(v)}`);
    }
    linhas.push('eventos:');
    for (const e of eventos) {
      const { v, ev: tipo, id, em, por, dados, ...extra } = e;
      linhas.push(`  ${dataLocal(em)} ${tipo} (${por})${Object.keys(extra).length ? ' ' + JSON.stringify(extra) : ''}`);
    }
    return { out: linhas.join('\n'), code: 0 };
  },

  consolidar(ctx, args) {
    const { opts } = parseOpcoes(args);
    // Confere antes de gravar qualquer coisa: o registro nunca pode ir para uma pasta que o git publicaria.
    if (opts['copiar-memoria']) garantirIgnorado(ctx.repo, path.join(ctx.repo, 'memoria'));
    // Leitura do estado, gravacoes e copia no mesmo bloqueio: um `add` concorrente nao fica de fora do consolidado.
    return comBloqueio(ctx.dir, () => {
      const estado = estadoOuErro(ctx);
      const texto = gerarConsolidado(estado, ctx.agora);
      const ativas = estado.itens.filter((i) => ATIVOS.includes(i.estado)).length;
      const aguard = estado.itens.filter((i) => i.exigeAprovacao && !i.aceito && ['proposto', 'mostrado'].includes(i.estado)).length;
      const avisos = [];
      if (ativas > LIMITE_REGRAS || Buffer.byteLength(texto) > LIMITE_BYTES_CONSOLIDADO) {
        avisos.push(`aviso: orçamento estourado (${ativas} regras, ${Buffer.byteLength(texto)} bytes; limite ${LIMITE_REGRAS} regras e ${LIMITE_BYTES_CONSOLIDADO} bytes); junte regras com --substitui`);
      }
      const arqCons = path.join(ctx.dir, ARQ_CONSOLIDADO);
      const atual = fs.existsSync(arqCons) ? fs.readFileSync(arqCons, 'utf8') : null;
      if (atual === null || semDataGerado(atual) !== semDataGerado(texto)) escreverAtomico(arqCons, texto);
      const arqMem = path.join(ctx.dir, 'MEMORY.md');
      const memAtual = fs.existsSync(arqMem) ? fs.readFileSync(arqMem, 'utf8') : '';
      const memNovo = atualizarIndice(memAtual, gerarLinhaIndice(ativas, aguard));
      let memMsg = 'sem mudança';
      if (memNovo !== memAtual) { escreverAtomico(arqMem, memNovo); memMsg = 'atualizado'; }
      const linhas = [`consolidado: ${ativas} ativas, ${aguard} aguardando; MEMORY.md ${memMsg}`, ...avisos];
      if (opts['copiar-memoria']) {
        const destino = path.join(ctx.repo, 'memoria');
        fs.mkdirSync(destino, { recursive: true });
        for (const nome of [ARQ_REGISTRO, ARQ_CONSOLIDADO]) {
          const origem = path.join(ctx.dir, nome);
          if (fs.existsSync(origem)) escreverAtomico(path.join(destino, nome), fs.readFileSync(origem, 'utf8'));
        }
        linhas.push(`copiado para ${destino}`);
      }
      return { out: linhas.join('\n'), code: 0 };
    }, { esperaMs: ctx.esperaMs });
  },

  validar(ctx) {
    const arq = caminhoRegistro(ctx.dir);
    const eventos = lerEventos(arq);
    const problemas = validarRegistro(eventos);
    if (problemas.length) {
      return { err: `erro: ${problemas.length} problema(s) no registro:\n- ${problemas.join('\n- ')}`, code: 2 };
    }
    const n = eventos.filter((e) => e.ev === 'criar').length;
    return { out: `registro válido: ${n} aprendizados, ${eventos.length} eventos`, code: 0 };
  },

  revisar(ctx) {
    const { itens } = estadoOuErro(ctx);
    const agoraMs = new Date(ctx.agora).getTime();
    const ativos = itens.filter((i) => ATIVOS.includes(i.estado));
    const velhos = ativos.filter((i) => {
      const ref = i.ultimaVerificacao ?? i.aplicadoEm ?? i.criadoEm;
      return !i.verificacoes?.length || agoraMs - new Date(ref).getTime() > 60 * 24 * 3600 * 1000;
    });
    const reinc = ativos.filter((i) => i.reincidencias >= 2);
    const grupos = new Map();
    for (const i of ativos) {
      const pref = i.chave.split('.').slice(0, 2).join('.');
      (grupos.get(pref) ?? grupos.set(pref, []).get(pref)).push(i.id);
    }
    const linhas = ['Ativos sem verificação automática, ou sem verificar há mais de 60 dias:'];
    linhas.push(...(velhos.length ? velhos.map((i) => `- ${i.id} ${i.chave}${i.verificacoes?.length ? '' : ' (sem verificação automática)'}`) : ['- nenhum']));
    linhas.push('Reincidência >= 2 (a regra não mudou o comportamento: escalar para hook, teste ou checagem):');
    linhas.push(...(reinc.length ? reinc.map((i) => `- ${i.id} ${i.chave} (${i.reincidencias} reincidências)`) : ['- nenhum']));
    linhas.push('Grupos com o mesmo prefixo de chave (candidatos a juntar):');
    const gs = [...grupos].filter(([, ids]) => ids.length >= 2);
    linhas.push(...(gs.length ? gs.map(([p, ids]) => `- ${p}: ${ids.join(', ')}`) : ['- nenhum']));
    return { out: linhas.join('\n'), code: 0 };
  },

  inicio(ctx) {
    try {
      const estado = estadoOuErro(ctx);
      const ativas = estado.itens.filter((i) => ATIVOS.includes(i.estado));
      const novos = estado.itens.filter((i) => NAO_FINAIS.includes(i.estado) && !i.mostradoAoDono);
      const aguard = listaAguardando(estado);
      const falhando = ativas.filter((i) => i.falhaVerificacao);
      const linhas = [`Aprendizados: ${ativas.length} regras ativas (ver regras-aprendidas.md), ${novos.length} para mostrar ao dono, ${aguard.length} aguardando aprovação, ${falhando.length} com verificação falhando.`];
      if (novos.length) {
        linhas.push('Para mostrar ao dono (rode "node scripts/aprendizados.mjs pendentes"):');
        for (const i of novos.slice(0, 4)) linhas.push(`- ${i.id} ${cortar(i.titulo, 70)}`);
      }
      if (aguard.length) linhas.push(`Aguardando "aprovado" do dono: ${aguard.map((i) => i.id).join(', ')}.`);
      if (falhando.length) linhas.push(`Verificação falhando: ${falhando.map((i) => i.id).join(', ')} (rode "verificar").`);
      return { out: linhas.slice(0, 12).join('\n'), code: 0 };
    } catch (e) {
      return { out: `aprendizados: não foi possível ler o registro (${e.message})`, code: 0 };
    }
  },

  // A leitura da entrada padrao e assincrona (com tempo limite) e fica em gatilhoAsync(), usado pela CLI.
  // Chamado por main() em processo, nao le stdin e nao imprime nada.
  gatilho() {
    return { out: '', code: 0 };
  },
};

const LEMBRETE_GATILHO = 'Lembrete: a mensagem do dono parece regra ou correção; registrar com "node scripts/aprendizados.mjs add --arquivo <json>" antes de encerrar o lote.';

/** Extrai o texto do prompt da entrada do hook (JSON com `prompt`, ou texto cru). */
export function textoDoHook(bruto) {
  try {
    const j = JSON.parse(semBom(String(bruto ?? '')));
    return [j.prompt, j.user_prompt, j.message, j.text].find((x) => typeof x === 'string') ?? '';
  } catch {
    return String(bruto ?? '');
  }
}

/** Devolve o lembrete se o texto tem uma das frases de 2.2; senao ''. "sempre" e "errou" soltos nao disparam. */
export function lembreteGatilho(texto) {
  const n = norm(texto);
  const re = /\b(guarde (essa|esta|a) regra|salve como regra|a partir de agora|nunca mais|voce errou|nao era isso|eu (ja )?tinha dito|nao pare|nao termine)\b/;
  return re.test(n) ? LEMBRETE_GATILHO : '';
}

/** Le a entrada padrao com tempo limite (sem EOF em `ms`, ou TTY: devolve o que houver). Nunca rejeita. */
export function lerStdinComTimeout(stdin = process.stdin, ms = 1000) {
  return new Promise((resolve) => {
    if (!stdin || stdin.isTTY) { resolve(''); return; }
    let dados = '';
    let feito = false;
    const fim = () => {
      if (feito) return;
      feito = true;
      clearTimeout(timer);
      try { stdin.removeAllListeners('data'); stdin.destroy(); } catch { /* ignora */ }
      resolve(dados);
    };
    const timer = setTimeout(fim, ms);
    try {
      stdin.setEncoding('utf8');
      stdin.on('data', (c) => { dados += c; });
      stdin.on('end', fim);
      stdin.on('error', fim);
    } catch { fim(); }
  });
}

/** Hook UserPromptSubmit: imprime o lembrete ou nada; sempre codigo 0. */
export async function gatilhoAsync(stdin = process.stdin, ms = 1000) {
  try {
    const linha = lembreteGatilho(textoDoHook(await lerStdinComTimeout(stdin, ms)));
    if (linha) process.stdout.write(linha + '\n');
  } catch { /* nunca falha */ }
  return 0;
}

function resolverContexto(env) {
  const aqui = path.dirname(fileURLToPath(import.meta.url));
  const home = env.APRENDIZADOS_HOME || os.homedir();
  const dir = env.APRENDIZADOS_DIR
    || path.join(os.homedir(), '.claude', 'projects', 'c--Users-rafael-ioppi-apostilas-dentista-furb', 'memory');
  let agora;
  try { agora = iso(env.APRENDIZADOS_AGORA || undefined); } catch (e) { throw new ErroApp(2, `APRENDIZADOS_AGORA inválida: ${env.APRENDIZADOS_AGORA}`); }
  const esperaMs = env.APRENDIZADOS_LOCK_ESPERA_MS ? Number(env.APRENDIZADOS_LOCK_ESPERA_MS) : 5000;
  return { dir, repo: env.APRENDIZADOS_REPO || path.resolve(aqui, '..'), home, agora, esperaMs };
}

/** Ponto de entrada da CLI. Devolve o codigo de saida (nao chama process.exit). */
export function main(argv = process.argv.slice(2), env = process.env) {
  const [cmd, ...resto] = argv;
  const nunca = cmd === 'inicio' || cmd === 'gatilho';
  try {
    if (!cmd || !Object.hasOwn(CMDS, cmd)) {
      process.stderr.write(`${cmd ? `erro: comando desconhecido: ${cmd}\n` : ''}${USO}\n`);
      return 2;
    }
    const ctx = resolverContexto(env);
    const r = CMDS[cmd](ctx, resto);
    if (r.out) process.stdout.write(r.out + '\n');
    if (r.err) process.stderr.write(r.err + '\n');
    return r.code;
  } catch (e) {
    if (nunca) {
      if (cmd === 'inicio') process.stdout.write(`aprendizados: não foi possível ler o registro (${e.message})\n`);
      return 0;
    }
    if (e instanceof ErroApp) {
      process.stderr.write(`erro: ${e.message}\n`);
      return e.codigo;
    }
    process.stderr.write(`erro: inesperado: ${e?.message ?? e}\n`);
    return 3;
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv[2] === 'gatilho') process.exitCode = await gatilhoAsync();
  else process.exitCode = main();
}
