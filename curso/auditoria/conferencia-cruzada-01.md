# Conferência cruzada da Apostila 01 (Língua Portuguesa)

- Data: 2026-11-20. Conferidor: Sonnet independente (segunda conferência). Não editei a apostila.
- Arquivo conferido: `curso/apostila/portugues.json`. Relatório de origem: `curso/auditoria/resolucao-pendencias-01.md`.
- Fontes que abri eu mesmo (acesso em 2026-11-19/20):
  - **AO** = Acordo Ortográfico 1990, Decreto 6.583/2008, texto da Câmara: https://www2.camara.leg.br/legin/fed/decret/2008/decreto-6583-29-setembro-2008-581372-publicacaooriginal-104147-pe.html
  - **MRPR** = Manual de Redação da Presidência, 3ª ed., cópia UFGD (PDF baixado e lido com pdftotext): https://files.ufgd.edu.br/arquivos/arquivos/78/PROTOCOLO/Normas%20Internas/Manual%20de%20Reda%C3%A7%C3%A3o%20da%20Presid%C3%AAncia%20da%20Rep%C3%BAblica%20-%203%C2%AA%20edi%C3%A7%C3%A3o,%20revista,%20atualizada%20e%20ampliada.pdf
  - **CNJ** = Dicas de Português: Sintaxe (2015): https://bibliotecadigital.cnj.jus.br/bitstream/123456789/184/1/SINTAXE.pdf
  - **VOLP** = ABL. A tela de busca é carregada por script e o WebFetch só vê "Nenhum resultado". Usei o próprio serviço que a página chama (GET `https://www.academia.org.br/ajax/abl/buscar-palavras?form=vocabulario&palavra=...`), um verbete por vez.
  - **Banco de questões**: `curso/questoes-anteriores.json` (campo `grupo`).
- Arquivos baixados ficaram em `C:\Users\rafae\AppData\Local\Temp\claude\82c20225030dd39a\ee3be31f-cb55-4444-8c70-5ea753b926e5\scratchpad\conferencia-01`. Nada foi executado.

## Tabela de vereditos

