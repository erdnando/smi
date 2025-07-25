/**
 * Cookie Optimizer para SMI Networks
 * Este script optimiza la carga y gestión de cookies para mejorar el rendimiento
 * Especialmente útil para recargas de página directas
 */

(function() {
  // Solo ejecutar una vez
  if (window.cookieOptimizerLoaded) return;
  window.cookieOptimizerLoaded = true;
  
  // Guardar referencia a los métodos originales
  const _localStorage = {
    getItem: localStorage.getItem.bind(localStorage),
    setItem: localStorage.setItem.bind(localStorage)
  };
  
  // Cache para evitar accesos repetidos a localStorage
  const cookieCache = {};
  
  // Sobrescribir los métodos de localStorage con versiones optimizadas
  localStorage.getItem = function(key) {
    if (cookieCache[key] !== undefined) {
      return cookieCache[key];
    }
    const value = _localStorage.getItem(key);
    cookieCache[key] = value;
    return value;
  };
  
  localStorage.setItem = function(key, value) {
    cookieCache[key] = value;
    // Realizar la operación de escritura de forma asíncrona
    setTimeout(() => {
      _localStorage.setItem(key, value);
    }, 0);
  };
  
  // Detectar si es una recarga directa o navegación interna
  const isDirectPageLoad = !document.referrer || 
                           document.referrer.indexOf(location.hostname) === -1;
                           
  // Detectar si estamos en la URL raíz sin index.html explícito
  const isRootUrl = location.pathname === '/' || location.pathname === '';
  
  // Optimizar la carga del aviso de cookies
  function optimizeCookieConsent() {
    // Verificar si las cookies ya fueron aceptadas (usar la cache)
    const cookiesAccepted = localStorage.getItem('cookiesAccepted') === 'true';
    
    if (cookiesAccepted) {
      // Si ya se aceptaron, marcar en el HTML y no mostrar el banner
      document.documentElement.setAttribute('data-cookies-accepted', 'true');
      // No necesitamos cargar el script de consentimiento si ya fue aceptado
      return true;
    }
    
    // Si es una recarga directa o estamos en la URL raíz, optimizar la carga
    if (isDirectPageLoad || isRootUrl) {
      // Retrasar la carga de los scripts de cookies para no afectar el renderizado inicial
      window.addEventListener('load', function() {
        // Retraso más largo para la URL raíz
        const delay = isRootUrl ? 2000 : 1500;
        setTimeout(function() {
          loadCookieScripts();
        }, delay);
      });
    } else {
      // Para navegaciones internas con rutas específicas, cargar normalmente
      loadCookieScripts();
    }
    
    return false;
  }
  
  // Función para cargar los scripts de cookies de manera controlada
  function loadCookieScripts() {
    // Verificar si los scripts ya están cargados
    if (document.getElementById('cookie-utils-script') || 
        document.getElementById('cookie-consent-script')) {
      return;
    }
    
    // Cargar cookie-utils.js primero
    const utilsScript = document.createElement('script');
    utilsScript.id = 'cookie-utils-script';
    utilsScript.src = 'cookie-utils.js';
    utilsScript.async = true;
    
    // Después cargar cookie-consent.js
    utilsScript.onload = function() {
      const consentScript = document.createElement('script');
      consentScript.id = 'cookie-consent-script';
      consentScript.src = 'cookie-consent.js';
      consentScript.async = true;
      document.body.appendChild(consentScript);
    };
    
    document.body.appendChild(utilsScript);
  }
  
  // Iniciar la optimización
  window.cookiesAlreadyAccepted = optimizeCookieConsent();
  
  // Exponer una API para cargar los scripts de cookies manualmente si es necesario
  window.loadCookieScripts = loadCookieScripts;
})();
