# Navegantes 0172/2026: cobertura das apostilas e lacunas

Relatório de 24/11/2026, só leitura: nenhuma apostila, fonte ou script foi alterado.

**O que li:**
- `curso/edital.md` (seção 2.1), `curso/concursos-completo.md` (C.1), `ESTADO.md`, `curso/roteiro-apostilas.md`;
- os 10 JSON de `curso/apostila/` (título, subtítulo, lições, referências dos pontos, `limiteFonte`, marcas PENDENTE);
- o programa oficial no próprio edital, `fontes/navegantes-2026-ps-0172/edital-0172-2026.pdf`, Anexo V: p. 58 (LP, RLM, CG) e p. 72-75 (os 5 Odontólogos). Extraí o texto com pdftotext só no scratchpad;
- `fontes/leis/navegantes/` e o banco `curso/questoes-anteriores.json`.

**Limite do método:** a cobertura foi conferida pelos títulos das lições, pelas referências (`ref`) de cada ponto e por busca de termos no JSON. Não li cada ponto por inteiro. Por isso, "parcial" quer dizer que o tema aparece, mas não cobre o item do programa por inteiro ou não consegui confirmar que cobre. Antes de escrever conteúdo novo, o Sonnet deve confirmar cada FALTA no JSON.

**Prova (edital p. 11):**

| Disciplina | Questões | Valor de cada | Pontos |
|---|---|---|---|
| Língua Portuguesa (LP) | 10 | 0,20 | 2,00 |
| Raciocínio Lógico e Matemático (RLM) | 5 | 0,20 | 1,00 |
| Conhecimentos Gerais (CG) | 5 | 0,20 | 1,00 |
| Conhecimentos Específicos (CE) | 20 | 0,30 | **6,00** |

A nota mínima é 5,00. Pelo edital (p. 3), cada candidato faz **no máximo uma inscrição de nível superior**: na prática, só um dos 5 cargos de Odontólogo.

---

## 1. Cobertura: item do programa x apostila

Legenda: **coberto**; **parcial**; **FALTA** (nenhuma lição trata); **PENDENTE-fonte** (só pode ser escrito com fonte oficial que ainda não temos).

### 1.1 Língua Portuguesa (p. 58), Apostila 01 (feita para Blumenau)

| Item do programa | Apostila / lição | Situação |
|---|---|---|
| Compreensão e interpretação; gêneros e função social | 01 L3, L10 | coberto |
| Tipos textuais | — | FALTA (só gêneros) |
| Funções e figuras de linguagem; conotação e denotação | 01 L10, L14 | coberto |
| Coesão; referenciação, substituição, repetição, progressão; sequenciação | 01 L9 | parcial (lição curta, 2 questões) |
| Coerência textual | — | FALTA (o termo não aparece) |
| Ortografia, pontuação, acentuação, crase | 01 L12, L8, L5, L7 | coberto |
| Formação de palavras; classes; valores das classes; tempos verbais | 01 L15, L1 | coberto |
| Colocação pronominal; regência | 01 L13, L11 | coberto |
| Concordância nominal e verbal | 01 L16 | parcial (nível 0, sem questão) |
| Análise sintática; coordenação e subordinação e seus valores | 01 L2, L4 | coberto |
| Sinônimos, antônimos, hipônimos, hiperônimos | 01 L6 | coberto |
| Polissemia, ambiguidade, efeitos de sentido | 01 L6 | parcial ("ambiguidade" não aparece) |
| Pressupostos e subentendidos | — | FALTA ("pressuposto" aparece 1 vez; "subentendido", 0) |
| Conectivos e operadores argumentativos | 01 L4 | parcial |
| Variação linguística e adequação | — | FALTA |
| Uso dos porquês | — | FALTA como tópico (não achei ponto próprio) |

### 1.2 Raciocínio Lógico e Matemático (p. 58), Apostila 09

A Apostila 09 tem 7 lições, todas com `qtdQuestoes` 0 e sem `topicosBanco`, ou seja, **nenhuma questão real**.

