# Proposta: Apostila 09 (Raciocínio Lógico e Matemático), Navegantes 0172/2026

Proposta de 24/11/2026. **Nada daqui foi aplicado.** O JSON `curso/apostila/raciocinio-logico-navegantes.json` não foi tocado. Só entra na apostila depois do "aprovado" do dono.

**Método e limites**
- Programa oficial: `fontes/navegantes-2026-ps-0172/edital-0172-2026.pdf`, Anexo V, p. 58 (extraí a p. 58 com pdftotext; o acento saiu truncado, o texto é legível). RLM vale 5 questões x 0,20 = 1,00 ponto.
- Radar: `curso/questoes-anteriores.json`, só `alvo: false` (Florianópolis 2024, Biguaçu 2025, Itapema 2025). **Amostra pequena: 20 enunciados distintos de matemática no total** (10 + 5 + 5). Isso é um indício do gosto da FURB, não uma estatística. Não há nenhuma questão de Navegantes.
- Toda conta (as 18 questões e todos os exemplos abaixo) foi refeita por script no scratchpad (`v.mjs`); todas bateram. O gabarito do banco bateu com a minha conta em todas as 18 questões usáveis. Não reabri os gabaritos oficiais em PDF; a conferência foi por cálculo.
- Exemplos marcados **(didático)** foram criados por mim para ensinar o método; não são questões de prova. Exemplos marcados com um código `G0xxx` são questões reais do banco.

---

## 0. Duplicatas e figuras no banco (conferido)

Comparei enunciado e alternativas (ignorando a ordem das alternativas e o rodapé "NOÇÕES DE INFORMÁTICA" que ficou colado em algumas transcrições):

| Grupo | É igual a | Veredito |
|---|---|---|
| G0515 | G0469 (café com leite) | **Duplicata exata** (mesmo enunciado, mesmas alternativas, mesma resposta "2") |
| G0566 e G0583 | G0466 (geladeira, parcelas) | **Duplicatas** (mesmo enunciado; só muda a ordem das alternativas; todas as respostas = R$ 365,00) |
| G0516 e G0549 | G0467 (gráfico de carros) | **Duplicatas**, e as três dependem de figura (gráfico) |

Consequência: Biguaçu 2025 tem **5 enunciados distintos** (G0465 a G0469) repetidos em 6 cadernos. Itapema 2025 tem 5 (G0610 a G0614) em 7 cadernos. Florianópolis 2024 tem 10 de matemática (G0400 a G0409). Total: 20.

Dependem de figura (ficam fora do treino): G0406 (quadro de pacientes) e G0467/G0516/G0549 (gráfico de carros). Sobram **18 questões usáveis**. Nenhuma está marcada `transcricaoSuspeita`. As questões de informática G0410 a G0414 e G0470 a G0474 não entram (fora do programa de Navegantes).

Observação: "no banco" abaixo conta **enunciados distintos**, não cadernos.

---

## 1. Tabela: item do programa x questões no banco x decisão

| Item do programa (p. 58) | Questões FURB no banco (distintas, usáveis) | Estado na Apostila 09 | Decisão |
|---|---|---|---|
| Inteiros e racionais, decimal e fração, operações, potenciação | 2 (G0404, G0466) | L1 | Coberto (manter; ver correção 3.4) |
| Razões e proporções; regra de três simples | 3 (G0400, G0408, G0611) | L2 | Coberto (corrigir "Grandezas inversas", 3.2) |
| **Divisão em partes proporcionais** | 1 (G0465, partilha por fração) | não existe | **INCLUIR** |
| **Regra de três composta** | 1 (G0407) | não existe | **INCLUIR** |
| Porcentagem | 5 (G0401, G0403, G0405, G0468, G0613) | L3 | Coberto (é o tema que mais caiu) |
| **Operações com conjuntos** | 2 (G0469, G0612) | não existe | **INCLUIR** |
| **Princípios de contagem; análise combinatória básica** | 2 (G0402, G0614) | não existe | **INCLUIR** |
| **Probabilidade** | 0 | não existe | **INCLUIR, curto** (mesmo item do programa da contagem, fórmula barata) |
| **Média aritmética simples e ponderada** | 2 usáveis (G0409, G0610) + 2 que dependem de figura (G0406, G0467) | não existe | **INCLUIR** |
| Interpretação de gráficos e tabelas | 0 usáveis (as 2 questões, G0406 e G0467, dependem de figura e pedem média/soma) | L7 | Coberto (corrigir erros, 3.1; ligar à lição de Média) |
| **Sistema métrico: tempo, comprimento, área, volume** | 0 direto; 1 usa conversão de tempo (G0407: 11,33 h = 11 h 20 min) | não existe | **INCLUIR, curto** (decisão do dono, pergunta 3) |
| **Problemas geométricos** | 0 | não existe | **INCLUIR, mínimo** (perímetro, área, volume, Pitágoras; decisão do dono, pergunta 2) |
| Proposições, equivalências, negações, quantificadores | 0 | L4, L5 | Coberto; **não expandir** (0 de 20 caiu) |
| Sequências e padrões lógicos | 0 | L6 | Coberto; **não expandir** (0 de 20) |
| Relações e inferências (argumentos, silogismos, diagramas) | 0 | não existe (o `ranking` cita "Argumentos e diagramas" sem lição) | **FORA** deste pacote (ver lista FORA e pergunta 4) |
| Situações-problema | 18 (todas) | não existe | **INCLUIR** como lição de treino com as 18 questões (depende da aprovação da pergunta 1) |

