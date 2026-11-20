# Auditoria da Apostila 08: Cirurgia, Anestesia, Farmacologia, Emergências e Patologia Bucal

- **Arquivo auditado:** `curso/apostila/cirurgia-farmacologia-patologia.json`
- **Auditor:** Opus. **Data:** 2026-11-19.
- **Conferido contra:**
  - `curso/roteiro-apostilas.md` (seções 0 e Apostila 08);
  - `curso/radar-banca.json`;
  - `curso/questoes-anteriores.json` (banco);
  - `curso/edital.md`, p. 48-49;
  - fontes públicas, listadas no fim.
- **Limite:** os PDFs das provas não estão nesta máquina. Enunciados e gabaritos foram conferidos só contra o banco.
- **Siglas:**
  - AHA: American Heart Association, a associação norte-americana de cardiologia.
  - BNAI: bloqueio do nervo alveolar inferior.
  - CG: Clínico Geral.
  - IADT: International Association of Dental Traumatology.
  - G0xxx: código do grupo da questão no banco.

## Veredito: PRONTA COM CORREÇÕES LISTADAS

Todos os gabaritos citados nos 56 pontos batem com o banco. A questão anulada (G0360) não tem nenhuma alternativa nem valor ensinado. As lições de Emergências e de Farmacologia **não ensinam conduta, medicação, esquema nem indicação de profilaxia**: conferi frase por frase.

Antes de gerar o PDF, é preciso corrigir:
- **1 achado CRÍTICO:** um macete que ensina um fato errado (C1);
- **3 achados MÉDIOS:** M1 a M3;
- **1 decisão do dono:** a questão G0128 depende de uma figura que falta e vai entrar no treino.

## 1. Contagens: conferem

| Item | Esperado (roteiro e radar) | Na apostila | Contagem direta no banco (`alvo: true`) |
|---|---|---|---|
| Lições | 6 | 6 | n/a |
| Pontos | 56 | 56 (22 + 11 + 9 + 6 + 5 + 3) | n/a |
| Questões únicas | 63 | 63 | 63 (cir 28, pato 12, anest 9, farm 6, anat 5, emerg 3) |
| Anuladas | 1 (G0360, farm) | 1 | 1 |
| Questões usáveis | 62 | soma de `qtdQuestoes`: 28 + 12 + 9 + 5 + 5 + 3 = 62 | 62 |
| Questões por edição | tabela do roteiro | intros | batem 100% |
| Questões em prova de CG | 4 / 7 / 3 / 4 / 2 / 0 | iguais | batem |

Sobram 0 questões; esta apostila não terá simulado.

## 2. Estrutura: confere
- `titulo` sem "Apostila 08".
- `arquivoPdf` = `apostila-08-cirurgia-farmacologia-patologia.pdf`.
- `numero` = 8.
- `comoUsar` com os três avisos obrigatórios, mais um aviso forte de que a apostila "não é protocolo de atendimento".
- Nada do modelo FUNDATEC nem da FAURGS: a busca por "Brigada", "FUNDATEC", "FAURGS" e "HCPA" deu 0 ocorrências.
- As citações do edital conferem com `curso/edital.md`:
  - "diérese, hemostasia, síntese", parte do Buco-Maxilo-Facial, p. 48-49;
  - "tumores benignos e malignos...", "lesões císticas" e "patologia das glândulas salivares", parte do Clínico Geral, p. 49.

## 3. Achados, por gravidade

