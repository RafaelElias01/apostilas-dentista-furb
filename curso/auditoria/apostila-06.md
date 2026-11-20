# Auditoria da Apostila 06: Dentística, Materiais, Oclusão, Endodontia e Traumatismo

- **Arquivo auditado:** `curso/apostila/dentistica-endodontia-trauma.json`
- **Auditor:** Opus. **Data:** 2026-11-19.
- **Com o que conferi:** `curso/roteiro-apostilas.md` (seções 0 e Apostila 06), `curso/radar-banca.json`, `curso/questoes-anteriores.json` (banco), `curso/edital.md` e algumas fontes públicas (lista no fim).
- **Limite:** os PDFs das provas não estão nesta máquina. Por isso, enunciados e gabaritos foram conferidos **só contra o banco**, não contra a prova impressa.
- **Siglas:**
  - IADT: International Association of Dental Traumatology, a associação internacional que publica as diretrizes de traumatismo dentário.
  - CG: prova do cargo Clínico Geral.
  - G0xxx: código do grupo da questão no banco.

## Veredito: PRONTA COM CORREÇÕES LISTADAS

A apostila está fiel ao banco. Conferi todos os 67 pontos: todo gabarito citado bate com o banco, e não há resposta de questão anulada ensinada como certa. Nenhum número clínico aparece sem o código da questão e sem a marca PENDENTE. Ainda assim, há 3 achados MÉDIOS que podem fazer o aluno decorar algo errado ou generalizar demais (A1 a A3) e vários BAIXOS. Corrija os 3 médios antes de gerar o PDF.

## 1. Contagens: conferem

| Item | Esperado (roteiro e radar) | Na apostila | Contagem direta no banco (`alvo: true`, por `topico`) |
|---|---|---|---|
| Lições | 5 | 5 | n/a |
| Pontos | 67 | 67 (30 + 18 + 9 + 5 + 5) | n/a |
| Questões únicas | 76 | 76 | 76 (endo 30, dent 21, trauma 14, oclusão/DTM 6, radio 5) |
| Anuladas | 3, todas de `dent` | 3 (G0142, G0227, G0231) | 3, todas de `dent` |
| Questões usáveis | 73 | soma de `qtdQuestoes`: 30 + 18 + 14 + 6 + 5 = 73 | 73 |
| Questões por edição | tabela do roteiro | intros e ranking | batem 100% |
| Questões em prova de CG | 2 / 18 / 5 / 3 / 1 | iguais | batem |

Sobram 0 questões para o simulado. O gerador só monta o simulado quando sobram 5 ou mais, então esta apostila não terá simulado. Isso é coerente com a escolha de usar todas as questões nas lições.

## 2. Estrutura: confere
- `titulo` sem "Apostila 06".
- `arquivoPdf` = `apostila-06-dentistica-endodontia-trauma.pdf`, prefixo certo.
- `numero` = 6.
- `comoUsar` traz os três avisos obrigatórios: amostra pequena, frequência é tendência e não garantia, sem vínculo com a FURB.
- Nada copiado do modelo FUNDATEC. A busca por "Brigada", "FUNDATEC", "FAURGS" e "HCPA" no arquivo deu 0 ocorrências.

## 3. Achados, por gravidade