| # | Afirmação (lição / ponto) | Veredito | Fonte (trecho literal curto) | Correção proposta |
|---|---|---|---|---|
| 1 | `limiteFonte`: AO promulgado pelo Decreto 6.583/2008, texto da Câmara | CONFIRMADA | URL do AO acima: "DECRETO Nº 6.583, DE 29 DE SETEMBRO DE 2008" | nenhuma |
| 2 | `limiteFonte`: MRPR 3ª ed. 2018, cap. 11 (concordância, regência, pontuação) | CONFIRMADA | Índice do PDF: "11.7.1 Concordância verbal", "11.8.1 Regência de alguns verbos de uso frequente" | nenhuma |
| 3 | `limiteFonte`: CNJ, Dicas de Português: Sintaxe (2015) | CONFIRMADA (ano e título; ano não conferi na capa) | PDF abre; rodapé "Dicas de Português / SINTAXE" | nenhuma |
| 4 | `limiteFonte`: "VOLP, busca em academia.org.br" existe e vale nas dúvidas de grafia | CONFIRMADA | Serviço da ABL respondeu: "feiura (ú) s.f.", "encharcar v." | nenhuma |
| 5 | L2 "Recomenda-se que…": MRPR 11.7.1 alínea h, "se" apassivador, "vem a ser o paciente da ação"; exemplo "Vendem-se apartamentos" | CONFIRMADA | MRPR 11.7.1 h: "verbo apassivado pelo pronome “se” deve concordar com o sujeito que, no caso, está sempre expresso e vem a ser o paciente da ação"; "Vendem-se apartamentos funcionais" | nenhuma |
| 6 | L2: alínea i, "Precisa-se de homens", "Trata-se de questões" (singular, "se" não apassivador) | CONFIRMADA | MRPR 11.7.1 i: "verbo transitivo indireto ... fica na terceira pessoa do singular"; "Precisa-se de homens corajosos"; "Trata-se de questões preliminares" | nenhuma |
| 7 | L2: "O “se” só indetermina o sujeito com verbo que não é transitivo direto" | CONFIRMADA com ressalva | CNJ p. 25-26: "indeterminar o sujeito quando ocorre junto com verbos transitivos indiretos ... ou com verbos intransitivos". O MRPR só trata do transitivo indireto. A palavra "só" é do autor | Sugestão (opcional): trocar por "O “se” indetermina o sujeito com verbo transitivo indireto ou intransitivo (CNJ, p. 25-26)" |
| 8 | L2: "recomendar" é transitivo direto, então a oração "que os adultos consumam…" seria o sujeito (subjetiva) | NÃO CONFIRMADA | Nenhuma fonte aberta analisa a frase; é dedução. A apostila já avisa isso no texto ("dedução da regra do Manual ... (a conferir)"). Não consegui fonte para "recomendar = transitivo direto" (só Priberam, dicionário) | Manter o aviso. Não está contradizendo o gabarito (ver item 33) |
| 9 | L2: G0190 (2023) deu como correto "sujeito de recomendar é indeterminado"; G0191 foi ANULADA, preliminar "objetiva direta" | CONFIRMADA | Banco: G0190 gabarito A = "I, II e III" nos cadernos conferidos (BMF); afirmativa II diz "o sujeito do verbo RECOMENDAR é indeterminado". G0191: gabaritoOficial "ANULADA", preliminar C = "I, II e III", afirmativa I "objetiva direta" | nenhuma |
| 10 | L5: Base X 4º: i/u tônicos depois de ditongo em paroxítona perdem o acento; exemplo "baiuca" | CONFIRMADA | AO Base X 4º: "Prescinde-se do acento agudo nas vogais tónicas/tônicas grafadas i e u das palavras paroxítonas, quando elas estão precedidas de ditongo: baiuca, boiuno, cauila..., cheiinho, saiinha" | nenhuma |
| 11 | L5: "feiura (grafia do VOLP)" | CONFIRMADA | VOLP: "feiura (ú) s.f." e "baiuca (ú) s.f." (sem acento na grafia; o "(ú)" indica a pronúncia) | nenhuma |
| 12 | L5: "Nas oxítonas o acento continua: Piauí, tuiuiú" | CONFIRMADA | AO Base X 5º: "Levam, porém, acento agudo as vogais tónicas/tônicas grafadas i e u quando, precedidas de ditongo, pertencem as palavras oxítonas e estão em posição final ou seguidas de s: Piauí, teiú, teiús, tuiuiú, tuiuiús" | nenhuma |
| 13 | L5: "já" e "só" listadas como oxítonas no Acordo (Base VIII) | CONFIRMADA | AO Base VIII 1º a: "As palavras oxítonas terminadas nas vogais tónicas/tônicas abertas grafadas -a, -e ou -o, seguidas ou não de -s: está, estás, já, olá; até, é, és...; ... só(s)" | nenhuma |
| 14 | L5/G0004: só "possuíam – hiato I tônico" correta; "já – oxítona terminada em A" não aceita | CONFIRMADA | Banco G0004: alternativas "já – acentua-se a oxítona terminada em “A”" e "possuíam – acentua-se o hiato “I” tônico"; gabarito oficial dos 5 cadernos aponta a alternativa de "possuíam" (caderno B: B) | nenhuma |
| 15 | L5: "história", "série" = "proparoxítonas aparentes" no Acordo (Base XI) | CONFIRMADA | AO Base XI 1º b: "As chamadas proparoxítonas aparentes ... terminam por seqüências vocálicas pós-tónicas ... -ia, -ie, -io ...: enciclopédia, glória; barbárie, série; lírio, prélio" | nenhuma |
| 16 | L5: "própria" e "critério" também nesse grupo | CONFIRMADA por dedução direta | Mesma regra: terminações -ia / -io em palavra de vogal tônica aberta. "própria" e "critério" não são listadas nominalmente, mas "-ia, -io" e "lírio, prélio" cobrem | nenhuma |
| 17 | L5: G0278 (2025) foi ANULADA; motivo não conhecido | CONFIRMADA | Banco: G0278 gabaritoOficial "ANULADA"; a 3ª afirmativa diz "urgência e próprio são paroxítonas terminadas em ditongo oral" | nenhuma |
| 18 | L12: Base III: X e CH "se regulam pela história das palavras" | CONFIRMADA | AO Base III: "os seus empregos, que fundamentalmente se regulam pela história das palavras" | nenhuma |
| 19 | L12: lista de exceções com CH: encher, preencher, enchente, enchimento, preenchimento, encharcar, enchiqueirar | CONFIRMADA | VOLP: "encher v.", "preencher v.", "enchente", "enchimento s.m.", "encharcar v.", "enchiqueirar v." existem com CH. Etimologia (de cheio, charco, chiqueiro) é de dicionário, não do VOLP | nenhuma |
| 20 | L12: "enchumaçar (de chumaço)" | CONFIRMADA (grafia) | VOLP: "enchumaçar v." e "chumaço s.m." (a 1ª busca falhou por erro de acento do meu comando; refeita com UTF-8) | nenhuma |
| 21 | L12: "também enchova" (listada como exceção ao X) | DIVERGENTE (parcial) | VOLP: "enchova (ô) s.f. "peixe"; cf. enxova" e "enxova s.f. "prisão"; cf. enchova". As duas grafias existem, com sentidos diferentes: enchova é o peixe | Trocar "e também enchova" por "e também enchova (o peixe; já enxova, com X, significa “prisão”)" |
| 22 | L12: "enxaqueca, enxurrada, enxame, enxergar, enxoval, enxugar" com X | CONFIRMADA (enxaqueca, enxoval); demais não consultei | VOLP: "enxaqueca s.f.", "enxoval s.m."; AO Base IV da lista de X inclui "enxofre". Gabarito G0334 = C ("enxergar, enxoval, enxugar") | nenhuma |
| 23 | L12/G0334: gabarito C e justificativa (preencher, enchente, encharcar erradas com X) | CONFIRMADA | Banco G0334 gabarito C; alternativas A, B, D, E contêm encher/preencher/preenchimento/enchente/encharcar | nenhuma |
| 24 | L12 hífen: hiper-, inter-, super- + r levam hífen (super-revista, inter-resistente) | CONFIRMADA | AO Base XVI 1º d: "com os prefixos hiper-, inter- e super-, quando combinados com elementos iniciados por r: hiper-requintado, inter-resistente, super-revista" | nenhuma |
| 25 | L12: prefixo terminado em vogal + r/s: junta e dobra (contrassenso, antirrábico, ultrassom) | CONFIRMADA (regra); exemplos de VOLP não conferidos | AO Base XVI 2º a: "o prefixo ou falso prefixo termina em vogal e o segundo elemento começa por r ou s, devendo estas consoantes duplicar-se" | nenhuma |
| 26 | L12: "O prefixo co- junta até antes de o (coautor, cooperar, coordenar)" | CONFIRMADA | AO Base XVI, Obs. do 1º b: "Nas formações com o prefixo co-, este aglutina-se em geral com o segundo elemento mesmo quando iniciado por o: coobrigação, coocupante, coordenar, cooperação, cooperar" ("coautor" não está no Acordo; é a regra geral de aglutinação, e G0010 gabarito B "coautor – autoexame") | nenhuma |
| 27 | L12 macete: "pós-, pré-, pró- tônicos (pós-graduação, mas prever)" | CONFIRMADA | AO Base XVI 1º f: "pós-, pré- e pró- quando o segundo elemento tem vida à parte: pós-graduação ... (mas pospor); pré-escolar, pré-natal (mas prever); pró-africano (mas promover)" | nenhuma |
| 28 | L12: hífen antes de h e com mesma vogal (anti-higiênico, anti-inflamatório, micro-ondas) | CONFIRMADA | AO Base XVI 1º a e b: "anti-higiênico", "micro-onda", "arqui-irmandade" etc. G0010 gabarito B (coautor – autoexame) exclui "antiinflamatório – microondas" | nenhuma |
| 29 | L7: "à uma hora" (exceção: numeral) | CONFIRMADA | CNJ p. 17: "Não tenhamos dúvidas em crasear o “a” que antecede o “uma” da frase “a uma hora”; não se trata de um indefinido, mas do numeral uma" | nenhuma |
| 30 | L7: "à proporção que" tem crase (CNJ p. 17) e G0280 item I sem crase por ser sujeito | CONFIRMADA | CNJ p. 17, lista: "à maneira de; à proporção que; à disposição"; CNJ p. 48: acento grave "na presença da preposição “a” regida por um verbo, ou substantivo ... em locução adverbial seguida imediatamente por uma palavra..." | nenhuma |
| 31 | L7: lista "à época, às vezes, à direita, às claras, à custa de, à procura de, à medida que" | CONFIRMADA | CNJ p. 17: "à época", "à direita", "à procura", "à medida que"; "às vezes" no MRPR (conforme o relatório; eu não reabri a página). "às claras" e "à custa" vêm do próprio G0280 | nenhuma |
| 32 | L7: "à noite" foi retirado | CONFIRMADA (nada restou) | Busca por "à noite" no JSON: 0 ocorrências | nenhuma |
| 33 | L7 "Crase facultativa" (possessivo, nome de mulher) | NÃO CONFIRMADA | CNJ p. 48 só traz "Enviei à sua casa o cartão" como correto; não diz que é facultativo. O JSON não tem o aviso "não conferida em fonte oficial aberta" que o relatório sugeriu (item 17 não foi aplicado) | Acrescentar ao fim do `texto` do ponto: "(regra da gramática tradicional; não conferida em fonte oficial aberta)" |
| 34 | L10: "assistir o paciente ou ao paciente (ajudar) aceita as duas formas (MRPR 11.8.1)" | CONFIRMADA | MRPR 11.8.1: "Assistir: no sentido de auxiliar, ajudar, socorrer, pode ser transitivo direto ou indireto: Procuraremos assistir os/aos atingidos pela seca" | nenhuma |
| 35 | L10: "Chegar e ir pedem a"; "esquecer / esquecer-se de" | NÃO CONFIRMADA | Não estão no MRPR (busca no texto só trouxe "assistir", "aspirar"); não achei outra fonte oficial aberta | Marcar "(não conferido em fonte oficial aberta)" ou deixar como regra de gramática |
| 36 | L10: "Aspirar a (desejar)", "preferir a" | CONFIRMADA | MRPR 11.8.1: "No sentido de desejar ardentemente, de pretender, é transitivo indireto, regendo a preposição “a”: Aspirar a um cargo" | nenhuma |
| 37 | L16 concordância: regra geral "o verbo concorda com seu sujeito em pessoa e número"; exemplo "Os servidores do Ministério concordaram com a proposta" | CONFIRMADA | MRPR 11.7.1: "Regra geral: o verbo concorda com seu sujeito em pessoa e número"; exemplo idêntico | nenhuma |
| 38 | L16: haver (existir) e fazer (tempo) no singular, e passam ao auxiliar; "Se houver dúvidas", "Faz cinco anos", "Deve haver soluções" | CONFIRMADA | MRPR 11.7.1: "Certo: Se houver dúvidas, favor perguntar."; "Certo: Faz cinco anos que não vou a Brasília."; "Certo: Deve haver soluções urgentes" | nenhuma |
| 39 | L16: "A maioria de / grande parte de + plural: singular ou plural" | CONFIRMADA | MRPR 11.7.1 j: "A maioria dos condenados acabou (ou acabaram) por confessar sua culpa." | nenhuma |
| 40 | L16: infinitivo não se flexiona em locução (Queremos destacar) | CONFIRMADA | MRPR 11.7.1: "O infinitivo é não flexionável nas combinações com outro verbo de um só e mesmo sujeito ... Queremos (ou precisamos) destacar alguns pormenores." | nenhuma |
| 41 | L16: "anexo" e "incluso" concordam (Vão anexos os pareceres) | CONFIRMADA | MRPR: "anexo, incluso, leso: como adjetivos, concordam com o substantivo em gênero e número: Vão anexos os pareceres da Consultoria Jurídica." | nenhuma |
| 42 | L16: G0194 (2023): erradas "tem osteoporose" (certo "têm") e "a serem" (certo "a ser"); gabarito D | CONFIRMADA | Banco G0194: gabarito D (alternativa de pontuação "inteiramente correta"); B e C trazem "tem osteoporose" e "só passaram a serem capazes". Apoio extra: CNJ p. 17: "Sempre que o infinitivo vier antecedido de preposição, a regra deve ser usar o singular ... a ser tratados" | nenhuma |
| 43 | L16 fonética: ditongos decrescentes nunca se separam (cadei-ra, ora-ção); hiatos se separam (do-er, vo-os, ala-úde) | CONFIRMADA | AO Base XX 4º: "as que pertencem a ditongos deste tipo nunca se separam: ai- roso, cadei- ra, insti- tui, ora- ção..."; "ala- úde, ... do- er, flu- idez, perdo- as, vo- os" | nenhuma |
| 44 | L16 fonética: rr, ss, sc, xc se separam; ch, lh, nh ficam juntos; gu/qu antes de vogal juntos | CONFIRMADA | AO Base XX: "cor- roer", "as- segurar", "des- cer", "nas- cer", "ex- citar"; abertura: "ca-cho, lha-no, ma-lha, ma-nha"; 5º: "ne- gue ... pe- que ... á- gua" | nenhuma |
| 45 | L16 fonética: "ditongos crescentes em fim de palavra (Base IX: calúnia, espécie, mágoa)" | DIVERGENTE | Os exemplos estão na Base VII ("Dos ditongos"), 1º c: "Além dos ditongos orais propriamente ditos ... admite-se ... ditongos crescentes ... cal(ú)nia, espécie, ..." (a Base IX trata de paroxítonas acentuadas) | Trocar "(Base IX: “calúnia”, “espécie”, “mágoa”)" por "(Base VII: “calúnia”, “espécie”, “mágoa”)" |
| 46 | L16 modalização: CNJ p. 50, "deve, precisar, ter de" = obrigação; "poder" = "capacidade, permissão ou simples possibilidade"; "deveria" ameniza | CONFIRMADA | CNJ p. 50: "verbos como “deve, precisar, ter de” indicam obrigação ...; Já o verbo “poder” indica capacidade, permissão ou simples possibilidade"; "possa ser amenizada ... com o uso de “deveria”"; exemplos "Você deve trazer o material amanhã" / "Você pode trazer o material amanhã?" | nenhuma |
| 47 | L16 modalização: "Modalizar é marcar o grau de certeza, obrigação ou possibilidade" e ligação com verbos modais | NÃO CONFIRMADA (explica a própria apostila: "explicação do autor") | O CNJ não usa a palavra "modalização"; advérbios modalizadores não conferidos | Manter o aviso já escrito |
| 48 | L16 fonética: definições de fonema e letra | NÃO CONFIRMADA (a apostila já diz "não conferidas") | Sem fonte oficial aberta | Manter o aviso |
| 49 | L16: edital não tem redação (prova só objetiva, 40 questões) | NÃO CONFIRMADA por mim | O PDF do edital não está nesta máquina; não conferi | Manter, mas lembrar que vem de `curso/edital.md` |
| 50 | L7: G0001 ainda marcado PENDENTE no `intro` e na 1ª pegadinha | (não é afirmação nova) | Item NÃO RESOLVIDO no relatório; o JSON ainda traz "PENDENTE: conferir G0001 no PDF da prova" | Decisão do dono |