| # | Gravidade | Onde | Problema | Correção sugerida (texto exato) |
|---|---|---|---|---|
| C1 | **CRÍTICO** | L2 Patologia, `macete` | O macete diz "paramixovírus de RNA e incubação curta = sarampo". A caxumba **também** é causada por um paramixovírus (CDC, ver fontes), e ela era justamente uma alternativa errada da G0067. "Incubação curta" também não tem fonte: a própria questão fala em 8 a 12 dias. O aluno decoraria "paramixovírus = sarampo" e erraria uma questão de caxumba. | Trocar o trecho por: "(toxina eritrogênica = escarlatina; paramixovírus com lesões na pele e na boca de crianças = sarampo, lembrando que a caxumba também é paramixovírus, mas ataca a parótida; soalho da boca = rânula; placa branca que não sai à raspagem = leucoplasia)". Na pegadinha G0053, trocar "(esse é o sarampo)" por "(paramixovírus causa sarampo e caxumba, não varicela)". |
| M1 | MÉDIO | L3 Anestesia, ponto "Referências ósseas · mandíbula" (G0234), e a `intro` da lição | O ponto afirma "G0234 (2023, fonte no enunciado: Reher, 2020, cap. 25)". No banco, o enunciado da G0234 **não cita fonte nenhuma**. Só citam Reher a G0236 (p. 375, nesta lição) e a G0228 (p. 377, Lição de Anatomia). A intro diz "Duas questões de 2023 trazem a fonte no próprio enunciado", mas nesta lição é só uma. | No ponto: "G0234 (2023; o enunciado não cita fonte; a questão irmã G0236 cita Reher, 2020, cap. 25, p. 375): ...". Na intro: "Uma questão desta lição (G0236) traz a fonte no enunciado: Reher, Peter. Anatomia Aplicada à Odontologia, 3ª ed., GEN, 2020, cap. 25, p. 375; a G0228, da Lição de Anatomia, cita a p. 377." No ponto G0236, acrescentar "p. 375". |
| M2 | MÉDIO (decisão do dono) | L1 Cirurgia, `qtdQuestoes: 28`, e a questão G0128 | O ponto avisa que a G0128 depende das "figuras B e D", que não estão no banco, e que "não dá para treinar sem a imagem". Mesmo assim, com `qtdQuestoes` igual a 28, o gerador **vai imprimir a G0128 no treino** sem a figura. Baixar `qtdQuestoes` para 27 não resolve: o gerador escolhe pela recência e cortaria uma questão de 2019, não a G0128. | Não dá para corrigir só pelo JSON. O dono decide entre: (a) um Sonnet cria no gerador ou no banco uma marca de "questão sem figura, fora do treino", com code-review; ou (b) aceitar e acrescentar ao ponto: "A G0128 vai aparecer nas questões sem a figura; pule-a." |
| M3 | MÉDIO | L1, ponto "odontossíntese × osteossíntese" (G0208), e a linha "Odontossíntese" da `tabela` | A "regra de estudo" ("paciente com dentes suficientes, a banca pensa em odontossíntese; sem dentes ou com fratura que exige fixar o osso, pensa em osteossíntese") vai além da questão. A tabela também generaliza: "indicada ao paciente dentado com fratura de corpo da mandíbula". Fratura de corpo de mandíbula em paciente dentado também é tratada com fixação no osso (miniplacas). O aluno pode errar uma questão sobre fixação interna. | No ponto, trocar a regra por: "Regra de estudo: nesta questão, para o paciente dentado com fratura de corpo, a banca marcou odontossíntese. Não generalize: o tratamento depende do tipo de fratura (PENDENTE: livro de cirurgia)." Na tabela: "Fixação a fio metálico apoiada nos dentes; foi a resposta da G0208 (paciente dentado, fratura de corpo mandibular)". |
| M4 | MÉDIO | L6 Emergências, ponto "Crise hipertensiva" (G0029) | O texto já avisa a dúvida e marca PENDENTE. Isso é bom. Mas o aluno fica só com os valores da prova de 2019 (diastólica > 130; sistólica até 250). As referências brasileiras atuais usam outros números. | Se o dono aprovar a fonte, acrescentar: "Para comparação: o Posicionamento Luso-Brasileiro de Emergências Hipertensivas (Arq Bras Cardiol 2020;114(4):736) descreve a crise hipertensiva, em geral, com PAS ≥ 180 e PAD ≥ 120 mmHg. Para a prova, vale o gabarito." Antes de publicar, conferir esse número no PDF do artigo (eu o li só no resumo da busca) e verificar a Diretriz Brasileira de Hipertensão de 2025, que segundo fonte secundária mudou o critério. |
| M5 | MÉDIO | L1, ponto "terço médio da face" (G0125) | O ponto diz "Não decore essa afirmação: ela foi o item errado", mas não diz **qual parte** está errada. O item mistura duas frases. Pela lógica do tratamento das fraturas, o erro mais provável é a ordem: primeiro se colocam os dentes em oclusão, depois se reduzem as fraturas. Não conferi isso no livro. | Acrescentar: "PENDENTE: o item mistura duas afirmações; conferir no livro de cirurgia qual está invertida (provavelmente a ordem: em geral, primeiro se restabelece a oclusão e depois se reduzem as fraturas)." |
| B1 | BAIXO | L3, ponto G0365 | "O bissulfito de sódio é o **conservante** do vasoconstritor": tecnicamente, é o **antioxidante** que protege o vasoconstritor. | "O bissulfito de sódio é o antioxidante (conservante) do vasoconstritor; a solução sem vasoconstritor não o contém." |
| B2 | BAIXO | L4 Farmacologia, pontos G0212 e G0356 | A busca confirmou a declaração científica da AHA de 2021 (Wilson et al., Circulation 2021;143(20):e963-e978): amoxicilina em criança 50 mg/kg, dose única de 30 a 60 minutos antes. Ela também restringe a profilaxia aos grupos de maior risco (prótese valvar, endocardite prévia, certas cardiopatias congênitas, transplante cardíaco). Febre reumática sozinha não aparece nessa lista. Portanto, a dúvida sobre a G0212 procede. | Opcional, se o dono aprovar a fonte: em G0356, trocar "NÃO está confirmado em diretriz" por "o valor coincide com a declaração da AHA de 2021 (Wilson et al., Circulation 2021;143:e963-e978), que confirmei só em resumo secundário; conferir no texto original antes de qualquer uso clínico". **Não** acrescentar lista de indicações nem esquema adulto: a apostila deve continuar sem ensinar conduta. |
| B3 | BAIXO | L2, ponto G0249 (caxumba) | A dúvida está bem marcada. Falta dizer que pus no ducto é sinal da forma bacteriana. | Acrescentar: "(na caxumba, em geral não há pus no ducto; supuração aponta para a parotidite bacteriana; PENDENTE: livro de patologia)". |
| B4 | BAIXO | L2, ponto G0135 (leucoplasia) | A definição da questão é a clássica da OMS. A OMS revisou a definição depois. | Acrescentar: "É a definição clássica, usada pela banca; a OMS revisou a redação depois (PENDENTE: definição vigente)." |
| B5 | BAIXO | L1, ponto G0213 | Correto. Opcional: dizer que a contenção segue a diretriz de trauma. | Nenhuma correção obrigatória. A busca indica que a IADT de 2020 recomenda contenção flexível por cerca de 4 semanas nas fraturas radiculares do terço apical e médio, mas não pus esse número no texto. Deixe sem número. |
| B6 | BAIXO | `ranking` | Anestesia e Anatomia não dizem quantas questões caíram em prova de CG, ao contrário das outras lições (são 3 e 2). | "Anestesia local (9 questões únicas; 4 edições; 3 em prova de CG)" e "Anatomia de cabeça e pescoço (5 questões únicas; 3 edições; 2 em prova de CG)". |

