document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const navbar = document.querySelector('.navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // ---------------- MOBILE MENU TOGGLE ----------------
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('open');
    });

    // Close menu on click link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('open');
      });
    });
  }

  // ---------------- NAVBAR SCROLL TRANSITION & SCROLLSPY ----------------
  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scrollspy highlight active menu item
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // ---------------- SPOTLIGHT GLOW EFFECT (Vercel-style) ----------------
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ---------------- HERO PARTICLE NETWORK CANVAS ----------------
  const initParticles = () => {
    const hero = document.getElementById('home');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'canvas-particles';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '1';
    canvas.style.pointerEvents = 'none';
    canvas.style.opacity = '0.4';
    
    // Add canvas as the first child of Hero
    hero.insertBefore(canvas, hero.firstChild);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = hero.offsetWidth);
    let height = (canvas.height = hero.offsetHeight);

    window.addEventListener('resize', () => {
      if (hero) {
        width = (canvas.width = hero.offsetWidth);
        height = (canvas.height = hero.offsetHeight);
      }
    });

    const numParticles = Math.min(65, Math.floor((width * height) / 12000));
    const particles = [];

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 0.8;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.45)';
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and connect particles
      for (let i = 0; i < numParticles; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw();

        for (let j = i + 1; j < numParticles; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 115) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${0.16 * (1 - dist / 115)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();
  };

  initParticles();

  // ---------------- TYPING ANIMATION ----------------
  const words = [
    'DESARROLLADOR FLUTTER',
    'FULL-STACK DEVELOPER',
    'INGENIERO DE SISTEMAS',
    'CREADOR DE SOLUCIONES TECH'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedTextSpan = document.getElementById('typed-text');
  const typingDelay = 80;
  const erasingDelay = 40;
  const newWordDelay = 1800;

  const typeEffect = () => {
    if (!typedTextSpan) return;
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
      typedTextSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? erasingDelay : typingDelay;

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      delay = newWordDelay; 
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400; 
    }

    setTimeout(typeEffect, delay);
  };

  setTimeout(typeEffect, 800);

  // ---------------- SCROLL REVEAL ANIMATIONS ----------------
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ---------------- SMOOTH OFFSET SCROLL FOR ANCHORS ----------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = window.innerWidth > 768 ? 90 : 70;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------------- PREMIUM CUSTOM CURSOR ----------------
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  if (dot && ring) {
    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isInitialized = false;

    // Track mouse coordinates
    window.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isInitialized) {
        ringX = mouseX;
        ringY = mouseY;
        isInitialized = true;
      }

      // 1. Instantly position center dot (100% click precision, zero lag discomfort)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      
      // Reveal custom cursor elements on first movement
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    });

    // High fidelity linear interpolation (lerp)
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end;
    
    const updateCursor = () => {
      // 2. Snappy, lightweight tracking for outer ring (0.2 lerp feels extremely responsive)
      ringX = lerp(ringX, mouseX, 0.2);
      ringY = lerp(ringY, mouseY, 0.2);
      
      // GPU accelerated translate3d positioning (avoids paint/reflow overhead)
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      
      requestAnimationFrame(updateCursor);
    };
    
    // Start smooth rendering loop
    requestAnimationFrame(updateCursor);

    // Hide on leaving page viewport
    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      ring.style.opacity = '0';
    });

    // Hover interactive effects
    const updateHoverBindings = () => {
      const hoverables = document.querySelectorAll('a, button, .btn-link, .pill, .pill-outline, .social-icons a, .nav-toggle, .glass-card, .img-main');
      hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('hovered');
          ring.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hovered');
          ring.classList.remove('hovered');
        });
      });
    };
    
    updateHoverBindings();
    
    // Dynamic rebinding check for elements loaded asynchronously
    const observer = new MutationObserver(updateHoverBindings);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // ---------------- PROJECT CAROUSELS ----------------
  const carousels = document.querySelectorAll('.project-carousel');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');
    const dotsContainer = carousel.querySelector('.carousel-dots');
    
    if (!track || slides.length === 0) return;

    let currentIndex = 0;

    // Create dots
    slides.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
        goToSlide(idx);
      });
      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.dot');

    const updateCarousel = () => {
      track.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToSlide = (index) => {
      currentIndex = index;
      updateCarousel();
    };

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateCarousel();
    };

    const prevSlide = () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      updateCarousel();
    };

    if (nextBtn) nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      nextSlide();
    });
    
    if (prevBtn) prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      prevSlide();
    });

    // Auto-play
    let autoPlay = setInterval(nextSlide, 4000);

    // Pause on hover
    carousel.addEventListener('mouseenter', () => clearInterval(autoPlay));
    carousel.addEventListener('mouseleave', () => {
      autoPlay = setInterval(nextSlide, 4000);
    });
    
    // Swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
      clearInterval(autoPlay);
    }, {passive: true});
    
    carousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      autoPlay = setInterval(nextSlide, 4000);
    }, {passive: true});
    
    const handleSwipe = () => {
      if (touchEndX < touchStartX - 30) nextSlide();
      if (touchEndX > touchStartX + 30) prevSlide();
    };
  });

  // ---------------- FULLSCREEN LIGHTBOX CAROUSEL ----------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxTrack = document.getElementById('lightboxTrack');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');
  const lightboxDotsContainer = document.getElementById('lightboxDots');

  let lightboxCurrentIndex = 0;
  let lightboxSlidesCount = 0;

  if (lightboxModal && lightboxTrack) {
    // Open Lightbox
    carousels.forEach(carousel => {
      const slides = carousel.querySelectorAll('.carousel-slide');
      
      slides.forEach((slide, index) => {
        const imgMain = slide.querySelector('.img-main');
        if (imgMain) {
          imgMain.style.cursor = 'zoom-in';
          imgMain.addEventListener('click', () => {
            openLightbox(slides, index);
          });
        }
      });
    });

    const openLightbox = (slides, startIndex) => {
      lightboxTrack.innerHTML = '';
      lightboxDotsContainer.innerHTML = '';
      lightboxSlidesCount = slides.length;
      lightboxCurrentIndex = startIndex;

      slides.forEach((slide, i) => {
        const imgSrc = slide.querySelector('.img-main').src;
        
        const lbSlide = document.createElement('div');
        lbSlide.classList.add('lightbox-slide');
        
        // Blurred background for the lightbox
        const imgBg = document.createElement('img');
        imgBg.src = imgSrc;
        imgBg.classList.add('lb-blur-bg');
        lbSlide.appendChild(imgBg);

        // Main Image
        const img = document.createElement('img');
        img.src = imgSrc;
        lbSlide.appendChild(img);
        
        lightboxTrack.appendChild(lbSlide);

        // Dot
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === startIndex) dot.classList.add('active');
        dot.addEventListener('click', () => goToLightboxSlide(i));
        lightboxDotsContainer.appendChild(dot);
      });

      updateLightbox();
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const updateLightbox = () => {
      lightboxTrack.style.transform = `translateX(-${lightboxCurrentIndex * 100}%)`;
      
      const dots = lightboxDotsContainer.querySelectorAll('.dot');
      dots.forEach((dot, idx) => {
        if (idx === lightboxCurrentIndex) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    };

    const goToLightboxSlide = (index) => {
      lightboxCurrentIndex = index;
      updateLightbox();
    };

    const nextLightboxSlide = () => {
      lightboxCurrentIndex = (lightboxCurrentIndex + 1) % lightboxSlidesCount;
      updateLightbox();
    };

    const prevLightboxSlide = () => {
      lightboxCurrentIndex = (lightboxCurrentIndex - 1 + lightboxSlidesCount) % lightboxSlidesCount;
      updateLightbox();
    };

    if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxSlide);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxSlide);

    const closeLightbox = () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    // Close on background click
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-content') || e.target.classList.contains('lightbox-slide') || e.target.classList.contains('lb-blur-bg')) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxSlide();
      if (e.key === 'ArrowLeft') prevLightboxSlide();
    });
    
    // Swipe support for lightbox
    let lbTouchStartX = 0;
    let lbTouchEndX = 0;
    
    lightboxModal.addEventListener('touchstart', e => {
      lbTouchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    lightboxModal.addEventListener('touchend', e => {
      lbTouchEndX = e.changedTouches[0].screenX;
      if (lbTouchEndX < lbTouchStartX - 30) nextLightboxSlide();
      if (lbTouchEndX > lbTouchStartX + 30) prevLightboxSlide();
    }, {passive: true});
  }
});