# Auditoria de fatos: Apostila 05 (Cariologia, Prevenção, Saúde Bucal Coletiva e Odontopediatria)

- **Arquivo auditado:** `curso/apostila/cariologia-prevencao-odontopediatria.json`
- **Data:** 2026-11-19. Auditor: Opus. Só auditoria; a apostila **não** foi alterada.
- **Comparei com:** `curso/questoes-anteriores.json` (o banco de questões), `curso/radar-banca.json`, `curso/roteiro-apostilas.md` (seções 0 e Apostila 05) e `curso/edital.md` (parte própria do Clínico Geral, p. 49, e do Odontopediatra, p. 48).
- **Fonte externa:** também consultei o *Guia de recomendações para o uso de fluoretos no Brasil* (Ministério da Saúde, 2009).
- **Limite:** os PDFs originais das provas não estão nesta máquina.

## Veredito: PRONTA COM CORREÇÕES LISTADAS

Os gabaritos citados batem com o banco. Nenhum número clínico foi inventado: todos vêm de questão real, com o código G0xxx. Não achei nada CRÍTICO. Há seis achados MÉDIOS de texto que pode levar o aluno a decorar algo errado, em G0161, G0165, G0366, CPO-D, G0353 e “cárie infecciosa”. Também há duas questões que dependem de imagem que não está no banco.

## 1. Contagens (conferidas)

| Item | Esperado | Na apostila | Banco (contei eu) | Situação |
|---|---|---|---|---|
| Lições | 5 | 5 | — | OK |
| Pontos | 38 | 18 + 6 + 6 + 5 + 3 = 38 | — | OK |
| Questões únicas | 41 | 41 | ped 20, prev.epi_bucal 7, cario 6, prev.fluor 5, clin.plano_tratamento 1, prev.saude_coletiva 1, clin.pacientes_especiais 1 = 41 | OK |
| Anuladas | 0 | 0 | 0 | OK |
| Questões nas lições (`qtdQuestoes`) | 41 | 20 + 7 + 6 + 5 + 3 = 41 | — | OK (sem simulado) |
| Em prova do Clínico Geral | 12 | 12 (2 + 2 + 4 + 1 + 3) | G0042, G0363; G0145, G0366; G0134, G0140, G0352, G0359; G0369; G0050, G0353, G0362 | OK |
| Radar | 41 | — | `radar-banca.json`: 41 | OK |

Os subassuntos de Odontopediatria somam 5 + 4 + 4 + 4 + 1 + 1 + 1 = 20, com empate declarado. Bate.

## 2. Achados, por gravidade

