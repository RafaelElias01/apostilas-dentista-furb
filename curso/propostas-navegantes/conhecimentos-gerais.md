# Navegantes (0172/2026, FURB) - Conhecimentos Gerais: fontes, radar e proposta (ANTES/DEPOIS)

Data da pesquisa: 24/11/2026 (todas as "datas de acesso" abaixo). Prova: 13/12/2026; 5 questões de CG (0,20 cada). Programa: edital p. 58.
Status: PROPOSTA. Nada foi aplicado em `curso/apostila/*.json`. Aguarda "aprovado" do dono.

---

## 1. Tabela de fontes

| # | Item | Situação | URL | Acesso | Trecho / dado confirmado | Observação |
|---|---|---|---|---|---|---|
| F1 | Lei Orgânica de Navegantes, texto OFICIAL vigente | **PENDENTE (não achei)** | Site da Câmara: `https://www.cvnavegantes.sc.gov.br` (menu Legislação) | 24/11/2026 | O link "Lei Orgânica Municipal" do menu da própria Câmara aponta para `https://leismunicipais.com.br/lei-organica-navegantes-sc` (agregador). | Nem a Câmara publica o PDF da LOM em seu domínio, até onde consegui ver. `www.navegantes.sc.gov.br` e `navegantes.sc.gov.br/legislacao/...` deram **403** (não contornei); a página da Prefeitura também remete a agregador (Leis.org, segundo o ORIGEM.md). Diário Municipal SC (`diariomunicipal.sc.gov.br`) só apareceu em busca (Emenda 002/2015), não li. |
| F2 | Marco da LOM: revisão por emenda | achada (notícia oficial da Câmara) | `https://www.cvnavegantes.sc.gov.br/imprensa/noticias/0/46/2022/1445` | 24/11/2026 | Publicada em 17/12/2021: "aprovado por unanimidade, em segunda discussão e votação"; a LOM "é datada de 5 de abril de 1990"; revisão pelo "Projeto de Emenda à Lei Orgânica nº 12/2021". | Prova que a LOM mudou depois de 2018. Não traz o texto consolidado. |
| F3 | Cópia da LOM que temos em `fontes/leis/navegantes/` | **NÃO OFICIAL, DESATUALIZADA** | impressa de `leismunicipais.com.br` em **12/11/2018** (cabeçalho do PDF, lido com pdftotext) | 24/11/2026 | Estrutura: Título I Princípios Fundamentais; II Organização Municipal; III Organização dos Poderes; IV Ordem Econômica e Social; V Disposições Gerais. Art. 26 da cópia fixa nº de vereadores por faixa de população (9 a 33). | Anterior à revisão de 12/2021 (F2). Em resultado de busca (não abri a página), uma notícia de 12/2024 diz que o projeto aumenta a Câmara "de 10 para 15" vereadores, ou seja, o art. 26 hoje é outro: um exemplo concreto de que a cópia de 2018 NÃO serve para texto de lei. |
| F4 | Lei 12.527/2011 (LAI) | **ACHADA** (oficial) | `https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2011/lei/l12527.htm` | 24/11/2026 | Arts. 3º, 8º e 10 lidos (trechos na seção 4). | A página carrega, mas a codificação veio corrompida (acentos viram "�"); os acentos foram restituídos por mim. Na montagem, conferir contra o HTML. |
| F5 | LC 101/2000 (LRF) | **ACHADA em parte** (oficial) | `https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp101.htm` | 24/11/2026 | Art. 48 e 48-A localizados. Literal só dos trechos curtos da seção 4; a leitura foi truncada em 100.000 de 112.600 caracteres e a página mostra versões concorrentes do art. 48. | Incisos do art. 48 §1º aparecem só como resumo: literal PENDENTE (reler o dispositivo vigente). |
| F6 | CF/88 arts. 29, 30, 31, 37 | **ACHADA (cópia local oficial)** | `fontes/leis/constituicao-federal-camara.html` (origem: Câmara dos Deputados, baixada em 18/11/2026; maior EC citada: 141/2026) | 24/11/2026 | Literais na seção 4. | Já está no repositório; sem novo download. |
| F7 | Página "História" da Prefeitura de Navegantes | **PENDENTE: 403** | `https://navegantes.sc.gov.br/historia/` | 24/11/2026 | Não consegui abrir (403 anti-robô/bloqueio). Um resumo de busca (não literal) cita Lei Estadual 828 de 30/05/1962 e instalação em 26/08/1962; nome "Navegantes" em 1912; 1ª igreja em 02/02/1898. | NÃO usar. Sem trecho literal conferido, tudo isso é PENDENTE. Não forjei cabeçalho. |
| F8 | Página "A Cidade" da Prefeitura | **PENDENTE: 403** | `https://navegantes.sc.gov.br/a-cidade/` | 24/11/2026 | idem | idem |
| F9 | IBGE: população e território | **ACHADA** (API oficial IBGE) | `https://servicodados.ibge.gov.br/api/v3/agregados/9514/periodos/2022/variaveis/93?localidades=N6[4211306]` e `.../agregados/4714/periodos/2022/variaveis/6318|614?localidades=N6[4211306]` e `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/4211306` | 24/11/2026 | Município 4211306 = "Navegantes". População residente, 2022: **86401** pessoas (tabela 9514, Censo 2022). Área da unidade territorial, 2022: **111.377 km²**. Densidade demográfica, 2022: **775,75 hab/km²**. Microrregião: Itajaí; mesorregião: Vale do Itajaí; UF: SC. | `cidades.ibge.gov.br/.../panorama` deu **403** (não contornei); usei a API de dados do próprio IBGE. Um resumo de busca citou "85.734" em outro documento: divergência não verificada; vale o dado do IBGE acima. |
| F10 | IBGE: histórico/formação administrativa | **PENDENTE** | `https://biblioteca.ibge.gov.br/visualizacao/dtb/santacatarina/navegantes.pdf` | 24/11/2026 | PDF acessível, mas texto em fluxo comprimido; o leitor só devolveu metadados (arquivo de 05/04/2011). | Conteúdo não lido. Pode ser lido com `pdftotext` se o dono autorizar baixar (eu não baixei). |
| F11 | Atualidades de 2026 (federais, SC, Navegantes) | **PENDENTE** | (nenhuma fonte oficial datada coletada) | 24/11/2026 | - | Não coletei fato de 2026. O que o banco registra como atualidade (COP30, ECA Digital, etc.) é de enunciados de prova, não validado de forma independente. |
| F12 | Texto da Lei 3.985/2025 e 4.022/2026 (contratação temporária) | só agregador (já em `fontes/leis/navegantes/`) | - | - | - | Fora do programa de CG; sem ação aqui. |

