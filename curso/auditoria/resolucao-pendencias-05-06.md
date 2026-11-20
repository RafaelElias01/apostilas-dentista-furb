# Resolução das pendências: Apostilas 05 e 06 (Cirurgião-Dentista, FURB, Blumenau)

- **Data:** 19/11/2026. **Autor:** professor-cursinho (Opus). Este arquivo **não altera** as apostilas: traz o texto pronto para outro agente aplicar.
- **Apostilas:** 05 = `curso/apostila/cariologia-prevencao-odontopediatria.json`; 06 = `curso/apostila/dentistica-endodontia-trauma.json`.
- **Banco de questões:** `curso/questoes-anteriores.json` (campo `grupo` = G0xxx). Os PDFs das provas **não** estão nesta máquina: nada aqui confere transcrição de prova.
- **Como localizar cada ponto:** `licoes[id=<id da lição>].pontos[<índice, começando em 0>]`, mais o começo do texto do ponto.
- **Status:** RESOLVIDO = fonte oficial ou científica aberta confirma o texto proposto; PARCIAL = parte confirmada, parte continua PENDENTE; NÃO RESOLVIDO = continua PENDENTE (diz o que tentei).
- **Siglas:** MS = Ministério da Saúde; AAPD = American Academy of Pediatric Dentistry (Academia Americana de Odontopediatria); IADT = International Association of Dental Traumatology (Associação Internacional de Traumatologia Dentária); DPT = dose provavelmente tóxica; CAB 17 = Caderno de Atenção Básica nº 17 (Saúde Bucal); PMC = PubMed Central (repositório aberto de artigos).
- **Regra para quem aplicar:** onde houver "aviso didático", não negar o gabarito; o texto já diz "na prova, siga o gabarito histórico".

## 0. Fontes conferidas (todas abertas; acesso em 19/11/2026)

| Cód. | Fonte | URL | O que li |
|---|---|---|---|
| F1 | MS. *Guia de recomendações para o uso de fluoretos no Brasil*, **2ª ed.**, Brasília, 2026 (ficha catalográfica: "2. ed. – Brasília: Ministério da Saúde, 2026. 102 p."; a capa externa traz "2025") | https://bvsms.saude.gov.br/bvs/publicacoes/guia_recomendacoes_uso_fluoretos_Brasil_2edimp.pdf | texto integral extraído; Quadro 1 (p. 27) e Tabela 2 (p. 26) conferidos **na imagem** da página |
| F2 | MS. *Guia de recomendações para o uso de fluoretos no Brasil*, 1ª ed., 2009 | https://cecol.fsp.usp.br/dcms/app/webroot/uploads/arquivos/1442356520_Brasil-MS-SAS-DAB-GuiaRecomendacoesUsoFluoretosBrasil-2009.pdf | p. 12, 27, 28, 32, 33, 41 |
| F3 | MS. *Saúde Bucal*. Cadernos de Atenção Básica nº 17, 2008 (1ª ed., 1ª reimpr.) | https://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal.pdf | p. 31, 34, 35, seção 4.5 |
| F4 | MS. *SB Brasil 2010: Pesquisa Nacional de Saúde Bucal – Resultados Principais*, 2012 | https://bvsms.saude.gov.br/bvs/publicacoes/pesquisa_nacional_saude_bucal.pdf | p. 27, 28, 89, 91 |
| F5 | AAPD. *Management of the Developing Dentition and Occlusion in Pediatric Dentistry* (revisão 2024; Reference Manual 2026, p. 525-543) | https://www.aapd.org/globalassets/media/policies_guidelines/bp_developdentition26.pdf | seções "Congenitally missing teeth" e "Space maintenance" (p. 533) |
| F6 | AAPD. *Pulp Therapy for Primary and Immature Permanent Teeth* (revisão 2026; Reference Manual 2026, p. 513-524) | https://www.aapd.org/globalassets/media/policies_guidelines/bp_pulptherapy26.pdf | "Direct pulp cap" e "Pulpotomy" (p. 515) |
| F7 | Bourguignon C et al. IADT guidelines 2020: 1. Fractures and luxations. *Dent Traumatol* 2020;36(4):314-330 (manuscrito aceito) | https://eprints.whiterose.ac.uk/id/eprint/161684/ | Tabelas 5, 6 e 10 conferidas na imagem/texto |
| F8 | Fouad AF et al. IADT guidelines 2020: 2. Avulsion of permanent teeth. *Dent Traumatol* 2020;36:331-342 (manuscrito aceito) | https://eprints.whiterose.ac.uk/161687/1/IADT%20guidelines%20-%20Avulsion%20of%20permanent%20teeth.pdf | itens 1b, 1c, 2b, 2c e "open apices" |
| F9 | Barbosa CS, Di Nicoló R, Ursi WJS. Estudo da prevalência dos tipos de planos terminais dos segundos molares decíduos. *Pós-Grad. Rev. Fac. Odontol. São José dos Campos* 2000;3(1) (UNESP) | https://bds.ict.unesp.br/index.php/cob/article/download/78/42/282 | revisão de literatura e metodologia |
| F10 | Bhargava M et al. Bilateral dental lamina cysts of the newborn. *Contemp Clin Dent* 2026;17(3):200-203 (PMC13644920) | https://pmc.ncbi.nlm.nih.gov/articles/PMC13644920/ | introdução e diagnóstico diferencial |
| F11 | Daley JO, Mendez MD. Palatal and gingival cysts of the newborn. *StatPearls* 2025 (PMID 29630229) | https://www.ncbi.nlm.nih.gov/books/NBK562155/ | só o resumo (a página pediu captcha) |
| F12 | Szymczak A et al. Incidence of natal and neonatal teeth. *BMC Oral Health* 2025;25 (PMC12751276) | https://pmc.ncbi.nlm.nih.gov/articles/PMC12751276/ | resumo e introdução |
| F13 | Mhaske S et al. Natal and neonatal teeth: an overview of the literature. *ISRN Pediatr* 2013:956269 (PMC3759256) | https://pmc.ncbi.nlm.nih.gov/articles/PMC3759256/ | seção "Complications" |
| F14 | Zhou M et al. Analyses of oligodontia phenotypes and genetic etiologies. *Int J Oral Sci* 2021;13:32 (PMC8484616) | https://pmc.ncbi.nlm.nih.gov/articles/PMC8484616/ | resumo e introdução |
| F15 | Saber AM et al. Atraumatic Restorative Treatment and Interim Therapeutic Restoration: a review. *Dent J (Basel)* 2019;7(1):28 (PMC6473645) | https://pmc.ncbi.nlm.nih.gov/articles/PMC6473645/ | seções 2.2 e 2.3 |
| F16 | Khoury RD et al. Endodontic irrigants from a comprehensive perspective. *World J Clin Cases* 2024;12(21):4460 (PMC11235474) | https://pmc.ncbi.nlm.nih.gov/articles/PMC11235474/ | Tabela 1 |
| F17 | Vishwanath V, Rao HM. Gutta-percha in endodontics: a comprehensive review of material science. *J Conserv Dent* 2019;22(3):216 (PMC6632621) | https://pmc.ncbi.nlm.nih.gov/articles/PMC6632621/ | Tabela 4 |
| F18 | Yen M, Yeung AWK. The performance of paralleling technique and bisecting angle technique… *Dent J (Basel)* 2023;11:155 (PMC10378420) | https://pmc.ncbi.nlm.nih.gov/articles/PMC10378420/ | introdução |
| F19 | Almashraqi AA et al. CBCT da ATM: revisão sistemática. *Eur Radiol* 2024;34:3126 (PMC11126469) | https://pmc.ncbi.nlm.nih.gov/articles/PMC11126469/ | introdução |
| F20 | Feilzer AJ, De Gee AJ, Davidson CL. Setting stress in composite resin in relation to configuration of the restoration. *J Dent Res* 1987;66(11):1636-1639 | https://europepmc.org/article/MED/10872397 (resumo) | resumo |
| F21 | Ghulman MA. Effect of cavity configuration (C factor) on the marginal adaptation of low-shrinking composite. *Int J Dent* 2011:159749 (PMC3178442) | https://pmc.ncbi.nlm.nih.gov/articles/PMC3178442/ | métodos |
| F22 | Wolf TG et al. Morphology of the physiological foramen: a systematic review. *Dent J (Basel)* 2025;13:581 (PMC12732147) | https://pmc.ncbi.nlm.nih.gov/articles/PMC12732147/ | Tabela 3 e discussão |
| F23 | Bailey O. The long-term oral health consequences of an amalgam phase-out. *Br Dent J* 2025;238(8):621 (PMC12031667) | https://pmc.ncbi.nlm.nih.gov/articles/PMC12031667/ | seções "Restoration survival" e "Patient perspectives" |

