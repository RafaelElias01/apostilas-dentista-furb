# Resolução das pendências da Apostila 01 (Língua Portuguesa)

- **Arquivo da apostila:** `curso/apostila/portugues.json` (16 lições). Este relatório **não** altera a apostila: traz o texto pronto para outro agente aplicar.
- **Data:** 2026-11-19. Autor: professor-cursinho (Opus).
- **Base:** `curso/auditoria/apostila-01.md` (auditoria anterior), `curso/questoes-anteriores.json` (banco de questões com gabarito oficial), `curso/edital.md` (seções 1.4 e 1.5) e `curso/roteiro-apostilas.md` (linha 226).
- **Cópias de trabalho:** ficaram na pasta temporária `C:\Users\rafae\AppData\Local\Temp\claude\82c20225030dd39a\ee3be31f-cb55-4444-8c70-5ea753b926e5\scratchpad\pendencias-01`. Fora do projeto e sem nada executado.

## 0. Fontes usadas (todas abertas, acesso em 2026-11-19)

| Sigla | Fonte | Endereço |
|---|---|---|
| **AO** | Acordo Ortográfico da Língua Portuguesa (1990), anexo do Decreto 6.583/2008, publicação original na Câmara dos Deputados. O texto do Planalto não abriu desta rede. | https://www2.camara.leg.br/legin/fed/decret/2008/decreto-6583-29-setembro-2008-581372-publicacaooriginal-104147-pe.html |
| **VOLP** | Vocabulário Ortográfico da Língua Portuguesa, da Academia Brasileira de Letras (ABL), página "Busca no Vocabulário" | https://www.academia.org.br/nossa-lingua/busca-no-vocabulario |
| **MRPR** | Manual de Redação da Presidência da República, 3ª edição (2018), cap. 11. Baixei a cópia integral de 189 páginas hospedada pela UFGD. A página oficial de consulta fica no gov.br. | https://files.ufgd.edu.br/arquivos/arquivos/78/PROTOCOLO/Normas%20Internas/Manual%20de%20Reda%C3%A7%C3%A3o%20da%20Presid%C3%AAncia%20da%20Rep%C3%BAblica%20-%203%C2%AA%20edi%C3%A7%C3%A3o,%20revista,%20atualizada%20e%20ampliada.pdf · https://www.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica |
| **CNJ** | Conselho Nacional de Justiça, *Dicas de Português: Sintaxe* (2015), 64 p., biblioteca digital do CNJ | https://bibliotecadigital.cnj.jus.br/bitstream/123456789/184/1/SINTAXE.pdf |
| **PRI** | Dicionário Priberam (dicionário, não é norma; usado só para a origem das palavras) | https://dicionario.priberam.org/ |

Os números de página do MRPR e do CNJ são os impressos no rodapé.

## 1. Lista numerada de tudo o que estava pendente

