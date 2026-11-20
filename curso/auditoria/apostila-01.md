# Auditoria de fatos: Apostila 01 (Língua Portuguesa)

- **Arquivo auditado:** `curso/apostila/portugues.json`
- **Data:** 2026-11-19. Auditor: Opus. Só auditoria; a apostila **não** foi alterada.
- **Comparei com:** `curso/questoes-anteriores.json` (o banco de questões; enunciado, alternativas e gabarito de cada grupo G0xxx), `curso/radar-banca.json`, `curso/roteiro-apostilas.md` (seções 0 e Apostila 01) e `curso/edital.md`.
- **Limite:** os PDFs originais das provas não estão nesta máquina. Por isso, os enunciados foram conferidos só contra o texto transcrito no banco, e não contra a prova.

## Veredito: PRONTA COM CORREÇÕES LISTADAS

Não achei erro gramatical grave nem resposta de questão anulada ensinada como certa. Todos os gabaritos citados batem com o banco. Há seis achados MÉDIOS: uma contagem errada, uma análise discutível da banca que precisa de aviso mais claro, uma transcrição suspeita, uma exceção de ortografia que falta e dois exemplos que precisam de ajuste.

## 1. Contagens (conferidas)

| Item | Esperado | Na apostila | Banco (contei eu) | Situação |
|---|---|---|---|---|
| Lições | 16 | 16 | — | OK |
| Pontos | 83 | 83 | — | OK |
| Questões únicas | 50 | 50 | 50 (`alvo: true`, tópicos `lp.*`) | OK |
| Anuladas | 8 | 8 | 8 (G0189, G0191, G0278, G0325, G0326, G0327, G0328, G0329) | OK |
| Questões nas lições | 42 | 8 + 3 + 5 + 5 + 2 + 4 + 2 + 3 + 1 + 2 + 2 + 2 + 1 + 1 + 1 = 42 | 42 usáveis | OK (sobram 0 para o simulado) |
| Soma do radar | 50 | — | `radar-banca.json`: 50 | OK |

As contagens por lição (únicas, edições e anuladas) da introdução de cada lição batem com o banco. A ordem segue o roteiro, com empate tratado. O radar lista `lp.coord_subord` antes de `lp.sintaxe`, mas pela regra de empate do roteiro (mais edições) a sintaxe vem antes, como está na apostila.

## 2. Achados, por gravidade

