# Roteiro das 8 apostilas (Cirurgião-Dentista, banca FURB)

Escrito em 2026-11-19 por um Opus, só como planejamento. Este arquivo **não traz o conteúdo das apostilas**. Ele diz o que cada uma terá, em que ordem e com quais fontes, para guiar os Sonnets que vão montá-las.

## 0. Para quem nunca viu o projeto

- **Objetivo:** uma apostila PDF por disciplina do edital, numeradas de "Apostila 01" a "Apostila 08". Cada uma dá ênfase ao que mais caiu nas provas anteriores da banca FURB (Fundação Universidade Regional de Blumenau) para Cirurgião-Dentista da Prefeitura de Blumenau (SC).
- **Edital base:** PSPS 003/2025 de Blumenau. PSPS quer dizer Processo Seletivo Público Simplificado. A prova tem 40 questões: Língua Portuguesa 10, Conhecimentos Gerais e Legislação 10, Conhecimentos Específicos 20. Cada questão vale 0,25. Fonte: `curso/edital.md`, seção 1.4, que cita o edital, p. 9, item 7.1.
- **Balneário Camboriú:** o edital ainda não saiu (PENDENTE; `curso/edital.md`, seção 0). Quando sair, este roteiro precisa ser revisto, principalmente a Apostila 02.
- **Siglas usadas aqui:**
  - LP: Língua Portuguesa.
  - CGL: Conhecimentos Gerais e Legislação.
  - CE: Conhecimentos Específicos.
  - LOM: Lei Orgânica do Município.
  - SUS: Sistema Único de Saúde.
  - PNAB: Política Nacional de Atenção Básica.
  - PNH: Política Nacional de Humanização.
  - CFO: Conselho Federal de Odontologia.
  - RDC: Resolução da Diretoria Colegiada da Anvisa.
  - CG: prova do cargo Clínico Geral.
  - "Única": questão contada uma vez só. As 5 especialidades repetem as mesmas questões em ordem embaralhada; o radar conta cada uma como uma.
- **Edições:** abreviadas assim nas tabelas:
  - 2019 = PSPS 002/2019.
  - 2021P = PSPS 002/2021.
  - 2021C = Concurso Público 002/2021, com 50 questões, sendo 30 de CE.
  - 2023 = PSPS 003/2023.
  - 2025 = PSPS 003/2025.

### 0.1 De onde vieram os números (conferido nesta sessão)
- **Radar:** `curso/radar-banca.json`, gerado em 2026-11-18. Tem 8 apostilas, e a soma de `questoesUnicasBlumenau` dá **50 + 50 + 30 + 26 + 41 + 76 + 38 + 63 = 374**.
  - Li o arquivo com um script na pasta temporária da sessão, fora do repositório.
  - A soma dos tópicos de cada apostila bate com o total dela.
- **Banco de questões:** `curso/questoes-anteriores.json` tem 1.440 questões.
  - **850 de Blumenau** (`alvo: true`, classificação manual).
  - **590 de outros municípios** (`alvo: false`): Florianópolis 80, Biguaçu 300, Itapema 210.
  - Há 374 grupos de Blumenau. Desses, **18 têm questão ANULADA** e o gerador os descarta. Sobram **356 questões usáveis** no treino.
  - **Divergência:** o `ESTADO.md` diz 840 de Blumenau e 600 de outros municípios. A contagem direta do JSON dá 850 e 590 (21 cadernos: 4 PSPS × 5 especialidades × 40 questões + 1 concurso × 50 = 850). Quem cuida do `ESTADO.md` deve corrigir. Este roteiro não altera aquele arquivo.
- **Programa de cada disciplina:** conferido em `curso/edital.md`, seção 1.5, que registra a página do PDF do edital (p. 44 e p. 47 a 49).
  - O PDF original do edital **não está nesta máquina**: a pasta `fontes/` só tem `fontes/leis/`.
  - Por isso, as páginas citadas aqui são as que o `edital.md` registra. Não reabri o PDF.
- **Composição da prova real:** em 2025, 17 das 20 questões de CE foram comuns às 5 especialidades (`curso/edital.md`, seção 1.4).
  - Consequência: boa parte das questões únicas de CE do radar veio de questões **próprias de uma especialidade**. Exemplo: Periodontia tem 38 únicas, mas só 4 caíram na prova do Clínico Geral.
  - Por isso, cada tabela abaixo mostra também a coluna "CG".

### 0.2 Regra de ordem e de empate (vale para todas as tabelas)
Ordem do que mais cai:
1. mais questões únicas;
2. em caso de empate, aparecer em mais edições;
3. depois, mais questões em 2025, a edição mais recente;
4. se ainda empatar, a tabela escreve **EMPATE** e imprime em ordem alfabética do código, só para ter uma ordem.

### 0.3 Nível de incidência proposto (campo `nivel` do JSON, de 0 a 3)
Esta régua é uma proposta deste roteiro. O dono pode trocar.
- **3 (Alta):** 5 ou mais questões únicas, **ou** presença em 4 ou mais edições.
- **2 (Média):** 3 a 4 questões únicas.
- **1 (Baixa):** 1 a 2 questões únicas.
- **0:** item do edital sem nenhuma questão na amostra.

Lembrete: "não apareceu na amostra" não quer dizer "não cai". A amostra é pequena: 5 editais de um só município, de 2019 a 2025.

### 0.4 Limites técnicos do gerador
Li o cabeçalho de `scripts/gerar-apostila-materia.mjs` e as linhas 120 a 280.
- **Questões por lição:** saem pelo campo `topicosBanco`, com os códigos do radar.
  - Um mesmo código em duas lições **não** separa as questões por assunto: o gerador distribui pela ordem de recência (linhas 219 a 226).
  - Consequência: um tópico grande, como `perio`, com 38 questões, não pode ser picado em várias lições com o mesmo código sem misturar as questões. Este roteiro usa **uma lição por código** nos tópicos grandes e organiza os subassuntos dentro dos `pontos`. Ver a pergunta aberta global G1.
- **`qtdQuestoes`:** o padrão é 8 por lição. O simulado pega até 20 das sobras e só aparece se sobrarem pelo menos 5.
- **Trechos de lei (`trecho`):**
  - só passam se forem um dispositivo completo e literal de um arquivo **.html** de `fontes/leis/` listado em `fontes`;
  - PDF não serve (linha 129);
  - sem `trecho`, o ponto precisa de `"conceito": true` e sai com o selo "explicação do autor, sem trecho de lei conferido".
- **O gerador confere se o texto é literal, não se está em vigor.** Um trecho copiado do texto original de 2010 da Lei 7.564 passa na conferência, mas pode estar revogado. A vigência é responsabilidade de quem monta e do Opus auditor.
- **Uma `tabela` e um `mapa` por lição.** Lição grande precisa escolher o quadro mais útil.
- **Título:** o gerador já monta "Apostila 0N — título" (linha 37, `TITULO_NUM`). O campo `titulo` do JSON **não** deve repetir "Apostila 0N".
- **Nome do PDF:** `arquivoPdf` precisa começar com `apostila-0N-` (`scripts/apostila-css.mjs`, `validarNomeArquivo`).

### 0.5 Situação de `fontes/leis/` nesta máquina (lida às pressas, enquanto outro agente baixa)
- **`fontes/leis/ORIGEM.md` só apareceu no fim desta sessão.** Li apenas as linhas sobre as Leis 8.142, 14.572, 15.126 e 7.564 e sobre a LOM. Ele registra o seguinte:
  - Arquivos `-norma.html` = "só ficha (sem texto)".
  - O texto das Leis 8.142, 14.572 e 15.126 vem nos arquivos `-camara-publicacaooriginal.html`, que é o texto original. Para a 8.142, "a Câmara não oferece versão atualizada".
  - Não existe consolidação oficial da Lei 7.564/2010 nem da LOM.
  - Várias leis alteradoras da 7.564 têm só a ficha em HTML e o texto em PDF.
  - Os arquivos `publicacaooriginal` não estavam na pasta quando a listei. O resto do ORIGEM.md (SHA256 e status de cada arquivo) precisa ser conferido pelo Opus auditor antes de qualquer trecho.
- **Presentes em HTML:**
  - CF/88;
  - Lei 8.080/1990 ("normaatualizada"; conferi que os arts. 5º, 6º, 7º, 12, 15, 16, 17, 18, 35 e 36 estão no arquivo);
  - Decreto 7.508/2011;
  - LC 141/2012;
  - Leis 4.324/1964 e 5.081/1966;
  - Portaria 2.436/2017 (PNAB);
  - Portaria de Consolidação 2/2017;
  - RDC 15/2012;
  - Lei 7.564/2010 de Blumenau, só o texto original de 2010;
  - 12 leis alteradoras da 7.564, em `blumenau-lei7564-alteradoras/`;
  - emendas 51 a 54 da LOM, em `blumenau-lom-emendas/`.
- **Presentes só em PDF, que o gerador não usa para trecho:**
  - Código de Ética Odontológica (CFO-118/2012) e a alteração CFO-271/2025;
  - RDC 222/2018;
  - LOM de Blumenau, anexo de 2021 (site não oficial; `curso/edital.md` diz que o texto não é extraível);
  - PNH, documento base.
