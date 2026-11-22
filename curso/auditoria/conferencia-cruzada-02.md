# Conferência cruzada da Apostila 02 (Conhecimentos Gerais e Legislação Municipal)

- Data: 2026-11-22. Conferidor: Copilot.
- Arquivo conferido: `curso/apostila/conhecimentos-gerais-legislacao.json`.
- Fontes abertas por mim (acesso em 2026-11-22):
  - **Câmara/Blumenau — Lei 7.564/2010**: https://digital.camarablu.sc.gov.br/documento/lei-ordinaria-7564-2010-24312
  - **Câmara/Blumenau — Lei 8.649/2018 (alteradora)**: https://digital.camarablu.sc.gov.br/documento/lei-ordinaria-8649-2018-23146
  - **Câmara/Blumenau — Emenda à LOM 52/2022**: https://digital.camarablu.sc.gov.br/documento/emenda-a-lom-no-52-2022-436147
  - **Prefeitura de Blumenau — História**: https://www.blumenau.sc.gov.br/secao/historia
  - **Câmara dos Deputados — Constituição Federal atualizada, art. 37, IX**: https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html
  - **Banco local**: `curso/questoes-anteriores.json`, grupos G0106, G0284, G0195, G0203 e demais tópicos `cgl.*`.
  - **Contagem**: `curso/roteiro-apostilas.md` e campo `qtdQuestoes` das lições.

## Tabela de vereditos

| # | Afirmação (lição/ponto) | Veredito | Fonte (trecho literal curto) | Correção proposta |
|---|---|---|---|---|
| 1 | Cabeçalho: 50 questões únicas em 5 editais; 3 anuladas; 42 no edital 2025 e 8 fora dele | CONFIRMADA | Roteiro: “50 únicas ... 8 fora do edital 2025”; banco contém 850 questões alvo e 374 grupos únicos. | nenhuma |
| 2 | LOM: não existe consolidação oficial; a apostila usa só explicação do autor e rascunho não oficial | CONFIRMADA | `fontes/leis/ORIGEM.md`: “NÃO há texto consolidado oficial na Câmara nem na Prefeitura”. A página da Emenda 52 consta “Arquivado” em 2026. | manter o PENDENTE; não tratar rascunho como norma vigente |
| 3 | LOM, art. 73-A: aposentadoria aos 62/65 pela Emenda 52/2022 | CONFIRMADA com ressalva | G0284 (2025), alternativa C = V-V-F. Na Câmara: “Emenda a LOM Nº 52/2022” e, na página oficial, situação “Arquivado”. | manter a regra como histórica da prova e não afirmar vigência |
| 4 | LOM, art. 38: I, II e III eram objeto de lei complementar em G0195 | CONFIRMADA | G0195 (2023), gabarito C = “I, II e III”; enunciado cita o art. 38. | nenhuma |
| 5 | LOM, frentes parlamentares: G0204 aceita I, II e III | CONFIRMADA | Banco G0204: gabarito C = I, II e III, sobre parcerias com Movimento Social Organizado, ONGs e Órgãos Governamentais. | nenhuma |
| 6 | LOM, consulta popular: 50% e vedação nos quatro meses antes das eleições | CONFIRMADA | G0283 (2025), gabarito D; alternativa correta exige maioria dos eleitores presentes representando 50% e vedação nos quatro meses. | nenhuma |
| 7 | Lei 7.564/2010, art. 3º: recrutamento por processo seletivo público simplificado | CONFIRMADA | Câmara: "Art. 3º O recrutamento do pessoal será realizado mediante processo seletivo público simplificado". | nenhuma |
| 8 | Lei 7.564/2010, art. 4º: texto vigente mudou do regime CLT para regime administrativo especial | CONFIRMADA | Texto original da Câmara: "Art. 4º As contratações serão realizadas pelo regime da Consolidação das Leis do Trabalho". A Lei 8.649/2018 alteradora trata da vigência vigente; a apostila informa que o art. 4º atual é da lei alteradora. | manter a marcação PENDENTE para consolidação integral |
| 9 | G0203 (2023): a Lei 7.564/2010 se baseia no art. 37, IX da Constituição | CONFIRMADA | G0203, gabarito E; Ementa da Lei 7.564: "NOS TERMOS DO INCISO IX DO ARTIGO 37 DA CONSTITUIÇÃO FEDERAL". | nenhuma |
| 10 | CF/88, art. 37, IX exige contratação temporária por necessidade temporária de excepcional interesse público | CONFIRMADA | Fonte oficial: "IX - a lei estabelecerá os casos de contratação por tempo determinado para atender a necessidade temporária de excepcional interesse público". | nenhuma |
| 11 | G0106 (2021): enunciado chama Hermann de “médico farmacêutico e filósofo” | CONFIRMADA | G0106, enunciado real: "médico farmacêutico e filósofo alemão". Gabarito E, sobre setores econômicos. | manter: não confundir a profissão da banca com a biografia oficial |
| 12 | Prefeitura de Blumenau: Hermann é descrito como “o químico e farmacêutico alemão” e a fundação foi em 2/9/1850 | CONFIRMADA | Prefeitura: "Em 1850, o químico e farmacêutico alemão"; "Em 2 de setembro de 1850, dezessete colonos chegaram". | corrigir qualquer texto que adote “médico” |
| 13 | Atualidades: qtdQuestoes da lição foi registrada como 9 | DIVERGENTE | A lição usa `topicosBanco: ["cgl.brasil_mundo"]`; o banco contém 10 grupos únicos do tópico: G0017, G0019, G0104, G0196, G0198, G0200, G0290, G0291, G0335 e G0337. | trocar `qtdQuestoes` de 9 para 10 |
| 14 | História/SC: qtdQuestoes foi registrada como 7 | DIVERGENTE | O tópico contém 8 grupos únicos: G0014, G0015, G0016, G0106, G0112, G0336, G0343 e G0344. | trocar `qtdQuestoes` de 7 para 8 |
| 15 | Ciência/inovação: qtdQuestoes foi registrada como 4 | DIVERGENTE | O tópico contém 5 grupos únicos: G0103, G0107, G0285, G0288 e G0292. | trocar `qtdQuestoes` de 4 para 5 |
| 16 | Ranking desta apostila: atualidades 10, história 8 e ciência 5 | CONFIRMADA | Contagem direta por `grupo` no banco confirma 10, 8 e 5. | nenhuma |
| 17 | Lei 7.564: a apostila usa original de 2010 e alteradoras de 2012 a 2018 como único literal | CONFIRMADA com ressalva | A página oficial de 2010 é a versão original e não consolidação; o próprio arquivo reconhece leis posteriores em PDF/PENDENTE. | manter recorte; não chamar de texto vigente |
| 18 | LOM Emenda 53/2025: só entra em vigor após lei complementar referendária | PENDENTE | O relatório não apresentou o texto integral lido da Emenda 53 nem comprovação de publicação da lei complementar referendária. | confirmar Emenda 53 e eventual lei complementar no Diário Oficial/Câmara |
| 19 | Emenda 54/2026 do art. 100 entra em vigor na publicação | PENDENTE | Não foi aberta visualmente a íntegra do PDF nem conferida publicação posterior no Diário Oficial. | confirmar texto, data de publicação e vigência |
| 20 | Alterações posteriores a 01/10/2026 na Lei 7.564 | PENDENTE | O próprio limiteFonte informa que não foram procuradas alterações posteriores. | buscar nova alteradora oficial após a data de corte |
| 21 | 12 leis alteradoras da Lei 7.564: 7.731/2012 a 9.974/2026 | PENDENTE | A lista foi herdada de levantamento anterior; não foi refeita busca independente por todas as leis posteriores. | revalidar cada alteradora e o texto vigente |

