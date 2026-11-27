# Proposta 2026-11-27: PCDT de HIV (Apostila 08) e sorteio de vagas do IFFar (site)

Só pesquisa e proposta. Nenhum JSON nem arquivo de `site/` foi editado. Nada baixado foi para o repositório (cópias em `%TEMP%\hivpcdt` e `%TEMP%\iffar27`, fora do git).
Data de acesso de todas as fontes: 27/11/2026, PC com proxy (Px 127.0.0.1:3129), `curl.exe` + `pdftotext` 4.06 (Git mingw64). Nenhum CAPTCHA, 403 ou bloqueio foi contornado.

---

## ITEM 1: HIV/AIDS. PCDT lido pela cópia oficial da BVS MS

### Fonte achada (sem CAPTCHA)

As URLs do gov.br/conitec pediram CAPTCHA em 26/11 (ver `proposta-2026-11-26-hiv.md`). A Biblioteca Virtual em Saúde do Ministério da Saúde tem as mesmas obras. A ficha catalográfica do próprio PDF diz: "Esta obra se encontra disponível na BVS no link: https://bvsms.saude.gov.br/bvs/publicacoes/pcdt_manejo_hiv_adultos_modulo1.pdf".

| Obra | URL oficial | Download | SHA-256 |
|---|---|---|---|
| Brasil. Ministério da Saúde (Sectics/SVSA). *Protocolo Clínico e Diretrizes Terapêuticas para Manejo da Infecção pelo HIV em Adultos. Módulo I: Tratamento*. Brasília, 2024. "Tiragem: 1ª edição - 2024". ISBN 978-65-5993-587-1 | https://bvsms.saude.gov.br/bvs/publicacoes/pcdt_manejo_hiv_adultos_modulo1.pdf | HTTP 200, application/pdf, 2.178.744 bytes | `7C130382FB94513AAF601BB30307BC067E4E747F6364BF7605B834344ECA9EA9` |
| Idem, *Módulo II: Coinfecções e Infecções Oportunistas*. Brasília, 2024. "Tiragem: 1ª edição - 2024 - Versão eletrônica". ISBN 978-65-5993-611-3 | https://bvsms.saude.gov.br/bvs/publicacoes/pcdt_manejo_hiv_adultos_modulo2.pdf | HTTP 200, application/pdf, 1.911.019 bytes | `85279A90E1DA26EEFCED8928EB6830454FE05A58C77983C0204A04CD742F572A` |

As páginas abaixo são as **impressas** no livro (conferidas no sumário e nos rodapés).

### Trechos literais pertinentes à odontologia

Módulo I, cap. 4 "Quando iniciar a Tarv", p. 31:
> "A recomendação da Tarv para todas as pessoas vivendo com HIV ou aids, independentemente do CD4, está associada a diversos benefícios, tanto para a pessoa quanto para o sistema de saúde, quando atingidos os objetivos do tratamento"
> "A Tarv deve ser iniciada no mesmo dia ou em até 7 (sete) dias após o diagnóstico da infecção pelo HIV."

Módulo I, Quadro 23 "Apresentação de Siri conforme as infecções oportunistas", p. 91 (Siri = síndrome inflamatória da reconstituição imune):
> "Sarcoma de Kaposi | Agravamento da doença."
> "Vírus do herpes simples (HSV) e vírus varicela-zoster (VZV) | Pode haver reativação de HSV e VZV após o início da Tarv."
> "Complicações dermatológicas inespecíficas | Aparecimento ou piora das manifestações dermatológicas, tais como foliculites e verrugas orais e genitais."

Módulo I, p. 92: "Nos casos de Sarcoma de Kaposi (HHV-8), o corticoide não deve ser utilizado".

Módulo II, cap. 15 "Candidíase esofágica e orofaríngea", p. 100:
> "A candidíase orofaríngea e/ou esofágica é comum entre pessoas vivendo com HIV ou aids, geralmente naquelas com CD4 inferior a 200 células/mm³."
> "O principal agente da candidíase é Candida albicans. O sintoma mais comum de candidíase orofaríngea é o aparecimento de placas removíveis e esbranquiçadas. Também podem ocorrer queilite angular ou pápulas eritematosas na mucosa."
> "Os sintomas típicos de candidíase esofágica incluem dor retroesternal difusa, disfagia e/ou odinofagia, normalmente sem febre. De forma geral, a contagem CD4 é inferior a 100 células/mm³ e frequentemente a candidíase oral também está presente."