| # | Onde | Item | Status |
|---|---|---|---|
| 1 | `limiteFonte`, 1º PENDENTE | Gramática de referência a definir | RESOLVIDO (fontes propostas) |
| 2 | `limiteFonte`, 2º PENDENTE | Questões não conferidas contra o PDF | NÃO RESOLVIDO (os PDFs não estão aqui) |
| 3 | L2 `sintaxe`, ponto "“Recomenda-se que…”" | G0190/G0191, análise do "se" e do sujeito | PARCIAL (regra em fonte oficial; a aplicação à frase é dedução) |
| 4 | L7 `crase`, intro e 1ª pegadinha | G0001, PENDENTE de conferir no PDF | NÃO RESOLVIDO (sai do treino) |
| 5 | L7 `crase`, ponto "Quando não há preposição…" | G0280, item I (achado 6 da auditoria) | RESOLVIDO (já aplicado; agora com fonte) |
| 6 | L12 `ortografia`, ponto "X ou CH depois de en-" | encharcar, enchumaçar, enchiqueirar, enchova | PARCIAL (sem VOLP; confirmado em AO e PRI) |
| 7 | L5 `acentuacao`, ponto "O que o Acordo de 1990 tirou" | feiura/baiuca (achado 14, ainda não aplicado) | RESOLVIDO |
| 8 | L16 `sem-questao`, ponto "Produção de texto…" | Se há redação | RESOLVIDO (já aplicado) |
| 9 | L16, ponto "Concordância nominal e verbal" | PENDENTE | RESOLVIDO |
| 10 | L16, ponto "Fonética" | PENDENTE | PARCIAL |
| 11 | L16, ponto "Modalização em textos diversos" | PENDENTE | PARCIAL |
| 12 | L5 `acentuacao`, ponto "Oxítonas e monossílabos" e 1ª pegadinha | "já": achado novo | RESOLVIDO (aviso) |
| 13 | L5 `acentuacao`, ponto "Paroxítonas" | "própria, critério": achado novo | RESOLVIDO (aviso) |
| 14 | L12 `ortografia`, ponto "Hífen" e macete | exceções que faltam: achado novo | RESOLVIDO |
| 15 | L7 `crase`, ponto "Crase proibida" | "à uma hora": achado novo | RESOLVIDO |
| 16 | L7 `crase`, tabela e ponto "Crase obrigatória" | "à noite": achado novo | RESOLVIDO (troca de exemplo) |
| 17 | L7 `crase`, ponto "Crase facultativa" | regra sem fonte | NÃO RESOLVIDO |
| 18 | L10 `regencia`, ponto "Verbos clássicos" | "assistir" (ajudar): achado novo | RESOLVIDO |
| 19 | L4 `coord-subord`, ponto "Objetiva indireta…" | "Lembrei-me de que" (auditoria, seção 7) | PARCIAL |
| 20 | Auditoria, achados 1 a 13 e 15 | Já aplicados no JSON (conferi linha a linha) | RESOLVIDO |
| 21 | Auditoria, seção 7 | Regras de acentuação, hífen, pontuação e colocação | RESOLVIDO (conferidas; veja a seção 3) |

## 2. Cada item: texto pronto, local e fonte

### Item 1. Gramática de referência (`limiteFonte`). RESOLVIDO

**Proposta:** citar quatro fontes **abertas e oficiais**, nenhuma paga: AO, VOLP, MRPR e CNJ. Nenhuma delas é uma gramática completa. Gramáticas como Bechara, Rocha Lima ou Celso Cunha e Lindley Cintra não têm texto aberto legal e **não foram consultadas**. Se o dono quiser citar uma delas, terá de conferir no livro impresso.

**Texto para substituir a frase "PENDENTE: gramática de referência a definir (o dono ainda não escolheu o livro a citar). Dúvidas de grafia devem ser conferidas no VOLP (…)":**
> "Fontes abertas usadas na conferência (acesso em 19/11/2026): Acordo Ortográfico da Língua Portuguesa de 1990, promulgado pelo Decreto 6.583/2008 (texto da Câmara dos Deputados); VOLP, o Vocabulário Ortográfico da Língua Portuguesa, da Academia Brasileira de Letras (busca em academia.org.br); Manual de Redação da Presidência da República, 3ª edição (2018), capítulo 11 (concordância, regência e pontuação); e Conselho Nacional de Justiça, *Dicas de Português: Sintaxe* (2015). Nas dúvidas de grafia, vale o VOLP. O que nenhuma dessas fontes trata é explicação do autor."

O segundo PENDENTE do `limiteFonte` (transcrição das questões) **fica** como está.

### Item 2. Transcrição contra o PDF. NÃO RESOLVIDO
Os PDFs das provas não estão nesta máquina: `fontes/` só tem `leis/`. Nada a mudar.

### Item 3. G0190 e G0191, “Recomenda-se que…”. PARCIAL

**O que o banco mostra:**
- G0190 (2023), afirmativa II: “o sujeito do verbo RECOMENDAR é indeterminado, já o sujeito do verbo CONSUMIR é ‘os adultos’”. Gabarito oficial: “I, II e III” (letra A no caderno BMF; a letra muda conforme o caderno). Preliminar igual ao definitivo.
- G0191 (2023), afirmativa I, mesma frase: “a segunda oração [é] subordinada substantiva objetiva direta”. O gabarito preliminar foi “I, II e III” (letra C no caderno BMF), e o definitivo foi **ANULADA**. O banco não traz o motivo da anulação.