---

## 2. Radar: tema x questões no banco x decisão

Base: `curso/questoes-anteriores.json`, seção CGL, **65 questões únicas** (por grupo `G0xxx`, sem contar as repetições entre cargos): Blumenau 50 (5 editais, 2019 a 2025), Florianópolis 2024 (fln) 10, Itapema 2025 (ita) 5. **Amostra pequena, de outros municípios; nenhuma é de Navegantes.** Florianópolis e Itapema estão marcadas `alvo:false` no banco e estão com tópico `cgl.?` (a classificação por tema dessas 15 é minha, lendo o enunciado). As 3 anuladas de Blumenau (segundo a Apostila 02) estão dentro dos 50.

| Tema | Blumenau | Fln 2024 | Itapema 2025 | Total /65 | Decisão |
|---|---|---|---|---|---|
| Lei Orgânica do próprio município | 11 (em 5 de 5 edições) | 1 (art. 118, saúde) | **3 de 5** (competência tributária e receitas; servidores e aposentadoria; ordem econômica) | **15** | **INCLUIR (prioridade máxima)**, mas o texto oficial é PENDENTE (F1). |
| Atualidades (Brasil/mundo/ciência/sociedade) | 15 (10 + 5 de ciência/inovação) | 4 (comércio exterior, censo, trabalho infantil, moradia) | 2 (COP30, ECA Digital) | **21** | **INCLUIR como método e lista de temas**; fatos de 2026 só com fonte oficial datada (F11 PENDENTE). É o maior bloco, mas o mais perecível. |
| História, cultura e economia de SC e do município | 8 (todas de SC/Blumenau) | 0 | 0 | 8 | **INCLUIR a versão Navegantes/SC** só com fonte (F7, F8, F10 PENDENTES). A versão Blumenau (colonização alemã etc.) fica **FORA**: não serve para Navegantes. |
| Cultura/artes e política urbana (Estatuto da Cidade, COP30 urbano) | 4 | 0 | 0 | 4 | **INCLUIR curto**: o edital cita "desenvolvimento urbano" e "patrimônio". Baixa prioridade. |
| Administração pública municipal, princípios gerais (CF art. 37, nepotismo, estatuto do servidor) | 0 | 2 (nepotismo/CGU; estatuto de Floripa) | 0 (aposentadoria entrou como LOM) | 2 | **INCLUIR**: o edital lista "princípios, organização, funcionamento, planejamento, transparência, controle social e participação" (p. 58), e a LOM de Itapema cobrou o tema do servidor. Base: CF 29-31 e 37 (F6) + LAI/LRF (F4, F5). |
| Transparência e controle social (LAI, LRF) | 0 | 0 | 0 | **0** | **INCLUIR, curto, por estar no edital** (não por incidência). Decisão do dono: se preferir só radar, vai para FORA. |
| Leis municipais específicas de Blumenau: LC 660/661/1.234 e Lei 7.564/2010 | 12 | 0 | 0 | 12 | **FORA**: não existem para Navegantes; quase todas já saíram do edital de Blumenau 2025. A Lei 3.985/2025 de Navegantes não está no programa (relatório 1.3). |
| Política Municipal de Atenção Primária (PMAPS) de Florianópolis | 0 | 3 | 0 | 3 | **FORA** (norma de Florianópolis; SUS e APS já estão na Apostila 03 / CE). |
| Sobre Navegantes especificamente (história, geografia, LOM) | 0 | 0 | 0 | **0** | Sem questão no banco: o conteúdo é por exigência do edital; ver lições. |

