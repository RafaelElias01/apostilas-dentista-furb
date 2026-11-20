# Resolução das pendências: Apostila 07 (Periodontia) e Apostila 08 (Cirurgia, Anestesia, Farmacologia, Emergências e Patologia)

**Quem fez:** professor-cursinho (Opus), conferência de fonte. **Data:** 19/11/2026. **Escopo:** todos os "PENDENTE", "dúvida de gabarito" e "opcional" de `curso/apostila/periodontia.json` e `curso/apostila/cirurgia-farmacologia-patologia.json`, mais os itens dos relatórios `curso/auditoria/apostila-07.md` e `apostila-08.md`.
**Este arquivo NÃO edita as apostilas.** Traz o texto pronto para outro agente aplicar (no JSON, depois regerar). Os textos usam aspas curvas “ ” para não quebrar o JSON.

## Como ler
- **Status:** RESOLVIDO (fonte forte lida no original) · PARCIAL (parte confirmada, parte não) · NÃO RESOLVIDO (fonte não acessível; continua PENDENTE) · RESOLVIDO POR ESCOPO (o PENDENTE pedia conduta, que a apostila não ensina; troca-se o aviso, sem fato novo).
- **Local:** `licoes[i]` = lição (id entre parênteses); `pontos[j]` = ponto (índice começando em 0).
- **Fontes:** lidas em 19/11/2026. Arquivos baixados ficaram em `C:\Users\rafae\AppData\Local\Temp\claude\82c20225030dd39a\ee3be31f-cb55-4444-8c70-5ea753b926e5\scratchpad\pendencias-0708\dl\` (cópias, não fazem parte do projeto). Tabelas em imagem foram conferidas na IMAGEM renderizada da página.
- **Regra clínica mantida:** nada de esquema de tratamento. Onde entra dose (só endocardite, porque a banca cobrou), vem com "Para estudo; não use para tratar paciente".
- **Gabarito manda:** quando a literatura discorda, o texto traz o aviso "a banca marcou X; a literatura diz Y; na prova siga o gabarito histórico, mas entenda Y". Os gabaritos citados foram conferidos no banco `curso/questoes-anteriores.json` (campo `gabaritoOficial`; nenhum desses grupos mudou após o preliminar). O PDF das provas não existe nesta máquina: nada aqui confere transcrição de prova.

---

## Fontes usadas (numeradas; citadas como [F1], [F2]...)

| Nº | Fonte | URL | Onde / trecho literal (curto) |
|---|---|---|---|
| F1 | AAP (Academia Americana de Periodontia), "Staging and Grading Periodontitis" (resumo oficial de 2 páginas das tabelas de Tonetti, Greenwell, Kornman. J Periodontol 2018;89 Suppl 1:S159-S172) | https://www.perio.org/wp-content/uploads/2019/08/Staging-and-Grading-Periodontitis.pdf | p. 1 (estágios) e p. 2 (graus), conferidas na imagem. "Interdental CAL (at site of greatest loss) 1 – 2 mm / 3 – 4 mm / ≥5 mm / ≥5 mm"; "Clinicians should initially assume grade B disease"; "Smoking: Non-smoker / <10 cigarettes/day / ≥10 cigarettes/day"; "Tables from Tonetti, Greenwell, Kornman. J Periodontol 2018;89 (Suppl 1): S159-S172." |
| F2 | Chapple ILC e cols. Periodontal health and gingival diseases and conditions on an intact and a reduced periodontium: Consensus report of workgroup 1 of the 2017 World Workshop. J Clin Periodontol 2018;45(Suppl 20):S68-S77 (publicado também em J Periodontol 2018;89 Suppl 1:S74-S84) | cópia do PDF da editora: https://www.umw.edu.pl/sites/default/files/2022-04/Article2.pdf | Tabela 1 (p. S74, conferida na imagem): saúde em periodonto íntegro "≤3 mm", "Bleeding on probing <10%"; gengivite "Yes (≥ 10%)"; texto: "Localized gingivitis is defined as 10%-30% bleeding sites; generalized gingivitis is defined as > 30% bleeding sites"; nota: "Assumes a light probing pressure of 0.2 to 0.25 N". Tabela 2 (p. S75, imagem): "C. Drug-influenced gingival enlargement". |
| F3 | Murakami S, Mealey BL, Mariotti A, Chapple ILC. Dental plaque-induced gingival conditions. J Clin Periodontol 2018;45(Suppl 20):S17-S27 | cópia do PDF da editora: https://fenix.fmd.ulisboa.pt/downloadFile/281582350893067/Dental%20plaque | Seção "Drug-influenced gingival enlargements": "the antiepileptic drugs phenytoin and sodium valproate, certain calcium channel-blocking drugs (e.g., nifedipine, verapamil, diltiazem, amlodipine, felodipine), immunoregulating drugs (e.g., ciclosporine), and high-dose oral contraceptives"; "onset within 3 months of use". Seção "Smoking": "smokers have fewer clinical signs and symptoms of gingival inflammation, and therefore smoking can mask an underlying gingivitis"; "causes vasoconstriction of the periodontal microvasculature and gingival fibrosis". |
| F4 | Hill AB. The environment and disease: association or causation? Proc R Soc Med 1965;58(5):295-300 (metadados conferidos no Europe PMC, PMC1898525) | texto lido na reprodução (antologia Greenland, 1987): https://aliquote.org/pub/Hill_1965.pdf | "(1) Strength", "(2) Consistency", "(3) Specificity: ... If as here, the association is limited to specific workers and to particular sites and types of disease ... that is a strong argument in favor of causation", "(5) Biological gradient ... or dose-response curve"; "None of my nine viewpoints can bring indisputable evidence ... and none can be required as a sine qua non." |
| F5 | Deinzer R e cols. Manual toothbrushing techniques for plaque removal and the prevention of gingivitis: a systematic review with network meta-analysis. PLoS One 2024;19(7):e0306302 | https://doi.org/10.1371/journal.pone.0306302 (texto lido via Europe PMC, PMC11226064) | Tabela 1 ("Description of commonly recommended brushing techniques in the original publications"): Bass "Bristles should be forced directly into the gingival crevices ... at about a 45-degree angle"; Charters "giving the brush several slight rotary or vibratory movements"; Stillman "bristle ends resting partly on the gingivae and partly on the cervical portion of the teeth"; Fones "with a fast circular motion". |
| F6 | Rajwani AR e cols. Effectiveness of manual toothbrushing techniques on plaque and gingivitis: a systematic review. Oral Health Prev Dent 2020;18(4):177 (doi 10.3290/j.ohpd.a45354) | texto via Europe PMC, PMC11654539 | "The earliest published toothbrushing technique is the Charter's method, which was originally described for patients with orthodontic appliances"; Fones: "the toothbrush head is moved circularly 4 to 5 times". |
| F7 | James P e cols. Chlorhexidine mouthrinse as an adjunctive treatment for gingival health. Cochrane Database Syst Rev 2017 (CD008676.pub2), resumo | resumo via Europe PMC (PMID 28362061) | "There is no evidence that one concentration of chlorhexidine rinse is more effective than another"; "Rinsing with chlorhexidine mouthrinse for 4 weeks or longer causes extrinsic tooth staining"; efeitos: "taste disturbance/alteration", "mild desquamation". |
| F8 | Daly BJ e cols. Local interventions for the management of alveolar osteitis (dry socket). Cochrane Database Syst Rev 2022 (CD006968.pub3), resumo | resumo via Europe PMC (PMID 36156769) | "rinsing with chlorhexidine mouthrinses (0.12% and 0.2% concentrations) both before and 24 hours after extraction(s) substantially reduced the risk of developing dry socket" (6 estudos, 1547 participantes, certeza moderada). |
| F9 | Sanz M e cols. Treatment of stage I-III periodontitis: the EFP S3 level clinical practice guideline. J Clin Periodontol 2020;47 Suppl 22:4-60 | texto via NCBI (PMC7891343) | Recomendação 2.16: "its routine use as adjunct to subgingival debridement in patients with periodontitis is not recommended. The adjunctive use of specific systemic antibiotics may be considered for specific patient categories"; 1º passo: "Supragingival dental biofilm control". |
| F10 | Wilson WR e cols. Prevention of Viridans Group Streptococcal Infective Endocarditis: A Scientific Statement From the American Heart Association. Circulation 2021;143(20):e963-e978. doi 10.1161/CIR.0000000000000969 | PDF da editora (rodapé "Downloaded from ahajournals.org"), cópia em https://www.smilegeneration.com/content/dam/sg/mbc/heart-health/Prevention_of_Viridans_Group_Streptococcal_Infective_Endocarditis_A_Scientific_Statement_From_the_American_Heart_Association_Circulation_2021.pdf | Tabela 5 (p. e973, imagem): "Single Dose 30 to 60 Minutes Before Procedure"; "Oral / Amoxicillin / 2 g / 50 mg/kg". Tabela 3 (p. e971): 4 grupos (prótese ou material valvar; EI prévia; certas cardiopatias congênitas; transplantado cardíaco com valvopatia). p. e971-e972: "Should the 4 categories ... be expanded to include patients with rheumatic heart disease ...?" Resposta: "These factors ... do not warrant a change in the suggestion against AP for dental procedures in patients at low or moderate risk". |
| F11 | Barroso WKS e cols. Diretrizes Brasileiras de Hipertensão Arterial - 2020. Arq Bras Cardiol 2021;116(3):516-658 | texto via Europe PMC (PMC9949730) | Cap. 13 "Crise Hipertensiva", 13.1 Definição: "As urgências hipertensivas (UH) são situações clínicas sintomáticas em que há elevação acentuada da pressão arterial (PA) (definida arbitrariamente como PA sistólica (PAS) ≥ 180 e/ou diastólica (PAD) ≥ 120 mm Hg) sem lesão aguda e progressiva em órgãos-alvo (LOA)"; emergências: mesmos valores "com LOA aguda e progressiva, com risco iminente de morte". |
| F12 | Diretriz Brasileira de Hipertensão Arterial - 2025. Arq Bras Cardiol 2025;122(9):e20250624 (doi 10.36660/abc.20250624) | texto via NCBI (PMC13671149) | Cap. 11 "Crise Hipertensiva", 11.1: "Crise hipertensiva caracteriza-se por elevação aguda e importante da PA, acompanhada ou não por LOAs agudas"; "EHs são situações clínicas sintomáticas em que há elevação acentuada da PA (definida arbitrariamente como PAS ≥ 180 e/ou PAD ≥ 110 mmHg ou, dependendo da situação, até mesmo com valores menores) com LOA aguda e progressiva"; "recomenda-se que a nomenclatura apropriada seria 'elevação importante da PA sem lesão progressiva de órgãos-alvo'". |
| F13 | Becker DE, Reed KL. Local anesthetics: review of pharmacological considerations. Anesth Prog 2012;59(2):90-101 | https://pmc.ncbi.nlm.nih.gov/articles/PMC3403589/ | "bupivacaine (pKa 8.1) would be less desirable than mepivacaine (pKa 7.6)"; "the pKa for all local anesthetics is greater than 7.4"; "the higher the pKa ... the fewer molecules are available in their lipid-soluble form. This will delay onset"; "by avoiding those solutions containing vasopressors, one avoids any bisulfites that are included as antioxidants"; "choice would be either mepivacaine or prilocaine without vasopressors". |
| F14 | Mergenhagen KA e cols. Fact versus fiction: a review of the evidence behind alcohol and antibiotic interactions. Antimicrob Agents Chemother 2020;64(3):e02167-19 | texto via NCBI (PMC7038249) | "Available data support that oral penicillins, cefdinir, cefpodoxime, fluoroquinolones, azithromycin, tetracycline ... can be safely used with concomitant alcohol consumption"; "Erythromycin may have reduced efficacy ..., and doxycycline may have reduced efficacy in chronic alcoholism"; "The disulfiram-like reaction, though classically associated with metronidazole, occurs with uncertain frequency". |
| F15 | Ministério da Saúde. Guia de Vigilância em Saúde, 6ª ed. revisada, 2024, v. 1 (ISBN 978-65-5993-506-2) | https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/sarampo/guia-de-vigilancia-em-saude-_-sarampo.pdf (o arquivo traz o volume 1 inteiro) | Sarampo (p. 260): "RNA vírus pertencente ao gênero Morbillivirus, família Paramyxoviridae"; "Pode variar entre 7 e 21 dias, desde a data da exposição até o aparecimento do exantema"; manchas de Koplik "pequenos pontos brancos na mucosa bucal, na altura do terceiro molar". Caxumba (p. 250-252): "aumento de volume de uma ou mais glândulas salivares, com predileção pelas parótidas"; "Vírus da família Rubulavírus, gênero Paramyxovirus"; "a única causa conhecida de parotidite epidêmica"; "O período médio de incubação é de 16 a 18 dias, variando de 12 a 25 dias". |
| F16 | Trinka E e cols. A definition and classification of status epilepticus: report of the ILAE Task Force. Epilepsia 2015;56:1515-1523, resumo | resumo via Europe PMC (PMID 26336950) | "In the case of convulsive (tonic-clonic) SE, both time points (t1 at 5 min and t2 at 30 min)". |
| F17 | INCA. Câncer de boca, versão para profissionais de saúde (página publicada em 04/06/2022, atualizada em 08/12/2025) | https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/boca/versao-para-profissionais-de-saude | "A maior parte dos tumores malignos da cavidade bucal é constituída pelo carcinoma epidermoide ... Este tumor ocorre em aproximadamente 95% dos casos"; "O tabagismo e o etilismo são os principais fatores de risco para os cânceres de lábio e cavidade oral"; "Exposição à radiação solar (para o câncer de lábio)"; "Infecção pelo papilomavírus humano (HPV) tipo 16"; sinais: "manchas (eritroplasia ou leucoplasia)"; "a confirmação depende da biópsia"; "Atualmente não há recomendação para o rastreamento do câncer de boca". |
| F18 | Saldivia-Siracusa C, González-Arriagada WA. Difficulties in the prognostic study of oral leukoplakia. Front Oral Health 2021 (doi 10.3389/froh.2021.614045), revisão revisada por pares que cita Warnakulasuriya, Johnson, van der Waal. J Oral Pathol Med 2007;36:575-580 | https://www.frontiersin.org/journals/oral-health/articles/10.3389/froh.2021.614045/pdf | "Oral leukoplakia (OL) is described as a white plaque of questionable risk, having excluded (other) known diseases or disorders that carry no increased risk of cancer [4]" (fonte SECUNDÁRIA da definição de 2007). |
| F19 | AO Surgery Reference (AO Foundation), CMF Trauma, Midface, General considerations (autores Borsuk, Orellana Tosi, Zulfiqar; sem data na página) | https://surgeryreference.aofoundation.org/cmf/trauma/midface/further-reading/general-considerations | "Dental occlusion is the most critical parameter in reestablishing facial contour"; não diz a ordem "dentes antes de reduzir". |

---

## APOSTILA 07 — `curso/apostila/periodontia.json` (lição única `licoes[0]`, id `perio`)

### P1. Classificação atual: critérios numéricos de estágios e graus — **RESOLVIDO** [F1]
Locais (4): `licoes[0].pontos[1].texto` (frase final "PENDENTE: os critérios numéricos de cada estágio e grau, conforme livro citado."); `comoUsar[6]`; `limiteFonte` (frase "PENDENTE: os critérios numéricos de estágios e graus..."); `licoes[0].mapa.ramos[1].f[3]` ("Classificação nova: PENDENTE").

**Texto para `pontos[1]`** (substitui a frase PENDENTE):
> Os números da classificação de 2017 (tabelas de Tonetti, Greenwell e Kornman, J Periodontol 2018;89 supl. 1:S159-S172, no resumo oficial da AAP). ESTÁGIO, pela perda de inserção clínica interproximal no ponto de maior perda: I = 1 a 2 mm; II = 3 a 4 mm; III e IV = 5 mm ou mais. Perda óssea na radiografia: I = terço coronal (menos de 15%); II = terço coronal (15% a 33%); III e IV = chega ao terço médio da raiz ou além. Dentes perdidos por periodontite: I e II = nenhum; III = até 4; IV = 5 ou mais. Complexidade: I = sondagem máxima até 4 mm; II = até 5 mm; III = sondagem de 6 mm ou mais, perda óssea vertical de 3 mm ou mais, furca classe II ou III; IV = precisa de reabilitação complexa (por exemplo, menos de 20 dentes). Extensão: localizada (menos de 30% dos dentes), generalizada ou padrão molar/incisivo. GRAU (velocidade de progressão; comece supondo grau B): A = lenta, B = moderada, C = rápida. Prova direta (perda óssea ou de inserção em 5 anos): A = nenhuma; B = menos de 2 mm; C = 2 mm ou mais. Prova indireta (% de perda óssea dividida pela idade): A = menos de 0,25; B = 0,25 a 1,0; C = mais de 1,0. Fatores que mudam o grau: fumo (A = não fumante; B = menos de 10 cigarros por dia; C = 10 ou mais) e diabetes (A = sem diabetes; B = HbA1c menor que 7,0%; C = HbA1c de 7,0% ou mais). Nenhuma questão de Blumenau cobrou esses números até agora.

**`comoUsar[6]`**: trocar "os critérios numéricos de estágios e graus da classificação nova estão PENDENTES de fonte citada." por "os critérios numéricos de estágios e graus estão no ponto 1, com a fonte (tabelas oficiais de 2018, resumo da AAP)."
**`limiteFonte`**: trocar a frase PENDENTE por "Os critérios numéricos de estágios e graus vêm das tabelas de Tonetti, Greenwell e Kornman (J Periodontol 2018;89 supl. 1:S159-S172), conferidas no resumo oficial da AAP; ver ponto 1."
**Mapa `ramos[1].f[3]`**: "Nova: estágio I–IV + grau A–C".

### P2. Livro de referência e edição do Newman & Carranza — **NÃO RESOLVIDO** (decisão do dono, G5)
Local: `limiteFonte` e `_comentario`. A banca cita "Periodontia Clínica − Newman & Carranza" sem edição (G0261 a G0272, 2023, conferido no enunciado do banco); não há como descobrir a edição sem o PDF/edital de bibliografia. O livro é fechado. **Fontes abertas equivalentes** (todas lidas aqui): F1 (estágios e graus), F2 (saúde, gengivite e classificação das doenças gengivais), F3 (gengivite e fatores modificadores: fumo, remédios), F9 (tratamento da periodontite, diretriz S3 da EFP), F7 (clorexidina). Texto opcional para `limiteFonte`: "Fontes abertas usadas para conferir: consenso do World Workshop 2017 (J Clin Periodontol 2018, supl. 20) e diretriz S3 da EFP (2020). A edição do Newman & Carranza citada pela banca segue PENDENTE."

### P3. G0262: nome técnico e classes de remédios — **RESOLVIDO** [F2, F3]
Local: `licoes[0].pontos[13].texto`, frase "PENDENTE: confirmar em livro citado o nome técnico da alteração gengival e a lista completa de classes."
> Nome técnico na classificação de 2017: “aumento gengival influenciado por medicamentos” (em inglês, drug-influenced gingival enlargement), no grupo das gengivites induzidas pelo biofilme (Chapple e cols., 2018). A revisão do mesmo workshop (Murakami e cols., 2018) cita: anticonvulsivantes (fenitoína e valproato de sódio), alguns bloqueadores dos canais de cálcio (nifedipina, verapamil, diltiazem, anlodipino, felodipino), imunorreguladores (ciclosporina) e anticoncepcionais orais em dose alta. O biofilme junto com o remédio é necessário para a resposta; nem todo paciente que usa o remédio desenvolve o aumento; em geral começa nos 3 primeiros meses de uso, primeiro na papila, e é mais comum na região anterior e em pessoas mais jovens.

### P4. G0092: Fones, Stillman, Leonard e Bass — **PARCIAL** (Leonard só em FONTE FRACA) [F5, F6]
Local: `licoes[0].pontos[16].texto`, frase "PENDENTE: a descrição das outras técnicas (Fones, Stillman, Leonard, Bass) precisa de fonte citada."
> Como os autores originais descreveram (transcrição na revisão de Deinzer e cols., PLoS One 2024, Tabela 1): Bass = cerdas forçadas para dentro do sulco gengival, a cerca de 45° do longo eixo do dente, com movimentos curtos de vaivém (a “Bass modificada” soma uma varredura da gengiva para a coroa); Stillman = pontas das cerdas parte na gengiva e parte na região cervical do dente, inclinadas para apical, com pressão e leve giro do cabo sem tirar as cerdas do lugar; Fones = dentes quase fechados, movimentos circulares rápidos, pouca pressão; Charters = cerdas entre os dentes, com pequenos movimentos de giro ou vibração (descrita primeiro para quem usa aparelho ortodôntico). Atenção: a descrição da prova (“cerdas voltadas para a oclusal”) é a dos livros-texto; na prova, siga o gabarito: Charters. Leonard: PENDENTE de fonte forte (só há material didático que fala em movimentos verticais).

Tentado para Leonard: revisões F5 e F6 (não citam Leonard), artigo do Br Dent J 2014 (bloqueado), busca na web (só apostilas e blogs: FONTE FRACA).

### P5. G0373: clorexidina, concentração e tempo — **RESOLVIDO** (sem virar prescrição) [F7, F8]
Local: `licoes[0].pontos[16].texto`, frase "PENDENTE: concentração e tempo de uso da clorexidina, que não aparecem nas questões e precisam de fonte."
> O que dizem as revisões Cochrane: o enxágue com clorexidina junto com a escovação reduziu muito a placa em 4 a 6 semanas e em 6 meses; não há evidência de que uma concentração seja melhor que outra; enxaguar por 4 semanas ou mais causa manchamento extrínseco; também foram relatados alteração do paladar, efeitos na mucosa (inclusive descamação leve) e cálculo (James e cols., 2017). Nos estudos de prevenção de alveolite foram usados enxágues de 0,12% e 0,2% (Daly e cols., 2022). Esquema de uso (quantas vezes por dia, por quantos dias) não é ensinado aqui.
Isso também confirma os efeitos colaterais aceitos pela banca em G0373 (manchamento, paladar, descamação).

### P6. G0176: conferir no PDF — **PARCIAL** (conteúdo confirmado; PDF continua faltando) [F9]
Local: `licoes[0].pontos[18].texto`. Acrescentar antes de "Para a prova, siga o gabarito.":
> A diretriz S3 da Federação Europeia de Periodontia (Sanz e cols., 2020) põe o controle do biofilme supragengival (higiene oral e remoção profissional da placa) como primeiro passo; antibiótico sistêmico NÃO é recomendado de rotina como coadjuvante e só pode ser considerado para grupos específicos de pacientes.
Manter "PENDENTE: conferir o texto no PDF da prova." (o PDF não está nesta máquina).

### P7. G0082: de quem são os critérios — **RESOLVIDO** [F4]
Local: `licoes[0].pontos[19].texto`, frase "PENDENTE: nome do autor ou do conjunto de critérios (a questão não o cita)."
> São os critérios (o autor chama de “pontos de vista”) de Austin Bradford Hill (Proc R Soc Med, 1965): força da associação, consistência, especificidade, temporalidade, gradiente biológico (dose-resposta), plausibilidade, coerência, experimento e analogia. As duas falsas da prova invertem a força (em Hill, associação FORTE pesa a favor da causa) e a consistência (resultados REPETIDOS por pesquisadores diferentes pesam a favor). As duas verdadeiras são o gradiente biológico e a especificidade. O próprio Hill avisa que nenhum critério é obrigatório.

### P8. G0178 e G0272: fumo e inflamação — **PARCIAL** (G0272 confirmada; gabarito da G0178 continua sem explicação) [F3]
Local: `licoes[0].pontos[20].texto`. Trocar "É provável que o enunciado original pedisse a INCORRETA (PENDENTE: conferir no PDF da prova). Para estudar: ..." por:
> A revisão do Workshop de 2017 (Murakami e cols., 2018) confirma: o fumo causa vasoconstrição dos pequenos vasos do periodonto e fibrose gengival; a placa e a progressão da doença pioram no fumante, mas ele tem MENOS sinais de inflamação gengival, e por isso o fumo pode mascarar a gengivite. Isso apoia a G0272 (D) e mostra que A, C, D e E da G0178 são verdadeiras. Aviso: na G0178 a banca marcou B (“causa processo inflamatório na mucosa bucal”); a literatura diz que o fumo mascara a inflamação gengival. É provável que o enunciado original pedisse a INCORRETA (PENDENTE: conferir no PDF da prova). Na prova, siga o gabarito histórico, mas entenda o mascaramento; não decore a B como verdade.
Tentado: busca do caderno 2021 (PSPS 002/2021, Periodontista) no site da FURB e em repositórios: não achado.

### P9. Valores de sondagem — **PARCIAL** (saúde/gengivite/estágios sim; prognóstico não) [F2, F1]
Local: `licoes[0].pontos[23].texto`, frase "PENDENTE: valores de profundidade de sondagem e de perda de inserção para classificar bolsa ou prognóstico...".
> Valores da classificação de 2017 (Chapple e cols., 2018, Tabela 1; sonda com pressão leve, de 0,2 a 0,25 N): saúde gengival em periodonto íntegro = sondagem de até 3 mm e sangramento à sondagem em menos de 10% dos sítios; gengivite = sangramento em 10% ou mais dos sítios, sondagem de até 3 mm e sem perda de inserção (para estudos populacionais: localizada = 10% a 30% dos sítios; generalizada = mais de 30%). No paciente com periodontite tratada e estável aceita-se sondagem de até 4 mm, sem nenhum sítio de 4 mm ou mais sangrando. Perda de inserção por estágio: veja o ponto 1. Valores para prognóstico continuam PENDENTES de fonte.

### P10. G0307: outros valores de largura/profundidade — **NÃO RESOLVIDO (sem necessidade)**
Local: `licoes[0].pontos[8].texto`. O texto é seguro (só usa o "cerca de 1 mm" do enunciado). Não achei fonte aberta forte com largura de gengiva marginal; manter.

### P11. Temas do edital sem questão (imunidade, genética, saúde sistêmica, abscesso, prognóstico) — **NÃO RESOLVIDO**
Local: `licoes[0].pontos[26].texto`. Fora do pedido desta rodada; F9 (S3, EFP) cobre abscesso e tratamento, mas escrever esses temas é conteúdo novo, não pendência. Manter.

### P12. Transcrição das questões não conferida contra o PDF — **NÃO RESOLVIDO**
Local: `limiteFonte`. Os PDFs das provas não estão nesta máquina. Dica: os cadernos de 2025 (Periodontista, Clínico Geral, Buco-Maxilo-Facial, Odontopediatra, Endodontista) aparecem em arquivos.qconcursos.com (site de terceiros, não oficial); o oficial é concursos.furb.br.

---

## APOSTILA 08 — `curso/apostila/cirurgia-farmacologia-patologia.json`

### C1. Profilaxia de endocardite: diretriz (entidade, nome, ano) — **RESOLVIDO** [F10]
Locais: `limiteFonte` ("PENDENTE: diretriz de profilaxia de endocardite (entidade, nome e ano) a definir."), `licoes[3].intro` (farmacologia: "...e diretriz de profilaxia de endocardite (entidade, nome e ano) a definir").
Texto: "Diretriz usada para endocardite: American Heart Association (AHA), declaração científica “Prevention of Viridans Group Streptococcal Infective Endocarditis”, Circulation 2021;143:e963-e978, lida no texto original." Na intro da farmacologia, manter "PENDENTE: livro de farmacologia aplicada à Odontologia a definir".

### C2. G0212 (febre reumática, 1 hora antes) — **RESOLVIDO com aviso** (parte brasileira NÃO conferida) [F10]
Local: `licoes[3].pontos[2].texto`. Trocar "DÚVIDA DE GABARITO: ... PENDENTE: diretriz citada (entidade, nome, ano)." por:
> A AHA (Wilson e cols., Circulation 2021) indica, quando a profilaxia é sugerida, dose única de 30 a 60 minutos antes do procedimento: o “1 hora” do gabarito cabe nesse intervalo. Mas a AHA só sugere profilaxia para 4 grupos de maior risco (prótese ou material de reparo de válvula, endocardite anterior, certas cardiopatias congênitas e transplantado cardíaco com doença de válvula) e discutiu se devia incluir a cardiopatia reumática: decidiu não incluir. Aviso: a banca tratou “febre reumática” como indicação; a AHA não a inclui sozinha. Na prova, siga o gabarito histórico (1 hora), mas entenda isso. A diretriz brasileira de valvopatias pode ter outra posição para a valvopatia reumática: PENDENTE (não consegui ler o texto). Para estudo; não use para tratar paciente.
Tentado para a diretriz brasileira (Atualização das Diretrizes Brasileiras de Valvopatias 2020, Arq Bras Cardiol 2020;115(4):720-775, doi 10.36660/abc.20201047): abccardiol.org não respondeu (tempo esgotado 2x); Europe PMC deu erro 500. Fonte secundária (Afya) diz que a brasileira é "diferente" da americana: FONTE FRACA, não usar.

### C3. G0356 (amoxicilina 50 mg/kg) — **RESOLVIDO** [F10]
Local: `licoes[3].pontos[3].texto`. Trocar "Esse número vem só do gabarito da prova; NÃO está confirmado em diretriz. PENDENTE: confirmar a dose, a via e a idade/peso em diretriz atual antes de qualquer uso clínico." por:
> O valor coincide com a AHA 2021 (Tabela 5): amoxicilina por via oral, criança 50 mg/kg, dose única de 30 a 60 minutos antes do procedimento. Para estudo; não use para tratar paciente.
Mapa `licoes[3].mapa.ramos[1]`: f[0] "1 hora antes (gabarito)" → "30–60 min antes (AHA 2021)"; f[1] "50 mg/kg em criança (PENDENTE)" → "50 mg/kg criança (AHA 2021)"; f[2] "Quem precisa: PENDENTE" → "Só 4 grupos de alto risco".
`comoUsar[4]`: trocar "...vêm só do gabarito de uma questão da prova e estão marcados PENDENTE até serem conferidos em livro ou diretriz." por "...vêm do gabarito de uma questão da prova; os que já foram conferidos em diretriz trazem a fonte, os outros seguem marcados PENDENTE."

### C4. G0029 (crise hipertensiva) — **RESOLVIDO com aviso** [F11, F12]
Local: `licoes[5].pontos[0].texto` (emergencias). Trocar "Os valores vêm só do gabarito da prova e a classificação de crise hipertensiva varia entre diretrizes: DÚVIDA DE GABARITO, PENDENTE conferir em diretriz de hipertensão. Para a prova, ..." por:
> Para comparar: a Diretriz Brasileira de Hipertensão Arterial 2020 (cap. 13) chama de urgência e de emergência hipertensiva a elevação acentuada da PA “definida arbitrariamente como PAS ≥ 180 e/ou PAD ≥ 120 mm Hg”; a diferença é a lesão aguda de órgão-alvo, que só existe na emergência. A Diretriz de 2025 (cap. 11) define crise hipertensiva como “elevação aguda e importante da PA, acompanhada ou não por LOAs agudas”, usa PAS ≥ 180 e/ou PAD ≥ 110 mmHg (ou até menos, conforme a situação) para a emergência e troca “urgência hipertensiva” por “elevação importante da PA sem lesão progressiva de órgãos-alvo”. Aviso: a banca marcou diastólica acima de 130 e sistólica de 250 ou mais; as diretrizes atuais usam números menores. Na prova, siga o gabarito histórico (era a única alternativa com valores altos), mas saiba os números das diretrizes. Esta lição não ensina conduta.
Mapa `licoes[5].mapa.ramos[0].f[1]` "Valores: PENDENTE em diretriz" → "Diretriz: ≥180 e/ou ≥120 (2020); ≥110 (2025)".

### C5. G0211 (pKa) — **PARCIAL** (2 valores e o conceito; demais pKa não) [F13]
Local: `licoes[2].pontos[1].texto`, frase "PENDENTE: tabela de pKa dos anestésicos em livro; esta apostila não traz os valores dos outros."
> Fonte: Becker e Reed (Anesth Prog 2012): mepivacaína pKa 7,6 e bupivacaína pKa 8,1. Todo anestésico local tem pKa acima de 7,4 (o pH do corpo); quanto maior o pKa, menos moléculas ficam na forma que atravessa a membrana do nervo e mais demora o início do efeito; em tecido inflamado (mais ácido) a anestesia fica mais difícil. pKa da lidocaína, prilocaína e procaína: PENDENTE de fonte.
Mapa `licoes[2].mapa.ramos[0].f[1]` pode virar "pKa: mepivacaína 7,6 (fonte)".

### C6. G0365 (bissulfito) — **RESOLVIDO** (a concentração 3% segue só da prova) [F13]
Local: `licoes[2].pontos[2].texto`, frase "Concentrações citadas vêm da alternativa da prova; PENDENTE conferir em fonte clínica."
> Becker e Reed (2012) confirmam: os bissulfitos entram como antioxidantes nas soluções COM vasoconstritor; para quem tem alergia a bissulfito, a escolha seria mepivacaína ou prilocaína SEM vasoconstritor. A concentração (3%) vem da alternativa da prova e não foi conferida.

### C7. G0368 (álcool e antibiótico) — **RESOLVIDO com aviso** [F14]
Local: `licoes[3].pontos[1].texto`. Trocar "DÚVIDA DE GABARITO: ... PENDENTE: conferir a interação de cada antibiótico (por exemplo, metronidazol) em livro de farmacologia." por:
> Aviso: a banca marcou que o álcool diminui a absorção do antibiótico. A revisão sistemática de Mergenhagen e cols. (Antimicrob Agents Chemother, 2020) mostra que depende do antibiótico: penicilinas orais, azitromicina, tetraciclina e outros podem ser usados com consumo de álcool; a eritromicina pode ter eficácia menor; a doxiciclina pode ter eficácia menor no alcoolismo crônico; o metronidazol é o exemplo clássico de reação tipo dissulfiram (frequência incerta). Na prova, siga o gabarito histórico (A), mas saiba que não há regra única.
Mapa `licoes[3].mapa.ramos[2].f[1]` "Dúvida de gabarito" → "Depende do antibiótico (metronidazol)".

### C8. G0067 (sarampo, incubação 8 a 12 dias) — **RESOLVIDO com aviso** [F15]
Local: `licoes[1].pontos[0].texto` (patologia), trecho "(número do enunciado; PENDENTE conferir em fonte)". Trocar por "(número do enunciado; o Ministério da Saúde dá de 7 a 21 dias)" e acrescentar no fim:
> Fonte oficial: Guia de Vigilância em Saúde (Ministério da Saúde, 2024): o agente é um “RNA vírus pertencente ao gênero Morbillivirus, família Paramyxoviridae”; incubação de 7 a 21 dias, da exposição ao exantema; na boca, as manchas de Koplik (pontos brancos na mucosa bucal, na altura do terceiro molar) aparecem antes do exantema. Aviso: a prova deu 8 a 12 dias; na prova, o gabarito vale. Cuidado: a caxumba, que era distrator, também é um paramixovírus (mesmo Guia); o que decide é a lesão na pele e na boca de criança.

### C9. G0249 (caxumba com supuração) — **PARCIAL** [F15]
Local: `licoes[1].pontos[3].texto`, parêntese "(na caxumba, em geral não há pus no ducto; supuração aponta para a parotidite bacteriana; PENDENTE: livro de patologia)". Trocar por:
> (o Guia de Vigilância em Saúde do Ministério da Saúde, 2024, descreve a caxumba como doença viral com febre, dor e aumento das glândulas salivares, com predileção pelas parótidas, e diz que ela é a única causa conhecida de parotidite epidêmica; o Guia não fala em pus no ducto. Que “pus no ducto” aponta para a forma bacteriana continua PENDENTE de fonte forte)
Tentado: StatPearls "Parotitis" (NCBI Bookshelf NBK560735) bloqueado por verificação de navegador; só resumos de busca: FONTE FRACA.

### C10. G0135 (leucoplasia, definição vigente) — **PARCIAL** [F18]
Local: `licoes[1].pontos[8].texto`, frase "a OMS revisou a redação depois (PENDENTE: definição vigente)." Trocar por:
> Em 2005 (publicado em 2007), o grupo de trabalho do Centro Colaborador da OMS para Câncer Bucal redefiniu a leucoplasia como “placa branca de risco questionável, excluídas (outras) doenças ou distúrbios conhecidos que não trazem risco aumentado de câncer” (Warnakulasuriya, Johnson e van der Waal, 2007). Houve nova revisão em 2020 (publicada em Oral Diseases, 2021); a redação exata dessa versão está PENDENTE de leitura no original. A ideia não muda: diagnóstico por exclusão.
Tentado: artigo de 2021 (doi 10.1111/odi.13704) bloqueado na Wiley e sem cópia aberta no Europe PMC; uma revisão irlandesa (JIDA 2024) cita a de 2021 com outra redação ("white patch of questionable risk having excluded all (other) potential causes"): duas redações secundárias diferentes, por isso não uso nenhuma como "vigente".

### C11. Tumores benignos e malignos (nível 0) — **PARCIAL** (câncer de boca sim; benignos, cistos e glândulas salivares não) [F17]
Local: `licoes[1].pontos[10].texto`, frase "PENDENTE: conteúdo de tumores bucais depende de livro ... sem fonte." Texto proposto (curto):
> Resumo do INCA (câncer de boca, versão para profissionais, atualizada em 08/12/2025): a maior parte dos tumores malignos da boca é carcinoma epidermoide (cerca de 95% dos casos). Principais fatores de risco: tabagismo e etilismo, que somam efeito; também HPV tipo 16, radiação solar (no lábio), excesso de gordura corporal, imunossupressão e exposições no trabalho; é mais frequente em homens brancos acima de 40 anos. Sinais: dor, nódulo, manchas (eritroplasia ou leucoplasia), dificuldade para engolir, fixação da língua, trismo, gânglio aumentado e sangramento. A confirmação é pela biópsia; o tratamento é cirúrgico na grande maioria dos casos; não há recomendação de rastreamento populacional. Tumores benignos, lesões císticas e glândulas salivares continuam PENDENTES de fonte.
Observação: os números (95%, 40 anos) são do INCA, fonte oficial; não são contagem de prova.

### C12. G0068 (epilepsia, 2 a 5 minutos) — **RESOLVIDO** (contexto) + conduta por escopo [F16]
Local: `licoes[5].pontos[2].texto`, frase "PENDENTE: conduta durante a crise e quando chamar socorro, em protocolo citado." Trocar por:
> Para entender o número: a Liga Internacional contra a Epilepsia (ILAE, 2015) considera que, na crise tônico-clônica, a partir de 5 minutos já se trata de estado de mal epiléptico; isso combina com a faixa “de 2 a 5 minutos” do enunciado. Conduta não é ensinada nesta apostila (não caiu na amostra).
Mapa `licoes[5].mapa.ramos[3].f[0]` "PENDENTE: protocolo citado" → "Conduta: fora desta apostila".

### C13. Emergências: protocolo de conduta (intro) e G0030 — **RESOLVIDO POR ESCOPO**
`licoes[5].intro`: trocar "PENDENTE: protocolo de emergências médicas no consultório odontológico a definir." por "Protocolo de conduta não é ensinado aqui; se a banca passar a cobrar, entra com fonte citada." `licoes[5].pontos[1]` (G0030): trocar "PENDENTE: conduta e diferença entre lipotimia e síncope em protocolo citado." por "Conduta não é ensinada aqui; diferença entre lipotimia e síncope: PENDENTE de fonte." (não achei fonte oficial aberta; manter PENDENTE só para a diferença).

### C14. G0308 (clorexidina e alveolite) — **RESOLVIDO** [F8]
Local: `licoes[0].pontos[8].texto`, frase "Mesmo assim, não use esta questão como protocolo de uso de clorexidina: PENDENTE fonte clínica." Trocar por:
> A revisão Cochrane (Daly e cols., 2022) confirma o gabarito: enxágues de clorexidina (0,12% e 0,2%) antes e 24 horas depois da extração REDUZIRAM bastante o risco de alveolite seca, com certeza moderada. Esquema de uso não é ensinado aqui.

### C15. G0052 (efeitos adversos dos antibióticos) — **PARCIAL** [F10]
Locais: `licoes[3].pontos[0].texto` e `licoes[3].tabela.titulo`. Só a clindamicina foi confirmada: a AHA 2021 diz que uma dose única de clindamicina pode causar infecção por Clostridioides difficile (diarreia) e por isso deixou de recomendá-la na profilaxia. Texto opcional após "...a sequência oficial foi C – B – D – A.": "(A AHA 2021 confirma o risco de diarreia por Clostridioides difficile com a clindamicina.)" Manter "PENDENTE: confirmar a lista de efeitos adversos em livro de farmacologia" para metronidazol, tetraciclina e penicilina (bulas oficiais não lidas nesta rodada).

### C16. G0125 (terço médio: qual parte do item está errada) — **NÃO RESOLVIDO** [F19 só parcial]
Local: `licoes[0].pontos[1].texto`. A AO Foundation confirma que a oclusão é "o parâmetro mais crítico" para refazer o contorno da face, mas NÃO diz a ordem "dentes antes de reduzir" nem fala do tecido mole. A fonte da questão parece ser o Hupp (Cirurgia Oral e Maxilofacial Contemporânea), livro fechado. Manter o PENDENTE como está.

### C17. G0049 (contraindicação × indicação de exodontia) — **NÃO RESOLVIDO**
Local: `licoes[0].pontos[6].texto`. O texto atual (dúvida de gabarito, siga o oficial) está seguro. A explicação provável (a alternativa E é uma INDICAÇÃO clássica de exodontia, não contraindicação) depende de livro de cirurgia fechado; não achei fonte aberta forte. Manter.

### C18. G0208, G0032, G0206, G0124, G0034, G0132 — **NÃO RESOLVIDO** (livro fechado; fora da lista prioritária)
Locais: `licoes[0].pontos[3]`, `[11]`, `[12]`, `[19]`; `licoes[2].pontos[0]`; `licoes[3].pontos[4]`. Os textos atuais já seguem o gabarito e marcam PENDENTE. Para G0206 (hemorragia), troca opcional por escopo: "O manejo do paciente com sangramento não é ensinado aqui."

### C19. G0159/G0314 (tempo de evolução da GEHA), G0205 (parótida), G0360 (anulada) — **RESOLVIDO POR ESCOPO** (sem fato novo)
- `licoes[1].pontos[2]`: trocar "PENDENTE: tempo de evolução e conduta em fonte clínica." por "Tempo de evolução: PENDENTE de fonte; conduta não é ensinada aqui."
- `licoes[2].pontos[6]` (G0205): trocar "PENDENTE: conduta e duração do quadro em fonte clínica." por "Conduta e duração não são ensinadas aqui."
- `licoes[3].pontos[5]` (G0360, anulada): trocar "PENDENTE: dose de cada analgésico em fonte pediátrica citada." por "Doses de analgésicos não são ensinadas aqui."

### C20. G0184, G0130, G0309, G0213 — **sem pendência**
G0184 (`licoes[1].pontos[6]`): dúvida fraca, texto aceitável, sem fonte nova; manter. G0130, G0309 e G0213: auditoria já sem achado; nada a mudar.

### C21. Livros de cirurgia, patologia, anestesia, anatomia e transcrição contra PDF — **NÃO RESOLVIDO** (decisão do dono / PDF ausente)
Locais: `limiteFonte`, `licoes[0].intro`, `licoes[1].intro`, `licoes[2].intro`, `licoes[4].intro`. Fontes abertas que substituem parte: F13 (anestesia), F10 (endocardite), F15 (infecções virais), F17 (câncer de boca), F11/F12 (hipertensão). Reher (Anatomia Aplicada, 3ª ed., 2020) segue como pista da própria banca.

---

## O que continua PENDENTE e por quê
1. **Leonard** (P4): só material didático (FONTE FRACA).
2. **Edição do Newman & Carranza e livro-texto** (P2, C21): decisão do dono; livros fechados.
3. **Gabarito da G0178 e texto da G0176** (P6, P8): precisa do PDF de 2021, que não está aqui nem foi achado na web.
4. **Prognóstico periodontal e temas do edital sem questão** (P9, P11): não pesquisado/sem fonte aberta lida.
5. **Diretriz brasileira de valvopatias e febre reumática** (C2): site da revista fora do ar nas tentativas.
6. **pKa de lidocaína, prilocaína, procaína** (C5) e **concentração 3% da mepivacaína** (C6).
7. **Pus no ducto = parotidite bacteriana** (C9): StatPearls bloqueado.
8. **Redação de 2020/2021 da leucoplasia** (C10): artigo fechado; secundárias divergem.
9. **Tumores benignos, cistos e glândulas salivares** (C11).
10. **Efeitos adversos de metronidazol, tetraciclina e penicilina** (C15).
11. **G0125, G0049, G0208, G0032, G0124, G0034, G0132, tempo da GEHA, lipotimia × síncope** (C13, C16-C19): dependem de livro fechado.
12. **Transcrição das questões contra o PDF** (P12, C21): PDFs ausentes.

## As 5 fontes abertas mais úteis para o aluno
1. Tabelas oficiais de estágios e graus (AAP, 2 páginas): https://www.perio.org/wp-content/uploads/2019/08/Staging-and-Grading-Periodontitis.pdf
2. Consenso de saúde e doenças gengivais 2017 (Chapple e cols., 2018; Tabelas 1 e 2): https://www.umw.edu.pl/sites/default/files/2022-04/Article2.pdf
3. Diretriz S3 da EFP para tratar a periodontite (2020): https://pmc.ncbi.nlm.nih.gov/articles/PMC7891343/
4. AHA 2021, profilaxia de endocardite (Tabelas 3, 4 e 5): https://doi.org/10.1161/CIR.0000000000000969
5. Guia de Vigilância em Saúde, Ministério da Saúde, 2024, v. 1 (sarampo, caxumba, varicela): https://www.gov.br/saude/pt-br/centrais-de-conteudo/publicacoes/svsa/sarampo/guia-de-vigilancia-em-saude-_-sarampo.pdf

## Riscos
- F2, F3 e F10 foram lidas em cópias do PDF da editora hospedadas em sites de terceiros (universidade, clínica); o conteúdo bate com a citação e o DOI, mas não baixei do site da editora (bloqueado, erro 403).
- F4 (Hill) foi lida numa reprodução de antologia; os metadados foram conferidos no Europe PMC.
- F7, F8 e F16: só o resumo oficial (o texto integral não abriu).
- Nenhum gabarito foi mudado; todos os avisos mantêm "siga o gabarito histórico".
- Nenhuma questão desses grupos tem contagem nova; nenhum número de frequência foi criado aqui.
