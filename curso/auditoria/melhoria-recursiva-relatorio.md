# Melhoria recursiva das regras: relatório de projeto (Opus, 2026-11-24)

Autor: agente Opus (só relatório; nenhum código foi escrito ou alterado). Implementação: Sonnet, seguindo este documento.
Pedido do dono: "quero deixar você melhorar suas regras e me mostre a cada novo aprimoramento o que você aprendeu", "quero um código gerado para essa melhoria recursiva" e transformar em regra permanente o método "baixar as normas oficiais, montar txt compilado a partir do HTML e só depois pesquisar nele".

Arquivos lidos: `CLAUDE.md` (projeto), `~/.claude/CLAUDE.md`, `~/.claude/settings.json`, `.claude/settings.json`, `.claude/settings.local.json`, `ESTADO.md`, `.gitignore`, `scripts/leis-compilar-e-conferir.mjs`, `scripts/aprendizados.mjs`, `tests/aprendizados.test.mjs`, a pasta de memória `~/.claude/projects/c--Users-rafael-ioppi-apostilas-dentista-furb/memory/` (MEMORY.md e todos os `feedback_*.md`), `fontes/leis/ORIGEM.md` (busca por "planalto/inacess"). Node local: v24.21.0.

---

## 0. Achados de fato que este relatório usa (verificados nesta sessão)

Estes achados mostram, com casos reais, por que o sistema precisa de verificação automática e não só de anotação.

| # | Achado | Onde | Como conferi |
|---|---|---|---|
| F1 | O proxy configurado para o Claude Code é `http://127.0.0.1:3129` (variáveis `HTTP_PROXY`/`HTTPS_PROXY`). O índice MEMORY.md ainda diz "aponta pro Px 127.0.0.1:3130". | `~/.claude/settings.json` (bloco `env`); MEMORY.md, linha "git push / gh proxy fix" | Leitura dos dois arquivos. Não testei a rede: não sei se há também algo escutando na 3130. |
| F2 | Documentação envelhecida sobre o Planalto: `fontes/leis/ORIGEM.md` (linha 3 e tabela) diz "planalto.gov.br ficou INACESSÍVEL"; `ESTADO.md` linha 16 ("o planalto.gov.br não é alcançável desta rede") e item 8 de "O que falta"; MEMORY.md, linha "Apostilas Dentista FURB: estado" ("Planalto inacessível (usar Câmara)"). Já existem baixados `fontes/leis/planalto/*.htm`, `txt/` e `COMPILADO-planalto.txt`. | arquivos citados | Leitura. A afirmação "o Planalto responde ao curl hoje" vem do agente principal; eu não testei a rede. |
| F3 | `fontes/leis/planalto/` NÃO tem `ORIGEM-planalto.tsv`, embora o comando `baixar` do script o grave. Tem `COMPARACAO-planalto-x-camara.json`, que o script atual não gera. | listagem da pasta | Não sei explicar (download feito por outro caminho, ou arquivo apagado). O implementador não deve supor que o TSV existe. |
| F4 | **Bug latente em `normalizarFraca`** (`scripts/leis-compilar-e-conferir.mjs`, linha 67): o regex não tem os parênteses literais `\(` `\)` que `normalizar` tem; os parênteses ali são só agrupamento. Resultado: qualquer trecho de texto comum que contenha "regulament", "incluíd", "vide", "promulga", "vigência" etc. é apagado inteiro. Teste: `normalizarFraca("O SUS regulamentara a materia conforme lei")` devolve `""`. Como `longos(...)` de um trecho apagado é `[]` e `[].every(...)` é `true`, um trecho assim seria dado como "conferido" sem comparar nada (falso positivo). | script de leis | Rodei as funções exportadas num script na pasta scratchpad (fora do repo). |
| F5 | O bug F4 **não afetou** o resultado de hoje: refazendo a lógica de `conferir` no scratchpad, os 94 trechos passaram todos pela normalização normal (nenhum dependeu da fraca). | idem | Script de medição no scratchpad: `{tot: 94, normal: 94, fracaVazia: 0, fracaReal: 0, falha: 0}`. Reproduzi só "achado em alguma norma", não a distinção "não na fonte citada". |
| F6 | `conferir` não muda o código de saída quando há divergências (só imprime e grava `CONFERENCIA-trechos.json`). Então não serve como checagem automática enquanto não for corrigido. | linhas 132-155 | Leitura. |
| F7 | O guarda de execução do script de leis (`process.argv[1].replace(...)`, linha 172) lança `TypeError` quando `process.argv[1]` é `undefined` (ex.: `node -e "import(...)"`). Com arquivo de teste funciona, porque `argv[1]` existe. | linha 172 | Leitura; não executei o caso `-e`. |
| F8 | Contradição entre regras guardadas: `CLAUDE.md` do projeto diz "**Só Sonnet** (ordem do dono, 20/11/2026...)" e, mais abaixo, "modelos dos subagentes (regra de 22/11/2026, substitui 'só Sonnet'): relatório, auditoria e conferência de fonte = Opus (SOMENTE UM por vez)". O índice MEMORY.md lista "Apenas Sonnets (2026-11-19)" sem marcar que foi substituída, ao lado de "Um Opus por vez" e "Sonnet executa, Opus planeja". Hoje quem lê precisa adivinhar qual vale. | CLAUDE.md; MEMORY.md | Leitura. |
| F9 | O repositório é público (GitHub Pages) e `memoria/` está no `.gitignore`; `curso/` vai para o git. O rascunho grava `curso/aprendizados.jsonl`, ou seja, publicaria os aprendizados (que falam de proxy, rede, máquina). | `.gitignore`, rascunho | Leitura. |

---

## 1. Modelo de dados

### 1.1 Decisão de arquitetura: registro de eventos só de acréscimo (append-only)

O registro é um arquivo JSONL em que **cada linha é um evento** (criar, mostrar, aceitar, aplicar, verificar, revogar...). O estado atual de cada aprendizado é calculado "dobrando" os eventos em ordem. Motivos:
- histórico completo: dá para provar quando o dono aprovou, quando a regra foi aplicada e quando foi revogada;
- escrita curta (uma linha anexada), muito mais segura com dois agentes do que reescrever o arquivo todo (o rascunho reescreve tudo a cada `novos`);
- revogação e substituição viram eventos, nunca apagamento.

### 1.2 O que é um "aprendizado" (dados do evento `criar`)