---

## 1. Apostila 05: Cariologia, Prevenção, Saúde Bucal Coletiva e Odontopediatria

### 05-01 · `limiteFonte` (livro/diretriz "a definir", SB Brasil e Guia "a localizar") · **RESOLVIDO** (no que é fonte aberta)
- **Onde:** campo `limiteFonte`, as três frases que começam com "PENDENTE: livro/diretriz…", "PENDENTE: levantamento nacional…" e "PENDENTE: Guia de recomendações…".
- **Texto proposto (substitui as três frases):** "Fontes oficiais abertas usadas nesta apostila (acesso em 19/11/2026): Guia de recomendações para o uso de fluoretos no Brasil (Ministério da Saúde, 2ª edição, 2026, e 1ª edição, 2009); Caderno de Atenção Básica nº 17, Saúde Bucal (Ministério da Saúde, 2008); SB Brasil 2010, Pesquisa Nacional de Saúde Bucal, Resultados Principais (Ministério da Saúde, 2012); e as recomendações (Best Practices) da AAPD, a Academia Americana de Odontopediatria (Reference Manual 2026). Nenhum livro-texto pago foi conferido; o relatório final do SB Brasil 2023 não foi localizado em PDF aberto (a página do gov.br pedia login em 19/11/2026)."
- **Fontes:** F1, F2, F3, F4, F5, F6. Mantém-se o PENDENTE sobre a transcrição das provas e sobre G0160/G0169 (imagem).

### 05-02 · G0165 · plano terminal dos segundos molares decíduos (Baume) · **RESOLVIDO** (aviso didático)
- **Onde:** `licoes[id=odontopediatria].pontos[1]` ("O primeiro molar permanente nasce guiado…"). Substituir do trecho "Em livros-texto, essa relação…" até o fim.
- **Texto proposto:** "Segundo Baume (1950), citado por Barbosa, Di Nicoló e Ursi (2000, UNESP), as faces distais dos segundos molares decíduos podem estar em plano reto (topo a topo), degrau mesial para a mandíbula ou degrau distal para a mandíbula. Plano reto: as faces distais superior e inferior ficam no mesmo plano vertical. Degrau mesial: a face distal do inferior fica à frente (mesial) da face distal do superior. Degrau distal: a face distal do superior fica à frente da do inferior, ou seja, o inferior fica para trás. ⚠ Aviso: em G0165 (2021P) a pergunta era EXCETO e o gabarito oficial (o mesmo no preliminar e no definitivo) foi a alternativa E, 'Plano reto, degrau mesial para a mandíbula e degrau distal para a mandíbula'. Essa frase é justamente a descrição de Baume. A banca marcou E; a literatura diz que E é a classificação correta. Na prova, se a questão vier igual, siga o gabarito histórico (E). Se pedirem a classificação, marque a de Baume. Não decore a alternativa E como 'errada'. (O texto da questão não foi conferido no PDF da prova.)"
- **Fonte F9:** p. 2 (Revisão da literatura): "Segundo Baume4, (1950) os primeiros molares permanentes são guiados pela superfície distal dos segundos molares decíduos, que podem estar em uma relação de topo a topo (plano reto), degrau mesial para a mandíbula ou degrau distal para a mandíbula." Definições: "O plano terminal com degrau mesial ocorre quando a face distal do segundo molar decíduo inferior se encontra numa relação anterior ou mesial à face distal do segundo molar decíduo superior. O plano terminal com degrau distal é encontrado quando a face distal do segundo molar decíduo superior oclui mesialmente à face distal do segundo molar decíduo inferior". O artigo original de Baume (J Dent Res 1950) não foi aberto: a citação é de segunda mão, mas em artigo universitário revisado.

### 05-03 · G0252 · mantenedor de espaço (indicações por idade) · **PARCIAL**
- **Onde:** `licoes[id=odontopediatria].pontos[2]`; substituir "PENDENTE: indicações e contraindicações por idade, conforme livro de odontopediatria."
- **Texto proposto:** "Pela AAPD (diretriz de 2024 sobre o desenvolvimento da dentição), a decisão não segue uma idade fixa. Avaliam-se: o dente perdido, o tempo desde a perda, a oclusão e o espaço, a idade dentária, a presença e a formação da raiz do sucessor, o osso que o cobre, a saúde geral, a colaboração da criança, os hábitos e a higiene. A AAPD também avisa que faltam consenso e evidência sobre a eficácia do mantenedor para evitar a má oclusão, e que o aparelho deve funcionar até o permanente irromper na posição correta. Por isso as alternativas com regra de idade ('mais de 10 anos sempre instala'; 'menos de 10 anos só orientar') estavam erradas. A alternativa 'remover assim que o dente permanente irromper completamente' também foi dada como errada; a diretriz fala em manter até a posição correta. Na prova, siga o gabarito."
- **Fonte F5,** p. 533: "Factors to consider include specific tooth lost; time elapsed since tooth loss; occlusion and space assessment; dental age; presence and root development of permanent successor; amount of alveolar bone covering permanent successor; patient's health history and medical status; patient's cooperative ability; active oral habits; and oral hygiene." / "consensus or evidence regarding the effectiveness of space maintainers in preventing or reducing the severity of malocclusion is lacking." / "The appliance should function until the permanent tooth has erupted into the correct position."
- **Falta:** contraindicações em livro brasileiro (não consultado).

### 05-04 · G0042/G0321 · definição de cada anomalia (fusão, concrescência, dilaceração, taurodontismo) · **NÃO RESOLVIDO**
- **Onde:** `licoes[id=odontopediatria].pontos[5]`. Não pesquisei neste lote (fora da lista prioritária). Manter o PENDENTE.