- **ACHADO: três arquivos "-camara-norma.html" parecem ser só a ficha da norma, sem o texto da lei:** `lei-8142-1990-camara-norma.html`, `lei-15126-2025-camara-norma.html` e `lei-14572-2023-camara-norma.html`.
  - Exemplo: na Lei 8.142, o texto "Conferência de Saúde", que existe no art. 1º da lei, aparece 0 vezes no arquivo.
  - Usar o texto integral (`-camara-publicacaooriginal.html`, segundo o ORIGEM.md; PENDENTE até o arquivo estar na pasta e conferido) antes de qualquer trecho dessas três leis.
  - Como é texto original, conferir se houve alteração depois da publicação.

### 0.6 Conteúdo do projeto HCPA
O projeto HCPA (Hospital de Clínicas de Porto Alegre, banca FAURGS) existe em `C:\Users\rafael-ioppi\Documents\hcpa-ps32-estudo-main`, **só na outra máquina**. Não está disponível aqui.
- Por isso, todas as apostilas são tratadas como **escritas do zero**. A fonte do conteúdo teórico aparece como **"fonte de conteúdo a definir"**.
- Mesmo quando o HCPA estiver acessível, só poderá vir dele conteúdo teórico neutro (explicação de lei, conceito clínico), nunca texto, questão, ranking ou pegadinha da banca FAURGS.

### 0.7 Bibliografia que a própria banca citou nas questões
Achei essas citações procurando "Fonte:" e "De acordo com" nos enunciados do banco. É pista de bibliografia, não prova de que a banca segue só esses livros.
- **Periodontia:** "Periodontia Clínica − Newman & Carranza". Citado em 12 questões de 2023, de G0261 a G0272.
- **Anatomia e anestesia:** "Reher, Peter. Anatomia Aplicada à Odontologia, 3ª ed., GEN, 2020, cap. 25" (G0228, G0236).
- **Dentística, proteção pulpar:** "Hargreaves. Caminhos da polpa" (G0244).
- **Endodontia, reabsorções:** "Machado et al (2022)" (G0318).
- **Atenção básica:** página aps.saude.gov.br (G0222).
- **PNAB antiga:** a banca citou a Portaria 2.488/2011 em 2019 (G0024). Essa portaria foi substituída pela 2.436/2017, que está em `fontes/leis/`. A apostila ensina a vigente e avisa que a banca já cobrou a antiga.

---

## Visão geral

| Nº | id (JSON) | Título | arquivoPdf proposto | Únicas no radar | Em prova de CG | Peso na prova | Classe |
|---|---|---|---|---|---|---|---|
| 01 | `portugues` | Língua Portuguesa | `apostila-01-lingua-portuguesa.pdf` | 50 | 50 | 10 de 40 questões (2,50 pontos) | **A** |
| 02 | `conhecimentos-gerais-legislacao` | Conhecimentos Gerais e Legislação Municipal | `apostila-02-conhecimentos-gerais-legislacao.pdf` | 50 (8 fora do edital 2025) | 50 | 10 de 40 questões (2,50 pontos) | **B** (forte) |
| 03 | `sus-saude-publica` | SUS, Políticas de Saúde e Epidemiologia | `apostila-03-sus-saude-publica.pdf` | 30 | 30 | parte das 20 de CE | **B** |
| 04 | `etica-biosseguranca` | Ética, Relações Humanas, Biossegurança e Prontuário | `apostila-04-etica-biosseguranca.pdf` | 26 | 15 | parte das 20 de CE | **B** (parcial) |
| 05 | `cariologia-prevencao-odontopediatria` | Cariologia, Prevenção, Saúde Bucal Coletiva e Odontopediatria | `apostila-05-cariologia-prevencao-odontopediatria.pdf` | 41 | 12 | parte das 20 de CE | **A** |
| 06 | `dentistica-endodontia-trauma` | Dentística, Materiais, Oclusão, Endodontia e Traumatismo | `apostila-06-dentistica-endodontia-trauma.pdf` | 76 | 29 | parte das 20 de CE | **A** |
| 07 | `periodontia` | Periodontia | `apostila-07-periodontia.pdf` | 38 | 4 | parte das 20 de CE | **A** |
| 08 | `cirurgia-farmacologia-patologia` | Cirurgia, Anestesia, Farmacologia, Emergências e Patologia Bucal | `apostila-08-cirurgia-farmacologia-patologia.pdf` | 63 | 20 | parte das 20 de CE | **A** |
| | | **Total** | | **374** | **210** | | |

- **Ids, números e títulos:** são os do radar, sem mudança. Os nomes dos arquivos PDF são propostos aqui.
- **Fatia de CE na amostra:** as Apostilas 03 a 08 dividem as 20 questões de CE. Na amostra, CE soma **274 questões únicas**.
  - Por apostila: 03 = 30, 04 = 26, 05 = 41, 06 = 76, 07 = 38, 08 = 63.
  - Na prova do Clínico Geral, CE soma **110**: 03 = 30, 04 = 15, 05 = 12, 06 = 29, 07 = 4, 08 = 20.
  - Confere com as provas: 4 PSPS × 20 + 1 concurso × 30 = 110. O total da coluna CG (210) também confere: 4 × 40 + 50.
- **Classe A:** pode ser montada já, sem a pasta de leis. Pode precisar de livro-texto, mas não de trecho de lei.
- **Classe B:** depende de leis ainda não conferidas (ORIGEM.md ausente, arquivo só de ficha, PDF ou legislação municipal sem consolidação).

## Ordem de montagem e paralelismo

Regra fixa: **um Sonnet por arquivo `curso/apostila/<id>.json`; nunca dois no mesmo arquivo.**

1. **Etapa 0 (um Sonnet, antes de tudo):** confirmar que o gerador roda neste layout.
   - Comando: `node scripts/gerar-apostila-materia.mjs portugues`. Antes de existir o JSON, usar o `_modelo-portugues.json` por caminho, com `--json-externo --saida <pasta temporária>`.
   - O `ESTADO.md`, item 7, diz que o gerador "ainda não foi adaptado", mas o cabeçalho já cita `curso/questoes-anteriores.json`. Isso precisa ser confirmado.
   - O cabeçalho cita um `pdftotext` em `C:/Users/rafael-ioppi/...`, caminho da outra máquina. O PDF fica para depois; nesta etapa basta o HTML.
2. **Etapa 1 (piloto, um Sonnet):** Apostila **01**. É a mais próxima do modelo de formato (`_modelo-portugues.json`) e não depende de lei. O dono olha o resultado e aprova o estilo antes do lote.
3. **Etapa 2 (em paralelo, 4 Sonnets):** Apostilas **05, 06, 07 e 08**, cada uma no seu JSON. São todas classe A.
4. **Etapa 3:** Apostilas **03 e 04**, que podem ir em paralelo entre si, quando:
   - um Opus tiver conferido o `fontes/leis/ORIGEM.md`, que apareceu no fim desta sessão;
   - o texto integral das Leis 8.142/1990, 15.126/2025 e 14.572/2023 (`-publicacaooriginal.html`) estiver na pasta.
   - Dá para adiantar as lições conceituais com `conceito: true` e deixar os trechos para depois. Mas é o mesmo arquivo: o mesmo Sonnet faz as duas passadas, uma depois da outra.
5. **Etapa 4:** Apostila **02**, por último. Depende da LOM consolidada e da redação vigente da Lei 7.564/2010, além das decisões G3 e G4.
   - As lições de conhecimentos gerais (atualidades, história de SC) podem ser escritas antes, no mesmo JSON, pelo mesmo Sonnet.
6. **Depois de cada apostila:** um Opus audita os fatos, os trechos e a vigência. Os PDFs só são gerados depois de corrigidos.

## Perguntas abertas globais (para o dono decidir)
- **G1. Tópicos grandes.** `perio` (38), `endo` (30), `cir` (28), `dent` (21) e `ped` (20) são um código só cada. Há duas saídas:
  - (a) uma lição por código, com os subassuntos nos `pontos`. É o que este roteiro propõe agora.
  - (b) um Opus cria subcódigos (por exemplo `perio.anatomia`) no radar e no banco, refaz a auditoria e só então os Sonnets dividem as lições.
  - A opção (b) muda arquivos auditados e precisa de aprovação.
- **G2. Para qual cargo?** O ranking por "questões únicas" mistura as 5 especialidades. Para quem vai fazer Clínico Geral, ou o cargo único de Balneário Camboriú se vier assim, a coluna CG pesa mais.
  - Exemplo: Endodontia tem 30 únicas, mas só 2 na prova de CG. Dentística tem 21 únicas e 18 na de CG.
  - Manter a ordem pelas únicas, ou ordenar pela coluna CG?