| Campo | Tipo | Obrigatório | Regra |
|---|---|---|---|
| `id` | string | gerado | `A` + número com 3 dígitos ou mais (`^A\d{3,}$`); sequencial, nunca reutilizado (nem depois de revogado). |
| `titulo` | string | sim | 5 a 80 caracteres. |
| `chave` | string | sim | Assunto da regra, em pontos: `^[a-z0-9]+(\.[a-z0-9-]+)+$` (ex.: `ambiente.rede.proxy`). **No máximo um aprendizado ativo por chave.** É o mecanismo contra contradição. |
| `categoria` | enum | sim | `metodo`, `bug`, `ambiente`, `fonte`, `processo`, `papeis`, `conteudo`, `publicacao`. |
| `escopo` | enum | sim | `projeto` ou `global` (vale em todos os projetos). |
| `severidade` | enum | sim | `alta` (causou ou causaria erro em conteúdo, dado errado ou quebra de ordem do dono), `media` (retrabalho, falso alarme), `baixa` (conforto). |
| `origem` | enum | sim | `ordem-dono` (o dono mandou), `correcao-dono` (o dono corrigiu um erro meu), `erro-proprio`, `bug`, `metodo-melhor`, `ambiente-mudou`. |
| `gatilho` | string | sim | O que aconteceu, em até 300 caracteres. |
| `evidencia` | array | sim, 1 ou mais | Itens `{tipo, ref, data}`; `tipo` ∈ `arquivo`, `comando`, `commit`, `url`, `citacao-dono`. `ref` até 300 caracteres. Para `citacao-dono`, `ref` é o trecho literal que o dono escreveu. |
| `aprendi` | string | sim | Até 300 caracteres. |
| `regra` | string | sim | Frase imperativa, até 240 caracteres. É o texto que passa a valer. |
| `mudanca` | string | sim | O que muda de concreto (arquivo editado, teste novo, checagem nova, memória corrigida). Até 300. Sem isso o aprendizado é "registrar para constar" e é recusado. |
| `alvos` | array de strings | não | Arquivos onde o texto da regra precisa estar (memória, CLAUDE.md, ORIGEM.md...). Caminho com prefixo: `mem:` (pasta de memória), `repo:` (raiz do projeto), `home:` (`~`). Ex.: `mem:MEMORY.md`, `repo:fontes/leis/ORIGEM.md`, `home:.claude/CLAUDE.md`. |
| `verificacoes` | array | não | Ver 5.1. Vazio = "não verificável automaticamente"; aceito, mas aparece marcado. |
| `substitui` | array de ids | não | Aprendizados que este substitui (ficam `superado`). |
| `forcar` | boolean | não | Aceita criar apesar de aviso de semelhança (nunca contorna chave repetida nem filtro de segredo). |

Campo derivado (calculado, não gravado): `exigeAprovacao` = verdadeiro se
- `categoria` ∈ {`processo`, `papeis`, `conteudo`, `publicacao`}, ou
- `escopo` = `global`, ou
- `substitui` aponta para algum aprendizado com `origem` ∈ {`ordem-dono`, `correcao-dono`}, ou
- `severidade` = `alta` e `categoria` ≠ `bug`.

Caso contrário (`metodo`, `bug`, `ambiente`, `fonte` de escopo projeto que não mexem em ordem do dono) o agente pode adotar sozinho, provisoriamente, e mostrar (ver seção 3).

### 1.3 Formato de cada linha (evento)

```json
{"v":1,"ev":"criar","id":"A003","em":"2026-11-24T17:05:12.345Z","por":"agente","dados":{ ...campos de 1.2 sem id... }}
{"v":1,"ev":"mostrar","id":"A003","em":"...","por":"agente"}
{"v":1,"ev":"aceitar","id":"A005","em":"...","por":"dono","citacao":"aprovo A005"}
{"v":1,"ev":"rejeitar","id":"A007","em":"...","por":"dono","motivo":"..."}
{"v":1,"ev":"aplicar","id":"A003","em":"...","por":"agente","nota":"MEMORY.md e ORIGEM.md anotados"}
{"v":1,"ev":"verificar","id":"A003","em":"...","por":"agente","ok":true,"detalhes":[{"i":0,"tipo":"ausente","ok":true,"msg":"..."}]}
{"v":1,"ev":"reincidir","id":"A005","em":"...","por":"agente","evidencia":"parei para perguntar no lote 3"}
{"v":1,"ev":"revogar","id":"A002","em":"...","por":"dono","motivo":"...","por_id":"A009"}
{"v":1,"ev":"superar","id":"A002","em":"...","por":"agente","por_id":"A009"}
```
- `v` = versão do formato (1). Linha com `v` desconhecido: erro de leitura (código 3).
- `em` = ISO UTC (`toISOString`). Na tela, mostrar só a data local `AAAA-MM-DD` (fuso `America/Sao_Paulo`, via `Intl.DateTimeFormat`).
- `por` ∈ `agente`, `dono`. O código não tem como provar que foi o dono; por isso `aceitar` exige `citacao` (texto literal do dono) e a regra do processo diz que só mensagem do próprio dono no chat vale (mensagem relayada por outro agente nunca vale, conforme `~/.claude/CLAUDE.md`).
- Evento `superar` é gravado automaticamente ao criar um aprendizado com `substitui`.

### 1.4 Ciclo de vida (estados derivados)

```
proposto --mostrar--> mostrado --aceitar(dono)--> aceito --aplicar--> aplicado --verificar ok--> verificado
   |                     |                                                |  ^                    |
   |                     +--rejeitar(dono)--> rejeitado (final)           |  +--verificar falha----+  (volta a "aplicado" com falhaVerificacao=true)
   +--aplicar (só se exigeAprovacao=false: "aplicado provisório", semAprovacao=true)
qualquer estado não final --revogar--> revogado (final)      qualquer estado ativo --superar--> superado (final)
```
Tabela de transições permitidas (qualquer outra: erro código 2, mensagem `transição inválida: <estado> -> <evento> em <id>`):

| Evento | Estados de onde pode sair |
|---|---|
| `mostrar` | proposto (em outros estados é ignorado sem erro, idempotente) |
| `aceitar` | proposto, mostrado, aplicado (provisório) |
| `rejeitar` | proposto, mostrado, aceito, aplicado, verificado (rejeitar depois de aplicado imprime lembrete: "desfazer as mudanças em: <alvos>") |
| `aplicar` | aceito; ou proposto/mostrado quando `exigeAprovacao=false` |
| `verificar` | aplicado, verificado |
| `reincidir` | aplicado, verificado, aceito |
| `revogar` | todos menos rejeitado, revogado, superado |
| `superar` | todos menos rejeitado, revogado, superado |

"Ativo" (vale e entra na consolidação) = `aplicado` ou `verificado`. `aceito` ainda não aplicado aparece em "pendentes de aplicação". "Obsoleto" não é estado à parte: é `revogar` com `motivo` começando por `obsoleto:`.

Flags derivadas: `mostradoAoDono` (houve `mostrar`), `semAprovacao` (aplicado sem `aceitar`), `falhaVerificacao` (último `verificar` com `ok:false`), `reincidencias` (contagem de `reincidir`), `ultimaVerificacao` (data).

### 1.5 Duplicata e contradição
1. **Título igual** (normalizado: minúsculas, sem acento, só `[a-z0-9]` e espaço) a qualquer aprendizado não final: erro 2.
2. **Mesma `chave` de um aprendizado ativo, aceito, proposto ou mostrado**: erro 2, `chave <c> já está em <id> (<estado>); use --substitui <id> ou outra chave`. Com `substitui`, o antigo vira `superado` no mesmo bloqueio de escrita.
3. **Semelhança da regra** (Jaccard dos conjuntos de palavras normalizadas, sem palavras vazias; **"nao", "nunca", "sempre", "so" NÃO são palavras vazias**, porque mudam o sentido) ≥ 0,6 com qualquer aprendizado não final: erro 2 com aviso, a menos que `--forcar` ou `--substitui`. Palavras vazias: `a o as os de da do das dos e em no na nos nas um uma para por com que se ao aos`.
4. Contradição semântica de verdade (duas regras com chaves diferentes que se negam) **não é detectável por código**. Mitigação: chaves bem escolhidas (prefixo comum por assunto) e o comando `revisar` (5.4), que agrupa por prefixo de chave para leitura humana.

### 1.6 Revogação e substituição
- Nunca apagar linha. Revogar = evento `revogar` com `motivo` (obrigatório) e, se houver, `por_id`.
- Revogar ou superar aprendizado com `origem` `ordem-dono`/`correcao-dono` exige `--por dono --citacao "..."` (erro 2 sem isso). O agente não revoga sozinho regra que o dono deu.
- Na consolidação, superados/revogados somem da lista ativa e aparecem numa linha final "Substituídas recentemente (30 dias)" para quem lê entender a troca.