Leitura do radar: a LOM do próprio município e atualidades dominam (36 de 65); em Itapema, 3 das 5 foram da LOM (dado que o dono destacou: tratei como LOM municipal, não "administração" genérica). Conclusão prudente para Navegantes: **a LOM é o item de maior retorno e é justamente o único sem fonte oficial em mãos.**

---

## 3. Lições propostas: ANTES (Apostila 02 hoje) e DEPOIS

**ANTES (resumo do que existe):** a Apostila 02 (`curso/apostila/conhecimentos-gerais-legislacao.json`, id `conhecimentos-gerais-legislacao`) é de **Blumenau**: subtítulo "Cirurgião-Dentista · Prefeitura de Blumenau (SC)"; lições `lom` (LOM de Blumenau, 11 questões), atualidades, história/cultura de SC e de Blumenau, ciência, Lei 7.564/2010, urbano, cultura. `limiteFonte` e `comoUsar` falam do edital PSPS 003/2025 de Blumenau. Nenhuma linha trata de Navegantes (relatório 1.3). Proposta de forma: criar uma apostila nova para Navegantes (o relatório prevê `conhecimentos-gerais-navegantes.json`, passo C4), sem mexer na 02.

### L1 - Navegantes em números (DEPOIS: confirmável hoje)

DEPOIS (texto proposto, só com F9):
- "Navegantes (SC), código IBGE 4211306, fica na Microrregião de Itajaí e na Mesorregião do Vale do Itajaí (IBGE, API de localidades, acesso em 24/11/2026)."
- "População residente: 86.401 pessoas (Censo 2022, IBGE, tabela 9514)."
- "Área da unidade territorial: 111,377 km² (IBGE, 2022). Densidade demográfica: 775,75 hab/km² (IBGE, 2022)."
- Aviso: dado de 2022; confira a atualização do IBGE antes da prova.

### L2 - História, geografia e identidade de Navegantes (DEPOIS: PENDENTE)

