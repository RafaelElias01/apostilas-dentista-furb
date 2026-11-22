# Prompt para o Copilot: conferência cruzada das apostilas 02, 03 e 04

Use um prompt por apostila (troque os campos entre <>). Abra o repositório na branch `wip/apostilas-02-03-04`.

| Apostila | Arquivo | Saída |
|---|---|---|
| 02 Conhecimentos Gerais e Legislação Municipal | `curso/apostila/conhecimentos-gerais-legislacao.json` | `curso/auditoria/conferencia-cruzada-02.md` |
| 03 SUS, Políticas de Saúde e Epidemiologia | `curso/apostila/sus-saude-publica.json` | `curso/auditoria/conferencia-cruzada-03.md` |
| 04 Ética, Relações Humanas, Biossegurança e Prontuário | `curso/apostila/etica-biosseguranca.json` | `curso/auditoria/conferencia-cruzada-04.md` |

---

## PROMPT (copiar daqui)

Você é um conferidor independente de conteúdo de estudo para concurso público. Não conhece este projeto, então leia tudo abaixo.

**Contexto.** O repositório monta apostilas de estudo para o concurso de Cirurgião-Dentista da Prefeitura de Blumenau (SC). A banca é a FURB (Fundação Universidade Regional de Blumenau). Cada apostila é um arquivo JSON em `curso/apostila/`, com lições, trechos de lei entre aspas, exemplos e "pegadinhas" tiradas de questões reais da banca. O banco de questões reais está em `curso/questoes-anteriores.json` (campo `grupo` agrupa questões repetidas; `alvo: true` = Blumenau). O roteiro está em `curso/roteiro-apostilas.md`. O padrão de relatório que quero está em `curso/auditoria/conferencia-cruzada-01.md`: leia esse arquivo primeiro e imite o formato.

**Sua tarefa.** Conferir a apostila `<ARQUIVO JSON>` contra as FONTES ORIGINAIS e escrever o relatório `<ARQUIVO DE SAÍDA>`. NÃO edite o JSON da apostila: só proponha correções no relatório.

**Regras que não podem falhar:**
1. Relato, memória e texto da própria apostila são hipótese, nunca prova. A prova é o texto da fonte oficial que VOCÊ abriu e leu.
2. Para cada afirmação, número, artigo, data, sigla ou trecho entre aspas, abra a fonte oficial (planalto.gov.br, camara.leg.br, bvsms.saude.gov.br, saude.gov.br, anvisa.gov.br, cfo.org.br, leismunicipais.com.br ou site da Câmara de Blumenau, in.gov.br/DOU, DOM/SC) e copie o trecho LITERAL curto que a confirma ou contradiz. Cite URL e a data em que acessou.
3. Trechos entre aspas na apostila precisam ser literais. Compare palavra por palavra.
4. Se não conseguir abrir a fonte, o veredito é PENDENTE, com o motivo. Nunca invente nem complete de memória. "Não achei" não é "não existe".
5. Confira também a vigência: a norma foi revogada ou alterada? Diga por qual ato e a data.
6. Confira cada pegadinha/exemplo contra o enunciado e as alternativas REAIS em `curso/questoes-anteriores.json`: gabarito, ano, número da questão. Corte do veredito o que não estiver lá.
7. Confira a contagem de lições e de questões contra `curso/roteiro-apostilas.md` e o campo `qtdQuestoes` de cada lição.
8. Não escreva nenhuma senha, token, e-mail ou dado pessoal.
9. Grave o relatório parcial no arquivo de saída a cada bloco concluído, antes de seguir. Se parar, o que já tem fica salvo.

**Formato do relatório** (igual ao 01): cabeçalho (data, conferidor = Copilot, arquivo conferido, lista das fontes abertas com URL); tabela com colunas `# | Afirmação (lição/ponto) | Veredito | Fonte (trecho literal curto) | Correção proposta`; vereditos permitidos: CONFIRMADA, CONFIRMADA com ressalva, DIVERGENTE, DESATUALIZADA, PENDENTE; no fim, seções "Divergências a corrigir" (ordenadas por gravidade) e "AINDA PENDENTE" (o que não deu para confirmar e por quê).

**Pontos delicados desta apostila (dar atenção extra):**
<COLE AQUI OS DA APOSTILA>

- 02: o texto da Lei 7.564/2010 de Blumenau que temos é o original de 2010 e está desatualizado (12 leis alteradoras); a Lei Orgânica de Blumenau não tem consolidação oficial (anexo de 2021 + Emendas 52/2022, 53/2025 e 54/2026); a banca marcou a Emenda 52/2022 como verdadeira, mas ela exige lei complementar; a Prefeitura chama Blumenau de "químico e farmacêutico", e a questão G0106 diz "médico farmacêutico e filósofo".
- 03: vigência da PNAB (Portaria GM/MS 2.436/2017, hoje na Portaria de Consolidação 2/2017) e do NASF (revogado pela Portaria 2.979/2019); Lei 8.142/1990 só no texto original; dados de SIM/SINASC só por busca; Lei 8.080/1990 e Decreto 7.508/2011 em versão atualizada.
- 04: Código de Ética Odontológica = Resolução CFO-118/2012 + CFO-271/2025 (o CFO não publica texto consolidado); RDC Anvisa 222/2018; RDC 15/2012 (exclui consultórios odontológicos no art. 3º, parágrafo único) e RDC 1.002/2025 (art. 93), lida só em cópia de terceiro; questões G0301, G0175 e G0346 com divergência entre a banca e a norma.

**Ao terminar,** responda em português do Brasil, em poucas linhas: quantas afirmações conferiu, quantas CONFIRMADA / DIVERGENTE / DESATUALIZADA / PENDENTE, e as 3 divergências mais graves. Diga também o que NÃO conseguiu verificar.

## FIM DO PROMPT

---

**Depois da conferência (quem retomar):** aplicar as correções no JSON (na 04, ajustar também `qtdQuestoes`), rodar `node scripts/gerar-apostila-materia.mjs <id> --pdf`, copiar o PDF de `material-premium/` para `site/apostilas/`, listar em `site/dados/apostilas.json`, rodar `node --test tests/gerador.test.mjs`, code-review e PR.
Observação: a pasta `fontes/` com as leis baixadas existe só no PC do dono (fora do git); o Copilot precisa buscar as fontes na web.
