# Prompt para continuar de onde parou (atualizado em 2026-11-24, noite)

Projeto `apostilas-dentista-furb` (pasta local varia por PC): estudo pessoal, sem fins comerciais. Apostilas PDF para Cirurgião-Dentista (banca FURB) e site estático em `site/`. Responda sempre em português.

Antes de agir: `git pull`, depois leia `ESTADO.md` (seção "Estado geral em 2026-11-24"), `CLAUDE.md` e `memoria/MEMORY.md`.

## Onde parou
- Foco: concurso Navegantes SC (Proc. Seletivo 0172/2026, prova 13/12/2026; inscrições até 25/11 23h59).
- As 10 apostilas estão aplicadas, revisadas (code-review de conteúdo de 24/11/2026), regeradas e publicadas em `site/apostilas/`. Testes: `tests/gerador.test.mjs` 13/13, `tests/leis.test.mjs` 21/21, `tests/aprendizados.test.mjs` 45/45; leis 117/117 trechos conferidos.
- `.claude/` é config local: não commitar.

## Se `fontes/` der "fonte inexistente" neste PC
Os JSONs citam nomes de arquivo de `fontes/leis/` que podem não existir em outro computador (ex.: `constituicao-federal-camara.html` x `constituicao-federal-1988-camara-normaatualizada.html`). Não é erro de conteúdo: crie uma cópia com o nome citado e anote em `fontes/leis/ALIASES-ESTE-PC.txt`; depois rode `node scripts/leis-compilar-e-conferir.mjs conferir` (tem que dar 117/117).

## O que falta (decisão do dono primeiro)
1. Apostila 02 está como "nao-usar" em `site/dados/apostilas.json` (o site a esconde): confirmar se era a intenção.
2. HIV (Apostila 08) usa fonte de 2006; G0405 (Apostila 09) pode perder o PENDENTE; citações do RCS England 2020 (Apostila 06) sem cópia local para conferir.
3. Fontes PENDENTES (abaixo). Reconferir Navegantes na véspera da prova.

## Regras do dono
- Só Sonnets, **no máximo 3 em paralelo**, um arquivo cada; nada de Opus; sem `git stash`.
- Conteúdo só se confirmado em fonte oficial; o resto fica PENDENTE. Radar-first: o que nunca caiu e é improvável fica fora. Texto de lei só literal.
- Não contornar CAPTCHA nem 403. Não baixar de fonte não confiável sem avisar.
- Não parar para perguntar "quer que eu siga?": só para bloqueio real.
- Admitir erro na hora; nunca dizer "feito" sem verificar. Ao atualizar este arquivo ou o `ESTADO.md`, conferir o estado real (git log, testes) antes de escrever.

## Pendências sem fonte oficial
Lei 11.889/2008, LAI e LC 101 literais; Lei Orgânica de Navegantes oficial; história e geografia de Navegantes; Leis 3.985/2025 e 4.022/2026 (só cópia não oficial); lesão endoperiodontal; cirurgia pré-protética e infecções odontogênicas; atualidades 2026.
