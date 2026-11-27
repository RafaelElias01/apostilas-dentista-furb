# Proposta 27/11/2026: Periodontia (Apostila 07) e Endodontia (Apostila 06): doenças necrosantes, tratamento da lesão endoperiodontal e do abscesso periodontal

Esta tarefa foi só de pesquisa e proposta. Nenhum JSON foi alterado. Um Sonnet fez o trabalho em 27/11/2026.
Tudo abaixo é texto que o leitor vê: precisa de "aprovado" do dono antes de ir para as apostilas.

## 0. Resumo

| PENDENTE | Situação | Fonte |
|---|---|---|
| (2) Os três nomes das doenças periodontais necrosantes (2017) | **RESOLVIDO**: gengivite necrosante, periodontite necrosante e estomatite necrosante. Também ficou confirmada a divisão por tipo de paciente, que estava PENDENTE na proposta de 26/11. | Papapanou et al. 2018, consenso do grupo 2 do World Workshop 2017, **versão publicada** (texto completo) no repositório institucional da Universidade de Genebra |
| (1a) Tratamento da lesão endoperiodontal | **PARCIAL**: há uma sequência oficial brasileira (Ministério da Saúde, 2018). Ela tem uma divergência interna, mostrada abaixo. O artigo de Herrera 2018 continua fechado. | MS, *A Saúde Bucal no Sistema Único de Saúde* (2018), p. 222-223 |
| (1b) Tratamento do abscesso periodontal | **CONTINUA PENDENTE** quanto à técnica (drenagem, raspagem, antibiótico: nenhuma fonte aberta descreve). Foram confirmados só: a urgência do caso, o fato de ser atendimento da Atenção Básica e a drenagem de abscessos como procedimento de urgência em geral. | Papapanou 2018, p. S174 e S180; MS 2018, p. 89 e 143 |

Conferência por script (`conferir-perio27.mjs`, na pasta temporária, fora do repositório): o script tira o texto de cada página exata do PDF com `pdftotext -f N -l N` e procura o trecho. Resultado: **24/24 trechos OK** (P1 a P15 com P13 dividido em dois, e M1 a M7 com M1 dividido em dois).

## 1. Fontes (acesso em 27/11/2026)

### F1. Papapanou et al. 2018: consenso do grupo 2 (texto completo, versão publicada)
- Citação: Papapanou PN, Sanz M, Buduneli N, et al. Periodontitis: Consensus report of workgroup 2 of the 2017 World Workshop on the Classification of Periodontal and Peri-Implant Diseases and Conditions. *J Periodontol* 2018;89(Suppl 1):S173-S182. doi:10.1002/JPER.17-0721.
- URL do registro: https://archive-ouverte.unige.ch/unige:111638
- URL do PDF: https://access.archive-ouverte.unige.ch/access/metadata/b8d269d8-8fec-4d9a-94ea-047e4f1f249a/download (HTTP 200, application/pdf, 537.205 bytes). SHA-256: `05b841a8a36dae8ed35a7028adf5b394082de0b8f31ed994aa8626192496d789`.
- Por que é fonte aceitável: é o repositório institucional oficial da Universidade de Genebra (um dos coautores, A. Mombelli, é de lá). A capa diz: "Published version Public access" e "This is the published version of the publication, made available in accordance with the publisher's policy." Não houve 403, paywall nem CAPTCHA.
- O que é: o **relatório de consenso** do grupo que aprovou a classificação. Ele resume o artigo de Herrera et al. 2018 (ref. 5 do próprio relatório) e é o documento que fixa a classificação, por isso serve como fonte primária da classificação. Não é o artigo de Herrera.
- Páginas: PDF p. 1 = capa do repositório; PDF p. 2 = S173; p. 3 = S174; p. 5 = S176; p. 6 = S177; p. 9 = S180; p. 10 = S181 (número impresso em cada página).