## Conferência contra o gabarito oficial do banco

- G0106: gabarito E confirmado no JSON e a apostila não usa a profissão equivocada como fato.
- G0195: gabarito C confirmado.
- G0284: gabarito C confirmado; a apostila corretamente separa o histórico da banca da pendência de vigência da Emenda 52.
- G0203: gabarito E confirmado.
- G0283: gabarito D confirmado.

## Divergências a corrigir

1. **Contagens das lições 2, 3 e 4 estão menores que o banco**: 9→10, 7→8 e 4→5 em `qtdQuestoes`; atualizar também os resumos que exibem essas contagens.
2. **Não há consolidação oficial da LOM nem da Lei 7.564**: o relatório já evita trechos da LOM, mas todo ponto municipal precisa continuar marcado para conferir antes da prova.
3. **A Emenda à LOM 52/2022 está arquivada no portal oficial**: não é seguro apresentar a aposentadoria municipal como regra vigente; a edição 2025 a respondeu como verdadeira, mas a vigência exige cautela.
4. **Linguagem histórica de G0106**: não confundir “médico farmacêutico e filósofo” da prova com “químico e farmacêutico” da fonte oficial da Prefeitura.

## AINDA PENDENTE

- Consolidado oficial da Lei Orgânica de Blumenau e Emendas 53/2025 e 54/2026.
- Lei complementar referendária da Emenda à LOM 52/2022 e eventual vigência dela.
- Consolidado integral e posterior a 01/10/2026 da Lei 7.564/2010.
- Conteúdo factual completo das atualidades, história e ciência; vários pontos dependem de transcrição de prova não conferida no PDF original.
