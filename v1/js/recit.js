/**
 * Phase 0 - Récit Scrollytelling
 * Utilise Scrollama.js pour le scroll-driven storytelling
 */

(function() {
  'use strict';

  // Éléments du DOM
  const bgBack = document.querySelector('.bg-back');
  const bgFront = document.querySelector('.bg-front');
  const steps = document.querySelectorAll('.step');
  const progressDots = document.querySelector('.progress-dots');

  // État
  let currentStep = 0;
  let isFrontActive = false;

  // Récupérer les images depuis les data attributes des steps
  function getStepImage(stepElement) {
    return stepElement.dataset.image || null;
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
    const dots = progressDots.querySelectorAll('.progress-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  // Changer l'image de fond avec crossfade
  function changeBackground(imageUrl) {
    if (!imageUrl) return;

    if (isFrontActive) {
      // Front est visible, on charge sur back et on fade out front
      bgBack.style.backgroundImage = `url('${imageUrl}')`;
      bgFront.classList.remove('active');
    } else {
      // Back est visible, on charge sur front et on fade in front
      bgFront.style.backgroundImage = `url('${imageUrl}')`;
      bgFront.classList.add('active');
    }

    isFrontActive = !isFrontActive;
  }

  // Initialiser Scrollama
  function initScrollama() {
    const scroller = scrollama();

    scroller
      .setup({
        step: '.step',
        offset: 0.5, // Trigger quand le step atteint le milieu de l'écran
        progress: false,
        debug: false
      })
      .onStepEnter(response => {
        const { element, index, direction } = response;

        // Mettre à jour l'étape courante
        currentStep = index;

        // Changer l'image de fond
        const imageUrl = getStepImage(element);
        if (imageUrl) {
          changeBackground(imageUrl);
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

  // Précharger les images
  function preloadImages() {
    const images = [];
    steps.forEach(step => {
      const imageUrl = getStepImage(step);
      if (imageUrl && !images.includes(imageUrl)) {
        images.push(imageUrl);
        const img = new Image();
        img.src = imageUrl;
      }
    });
  }

  // Initialiser la première image
  function initFirstImage() {
    const firstStep = steps[0];
    if (firstStep) {
      const imageUrl = getStepImage(firstStep);
      if (imageUrl) {
        bgBack.style.backgroundImage = `url('${imageUrl}')`;
      }
    }
  }

  // Initialisation
  function init() {
    createProgressDots();
    preloadImages();
    initFirstImage();
    initScrollama();
    updateProgressDots(0);
  }

  // Lancer quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