| Item do programa | Lição | Situação |
|---|---|---|
| Inteiros e racionais (decimal e fração): operações e potenciação | L1 | coberto |
| Razões e proporções; regra de três simples | L2 | coberto (o ponto "Grandezas inversas" está confuso: ver 2.4) |
| Divisão em partes proporcionais | — | FALTA |
| Regra de três composta | — | FALTA |
| Porcentagem | L3 | coberto |
| Proposições, equivalências e negações (inclui quantificadores) | L4, L5 | coberto |
| Sequências e padrões | L6 | coberto |
| Gráficos e tabelas | L7 | coberto (L7 tem os erros de digitação "Conferira" e "subtototal") |
| Problemas geométricos | — | FALTA |
| Contagem, probabilidade, análise combinatória | — | FALTA |
| Operações com conjuntos | — | FALTA |
| Sistema métrico: tempo, comprimento, área, volume | — | FALTA |
| Média aritmética simples e ponderada | — | FALTA |
| Situações-problema (exercícios) | — | FALTA |

**Achado:** o `limiteFonte` da 09 diz que não há questões reais de RL. Isso vale para Navegantes, mas o banco tem **questões reais de matemática da FURB** (`alvo: false`) que a 09 não usa:
- Florianópolis 2024: G0400 a G0409;
- Biguaçu 2025: G0465 a G0469;
- Itapema 2025, seção MAT: G0610 a G0614.

São cerca de 20 questões únicas, e cobrem justamente parte do que FALTA: conjuntos (G0469, G0612), contagem e senhas (G0402, G0614), média (G0409, G0610), regra de três composta (G0407), porcentagem e desconto (G0403, G0613).

Ressalvas:
- As questões de informática que estão na seção RL (G0410 a G0414, G0470 a G0474) não estão no programa de Navegantes e devem ficar de fora.
- Os grupos G0515, G0516, G0549, G0566 e G0583 têm o mesmo enunciado de G0469, G0467 e G0466 com grupo diferente. Parecem duplicatas no banco; conferir antes de usar.

### 1.3 Conhecimentos Gerais (p. 58)

A Apostila 02 foi feita para Blumenau: Lei Orgânica (LOM) de Blumenau, Lei 7.564/2010 de Blumenau, história de Blumenau. Nenhuma lição trata de Navegantes.

| Item do programa | Apostila / lição | Situação |
|---|---|---|
| História, geografia, sociedade, cultura, política e economia do Brasil | 02 L2, L6, L7 | parcial (registros de questões de 2019 a 2025, sem atualização de 2026) |
| O mesmo para Santa Catarina | 02 L3 | parcial (registros de questões de Blumenau; sem fonte oficial do Estado) |
| O mesmo para o **Município de Navegantes** | — | **FALTA** |
| Formação territorial, população, identidade regional, patrimônio, desenvolvimento urbano, atividades produtivas, meio ambiente | 02 L7 (só urbano, Brasil) | FALTA para SC e Navegantes |
| Organização político-administrativa, cidadania, direitos sociais, participação social, políticas e serviços públicos | — | FALTA |
| Atualidades (locais, regionais, nacionais, internacionais) | — | FALTA para 2026 |
| **Lei Orgânica de Navegantes** | — | **FALTA / PENDENTE-fonte** |
| **Administração pública municipal**: princípios, organização, funcionamento, planejamento, políticas públicas, transparência, controle social e participação | — | **FALTA** |

**Observação:** a Lei 3.985/2025 (contratação temporária) **não está no programa** de Navegantes. O edital só a cita como base do processo seletivo. Para a prova ela tem prioridade baixa, ao contrário da Lei 7.564 em Blumenau.

### 1.4 Conhecimentos Específicos

#### Bloco comum aos 5 cargos (p. 72-75)

