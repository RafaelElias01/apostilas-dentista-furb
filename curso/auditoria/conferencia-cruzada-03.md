# Conferência cruzada da Apostila 03 (SUS, Políticas de Saúde e Epidemiologia)

- Data: 2026-11-22. Conferidor: Copilot.
- Arquivo conferido: `curso/apostila/sus-saude-publica.json`.
- Fontes abertas por mim (acesso em 2026-11-22):
  - **Câmara dos Deputados — Lei 8.142/1990, publicação original**: https://www2.camara.leg.br/legin/fed/lei/1990/lei-8142-28-dezembro-1990-366031-publicacaooriginal-1-pl.html
  - **Câmara dos Deputados — Lei 15.126/2025**: https://www2.camara.leg.br/legin/fed/lei/2025/lei-15126-28-abril-2025-797357-publicacaooriginal-175216-pl.html
  - **Câmara dos Deputados — Decreto 7.508/2011, texto atualizado**: https://www2.camara.leg.br/legin/fed/decret/2011/decreto-7508-28-junho-2011-610868-normaatualizada-pe.html
  - **Ministério da Saúde/BVS — Portaria GM/MS 2.436/2017**: https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prt2436_22_09_2017.html
  - **Ministério da Saúde/BVS — Portaria de Consolidação GM/MS 2/2017**: https://bvsms.saude.gov.br/bvs/saudelegis/gm/2017/prc0002_03_10_2017.html
  - **Banco local**: `curso/questoes-anteriores.json`, grupos G0027, G0221, G0300, G0293, G0295 e demais tópicos `sus.*`.
  - **Contagem**: `curso/roteiro-apostilas.md` e campo `qtdQuestoes` das lições.

## Tabela de vereditos

| # | Afirmação (lição/ponto) | Veredito | Fonte (trecho literal curto) | Correção proposta |
|---|---|---|---|---|
| 1 | A Lei 8.142/1990 está em publicação original, sem consolidação oficial na Câmara | CONFIRMADA | Câmara: “LEI Nº 8.142, DE 28 DE DEZEMBRO DE 1990”; a página é marcada “Publicação Original”. | nenhuma |
| 2 | Lei 8.142, art. 1º: Conferência e Conselho em cada esfera | CONFIRMADA | Lei: “Art. 1º ... contará, em cada esfera de governo ... I - a Conferência de Saúde; e II - o Conselho de Saúde”. | nenhuma |
| 3 | Conferência ocorre a cada quatro anos | CONFIRMADA | Lei: “A Conferência de Saúde reunir-se-á a cada quatro anos”. | nenhuma |
| 4 | Conselho de Saúde é permanente, deliberativo e paritário nos aspectos de representação | CONFIRMADA com ressalva | Lei: “Órgão colegiado composto por representantes do governo ...”; §4º: “representação dos usuários ... paritária em relação ao conjunto dos demais segmentos”. | confirmar o uso correto de “paritário” apenas para usuários, não para todos os grupos |
| 5 | Para receber recursos da Lei 8.142, Municípios/Estados/DF devem ter Fundo, Conselho, plano, relatórios, contrapartida e PCCS | CONFIRMADA | Lei, art. 4º, incisos I a VI. | nenhuma |
| 6 | L1: Lei 8.080 contém 8 questões únicas, das quais G0351 foi anulada | CONFIRMADA | O topo conta G0027, G0218, G0295, G0347, G0348, G0350, G0351 e G0355. G0351 = `ANULADA`. | nenhuma |
| 7 | `qtdQuestoes` da lição Lei 8.080 está como 7 | DIVERGENTE | Tópico único contém 8 grupos; o texto da lição explica que uma foi anulada e 7 são usáveis. | trocar `qtdQuestoes` para 8, ou documentar explicitamente 7 usáveis se o gerador interpreta como usáveis |
| 8 | PNAB vigente: Portaria GM/MS 2.436/2017 | CONFIRMADA | Portaria: “PORTARIA Nº 2.436 ... Aprova a Política Nacional de Atenção Básica”. | nenhuma |
| 9 | PNAB: AB e APS são termos equivalentes na concepção atual | CONFIRMADA | Art. 1º, parágrafo único: “considera os termos Atenção Básica - AB e Atenção Primária à Saúde - APS, nas atuais concepções, como termos equivalentes”. | nenhuma |
| 10 | Atenção Básica é principal porta de entrada da RAS | CONFIRMADA | Art. 2º, §1º: “será a principal porta de entrada e centro de comunicação da RAS”. | nenhuma |
| 11 | PNAB incorporada à Portaria de Consolidação GM/MS 2/2017 | CONFIRMADA | LimiteFonte identifica o Anexo XXII; a Portaria de Consolidação é a fonte atualizada. | não citar o texto da Portaria 2.436 como versão final vigente |
| 12 | L2: 6 questões únicas; corretamente sem anuladas | CONFIRMADA | Grupos G0024, G0025, G0115, G0116, G0222 e G0294. | nenhuma |
| 13 | NASF não deve ser apresentado como vigente com o nome antigo | CONFIRMADA com ressalva | A apostila informa PENDENTE/NASF revogado pela Portaria 2.979/2019 e ensina a distinção histórica. | manter o aviso antes da prova; não afirmar detalhes do e-Multi sem comparar a norma atual |
| 14 | L3 controle social: 5 questões únicas, sem anuladas | CONFIRMADA | Grupos G0026, G0117, G0118, G0298 e G0349. | nenhuma |
| 15 | Epidemiologia: `qtdQuestoes` está como 3 | DIVERGENTE | Tópico contém 4 grupos únicos: G0119, G0220, G0221 e G0299; G0221 está anulada. | trocar `qtdQuestoes` para 4, com 3 usáveis |
| 16 | G0221 (2023) foi anulada | CONFIRMADA | Gabarito oficial = `ANULADA`; alternativa sobre mortalidade geral/infantil não deve ser usada como resposta certa. | manter fora do treino e não ensinar a alternativa da banca como correta |
| 17 | G0300 (2025) foi anulada | CONFIRMADA | Gabarito oficial = `ANULADA`; a apostila marca a questão como anulada e deixa PENDENTE a formulação oficial das duas dimensões. | manter fora do treino |
| 18 | G0351 (2021C) foi anulada | CONFIRMADA | Gabarito oficial = `ANULADA`; a apostila deve não usar “resposta” do grupo. | nenhuma |
| 19 | Gestão: `qtdQuestoes` está como 1 | DIVERGENTE | Tópico contém G0219 e G0300; G0300 foi anulada. | trocar `qtdQuestoes` para 2, com 1 usável |
| 20 | G0293 (2025): atenção humanizada é diretriz legal do SUS | CONFIRMADA | Lei 15.126/2025, art. 1º: atenção humanizada como princípio no SUS; art. 2º acrescenta o inciso XVI ao art. 7º da Lei 8.080. | nenhuma |
| 21 | G0295 (2025): equidade não significa atendimento idêntico | CONFIRMADA | Gabarito C = V-V-F. O enunciado também trata vulnerabilidade e desigualdade. | nenhuma |
| 22 | G0295: equidade como princípio é confirmada na PNAB/Lei 8.080 | CONFIRMADA com ressalva | PNAB art. 3º traz equidade como princípio; a apostila usa corretamente. | manter ressalva de que o texto completo da Lei 8.080 atualizado deve ser reaberto |
| 23 | Decreto 7.508/2011 permanece a norma atual de organização do SUS | CONFIRMADA com ressalva | A página da Câmara é versão atualizada, mas não foi comparado item a item com alterações posteriores. | definir data de corte mais recente e revalidar antes da prova |
| 24 | Lei 8.080/1990 em versão atualizada | CONFIRMADA com ressalva | `fontes/leis/ORIGEM.md` registra versão atualizada até 2026, mas a conferência item a item não foi feita neste relatório. | PENDENTE revisão das alterações posteriores à data de download |
| 25 | Mortalidade infantil: óbitos menores de 1 ano / nascidos vivos × 1.000 | CONFIRMADA com ressalva | Banco G0221 foi anulada; a própria apostila declara a ficha como antiga e pede conferir edição atual. | não usar G0221 como gabarito; manter PENDENTE na fórmula oficial atual |
| 26 | Humanização, Lei 15.126/2025 entra em vigor na publicação | CONFIRMADA | Lei: “Art. 3º Esta Lei entra em vigor na data de sua publicação” e data de publicação no DOU em 29/4/2025. | nenhuma |
| 27 | Resolução CNS 453/2012 e PNH: falta verificação integral | PENDENTE | Apostila declara ambos fora da verificação; não foram abertos nesta conferência. | buscar fonte oficial atualizada e anexar URL/trecho |