- **G3. Tópicos fora do edital 2025.** LC 660/2007 (3 questões), LC 661/2007 (3) e LC 1.234/2019 (2) caíram em 2019 e 2021 e saíram do programa de 2025. Proposta: não fazer lição; citar só no `comoUsar`.
- **G4. Selo dos pontos clínicos.** O gerador marca todo ponto sem trecho com "explicação do autor, sem trecho de lei conferido". Nas apostilas clínicas (05 a 08), quase todo ponto será assim. Manter o texto ou pedir a um Sonnet que permita um rótulo "conteúdo clínico, fonte: <livro>"? Isso muda código e exige code-review.
- **G5. Fonte do conteúdo teórico.** Quais livros-texto o dono aceita como referência citada? A seção 0.7 lista os que a banca citou.
- **G6. Texto das questões.** O banco avisa para conferir o texto no PDF da prova antes de usar, mas os PDFs das provas não estão nesta máquina. O gabarito foi auditado em 2026-11-18 (`ESTADO.md`); a transcrição do enunciado, não.

---

## Apostila 01 — Língua Portuguesa (`portugues`)

- **Disciplina:** LP, comum a todos os cargos.
- **Peso:** 10 de 40 questões, 2,50 de 10 pontos.
- **Radar:** 50 questões únicas, todas em prova de CG. São 8 anuladas, e sobram **42 usáveis**.
- **Programa:** `curso/edital.md`, seção 1.5, "Língua Portuguesa", edital p. 44.
- **Classe: A.** Não precisa de lei.

| Ordem | Código | Lição | Únicas | Edições | CG | Anul. | Nível |
|---|---|---|---|---|---|---|---|
| 1 | `lp.classes` | Classes gramaticais (inclui tempos e modos verbais) | 10 | 4 (2019:3, 2021P:1, 2023:1, 2021C:5) | 10 | 2 | 3 |
| 2 | `lp.sintaxe` | Sintaxe: termos da oração, período, vozes verbais | 5 | 4 (2019:1, 2023:2, 2025:1, 2021C:1) | 5 | 2 | 3 |
| 3 | `lp.compreensao` | Compreensão e interpretação de textos | 5 | 3 (2023:3, 2025:1, 2021C:1) | 5 | 0 | 3 |
| 4 | `lp.coord_subord` | Coordenação e subordinação; valor dos conectivos | 5 | 2 (2019:2, 2021P:3) | 5 | 0 | 3 |
| 5 | `lp.acentuacao` | Acentuação gráfica | 4 | 4 (2019:1, 2021P:1, 2025:1, 2021C:1) | 4 | 2 | 3 (por edições) |
| 6 | `lp.semantica` | Significação das palavras | 4 | 3 (2019:1, 2021P:2, 2025:1) | 4 | 0 | 2 |
| 7 | `lp.crase` | Crase (acento grave) — **EMPATE com a 8** | 3 | 3 (2019:1, 2025:1, 2021C:1) | 3 | 1 | 2 |
| 8 | `lp.pontuacao` | Pontuação — **EMPATE com a 7** | 3 | 3 (2021P:1, 2023:1, 2025:1) | 3 | 0 | 2 |
| 9 | `lp.coesao` | Coesão referencial e sequencial — **EMPATE 9 a 11** | 2 | 2 (2023:1, 2025:1) | 2 | 1 | 1 |
| 10 | `lp.generos_funcoes` | Gêneros do discurso e funções da linguagem — **EMPATE 9 a 11** | 2 | 2 (2023:1, 2025:1) | 2 | 0 | 1 |
| 11 | `lp.regencia` | Regência nominal e verbal — **EMPATE 9 a 11** | 2 | 2 (2021P:1, 2025:1) | 2 | 0 | 1 |
| 12 | `lp.ortografia` | Ortografia (inclui hífen) | 2 | 2 (2019:1, 2021C:1) | 2 | 0 | 1 |
| 13 | `lp.colocacao` | Colocação pronominal | 1 | 1 (2025:1) | 1 | 0 | 1 |
| 14 | `lp.figuras_sentido` | Figuras de linguagem; denotação e conotação — **EMPATE com a 15** | 1 | 1 (2021P:1) | 1 | 0 | 1 |
| 15 | `lp.formacao` | Estrutura e formação de palavras — **EMPATE com a 14** | 1 | 1 (2023:1) | 1 | 0 | 1 |
| 16 | (sem código) | Itens do edital sem questão na amostra | 0 | — | — | — | 0 |

Soma: 10 + 5 + 5 + 5 + 4 + 4 + 3 + 3 + 2 + 2 + 2 + 2 + 1 + 1 + 1 = **50**.

**O que ensinar, lição por lição** (nenhuma lição de LP precisa de `fontes/leis`; todas podem ser montadas sem a pasta de leis):
- **L1 Classes:** as 10 classes do edital, com foco em verbo (tempo e modo), pronome e conjunção.
  - Em 2021C caíram 5 questões, o tópico de LP mais cobrado naquele concurso.
  - Conferir no banco (G0005, G0006, G0008, G0100, G0187 e G0328 a G0333) o que exatamente foi pedido.
- **L2 Sintaxe:** termos da oração, voz ativa, passiva e reflexiva, e análise do período. 2 das 5 questões foram anuladas: ver por quê no banco antes de usar como exemplo.
- **L3 Compreensão:** inferência, ideia central e referência no texto. É a mais estável nos anos recentes (2023, 2025).
- **L4 Coordenação e subordinação:** o valor semântico dos conectivos (causa, concessão, condição etc.). O edital pede "valores semânticos".
- **L5 Acentuação:** regras do Acordo Ortográfico de 1990, oxítonas e paroxítonas, hiato e acentos diferenciais.
- **L6 Semântica:** sinônimos, antônimos, parônimos, hipônimos e hiperônimos (estes dois estão no edital), e sentido no contexto.
- **L7 Crase:** a regra (preposição + artigo), os casos proibidos e os facultativos. Em 2019 o formato foi "onde falta a crase" (G0001).
- **L8 Pontuação:** vírgula em aposto, vocativo, adjunto deslocado e oração explicativa.
- **L9 Coesão:** retomada por pronome, elipse e conectores.
- **L10 Gêneros e funções da linguagem:** os gêneros do edital ("campo artístico-literário, das práticas de estudo e pesquisa, de atuação na vida pública e jornalístico-midiático") e as funções de Jakobson.
- **L11 Regência:** verbos de regência que muda o sentido e regência nominal; ligar com a crase.
- **L12 Ortografia:** grafia e hífen depois do Acordo de 1990.
- **L13 Colocação pronominal:** próclise, mesóclise e ênclise; fatores de atração.
- **L14 Figuras de linguagem:** metáfora, metonímia, ironia, hipérbole, eufemismo etc.
- **L15 Formação de palavras:** derivação e composição (edital).
- **L16 Itens do edital sem questão na amostra:** **concordância nominal e verbal**, **fonética**, **modalização** e **produção de texto**. Não achei código no radar para eles.
  - Proposta: lição curta, nível 0, sem `topicosBanco`. O gerador avisa e a lição sai sem questões.

**Fontes:** não precisa de lei. Norma-padrão: Acordo Ortográfico de 1990, VOLP (Vocabulário Ortográfico da Língua Portuguesa, da Academia Brasileira de Letras) e gramática de referência. **Fonte de conteúdo a definir**; a gramática citada no `limiteFonte` fica PENDENTE.

**Perguntas abertas:**
- Juntar as lições de 1 questão (L13 a L15) numa lição "Outros tópicos"? Isso reduz o volume, mas some a contagem separada.
- Que gramática citar no `limiteFonte`?

**Riscos:**
- **Questões com texto-base longo** (`textoBase`): a transcrição pode ter juntado colunas (aviso do banco). Conferir antes de usar como exemplo no texto da lição.
- **8 questões anuladas:** o gerador as exclui, mas a lição não deve ensinar a "resposta" de uma anulada.
- **Modelo de outra banca:** o `_modelo-portugues.json` é da FUNDATEC/Brigada. Copiar só a forma; nenhum exemplo, pegadinha ou contagem de lá.

---

## Apostila 02 — Conhecimentos Gerais e Legislação Municipal (`conhecimentos-gerais-legislacao`)

- **Disciplina:** CGL, comum a todos os cargos.
- **Peso:** 10 de 40 questões, 2,50 pontos.
- **Radar:** 50 únicas, todas em prova de CG. São 3 anuladas.
  - **8 são de leis que saíram do edital 2025** (LC 660, 661 e 1.234).
  - Dentro do edital 2025 ficam 42 únicas.
- **Programa:** `curso/edital.md`, seção 1.5, CGL, edital p. 44. Nomeia só a LOM de Blumenau e a Lei 7.564/2010.
- **Classe: B (a mais dependente de fonte).** Atualidades e história não precisam de lei, mas precisam de fonte factual datada.