| Item | Apostila / lição | Situação |
|---|---|---|
| SUS: fundamentos, gestão, controle social, modelo assistencial, políticas; epidemiologia (o bloco é o mesmo de Blumenau) | 03 L1 a L8 | coberto |
| Código de Ética Odontológica (em todos os cargos) | 04 L4 | parcial (arts. 11, 12 e 17, a Lei 4.324 e a CFO-271/2025; "sigilo" e "publicidade" não aparecem) |
| Relações humanas e ética no serviço público | 04 L2, L3 | coberto |
| Biossegurança, esterilização e desinfecção | 04 L1 | coberto |
| Odontologia social e saúde pública; PSF (Endo, PNE, Perio) | 03 L2 | parcial |
| Princípios ergonômicos (Endo, PNE, Perio) | — | FALTA |
| Primeiros socorros (Endo, PNE, Perio) | 08 L6 | parcial (3 pontos: crise hipertensiva, hipotensão ortostática, convulsão) |

#### Odontólogo Cirurgião/Traumatologista Bucomaxilofacial (p. 72)

O programa deste cargo é generalista: não cita fraturas de face, que são o forte da 08 L1.

| Item | Apostila / lição | Situação |
|---|---|---|
| Saúde pública: índices e sistema de atendimento | 05 L2; 03 | coberto |
| Bioética em Odontologia | — | FALTA |
| Exodontias, retidos e impactados, raízes residuais | 08 L1 | parcial ("raízes residuais" não aparece) |
| Alveolotomia | 08 L1 (alveolectomia) | parcial |
| Lesões intrabucais de tecido duro e mole (diagnóstico e cirurgia) | 08 L2 | parcial |
| Cirurgia de rebordo, vestíbulo e tuberosidade | — | FALTA (confirmar no JSON) |
| Urgências cirúrgicas; pronto-atendimento | 08 L1, L6 | parcial |
| Semiologia, exame, anamnese, exames complementares | 08 L2 | parcial |
| AIDS e cavidade oral | — | FALTA (1 menção solta) |
| Dentística: preparo e materiais; oclusão | 06 L2, L4 | coberto |
| Prevenção: higiene, **selantes**, flúor tópico e sistêmico | 05 L4 | parcial (selante: 0 ocorrências) |
| Farmacologia: anestésicos, anti-inflamatórios, antibióticos | 08 L3, L4 | parcial (com PENDENTEs) |
| Periodontia básica; pediatria e traumatologia; endodontia | 07; 05 L1; 06 L3; 06 L1 | coberto |

#### Odontólogo Endodontista (p. 72-73)

| Item | Apostila / lição | Situação |
|---|---|---|
| Anatomia interna, acesso, instrumentação, irrigação, medicação, obturação, bio e necropulpectomia, urgências, diagnóstico | 06 L1 | coberto |
| Etiopatogenia pulpar e periapical | 06 L1 | coberto |
| Histofisiologia do complexo dentinopulpar | 06 L1, L2 | parcial |
| Microbiologia das infecções endodônticas | — | FALTA |
| Odontometria; localizadores eletrônicos foraminais | — | FALTA |
| Anestesia em endodontia e suas complicações | 08 L3 | parcial |
| Infecções odontogênicas | — | FALTA |
| Inter-relação endo-perio | — | FALTA |
| Laser em endodontia | — | FALTA |
| Cirurgia perirradicular | — | FALTA |
| Endodontia em odontopediatria | 05 L1 | parcial |
| Idade e saúde sistêmica | — | FALTA |
| Trauma dental | 06 L3 | coberto |
| Clareamento de dente tratado endodonticamente | 06 L2 | parcial |
| Bloco cirúrgico (igual ao do BMF) | 08 L1 | parcial |

#### Odontólogo ESF (p. 73-74)

É o cargo de 40h, R$ 9.748,86. O programa é generalista.