### 05-05 · G0255 · limite hipodontia × oligodontia · **RESOLVIDO**
- **Onde:** `licoes[id=odontopediatria].pontos[6]`; substituir "PENDENTE: o limite que separa hipodontia de oligodontia em livro-texto."
- **Texto proposto:** "Limite mais usado: oligodontia é a ausência congênita de 6 ou mais dentes, sem contar os terceiros molares; hipodontia, no sentido estrito, é a falta de 1 a 5 dentes (Zhou et al., Int J Oral Sci, 2021). Alguns autores escrevem 'hipodontia de 1 a 6', o que cria sobreposição no número 6. A AAPD usa 'hipodontia' no sentido amplo: ausência congênita de 1 ou mais dentes. Anodontia = ausência de todos."
- **Fonte F14:** "oligodontia is a less common dominant disorder with a hallmark presentation of congenital absence of six or more teeth, exclu[ding third molars]" e "Hypodontia (five or less missing teeth) comprised only 11.25% of the total. The rest had oligodontia (at least six missing teeth)." **F5** (p. 528, seção "Congenitally missing teeth"): "Hypodontia, the congenital absence of 1 or more teeth". Divergência: Chhabra et al., *Med Oral Patol Oral Cir Bucal* 2014;19:e112 (PMC4015040): "it describes the absence of one to six teeth, excluding third molars. Oligodontia […] refers to the congenital absence of six or more teeth". A página da F5 foi estimada pela numeração (PDF p. 4); confira antes de citar a página.

### 05-06 · G0166 · prazo do dente neonatal · **RESOLVIDO**
- **Onde:** `licoes[id=odontopediatria].pontos[9]`; trocar "(PENDENTE: o prazo exato, conforme livro)" por: "(irrompe nos primeiros 30 dias de vida)".
- **Fonte F12** (resumo): "Natal and neonatal teeth are deciduous teeth present at birth or erupting within the first 30 days of life, respectively." Igual em Krasuska-Sławińska et al., *Sci Rep* 2025;15 (PMC12546940): "a neonatal tooth emerges within 30 days of birth". Riga-Fede: **F13**: "A major complication from natal/neonatal teeth is ulceration on the ventral surface of the tongue caused by the tooth's sharp incisal edge. This condition is also known as Riga-Fede disease".

### 05-07 · G0320 · descrição correta do cisto gengival e dos nódulos de Bohn · **RESOLVIDO** (sem cor e sem tamanho)
- **Onde:** `licoes[id=odontopediatria].pontos[10]`; substituir "PENDENTE: descrição correta dessas duas lesões…" até o fim.
- **Texto proposto:** "Descrição na literatura: pérolas de Epstein são nódulos císticos cheios de queratina ao longo da rafe palatina mediana; nódulos de Bohn são restos de glândulas mucosas nas faces vestibular ou lingual dos rebordos alveolares (e não no assoalho da boca nem no dorso da língua); o cisto gengival do recém-nascido (cisto da lâmina dentária) fica na crista do rebordo alveolar e nasce de restos da lâmina dentária (e não do ectomesênquima). As três lesões são benignas, desaparecem sozinhas e, em geral, basta orientar os pais. A epúlide congênita fica tipicamente no rebordo anterior da maxila e, na maioria dos casos, precisa de cirurgia. Observação do professor: em G0320, a alternativa A dava às pérolas de Epstein um quadro parecido com o da epúlide (nódulo único no rebordo anterior da maxila), e a E dava à epúlide a localização das pérolas de Epstein (rafe palatina)."
- **Fonte F10** (introdução): "Epstein's pearls first described in 1880 are cystic, keratin-filled nodules found along the mid-palatine raphe." / "Bohn's nodules were originally described in 1866 as remnants of mucous gland tissue found on the buccal or lingual aspects of the dental ridges." / "DLCs or alveolar cysts are found on the ridge of newborn or very young infants which represent cysts originating from remnants of the dental lamina. They were postulated to be found along the crest of the ridges." / "Congenital epulis is typically located in the anterior maxillary ridge and needs surgical management in the majority of cases, whereas DLC is self-limiting." **F11** (resumo): "healthcare professionals caring for newborns should be well-informed about these benign, self-resolving lesions". O título de F10 ("atypical mandibular location") sugere que a mandíbula não é o local típico; **não afirmei a cor** (não achei em fonte aberta).
- **Tabela da lição** (`licoes[id=odontopediatria].tabela.linhas[4]`): trocar a célula por "Bohn: faces vestibular/lingual do rebordo; cisto gengival: crista do rebordo, da lâmina dentária; Epstein: rafe palatina".

### 05-08 · G0078 · formocresol (indicações e alternativas) · **PARCIAL**
- **Onde:** `licoes[id=odontopediatria].pontos[11]`; substituir o PENDENTE final.
- **Texto proposto:** "Atualização: a AAPD (diretriz de terapia pulpar, revisão 2026) afirma que cimentos de silicato de cálcio, como MTA e Biodentine, tiveram taxas de sucesso maiores em pulpotomias do que outros materiais; o texto atual da diretriz não recomenda o formocresol pelo nome (ele aparece só nas referências). Em prova, a FURB cobrou o mecanismo do formocresol (G0078); guarde a resposta da questão e saiba que a tendência atual é o silicato de cálcio."
- **Fonte F6,** p. 515: "Calcium silicate cements, such as MTA and biodentine, have shown increased success rates in pulpotomies compared to other materials." Contraindicações não conferidas.

### 05-09 · G0259 · capeamento direto em decíduo · **RESOLVIDO** (aviso didático)
- **Onde:** `licoes[id=odontopediatria].pontos[12]`; substituir "(PENDENTE confirmar em livro). PENDENTE: confirmar o protocolo em livro de odontopediatria."
- **Texto proposto:** "⚠ Aviso: a banca marcou capeamento direto (alternativa D). A AAPD (2026) indica o capeamento direto em decíduo para exposição pequena (menos de 1 mm) e NÃO cariosa, mecânica ou traumática; quando a remoção de cárie expõe a polpa de um decíduo com polpa normal ou pulpite reversível, a AAPD indica a pulpotomia, que não estava entre as alternativas de G0259. Na prova, siga o gabarito histórico (D, com a sequência hidróxido de cálcio P.A. + cimento de hidróxido de cálcio + ionômero de vidro); para a clínica, entenda a diretriz."
- **Fonte F6,** p. 515: "Direct pulp cap. When a noncarious, small mechanical or traumatic exposure of the pulp is encountered, a biocompatible radiopaque base such as MTA or calcium hydroxide may be placed in contact with the exposed pulp tissue." / "This procedure is indicated in a primary tooth with a normal pulp following a small (<1 mm) pulp exposure" / "A pulpotomy is performed in a primary tooth when caries removal results in a pulp exposure in a tooth with a normal pulp or reversible pulpitis".

### 05-10 · G0169 · imagem radiográfica · **NÃO RESOLVIDO**
- Depende do PDF da prova (não existe nesta máquina). Manter o PENDENTE e o aviso de que a questão depende de imagem.

