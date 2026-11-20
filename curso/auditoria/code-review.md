# Code-review das mudanças ainda não commitadas (20/11/2026)

Resultado geral: NENHUM achado CRÍTICO. Nenhum achado MÉDIO. Dois achados BAIXOS (teste que não prova o que diz; borda do foco cortada no menu). Pode seguir para o Pull Request; os dois itens são melhorias opcionais.

## Achados

### CRÍTICO
Nenhum.

### MÉDIO
Nenhum.

### BAIXO

1. tests/gerador.test.mjs, teste "(6b)" (a verificação do HTML é vazia).
   - O que está no código: `assert.ok(!html.includes('Assinale, pois, a alter- nativa que contenha o trecho'), ...)`.
   - Evidência: gerei a apostila de Português com o banco SEM as marcações (cópia em pasta temporária, `--teste --questoes`). A frase "Assinale, pois" aparece 0 vezes, mas "Propositadamente" (início do enunciado da G0001) aparece 1 vez. Ou seja, o texto buscado nunca existe no HTML (o gerador reescreve "alter- nativa"), e essa linha do teste passaria mesmo sem a correção.
   - O que quebra: nada hoje. O teste ainda falha se a correção sumir, porque a linha seguinte exige o aviso "fora por transcrição suspeita: ... G0001" no stderr, e esse aviso só existe com a correção. Mas a prova "a questão não está no HTML" não vale.
   - Correção sugerida: trocar o trecho procurado por `'Propositadamente'` (confirmado: aparece 1 vez sem a marcação).
   - Os testes (5b), com os 3 trechos de figura, foram conferidos do mesmo jeito e SÃO válidos: cada trecho aparece 1 vez no HTML sem a marcação.

2. site/estilo.css:57 (`.menu` com `overflow-x: auto` e `padding: 4px`).
   - Evidência: o contorno de foco é `outline: 3px` + `outline-offset: 2px` = 5 px (linha `:focus-visible`), maior que o padding de 4 px do menu. Em overflow rolável, o que passa do padding é cortado.
   - O que quebra: no celular (menos de 768 px), quem navega por teclado/leitor vê a borda de foco do item do menu cortada em cima e embaixo de 1 px. Continua visível, só fica um pouco recortada.
   - Correção sugerida: `padding: 6px 4px` e margem `0 -4px`, ou `.menu a:focus-visible { outline-offset: 0; }`.

3. tests/gerador.test.mjs:1 (comentário). Diz "Rodar: node --test tests/", que não funciona no Node 24. Trocar por `node --test tests/gerador.test.mjs`.

## O que conferi e passou