## Conferência contra o gabarito oficial do banco

Nenhuma afirmação nova contradiz o gabarito oficial:
- G0004 (gab. B no caderno B): "possuíam" certa, "já – oxítona" errada. A apostila diz o mesmo e pede para chamar "já" de monossílabo na prova.
- G0190 (A = I, II e III): a apostila manda gravar o gabarito, mesmo com a regra do Manual indo noutra direção. Não contradiz.
- G0191 (ANULADA; preliminar I, II e III): descrito corretamente.
- G0194 (D): B e C erradas, certo.
- G0278 (ANULADA): descrito corretamente, sem afirmar o motivo.
- G0280 (A = II e IV): I e III erradas, II e IV certas; confere com o texto da L7.
- G0334 (C): confere.
- G0010 (B = coautor – autoexame): confere.

## Resumo

Total de afirmações conferidas: 49 (item 50 é só observação).
- CONFIRMADA: 36 (inclui 4 com ressalva pequena: 7, 20, 22, 25).
- DIVERGENTE: 2 (item 21 "enchova" deve explicar que enxova existe com outro sentido; item 45 "calúnia..." é Base VII, não Base IX).
- NÃO CONFIRMADA: 6 (item 8 "se" aplicado a recomendar; 33 crase facultativa; 35 regência de chegar/ir/esquecer; 47 modalização; 48 fonema e letra; 49 ausência de redação). Os itens 8, 47 e 48 a apostila já avisa; o 33 e o 35 ainda precisam do aviso.
- Itens que não achei fonte própria e fiquei na dedução: 16 ("própria/critério" cobertos pela regra de -ia/-io, não citados no texto do Acordo).

O que NÃO consegui abrir ou fazer:
- PDF do edital e PDFs das provas (não estão nesta máquina): transcrição das questões e G0001 seguem sem conferência.
- Página oficial do Planalto do Acordo e do Manual (usei a cópia da Câmara e a cópia da UFGD, como o professor).
- Gramáticas (Bechara etc.) e a NGB: não consultadas.
- VOLP: a tela não abre sem script; usei o serviço que ela chama. Não conferi no VOLP "antirrábico", "contrassenso", "ultrassom", "enxuto", "enxurrada", "enxame" e "enxergar".
- MRPR "às vezes" (p. 79): citado pelo relatório; não reabri.
- Número de página do MRPR (66-73) e do CNJ: conferi o texto; os números de página impressos não verifiquei um a um (CNJ p. 17, 25-26, 48, 50 batem com as seções vistas).