DEPOIS: **nada pode ser escrito agora.** Só há resumo de busca (não literal) de página que deu 403. Itens a confirmar (F7, F8, F10): lei estadual de criação e data (o resumo cita Lei 828/1962), data da instalação, origem do nome, ocupação inicial, distritos, economia (pesca, construção naval, porto/aeroporto), símbolos. **Preciso que o dono cole o texto das páginas "História" e "A Cidade" da Prefeitura**, ou autorize ler o PDF do IBGE (F10).

### L3 - Lei Orgânica de Navegantes (DEPOIS: PENDENTE; só roteiro)

DEPOIS: **sem texto.** O que posso propor sem fonte oficial é o roteiro de extração, a partir da estrutura da cópia de 2018 (não oficial, só como mapa): Título I (princípios e símbolos: art. 1º ao 3º na cópia), Título II (organização municipal: bens, distritos, competências, arts. 9º ao 13 na cópia), Título III (Poderes Legislativo e Executivo; servidores), Título IV (ordem econômica e social), Título V (disposições gerais). Prioridades pelo radar dos outros municípios: competência tributária e repartição de receitas; servidores (regime, aposentadoria, estabilidade); ordem econômica; saúde; Câmara (composição, competências, vereadores, fiscalização); consulta popular e conselhos. **Cada artigo precisa vir da versão vigente depois da emenda de 12/2021 e de emendas seguintes.**

### L4 - Administração pública municipal: princípios e competências (DEPOIS: confirmável, CF literal local)

DEPOIS (literais da CF, cópia da Câmara dos Deputados, `fontes/leis/constituicao-federal-camara.html`):
- Art. 37, caput: "A administração pública direta e indireta de qualquer dos Poderes da União, dos Estados, do Distrito Federal e dos Municípios obedecerá aos princípios de legalidade, impessoalidade, moralidade, publicidade e eficiência e, também, ao seguinte:" (redação da EC 19/1998).
- Art. 30: "Compete aos Municípios: I - legislar sobre assuntos de interesse local; II - suplementar a legislação federal e a estadual no que couber; III - instituir e arrecadar os tributos de sua competência, bem como aplicar suas rendas, sem prejuízo da obrigatoriedade de prestar contas e publicar balancetes nos prazos fixados em lei; IV - criar, organizar e suprimir Distritos, observada a legislação estadual; V - organizar e prestar, diretamente ou sob regime de concessão ou permissão, os serviços públicos de interesse local, incluído o de transporte coletivo, que tem caráter essencial; VI - manter, com a cooperação técnica e financeira da União e do Estado, programas de educação infantil e de ensino fundamental; VII - prestar, com a cooperação técnica e financeira da União e do Estado, serviços de atendimento à saúde da população; VIII - promover, no que couber, adequado ordenamento territorial, mediante planejamento e controle do uso, do parcelamento e da ocupação do solo urbano; IX - promover a proteção do patrimônio histórico-cultural local, observada a legislação e a ação fiscalizadora federal e estadual."
- Art. 31, caput e §3º: "A fiscalização do Município será exercida pelo Poder Legislativo municipal, mediante controle externo, e pelos sistemas de controle interno do Poder Executivo municipal, na forma da lei." / "As contas dos Municípios ficarão, durante sessenta dias, anualmente, à disposição de qualquer contribuinte, para exame e apreciação, o qual poderá questionar-lhes a legitimidade, nos termos da lei."
- Art. 29, caput (início): "O Município reger-se-á por lei orgânica, votada em dois turnos, com o interstício mínimo de dez dias, e aprovada por dois terços dos membros da Câmara Municipal, que a promulgará, atendidos os princípios estabelecidos nesta Constituição, na Constituição do respectivo Estado e os seguintes preceitos:"
- Nepotismo: a banca citou a CGU (Floripa 2024). Fonte oficial (Súmula Vinculante 13 do STF) **PENDENTE**: não busquei.

### L5 - Transparência e controle social (DEPOIS: confirmável; ver ressalva de codificação)