| # | Grav. | Onde | O que está errado ou duvidoso | Correção sugerida (texto exato) |
|---|---|---|---|---|
| 1 | MÉDIO | `comoUsar[5]` | Diz “Em 2025, em duas questões todas as afirmativas estavam corretas”. No banco, em 2025, foram **quatro**: G0273 (E = I, II e III), G0276 (C = I, II e III), G0277 (A = I, II e III) e G0282 (D = I, II e III). Em 2023, G0190 (A = I, II e III) também. | “Em 2025, em quatro questões todas as afirmativas estavam corretas (G0273, G0276, G0277 e G0282); em 2023, também em G0190. Não parta do princípio de que sempre existe uma errada.” |
| 2 | MÉDIO | L2 sintaxe, ponto “Recomenda-se que…: cuidado com a nomenclatura” (e pegadinha G0190) | A banca deu como correta, em G0190, a afirmativa II: o sujeito de “recomendar” é **indeterminado**. Na análise tradicional, “recomendar” é transitivo direto. O “se” é partícula apassivadora, e a oração “que os adultos consumam…” é o sujeito (oração subordinada substantiva subjetiva). A partícula apassivadora **não** deixa o sujeito indeterminado. Risco: o aluno decorar “recomenda-se que… = sujeito indeterminado”. Repare que G0191, anulada, falava da mesma frase. | “Em G0190 a banca deu como correto que, em ‘Recomenda-se que os adultos consumam…’, o sujeito de ‘recomendar’ é indeterminado. Atenção: pela gramática tradicional, ‘recomendar’ é transitivo direto, o ‘se’ é partícula apassivadora e o sujeito é a própria oração ‘que os adultos consumam…’ (oração subordinada substantiva subjetiva). Sujeito indeterminado com ‘se’ só acontece com verbo que não é transitivo direto (‘Precisa-se de dentistas’). A questão G0191, anulada, tratava da mesma frase. Na prova, se a banca repetir exatamente essa afirmativa, lembre do gabarito de G0190; fora disso, use a análise tradicional.” |
| 3 | MÉDIO | L7 crase, pegadinha G0001, e a própria questão impressa | No banco, as 5 alternativas de G0001 trazem “à”: “manter **à** estrutura”, “**à** proposta”, “desejem **à** incorporação”, “incrementar **à** receita”. Isso contradiz o enunciado (“foi retirado o acento… em um dos trechos”). G0002 e G0003 citam o mesmo parágrafo **sem** acento (“a proposta”, “a incorporação”, “a receita”). Provável erro de transcrição. Se o gerador imprimir a questão assim, o aluno verá quatro crases erradas impressas como texto de prova. O texto da lição está certo. | (a) Conferir G0001 no PDF da prova antes de gerar o PDF da apostila. (b) Até lá, tirar G0001 do treino ou trocar a pegadinha por: “G0001 (2019): a resposta foi ‘à época’, locução adverbial feminina. Nos outros trechos (‘manter a estrutura’, ‘a proposta’, ‘desejem a incorporação’, ‘incrementar a receita’) NÃO há crase. ATENÇÃO: a transcrição desta questão no banco mostra ‘à’ em todas as alternativas, o que parece erro de cópia; não decore essas grafias.” |
| 4 | MÉDIO | L12 ortografia, ponto “X ou CH depois de en-” | A regra só cita a família de “cheio”. Falta a exceção que aparece **na própria questão** G0334, alternativa E: **encharcar** (de charco). A regra completa: depois de en- usa-se X, menos quando a palavra deriva de outra que já tem CH (cheio → encher, preencher, enchente; charco → encharcar; chumaço → enchumaçar; chiqueiro → enchiqueirar). Também: enchova. | Trocar a frase das exceções por: “…com exceção das palavras formadas a partir de outra que já tem CH: encher, preencher, enchente e enchimento (de cheio), encharcar (de charco), enchumaçar (de chumaço), enchiqueirar (de chiqueiro); e também enchova. Por isso as alternativas com ‘preencher’, ‘enchente’ e ‘encharcar’ foram erradas.” Mapa: “Exceção: palavra-base com CH (cheio, charco)”. |
| 5 | MÉDIO | L4 coordenação e subordinação, ponto “Objetiva indireta × completiva nominal” | O exemplo “Lembrei de que era tarde” não segue a norma-padrão. Na norma, é “Lembrei-me de que era tarde” (pronominal, com preposição) ou “Lembrei que era tarde” (transitivo direto). O aluno pode decorar uma regência que a banca considera errada. | “…verbo (‘Lembrei-me de que era tarde’; ‘Necessito de que me ajudem’: objetiva indireta) ou nome…” |
| 6 | MÉDIO | L7 crase, ponto “Quando não há preposição, não há crase” (dúvida G0280, item I) | A hipótese do Sonnet está **certa**. Em “A proporção da minha força… é a mesma…”, “a proporção” é o sujeito de “é” (artigo + substantivo). Sujeito não leva preposição, então não há crase. O gabarito A (II e IV) confirma que I estava errado. Falta separar isso da locução “à proporção que”, que **leva** crase e está na tabela da L4. | Substituir o parêntese por: “(motivo: ‘a proporção’ é o sujeito do verbo ‘é’, e sujeito não leva preposição. Não confunda com a locução conjuntiva ‘à proporção que’, que significa ‘à medida que’ e tem crase: ‘À proporção que estudava, aprendia’.)” e retirar o PENDENTE. |
| 7 | BAIXO | L1 classes, ponto “Pronome: os tipos” | “Pessoal (eu, ele, nos)”: “nos” sem acento é o pronome oblíquo. O pronome reto é “nós”. | “Pessoal (eu, ele, nós; oblíquos me, o, lhe, nos)”. |
| 8 | BAIXO | L1 classes, ponto “Advérbio × adjetivo × substantivo” | O teste “trocar por ‘apenas’ ou ‘muito’” engana: “muito” também é pronome indefinido (“muito dinheiro”, “muitas vozes”), e aí varia. | “Teste prático: se dá para trocar por ‘apenas’ ou ‘só’ e a palavra não muda de forma, é advérbio de exclusão. Cuidado: ‘muito’ é advérbio em ‘fala muito’, mas pronome em ‘muitas pessoas’.” |
| 9 | BAIXO | L2 sintaxe, ponto “Vozes verbais” (“Esse tipo de troca de tempo é típica de afirmativa errada”) e pegadinha 3 | A ideia vem da questão G0326, que foi **anulada**. A regra gramatical está certa: na passagem para a ativa mantém-se o tempo. Mas dizer que isso é “típico” da banca se apoia numa questão anulada. | “Ao passar da passiva para a ativa, mantenha o tempo verbal: ‘foi construída’ vira ‘construiu’ (e não ‘tinha construído’).” (tirar a frase “Esse tipo de troca… típica de afirmativa errada”). |
| 10 | BAIXO | L6 semântica, ponto “Sinônimos e antônimos pelo contexto” | “Nunca existe sinônimo absoluto” é afirmação discutível em linguística. Aqui ela é a posição do enunciado de G0276. | “Como diz o próprio enunciado de G0276, os sinônimos ‘nunca são absolutos’: o sentido depende do contexto.” |
| 11 | BAIXO | L6 semântica, ponto “Questão de antônimo” (G0009) | “Agravar” não é antônimo de “incrementar” no dicionário. É só a alternativa que destoa das quatro de sentido próximo. A apostila já diz “resposta oficial”; falta avisar o aluno para não decorar o par. | Acrescentar: “Não decore ‘agravar’ como antônimo de ‘incrementar’: foi a única alternativa que não era sinônimo.” |
| 12 | BAIXO | L1 classes, pegadinha G0333 | “cada lista com uma palavra de outra classe” é impreciso. Só as listas II, III e IV têm intruso; I e V são homogêneas (gabarito D). | “G0333: marcar ‘I, II, III, IV e V’. As listas II, III e IV têm intruso (o artigo ‘as’ entre preposições, ‘afirmativa’ entre advérbios, o artigo ‘os’ entre conjunções); só I e V são homogêneas.” |
| 13 | BAIXO | L16, ponto “Produção de texto…” | O PENDENTE “conferir no edital como a produção de texto é cobrada” pode ser resolvido. Pelo `curso/edital.md`, seção 1.4 (edital p. 9, item 7.1), a prova é só objetiva (40 questões de 5 alternativas). Não há prova de títulos nem redação registrada. | “Como a prova é só objetiva (40 questões de múltipla escolha; edital p. 9, item 7.1, registrado em curso/edital.md), não há redação: a produção de texto pode aparecer apenas em questões sobre gênero, estrutura e linguagem, como G0279.” |
| 14 | BAIXO | L5 acentuação, ponto “O que o Acordo de 1990 tirou” | Está correto, mas incompleto. Falta a regra do Acordo para i e u tônicos depois de ditongo, em paroxítona (feiura, baiuca), que perderam o acento. Útil para hiatos. | Acrescentar: “Também perderam o acento o i e o u tônicos depois de ditongo em paroxítonas: feiura, baiuca.” |
| 15 | BAIXO | L10 regência, ponto “Regência verbal: transitividade” | Correto. Mas o gabarito de G0098 **mudou** depois dos recursos: o preliminar era A (transitiva indireta) e o definitivo é E (intransitiva). A apostila segue o definitivo, o que está certo. | Opcional: “(o gabarito preliminar era ‘transitiva indireta’; depois dos recursos ficou ‘intransitiva’)”. |

