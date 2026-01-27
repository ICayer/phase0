# Phase 0 - Documentation du projet

## Aperçu général

- **Nom du projet:** Phase 0
- **Type:** Site web statique de 4 pages
- **Style:** Minimaliste / simpliste
- **Langue:** Bilingue (FR/EN), pages séparées liées manuellement
- **CSS:** Un seul fichier CSS partagé (`css/style.css`)

---

## Structure des fichiers

```
v1/
├── css/
│   └── style.css              # Styles partagés, variables CSS
├── js/
│   └── recit.js               # Logique Scrollama + popup définitions
├── img/
│   ├── recit/                 # Images pour le scrollytelling
│   └── placeholders/          # Images temporaires
├── index.html                 # Page d'accueil
├── glossaire.html             # Page glossaire
├── theorie.html               # Page théorie (placeholder)
├── recit.html                 # Page récit (scrollytelling)
├── embed-fonts.txt            # Code embed Google Fonts
└── claude.md                  # Cette documentation
```

---

## Style visuel

### Couleurs

Fond: `#FFFFFF`

Palette complète (en variables CSS pour flexibilité):

| Catégorie | Couleur 1 | Couleur 2 | Couleur 3 |
|-----------|-----------|-----------|-----------|
| Turquoise | `#275E59` | `#68ABA2` | - |
| Gris | `#131517` (foncé) | `#3C3E40` (moyen) | `#BABBBF` (clair) |
| Bleu | `#1E3F63` | `#6A8EBB` | `#64788D` |
| Orange | `#DD9058` | `#D6764D` | - |

**Priorité d'utilisation:** Bleus, oranges et gris principalement.

**Footer:** Utilise `#124978` comme couleur de fond.

### Typographie

- **Titres:** Autour One (Google Font) - tous en UPPERCASE
- **Texte courant:** Zilla Slab (Google Font)

Code d'embed (voir `embed-fonts.txt`):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Autour+One&family=Zilla+Slab:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
```

---

## Spécifications techniques

### Dimensions

- **Optimisé pour:** 1920px de largeur
- **Largeur minimale tolérée:** ~1400px
- **Responsive:** Non - le container principal a une largeur minimale fixe

---

## Navigation

### Éléments communs (sticky)

- **Toutes les pages:** Bouton de langue en bas à gauche (sticky)
  - Ancre vide pour l'instant, liens ajoutés manuellement plus tard
- **Pages internes (Récit, Glossaire, Théorie):** Bouton "Retour" en haut à gauche (sticky, fond bleu, texte blanc)

---

## Pages

### 1. Page d'accueil (`index.html`)

Structure de haut en bas:

1. **Titre principal**
   - "Phase 0" centré
   - Font: Autour One

2. **Auteur-trices**
   - Sous-titre "Auteur-trices"
   - Liste deux équipes: "Équipe projet" et "Équipe Agora"

3. **Mise en contexte**
   - Texte d'environ 150 mots

4. **Points d'entrée**
   - 3 boutons: "Récit", "Glossaire", "Théorie"
   - Théorie en style secondaire (pourrait être retiré)

5. **Remerciements**
   - Image à gauche + texte à droite

6. **Footer**
   - Crédits: "Écrit par" + "Illustré par"
   - Partenaires: 5-8 logos (liens cliquables possible)
   - Funders: 2 gros logos

---

### 2. Page Glossaire (`glossaire.html`)

**Termes définis:**
1. Système socio-écologique
2. Co-création
3. Pertinence sociale
4. Savoirs écologiques traditionnels
5. Phase 0
6. Objet frontière

**Structure de chaque définition:**
- Titre du terme (h2)
- Paragraphe de définition (50-200 mots)
- Paragraphe bibliographie avec italiques

---

### 3. Page Théorie (`theorie.html`)

- Contenu minimal / provisoire
- "Théorie" écrit en gros au centre
- Page potentiellement à supprimer

---

### 4. Page Récit (`recit.html`) - Scrollytelling

**Technologie:** Scrollama.js (CDN: unpkg)

**Layout:**
- Plein écran (100vw × 100vh)
- Image d'arrière-plan fullscreen: `background-size: cover`, `background-position: center center`
- Images optimisées pour écrans retina (> 1920×1080px)

**Comportement du scroll:**
- Les boîtes de contenu montent du bas vers le haut
- L'image de fond change avec fondu enchaîné (crossfade) via double layer
- Dernier élément reste centré avec bouton retour

**Nombre d'étapes:** ~45 steps avec contenu réel

**Boîtes de contenu (steps):**
- Position par défaut: côté droit (`justify-content: flex-end`)
- Classes de position: `.position-left`, `.position-center`
- Classes de couleur: `.color-blue`, `.color-orange`
- Max-width: 550px, padding 30px 35px
- Fond: blanc à 90% d'opacité, ombre portée

**Liens vers définitions:**
- Spans avec attribut `data-pop-def="id-definition"`
- Style: orange (`#D6764D`), souligné, gras, cursor pointer
- Au hover: bleu (`#1E3F63`)