**Radar por assunto (18 usáveis, amostra pequena):** porcentagem 5; razão/proporção/regra de três 4 (3 + a composta); aritmética/frações 2; conjuntos 2; contagem 2; média 2; partilha 1. Mais 2 que dependem de figura, ambas de média/soma em quadro ou gráfico. **Lógica proposicional, sequências, geometria, probabilidade e sistema métrico: 0 em 20.** O `ranking` atual da Apostila 09 coloca lógica e sequências como pontos centrais; o radar diz o contrário (ver 3.4).

### Lista FORA (nunca caiu nos 20 enunciados e julgo improvável para 5 questões)

| Tópico | Motivo |
|---|---|
| Probabilidade condicional, Bayes, distribuições | Não aparece no programa ("princípios de contagem e probabilidade") e exige mais nível que as questões vistas |
| Combinação com restrições, permutação circular, binômio de Newton | "Análise combinatória **básica**" no programa; a FURB usou só princípio multiplicativo e anagrama |
| Geometria: trigonometria, semelhança, geometria analítica, cone, esfera, poliedros | Nunca caiu; "problemas geométricos" no programa fica coberto pelo mínimo da lição 13 |
| Estatística: mediana, moda, desvio padrão | Programa cita só média simples e ponderada |
| Juros simples e compostos, equações do 2º grau, funções | Não estão no programa |
| Argumentos válidos, silogismos, diagramas lógicos (relações e inferências) | 0 questões; a L5 já traz quantificadores. Só entra se o dono decidir (pergunta 4) |
| Massa (g, kg), capacidade fora de "volume" | Programa cita tempo, comprimento, área e volume |

---

## 2. Lições propostas (itens INCLUIR)

Formato: cada lição segue o molde do JSON (intro, pontos `ref`/`texto`, tabela, macete, pegadinhas, cobra). Aqui aparece em texto corrido para ser lido e aprovado. Ordem sugerida na apostila: depois da L3 (porcentagem) e antes da lógica, porque o radar pesa mais nelas. A decidir com o dono (pergunta 5).

### Lição 8 (nova): Divisão em partes proporcionais

**ANTES:** não existe. A L2 trata razão e regra de três, mas não a partilha de um total.

**DEPOIS (proposto):**

*Intro:* Dividir um total em partes proporcionais é repartir um valor segundo números de referência (investimento, horas, idade). A parte maior vai para quem tem o número maior; as partes somam o total.

*Pontos:*
- **Diretamente proporcionais.** Para dividir o total T em partes proporcionais a a, b, c: some os números (S = a + b + c), calcule a constante k = T / S e multiplique: partes = k·a, k·b, k·c. As partes somam T.
- **Inversamente proporcionais.** Dividir em partes inversamente proporcionais a a e b equivale a dividir em partes diretamente proporcionais a 1/a e 1/b. Quem tem o número maior recebe menos. Verificação: o produto (parte x número) é igual para todos.
- **Partilha por fração.** Se um recebe uma fração do total e o outro "o restante", o restante é 1 menos a fração. Dois quintos para um, três quintos para o outro, equivalente à razão 2 : 3.
- **Conferir sempre.** A soma das partes tem de dar o total.

*Exemplos resolvidos:*
1. **(didático)** Dividir R$ 1.200,00 em partes diretamente proporcionais a 2 e 3. S = 2 + 3 = 5; k = 1.200 / 5 = 240. Partes: 240 x 2 = 480 e 240 x 3 = 720. Conferência: 480 + 720 = 1.200.
2. **G0465 (Biguaçu 2025):** prêmio de R$ 20.000,00; Breno recebe dois quintos e Ricardo o restante. Ricardo: 1 - 2/5 = 3/5. 3/5 de 20.000 = 20.000 / 5 x 3 = 4.000 x 3 = **R$ 12.000,00** (alternativa A, gabarito do banco). Conferência: Breno 4.000 x 2 = 8.000; 8.000 + 12.000 = 20.000.
3. **(didático)** Dividir R$ 780,00 em partes inversamente proporcionais a 2 e 3. Números inversos: 1/2 e 1/3 = 3/6 e 2/6, razão 3 : 2. S = 5; k = 780 / 5 = 156. Partes: 156 x 3 = 468 e 156 x 2 = 312. Conferência: 468 + 312 = 780; produtos 468 x 2 = 936 e 312 x 3 = 936 (iguais, como deve ser).