| Ordem | Código | Lição | Únicas | Edições | CG | Anul. | Nível |
|---|---|---|---|---|---|---|---|
| 1 | `cgl.lom` | Lei Orgânica do Município de Blumenau | 11 | 5 (2019:1, 2021P:1, 2023:4, 2025:3, 2021C:2) | 11 | 0 | 3 |
| 2 | `cgl.brasil_mundo` | Atualidades: Brasil e mundo | 10 | 5 (2019:2, 2021P:1, 2023:3, 2025:2, 2021C:2) | 10 | 1 | 3 |
| 3 | `cgl.historia_cultura_sc` | História, cultura e economia de SC e de Blumenau | 8 | 3 (2019:3, 2021P:2, 2021C:3) | 8 | 1 | 3 |
| 4 | `cgl.ciencia_inovacao` | Descobertas e inovações científicas | 5 | 2 (2021P:2, 2025:3) | 5 | 1 | 3 |
| 5 | `cgl.lei7564` | Lei 7.564/2010 (contratação temporária) | 4 | 2 (2021P:1, 2023:3) | 4 | 0 | 2 |
| 6 | `cgl.cultura_artes` | Cultura e sociedade brasileira — **EMPATE com a 7** | 2 | 2 (2019:1, 2025:1) | 2 | 0 | 1 |
| 7 | `cgl.urbano` | Desenvolvimento urbano brasileiro — **EMPATE com a 6** | 2 | 2 (2019:1, 2025:1) | 2 | 0 | 1 |
| — | `cgl.lc660` | LC 660/2007, Estatuto dos Servidores — FORA do edital 2025 — **EMPATE com lc661** | 3 | 3 (2019, 2021P, 2021C) | 3 | 0 | ver G3 |
| — | `cgl.lc661` | LC 661/2007, Plano de Cargos — FORA do edital 2025 | 3 | 3 (2019, 2021P, 2021C) | 3 | 0 | ver G3 |
| — | `cgl.lc1234` | LC 1.234/2019, Estrutura Administrativa — FORA do edital 2025 | 2 | 2 (2021P, 2021C) | 2 | 0 | ver G3 |

Soma: 11 + 10 + 8 + 5 + 4 + 2 + 2 = 42 do edital, mais 3 + 3 + 2 = 8 fora, total **50**.

**O que ensinar:**
- **L1 LOM.** Normas: LOM de Blumenau **precisa de fontes/leis**. Não pode ser montada sem leis.
  - Os artigos e assuntos que as questões citam no próprio enunciado:
    - Conselhos Municipais (G0011, G0286);
    - Poderes e vereadores (G0105, G0197);
    - **art. 6º**, símbolos (G0202);
    - **art. 20-A**, Frentes Parlamentares (G0204);
    - **art. 38**, matérias de lei complementar (G0195);
    - consulta popular, percentual e prazo (G0283);
    - **arts. 73 e 73-A**, servidores (G0284);
    - competência privativa da Câmara (G0339);
    - princípios fundamentais (G0342).
  - Os números de artigo acima vêm dos enunciados. **Confirmar no texto vigente** antes de usar.
  - Hoje não há texto consolidado oficial: o anexo de 2021 é de site não oficial, é PDF e não dá para extrair o texto. Há ainda as emendas 51 a 54, e a 52 e a 53 dependem de lei complementar referendária ainda não verificada (`curso/edital.md`, seção 1.6).
  - **Até isso se resolver, nenhum trecho literal da LOM; só PENDENTE.**
- **L2 Atualidades.** Não precisa de lei, mas precisa de fonte jornalística ou oficial **datada**.
  - As questões citam TSE 2023 (G0198), Petrobras 2023 (G0200) e Lei Maria da Penha (G0019).
  - O conteúdo vence: precisa cobrir até perto da data da prova. Pode ser montada sem leis, com "fonte de conteúdo a definir" para cada fato.
- **L3 História e cultura de SC e Blumenau.** Não precisa de lei. Fonte factual: IBGE, governo de SC, prefeitura. **Fonte de conteúdo a definir.** Pode ser montada sem leis.
- **L4 Ciência e inovação.** Não precisa de lei. É atualidade científica, com o mesmo risco de vencimento da L2. Pode ser montada sem leis.
- **L5 Lei 7.564/2010.** **Precisa de fontes/leis.** Não pode ser montada sem a conferência da vigência.
  - Pontos que as questões citam:
    - **art. 3º**, recrutamento por processo seletivo simplificado (G0199);
    - **art. 11**, tempo de serviço (G0201);
    - base no **art. 37, IX, da CF/88** (G0203; o edital também cita);
    - visão geral (G0111).
  - O arquivo `lei-ordinaria-blumenau-7564-2010-camarablu.html` é o texto **original** de 2010 e está desatualizado: o art. 4º vigente é o da Lei 8.649/2018, segundo `curso/edital.md`, seção 1.6.
  - As 12 alteradoras estão em `fontes/leis/blumenau-lei7564-alteradoras/`. Trecho literal só depois de um Opus montar a redação vigente artigo por artigo.
  - Atenção: nas leis alteradoras, o texto novo vem entre aspas, e o gerador trata blocos entre aspas como citação. A conferência de "Art. N" pode falhar.
  - CF/88, art. 37, IX: HTML presente. Pode ir como trecho depois do ORIGEM.md.
- **L6 Cultura e sociedade brasileira:** arte, arquitetura, cinema, mídias (edital). Não precisa de lei. Pode ser montada sem leis.
- **L7 Desenvolvimento urbano.** Não precisa de lei.
  - Atenção: a questão G0287 (2025, COP30, envelhecimento, cidades resilientes) está aqui, mas também caberia em atualidades (`ESTADO.md`).

**Perguntas abertas:**
- G3: o que fazer com LC 660, 661 e 1.234.
- Quem consolida a LOM e a Lei 7.564, e com que fonte oficial?
- Se Balneário Camboriú publicar edital, a legislação municipal muda inteira. Fazer uma apostila 02 por município?
- Atualizar atualidades a cada novo edital?

**Riscos:**
- **Lei municipal sem consolidação oficial.** É o maior risco de erro de fato de todo o projeto.
- **Atualidades vencem** e não podem ser deduzidas das provas antigas.
- **Viés da amostra:** em 2023 caíram 4 questões de LOM e 3 da Lei 7.564, mais do que em outros anos. Tendência, não garantia.

---

## Apostila 03 — SUS, Políticas de Saúde e Epidemiologia (`sus-saude-publica`)

- **Disciplina:** parte comum de CE (as 5 especialidades).
- **Peso:** parte das 20 de CE. Na amostra: 30 de 274 únicas de CE; 30 de 110 de CE na prova do CG.
- **Radar:** 30 únicas, 3 anuladas.
- **Programa:** `curso/edital.md`, seção 1.5, bloco comum, edital p. 47 a 49.
- **Classe: B.** As leis federais estão quase todas presentes, mas falta o ORIGEM.md e o texto integral das Leis 8.142 e 15.126 (ver 0.5).

| Ordem | Código(s) | Lição | Únicas | Edições | CG | Anul. | Nível |
|---|---|---|---|---|---|---|---|
| 1 | `sus.lei8080` | Lei 8.080/1990: princípios, objetivos, competências, organização | 8 | 4 (2019:1, 2023:1, 2025:1, 2021C:5) | 8 | 1 | 3 |
| 2 | `sus.atencao_basica` | Modelo assistencial, níveis de atenção, PNAB, ESF, NASF, redes | 6 | 4 (2019:2, 2021P:2, 2023:1, 2025:1) | 6 | 0 | 3 |
| 3 | `sus.controle_social` + `sus.lei8142` | Controle social e Lei 8.142/1990 (lição juntada) | 3 + 2 = 5 | 4 distintas (controle: 2021P:2, 2025:1; 8.142: 2019:1, 2021C:1) | 5 | 0 | 3 |
| 4 | `sus.epidemiologia` | Epidemiologia: conceitos, indicadores, sistemas de informação | 4 | 3 (2021P:1, 2023:2, 2025:1) | 4 | 1 | 2 |
| 5 | `sus.gestao` | Gestão colegiada, comissões intergestores, responsabilidade sanitária — **EMPATE com a 6** | 2 | 2 (2023:1, 2025:1) | 2 | 1 | 1 |
| 6 | `sus.humanizacao_politicas` | Humanização (PNH, Lei 15.126/2025) e políticas — **EMPATE com a 5** | 2 | 2 (2023:1, 2025:1) | 2 | 0 | 1 |
| 7 | `sus.financiamento_planejamento` | Planejamento, orçamento e financiamento (FNS) | 2 | 1 (2025:2) | 2 | 0 | 1 |
| 8 | `sus.saude_trabalhador` | Saúde do trabalhador no SUS | 1 | 1 (2019:1) | 1 | 0 | 1 |

- Soma: 8 + 6 + 5 + 4 + 2 + 2 + 2 + 1 = **30**.
- A junção da L3 é proposta deste roteiro: os dois códigos tratam de Conselhos e Conferências. Sem a junção, `sus.controle_social` (3 questões, 2 edições) viria depois da Epidemiologia.

**O que ensinar e normas:**
- **L1 Lei 8.080.** Precisa de fontes/leis: `lei-8080-1990-camara-normaatualizada.html`, que é HTML, e CF/88, arts. 196 a 200.
  - Arts. conferidos como presentes no arquivo: 5º (objetivos), 6º (campo de atuação), 7º (princípios e diretrizes), 12 (comissões intersetoriais), 15 a 18 (atribuições comuns e competências das direções nacional, estadual e municipal), 35 (critérios de transferência; G0027) e 36 (planejamento ascendente).
  - Equidade (G0295): conferir em que dispositivo aparece.
  - Pode ter trechos quando existir o ORIGEM.md.