## 3. Conferência de gabaritos e exemplos (todos contra o banco)

Bate com o banco tudo o que a apostila afirma como “a banca deu como correto/errado”. São estas questões: G0002, G0003, G0004, G0005, G0006, G0007, G0008, G0009, G0010, G0093, G0094, G0095, G0096, G0097, G0098, G0099, G0100, G0101, G0102, G0185, G0186, G0188, G0190, G0192, G0193, G0194, G0273, G0274, G0275, G0276, G0277, G0279, G0280, G0281, G0282, G0330, G0331, G0332, G0333 e G0334. As exceções são as dos achados 1, 2, 3 e 12.
- G0274 (V-V-F): a apostila diz que a segunda “conta” é sujeito de “fecha”. A questão só afirma que é falso que as duas são sujeito. A frase da apostila é análise gramatical correta e não contraria o gabarito.
- G0332 (C = II e III): a explicação “indica tempo, e não lugar” é do autor, mas é a análise consensual.

## 4. Questões anuladas

Nenhuma resposta de questão anulada é ensinada como gabarito. Todas são citadas como “não use como gabarito”. Três observações:
- Os pontos de “ser/ir com formas iguais” (L1) e de hiato (L5) coincidem com itens das anuladas G0328 e G0325. O conteúdo é gramática correta, então não há problema.
- A afirmação de “padrão da banca” que se apoia na anulada G0326 está no achado 9.