| Item | Apostila / lição | Situação |
|---|---|---|
| Vigilância sanitária e epidemiológica aplicada à Odontologia | 03 | parcial |
| Planejamento e avaliação das ações de saúde bucal | — | FALTA |
| Territorialização, população adscrita, levantamento epidemiológico | 03 L2; 05 L2 | parcial |
| Cariologia; microbiologia, saliva, dieta; fluoretos | 05 L3, L4 | coberto |
| Exame, prognóstico, plano integral | 05 L5 | parcial |
| Biossegurança; dentística; periodontia; endodontia conservadora e urgências | 04; 06; 07; 06 | coberto |
| Cirurgia oral, exodontia, pequenas cirurgias | 08 L1 | parcial |
| Odontopediatria; hábitos | 05 L1 | coberto |
| Odontogeriatria | 05 L5 | parcial |
| Estomatologia, lesões potencialmente malignas, câncer bucal | 08 L2 | parcial |
| Manifestações bucais de doenças sistêmicas | 08 L2; 07 | parcial |
| Radiologia | 06 L5 | coberto |
| Farmacologia: prescrição, interações | 08 L4 | parcial (PENDENTEs) |
| Urgências | 08 L6 | parcial |
| Pacientes com condições sistêmicas | 10 | parcial |
| Prontuário | 04 L7 | coberto |
| Atestados, laudos, pareceres | — | FALTA |
| Equipe, supervisão e capacitação de ASB/TSB | — | FALTA |
| Ações coletivas, educação em saúde, famílias | 05 | parcial |
| Referência e contrarreferência | 03 L2; 10 L4 | parcial |
| Programação e controle de insumos | — | FALTA |

#### Odontólogo Paciente com Necessidades Especiais (p. 74)

| Item | Apostila / lição | Situação |
|---|---|---|
| Resolução CFO 63/2005 (arts. 69 e 70 da consolidação) | 10 L1, L2 | coberto |
| Anatomia e histologia; diagnóstico bucal; patologia; glândulas salivares | 08 L5, L2 | parcial |
| Cárie e doenças periodontais; afecções pulpares | 05; 07; 06 | coberto |
| Afecções de maxila e mandíbula | 08 | parcial |
| Imagem | 06 L5 | coberto |
| Anestesiologia odontológica | 08 L3 | parcial |
| Anestesia geral e sedação consciente | 10 L5 | parcial, só os limites (protocolos PENDENTE) |
| Dentística, ART, adequação do meio, materiais | 06 L2; 05 L1 | coberto |
| Cirurgia oral menor; traumatologia | 08 L1; 06 L3 | parcial |
| Urgências e primeiros socorros | 08 L6 | parcial |
| Oclusão, DTM, dores faciais | 06 L4; 08 L1 (neuralgia) | parcial |
| Epidemiologia; prevenção; flúor | 05 | coberto |
| **Atendimento por grupo**: deficiência intelectual e física, anomalias congênitas, distúrbios de comportamento, transtornos psiquiátricos, distúrbios sensoriais, sistêmicos crônicos, infectocontagiosos, irradiados, transplantados, oncológicos, gestantes, imunocomprometidos | 10 L5 (só abordagem geral) | **FALTA / PENDENTE-fonte** |
| Classificação das necessidades especiais | — | FALTA |
| Odontogeriatria | 05 L5 | parcial |
| HIV e manifestações bucais | — | FALTA |
| Práticas integrativas e complementares | — | FALTA |
| Laser | — | FALTA |
| Acessibilidade | 10 (`comoUsar`) | parcial |
| Educação em saúde: dieta e higiene | 05 | parcial |
| Sistemas de trabalho e ergonomia | — | FALTA |

#### Odontólogo Periodontista (p. 74-75)

| Item | Apostila / lição | Situação |
|---|---|---|
| Anatomia e histologia; classificação e epidemiologia; etiopatogenia; microbiologia | 07 | coberto |
| Controle químico e mecânico do biofilme; diagnóstico e tratamento; instrumentação; manutenção | 07 | coberto |
| Doenças sistêmicas no periodonto; manifestações periodontais | 07 (bloco 3) | coberto |
| Infecção periodontal e saúde sistêmica; fatores genéticos; urgências em periodontia | 07 (ponto de nível 0) | parcial |
| Pacientes sistemicamente comprometidos | 07 | parcial |
| Halitose; furcas | 07 | parcial |
| Cicatrização após cirurgia | — | FALTA |
| Anestesia local em periodontia | 08 L3 | parcial |
| Afiação de instrumentais | — | FALTA |
| Hipersensibilidade dentinária | 06 L1 (teoria hidrodinâmica) | parcial |
| Ortodontia na terapia periodontal | — | FALTA |
| Inter-relação endo-perio | — | FALTA |
| Laser | — | FALTA |
| Cirurgia periodontal | 07 (bloco 6) | parcial |
| Cirurgia mucogengival; cirurgia pré-protética; regeneração tecidual guiada | — | FALTA |

