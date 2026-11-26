# Proposta 26/11/2026 — Apostila 07 (Periodontia): doenças periodontais necrosantes (classificação 2017)

Tarefa somente de pesquisa e proposta. Nenhum arquivo do curso foi alterado. Aplicar só depois de "aprovado" do dono.

Arquivo-alvo: `curso/apostila/periodontia.json`. Pontos lidos: `$.licoes[0].pontos[0]`, `$.licoes[0].pontos[5]`, `$.licoes[0].pontos[14]`.

## 0. Resumo

- A fonte indicada (guia EFP de S. Jepsen, "Systemic and other periodontal conditions", março/2019, `report-03.pdf`) **não tem seção sobre doenças necrosantes**. Ela só cita, na p. 8 ("Further reading"), o artigo de Herrera et al. A busca por "necrot" no PDF inteiro (9 páginas) achou só essa citação.
- A definição está no guia EFP irmão: **"Periodontitis" (Mariano Sanz e Maurizio Tonetti, março/2019, `report-02.pdf`)**, p. 1, 2 e 4. Usei esse guia como fonte principal.
- Apoio: resumos oficiais (Europe PMC) de Herrera et al. 2018 (PMID 29926942) e do consenso do grupo de trabalho 2 de Papapanou et al. 2018 (PMID 29926951).
- **Não consegui confirmar em fonte acessível** os três nomes do grupo (gengivite necrosante, periodontite necrosante, estomatite necrosante) nem a divisão por categoria de paciente. O texto completo de Herrera et al. (Wiley) respondeu 403 e não foi contornado; o Europe PMC não tem o texto completo (só "Subscription required"). Isso fica **PENDENTE** (seção 4).
- Trechos literais conferidos por script: **9/9**.
- Mudanças propostas: **2** (`pontos[5]` e `pontos[14]`). `pontos[0]` fica como está (ver conflito C3).

## 1. O que a banca considerou certo/errado (banco `curso/questoes-anteriores.json`)

| Questão | Prova | Nome usado | Gabarito oficial | O que vale |
|---|---|---|---|---|
| G0081 | Blumenau 2019, Periodontista, q. 29 | "Periodontite necrosante" | D | Necrose/ulceração da papila interdental, sangramento gengival, halitose, dor e perda óssea rápida = periodontite necrosante. Errados: periodontite, abscesso periodontal, gengivite plasmocitária, gengivite estreptocócica. |
| G0172 | Blumenau 2021, Periodontista, q. 28 | "Periodontite Ulcerativa Necrosante" | C | NÃO associado: *Escherichia coli*. Aparecem como associados: *Prevotella intermedia*, *Treponema* spp., "Porphyromona gingivalis" (grafia da prova), *Selenomonas* spp. |
| G0177 | Blumenau 2021, Periodontista, q. 33 | "Periodontite Ulcerativa Necrosante" | B | NÃO é fator de risco: hipertensão. Aparecem como fatores: estresse, tabagismo, HIV, deficiência hormonal. |
| G0267 | Blumenau 2023, Periodontista, q. 27 (cita Newman & Carranza) | "Lesão ulcerativa necrosante" | C | Agranulocitose: condição comumente relacionada = lesão ulcerativa necrosante. |
| G0559 | Biguaçu 2025 (outro município), q. 40 | "Periodontite ulcerativa necrosante" só como distrator | A | Resposta: cisto periodontal lateral (restos epiteliais de Malassez). A PUN aparece como alternativa errada. |
| G0593 | Biguaçu 2025 (outro município), q. 40 | não cita doença necrosante | B | Resposta: abscesso periapical (pus no ápice de dente não vital). Só fala de necrose pulpar; não é doença periodontal necrosante. |

Observações:
- A sigla "GUNA" **não aparece** em nenhuma questão do banco (busca por "necros", "GUN", "PUN", "ulcerativa" em enunciados e alternativas).
- A banca usa **os dois nomes**: o atual ("periodontite necrosante", 2019) e o antigo ("periodontite ulcerativa necrosante", 2021 e Biguaçu 2025). Nenhum gabarito depende de saber qual nome é o atual.

## 2. Achados na fonte (citação literal e página impressa)

Downloads feitos em 26/11/2026 para a pasta temporária da sessão (fora do repositório). Páginas conferidas uma a uma com `pdftotext -f N -l N`.