Módulo II, 15.1 e Quadro 27, p. 101:
> "O diagnóstico de candidíase oral e/ou esofágica é clínico, sendo a cultura de material dessas regiões pouco útil em razão da presença do fungo como comensal dessas mucosas."
> "CANDIDÍASE OROFARÍNGEA > Formas leves ou moderadas podem ser tratadas com fluconazol 100 mg/dia por 7 a 14 dias. > O tratamento tópico pode ser realizado, como alternativa, com 5 mL de nistatina suspensão oral: bochechar e deglutir, 4 a 5 vezes ao dia." (Fonte do quadro: "adaptado de EACS, 2022".)

Módulo II, Quadro 24 "Achados sugestivos de PCP" (pneumocistose), p. 93:
> "1) CD4 abaixo de 200 células/mm3 ou sinais clínicos de imunodepressão grave, como candidíase oral."

Módulo II, Quadro 29 "Profilaxia primária das infecções oportunistas", p. 109 (célula da tabela; quebras de linha juntadas):
> Pneumocystis jiroveci / Toxoplasma gondii, indicação: "CD4 abaixo de 200 células/mm3 (ou < 14%), ou presença de candidíase oral, ou febre indeterminada com mais de duas semanas de duração, ou doença definidora de aids"

Busca no texto extraído dos dois módulos: **não aparecem** "odont", "dentist", "bucal", "periodont", "gengiv" nem "leucoplasia". O PCDT não trata do atendimento odontológico nem da leucoplasia pilosa.

### 1a. `curso/apostila/cirurgia-farmacologia-patologia.json`, linha 127 (lição "Outras infecções · HIV/AIDS: consequências na cavidade bucal (item do edital de Navegantes)")

**Antes** (fim do campo `texto`, copiado):
> PENDENTE: o PCDT de HIV em adultos (Conitec) não pôde ser lido (CAPTCHA); conduta clínica atual com a terapia antirretroviral, além do que está acima, não entra sem fonte.

**Depois** (proposto; o resto do `texto` fica igual):
> Atualização pelo Protocolo Clínico e Diretrizes Terapêuticas (PCDT) para Manejo da Infecção pelo HIV em Adultos (Ministério da Saúde, 2024). Terapia antirretroviral (Tarv): recomendada “para todas as pessoas vivendo com HIV ou aids, independentemente do CD4”; “A Tarv deve ser iniciada no mesmo dia ou em até 7 (sete) dias após o diagnóstico da infecção pelo HIV” (Módulo I, p. 31). Candidíase: “A candidíase orofaríngea e/ou esofágica é comum entre pessoas vivendo com HIV ou aids, geralmente naquelas com CD4 inferior a 200 células/mm³.” “O sintoma mais comum de candidíase orofaríngea é o aparecimento de placas removíveis e esbranquiçadas. Também podem ocorrer queilite angular ou pápulas eritematosas na mucosa.” (Módulo II, p. 100). “O diagnóstico de candidíase oral e/ou esofágica é clínico” (p. 101). Tratamento (Quadro 27, p. 101): “Formas leves ou moderadas podem ser tratadas com fluconazol 100 mg/dia por 7 a 14 dias.” Alternativa tópica: “5 mL de nistatina suspensão oral: bochechar e deglutir, 4 a 5 vezes ao dia.” A candidíase oral é tratada como sinal de imunodepressão grave: entra nos achados sugestivos de pneumocistose (“CD4 abaixo de 200 células/mm3 ou sinais clínicos de imunodepressão grave, como candidíase oral”, Quadro 24, p. 93) e na indicação de profilaxia primária contra Pneumocystis jiroveci e Toxoplasma gondii (Quadro 29, p. 109). Depois do início da Tarv, na síndrome inflamatória da reconstituição imune (Siri), o PCDT lista (Módulo I, Quadro 23, p. 91): Sarcoma de Kaposi, “Agravamento da doença”; “Pode haver reativação de HSV e VZV após o início da Tarv”; “Aparecimento ou piora das manifestações dermatológicas, tais como foliculites e verrugas orais e genitais.” Macete: candidíase oral no paciente com HIV aponta CD4 baixo (geralmente abaixo de 200 células/mm³). Fontes oficiais: https://bvsms.saude.gov.br/bvs/publicacoes/pcdt_manejo_hiv_adultos_modulo1.pdf e https://bvsms.saude.gov.br/bvs/publicacoes/pcdt_manejo_hiv_adultos_modulo2.pdf (PDFs abertos e conferidos em 27/11/2026). PENDENTE: o PCDT não trata do atendimento odontológico nem da leucoplasia pilosa; a conduta odontológica fica só a do livro do MS de 2018 citado acima.

