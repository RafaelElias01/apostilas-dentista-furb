# ESTADO: Apostilas Cirurgião-Dentista FURB (atualizado em 2026-11-18)

## O que existe (verificado)
- **fontes/** (fora do git, pelo .gitignore): editais, cadernos, gabaritos e recursos de Blumenau (PSPS 002/2019, PSPS 002/2021, Concurso 002/2021, PSPS 003/2023, PSPS 003/2025). Também provas de outros municípios FURB (Biguaçu 2025, Florianópolis 2024, Itapema 2025) e a dispensa de licitação de Balneário Camboriú 2026 (cópia de terceiro).
- **fontes/leis/**: 23 arquivos de normas com origem, SHA256 e status em `fontes/leis/ORIGEM.md`.
  - Federais: baixadas da Câmara dos Deputados, porque o planalto.gov.br não é alcançável desta rede, nem pelo proxy Px.
  - Do bvsms: PNAB, PRC 2/2017, RDC 15/2012 e RDC 222/2018.
  - Do site do CFO: Código de Ética (Resolução CFO-118/2012).
  - Da Câmara de Blumenau: Lei 7.564/2010.
  - Copiados do projeto HCPA (só leitura lá): Lei 8.080, documento base do HumanizaSUS e Carta dos Direitos dos Usuários.
- **curso/edital.md**: edital verificado, com a fonte de cada dado. A base é o PSPS 003/2025 de Blumenau: 40 questões (LP 10, CGL 10, CE 20). Tem as edições anteriores e as pendências.
- **curso/questoes-anteriores.json**: 1.440 questões.
  - 840 de Blumenau, de 21 cadernos de dentista.
  - 600 de outros municípios FURB, só de referência.
- **curso/radar-banca.json**: 8 apostilas, com 374 questões únicas de Blumenau.
  - Amostra pequena: 5 editais de um só município, 2019 a 2025.
  - Os tópicos de outros municípios foram classificados automaticamente e servem só de complemento.
- **scripts/**: gerador copiado da Brigada, ainda **não adaptado** a este layout.
- **memoria/**: cópia das memórias.

## Auditoria do radar e do banco de questões (2026-11-18, Opus)
Scripts de conferência na pasta scratchpad da sessão, fora do repo.
- **Gabaritos:** comparei as 840 questões de Blumenau com o texto dos gabaritos oficiais (2019, 2021 e 2021 concurso; 2023 "após recursos do resultado preliminar"; 2025 "Correta: X" impresso no caderno oficial). **Nenhuma divergência.**
  - Em 2023, cinco questões de LP estavam anuladas no gabarito oficial e voltaram a valer no gabarito "após recursos do resultado preliminar", que é o documento mais recente. O JSON segue esse último, e está certo.
  - Em 2025 (BMF), a questão 10 tem o gabarito em outra página (quebra de página). Conferi à mão: D.
- **Estrutura:** os 21 cadernos estão completos, com numeração contínua, 5 alternativas e tópico em todas as questões.
  - Os 374 grupos de questões repetidas são coerentes (mesmo tópico, mesma resposta). Não há duplicatas entre grupos.
- **Radar:** recalculei tudo a partir do banco, por tópico: únicas, por edição, em prova de Clínico Geral, comuns às especialidades e anuladas. **Bate 100%** (soma de 374).
  - A composição das provas no radar confere com os editais.
  - O aviso "Balneário Camboriú ainda não tem prova de dentista pela FURB" confere: o PSPS 009/2022 de lá não tem o cargo.
- **Correções feitas:** nenhuma; não achei erro de fato.
- **Classificação ambígua, não alterada:** G0287, de 2025, trata de COP30, envelhecimento e cidades resilientes e está em `cgl.urbano`. Também caberia em `cgl.brasil_mundo` (atualidades). É uma questão; se o dono preferir, reclassificar.
- **Limite:** não auditei a classificação automática dos outros municípios (`complementarOutrosMunicipiosAuto`, que tem tópicos "?").

## O que falta (PENDENTE)
1. **Balneário Camboriú:** edital não publicado. A FURB foi contratada em 10/10/2026, e o documento não diz se haverá o cargo de dentista. Quando sair, atualizar o edital.md e rever a legislação municipal das apostilas.
2. **Lei Orgânica de Blumenau:** falta o texto consolidado vigente. O arquivo atual é de 2021, com texto não extraível; existem as Emendas 52/2022 e 53/2025.
3. **Lei 7.564/2010:** baixar e conferir as leis alteradoras (8.649/2018 e 8.820/2019).
4. **Normas federais:** conferir com o Planalto quando houver rede; hoje a fonte é a Câmara dos Deputados.
5. **Código de Ética do CFO:** verificar se a Resolução 118/2012 foi alterada depois.
6. **PRC 2/2017 (bvsms):** está no texto original; conferir a redação vigente da PNAB e da saúde bucal.
7. **scripts/:** adaptar o gerador (Sonnet) a este layout. Hoje ele depende de `curso/questoes.js` e da Constituição em outro formato.
8. **curso/apostila/<id>.json:** nenhuma apostila montada ainda; só existe o `_modelo-portugues.json`.

## Próximos passos
1. Sonnet adapta `scripts/gerar-apostila-materia.mjs` ao layout (um subagente, um arquivo), seguido de code review.
2. Opus fecha a lista de tópicos por apostila (as 8 do radar) e o que cada uma reaproveita: só conteúdo teórico neutro do HCPA; LP e CGL são novos, porque a banca do HCPA é FAURGS.
3. Sonnets montam as apostilas 01 a 08, um JSON por subagente. Opus audita os fatos e os trechos de lei contra `fontes/leis/`.
4. Gerar os PDFs numerados em `material-premium/`.
