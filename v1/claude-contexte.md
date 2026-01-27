# CONTEXTE CLAUDE - Phase 0

## RÉSUMÉ PROJET

Projet web académique/recherche sur la co-création de connaissances entre chercheurs et communautés locales (Mi'kmaq, Acadiens) au Nouveau-Brunswick, Canada. Focus sur les herbiers marins de la baie de Tabusintac comme "objet frontière". Le concept "Phase 0" = étape préliminaire de construction de confiance avant un projet de recherche formel.

Équipe: Fanny Noisette (océanographe, ISMER Rimouski), Kate Sherren (géographe, Dalhousie), Mélanie Leblanc, Marie-Pomme, Madeleine-Zoé, Frédéric Guichard (McGill). Partenaires locaux: Tabusintac Watershed Association (TWA), Esgenoôpetitj Watershed Association (EWA).

---

## ÉTAT FICHIERS ACTUELS

### css/style.css
- Variables CSS complètes (couleurs, fonts, dimensions)
- Reset + base typography
- Navigation sticky (`.nav-left` en haut gauche bleu, `.nav-right` repositionné en bas gauche)
- Page accueil: header, context, entry-buttons, thanks-section, footer
- Page glossaire: glossary-list, glossary-item
- Page théorie: theory-placeholder
- Page récit: bg layers (crossfade), scrolly, steps, step-content, positions, couleurs
- Progress dots (flex-wrap grille)
- Popup définitions: overlay, container, close, content, def-items
- Styles span[data-pop-def]: orange #D6764D, underline, bold, hover bleu

### js/recit.js
- IIFE structure
- Scrollama init avec offset 0.5
- Double background layer pour crossfade (bgBack, bgFront, isFrontActive toggle)
- Progress dots dynamiques + updateProgressDots()
- Preload images
- Popup système: openPopup(defId), closePopup(), initPopup()
- Event listeners: click triggers, click overlay, click X, Escape key
- Body overflow hidden quand popup ouvert (SANS compensation scrollbar - user a retiré ce fix)

### index.html
- Structure complète avec placeholder content
- Logos partenaires: liens Wikimedia (Google, Amazon, Microsoft, Apple, Netflix, YouTube)
- Logos funders: Stanford, MIT
- Premier logo partenaire wrappé dans <a> (user a ajouté)

### glossaire.html
- 6 définitions complètes avec vraies sources bibliographiques
- Structure: h2 titre, p.definition, p.bibliography

### theorie.html
- Placeholder minimal "Théorie" centré

### recit.html
- ~45 steps avec VRAI CONTENU (user a intégré)
- Images réelles dans img/recit/ (nommées selon steps)
- Spans data-pop-def intégrés dans le texte
- Popup HTML avec 7 définitions: sys-socio-eco, co-creation, socialement-pertinent, savoir-eco, phase-0, objet-frontiere, theorie-u
- Dernier step: is-last position-center avec btn-back

---

## DÉCISIONS DE DESIGN

1. **Pas responsive** - min-width 1400px, optimisé 1920px
2. **Un seul CSS** partagé pour maintenance facile
3. **Bilingue manuel** - pas de système dynamique, juste liens entre pages FR/EN
4. **Titres uppercase** via CSS (text-transform)
5. **Footer couleur custom** #124978 (pas variable)
6. **Bouton langue** déplacé en bas gauche (était prévu haut droite)
7. **Bouton retour** style bleu avec texte blanc
8. **Popup fond bleu foncé** #1E3F63 pour contraste avec contenu principal
9. **Crossfade images** via double layer CSS (pas JS animation)
10. **Progress dots en grille** (flex-wrap, max-width 45px)

---

## PROBLÈMES RÉSOLUS

1. **Crossfade images**: Double div .bg-back et .bg-front, toggle opacity via classe .active
2. **Popup définitions**: Structure avec overlay séparé, data-def-id matching, hide all show one
3. **Scrollbar jump sur popup**: User a testé fix avec padding compensation mais l'a retiré - le problème existe toujours légèrement mais accepté

---

## STRUCTURE SCROLLAMA

```
.scrolly
  .scrolly-steps (padding-top: 100vh pour premier step)
    .step[data-image="path"] (min-height: 100vh)
      .step-content
        h3, p, spans, etc.
```

Positions: défaut=droite, .position-left, .position-center
Couleurs: .color-blue, .color-orange (sur .step-content)
Dernier: .is-last .position-center

---

## DÉFINITIONS POPUP

| ID | Dans glossaire.html | Dans popup recit.html |
|----|---------------------|----------------------|
| sys-socio-eco | Oui | Oui |
| co-creation | Oui | Oui |
| socialement-pertinent | Oui (Pertinence sociale) | Oui |
| savoir-eco | Oui | Oui |
| phase-0 | Oui | Oui |
| objet-frontiere | Oui | Oui |
| theorie-u | Non | Oui (ajouté pour récit) |

---

## IMAGES RÉCIT CONNUES

```
img/recit/
├── Cover_Zine_S7_S8 copie.webp
├── 25052025E3_S9aS14 copie.webp
├── 1_Conversation_S15aS17 copie.webp
├── 1_Conversation_S18aS21 copie.webp
├── 1_Confo_S22 copie.webp
├── 1_ConfoInterro_S23aS24 copie.webp
├── 2_3_Depart_S25aS28 copie.webp
├── 25052023E2_S29aS30 copie.webp
├── 25052023E1_S31 copie.webp
├── 26052023E1_S32 copie.webp
├── MeetingJinny_S33 copie.webp
├── 26052023TW1_S34 copie.webp
├── IllustrationSansTitre_S35 copie.webp
├── imageMapFN_S37aS38 copie.webp
├── 26052023M1_S39 copie.webp
├── retour_S40aS42 copie.webp
├── IllustrationSansTitre1_S43 copie.webp
├── 31072023intentions_S44aS45 copie.webp
├── 31072023inbetween_S46aS49 copie.webp
├── NuitLetSleep_S50 copie.webp
├── IllustrationSansTitre2_S51 copie.webp
├── 01082023prototyping_S52 copie.webp
├── resumeFinal_S53aS54 copie.webp
├── MeetingJinny_S55 copie.webp
```

Naming convention: [description]_S[numéros steps] copie.webp

---

## PRÉFÉRENCES USER

- Style minimaliste, épuré
- Pas d'over-engineering
- Contenu temporaire acceptable (lorem ipsum, placeholders)
- Préfère bleu/orange/gris comme palette principale
- Veut pouvoir facilement ajuster couleurs (d'où variables CSS)
- Images > 1920x1080 pour retina
- Francophone (Québec probablement vu vocabulaire)

---

## À FAIRE / NON FAIT

- [ ] Lier pages vers versions anglaises (ancres vides actuellement)
- [ ] Remplacer logos placeholder par vrais logos
- [ ] Remplacer image remerciements par vraie image
- [ ] Possiblement retirer page Théorie
- [ ] Masquer progress dots en production (.hidden)
- [ ] Vérifier/ajuster contenu mise en contexte accueil
- [ ] Ajouter vrais noms auteurs/illustrateurs dans footer

---

## CONTEXTE NARRATIF RÉCIT

Timeline été 2023:
1. Février: Appel Mélanie → Fanny
2. Printemps: Réunions en ligne avec TWA/EWA
3. Mai: Premier voyage NB (Fanny, Madeleine, Marie-Pomme, Kate)
   - Soirées communautaires Wishart Lodge + Centre Jeunesse Esgenoôpetitj
   - Rencontre aînée Mi'kmaq
   - Session brainstorm avec Billie Joe, Samantha
4. Été: Retour Rimouski, réflexion
5. Juillet-Août: Deuxième voyage
   - Fred Guichard rejoint
   - Cristallisation vision/intentions
   - Motel Beauséjour à Negua
   - Prototypage projet final
   - Herbier marin devient "objet frontière"

Théorie U mentionnée: Observer → Sentir → Présence → Cristalliser → Prototyper

---

## TECHNIQUE SCROLLAMA

CDN: https://unpkg.com/scrollama@3.2.0/build/scrollama.min.js

Config:
```js
scrollama().setup({
  step: '.step',
  offset: 0.5,
  progress: false,
  debug: false
})
```

Events utilisés: onStepEnter (change bg, update dots, add is-active)

---

## CSS CRITIQUE

```css
/* Popup activation */
.popup-overlay.active { opacity: 1; visibility: visible; }
.popup-container.active { opacity: 1; visibility: visible; transform: translate(-50%, -50%) scale(1); }

/* Step content sur fond coloré */
.step-content.color-blue { background-color: rgba(30, 63, 99, 0.9); }
.step-content.color-blue h3, .step-content.color-blue p { color: white; }

/* Span définitions */
.step-content span[data-pop-def] {
  white-space: nowrap;
  font-weight: bold;
  color: #D6764D;
  text-decoration: underline;
  cursor: pointer;
}
```

---

## NOTES SESSION

- User modifie fichiers en parallèle pendant conversation
- User a intégré tout le vrai contenu récit lui-même
- User a ajusté plusieurs styles CSS manuellement
- User préfère solutions simples même si imparfaites (ex: scrollbar jump accepté)
- Communication en français, projet académique francophone