Pontos para o dono decidir antes de aplicar:
- **Doses** (fluconazol, nistatina): são literais e oficiais, mas o tratamento da candidíase no paciente com HIV é conduta médica do PCDT. Se preferir, tirar as duas frases de dose e deixar só "tratamento no Quadro 27".
- Unidade: o livro do MS de 2018 (Quadro 13) escreve "células/μl"; o PCDT escreve "células/mm³". Não misturar as duas na mesma frase sem citar a fonte de cada uma.
- Sem conflito com o texto atual: o de 2018 lista candidíase, doença periodontal, leucoplasia pilosa, Kaposi e herpes simples como as mais frequentes; o PCDT não as contradiz e não lista as manifestações bucais em conjunto.

### 1b. Mesmo arquivo, linha 10 (`limiteFonte`)

**Antes** (copiado):
> O PCDT de HIV em adultos (Conitec) não foi lido (o site pediu CAPTCHA em 26/11/2026).

**Depois** (proposto):
> PCDT para Manejo da Infecção pelo HIV em Adultos, Módulo I (Tratamento) e Módulo II (Coinfecções e Infecções Oportunistas), Ministério da Saúde, Brasília, 2024, 1ª edição, PDFs oficiais da BVS https://bvsms.saude.gov.br/bvs/publicacoes/pcdt_manejo_hiv_adultos_modulo1.pdf e https://bvsms.saude.gov.br/bvs/publicacoes/pcdt_manejo_hiv_adultos_modulo2.pdf, trechos literais conferidos em 27/11/2026 (as cópias do gov.br/conitec pediram CAPTCHA em 26/11/2026; a da BVS abriu direto).

### 1c. `curso/apostila/odontologia-pacientes-especiais-navegantes.json`, linha 97

**Atual** (copiado):
> Os grupos que o programa do edital lista e que o Guia não trata (transtornos psiquiátricos, distúrbios sensoriais, doenças sistêmicas crônicas, infectocontagiosas, irradiados, transplantados, oncológicos, gestantes e imunocomprometidos), HIV, laser, ergonomia e fármacos e doses permanecem PENDENTES: sem fonte oficial lida, nada foi escrito sobre eles.

**Proposta: não mudar agora.** O PCDT não fala do atendimento odontológico; o que vale para PNE com HIV seria o livro do MS de 2018 (já usado na Apostila 08). Se o dono quiser, o texto pode remeter à lição de HIV da Apostila 08, mas isso é decisão de conteúdo e fica fora desta proposta.

### O que continua PENDENTE (HIV)
- Conduta odontológica atual com base no PCDT: o PCDT não trata do assunto (busca sem resultado para odont/dentist/bucal/periodont/gengiv/leucoplasia).
- Leucoplasia pilosa e doença periodontal no HIV: só há o MS 2018 e o Caderno 17; o PCDT não fala delas.
- Profilaxia pós-exposição ocupacional (acidente perfurocortante): PCDT de PEP não lido nesta rodada.
- Não confirmei se existe versão do PCDT de HIV em adultos mais nova que a de 2024. A de 2024 é a que a BVS publica com essas URLs.

---

## ITEM 2: IFFar. Resultado do sorteio de vagas reservadas ACHADO

### Fonte