*Macete:* "Some as razões, ache o valor de uma parte, multiplique." Confirme com a soma.

*Pegadinhas:* dividir o total por 2 em vez da soma das razões; fazer "inversamente" com a razão direta; esquecer que "o restante" é 1 menos a fração do outro.

*Questões do banco ligadas:* G0465 (também G0611, que usa a relação 1 : 1 : 3 entre máquinas, ver L9 / treino).

### Lição 9 (nova): Regra de três composta

**ANTES:** não existe. A L2 só trata a regra de três simples e, mesmo ali, o ponto "Grandezas inversas" está confuso (ver 3.2).

**DEPOIS (proposto):**

*Intro:* A regra de três composta envolve três ou mais grandezas. Em cada uma, compare apenas com a grandeza da incógnita, sem olhar as outras, e decida se é direta ou inversa.

*Pontos:*
- **Direta:** dobrando uma, a outra dobra (mais máquinas, mais peças). **Inversa:** dobrando uma, a outra cai pela metade (mais operários, menos dias).
- **Método do produto:** valor da incógnita = valor conhecido x (razão de cada grandeza), em que a razão fica "novo / antigo" para as diretas e "antigo / novo" para as inversas.
- **Método do trabalho total:** em obras, calcule o "total de trabalho" = operários x dias x horas por dia. Esse total não muda; use-o para achar o que falta.
- **Mesmas unidades** em todas as grandezas (horas com horas, dias com dias).

*Exemplos resolvidos:*
1. **(didático)** 5 máquinas produzem 600 peças em 6 dias. Quantas peças 8 máquinas produzem em 9 dias? Peças são diretas com máquinas e com dias. 600 x (8/5) x (9/6) = 600 x 1,6 x 1,5 = **1.440 peças**.
2. **(didático)** 6 pedreiros levantam um muro em 10 dias, trabalhando 8 h por dia. Em quantos dias 4 pedreiros, trabalhando 6 h por dia, fazem o mesmo muro? Dias são inversos a pedreiros e inversos a horas por dia. 10 x (6/4) x (8/6) = 10 x 1,5 x 1,333... = **20 dias**. Conferência pelo trabalho total: 6 x 10 x 8 = 480 homens-hora; 4 x 6 = 24 homens-hora por dia; 480 / 24 = 20.
3. **G0407 (Florianópolis 2024):** obra prevista em 10 dias, 6 homens, 8 h/dia. Fechados 4 dias, só 32% estavam prontos. Para terminar no prazo, em quanto aumentar a jornada diária? Passo a passo: em 4 dias x 8 h = 32 h, os 6 homens fizeram 32%, ou seja, **1% por hora de trabalho do grupo**. Faltam 68%, logo 68 horas de trabalho do grupo. Restam 6 dias (10 - 4): 68 / 6 = 11,333... h por dia. 0,333... h x 60 = 20 min, então 11 h 20 min por dia. Aumento: 11 h 20 min - 8 h = **3 h 20 min** (alternativa A, gabarito do banco).

*Macete:* "Isole a incógnita, compare uma grandeza de cada vez e confira pelo total de trabalho."

*Pegadinhas:* tratar como direta uma grandeza inversa; esquecer que o enunciado dá o ritmo observado e não o previsto (G0407); converter 0,333 h em 33 min (o certo é 20 min); calcular a jornada total quando a pergunta pede o aumento.

*Questões do banco ligadas:* G0407. Também G0408 (proporção direta entre investimento e vendas, tratada na L2).

### Lição 10 (nova): Conjuntos

**ANTES:** não existe.

**DEPOIS (proposto):**

*Intro:* Conjuntos aparecem como "pesquisa com pessoas": quem gosta de A, quem gosta de B, quem gosta dos dois e quem não gosta de nenhum.

*Pontos:*
- **Notação:** união A ∪ B (está em A ou em B, ou nos dois); interseção A ∩ B (está em A e em B); n(A) é o número de elementos de A.
- **Dois conjuntos:** n(A ∪ B) = n(A) + n(B) - n(A ∩ B). A interseção é subtraída porque foi contada duas vezes.
- **Só de um conjunto:** "apenas A" = n(A) - n(A ∩ B).
- **Fora dos dois:** nenhum = total - n(A ∪ B).
- **Três conjuntos:** n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A ∩ B) - n(A ∩ C) - n(B ∩ C) + n(A ∩ B ∩ C).
- **Método do diagrama:** comece pelo centro (a interseção) e vá para fora, subtraindo.