### F2. Ministério da Saúde, *A Saúde Bucal no Sistema Único de Saúde* (Brasília, 2018)
- URL: https://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal_sistema_unico_saude.pdf (HTTP 200, 5.030.526 bytes). SHA-256: `c4e52f8b534ca004932fd0b5b43c504578fdb5d14409447a4a1115aa3876c6ee`.
- É a mesma publicação oficial já usada na Apostila 08 (HIV). Páginas impressas: p. 89 (PDF 90), p. 143 (PDF 144), p. 222-223 (PDF 223-224); seção 6.2.2.4 Periodontia (ações do CEO).
- Ressalva: é um **protocolo de serviço do SUS** (organização do CEO e da Atenção Básica), não uma diretriz clínica baseada em revisão sistemática. Usa nomes antigos ("Guna", "lesões endoperio").

### Fontes procuradas e NÃO usadas
| Fonte | Resultado |
|---|---|
| Herrera et al. 2018, J Periodontol 89 Suppl 1:S85-S102 (doi:10.1002/JPER.16-0642) | Para o Unpaywall o artigo é "bronze" (grátis no site da editora), em https://onlinelibrary.wiley.com/doi/pdfdirect/10.1002/JPER.16-0642. O pedido deu **HTTP 403** em 27/11/2026. Não contornei. |
| Herrera et al. 2018, J Clin Periodontol 45 Suppl 20:S78-S94 (doi:10.1111/jcpe.12941) | Para o Unpaywall está "closed", sem cópia aberta. |
| Docta Complutense (repositório da Univ. Complutense de Madri, registro do artigo de Herrera) | O arquivo está marcado como **acesso restrito**. Não usei. |
| Cópia em www.umw.edu.pl (Article6.pdf) | Site de terceiro, sem confirmação de que a cópia é autorizada (mesma decisão de 26/11). Não usei. |
| Diretriz EFP S3 2020 (Sanz et al., PMC7891343) | Texto aberto, lido pela API do Europe PMC. Só **lista** abscesso, lesão endoperiodontal e doenças necrosantes como condições à parte (cita Herrera 2018) e não dá tratamento para elas. |
| MS, Caderno de Atenção Básica 17, *Saúde Bucal* (2006/2008), https://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal.pdf | Aberto. Diz só que "O tratamento das urgências periodontais (processo periodontal agudo) deverá ser realizado preferencialmente nas Unidades Básicas de Saúde e/ou de pronto-atendimento" (seção 6.3.1). Não traz técnica. A edição de 2018 (F2) substitui este caderno. |

## 2. Trechos literais

### Papapanou et al. 2018 (F1)
- **P1** (S174, resumo): "Necrotizing periodontal diseases, whose characteristic clinical phenotype includes typical features (papilla necrosis, bleeding, and pain) and are associated with host immune response impairments, remain a distinct periodontitis category."
- **P2** (S174, resumo): "Periodontal abscesses are defined as acute lesions characterized by localized accumulation of pus within the gingival wall of the periodontal pocket/sulcus, rapid tissue destruction and are associated with risk for systemic dissemination."
- **P3** (S177, rodapé da Tabela 2 "Classification of necrotizing periodontal diseases (NPD)"): "NG, necrotizing gingivitis; NP, necrotizing periodontitis; NS, necrotizing stomatitis."
- **P4 e P5** (S177, Tabela 2, coluna "Category"): "Necrotizing periodontal diseases in chronically, severely compromised patients" e "Necrotizing periodontal diseases in temporarily and/or moderately compromised patients".
- **P6** (S177, Tabela 2, coluna "Clinical condition"): "NG, NP, NS, Noma. Possible progression". Ressalva: pelo alinhamento da tabela no PDF, esta célula fica na linha dos pacientes crônica e gravemente comprometidos. As outras linhas da tabela saíram desalinhadas na extração. Por isso **não uso** o detalhe linha a linha da tabela (fatores predisponentes e progressão por linha).
- **P7** (S180): "Necrotizing periodontal diseases are strongly associated with impairment of the host immune system, as follows: (1) in chronically, severely compromised patients (e.g., AIDS patients, children suffering from severe malnourishment, extreme living conditions, or severe infections) and may constitute a severe or even life-threating condition; and (2) in temporarily and/or moderately compromised patients (e.g., in smokers or psycho-socially stressed adult patients)." ("life-threating" está assim no original.)
- **P8** (S180): "Necrotizing gingivitis is an acute inflammatory process of the gingival tissues characterized by presence of necrosis/ulcer of the interdental papillae, gingival bleeding, and pain. Other signs/symptoms associated with this condition may include halitosis, pseudomembranes, regional lymphadenopathy, fever, and sialorrhea (in children)."
- **P9** (S180): "Necrotizing periodontitis is an inflammatory process of the periodontium characterized by presence of necrosis/ulcer of the interdental papillae, gingival bleeding, halitosis, pain, and rapid bone loss. Other signs/symptoms associated with this condition may include pseudomembrane formation, lymphadenopathy, and fever."
- **P10** (S180): "Necrotizing stomatitis is a severe inflammatory condition of the periodontium and the oral cavity in which soft tissue necrosis extends beyond the gingiva and bone denudation may occur through the alveolar mucosa, with larger areas of osteitis and formation of bone sequestrum. It typically occurs in severely systemically compromised patients. Atypical cases have also been reported, in which necrotizing stomatitis may develop without prior appearance of necrotizing gingivitis/periodontitis lesions."
- **P11** (S180): "Periodontal abscesses, lesions from necrotizing periodontal diseases and acute presentations of endo-periodontal lesions, share the following features that differentiate them from periodontitis lesions: (1) rapid-onset, (2) rapid destruction of periodontal tissues, underscoring the importance of prompt treatment, and (3) pain or discomfort, prompting patients to seek urgent care."
- **P12** (S180, sobre o abscesso periodontal): "in contrast to a chronic inflammatory lesion, has a greater potential for resolution if quickly managed."
- **P13** (S180-S181): "The term endo-periodontal lesion describes a pathologic communication between the pulpal and periodontal tissues at a given tooth that may be triggered by a carious or traumatic lesion that affects the pulp and, secondarily, affects the periodontium; by periodontal destruction that secondarily affects the root canal; or by concomitant presence of both pathologies."
- **P14** (S181): "Nonetheless, the communication between the pulp/root canal system and the periodontium complicates the management of the involved tooth."
- **P15** (S176): "Periodontal abscesses most frequently occur in preexisting periodontal pockets and should be classified according to their etiology."