### 05-11 · G0073 · protocolo do ART (TRA) · **PARCIAL**
- **Onde:** `licoes[id=odontopediatria].pontos[14]`; substituir "PENDENTE: o protocolo completo do ART, conforme livro."
- **Texto proposto:** "O Caderno de Atenção Básica nº 17 (Ministério da Saúde, 2008, p. 35) descreve o TRA assim: preparo sem anestesia, remoção do tecido cariado amolecido com instrumentos manuais e selamento da cavidade com cimento ionomérico. Uma revisão de 2019 (Saber et al.) acrescenta: colher de dentina afiada, machado para ampliar a cavidade, selar com o próprio ionômero as fissuras vizinhas e usar um condicionador de ácido poliacrílico antes do ionômero. A concentração do condicionador varia conforme o produto (o produto citado na revisão tem 20%). O '10%' de G0073 é valor da questão, e por isso o gabarito manda 'seguir as recomendações do fabricante'."
- **Fontes:** **F3,** p. 35: "Utiliza técnicas menos invasivas - preparo cavitário feito sem anestesia, remoção do tecido cariado amolecido e desorganizado com instrumentos manuais e selamento da cavidade com cimentos ionoméricos." **F15:** "The instrument used in ART is a sharp spoon excavator with a diameter of 1 or 1.5 mm to remove the soft caries" / "The unaffected fissures should also be sealed by GIC" / "The conditioner is composed of 20% polyacrylic acid and 3% aluminum chloride hexahydrate". O protocolo da OMS (Frencken) não foi aberto.

### 05-12 · G0160 · ulectomia (critérios) · **NÃO RESOLVIDO**
- Não achei diretriz aberta; depende de livro e da imagem da prova. Manter o PENDENTE.

### 05-13 · itens do edital do Odontopediatra sem questão · **NÃO RESOLVIDO**
- `licoes[id=odontopediatria].pontos[17]`. Fora do escopo deste lote. Fonte aberta sugerida para o próximo lote: F6 e outras Best Practices da AAPD (radiologia e paciente com necessidades especiais), sem conferir agora.

### 05-14 · G0037/G0060/G0079 · fatores facilitadores, desencadeantes e predisponentes · **NÃO RESOLVIDO**
- `licoes[id=epidemiologia-bucal].pontos[1]`. Não achei a classificação em F3 nem em F4. Manter o PENDENTE.

### 05-15 · G0256 · o que cada índice mede (DAI, IHOS, IPC, O'Leary, Dean) · **PARCIAL**
- **Onde:** `licoes[id=epidemiologia-bucal].pontos[3]`; substituir o PENDENTE.
- **Texto proposto:** "No SB Brasil 2010 (Ministério da Saúde), o DAI (Índice de Estética Dental) combina 11 medidas da dentição, do espaço e da oclusão e considera o comprometimento estético além da oclusão; o CPI (Índice Periodontal Comunitário, a sigla IPC da questão) registra sangramento, cálculo e bolsa periodontal por sextante; o Índice de Dean é o recomendado pela OMS para a fluorose em estudos populacionais. A expressão 'percepção do próprio indivíduo' é do enunciado de G0256 e não aparece nessa descrição oficial. IHOS e O'Leary: PENDENTE de fonte."
- **Fonte F4,** p. 28: "O princípio básico do DAI é de uma combinação de medidas (não somente de problemas oclusais) […] que considera o comprometimento estético, além da oclusão. Ao todo, são obtidas 11 medidas"; "[Índice de Dean] É o índice recomendado pela OMS para estudos de fluorose dentária em populações". p. 27: "O CPI verifica a ocorrência de sangramento, cálculo e presença de bolsa periodontal (rasa e profunda), tendo como referência o exame por sextante".

### 05-16 · G0366 · números do SB Brasil (doença periodontal) · **RESOLVIDO** (ano 2010)
- **Onde:** `licoes[id=epidemiologia-bucal].pontos[5]`; substituir "PENDENTE: números do levantamento nacional…".
- **Texto proposto:** "Dado oficial do SB Brasil 2010 (Ministério da Saúde, publicado em 2012): os problemas periodontais 'aumentam, de modo geral, com a idade'. Não tinham nenhum problema periodontal 63% das crianças de 12 anos, 50,9% dos jovens de 15 a 19 anos, 17,8% dos adultos de 35 a 44 anos e só 1,8% dos idosos de 65 a 74 anos. Isso explica por que a alternativa 'varia com a idade' é defensável e por que 'mais de 90%' não vale para crianças e adolescentes. Os números do SB Brasil 2023 não foram conferidos."
- **Fonte F4,** p. 91: "No que diz respeito às condições periodontais, avaliadas pelo Índice Periodontal Comunitário (CPI), em termos populacionais, tais problemas aumentam, de modo geral, com a idade. Os resultados do Projeto SB Brasil 2010 indicam que o percentual de indivíduos sem nenhum problema periodontal foi de 63% para a idade de 12 anos, 50,9% para a faixa de 15 a 19 anos, 17,8% para os adultos de 35 a 44 anos e somente 1,8% nos idosos de 65 a 74 anos." (Se o dono quiser o CPO-D: p. 89, "na pesquisa de 2010, o CPO aos 12 anos ficou em 2,07".) A relação com as condições socioeconômicas (gabarito C) não tem frase direta em F4: PENDENTE de fonte.

### 05-17 · G0134 · tempo de colonização e espécies · **NÃO RESOLVIDO**
- `licoes[id=cariologia].pontos[0]`. Não pesquisado neste lote.

### 05-18 · G0163 · zonas da lesão em dentina · **NÃO RESOLVIDO**
- `licoes[id=cariologia].pontos[3]`. Não pesquisado; depende de livro de cariologia.

### 05-19 · G0352 · componentes e funções da saliva · **NÃO RESOLVIDO**
- `licoes[id=cariologia].pontos[4]`. Não pesquisado neste lote.

### 05-20 · G0077 · verniz e bochechos (Guia de fluoretos) · **RESOLVIDO**
- **Onde:** `licoes[id=fluor].pontos[0]`; substituir "PENDENTE: esses valores vêm da questão…".
- **Texto proposto:** "Compare com o Guia de recomendações para o uso de fluoretos no Brasil (Ministério da Saúde). Na 2ª edição (2026), o verniz é particularmente indicado para crianças em idade pré-escolar, e a recomendação é de ao menos duas aplicações por ano; a 1ª edição (2009) dizia 'no mínimo, duas aplicações anuais' para quem tem atividade de cárie e de duas a quatro por ano em programas coletivos. O protocolo de '4 sessões com intervalos semanais' é o da questão, não o do Guia. O mesmo Guia indica bochecho de NaF 0,05% para uso diário e de NaF 0,2% para uso semanal (as alternativas D e E de G0077 trocavam essas frequências) e lembra que a Anvisa não recomenda enxaguatório com flúor para menores de 6 anos (a criança da questão tinha 2). Gel em aplicação profissional: de duas a quatro vezes por ano, e não diariamente."
- **Fonte F1:** p. 71: "recomendam-se ao menos duas aplicações anuais"; p. 72: "Esses produtos são particularmente indicados para crianças em idade pré-escolar"; p. 61: "Recomenda-se que os enxaguatórios de NaF 0,2% sejam utilizados para bochechos semanais sob supervisão […] Os enxaguatórios de NaF 0,05% são recomendados para uso diário"; p. 60: "sua não recomendação para crianças menores de 6 anos (Anvisa, 2021)"; p. 66: "as APF foram realizadas, em geral, de duas a quatro vezes ao ano"; p. 26 (Tabela 2, conferida na imagem): o verniz aparece como "Verniz fluoretado (5% NaF)". **F2:** p. 32: "Recomendam-se, no mínimo, duas aplicações anuais para pacientes com atividade de cárie ou com história passada de alta experiência de cárie"; p. 33: "Em âmbito de programas de saúde pública/coletiva, recomendam-se de duas a quatro aplicações anuais"; p. 27: "diária (NaF a 0,05%), semanal ou quinzenalmente (NaF a 0,2%)".
- **Cuidado (não aplicar ppm):** na 2ª ed. o verniz aparece com 22.000 ppm F (Tabela 2, p. 26) e 22.600 ppm F (p. 70). Por isso o texto não traz ppm.