| # | Gravidade | Onde | Problema | Correção sugerida (texto exato) |
|---|---|---|---|---|
| A1 | MÉDIO | L3 Traumatismo, ponto "Avulsão em permanente · antes de reimplantar (G0126)" | A "dúvida de gabarito" do Sonnet não procede. O item B é a exceção porque o próprio texto dele está errado: ele promete "excelentes resultados" com até 24 horas fora do alvéolo. A diretriz IADT de 2020 diz o contrário: com 60 minutos ou mais de tempo extra-alveolar a seco, as células do ligamento periodontal já não são viáveis. Além disso, o ponto repete como verdadeiro o item C ("polpa pode sobreviver se reimplantado em duas horas"). Esse número só vem da questão e está sem marca. | Trocar o texto por: "A prova G0126 pediu o fator que NÃO deve ser considerado do jeito descrito (EXCETO) antes do reimplante de dente permanente avulsionado. O gabarito oficial foi a alternativa B, que dizia que só períodos acima de 24 horas fora do alvéolo dão maus resultados e que reimplantar dentro de 24 horas dá resultados excelentes. Essa afirmação está errada justamente no tempo: a diretriz da IADT de 2020 sobre avulsão (Fouad et al., Dental Traumatology 2020;36:331-342) diz que, depois de 60 minutos ou mais fora da boca a seco, as células do ligamento periodontal já não são viáveis. Os outros itens foram tratados como fatores válidos: ausência de doença periodontal avançada, estágio de formação da raiz, alvéolo razoavelmente intacto e ausência de contraindicação ortodôntica. O prazo de 'duas horas' para a polpa sobreviver, citado no item C, vem só da questão (PENDENTE de diretriz)." Se o dono não aceitar citar a IADT agora, manter só: "o item B é a exceção porque exagera o tempo aceitável fora do alvéolo (PENDENTE: tempo exato na diretriz IADT)". |
| A2 | MÉDIO | L3, ponto "Fraturas e polpa · tratamento das fraturas em permanentes (G0306)" | O ponto transforma a alternativa da banca em regra geral: "em dentes permanentes com fratura coronorradicular, a restauração é feita depois de curetagem pulpar, pulpotomia ou pulpectomia". Na conduta atual, a terapia pulpar depende de haver exposição da polpa. O aluno pode decorar que toda fratura coronorradicular leva a tratamento pulpar. | Trocar a primeira frase por: "Na prova G0306 (2025), a alternativa marcada como certa foi: 'dentes permanentes com fratura coronorradicular devem ser restaurados após curetagem pulpar, ou pulpotomia ou pulpectomia'. Guarde isso como resposta desta questão. Na diretriz da IADT, a necessidade de tratamento pulpar depende de haver exposição da polpa (PENDENTE: conferir a conduta na diretriz IADT de 2020 sobre fraturas e luxações)." |
| A3 | MÉDIO | L2 Dentística, ponto "Materiais · amálgama (G0139)" | O texto afirma que "caninos (por suportar grande carga)" é indicação do amálgama, como se fosse fato. Isso é discutível: o amálgama não é material de escolha em dente anterior. A própria banca hesitou: no gabarito preliminar a resposta era a C, "caninos", e só depois dos recursos passou para a D (banco: `gabaritoPreliminar: "C"`, `gabaritoOficial: "D"`). | Trocar por: "Na prova G0139 pediram a alternativa que NÃO é indicação do amálgama, e o gabarito oficial, depois dos recursos, foi 'quando há grande perda de estrutura dental'. Atenção: no gabarito preliminar a resposta era 'realizar em caninos, por suportar grande carga', e a banca a trocou depois dos recursos. Pela lógica do gabarito final, as outras alternativas (classe I e II, caninos, bruxismo, má higiene bucal) foram tratadas como indicações. Não leve isso como regra clínica: PENDENTE conferir as indicações do amálgama em livro de Dentística." |
| A4 | BAIXO | L1, ponto G0153 | A alternativa E ("antes do preparo radicular, remover todo o tecido cariado, raspas de dentina e tecido necrótico da câmara") parece também correta, mas não foi citada nem marcada como dúvida. | Acrescentar: "PENDENTE: a alternativa E (remover cárie, raspas e tecido necrótico da câmara antes do preparo radicular) também parece correta; conferir o texto no PDF da prova. Na prova, vale o gabarito oficial (A)." |
| A5 | BAIXO | L1, ponto G0148 (dúvida de gabarito) | A dúvida pode ser mais bem explicada. A literatura lista como desvantagem da guta-percha a **falta de rigidez**, que dificulta usá-la em canais estreitos. A palavra "mobilidade" do banco pode ser erro de transcrição de "maleabilidade" ou "flexibilidade". | Trocar a frase "PENDENTE: dúvida de gabarito..." por: "O gabarito é coerente com a ideia de que a guta-percha é pouco rígida, o que dificulta usá-la em condutos estreitos. A palavra 'mobilidade' pode ser erro de transcrição (conferir no PDF da prova). PENDENTE: livro citado." |
| A6 | BAIXO | L1, ponto G0248 | A questão diz "impulsos **eferentes**" da polpa, mas a sensação vem de fibras **aferentes** (sensitivas). A apostila copia o termo errado sem avisar. | Acrescentar: "(o enunciado diz 'eferentes'; o termo correto para fibras sensitivas é 'aferentes', mas a resposta não muda)". |
| A7 | BAIXO | L1, `macete` | O trecho "polpa morta = necropulpectomia e, se infecção persistente, retratamento" mistura os conceitos. Retratamento é para dente que **já teve canal tratado** e fracassou (G0063). | Trocar por: "polpa morta = necropulpectomia; dente já tratado com sinais de insucesso = retratamento (G0063)". |
| A8 | BAIXO | L1, ponto G0057 | A frase "traziam a descrição da técnica da bissetriz" sugere que descrever a bissetriz é errado. O erro da alternativa A é dizer que o raio central incide "longitudinalmente" à bissetriz. O correto, e consensual, é perpendicular. | Trocar por: "...e descreviam errado a técnica da bissetriz (o raio central deve incidir perpendicularmente à bissetriz, e não 'longitudinalmente')". |
| A9 | BAIXO | L4 Oclusão, ponto G0183 e pegadinha G0183 | A pegadinha ("lista com um item que não é DTM (a prova listava gengivite...)") pode levar o aluno a marcar "gengivite". O gabarito oficial é "sensação de oclusão positiva". | Trocar a pegadinha por: "G0183: a resposta oficial (o que NÃO é DTM) foi 'sensação de oclusão positiva'. A alternativa 'gengivite' também parece não ser DTM, e por isso a questão tem dúvida de gabarito. Na prova, vale o gabarito oficial." |
| A10 | BAIXO | L5 Radiologia, ponto G0129 | O ponto explica só o erro sobre tecido mole. A mesma alternativa também erra ao dizer que a tomografia de feixe cônico "requer muito mais radiação" que a tomografia convencional. O consenso é o contrário: o feixe cônico usa menos radiação. | Acrescentar: "Outro erro do item: o feixe cônico costuma expor o paciente a menos radiação que a tomografia médica convencional, e não 'muito mais' (PENDENTE: fonte de radiologia)." |
| A11 | BAIXO | L3, `intro` | A frase diz "Subassuntos, em ordem:", mas lista 3 antes de 5. A frase "(1 cada, mais 2 de fraturas e polpa)" também confunde. | Trocar por: "Subassuntos: trauma na dentição decídua (5 questões), lesões dos tecidos de suporte (3), fraturas e polpa (2) e, com 1 questão cada, avulsão em permanente, exame do traumatizado, tecidos moles e escurecimento pós-trauma." |
| A12 | BAIXO | L3, `tabela` (linha Subluxação) | "com sangramento pelo sulco" parece obrigatório. Sangramento pode ocorrer na subluxação, mas não é obrigatório. | "Mobilidade sem mudança de posição; pode haver sangramento pelo sulco". |
| A13 | BAIXO | L2, pontos G0141 e G0143 | Faltou avisar que o gabarito mudou depois dos recursos. Na G0141 o preliminar era D ("composta") e o final é B ("complexa"); na G0143 o preliminar era B e o final é E. Saber disso ajuda o aluno a entender por que a banca pode ser imprevisível. | Acrescentar em cada um: "(o gabarito preliminar era outro; a banca mudou depois dos recursos)". |
| A14 | BAIXO | `limiteFonte` e L3 | "IADT: versão e ano a definir". Pela busca de hoje, a versão atual é a de 2020, publicada na revista Dental Traumatology. | Quando o dono aprovar a fonte: "Diretrizes da IADT de 2020 (Dental Traumatology 2020;36(4); introdução geral nas p. 309-313; avulsão de permanentes nas p. 331-342)". |

