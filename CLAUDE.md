# CLAUDE.md — Apostilas Dentista (FURB: Balneário Camboriú SC e Blumenau SC)

Projeto enxuto, criado em 2026-11-18 a partir do curso-template (Brigada Academy). **Sem site, sem e-mail, sem pagamento.** Foco único: **uma apostila PDF por disciplina do edital, numeradas, perfeitas, baseadas nas provas anteriores** (banca FURB). Reaproveitar conteúdo do projeto HCPA (`C:\Users\rafael-ioppi\Documents\hcpa-ps32-estudo-main`) quando servir (matérias comuns: português, informática, SUS, legislação etc.).

## Regras permanentes (herdadas; valem aqui)
- **Responder sempre em português.**
- **Apostilas numeradas, sempre**: `numero` no JSON, "Apostila 0N" no título, arquivo `apostila-0N-<nome>.pdf`, páginas "Apostila 0N · título · Página X de Y" (Chrome/Edge >= 131; `NAVEGADOR_PDF`).
- **Estilo Praça Academy, com ênfase no que mais cai** nas provas anteriores (radar da banca; amostra pequena, dizer sempre).
- **Conteúdo perfeito**: nunca inventar número, artigo, data ou resultado. Texto de lei só literal e de fonte oficial. O que não puder ser confirmado fica marcado PENDENTE e é avisado. Opus audita fatos; Sonnet monta.
- **Opus** faz edital, download de conteúdo, radar e auditoria; **Sonnets** montam as apostilas (um por arquivo, nunca dois no mesmo arquivo, sem `git stash`).
- Erros: admitir na hora; nunca dizer "feito" sem verificar. Memórias: atualizar sempre ao fim de cada lote; regra nova dada pelo usuário é salva na hora; não salvar segredos.
- Code review (`/code-review`) em todo código/script antes de push; mostrar os achados; só doc/memória é isento.
- Texto que o leitor vê: mostrar antes/depois e esperar "aprovado" antes de mudar em massa.
- Commit/push/merge a qualquer hora (regra do dono para estes projetos).
- No Windows: vitest só pelo PowerShell; heredocs do Bash estragam barras invertidas (usar Write/Edit); `git push` atrás do proxy: PowerShell, ou Px 127.0.0.1:3130 para `gh`.

## Layout
- `fontes/` — editais, provas anteriores, gabaritos, leis baixadas (originais, intocados).
- `curso/edital.md` — edital verificado (cargos, vagas, banca, datas, conteúdo programático por disciplina, pesos).
- `curso/apostila/<id>.json` — um por disciplina (modelo em `_modelo-portugues.json`, vindo da Brigada).
- `curso/radar-banca.json` — o que mais cai, das provas anteriores.
- `scripts/` — gerador de apostila copiado da Brigada (`gerar-apostila-materia.mjs`, `apostila-css.mjs`); depende de `curso/questoes.js` etc., **adaptar** (Sonnet) para este layout antes de usar.
- `material-premium/` — PDFs finais numerados.

## Estado
Ver `ESTADO.md`. Memórias copiadas da Brigada em `~/.claude/projects/c--Users-rafael-ioppi-apostilas-dentista-furb/memory/`.

## Memória
Cópia de toda a memória em `memoria/` (índice: `memoria/MEMORY.md`), para a sessão nova ler. A original fica em ~/.claude/projects/c--Users-rafael-ioppi-apostilas-dentista-furb/memory/. Ao abrir a sessão aqui, leia `memoria/MEMORY.md` e `ESTADO.md` primeiro.