### 05-21 · G0161 · "alta frequência e baixa concentração" · **RESOLVIDO** (aviso didático)
- **Onde:** `licoes[id=fluor].pontos[1]`; substituir do "PENDENTE: o gabarito dessa questão parece…" até o fim.
- **Texto proposto:** "⚠ Aviso: a banca marcou A (o regime de flúor 'não seria' recurso para controlar os fatores etiológicos). O Guia do Ministério da Saúde diz que manter flúor constante na boca é o principal mecanismo de ação do flúor contra a cárie (1ª ed., 2009, p. 12; 2ª ed., 2026, p. 18 e 22). Ou seja, esse regime previne cárie. A explicação do gabarito está na 2ª edição (p. 24): o flúor não impede a doença porque não interfere na aderência e no acúmulo das bactérias nem impede que o açúcar vire ácido; para controlar a doença é preciso escovar os dentes e reduzir o açúcar. Então o flúor age na desmineralização e na remineralização, e não nos fatores etiológicos (biofilme e açúcar), que eram o alvo do enunciado. Na prova, siga o gabarito histórico; nunca decore que 'baixa concentração e alta frequência não previne cárie'."
- **Fontes:** **F2,** p. 12: "a presença de F constantemente na cavidade bucal para interagir nesses eventos físico-químicos de des e remineralização […] é o principal mecanismo de sua ação na prevenção da cárie." **F1,** p. 18: "Qualquer fluoreto mantido constante na cavidade bucal tem potencial de interferir com a cárie dentária"; p. 24: "independentemente do meio de uso, o fluoreto não impede que a doença se desenvolva porque ele não interfere com a aderência e o acúmulo das bactérias salivares na superfície dos dentes e também não impede que os açúcares sejam fermentados a ácidos. Logo, para um efeito máximo de controle da doença, os dentes precisam ser escovados e o consumo de açúcar necessita ser reduzido". A transcrição do enunciado não foi conferida no PDF da prova.
- **Pegadinha da lição** (a auditoria pediu esse ajuste no achado 1, em `pegadinhas[4]`): o texto do achado 1 de `curso/auditoria/apostila-05.md` continua válido.

### 05-22 · G0168 · graus de fluorose e "união das manchas" · **PARCIAL**
- **Onde:** `licoes[id=fluor].pontos[2]`.
- **Texto proposto (acrescentar antes do PENDENTE final):** "O Caderno de Atenção Básica nº 17 (Ministério da Saúde, 2008) confirma que as formas brandas aparecem como finas linhas ou manchas branco-giz e que a fluorose torna o esmalte mais poroso, o que o deixa opaco (como nas alternativas aceitas em G0168)."
- **Fonte F3,** seção 4.5: "É caracterizada por aumento da porosidade do esmalte, fazendo com que este pareça opaco." / "As formas brandas de fluorose caracterizadas como finas linhas ou manchas branco-giz que aparecem no esmalte dentário ou nas pontas de cúspides". **Continua PENDENTE:** a "união das manchas" nos graus avançados e a escala de graus de Dean (não achei texto aberto com a escala). O número da página está no sumário de F3 (p. 43); não conferi na página.

### 05-23 · G0258 · DPT e conduta na intoxicação aguda · **RESOLVIDO** (DPT e conduta do MS) / **PARCIAL** (hidróxido de magnésio)
- **Onde:** `licoes[id=fluor].pontos[3]`; substituir "PENDENTE: dose provavelmente tóxica…".
- **Texto proposto:** "A dose provavelmente tóxica (DPT) é de 5,0 mg de flúor por kg de peso corporal. É a quantidade ingerida que deveria exigir tratamento imediato e hospitalização (Guia do Ministério da Saúde, 2ª ed., 2026, p. 25; o mesmo valor está na 1ª ed., 2009, p. 41). Conduta do Guia (Quadro 1, p. 27): abaixo de 5 mg F/kg, dar cálcio por via oral (leite) ou hidróxido de alumínio em gel e observar por 1 hora; acima de 5 mg F/kg, induzir o vômito se tiverem passado no máximo 30 minutos, dar cálcio ou hidróxido de alumínio e internar para observação; acima de 15 mg F/kg, internação hospitalar imediata. ⚠ Aviso: a banca deu como certo o antiácido de hidróxido de MAGNÉSIO (G0258); o Guia cita leite (cálcio) e hidróxido de ALUMÍNIO, e não cita o magnésio. Na prova, siga o gabarito histórico. As alternativas 'limitar o leite' e 'não encaminhar se estiver consciente' contrariam o Guia."
- **Fontes:** **F1,** p. 25: "o valor de 5,0 mg F/kg de peso corporal foi estabelecido como dose provavelmente tóxica (DPT) de exposição aguda ao fluoreto. DPT é aquela quantidade ingerida que deveria exigir intervenção terapêutica imediata e hospitalização". p. 27, Quadro 1, conferido **na imagem** (fonte: Nobrega et al., 2017): "< 5 mg/kg — 1. Adminstração [sic] oral de cálcio (leite) ou hidróxido de alumínio na forma de gel (5 mL de Pepsamar® gel); 2. Observação por 1 h"; "> 5 mg/kg — 1. Induzir o vômito com substâncias eméticas (se decorrido no máximo 30 min da ingestão); 2. Administração oral de cálcio (leite, gluconato de cálcio 5% ou solução de lactato de cálcio) ou hidróxido de alumínio na forma de gel; 3. Internação hospitalar imediata para observação"; "> 15 mg/kg — 1. Providenciar internação hospitalar imediata". **F2,** p. 41: "5,0 mgF/kg corporal, que corresponde à Dose Provavelmente Tóxica (DPT)". **Magnésio:** busquei em fonte aberta e não confirmei. Continua PENDENTE.

### 05-24 · G0369 · mecanismo completo do flúor · **RESOLVIDO**
- **Onde:** `licoes[id=fluor].pontos[4]`; substituir "PENDENTE: o mecanismo completo…" (manter a frase sobre os ppm da alternativa B).
- **Texto proposto:** "Mecanismo, pelo Guia do Ministério da Saúde (2ª ed., 2026, p. 24): quando há flúor no meio (saliva e fluido do biofilme), ele reduz a desmineralização e ativa a remineralização. Água, enxaguatório, dentifrício e aplicação profissional têm em comum a necessidade de manter flúor constante na boca. Por isso a alternativa E ('aumentar a desmineralização e desativar a remineralização') diz o contrário do Guia."
- **Fonte F1,** p. 24: "Ocorrerá uma redução significativa de mineral perdido, porque o fluoreto eficazmente reduz a desmineralização e ativa o processo de remineralização por um mecanismo físico-químico bem conhecido." / "em termos de mecanismo de ação, tanto a água fluoretada como os enxaguatórios bucais, os dentifrícios e a aplicação profissional de produtos fluoretados têm um fator comum para terem eficácia anticárie: todos têm que ter meios (condições) para garantir a constância de fluoreto no meio ambiente bucal."