*Exemplos resolvidos:*
1. **G0469 (Biguaçu 2025):** 28 funcionários; 16 gostam de café sem leite, 14 de café com leite, 4 gostam de ambos. n(união) = 16 + 14 - 4 = 26. Nenhum dos dois: 28 - 26 = **2** (alternativa B, gabarito do banco).
2. **G0612 (Itapema 2025):** 40 estudantes; 18 futebol, 22 vôlei; 4 não praticam nenhum esporte; 8 praticam apenas outros esportes (nem futebol nem vôlei). Quem pratica futebol ou vôlei: 40 - 4 - 8 = 28. Então 18 + 22 - x = 28, logo x = 12. **12 estudantes** (alternativa C). Conferência: só futebol 18 - 12 = 6; só vôlei 22 - 12 = 10; ambos 12; 6 + 10 + 12 = 28; 28 + 4 + 8 = 40.
3. **(didático)** Em um grupo de 100 pessoas: 40 em A, 30 em B, 20 em C; 10 em A e B, 8 em A e C, 5 em B e C; 3 nos três. n(união) = 40 + 30 + 20 - 10 - 8 - 5 + 3 = **70**. Quem está em nenhum: 100 - 70 = 30.

*Macete:* leia o enunciado procurando a palavra "ambos" ou "e também": é o centro do diagrama.

*Pegadinhas:* tratar "16 gostam de A" como "só A" (16 inclui os que gostam dos dois); esquecer o grupo "nenhum"; em G0612, confundir "não praticam nenhum esporte" (4) com "apenas outros esportes" (8): os dois ficam fora de futebol e vôlei.

### Lição 11 (nova): Contagem, análise combinatória básica e probabilidade

**ANTES:** não existe.

**DEPOIS (proposto):**

*Intro:* Contar sem listar. Primeiro decida se a ordem importa e se pode repetir.

*Pontos:*
- **Princípio multiplicativo:** se uma escolha tem m modos e a seguinte tem n modos, juntas têm m x n modos.
- **Com repetição:** n opções em cada uma de p posições dão n elevado a p.
- **Sem repetição (arranjo, ordem importa):** A(n, p) = n x (n-1) x ... (p fatores) = n! / (n-p)!.
- **Permutação:** n objetos distintos em fila: n!. Com elementos repetidos (a vezes um, b vezes outro): n! / (a! x b! ...).
- **Combinação (ordem não importa):** C(n, p) = n! / (p! x (n-p)!).
- **Probabilidade:** P = casos favoráveis / casos possíveis (quando todos são igualmente possíveis); fica entre 0 e 1. Complementar: P(não A) = 1 - P(A). Eventos independentes: P(A e B) = P(A) x P(B). União: P(A ou B) = P(A) + P(B) - P(A e B).

*Exemplos resolvidos:*
1. **G0614 (Itapema 2025):** senha de 4 algarismos, podendo repetir, usando 1, 2, 3, 4 e 5. 5 x 5 x 5 x 5 = 5⁴ = **625** (alternativa E). Atenção: sem repetição seriam 5 x 4 x 3 x 2 = 120, que é justamente uma das alternativas (A).
2. **G0402 (Florianópolis 2024):** anagramas de AMANDA (6 letras, a letra A três vezes). 6! / 3! = 720 / 6 = 120. Excluindo a própria palavra "amanda": 120 - 1 = **119** (alternativa D).
3. **(didático)** Anagramas de MAMA: 4! / (2! x 2!) = 24 / 4 = 6. Lista para conferir: MMAA, MAMA, MAAM, AMMA, AMAM, AAMM.
4. **(didático)** Escolher 2 pessoas de 5 para uma comissão (ordem não importa): C(5, 2) = 5! / (2! x 3!) = 10. Se fossem presidente e vice (ordem importa): A(5, 2) = 5 x 4 = 20 = 2 x 10.
5. **(didático)** Dois dados: probabilidade de a soma ser 7. Casos possíveis: 6 x 6 = 36. Favoráveis: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6. P = 6/36 = **1/6**.
6. **(didático)** Probabilidade de acertar, numa única tentativa, a senha do exemplo 1: 1/625 = 0,0016 = 0,16%.
7. **(didático)** Pelo menos uma cara em 2 lançamentos de moeda: 1 - P(nenhuma cara) = 1 - 1/4 = **3/4**.

*Macete:* pergunte "importa a ordem?" e "pode repetir?" antes de escolher a fórmula. Se a questão diz "diferentes" com elementos iguais, pense em anagrama.

*Pegadinhas:* esquecer de excluir o caso pedido (G0402); usar fatorial total quando há letras repetidas; confundir arranjo (ordem importa) com combinação; somar em vez de multiplicar etapas; calcular "pelo menos um" somando casos, em vez de usar o complementar.

