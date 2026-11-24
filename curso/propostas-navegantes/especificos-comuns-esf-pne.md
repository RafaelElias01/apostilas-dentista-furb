# Navegantes 0172/2026: Conhecimentos Específicos comuns + ESF + PNE (proposta, nada aplicado)

Proposta de 24/11/2026. **Nenhuma apostila, JSON ou fonte foi alterado.** Nada vai para apostila antes do "aprovado" do dono.
Escopo: o que é comum aos 5 cargos de Odontólogo, mais o programa próprio do ESF e do PNE (edital 0172/2026, Anexo V, p. 72-74).

## 0. Leituras e limites (honestidade)

- Li: relatório de cobertura (seção CE), programa oficial p. 72-74 (extraído do PDF no scratchpad), Apostilas 03 (L2), 04 (L4, L5, L7), 10 (todas as lições), `radar-banca.json`, banco `questoes-anteriores.json`, e o texto das fontes: Código de Ética (cópia do site do CFO de 2018, `fontes/leis/cfo-ceo-alteracoes/codigo-etica-cfo-site-2018-03.pdf`), Resolução CFO-271/2025, consolidação CFO 2023 (inclui a Res. CFO 63/2005), PNAB (Portaria 2.436/2017) e Portaria de Consolidação 2/2017.
- **O PDF `fontes/leis/codigo-etica-odontologica-cfo-118-2012.pdf` quase não tem texto extraível** (cerca de 1.600 caracteres: só o preâmbulo e o art. 1º da resolução). Todo o texto literal do Código abaixo vem da cópia do site do CFO (2018, "Aprovado pela Resolução CFO-118/2012"), que é oficial, mas **não traz a CFO-271/2025**. Os incisos alterados (art. 20, VIII e X; art. 32, XIII revogado; art. 44, XIV) usam o texto da CFO-271/2025.
- **Banco: amostra pequena.** CE tem 720 questões válidas (dependeDeFigura/transcricaoSuspeita já excluídas) = **441 questões únicas**, de 4 processos de Blumenau (2019-2025, mais o concurso de 2021) e de 3 municípios com prova FURB (Florianópolis 2024, Biguaçu 2025, Itapema 2025). Classifiquei por palavra-chave **e li as questões que apareceram**: a primeira busca por palavra-chave deu falsos positivos (ex.: "ergonomia" casava com "biomecânico"), por isso os números abaixo são os conferidos à mão. A prova de Navegantes tem só 20 questões de CE; nenhum tema pequeno é previsível.
- **Achado importante:** o cargo PNE de Itapema 2025 (`ita-2025-pne`, 10 questões de CE) **não tem nenhuma questão de tema PNE**: são SUS/gestão (3), risco biológico, glândulas salivares, polpa, trauma de decíduos e ética geral (2). A FURB, até onde o banco mostra, cobra o bloco comum e a clínica geral, não o "atendimento por grupo".
- **Uma ferramenta de leitura (WebFetch) salvou sozinha o PDF do Guia do MS em pasta temporária do harness** (`C:\Users\rafael-ioppi\.claude\projects\...\tool-results\`), fora do repositório. Eu li o texto de lá com pdftotext. Não foi salvo em `fontes/`. Aviso porque a ordem era não baixar arquivos.
- A Lei 11.889/2008 só foi lida por ferramenta que **resume** (Planalto, https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2008/lei/l11889.htm, 24/11/2026): sem texto literal. Mas a Res. CFO 63/2005 (consolidação 2023, que está em `fontes/`) reproduz as mesmas atribuições (TSB art. 12; ASB art. 20) e remete aos arts. 5º e 9º da Lei. Uso a Resolução como fonte literal; a Lei fica PENDENTE (literal).

### Correção à premissa da tarefa
O programa oficial **não** põe ergonomia e bioética em todos os cargos:
- **Princípios ergonômicos na clínica odontológica:** só Endodontista, PNE e Periodontista (não está em ESF nem em Bucomaxilofacial).
- **Bioética em Odontologia:** só Bucomaxilofacial (não está em ESF nem em PNE).
- **Código de Ética Odontológica:** nos 5 cargos.
- **Primeiros socorros:** Endo, PNE e Perio (o ESF tem "Urgências e emergências em Odontologia").
Logo, para ESF e PNE só o Código de Ética é comum; ergonomia entra só no PNE.

## 1. Tabela: item x questões no banco x decisão

Contagem = questões únicas de CE (e quando útil CGL) que tratam do tema de fato, depois de eu ler cada uma.

| Item (cargo) | Questões no banco | O que as apostilas têm hoje | Decisão |
|---|---|---|---|
| Código de Ética: infrações com o paciente e entre colegas, arts. 11 e 13 (todos) | 3 (G0031, G0066, G0087; todas 2019) + prontuário G0175 (2021) | 04 L4 e L7: arts. 11, 12-13, 17, 9º X, 18 I, CFO-271 | já coberto |
| Código de Ética: **sigilo**, arts. 14-16 (todos) | 0 | nada ("sigilo" não aparece) | **INCLUIR** (lição curta; o banco copia artigo e troca uma palavra, e o sigilo é pilar do Código) |
| Código de Ética: **documentos e atestados**, art. 18 II-VII (todos; ESF "atestados, laudos, pareceres") | 0 | só art. 18, I (acesso ao prontuário) | **INCLUIR** |
| Código de Ética: direitos e deveres fundamentais, arts. 5º-9º, inclui direitos de TSB/ASB (todos; liga ao ESF) | 0 | só art. 9º, X | **INCLUIR** (curto) |
| Código de Ética: honorários e mercantilização, arts. 19-21 | 0 (honorários só aparecem dentro de arts. 11 e 13) | só os incisos alterados pela CFO-271 | **FORA** (nunca caiu; as alterações de 2025 já estão na L4) |
| Código de Ética: publicidade, arts. 41-49 | 0 | só art. 44 XIV (CFO-271) | **FORA** (nunca caiu; improvável) |
| Código de Ética: especialidades, hospitalar, ensino, pesquisa, penas | 0 | penas (Lei 4.324, art. 18) | **FORA** |
| Ética no serviço público e relações humanas (todos) | 8 (G0113, G0224, G0311, G0345, G0439, G0503, G0628, G0629) | 04 L2, L3 | já coberto |
| **Ergonomia** (PNE, Endo, Perio) | 0 (a busca ampla deu 16; li e eram falsos positivos) | nada | **FORA por ora; esboço PENDENTE** (explícito no edital do PNE, mas nunca caiu e não há fonte local; ver 3.1) |
| **Bioética** (só BMF) | 0 | nada | **FORA** (não é do ESF nem do PNE; só BMF). Os arts. 2º a 4º e 11 do Código já tratam consentimento e não discriminação |
| ESF: **supervisão e capacitação de ASB/TSB** | 0 | 03 L2 cita supervisão (PNAB 4.2.2 I e II) | **INCLUIR** (fonte literal local: PNAB 4.2.2-4.2.4 e Res. CFO 63/2005) |
| ESF: **atestados, laudos, pareceres** | 0 (3 da busca eram PGRSS, imagem de ATM e lesão neonatal) | nada | **INCLUIR** (Res. CFO 63/2005, art. 4º §1º III e IV, e Código art. 18) |
| ESF: **programação e controle de insumos** | 0 | nada | **INCLUIR curto, só com a frase da PNAB** (4.1 XXIV); técnica de programação fica PENDENTE |
| ESF: **planejamento e avaliação** das ações de saúde bucal; territorialização; levantamento | 4 a 6 em SUS/AB (G0024, G0025, G0116, G0445, G0476, G0483), nenhuma de saúde bucal | 03 L2, 05 L2 (PNAB 4.2.2 II) | **INCLUIR** estender com PNAB 4.2.2 e 4.1 XXI |
| PNE: **atendimento por grupo** (deficiência intelectual, paralisia cerebral, Down, TEA, demência, Parkinson) | 0 | 10 L5 só abordagem geral | **INCLUIR**, mas **depende de o dono baixar o Guia do MS 2019 para `fontes/`** (ver 2.5) |
| PNE: transtornos psiquiátricos, distúrbios sensoriais, sistêmicos crônicos, infectocontagiosos, irradiados, transplantados, oncológicos, gestantes, imunocomprometidos | 0 PNE. Fora do tema PNE: 2 de HIV (G0076, 2019; G0624, Itapema 2025) | nada | **PENDENTE (sem fonte oficial lida)**; esboço só com lista |
| PNE: **classificação das necessidades especiais** | 0 | nada | **PENDENTE** (o art. 69 cita "classificação de funcionalidade", sem detalhar; ver 3.3) |
| PNE: anestesia geral e sedação consciente | 1 (G0127, 2021, atelectasia após anestesia geral) | 10 L5 só os limites, sem os artigos | **INCLUIR** só com texto literal da Res. CFO 63/2005 (arts. 4º §§2º-3º, 44, 45) e do Guia (cap. 9); doses e fármacos PENDENTE |
| PNE: **HIV e manifestações bucais** | 2 (ver acima) | nada | **INCLUIR como esboço PENDENTE** (fonte candidata: manual do MS; ver 3.2) |
| PNE: **práticas integrativas e complementares** | 0 | só 03 L2 cita as PICS no inciso 4.1 V | **INCLUIR curto**: PNPIC (Anexo XXV da PRC 2/2017, local) + Res. CFO 63 (arts. 4º §1º VI e 39). Técnica clínica PENDENTE |
| PNE e outros: **laser** | 0 | nada | **PENDENTE**, sem texto (nenhuma fonte oficial lida) |
| PNE: acessibilidade | 0 | 10 `comoUsar` | **PENDENTE** (candidata: Lei 13.146/2015, não está em `fontes/`); baixa prioridade |
| PNE: primeiros socorros / urgências | 3 (todas 2019, segundo o radar "emerg"; li G0029, crise hipertensiva, e G0068, quadro de perturbação em consultório odontopediátrico; a terceira não identifiquei) | 08 L6 | já coberto (fora do escopo desta proposta) |
| PNE: Res. CFO 63/2005 arts. 69-70 | 0 | 10 L1, L2 | já coberto. Complemento em 2.4 (atividades privativas) |

## 2. Lições propostas (com fonte confirmável)

Convenção: texto entre aspas = literal do arquivo indicado. Antes de aplicar, um Sonnet confere acentos e numeração contra o arquivo (a extração de PDF perde acentos às vezes). Os JSON usam `conceito: true` para texto de PDF, porque o gerador só aceita trecho literal de HTML.

### 2.1 Apostila 04, nova lição: **Sigilo profissional** (Código de Ética, arts. 14 a 16)

**ANTES:** nenhuma lição. Em 04 L4, "sigilo" não aparece. O art. 5º, II e o art. 9º, VIII, XV (sigilo e privacidade como direito e dever) também não.

**DEPOIS (proposta):**
- Art. 14. "Constitui infração ética: I - revelar, sem justa causa, fato sigiloso de que tenha conhecimento em razão do exercício de sua profissão; II - negligenciar na orientação de seus colaboradores quanto ao sigilo profissional; e, III - fazer referência a casos clínicos identificáveis, exibir paciente, sua imagem ou qualquer outro elemento que o identifique, em qualquer meio de comunicação ou sob qualquer pretexto, salvo se o cirurgião-dentista estiver no exercício da docência ou em publicações científicas, nos quais, a autorização do paciente ou seu responsável legal, lhe permite a exibição da imagem ou prontuários com finalidade didático-acadêmicas."
- Parágrafo único: "Compreende-se como justa causa, principalmente: I - notificação compulsória de doença; II - colaboração com a justiça nos casos previstos em lei; III - perícia odontológica nos seus exatos limites; IV - estrita defesa de interesse legítimo dos profissionais inscritos; e, V - revelação de fato sigiloso ao responsável pelo incapaz."
- Art. 15. "Não constitui quebra de sigilo profissional a declinação do tratamento empreendido, na cobrança judicial de honorários profissionais."
- Art. 16. "Não constitui, também, quebra do sigilo profissional a comunicação ao Conselho Regional e às autoridades sanitárias as condições de trabalho indignas, inseguras e insalubres."
- Macete (padrão já visto no banco): o item errado costuma inverter uma palavra ("com justa causa", "sem" por "com"). Marcar como padrão do estilo da banca, **não como gabarito**; 0 questões de sigilo no banco.
- Fonte: Código de Ética, cópia do site do CFO 2018 (`fontes/leis/cfo-ceo-alteracoes/codigo-etica-cfo-site-2018-03.pdf`), arts. 14-16. Conferir se algum desses artigos foi alterado depois de 2018 (a CFO-271/2025 só alterou os arts. 20, 32 e 44).

### 2.2 Apostila 04, nova lição: **Documentos odontológicos e atestados** (Código, art. 18; Res. CFO 63/2005, art. 4º)

**ANTES:** 04 L7 (prontuário) usa art. 17, art. 9º X e art. 18 I. Os incisos II a VII do art. 18 não aparecem. A Res. 63/2005 só entra na Apostila 10 (arts. 69-70).

**DEPOIS (proposta):**
- Código, art. 18: "Constitui infração ética: [...] II - deixar de atestar atos executados no exercício profissional, quando solicitado pelo paciente ou por seu representante legal; III - expedir documentos odontológicos: atestados, declarações, relatórios, pareceres técnicos, laudos periciais, auditorias ou de verificação odontolegal, sem ter praticado ato profissional que o justifique, que seja tendencioso ou que não corresponda à verdade; IV - comercializar atestados odontológicos, recibos, notas fiscais, ou prescrições de especialidades farmacêuticas; V - usar formulários de instituições públicas para prescrever, encaminhar ou atestar fatos verificados na clínica privada; VI - deixar de emitir laudo dos exames por imagens realizados em clínicas de radiologia; e, VII - receitar, atestar, declarar ou emitir laudos, relatórios e pareceres técnicos de forma secreta ou ilegível, sem a devida identificação, inclusive com o número de registro no Conselho Regional de Odontologia na sua jurisdição, bem como assinar em branco, folhas de receituários, atestados, laudos ou quaisquer outros documentos odontológicos."
- Res. CFO 63/2005 (consolidação 2023), art. 4º, §1º: "Compete ao cirurgião-dentista: [...] III - atestar, no setor de sua atividade profissional, estados mórbidos e outros, inclusive para justificação de falta ao emprego; IV - proceder à perícia odontolegal em foro civil, criminal, trabalhista e em sede administrativa;"
- Código, art. 10, V (profissional assistente): infração "negar, na qualidade de profissional assistente, informações odontológicas consideradas necessárias ao pleito da concessão de benefícios previdenciários ou outras concessões facultadas na forma da Lei, sobre seu paciente, seja por meio de atestados, declarações, relatórios, exames, pareceres ou quaisquer outros documentos probatórios, desde que autorizado pelo paciente ou responsável legal interessado;"
- Atenção ao escopo: atestado de falta ao emprego é competência do dentista **"no setor de sua atividade profissional"**; não afirmar além disso.
- Fonte: Código (CFO 2018), arts. 10 e 18; consolidação CFO 2023 (`fontes/leis/cfo-pne/cfo-consolidacao-2023.pdf`), art. 4º §1º.

### 2.3 Apostila 04, nova lição (curta): **Direitos e deveres fundamentais; TSB e ASB no Código** (arts. 5º a 9º)

**ANTES:** 04 L4 cita só o art. 9º, X (prontuário) e a vedação do art. 11, XI e XIII (delegar atos privativos).

**DEPOIS (proposta):**
- Art. 5º: "Constituem direitos fundamentais dos profissionais inscritos, segundo suas atribuições específicas: I - diagnosticar, planejar e executar tratamentos, com liberdade de convicção, nos limites de suas atribuições, observados o estado atual da Ciência e sua dignidade profissional; II - guardar sigilo a respeito das informações adquiridas no desempenho de suas funções; [...] IV - recusar-se a exercer a profissão em âmbito público ou privado onde as condições de trabalho não sejam dignas, seguras e salubres;" (incisos III, V a VII ficam na lição se o dono quiser a lista inteira).
- Art. 6º: "Constitui direito fundamental das categorias técnicas e auxiliares recusarem-se a executar atividades que não sejam de sua competência técnica, ética e legal, ainda que sob supervisão do cirurgião-dentista."
- Art. 7º: "Constituem direitos fundamentais dos técnicos em saúde bucal e auxiliares em saúde bucal: I - executar, sob a supervisão do cirurgião-dentista, os procedimentos constantes na Lei nº 11.889/2008 e nas Resoluções do Conselho Federal; II - resguardar o segredo profissional; e, III - recusar-se a exercer a profissão em âmbito público ou privado onde as condições de trabalho não sejam dignas, seguras e salubres."
- Art. 9º (deveres): lista de 19 incisos; propor só os de maior chance de "troca de palavra": VII (zelar pela saúde e pela dignidade do paciente), VIII (resguardar o sigilo), IX (promover a saúde coletiva), X (prontuários), XIV (assumir responsabilidade pelos atos), XV (resguardar a privacidade). Os 19 incisos completos ficam à escolha do dono.
- Fonte: Código (CFO 2018), arts. 5º-9º.

### 2.4 ESF: **Equipe de saúde bucal, supervisão, planejamento e insumos** (PNAB + Res. CFO 63/2005)

Destino sugerido: estender a **03 L2** (já cita PNAB 4.2.2, I e II) e criar uma lição curta na **04** ou na **03**, a escolher pelo dono. Arquivo local oficial: `fontes/leis/portaria-2436-2017-pnab-bvsms.html`. A PRC 2/2017 (`portaria-consolidacao-2-2017-ms-bvsms.html`, Anexo XXII) repete 4.2.2 VI (conferido: "VI.- Realizar supervisão do técnico em saúde bucal (TSB) e auxiliar em saúde bucal (ASB);") e 4.1 XXIV. Usar o texto atual da PRC 2 como referência final.

**ANTES:** 03 L2 cobre 4.2.2 I e II (atenção em saúde bucal e perfil epidemiológico). Supervisão, ACS/ACE, estratificação de risco, TSB e ASB: "supervisão" aparece 2 vezes; as atribuições do TSB e do ASB (4.2.3 e 4.2.4) e a gestão de insumos (4.1 XXIV) não aparecem.

**DEPOIS (proposta):**
- PNAB, 4.2.2 (Cirurgião-Dentista): "VI - Realizar supervisão do técnico em saúde bucal (TSB) e auxiliar em saúde bucal (ASB); VII - Planejar, gerenciar e avaliar as ações desenvolvidas pelos ACS e ACE em conjunto com os outros membros da equipe; VIII - Realizar estratificação de risco e elaborar plano de cuidados para as pessoas que possuem condições crônicas no território, junto aos demais membros da equipe;" e o inciso II "Realizar diagnóstico com a finalidade de obter o perfil epidemiológico para o planejamento e a programação em saúde bucal no território;" (já está em 03 L2).
- PNAB, 4.1 (atribuições comuns), XXI: "Participar de reuniões de equipes a fim de acompanhar e discutir em conjunto o planejamento e avaliação sistemática das ações da equipe, a partir da utilização dos dados disponíveis, visando a readequação constante do processo de trabalho;" e XXIV: "Participar do gerenciamento dos insumos necessários para o adequado funcionamento da UBS;"
- PNAB, composição: "Equipe de Saúde Bucal (eSB): Modalidade que pode compor as equipes que atuam na atenção básica, constituída por um cirurgião-dentista e um técnico em saúde bucal e/ou auxiliar de saúde bucal." Modalidade I: CD e ASB ou TSB; Modalidade II: CD, TSB e ASB, ou outro TSB.
- PNAB, 4.2.3 (TSB), incisos V e IV: participa do treinamento e capacitação de ASB e de agentes multiplicadores; apoia as atividades dos ASB e dos ACS. 4.2.4 (ASB): lista de 12 incisos (a conferir; ver arquivo).
- Res. CFO 63/2005 (consolidação 2023, em `fontes/leis/cfo-pne/`), art. 12 (TSB): "Competem ao Técnico em Saúde Bucal, sempre sob a supervisão do cirurgião dentista, as seguintes atividades, além das estabelecidas para os auxiliares de saúde bucal: [...] f) supervisionar, sob delegação do cirurgião-dentista, o trabalho dos auxiliares de saúde bucal;" Art. 13: vedado ao TSB "a) exercer a atividade de forma autônoma; b) prestar assistência direta ou indireta ao paciente, sem a indispensável supervisão do cirurgião-dentista; c) realizar, na cavidade bucal do paciente, procedimentos não discriminados no artigo 5o da Lei nº 11.889/2008" e "d) fazer propaganda de seus serviços, exceto em revistas, jornais e folhetos especializados da área odontológica." Art. 14: "A supervisão direta será obrigatória em todas as atividades clínicas, podendo as extra clínicas ter supervisão indireta." Art. 20 (ASB, caput): "Compete ao auxiliar em saúde bucal, sempre sob a supervisão do cirurgião-dentista ou do técnico em saúde bucal:" Art. 21: vedado ao ASB "a) exercer a atividade de forma autônoma; b) prestar assistência, direta ou indiretamente, a paciente, sem a indispensável supervisão do cirurgião-dentista ou do técnico em saúde bucal; c) realizar, na cavidade bucal do paciente, procedimentos não discriminados no artigo 9o, da Lei nº 11.889/2008; e, d) fazer propaganda de seus serviços, mesmo em revistas, jornais ou folhetos especializados da área odontológica." (note a diferença: TSB pode anunciar em publicação especializada; ASB não).
- Res. CFO 63/2005, art. 4º §7º: "Responderá eticamente, perante o respectivo Conselho Regional, o cirurgião-dentista que, tendo técnico em saúde bucal e/ou auxiliar em saúde bucal sob sua supervisão, permitir que os mesmos, sob qualquer forma, extrapolem suas funções específicas." (o início do §7º está cortado na extração; conferir no PDF). Lei 11.889/2008, art. 11 (mesma ideia): PENDENTE literal.
- O que continua PENDENTE nesta lição: técnica de programação de insumos (cálculo de consumo, estoque mínimo); sem fonte oficial lida, não escrever número nem fórmula.

### 2.5 PNE: **Grupos de pacientes, manejo e sedação** (Guia de Atenção à Saúde Bucal da Pessoa com Deficiência, MS, 2019, 120 p.)

Fonte oficial lida: https://bvsms.saude.gov.br/bvs/publicacoes/guia_atencao_saude_bucal_pessoa_deficiencia.pdf (Ministério da Saúde, Brasília, 2019; acessado em 24/11/2026). **Hoje não está em `fontes/`.** O limiteFonte da Apostila 10 já o cita, mas sem arquivo local. **Pedido ao dono:** autorizar o download para `fontes/leis/` com ORIGEM.md (URL, data, SHA256). Sumário: conceito de PNE na Odontologia (p. 15); rede de atenção (cap. 1); deficiência intelectual (cap. 2); demência e Alzheimer (3); Parkinson (4); paralisia cerebral (5); síndrome de Down (6); TEA (7); técnicas de manejo (8); sedação e anestesia geral (9).

**ANTES:** 10 L5 só tem avaliação precoce, ambiente convencional, manejo comportamental genérico e limites de sedação/anestesia geral, sem os grupos e sem as indicações.

**DEPOIS (proposta, lições 10 L6 a L9):**
- Conceito (p. 15): "O conceito de paciente com necessidades especiais na odontologia compreende todo usuário que apresente uma ou mais limitações, temporárias ou permanentes, de ordem mental, física, sensorial, emocional, de crescimento ou médica, que o impeça de ser submetido a uma situação odontológica convencional." E: "essa condição não impõe, automaticamente, a necessidade de atendimento especializado em odontologia, devendo ser considerados o tipo e o grau de limitações vivenciadas pelo paciente."
- Manejo (cap. 8, p. 93): técnicas não farmacológicas: "Verbal – linguagem, técnica do 'dizer-mostrar-fazer'; modelagem; reforço positivo; controle de voz; e distração", "Não verbal – toque, olhar, sorriso", restrição física e restrição mecânica. "O uso de técnicas de estabilização protetora deve ocorrer após uma avaliação criteriosa e esgotadas as técnicas de dessensibilização". Termo de consentimento: "A aprovação e a assinatura do termo de consentimento pelo usuário, quando possível, e dos pais ou responsáveis, quando for o caso, demonstra uma forma de elucidação da conduta e do amparo legal."
- Sedação (cap. 9, p. 97-98): "Quando todas as técnicas de manejo de comportamento não permitirem o atendimento odontológico seguro, outras estratégias poderão ser utilizadas." Indicações listadas (deficiência intelectual com compreensão comprometida; deficiência física com função mental preservada, como paralisia cerebral; transtornos psiquiátricos, como esquizofrenia; transtornos do comportamento, como autismo). "A sedação e a constante supervisão do usuário devem ser realizadas por equipe habilitada, com o uso de ausculta periódica, a oximetria de pulso e o monitoramento dos sinais vitais" e "a depressão respiratória [é] a principal complicação da sedação em consultório odontológico." Sem nome de fármaco nem dose (o Guia os traz em parte; só entram se o dono mandar ler e aprovar).
- Por grupo (caps. 2 a 7): para cada um, "características bucais", "alterações bucais x condições sistêmicas" e "cuidados especiais", **a redigir pelo Sonnet com citação literal** do Guia, depois de o arquivo estar em `fontes/`. Não escrevo o conteúdo aqui porque li só o sumário e os capítulos 8 e 9.
- Fica de fora do Guia (logo, **PENDENTE**): transtornos psiquiátricos como grupo, distúrbios sensoriais, doenças sistêmicas crônicas, infectocontagiosas, irradiados, transplantados, oncológicos, gestantes e imunocomprometidos. O Guia não trata desses (busca no texto: 0 ocorrências de HIV, laser, irradiado, transplant, oncol, integrativ).

### 2.6 PNE: **Anestesia geral e sedação: limites normativos** (Res. CFO 63/2005)

**ANTES:** 10 L5 diz que sedação e anestesia geral exigem avaliação e que isso "não consta nesta apostila como protocolo", sem citar a norma.

**DEPOIS (proposta):**
- Art. 4º, §2º: "O cirurgião-dentista poderá operar pacientes submetidos a qualquer um dos meios de anestesia geral, desde que sejam atendidas as exigências cautelares recomendadas para o seu emprego." §3º: "O cirurgião-dentista somente poderá executar trabalhos profissionais em pacientes sob anestesia geral quando a mesma for executada por profissional médico especialista e em ambiente hospitalar que disponha das indispensáveis condições comuns a ambientes cirúrgicos."
- Art. 44: "Os cirurgiões-dentistas somente poderão realizar cirurgias sob anestesia geral, em ambiente hospitalar, cujo diretor técnico seja médico, e que disponha das indispensáveis condições de segurança comuns a ambientes cirúrgicos, considerando-se prática atentatória à ética a solicitação e/ou a realização de anestesia geral em consultório de cirurgião-dentista, de médico ou em ambulatório." Art. 45: "Somente poderão ser realizadas, em consultórios ou ambulatórios, cirurgias passíveis de serem executadas sob anestesia local."
- Observação: o art. 44 está na seção de Cirurgia e Traumatologia Buco-Maxilo-Faciais da Resolução; para o PNE vale o §3º do art. 4º (regra geral do cirurgião-dentista). Não afirmar que o art. 44 "vale para PNE" sem essa ressalva.
- O programa do PNE diz "Anestesia geral em pacientes com necessidades especiais" e "Sedação consciente": a **Res. CFO 63 não traz regra sobre sedação consciente**. A norma específica (se houver resolução do CFO sobre sedação) **não está em `fontes/` nem foi localizada**: PENDENTE; não citar número.

### 2.7 PNE: **Práticas integrativas e complementares (PICS)**, esboço curto

**ANTES:** só a menção às PICS no inciso 4.1 V da PNAB (03 L2). Nada de PNE.

**DEPOIS (proposta), só com fonte local:**
- PNPIC: Anexo XXV da Portaria de Consolidação 2/2017 (`fontes/leis/portaria-consolidacao-2-2017-ms-bvsms.html`; origem: Portaria 971/2006, ampliada pelas Portarias 849/2017 e 702/2018): "Fica aprovada, na forma do Anexo 1 do Anexo XXV, a Política Nacional de Práticas Integrativas e Complementares (PNPIC) no Sistema Único de Saúde." Parágrafo único: a política "recomenda a adoção pelas Secretarias de Saúde dos Estados, do Distrito Federal e dos Municípios, da implantação e implementação das ações e serviços relativos às Práticas Integrativas e Complementares."
- Acupuntura e homeopatia (item 1.1 e 1.2 do Anexo 1): "A acupuntura é uma tecnologia de intervenção em saúde que aborda de modo integral e dinâmico o processo saúde-doença no ser humano, podendo ser usada isolada ou de forma integrada com outros recursos terapêuticos." (conferir acento do "é" no arquivo).
- Odontologia citada: nas definições de hipnoterapia ("Alguns setores de saúde adotam regularmente esta prática em seus protocolos de atendimento, como a odontologia, a psicologia, a fisioterapia, a enfermagem, dentre outras.") e de ozonioterapia ("...como a odontologia, a neurologia e a oncologia, dentre outras.").
- Res. CFO 63/2005: art. 4º §1º, VI: o cirurgião-dentista pode "empregar a analgesia e a hipnose, desde que comprovadamente habilitado, quando constituírem meios eficazes para o tratamento;" e art. 39: o CFO registra as especialidades de "a) Acupuntura;" e "g) Homeopatia;" entre as 22 especialidades listadas.
- Conferência pendente: o número exato do Anexo (Anexo 3 ou 4 do Anexo XXV) em que estão hipnoterapia e ozonioterapia.
- **PENDENTE:** protocolo, indicação, técnica e evidência de cada prática em Odontologia: nenhuma fonte oficial lida.

## 3. Esboços marcados PENDENTE (sem dose, protocolo ou número)

### 3.1 Ergonomia (PNE; também Endo e Perio)
Estado: **FORA por ora.** Evidência no banco: 0 questões. No que li das fontes locais, a palavra aparece só em: Res. CFO 63, art. 17 (disciplina "Ergonomia e Técnicas de Instrumentação" no curso de TSB), art. 68, b (Odontologia do Trabalho: "assessoramento técnico e atenção em matéria de saúde, de segurança, de ergonomia e de higiene no trabalho") e no Guia do MS p. ~70 (uma frase sobre ergonomia do profissional ao atender com paciente posicionado). Nenhuma define "princípios ergonômicos". Fonte oficial candidata, **não lida e não em `fontes/`**: Norma Regulamentadora NR-17 (Ministério do Trabalho). Se o dono quiser, a proposta fica: lição de 1 página com a definição oficial da NR-17 (a confirmar), sem posições angulares, tempos ou medidas. Sem isso, não entra.

### 3.2 HIV e manifestações bucais (PNE; "AIDS" no BMF)
Estado: **esboço PENDENTE.** Banco: 2 questões (G0076, candidíase em crianças HIV+, 2019; G0624, risco biológico com HIV e hepatite B, Itapema 2025). Fontes oficiais candidatas **encontradas só por busca, não lidas**: "Controle de infecções e a prática odontológica em tempos de AIDS: manual de condutas" (MS, 2000; https://bvsms.saude.gov.br/bvs/publicacoes/manual_odonto.pdf; pode estar desatualizado) e "Manual de Especialidades em Saúde Bucal" (MS, 2008; https://bvsms.saude.gov.br/bvs/publicacoes/manual_especialidades_saude_bucal.pdf). Sem ler, não escrever nada. Pelo que já está nas apostilas, a candidíase e a biossegurança (04 L1) cobrem as duas questões do banco.

### 3.3 Classificação das necessidades especiais; grupos fora do Guia
Estado: **PENDENTE.** O art. 69 da Res. CFO 63 diz "levando em conta a classificação de funcionalidade", sem detalhar (que classificação é, não afirmo). O programa lista 12 grupos; o Guia do MS cobre 6 condições e a sedação. Sem fonte lida para: psiquiátricos, sensoriais, sistêmicos crônicos, infectocontagiosos, irradiados, transplantados, oncológicos, gestantes, imunocomprometidos. Pedir ao dono a bibliografia (ver seção 4).

### 3.4 Laser em Odontologia
Estado: **PENDENTE, sem texto.** 0 questões; consta no PNE, Endo e Perio. Nenhuma fonte oficial local ou lida. Não escrever tipos de laser, comprimentos de onda ou potências.

### 3.5 Bioética (só BMF) e demais itens "FORA"
Bioética, honorários, publicidade, especialidades, hospitalar, ensino, pesquisa: **FORA**, com motivo na tabela. Se o dono prestar BMF, a bioética precisa de bibliografia (princípios clássicos) que não está em `fontes/`.

## 4. PENDENTES e o que o dono precisa fornecer ou decidir

1. **Aprovar** (antes/depois): lições 2.1 a 2.4, 2.6 e 2.7 e a tabela de decisões (INCLUIR/FORA). Nada foi aplicado.
2. **Autorizar o download do Guia do MS 2019** para `fontes/leis/` com ORIGEM.md (2.5). Sem ele, as lições por grupo não podem ser escritas com texto literal e conferível.
3. **Conferir o Código de Ética mais atual do CFO**: a cópia de 2018 não traz a CFO-271/2025; o PDF da CFO-118 que está em `fontes/leis/` só tem imagem (sem texto extraível; precisaria de OCR ou da mesma cópia do site). Confirmar com o CFO se existe outra resolução alteradora desde 2025.
4. **Lei 11.889/2008, literal**: baixar do Planalto (a autorização do dia 24/11 cobre Planalto?) para `fontes/leis/planalto/`.
5. **Bibliografia clínica (G5 do roteiro) para o PNE**: grupos sem fonte (3.3), HIV (3.2), laser (3.4), classificação das necessidades especiais, práticas integrativas na clínica, sedação consciente (norma do CFO, se existir), ergonomia (NR-17 ou livro).
6. **Qual cargo vai prestar** (as inscrições terminam em 25/11/2026): se for ESF, as lições 2.4 e 2.1 a 2.3 são as de maior retorno e já têm fonte local; se for PNE, falta o Guia (2.5) e a bibliografia acima.
7. **Fonte do PDF** `codigo-etica-odontologica-cfo-118-2012.pdf`: o texto da apostila 04 L4 diz que leu "no PDF" o art. 11 e o art. 17, o que não confere com o conteúdo extraível do arquivo. A origem real é a cópia do site do CFO (2018). Sugestão: corrigir o `limiteFonte` da 04 para citar esse arquivo.
8. Alertas de conferência para o Sonnet que aplicar: acentos nos trechos de PDF; que o texto do §7º do art. 4º da Res. 63 comece onde indico; o número do Anexo de hipnoterapia/ozonioterapia na PRC 2/2017.
