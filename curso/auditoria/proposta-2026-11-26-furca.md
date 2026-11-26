# Proposta 2026-11-26: definição das classes de lesão de furca (Apostila 07, Periodontia)

Tarefa só de pesquisa e proposta. Nenhum JSON foi editado. Feita por um Sonnet em 26/11/2026.

## 1. O que o banco mostra

`curso/questoes-anteriores.json` tem 2 ocorrências de "furca". **Nenhuma das duas usa classificação de furca** (nem Glickman, nem Hamp, nem Tarnow e Fletcher, nem outra).

| Grupo | Prova | Ano | Gabarito oficial | O que a banca considerou certo |
|---|---|---|---|---|
| G0556 | big-2025-perio (Biguaçu, Odontólogo Especialista V - Periodontia, q. 37; `alvo: false`) | 2025 | E | Sequência da plastia de furca (tratamento ressectivo): "2 − 3 − 1 − 4" = dissecção e elevação de retalho; remoção de tecido mole inflamatório; raspagem e alisamento das raízes expostas; odontoplastia e recontorno da crista óssea. |
| G0599 | big-2025-clinico (Biguaçu, Odontólogo I e II, q. 46; `alvo: false`) | 2025 | C | Contraindicação de pulpotomia em decíduo: "Dente com evidência de patologia periapical ou da furca e com reabsorção patológica da raiz." |

Observações:
- G0599 é de **odontopediatria/endodontia** (pulpotomia em decíduo), não de periodontia. Está com `topico: "perio"` por `metodoClassificacao: "auto-palavra-chave"` (a palavra "furca" puxou). Sugere-se ao coordenador reavaliar o tópico (não editei).
- G0556 é o único caso de furca periodontal, e é de outro município (Biguaçu). Coerente com o JSON, que diz que nenhuma questão única de Blumenau tratou de furca.
- Conclusão: **a banca nunca cobrou classe/grau de furca na amostra**. Não há como dizer "qual classificação a banca usa". A proposta abaixo explica as duas classificações principais e avisa isso.

## 2. Fontes buscadas