### 05-25 · intro, tabela, mapa e `comoUsar[6]` da lição de flúor · **RESOLVIDO** (ajuste de texto)
- `licoes[id=fluor].intro`, última frase: trocar "o restante é PENDENTE, a conferir no Guia…" por "doses e frequências do Guia de recomendações para o uso de fluoretos no Brasil (Ministério da Saúde, 2ª ed., 2026) aparecem com a página citada".
- `licoes[id=fluor].mapa.ramos[4].t = "Pendente"`: trocar pelo rótulo "Toxicidade: DPT 5 mg F/kg (Guia MS)".
- `comoUsar[6]`: acrescentar "Na lição de flúor, os números vêm do Guia do Ministério da Saúde, com página."

### 05-26 · G0050 · ordem das fases do plano · **PARCIAL**
- **Onde:** `licoes[id=plano-coletiva-especiais].pontos[0]`; substituir o PENDENTE.
- **Texto proposto:** "O Caderno de Atenção Básica nº 17 (Ministério da Saúde, 2008, p. 34-35) lista, no tratamento da cárie: instrução de higiene, remoção profissional de placa, adequação do meio bucal (remover placa e dentina cariada, selar as cavidades com material provisório como o ionômero de vidro e remover restos radiculares e cálculo), controle da atividade da doença (educação, flúor conforme o risco, dieta), restauração/reabilitação e, por fim, manutenção, que deve ser rotina. A ordem completa das fases do plano integrado (urgência, adequação, tratamento, manutenção) num livro de planejamento: PENDENTE."
- **Fonte F3,** p. 34: "Adequação do Meio Bucal: compreendendo: remoção de placa, remoção da dentina cariada e selamento das cavidades com material provisório (ionômero de vidro ou cimento modificado) e remoção de outros fatores retentivos de placa como restos radiculares e cálculos." p. 35: "O retorno para manutenção deve ser instituído como rotina".

### 05-27 · G0353 · câncer bucal e programas públicos · **PARCIAL**
- **Onde:** `licoes[id=plano-coletiva-especiais].pontos[1]`; substituir o PENDENTE.
- **Texto proposto:** "O Caderno de Atenção Básica nº 17 (Ministério da Saúde, 2008, p. 31) põe o câncer de boca entre os principais agravos de saúde bucal estudados pela epidemiologia, por sua prevalência e gravidade, ao lado de cárie, doença periodontal, traumatismo, fluorose, edentulismo e má oclusão. Programas públicos (Brasil Sorridente): PENDENTE."
- **Fonte F3,** p. 31: "Os principais agravos que acometem a saúde bucal e que têm sido objeto de estudos epidemiológicos em virtude de sua prevalência e gravidade são: (1) cárie dentária; (2) doença periodontal […]; (3) câncer de boca; (4) traumatismos dentários; (5) fluorose dentária; (6) edentulismo; e, (7) má oclusão."

---

## 2. Apostila 06: Dentística, Materiais, Oclusão, Endodontia e Traumatismo

### 06-01 · `limiteFonte`, `comoUsar[6]`, intro de endodontia e de traumatismo · **PARCIAL**
- **`limiteFonte`:** trocar "PENDENTE: diretrizes da IADT… as demais ficam PENDENTES…" por: "Diretrizes da IADT de 2020 conferidas em texto aberto (19/11/2026): fraturas e luxações (Bourguignon et al., Dental Traumatology 2020;36(4):314-330) e avulsão de permanentes (Fouad et al., 2020;36:331-342). A diretriz da dentição decídua não foi aberta (PENDENTE)." Manter o PENDENTE do livro-texto: Hargreaves e Machado et al. (2022) não foram abertos (não são abertos).
- **`licoes[id=traumatismo].intro`:** trocar a frase final por "As condutas citadas vêm das diretrizes da IADT de 2020 (fraturas e luxações; avulsão); a diretriz da dentição decídua continua PENDENTE."
- **`licoes[id=endodontia].intro`** e **`comoUsar[6]`:** ficam como estão (os números continuam valendo só como "valor da questão", ver 06-14).

### 06-02 · G0306 · fratura coronorradicular (IADT 2020) · **RESOLVIDO** (aviso didático)
- **Onde:** `licoes[id=traumatismo].pontos[5]`; trocar "(PENDENTE: conferir a conduta na diretriz IADT de 2020 sobre fraturas e luxações)" por:
- **Texto proposto:** "⚠ Aviso: a banca marcou D. A diretriz da IADT de 2020 separa dois casos. Fratura coronorradicular SEM exposição pulpar: estabilizar o fragmento até decidir o plano; depois, pode-se remover o fragmento solto e restaurar, cobrindo a dentina com ionômero de vidro ou com adesivo e resina. Fratura COM exposição pulpar: em dente com raiz incompleta, preferir a pulpotomia parcial; em dente com raiz completa, em geral está indicada a remoção da polpa. Ou seja, o tratamento pulpar depende de haver exposição, e a frase da alternativa D só vale para o caso com polpa exposta. Na prova, siga o gabarito histórico; na clínica, siga a diretriz. As outras alternativas também contrariam a diretriz: sem exposição não se faz curetagem pulpar nem pulpotomia."
- **Fonte F7,** Tabela 5 (fratura coronorradicular sem exposição, conferida na imagem, p. 30 do PDF): "If the pulp is not exposed, removal of the coronal or mobile fragment and subsequent restoration should be considered" / "Cover the exposed dentin with glass-ionomer or use a bonding agent and composite resin". Tabela 6 (com exposição, p. 32 do PDF): "In immature teeth with incomplete root formation, it is advantageous to preserve the pulp by performing a partial pulpotomy." / "In mature teeth with complete root formation, removal of the pulp is usually indicated".

### 06-03 · G0126 · avulsão: o que está confirmado · **RESOLVIDO** (o texto atual pode ficar)
- **Onde:** `licoes[id=traumatismo].pontos[3]`. Acrescentar depois de "(PENDENTE de diretriz)": "A diretriz de avulsão da IADT (2020) não fixa prazo de horas para a polpa; ela diz que, em dente com ápice aberto, a revascularização espontânea da polpa pode ocorrer, e que o tratamento de canal deve ser evitado, a menos que haja sinal de necrose e infecção."
- **Fonte F8:** "The PDL cells are likely to be non-viable. The total extra-oral dry time has been more than 60 minutes, regardless of the tooth having been stored in a medium or not." / "In teeth with open apices spontaneous pulp space revascularization may occur. Thus, root canal treatment should be avoided unless there is clinical or radiographic evidence of pulp necrosis and infection". O prazo de "duas horas" continua só da questão.

