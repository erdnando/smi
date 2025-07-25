/**
 * Script para eliminar elementos antiguos almacenados en caché (versión 202507231)
 * Este script debe cargarse antes que cualquier otro script
 */
(function() {
  // Función para eliminar elementos problemáticos de la caché
  function removeStaleElements() {
    // Remover el botón de animaciones si existe (desde caché)
    const animationToggleBtn = document.getElementById('animation-toggle');
    if (animationToggleBtn) {
      animationToggleBtn.remove();
      console.log('Botón de animaciones eliminado (estaba en caché)');
    }
    
    // Eliminar cualquier estilo relacionado con animaciones
    const staleStyles = document.querySelectorAll('style[id="animation-toggle-style"]');
    staleStyles.forEach(function(style) {
      style.remove();
      console.log('Estilo de animaciones eliminado (estaba en caché)');
    });
    
    // Forzar limpieza de localStorage si contiene configuraciones antiguas
    if (localStorage.getItem('animations-enabled') !== null) {
      localStorage.removeItem('animations-enabled');
      console.log('Configuración de animaciones eliminada de localStorage');
    }
  }

  // Ejecutar inmediatamente
  removeStaleElements();
  
  // También ejecutar cuando el DOM esté listo para atrapar elementos que se agregan dinámicamente
  document.addEventListener('DOMContentLoaded', removeStaleElements);
  
  // Ejecutar una vez más después de la carga completa para asegurar
  window.addEventListener('load', function() {
    // Esperar un momento para cualquier script que pueda agregarlo tarde
    setTimeout(removeStaleElements, 500);
  });
  
  // Crear un MutationObserver para detectar si el botón se agrega dinámicamente
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.addedNodes.length) {
          removeStaleElements();
        }
      });
    });
    
    // Iniciar observación cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
      observer.observe(document.body, { childList: true, subtree: true });
    });
  }
})();