*Questões do banco ligadas:* G0402 e G0614. Probabilidade: nenhuma questão no banco (por isso fica no fim da lição, curta).

### Lição 12 (nova): Média aritmética simples e ponderada

**ANTES:** não existe. A L7 fala em totais e comparação em tabelas, mas não em média.

**DEPOIS (proposto):**

*Intro:* Média é um valor "que representa" o conjunto. Duas questões de Florianópolis e Biguaçu pedem média a partir de quadro ou gráfico (ambas dependem de figura e ficam fora do treino).

*Pontos:*
- **Média simples:** soma dos valores dividida pela quantidade de valores.
- **Soma a partir da média:** soma = média x quantidade. É a chave para achar valor faltante.
- **Média ponderada:** soma dos (valor x peso) dividida pela soma dos pesos. Quando os grupos têm tamanhos diferentes, o tamanho é o peso.
- **Não faça "média das médias"** quando os grupos têm quantidades diferentes.
- **Contagem de pessoas:** "irmãos de Carlos" não inclui Carlos; "todos os irmãos, incluindo Carlos" inclui.

*Exemplos resolvidos:*
1. **G0409 (Florianópolis 2024):** clínica pediátrica, média 30 min, 15 pacientes; clínica de plantão, média 22 min, 25 pacientes. Média geral = (15 x 30 + 25 x 22) / (15 + 25) = (450 + 550) / 40 = 1.000 / 40 = **25 min** (alternativa C). A "média das médias" (30 + 22) / 2 = 26 está errada, e 26 é justamente uma alternativa (E).
2. **G0610 (Itapema 2025):** Carlos tem 5 irmãos; a soma das idades dos irmãos é 90; a média de todos, incluindo Carlos, é 19. São 6 pessoas: soma total = 19 x 6 = 114. Idade de Carlos = 114 - 90 = **24 anos** (alternativa D).
3. **(didático)** Notas 6,0 (peso 2) e 9,0 (peso 3). Média = (6 x 2 + 9 x 3) / (2 + 3) = (12 + 27) / 5 = 39 / 5 = **7,8**.
4. **(didático)** Média 7 exigida em 4 provas; já há 6, 8 e 5. Soma necessária = 7 x 4 = 28; já somam 19; falta **9**.
5. **(didático)** Quadro com os valores 48, 52, 46, 50 e 54: soma 250, média 250 / 5 = 50.

*Macete:* "média x quantidade = soma". Ao incluir ou excluir alguém, refaça a soma.

*Pegadinhas:* a média das médias; contar 5 em vez de 6 pessoas (G0610); usar o valor errado como divisor; esquecer o peso.

### Lição 13 (nova): Sistema métrico e geometria básica

**ANTES:** não existe. O único ponto próximo é a pegadinha da L1 "Trocar 0,8 hora por 80 minutos" (o certo é 0,8 x 60 = 48 min).

**DEPOIS (proposto):**

*Intro:* Em toda conta, converta tudo para a mesma unidade antes. Depois aplique a fórmula da figura.

*Tabela de conversões:*

| Grandeza | Relação |
|---|---|
| Tempo | 1 h = 60 min; 1 min = 60 s; 1 h = 3.600 s; 1 dia = 24 h |
| Comprimento | 1 km = 1.000 m; 1 m = 100 cm; 1 cm = 10 mm |
| Área (cada degrau multiplica por 100) | 1 m² = 10.000 cm²; 1 km² = 1.000.000 m²; 1 hectare = 10.000 m² |
| Volume (cada degrau multiplica por 1.000) | 1 m³ = 1.000 L; 1 L = 1.000 mL; 1 mL = 1 cm³ |

*Pontos de geometria (mínimo):*
- **Perímetro:** soma dos lados. **Retângulo:** área = base x altura; perímetro = 2 x (base + altura). **Quadrado:** área = lado x lado.
- **Triângulo:** área = base x altura / 2; a soma dos ângulos internos é 180°.
- **Círculo:** área = π x r²; comprimento = 2 x π x r. Use o valor de π que a questão fornecer.
- **Bloco retangular (caixa):** volume = comprimento x largura x altura.
- **Teorema de Pitágoras** (triângulo retângulo): hipotenusa² = cateto² + cateto².