### Ministério da Saúde 2018 (F2)
- **M1** (p. 222-223, seção 6.2.2.4, item "Tratamento das lesões endoperio"): "A ocorrência concomitante e comunicante de lesões endodôntica e periodontal caracteriza as lesões endoperio. Para o diagnóstico, observa-se presença de patologia pulpar irreversível/necrose da polpa, comunicando-se com destruição do periodonto marginal. Nesses casos, o protocolo mais usado seria descobrir a causa da lesão (fator etiológico). Dentes com cáries extensas, tratamento endodônticos insatisfatórios podem ser os fatores etiológicos. Logo, iniciar pelo tratamento de canal. Concomitantemente, e com o paciente em fase de curativo endodôntico, dá-se início à raspagem periodontal."
- **M2** (p. 223): "Entre 90 e 120 dias após o término do último tratamento (periodontal), o paciente deverá ser reavaliado no CEO. A radiografia periapical é recomendada após seis meses do fim do tratamento."
- **M3** (p. 223): "Pacientes que não responderam ao tratamento deverão receber nova análise, combinando os profissionais responsáveis pelos tratamentos endodôntico e periodontal."
- **M4** (p. 223, quadro "Sequência de intervenção"): "Tratamento endodôntico, conforme protocolo convencional." / "Aguardar período de cicatrização após tratamento endodôntico, variando entre 30 e 90 dias." / "Realização de tratamento periodontal (raspagem e alisamento radicular subgengival com ou sem acesso cirúrgico)."
- **M5** (p. 143, seção 6.1.2.3.3 Periodontia, Atenção Básica): "Também deverão ser realizados os tratamentos de urgência (gengivite ulcerativa necrozante aguda – Guna; gengivoestomatite-herpética aguda e abscessos)." ("necrozante" está assim no original.)
- **M6** (p. 89, seção 6.1.1.6, consulta de urgência): "Faz-se necessária a realização efetiva de procedimentos odontológicos, tais como acesso endodôntico, exodontias, drenagens de abscessos, entre outros, e não apenas medicação e encaminhamento."
- **M7** (p. 89): "A maioria das urgências odontológicas envolve casos de infecções agudas com origem endodôntica ou periodontal."