### 06-04 · Luxações (tabela da lição de traumatismo, linha Subluxação) · **RESOLVIDO**
- **Onde:** `licoes[id=traumatismo].tabela`, linha Subluxação: usar "Mobilidade aumentada sem deslocamento; pode haver sangramento pelo sulco".
- **Fonte F7,** Tabela 10: "Tooth has increased mobility but is not displaced" / "Bleeding from the gingival crevice may be present". Outras definições confirmadas nas Tabelas 9, 11, 12 e 13 (concussão: "Normal mobility" e sensível à percussão; extrusão: "Displacement of the tooth out of its socket in an incisal/axial direction"; luxação lateral: "usually associated with a fracture or compression of the alveolar socket wall"; intrusão: "Displacement of the tooth in an apical direction into the alveolar bone").

### 06-05 · G0139 · amálgama em caninos · **PARCIAL**
- **Onde:** `licoes[id=dentistica].pontos[1]`; substituir "PENDENTE conferir as indicações do amálgama em livro de Dentística."
- **Texto proposto:** "A literatura recente trata o amálgama como material de dentes POSTERIORES (a revisão Cochrane citada por Bailey, 2025, compara 'direct composite resin fillings versus amalgam fillings for permanent posterior teeth') e relata maior sobrevida do amálgama em pacientes de alto risco de cárie; a resina tem clara vantagem estética. Não achei fonte que indique amálgama em canino. Pela banca (gabarito final), 'grande perda de estrutura' é o que NÃO é indicação; no preliminar era 'caninos'. Na prova, siga o gabarito; para estudar, guarde que o amálgama é material de classe I e II em posteriores."
- **Fonte F23:** "Amalgam survival was higher in high caries-risk patients" / "A Cochrane review […] suggests that posterior amalgam restorations survive longer than composite" / "There are clear aesthetic benefits to composite". Continua PENDENTE: lista de indicações em livro de Dentística.

### 06-06 · G0148 · guta-percha · **RESOLVIDO** (texto atual quase pronto)
- **Onde:** `licoes[id=endodontia].pontos[21]`; trocar "(conferido pelo auditor em fontes secundárias)… PENDENTE: livro citado." por: "A revisão de Vishwanath e Rao (2019) lista como desvantagens da guta-percha 'falta de rigidez' e 'facilmente deslocada pela pressão', e como vantagens 'pode ser amolecida' e 'facilmente removida'. Isso confirma o gabarito: a falta de rigidez dificulta o uso em condutos estreitos. A palavra 'mobilidade' pode ser erro de transcrição (conferir no PDF da prova)."
- **Fonte F17,** Tabela 4 ("Merits and demerits of gutta percha"): méritos "Compactible… Can be softened… Tissue tolerant… Easily removed"; deméritos "Lacks rigidity… Lacks adhesive quality… Easily displaced by pressure… Lack of length control".

### 06-07 · G0057 · técnica da bissetriz · **RESOLVIDO**
- **Onde:** `licoes[id=endodontia].pontos[27]`; trocar "PENDENTE: confirmar em livro de radiologia a direção correta do raio central." por: "Correto: na técnica da bissetriz, o raio central incide PERPENDICULAR à linha imaginária que divide ao meio o ângulo entre o longo eixo do dente e o filme (e não 'longitudinalmente'). Na técnica do paralelismo, o filme fica paralelo ao dente e o raio é perpendicular aos dois (Yen e Yeung, 2023)."
- **Fonte F18:** "such that the central x-ray beam is directed perpendicular to an imaginary line that bisects the angle formed between the long axis of the tooth and the receptor" / "P tech involves placing the film receptor parallel to the long axis of the target tooth such that the central x-ray beam is directed perpendicular to both the receptor and the tooth".

### 06-08 · G0129 · tomografia de feixe cônico (dose e tecidos moles) · **RESOLVIDO**
- **Onde:** `licoes[id=radiologia].pontos[0]`; trocar "(PENDENTE: fonte de radiologia sobre a dose)" por: "O item também erra na dose: a tomografia de feixe cônico expõe o paciente a MENOS radiação que a tomografia computadorizada convencional, e é limitada para tecidos moles; para eles, a ressonância magnética é o exame principal (Almashraqi et al., Eur Radiol, 2024)."
- **Fonte F19:** "Magnetic resonance imaging (MRI) is primarily used for evaluating the TMJ's soft tissue, whereas computed tomography (CT) and cone-beam computed tomography (CBCT) are primarily employed for assessing the hard tissue" / "It is worth noting, however, that CBCT exposes patients to less radiation compared to CT" / "due to its limited ability to distinguish soft tissue details, CBCT is inadequate for assessing the necessary information required for diagnosing and managing patients with temporomandibular disorders (TMDs)".

### 06-09 · G0253 · fator C · **RESOLVIDO**
- **Onde:** `licoes[id=dentistica].pontos[3]` e `tabela.linhas[4]`; trocar "PENDENTE: fórmula e valores por tipo de cavidade em livro…" por: "Fórmula (Feilzer, De Gee e Davidson, 1987): fator C = superfícies aderidas ÷ superfícies livres. Numa caixa de classe I preenchida de uma vez, 5 paredes estão aderidas e 1 face (a oclusal) fica livre: 5 ÷ 1 = 5. Num estudo de 2011, a cavidade com todas as paredes aderidas foi descrita como 'C-factor = 5/1'." Na tabela: "5 (5 paredes aderidas ÷ 1 face livre)".
- **Fontes:** **F20** (resumo): "the configuration factor, C, the ratio of the restoration's bonded to unbonded (free) surfaces". **F21** (métodos): "Group 5: in which all cavity surfaces (including the gingival one) were allowed for bonding (C-factor = 5/1)". Observação: o artigo original de 1987 só foi lido no resumo.

### 06-10 · G0062 · hipoclorito (Labarraque e demais soluções) · **RESOLVIDO**
- **Onde:** `licoes[id=endodontia].pontos[17]`; trocar "PENDENTE: tabela completa de nomes e concentrações em livro…" por: "Tabela de uma revisão de 2024 (Khoury et al.): solução de Dakin = NaOCl 0,5% neutralizado com ácido bórico; solução de Dausfrene = NaOCl 0,5% neutralizado com bicarbonato de sódio; solução de Milton = NaOCl 1% estabilizado com cloreto de sódio a 16%; licor de Labarraque = NaOCl 2,5%; soda clorada = NaOCl 4% a 6%. Repare que as alternativas erradas de G0062 trocavam esses valores (Dausfrene com NaCl a 2%, Milton a 0,5%, Dakin a 1,5%, soda clorada a 10%)."
- **Fonte F16,** Tabela 1: "Dakin's solution 0.5% NaOCl solution […] neutralized with boric acid" / "Dausfrene solution 0.5% NaOCl solution […] neutralized using sodium bicarbonate" / "Milton's solution 1% NaOCl solution […] stabilized with 16% sodium chloride" / "Labarraque Liqueur 2.5% NaOCl solution" / "Chlorinated soda 4%-6% NaOCl solution".