---

## 2. Quando e como registrar

### 2.1 Eventos que obrigam a registrar (gatilhos)
1. O dono corrigiu algo que eu fiz ou disse ("errou", "não era isso", "eu tinha dito...").
2. O dono deu ordem nova de como trabalhar ("a partir de agora", "sempre", "nunca", "guarde essa regra", "salve como regra").
3. Corrigi um erro meu que já tinha saído (afirmação falsa, arquivo errado, "feito" sem verificar).
4. Achei um bug que gerou falso resultado (ex.: entidades HTML → 11 falsos divergentes).
5. Encontrei um método claramente melhor que o anterior (ex.: compilar txt em vez de olhar página por página).
6. Um fato de ambiente mudou ou a memória estava errada (porta do proxy, site que voltou a responder, ferramenta que passou a funcionar).
7. Uma fonte bloqueou ou desbloqueou de um jeito que vai se repetir (anti-robô passivo, CAPTCHA).
8. Reincidência: repeti um erro que já tem aprendizado → evento `reincidir` (não um aprendizado novo).

Não registrar: fato de conteúdo de apostila (isso vai para o JSON da apostila e para as auditorias), andamento de tarefa (vai para ESTADO.md), segredos, dados pessoais.

### 2.2 Como o agente é lembrado
Três camadas, da mais barata para a mais forte:
1. **Checklist de fim de lote** (texto curto no CLAUDE.md do projeto, ligado à regra "Memórias: atualizar sempre"), 4 passos:
   (a) houve algum gatilho de 2.1? → `add`; (b) `verificar`; (c) `consolidar`; (d) colar a saída de `pendentes` na resposta final e rodar `marcar-mostrado` com os ids colados.
2. **Hook `SessionStart`** rodando `node scripts/aprendizados.mjs inicio`: injeta no começo de cada sessão um resumo de até 12 linhas (pendentes de mostrar, aguardando "aprovado", verificações falhando). **Vale a pena**: custo quase zero, resolve "a próxima sessão não sabe". Nunca pode bloquear: `inicio` sempre sai com 0.
3. **Hook `UserPromptSubmit`** rodando `node scripts/aprendizados.mjs gatilho`: lê o JSON do hook na entrada padrão, procura no texto do dono (regex sem acento, sem caixa) `guarde|salve como regra|a partir de agora|sempre|nunca mais|voce errou|errou|nao era isso|eu (ja )?tinha dito|nao pare|nao termine` e, se achar, imprime uma linha: `Lembrete: a mensagem do dono parece regra ou correção; registrar com "node scripts/aprendizados.mjs add --arquivo <json>" antes de encerrar o lote.` Vale a pena **em teste por uma semana**: pega exatamente os casos 5 e 6 desta sessão. Risco: ruído (falso gatilho com "sempre" em frase comum); se incomodar, remover.
4. **Hook `Stop` bloqueante: NÃO recomendo.** Forçar o agente a continuar quando ele quer parar é fácil de entrar em laço, conflita com paradas legítimas (CAPTCHA, decisão do dono) e o código não sabe distinguir. A regra A005 trata "não parar" por comportamento + reincidência.

Antes de configurar qualquer hook, o implementador deve conferir na documentação oficial do Claude Code (agente `claude-code-guide` ou skill `update-config`) o formato exato do `settings.json`, os nomes dos eventos, o campo do JSON de entrada que traz o texto do prompt, a variável `CLAUDE_PROJECT_DIR`, como o Windows executa o comando do hook e se a saída padrão de `SessionStart`/`UserPromptSubmit` é mesmo injetada no contexto. **Eu não conferi esses detalhes nesta sessão.** Editar `.claude/settings.json` só com autorização digitada pelo dono (pergunta Q3).

---

## 3. Mostrar ao dono "a cada novo aprimoramento"

### 3.1 Frequência
- **No fim de cada lote e na resposta final**: bloco "Aprendizados" (comando `pendentes`). Se não houver nada novo: uma linha só, `Aprendizados: nenhum novo neste lote.` (prova de que a checagem foi feita, custa uma linha).
- Itens que já foram mostrados e ainda esperam "aprovado" não são repetidos por extenso: uma linha `Aguardando sua decisão: A005, A006 (ver lote anterior).` No máximo 3 lotes seguidos; depois disso, só no `inicio` da próxima sessão.

### 3.2 Formato (exatamente o que `pendentes` imprime)
```
Aprendizados novos (2):
- A003 [ambiente · adotado, aguardando só ciência] Proxy deste ambiente é 127.0.0.1:3129; o Planalto responde ao curl. Mudou: MEMORY.md e ORIGEM.md anotados, checagem de rede. Se discordar: "rejeito A003 <motivo>".
- A005 [processo · VALE SÓ DEPOIS DO SEU "aprovado"] Com "não pare até concluir", sigo até o fim e só paro em bloqueio real. Responda "aprovo A005" ou "rejeito A005 <motivo>".
Aguardando sua decisão: A006.
```
- Cada item: no máximo 2 linhas, 320 caracteres; texto = `regra` + "Mudou: " + `mudanca` resumida (cortar em 120 com "…").
- Rótulo: `adotado, aguardando só ciência` quando `semAprovacao` e `exigeAprovacao=false`; `VALE SÓ DEPOIS DO SEU "aprovado"` quando `exigeAprovacao=true`.
- `pendentes` **não marca nada**. Quem marca é `marcar-mostrado <ids>`, depois que o bloco foi colado na resposta (defeito do rascunho: marcava como visto só por imprimir para o agente).

### 3.3 Aprovação e o limite de autonomia
- O agente **pode adotar sozinho** (aplicar provisório e mostrar) quando `exigeAprovacao=false`: correção de fato de ambiente, bug técnico, método técnico melhor, comportamento de fonte. Condição extra: só pode tornar o agente mais cuidadoso ou corrigir fato comprovado; nunca afrouxar regra existente.
- **Exige "aprovado"** (texto do dono) tudo que mude como o agente trabalha com o dono: processo, papéis/modelos, publicação, conteúdo que o leitor vê, escopo global, e qualquer coisa que substitua ou revogue regra dada pelo dono.
- O dono responde no chat: `aprovo A005`, `rejeito A007 <motivo>` (aceitar também "aprovado A005"). O agente registra com `aceitar A005 --citacao "<texto literal>"` ou `rejeitar A007 --motivo "<texto>" --por dono`.
- Regra que é **ordem direta do dono** (origem `ordem-dono`, ex.: A001, A005, A006) já nasce com a citação dele como evidência; mesmo assim aparece uma vez com o texto redigido, porque o dono aprova a **redação**, não só a ideia.
- Silêncio do dono não é aprovação. Aprendizado `exigeAprovacao=true` sem resposta fica em `mostrado` indefinidamente e não entra na consolidação.

---

## 4. Como a regra passa a valer

