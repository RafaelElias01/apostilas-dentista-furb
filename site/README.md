# Site de estudo (Cirurgião-Dentista, banca FURB)

Site estático: HTML, CSS e JS puros. Sem build, sem backend, sem login. O progresso fica no `localStorage` do navegador (e o site funciona sem ele).

## Atualizar os dados

Os dados em `dados/questoes.json` e `dados/radar.json` são gerados a partir de `curso/questoes-anteriores.json` e `curso/radar-banca.json`:

    node scripts/gerar-dados-site.mjs

Rode de novo sempre que o radar ou as questões mudarem. `dados/apostilas.json` é mantido à mão (veja abaixo).

## Rodar localmente

O site usa `fetch`, então precisa de um servidor (não abra o arquivo direto):

    cd site
    python -m http.server 8000
    # ou: npx serve .

Abra http://localhost:8000.

## Apostilas

Coloque os PDFs em `apostilas/` com o nome `apostila-0N-<nome>.pdf` e liste em `dados/apostilas.json`, por exemplo:

    [{ "numero": 1, "arquivo": "apostila-01-portugues.pdf" }]

Quem não estiver na lista aparece como "em preparação". Os títulos vêm do radar.

## Publicar no GitHub Pages (apenas documentado)

Repositório público. Duas opções:

1. GitHub Actions: Settings > Pages > Source: "GitHub Actions", com um workflow que usa `actions/upload-pages-artifact` com `path: site` e `actions/deploy-pages`.
2. Branch: copiar o conteúdo de `site/` para uma branch (por exemplo `gh-pages`) e escolher essa branch em Settings > Pages. A pasta `/site` não é aceita direto: o Pages só publica a raiz ou `/docs`.

O arquivo `.nojekyll` já está na pasta. Todos os caminhos são relativos, então o site funciona em subcaminho (`usuario.github.io/repositorio/`).

Aviso: as questões vêm de provas oficiais transcritas automaticamente; confira o original antes de confiar em um gabarito ou texto.