### 06-11 · G0056 · forame a 0,5 a 1 mm do ápice · **PARCIAL**
- **Onde:** `licoes[id=endodontia].pontos[10]`; trocar "Os números 0,5 a 1 mm vêm da questão; PENDENTE confirmar em livro." por: "A literatura dá a faixa de 0,5 a 1 mm para o forame FISIOLÓGICO (constrição apical), medida em relação ao ápice: no estudo clássico de Chapman, ele ficou de 0,5 a 1,0 mm aquém do ápice em 92,5% de 120 dentes (revisão de Wolf et al., 2025). O enunciado fala em 'forame apical'; guarde a faixa e saiba que ela se refere à constrição."
- **Fonte F22:** "Chapman found the foramen 0.5–1.0 mm short of the apex in 92.5% of 120 teeth" e (Tabela 3) "In 92.5% of cases, the physiological foramen was located 0.5–1 mm from the apex". Também Ahmed et al., *Eur Endod J* 2024;9:308 (PMC11685512): a constrição apical "is usually 0.5–1.0 mm short of the center of the major apical foramen" (definição da AAE).

### 06-12 · G0151 · fatores intrínsecos e extrínsecos do acesso · **NÃO RESOLVIDO**
- `licoes[id=endodontia].pontos[11]`. A classificação é de livro brasileiro de endodontia, que não está aberto. Não achei fonte aberta. Manter a dúvida de gabarito e não ensinar a classificação.

### 06-13 · G0153 · alternativa E também parece correta · **NÃO RESOLVIDO**
- `licoes[id=endodontia].pontos[13]`. Depende do PDF da prova e do livro. Manter o PENDENTE.

### 06-14 · Valores que só valem como "valor da questão" · **NÃO RESOLVIDO** (cada um continua PENDENTE de livro)
| Questão | Valor | Onde | O que tentei | Texto a manter |
|---|---|---|---|---|
| G0152 | canino inferior 25 mm | `endodontia.pontos[12]` e `mapa.ramos[1].f[2]` | busca de estudo aberto com tabela de comprimento médio: nada útil | "valor da questão; PENDENTE de livro" |
| G0063 | ligamento > 2 mm | `endodontia.pontos[25]` | não achei fonte aberta com esse corte | "valor da questão" |
| G0138 | 1,8 mm = cavidade média | `dentistica.pontos[11]` | não achei as faixas em fonte aberta | "valor da questão" |
| G0245 | conicidade 0,02 da lima K | `endodontia.pontos[16]` | a norma ISO 3630-1 não é aberta; artigos citam "0.02 ISO standard cones", mas sobre cones | "valor da questão (conicidade padrão ISO, norma não aberta)" |
| G0242 | álcool isopropílico 70% | `endodontia.pontos[18]` | F16 não traz o álcool | "valor da questão" |
| G0146 | filme na mesial do canino (pré-molares) | `radiologia.pontos[2]` | não pesquisado | "valor da questão" |
- Já resolvidos e fora desta lista: fator C = 5 (06-09), hipoclorito 2,5% (06-10) e 0,5-1 mm (06-11, parcial).

### 06-15 · Demais PENDENTES da Apostila 06 · **NÃO RESOLVIDO**
- G0055 (definição dos acidentes, `endodontia.pontos[24]`), G0318 (Machado et al. 2022, `endodontia.pontos[29]`), G0141 e G0144 (classificação de Black e cavidade complexa, `dentistica.pontos[6]` e `[8]`), G0244 (edição do Hargreaves, `dentistica.pontos[12]`), G0183 (gengivite, dúvida de PDF, `oclusao-dtm.pontos[1]` e `pegadinhas[2]`) e G0247 (técnica de Clark, `radiologia.pontos[4]`). Não pesquisados neste lote, exceto Clark: a busca no Europe PMC achou uma revisão (Mallineni et al., *Front Dent Med* 2025, PMC11847821), mas o serviço devolveu erro 503 e não li o texto.

---

## 3. O que continua PENDENTE e por quê
1. **Precisam do PDF da prova** (não existe nesta máquina): G0160 e G0169 (imagem), G0153 (E também correta?), G0183 (gengivite), G0148 ("mobilidade"), a transcrição de G0161 e G0165 e todas as transcrições.
2. **Precisam de livro-texto pago** (não há versão aberta): G0151 (fatores do acesso), G0152 (25 mm), G0063 (2 mm), G0138 (1,8 mm), G0141/G0144 (Black), G0055, G0244 (Hargreaves), G0318 (Machado 2022), G0163 (zonas da dentina), G0134, G0352, G0037/G0060/G0079 e as definições de G0042.
3. **Fonte aberta não confirmou o gabarito:** G0258 (hidróxido de magnésio: o Guia do MS cita leite e hidróxido de alumínio), G0139 (canino como indicação de amálgama), a "percepção do próprio indivíduo" do DAI (G0256) e a "união das manchas" de G0168.
4. **Fonte não localizada:** relatório final do SB Brasil 2023 (a página do gov.br pediu login) e a diretriz IADT 2020 da dentição decídua (não aberta).
5. **Não pesquisados neste lote** (fora da lista prioritária): 05-04, 05-12, 05-13, 05-14, 05-17, 05-18, 05-19, G0247 e G0146.

## 4. As 5 fontes abertas mais úteis para o aluno (no lugar de "livro a definir")
1. **Guia de recomendações para o uso de fluoretos no Brasil, 2ª ed. (MS, 2026):** flúor, DPT, conduta na intoxicação, verniz, gel, bochecho. https://bvsms.saude.gov.br/bvs/publicacoes/guia_recomendacoes_uso_fluoretos_Brasil_2edimp.pdf
2. **Caderno de Atenção Básica nº 17, Saúde Bucal (MS, 2008):** agravos, adequação do meio, TRA, fluorose, organização do serviço. https://bvsms.saude.gov.br/bvs/publicacoes/saude_bucal.pdf
3. **SB Brasil 2010, Resultados Principais (MS, 2012):** índices (CPO-D, CPI, DAI, Dean) e números nacionais oficiais. https://bvsms.saude.gov.br/bvs/publicacoes/pesquisa_nacional_saude_bucal.pdf
4. **Diretrizes da IADT 2020 (em inglês, gratuitas):** fraturas e luxações https://eprints.whiterose.ac.uk/id/eprint/161684/ e avulsão https://eprints.whiterose.ac.uk/161687/1/IADT%20guidelines%20-%20Avulsion%20of%20permanent%20teeth.pdf
5. **AAPD Reference Manual (em inglês, gratuito):** terapia pulpar em decíduos (2026) https://www.aapd.org/globalassets/media/policies_guidelines/bp_pulptherapy26.pdf e desenvolvimento da dentição e mantenedor de espaço (2024) https://www.aapd.org/globalassets/media/policies_guidelines/bp_developdentition26.pdf

## 5. Riscos
- **Fontes em inglês:** as fontes 4 e 5 e os artigos do PMC foram traduzidos por mim; os trechos literais estão no original.
- **A banca pode seguir livro brasileiro diferente:** por isso os avisos dizem "siga o gabarito histórico".
- **Guia do MS, 2ª ed.:** a capa traz 2025 e a ficha, 2026. Citar "2ª ed., 2026" (a ficha manda).
- **Página citada sem conferência visual:** F5, p. 528 (hipodontia); F3, fluorose (p. 43, pelo sumário). As demais páginas foram conferidas pelo número impresso na própria página do PDF.