### 4.1 Onde fica cada coisa (decisão)
| O quê | Onde | Por quê |
|---|---|---|
| Registro de eventos | `<memdir>/aprendizados.jsonl` (`<memdir>` = `C:\Users\rafael-ioppi\.claude\projects\c--Users-rafael-ioppi-apostilas-dentista-furb\memory`) | Privado (fora do repo público, F9), junto das outras memórias. Uma só fonte, com campo `escopo`. |
| Regras ativas consolidadas | `<memdir>/regras-aprendidas.md` (gerado, não editar à mão) | É uma memória como as outras, com frontmatter. |
| Ponteiro sempre carregado | uma linha em `<memdir>/MEMORY.md` | O índice MEMORY.md é carregado em toda sessão; uma linha só evita inchar. |
| Regra de escopo global | texto curto em `~/.claude/CLAUDE.md`, editado pelo agente **com aprovação**, e checagem `presente` apontando para lá | É o único lugar global sempre carregado. O código **nunca** edita CLAUDE.md. |
| Código | `scripts/aprendizados.mjs` (repo público; não contém dados) | |
| Cópia para a sessão nova | `consolidar --copiar-memoria` copia `aprendizados.jsonl` e `regras-aprendidas.md` para `<repo>/memoria/` (já no `.gitignore`) | Segue a prática do CLAUDE.md ("Cópia de toda a memória em memoria/"). Não copia MEMORY.md (evita sobrescrever diferenças). |

O caminho de `<memdir>` vem de `APRENDIZADOS_DIR`; sem ela, usa o caminho fixo acima (montado com `os.homedir()` + `.claude/projects/c--Users-rafael-ioppi-apostilas-dentista-furb/memory`). Se a pasta não existir: erro 3 `pasta de memória não encontrada: <caminho> (defina APRENDIZADOS_DIR)`. Não tentar deduzir o "slug" do caminho do projeto.

### 4.2 Formato de `regras-aprendidas.md`
```
---
name: regras-aprendidas
description: "Regras ativas aprendidas, geradas por scripts/aprendizados.mjs consolidar a partir de aprendizados.jsonl; não editar à mão"
metadata:
  type: feedback
---

# Regras aprendidas ativas (6) · gerado em 2026-11-24

## ambiente
- [A003] O proxy deste ambiente é 127.0.0.1:3129 ... _(verificado 2026-11-24)_
## metodo
- [A001] ...  _(aplicado 2026-11-24, sem verificação automática)_

Aguardando "aprovado" do dono (ainda NÃO valem): A005, A006.
Substituídas nos últimos 30 dias: A002 -> A009.
```
- Agrupar por `categoria` (ordem fixa: processo, papeis, publicacao, conteudo, metodo, fonte, bug, ambiente), dentro por `chave`.
- Marcar `(FALHANDO na verificação de <data>)` quando `falhaVerificacao`; marcar `(provisório: sem aprovação)` quando `semAprovacao`.
- Gravação idempotente: se o conteúdo gerado for igual ao existente (ignorando a linha da data), não regravar.

### 4.3 Linha no MEMORY.md
Exatamente uma linha, identificada por conter `(regras-aprendidas.md)`:
`- [Regras aprendidas](regras-aprendidas.md) — N regras ativas, M aguardando aprovação; registro em aprendizados.jsonl (scripts/aprendizados.mjs)`
Se existir, substituir no lugar; se não, acrescentar no fim. Preservar o restante byte a byte, inclusive o fim de linha usado no arquivo (CRLF ou LF) e a presença ou não de quebra final.

### 4.4 Contra o inchaço
- Orçamento: `regras-aprendidas.md` ≤ 60 regras ativas e ≤ 10 KB. Acima disso, `consolidar` imprime aviso e sai com 0; `verificar` sai com 1 (precisa juntar regras com `substitui`).
- `verificar` também avisa quando MEMORY.md passa de 150 linhas ou 12 KB. (Há informação de que o Claude Code corta o MEMORY.md carregado a partir de certo tamanho; **não confirmei o limite**; o implementador deve conferir na documentação e ajustar o número.)
- A regra curta mora no registro; o "porquê/como" longo, quando existir, fica no `feedback_*.md` já existente, listado em `alvos`. Não duplicar texto longo.

### 4.5 Segredos e dados pessoais
`add` recusa (erro 2, `possível segredo ou dado pessoal no campo <campo>: reescreva sem o valor`) se qualquer campo de texto (inclusive `evidencia[].ref`) contiver:
- e-mail (`[\w.+-]+@[\w-]+\.[\w.-]+`);
- IPv4 que não seja `127.0.0.1` nem `0.0.0.0`;
- telefone brasileiro (`\(?\d{2}\)?\s?9?\d{4}-?\d{4}`);
- `(senha|password|token|secret|segredo|api[_-]?key|bearer)\s*[:=]\s*\S+`;
- sequência base64/alfanumérica de 32+ caracteres que não seja exatamente hexadecimal de 40 (SHA1/commit) ou 64 (SHA256).
Isso não pega tudo (nome de pessoa, endereço de VM por nome). A regra continua: não escrever segredo em memória.

---

## 5. Verificação automática

### 5.1 Tipos de verificação (campo `verificacoes`)
```json
{"tipo":"comando","argv":["node","--test","tests/leis.test.mjs"],"requer":["repo:fontes/leis/planalto/txt"]}
{"tipo":"ausente","arquivo":"mem:MEMORY.md","regex":"127\\.0\\.0\\.1:3130"}
{"tipo":"presente","arquivo":"repo:fontes/leis/ORIGEM.md","regex":"2026-11-24.*[Pp]lanalto.*respond"}
{"tipo":"rede","url":"https://www.planalto.gov.br/ccivil_03/leis/l8080.htm","espera":"2xx"}
```
- `comando`: executado com `execFileSync(argv[0], argv.slice(1), {cwd: repo, timeout: 180000, stdio: 'pipe'})`, **sem shell**. Lista branca: `argv[0]` = `node` e o primeiro argumento que não começa com `-` deve ser `scripts/*.mjs` ou `tests/*.test.mjs`. Fora disso: erro 2 já no `add`. Passa se o código de saída for 0.
- `requer`: caminhos que precisam existir; se faltar algum, a verificação fica `pulada` (não é falha), com mensagem `pulada: falta <caminho>`. Necessário porque `fontes/` não vai para o git.
- `ausente` / `presente`: lê o arquivo (UTF-8, sem BOM) e testa o regex (flags `m`; `i` se o objeto tiver `"i":true`). Arquivo inexistente: `ausente` passa, `presente` falha.
- `rede`: só roda com `verificar --rede` (sem a opção: `pulada: rede não pedida`). Usa `curl -sS -o NUL|/dev/null -w %{http_code} -m 30 -A "Mozilla/5.0" <url>` via `execFileSync`, herdando o proxy das variáveis de ambiente. `espera`: `2xx` ou um código exato. É o **detector de documentação envelhecida**: a afirmação "o site X está inacessível" ou "o site X responde" vira uma checagem de rede ligada a um `ausente`/`presente` no documento. Se o teste de rede contradiz o texto, a mensagem diz: `documentação envelhecida? <arquivo> afirma o contrário do teste de rede`.

### 5.2 Comandos de verificação
- `verificar [ids...] [--rede]`: roda as verificações dos ativos (ou dos ids pedidos), grava um evento `verificar` por aprendizado, imprime uma linha por verificação (`ok`, `FALHOU`, `pulada`) e um resumo. Sai com 1 se alguma falhou.
- `validar`: integridade do registro, sem rodar nada externo (ver 6.4). Sai com 0, 2 ou 3.

