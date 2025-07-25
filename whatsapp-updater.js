/**
 * WhatsApp Number Updater
 * Este script asegura que el número de WhatsApp se actualice correctamente
 * Versión 20250724
 */
(function() {
  // Número actualizado de WhatsApp - actualizar aquí si cambia
  const CURRENT_WHATSAPP = '523313298609';
  
  // Forzar actualización del número en variables globales
  window.WHATSAPP_NUMBER = CURRENT_WHATSAPP;
  
  // Esta función se ejecuta después de que el DOM está listo
  function updateWhatsAppLinks() {
    // Actualizar todos los enlaces de WhatsApp en la página
    const whatsappLinks = document.querySelectorAll('a[href*="whatsapp"]');
    whatsappLinks.forEach(function(link) {
      const url = new URL(link.href);
      const path = url.pathname;
      
      // Si es un enlace de WhatsApp, actualizarlo
      if (url.hostname === 'api.whatsapp.com' || url.hostname === 'wa.me') {
        // Extraer cualquier texto del mensaje
        let message = '';
        if (url.searchParams.has('text')) {
          message = url.searchParams.get('text');
        }
        
        // Crear el nuevo enlace
        if (message) {
          link.href = `https://api.whatsapp.com/send?phone=${CURRENT_WHATSAPP}&text=${encodeURIComponent(message)}`;
        } else {
          link.href = `https://api.whatsapp.com/send?phone=${CURRENT_WHATSAPP}`;
        }
        
        console.log('WhatsApp link updated:', link.href);
      }
    });
    
    // Actualizar el botón flotante de WhatsApp
    const whatsappFloatBtn = document.getElementById('whatsapp-float-btn');
    if (whatsappFloatBtn) {
      whatsappFloatBtn.href = `https://api.whatsapp.com/send?phone=${CURRENT_WHATSAPP}&text=${encodeURIComponent('Hola SMI Networks, me gustaría más información sobre sus servicios.')}`;
      console.log('WhatsApp float button updated:', whatsappFloatBtn.href);
    }
  }
  
  // Ejecutar cuando el DOM está listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateWhatsAppLinks);
  } else {
    updateWhatsAppLinks();
  }
  
  // También ejecutar después de una carga completa para asegurarse
  window.addEventListener('load', updateWhatsAppLinks);
})();