| # | Grav. | Onde | O que está errado ou duvidoso | Correção sugerida (texto exato) |
|---|---|---|---|---|
| 1 | MÉDIO | L4 flúor, pegadinha G0161 (`pegadinhas[4]`) | A frase se contradiz: “marcar como errada a alternativa sobre alta frequência e baixa concentração de flúor, quando ela foi o ‘EXCETO’ oficial”. Numa questão EXCETO, a resposta oficial **é** a que se marca como “não serve”. O aluno fica sem saber o que marcar. | “G0161: na prova, o gabarito oficial (A) foi justamente ‘manutenção constante de regime de alta frequência e baixa concentração de flúor’ como o que NÃO é recurso para controlar os fatores etiológicos. Veja no ponto da lição por que esse gabarito é discutível.” |
| 2 | MÉDIO | L4 flúor, ponto “Recursos preventivos…” (G0161) | A dúvida do Sonnet procede. O Guia do Ministério da Saúde (2009, p. 12) diz que manter flúor “constantemente na cavidade bucal” é “o principal mecanismo de sua ação na prevenção da cárie”. Risco: o aluno decorar que esse regime não previne cárie. Hipótese para o gabarito, não confirmada: o enunciado pede recursos “para o controle dos fatores etiológicos e determinantes”, e o flúor não remove o biofilme nem o açúcar; ele age sobre a des e a remineralização. | Acrescentar ao fim do ponto: “Atenção: o Guia de recomendações para o uso de fluoretos no Brasil (Ministério da Saúde, 2009, p. 12) afirma que a presença de flúor constantemente na boca é o principal mecanismo de ação do flúor na prevenção da cárie. Uma leitura possível do gabarito é que o enunciado pedia recursos que controlam os FATORES ETIOLÓGICOS (biofilme e açúcar), e o flúor não age sobre eles, e sim sobre a desmineralização. Não decore que ‘baixa concentração e alta frequência não previne cárie’.” |
| 3 | MÉDIO | L1 odontopediatria, ponto “plano terminal dos segundos molares decíduos” (G0165) | A dúvida procede, e o PENDENTE é bom, mas falta dizer o essencial. A alternativa E, dada como EXCETO (“plano reto, degrau mesial para a mandíbula e degrau distal para a mandíbula”), é **exatamente** a descrição clássica de Baume. O gabarito parece trocado, ou a transcrição está errada. | Acrescentar: “Cuidado: a descrição clássica de Baume (1950) é justamente ‘plano terminal reto, degrau mesial para a mandíbula e degrau distal para a mandíbula’, o texto da alternativa E. Ou seja, o gabarito desta questão contraria o livro. Para estudar, decore a descrição de Baume; não decore a alternativa E como ‘errada’.” |
| 4 | MÉDIO | L2 epidemiologia, ponto “Prevalência da doença periodontal” (G0366) e pegadinha 6 | O gabarito mudou de **B** (preliminar: prevalência acima de 90%) para **C** (definitivo: relação com condições socioeconômicas). A apostila descreve a alternativa A como “variação da inflamação com a idade **como regra**”, mas “como regra” não está na questão. A alternativa diz só: “A presença de inflamação gengival varia de acordo com a idade do paciente”, frase que a literatura em geral aceita. Risco: decorar como falsas as alternativas A e B, que foram defensáveis (B chegou a ser o gabarito preliminar). | “O gabarito definitivo foi C (a doença periodontal está relacionada com as condições socioeconômicas); o preliminar era B (prevalência média acima de 90%), e a banca mudou depois dos recursos. Isso mostra que mais de uma alternativa era defensável: guarde a ideia do gabarito definitivo, sem decorar as outras como ‘falsas’. Também não eram a resposta: variação da inflamação gengival com a idade, alta severidade na maioria dos dentes de crianças e adolescentes, e controle com redução significativa da prevalência.” Na pegadinha: “G0366: escolher ‘prevalência acima de 90%’ (foi o gabarito preliminar, depois trocado) ou ‘doença bem controlada’; o definitivo é a relação com as condições socioeconômicas.” |
| 5 | MÉDIO | L3 cariologia, ponto “Atividade da lesão de cárie” | “A cárie é uma doença crônica e infecciosa” vem do enunciado de G0140, mas está escrita como fato. A definição atual (Pitts et al., 2017) é de doença “mediada por biofilme, dependente do açúcar, multifatorial e dinâmica”, e não de infecção no sentido clássico. Convém dizer de onde veio a frase. | “O enunciado de G0140 chama a cárie de ‘doença crônica e infecciosa’. A literatura atual a descreve como doença mediada pelo biofilme, dependente do açúcar, multifatorial e dinâmica (Pitts et al., Nature Reviews Disease Primers, 2017). Se a banca repetir a frase de G0140, não brigue com ela.” |
| 6 | MÉDIO | L2 epidemiologia, ponto “Índices de cárie: CPO-D e ceo” (macete) | O macete “a letra D do CPO-D lembra ‘dentes permanentes’” está errado. O **D** quer dizer **dente** (a unidade contada; CPO-S conta superfícies). Quem indica dente permanente é a sigla em **maiúsculas**; a sigla em minúsculas (ceo-d) indica decíduo. | “Memorize: letras MAIÚSCULAS (CPO-D) = dentes permanentes; letras minúsculas (ceo-d) = dentes decíduos. O D final quer dizer ‘dente’ (conta-se por dente; CPO-S conta por superfície).” |
| 7 | MÉDIO | L2 ponto “Câncer bucal…”, L5 ponto “Saúde bucal coletiva”, tabela da L5 (G0353) | O texto vai além da questão. G0353 diz que o câncer bucal “faz parte das doenças de maior ocorrência… e de interesse” da saúde coletiva. A apostila escreve “a doença bucal de maior interesse” e, na L5, “de maior ocorrência”. O aluno pode decorar que o câncer bucal é a doença bucal mais comum, o que não é verdade. | L2 e L5: “Em G0353 (2021C), entre as alternativas, a única que ‘faz parte das doenças de maior ocorrência na cavidade bucal e de interesse da saúde coletiva’ foi o câncer bucal; as outras (estomatite herpética, língua geográfica, afta e candidose) não são agravos de vigilância coletiva.” Tabela: “Câncer bucal: entre as alternativas, o agravo de interesse da saúde coletiva”. |
| 8 | BAIXO | L4 flúor, ponto G0077 e tabela | O número está correto como dado da questão, e a apostila já manda conferir em diretriz. Do Guia MS 2009 (p. 33) dá para acrescentar, com fonte: (a) o verniz estudado é de NaF a 2,26% de F (23.000 ppm); “verniz a 5%” é a concentração do sal NaF, e o mesmo valor (22.600 ppm) aparece em G0369 B; (b) o Guia recomenda “no mínimo, duas aplicações anuais” para pacientes com atividade de cárie, e não 4 sessões semanais. O “4 sessões semanais” é o protocolo da questão. O Guia (p. 28) também confirma por que os bochechos de G0077 estão errados: NaF 0,05% é diário e NaF 0,2% é semanal ou quinzenal. A questão inverteu os dois. | Acrescentar: “Para comparação, o Guia de recomendações para o uso de fluoretos no Brasil (Ministério da Saúde, 2009, p. 33) descreve o verniz de fluoreto de sódio com 2,26% de flúor (23.000 ppm) e recomenda no mínimo duas aplicações por ano em quem tem atividade de cárie; o protocolo de 4 sessões semanais é o da questão. O mesmo guia (p. 28) indica bochecho de NaF 0,05% diário e de NaF 0,2% semanal ou quinzenal: as alternativas D e E de G0077 trocavam essas frequências.” |
| 9 | BAIXO | L4 flúor, ponto “Intoxicação aguda” (PENDENTE da dose) | A dose provavelmente tóxica pode sair do PENDENTE com fonte. O Guia MS 2009 (p. 41) diz: “5,0 mgF/kg corporal, que corresponde à Dose Provavelmente Tóxica (DPT)”. A conduta com antiácido de magnésio continua só com base na questão: o Guia não trata da conduta. | “A dose provavelmente tóxica (DPT) é de 5,0 mg de flúor por kg de peso corporal (Guia de recomendações para o uso de fluoretos no Brasil, Ministério da Saúde, 2009, p. 41). A conduta (antiácido de hidróxido de magnésio) é a do gabarito de G0258; PENDENTE confirmar em protocolo clínico.” |
| 10 | BAIXO | L4 flúor, ponto G0369 e `cobra[3]` | Diz que os valores em ppm estão “no enunciado”. Estão na **alternativa B**. | “…os valores em ppm da alternativa B não foram reproduzidos” e, em `cobra[3]`: “com números em ppm nas alternativas”. |
| 11 | BAIXO | L1 ponto “aleitamento e hábitos bucais” (G0170) | A apostila repete como verdade duas frases que a banca aceitou: o leite materno “impede a aderência do H. pylori à mucosa **intestinal**” (o H. pylori coloniza o estômago) e “é muito rico em cálcio”. Foram aceitas pela banca, mas são frases discutíveis. | “As demais afirmativas não eram o EXCETO (são frases da banca, não decore como definição): …” |
| 12 | BAIXO | L4 flúor, ponto “Fluorose” (G0168) | O parêntese “(a fusão das manchas vem em estágio mais avançado)” é dedução do autor e não está na questão. É plausível, mas está sem fonte. | “(explicação provável, do autor: a união das manchas costuma ser descrita nos graus mais avançados; PENDENTE confirmar em livro)”. |
| 13 | BAIXO | L1 ponto “classificação de Angle” | “Classe II: a **mandíbula** fica para trás” mistura esqueleto com classificação dentária. Angle classifica pela relação entre os primeiros molares, ou seja, entre os arcos dentários. | “Classe II: distoclusão, o arco inferior (primeiro molar inferior) fica distal em relação ao superior.” |
| 14 | BAIXO | L1 pontos G0160 e G0169 (dúvida: dependem de imagem) | A apostila está segura: avisa que falta a imagem e não inventa sinal radiográfico. Mas a questão será impressa no treino sem a radiografia, e aí não dá para responder. | Conferir no PDF da prova. Até lá, tirar G0160 e G0169 do treino ou garantir que o gerador imprima o aviso “questão depende de imagem que não consta deste material”. |
| 15 | BAIXO | L1 ponto “pulpite irreversível” (G0259) | O capeamento pulpar direto em decíduo é aceito na literatura, em geral, só para exposição pequena e mecânica (acidental), e não para exposição por cárie. O enunciado diz “expôs acidentalmente”, então o gabarito é coerente. O PENDENTE está certo. | Opcional: “(o enunciado fala em exposição ACIDENTAL durante a remoção da cárie; a indicação de capeamento direto em decíduo é restrita, PENDENTE confirmar em livro)”. |