### 5.3 Integração com `scripts/leis-compilar-e-conferir.mjs` (mudanças pedidas)
1. `conferir`: `process.exitCode = 1` quando `falhas.length > 0` ou quando não há fonte carregada (F6).
2. Corrigir `normalizarFraca` (F4): pôr os parênteses literais `\(` e `\)` no primeiro regex, igual a `normalizar`.
3. Em `tem()`: se a lista de segmentos (normal ou fraca) estiver vazia, **não** contar como achado (`[].every` é `true`). Trecho que vira vazio depois de normalizar = falha com motivo `trecho vazio após normalizar`.
4. `compilar`: depois de gerar cada txt, procurar entidade HTML não decodificada (`/&[a-zA-Z]+;|&#\d+;/`); se houver, imprimir `entidade não decodificada em <arquivo>: <amostra>` e `process.exitCode = 1`. Teria pego o bug do caso 2 sozinho.
5. `htmlParaTexto`: acrescentar `&#x[0-9a-f]+;` (hexadecimal) e as entidades `ndash`, `mdash`, `hellip`, `laquo`, `raquo`, `ldquo`, `rdquo`, `lsquo`, `rsquo`, `middot`, `shy` (vazio) ao mapa `ENT`.
6. Guarda de execução: trocar a linha 172 pelo mesmo padrão do rascunho de aprendizados (`process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)`), para importar sem efeito colateral e sem `TypeError` (F7).
7. Caminhos injetáveis para teste: `RAIZ` lida de `LEIS_RAIZ` se definida (senão a atual). Exportar `conferirEm({ dirLeis, dirApostilas, dirTxt })` que devolve `{ total, ok, falhas }` sem imprimir e sem gravar; `conferir()` passa a chamar essa função e cuidar de imprimir/gravar.
8. `baixar`: não apagar do `ORIGEM-planalto.tsv` as linhas de normas cuja baixa falhou agora (ler o TSV existente, se houver, e substituir só as linhas baixadas com sucesso) (F3).
9. Não mudar o mapa `NORMAS`, as URLs nem o formato do `COMPILADO-planalto.txt`.

Ligação com o registro: A001 e A002 têm `verificacoes` de tipo `comando` apontando `node --test tests/leis.test.mjs` (sempre roda) e `node scripts/leis-compilar-e-conferir.mjs conferir` (com `requer` da pasta `txt/`).

### 5.4 Revisão periódica
`revisar`: lista (sem gravar) ativos sem verificação automática há mais de 60 dias, ativos com `reincidencias ≥ 2` ("a regra não mudou o comportamento: escalar para hook, teste ou checagem"), e grupos de 2+ ativos com o mesmo prefixo de chave de 2 níveis (candidatos a juntar).

### 5.5 O que NÃO dá para automatizar
- Saber se o agente de fato mudou de comportamento (parar para perguntar, escrever código sozinho). Só a reincidência registrada e o dono percebem.
- Contradição semântica entre regras de chaves diferentes.
- Provar que uma aprovação veio do dono (o código só guarda a citação).
- Qualidade e utilidade da regra; decidir se um assunto merece regra.
- Distinguir anti-robô passivo de CAPTCHA ativo (depende de olhar a página).
- Verdade de conteúdo das apostilas além do confronto literal com a norma baixada.
- Detecção de dado pessoal que não segue padrão (nomes, apelidos de servidor).

---

## 6. Interface do código: `scripts/aprendizados.mjs` (reescrever)

### 6.1 O que fazer com o rascunho
Jogar fora a estrutura e reescrever. Aproveitar só: a função de normalização `norm`, a mensagem de erro com número de linha, o padrão de guarda de execução e o estilo de teste com `fs.mkdtempSync(os.tmpdir())`. Defeitos do rascunho que motivam a troca:
1. Grava em `curso/` (repo público) e gera `curso/aprendizados.md` toda vez que roda `regras` (F9).
2. `novos` marca como "mostrado" ao imprimir para o agente, não quando o dono viu.
3. Sem estados, sem aprovação, sem revogação/substituição, sem chave de assunto, sem verificação, sem evidência obrigatória, sem campo "o que mudou".
4. Duplicata só por título; regra repetida só se o texto normalizado for idêntico.
5. Reescreve o arquivo inteiro a cada mudança, com `.tmp` de nome fixo: dois agentes ao mesmo tempo perdem dados ou colidem no `.tmp`; no Windows `renameSync` sobre arquivo aberto pode falhar com `EPERM`.
6. `opcoes()` engole a próxima palavra mesmo quando ela é outra opção e não trata opção sem valor; passar texto com aspas e acentos pela linha de comando do PowerShell é frágil.
7. BOM no início (comum em arquivos gravados pelo PowerShell 5.1) quebra o `JSON.parse` da linha 1.
8. Sem filtro de segredo.

### 6.2 Comandos
Todos: `node scripts/aprendizados.mjs <comando> [opções]`. Variáveis: `APRENDIZADOS_DIR` (pasta do registro), `APRENDIZADOS_REPO` (raiz do repo para `repo:`; padrão = pasta acima de `scripts/`), `APRENDIZADOS_HOME` (para `home:`; padrão `os.homedir()`), `APRENDIZADOS_AGORA` (ISO; relógio fixo nos testes).

| Comando | Faz | Imprime (sucesso) | Saída |
|---|---|---|---|
| `add --arquivo <json>` | cria aprendizado a partir de JSON (campos de 1.2). Forma preferida. | `registrado A007 (proposto; exige "aprovado": sim)` + avisos | 0 / 2 / 3 |
| `add --titulo .. --chave .. --categoria .. --escopo .. --severidade .. --origem .. --gatilho .. --evidencia <tipo>:<ref> [--evidencia ..] --aprendi .. --regra .. --mudanca .. [--alvo ..] [--substitui A00X] [--forcar]` | igual, por opções (para casos simples) | idem | idem |
| `pendentes` | bloco de 3.2 com os não mostrados + linha "Aguardando sua decisão" | o bloco, ou `Aprendizados: nenhum novo neste lote.` | 0 |
| `marcar-mostrado <ids...>` | evento `mostrar` | `marcado como mostrado: A003, A005` | 0 / 2 (id inexistente) |
| `aceitar <id> --citacao "<texto do dono>"` | evento `aceitar`, `por: dono` | `A005 aceito; falta aplicar` | 0 / 2 |
| `rejeitar <id> --motivo ".." [--por dono]` | evento `rejeitar` | `A007 rejeitado` (+ lembrete de desfazer se estava aplicado) | 0 / 2 |
| `aplicar <id> --nota ".."` | evento `aplicar`; confere que cada `alvo` existe | `A003 aplicado (provisório, sem aprovação)` ou `A005 aplicado` | 0 / 2 |
| `verificar [ids] [--rede]` | 5.2 | uma linha por verificação + `verificação: N ok, F falharam, P puladas` | 0 / 1 |
| `reincidir <id> --evidencia ".."` | evento `reincidir` | `A005: reincidência nº 2 (ver "revisar")` | 0 / 2 |
| `revogar <id> --motivo ".." [--por-id A00X] [--por dono --citacao ".."]` | evento `revogar` | `A002 revogado` | 0 / 2 |
| `listar [--estado <e>] [--categoria <c>] [--json]` | tabela `id data estado categoria chave título` | uma linha por item | 0 |
| `mostrar <id>` | todos os campos e eventos de um item | texto | 0 / 2 |
| `consolidar [--copiar-memoria]` | gera `regras-aprendidas.md` e atualiza a linha do MEMORY.md (4.2, 4.3) | `consolidado: N ativas, M aguardando; MEMORY.md atualizado|sem mudança` | 0 / 3 |
| `validar` | 6.4 | `registro válido: N aprendizados, E eventos` ou a lista de problemas | 0 / 2 / 3 |
| `revisar` | 5.4 | listas | 0 |
| `inicio` | para o hook SessionStart: até 12 linhas (contagens, pendentes de mostrar, aguardando aprovação, verificações falhando segundo o último evento; **não roda verificação**) | texto curto; em qualquer erro imprime `aprendizados: não foi possível ler o registro (<motivo>)` | **sempre 0** |
| `gatilho` | para o hook UserPromptSubmit: lê JSON da entrada padrão, aplica o regex de 2.2 | a linha de lembrete, ou nada | **sempre 0** |
| sem comando ou desconhecido | | uso resumido | 2 |

