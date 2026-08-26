/**
 * BeautyStyle / Aureum Salon - Interactive Script
 * Handles WhatsApp redirection with custom dynamic messages & mobile menu toggle.
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUMBER = '573122936807';

  /**
   * Constructs a WhatsApp click-to-chat URL with encoded pre-written text.
   * @param {string} [serviceName] - Optional name of the service to book.
   * @returns {string} WhatsApp link URL.
   */
  function buildWhatsAppUrl(serviceName) {
    let message = '¡Hola BeautyStyle! Me gustaría obtener más información y agendar una cita.';
    if (serviceName) {
      message = `¡Hola BeautyStyle! Quisiera agendar una cita para el servicio de: ${serviceName}.`;
    }
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  // Bind all elements with data-whatsapp attribute
  const whatsappTriggers = document.querySelectorAll('[data-whatsapp]');
  whatsappTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = trigger.getAttribute('data-service-name');
      const targetUrl = buildWhatsAppUrl(serviceName);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    });
  });

  // Mobile Navigation Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNavDrawer.classList.toggle('open');
      const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
      if (icon) {
        icon.textContent = mobileNavDrawer.classList.contains('open') ? 'close' : 'menu';
      }
    });

    // Close menu when clicking on any link
    const mobileNavLinks = mobileNavDrawer.querySelectorAll('a');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNavDrawer.classList.remove('open');
        const icon = mobileMenuBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.textContent = 'menu';
      });
    });
  }

  // Scroll effect on Navbar
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 12, 0.85)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.4)';
      } else {
        navbar.style.background = 'rgba(22, 19, 13, 0.65)';
        navbar.style.boxShadow = 'none';
      }
    });
  }

  // FAQ Accordion Interactivity
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((q) => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all active items
      document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('active'));
      
      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // Review Form Handler
  const reviewForm = document.getElementById('review-form');
  const toast = document.getElementById('toast-notification');

  if (reviewForm) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('review-email');
      const textInput = document.getElementById('review-text');

      if (!emailInput || !textInput) return;

      const email = emailInput.value.trim();
      const review = textInput.value.trim();

      if (email && review) {
        // Show success toast notification
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 4000);
        }

        // Send copy directly to WhatsApp for instant owner notification
        const notificationText = `⭐ *NUEVA RESEÑA RECIBIDA*\n✉️ *Correo:* ${email}\n💬 *Reseña:* "${review}"`;
        const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(notificationText)}`;
        
        // Open WhatsApp in background after a short pause
        setTimeout(() => {
          window.open(waUrl, '_blank', 'noopener,noreferrer');
        }, 1200);

        reviewForm.reset();
      }
    });
  }
});

