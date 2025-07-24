/**
 * Script para gestionar el aviso de cookies
 * Versión: 2.0 - Solución centralizada y coordinada con cookie-utils.js
 */

document.addEventListener('DOMContentLoaded', function() {
  // IMPORTANTE: cookie-utils.js debe cargarse antes que este script
  // para garantizar que la verificación de consistencia se realice primero
  
  // Verificar si ya se ha aceptado la política de cookies en todo el sitio
  // Usamos una función para asegurar que el valor es reciente
  function getCookiesAccepted() {
    return localStorage.getItem('cookiesAccepted');
  }
  
  // Solo mostrar el banner si no se han aceptado las cookies (cookiesAccepted no es 'true')
  // Usamos '!== "true"' para una comparación explícita del string "true"
  if (getCookiesAccepted() !== 'true') {
    // Crear el elemento del aviso de cookies
    const cookieConsent = document.createElement('div');
    cookieConsent.className = 'cookie-consent';
    
    cookieConsent.innerHTML = `
      <div class="cookie-consent-content">
        <h4>Uso de Cookies</h4>
        <p>Este sitio web utiliza cookies propias y de terceros para mejorar tu experiencia, mostrar contenido personalizado y analizar el tráfico. 
        Al hacer clic en "Aceptar todas", consientes el uso de todas las cookies. También puedes revisar nuestra <a href="politica.html">Política de Privacidad</a> para más información.</p>
      </div>
      <div class="cookie-consent-actions">
        <button class="cookie-consent-btn secondary" id="cookieConfig">Configurar</button>
        <button class="cookie-consent-btn" id="cookieAccept">Aceptar todas</button>
      </div>
    `;
    
    // Añadir el aviso al cuerpo del documento
    document.body.appendChild(cookieConsent);
    
    // Mostrar el aviso después de un pequeño delay
    setTimeout(() => {
      cookieConsent.classList.add('active');
    }, 500);
    
    // Gestionar el botón "Aceptar todas"
    document.getElementById('cookieAccept').addEventListener('click', function() {
      // Guardar la preferencia en localStorage con fecha de expiración
      try {
        // Guardar el estado actual
        localStorage.setItem('cookiesAccepted', 'true');
        
        // Guardar las preferencias detalladas
        localStorage.setItem('cookiesPreferences', JSON.stringify({
          analytics: true,
          marketing: true,
          necessary: true,
          timestamp: new Date().getTime() // Añadir timestamp para posible expiración futura
        }));
        
        // Verificar que se haya guardado correctamente
        const verification = localStorage.getItem('cookiesAccepted');
        if (verification !== 'true') {
          console.error('Error al guardar las preferencias de cookies');
        } else {
          console.log('Preferencias de cookies guardadas correctamente');
        }
      } catch (error) {
        console.error('Error al guardar las preferencias de cookies:', error);
      }
      
      // Ocultar y eliminar el aviso
      cookieConsent.classList.remove('active');
      setTimeout(() => {
        cookieConsent.remove();
      }, 300);
      
      // Inicializar herramientas de análisis (si existen)
      initializeAnalytics();
    });
    
    // Gestionar el botón "Configurar"
    document.getElementById('cookieConfig').addEventListener('click', function() {
      // Aquí se podría mostrar un modal más detallado para configurar los tipos de cookies
      // Por ahora, vamos a redirigir a la política de privacidad
      window.location.href = 'politica.html#cookies';
    });
  } else {
    // Si ya se han aceptado las cookies, inicializar las herramientas de análisis
    // sin mostrar el banner
    console.log('Cookies ya aceptadas. No se muestra el banner.');
    
    // Adicionalmente, verificamos si hay algún problema con el localStorage
    try {
      // Verificamos nuevamente para estar seguros
      const doubleCheck = localStorage.getItem('cookiesAccepted');
      if (doubleCheck !== 'true') {
        console.error('Inconsistencia detectada. Reiniciando preferencias de cookies.');
        localStorage.setItem('cookiesAccepted', 'true');
      }
    } catch (error) {
      console.error('Error al verificar las preferencias de cookies:', error);
    }
    
    initializeAnalytics();
  }
});

/**
 * Inicializa herramientas de análisis (como Google Analytics)
 * Esta función se llamará cuando se acepten las cookies o si ya están aceptadas
 */
function initializeAnalytics() {
  // Aquí se colocaría el código para inicializar Google Analytics
  // Por ejemplo:
  /*
  if (typeof gtag !== 'undefined') {
    gtag('consent', 'update', {
      'analytics_storage': 'granted'
    });
  }
  */
  
  // Verificar dominio (útil para depurar problemas de localStorage)
  try {
    const domain = window.location.hostname;
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    
    console.log(`Analytics initialized on ${domain} - Page: ${page || 'index.html'}`);
  } catch (error) {
    console.error('Error al inicializar analytics:', error);
  }
}
