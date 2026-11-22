# Cobertura das apostilas — Concurso de Maravilha 001/2026

- Data: 2026-11-22. Conferidor: Copilot.
- Cargo analisado: Odontólogo — Saúde da Família.
- Arquivos do material confrontados: as oito apostilas em `curso/apostila/` e suas lições; classificação vigente em `site/dados/apostilas.json`.
- Fontes oficiais abertas por mim (acesso em 2026-11-22):
  - **FURB — página oficial do concurso 001/2026**: https://concursos.furb.br/concurso/564-prefeitura-municipal-de-maravilha-concurso-publico-edital
  - **Edital 001/2026, 42 páginas**: https://anexos-r2.selecao.net.br/uploads/342/concursos/564/anexos/136bb68b-ed11-43d8-9f85-e13ae913b1f3.pdf
  - **Errata 01**: https://anexos-r2.selecao.net.br/uploads/342/concursos/564/anexos/cb322e2c-2c8f-4092-ba43-ec1fe52d0537.pdf
  - **Errata 02**: https://anexos-r2.selecao.net.br/uploads/342/concursos/564/anexos/ef304614-bd72-4ddd-a05a-3970d4515ead.pdf

## Conclusão

As apostilas **03 a 08 servem como complemento ao conteúdo odontológico** do edital, mas não cobrem sozinhas todo o programa. A apostila 01 cobre boa parte de Língua Portuguesa, com lacunas explícitas. A apostila 02 é específica de Blumenau: suas leis locais não atendem ao programa de Maravilha. **Não há apostila de Matemática/Raciocínio Lógico**, e o material não contém a Lei Orgânica de Maravilha.

O edital distribui a prova objetiva em 40 questões: “Língua Portuguesa 10”, “Matemática/Raciocínio Lógico 05”, “Conhecimentos Gerais 05” e “Conhecimentos Específicos 20” (p. 11). Em Português, a proporção prevista é 10/40; Matemática/Raciocínio Lógico vale 5/40, um bloco inteiro sem apostila correspondente.

## Matriz de cobertura