### F1. EFP, "Periodontitis" — Guidance for clinicians (Sanz M., Tonetti M., março/2019)
URL: https://www.efp.org/publications/projects/new-classification/guidance/report-02.pdf (acesso 26/11/2026)

- **T1** — p. 1 (capa; sem número impresso):
  > "Three forms of periodontitis have been identified: (1) periodontitis, (2) necrotising periodontitis, (3) periodontitis as a direct manifestation of systemic diseases."
- **T2** — p. 2:
  > "The forms of the disease previously described as "chronic" and "aggressive" are now described under the single category of "periodontitis"."
- **T3** — p. 4:
  > "Differential diagnosis to establish which form of the disease is present is based on patient history, the specific signs and symptoms of necrotising periodontitis, and the presence or absence of an systemic disease that definitively alters the immune response of the host."
- **T4** — p. 4:
  > "Necrotising periodontitis is characterised by a history of pain, the presence of ulceration of the gingival margin, and/or fibrin deposits at sites with characteristically decapitated gingival papillae and, in some cases, exposure of the marginal alveolar bone."

### F2. EFP, "Systemic and other periodontal conditions" — Guidance for clinicians (Jepsen S., março/2019)
URL: https://www.efp.org/publications/projects/new-classification/guidance/report-03.pdf (acesso 26/11/2026)

- **T5** — p. 8 (única menção ao tema no documento):
  > "Herrera D, Retamal-Valdes B, Alonso B, Feres M. Acute periodontal lesions (periodontal abscesses and necrotising periodontal diseases) and endo-periodontal lesions: S78-S94."

### F3. Herrera D, Retamal-Valdes B, Alonso B, Feres M. Acute periodontal lesions (periodontal abscesses and necrotizing periodontal diseases) and endo-periodontal lesions. J Periodontol 2018;89 Suppl 1:S85-S102. doi:10.1002/jper.16-0642 (resumo oficial, PMID 29926942)
URL: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:29926942%20AND%20SRC:MED&resultType=core&format=json (acesso 26/11/2026). Mesmo artigo publicado no J Clin Periodontol 45 Suppl 20:S78-S94 (citado em T5).

- **T6**: > "NPDs have three typical features: pain, bleeding, and ulceration of the gingival interdental papilla."
- **T7**: > "NPD progression, extent and severity mainly depended on host-related factors predisposing to these diseases."
- **T8**: > "NPD are clearly associated with the host immune response, which should be considered in the classification system for these lesions."

### F4. Papapanou PN, Sanz M, et al. Periodontitis: Consensus report of workgroup 2 of the 2017 World Workshop. J Periodontol 2018;89 Suppl 1:S173-S182. doi:10.1002/jper.17-0721 (resumo oficial, PMID 29926951)
URL: https://www.ebi.ac.uk/europepmc/webservices/rest/search?query=EXT_ID:29926951%20AND%20SRC:MED&resultType=core&format=json (acesso 26/11/2026)

- **T9**: > "Necrotizing periodontal diseases, whose characteristic clinical phenotype includes typical features (papilla necrosis, bleeding, and pain) and are associated with host immune response impairments, remain a distinct periodontitis category."

### Conferência por script
Script `conferir-necro.mjs` (na pasta temporária, fora do repo): normaliza espaços, aspas curvas e hifenização de quebra de linha; procura cada trecho no texto da página exata do PDF (T1 a T5) ou no `abstractText` do JSON (T6 a T9).
Resultado: **T1 a T9 OK — 9/9 trechos conferidos.**

## 3. Propostas (ANTES / DEPOIS)

Convenção: "tradução livre" = tradução minha do trecho em inglês; a referência entre colchetes aponta o trecho da seção 2.

### Mudança 1 — `$.licoes[0].pontos[5].texto`
(`ref` continua "1. Classificação e quadros clínicos · doenças periodontais necrosantes")

**ANTES (texto exato atual):**
> G0081 (2019) descreve a periodontite necrosante: processo inflamatório com necrose e ulceração da papila interdental, sangramento gengival, halitose, dor e perda óssea rápida (alternativa D). G0172 (2021) pergunta qual microrganismo NÃO está associado à periodontite ulcerativa necrosante: a resposta é Escherichia coli (C); as alternativas Prevotella intermedia, Treponema spp., Porphyromonas gingivalis e Selenomonas spp. aparecem como associadas. G0177 (2021) pergunta fatores de risco da mesma doença, EXCETO: aparecem estresse, tabagismo, HIV e deficiência hormonal como fatores; a alternativa que NÃO é fator de risco é a hipertensão (B).

