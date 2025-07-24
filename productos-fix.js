/**
 * Script para forzar la corrección en productos.html
 * Este archivo soluciona un problema específico con la persistencia de cookies en la página de productos
 */

document.addEventListener('DOMContentLoaded', function() {
  console.log("🔍 Iniciando diagnóstico específico para productos.html");
  
  // 1. Verificar estado actual de cookies
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  console.log("Estado inicial cookiesAccepted:", cookiesAccepted);
  
  // 2. Comprobar si hay banner visible
  setTimeout(function() {
    const cookieBanner = document.querySelector('.cookie-consent');
    if (cookieBanner) {
      console.log("Banner detectado cuando cookiesAccepted =", cookiesAccepted);
      
      // Si hay banner pero debería estar aceptado, forzar la eliminación
      if (cookiesAccepted === 'true') {
        console.log("Corrigiendo inconsistencia: Eliminando banner...");
        
        // Simular clic en aceptar
        const acceptButton = document.getElementById('cookieAccept');
        if (acceptButton) {
          console.log("Simulando clic en aceptar...");
          acceptButton.click();
        } else {
          // Alternativa: eliminar el banner directamente
          console.log("Eliminando banner directamente...");
          cookieBanner.classList.remove('active');
          setTimeout(() => {
            cookieBanner.remove();
          }, 300);
        }
      }
    } else {
      if (cookiesAccepted !== 'true') {
        console.log("Inconsistencia detectada: Banner no visible pero cookies no aceptadas");
        // Forzar estado consistente
        localStorage.setItem('cookiesAccepted', 'true');
        console.log("Estado forzado a aceptado");
      } else {
        console.log("Estado correcto: Banner no visible y cookies aceptadas");
      }
    }
  }, 1000); // Dar tiempo a que el banner se muestre si corresponde
  
  // 3. Establecer un observador para detectar la adición del banner
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1 && node.classList && node.classList.contains('cookie-consent')) {
          console.log("Banner detectado por observer");
          if (localStorage.getItem('cookiesAccepted') === 'true') {
            console.log("Eliminando banner agregado incorrectamente");
            node.classList.remove('active');
            setTimeout(() => {
              node.remove();
            }, 300);
          }
        }
      });
    });
  });
  
  // Observar cambios en el body
  observer.observe(document.body, { childList: true, subtree: false });
  
  // 4. Comprobar que los cambios persisten después de la carga
  window.addEventListener('load', function() {
    console.log("Página cargada completamente");
    const finalCookiesAccepted = localStorage.getItem('cookiesAccepted');
    console.log("Estado final cookiesAccepted:", finalCookiesAccepted);
  });
});