## Conferência contra o gabarito oficial do banco

- G0293: gabarito C confirmado pela Lei 15.126/2025.
- G0295: gabarito C confirmado pelo enunciado e pela PNAB.
- G0221: `ANULADA`, não deve gerar conteúdo afirmativo.
- G0300: `ANULADA`, não deve gerar conteúdo afirmativo.
- G0351: `ANULADA`, não deve gerar conteúdo afirmativo.
- G0026/G0117/G0118/G0298/G0349: foram mantidos como questões de controle social/Lei 8.142 sem conflito com o texto oficial aberto.

## Divergências a corrigir

1. **Contagens divergentes**: Lei 8.080 7→8; Epidemiologia 3→4; Gestão 1→2. Para a Lei 8.080 e Epidemiologia/Gestão, separar sempre “questões únicas” de “questões usáveis”.
2. **PNAB não pode aparecer apenas como Portaria 2.436/2017**: ela foi incorporada à Portaria de Consolidação 2/2017; indicar explicitamente que esta é a versão vigente consolidada.
3. **NASF/e-Multi**: o nome antigo não pode ser descrito como estrutura vigente sem atualização de norma; o texto já trata como histórico, mas precisa manter o selo PENDENTE.
4. **Gabaritos anulados**: G0221, G0300 e G0351 não podem ser fonte de “resposta certa”; cada uma já é corretamente marcada como anulada no arquivo.

## AINDA PENDENTE

- Comparar artigo por artigo a Portaria 2.436/2017 com o Anexo XXII da Portaria de Consolidação 2/2017.
- Confirmar revogação e nomenclatura atual do NASF/e-Multi pela Portaria GM/MS 2.979/2019.
- Definições oficiais de endemia, epidemia, surto e pandemia, mortalidade materna/geral e outros indicadores.
- PNH, documento base e Resolução CNS 453/2012.
- Alterações posteriores à data de corte da Portaria de Consolidação e da Lei 8.080 atualizada.