*Exemplos resolvidos (todos didáticos):*
1. 3,5 km = 3,5 x 1.000 = 3.500 m. 2,4 m² = 2,4 x 10.000 = 24.000 cm². 0,75 m³ = 0,75 x 1.000 = 750 L.
2. 2 h 45 min = 2 x 60 + 45 = 165 min. 1,25 h = 1 h + 0,25 x 60 min = 1 h 15 min. 5.400 s / 3.600 = 1,5 h = 1 h 30 min.
3. Retângulo de 8 m por 5 m: área = 8 x 5 = 40 m²; perímetro = 2 x (8 + 5) = 26 m.
4. Sala de 6 m por 4 m, piso de cerâmica quadrada de 0,5 m de lado: área da sala = 24 m²; área de cada peça = 0,25 m²; 24 / 0,25 = 96 peças.
5. Triângulo de base 10 e altura 6: 10 x 6 / 2 = 30. Círculo de raio 3 com π = 3,14: 3,14 x 9 = 28,26.
6. Caixa de 2 m x 1,5 m x 1 m: volume = 3 m³ = 3.000 L.
7. Catetos 6 e 8: hipotenusa² = 36 + 64 = 100, logo hipotenusa = 10.

*Macete:* o fator da área é o fator do comprimento ao quadrado (100 = 10²); o do volume é ao cubo (1.000 = 10³).

*Pegadinhas:* trocar 0,8 h por 80 min; converter área com fator 10 em vez de 100; misturar m e cm na mesma conta; esquecer a divisão por 2 no triângulo.

*Questões do banco ligadas:* nenhuma direta (G0407 usa a conversão 0,333 h = 20 min, ver L9).

### Lição 14 (nova): Situações-problema: treino com questões reais da FURB

**ANTES:** não existe. A apostila tem 0 questões reais (`qtdQuestoes` 0 nas 7 lições).

**DEPOIS (proposto):** lição de treino que usa as **18 questões usáveis** de outros municípios da FURB (marcadas "banca FURB, outro município, não é Navegantes"; veja a pergunta 1 do dono). Mapa questão x lição, com a conta já conferida:

| Grupo | Origem | Lição | Resposta e conta |
|---|---|---|---|
| G0400 | Florianópolis 2024 | L2 (razão) | C. 102 homens, 51 mulheres; 2/3 de 102 = 68 e 1/3 de 51 = 17; 85 / 153 = 5/9 |
| G0401 | Florianópolis 2024 | L3 (%) | E. Orçamento mensal 22.800.000 / 12 = 1.900.000; nível I: 40 x 23.400 = 936.000; sobra 964.000 / 32 = 30.125; 30.125 / 25.000 = 1,205, ou seja, 20,5% |
| G0402 | Florianópolis 2024 | L11 | D. 6! / 3! - 1 = 119 |
| G0403 | Florianópolis 2024 | L3 (%) | A. Preço de tabela = 2.017,40 / 0,77 = 2.620,00; diferença = 602,60 |
| G0404 | Florianópolis 2024 | L1 (frações) | B. Custo atual por mg = 5/8 x 40 + 1/4 x 60 = 25 + 15 = 40. Com A a 46: 5/8 x 46 = 28,75; B deve custar 11,25 por mg de mistura, logo B = 45 por mg; desconto = 60 - 45 = 15,00 |
| G0405 | Florianópolis 2024 | L3 (%) | A. Gasolina: 5,76 / 18 = 0,32 por km. Álcool precisa de 4,00 reduzido a 3,20 (3,20 / 10 = 0,32): redução de 0,80 / 4,00 = 20% (o enunciado fala "acima de" 20; a alternativa do gabarito é 20) |
| G0407 | Florianópolis 2024 | L9 | A. Ver exemplo 3 da L9: 3 h 20 min |
| G0408 | Florianópolis 2024 | L2 (proporção) | E. 2% de 12.000 = 240 vendas por R$ 3.000, ou seja, R$ 12,50 por venda; 1.920 x 12,50 = 24.000 |
| G0409 | Florianópolis 2024 | L12 | C. 25 min |
| G0465 | Biguaçu 2025 | L8 | A. R$ 12.000,00 |
| G0466 | Biguaçu 2025 | L1 | A. (3.200 - 280) / 8 = 2.920 / 8 = 365,00 |
| G0468 | Biguaçu 2025 | L3 (%) | D. Pagou 100 - 55 = 45, que é 75% do preço; preço = 45 / 0,75 = 60; troco sem promoção = 100 - 60 = 40 = 2 notas de 20 |
| G0469 | Biguaçu 2025 | L10 | B. 2 |
| G0610 | Itapema 2025 | L12 | D. 24 anos |
| G0611 | Itapema 2025 | L2 (proporção) | B. Máquinas iguais produzem x cada; a terceira produz 50% a mais que as duas juntas = 1,5 x 2x = 3x. Total 5x = 300, x = 60; a maior produz 180 por dia; 1.080 / 180 = 6 dias |
| G0612 | Itapema 2025 | L10 | C. 12 |
| G0613 | Itapema 2025 | L3 (%) | C. 580 x 0,40 = 232; 232 x 0,25 = 58 |
| G0614 | Itapema 2025 | L11 | E. 5⁴ = 625 |

Fora do treino: G0406, G0467 (figura); G0515, G0516, G0549, G0566, G0583 (duplicatas, ver seção 0); G0410 a G0414 e G0470 a G0474 (informática).

