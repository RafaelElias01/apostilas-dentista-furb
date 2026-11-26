# Proposta 2026-11-26: lesão endoperiodontal (Apostilas 06 e 07)

Tarefa só de pesquisa e proposta. Nenhum JSON foi alterado. Feito por um Sonnet em 26/11/2026.
Tudo o que está abaixo precisa de "aprovado" do dono antes de ir para as apostilas (é texto que o leitor vê).

## 1. Situação atual no projeto

### Banco de questões (curso/questoes-anteriores.json)
Só **uma** questão toca o tema na amostra inteira:

- **G0091**, Blumenau 2019, PSPS 002/2019, Cirurgião Dentista Periodontista, questão 39 (fonte: `fontes/blumenau-2019-psps-002/provas/CIRURGIAO-DENTISTA-PERIODONTISTA.pdf`, p. 9).
  Enunciado: dentes "não aconselháveis para tratamento devem ser extraídos durante a terapia inicial relacionada à causa"; critérios para identificá-los.
  Gabarito oficial **A** (preliminar A, sem alteração): "Perda de inserção até o ápice e lesões endoperiodontais."
  Erradas: fratura coronária de esmalte e dentina sem exposição pulpar e sem envolvimento periodontal; cárie ativa em margem de restauração; perda de inserção no terço cervical; envolvimento pulpar agudo.
  Ou seja: a banca tratou "lesão endoperiodontal" como critério de dente inviável. Nenhuma questão cobrou classificação, graus ou diagnóstico diferencial. Amostra pequena: 1 questão.

### Marcas PENDENTE nas apostilas
Apostila 06 (`curso/apostila/dentistica-endodontia-trauma.json`):
- `$.limiteFonte` (última frase): "Lesão endoperiodontal e infecções odontogênicas gerais continuam PENDENTE."
- `$.licoes[0].intro`: "... e lesão endoperiodontal (esboço PENDENTE)."
- `$.licoes[0].pontos[28].ref`: "Lesão endoperiodontal · esboço (PENDENTE)"
- `$.licoes[0].pontos[28].texto`: esboço com o PENDENTE sobre classificação, diagnóstico diferencial e sequência de tratamento (Herrera et al.).
- `$.licoes[0].mapa.ramos[4].f[5]`: "Lesão endoperiodontal (PENDENTE)"
- `$.licoes[0].pontos[27].texto` (cirurgia perirradicular, RCS 2020) já cita “a combined periodontal-endodontic lesion” como contraindicação. Não precisa mudar.

Apostila 07 (`curso/apostila/periodontia.json`):
- `$.limiteFonte`: "lesão endoperiodontal, cirurgia mucogengival e cicatrização ficam sem texto clínico por falta de fonte aberta."
- `$.comoUsar[4]`: "11) itens PENDENTES sem fonte aberta (lesão endoperiodontal, cirurgia mucogengival, cicatrização)."
- `$.licoes[0].pontos[29]` (ponto 11): item (a) "lesão endoperiodontal (inter-relações endodônticas e periodontais), com abscesso periodontal".
- `$.licoes[0].pontos[23].texto` (ponto 6) já explica a G0091. Não precisa mudar.

## 2. Fontes procuradas (acesso em 26/11/2026)