**DEPOIS (proposta):**
> O que a classificação de 2017 diz. A classificação do World Workshop 2017 (AAP/EFP) reconhece três formas de periodontite: periodontite, periodontite necrosante e periodontite como manifestação direta de doença sistêmica (tradução livre; EFP, guia "Periodontitis", Sanz e Tonetti, 2019, p. 1). A periodontite necrosante se caracteriza por história de dor, ulceração da margem gengival e/ou depósitos de fibrina em locais com papilas gengivais "decapitadas" e, em alguns casos, exposição do osso alveolar marginal (tradução livre; mesmo guia, p. 4). As doenças periodontais necrosantes têm três sinais típicos: dor, sangramento e ulceração da papila interdental (tradução livre; Herrera et al., 2018, resumo). Elas estão claramente associadas à resposta imune do hospedeiro, e a progressão, a extensão e a gravidade dependem principalmente de fatores do hospedeiro (tradução livre; Herrera et al., 2018, resumo). Fontes: https://www.efp.org/publications/projects/new-classification/guidance/report-02.pdf e resumo de Herrera et al. 2018 (J Periodontol 89 Suppl 1:S85-S102, PMID 29926942), consultados em 26/11/2026.
>
> O que a banca cobrou. G0081 (2019) descreve a periodontite necrosante: processo inflamatório com necrose e ulceração da papila interdental, sangramento gengival, halitose, dor e perda óssea rápida (alternativa D). G0172 (2021) pergunta qual microrganismo NÃO está associado à periodontite ulcerativa necrosante: a resposta é Escherichia coli (C); as alternativas Prevotella intermedia, Treponema spp., Porphyromonas gingivalis e Selenomonas spp. aparecem como associadas. G0177 (2021) pergunta fatores de risco da mesma doença, EXCETO: aparecem estresse, tabagismo, HIV e deficiência hormonal como fatores; a alternativa que NÃO é fator de risco é a hipertensão (B).
>
> Dica do autor (não é da fonte): a banca usa os dois nomes. "Periodontite necrosante" é o nome atual (G0081); "periodontite ulcerativa necrosante" é o nome antigo, ainda usado nas provas de 2021 (G0172, G0177). Na prova, trate os dois como a mesma doença. Para reconhecer o quadro, pense em: papila "cortada" e necrosada, dor, sangramento, mau hálito, em paciente com defesa baixa (estresse, fumo, HIV).

Notas da Mudança 1:
- O parágrafo "O que a banca cobrou" é o texto atual, **sem alteração**.
- Microrganismos (G0172) e fatores de risco (G0177) continuam apoiados só no gabarito da banca; as fontes acessadas não listam microrganismos nem fatores de risco específicos (só "fatores do hospedeiro"/"resposta imune"), então não acrescentei nada sobre isso.
- "Halitose" e "perda óssea rápida" vêm do enunciado do G0081, não das fontes 2017; não estão no parágrafo da classificação.

### Mudança 2 — `$.licoes[0].pontos[14].texto`
(acrescentar uma frase no fim; o resto fica igual)

**ANTES (texto exato atual):**
> G0263: manifestações bucais e periodontais da leucemia: infiltrações leucêmicas, sangramento, ulcerações bucais e infecções, as quatro corretas (A). G0267: a agranulocitose é uma neutropenia mais grave, envolvendo neutrófilos, basófilos e eosinófilos; a condição clínica comumente relacionada é a lesão ulcerativa necrosante (C). As alternativas erradas eram redução do volume gengival, espaço de bolsa normal, manchamento dentário e sangramento gengival espontâneo. Ideia: defesa baixa do organismo, então infecção e necrose; é por isso que as doenças necrosantes aparecem aqui.