**Itens que conferi e estão corretos** (sem correção):
- Cirurgia: G0040, G0130, G0209, G0310, G0049 (dúvida bem tratada), G0214, G0210, G0215, G0308, G0038, G0033, G0032, G0206, G0216, G0225, G0233, G0226, G0120, G0122, G0127, G0207, G0131, G0124 e G0309.
- Patologia: G0067, G0053, G0133, G0159, G0314, G0044, G0076, G0184, G0045 e G0315.
- Anestesia: G0034, G0211, G0154, G0162, G0171, G0205 e G0236.
- Farmacologia: G0052 (C–B–D–A = metronidazol, tetraciclinas, clindamicina, penicilinas, linha a linha), G0368 e G0132.
- Anatomia: G0074, G0149, G0158, G0228 e G0232.
- Emergências: G0030 e G0068.

## 4. Números: todos vêm de questão real

| Número | Questão | Situação |
|---|---|---|
| Amoxicilina 50 mg/kg, 1 hora antes | G0356 | Bate com o banco e está marcado "NÃO confirmado". Coincide com a AHA de 2021 (B2). As doses erradas (15, 25, 7,5 e 100 mg/kg) aparecem só como erradas. |
| 1 hora antes | G0212 | Bate. Os prazos errados (7, 10, 21 e 5 dias) aparecem só como errados. |
| pKa 7,6 da mepivacaína | G0211 | Bate ("valor do enunciado"). Não traz o pKa de outros anestésicos. |
| Mepivacaína 3% sem vasoconstritor | G0365 | Bate; PENDENTE. |
| Diastólica > 130, sistólica até 250 | G0029 | Bate; DÚVIDA e PENDENTE. Ver M4. |
| Relaxante muscular de 10 dias a 2 semanas | G0132 | Bate ("número da prova"). |
| Percentual unilateral (96%) | G0124 | A apostila **não escreve o número**, só avisa que existe. Está ok. |
| Incubação de 8 a 12 dias (sarampo) | G0067 | Bate; PENDENTE. |
| 2 a 6 dias (varicela) | G0053 | Aparece só como afirmativa errada. |
| 7 a 14 semanas (herpes) | G0314 | Aparece só como afirmativa falsa. |
| 2 a 5 minutos (convulsão) | G0068 | Bate ("número do enunciado"). |
| Analgésicos pediátricos | G0360, anulada | Nenhum valor usado. Correto. |