| Fonte | Resultado |
|---|---|
| Sanz et al. 2020, diretriz EFP S3 (PMC7891343, doi:10.1111/jcpe.13290) | Texto completo baixado da Europe PMC (API oficial, `fullTextXML`) em 26/11/2026. Busca por "Hamp", "Glickman", "degree I", "Class I furcation": **nenhuma ocorrência**. A diretriz só cita "Class II and III furcation involvement" **sem definir** as classes. |
| Tonetti, Greenwell, Kornman 2018 (doi:10.1002/JPER.18-0006 / 10.1111/jcpe.12945) e Papapanou et al. 2018 (doi:10.1002/JPER.17-0721 / 10.1111/jcpe.12946) | Não estão no PMC (Europe PMC: `isOpenAccess: N`, sem PMCID). Página da Wiley retornou **HTTP 403**; não contornei. Pelo que já está na apostila (ponto 1, resumo oficial da AAP), o estadiamento só diz "furca classe II ou III", **sem definir** nem dizer qual sistema. |
| Dommisch et al. 2020 (doi:10.1111/jcpe.13241) | Não está no PMC; cópia do repositório da Univ. Frankfurt bloqueada por proteção anti-robô (Anubis, "Access Denied"). Não contornei. |
| Hamp, Nyman, Lindhe 1975 (J Clin Periodontol 2:126-135, doi:10.1111/j.1600-051X.1975.tb01734.x) e Glickman (livro) | Originais **não acessados** (sem acesso aberto). |
| **Pilloni A, Rojas MA. Furcation Involvement Classification: A Comprehensive Review and a New System Proposal. Dent J (Basel) 2018;6(3):34. doi:10.3390/dj6030034. PMC6162379. PMID 30041399. Licença CC BY 4.0.** | **USADA.** A página do PMC (https://pmc.ncbi.nlm.nih.gov/articles/PMC6162379/) mostrou tela de verificação de navegador; não contornei. O texto completo foi obtido pela API oficial da Europe PMC: https://www.ebi.ac.uk/europepmc/webservices/rest/PMC6162379/fullTextXML (acesso em 26/11/2026). Também disponível na editora: https://www.mdpi.com/2304-6767/6/3/34 . É revisão em revista científica com revisão por pares (fonte secundária: reproduz Hamp 1975 e Glickman, não é o original). |

## 3. Trechos literais (Pilloni e Rojas 2018, seção 2 e Tabela 1)

Introdução:
> "Glickman in 1953 [2], developed a classification system in order to describe the extension and main characteristics of the furcation defect (Grade I–IV). Hamp, Nyman and Lindhe [3] and Tarnow and Fletcher [4] proposed to measure the horizontal/vertical attachment loss, respectively."

Glickman:
> "One of the first proposed classifications was the one by Glickman [2]. This classification system probably is the most widely used and it describes the main characteristics of furcation lesions: Grade I involvement: it is the incipient or early lesion. The pocket is supra-bony, involving the soft tissue; there is slight bone loss in the furcation area. Radiographic change is not usual, as bone changes are minimal. Grade II involvement: the bone is destroyed on one or more aspects of the furcation, but a portion of the alveolar bone and periodontal ligament remain intact, thus allowing only partial penetration of the probe into the furcation area. The radiograph may or may not reveal the grade II furcation involvement. Grade III involvement: the inter-radicular bone is completely absent, but the facial and/or lingual orifices of the furcation are occluded by gingival tissue. Therefore, the furcation opening cannot be seen clinically, but it is essentially a through and through tunnel. [...] Grade IV involvement: the inter-radicular bone underneath the roof of furcation is completely destroyed. The gingival tissue is also receded apically so that the furcation opening is clinically visible. The radiographic image is essentially the same as in grade III lesions."

Hamp, Nyman e Lindhe:
> "In 1975 Hamp, Nyman and Lindhe [3] proposed a classification system referring to the horizontal attachment loss and based on three degrees: Degree I: horizontal attachment loss < 3 mm of the total width of the furcation area. Degree II: horizontal attachment loss > 3 mm but not encompassing the total width of the furcation area. Degree III: “through and through” destruction of the periodontal tissue in the furcation area. Ramfjord and Ash [11] proposed the same system but the assigned value is 2 mm instead of 3 mm."

Tabela 1 (mesma ideia, outra redação):
> "Hamp, S.E. et al. [3] Degree I: Horizontal attachment loss < 3 mm. Degree II: Horizontal attachment loss > 3mm not encompassing the total width of the furcation area. Degree III: Horizontal through-and-through destruction of the periodontal tissue in the furcation area."

Tarnow e Fletcher (componente vertical):
> "Later on, a sub-classification referring to the vertical bone loss from the furcation fornix [4] was introduced to complement the horizontal classification (I–III): Subclass A: vertical bone loss 3 mm or less. Subclass B: vertical bone loss from 4 to 6 mm. Subclass C: bone loss from the fornix of 7 mm or more."

Limite apontado pela própria revisão (útil para o PENDENTE):
> "in none of them one can clearly differentiate between grade I and II since both use the same reference point (less or greater than one third—less or greater than two or three millimeters) [3, 11, 19], which means that it is not clear in which group furcation involvements with measures of one 1/3 or 2–3 mm will be included."

Referências da revisão (literal):
> "2. Glickman I. Clinical Periodontology: Prevention, Diagnosis, and Treatment of Periodontal Disease in the Practice of General Dentistry 4th ed. Saunders Philadelphia, PA, USA 1972 242 245"
> "3. Hamp S.E. Nyman S. Lindhe J. Periodontal treatment of multirooted teeth. Results after 5 years J. Clin. Periodontol. 1975 2 126 135 10.1111/j.1600-051X.1975.tb01734.x"
> "4. Tarnow D. Fletcher P. Classification of the vertical component of furcation involvement J. Periodontol. 1985 55 283 284 10.1902/jop.1984.55.5.283"

Notas de conferência:
- O texto da revisão diz "Glickman in 1953", mas a referência citada é a 4ª edição do livro (1972, pp. 242-245). Na apostila, sugiro escrever só "Glickman" sem ano.
- Tarnow e Fletcher: a referência diz "1985", mas o volume 55 e o DOI (jop.1984.55.5.283) são de 1984. Sugiro não citar o ano na apostila.
- A busca na web encontrou uma tabela da BMC Oral Health que descreve o grau 1 de 1975 como perda "maior que 3 mm", em conflito com a revisão acima. Não usei (contradiz a maioria e não consegui conferir o original).

## 4. Mudanças propostas (ANTES / DEPOIS)

Total: **3 mudanças** (2 trocas de texto + 1 entrada nova de bibliografia). Texto que o leitor vê: aguarda "aprovado" do dono antes de aplicar.

### Mudança 1: `$.licoes[0].pontos[26].texto` (ponto 8, cirurgia periodontal, regeneração e furca)

ANTES (trecho exato a substituir, perto do fim do texto):
> PENDENTE: a definição de furca classe I, II e III (graus pela sonda) não consta nos trechos conferidos, por isso não é explicada aqui; técnica de incisão passo a passo e tipos de membrana também ficam de fora, sem fonte aberta conferida.

DEPOIS:
> Como classificar a furca. Atenção: nenhuma questão do banco cobrou classe ou grau de furca; não dá para saber qual sistema a FURB usa. Saiba os dois principais. Hamp, Nyman e Lindhe (1975) medem a perda horizontal com a sonda e vão até o grau III: grau I = perda horizontal menor que 3 mm; grau II = maior que 3 mm, mas sem atravessar toda a largura da furca; grau III = destruição de lado a lado (“through and through”). Glickman descreve a lesão e vai até o grau IV: I = lesão inicial, bolsa supraóssea, pouca perda óssea na furca, radiografia em geral sem alteração; II = osso destruído em uma ou mais faces da furca, mas parte do osso e do ligamento continua, e a sonda entra só em parte; III = não há osso entre as raízes, mas a gengiva fecha a entrada: é um túnel, e a furca não se vê na boca; IV = como o III, mas com recessão gengival, e a entrada da furca fica visível. Tarnow e Fletcher acrescentam a perda vertical, medida a partir do teto da furca: subclasse A = 3 mm ou menos; B = 4 a 6 mm; C = 7 mm ou mais. Ramfjord e Ash usam o esquema de Hamp com 2 mm no lugar de 3 mm. Macete: Hamp mede em milímetros e para no III; Glickman descreve e chega ao IV (o IV é o III com a furca exposta). Pegadinha provável: trocar os sistemas, ou dizer que Hamp tem grau IV. A “classe II ou III” do estadiamento de 2017 e da diretriz EFP não diz qual sistema usa. Fonte da classificação: Pilloni A, Rojas MA. Furcation Involvement Classification: A Comprehensive Review and a New System Proposal. Dent J (Basel) 2018;6(3):34, doi:10.3390/dj6030034, texto aberto em https://pmc.ncbi.nlm.nih.gov/articles/PMC6162379/ (CC BY 4.0), conferido em 26/11/2026; a revisão reproduz Hamp 1975 e Glickman (os originais não foram conferidos). Tradução livre do autor. PENDENTE: em que grau de Hamp entra uma perda de exatamente 3 mm (a própria revisão diz que não fica claro); técnica de incisão passo a passo e tipos de membrana também ficam de fora, sem fonte aberta conferida.

(O restante do texto do ponto, antes desse trecho, e a frase final "Fonte: Sanz M, Herrera D..." ficam iguais.)

### Mudança 2: `$.limiteFonte`

ANTES (trecho exato):
> PENDENTE: definição de furca classe I a III (não conferida); lesão endoperiodontal, cirurgia mucogengival e cicatrização ficam sem texto clínico por falta de fonte aberta.

DEPOIS:
> A classificação de furca (Hamp, Nyman e Lindhe; Glickman; Tarnow e Fletcher), no ponto 8, vem da revisão aberta de Pilloni e Rojas (Dent J 2018;6(3):34, doi:10.3390/dj6030034, PMC6162379, CC BY 4.0), conferida em 26/11/2026, com tradução livre do autor; os originais de Hamp (1975) e de Glickman não foram conferidos, e nenhuma questão do banco cobrou classe de furca. PENDENTE: lesão endoperiodontal, cirurgia mucogengival e cicatrização ficam sem texto clínico por falta de fonte aberta.

### Mudança 3: `$.bibliografiaVerificada` (acrescentar uma entrada nova no fim da lista; nada é apagado)

ANTES: (não existe entrada para a classificação de furca)

DEPOIS (objeto novo, no mesmo formato das outras entradas):
```json
{
  "referencia": "Pilloni A, Rojas MA. Furcation Involvement Classification: A Comprehensive Review and a New System Proposal. Dent J (Basel) 2018;6(3):34. doi:10.3390/dj6030034",
  "uso": "Ponto 8: classificação de lesão de furca (Hamp, Nyman e Lindhe 1975; Glickman; Tarnow e Fletcher; Ramfjord e Ash), reproduzida pela revisão; conferida no texto aberto em 26/11/2026",
  "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6162379/"
}
```

## 5. O que continua PENDENTE

1. **Texto original** de Hamp, Nyman e Lindhe 1975 (J Clin Periodontol 2:126-135) e do livro de Glickman: não conferidos (sem acesso aberto). A apostila cita pela revisão de Pilloni e Rojas 2018 e diz isso.
2. **Perda de exatamente 3 mm** em Hamp: a revisão usa "< 3 mm" e "> 3 mm" e afirma que o limite não fica claro. Não inventar.
3. **Qual sistema a FURB usa**: desconhecido (nenhuma questão do banco cobrou classe de furca).
4. **Qual sistema o estadiamento de 2017 adota** para "furca classe II ou III": os artigos de Tonetti et al. 2018 e Papapanou et al. 2018 não estão abertos (Wiley 403, fora do PMC); não confirmado.
5. Fora do escopo, mas visto: G0599 está classificada como `perio` por palavra-chave e é de pulpotomia em decíduo; e G0556 (plastia de furca, Biguaçu 2025, gabarito E = 2-3-1-4) não aparece na apostila (é de outro município; decidir se entra).