- Fundatec: `https://www.fundatec.org.br/portal/concursos/index.php` voltou de novo **HTTP 202 com corpo vazio** (curl, 27/11/2026); o WebFetch também recebeu página vazia. Não insisti nem contornei.
- IFFar: a página de concursos (https://www.iffarroupilha.edu.br/concursos e https://www.iffarroupilha.edu.br/editais-concursos, HTTP 200) lista um item novo:
  - Página: https://www.iffarroupilha.edu.br/editais-reitoria/item/49039-edital-n%C2%BA-434-2026-concurso-p%C3%BAblico-de-t%C3%A9cnicos-administrativos-em-educa%C3%A7%C3%A3o-do-iffar-resultado-do-sorteio-p%C3%BAblico-complementar ("Publicado em Quarta, 25 de Novembro de 2026, 08h49").
  - PDF: https://www.iffarroupilha.edu.br/component/k2/attachments/download/61091/130cd667c4c93e107648b74893b6627a (HTTP 200, application/pdf, 205.851 bytes, 3 páginas, SHA-256 `1529904E564715102CBE87D4D0587037467744157D6343EAB031B44E18D4819C`).
- A página do Edital 406/2026 continua listando só o PDF do edital (Rev 10). O resultado está num item separado.

Trechos literais do PDF (Edital nº 434/2026):
> "EDITAL Nº 434/2026 – RESULTADO DO SORTEIO PÚBLICO COMPLEMENTAR DE DISTRIBUIÇÃO DAS VAGAS PARA AS RESERVAS DE VAGAS E RETIFICAÇÃO DO EDITAL DE ABERTURA"
> "Publicado no Diário Oficial da União de 25/11/2026 – seção 3 – página 33"
> "1.1. Em conformidade com o registrado na Ata do Sorteio Público Complementar de Distribuição das Vagas Imediatas para as Reservas de Vagas, realizado no dia 18 de novembro de 2026 e publicado em 19 de novembro de 2026, inclui-se no quadro de distribuição de vagas imediatas no ANEXO I – QUADRO DEMONSTRATIVO DE CARGOS E VAGAS IMEDIATAS, do Edital de Abertura, a realocação das vagas reservadas, bem como a ordem de redirecionamento, passando a vigorar conforme segue:"

Linha do Odontólogo (p. 2 do PDF). Colunas do quadro: "Vagas AC | Vagas PCD | Vagas PN | Vaga PI | Vaga PQ | Total de vagas". Extração `pdftotext -raw`:
> "10 Odontólogo [...] 03 * 01 * * 04"

Leitura: **AC 3, PcD nenhuma ("*"), pessoas negras 1, indígena nenhuma, quilombola nenhuma, total 4** (3 + 1 = 4, confere). Fecho do PDF: "Santa Maria, 25 de novembro de 2026. Nidia Heringer, Reitora". O "*" aqui não tem legenda no Edital 434; no Edital 406 (p. 45) ele quer dizer "Não há vagas previstas antes do sorteio". Pela soma do total, o "*" vale zero.

Resultado: para o Odontólogo, o sorteio **não mudou** a reserva (já era 1 para pessoas negras e nenhuma PcD) e **completou o número de ampla concorrência: 3**, que o edital de abertura não trazia.

### 2a. `site/dados/concurso.json`, linha 12 (IFFar, `cargos[0].vagas`)

**Antes** (copiado):
> 4 vagas imediatas, sendo 1 reservada para pessoas negras (distribuição antes do sorteio de 18/11/2026; resultado do sorteio não conferido: PENDENTE)

**Depois** (proposto):
> 4 vagas imediatas: 3 de ampla concorrência e 1 reservada para pessoas negras; nenhuma para pessoas com deficiência, indígenas ou quilombolas (resultado do sorteio de 18/11/2026, Edital nº 434/2026)

### 2b. Mesmo arquivo, linha 40 (`fonteDados`)

**Antes** (copiado):
> Edital nº 406/2026 do IFFar (PDF oficial, Rev 10 de 12/11/2026), conferido em 26/11/2026. PENDENTE: o resultado do sorteio das vagas reservadas (18/11/2026) e eventuais retificações no site da Fundatec não foram conferidos (o site da banca não respondeu à consulta automática); a página oficial do IFFar lista só o edital Rev 10.

**Depois** (proposto):
> Edital nº 406/2026 do IFFar (PDF oficial, Rev 10 de 12/11/2026), conferido em 26/11/2026, e Edital nº 434/2026 (resultado do sorteio complementar das vagas reservadas e retificação do Anexo I, DOU de 25/11/2026), conferido em 27/11/2026. PENDENTE: o site da Fundatec não respondeu à consulta automática, então outras publicações da banca não foram conferidas.

### 2c. Mesmo arquivo, `links` do IFFar (depois do "Anexo do edital")

**Acrescentar** (proposto):
```json
{
  "texto": "Resultado do sorteio das vagas (Edital 434/2026)",
  "url": "https://www.iffarroupilha.edu.br/editais-reitoria/item/49039-edital-n%C2%BA-434-2026-concurso-p%C3%BAblico-de-t%C3%A9cnicos-administrativos-em-educa%C3%A7%C3%A3o-do-iffar-resultado-do-sorteio-p%C3%BAblico-complementar"
}
```
E `atualizadoEm` (linha 2): "26/11/2026" → "27/11/2026".

Lembretes para quem aplicar: rodar o monitor com `--atualizar` depois de mexer em `concurso.json` (memória "Monitor de concursos") e, se `concurso-iffar-2026-11-26.md` for reaproveitado, a linha "Ampla concorrência: número não consta no edital" agora tem resposta (3, pelo Edital 434).

### O que continua PENDENTE (IFFar)
- Site da Fundatec: HTTP 202 vazio de novo; nenhuma publicação da banca foi conferida (retificações, cronograma).
- A "Ata do Sorteio [...] publicado em 19 de novembro de 2026" e a "ordem de redirecionamento" citadas no item 1.1 não foram achadas na página do IFFar (devem estar na Fundatec); o Edital 434 traz só o quadro.
- O DOU de 25/11/2026, seção 3, p. 33 não foi aberto: a data e a página vêm do cabeçalho do PDF do IFFar.