**Lição de Emergências:** confirmado que não ensina posição do paciente, medicação, oxigênio nem quando chamar socorro. Só diz "PENDENTE: protocolo citado".

**Lição de Farmacologia:** confirmado que não ensina quem precisa de profilaxia, qual antibiótico nem dose de adulto. Só os dois números da prova, marcados. O único medicamento citado como tratamento é o aciclovir na G0159 (patologia), sem dose, como alternativa da banca. Está aceitável.

## 5. Dúvidas de gabarito marcadas pelos Sonnets: minha avaliação
- **G0049** (contraindicações de exodontia): procede. O enunciado fala em contraindicação, e a resposta é uma indicação. O texto está seguro.
- **G0368** (álcool e antibiótico): procede. A explicação da banca (absorção) não vale como regra geral. O texto está seguro.
- **G0212** (febre reumática): procede. Na AHA de 2021, febre reumática sozinha não está entre os grupos de maior risco (B2). O texto está seguro, porque não ensina indicação.
- **G0029** (valores de pressão): procede. Ver M4.
- **G0249** (caxumba com supuração): procede. Ver B3.
- **G0184** (infecção latente, "vêm e vão"): dúvida fraca. A associação oficial é aceitável. Está ok.
- **G0125:** o texto não marca dúvida, mas deixa o aluno sem saber qual parte é falsa. Ver M5.
- **G0130:** sem problema. "Jamais" é o erro.
- **G0309:** sem problema. A candidose hiperplásica não sai à raspagem.
- **G0128:** depende da figura. Ver M2.

## 6. O que confirmei em fonte (busca de 2026-11-19)
- **AHA 2021:** Wilson et al., "Prevention of Viridans Group Streptococcal Infective Endocarditis", Circulation 2021;143(20):e963-e978. Grupos de maior risco listados; amoxicilina 50 mg/kg para criança, 30 a 60 minutos antes. A dose foi vista em resumos secundários.
  - https://pubmed.ncbi.nlm.nih.gov/33853363/
  - https://mss.apps.dental.upenn.edu/?p=355
  - https://newsroom.heart.org/news/good-dental-health-may-help-prevent-heart-infection-from-mouth-bacteria
- **A caxumba é causada por paramixovírus** (família Paramyxoviridae): CDC, https://www.cdc.gov/mumps/hcp/clinical-overview/index.html
- **Crise hipertensiva, PAS ≥ 180 e PAD ≥ 120 mmHg** (Posicionamento Luso-Brasileiro 2020): https://scielo.br/pdf/abc/v114n4/0066-782X-abc-114-04-0736.pdf. O número foi lido no resumo da busca, não no PDF.
- **Diretriz brasileira de 2025, ≥ 180 e/ou ≥ 110:** só em fonte secundária, https://portal.afya.com.br/cardiologia/sbc-2025-nova-diretriz-brasileira-de-hipertensao-arterial-sistemica. Não confirmado na diretriz.
- **IADT 2020, contenção de fratura radicular:** o número de semanas veio de fontes secundárias (https://www.aae.org/specialty/wp-content/uploads/sites/2/2019/02/19_TraumaGuidelines.pdf). Não foi usado no texto.

## 7. O que NÃO confirmei
- O texto das questões contra os PDFs das provas, inclusive a figura da G0128.
- Os pKa (G0211), a incubação do sarampo (G0067), a duração da convulsão (G0068), o tempo dos relaxantes musculares (G0132) e os efeitos adversos da G0052 em livro de farmacologia.
- Qual frase da G0125 está invertida, no livro de cirurgia (Peterson/Hupp).
- A definição vigente de leucoplasia da OMS.
- A redação vigente da Diretriz Brasileira de Hipertensão.
- O texto integral da AHA de 2021: as doses vieram de resumos.
- O livro de Reher (2020), citado pela banca.
