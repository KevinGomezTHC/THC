document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // VARIABLES GLOBALES
  // ------------------------------
  let bubblesOpen = false;

  // ------------------------------
  // MODALES TRADICIONALES
  // ------------------------------
  const abrirModal = (btnSelector, modalId) => {
    const botonAbrir = document.querySelector(btnSelector);
    const modal = document.getElementById(modalId);
    const botonCerrar = document.getElementById(`close-${modalId.split('-')[1]}`);

    if (!botonAbrir || !modal || !botonCerrar) return;

    botonAbrir.addEventListener('click', () => {
      modal.style.display = 'flex';
    });

    botonCerrar.addEventListener('click', () => {
      modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal && modal.classList.contains('modal-overlay')) {
        modal.style.display = 'none';
      }
    });
  };

  abrirModal('.sn-mision', 'modal-mision');
  abrirModal('.sn-vision', 'modal-vision');
  abrirModal('.sn-bartender', 'modal-bartender');

  // ------------------------------
  // MÓDULO EXPANDIBLE "VER MÁS"
  // ------------------------------
  (() => {
    const verMasBtn = document.querySelector('.expand-white-btn');
    const visionBox = document.querySelector('.iso-box.vision');
    const closeExpandedBtn = document.querySelector('.iso-box.vision .close-expanded');

    if (!verMasBtn || !visionBox || !closeExpandedBtn) return;

    let expanded = false;
    let lastScrollTop = 0;

    verMasBtn.addEventListener('click', () => {
      if (expanded) return;

      expanded = true;
      lastScrollTop = window.scrollY;

      visionBox.classList.add('expandida');
      document.body.classList.add('expand-mode');
      document.documentElement.classList.add('expand-mode');

      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';

      // Historial para botón "atrás"
      history.pushState({ expanded: true }, '', '#expanded');
    });

    closeExpandedBtn.addEventListener('click', () => {
      cerrarExpandido();
    });

    // Al presionar "atrás", cerrar animación si está abierta
    window.addEventListener('popstate', (event) => {
      if (expanded) {
        cerrarExpandido();
      } else {
        // O redirigir al index si no hay expandido activo
        window.location.href = 'index.html';
      }
    });

    function cerrarExpandido() {
      expanded = false;
      visionBox.classList.remove('expandida');
      document.body.classList.remove('expand-mode');
      document.documentElement.classList.remove('expand-mode');

      setTimeout(() => {
        window.scrollTo({ top: lastScrollTop, behavior: 'instant' });
      }, 50);
    }
  })();

  // ------------------------------
  // AJUSTE DE VELOCIDAD DE VIDEO
  // ------------------------------
  (() => {
    const video = document.querySelector('.bg-video');
    if (video) {
      video.playbackRate = 0.5;
    }
  })();


});
