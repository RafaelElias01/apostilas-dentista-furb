# Auditoria de fatos: Apostila 07 (Periodontia)

- **Arquivo auditado:** `curso/apostila/periodontia.json`
- **Data:** 2026-11-19. Auditor: Opus. Só auditoria; a apostila **não** foi alterada.
- **Comparei com:** `curso/questoes-anteriores.json` (o banco de questões; questões de Blumenau e as 6 de outros municípios citadas), `curso/radar-banca.json`, `curso/roteiro-apostilas.md` (seções 0 e Apostila 07) e `curso/edital.md`.
- **Limite:** os PDFs originais das provas não estão nesta máquina.

## Veredito: PRONTA COM CORREÇÕES LISTADAS

Todos os gabaritos citados batem com o banco. Nenhum número foi escrito sem questão de origem. A classificação nova não inventa ano nem critério: está marcada como PENDENTE.

Há dois achados MÉDIOS:
- a questão G0178, que pode ter o enunciado transcrito ao contrário;
- a contagem das questões “todas corretas”.

## 1. Contagens (conferidas)

| Item | Esperado | Na apostila | Banco (contei eu) | Situação |
|---|---|---|---|---|
| Lições | 1 | 1 | — | OK |
| Pontos | 27 | 27 | — | OK |
| Questões únicas | 38 | 38 | 38 (`perio`, `alvo: true`) | OK |
| Anuladas | 1 | 1 (G0264) | 1 (G0264) | OK |
| Na lição / simulado | 27 + 10 | `qtdQuestoes` 27; 37 usáveis | 37 usáveis | OK |
| Por edição | 13 / 7 / 12 / 4 / 2 | igual | igual | OK |
| Em prova do Clínico Geral | 4 | 4 | G0041, G0307 (comum aos 5 cargos), G0371, G0373 | OK |
| Subassuntos | 38 | 8 + 7 + 5 + 4 + 3 + 2×4 + 1×3 | — | OK |
| Edições no ranking | — | 2019/2021P; 2019/2023/2025; 2023; 2019/2021P/2021C; 2019/2021P/2023 | conferido grupo a grupo | OK |

## 2. Achados, por gravidade

| # | Grav. | Onde | O que está errado ou duvidoso | Correção sugerida (texto exato) |
|---|---|---|---|---|
| 1 | MÉDIO | Ponto 20 “fumo e periodonto” (G0178) e mapa | No banco, G0178 pede a alternativa **CORRETA**, e o gabarito é **B** (“o tabagismo causa processo inflamatório na mucosa bucal”). Mas as alternativas A, C, D e E são todas verdadeiras na literatura. Já a G0272, da mesma banca, diz que o tabaco **diminui** a inflamação gengival. Hipótese forte, não confirmada: o enunciado original pedia a **INCORRETA**, e a transcrição trocou a palavra. Com essa leitura, B seria a única falsa, coerente com G0272. Do jeito que está, o aluno decora duas frases que se contradizem. | “G0178 (2021): no banco, o enunciado pede a alternativa CORRETA e o gabarito oficial é B (‘o tabagismo causa processo inflamatório na mucosa bucal’). Isso não fecha: as outras quatro (cicatrização alterada, mais perda óssea, baixa resposta imune e vasoconstrição, fator de risco para a doença periodontal) são verdadeiras, e a G0272 diz que o fumo DIMINUI a inflamação gengival visível. É provável que o enunciado original pedisse a INCORRETA (conferir no PDF da prova). Para estudar: o fumo é fator de risco para a periodontite e mascara a inflamação (menos sangramento); não decore a alternativa B como verdade.” Mapa: trocar “Tabaco é fator de risco” por “Fumo: fator de risco e mascara a inflamação”. |
| 2 | MÉDIO | `comoUsar[8]` e pegadinha 8 | Faltam questões na lista das que tinham todas as afirmativas corretas. A apostila lista 5 de 2023 (G0262, G0263, G0265, G0266, G0268) e diz “cinco questões”. Falta **G0261** (gabarito A = I, II, III e IV). Em 2023, foram **seis** de seis questões nesse formato. Em 2025, G0307 (A = I, II e III) também. | `comoUsar[8]`: “Em 2023, todas as seis questões de afirmativas numeradas tinham TODAS as afirmativas corretas (G0261, G0262, G0263, G0265, G0266 e G0268); em 2025, G0307 também.” Pegadinha 8: “G0261, G0262, G0263, G0265, G0266 e G0268 (2023) e G0307 (2025): todas as afirmativas estavam corretas. Quem procura o ‘intruso’ erra.” |
| 3 | BAIXO | Ponto 1 “as duas classificações”, `comoUsar[6]`, `limiteFonte` (dúvida: classificação atual) | O texto atual está **seguro**: diz só “estágios e graus” e deixa nome, ano e critérios como PENDENTE. Confirmei em fonte o nome e a data do consenso, e os estágios I a IV. Os rótulos e limites dos graus (A, B e C) eu **não** confirmei. | Se quiser tirar parte do PENDENTE: “A classificação atual vem do World Workshop de 2017 (Workshop Mundial sobre a Classificação das Doenças e Condições Periodontais e Peri-Implantares), organizado pela Academia Americana de Periodontia (AAP) e pela Federação Europeia de Periodontia (EFP), com os trabalhos publicados em 2018 (Caton e colaboradores, Journal of Periodontology, vol. 89, suplemento 1). A periodontite passa a ser descrita por estágio (de I a IV: gravidade e complexidade do tratamento) e por grau (risco de progressão, que considera fatores como fumo e diabetes). PENDENTE: os critérios numéricos de cada estágio e grau, conforme livro citado.” Não escrever as letras A, B e C nem números sem conferir o artigo de Tonetti, Greenwell e Kornman (2018). |
| 4 | BAIXO | Ponto 18 (G0176, dúvida de gabarito) | O texto está seguro e segue o gabarito. O gabarito (antibiótico não é “metodologia de tratamento da placa”) é defensável: a placa é um biofilme, e o tratamento dela é desorganizar mecanicamente e controlar com químicos; o antibiótico é coadjuvante no tratamento da periodontite, não da placa. | Trocar a frase do PENDENTE por: “O gabarito é defensável: a placa (biofilme) se trata com remoção mecânica e controle químico; antibiótico local ou sistêmico é coadjuvante no tratamento da periodontite, e não um método de tratar a placa. Para a prova, siga o gabarito.” |
| 5 | BAIXO | Ponto 9 “células do epitélio” (G0080) | “As células de Langerhans aparecem como alternativa errada” pode levar o aluno a achar que elas não são do epitélio. Elas são do epitélio, mas de defesa (apresentam antígenos). Só não sintetizam pigmento nem têm função sensorial. | “As células de Langerhans também ficam no epitélio, mas são células de defesa; por isso não eram a resposta.” |
| 6 | BAIXO | Ponto 19 “critérios de causalidade” (G0082) | O PENDENTE do nome dos critérios é prudente. Os quatro itens correspondem aos critérios de causalidade conhecidos da epidemiologia (força da associação, dose-resposta, consistência e especificidade), em geral atribuídos a Bradford Hill. **Não confirmei** em fonte nesta auditoria. | Manter o PENDENTE ou, depois de conferir: “(são critérios clássicos de causalidade: força da associação, dose-resposta, consistência e especificidade)”. |
| 7 | BAIXO | Ponto 4 “periodontite agressiva” (G0180) | Correto. Observação: em G0180, a banca deu como **não incorreta** a alternativa A (“cálculo e biofilme são a causadora da periodontite agressiva”), que é discutível: na periodontite agressiva, a quantidade de depósitos costuma ser desproporcional à destruição, como diz a G0085 A. A apostila não repete essa frase, e está certa em não repetir. | Nenhuma mudança obrigatória. Não acrescentar a alternativa A como verdade. |