**Fontes (trechos literais):**
- MRPR, 11.7.1, alínea h, p. 69: “verbo apassivado pelo pronome ‘se’ deve concordar com o sujeito que, no caso, está sempre expresso e vem a ser o paciente da ação ou o objeto direto na forma ativa correspondente: Vendem-se apartamentos funcionais…”
- MRPR, 11.7.1, alínea i, p. 70: “verbo transitivo indireto (isto é, que rege preposição) fica na terceira pessoa do singular; o ‘se’, neste caso, não é apassivador, pois verbo transitivo indireto não é apassivável: … Precisa-se de homens corajosos…”
- CNJ, p. 25: “a classificação morfológica do ‘se’ é índice de indeterminação do sujeito. […] serve para indeterminar o sujeito quando ocorre junto com verbos transitivos indiretos […] ou com verbos intransitivos”.
- CNJ, p. 39: “As orações subordinadas substantivas podem ser: subjetivas, objetivas diretas, objetivas indiretas, completivas nominais, predicativas e apositivas.”
- PRI, “recomendar”: “verbo transitivo”. É dicionário, não norma.

**Limite:** nenhuma fonte aberta analisa **esta** frase. A conclusão (o “se” é apassivador e a oração “que os adultos consumam…” é o sujeito) é **dedução** da regra oficial, dita como tal no texto abaixo.

**Local:** L2 `sintaxe`, ponto `"ref": "“Recomenda-se que…”: cuidado com a nomenclatura"`. O texto abaixo substitui o `texto` inteiro e tira o PENDENTE:
> "Em G0190 (2023) a banca deu como correto que, em “Recomenda-se que os adultos consumam 1,5 microgramas de vitamina B12 por dia”, o sujeito de “recomendar” é indeterminado e o de “consumir” é “os adultos”. Grave esse gabarito, mas saiba a regra. O Manual de Redação da Presidência da República (3ª ed., 2018, item 11.7.1, h e i) ensina: com verbo transitivo direto, o “se” é apassivador e o verbo concorda com o sujeito, “que vem a ser o paciente da ação” (“Vendem-se apartamentos” = apartamentos são vendidos). O “se” só indetermina o sujeito com verbo que não é transitivo direto (“Precisa-se de homens”, “Trata-se de questões”). Como “recomendar” é transitivo direto (recomenda-se algo), por essa regra o que é recomendado, a oração “que os adultos consumam…”, seria o sujeito (oração subordinada substantiva subjetiva). A questão irmã, G0191, dizia que essa mesma oração era “objetiva direta”: o gabarito preliminar a deu como correta, e depois a questão foi anulada. Na prova: se a banca repetir literalmente a afirmativa de G0190, lembre do gabarito; em qualquer outra frase com verbo transitivo direto + se, use a regra do Manual."

**Pegadinha G0190 (L2 `pegadinhas`, 3º item):** pode ficar como está.

### Item 4. G0001 (crase, “à” em todas as alternativas). NÃO RESOLVIDO; a questão sai do treino
**O que o banco mostra:** nos 5 cadernos de 2019, as 5 alternativas trazem “à” (“manter à estrutura”, “à proposta”, “desejem à incorporação”, “incrementar à receita”, “à época”). O banco marca `transcricaoSuspeita: true`. O gabarito aponta para o trecho “à época” nos cinco cadernos (B, C, D, C, C). G0002 e G0003 citam o mesmo parágrafo sem acento. Mais do que isso não dá para afirmar sem o PDF.

**Local, L7 `crase`, `intro`:** trocar “ficou fora do treino por suspeita de erro na transcrição das alternativas (PENDENTE: conferir no PDF da prova)” por:
> "ficou fora do treino: no banco, as cinco alternativas aparecem com “à”, o que não combina com o enunciado (provável erro de cópia; o PDF da prova não está disponível para conferir)"

**Local, L7 `pegadinhas`, 1º item:** apagar só a frase final “PENDENTE: conferir G0001 no PDF da prova.” O resto fica. No `cobra`, a citação de G0001 também pode ficar.

### Item 5. G0280, item I. RESOLVIDO (o texto do JSON já está certo)
- CNJ, p. 48: o acento grave vai “na presença da preposição ‘a’ regida por um verbo, ou substantivo ou adjetivo ou em locução adverbial seguida imediatamente por uma palavra que possa ser usada com um artigo definido”. Em “A proporção da minha força… é a mesma”, nada antes de “a proporção” pede preposição, porque é o sujeito no início da frase. Sem preposição, não há crase.
- CNJ, p. 17, na lista de expressões com crase: “à medida que; […] à proporção que”.
- O gabarito oficial é A (II e IV).
- Nada a mudar. Opcional: acrescentar “(CNJ, *Dicas de Português: Sintaxe*, p. 17)” depois de “à proporção que”.