| Item do edital (trecho literal curto) | Apostilas relacionadas | Cobertura encontrada e lacunas |
|---|---|---|
| Língua Portuguesa (Anexo IV, p. 36): interpretação, gêneros, funções, figuras, coesão, ortografia, pontuação, acentuação, formação de palavras, classes, colocação, regência, crase, sintaxe, semântica, sinônimos/antônimos, porquês e coordenação/subordinação | 01 — `portugues.json`, lições 1–16 | **Parcial ampla.** Há lições para a maioria dos tópicos. A lição 16 declara concordância, fonética, modalização e produção de texto como itens sem questão própria na amostra; dá explicações resumidas para parte deles, mas limita o alcance da fonética. Não foi localizado tratamento explícito do “uso dos porquês”. |
| Matemática/Raciocínio Lógico (Anexo IV, p. 36): aritmética, proporções, regra de três, porcentagem, probabilidade, conjuntos, medidas, gráficos, média e situações-problema | Nenhuma | **Sem cobertura:** não há apostila de Matemática/Raciocínio Lógico entre os oito arquivos. |
| Conhecimentos Gerais (Anexo IV, p. 36): Brasil, Santa Catarina e Maravilha; “Lei Orgânica do Município de Maravilha”; atualidades e políticas/serviços públicos | 01 e 02, apenas em aspectos gerais | **Parcial e inadequada para a parte local.** A apostila 02 trata da Lei Orgânica e de leis de Blumenau, não de Maravilha. Atualidades e alguns conteúdos gerais podem servir de revisão, mas não substituem história, geografia, atualidades locais nem a Lei Orgânica de Maravilha. |
| SUS: fundamentos, objetivos, atribuições, competências, gestão, organização, controle social, rede, humanização e políticas do SUS (Anexo IV, p. 42) | 03 — `sus-saude-publica.json`, lições 1–8 | **Cobertura temática ampla como complemento.** As lições abrangem Lei 8.080, atenção básica/PNAB, controle social/Lei 8.142, epidemiologia, gestão, humanização, financiamento e saúde do trabalhador. A atualização legislativa e as lacunas assinaladas no relatório 03 continuam valendo. |
| Saúde bucal coletiva, odontologia sanitária, Saúde da Família e atenção à saúde bucal na APS; epidemiologia das doenças bucais e necessidades da população (Anexo IV, p. 42) | 03 e 05 — `cariologia-prevencao-odontopediatria.json`, lições 2 e 5 | **Cobertura parcial/associada.** Há saúde coletiva e epidemiologia em saúde bucal, índices e levantamentos. O edital também pede contexto local e diagnóstico das necessidades da população; não foi comprovada cobertura completa desses aspectos. |
| Promoção, prevenção, diagnóstico, planejamento e tratamento; educação em saúde; cariologia, biofilme, saliva, fluoretos e controle da cárie; saúde materno-infantil e do escolar (Anexo IV, p. 42) | 05 — lições 1–5 | **Cobertura temática ampla como complemento.** Os títulos tratam de odontopediatria, epidemiologia bucal, cariologia, biofilme/saliva, flúor, saúde coletiva e plano integrado. A profundidade de cada subitem não foi auditada artigo/ponto por ponto nesta matriz. |
| Assistência curativa/preventiva; Periodontia, Dentística, Endodontia, Exodontia, Oclusão e Traumatologia bucomaxilofacial (Anexo IV, p. 42) | 05–08 | **Cobertura ampla como complemento.** Há lições específicas de periodontia (07), dentística, endodontia, trauma e oclusão (06), e cirurgia oral/bucomaxilofacial (08). |
| Patologia e semiologia bucal; polpa/periápice, lesões potencialmente malignas, manifestações sistêmicas, doenças infecciosas e glândulas salivares (Anexo IV, p. 42) | 08 — lição 2; 06 — Endodontia e Radiologia | **Parcial.** Patologia/estomatologia, endodontia e imagem aparecem no escopo, mas cada grupo de doenças e o alcance da semiologia não foram confirmados item a item. |
| Exames complementares, diagnóstico clínico e plano de tratamento; farmacologia aplicada (Anexo IV, p. 42) | 05, 06 e 08 | **Cobertura temática parcial/ampla.** Há radiologia/imagem, plano integrado, anestesia local e farmacologia/terapêutica. Não foi verificada a cobertura integral de todos os exames e protocolos clínicos descritos no edital. |
| Biossegurança, controle de infecção, assepsia e segurança; prontuário e documentação profissional (Anexo IV, p. 42) | 04 — lições 1, 6 e 7 | **Cobertura direta como complemento.** As lições incluem biossegurança, esterilização, EPI, resíduos/PGRSS e prontuário. As divergências e pendências normativas do relatório 04 não são resolvidas por esta matriz. |
| Encaminhamento, equipe multiprofissional; organização, avaliação e acompanhamento de programas de saúde bucal; pesquisa em saúde pública; emergências/calamidades; funcionamento dos serviços odontológicos (Anexo IV, p. 42) | 03, 05 e 08 | **Parcial; há lacunas.** Gestão do SUS, saúde coletiva, plano integrado e emergências médicas em consultório têm relação com parte do tema. Não foi identificada cobertura completa de pesquisa em saúde pública, calamidades, organização específica de serviços odontológicos ou avaliação de programas. Emergência clínica em consultório não equivale a emergência/calamidade de saúde pública. |
| Relações humanas no trabalho e ética profissional no serviço público (Anexo IV, p. 42) | 04 — lições 2–5 | **Cobertura temática direta como complemento.** Há relações humanas, ética no serviço público, Código de Ética Odontológica e responsabilidade profissional; permanecem as ressalvas de atualização normativa do relatório 04. |

## Situação da classificação no site

`site/dados/apostilas.json` atualmente classifica a apostila 01 como `complementar`, a 02 como `verificar` e as 03–08 como `complementar` para Maravilha. A matriz não altera essas classificações. A apostila 02 não deve ser apresentada como material de legislação local de Maravilha; qualquer mudança pública de rótulo deve ser decidida separadamente.

## Efeito das erratas

- **Errata 01:** muda o horário da prova, a quantidade de vagas de Terapeuta Ocupacional e conteúdo de Auditor de Tributos. O próprio documento diz: “Permanecem inalteradas as demais disposições contidas no Edital.” Não altera o programa de Odontólogo.
- **Errata 02:** acrescenta disposições relativas à Prova Prática e à apresentação de CNH. Não altera o Anexo IV de Odontólogo.

## Prioridade prática para separar o estudo

1. Obter material específico para Matemática/Raciocínio Lógico e para Conhecimentos Gerais de Maravilha, sobretudo sua Lei Orgânica.
2. Na apostila 01, complementar “uso dos porquês” e revisar os tópicos que o próprio material identifica como sem questão na amostra; não confundir “sem questão” com “fora do edital”.
3. Usar as apostilas 03–08 como blocos complementares para SUS e odontologia, conferindo as pendências legais indicadas nos relatórios 03 e 04 e sem supor que título de lição prove cobertura integral de cada subitem.

## Limites desta conferência

- O edital e as erratas foram abertos e lidos; as páginas 36 e 42 do edital contêm o conteúdo programático relevante.
- A correspondência entre programa e apostilas foi feita pelos títulos, escopos e limites declarados nos JSONs. Não é uma revisão de cada explicação clínica nem certifica suficiência didática para a prova.
- Não foi aberto nem conferido o texto vigente da Lei Orgânica de Maravilha; a conclusão é apenas que nenhuma apostila examinada contém essa lei.