## 3. Dúvidas já marcadas pelo Sonnet: minha avaliação

- **G0161 (flúor, EXCETO):** o gabarito oficial é A. O texto da apostila não está seguro como está; ver achados 1 e 2.
- **G0165 (molares decíduos):** o gabarito oficial é E, e ele coincide com a descrição de Baume. O PENDENTE está certo; falta o aviso explícito (achado 3).
- **G0160 e G0169 (imagem):** o texto está seguro; o problema é a impressão no treino (achado 14).
- **G0366 (gabarito mudou de B para C):** o texto precisa mencionar a troca e tirar o “como regra” (achado 4).
- **G0369:** gabarito A. A frase “o mecanismo do íon flúor é sempre o mesmo, independente do meio” é coerente com o Guia MS 2009 (p. 12: ação local sobre a des e a remineralização). As alternativas erradas também estão bem descritas. O texto está seguro; só falta o ajuste do achado 10.

## 4. Números no texto e de onde vêm

Todos vêm de questão real, exceto os que eu proponho acima com fonte:
- 5%, 4 sessões, 1,23%, 2%, 0,2% e 0,05%: G0077.
- 10% de ácido poliacrílico, 37%, 2 mm, 24 horas e 1:2: G0073.
- 2 a 3 mm e 3 meses: G0363 e G0320.
- 18 dias e 1,5 cm: G0166.
- 6 meses: G0170.
- 99% de água: G0352.
- 8-9 anos: G0161.
- 8 anos e 2 anos: G0160.
- 6 anos e 2 meses: G0169.
- Mais de 90%: G0366.
- 10 anos: G0252.