---

## 2. Lacunas por prioridade para a prova de 13/12/2026

**Critério:** pontos em jogo, custo para fechar e dependência de fonte que não temos. Com nota mínima 5,00, o CE (6,00 pontos) decide. Mas RLM e CG valem 2,00 juntos e são justamente o que Blumenau não tem.

**P1: alta (fazer primeiro)**
1. **CE do cargo escolhido**: a inscrição é de um só cargo. Fechar as FALTAs da tabela 1.4 desse cargo. Para ESF e PNE, as fontes oficiais do MS já usadas nas Apostilas 05 e 10 cobrem boa parte. Os itens que dependem de livro-texto (laser, mucogengival, regeneração tecidual guiada, localizador foraminal) ficam PENDENTE.
2. **RLM (1,00 ponto; Blumenau não tem)**: completar a 09 com os 7 itens que faltam e ligar as cerca de 20 questões de matemática da FURB que já estão no banco. Não depende de lei e custa pouco. Corrigir também os erros de texto da L7 e o ponto confuso da L2.
3. **Lei Orgânica de Navegantes (parte de 1,00 ponto)**: na FURB, a LOM costuma cair. Em Blumenau foi o tópico de CGL mais cobrado: 11 de 50 questões únicas. Depende de fonte oficial: ver a seção 3.

**P2: média**
4. **Administração pública municipal**: é o padrão recente da FURB em processo seletivo parecido. Em Itapema 2025, o banco tem 5 questões de CGL por caderno: 3 de administração municipal (G0615 receitas da educação, G0618 servidora estatutária, G0619 alimentação escolar) e 2 de atualidades (G0616 COP30, G0617 ECA Digital). Os princípios (CF, art. 37) têm fonte oficial local.
5. **Atualidades de 2026 e história/geografia de SC e de Navegantes**: é muito conteúdo para 5 questões divididas com LOM e administração. Fazer só um resumo datado, com fonte oficial.
6. **Lacunas pequenas de LP** (2,00 pontos; a 01 já cobre quase tudo): variação linguística, porquês, coerência, tipos textuais, pressupostos e subentendidos, ambiguidade.

**P3: baixa**
7. Lacunas de CE dos cargos que o dono não vai prestar.
8. Lei 3.985/2025 e Lei 4.022/2026: fora do programa.

---

## 3. Fonte oficial necessária para cada lacuna