DEPOIS (Lei 12.527/2011, Planalto, acesso 24/11/2026; acentos restituídos por mim):
- Art. 3º, diretrizes: "I - observância da publicidade como preceito geral e do sigilo como exceção; II - divulgação de informações de interesse público, independentemente de solicitações; III - utilização de meios de comunicação viabilizados pela tecnologia da informação; IV - fomento ao desenvolvimento da cultura de transparência na administração pública; V - desenvolvimento do controle social da administração pública." (caput do art. 3º: literal PENDENTE de reconferência.)
- Art. 8º, caput: "É dever dos órgãos e entidades públicas promover, independentemente de requerimentos, a divulgação em local de fácil acesso, no âmbito de suas competências, de informações de interesse coletivo ou geral por eles produzidas ou custodiadas."
- Art. 8º, §2º: "Para cumprimento do disposto no caput, os órgãos e entidades públicas deverão utilizar todos os meios e instrumentos legítimos de que dispuserem, sendo obrigatória a divulgação em sítios oficiais da rede mundial de computadores (internet)."
- Art. 10, caput: "Qualquer interessado poderá apresentar pedido de acesso a informações aos órgãos e entidades referidos no art. 1º desta Lei, por qualquer meio legítimo, devendo o pedido conter a identificação do requerente e a especificação da informação requerida."
- LC 101/2000, art. 48, caput (trecho): "São instrumentos de transparência da gestão fiscal, aos quais será dada ampla divulgação"; §1º: "A transparência será assegurada também mediante:" (incisos: literal PENDENTE, só resumo: incentivo à participação popular e audiências públicas; acesso em tempo real a informações da execução orçamentária e financeira; sistema integrado de administração financeira e controle; divulgação de benefícios tributários, financeiros e creditícios).
- Art. 48-A, caput (trecho): "os entes da Federação disponibilizarão a qualquer pessoa física ou jurídica o acesso a informações".

### L6 - Atualidades (DEPOIS: método, sem fatos de 2026)

DEPOIS: proposta de formato, sem fato novo: lista de temas que a banca já cobrou (COP30, ECA Digital, censo/IBGE, comércio exterior, trabalho infantil, direitos e violência contra a mulher, IA e ciência), cada um com "o que a prova perguntou" e a fonte oficial a consultar; **cada fato de 2026 só entra com fonte oficial datada** (F11 PENDENTE). A Apostila 02 já registra enunciados de 2019 a 2025 como histórico.

---

## 4. FORA (com motivo)

| Item | Motivo |
|---|---|
| LC 660/661/1.234 e Lei 7.564/2010 de Blumenau (12 questões) | leis de Blumenau; Navegantes tem outro regime; fora do programa |
| História da colonização de Blumenau/Vale do Itajaí alemão (parte das 8 de SC) | é de Blumenau; só entra se a fonte de Navegantes/SC confirmar |
| PMAPS de Florianópolis (3) | norma de outro município; SUS/APS cobertos na Apostila 03 |
| Lei 3.985/2025 e 4.022/2026 (contratação temporária) | não está no programa de CG (relatório 1.3); fonte é agregador |
| Estimativa de população "85.734" | divergência vista só em resumo de busca; usar IBGE 86.401 |

---

## 5. PENDENTES e o que o dono precisa fornecer

1. **Texto oficial vigente da Lei Orgânica de Navegantes** (PDF da Câmara ou da Prefeitura, ou DOM/SC), com emendas depois de 12/2021 (Emenda 12/2021 e as seguintes). Sem isso a L3 não existe, e é o tema de maior retorno. Alternativa: o dono me cola o texto de uma fonte oficial.
2. **Texto das páginas "História" e "A Cidade"** da Prefeitura de Navegantes (deram 403; não contornei), ou autorização para abrir o PDF do IBGE (F10).
3. Releitura literal de LC 101/2000 art. 48 §1º (incisos) e art. 3º caput da LAI, para fechar os literais.
4. Súmula Vinculante 13/STF (nepotismo): não busquei; citar só com fonte do STF.
5. Atualidades de 2026 (nacional, SC, Navegantes): sem fonte oficial datada coletada; decidir quais temas valem.
6. Decisão do dono: manter L5 (transparência) apesar de 0 questões no banco; e o formato (apostila nova `conhecimentos-gerais-navegantes.json`).
7. Limite: o número de questões e a classificação por tema de Floripa e Itapema são leitura minha dos enunciados (tópico `cgl.?` no banco).