## 3. Conferência de gabaritos e exemplos (todos contra o banco)

Bate com o banco tudo o que a apostila afirma das questões G0041, G0080, G0081, G0082, G0083, G0084, G0085, G0086, G0088, G0089, G0090, G0091, G0092, G0172, G0176, G0177, G0180, G0181, G0182, G0261, G0262, G0263, G0265, G0266, G0267, G0268, G0269, G0270, G0271, G0272, G0307, G0322, G0323, G0324, G0371 e G0373. A exceção é a G0178 (achado 1).

Os números do texto vêm todos de questão real:
- 60%, 5%, 35% e 28%: G0269.
- 1 mm: G0307.
- 3 mm: G0324.
- 2 mm e 28 dentes: G0088.

O complemento de outros municípios confere com o banco. As questões são de Biguaçu 2025 e Itapema 2025 (provas da FURB, `alvo: false`), com gabaritos G0558 A, G0561 C, G0564 A, G0588 D, G0590 B e G0637 A. Estão bem rotuladas como “não entram na contagem de Blumenau”. Não há conteúdo de FAURGS nem de FUNDATEC.

## 4. Dúvidas já marcadas pelo Sonnet: minha avaliação

- **G0176:** siga o gabarito. O texto está seguro e pode ficar mais claro (achado 4).
- **G0178:** é o achado mais importante desta apostila. O texto atual faz o aluno decorar B como verdade (achado 1).
- **Classificação atual:** está descrita de modo seguro, sem ano nem critério inventado. Há texto opcional com fonte no achado 3.

## 5. Questões anuladas

Esta apostila tem uma questão anulada: G0264. Ela só aparece como “anulada, não existe resposta oficial”. Nenhuma alternativa dela é ensinada. OK.

## 6. Estrutura

- Título “Periodontia”, sem “Apostila 07”: OK.
- `arquivoPdf` = `apostila-07-periodontia.pdf`: OK.
- Nenhuma frase copiada do `_modelo-portugues.json` (conferi frase por frase).
- Nenhuma menção a FAURGS, FUNDATEC ou HCPA.

## 7. O que confirmei em fonte (2026-11-19)

- **Consenso de 2017:** o World Workshop AAP/EFP foi realizado em Chicago, em novembro de 2017. Os trabalhos foram publicados em 2018 (Caton et al., J Periodontol 2018;89 Suppl 1:S1–S8; também J Clin Periodontol 2018;45 Suppl 20). Estágios de I (menos grave) a IV (mais grave); o grau considera fatores de risco como fumo e diabetes. Fontes:
  - [AAP, comunicado à imprensa](https://www.perio.org/press-release/american-academy-of-periodontology-releases-proceedings-from-the-2017-world-workshop-on-the-classification-of-periodontal-and-peri-implant-diseases-and-conditions/)
  - [EFP, notícia](https://www.efp.org/news-events/news/proceedings-of-ground-breaking-world-workshop-on-new-classification-are-published-30194/)
  - [PubMed 29926495 (Tonetti, Greenwell e Kornman, 2018)](https://pubmed.ncbi.nlm.nih.gov/29926495/)

## 8. O que NÃO confirmei

- Os rótulos e limites dos graus A, B e C e os limites numéricos dos estágios.
- O nome dos critérios de causalidade de G0082 (achado 6).
- O texto do Newman & Carranza nas 12 questões de 2023, porque o livro não está disponível. Os 60/5/35% da G0269 e o “tabaco diminui o sangramento” da G0272 são coerentes com o que é amplamente ensinado, mas não conferi no livro.
- O enunciado original da G0178 e de todas as questões, por falta do PDF das provas. Também não rodei o gerador.
