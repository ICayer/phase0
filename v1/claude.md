# Phase 0 - Documentation du projet

## Aperçu général

- **Nom du projet:** Phase 0
- **Type:** Site web statique de 3-4 pages
- **Style:** Minimaliste / simpliste
- **Langue:** Bilingue (FR/EN), mais pas de système dynamique - pages séparées liées manuellement
- **CSS:** Un seul fichier CSS partagé pour toutes les pages

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

### Typographie

- **Titres:** Autour One (Google Font)
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
- **Responsive:** Non - le container principal a une largeur minimale fixe, pas d'adaptation mobile/tablette

---

## Navigation

### Éléments communs (sticky en haut)

- **Toutes les pages:** Bouton en haut à droite pour changer de langue (FR ↔ EN)
  - Ancre vide pour l'instant, liens ajoutés manuellement plus tard
- **Pages internes uniquement (Récit, Glossaire, Théorie):** Bouton "Retour" en haut à gauche vers l'accueil

---

## Pages

### 1. Page d'accueil (index)

Structure de haut en bas:

1. **Titre principal**
   - "Phase 0" centré
   - Font: Autour One (custom)

2. **Auteur-trices**
   - Sous-titre plus petit
   - Liste deux équipes: "Équipe projet" et "Équipe Agora"
   - Pas de noms individuels, juste les noms des équipes

3. **Mise en contexte**
   - Texte d'environ 150 mots
   - Placeholder lorem ipsum pour l'instant

4. **Points d'entrée (navigation principale)**
   - 3 boutons en gros format:
     - "Récit"
     - "Glossaire"
     - "Théorie" (pourrait être retiré, mais prévoir l'espace)

5. **Remerciements**
   - Texte de remerciement
   - Image d'appui à gauche du texte
   - Image placeholder pour l'instant

6. **Footer**
   - **Crédits:**
     - "Écrit par" + liste de noms
     - "Illustré par" + liste de noms
   - **Partenaires:**
     - Section avec 5-8 logos en gros format
     - Images placeholder corporatives/organismes
   - **Funders:**
     - Section avec 2 gros logos
     - Images placeholder

---

### 2. Page Glossaire

- **Contenu:** 5 à 10 définitions

**Termes définis:**
1. Système socio-écologique
2. Co-création
3. Pertinence sociale
4. Savoirs écologiques traditionnels
5. Phase 0
6. Objet frontière

**Structure de chaque définition:**
- Titre du terme
- Paragraphe de définition (50-200 mots)
- Paragraphe bibliographie/sources (avec italiques pour les références)

Texte placeholder temporaire pour chaque entrée.

---

### 3. Page Théorie

- **Contenu:** Minimal / provisoire
- Simplement "Théorie" écrit en gros au centre du container
- Page potentiellement à supprimer, effort minimal requis

---

### 4. Page Récit (Scrollytelling)

**Technologie:** Scrollama.js

**Layout:**
- Plein écran (100vw × 100vh)
- Image d'arrière-plan en fullscreen avec `background-size: cover` et `background-position: center center`
- Images légèrement plus grandes que 1920×1080px (prévu pour écrans retina)

**Comportement du scroll:**
- L'utilisateur scrolle vers le bas
- Les boîtes de contenu montent du bas de l'écran vers le haut
- Quand une boîte disparaît presque en haut, l'image de fond change (fondu enchaîné/crossfade)
- La prochaine boîte de contenu monte à son tour
- **Dernier élément:** Reste centré à l'écran (ne monte pas complètement), avec possiblement un bouton retour à l'accueil dans le HTML

**Nombre d'étapes:** ~40 éléments (contenu temporaire à générer)

**Boîtes de contenu (steps):**
- Position par défaut: côté droit de l'écran (sans coller à la scrollbar)
- Customisation possible par step via classes/attributs:
  - Position: gauche, centre, droite
  - Couleur personnalisée
  - Autres ajustements
- Contenu: div HTML pouvant contenir plusieurs paragraphes, mise en forme légère

**Style des boîtes:**
- Fond: blanc à 90% d'opacité (`rgba(255, 255, 255, 0.9)`)
- Ombre portée légère
- Texte: noir
- Pas de bordure
- Style très épuré

**Transitions d'images:**
- Fondu enchaîné (crossfade) entre les images d'arrière-plan

**Indicateur de progression:**
- Petits points cliquables à l'extrême droite
- Permettent de naviguer directement vers un step
- Probablement masqués en production (trop nombreux avec ~40 steps)
- Utile pour le développement

**Navigation sticky:**
- Bouton "Retour" (haut gauche) et bouton "Langue" (haut droite) restent visibles

**Images disponibles (img/recit/):**
- `1_Confo_S22 copie.webp`
- `1_ConfoInterro_S23aS24 copie.webp`
- `1_Conversation_S15aS17 copie.webp`
- `1_Conversation_S18aS21 copie.webp`
- `2_3_Depart_S25aS28 copie.webp`
- `25052023E2_S29aS30 copie.webp`
- `25052025E3_S9aS14 copie.webp`
- `Cover_Zine_S7_S8 copie.webp`

---

## Notes supplémentaires

- Utiliser des images placeholder libres de droits pour les logos partenaires/funders
- Les images seront remplacées par les vraies plus tard
- Toutes les couleurs en variables CSS pour faciliter les ajustements
