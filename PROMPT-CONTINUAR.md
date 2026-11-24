# Prompt para continuar de onde parou (2026-11-24)

Projeto `c:\Users\rafael-ioppi\apostilas-dentista-furb`: estudo pessoal, sem fins comerciais. Apostilas PDF para Cirurgião-Dentista (banca FURB) e site estático em `site/`. Responda sempre em português.

Antes de agir, leia `ESTADO.md` (seção "Estado geral em 2026-11-24"), `CLAUDE.md` e `memoria/MEMORY.md`.

## Onde parou
- Foco: concurso Navegantes SC (Proc. Seletivo 0172/2026, prova 13/12/2026; inscrições até 25/11 23h59).
- As propostas de `curso/propostas-navegantes/` foram aplicadas nos JSONs de `curso/apostila/`: 01 Português, 02 Conhecimentos Gerais, 03 SUS/ESF, 04 Ética, 06 Endodontia, 07 Periodontia, 08 Cirurgia/BMF e 09 Raciocínio Lógico. A 10 (PNE, `odontologia-pacientes-especiais-navegantes.json`) estava sendo aplicada por um Sonnet: confira se o arquivo está íntegro e se o gerador o valida.
- Testes já passados nesta rodada: `tests/leis.test.mjs` (21/21) e `tests/aprendizados.test.mjs` (45/45).
- **Nada foi commitado ainda.** `.claude/` é config local: não commitar.

## O que falta, nesta ordem, um passo por vez
1. Rodar `node --test tests/gerador.test.mjs` (isolado), depois `node scripts/leis-compilar-e-conferir.mjs conferir`. Ler o resultado antes de seguir.
2. Ajustes pendentes nos JSONs:
   - remover os `topicosBanco` fictícios (Ética lições 8 a 10; Conhecimentos Gerais, 4 lições novas) e aceitar o aviso do gerador;
   - Português: marcar PENDENTE o motivo do item III de G0279 na lição "Gêneros do discurso";
   - Endodontia: atualizar `mapa` e `qtdQuestoes` da lição para os pontos novos.
3. Rodar `/code-review` sobre o diff e mostrar os achados. Corrigir os confirmados e revisar também a correção.
4. Gerar os PDFs: defina `NAVEGADOR_PDF` com o Chrome 159 (`C:\Program Files\Google\Chrome\Application\159.0.8154.13`, o executável dentro dessa pasta) e rode `node scripts/gerar-apostila-materia.mjs <id> --pdf` para cada apostila alterada.
5. Copiar os PDFs para `material-premium/` e `site/apostilas/`, conferir `site/dados/apostilas.json`, fazer commit e push (no PowerShell, atrás do proxy), e provar que o site no ar serve os arquivos novos.
6. Atualizar `ESTADO.md` e a memória. Registrar aprendizados com `node scripts/aprendizados.mjs` (add, verificar, consolidar) e mostrar os novos ao dono.

## Regras do dono
- Só Sonnets, **um por vez**, um arquivo cada; nada de Opus; sem `git stash`.
- Conteúdo só se confirmado em fonte oficial; o resto fica PENDENTE. Radar-first: o que nunca caiu e é improvável fica fora. Texto de lei só literal.
- Não contornar CAPTCHA nem 403. Não baixar de fonte não confiável sem avisar.
- Não parar para perguntar "quer que eu siga?": só para bloqueio real.
- Pode reaproveitar apostilas prontas, desde que conferidas.
- Admitir erro na hora; nunca dizer "feito" sem verificar.

## Pendências sem fonte oficial
Lei 11.889/2008, LAI e LC 101 literais; Lei Orgânica de Navegantes oficial; história e geografia de Navegantes; Leis 3.985/2025 e 4.022/2026 (só cópia não oficial); lesão endoperiodontal; cirurgia pré-protética e infecções odontogênicas; atualidades 2026.
