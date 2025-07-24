// Función para depurar y comprobar el funcionamiento de las cookies
function checkCookieStatus() {
  const cookiesAccepted = localStorage.getItem('cookiesAccepted');
  const preferences = localStorage.getItem('cookiesPreferences');
  
  console.log('Estado de cookies:');
  console.log('- Cookies aceptadas:', cookiesAccepted === 'true' ? 'Sí' : 'No');
  console.log('- Preferencias guardadas:', preferences ? 'Sí' : 'No');
  
  if (preferences) {
    try {
      const preferencesObj = JSON.parse(preferences);
      console.log('- Analytics:', preferencesObj.analytics ? 'Habilitado' : 'Deshabilitado');
      console.log('- Marketing:', preferencesObj.marketing ? 'Habilitado' : 'Deshabilitado');
      console.log('- Necessary:', preferencesObj.necessary ? 'Habilitado' : 'Deshabilitado');
    } catch (e) {
      console.error('Error al analizar las preferencias:', e);
    }
  }
  
  return {
    accepted: cookiesAccepted === 'true',
    preferences: preferences ? JSON.parse(preferences) : null
  };
}

// Función para borrar las cookies y reiniciar
function resetCookieConsent() {
  localStorage.removeItem('cookiesAccepted');
  localStorage.removeItem('cookiesPreferences');
  console.log('Preferencias de cookies reiniciadas. Recarga la página para ver el banner nuevamente.');
}

// Esta función se puede ejecutar desde la consola del navegador para verificar
// y depurar el funcionamiento del banner de cookies