Não há número sem fonte.

## 5. Questões anuladas

Esta apostila não tem nenhuma questão anulada. Nada a apontar.

## 6. Estrutura

- Título sem “Apostila 05”: OK.
- `arquivoPdf` = `apostila-05-cariologia-prevencao-odontopediatria.pdf`: OK.
- Nenhuma menção a FUNDATEC, FAURGS ou HCPA.
- Nenhuma frase copiada do `_modelo-portugues.json` (conferi frase por frase).
- Os itens do edital do Odontopediatra citados como “sem questão” (cefalometria, frenectomia, crianças com deficiência, atendimento hospitalar, radiologia) existem no `curso/edital.md` (p. 48). OK.

## 7. O que confirmei em fonte (2026-11-19)

- **Guia de recomendações para o uso de fluoretos no Brasil**, Ministério da Saúde/SAS/DAB, Brasília, 2009 (PDF hospedado em [cecol.fsp.usp.br](https://cecol.fsp.usp.br/dcms/app/webroot/uploads/arquivos/1442356520_Brasil-MS-SAS-DAB-GuiaRecomendacoesUsoFluoretosBrasil-2009.pdf)). Li o texto extraído do PDF e conferi:
  - p. 12: presença constante de flúor = principal mecanismo;
  - p. 28: bochechos 0,05% diário e 0,2% semanal ou quinzenal;
  - p. 33: verniz de NaF 2,26% (23.000 ppm), no mínimo duas aplicações anuais;
  - p. 41: DPT de 5,0 mgF/kg.
  - A busca indica que existe uma **2ª edição de 2026**, que não li. Antes de citar o Guia na apostila, conferir se a 2ª edição mudou esses pontos.
- **Definição atual de cárie:** Pitts N.B. et al. “Dental caries”. *Nature Reviews Disease Primers* 3, 17030 (2017), doi 10.1038/nrdp.2017.30. Conferi pelo resumo ([White Rose eprints](https://eprints.whiterose.ac.uk/119171), [KCL](https://www.kcl.ac.uk/news/prestigious-review-of-dental-caries-field-published-2)).
- **Planos terminais de Baume:** “plano reto, degrau mesial para a mandíbula ou degrau distal para a mandíbula”. Conferi em [Estudo da prevalência dos tipos de planos terminais… (Cienc. Odontol. Bras., UNESP)](https://bds.ict.unesp.br/index.php/cob/article/view/78) e em [questão comentada (Estratégia)](https://concursos.estrategia.com/public/questoes/Baume-afirma-que-faces712b3e327a).

## 8. O que NÃO confirmei

- A conduta da intoxicação aguda (antiácido de hidróxido de magnésio): o Guia MS 2009 não traz a conduta.
- A indicação de capeamento direto em decíduo (G0259), as zonas da lesão em dentina (G0163) e o formocresol (G0078).
- A descrição correta do cisto gengival e dos nódulos de Bohn; o prazo do dente neonatal.
- O DAI “pela percepção do próprio indivíduo” (frase da questão G0256).
- Nenhum enunciado foi conferido contra o PDF das provas, e não rodei o gerador.
