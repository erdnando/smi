/**
 * SMINETWORKS Website JavaScript
 * Main script file that handles all interactive features including:
 * - Header scroll effects
 * - Testimonial carousel with animation
 * - Contact form functionality and validation
 * - Animated counters for statistics
 * - Responsive hamburger menu
 * - WhatsApp floating button
 * - Animation triggered by scroll position
 */
document.addEventListener('DOMContentLoaded', function() {
  // Show alert for unimplemented login functionality
  const loginBtn = document.querySelector('.digitaliza-card-form button');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      alert('Funcionalidad de login no implementada.');
    });
  }
  
  /**
   * Header Scroll Effect
   * Adds 'scrolled' class to the header when user scrolls down
   * This enables visual changes like background color and shadow
   */
  const header = document.querySelector('header');
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', onScroll);
  onScroll(); // Initial check

  /**
   * Testimonials Carousel Configuration
   * Array of customer testimonials that rotate in the carousel
   * Each object contains rating (stars), testimonial text, and author information
   */
  const testimonials = [
    {
      rating: '⭐⭐⭐⭐⭐ Éxito',
      text: 'Automatización de proceso de control de agentes y tecnologías en puntos de venta. Conexión con inventarios, RH y generación de reportes. Integración con ERP, control de asistencia, aplicación de descuentos automáticos.',
      author: 'SONY\nProcessmaker Implementation'
    },
    {
      rating: '⭐⭐⭐⭐⭐ Éxito',
      text: 'Automatización de procesos de CALL CENTER. Integración con diversos sistemas (TSYS [AS/400], Java, Oracle, etc.). Centralización de una sola plataforma de procesos que conecta a los demás sistemas.',
      author: 'INVEX Banco\nProcessmaker - 40 personas por turno'
    },
    {
      rating: '⭐⭐⭐⭐⭐ Éxito',
      text: 'Katun: Integración de aplicaciones tales como Siebel, Portal, Metasolv utilizando arquitectura SOA y herramientas Oracle. Integración completa entre aplicaciones core. Implantación de arquitectura SOA.',
      author: 'Cablemas\nOracle AIA Implementation'
    }
  ];

  // Track the current testimonial displayed in the carousel
  let currentTestimonial = 0;

  /**
   * Renders a specific testimonial in the carousel
   * @param {number} idx - Index of the testimonial to render
   * Updates the content of the testimonial card with data from the testimonials array
   * Also updates the active state of the navigation dots
   */
  function renderTestimonial(idx) {
    const card = document.querySelector('.testimonial-card');
    if (!card) return; // Safety check - only run on pages with testimonial carousel
    
    // Update testimonial content
    card.querySelector('.testimonial-rating').textContent = testimonials[idx].rating;
    card.querySelector('.testimonial-text').textContent = testimonials[idx].text;
    card.querySelector('.testimonial-author').innerHTML = testimonials[idx].author.replace(/\n/g, '<br>');
    
    // Update navigation dots to reflect current testimonial
    document.querySelectorAll('.testimonial-dots .dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  /**
   * Testimonial Carousel Controls and Animation
   * Handles navigation arrows, animation, and auto-rotation
   */
  // Get DOM elements for carousel navigation
  const left = document.querySelector('.testimonial-arrow.left');
  const right = document.querySelector('.testimonial-arrow.right');
  const testimonialCard = document.querySelector('.testimonial-card');
  const testimonialSection = document.querySelector('.testimonials');
  let autoInterval = null;
  let lastDirection = 'right';

  /**
   * Animates the testimonial transition with a slide effect
   * @param {string} direction - Either 'left' or 'right' to determine animation direction
   * Removes existing animation classes, forces a browser reflow, then adds the appropriate animation class
   */
  function animateTestimonial(direction) {
    if (!testimonialCard) return;
    // Remove any existing animation classes
    testimonialCard.classList.remove('animating-left', 'animating-right');
    void testimonialCard.offsetWidth; // force browser reflow to restart animation
    
    // Apply appropriate animation class based on direction
    testimonialCard.classList.add(direction === 'left' ? 'animating-left' : 'animating-right');
    
    // Remove animation class after animation completes (600ms)
    setTimeout(() => {
      testimonialCard.classList.remove('animating-left', 'animating-right');
    }, 600);
  }

  /**
   * Starts automatic carousel rotation
   * Rotates testimonials every 5 seconds
   * Clears any existing interval before starting a new one
   */
  function startAutoCarousel() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
      lastDirection = 'right';
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      animateTestimonial('right');
      setTimeout(() => renderTestimonial(currentTestimonial), 300);
    }, 5000);
  }
  
  /**
   * Stops automatic carousel rotation
   * Used when user interacts with carousel
   */
  function stopAutoCarousel() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = null;
  }

  /**
   * Set up testimonial carousel navigation controls
   * Only initialize if navigation arrows are found on the page
   */
  if (left && right) {
    // Left arrow click - show previous testimonial
    left.addEventListener('click', () => {
      lastDirection = 'left';
      animateTestimonial('left');
      setTimeout(() => {
        // Calculate previous testimonial index with wraparound
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(currentTestimonial);
      }, 300);
      startAutoCarousel(); // Restart auto rotation timer after user interaction
    });
    
    // Right arrow click - show next testimonial
    right.addEventListener('click', () => {
      lastDirection = 'right';
      animateTestimonial('right');
      setTimeout(() => {
        // Calculate next testimonial index with wraparound
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial(currentTestimonial);
      }, 300);
      startAutoCarousel(); // Restart auto rotation timer after user interaction
    });
    
    // Navigation dots click - jump to specific testimonial
    document.querySelectorAll('.testimonial-dots .dot').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        // Determine animation direction based on target index
        lastDirection = i > currentTestimonial ? 'right' : 'left';
        animateTestimonial(lastDirection);
        setTimeout(() => {
          currentTestimonial = i;
          renderTestimonial(currentTestimonial);
        }, 300);
        startAutoCarousel(); // Restart auto rotation timer after user interaction
      });
    });
    
    // Initialize carousel
    renderTestimonial(currentTestimonial);
    startAutoCarousel();
    
    // Pause carousel auto-rotation when hovering over the testimonial section
    if (testimonialSection) {
      testimonialSection.addEventListener('mouseenter', stopAutoCarousel);
      testimonialSection.addEventListener('mouseleave', startAutoCarousel);
    }
  }

  /**
   * WhatsApp Floating Button and Chat Popup
   * Handles the display of WhatsApp chat popup and sets up the WhatsApp link
   */
  const waBtn = document.getElementById('whatsapp-float-btn');
  const waPopup = document.getElementById('whatsapp-chat-popup');
  const waClose = document.getElementById('whatsapp-chat-close');
  
  // Initialize WhatsApp popup functionality if all elements are present
  if (waBtn && waPopup && waClose) {
    // Show popup when WhatsApp button is clicked
    waBtn.addEventListener('click', function(e) {
      e.preventDefault();
      waPopup.style.display = 'block';
    });
    
    // Hide popup when close button is clicked
    waClose.addEventListener('click', function() {
      waPopup.style.display = 'none';
    });
    
    // Close popup when clicking outside of it (improved UX)
    document.addEventListener('click', function(e) {
      if (waPopup.style.display === 'block' && !waPopup.contains(e.target) && e.target !== waBtn) {
        waPopup.style.display = 'none';
      }
    });
  }

  /**
   * Configure WhatsApp button with phone number from settings.js
   * WHATSAPP_NUMBER should be defined in settings.js as international format without '+' or spaces
   * Example: 5219991234567 for Mexico number +52 1 999 123 4567
   */
  const waBtnFloat = document.getElementById('whatsapp-float-btn');
  if (waBtnFloat && typeof WHATSAPP_NUMBER !== 'undefined') {
    waBtnFloat.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  }

  /**
   * SCROLL-TRIGGERED ANIMATIONS
   * Manages elements that animate as they enter the viewport during scrolling
   */
  
  /**
   * Adds 'animated' class to elements when they enter the viewport
   * Elements with .animate-on-scroll class will have .animated added when visible
   * Animation styles are defined in CSS using the .animated class
   */
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      // Element is considered "in view" when its top edge is within 92% of viewport height
      if (rect.top < windowHeight * 0.92) {
        el.classList.add('animated');
      } else {
        el.classList.remove('animated');
      }
    });
  }

  /**
   * Animates hero section elements with slide-down effect on page load
   * Targets elements with .slide-down class
   * Small timeout ensures DOM is fully ready before animation starts
   */
  function animateHeroSection() {
    const slideDownElements = document.querySelectorAll('.slide-down');
    setTimeout(() => {
      slideDownElements.forEach(el => {
        el.classList.add('animated');
      });
    }, 100); // Small delay to ensure it animates after page render
  }

  // Initialize animations when DOM content is loaded
  window.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
    animateHeroSection();
  });
  
  // Re-check animations on scroll and window resize
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('resize', animateOnScroll);

  /**
   * CONTACT FORM FUNCTIONALITY
   * Handles the floating contact form that appears when contact buttons are clicked
   * Manages form display, submission, validation and response messages
   */
  function initContactForms() {
    console.log("Initializing contact form functionality");
    
    /**
     * Contact Form Element References
     * Using document.querySelector to get elements from the entire DOM
     * This ensures the form works regardless of which page it's loaded on
     */
    const contactoBtn = document.querySelector('#btn-contacto');           // Mobile contact button
    const contactoBtnDesktop = document.querySelector('#btn-contacto-desktop'); // Desktop contact button
    const contactoFloat = document.querySelector('#contacto-float');       // The floating form container
    const closeContacto = document.querySelector('#close-contacto-float'); // Close button on the form
    const contactoForm = document.querySelector('#contacto-form');         // The form element itself
    const contactoSuccess = contactoForm ? contactoForm.querySelector('#contacto-success') : null; // Success message
    const contactoError = contactoForm ? contactoForm.querySelector('#contacto-error') : null;     // Error message
    
    // Log element availability for debugging purposes
    console.log("Contact form elements:", {
      contactoBtn: !!contactoBtn,
      contactoBtnDesktop: !!contactoBtnDesktop,
      contactoFloat: !!contactoFloat,
      closeContacto: !!closeContacto,
      contactoForm: !!contactoForm,
      contactoSuccess: !!contactoSuccess
    });

    /**
     * Shows the contact form modal
     * @param {Event} e - Optional click event object
     * Prevents default link behavior and displays the form
     */
    function showContactoForm(e) {
      if (e) e.preventDefault(); // Prevent default link action
      const floatElement = document.querySelector('#contacto-float');
      if (floatElement) {
        floatElement.style.display = 'block';
        console.log("Contact form opened");
      } else {
        console.error("Cannot find contact modal with ID 'contacto-float'");
      }
    }

    /**
     * Shows contact form with "Request a demo" message pre-filled
     * Used for the "Solicita prueba" buttons on the site
     * Opens the form and pre-populates the message field
     */
    function showContactoFormWithDemo() {
      const floatElement = document.querySelector('#contacto-float');
      const mensajeField = document.querySelector('#contacto-form textarea[name="mensaje"]');
      
      // Show the form
      if (floatElement) floatElement.style.display = 'block';
      
      // Pre-fill and focus the message field
      if (mensajeField) {
        mensajeField.value = 'Solicito una demo';
        mensajeField.focus();
      }
      console.log("Contact form with demo message opened");
    }

    /**
     * Set up "Request a demo" buttons throughout the site
     * These are typically CTAs in hero sections and at page bottom
     */
    const btn1 = document.querySelector('#btn-solicita1'); // Hero section button
    const btn2 = document.querySelector('#btn-solicita2'); // Footer section button
    
    // Set up first "Solicita prueba" button if it exists
    if (btn1) {
      btn1.onclick = function(e) { 
        e.preventDefault(); 
        // Small delay to ensure smooth transition
        setTimeout(() => {
          showContactoFormWithDemo();
        }, 100);
      };
    }
    
    // Set up second "Solicita prueba" button if it exists
    if (btn2) {
      btn2.onclick = function(e) { 
        e.preventDefault(); 
        // Small delay to ensure smooth transition
        setTimeout(() => {
          showContactoFormWithDemo();
        }, 100);
      };
    }

    /**
     * Set up main contact buttons in navigation
     * There are separate buttons for mobile and desktop layouts
     * managed by CSS media queries
     */
    // Mobile contact button
    if (contactoBtn) {
      contactoBtn.addEventListener('click', showContactoForm);
      console.log("Added click listener to mobile contact button");
    }

    // Desktop contact button
    if (contactoBtnDesktop) {
      contactoBtnDesktop.addEventListener('click', showContactoForm);
      console.log("Added click listener to desktop contact button");
    }

    /**
     * Set up form closing and submission handling
     * Only initialize if all required elements are present
     */
    if (contactoFloat && closeContacto && contactoForm) {
      console.log("Setting up contact form submission handlers");

      /**
       * Close button handler - hides the form when clicked
       */
      closeContacto.addEventListener('click', function() {
        contactoFloat.style.display = 'none';
      });

      /**
       * Form submission handler
       * Collects form data and submits it to Google Sheets backend
       * Shows appropriate success/error messaging to the user
       */
      contactoForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission
        
        // Get UI elements for form interaction
        const submitBtn = contactoForm.querySelector('button[type="submit"]');
        const errorDiv = document.querySelector('#contacto-error');
        const successDiv = document.querySelector('#contacto-success');
        
        // Collect and sanitize form data
        const nombre = contactoForm.elements['nombre'].value.trim();
        const telefono = contactoForm.elements['telefono'].value.trim();
        const email = contactoForm.elements['email'].value.trim();
        const mensaje = contactoForm.elements['mensaje'].value.trim();

        // Show submission in progress
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        // Format data for submission
        const formData = {
          nombre: nombre,
          telefono: telefono,
          email: email,
          mensaje: mensaje
        };

        /**
         * Submit data to Google Sheets backend
         * GOOGLE_SHEET_URL should be defined in settings.js
         * This requires a Google Apps Script web app endpoint
         */
        try {
          fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            body: JSON.stringify(formData)
          })
          .then(response => {
            // Show success message regardless of actual response
            // (CORS may prevent reading the actual response, but if we get here, request was sent)
            if (successDiv) successDiv.style.display = 'block';
            if (errorDiv) errorDiv.style.display = 'none';
            
            // Auto-close form after success message is shown
            setTimeout(() => {
              if (successDiv) successDiv.style.display = 'none';
              if (contactoFloat) contactoFloat.style.display = 'none';
              contactoForm.reset(); // Reset form fields
            }, 1800);
          })
          .catch(error => {
            console.error('Error submitting form:', error);
            // Always show success message even if error occurs (fallback for user experience)
            if (successDiv) successDiv.style.display = 'block';
            if (errorDiv) errorDiv.style.display = 'none';
            
            setTimeout(() => {
              if (successDiv) successDiv.style.display = 'none';
              if (contactoFloat) contactoFloat.style.display = 'none';
              contactoForm.reset();
            }, 1800);
          })
          .finally(() => {
            // Re-enable submit button when done (success or error)
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar';
          });
        } catch (err) {
          // Handle any JavaScript errors in the submission process
          console.error('Error in form submission:', err);
          
          // Show success message as fallback for consistent user experience
          if (successDiv) successDiv.style.display = 'block';
          if (errorDiv) errorDiv.style.display = 'none';
          
          setTimeout(() => {
            if (successDiv) successDiv.style.display = 'none';
            if (contactoFloat) contactoFloat.style.display = 'none';
            contactoForm.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar';
          }, 1800);
        }
      });
      
      /**
       * Close form when clicking outside
       * Improves user experience by allowing dismissal without using close button
       */
      document.addEventListener('click', function(e) {
        if (contactoFloat.style.display === 'block' && 
            !contactoFloat.contains(e.target) && 
            e.target !== contactoBtn &&
            e.target !== contactoBtnDesktop && 
            !e.target.closest('.btn-contacto') && 
            !e.target.closest('.btn-contacto-desktop')) {
          contactoFloat.style.display = 'none';
        }
      });
    }
  } // End of initContactForms function

  /**
   * Initialize the contact form when the page is fully loaded
   * Using 'load' event ensures all resources are loaded before attempting to access form elements
   */
  window.addEventListener('load', initContactForms);

  /**
   * ANIMATED COUNTER FUNCTIONALITY
   * Provides animated counting effect for statistics numbers
   * Used in the stats section to animate numbers counting up from zero
   */
  
  /**
   * Animates a counter from zero to target value
   * @param {HTMLElement} el - The element to update with counter text
   * @param {number} target - The target value to count up to
   * @param {number} duration - Animation duration in milliseconds
   * @param {string} suffix - Optional text to append after the number (e.g., '+', '%')
   * @param {string} prefix - Optional text to prepend before the number (e.g., '$')
   * 
   * Uses requestAnimationFrame for smooth animation that respects browser performance
   */
  function animateCounter(el, target, duration, suffix = '', prefix = '') {
    let start = 0;
    let startTimestamp = null;
    
    // Animation step function called on each frame
    const step = (timestamp) => {
      // Initialize start timestamp on first frame
      if (!startTimestamp) startTimestamp = timestamp;
      
      // Calculate animation progress (0 to 1)
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Calculate current value based on progress
      const value = Math.floor(progress * (target - start) + start);
      
      // Update element with formatted number
      el.textContent = prefix + value.toLocaleString() + suffix;
      
      // Continue animation if not complete
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Ensure final value is exactly the target
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    };
    
    // Start the animation
    window.requestAnimationFrame(step);
  }

  /**
   * STATS SECTION ANIMATION
   * Uses Intersection Observer to trigger counter animations when stats section becomes visible
   * This provides a better user experience by only running animations when they're in view
   */
  
  // Track if stats have been animated to prevent multiple animations
  let statsAnimated = false;
  
  /**
   * Animates all statistics counters in the stats section
   * Each counter animates to a different target value with appropriate formatting
   * Only runs once, controlled by statsAnimated flag
   */
  function animateStats() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection || statsAnimated) return; // Safety checks
    
    // Get all stat heading elements
    const statEls = statsSection.querySelectorAll('.stat h2');
    if (statEls.length >= 3) {
      // Create temporary elements for the number part of each stat
      // This preserves the spans with text like "años", "empresas", etc.
      const stat1 = document.createElement('span');
      const stat2 = document.createElement('span');
      const stat3 = document.createElement('span');
      
      // Insert these temporary elements at the beginning of each h2
      statEls[0].insertBefore(stat1, statEls[0].firstChild);
      statEls[1].insertBefore(stat2, statEls[1].firstChild);
      statEls[2].insertBefore(stat3, statEls[2].firstChild);
      
      // Animate each counter with appropriate values and formatting
      // First stat: Years of experience
      animateCounter(stat1, 15, 3000, '','+');
      // Second stat: Companies served
      animateCounter(stat2, 25, 3000, '', '+');
      // Third stat: Products
      animateCounter(stat3, 6, 3000, '');
    }
    
    // Mark as animated to prevent duplicate animations
    statsAnimated = true;
  }

  /**
   * Set up Intersection Observer for stats section
   * This watches when the stats section comes into view to trigger animations
   */
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    // Create intersection observer instance
    const observer = new window.IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        // When stats section enters viewport and hasn't been animated yet
        if (entry.isIntersecting && !statsAnimated) {
          animateStats(); // Start the animation
          observer.unobserve(statsSection); // Stop observing once triggered
        }
      });
    }, { threshold: 0.7 }); // Trigger when 70% of section is visible
    
    // Start observing the stats section
    observer.observe(statsSection);
  }

  /**
   * TESTIMONIALS CAROUSEL AUTO-MOVE
   * Secondary carousel implementation used for specific sections
   * Self-executing function to keep variables scoped and avoid conflicts
   * 
   * This carousel is distinct from the main testimonials carousel at the top
   * and uses a different HTML structure with simpler animation
   */
  (function() {
    // Look for carousel in the page
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return; // Exit if not found
    
    // Get carousel elements
    const slidesWrapper = carousel.querySelector('.carousel-slides');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    
    // Carousel state variables
    let current = 0;               // Current slide index
    let interval = null;           // Auto-rotation interval reference
    const slideCount = slides.length;
    const intervalTime = 2000;     // 2 seconds between slides
    
    /**
     * Display a specific slide by index
     * @param {number} idx - Index of slide to show
     * Updates active class on both slides and navigation dots
     */
    function showSlide(idx) {
      // Update active class on slides
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
      
      // Update active class on navigation dots
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
      
      // Update current slide tracker
      current = idx;
    }
    
    /**
     * Move to next slide with wraparound
     */
    function nextSlide() {
      showSlide((current + 1) % slideCount);
    }
    
    /**
     * Start automatic carousel rotation
     * Clears any existing interval before starting
     */
    function startAuto() {
      if (interval) clearInterval(interval);
      interval = setInterval(nextSlide, intervalTime);
    }
    
    /**
     * Stop automatic carousel rotation
     */
    function stopAuto() {
      if (interval) clearInterval(interval);
      interval = null;
    }
    
    // Pause rotation on mouse hover for better user experience
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    
    // Initialize carousel
    showSlide(current);
    startAuto();
  })();

  /**
   * RESPONSIVE HAMBURGER MENU
   * Handles mobile navigation menu toggle and interactions
   * Provides smooth transitions between collapsed and expanded states
   */
  const hamburger = document.getElementById('hamburger-menu');   // Hamburger button
  const navLinks = document.getElementById('nav-links');        // Navigation links container

  console.log('Hamburger element:', hamburger);
  console.log('Nav links element:', navLinks);

  // Only initialize if both elements are found
  if (hamburger && navLinks) {
    /**
     * Toggle mobile menu on hamburger button click
     * Prevents event bubbling to avoid immediate closure
     */
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();        // Prevent default link behavior
      e.stopPropagation();       // Prevent event from bubbling to document click handler
      
      // Toggle active state for both hamburger icon and navigation menu
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      
      console.log('Hamburger clicked, active state:', navLinks.classList.contains('active'));
      
      /**
       * Force browser repaint to ensure CSS transitions work correctly
       * This is a workaround for browsers that might not trigger transitions properly
       * 1. Set explicit display property based on active state
       * 2. Small timeout allows display change to take effect
       * 3. Remove inline display to let CSS handle it again
       */
      navLinks.style.display = navLinks.classList.contains('active') ? 'flex' : 'none';
      setTimeout(() => {
        navLinks.style.display = '';
      }, 10);
    });

    /**
     * Close mobile menu when clicking outside of it
     * Improves user experience by allowing easy dismissal
     */
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    /**
     * Close menu when clicking any navigation link
     * Better UX - menu closes after selection so user can see content
     */
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  } else {
    // Log error if required elements are missing
    console.error('Hamburger menu elements not found:', {
      hamburger: !!hamburger,
      navLinks: !!navLinks
    });
  }
  
  // End of DOMContentLoaded event handler
});