### Divergências e cuidados encontrados
- **D1. Divergência dentro do próprio texto do MS (M1 x M4).** O parágrafo diz para começar a raspagem *ao mesmo tempo*, "com o paciente em fase de curativo endodôntico". O quadro "Sequência de intervenção", na mesma página, diz para *aguardar 30 a 90 dias* depois do canal e só então fazer o tratamento periodontal. A única coisa que os dois trechos têm em comum é que **o canal vem primeiro**. A proposta mostra as duas versões e não escolhe entre elas.
- **D2. Diagnóstico: MS x World Workshop 2017.** O MS (M1) pede patologia pulpar irreversível ou necrose comunicando com destruição do periodonto marginal. A definição de 2017 (já na apostila, EFP/Papapanou) fala em bolsa profunda até o ápice e/ou resposta "negativa/alterada" ao teste de vitalidade. Não são iguais. A proposta usa o MS só para o tratamento.
- **D3. MS: "iniciar pelo tratamento de canal" vale para causa endodôntica.** O texto liga essa ordem aos fatores etiológicos que cita ("cáries extensas, tratamento endodônticos insatisfatórios"). O MS não diz o que fazer quando a causa é periodontal. Isso fica PENDENTE.
- **D4. "Pegadinha provável" da Apostila 06 (primária endodôntica x primária periodontal).** O consenso (P13) descreve as três origens possíveis: polpa afetando o periodonto, periodonto afetando o canal, ou as duas juntas. Mas ele classifica pela presença de dano radicular e de periodontite. A dica do autor continua certa quanto à *classificação*. Para não confundir, sugiro deixar claro que a *origem* ainda é descrita (ver 06-1).
- **D5. Nome antigo x novo.** O MS 2018 ainda usa "gengivite ulcerativa necrozante aguda – Guna" (M5), e a banca usou "periodontite ulcerativa necrosante" em 2021. Nenhuma fonte lida diz, em frase literal, que o nome antigo foi substituído pelo novo. A equivalência continua como "Dica do autor".

## 3. Propostas ANTES / DEPOIS

### PENDENTE (2): doenças necrosantes, Apostila 07 (`curso/apostila/periodontia.json`)

**Mudança 07-N1**: `$.licoes[0].pontos[5].texto` (linha 111 do arquivo). O `ref` não muda.

ANTES (só o 1º parágrafo; o resto do texto, de "O que a banca cobrou." até o fim, **não muda**):
> O que a classificação de 2017 diz. A classificação do World Workshop 2017 (AAP/EFP) reconhece três formas de periodontite: periodontite, periodontite necrosante e periodontite como manifestação direta de doença sistêmica (tradução livre; EFP, guia "Periodontitis", Sanz e Tonetti, 2019, p. 1). A periodontite necrosante se caracteriza por história de dor, ulceração da margem gengival e/ou depósitos de fibrina em locais com papilas gengivais "decapitadas" e, em alguns casos, exposição do osso alveolar marginal (tradução livre; mesmo guia, p. 4). As doenças periodontais necrosantes têm três sinais típicos: dor, sangramento e ulceração da papila interdental (tradução livre; Herrera et al., 2018, resumo). Elas estão claramente associadas à resposta imune do hospedeiro, e a progressão, a extensão e a gravidade dependem principalmente de fatores do hospedeiro (tradução livre; Herrera et al., 2018, resumo). Fontes: https://www.efp.org/publications/projects/new-classification/guidance/report-02.pdf e resumo de Herrera et al. 2018 (J Periodontol 89 Suppl 1:S85-S102, PMID 29926942), consultados em 26/11/2026.