| Fonte | Resultado |
|---|---|
| Herrera D, Retamal-Valdes B, Alonso B, Feres M. J Clin Periodontol 2018;45(Suppl 20):S78-S94. DOI 10.1111/jcpe.12941. PMID 29926493. | **Texto completo NÃO aberto.** https://onlinelibrary.wiley.com/doi/full/10.1111/jcpe.12941 e o PDF indicado pelo Unpaywall (https://onlinelibrary.wiley.com/doi/pdfdirect/10.1111/jcpe.12941) responderam **HTTP 403**. Não contornei. |
| Mesmo artigo, J Periodontol 2018;89(Suppl 1):S85-S102. DOI 10.1002/JPER.16-0642. PMID 29926942. | **Texto completo NÃO aberto** (https://aap.onlinelibrary.wiley.com/doi/full/10.1002/JPER.16-0642 deu HTTP 403). **Resumo oficial lido** pela API do Europe PMC: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:29926942%20AND%20SRC:MED&resultType=core&format=json (o resumo é o mesmo nas duas revistas, conferido nos dois registros). |
| **EFP, "Systemic and other periodontal conditions" — Guidance for clinicians (report 03)**, autor Søren Jepsen, publicado em março de 2019, European Federation of Periodontology. | **Aberto e lido (fonte oficial da EFP, coorganizadora do World Workshop 2017).** https://www.efp.org/publications/projects/new-classification/guidance/report-03.pdf (redireciona para https://www.efp.org/fileadmin/uploads/efp/Documents/Campaigns/New_Classification/Guidance_Notes/report-03.pdf), p. 6. SHA-256 do PDF baixado: a1fb6b0629e50e07faca922f1039637f7f4250229b30993d7008f567074e1059. Cita Herrera et al. S78-S94 em "Further reading". |
| EFP, "Periodontitis" — Guidance for clinicians (report 02), Mariano Sanz e Maurizio Tonetti, março de 2019. | Aberto e lido: https://www.efp.org/publications/projects/new-classification/guidance/report-02.pdf, p. 2-3. SHA-256: 78f2e82a37c3ef32ff6b5798c4c7a89bad95c5116d55d8653f323f7ca1afdbe4. |
| PMC8836831 (Dembowska et al., J Clin Med 2022, doi:10.3390/jcm11030811, CC BY 4.0) e PMC10053371 (Mahasneh et al., J Clin Med 2023, doi:10.3390/jcm12062423, CC BY) | Lidos pela API de texto completo do Europe PMC (a página do PMC pediu CAPTCHA; não contornei). São fontes **secundárias** que reproduzem a tabela. Usadas só para conferência cruzada, não como fonte da apostila. |
| Cópia do artigo em www.umw.edu.pl (Article6.pdf) | **Não usada**: site de terceiro, sem confirmação de que a cópia é autorizada. |

## 3. Achados com citação literal

### 3.1 Resumo oficial de Herrera et al. 2018 (Europe PMC, PMID 29926942 e 29926493)
- "Although PA, NPD, and EPL occur with relatively low frequency, these lesions are of clinical relevance, because they require immediate management and might severely compromise the prognosis of the tooth."
- "PA and EPL are normally associated with deep periodontal pockets, bleeding on probing, suppuration, and almost invariably, with pain. EPL are also associated with endodontic pathology."
- "The available data suggested that the prognosis of PA and EPL are worse in periodontitis than in nonperiodontitis patients. Lesions associated with root damage, such as fractures and perforations, had the worst prognosis."
- "EPLs should be classified according to signs and symptoms that have direct impact on their prognosis and treatment, such as presence or absence of fractures and perforations, and presence or absence of periodontitis."
- "In general, the evidence available to define these three conditions was considered limited."

(PA = abscesso periodontal; NPD = doenças periodontais necrosantes; EPL = lesão endoperiodontal.)

### 3.2 EFP report 03 (2019), p. 6: definição e classificação
- "Endo-periodontal lesions should be classified according to signs and symptoms that have direct impact on their prognosis and treatment (such as the presence or absence of fractures and perforations, and the presence or absence of periodontitis)."
- **Definição:** "Case definition: An endo-periodontal lesion is a pathological communication between the pulpal and periodontal tissues at a given tooth that may occur in an acute or a chronic form. The primary signs associated with this lesion are deep periodontal pockets extending to the root apex and/or a negative/altered response to pulp-vitality tests."
- **Outros sinais:** "Other signs/symptoms may include: (a) radiographic evidence of bone loss in the apical or furcation region, (b) spontaneous pain or pain on palpation/percussion, (c) purulent exudate/suppuration, (d) tooth mobility, (e) sinus tract/fistula, (f) crown and/or gingival colour alterations."
- **Dano radicular:** "Signs observed in endo-periodontal lesions associated with traumatic and/or iatrogenic factors may include root perforation, fracture/cracking, or external root resorption. These conditions drastically impair the prognosis of the involved tooth."
- **Tabela "Classification of endo-periodontal lesions"** (literal):
  - "Endo-periodontal lesion with root damage": "Root fracture or cracking"; "Root-canal or pulp-chamber perforation"; "External root resorption".
  - "Endo-periodontal lesion without root damage": "Endo-periodontal lesion in periodontitis patients" e "Endo-periodontal lesion in non-periodontitis patients", cada um com: "Grade 1 - narrow deep periodontal pocket in one tooth surface"; "Grade 2 - wide deep periodontal pocket in one tooth surface"; "Grade 3 - deep periodontal pocket in more than one tooth surface".
- Legenda da foto: "Endo-periodontal lesion (Grade 3) in a periodontitis patient (Photo: H. Dommisch)".

### 3.3 EFP report 02 (2019), p. 2-3: diagnóstico diferencial com periodontite
O paciente é caso de periodontite quando há perda de inserção, e "The observed CAL cannot be ascribed to non-periodontal causes such as: ... 4. An endodontic lesion draining through the marginal periodontium; 5. The occurrence of a vertical root fracture."

### 3.4 EFP report 03 (2019), p. 5-6: abscesso periodontal (item (a) do ponto 11 da Apostila 07)
- "Case definition: A periodontal abscess is a localised accumulation of pus located within the gingival wall of the periodontal pocket/sulcus, resulting in a significant tissue breakdown. The primary detectable signs or symptoms associated with a periodontal abscess may involve ovoid elevation in the gingiva, along the lateral part of the root, and bleeding on probing. Other signs and symptoms include pain, suppuration on probing, deep periodontal pockets, and increased tooth mobility."
- "A periodontal abscess may develop in a pre-existing periodontal pocket - for example, in patients with untreated periodontitis, under supportive therapy, after scaling and root planing, or after systemic antimicrobial therapy. A periodontal abscess occurring at a site that was previously periodontally healthy is commonly associated with a history of impaction or harmful habits."
- Tabela "Classification of periodontal abscesses based on the aetiological factors involved": "Periodontal abscess in periodontitis patients (in a pre-existing periodontal pocket)" e "Periodontal abscess in non periodontitis patients (not mandatory to have a pre-existing periodontal pocket)". (O detalhamento das subcategorias da tabela saiu desalinhado na extração do PDF; não o uso abaixo.)

### 3.5 O que as fontes NÃO dizem
- **Sequência de tratamento:** nenhum trecho lido (resumo de Herrera, EFP 02 e 03) descreve sequência de tratamento (o que fazer primeiro, canal ou raspagem). O resumo só diz que as lesões "require immediate management" e que a classificação tem "direct impact on their prognosis and treatment". **Não escrevi nenhuma sequência.** As fontes secundárias (PMC8836831) falam de tratamento "two-pronged", mas é um estudo-piloto com laser, não a diretriz; não foi usado.
- **Diagnóstico diferencial detalhado** (testes, imagem, como distinguir fratura de perfuração): só o que está em 3.2 e 3.3.
- A antiga classificação de Simon et al. (primária endodôntica, primária periodontal etc.) aparece só em fonte secundária (PMC10053371); não proposta.

### 3.6 Divergência encontrada (conferência cruzada)
A tabela da fonte secundária PMC10053371 escreve o grau 3 como "narrow, deep periodontal pocket in more than one tooth surface"; a EFP (oficial) e a PMC8836831 não têm "narrow" no grau 3. A proposta segue a EFP. Também a PMC10053371 diz que as duas categorias "were subdivided into three grades each", o que contraria a tabela oficial (graus só na lesão sem dano radicular).

### 3.7 Ressalva de fonte
O texto da EFP é um guia oficial que resume o World Workshop 2017 (AAP/EFP); não é o artigo de Herrera em si. Não deu para confirmar se a "case definition" é cópia literal do artigo de Herrera ou do relatório de consenso (Papapanou et al. 2018). Por isso a proposta cita a EFP como fonte e o resumo de Herrera como apoio.

## 4. Propostas ANTES / DEPOIS

### Apostila 06 (curso/apostila/dentistica-endodontia-trauma.json)

**Mudança 06-1** — `$.licoes[0].pontos[28].ref`
- ANTES: "Lesão endoperiodontal · esboço (PENDENTE)"
- DEPOIS: "Lesão endoperiodontal · definição e classificação (World Workshop 2017)"

**Mudança 06-2** — `$.licoes[0].pontos[28].texto`
- ANTES (literal): "Lesão endoperiodontal é aquela em que a infecção do sistema de canais e a do periodonto se juntam. Na G0091 (prova de Periodontia, 2019) a banca a pôs entre os critérios de dente não aconselhável para tratamento. Na cirurgia perirradicular ela é fator limitante: a diretriz do RCS England (2020) lista como contraindicação o caso em que o exame clínico e radiográfico ou a exploração cirúrgica sugerem “a combined periodontal-endodontic lesion”. PENDENTE: classificação, diagnóstico diferencial (dano radicular como fratura, perfuração, reabsorção) e sequência de tratamento, que dependem do artigo de Herrera et al. (J Periodontol 2018;89 Suppl 1:S85-S102), cujo texto completo não foi aberto; nada disso foi escrito. Infecções odontogênicas além do abscesso periapical agudo (celulite, espaços fasciais, conduta geral): também PENDENTE, sem fonte aberta lida."
- DEPOIS: "Definição: é uma comunicação patológica entre a polpa e o periodonto de um mesmo dente, na forma aguda ou crônica (“a pathological communication between the pulpal and periodontal tissues at a given tooth that may occur in an acute or a chronic form”). Sinais principais: bolsa periodontal profunda que chega ao ápice e/ou resposta negativa ou alterada ao teste de vitalidade pulpar (“deep periodontal pockets extending to the root apex and/or a negative/altered response to pulp-vitality tests”). Outros sinais possíveis: perda óssea apical ou na furca na radiografia; dor espontânea ou à palpação/percussão; pus; mobilidade; fístula; alteração de cor da coroa e/ou da gengiva. Classificação (World Workshop 2017): 1) COM dano radicular: fratura ou trinca de raiz; perfuração do canal ou da câmara pulpar; reabsorção radicular externa. 2) SEM dano radicular: em paciente com periodontite ou em paciente sem periodontite; nos dois casos há 3 graus: grau 1 = bolsa profunda e estreita em uma face do dente; grau 2 = bolsa profunda e larga em uma face; grau 3 = bolsa profunda em mais de uma face. O que pesa na classificação é o que muda prognóstico e tratamento: ter ou não fratura/perfuração e ter ou não periodontite (“presence or absence of fractures and perforations, and presence or absence of periodontitis”). Prognóstico: perfuração, fratura/trinca e reabsorção externa “drastically impair the prognosis”; e, pelo resumo de Herrera et al., o prognóstico é pior em quem tem periodontite e o pior de todos é o da lesão com dano radicular (“Lesions associated with root damage, such as fractures and perforations, had the worst prognosis”). Diagnóstico diferencial: a EFP manda não atribuir à periodontite a perda de inserção causada por lesão endodôntica que drena pelo periodonto marginal ou por fratura radicular vertical. Na prova: a G0091 (Periodontia, 2019) pôs a lesão endoperiodontal entre os critérios de dente inviável (gabarito A); na cirurgia perirradicular ela é fator limitante: a diretriz do RCS England (2020) lista como contraindicação o caso em que se suspeita de “a combined periodontal-endodontic lesion”. Macete: primeiro pergunte “tem dano na raiz?”; se não tem, pergunte “o paciente tem periodontite?”; depois gradue pela bolsa (estreita, larga, mais de uma face). Pegadinha provável: dizer que a classificação nova separa “primária endodôntica” de “primária periodontal” (as fontes lidas não usam esse critério). PENDENTE: sequência de tratamento (as fontes lidas não a descrevem; nada foi escrito) e o texto completo de Herrera et al. (J Clin Periodontol 2018;45 Suppl 20:S78-S94, doi:10.1111/jcpe.12941; também J Periodontol 2018;89 Suppl 1:S85-S102, doi:10.1002/JPER.16-0642), que deu acesso negado (403). Fontes: European Federation of Periodontology, Systemic and other periodontal conditions, Guidance for clinicians (S. Jepsen, março de 2019), p. 6, https://www.efp.org/publications/projects/new-classification/guidance/report-03.pdf; EFP, Periodontitis, Guidance for clinicians (M. Sanz e M. Tonetti, março de 2019), p. 2-3, https://www.efp.org/publications/projects/new-classification/guidance/report-02.pdf; resumo oficial de Herrera et al. 2018 no Europe PMC (PMID 29926942); conferidos em 26/11/2026. Tradução livre do autor. Infecções odontogênicas além do abscesso periapical agudo (celulite, espaços fasciais, conduta geral): também PENDENTE, sem fonte aberta lida."

  Observação: a frase "Pegadinha provável" é inferência do autor (não é da fonte). Se o dono preferir, retirar.

**Mudança 06-3** — `$.licoes[0].mapa.ramos[4].f[5]`
- ANTES: "Lesão endoperiodontal (PENDENTE)"
- DEPOIS: "Lesão endoperiodontal (EFP 2019)"

**Mudança 06-4** — `$.licoes[0].intro` (só o trecho final)
- ANTES: "... odontometria e localizador (AAE 2019), cirurgia perirradicular (RCS England 2020) e lesão endoperiodontal (esboço PENDENTE)."
- DEPOIS: "... odontometria e localizador (AAE 2019), cirurgia perirradicular (RCS England 2020) e lesão endoperiodontal (definição e classificação do World Workshop 2017, pelo guia da EFP 2019; tratamento PENDENTE)."

**Mudança 06-5** — `$.limiteFonte` (só a última frase)
- ANTES: "Lesão endoperiodontal e infecções odontogênicas gerais continuam PENDENTE."
- DEPOIS: "Acrescentado em 26/11/2026: lesão endoperiodontal (definição, sinais e classificação) pelo guia oficial da European Federation of Periodontology, Systemic and other periodontal conditions (S. Jepsen, 2019, report-03.pdf, p. 6) e Periodontitis (M. Sanz e M. Tonetti, 2019, report-02.pdf), PDFs abertos, trechos literais conferidos nessa data, mais o resumo oficial de Herrera et al. 2018 (Europe PMC, PMID 29926942); o texto completo de Herrera et al. não foi aberto (403). Sequência de tratamento da lesão endoperiodontal e infecções odontogênicas gerais continuam PENDENTE."

### Apostila 07 (curso/apostila/periodontia.json)

**Mudança 07-1** — novo ponto, inserido antes do atual ponto 11 (`$.licoes[0].pontos[29]`), renumerando o ponto 11 para 12. (Alternativa sem renumerar: pôr este texto como novo ponto "11" e o atual ponto 11 virar "12"; o gerador precisa ser conferido para ver se a ordem/numero importam.)
- ANTES: não existe.
- DEPOIS (`ref`): "11. Lesão endoperiodontal e abscesso periodontal (1 questão: G0091; item do edital do Periodontista)"
- DEPOIS (`texto`): "Na prova: a única questão é a G0091 (2019): dente com perda de inserção até o ápice e lesão endoperiodontal é dente inviável, a extrair na terapia inicial (A); veja o ponto 6. Lesão endoperiodontal: “a pathological communication between the pulpal and periodontal tissues at a given tooth that may occur in an acute or a chronic form”, ou seja, comunicação patológica entre polpa e periodonto do mesmo dente, aguda ou crônica. Sinais principais: bolsa profunda até o ápice e/ou resposta negativa ou alterada ao teste de vitalidade pulpar. Outros: perda óssea apical ou na furca na radiografia, dor espontânea ou à palpação/percussão, pus, mobilidade, fístula, alteração de cor da coroa e/ou da gengiva. Classificação (World Workshop 2017): COM dano radicular (fratura ou trinca de raiz; perfuração do canal ou da câmara pulpar; reabsorção radicular externa) ou SEM dano radicular, este em paciente com periodontite ou sem periodontite, com 3 graus: grau 1 = bolsa profunda e estreita em uma face; grau 2 = bolsa profunda e larga em uma face; grau 3 = bolsa profunda em mais de uma face. Prognóstico: o dano radicular “drastically impair[s] the prognosis”; pelo resumo de Herrera et al. 2018, o prognóstico é pior em quem tem periodontite e o pior de todos é o da lesão com fratura ou perfuração. Diagnóstico de periodontite: a perda de inserção causada por lesão endodôntica que drena pelo periodonto marginal ou por fratura radicular vertical NÃO conta como periodontite (EFP, report 02). Abscesso periodontal: “a localised accumulation of pus located within the gingival wall of the periodontal pocket/sulcus, resulting in a significant tissue breakdown”; sinais principais: elevação ovoide da gengiva ao longo da face lateral da raiz e sangramento à sondagem; outros: dor, pus à sondagem, bolsa profunda e mais mobilidade. Classificação pela causa: em paciente com periodontite (numa bolsa que já existia: periodontite não tratada, em terapia de suporte, depois de raspagem ou de antibiótico sistêmico) ou em paciente sem periodontite (sem precisar de bolsa prévia; em geral por impactação de corpo estranho ou hábito nocivo). Macete: endoperio = primeiro “tem dano na raiz?”, depois “tem periodontite?”, depois o grau pela bolsa; abscesso periodontal = pus na parede da bolsa, classificado pela causa. PENDENTE: sequência de tratamento da lesão endoperiodontal e tratamento do abscesso (as fontes lidas não descrevem; nada foi escrito); texto completo de Herrera et al. (J Clin Periodontol 2018;45 Suppl 20:S78-S94, doi:10.1111/jcpe.12941), acesso negado (403). Fontes: European Federation of Periodontology, Systemic and other periodontal conditions, Guidance for clinicians (S. Jepsen, março de 2019), p. 5-6, https://www.efp.org/publications/projects/new-classification/guidance/report-03.pdf; EFP, Periodontitis, Guidance for clinicians (M. Sanz e M. Tonetti, março de 2019), https://www.efp.org/publications/projects/new-classification/guidance/report-02.pdf; resumo oficial de Herrera et al. 2018 no Europe PMC (PMID 29926493 e 29926942); conferidos em 26/11/2026. Tradução livre do autor, não é texto oficial em português."

**Mudança 07-2** — atual `$.licoes[0].pontos[29]` (vira ponto 12)
- ANTES (`ref`): "11. Itens do edital do Periodontista sem fonte aberta (PENDENTE)"
- DEPOIS (`ref`): "12. Itens do edital do Periodontista sem fonte aberta (PENDENTE)"
- ANTES (`texto`): "PENDENTE: sem fonte aberta. Estes itens do edital do Periodontista não têm questão na amostra e não receberam texto clínico, porque não foi possível abrir uma fonte oficial para conferir: (a) lesão endoperiodontal (inter-relações endodônticas e periodontais), com abscesso periodontal; (b) cirurgia mucogengival (recessão, enxerto, frenectomia); (c) cicatrização após tratamento ou cirurgia periodontal. Eles só serão explicados quando houver fonte literal conferida. Não estude estes tópicos por esta apostila; a única questão que toca o primeiro é G0091 (dentes inviáveis incluem os com lesões endoperiodontais), já citada em outro ponto desta apostila."
- DEPOIS (`texto`): "PENDENTE: sem fonte aberta. Estes itens do edital do Periodontista não têm questão na amostra e não receberam texto clínico, porque não foi possível abrir uma fonte oficial para conferir: (a) cirurgia mucogengival (recessão, enxerto, frenectomia); (b) cicatrização após tratamento ou cirurgia periodontal; (c) sequência de tratamento da lesão endoperiodontal e tratamento do abscesso periodontal (a definição e a classificação dos dois estão no ponto 11). Eles só serão explicados quando houver fonte literal conferida. Não estude estes tópicos por esta apostila."

**Mudança 07-3** — `$.comoUsar[4]` (só o trecho final)
- ANTES: "... 10) manutenção periodontal (complemento); 11) itens PENDENTES sem fonte aberta (lesão endoperiodontal, cirurgia mucogengival, cicatrização). Os pontos 8 a 10 vêm da diretriz EFP 2020 (Sanz et al.), com as recomendações conferidas no texto aberto."
- DEPOIS: "... 10) manutenção periodontal (complemento); 11) lesão endoperiodontal e abscesso periodontal (definição e classificação); 12) itens PENDENTES sem fonte aberta (cirurgia mucogengival, cicatrização, tratamento da lesão endoperiodontal e do abscesso). Os pontos 8 a 10 vêm da diretriz EFP 2020 (Sanz et al.), com as recomendações conferidas no texto aberto; o ponto 11 vem dos guias oficiais da EFP de 2019 sobre a classificação de 2017."
  Atenção: o texto atual diz "4 pontos finais sem questão na amostra"; com o novo ponto 11 (que tem a G0091) a contagem muda. Sugestão: "Depois, 4 pontos finais que entram por serem itens do edital do Periodontista (só o 11 tem questão, a G0091): ..." — confirmar com o dono.

**Mudança 07-4** — `$.limiteFonte` (só a frase do PENDENTE)
- ANTES: "PENDENTE: definição de furca classe I a III (não conferida); lesão endoperiodontal, cirurgia mucogengival e cicatrização ficam sem texto clínico por falta de fonte aberta."
- DEPOIS: "PENDENTE: definição de furca classe I a III (não conferida); cirurgia mucogengival, cicatrização e o tratamento da lesão endoperiodontal e do abscesso periodontal ficam sem texto clínico por falta de fonte aberta. O ponto 11 (lesão endoperiodontal e abscesso periodontal: definição e classificação) usa os guias oficiais da European Federation of Periodontology de março de 2019 (report-03, S. Jepsen; report-02, M. Sanz e M. Tonetti) e o resumo oficial de Herrera et al. 2018 (Europe PMC), conferidos em 26/11/2026; o texto completo de Herrera et al. não foi aberto (403)."

## 5. O que continua PENDENTE
1. **Texto completo de Herrera et al. 2018** (JCP S78-S94 e J Periodontol S85-S102): Wiley/AAP deram 403. Precisa de PDF obtido pelo dono (acesso institucional). Sem ele, não há como citar o artigo além do resumo.
2. **Sequência de tratamento da lesão endoperiodontal** (canal primeiro ou raspagem primeiro, tempo de espera, reavaliação): nenhuma fonte lida a descreve. Nada escrito.
3. **Tratamento do abscesso periodontal** (drenagem, antibiótico etc.): não está nos trechos lidos. Nada escrito.
4. **Diagnóstico diferencial detalhado** (testes e imagem para separar fratura, perfuração e reabsorção): só o que está nos trechos de 3.2 e 3.3.
5. Doenças periodontais necrosantes (também do artigo de Herrera): não pedidas nesta tarefa; não pesquisadas.
6. Apostila 06: infecções odontogênicas gerais (celulite, espaços fasciais) continuam PENDENTE.
7. Cirurgia mucogengival e cicatrização (Apostila 07) continuam PENDENTE.

## 6. Contagem
- Apostila 06: 5 mudanças (06-1 a 06-5).
- Apostila 07: 4 mudanças (07-1 a 07-4), sendo 07-1 um ponto novo.
- Total: **9 propostas ANTES/DEPOIS**. Nenhuma aplicada; aguardam "aprovado".