Códigos de saída: **0** ok; **1** verificação falhou (ou orçamento estourado em `verificar`); **2** uso errado ou validação (campo faltando, enum inválido, duplicata, chave ativa repetida, semelhança sem `--forcar`, transição inválida, segredo, comando fora da lista branca); **3** erro de leitura/gravação (linha corrompida, versão desconhecida, pasta de memória inexistente, bloqueio não obtido).
Mensagens de erro sempre em português, prefixo `erro: `, em `stderr`.

### 6.3 Escrita segura (concorrência, Windows)
- Toda operação que grava pega um bloqueio: `fs.openSync('<dir>/aprendizados.lock', 'wx')`, escrevendo `pid` e hora. Se existir: tentar de novo a cada 50 ms até 5 s (espera síncrona com `Atomics.wait` num `SharedArrayBuffer`). Bloqueio com mais de 30 s (pelo `mtime`) é considerado abandonado: apagar e tentar uma vez. Não conseguiu: erro 3 `registro em uso por outro processo (aprendizados.lock); tente de novo`. Liberar em `finally`.
- Dentro do bloqueio: reler o arquivo, calcular o próximo id (maior número entre todos os eventos `criar`, + 1), validar, e só então `fs.appendFileSync` com as linhas novas (todas as de uma operação juntas, ex.: `criar` + `superar`).
- Antes de anexar: se o arquivo não terminar em `\n`, erro 3 `última linha incompleta em aprendizados.jsonl (linha N); conferir à mão` (não corrigir sozinho).
- Arquivos gerados (`regras-aprendidas.md`, MEMORY.md): gravar em `<arq>.<pid>.<aleatório>.tmp` e `renameSync`; em `EPERM`/`EBUSY` no Windows, tentar de novo até 5 vezes com 100 ms; falhou: erro 3. Apagar o `.tmp` em caso de erro.
- Gravar sempre UTF-8 sem BOM e `\n`.

### 6.4 Leitura e validação (casos de borda)
- Arquivo inexistente = registro vazio (não é erro). Arquivo vazio idem.
- Remover BOM (`\uFEFF`) do início; dividir por `/\r?\n/`; ignorar linhas só com espaço.
- Linha que não é JSON: erro 3 `aprendizados.jsonl: linha N não é JSON válido`. Linha com `v` ≠ 1 ou sem `ev`/`id`: erro 3 com o número da linha.
- `validar` confere ainda: ids `criar` únicos e no formato; todo evento aponta para id criado antes dele; transições válidas na ordem (1.4); no máximo um ativo/pendente por chave; `substitui`/`por_id` existem; campos e enums de cada `criar`; filtro de segredo em todo o arquivo; comandos na lista branca. Problemas de conteúdo: código 2 com a lista inteira (não parar no primeiro).
- IDs: a ordem do arquivo manda, não a data; data fora de ordem não é erro.
- Texto: `trim()` em todos os campos; rejeitar campo com quebra de linha em `titulo`, `chave`, `regra`.
- Entrada `--arquivo`: ler com remoção de BOM; JSON inválido: erro 2 com a mensagem do `JSON.parse`.
- Opções repetíveis (`--evidencia`, `--alvo`, `--substitui`) viram listas; opção sem valor ou seguida de outra opção: erro 2 `opção --x sem valor`.
- Lógica em funções exportadas e puras sempre que possível (`lerEventos(arq)`, `dobrar(eventos)`, `validarRegistro(eventos)`, `criar(dir, dados, agora)`, `formatarPendentes(estado)`, `gerarConsolidado(estado, agora)`, `atualizarIndice(textoMemory, linha)`, `similaridade(a, b)`, `acharSegredo(texto)`, `exigeAprovacao(item, todos)`); a CLI só chama. Cada função recebe a pasta como parâmetro; nada lê `process.env` fora de `main()`.

---

## 7. Plano de testes

Rodar cada arquivo isolado: `node --test tests/aprendizados.test.mjs` e `node --test tests/leis.test.mjs` (no Node 24, `node --test tests/` não funciona). **Nenhum teste escreve dentro do repo**: todo teste cria pasta com `fs.mkdtempSync(path.join(os.tmpdir(), ...))` e passa `APRENDIZADOS_DIR`, `APRENDIZADOS_REPO`, `APRENDIZADOS_HOME` e `LEIS_RAIZ` apontando para lá. Teste de CLI usa `spawnSync(process.execPath, [script, ...], { env: {...process.env, ...} })`. Nenhum teste usa rede.

### 7.1 `tests/aprendizados.test.mjs` (substitui o rascunho)
1. `registro inexistente ou vazio vale como vazio e validar sai com 0`
2. `criar gera A001, A002 em sequência e não reutiliza id de revogado`
3. `criar recusa campo obrigatório ausente, enum inválido e chave mal formada (código 2 pela CLI)`
4. `criar recusa titulo repetido sem acento e sem caixa`
5. `mesma chave ativa exige --substitui; com --substitui o antigo vira superado na mesma operação`
6. `regra muito parecida exige --forcar; "nunca X" e "sempre X" não contam como iguais por causa das palavras de polaridade` (confere que polaridade fica no cálculo; o limiar é 0,6)
7. `filtro de segredo recusa e-mail, IP externo, telefone, token=valor e chave longa; aceita 127.0.0.1, commit de 40 hex e sha256 de 64 hex`
8. `comando de verificação fora da lista branca é recusado no add`
9. `exigeAprovacao: processo, papeis, global e substituir ordem-dono exigem; ambiente e bug de projeto não`
10. `transições inválidas são recusadas: aplicar sem aceitar quando exige aprovação, aceitar rejeitado, aceitar sem citação, revogar ordem-dono sem citação do dono`
11. `aplicar provisório permitido quando não exige aprovação e marca semAprovacao`
12. `pendentes não marca nada; marcar-mostrado marca; pendentes seguinte traz só "nenhum novo" ou a linha "Aguardando sua decisão"`
13. `formato de pendentes: no máximo 2 linhas e 320 caracteres por item, rótulos certos`
14. `verificar ausente/presente: passa e falha conforme o regex e o arquivo existir`
15. `verificar comando: código 0 passa, código diferente falha, requer ausente fica pulada; resultado gravado como evento`
16. `verificar rede fica pulada sem --rede` (não chama curl)
17. `verificar sai com 1 quando alguma falha e com 0 quando todas passam ou foram puladas`
18. `consolidar lista só aplicados e verificados, agrupados por categoria e chave, e omite superados, revogados e rejeitados`
19. `consolidar é idempotente (segunda execução não muda o arquivo)`
20. `atualizarIndice cria a linha uma única vez, substitui no lugar e preserva CRLF, LF e ausência de quebra final`
21. `leitura tolera BOM, CRLF e linhas em branco`
22. `linha corrompida dá código 3 com o número da linha; última linha sem quebra impede novo add com código 3`
23. `versão de formato desconhecida dá código 3`
24. `dois processos criando 10 aprendizados cada ao mesmo tempo geram 20 ids únicos e registro válido`
25. `bloqueio recente faz esperar e dá código 3 após o tempo; bloqueio com mais de 30 s é quebrado` (o teste cria o `.lock` e ajusta `mtime` com `fs.utimesSync`)
26. `inicio e gatilho sempre saem com 0, mesmo com registro corrompido`
27. `gatilho imprime o lembrete para "guarde essa regra" e "não pare até concluir" e nada para texto comum`
28. `semente: os 6 aprendizados de base (seção 8.2, num JSON de teste) passam pelo add sem erro e têm chaves distintas`
29. `validar acusa evento para id inexistente e duas pendências com a mesma chave, listando todos os problemas`