DEPOIS (1º parágrafo novo; os trechos acrescentados são os que citam Papapanou):
> O que a classificação de 2017 diz. A classificação do World Workshop 2017 (AAP/EFP) reconhece três formas de periodontite: periodontite, periodontite necrosante e periodontite como manifestação direta de doença sistêmica (tradução livre; EFP, guia "Periodontitis", Sanz e Tonetti, 2019, p. 1). As doenças periodontais necrosantes são três: gengivite necrosante (GN), periodontite necrosante (PN) e estomatite necrosante (EN) ("NG, necrotizing gingivitis; NP, necrotizing periodontitis; NS, necrotizing stomatitis"; Papapanou et al., 2018, Tabela 2, p. S177). Gengivite necrosante: inflamação aguda da gengiva, com necrose ou úlcera das papilas interdentais, sangramento gengival e dor; pode ter também halitose, pseudomembranas, linfonodos aumentados, febre e, em crianças, sialorreia. Periodontite necrosante: os mesmos sinais, mais halitose e perda óssea rápida; pode ter pseudomembrana, linfonodos aumentados e febre. Estomatite necrosante: quadro grave em que a necrose passa da gengiva, o osso pode ficar exposto pela mucosa alveolar, com osteíte e sequestro ósseo; ocorre em geral em pacientes com comprometimento sistêmico grave e pode aparecer sem gengivite ou periodontite necrosante antes (tradução livre; Papapanou et al., 2018, p. S180). A tabela da classificação cita também o noma (p. S177). A periodontite necrosante se caracteriza por história de dor, ulceração da margem gengival e/ou depósitos de fibrina em locais com papilas gengivais "decapitadas" e, em alguns casos, exposição do osso alveolar marginal (tradução livre; EFP, mesmo guia, p. 4). As doenças periodontais necrosantes têm três sinais típicos: dor, sangramento e ulceração da papila interdental (tradução livre; Herrera et al., 2018, resumo). Elas estão fortemente ligadas à falha da defesa do hospedeiro, e a classificação separa dois tipos de paciente: 1) com comprometimento crônico e grave (por exemplo, pacientes com aids, crianças com desnutrição grave, condições de vida extremas ou infecções graves), em quem a doença pode ser grave e até ameaçar a vida; 2) com comprometimento temporário e/ou moderado (por exemplo, fumantes ou adultos com estresse psicossocial) (tradução livre; Papapanou et al., 2018, p. S180 e Tabela 2). São lesões de início rápido, com destruição rápida do periodonto e dor, o que mostra a importância de tratar logo (tradução livre; Papapanou et al., 2018, p. S180). Macete: necrosante = papila "cortada" + dor + sangramento; GN fica na gengiva, PN leva osso, EN passa da gengiva. Fontes: Papapanou PN, Sanz M et al. Periodontitis: Consensus report of workgroup 2 of the 2017 World Workshop, J Periodontol 2018;89(Suppl 1):S173-S182, doi:10.1002/JPER.17-0721, versão publicada em acesso público no repositório da Universidade de Genebra (https://archive-ouverte.unige.ch/unige:111638), conferida em 27/11/2026; https://www.efp.org/publications/projects/new-classification/guidance/report-02.pdf e resumo de Herrera et al. 2018 (J Periodontol 89 Suppl 1:S85-S102, PMID 29926942), consultados em 26/11/2026.

Notas da 07-N1:
- A frase do resumo de Herrera "Elas estão claramente associadas à resposta imune do hospedeiro, e a progressão, a extensão e a gravidade dependem principalmente de fatores do hospedeiro" foi trocada pela versão mais completa do consenso (P7), que diz a mesma coisa e acrescenta os dois tipos de paciente. Se o dono preferir, as duas podem ficar.
- O que a banca cobrou continua compatível: G0177 (fatores de risco: estresse, tabagismo, HIV) bate com P7 (fumantes, estresse, aids). Hipertensão não aparece em P7. Halitose e perda óssea rápida, do enunciado da G0081, estão em P9: a G0081 descreve, quase palavra por palavra, a definição de periodontite necrosante de 2017.
- A "Dica do autor" (nome antigo x novo) continua como está. Sugiro acrescentar, no fim dela: "O Ministério da Saúde (A Saúde Bucal no SUS, 2018, p. 143) ainda usa o nome antigo 'gengivite ulcerativa necrozante aguda – Guna'." (M5, literal).
- O macete é do autor (não é da fonte). Como as outras dicas, deve levar a marca "Dica do autor (não é da fonte)" se o dono quiser manter o padrão.

**Mudança 07-N2**: `$.licoes[0].pontos[14].texto` (linha 120). Nenhuma mudança é obrigatória. A frase já aplicada (Papapanou, resumo) continua certa, e agora foi conferida no texto completo (P1).

### PENDENTE (1): tratamento da lesão endoperiodontal e do abscesso periodontal

#### Apostila 07 (`curso/apostila/periodontia.json`)

**Mudança 07-E1**: `$.licoes[0].pontos[29].texto` (linha 135, ponto 11). Só o trecho do PENDENTE muda; o resto fica igual.

ANTES (literal):
> PENDENTE: sequência de tratamento da lesão endoperiodontal e tratamento do abscesso (as fontes lidas não descrevem; nada foi escrito); texto completo de Herrera et al. (J Clin Periodontol 2018;45 Suppl 20:S78-S94, doi:10.1111/jcpe.12941), acesso negado (403).

DEPOIS:
> Por que é urgente: abscesso periodontal, doenças necrosantes e a forma aguda da lesão endoperiodontal têm em comum o início rápido, a destruição rápida do periodonto e a dor; por isso o tratamento deve ser rápido (“underscoring the importance of prompt treatment”). O abscesso pode se espalhar pelo organismo (“risk for systemic dissemination”) e, ao contrário da lesão crônica, tem mais chance de resolver se tratado logo (tradução livre; Papapanou et al., 2018, p. S174 e S180). No SUS, as urgências como a Guna e os abscessos são tratadas na Atenção Básica (MS, A Saúde Bucal no SUS, 2018, p. 143), e o atendimento de urgência deve fazer o procedimento, por exemplo a drenagem de abscessos, “e não apenas medicação e encaminhamento” (p. 89). Tratamento da lesão endoperiodontal segundo o Ministério da Saúde (2018, p. 222-223): procurar a causa; se a causa é endodôntica (cárie extensa, canal mal feito), começar pelo tratamento de canal. Atenção: o mesmo texto traz duas versões para o momento da raspagem. O parágrafo diz para começar a raspagem junto, “com o paciente em fase de curativo endodôntico”. O quadro “Sequência de intervenção” diz: canal; depois esperar a cicatrização, de 30 a 90 dias; depois raspagem e alisamento subgengival, com ou sem acesso cirúrgico. Nas duas versões, o canal vem primeiro. Reavaliar no CEO 90 a 120 dias após o fim do tratamento periodontal; radiografia periapical 6 meses após o fim; se não responder, endodontista e periodontista reavaliam juntos. Macete: endoperio de causa endodôntica = canal primeiro, raspagem depois (ou durante o curativo). Lembre que o consenso de 2017 classifica a lesão pelo dano radicular e pela periodontite, não pela origem; a origem pode ser a polpa, o periodonto ou os dois (Papapanou et al., 2018, p. S180-S181). PENDENTE: técnica de tratamento do abscesso periodontal (drenagem, raspagem, uso ou não de antibiótico): nenhuma fonte aberta lida a descreve, e nada foi escrito; conduta da lesão endoperiodontal de causa periodontal e da lesão com dano radicular (fratura, perfuração); texto completo de Herrera et al. (J Clin Periodontol 2018;45 Suppl 20:S78-S94, doi:10.1111/jcpe.12941; J Periodontol 2018;89 Suppl 1:S85-S102, doi:10.1002/JPER.16-0642), acesso negado (403 em 26 e 27/11/2026).

E na lista de fontes do mesmo ponto, acrescentar antes de "Tradução livre do autor":
> Papapanou PN, Sanz M et al., Consensus report of workgroup 2 of the 2017 World Workshop, J Periodontol 2018;89(Suppl 1):S173-S182, versão publicada no repositório da Universidade de Genebra (https://archive-ouverte.unige.ch/unige:111638); Ministério da Saúde, A Saúde Bucal no Sistema Único de Saúde, Brasília, 2018, p. 89, 143 e 222-223 (https://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal_sistema_unico_saude.pdf); conferidos em 27/11/2026.

**Mudança 07-E2**: `$.licoes[0].pontos[30].texto` (linha 136, ponto 12). Muda só o item (c).

ANTES: "(c) sequência de tratamento da lesão endoperiodontal e tratamento do abscesso periodontal (a definição e a classificação dos dois estão no ponto 11)."
DEPOIS: "(c) técnica de tratamento do abscesso periodontal e conduta da lesão endoperiodontal de causa periodontal ou com dano radicular (a definição, a classificação e a sequência do Ministério da Saúde para a lesão de causa endodôntica estão no ponto 11)."

**Mudança 07-E3**: `$.limiteFonte` (linha 66). Muda só a frase do PENDENTE.

ANTES: "PENDENTE: cirurgia mucogengival, cicatrização e o tratamento da lesão endoperiodontal e do abscesso periodontal ficam sem texto clínico por falta de fonte aberta."
DEPOIS: "Em 27/11/2026 o ponto 1 (doenças necrosantes: os três nomes, gengivite, periodontite e estomatite necrosante, e os dois tipos de paciente) e o ponto 11 (urgência e sequência de tratamento da lesão endoperiodontal de causa endodôntica) passaram a usar o texto completo do consenso do grupo 2 do World Workshop 2017 (Papapanou et al., J Periodontol 2018;89 Suppl 1:S173-S182, versão publicada no repositório da Universidade de Genebra) e o livro do Ministério da Saúde A Saúde Bucal no SUS (2018, p. 89, 143 e 222-223); o texto do MS tem duas versões para o momento da raspagem, e as duas foram mostradas. PENDENTE: cirurgia mucogengival, cicatrização, técnica de tratamento do abscesso periodontal e conduta da lesão endoperiodontal de causa periodontal ou com dano radicular ficam sem texto clínico por falta de fonte aberta."

**Mudança 07-E4**: `$.comoUsar[4]` (linha 72). Muda só o trecho dos pontos 11 e 12.

ANTES: "11) lesão endoperiodontal e abscesso periodontal (definição e classificação); 12) itens PENDENTES sem fonte aberta (cirurgia mucogengival, cicatrização, tratamento da lesão endoperiodontal e do abscesso)."
DEPOIS: "11) lesão endoperiodontal e abscesso periodontal (definição, classificação, urgência e sequência do Ministério da Saúde para a lesão de causa endodôntica); 12) itens PENDENTES sem fonte aberta (cirurgia mucogengival, cicatrização, técnica de tratamento do abscesso)."
O fim da frase, "o ponto 11 vem dos guias oficiais da EFP de 2019 sobre a classificação de 2017", passa a ser: "o ponto 11 vem dos guias oficiais da EFP de 2019 e do consenso de 2017 (Papapanou et al. 2018), com a sequência de tratamento do Ministério da Saúde (2018)".

#### Apostila 06 (`curso/apostila/dentistica-endodontia-trauma.json`)

**Mudança 06-1**: `$.licoes[0].pontos[28].texto` (linha 198). Mudam só a dica do autor e o trecho do PENDENTE.

ANTES (literal):
> Dica do autor (não é da fonte), pegadinha provável: dizer que a classificação nova separa “primária endodôntica” de “primária periodontal” (as fontes lidas não usam esse critério). PENDENTE: sequência de tratamento (as fontes lidas não a descrevem; nada foi escrito) e o texto completo de Herrera et al. (J Clin Periodontol 2018;45 Suppl 20:S78-S94, doi:10.1111/jcpe.12941; também J Periodontol 2018;89 Suppl 1:S85-S102, doi:10.1002/JPER.16-0642), que deu acesso negado (403).

DEPOIS:
> Dica do autor (não é da fonte), pegadinha provável: dizer que a classificação nova separa “primária endodôntica” de “primária periodontal”. O consenso de 2017 ainda descreve a origem, que pode ser a polpa, o periodonto ou as duas juntas, mas classifica pelo dano radicular e pela periodontite (Papapanou et al., 2018, p. S180-S181). Tratamento segundo o Ministério da Saúde (A Saúde Bucal no SUS, 2018, p. 222-223): procurar a causa; se é endodôntica (cárie extensa, canal mal feito), começar pelo tratamento de canal. O mesmo texto traz duas versões para a raspagem: junto, “com o paciente em fase de curativo endodôntico”, ou só depois de esperar a cicatrização de 30 a 90 dias após o canal (quadro “Sequência de intervenção”). Nas duas, o canal vem primeiro. Reavaliar no CEO 90 a 120 dias após o fim do tratamento periodontal; radiografia periapical 6 meses após o fim; se não responder, endodontista e periodontista reavaliam juntos. É urgência quando aguda: início rápido, destruição rápida e dor (Papapanou et al., 2018, p. S180). PENDENTE: conduta da lesão de causa periodontal e da lesão com dano radicular; texto completo de Herrera et al. (J Clin Periodontol 2018;45 Suppl 20:S78-S94, doi:10.1111/jcpe.12941; também J Periodontol 2018;89 Suppl 1:S85-S102, doi:10.1002/JPER.16-0642), acesso negado (403 em 26 e 27/11/2026).

E na lista de fontes do mesmo ponto, acrescentar: "Papapanou et al., J Periodontol 2018;89 Suppl 1:S173-S182, versão publicada no repositório da Universidade de Genebra (https://archive-ouverte.unige.ch/unige:111638); Ministério da Saúde, A Saúde Bucal no Sistema Único de Saúde (2018), p. 222-223, https://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal_sistema_unico_saude.pdf; conferidos em 27/11/2026."

**Mudança 06-2**: `$.licoes[0].intro` (linha 53). Muda só o trecho final.

ANTES: "lesão endoperiodontal (definição e classificação do World Workshop 2017, pelo guia da EFP 2019; tratamento PENDENTE)."
DEPOIS: "lesão endoperiodontal (definição e classificação do World Workshop 2017, pelo guia da EFP 2019; sequência de tratamento do Ministério da Saúde, 2018, para a lesão de causa endodôntica)."

**Mudança 06-3**: `$.limiteFonte` (linha 10). Muda só a última frase.

ANTES: "Sequência de tratamento da lesão endoperiodontal e infecções odontogênicas gerais continuam PENDENTE."
DEPOIS: "Acrescentado em 27/11/2026: sequência de tratamento da lesão endoperiodontal de causa endodôntica pelo Ministério da Saúde, A Saúde Bucal no SUS (2018, p. 222-223; o texto tem duas versões para o momento da raspagem, e as duas foram mostradas), e a origem e a urgência pelo consenso do World Workshop 2017 (Papapanou et al. 2018, versão publicada no repositório da Universidade de Genebra), trechos literais conferidos nessa data. A conduta da lesão de causa periodontal ou com dano radicular e as infecções odontogênicas gerais continuam PENDENTE."

## 4. O que continua PENDENTE (e por quê)

1. **Técnica de tratamento do abscesso periodontal** (drenagem pela bolsa ou por incisão, raspagem, quando usar antibiótico). Nenhuma fonte aberta lida descreve isso. O consenso só diz que o tratamento deve ser rápido. O MS só diz onde atender (Atenção Básica) e cita "drenagens de abscessos" como procedimento de urgência em geral. O artigo de Herrera 2018, que é a fonte provável, deu 403 na editora (Wiley, que o Unpaywall marca como grátis, mas que bloqueia o acesso automatizado) e está restrito no repositório da Complutense. **Não contornei.** Para resolver, o dono pode baixar o PDF da Wiley no navegador (o site o marca como de acesso livre) e pôr em `fontes/`. Aí um novo lote confere.
2. **Conduta na lesão endoperiodontal de causa periodontal e na lesão com dano radicular** (fratura, perfuração). O MS só cobre a de causa endodôntica. O consenso só diz que o dano radicular piora muito o prognóstico (já está na apostila).
3. **Momento da raspagem na lesão endoperiodontal**: o próprio MS 2018 se contradiz (D1). Não dá para escolher uma versão sem outra fonte.
4. **Tratamento das doenças necrosantes** (debridamento, bochecho, antibiótico): não foi pedido nesta tarefa e não está nas fontes lidas. O MS só diz que a Guna é tratada como urgência na Atenção Básica. Nada foi escrito.
5. **Equivalência oficial "nome antigo = nome novo"** (periodontite ulcerativa necrosante = periodontite necrosante; Guna = gengivite necrosante): nenhuma frase literal foi achada. Continua como "Dica do autor".
6. **Tabela 2 linha a linha** (fatores predisponentes e progressão em cada tipo de paciente): a extração do PDF saiu desalinhada e eu não a usei. Se o dono quiser esse detalhe, é preciso conferir visualmente a p. S177 do PDF.

## 5. Contagem
- Apostila 07: 6 mudanças (07-N1, 07-E1 a 07-E4; a 07-N2 é "sem mudança"), mais 1 frase opcional na Dica do autor da 07-N1.
- Apostila 06: 3 mudanças (06-1 a 06-3).
- Nenhuma foi aplicada. Todas aguardam "aprovado".
- Arquivos baixados só para `%TEMP%\perio27` (fora do repositório); script de conferência em `%TEMP%\perio27-scripts\conferir-perio27.mjs`.