**Itens que conferi e estão corretos** (sem correção):
- Endodontia: G0058, G0240, G0246, G0147, G0302, G0317, G0237, G0238, G0054, G0056, G0152, G0157, G0061, G0245, G0062, G0242, G0316, G0155, G0150, G0241, G0055, G0063, G0046, G0243 e G0318.
- Dentística: G0047, G0251, G0253, G0367, G0357, G0144, G0235, G0137, G0138, G0244, G0048, G0361, G0313, G0354 e G0358.
- Traumatismo: G0035, G0305, G0167, G0070, G0043, G0071, G0257, G0374, G0065, G0121, G0303 e G0239.
- Oclusão e DTM: G0123, G0364, G0173, G0229 e G0230.
- Radiologia: G0370, G0146, G0156 e G0247.

Em todos esses, o gabarito e as alternativas descritas batem com o banco. A G0047 foi conferida linha a linha: B–C–E–A–D corresponde a flúor, compatibilidade biológica, coeficiente de expansão térmica, adesividade e resistência à tração.

## 4. Números clínicos: todos vêm de questão real

| Número | Questão | Situação |
|---|---|---|
| Canino inferior 25 mm | G0152 | Bate com o banco; marcado PENDENTE. |
| Forame a 0,5–1 mm do ápice | G0056 | Bate; PENDENTE. |
| Conicidade 0,02 da lima K | G0245 | Bate. É a conicidade padrão da norma ISO/FDI (conceito consensual; não confirmei a norma na web). |
| Licor de Labarraque 2,5% | G0062 | Bate; PENDENTE. As concentrações erradas aparecem só como "erradas". |
| Álcool isopropílico 70%, EDTA 17%, hipoclorito 5,25% e 2,6% | G0242 | Bate. EDTA e hipoclorito aparecem só como alternativas erradas. |
| Ligamento > 2 mm | G0063 | Bate; PENDENTE. |
| 1,8 mm de dentina = "média" | G0138 | Bate; PENDENTE das faixas. |
| Fator C = 5 | G0253 | Bate. **Confirmado** (ver fontes): numa classe I há 5 paredes aderidas e 1 face livre, e o fator C é a razão entre as duas, portanto 5. |
| 24–48 horas (ionômero) | G0047 | Bate (texto da questão). |
| "24 horas" e "duas horas" | G0126 | Ver achado A1. |