## 5. Estrutura

- Título “Língua Portuguesa”, sem “Apostila 01”: OK.
- `arquivoPdf` = `apostila-01-lingua-portuguesa.pdf`: OK.
- Nenhuma menção a FUNDATEC, FAURGS, Brigada ou HCPA.
- Comparei, frase por frase, com `_modelo-portugues.json`. Só coincide uma frase genérica de regra: “Sem preposição ou sem artigo, não há crase.” Não é cópia de exemplo, pegadinha ou contagem. OK.

## 6. O que confirmei em fonte pública (2026-11-19)

- **Exceções de X/CH depois de en-** (encharcar, enchumaçar, enchiqueirar, enchova, preencher; regra da palavra-base com CH). Confirmei em [Toda Matéria, “Palavras com x e ch”](https://www.todamateria.com.br/palavras-com-x-e-ch/) e em [Dicio, “encharcar ou enxarcar”](https://www.dicio.com.br/encharcar-ou-enxarcar/). São fontes didáticas, não o VOLP.
- **Partícula apassivadora não indetermina o sujeito; oração com “-se” passivo + “que” é subjetiva.** Achei a regra geral em material didático, como [InfoEscola, orações subordinadas substantivas](https://www.infoescola.com/portugues/oracoes-subordinadas-substantivas) e [Prepara Enem, sujeito](https://www.preparaenem.com/portugues/sujeito.htm). **Não achei** fonte que analise exatamente “recomenda-se que”. A aplicação a essa frase é análise minha e deve ser conferida na gramática de referência (PENDENTE G5).

## 7. O que NÃO confirmei

- A transcrição de G0001 e de todos os textos-base, por falta do PDF das provas.
- A regência “lembrar de” sem pronome: usei a regra normativa conhecida, sem consulta a gramática nesta sessão.
- A regra do Acordo para “feiura/baiuca” (achado 14) e as demais regras de acentuação: estão de acordo com o Acordo Ortográfico de 1990, mas não reabri o texto do Acordo nesta sessão.
- Não rodei o gerador. Não sei como ele imprime G0001 nem as alternativas.