| Lacuna | Fonte oficial necessária | Existe em `fontes/`? |
|---|---|---|
| LOM de Navegantes | Texto consolidado da Câmara Municipal ou da Prefeitura de Navegantes, com as emendas | **Não oficial.** Só há `fontes/leis/navegantes/lei-organica-navegantes-copia-furb-legalle.pdf`: impressão do agregador leismunicipais.com.br de 12/11/2018 (64 p.), hospedada pela Legalle (`ORIGEM.md`). A última emenda visível é de 2016. Não se sabe se houve emenda depois de 2018. É PDF, então o gerador não aceita trecho literal. |
| Administração pública: princípios e organização do município | CF/88, arts. 1º, 18, 29 a 31, 37 e 165 | **Sim, oficial**: `fontes/leis/constituicao-federal-camara.html` e `fontes/leis/planalto/constituicao-1988.htm` |
| Transparência e acesso à informação | Lei 12.527/2011 (LAI); LC 101/2000, arts. 48 e 48-A (Planalto) | **Não** |
| Controle social e participação | CF/88; LOM de Navegantes (títulos sobre participação popular e conselhos) | CF: sim. LOM: só a cópia não oficial |
| História e geografia de Navegantes | Página "História" da Prefeitura de Navegantes; IBGE Cidades (Censo 2022) | **Não** |
| História e geografia de SC | Portal do Governo de SC; IBGE | **Não** (a 02 L3 só registra questões antigas) |
| Atualidades de 2026 | Agência Brasil, Agência Gov, IBGE, órgãos oficiais, sempre com data | **Não** |
| Lei 3.985/2025 e Lei 4.022/2026 (prioridade baixa) | Ato original no DOM/SC ou na Câmara | **Não oficial**: `.txt` do agregador leis.org. A pasta `originais/` está vazia (o download deu 403) |
| RLM | Nenhuma norma. Questões FURB com gabarito oficial | **Sim**: cadernos e gabaritos em `fontes/outros-municipios-furb/` (Florianópolis: gabarito-oficial.pdf; Biguaçu e Itapema: gabarito impresso no caderno, segundo o banco) |
| LP | Acordo Ortográfico (Decreto 6.583/2008), VOLP, Manual de Redação da Presidência | Já citados no `limiteFonte` da 01 (consulta online; não há arquivo local) |
| Resolução CFO 63/2005 (PNE) | Consolidação das normas do CFO | **Sim**: `fontes/leis/cfo-pne/cfo-consolidacao-2023.pdf` |
| Sedação e anestesia geral, práticas integrativas na Odontologia | Resoluções do CFO sobre o tema | Conferir se estão na consolidação de 2023 (não conferi). Não citar número de resolução antes disso |
| Equipe ASB/TSB (ESF) | Lei 11.889/2008 (Planalto) | **Não** |
| Atendimento a grupos especiais (PNE) | Guia de atenção à saúde bucal da pessoa com deficiência (MS); Caderno de Atenção Básica 17 (MS) | Já citados nas Apostilas 10 e 05 (consulta online; não há arquivo local) |
| Código de Ética (sigilo, publicidade etc.) | CFO-118/2012 com a CFO-271/2025 | **Sim** (PDF; o gerador não aceita trecho de PDF, então só como `conceito`) |
| Laser, mucogengival, regeneração tecidual guiada, localizador foraminal, cirurgia perirradicular, afiação | Livro-texto (pergunta G5 do roteiro, ainda aberta) | **Não**: PENDENTE até o dono escolher a bibliografia |

---

## 4. Plano de execução

**Regras do plano:**
- Um arquivo por Sonnet; até 5 ao mesmo tempo.
- Auditoria e conferência de fonte por um Opus de cada vez.
- Nada que o leitor vê muda sem antes/depois e o "aprovado" do dono.
- Nenhum Sonnet usa `git stash` nem grava teste dentro do repositório.

### Lote A: em paralelo (5 Sonnets), só fontes e propostas, sem tocar nos JSON

| # | Sonnet | Arquivo único | Tarefa | Aceite |
|---|---|---|---|---|
| A1 | fontes federais | `fontes/leis/planalto/` (LAI e LC 101 pelo `scripts/leis-compilar-e-conferir.mjs`) e uma linha no `fontes/leis/ORIGEM.md` | Baixar a Lei 12.527/2011 e a LC 101/2000 do Planalto | `.htm` salvo; URL, data e SHA256 no ORIGEM.md; o `buscar` acha o "Art. 48" da LC 101 |
| A2 | fontes municipais | `fontes/navegantes-municipio/` com um `ORIGEM.md` próprio | Procurar a LOM consolidada no site oficial da Câmara ou da Prefeitura de Navegantes; salvar a página "História" e a ficha do IBGE Cidades | Cada arquivo com URL oficial, data e SHA256; o que não for achado fica registrado como "não achado". Agregador não conta |
| A3 | proposta RLM | `curso/auditoria/propostas/apostila-09-antes-depois.md` | Pontos novos para os 7 itens que faltam; correção da L7 e da L2; tabela de questão FURB x lição (sem as de informática; duplicatas apontadas) | Todo item da p. 58 mapeado; toda conta de exemplo conferida por script no scratchpad; antes/depois literal |
| A4 | proposta LP | `curso/auditoria/propostas/apostila-01-navegantes-antes-depois.md` | Pontos para os 6 itens de LP que faltam | Antes/depois; fonte normativa citada; sem exemplo de outra banca |
| A5 | proposta CE do cargo | `curso/auditoria/propostas/ce-navegantes-<cargo>-antes-depois.md` | Item a item da tabela 1.4 do cargo escolhido: o que entra, em qual apostila e com qual fonte oficial (MS ou CFO); o que não tiver fonte vira PENDENTE | Toda afirmação clínica com fonte ou marcada PENDENTE; nenhum número de dose ou percentual sem fonte |

