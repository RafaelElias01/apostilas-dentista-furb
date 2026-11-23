# ESTADO: Apostilas Cirurgião-Dentista FURB (atualizado em 2026-11-23)

## O que existe (verificado)
- **fontes/** (fora do git, pelo .gitignore): editais, cadernos, gabaritos e recursos de Blumenau (PSPS 002/2019, PSPS 002/2021, Concurso 002/2021, PSPS 003/2023, PSPS 003/2025). Também provas de outros municípios FURB (Biguaçu 2025, Florianópolis 2024, Itapema 2025) e a dispensa de licitação de Balneário Camboriú 2026 (cópia de terceiro; o ato oficial do DOM/SC é o 8903198).
  - Em 2026-11-19, segundo o coordenador da sessão, foi feito backup da pasta `fontes/` no Google Drive (não verificado por mim).
- **fontes/leis/**: normas com origem, SHA256 e status em `fontes/leis/ORIGEM.md`. Refeita em 2026-11-19 (a PRC 2/2017 do bvsms é o texto atualizado; a Lei 7.564/2010 de Blumenau tem 12 leis alteradoras baixadas em `fontes/leis/blumenau-lei7564-alteradoras/`; Resolução CFO-271/2025 em `fontes/leis/cfo-ceo-alteracoes/`). Detalhes em `curso/edital.md`, seção 1.6.
  - Federais: baixadas da Câmara dos Deputados, porque o planalto.gov.br não é alcançável desta rede, nem pelo proxy Px.
  - Do bvsms: PNAB, PRC 2/2017, RDC 15/2012 e RDC 222/2018.
  - Do site do CFO: Código de Ética (Resolução CFO-118/2012).
  - Da Câmara de Blumenau: Lei 7.564/2010 (texto original de 2010, desatualizado; vale com as alteradoras) e as emendas à Lei Orgânica.
  - Copiados do projeto HCPA (só leitura lá): Lei 8.080, documento base do HumanizaSUS e Carta dos Direitos dos Usuários.
- **curso/edital.md**: edital verificado, com a fonte de cada dado. A base é o PSPS 003/2025 de Blumenau: 40 questões (LP 10, CGL 10, CE 20). Tem as edições anteriores, a seção 2.1 sobre Navegantes e as pendências.
- **curso/concursos-completo.md**: levantamento de 2026-11-19 (Opus) de todos os certames de dentista pela FURB (Blumenau, Balneário Camboriú, Navegantes, Maravilha e outros), com fonte e calendário.
- **curso/questoes-anteriores.json**: 1.440 questões.
  - 850 de Blumenau (`alvo: true`), de 21 cadernos de dentista (4 PSPS x 5 especialidades x 40 + 1 concurso x 50).
  - 590 de outros municípios FURB (`alvo: false`), só de referência: Florianópolis 80, Biguaçu 300, Itapema 210.
  - 14 questões marcadas `dependeDeFigura` (o enunciado depende de imagem que não está no banco) e 5 marcadas `transcricaoSuspeita` (enunciado possivelmente mal transcrito). Cada uma traz o motivo.
- **curso/radar-banca.json**: 8 apostilas, com 374 questões únicas de Blumenau.
  - Amostra pequena: 5 editais de um só município, 2019 a 2025.
  - Os tópicos de outros municípios foram classificados automaticamente e servem só de complemento.
- **curso/roteiro-apostilas.md**: roteiro das 8 apostilas (o que cada uma terá, ordem e fontes).
- **curso/apostila/**: 5 apostilas montadas em JSON, cada uma com auditoria de fatos (Opus, 2026-11-19) em `curso/auditoria/`:
  - 01 Língua Portuguesa (`portugues.json`)
  - 05 Cariologia, Prevenção, Saúde Bucal Coletiva e Odontopediatria (`cariologia-prevencao-odontopediatria.json`)
  - 06 Dentística, Materiais, Oclusão, Endodontia e Traumatismo (`dentistica-endodontia-trauma.json`)
  - 07 Periodontia (`periodontia.json`)
  - 08 Cirurgia, Anestesia, Farmacologia, Emergências e Patologia Bucal (`cirurgia-farmacologia-patologia.json`)
  - Etapas feitas em 2026-11-19/20 (subagentes Sonnet e Opus): auditoria de fatos (`curso/auditoria/apostila-0N.md`), aplicação dos achados (inclusive o C1 da 08, macete sarampo/caxumba), resolução dos itens PENDENTE por fonte oficial na web (`curso/auditoria/resolucao-pendencias-*.md`), conferência cruzada por um segundo Sonnet relendo as fontes (`curso/auditoria/conferencia-cruzada-0N.md`) e aplicação das divergências, e code-review do código e do site (`curso/auditoria/code-review.md`: sem achado crítico nem médio).
  - **PDFs finais numerados** gerados em `material-premium/` (fora do git) e copiados para `site/apostilas/` (publicados no site): 01 (74 páginas), 05 (44), 06 (56), 07 (28) e 08 (57); o gerador confere o rodapé "Apostila 0N · título · Página X de N" em todas as páginas.
  - O que continua PENDENTE dentro das apostilas está marcado no próprio texto ("PENDENTE: ...") e vem de fonte que não abriu (livros pagos, PDFs das provas ausentes, Leonard, valvopatias etc.). Ler a seção "AINDA PENDENTE" dos relatórios `resolucao-pendencias-*.md` e `conferencia-cruzada-*.md`.
- **site/dados/concurso.json**: aba "Concurso" do site, mantida à mão (o gerador `scripts/gerar-dados-site.mjs` não o gera). Atualizada em 2026-11-19: Navegantes em destaque, data da dispensa de Balneário Camboriú corrigida.
- **scripts/**: `gerar-dados-site.mjs`, `gerar-apostila-materia.mjs`, `gerar-amostra-apostila.mjs` e `apostila-css.mjs`. Não conferi nesta atualização se o gerador de apostilas já está totalmente adaptado a este layout.
- **memoria/**: cópia das memórias.

## Situação dos concursos (conferida em 2026-11-19; fonte: `curso/concursos-completo.md`)
- **Navegantes SC, Processo Seletivo 0172/2026 (FURB):** único certame da FURB com Odontólogo com inscrições abertas. Inscrições até 25/11/2026, 23h59; taxa R$ 130,00 até 26/11/2026; prova em 13/12/2026, de manhã. A prova tem Raciocínio Lógico e nota mínima 5,00 (diferente de Blumenau). Só vale para quem aceita trabalhar em Navegantes.
- **Blumenau:** nenhum certame aberto ou em andamento tem o cargo. O mais recente com o cargo é o PSPS 003/2025 (resultado final em 05/02/2026).
- **Balneário Camboriú:** dispensa de licitação (Termo 114/2026) publicada no DOM/SC em 10/11/2026 (ato 8903198), documento datado de 10 de novembro de 2026. Ainda não há edital, cargos nem datas; não se sabe se haverá dentista.
- **Maravilha SC:** Concurso 001/2026 com Odontólogo, prova em 29/11/2026 (inscrições encerradas); PSS 007/2026 com resultado final em 26/11/2026.

### Oportunidades de Odontologia RS/PR adicionadas ao site (23/11/2026)
- `site/dados/concurso.json` agora lista IFFar, Piratini, Ipê, São José do Inhacorá e Ivaí, além de Navegantes. Ipê e Ivaí são destaques vermelhos por encerrarem hoje às 13h; Ivaí é cargo auxiliar.
- Ipê: título correto no portal Objetiva é Concurso Público 01/2026; Odontólogo do PSF e Atendente de Consultório Dentário do PSF; inscrições até 23/11 às 13h.
- Piratini: Odontólogo e Auxiliar de Saúde Bucal; prazo até 25/11 às 13h, portal Objetiva.
- São José do Inhacorá: Dentista; prazo prorrogado até 30/11, portal Premier.
- Ivaí: Auxiliar de Cirurgião Dentista, não Odontólogo; prazo até 23/11 às 13h, portal Objetiva.
- IFFar: Edital 406/2026, Odontólogo, 4 vagas, 40h; inscrições indicadas de 19/11 a 21/12. A página oficial hospeda o edital; os detalhes de vagas e datas foram conferidos no resumo do PCI Concursos.
- Ijuí, Sede Nova e Quedas do Iguaçu não foram publicados: há detalhes em agregador, mas não houve confirmação direta suficiente nos portais/editais oficiais. Palmital/PR ainda não abriu inscrições (início indicado para 25/11).
- Pedido para etapa futura: incluir em cada concurso novo um controle de intenção de inscrição e interesse no material; a informação deve continuar disponível quando o dono abrir o VS Code novamente. Definir uma forma de coleta persistente/centralizada antes de implementar: o site é estático, e localStorage no navegador não fica visível no VS Code.

## Prazos futuros confirmados (datas previstas em cronograma oficial; podem mudar por errata)
- 25/11/2026: fim das inscrições de Navegantes. 26/11/2026: último dia para pagar a taxa de Navegantes; resultado final do Maravilha PSS 007/2026.
- 29/11/2026: prova do Concurso 001/2026 de Maravilha.
- 13/12/2026: prova de Navegantes. Resultado final de Navegantes: 12/02/2027.
- Calendário completo: `curso/concursos-completo.md`, seção D. Reconferir na véspera de cada prazo.

## Auditoria do radar e do banco de questões (2026-11-18, Opus)
Scripts de conferência na pasta scratchpad da sessão, fora do repo.
- **Gabaritos:** comparei as 850 questões de Blumenau com o texto dos gabaritos oficiais (2019, 2021 e 2021 concurso; 2023 "após recursos do resultado preliminar"; 2025 "Correta: X" impresso no caderno oficial). **Nenhuma divergência.** (A auditoria de 18/11 registrou 840; a contagem direta do JSON em 19/11 deu 850 e 590, conforme `curso/roteiro-apostilas.md`, seção 0.1.)
  - Em 2023, cinco questões de LP estavam anuladas no gabarito oficial e voltaram a valer no gabarito "após recursos do resultado preliminar", que é o documento mais recente. O JSON segue esse último, e está certo.
  - Em 2025 (BMF), a questão 10 tem o gabarito em outra página (quebra de página). Conferi à mão: D.
- **Estrutura:** os 21 cadernos estão completos, com numeração contínua, 5 alternativas e tópico em todas as questões.
  - Os 374 grupos de questões repetidas são coerentes (mesmo tópico, mesma resposta). Não há duplicatas entre grupos.
- **Radar:** recalculei tudo a partir do banco, por tópico. **Bate 100%** (soma de 374).
- **Limites:** os enunciados foram conferidos só contra o banco, porque os PDFs das provas não estão nesta máquina; não auditei a classificação automática dos outros municípios (`complementarOutrosMunicipiosAuto`, que tem tópicos "?").
- **Classificação ambígua, não alterada:** G0287, de 2025, trata de COP30, envelhecimento e cidades resilientes e está em `cgl.urbano`. Também caberia em `cgl.brasil_mundo`.

## O que falta (PENDENTE)
1. **Apostilas 02, 03 e 04: MONTADAS, mas NÃO conferidas nem publicadas.** Os JSON estão na branch `wip/apostilas-02-03-04` (NÃO mergeada, de propósito): 02 Conhecimentos Gerais e Legislação Municipal (`conhecimentos-gerais-legislacao`, 7 lições, 39 questões, 16 trechos de lei, PDF de teste de 49 páginas), 03 SUS, Políticas de Saúde e Epidemiologia (`sus-saude-publica`, 8 lições, 27 questões, 76 trechos de lei, 50 páginas), 04 Ética, Relações Humanas, Biossegurança e Prontuário (`etica-biosseguranca`, 7 lições, 26 questões, 10 trechos de lei, 41 páginas). Geram HTML e PDF numerado sem erro. Roteiro em `curso/roteiro-apostilas.md`.
   - **Como retomar (esteira que as outras 5 seguiram):** (a) `git checkout wip/apostilas-02-03-04` (ou criar branch a partir dela); (b) conferência cruzada de cada uma por um Sonnet relendo as fontes, relatório em `curso/auditoria/conferencia-cruzada-0N.md` (briefings dos conferidores: ver o padrão em `curso/auditoria/conferencia-cruzada-01.md` e os pontos delicados abaixo); (c) um Sonnet por arquivo aplica as divergências, ajustando também `qtdQuestoes` da 04 (7 lições com aviso "pedido 8, só N"; valores exatos virão da conferência); (d) `node scripts/gerar-apostila-materia.mjs <id> --pdf`, copiar o PDF de `material-premium/` para `site/apostilas/` e listar o número em `site/dados/apostilas.json`; (e) `node --test tests/gerador.test.mjs`, code-review, PR, merge e conferir a página no ar.
   - **Pontos delicados:** 02 (texto de 2010 da Lei 7.564 desatualizado, Lei Orgânica sem consolidação oficial, a banca marcou a Emenda 52/2022 como verdadeira mas ela exige lei complementar, Blumenau chamado de "químico e farmacêutico" pela Prefeitura contra "médico farmacêutico e filósofo" na questão G0106); 03 (vigência da PNAB e do NASF revogado pela PRT 2.979/2019, Lei 8.142 só no texto original, SIM/SINASC só por busca); 04 (Código de Ética do CFO só em PDF, RDC 222 só em PDF, RDC 1.002/2025 lida em cópia de terceiro, G0301/G0175/G0346 com divergência entre banca e norma).
2. **Itens PENDENTE que sobraram nas apostilas** (01, 05, 06, 07 e 08): dependem de fonte fechada ou ausente (PDFs das provas, livros-texto, edição do Newman & Carranza, técnica de Leonard, diretriz de valvopatias, pKa de outros anestésicos, leucoplasia 2020/2021, tumores benignos e cistos). Resolver quando houver acesso e regerar os PDFs.
3. **PDFs numerados**: as apostilas 01, 05, 06, 07 e 08 estão prontas e publicadas em `site/apostilas/`. Ao mudar um JSON de apostila: regerar com `node scripts/gerar-apostila-materia.mjs <id> --pdf` e copiar o PDF de `material-premium/` para `site/apostilas/`.
4. **Balneário Camboriú:** edital não publicado. Quando sair, atualizar `curso/edital.md`, `site/dados/concurso.json` e rever a legislação municipal das apostilas (principalmente a 02).
5. **Lei Orgânica de Blumenau:** falta o texto consolidado vigente (anexo de 2021 + emendas 52/2022, 53/2025 e 54/2026, sem consolidação oficial).
6. **Lei 7.564/2010:** conferir alterações publicadas depois de 01/10/2026.
7. **PRC 2/2017 (bvsms):** o texto é o atualizado até a PRT GM/MS 12.236 de 25/09/2026; alterações posteriores podem não estar anotadas.
8. **Normas federais:** conferir com o Planalto quando houver rede; hoje a fonte é a Câmara dos Deputados.
9. **Código de Ética do CFO:** vigente = Resolução CFO-118/2012 + CFO-271/2025; não foi possível confirmar que não existe outra resolução alteradora.
10. **Questões com figura ou transcrição suspeita:** conferir no PDF da prova (14 `dependeDeFigura` e 5 `transcricaoSuspeita` no banco) quando os PDFs estiverem disponíveis.
11. **Número de inscritos de 2025** (Clínico Geral 305, Endodontista 29, Buco-Maxilo-Facial 27, Odontopediatra 18, Periodontista 10) não está no site: falta gravá-lo em arquivo de dados versionado antes de exibir.
12. **Capa e e-mails:** este projeto não tem capa de login nem e-mails de marketing em `curso/emails/` (conferido em 2026-11-19: a pasta `curso/emails/` não existe). A novidade de Navegantes entrou só na aba "Concurso" do site.

## Próximos passos
1. Fechar as apostilas 02, 03 e 04 (já montadas na branch `wip/apostilas-02-03-04`): conferência cruzada, correções, PDFs, site, PR (ver "O que falta", item 1).
2. Regra de trabalho do dono (20/11/2026): subagentes só Sonnet, até 5 em paralelo, um arquivo cada.
3. Reconferir Navegantes na véspera do fim das inscrições (25/11/2026) e acompanhar o portal da FURB por edital de Blumenau ou Balneário Camboriú.