- **L2 Atenção básica.** Precisa de fontes/leis: Portaria 2.436/2017 (HTML), PRC 2/2017 (HTML; conferir em que anexo está a PNAB, PENDENTE) e Decreto 7.508/2011 (regiões e redes).
  - NASF (G0025) e ESF (G0116): conferir se o NASF ainda existe com esse nome na norma vigente (PENDENTE). A banca cobrou a PNAB antiga, Portaria 2.488/2011, em 2019.
- **L3 Controle social e Lei 8.142.** Precisa de fontes/leis.
  - Arquivo atual da Lei 8.142 = ficha sem texto: **baixar o texto integral (PENDENTE)**.
  - Exemplos do que caiu: periodicidade da Conferência (G0219, na lição de gestão), requisitos para receber recursos (G0026) e composição paritária.
- **L4 Epidemiologia.** Não precisa de lei. Conceitos (sindemia, G0119), medidas de frequência (G0299) e indicadores (G0221, anulada).
  - Fonte de conteúdo a definir: livro de epidemiologia ou publicação do Ministério da Saúde. As fórmulas de indicadores exigem fonte citada.
  - Pode ser montada sem leis.
- **L5 Gestão.** Precisa de fontes/leis: Lei 8.080 (artigos sobre comissões intergestores, a conferir) e Lei 8.142 (Conferência e Conselho; texto integral PENDENTE).
- **L6 Humanização.** Precisa de fontes/leis: Lei 15.126/2025 (arquivo atual = ficha; texto integral PENDENTE) e PNH, documento base (só PDF; conceito, sem trecho).
  - G0293 cobra a mudança que a Lei 15.126 fez na Lei 8.080. Conferir no HTML atualizado da 8.080 qual dispositivo foi incluído (PENDENTE).
- **L7 Financiamento.** Precisa de fontes/leis: LC 141/2012 (HTML) e Lei 8.080, arts. 33 a 36 (a conferir). FNS (G0297).
- **L8 Saúde do trabalhador.** Precisa de fontes/leis: Lei 8.080, art. 6º (conferir o parágrafo).

**Perguntas abertas:**
- Manter a junção da L3?
- Incluir a Resolução CNS 453/2012 (conselhos de saúde)? Ela não está em `fontes/leis` nem no edital.

**Riscos:**
- **Arquivos-ficha** das Leis 8.142 e 15.126.
- **ORIGEM.md ausente.**
- **PRC 2/2017:** alterações depois de 25/09/2026 podem não estar anotadas (`curso/edital.md`, seção 1.6).
- **Norma revogada cobrada pela banca** (Portaria 2.488/2011).

---

## Apostila 04 — Ética, Relações Humanas, Biossegurança e Prontuário (`etica-biosseguranca`)

- **Disciplina:** CE.
  - "Relações humanas no trabalho e ética profissional no serviço público" está no bloco comum (p. 47 a 49).
  - Biossegurança e prontuário estão na parte do Clínico Geral (p. 49), do Odontopediatra (p. 48) e do Buco-Maxilo-Facial (p. 48-49).
- **Peso:** parte das 20 de CE. Na amostra: 26 de 274; na prova do CG, 15 de 110.
- **Radar:** 26 únicas, nenhuma anulada.
- **Classe: B parcial.**
  - L2, L3 e L5 podem ser montadas já, sem leis.
  - L1, L4, L6 e L7 dependem de norma que hoje só existe em PDF (Código de Ética CFO, RDC 222/2018) ou que nem foi baixada.

| Ordem | Código | Lição | Únicas | Edições | CG | Nível |
|---|---|---|---|---|---|---|
| 1 | `bio.biosseguranca` | Biossegurança: antissepsia, esterilização e monitoramento, EPI, risco de transmissão | 7 | 4 (2019:1, 2021P:3, 2025:2, 2021C:1) | 4 | 3 |
| 2 | `etica.relacoes` | Relações humanas no trabalho | 5 | 5 (1 em cada edição) | 5 | 3 |
| 3 | `etica.servico_publico` | Ética profissional no serviço público | 4 | 4 (2019, 2021P, 2023, 2021C) | 4 | 3 (por edições) |
| 4 | `etica.codigo_cfo` | Código de Ética Odontológica (CFO) | 4 | 2 (2019:3, 2025:1) | 1 | 2 |
| 5 | `etica.responsabilidade` | Responsabilidade profissional: negligência, imprudência, imperícia | 3 | 1 (2019:3) | 0 | 2 |
| 6 | `bio.residuos` | Gerenciamento de resíduos (PGRSS) | 2 | 1 (2019:2) | 1 | 1 |
| 7 | `bio.prontuario` | Prontuário odontológico | 1 | 1 (2021P:1) | 0 | 1 |

Soma: 7 + 5 + 4 + 4 + 3 + 2 + 1 = **26**.

**O que ensinar e normas:**
- **L1 Biossegurança.**
  - Conceitos que caíram:
    - degermação × antissepsia × desinfecção × esterilização (G0028, G0136);
    - sequência da lavagem das mãos (G0174);
    - medidas que são e que não são de biossegurança (G0179);
    - **classificação de artigos críticos, semicríticos e não críticos "do Ministério da Saúde"** (G0301);
    - monitoramento da esterilização: indicadores químico, biológico e físico (G0304);
    - EPI na pandemia (G0372).
  - Normas: RDC 15/2012 (HTML presente; conferir se define a classificação dos produtos, PENDENTE) e o manual da Anvisa de serviços odontológicos (não baixado; PENDENTE).
  - **Precisa de fontes/leis** para trechos; os conceitos podem ser adiantados com `conceito: true`.
- **L2 Relações humanas.** Conflito, liderança, diversidade, inteligências interpessoal e intrapessoal (G0021, G0114, G0223, G0312, G0346).
  - Não precisa de lei. Fonte de conteúdo a definir. Pode ser montada sem leis.
- **L3 Ética no serviço público.** Conceito de ética, dilema da corrupção, função pública e vida privada (G0022, G0113, G0224, G0345).
  - Não precisa de lei, porque o edital não nomeia código de ética de servidor.
  - O Decreto 1.171/1994 não está no programa (`curso/edital.md`, seção 1.6). Pode ser montada sem leis.
- **L4 Código de Ética Odontológica.** Infrações no relacionamento com o paciente (G0031, G0087), art. 12, relacionamento entre inscritos (G0066), e função dos códigos (G0311).
  - **Precisa de fontes/leis:** CFO-118/2012 com a alteração CFO-271/2025, que mexe nos arts. 20, 32 e 44 (`curso/edital.md`, seção 1.6).
  - Os dois só existem em **PDF**, então o gerador não aceita trecho: tudo sai como `conceito: true`, citando artigo, até haver versão HTML oficial (PENDENTE).
  - Não pode ser montada com segurança sem conferir os artigos no PDF.
- **L5 Responsabilidade profissional.** Negligência × imprudência × imperícia (G0039, G0059, G0072: as três de 2019, mesmo formato).
  - Base legal provável: Código Penal, art. 18, e Código Civil, art. 951. É **hipótese deste roteiro**: as duas leis **não estão em `fontes/leis`** e precisam ser baixadas e conferidas (PENDENTE).
  - O conceito pode ser montado sem leis.
- **L6 Resíduos.** O que entra no PGRSS (G0036) e em que grupo vai o tubete de anestésico (G0051).
  - **Precisa de fontes/leis:** RDC 222/2018, que está só em PDF, então sem trecho. Conferir a classificação do tubete no texto (PENDENTE).
- **L7 Prontuário.** O que é obrigatório "segundo o CFO" (G0175).
  - **Precisa de fonte:** o Código de Ética tem dispositivo sobre prontuário (conferir qual artigo) e pode haver resolução ou manual do CFO (não baixado; PENDENTE).

**Perguntas abertas:**
- Procurar versão HTML oficial do Código de Ética e da RDC 222, ou aceitar apostila sem trecho literal nessas lições?
- Baixar Código Penal e Código Civil só para a L5?

**Riscos:**
- **Código de Ética sem texto consolidado pelo CFO.** Pode existir outra resolução alteradora (`curso/edital.md`, PENDENTE).
- **"Classificação do Ministério da Saúde"** sem fonte baixada.
- **Especialidade:** 3 das 4 questões do Código de Ética e as 3 de responsabilidade não caíram na prova de CG.

---

## Apostila 05 — Cariologia, Prevenção, Saúde Bucal Coletiva e Odontopediatria (`cariologia-prevencao-odontopediatria`)

- **Disciplina:** CE. Parte do Clínico Geral (p. 49) e do Odontopediatra (p. 48).
- **Peso:** parte das 20 de CE. Na amostra: 41 de 274; na prova do CG, só 12 de 110 (a maioria das questões de odontopediatria é própria do cargo de Odontopediatra).
- **Radar:** 41 únicas, nenhuma anulada.
- **Classe: A.** Nenhuma lição precisa de trecho de lei. Precisa de livro-texto e de diretriz clínica citados.