### Lote B: depois do A1 e do A2

| # | Quem | Arquivo | Tarefa | Aceite |
|---|---|---|---|---|
| B1 | Sonnet | `curso/auditoria/propostas/apostila-11-cg-navegantes.md` | Proposta de uma Apostila 11 nova, "Conhecimentos Gerais de Navegantes", sem mexer na 02. Lições: LOM (só `conceito` com o número do artigo, ou PENDENTE se não houver fonte oficial), administração pública (trechos da CF e da LAI dos `.html`/`.htm` oficiais), SC e Navegantes (fontes do A2), atualidades de 2026 datadas. Usar as 15 questões de CGL da FURB de outros municípios só como modelo de formato | Todo trecho de lei literal e de arquivo oficial local; fato com URL e data; o resto PENDENTE |
| B2 | Opus (um só) | `curso/auditoria/conferencia-navegantes.md` | Conferência cruzada de A3, A4, A5 e B1 contra as fontes | Lista dos itens que passaram e dos que voltam para correção |

### Lote C: depois do "aprovado" do dono

| # | Quem | Arquivo | Aceite |
|---|---|---|---|
| C1 a C4 | um Sonnet por JSON (`raciocinio-logico-navegantes.json`, `portugues.json`, o JSON de CE do cargo, `conhecimentos-gerais-navegantes.json` novo) | o próprio JSON | Aplica só o texto aprovado; `node scripts/gerar-apostila-materia.mjs <id> --pdf` sem aviso; `node --test tests/gerador.test.mjs` verde (rodado sozinho); PDF copiado para `site/apostilas/` e listado em `site/dados/apostilas.json`; `node scripts/gerar-dados-site.mjs` rodado de novo |
| C5 | Sonnet | o gerador, só se precisar | Se o gerador não aceitar tópicos `rl` ou `mat` de `alvo: false` na 09, a mudança é de código: exige `/code-review` (com os achados mostrados) e uma 2ª rodada no diff das correções |

---

## 5. O que o dono precisa decidir ou fornecer

1. **Qual cargo** de Odontólogo vai prestar (só uma inscrição de nível superior; as inscrições terminam em 25/11/2026, 23h59). Isso define o A5 e evita trabalho nos outros 4.
2. **LOM de Navegantes:** fornecer o texto oficial (Câmara ou Prefeitura) ou autorizar o A2 a buscá-lo. A cópia que temos é de agregador, de 2018. Usar essa cópia, mesmo como "texto que a banca usou em outro edital", contraria a regra de fonte oficial: só com decisão expressa.
3. **Downloads do Planalto** (LAI, LC 101, Lei 11.889/2008): confirmar que a autorização de download de 24/11 cobre isso.
4. **Apostila 11 nova** para CG de Navegantes, mantendo a 02 como Blumenau: aprovar ou escolher outra saída.
5. **Questões FURB de outros municípios** (`alvo: false`) como treino na 09 e na 11: aprovar. São questões reais da banca, mas não de Navegantes.
6. **Bibliografia clínica (G5):** sem livro-texto definido, os itens de laser, cirurgia mucogengival, regeneração tecidual guiada, localizador foraminal, cirurgia perirradicular e afiação ficam PENDENTE.
7. **Atualidades:** aceitar fontes oficiais de notícia (Agência Brasil, Agência Gov, IBGE) e definir uma data de corte, por exemplo 30/11/2026.
8. **Lei 3.985/2025:** confirmar que fica em prioridade baixa (fora do programa). Se quiser usá-la mesmo assim, baixar à mão os originais `.docx` que deram 403.