**DEPOIS (proposta):**
> G0263: manifestações bucais e periodontais da leucemia: infiltrações leucêmicas, sangramento, ulcerações bucais e infecções, as quatro corretas (A). G0267: a agranulocitose é uma neutropenia mais grave, envolvendo neutrófilos, basófilos e eosinófilos; a condição clínica comumente relacionada é a lesão ulcerativa necrosante (C). As alternativas erradas eram redução do volume gengival, espaço de bolsa normal, manchamento dentário e sangramento gengival espontâneo. Ideia: defesa baixa do organismo, então infecção e necrose; é por isso que as doenças necrosantes aparecem aqui. A classificação de 2017 confirma essa ligação: as doenças periodontais necrosantes estão associadas a falhas na resposta imune do hospedeiro (tradução livre; consenso do grupo 2 do World Workshop 2017, Papapanou et al., J Periodontol 2018;89 Suppl 1:S173-S182, resumo, PMID 29926951, consultado em 26/11/2026). Veja o ponto "doenças periodontais necrosantes" da parte 1.

Nota: a frase nova não diz que a agranulocitose consta da fonte (o resumo não cita agranulocitose); só a associação geral com a imunidade do hospedeiro [T9].

### Sem mudança — `$.licoes[0].pontos[0]`
Texto atual separa "periodontite crônica" e "periodontite agressiva" em blocos. Ver conflito C3; não proponho alteração neste lote (está fora do tema "necrosantes").

## 4. Possíveis conflitos com os gabaritos e como o texto os trata

- **C1. Nome antigo x nome novo.** G0172 e G0177 (2021) e o distrator do G0559 usam "Periodontite Ulcerativa Necrosante" (nome de 1999); G0081 (2019) usa "periodontite necrosante" (nome de 2017). O texto proposto apresenta o nome de 2017 com fonte e põe a equivalência como "Dica do autor (não é da fonte)", pois **não achei em fonte oficial acessível** a frase que diga literalmente que o nome antigo foi substituído. Nenhum gabarito muda: as respostas (D, C, B) independem do nome.
- **C2. "GUNA".** Não aparece no banco. O texto proposto não usa a sigla. Se o dono quiser citá-la (gengivite ulcerativa necrosante aguda, nome antigo da gengivite necrosante), entra só como "Dica do autor", pois não está nas fontes conferidas.
- **C3. Crônica/agressiva.** A fonte diz que crônica e agressiva passaram a ser uma única categoria, "periodontite" [T2]. O `pontos[0]` ainda separa crônica e agressiva (não conferi neste lote quais questões do banco usam esses nomes). Não altero agora (fora do tema); fica como alerta para uma proposta própria.
- **C4. G0267 "lesão ulcerativa necrosante".** A questão cita Newman & Carranza. O texto não contradiz: só acrescenta a ligação geral com a imunidade do hospedeiro [T9].
- **C5. Microrganismos e fatores de risco (G0172, G0177).** As fontes acessadas não os listam; o texto mantém só o que o gabarito diz, sem afirmar que "a classificação 2017" os cita.

## 5. PENDENTE (não confirmado em fonte acessível)

1. **Os três nomes do grupo** "doenças periodontais necrosantes": gengivite necrosante, periodontite necrosante e estomatite necrosante. Os resumos e guias acessados confirmam só "necrotising periodontitis" e "necrotizing periodontal diseases". Fonte provável: texto completo de Herrera et al. 2018 (J Clin Periodontol 45 Suppl 20:S78-S94) ou Caton et al. 2018 (J Clin Periodontol 45 Suppl 20:S1-S8, tabela da classificação; o resumo, PMID 29926489, não traz a tabela). Wiley respondeu 403 em 26/11/2026; não foi contornado. Sugestão de frase para quando confirmar: "O grupo das doenças periodontais necrosantes inclui gengivite necrosante, periodontite necrosante e estomatite necrosante."
2. **Classificação por categoria de paciente** (pacientes com comprometimento sistêmico grave e crônico x temporário/moderado, citada pelo pedido) — não confirmada; está no texto completo de Herrera et al., inacessível.
3. **Tratamento** das doenças necrosantes (debridamento, antimicrobiano etc.) — nenhuma fonte acessada trata disso; nada proposto.
4. **Equivalência oficial** "periodontite ulcerativa necrosante (1999) = periodontite necrosante (2017)" — sem trecho literal de fonte oficial; por isso ficou como "Dica do autor".
5. **Microrganismos e fatores de risco** específicos (G0172, G0177) — apoiados só no gabarito da banca.