| Ordem | Código(s) | Lição | Únicas | Edições | CG | Nível |
|---|---|---|---|---|---|---|
| 1 | `ped` | Odontopediatria | 20 | 5 (2019:5, 2021P:5, 2023:6, 2025:3, 2021C:1) | 2 | 3 |
| 2 | `prev.epi_bucal` | Epidemiologia em saúde bucal: índices e levantamentos | 7 | 4 (2019:4, 2021P:1, 2023:1, 2021C:1) | 2 | 3 |
| 3 | `cario` | Cariologia: etiologia, biofilme, saliva, diagnóstico e risco | 6 | 2 (2021P:4, 2021C:2) | 4 | 3 |
| 4 | `prev.fluor` | Flúor: mecanismos, métodos, fluorose, toxicidade | 5 | 4 (2019:1, 2021P:2, 2023:1, 2021C:1) | 1 | 3 |
| 5 | `clin.plano_tratamento` + `prev.saude_coletiva` + `clin.pacientes_especiais` | Plano de tratamento integrado, saúde bucal coletiva e pacientes especiais (lição juntada) | 1 + 1 + 1 = 3 | 2 distintas (2019; 2021C) | 3 | 2 |

- Soma: 20 + 7 + 6 + 5 + 3 = **41**.
- A L5 junta três códigos de 1 questão cada, empatados entre si (1 questão, 1 edição, nenhuma em 2025): é proposta deste roteiro.

**O que ensinar** (nenhuma lição precisa de lei; todas podem ser montadas sem a pasta de leis):
- **L1 Odontopediatria (20 questões; uma lição só; subassuntos nos pontos, ver G1):**
  - (a) Odontogênese e anomalias: fases botão, capuz e campânula; geminação × fusão; anodontia (G0042, G0075, G0255, G0321).
  - (b) Boca do recém-nascido: pérolas de Epstein, nódulos de Bohn, cisto gengival, Riga-Fede, dente natal e neonatal (G0166, G0319, G0320, G0363).
  - (c) Oclusão e desenvolvimento: classificação de Angle, plano terminal dos segundos molares decíduos, mantenedor de espaço, aleitamento e hábitos (G0069, G0165, G0170, G0252, G0260).
  - (d) Diagnóstico e terapia pulpar em decíduos: formocresol, pulpite irreversível, capeamento, decisão entre endodontia e exodontia pela radiografia (G0078, G0250, G0259, G0169).
  - (e) Tratamento restaurador atraumático e cárie em decíduos (G0073).
  - (f) Manejo do comportamento: dizer-mostrar-fazer (G0254).
  - (g) Erupção retardada e ulectomia (G0160).
  - Contagem: 4 + 4 + 5 + 4 + 1 + 1 + 1 = 20.
  - Os itens do edital do Odontopediatra **sem questão na amostra** entram como pontos curtos de nível 0: cefalometria, frenectomia, crianças com deficiência, atendimento hospitalar e radiologia em odontopediatria.
  - Fonte de conteúdo a definir: livro de odontopediatria.
- **L2 Epidemiologia em saúde bucal:**
  - índices de cárie e como contar (G0037, G0060, G0079);
  - epidemiologia do câncer bucal e de lábio (G0064);
  - fatores da cárie (G0145);
  - índice DAI de má oclusão (G0256);
  - prevalência das doenças periodontais (G0366).
  - Fonte: levantamento nacional SB Brasil e manual de índices do Ministério da Saúde (a localizar; PENDENTE).
- **L3 Cariologia:**
  - colonização e biofilme (G0134, G0164);
  - lesão ativa × inativa (G0140);
  - zonas da lesão em dentina (G0163);
  - saliva: alfa-amilase (G0352; o edital pede "formação e composição da saliva");
  - etiologia (G0359).
- **L4 Flúor:**
  - verniz em criança de alto risco (G0077);
  - recursos preventivos (G0161);
  - fluorose (G0168);
  - **intoxicação aguda e conduta** (G0258);
  - mecanismo de ação (G0369).
  - Exige diretriz citada: Guia de recomendações para o uso de fluoretos do Ministério da Saúde (a localizar; PENDENTE).
- **L5 Plano de tratamento, saúde coletiva e pacientes especiais:** sequência do plano integrado (G0050), doenças de interesse em programa de saúde (G0353) e o paciente idoso (G0362).

**Perguntas abertas:**
- G1: dividir Odontopediatria em subcódigos?
- Que livro-texto de odontopediatria e de cariologia citar?

**Riscos:**
- **Doses e concentrações de flúor**, como verniz a 5% e gel a 1,23%, e a **dose provavelmente tóxica** têm de vir de diretriz citada. Nunca de memória.
- **Odontopediatria pesa pouco para o CG** (2 de 20). Ver G2.

---

## Apostila 06 — Dentística, Materiais, Oclusão, Endodontia e Traumatismo (`dentistica-endodontia-trauma`)

- **Disciplina:** CE. Parte do Clínico Geral (p. 49) e do Endodontista (p. 47-48).
- **Peso:** parte das 20 de CE. Na amostra é a maior: 76 de 274; na prova do CG, 29 de 110.
- **Radar:** 76 únicas, 3 anuladas (todas em `dent`).
- **Classe: A.**

| Ordem | Código | Lição | Únicas | Edições | CG | Anul. | Nível |
|---|---|---|---|---|---|---|---|
| 1 | `endo` | Endodontia | 30 | 4 (2019:9, 2021P:8, 2023:9, 2025:4) | 2 | 0 | 3 |
| 2 | `dent` | Dentística e materiais | 21 | 5 (2019:2, 2021P:7, 2023:6, 2025:1, 2021C:5) | 18 | 3 | 3 |
| 3 | `trauma` | Traumatismo dentoalveolar | 14 | 5 (2019:5, 2021P:3, 2023:2, 2025:3, 2021C:1) | 5 | 0 | 3 |
| 4 | `dent.oclusao_dtm` | Oclusão e DTM | 6 | 3 (2021P:3, 2023:2, 2021C:1) | 3 | 0 | 3 |
| 5 | `radio` | Radiologia e imagem | 5 | 3 (2021P:3, 2023:1, 2021C:1) | 1 | 0 | 3 |

Soma: 30 + 21 + 14 + 6 + 5 = **76**.

**O que ensinar** (nenhuma lição precisa de lei; todas podem ser montadas sem a pasta de leis):
- **L1 Endodontia (30; uma lição; ver G1):**
  - (a) Diagnóstico e patologia pulpar e periapical: exame clínico, sequência, pulpites, abscessos, a polpa só sente dor, teoria hidrodinâmica (G0058, G0147, G0237, G0238, G0240, G0248, G0302, G0317, G0246). São 9 questões, o subassunto mais cobrado.
  - (b) Anatomia interna, comprimento dos dentes e acesso coronário (G0054, G0056, G0151, G0152, G0153, G0157).
  - (c) Instrumentos: lima K, conicidade, propriedades mecânicas (G0061, G0245).
  - (d) Irrigação: hipoclorito e suas soluções comerciais, EDTA (G0062, G0242).
  - (e) Medicação intracanal (G0316).
  - (f) Obturação: guta-percha, cimentos, propriedades, técnica de Schilder (G0148, G0150, G0155, G0241).
  - (g) Acidentes e retratamento (G0055, G0063).
  - (h) Urgências (G0046).
  - (i) Radiologia aplicada à endodontia (G0057).
  - (j) Reabsorções: classificação de Machado et al. (2022) (G0243, G0318).
  - Contagem: 9 + 6 + 2 + 2 + 1 + 4 + 2 + 1 + 1 + 2 = 30.
- **L2 Dentística (21, 3 anuladas):**
  - (a) Proteção do complexo dentinopulpar e tipos de dentina (G0137, G0138, G0142 anulada, G0244).
  - (b) Preparo cavitário e classificação de Black (G0141, G0143, G0144, G0235, G0227 anulada, G0231 anulada).
  - (c) Materiais: CIV, amálgama, resinas, fator C, bulk fill, bis-acryl no ensaio restaurador (G0047, G0139, G0251, G0253, G0367, G0357).
  - (d) Sistemas adesivos, inclusive universais (G0048, G0361).
  - (e) Dente anterior fraturado com guia palatina (G0313).
  - (f) Dente tratado endodonticamente: pino de fibra (G0354).
  - (g) Clareamento e sensibilidade (G0358).
  - Contagem: 4 + 6 + 6 + 2 + 1 + 1 + 1 = 21.
  - **Para o Clínico Geral é a lição mais importante desta apostila** (18 em prova de CG).
- **L3 Traumatismo:**
  - (a) Lesões dos tecidos de suporte: concussão, subluxação, luxações (G0035, G0167, G0305).
  - (b) Trauma na dentição decídua: conduta imediata e avulsão de decíduo, que não se reimplanta (G0043, G0070, G0071, G0257, G0374).
  - (c) Avulsão e reimplante em permanente (G0126).
  - (d) Fraturas e polpa do dente traumatizado (G0065, G0306).
  - (e) Exame do paciente traumatizado (G0121).
  - (f) Lesões de tecidos moles (G0303).
  - (g) Escurecimento pós-trauma (G0239).
  - Contagem: 3 + 5 + 1 + 2 + 1 + 1 + 1 = 14.
  - Exige diretriz citada: diretrizes da IADT (International Association of Dental Traumatology). Versão e ano PENDENTES.
