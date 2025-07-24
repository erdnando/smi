/**
 * Cookie Consent Utils - Herramientas para depuración y gestión de cookies entre páginas
 * Versión: 2.0 - Solución centralizada para todas las páginas
 */

// Esta es la solución centralizada que debe ejecutarse primero, antes que el resto de scripts
document.addEventListener('DOMContentLoaded', function() {
  // Verificar el estado de las cookies en cada carga de página
  checkCookieConsistency();
  
  // Buscar y eliminar cualquier banner que no debería estar ahí
  setTimeout(removeBannerIfCookiesAccepted, 100);
  
  // Establecer un observador para asegurarse de que no se añada un banner si ya están aceptadas
  setupBannerObserver();
});

/**
 * Verifica la consistencia de las cookies entre páginas
 * Corrige automáticamente problemas comunes
 */
function checkCookieConsistency() {
  try {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookiesPreferences = localStorage.getItem('cookiesPreferences');
    
    // Verificar si hay inconsistencias en los datos guardados
    if (cookiesAccepted === 'true' && !cookiesPreferences) {
      // Hay una inconsistencia: aceptadas pero sin preferencias
      console.warn('⚠️ Inconsistencia detectada: cookiesAccepted=true pero sin preferencias');
      
      // Recrear las preferencias con valores predeterminados
      localStorage.setItem('cookiesPreferences', JSON.stringify({
        analytics: true,
        marketing: true,
        necessary: true,
        timestamp: new Date().getTime(),
        recoveryNeeded: true // Marca que hubo que recuperar datos
      }));
      
      console.log('✅ Preferencias restauradas automáticamente');
    }
    
    // Verificar si hay valores inválidos
    if (cookiesAccepted !== null && cookiesAccepted !== 'true' && cookiesAccepted !== 'false') {
      console.warn('⚠️ Valor inválido detectado para cookiesAccepted:', cookiesAccepted);
      
      // Corregir el valor
      localStorage.setItem('cookiesAccepted', 'false');
      console.log('✅ Valor corregido a "false"');
    }
    
    // Registrar el dominio y página actual (útil para depuración)
    const domain = window.location.hostname;
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    
    console.log(`📄 Página cargada: ${page} - Estado cookies: ${cookiesAccepted === 'true' ? 'Aceptadas' : 'No aceptadas'}`);
  } catch (error) {
    console.error('❌ Error al verificar la consistencia de las cookies:', error);
  }
}

/**
 * Fuerza la aceptación de cookies en caso de problemas persistentes
 */
function forceAcceptCookies() {
  try {
    localStorage.setItem('cookiesAccepted', 'true');
    localStorage.setItem('cookiesPreferences', JSON.stringify({
      analytics: true,
      marketing: true,
      necessary: true,
      timestamp: new Date().getTime(),
      forcedAccept: true
    }));
    
    console.log('✅ Cookies forzadas a estado "aceptadas"');
    console.log('🔄 Recarga la página para aplicar los cambios');
  } catch (error) {
    console.error('❌ Error al forzar la aceptación de cookies:', error);
    
    // Intentar alternativa con sessionStorage como respaldo
    try {
      sessionStorage.setItem('cookiesAccepted', 'true');
      console.log('⚠️ Usando sessionStorage como alternativa (solo durará esta sesión)');
    } catch (e) {
      console.error('❌ No se pudo usar localStorage ni sessionStorage');
    }
  }
}

/**
 * Verificación detallada para depuración
 */
function diagnosticCookieConsent() {
  try {
    // Verificar localStorage
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const cookiesPreferences = localStorage.getItem('cookiesPreferences');
    
    console.group('🔍 Diagnóstico de Cookies');
    console.log('📊 Estado actual:');
    console.log('- cookiesAccepted:', cookiesAccepted);
    console.log('- cookiesPreferences:', cookiesPreferences);
    
    // Verificar navegador y compatibilidad
    const isPrivateMode = !window.localStorage;
    console.log('🌐 Navegador:', navigator.userAgent);
    console.log('🔒 Modo privado/incógnito:', isPrivateMode ? 'Probable' : 'No detectado');
    
    // Prueba de escritura/lectura
    const testKey = '_test_cookie_' + Math.random();
    const testValue = 'test_' + new Date().getTime();
    
    try {
      localStorage.setItem(testKey, testValue);
      const readValue = localStorage.getItem(testKey);
      localStorage.removeItem(testKey);
      
      console.log('✅ Prueba de localStorage: ' + (readValue === testValue ? 'Exitosa' : 'Fallida'));
    } catch (e) {
      console.log('❌ Prueba de localStorage: Fallida - ' + e.message);
    }
    
    console.groupEnd();
  } catch (error) {
    console.error('❌ Error en diagnóstico de cookies:', error);
  }
}

/**
 * Elimina el banner de cookies si ya están aceptadas
 * Esta función se ejecuta después de un pequeño retraso para asegurar que el DOM está listo
 */
function removeBannerIfCookiesAccepted() {
  try {
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (cookiesAccepted === 'true') {
      // Si las cookies ya están aceptadas, verificar si hay un banner visible
      const banner = document.querySelector('.cookie-consent');
      if (banner) {
        console.warn('⚠️ Banner de cookies detectado aunque las cookies están aceptadas');
        
        // Eliminar el banner con animación suave
        banner.classList.remove('active');
        setTimeout(() => {
          banner.remove();
          console.log('✅ Banner eliminado correctamente');
        }, 300);
      }
    }
  } catch (error) {
    console.error('❌ Error al intentar eliminar el banner:', error);
  }
}

/**
 * Establece un observador para detectar si se agrega un banner de cookies
 * y lo elimina si ya están aceptadas las cookies
 */
function setupBannerObserver() {
  try {
    // Crear un observador de mutaciones para detectar cuando se añade el banner al DOM
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
          if (node.nodeType === 1 && node.classList && node.classList.contains('cookie-consent')) {
            // Si se ha añadido un banner de cookies al DOM
            const cookiesAccepted = localStorage.getItem('cookiesAccepted');
            if (cookiesAccepted === 'true') {
              console.warn('⚠️ Se intentó mostrar el banner aunque las cookies están aceptadas');
              
              // Eliminar el banner inmediatamente
              node.classList.remove('active');
              setTimeout(() => {
                node.remove();
                console.log('✅ Banner eliminado por el observador');
              }, 100);
            }
          }
        });
      });
    });
    
    // Iniciar la observación del DOM
    observer.observe(document.body, {
      childList: true, // Observar adiciones/eliminaciones directas de hijos
      subtree: false   // No observar cambios en descendientes
    });
    
    console.log('🔍 Observador de banner configurado');
  } catch (error) {
    console.error('❌ Error al configurar el observador de banner:', error);
  }
}

// Exponer funciones para uso desde la consola
window.cookieUtils = {
  check: checkCookieConsistency,
  force: forceAcceptCookies,
  diagnostic: diagnosticCookieConsent,
  removeBanner: removeBannerIfCookiesAccepted
};

// Garantizar que esta solución se aplica incluso si hay errores en otros scripts
window.addEventListener('error', function(event) {
  if (event.filename && event.filename.includes('cookie-consent.js')) {
    console.error('❌ Error en cookie-consent.js. Aplicando corrección de emergencia...');
    setTimeout(function() {
      if (localStorage.getItem('cookiesAccepted') === 'true') {
        removeBannerIfCookiesAccepted();
      }
    }, 500);
  }
});