---

## 3. Correções de erro na Apostila 09 (antes/depois)

### 3.1 Lição 7 (`tabelas-graficos`), ponto "Somatório": "Conferira" e "subtototal"

**ANTES:** `"Conferira se a pergunta pede um total, subtototal ou uma categoria isolada."`

**DEPOIS:** `"Confira se a pergunta pede um total, um subtotal ou uma categoria isolada."`

Erros: "Conferira" (forma verbal errada; imperativo é "Confira") e "subtototal" (o certo é "subtotal"). Troquei também "ou uma" por "um subtotal ou uma" só para o texto fluir; se preferir manter o mínimo, basta corrigir as duas palavras.

### 3.2 Lição 2 (`razao-proporcao`), ponto "Grandezas inversas" (confuso)

**ANTES:** `"Quando uma grandeza aumenta e a outra diminui proporcionalmente, multiplicação de termos correspondentes pode indicar a relação inversa."`

Problema: não diz o que é "proporcionalmente", a frase "pode indicar" não dá regra nenhuma, e não ensina como montar a conta.

**DEPOIS:** `"Duas grandezas são inversamente proporcionais quando, ao multiplicar uma por um número, a outra fica dividida por esse mesmo número: o produto entre elas é constante. Na regra de três, inverte-se uma das razões. Exemplo: 6 torneiras iguais enchem um tanque em 10 horas; 15 torneiras gastam t horas, com 6 x 10 = 15 x t, logo t = 60 / 15 = 4 horas."`

Conta conferida: 6 x 10 = 60; 60 / 15 = 4.

Correções vizinhas, do mesmo problema (opcionais, mostrar junto):

- **Ponto "Grandezas diretas"** — ANTES: `"Quando uma grandeza aumenta e a outra aumenta na mesma proporção, multiplique em linha."` ("multiplique em linha" não significa nada.) DEPOIS: `"Duas grandezas são diretamente proporcionais quando, ao multiplicar uma por um número, a outra fica multiplicada pelo mesmo número: a razão entre elas é constante. Monte a proporção com as razões na mesma ordem. Exemplo: 3 kg custam R$ 12,00; 5 kg custam x, com 3/12 = 5/x, logo x = 20."` Conta: 12 / 3 = 4 por kg; 5 x 4 = 20; confere com 3 x 20 = 12 x 5 = 60.
- **Tabela "Exemplos", terceira linha** — ANTES: `["4 operários em 6 horas", "Regra direta/inversa conforme o problema", "Conferir unidades"]` (sem resultado). DEPOIS: `["4 operários fazem a obra em 6 h; 8 operários (inversa)", "4 x 6 = 8 x t", "3 horas"]`. Conta: 24 / 8 = 3.
- **Pegadinha 1** — ANTES: `"Usar a mesma unidade em grandezas diferentes"` (descreve o contrário do erro). DEPOIS: `"Misturar unidades diferentes (horas com minutos) na mesma conta"`.

### 3.3 Outros erros que encontrei ao ler o JSON (não pedidos; mostro para aprovar)

| Onde | ANTES | DEPOIS | Motivo |
|---|---|---|---|
| L1, "Ordem das operações" | `"...resolva potência e raiz, depois multiplicação e divisão ... e por último adição e subtração."` | `"Resolva primeiro o que está entre parênteses, colchetes e chaves, de dentro para fora. Depois potência e raiz, depois multiplicação e divisão na ordem em que aparecem, e por último adição e subtração."` | Faltam os parênteses, a primeira etapa da ordem |
| L6, tabela "Como testar", linha "Posição" | `"Impares: 1, 3, 5"` | `"Ímpares: 1, 3, 5"` | Falta o acento |

### 3.4 Textos que o radar contradiz (opcionais, decisão do dono, pergunta 6)