**Indicateur de progression:**
- Points cliquables à droite (flex-wrap pour grille)
- Classe `.hidden` pour masquer en production

---

## Système de Popup Définitions

**Fonctionnalité:** Cliquer sur un terme souligné orange ouvre un popup avec sa définition.

**Structure HTML:**
```html
<div class="popup-overlay"></div>
<div class="popup-container">
  <button class="popup-close">&times;</button>
  <div class="popup-content">
    <div class="popup-def-item" data-def-id="id-definition">
      <h2>Titre</h2>
      <p class="popup-definition">Définition...</p>
      <p class="popup-bibliography">Sources...</p>
    </div>
    <!-- autres définitions -->
  </div>
</div>
```

**Style:**
- Overlay: noir à 50% d'opacité
- Popup: centré, max-width 720px, fond bleu foncé (`#1E3F63`), texte blanc
- Animation: fade in 0.25s
- Bouton X en haut à droite

**Comportement (géré dans `recit.js`):**
- Ouverture: clic sur `[data-pop-def]`
- Fermeture: clic overlay, bouton X, touche Escape
- Bloque le scroll du body quand ouvert

**Définitions incluses:**
| ID | Terme |
|----|-------|
| `sys-socio-eco` | Système socio-écologique |
| `co-creation` | Co-création |
| `socialement-pertinent` | Pertinence sociale |
| `savoir-eco` | Savoirs écologiques traditionnels |
| `phase-0` | Phase 0 |
| `objet-frontiere` | Objet frontière |
| `theorie-u` | Théorie U |

**Ajouter une définition:**
1. Ajouter le span dans le contenu: `<span data-pop-def="mon-id">terme</span>`
2. Ajouter le bloc dans `.popup-content`:
```html
<div class="popup-def-item" data-def-id="mon-id">
  <h2>Titre</h2>
  <p class="popup-definition">Définition...</p>
  <p class="popup-bibliography">Sources...</p>
</div>
```

---

## Images du récit (`img/recit/`)

Liste des images utilisées (nommées selon les steps S1, S2, etc.):
- `Cover_Zine_S7_S8 copie.webp`
- `25052025E3_S9aS14 copie.webp`
- `1_Conversation_S15aS17 copie.webp`
- `1_Conversation_S18aS21 copie.webp`
- `1_Confo_S22 copie.webp`
- `1_ConfoInterro_S23aS24 copie.webp`
- `2_3_Depart_S25aS28 copie.webp`
- `25052023E2_S29aS30 copie.webp`
- Et autres selon le contenu final...

---

## Variables CSS principales

```css
:root {
  --color-white: #FFFFFF;
  --color-turquoise-dark: #275E59;
  --color-turquoise-light: #68ABA2;
  --color-gray-dark: #131517;
  --color-gray-medium: #3C3E40;
  --color-gray-light: #BABBBF;
  --color-blue-dark: #1E3F63;
  --color-blue-medium: #6A8EBB;
  --color-blue-muted: #64788D;
  --color-orange-light: #DD9058;
  --color-orange-dark: #D6764D;
  --color-primary: var(--color-blue-dark);
  --color-secondary: var(--color-orange-dark);
  --font-title: 'Autour One', cursive;
  --font-body: 'Zilla Slab', serif;
  --container-max-width: 1400px;
}
```

---

## Notes de développement

- Les logos partenaires/funders sont des placeholders à remplacer
- Le bouton de langue pointe vers `#` - à lier manuellement vers les versions EN
- Les titres sont automatiquement en UPPERCASE via CSS
- Le footer utilise une couleur personnalisée `#124978` (pas une variable)
- Les images du récit doivent être > 1920×1080px pour les écrans retina