- **L4 Oclusão e DTM:** dor miofascial (G0123), o que é e o que não é DTM (G0183, G0364), terapia oclusal (G0173), forças de equilíbrio dos arcos (G0229), posições mandibulares e relação cêntrica (G0230).
- **L5 Radiologia:** tomografia de feixe cônico e outros métodos de imagem (G0129, G0370), posicionamento do filme (G0146), filme dosimétrico (G0156), técnica de Clark (G0247).

**Perguntas abertas:**
- G1 para `endo` e `dent`.
- G2: com ordem pela coluna CG, Dentística vem antes de Endodontia.

**Riscos:**
- **Números clínicos** (comprimento médio de dente, conicidade da lima, concentração de hipoclorito, fator C) só com livro citado. A questão G0152 pede um comprimento em milímetros.
- **Diretriz de trauma muda de versão.**
- **Lição muito grande** (30 questões, com uma tabela e um mapa só).

---

## Apostila 07 — Periodontia (`periodontia`)

- **Disciplina:** CE. Parte do Clínico Geral (p. 49) e do Periodontista (p. 48).
- **Peso:** parte das 20 de CE. Na amostra: 38 de 274; na prova do CG, só 4 de 110.
- **Radar:** 38 únicas, 1 anulada (G0264), e sobram **37 usáveis**.
- **Classe: A.**

| Ordem | Código | Lição | Únicas | Edições | CG | Anul. | Nível |
|---|---|---|---|---|---|---|---|
| 1 | `perio` | Periodontia: anatomia, classificação, etiologia, diagnóstico, tratamento e manutenção | 38 | 5 (2019:13, 2021P:7, 2023:12, 2025:4, 2021C:2) | 4 | 1 | 3 |

**O que ensinar** (não precisa de lei; pode ser montada sem a pasta de leis). Um código só; se G1 ficar na opção (a), a apostila tem **uma lição grande**, com os subassuntos abaixo nos `pontos`, em ordem do que mais caiu:
1. **Classificação e quadros clínicos:** gengivite, periodontite crônica e agressiva, doenças necrosantes e fatores de risco delas (G0081, G0084, G0085, G0086, G0180, G0181, G0172, G0177). São **8**.
2. **Anatomia e histologia do periodonto:** periodonto de inserção, células do epitélio, fibras do ligamento, conjuntivo gengival, envelhecimento (G0041, G0080, G0089, G0269, G0270, G0307, G0323). São **7**.
3. **Doenças gengivais modificadas e manifestações sistêmicas:** medicamentos, leucemia, agranulocitose, bacterianas específicas, fúngicas (G0262, G0263, G0267, G0268, G0271). São **5**.
4. **Controle de placa e terapia não cirúrgica:** técnica de escovação, meios de controle, raspagem e alisamento, clorexidina (G0092, G0176, G0182, G0373). São **4**.
5. **Fatores de risco, epidemiologia e tabagismo** (G0082, G0178, G0272). São **3**.
6. **EMPATE, 2 questões cada:**
   - microbiologia e coagregação (G0083, G0266);
   - cálculo (G0261, G0264 anulada);
   - diagnóstico e plano de tratamento (G0090, G0091);
   - cirurgia periodontal e complicações (G0265, G0324).
7. **EMPATE, 1 questão cada:**
   - fatores anatômicos: pérolas de esmalte (G0371);
   - manutenção (G0088);
   - perio-restauradora (G0322).

Contagem: 8 + 7 + 5 + 4 + 3 + 2 × 4 + 1 × 3 = 38.

**Fontes:** não precisa de lei. "Periodontia Clínica − Newman & Carranza", citado pela banca em 12 questões de 2023. Edição PENDENTE.

**Perguntas abertas:**
- G1: 38 questões numa lição só ficam pesadas. Esta apostila é a que mais ganha com subcódigos.
- Quantas questões ficam na lição e quantas vão para o simulado? Sugestão: `qtdQuestoes` de 25 a 27, para sobrarem cerca de 10 para o simulado. Quem monta diz o que escolheu.

**Riscos:**
- **Duas classificações:** as questões de 2019 e 2021 usam a classificação antiga (periodontite "crônica" e "agressiva"). A atual, do workshop mundial AAP/EFP de 2017, usa estágios e graus.
  - A apostila precisa ensinar as duas, dizendo qual a banca usou em cada prova.
  - O ano e o nome da classificação nova precisam de fonte citada (PENDENTE).
- **Pesa pouco para o CG** (4 de 38).

---

## Apostila 08 — Cirurgia, Anestesia, Farmacologia, Emergências e Patologia Bucal (`cirurgia-farmacologia-patologia`)

- **Disciplina:** CE. Parte do Clínico Geral (p. 49) e do Buco-Maxilo-Facial (p. 48-49).
- **Peso:** parte das 20 de CE. Na amostra: 63 de 274; na prova do CG, 20 de 110.
- **Radar:** 63 únicas, 1 anulada (G0360, em `farm`).
- **Classe: A.** Farmacologia exige referência clínica citada (ver riscos).

| Ordem | Código | Lição | Únicas | Edições | CG | Anul. | Nível |
|---|---|---|---|---|---|---|---|
| 1 | `cir` | Cirurgia oral e bucomaxilofacial | 28 | 4 (2019:5, 2021P:8, 2023:12, 2025:3) | 4 | 0 | 3 |
| 2 | `pato` | Patologia e estomatologia | 12 | 4 (2019:5, 2021P:4, 2023:1, 2025:2) | 7 | 0 | 3 |
| 3 | `anest` | Anestesia local | 9 | 4 (2019:1, 2021P:3, 2023:4, 2021C:1) | 3 | 0 | 3 |
| 4 | `farm` | Farmacologia e terapêutica | 6 | 4 (2019:1, 2021P:1, 2023:1, 2021C:3) | 4 | 1 | 3 |
| 5 | `anat` | Anatomia de cabeça e pescoço | 5 | 3 (2019:1, 2021P:2, 2023:2) | 2 | 0 | 3 |
| 6 | `emerg` | Emergências médicas no consultório | 3 | 1 (2019:3) | 0 | 0 | 2 |

Soma: 28 + 12 + 9 + 6 + 5 + 3 = **63**.

**O que ensinar** (nenhuma lição precisa de lei; todas podem ser montadas sem a pasta de leis):
- **L1 Cirurgia (28; ver G1):**
  - (a) Fraturas faciais: classificação das fraturas de mandíbula, terço médio e pilares, nariz, zigomático e nervo infraorbitário, odontossíntese × osteossíntese (G0040, G0125, G0128, G0130, G0208, G0209, G0310). São **7**.
  - (b) Exodontia: indicações e contraindicações, alveolectomia, complicações, comunicação bucossinusal e manobra de Valsalva (G0049, G0214, G0210, G0308, G0215). São 5.
  - (c) Princípios de técnica cirúrgica: diérese e divulsão, síntese e sutura, reparação tecidual, hemorragia (G0032, G0033, G0038, G0206). São 4.
  - (d) Terceiros molares e acessos: pericoronarite, retalhos, acesso ao mento (G0216, G0225, G0233, G0226). São 4.
  - (e) Pré e pós-operatório e equipe, atelectasia (G0120, G0122, G0127). São 3.
  - (f) **EMPATE, 1 questão cada:**
    - cistos: enucleação (G0207);
    - ATM: discectomia (G0131);
    - neuralgia do trigêmeo (G0124);
    - infecções fúngicas maxilofaciais (G0309);
    - fratura radicular apical (G0213).
  - Contagem: 7 + 5 + 4 + 4 + 3 + 5 = 28.
- **L2 Patologia:**
  - infecções virais: varicela, sarampo, herpes-zóster, gengivoestomatite herpética, caxumba (G0053, G0067, G0133, G0159, G0249, G0314). São 6.
  - **EMPATE, 1 questão cada:**
    - escarlatina (G0044);
    - candidíase (G0076);
    - tipos de infecção (G0184);
    - mucocele e rânula (G0045);
    - leucoplasia (G0135);
    - fibromatose gengival (G0315).
  - Contagem: 6 + 6 = 12.
  - **"Tumores benignos e malignos" está no edital (p. 49) e não teve nenhuma questão na amostra:** ponto de nível 0.
- **L3 Anestesia local:**
  - propriedades do anestésico ideal (G0034);
  - pKa (G0211);
  - escolha para alérgico a bissulfito, que é o conservante do vasoconstritor (G0365);
  - bloqueio do nervo alveolar inferior em adulto e em criança (G0154, G0162);
  - complicações (G0171, G0205);
  - referências ósseas (G0234, G0236; fonte citada pela banca: Reher, 2020).
- **L4 Farmacologia:**
  - efeitos adversos de antimicrobianos (G0052);
  - antibiótico com álcool (G0368);
  - **profilaxia de endocardite** (G0212; e G0356, que pede dose de amoxicilina em criança por kg);
  - farmacologia na DTM (G0132);
  - analgésicos em criança (G0360, anulada; não usar como gabarito).