- **`limiteFonte`** — ANTES: `"...Não há questões reais de Raciocínio Lógico ainda disponíveis para este certame neste banco."` Continua verdadeiro para Navegantes. Se o dono aprovar o treino (pergunta 1), acrescentar: `"O treino usa 18 questões reais da banca FURB de outros municípios (Florianópolis 2024, Biguaçu 2025, Itapema 2025), que não são do certame de Navegantes. A amostra é pequena (20 enunciados) e mostra a tendência da banca, não uma garantia."`
- **`comoUsar`, 3º item** — ANTES: `"Resolva sempre primeiro lógica proposicional, porcentagem, proporção e aritmética básica, que são os núcleos explícitos do programa."` O radar não confirma lógica proposicional (0 de 20). DEPOIS sugerido: `"Comece por porcentagem, proporção e aritmética básica: foram o que mais caiu nas provas da FURB de outros municípios (amostra pequena). Depois conjuntos, contagem e média."`
- **`comoUsar`, 4º item** — ANTES: `"Use as questões oficiais da FURB quando forem divulgadas; este material não substitui as questões reais do certame."` Manter, e acrescentar a frase do treino.
- **`ranking`** — hoje lista "Lógica proposicional" (nível 2), "Equivalências..." (2), "Argumentos e diagramas" (2, sem lição), "Associação lógica e orientação" (1, sem lição), "Sequências" (1), "Tabelas" (1). Proposta pelo radar: "Porcentagem e fatores" 3; "Razão, proporção e regra de três (simples e composta)" 3; "Aritmética básica" 2; "Conjuntos" 2; "Contagem e probabilidade" 2; "Média" 2; "Divisão proporcional" 1; "Lógica e equivalências" 1; "Sequências" 1; "Tabelas e gráficos" 1; "Sistema métrico e geometria" 1. Remover "Argumentos e diagramas" e "Associação lógica e orientação", que não têm lição (inconsistência atual). Os níveis seguem a escala do JSON (1 a 3) e são julgamento meu sobre amostra pequena.

---

## 4. PENDENTES e o que o dono precisa decidir

**PENDENTES (eu não pude confirmar):**
1. **Gabaritos oficiais de Biguaçu e Itapema:** confirmei os gabaritos do banco por cálculo próprio (todas as 18 batem), mas não reabri os PDFs oficiais nem os gabaritos finais pós-recurso. Se algum item foi anulado, não sei; recomendo o Opus de conferência (lote B2) olhar os PDFs.
2. **Exemplos didáticos:** os exemplos marcados "(didático)" são criação minha (conferidos por script, não vêm de prova). Se a regra do dono for "só exemplo vindo de fonte", eles precisam sair ou ser trocados por exemplos de livro-texto com fonte.
3. **Fonte das fórmulas:** as fórmulas (união de conjuntos, arranjo, permutação com repetição, combinação, média ponderada, áreas, volume, Pitágoras, tabela de unidades) são matemática padrão. Não citei livro-texto nem norma. O sistema de unidades (múltiplos de 10, 100 e 1.000; hectare = 10.000 m²; 1 L = 1 dm³) também é convenção padrão; se o dono quiser fonte oficial (INMETRO/SI), é uma pendência.
4. **Nível de dificuldade para a prova:** não há questão real de Navegantes; o nível das lições vem de 3 provas de outros municípios.
5. **G0405:** o enunciado diz "redução de, pelo menos, um percentual acima de" e o gabarito é "20". Pelo cálculo, 20% iguala o custo (0,32 por km) e acima de 20% o álcool compensa; o texto da questão é ambíguo entre "a partir de" e "acima de". Não resolvi: no treino usei só a conta (20%) e anotei a ambiguidade.

**Decisões do dono (numeradas):**
1. **Aprovar usar as 18 questões `alvo: false` (FURB, outros municípios) como treino na Apostila 09?** (Já era a pergunta 5 do relatório de cobertura.) Sem isso, a lição 14 não entra e os exemplos G0xxx das outras lições viram exemplos "didáticos" sem origem.
2. **Geometria mínima ou FORA?** Nunca caiu em 20 enunciados, mas "problemas geométricos" abre o programa. Minha escolha: mínimo (5 fórmulas na L13). Se preferir FORA, a L13 fica só com sistema métrico.
3. **Sistema métrico curto ou FORA?** Também 0 diretas; só a conversão de tempo apareceu dentro de G0407. Minha escolha: INCLUIR curto.
4. **Relações e inferências (argumentos, silogismos, diagramas):** FORA neste pacote (0 questões; quantificadores já estão na L5). Quer uma lição a mais? Custo: uma lição nova, sem questão de apoio.
5. **Ordem das lições:** sugiro por peso do radar (porcentagem, proporção, aritmética; depois conjuntos, contagem, média; depois lógica e sequências). Isso renumera os ids de lição e mexe no `ranking`. Aceita reordenar ou prefere só acrescentar as novas depois da L7?
6. **Aprovar os ajustes 3.1 a 3.4** (3.1 e 3.2 foram pedidos; 3.3 e 3.4 são extras que achei).
7. **Probabilidade:** manter curta dentro da L11 (minha escolha) ou separar/tirar.
8. **Apostila maior:** 7 lições passam a 14. Pelo radar, 5 questões de prova, isso é muito texto para pouco peso. Se o dono quiser enxuto (projeto pessoal), cortar a L13 (métrico/geometria) deixa 13 lições, e ainda assim nada do que já caiu é perdido.

**Para a execução (C1, depois do aprovado):** o gerador de apostila precisa aceitar lições com `qtdQuestoes` e `topicosBanco` de `alvo: false` (`rl`/`mat`); se não aceitar, é mudança de código e exige `/code-review` (relatório de cobertura, C5).
