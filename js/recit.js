/**
 * Phase 0 - Récit Scrollytelling
 * Utilise Scrollama.js pour le scroll-driven storytelling
 *
 * Approche: Crée un layer par combinaison image+classe unique,
 * puis fade in/out les layers au scroll.
 */

(function() {
  'use strict';

  // Éléments du DOM
  const bgContainer = document.querySelector('.recit-bg-container');
  const steps = document.querySelectorAll('.step');
  const progressDots = document.querySelector('.progress-dots');

  // État
  let currentStep = 0;
  let currentLayer = null;

  // Map: step index -> layer element
  const stepToLayer = new Map();

  // Map: "imageUrl|classe" -> layer element (pour réutiliser les layers identiques)
  const layerCache = new Map();

  // Récupérer les infos depuis les data attributes des steps
  function getStepImage(stepElement) {
    return stepElement.dataset.image || null;
  }

  function getStepClasse(stepElement) {
    return stepElement.dataset.classe || '';
  }

  // Créer une clé unique pour une combinaison image+classe
  function makeLayerKey(imageUrl, classe) {
    return `${imageUrl}|${classe}`;
  }

  // Créer tous les layers au chargement
  function createAllLayers() {
    steps.forEach((step, index) => {
      const imageUrl = getStepImage(step);
      if (!imageUrl) return;

      const classe = getStepClasse(step);
      const key = makeLayerKey(imageUrl, classe);

      // Vérifier si ce layer existe déjà
      if (layerCache.has(key)) {
        // Réutiliser le layer existant
        stepToLayer.set(index, layerCache.get(key));
      } else {
        // Créer un nouveau layer
        const layer = document.createElement('div');
        layer.className = 'recit-bg-layer';
        if (classe) {
          layer.classList.add(classe);
        }
        layer.style.backgroundImage = `url('${imageUrl}')`;

        bgContainer.appendChild(layer);

        // Stocker dans les maps
        layerCache.set(key, layer);
        stepToLayer.set(index, layer);
      }
    });

    // Activer le premier layer
    const firstLayer = stepToLayer.get(0);
    if (firstLayer) {
      firstLayer.classList.add('active');
      currentLayer = firstLayer;
    }
  }

  // Changer le layer actif avec fade
  function switchToLayer(newLayer) {
    if (newLayer === currentLayer) return;

    // Fade out l'ancien
    if (currentLayer) {
      currentLayer.classList.remove('active');
    }

    // Fade in le nouveau
    if (newLayer) {
      newLayer.classList.add('active');
    }

    currentLayer = newLayer;
  }

  // Créer les indicateurs de progression
  function createProgressDots() {
    if (!progressDots) return;

    steps.forEach((step, index) => {
      const dot = document.createElement('button');
      dot.className = 'progress-dot';
      dot.setAttribute('aria-label', `Aller à l'étape ${index + 1}`);
      dot.addEventListener('click', () => {
        step.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
      progressDots.appendChild(dot);
    });
  }

  // Mettre à jour l'indicateur actif
  function updateProgressDots(index) {
    if (!progressDots) return;
    const dots = progressDots.querySelectorAll('.progress-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Détecter si on est sur mobile
  function isMobile() {
    return window.innerWidth < 768;
  }

  // Initialiser Scrollama
  function initScrollama() {
    const scroller = scrollama();

    // Offset plus élevé sur mobile pour changer l'image plus tôt
    const scrollOffset = isMobile() ? 0.85 : 0.5;

    scroller
      .setup({
        step: '.step',
        offset: scrollOffset,
        progress: false,
        debug: false
      })
      .onStepEnter(response => {
        const { element, index, direction } = response;

        // Mettre à jour l'étape courante
        currentStep = index;

        // Changer le layer de fond
        const layer = stepToLayer.get(index);
        if (layer) {
          switchToLayer(layer);
        }

        // Mettre à jour les indicateurs
        updateProgressDots(index);

        // Ajouter une classe active au step
        steps.forEach(s => s.classList.remove('is-active'));
        element.classList.add('is-active');
      })
      .onStepExit(response => {
        // Optionnel: actions à la sortie d'un step
      });

    // Gérer le resize
    window.addEventListener('resize', scroller.resize);
  }

  // ===========================================
  // Popup Définitions
  // ===========================================

  const popupOverlay = document.querySelector('.popup-overlay');
  const popupContainer = document.querySelector('.popup-container');
  const popupClose = document.querySelector('.popup-close');
  const popupDefItems = document.querySelectorAll('.popup-def-item');
  const defTriggers = document.querySelectorAll('[data-pop-def]');

  // Ouvrir le popup avec la bonne définition
  function openPopup(defId) {
    // Cacher toutes les définitions
    popupDefItems.forEach(item => item.classList.remove('active'));

    // Afficher la définition demandée
    const targetDef = document.querySelector(`.popup-def-item[data-def-id="${defId}"]`);
    if (targetDef) {
      targetDef.classList.add('active');
    }

    // Afficher le popup
    popupOverlay.classList.add('active');
    popupContainer.classList.add('active');

    // Empêcher le scroll du body
    document.body.style.overflow = 'hidden';
  }

  // Fermer le popup
  function closePopup() {
    popupOverlay.classList.remove('active');
    popupContainer.classList.remove('active');

    // Réactiver le scroll
    document.body.style.overflow = '';
  }

  // Initialiser les événements du popup
  function initPopup() {
    if (!popupOverlay || !popupContainer) return;

    // Clic sur les triggers
    defTriggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const defId = trigger.dataset.popDef;
        openPopup(defId);
      });
    });

    // Clic sur l'overlay pour fermer
    popupOverlay.addEventListener('click', closePopup);

    // Clic sur le bouton X pour fermer
    if (popupClose) {
      popupClose.addEventListener('click', closePopup);
    }

    // Touche Escape pour fermer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && popupContainer.classList.contains('active')) {
        closePopup();
      }
    });

    // Empêcher la propagation du clic dans le popup
    popupContainer.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }

  // ===========================================
  // Initialisation
  // ===========================================

  function init() {
    createAllLayers();
    createProgressDots();
    initScrollama();
    updateProgressDots(0);
    initPopup();
  }

  // Lancer quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