### Item 6. X/CH depois de en-. PARCIAL (falta o VOLP)
- **AO, Base III:** o emprego de ch e x “fundamentalmente se regulam pela história das palavras”. A lista do AO traz “enxofre” entre as palavras com x, e a Base XX separa “en- xame”. Ou seja: “en- + X” é **regra didática**, e a exceção vem da palavra de origem.
- **PRI:** “encharcar [en- + charco + -ar]”; “enchiqueirar: en- + chiqueiro + -ar”; “enchumaçar: Pôr chumaço em” (sem etimologia na página); “enchova [espanhol anchova ou anchoa…] = ANCHOVA”.
- **Não consegui no VOLP:** a busca automática em lote no VOLP foi bloqueada pela permissão desta sessão. Para conferir à mão, basta digitar cada palavra em https://www.academia.org.br/nossa-lingua/busca-no-vocabulario.

**Local:** L12 `ortografia`, ponto “X ou CH depois de en-”. O texto atual pode ficar. Sugiro só acrescentar no fim:
> "A regra é prática: o Acordo de 1990 (Base III) diz que X e CH se distinguem pela história de cada palavra; na dúvida, consulte o VOLP."

### Item 7. feiura e baiuca. RESOLVIDO
- **AO, Base X, 4º:** “Prescinde-se do acento agudo nas vogais tónicas/tônicas grafadas i e u das palavras paroxítonas, quando elas estão precedidas de ditongo: baiuca, boiuno, cauila (var. cauira), cheiinho (de cheio), saiinha (de saia).”
- **AO, Base X, 5º:** “Levam, porém, acento agudo […] quando, precedidas de ditongo, pertencem as palavras oxítonas [assim no texto da Câmara] e estão em posição final ou seguidas de s: Piauí, teiú, teiús, tuiuiú, tuiuiús.”
- **VOLP**, um único registro consultado: “feiura (ú) s.f.”. O “(ú)” só indica a pronúncia, e a grafia não tem acento. A palavra “feiura” **não** aparece no texto do Acordo.

**Local:** L5 `acentuacao`, ponto “O que o Acordo de 1990 tirou”. Acrescentar ao fim do `texto`:
> "Também perderam o acento o i e o u tônicos depois de ditongo nas paroxítonas: baiuca (exemplo do próprio Acordo, Base X) e feiura (grafia do VOLP). Nas oxítonas o acento continua: Piauí, tuiuiú."

**Tabela, linha “Acordo 1990: perdem o acento”:** opcional, acrescentar “i/u depois de ditongo em paroxítona” e “feiura”.

