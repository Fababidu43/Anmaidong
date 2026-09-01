# ANMAIDONG — Kit complet (site + identité visuelle)

Ce dossier contient l'intégralité de ce qui a été validé : 
toute l'identité graphique associée (logo, favicons, carte de visite, charte graphique).

## 📁 02-identite-visuelle/

### logo/
Toutes les déclinaisons du monogramme "AM", en vectoriel (SVG, s'agrandit sans jamais
perdre en qualité) et en PNG haute résolution :
- `anmaidong-icon-*` → l'icône seule (couleur, blanche, navy, monochrome)
- `anmaidong-logo-horizontal-*` → icône + nom + slogan, en ligne
- `anmaidong-logo-stacked-*` → icône au-dessus du nom (idéal réseaux sociaux)

### favicon/
Le jeu complet d'icônes pour navigateurs et mobiles (déjà installé dans le site) :
`favicon.ico`, PNG 16/32/48px, icône iOS, icônes Android, `site.webmanifest`,
`safari-pinned-tab.svg`, `browserconfig.xml`, et `head-snippet.html` (le code à coller
si vous intégrez ce site dans un autre projet).

### carte-de-visite/
Recto/verso au format standard 85×55mm avec fond perdu de 2mm, en PDF 300 DPI prêt à
envoyer à un imprimeur. Le nom et la fonction sont en placeholder ("PRÉNOM NOM" /
"RESPONSABLE QUALITÉ & AUDIT") à personnaliser par collaborateur.

### images-site/
- `og-image.png` : l'image affichée quand un lien vers le site est partagé (réseaux
  sociaux, WhatsApp, etc.)
- `china-dot-map` et `route-network` : les illustrations de fond utilisées dans le hero
  du site, en fichiers séparés si vous voulez les réutiliser ailleurs
- `icons/` : les 4 icônes de services (contrôle qualité, audit, analyse documentaire,
  sourcing), avec une version `bare/` (monochrome, sans fond) déjà intégrée au site

### charte-graphique/
`charte-graphique-anmaidong.pdf` — un document de référence en 6 pages : usage du logo,
zones de protection, couleurs exactes (codes hex), typographies et leurs usages. À
transmettre à toute personne (graphiste, imprimeur, développeur) travaillant sur des
supports ANMAIDONG.

## Couleurs de référence

| Couleur | Code | Usage |
|---|---|---|
| Navy | `#0A1626` | Titres, texte principal |
| Teal | `#0EA3AC` | Accent principal, liens |
| Teal deep | `#045A65` | Bandeaux, texte sur fond clair |
| Teal light | `#8ED2D5` | Accents clairs, dégradés |
| Rouge | `#AC1B22` | Alertes uniquement |

## Typographies

- **Cormorant Garamond** (SemiBold) — réservée au mot "ANMAIDONG" dans le logo uniquement
- **Montserrat** — toute l'interface, les titres et le texte du site (Google Fonts)
- **JetBrains Mono** — éléments techniques (console d'inspection, normes AQL/PPI/DPI...)

Les deux dernières sont chargées automatiquement depuis Google Fonts dans le site ; pour
les supports imprimés (carte de visite, charte), les fichiers de police sont libres de
droit et téléchargeables sur [fonts.google.com](https://fonts.google.com).
