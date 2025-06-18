// Placeholder for future JS. Add interactivity as needed.
document.addEventListener('DOMContentLoaded', function() {
  // Example: Show alert on login button click
  const loginBtn = document.querySelector('.digitaliza-card-form button');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      alert('Funcionalidad de login no implementada.');
    });
  }

  // Carousel logic for testimonials
  const testimonials = [
    {
      rating: '⭐⭐⭐⭐⭐ 4/5',
      text: 'El servicio es increíble y el contacto con la empresa muy fluido, entienden muy bien mi negocio. Sminetworks se adapta con mucha rapidez a nuestras necesidades.',
      author: 'José Antonio S, Bienes de consumo\n150 - 300 empleados'
    },
    {
      rating: '⭐⭐⭐⭐⭐ 5/5',
      text: 'Excelente plataforma, muy intuitiva y fácil de usar. El soporte técnico es rápido y eficiente.',
      author: 'María López, Servicios\n50 - 100 empleados'
    },
    {
      rating: '⭐⭐⭐⭐ 4/5',
      text: 'Nos ayudó a automatizar procesos y reducir errores en la nómina. Muy recomendable.',
      author: 'Carlos Ruiz, Manufactura\n200 - 500 empleados'
    },
    {
      rating: '⭐⭐⭐⭐⭐ 5/5',
      text: 'La integración con bancos y la atención personalizada hacen la diferencia.',
      author: 'Ana Torres, Retail\n100 - 200 empleados'
    }
  ];

  let currentTestimonial = 0;

  function renderTestimonial(idx) {
    const card = document.querySelector('.testimonial-card');
    if (!card) return; // Only run on index.html
    card.querySelector('.testimonial-rating').textContent = testimonials[idx].rating;
    card.querySelector('.testimonial-text').textContent = testimonials[idx].text;
    card.querySelector('.testimonial-author').innerHTML = testimonials[idx].author.replace(/\n/g, '<br>');
    document.querySelectorAll('.testimonial-dots .dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  }

  // Carousel
  const left = document.querySelector('.testimonial-arrow.left');
  const right = document.querySelector('.testimonial-arrow.right');
  const testimonialCard = document.querySelector('.testimonial-card');
  const testimonialSection = document.querySelector('.testimonials');
  let autoInterval = null;
  let lastDirection = 'right';

  function animateTestimonial(direction) {
    if (!testimonialCard) return;
    testimonialCard.classList.remove('animating-left', 'animating-right');
    void testimonialCard.offsetWidth; // force reflow
    testimonialCard.classList.add(direction === 'left' ? 'animating-left' : 'animating-right');
    setTimeout(() => {
      testimonialCard.classList.remove('animating-left', 'animating-right');
    }, 600);
  }

  function startAutoCarousel() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = setInterval(() => {
      lastDirection = 'right';
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      animateTestimonial('right');
      setTimeout(() => renderTestimonial(currentTestimonial), 300);
    }, 5000);
  }
  function stopAutoCarousel() {
    if (autoInterval) clearInterval(autoInterval);
    autoInterval = null;
  }

  if (left && right) {
    left.addEventListener('click', () => {
      lastDirection = 'left';
      animateTestimonial('left');
      setTimeout(() => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        renderTestimonial(currentTestimonial);
      }, 300);
      startAutoCarousel();
    });
    right.addEventListener('click', () => {
      lastDirection = 'right';
      animateTestimonial('right');
      setTimeout(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        renderTestimonial(currentTestimonial);
      }, 300);
      startAutoCarousel();
    });
    document.querySelectorAll('.testimonial-dots .dot').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        lastDirection = i > currentTestimonial ? 'right' : 'left';
        animateTestimonial(lastDirection);
        setTimeout(() => {
          currentTestimonial = i;
          renderTestimonial(currentTestimonial);
        }, 300);
        startAutoCarousel();
      });
    });
    renderTestimonial(currentTestimonial);
    startAutoCarousel();
    // Pause on hover
    if (testimonialSection) {
      testimonialSection.addEventListener('mouseenter', stopAutoCarousel);
      testimonialSection.addEventListener('mouseleave', startAutoCarousel);
    }
  }

  // WhatsApp chat popup logic
  const waBtn = document.getElementById('whatsapp-float-btn');
  const waPopup = document.getElementById('whatsapp-chat-popup');
  const waClose = document.getElementById('whatsapp-chat-close');
  if (waBtn && waPopup && waClose) {
    waBtn.addEventListener('click', function(e) {
      e.preventDefault();
      waPopup.style.display = 'block';
    });
    waClose.addEventListener('click', function() {
      waPopup.style.display = 'none';
    });
    // Optional: close popup when clicking outside
    document.addEventListener('click', function(e) {
      if (waPopup.style.display === 'block' && !waPopup.contains(e.target) && e.target !== waBtn) {
        waPopup.style.display = 'none';
      }
    });
  }

  // Set WhatsApp floating button href from settings.js
  const waBtnFloat = document.getElementById('whatsapp-float-btn');
  if (waBtnFloat && typeof WHATSAPP_NUMBER !== 'undefined') {
    waBtnFloat.href = `https://wa.me/${WHATSAPP_NUMBER}`;
  }

  // SCROLL-TRIGGERED ANIMATIONS
  function animateOnScroll() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const windowHeight = window.innerHeight;
    animatedElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < windowHeight * 0.92) {
        el.classList.add('animated');
      } else {
        el.classList.remove('animated');
      }
    });
  }

  window.addEventListener('DOMContentLoaded', animateOnScroll);
  window.addEventListener('scroll', animateOnScroll);
  window.addEventListener('resize', animateOnScroll);

  // CONTACTO FLOATING FORM LOGIC
  const contactoBtn = document.getElementById('btn-contacto');
  const contactoFloat = document.getElementById('contacto-float');
  const closeContacto = document.getElementById('close-contacto-float');
  const contactoForm = document.getElementById('contacto-form');
  const contactoSuccess = document.getElementById('contacto-success');
  const contactoMensaje = contactoForm ? contactoForm.elements['mensaje'] : null;

  // Utility to show contacto form robustly
  function showContactoFormWithDemo() {
    var contactoFloat = document.getElementById('contacto-float');
    var contactoMensaje = document.querySelector('#contacto-form textarea[name="mensaje"]');
    if (contactoFloat) contactoFloat.style.display = 'block';
    if (contactoMensaje) contactoMensaje.value = 'Solicito una demo';
    if (contactoMensaje) contactoMensaje.focus();
  }

  var btn1 = document.getElementById('btn-solicita1');
  var btn2 = document.getElementById('btn-solicita2');
  if (btn1) btn1.onclick = function(e) { e.preventDefault(); 
      setTimeout(() => {
        showContactoFormWithDemo();
      }, 100);

     };
  if (btn2) btn2.onclick = function(e) { e.preventDefault(); setTimeout(() => {
        showContactoFormWithDemo();
      }, 100);
    };

  if (contactoBtn && contactoFloat && closeContacto && contactoForm && contactoSuccess) {
    contactoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      contactoFloat.style.display = 'block';
    });
    closeContacto.addEventListener('click', function() {
      contactoFloat.style.display = 'none';
    });
    contactoForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Get form data
      const nombre = contactoForm.elements['nombre'].value.trim();
      const email = contactoForm.elements['email'].value.trim();
      const mensaje = contactoForm.elements['mensaje'].value.trim();
      // WhatsApp message
      const waNumber = (typeof WHATSAPP_NUMBER !== 'undefined') ? WHATSAPP_NUMBER : '5215612072138';
      const waText = `Hola, soy ${nombre} (%20${email}).%0A${mensaje}`;
      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
      // Optionally show success and close modal
      contactoSuccess.style.display = 'block';
      setTimeout(() => {
        contactoSuccess.style.display = 'none';
        contactoFloat.style.display = 'none';
        contactoForm.reset();
      }, 1800);
    });
    // Optional: close popup when clicking outside
    document.addEventListener('click', function(e) {
      if (contactoFloat.style.display === 'block' && !contactoFloat.contains(e.target) && e.target !== contactoBtn) {
        contactoFloat.style.display = 'none';
      }
    });
  }

  // --- Animated Counter Logic for Stats Section ---
  function animateCounter(el, target, duration, suffix = '', prefix = '') {
    let start = 0;
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (target - start) + start);
      el.textContent = prefix + value.toLocaleString() + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    };
    window.requestAnimationFrame(step);
  }

  // Use Intersection Observer for stats section
  let statsAnimated = false;
  function animateStats() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection || statsAnimated) return;
    // Animate each stat
    const statEls = statsSection.querySelectorAll('.stat h2');
    if (statEls.length >= 3) {
      animateCounter(statEls[0].querySelector('span') ? statEls[0] : statEls[0], 600, 1200, ' +');
      animateCounter(statEls[1].querySelector('span') ? statEls[1] : statEls[1], 8000, 1200, ' Mil +');
      animateCounter(statEls[2].querySelector('span') ? statEls[2] : statEls[2], 100000, 1200, ' Mil +');
    }
    statsAnimated = true;
  }

  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    const observer = new window.IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
          animateStats();
          observer.unobserve(statsSection);
        }
      });
    }, { threshold: 0.7 }); // Trigger when 30% visible
    observer.observe(statsSection);
  }

  // --- Testimonials Carousel Auto-Move ---
  (function() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;

    const slidesWrapper = carousel.querySelector('.carousel-slides');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    let current = 0;
    let interval = null;
    const slideCount = slides.length;
    const intervalTime = 3000; // 5 seconds

    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
      });
      current = idx;
    }

    function nextSlide() {
      showSlide((current + 1) % slideCount);
    }

    function startAuto() {
      if (interval) clearInterval(interval);
      interval = setInterval(nextSlide, intervalTime);
    }

    function stopAuto() {
      if (interval) clearInterval(interval);
      interval = null;
    }

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    // Initialize
    showSlide(current);
    startAuto();
  })();

  
  // Hamburger menu logic (runs on all pages)
  const hamburger = document.getElementById('hamburger-menu');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {

    hamburger.addEventListener('click', function() {
      console.log('clicked hamburger');

      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }



    



  



});