### Item 8. Produção de texto. RESOLVIDO (já aplicado)
- `curso/edital.md`, seção 1.4: “Prova objetiva […] com 40 questões de 5 alternativas e uma só correta [p. 9, item 7.1]” e “Não há prova de títulos”. O resumo do edital no Agrobase (https://www.agrobase.com.br/concursos/?p=274277; fonte secundária) diz “etapa única, composta por Prova Objetiva” e não fala em redação.
- **Limite:** não reabri o PDF do edital, que não está nesta máquina. O texto da L16 já está certo; nada a mudar.

### Item 9. Concordância nominal e verbal (L16). RESOLVIDO
Fonte: MRPR, 11.7, p. 66 a 73 (trechos literais entre aspas no texto). Exemplos de prova: só G0194, do banco.

**Local:** L16 `sem-questao`, ponto “Concordância nominal e verbal”. Novo `texto`:
> "Item do edital, sem questão própria na amostra. Fonte: Manual de Redação da Presidência da República, 3ª ed. (2018), item 11.7. Regra geral: “o verbo concorda com seu sujeito em pessoa e número” (“Os servidores do Ministério concordaram com a proposta”). Casos que mais confundem: (1) “haver” no sentido de existir e “fazer” indicando tempo ficam no singular e passam isso ao auxiliar: “Se houver dúvidas”, “Faz cinco anos”, “Deve haver soluções” (e não “devem haver”). (2) Com “se” apassivador o verbo concorda com o sujeito (“Vendem-se apartamentos”); com verbo transitivo indireto fica no singular (“Precisa-se de homens”, “Trata-se de questões”). (3) “A maioria de”, “grande parte de” + plural: singular ou plural (“A maioria dos condenados acabou (ou acabaram)…”). (4) O infinitivo não se flexiona quando forma locução com outro verbo do mesmo sujeito (“Queremos destacar”). Concordância nominal: o adjetivo concorda em gênero e número com o substantivo; “anexo” e “incluso” também (“Vão anexos os pareceres”). Na prova: em G0194 (2023), a banca deu como erradas as frases “Dez milhões de brasileiros […] tem osteoporose” (o certo é “têm”) e “só passaram a serem capazes” (o certo é “a ser”)."

Conferência dos exemplos de G0194: as alternativas B e C trazem esses trechos. O gabarito é D, então B e C estão erradas. O motivo de C está na regra do MRPR, alínea m, p. 72: “O infinitivo é não flexionável nas combinações com outro verbo de um só e mesmo sujeito”.

### Item 10. Fonética (L16). PARCIAL
Fonte: AO, Base XX (divisão silábica) e Base IX. **Não achei** o texto oficial da Nomenclatura Gramatical Brasileira (Portaria 36/1959) aberto. Por isso as definições de “fonema” e “letra” **não** entram.

**Novo `texto`:**
> "Item do edital, sem questão na amostra. O que o Acordo de 1990 confirma (Base XX, divisão silábica): os ditongos decrescentes nunca se separam (“cadei-ra”, “ora-ção”); vogais em hiato se separam (“do-er”, “vo-os”, “ala-úde”); há também ditongos crescentes em fim de palavra (Base IX: “calúnia”, “espécie”, “mágoa”). Grupos de letras que se separam: rr e ss (“cor-roer”, “as-segurar”), sc (“nas-cer”, “des-cer”), xc (“ex-citar”). Ficam juntos: ch, lh, nh (“ca-cho”, “ma-lha”, “ma-nha”) e gu, qu antes da vogal (“ne-gue”, “pe-que”, “á-gua”). Isso ajuda também em acentuação (hiato × ditongo). Definições de fonema e letra: estude na gramática (não conferidas em fonte oficial aberta)."

### Item 11. Modalização (L16). PARCIAL
Fonte: CNJ, p. 50, “Verbos modais”. Trechos literais: “verbos que atribuem certa característica ao verbo principal, como obrigação ou possibilidade”; “verbos como ‘deve, precisar, ter de’ indicam obrigação […] Já o verbo ‘poder’ indica capacidade, permissão ou simples possibilidade”; “a noção de obrigatoriedade é muito forte, embora possa ser amenizada […] com o uso de ‘deveria’”.

**Limite:** o CNJ não usa a palavra “modalização”. Ligar “modalização” (termo do edital) aos verbos modais é do autor. Advérbios como “talvez” e “certamente” não foram conferidos e não entram.

**Novo `texto`:**
> "Item do edital, sem questão na amostra. Modalizar é marcar no texto o grau de certeza, obrigação ou possibilidade de quem escreve; um recurso são os verbos modais (explicação do autor). Pelo CNJ (*Dicas de Português: Sintaxe*, p. 50): “deve”, “precisar”, “ter de” indicam obrigação; “poder” indica “capacidade, permissão ou simples possibilidade”; “deveria” ameniza a obrigação. Compare: “Você deve trazer o material” (obrigação) × “Você pode trazer o material?” (pedido, possibilidade)."

### Item 12. “já”: oxítona ou monossílabo? RESOLVIDO (aviso; achado novo, MÉDIO)
- **AO, Base VIII, 1º, a:** “As palavras oxítonas terminadas nas vogais tónicas/tônicas abertas grafadas -a, -e ou -o, seguidas ou não de -s: está, estás, já, olá; até, é, és […] só(s).” O próprio Acordo põe “já” e “só” entre os exemplos de **oxítonas**.
- **Banco:** em G0004 só a alternativa “possuíam – hiato I tônico” é correta. Ali “já – acentua-se a oxítona terminada em ‘A’” foi dada como errada.
- **Risco:** a apostila diz que chamar “já” de oxítona é errado, o que contraria o texto do Acordo.

**Local:** L5, ponto “Oxítonas e monossílabos”. Trocar a última frase (“Em G0004, ‘já’ se acentua por ser monossílabo tônico terminado em A; dizer que é ‘oxítona terminada em A’ foi a alternativa errada.”) por:
> "Em G0004 a única resposta certa foi “possuíam – hiato I tônico”, e “já – oxítona terminada em A” não foi aceita: na prova da FURB, chame “já” de monossílabo tônico. Curiosidade: o texto do Acordo de 1990 (Base VIII) lista “já” e “só” entre os exemplos de oxítonas, por isso não decore que essa classificação é “errada”; decore que a banca quis a regra dos monossílabos."

**Pegadinha (L5 `pegadinhas`, 1º item):** trocar “(é monossílabo tônico)” por “(para a banca, é monossílabo tônico)”.

### Item 13. “própria, critério”: paroxítona em ditongo ou proparoxítona aparente? RESOLVIDO (aviso; achado novo, MÉDIO)
- **AO, Base XI, 1º, b:** acentuam-se “As chamadas proparoxítonas aparentes, isto é, que […] terminam por seqüências vocálicas pós-tónicas/pós-tônicas praticamente consideradas como ditongos crescentes (-ea, -eo, -ia, -ie, -io, -oa, -ua, -uo, etc.): […] enciclopédia, glória; barbárie, série; lírio, prélio…”
- **AO, Base IX, 2º:** as paroxítonas acentuadas por terminação são as em -l, -n, -r, -x, -ps, e as em -ã(s), -ão(s), -ei(s), -i(s), -um, -uns, -us.
- **Banco:** G0278 (2025, ANULADA) tinha o item “‘urgência’ e ‘próprio’ são paroxítonas terminadas em ditongo oral”. O motivo da anulação não está no banco. **Não afirme** que foi por isso.

**Local:** L5, ponto “Paroxítonas”. Acrescentar ao fim:
> "Atenção à nomenclatura: a gramática escolar chama “própria”, “critério”, “história” e “série” de paroxítonas terminadas em ditongo; o texto do Acordo de 1990 (Base XI) as chama de “proparoxítonas aparentes”. As duas explicações levam ao mesmo acento. A questão de 2025 que usou essa classificação (G0278) foi anulada; o motivo não é conhecido."

### Item 14. Hífen: exceções que faltam. RESOLVIDO (achado novo, BAIXO)
- **AO, Base XVI, 1º, d:** hífen “com os prefixos hiper-, inter- e super-, quando combinados com elementos iniciados por r: hiper-requintado, inter-resistente, super-revista”.
- **AO, Base XVI, 1º, f:** “pós-, pré- e pró- quando o segundo elemento tem vida à parte […]: pós-graduação […] (mas pospor); pré-escolar, pré-natal (mas prever); pró-africano […] (mas promover)”.
- **AO, Base XVI, 2º, a:** “prefixo ou falso prefixo termina em vogal e o segundo elemento começa por r ou s, devendo estas consoantes duplicar-se”.
- **AO, Obs. da Base XVI, 1º, b:** “Nas formações com o prefixo co-, este aglutina-se em geral com o segundo elemento mesmo quando iniciado por o: coobrigação, coocupante, coordenar, cooperação, cooperar”.

**Local:** L12, ponto “Hífen com prefixo”. Trocar “Com r ou s, dobra-se a consoante (contrassenso, antirrábico, ultrassom).” por:
> "Prefixo terminado em vogal + palavra com r ou s: junta e dobra a consoante (contrassenso, antirrábico, ultrassom). Mas hiper-, inter- e super- + r levam hífen (super-revista, inter-resistente)."

E trocar “Os prefixos co- e re- juntam (coautor, reeleição).” por:
> "O prefixo co- junta até antes de o (coautor, cooperar, coordenar)."

Motivo: “re-” não aparece no texto do Acordo. A grafia “reeleição” não foi conferida no VOLP.

**Macete:** trocar “É ex-, vice-, pós-, pré-, pró-?” por “É ex-, vice- ou pós-, pré-, pró- tônicos (pós-graduação, mas prever)?”.

### Item 15. “à uma hora”. RESOLVIDO (achado novo, BAIXO)
- **CNJ, p. 17:** “Não tenhamos dúvidas em crasear o ‘a’ que antecede o ‘uma’ da frase ‘a uma hora’; não se trata de um indefinido, mas do numeral uma, que admite determinação. Ex.: Ele estuda da uma às cinco.”

**Local:** L7, ponto “Crase proibida”. Depois de “de ‘uma’ (‘assisti a uma peça’)”, acrescentar:
> "(exceção: na hora, “à uma hora”, porque aí “uma” é numeral)"

### Item 16. “à noite” como exemplo. RESOLVIDO (troca de exemplo, BAIXO)
- **CNJ, p. 17:** “Em A noite – segundo Napoleão Mendes, não existem dois aa (preposição mais artigo).” Ou seja: há gramático, citado por fonte oficial, que não põe crase aí.
- A lista do CNJ (p. 17) traz, sem polêmica: “à época”, “à medida que”, “à procura”, “à direita”, “à força”. E o MRPR (p. 79) escreve “Às vezes, procura assistência”.

**Local:** L7, ponto “Crase obrigatória”. Trocar “à noite, às vezes, à direita, às claras, à custa de, à procura de, à medida que” por:
> "à época, às vezes, à direita, às claras, à custa de, à procura de, à medida que"

Na tabela “Crase: com ou sem?”, linha “Locução adverbial feminina”, trocar “à época, às claras, à noite” por “à época, às claras, às vezes”.

### Item 17. Crase facultativa (possessivo e nome de mulher). NÃO RESOLVIDO
O CNJ, p. 48, só dá “Enviei à sua casa o cartão” como correto e não diz que é facultativo. Não achei fonte oficial aberta. A regra é a da gramática tradicional; mantenha-a e acrescente:
> "(regra da gramática tradicional; não conferida em fonte oficial aberta)"

O ponto também não tem questão da banca.

### Item 18. “Assistir” no sentido de ajudar. RESOLVIDO (achado novo, BAIXO)
- **MRPR, p. 74:** “Assistir: no sentido de auxiliar, ajudar, socorrer, pode ser transitivo direto ou indireto: Procuraremos assistir os/aos atingidos pela seca”. “No sentido de estar presente, comparecer, ver é transitivo indireto, regendo a preposição ‘a’”.
- **MRPR, p. 76 e p. 74:** confirmam “Preferir uma coisa (preferi-la) a outra (evite: preferir uma coisa do que outra)”, “obedecer a” e “aspirar”, como estão no JSON.

**Local:** L10 `regencia`, ponto “Verbos clássicos”. Trocar “assistir o paciente (ajudar) é transitivo direto.” por:
> "assistir o paciente ou ao paciente (ajudar) aceita as duas formas (Manual de Redação da Presidência, 11.8.1)."

“Chegar e ir pedem a” e “esquecer/esquecer-se de” ficam **não conferidos** (não estão no MRPR).

### Item 19. “Lembrei-me de que”. PARCIAL
O PRI traz “lembrar”, verbo pronominal: “Ter lembrança de pessoa ou coisa”. É dicionário, não norma. Nem o MRPR nem o CNJ tratam disso. O texto atual (forma pronominal) é a opção segura: manter.

### Item 20. Achados 1 a 13 e 15 da auditoria. RESOLVIDO
Conferi no JSON que já estão aplicados: `comoUsar[5]` (quatro questões em 2025), linhas 47, 48, 73, 106, 206, 308, 310, 363, 381, 524, 559, 576 e 672. Falta só o achado 14, que está no item 7 acima.

### Item 21. Regras conferidas e sem mudança (seção 7 da auditoria)
- **Correto pelo AO:** acentuação das oxítonas em -a, -e, -o, -em, -ens (Base VIII); hiato i/u “excetuando o caso de s”, e sem acento antes de nh, l, m, n, r, z (Base X, 1º e 2º: “bainha, moinho, rainha… ruim… juiz”); éi/ói em paroxítona sem acento (Base IX, 3º: “assembleia… ideia… heroico”); oo e ee (Base IX, 7º e 8º: “creem, deem… leem… veem”, “enjoo… voo”); diferenciais pára/pelo/polo extintos (Base IX, 9º); “pôde” obrigatório e “fôrma” facultativo; “pôr” mantido (Base VIII); “têm”, “mantêm”, “convêm” (Base VIII/IX); trema suprimido (Base XIV); hífen com h e com vogal igual (Base XVI, 1º, a e b: “anti-higiénico/anti-higiênico”, “micro-onda”); vogais diferentes juntam (Base XVI, 2º, b: “autoestrada… extraescolar”).
- **Correto pelo MRPR (p. 78 e 79):** vírgula proibida entre sujeito e verbo (“constitui erro usar a vírgula entre termos que mantêm entre si estreita ligação sintática – por exemplo, entre sujeito e verbo”); conjunção intercalada entre vírgulas; aposto, vocativo e adjetiva explicativa entre vírgulas.
- **Correto pelo CNJ (p. 16):** “iniciar frases com pronomes átonos não é lícito numa conversação formal”.
- **Correto pelo CNJ (p. 17 e 48):** crase antes de aquela e proibida antes de masculino (“Pagamento a prazo”), de verbo, de pronome pessoal e em “cara a cara”.

## 3. O que continua PENDENTE e por quê
1. **Transcrição das questões e G0001:** os PDFs das provas não estão nesta máquina. G0001 sai do treino.
2. **VOLP para encharcar, enchumaçar, enchiqueirar, enchova e reeleição:** a consulta automática em lote ao VOLP foi negada pela permissão da sessão. Consegui um único registro (feiura). Resolver à mão é rápido: digitar cada palavra na busca da ABL.
3. **Crase facultativa** (possessivo e nome de mulher): não achei fonte oficial aberta.
4. **Fonética (fonema × letra) e modalização por advérbios:** não achei a NGB nem outra fonte oficial aberta.
5. **“Recomenda-se que”:** nenhuma fonte analisa a frase exata; a aplicação é dedução da regra do MRPR.
6. **Regência de chegar/ir e de esquecer-se:** sem fonte oficial aberta conferida.
7. **Nota no roteiro:** `curso/roteiro-apostilas.md`, linha 226, ainda diz “Fonte de conteúdo a definir”. Atualizar com as quatro fontes do item 1 se o dono aprovar.

## 4. Fontes abertas recomendadas ao aluno
- **Dúvida de grafia:** VOLP da ABL, https://www.academia.org.br/nossa-lingua/busca-no-vocabulario
- **Regras de acento e hífen:** texto do Acordo de 1990 (Bases VIII a XI e XVI), https://www2.camara.leg.br/legin/fed/decret/2008/decreto-6583-29-setembro-2008-581372-publicacaooriginal-104147-pe.html
- **Concordância, regência e vírgula:** Manual de Redação da Presidência da República, 3ª ed. (2018), cap. 11, https://www.gov.br/pt-br/servicos/consultar-o-manual-de-redacao-da-presidencia-da-republica
- **Crase, sujeito, colocação e verbos modais:** CNJ, *Dicas de Português: Sintaxe* (2015), https://bibliotecadigital.cnj.jus.br/bitstream/123456789/184/1/SINTAXE.pdf

## 5. Riscos
- O MRPR foi lido numa cópia hospedada pela UFGD (189 páginas, 3ª edição de 2018), e não no PDF do Planalto, que não abriu desta rede.
- O AO foi lido na publicação original da Câmara. Ali o texto tem erros de digitação (por exemplo “tóncias”, “comtrassenha”), mas os trechos citados batem com as bases.
- O CNJ é uma cartilha institucional de 2015, não uma gramática; em “a noite” ele cita um gramático (Napoleão Mendes de Almeida).
- O PRI é um dicionário de Portugal e serve só para a origem das palavras.

## 6. Propostas de memória (para o agente principal gravar)
- 2026-11-19 · O texto do Acordo de 1990 (Base VIII) lista “já” e “só” como oxítonas, e a Base XI chama “história/série” de “proparoxítonas aparentes” · antes de dizer que a classificação de uma alternativa é “errada”, ler a Base do Acordo; quando a banca diverge, ensinar o gabarito e avisar a outra nomenclatura.
- 2026-11-19 · Fontes oficiais abertas de gramática que funcionam: AO na Câmara (o Planalto não abre), MRPR 3ª ed. (cap. 11) e CNJ *Dicas de Português* · usar essas no `limiteFonte` de apostila de Português no lugar de “gramática a definir”.