### 7.2 `tests/leis.test.mjs` (novo)
1. `importar o módulo não executa comando nem imprime nada`
2. `htmlParaTexto decodifica &uacute; &Aacute; &ccedil; &atilde; &ocirc; &#233; &#xE9; &nbsp; &ndash; e não deixa entidade sobrando`
3. `htmlParaTexto remove script/style e quebra linha em p, br, tr, li`
4. `normalizar remove anotação "(Redação dada pela Lei nº 8.080, de 1990)" e acentos`
5. `normalizarFraca iguala "saúde" e "sa\uFFFDde"`
6. `normalizarFraca NÃO apaga texto comum com "regulamentar", "incluído", "vide"` (regressão de F4)
7. `trecho que vira vazio após normalizar não conta como conferido` (regressão do `[].every`)
8. `conferirEm acha trecho presente, acusa trecho ausente e acusa "achado, mas não na fonte citada"` (normas e apostila de exemplo criadas na pasta temporária)
9. `trecho com "[...]" é conferido por segmentos`
10. `compilar acusa entidade não decodificada` (exportar a função de detecção, ex.: `entidadesSobrando(texto)`, e testá-la diretamente)
11. `CLI conferir sai com 1 quando há divergência` (com `LEIS_RAIZ` temporária)

---

## 8. Plano de implementação

### 8.1 Passos (por arquivo; no máximo 2 Sonnets ao mesmo tempo; um arquivo por Sonnet; sem `git stash`; testes só em pasta temporária)

**Passo 1 (em paralelo, 2 Sonnets)**
- 1A, Sonnet, arquivo `scripts/leis-compilar-e-conferir.mjs`: mudanças 1 a 9 de 5.3. Aceite: `node scripts/leis-compilar-e-conferir.mjs conferir` continua dando 94 conferidos e 0 divergentes nesta máquina e sai com 0; `node -e "import('./scripts/leis-compilar-e-conferir.mjs')"` não lança erro; `compilar` não acusa entidade sobrando nos txt atuais (se acusar, é achado real: relatar, não esconder).
- 1B, Sonnet, arquivo `tests/leis.test.mjs`: testes de 7.2, escritos contra a interface de 5.3 (`htmlParaTexto`, `normalizar`, `normalizarFraca`, `entidadesSobrando`, `conferirEm({dirLeis, dirApostilas, dirTxt})`, variável `LEIS_RAIZ`). Aceite: depois que 1A terminar, `node --test tests/leis.test.mjs` passa; antes de 1A, os testes 6, 7, 10 e 11 falham (provando que pegam os bugs).

**Passo 2 (em paralelo, 2 Sonnets; depois do passo 1)**
- 2A, Sonnet, arquivo `scripts/aprendizados.mjs`: reescrever conforme seções 1 a 6. Aceite: `node scripts/aprendizados.mjs validar` com `APRENDIZADOS_DIR` apontando para pasta vazia sai com 0; `node scripts/aprendizados.mjs` sem comando sai com 2; nenhum arquivo é criado em `curso/`.
- 2B, Sonnet, arquivo `tests/aprendizados.test.mjs`: substituir o rascunho pelos testes de 7.1, contra as funções exportadas listadas em 6.4 e a CLI. Aceite: `node --test tests/aprendizados.test.mjs` passa depois de 2A; nenhum teste grava fora de `os.tmpdir()` (o agente principal confere com `git status` antes e depois: nada novo).

**Passo 3 (agente principal; não é código)**
- Rodar `node --test tests/gerador.test.mjs`, `node --test tests/leis.test.mjs` e `node --test tests/aprendizados.test.mjs`, um de cada vez, lendo o resultado.
- Depois (não junto com os testes): code-review por um Sonnet sobre o diff dos 4 arquivos; mostrar os achados ao dono e o que foi feito com cada um; se houver correção, 2ª rodada sobre o diff das correções (regra global).
- Conferir `git stash list` vazio e ausência de marcadores `<<<<<<<`.

**Passo 4 (agente principal, depois do "aprovado" do dono à redação da seção 8.2)**
- Gravar os JSONs da semente numa pasta do scratchpad (fora do repo) e rodar `add --arquivo` para cada um, na ordem A001..A006.
- `aceitar` cada item que o dono aprovou, com a citação literal; `aplicar` com a nota do que foi editado; editar os `alvos` (anotar ORIGEM.md, ESTADO.md e MEMORY.md, ver 8.2) **antes** de `verificar`.
- `verificar --rede`, `consolidar --copiar-memoria`, `pendentes`, colar na resposta e `marcar-mostrado`.
- Acrescentar ao `CLAUDE.md` do projeto o checklist de 2.2 (4 linhas) e uma linha na seção Layout citando `scripts/aprendizados.mjs` e `tests/leis.test.mjs` (documentação: isenta de code review).

**Passo 5 (só com autorização digitada pelo dono, pergunta Q3)**
- Configurar o hook `SessionStart` (e, se aprovado, `UserPromptSubmit`) em `.claude/settings.json` pela skill `update-config`, depois de conferir o formato na documentação. Aceite: abrir sessão nova e ver o resumo do `inicio` no contexto.

### 8.2 Texto-base das regras iniciais (para o dono aprovar a redação)