- **L5 Anatomia:** limites dos lábios (G0074), origem da vascularização (G0149), fontículos (G0158), inervação da cavidade oral (G0228, G0232; Reher, 2020).
- **L6 Emergências:** crise hipertensiva (G0029), hipotensão ortostática (G0030), crise convulsiva (G0068).

**Perguntas abertas:**
- G1 para `cir`.
- Que diretriz de profilaxia de endocardite citar? Precisa de nome, entidade e ano.

**Riscos (os maiores da parte clínica):**
- **Doses** (amoxicilina por kg, máximo de tubetes, intervalos) e **valores** (pKa, pressão arterial da crise hipertensiva) só com livro ou diretriz citado, página e edição. **Nunca de memória.** O que não for confirmado fica PENDENTE.
- **A questão G0212** fala em "febre reumática", com a profilaxia 1 hora antes. A apostila não pode inventar indicação: seguir a diretriz citada.
- **Lição de Cirurgia grande**, e só 4 das 28 questões caíram na prova de CG.

---

## Briefing padrão para cada Sonnet (copiar, trocar os <campos> e colar)

```text
PAPEL
Você é um Sonnet que monta UMA apostila de estudo para concurso, no projeto "Apostilas Cirurgião-Dentista FURB".
Pasta do projeto: C:\Users\rafae\projetos\concurso\apostilas-dentista-furb (repositório git).
Responda e escreva em português do Brasil.

O QUE É O PROJETO (você nunca viu)
- Objetivo: uma apostila PDF por disciplina do edital, numeradas "Apostila 01" a "Apostila 08", com ênfase no que mais caiu
  nas provas anteriores da banca FURB (Fundação Universidade Regional de Blumenau) para Cirurgião-Dentista da
  Prefeitura de Blumenau (SC). Edital base: PSPS 003/2025 (Processo Seletivo Público Simplificado). A prova tem 40 questões:
  Língua Portuguesa 10, Conhecimentos Gerais e Legislação 10, Conhecimentos Específicos 20.
- O gerador (scripts/gerar-apostila-materia.mjs) só FORMATA o JSON que você escreve. As questões reais entram sozinhas
  pelo campo "topicosBanco" de cada lição.
- Glossário: radar = curso/radar-banca.json (o que mais cai, por código de tópico, ex.: "lp.crase"); banco =
  curso/questoes-anteriores.json (questões reais com gabarito oficial; use só as de "alvo": true, que são as de
  Blumenau); "questão única" = contada uma vez (as 5 especialidades repetem as mesmas questões); CG = Clínico Geral;
  PENDENTE = algo que não foi confirmado em fonte.

SUA TAREFA
Montar a Apostila <0N> — <título>, id "<id>", no arquivo curso/apostila/<id>.json, seguindo a seção
"Apostila <0N>" de curso/roteiro-apostilas.md (lições, ordem, códigos, níveis, o que ensinar, fontes, riscos).

ARQUIVO QUE VOCÊ PODE ESCREVER (só este)
- C:\Users\rafae\projetos\concurso\apostilas-dentista-furb\curso\apostila\<id>.json
O gerador também grava o HTML de saída em rascunho/apostila/ quando você o roda; isso é esperado.
Nenhum outro arquivo. Precisou mudar outro (radar, banco, gerador, edital, roteiro)? PARE e diga qual e por quê.

LEIA ANTES DE ESCREVER
1. curso/roteiro-apostilas.md: as seções 0 (regras gerais) e "Apostila <0N>".
2. Cabeçalho e linhas 120 a 280 de scripts/gerar-apostila-materia.mjs (campos obrigatórios e regras dos trechos).
3. curso/apostila/_modelo-portugues.json: SÓ O FORMATO. O conteúdo é de outra banca (FUNDATEC, para a Brigada Militar)
   e NÃO pode ser reaproveitado: nem exemplo, nem pegadinha, nem contagem, nem frase.
4. No banco, as questões dos seus códigos (filtre por "topico" e "alvo": true). Os códigos G0xxx citados no roteiro são
   o campo "grupo". É delas que saem "como a banca cobra" e as pegadinhas.
5. curso/edital.md, seção 1.5: o programa da sua disciplina.

FORMATO DO JSON (campos que o gerador exige)
- id (igual ao nome do arquivo), numero (inteiro N), titulo (SEM "Apostila 0N", porque o gerador acrescenta),
  subtitulo, arquivoPdf (exatamente o nome dado no roteiro; começa com "apostila-0N-"), comoUsar [textos],
  ranking [{rotulo, nivel}], licoes [...], e opcionalmente fontes [arquivos .html de fontes/leis], limiteFonte, rotuloPontos.
- Cada lição: id (letras, números, - e _; único), titulo, nivel (0 a 3, do roteiro), topicosBanco [códigos do roteiro],
  qtdQuestoes (opcional; padrão 8), intro, pontos [{ref, texto, e "trecho" OU "conceito": true}], tabela opcional
  {titulo, cab, linhas}, macete, pegadinhas [ ], cobra [ ], mapa {centro, ramos: [{t, f: [ ]}]}.
- comoUsar precisa dizer: a amostra é pequena (5 editais de um só município, 2019 a 2025); a frequência indica
  tendência, não garantia; o material não tem vínculo com a FURB nem com a prefeitura.

REGRAS QUE NÃO PODEM FALHAR
1. Nunca invente número, artigo, data, dose, porcentagem, nome de autor, ano de diretriz ou resultado. Toda contagem de
   questão vem do radar ou do roteiro. Todo artigo de lei vem do texto da lei. Todo dado clínico (dose, concentração,
   medida) vem de livro ou diretriz citado com edição. Sem fonte: escreva "PENDENTE: <o que falta>" e avise no relatório.
2. Trecho de lei ("trecho") só LITERAL, dispositivo completo, copiado de um arquivo .html de fontes/leis listado em
   "fontes". PDF não serve. Na dúvida, ou se o roteiro marca a lei como PENDENTE, use "conceito": true e cite o artigo
   no "ref" como "a conferir".
   O gerador confere se o texto é literal, NÃO se está em vigor: siga as observações de vigência do roteiro
   (ex.: a Lei 7.564/2010 de Blumenau no arquivo é o texto de 2010, desatualizado).
3. "O que mais cai" e qualquer comparação tratam empate: use a ordem e os EMPATES do roteiro.
4. Não use git (nada de add, commit, push, stash, branch). Não toque em outro arquivo.
5. Edite só com as ferramentas Write/Edit. Nunca use sed, node -e ou heredoc para gravar texto (barras invertidas
   se estragam no Windows).
6. Sem segredo, e-mail, telefone ou dado pessoal no texto.
7. Não use o texto de questão ANULADA como exemplo de resposta certa.
8. Nunca copie texto da banca FAURGS (projeto HCPA) nem da FUNDATEC (modelo). O projeto HCPA não está nesta máquina:
   escreva do zero; onde precisar de referência teórica e o roteiro disser "fonte de conteúdo a definir", escreva o
   conceito de forma geral e marque no relatório que falta a fonte.
9. Rode os comandos em primeiro plano e espere terminar. Não mascare o código de saída (nada de "| tail" ou "; echo").

ESTILO
- Linguagem simples, para estudante de concurso: frases curtas, um conceito por ponto, exemplo concreto.
- Ênfase no que mais cai: lição de nível 3 tem mais pontos, tabela e pegadinhas; nível 1 é curta; nível 0 só lista o
  item do edital e diz que não apareceu na amostra (sem topicosBanco).
- "intro" diz quantas questões caíram e em quais edições (números do roteiro).
- "cobra" descreve o FORMATO real das questões (ex.: "afirmativas I a IV", "V/F em sequência", "associe as colunas",
  "EXCETO"), citando o grupo G0xxx de onde tirou.
- "pegadinhas" saem das alternativas erradas reais do banco, não de imaginação.
- Tópico grande (um código só): os subassuntos do roteiro viram pontos com "ref" começando pelo subassunto
  (ex.: "Anatomia do periodonto · fibras do ligamento"), na ordem do roteiro.

COMO VERIFICAR (obrigatório antes de entregar)
- node scripts/gerar-apostila-materia.mjs <id>
  Esperado: código de saída 0 e o HTML gravado em rascunho/apostila/. Leia TODOS os avisos que o gerador imprimir e
  copie-os no relatório. Se ele falhar por pdftotext ou navegador: você só precisa do HTML; não rode com --pdf.
- Confira: soma das questões por lição = número do roteiro; todo "trecho" passou na conferência; cada lição tem questões
  (ou o aviso esperado, para nível 0).

O QUE ENTREGAR (texto final, sem criar arquivo de relatório)
1. O arquivo criado e quantas lições, pontos, trechos e pontos "conceito" ele tem.
2. A saída do gerador: o código de saída e os avisos, copiados.
3. A lista de tudo que ficou PENDENTE (fonte que falta, artigo a conferir, dado clínico sem referência).
4. Separado: CONFIRMADO (com fonte: arquivo e artigo, ou livro e edição) × HIPÓTESE.
5. O que falhou, o que você pulou e o que NÃO verificou.
6. Erro que você cometeu ou achou (para o registro de erros do dono): o que foi, a causa e como evitar.
```