- scripts/apostila-css.mjs: `escolherNavegador` agora respeita `NAVEGADOR_PDF` (se a variável existe e o arquivo não, devolve `undefined` e o gerador falha com a mensagem "Edge/Chrome nao encontrado"). Sem a variável, usa a lista padrão. Os dois usos no código (linha 114 e testes) tratam `undefined`. Sem regressão.
- scripts/gerar-amostra-apostila.mjs: `refArtSo` agora repassado para `secaoLimites`; o teste (4b) prova.
- scripts/gerar-apostila-materia.mjs: filtro `dependeDeFigura`/`transcricaoSuspeita` age sobre o grupo inteiro (`copias.some`), antes de anulada/gabarito. Os dois cenários (lições e simulado) usam o mesmo mapa `unicas`, então ficam cobertos. Avisos saem em stderr. Sem caminho montado com entrada externa nova, sem comando shell novo.
- scripts/gerar-dados-site.mjs: rodei o gerador numa CÓPIA em pasta temporária (não toquei no site). `questoes.json` e `radar.json` gerados são byte a byte IGUAIS (`cmp`) aos de site/dados. Saída: 1.421 questões, 35 provas, 60 rótulos; 8 apostilas; avisos de 5 (G0001) + 14 (figura).
- Banco curso/questoes-anteriores.json (leitura por script): JSON válido; total 1.440 (850 `alvo:true`, 590 `alvo:false`), igual ao HEAD (1.440). `git diff --stat`: 38 linhas adicionadas, 0 removidas = 19 registros x 2 campos. Linhas do diff que não são os 4 campos novos: nenhuma. 14 registros `dependeDeFigura` (G0128, G0160, G0169, G0397, G0406, G0449, G0459 x2, G0467 x4, G0516, G0549) e 5 `transcricaoSuspeita` (G0001, as 5 cópias); todos com motivo preenchido; nenhum com as duas marcas; todas as cópias de cada grupo marcadas. 1.440 - 19 = 1.421 = tamanho do site; nenhum id marcado vaza para site/dados/questoes.json (vazamentos: 0).
- Progresso salvo no navegador: ids de questões removidas são ignorados em `viewErros` (`D.porId.has(id)`) e no Treino (`.filter(Boolean)`), então quem já tinha respondido uma delas não quebra a tela.
- site/dados/concurso.json: JSON válido; chaves e formato conferem com `desenharConcurso` (situacao/inscricao com titulo+texto; tabelas com 5 colunas e linhas de 5 células; cronograma e prova com linhas de 2). Texto vem por `txt()` e `h()` usa `createTextNode`/`setAttribute`: sem innerHTML, sem XSS. Não há contagem fixa de questões (1.440/1.421) em nenhum arquivo do site.
- site/app.js: `avisoDados()` agora devolve fragmento vazio (corrige o "null" na tela); spread no Treino; `mostrarResultado` usa `.res` que existe em todos os estados; ajuste de rolagem do menu protegido por `menu &&` e `scrollWidth > clientWidth`. Nenhum innerHTML novo.
- site/estilo.css: alvos de toque de 44 px (botões, select, input, summary, check, itens do menu, links do radar abaixo de 768 px); input/select em 16 px (`font-size: 1rem`); `:focus-visible` mantido; todas as cores novas usam variáveis (única ocorrência de cor literal fora de `:root`: nenhuma; conferi por busca de hex/rgb); modo escuro herda das variáveis; `prefers-reduced-motion` tratado; sem causa de rolagem horizontal na página (menu rola dentro do próprio bloco; margem negativa de 4 px compensada pelo padding de 16 px do `.miolo`). site/index.html: sem mudanças no diff.
- tests/gerador.test.mjs: 11 testes passam; os de banco de teste (5a, 6a) provam inclusão da questão normal e exclusão da marcada; (5b) validado por mutação (sem a marca, os trechos aparecem).

## Comandos rodados

- `git status --short`, `git diff`, `git diff --stat`: saída 0.
- `node --test tests/gerador.test.mjs`: saída 0; 11 testes, 11 passaram, 0 falhas, 0 pulados (inclui o teste do PDF numerado, 4,3 s).
- Script de leitura do banco (contagens, marcações, vazamento no site): saída 0.
- Cópia do gerador do site em pasta temporária + `cmp` com site/dados/questoes.json e radar.json: saída 0, iguais.
- `JSON.parse` de site/dados/concurso.json: ok.
- Mutação: banco sem as marcações em pasta temporária + `gerar-apostila-materia.mjs` para portugues, cirurgia-farmacologia-patologia e cariologia-prevencao-odontopediatria (`--teste --saida` temporário): saída 0 nas três.

## O que NÃO consegui verificar

- Texto e valores novos de concurso.json (Navegantes: R$ 9.748,86 / R$ 4.874,43, datas 25/11, 26/11 e 13/12, "5 cargos", Termo 114/2026, vencimento de R$ 2.987,25 + R$ 4.182,11, composição 10/10/20 do PSPS 003/2025): não conferi contra o edital/ato oficial (fora do escopo e sem acesso à fonte aqui). Só a coerência interna (5 cargos listados; 20h = metade de 40h; 10+10+20 = 40 questões). O aviso de Navegantes é sensível ao tempo: inscrições acabam em 25/11/2026, dentro de 5 dias; vale reconferir antes do merge.
- Aparência real no celular e no tema escuro (não abri o site em navegador; avaliação só pelo CSS).
- Se `curso/apostila/*.json` novos (ainda não rastreados pelo git) serão incluídos no PR: os testes 5b e 6b dependem de `portugues.json`, `cirurgia-farmacologia-patologia.json` e `cariologia-prevencao-odontopediatria.json`; sem eles o CI falha.