| Id | Chave | Categoria / escopo / origem | Regra (texto que passa a valer) | Mudança concreta | Verificações | Exige "aprovado" |
|---|---|---|---|---|---|---|
| A001 | `metodo.normas.compilar-txt` | metodo / projeto / ordem-dono | Para conferir ou citar norma, baixar da fonte oficial, converter o HTML em txt compilado (`scripts/leis-compilar-e-conferir.mjs`) e pesquisar no compilado com `buscar`; não ler página por página no navegador. Norma nova entra no mapa NORMAS do script. | Script corrigido (5.3), `tests/leis.test.mjs`. Alvo: `mem:feedback_metodo_compilar_normas_txt.md`. | `comando node --test tests/leis.test.mjs`; `comando node scripts/leis-compilar-e-conferir.mjs conferir` (requer `repo:fontes/leis/planalto/txt`) | Não pela regra de 1.2 (categoria metodo), mas é ordem do dono: mostrar a redação uma vez |
| A002 | `bug.normas.investigar-antes-de-divergir` | bug / projeto / bug | Quando a conferência acusar divergência, investigar primeiro o próprio processamento (decodificação, entidades HTML, normalização) antes de concluir que a fonte oficial diverge; toda entidade HTML é decodificada antes de comparar. | `compilar` acusa entidade sobrando; testes de regressão (entidades, `normalizarFraca`, trecho vazio). | `comando node --test tests/leis.test.mjs` | Não |
| A003 | `ambiente.rede.estado` | ambiente / projeto / ambiente-mudou | Estado de rede tem data e envelhece: antes de repetir que um site está inacessível ou qual porta usar, testar de novo. Em 24/11/2026 o proxy configurado é 127.0.0.1:3129 (`env` do `~/.claude/settings.json`, não 3130) e o planalto.gov.br respondeu ao curl. | Anotar com data em `fontes/leis/ORIGEM.md`, `ESTADO.md` (linha 16 e item 8) e MEMORY.md (linhas do proxy e "Planalto inacessível"); não apagar o histórico, anotar "superado em 24/11/2026". | `ausente mem:MEMORY.md /127\.0\.0\.1:3130/`; `ausente mem:MEMORY.md /Planalto inacess/i`; `presente repo:fontes/leis/ORIGEM.md /2026-11-24/`; `rede https://www.planalto.gov.br/ccivil_03/leis/l8080.htm 2xx` | Não |
| A004 | `fonte.acesso.anti-robo` | fonte / projeto / metodo-melhor | Verificação anti-robô passiva (página de espera que se resolve sozinha) passa abrindo o site no Chrome (Claude in Chrome) e lendo dali; CAPTCHA ativo (marcar caixa, escolher imagens) é parada obrigatória: não tentar contornar, marcar PENDENTE de download manual e avisar o dono. | Nenhuma de código; regra de comportamento. Exemplo real em ESTADO.md (emenda à LOM nº 55/2026 com CAPTCHA). | nenhuma (não verificável) | Não |
| A005 | `processo.autonomia.ate-concluir` | processo / projeto / correcao-dono | Quando o dono disser "não pare até concluir", seguir até terminar tudo que é possível, sem perguntar "quer que eu siga?" e sem relatório parcial; parar só em bloqueio real (CAPTCHA, fonte inexistente, decisão ou autorização que só o dono dá) e, ao parar, dizer qual é o bloqueio. | Hook `gatilho` (se aprovado) lembra ao ler a frase; reincidência registrada com `reincidir`. Alvo: `mem:feedback_melhoria_recursiva.md`. | nenhuma (não verificável); acompanhar `reincidencias` | Sim |
| A006 | `papeis.modelos.implementacao` | papeis / projeto / correcao-dono | Neste projeto o agente principal não escreve código de funcionalidade: Opus (um por vez) planeja, relata e audita; Sonnet (no máximo 2 ao mesmo tempo, um arquivo cada) implementa e faz code review; o principal coordena, roda testes, verifica, atualiza memória e documentação e faz commit. | Corrigir a contradição do CLAUDE.md (F8): deixar só a regra de 22/11/2026 + máximo 2 Sonnets; no MEMORY.md marcar "Apenas Sonnets" como substituída. Alvos: `repo:CLAUDE.md`, `mem:MEMORY.md`. | `ausente repo:CLAUDE.md /\*\*Só Sonnet\*\*/`; `presente mem:MEMORY.md /Apenas Sonnets.*substitu/i` | Sim |

Observações:
- A redação de A006 só faz sentido depois que o dono confirmar qual regra de modelos vale hoje (F8); a pergunta Q4 cobre isso.
- A003 junta dois fatos do caso 3 numa chave só (os dois são "estado de rede envelheceu"). Se o dono preferir, separar em `ambiente.rede.proxy` e `fonte.planalto.acesso`.
- Os campos `gatilho`, `evidencia` e `aprendi` de cada um: usar o texto dos casos (1) a (6) do pedido, com evidência `arquivo` (os arquivos citados na tabela) e, para A001/A005/A006, `citacao-dono` com a frase do dono que está em `feedback_metodo_compilar_normas_txt.md` e `feedback_melhoria_recursiva.md`.

---

## 9. Riscos e mitigação

| Risco | Como o desenho mitiga |
|---|---|
| Regra ruim vira permanente | Regra de processo/papéis/conteúdo/publicação/global só vale com "aprovado" e citação; a autoadoção fica restrita a fatos técnicos e só pode deixar o agente mais cuidadoso; tudo é revogável com histórico. |
| Ruído para o dono | Bloco curto (2 linhas por item), uma linha quando não há nada, pendências repetidas só como lista de ids e por no máximo 3 lotes; o hook `gatilho` fica em teste e sai se incomodar. |
| "Registrar para constar" sem mudar comportamento | Campo `mudanca` obrigatório; verificações executáveis sempre que possível; contagem de reincidências e `revisar` mandando escalar para hook/teste depois de 2 reincidências. |
| Memória envelhecida contradizendo o registro (F1, F2) | Verificações `ausente`/`presente` ligadas aos textos antigos; checagem de rede como detector de envelhecimento. |
| Inchaço do MEMORY.md e CLAUDE.md | Uma linha no índice; consolidado com orçamento; superadas somem; código nunca edita CLAUDE.md. |
| Contradição entre regras | Uma regra ativa por chave; `substitui` obrigatório; `revisar` agrupa por prefixo. Contradição semântica com chaves diferentes continua possível (dito em 5.5). |
| Vazamento de dado privado | Registro fora do repo público; filtro de segredo/dado pessoal; código no repo sem dados. |
| Dois agentes escrevendo ao mesmo tempo | Bloqueio com arquivo `wx`, anexação dentro do bloqueio, teste de concorrência. |
| Verificação que depende de `fontes/` (fora do git) falhar em outra máquina | `requer` deixa a verificação "pulada", não falha. |
| Comando arbitrário dentro do registro | Lista branca (só `node` + `scripts/` ou `tests/`), execução sem shell. |
| Hook atrapalhar a sessão | `inicio` e `gatilho` sempre saem com 0 e são curtos; sem hook `Stop` bloqueante. |
| Aprovação forjada por outro agente | Só mensagem do próprio dono no chat vale (regra global); o código guarda a citação para conferência posterior. |

---

## 10. Perguntas que só o dono pode decidir

1. **Onde fica o registro?** Recomendo na pasta privada de memória (`~/.claude/projects/.../memory/aprendizados.jsonl`), com cópia em `memoria/` (fora do git), e não em `curso/` (repo público).
2. **Limite de autonomia:** posso adotar sozinho (e só mostrar) correções de fato de ambiente, bugs técnicos e métodos técnicos, deixando processo, papéis, publicação, conteúdo e regras globais para o seu "aprovado"? Recomendo sim.
3. **Hooks:** autoriza configurar em `.claude/settings.json` o hook de início de sessão (recomendo sim) e, em teste por uma semana, o lembrete ao ler frases como "guarde essa regra" / "não pare até concluir" (recomendo sim)? Hook que impede o agente de parar: recomendo não.
4. **Regra de modelos:** qual vale hoje? O CLAUDE.md tem "Só Sonnet (20/11)" e, abaixo, "regra de 22/11/2026: Opus relata/audita (um por vez), Sonnet implementa"; somando a de hoje (máx. 2 Sonnets). Recomendo valer a de 22/11 + máx. 2 Sonnets, e apagar a "Só Sonnet" do CLAUDE.md (A006).
5. **Redação das 6 regras da seção 8.2:** aprova como está? (Responder "aprovo A001..A006" ou indicar o que mudar.) Recomendo aprovar; A003 pode ser separada em duas, se preferir.
6. **Frequência de exibição:** mostrar o bloco de aprendizados no fim de cada lote e na resposta final, com "nenhum novo" quando não houver? Recomendo sim.

---

## Limites deste relatório
- Não testei a rede (porta 3129, Planalto): os fatos de rede vêm do agente principal e do `settings.json`.
- Não conferi na documentação oficial os detalhes de hooks do Claude Code nem o limite de tamanho do MEMORY.md carregado; marquei onde o implementador precisa conferir.
- As medições F4/F5 foram feitas com scripts no scratchpad (fora do repo), reproduzindo a lógica de `conferir`; não executei o próprio comando `conferir`.
- Não sei por que falta o `ORIGEM-planalto.tsv` (F3).