Nenhum número de dose, anestésico ou antibiótico aparece nesta apostila.

## 5. Dúvidas de gabarito marcadas pelos Sonnets: minha avaliação
- **G0151** (fatores intrínsecos do acesso): o aviso é bom. Sem o livro, não dá para resolver. Manter o PENDENTE e não ensinar a classificação.
- **G0148** (guta-percha): o gabarito é coerente com a literatura ("falta de rigidez"). Ver A5.
- **G0126** (reimplante): a dúvida não procede; o item B é falso pelo tempo. Ver A1.
- **G0183** (o que não é DTM): a dúvida procede, porque "gengivite" também não é DTM. O texto está seguro, mas a pegadinha deve ser reescrita (A9).
- **G0139**: ver A3. O gabarito mudou depois dos recursos.
- **G0055** (acidentes): o gabarito F–V–V–F–V bate com o banco. O aviso de conferir as definições em livro é suficiente.
- **Questões anuladas** (G0142, G0227, G0231): citadas só como anuladas. Nenhuma resposta delas é ensinada.

## 6. O que confirmei em fonte (busca de 2026-11-19)
- **Diretrizes da IADT de 2020:**
  - avulsão de permanentes: Fouad et al., Dental Traumatology 2020;36:331-342;
  - mais de 60 minutos de tempo extra-alveolar a seco = células do ligamento periodontal não viáveis;
  - dente decíduo avulsionado não deve ser reimplantado.
  - Fontes: cópia do texto da diretriz na Universidade de Leeds (https://eprints.whiterose.ac.uk/161687/1/IADT%20guidelines%20-%20Avulsion%20of%20permanent%20teeth.pdf) e endosso da AAPD (https://www.aapd.org/research/oral-health-policies--recommendations/guidelines-for-the-management-of-traumatic-dental-injuries-2-avulsion-of-permanent-teeth/). Introdução geral da IADT 2020: Dental Traumatology 2020;36(4):309-313 (https://www.aapd.org/globalassets/media/policies_guidelines/e_iadt-gen-intro.pdf).
- **Fator C:** é a razão entre superfícies aderidas e livres (Feilzer, De Gee e Davidson, J Dent Res 1987). Classe I = 5. Fontes: https://en.wikipedia.org/wiki/Configuration_factor e o resumo do artigo na Journal of Adhesive Dentistry (https://www.quintessence-publishing.com/gbr/en/article/842453/the-journal-of-adhesive-dentistry/2003/02/microtensile-dentin-bond-strength-of-self-etching-and-single-bottle-adhesive-systems-in-different-cavity-configurations). A Wikipédia é fonte fraca; o artigo original não foi aberto.
- **Desvantagem da guta-percha = falta de rigidez e dificuldade em canal estreito:** https://www.aegisdentalnetwork.com/go/e24968 e https://pmc.ncbi.nlm.nih.gov/articles/PMC6632621/table/T4 (fontes secundárias).

## 7. O que NÃO confirmei
- O texto das questões contra os PDFs das provas (os PDFs não estão nesta máquina).
- O comprimento médio dos dentes (G0152), as faixas de profundidade da cavidade (G0138), a classificação dos fatores intrínsecos e extrínsecos do acesso (G0151), a tabela de soluções de hipoclorito (G0062) e o limite de 2 mm do ligamento (G0063).
- A conduta da IADT 2020 para fratura coronorradicular (A2), do artigo de Bourguignon et al.: não abri o texto.
- A paginação do artigo da IADT 2020 sobre dentição decídua.
- A afirmação de que o feixe cônico usa menos radiação que a tomografia convencional (A10). É conceito consensual, mas não busquei fonte.
- O artigo de Machado et al. (2022) e o livro de Hargreaves, citados pela banca.
