document.addEventListener('DOMContentLoaded', () => {

  // Lucide icons
  if (window.lucide) lucide.createIcons();

  // Year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Page loader
  window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('pageLoader')?.classList.add('done'), 400);
  });

  // ---------- Reveal on scroll ----------
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in-view'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  // ---------- Nav scroll state ----------
  const nav = document.getElementById('mainNav');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 40);

    // scroll progress
    const doc = document.documentElement;
    const scrollPercent = (window.scrollY / (doc.scrollHeight - doc.clientHeight)) * 100;
    document.getElementById('scrollProgress').style.width = scrollPercent + '%';

    // back to top
    document.getElementById('backToTop').classList.toggle('show', window.scrollY > 800);

    // active nav link
    let currentId = '';
    sections.forEach(sec => {
      const rect = sec.getBoundingClientRect();
      if (rect.top <= 120 && rect.bottom >= 120) currentId = sec.id;
    });
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === '#' + currentId);
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Mobile nav ----------
  const burger = document.getElementById('navBurger');
  const navLinksWrap = document.getElementById('navLinks');

  if (burger && navLinksWrap) {

    // Backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);

    // Close button (prepended so it sits at the drawer's top-right)
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'nav-close';
    closeBtn.setAttribute('aria-label', 'Menu band karein');
    closeBtn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" ' +
      'stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>';
    navLinksWrap.prepend(closeBtn);

    // CTA block at the bottom of the drawer.
    // The WhatsApp link uses .btn-whatsapp-outline so the existing WhatsApp
    // block further down this file sets its href automatically.
    const cta = document.createElement('div');
    cta.className = 'nav-drawer-cta';
    cta.innerHTML =
      '<a href="#contact" class="btn btn-primary">Book Free Visit</a>' +
      '<a href="#" class="btn btn-whatsapp-outline">WhatsApp Karein</a>';
    navLinksWrap.appendChild(cta);

    burger.setAttribute('aria-controls', 'navLinks');
    burger.setAttribute('aria-expanded', 'false');

    let lastFocused = null;

    const openMenu = () => {
      lastFocused = document.activeElement;
      navLinksWrap.classList.add('open');
      backdrop.classList.add('show');
      document.body.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      closeBtn.focus();
    };

    const closeMenu = () => {
      navLinksWrap.classList.remove('open');
      backdrop.classList.remove('show');
      document.body.classList.remove('nav-open');
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocused && document.body.contains(lastFocused)) lastFocused.focus();
    };

    burger.addEventListener('click', () => {
      navLinksWrap.classList.contains('open') ? closeMenu() : openMenu();
    });
    closeBtn.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Every link inside the drawer closes it (injected CTAs included)
    navLinksWrap.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navLinksWrap.classList.contains('open')) closeMenu();
    });

    // Keep keyboard focus inside the drawer while it's open
    navLinksWrap.addEventListener('keydown', (e) => {
      if (e.key !== 'Tab' || !navLinksWrap.classList.contains('open')) return;
      const items = navLinksWrap.querySelectorAll('button, a[href]');
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // Reset if the user rotates or resizes back to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && navLinksWrap.classList.contains('open')) closeMenu();
    });
  }

  // ---------- Cursor glow (desktop only) ----------
  const glow = document.getElementById('cursorGlow');
  if (window.matchMedia('(hover: hover)').matches && glow) {
    document.addEventListener('mousemove', (e) => {
      glow.style.opacity = '1';
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => glow.style.opacity = '0');
  }

  // ---------- Brain node activation on scroll (Section 2) ----------
  const brainSection = document.getElementById('why');
  const brainNodes = document.querySelectorAll('.brain-node');
  const brainLinks = document.querySelectorAll('.brain-link');
  if (brainSection) {
    const brainObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          brainNodes.forEach((n, i) => setTimeout(() => n.classList.add('active'), i * 150));
          brainLinks.forEach((l, i) => setTimeout(() => l.classList.add('active'), 300 + i * 120));
        }
      });
    }, { threshold: 0.35 });
    brainObserver.observe(brainSection);
  }

  // ---------- Animated stat counters ----------
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10);
        if (!target) return;
        let current = 0;
        const step = Math.max(1, Math.round(target / 40));
        const tick = () => {
          current += step;
          if (current >= target) { el.textContent = target; return; }
          el.textContent = current;
          requestAnimationFrame(tick);
        };
        tick();
        statObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  statNumbers.forEach(el => statObserver.observe(el));

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-a').style.maxHeight = null;
      });
      if (!isOpen) {
        item.classList.add('open');
        a.style.maxHeight = a.scrollHeight + 'px';
      }
    });
  });

  // ---------- Gallery lightbox ----------
  const lightbox = document.getElementById('lightbox');
  const lightboxContent = document.getElementById('lightboxContent');
  document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxContent.textContent = item.dataset.full || '';
      lightbox.classList.add('open');
    });
  });
  document.getElementById('lightboxClose')?.addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });

  // ---------- Back to top ----------
  document.getElementById('backToTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Smooth anchor scrolling ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 90, behavior: 'smooth' });
      }
    });
  });

  // ---------- WhatsApp buttons (placeholder number) ----------
  const WHATSAPP_NUMBER = '923128756462'; // 0312-8756462
  const waMessage = encodeURIComponent('Assalam-o-Alaikum, mujhe Alpha Beta Preschool ke baray mein maloomat chahiye.');
  document.querySelectorAll('#navWhatsapp, #floatWhatsapp, .btn-whatsapp-outline').forEach(btn => {
    btn.setAttribute('href', `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener');
  });

  // ---------- Confetti on CTA hover ----------
  const ctaBook = document.getElementById('ctaBook');
  const confettiColors = ['#4F46E5', '#10B981', '#FB923C', '#EC4899', '#FBBF24'];
  ctaBook?.addEventListener('mouseenter', () => {
    for (let i = 0; i < 14; i++) {
      const piece = document.createElement('span');
      piece.style.position = 'fixed';
      piece.style.left = '50%';
      piece.style.top = '50%';
      piece.style.width = '6px';
      piece.style.height = '10px';
      piece.style.background = confettiColors[i % confettiColors.length];
      piece.style.borderRadius = '2px';
      piece.style.pointerEvents = 'none';
      piece.style.zIndex = '2000';
      piece.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
      document.body.appendChild(piece);
      const rect = ctaBook.getBoundingClientRect();
      piece.style.left = rect.left + rect.width / 2 + 'px';
      piece.style.top = rect.top + 'px';
      requestAnimationFrame(() => {
        const angle = Math.random() * Math.PI * 2;
        const dist = 60 + Math.random() * 80;
        piece.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist - 40}px) rotate(${Math.random() * 360}deg)`;
        piece.style.opacity = '0';
      });
      setTimeout(() => piece.remove(), 1100);
    }
  });

  // ---------- Activities: continuous autoplay (desktop + mobile) ----------
  (function activitiesAutoplay() {
    const track = document.getElementById('activityScroll');
    if (!track || track.children.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const SPEED = 40;           // pixels per second
    const RESUME_DELAY = 1800;  // ms before autoplay resumes after user interaction

    // Duplicate the card set so the loop is seamless.
    const originals = Array.from(track.children);
    const addSet = () => originals.forEach(card => {
      const clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a, button').forEach(el => { el.tabIndex = -1; });
      track.appendChild(clone);
    });
    addSet();
    // On very wide screens one extra set may not be enough to fill the viewport.
    let guard = 0;
    while (track.scrollWidth < track.clientWidth * 2 && guard++ < 4) addSet();

    // Autoplay fights CSS scroll-snap, so disable it on this track only.
    track.style.scrollSnapType = 'none';
    track.style.scrollBehavior = 'auto';

    // Exact width of one full set (cards + gaps), measured from the DOM.
    const firstClone = track.children[originals.length];
    let loopWidth = 0;
    const measure = () => { loopWidth = firstClone.offsetLeft - originals[0].offsetLeft; };
    measure();
    window.addEventListener('resize', measure);

    let pos = 0;
    let paused = false;
    let inView = true;
    let tabActive = !document.hidden;
    let resumeTimer = null;
    let last = performance.now();

    const pause = () => { paused = true; clearTimeout(resumeTimer); };
    const resumeSoon = () => {
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => { paused = false; }, RESUME_DELAY);
    };

    // Desktop: hover and keyboard focus
    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resumeSoon);
    track.addEventListener('focusin', pause);
    track.addEventListener('focusout', resumeSoon);

    // Mobile: pause while the finger is down, resume shortly after release
    track.addEventListener('touchstart', pause, { passive: true });
    track.addEventListener('touchend', resumeSoon, { passive: true });
    track.addEventListener('touchcancel', resumeSoon, { passive: true });

    // Don't burn frames when off screen or in a background tab
    new IntersectionObserver(entries => { inView = entries[0].isIntersecting; },
      { threshold: 0 }).observe(track);
    document.addEventListener('visibilitychange', () => {
      tabActive = !document.hidden;
      last = performance.now();
    });

    function step(now) {
      const dt = Math.min(now - last, 100) / 1000;
      last = now;

      if (paused || !inView || !tabActive || loopWidth <= 0) {
        pos = track.scrollLeft; // stay in sync with anything the user did
      } else {
        if (Math.abs(track.scrollLeft - pos) > 1) pos = track.scrollLeft;
        pos += SPEED * dt;
        if (pos >= loopWidth) pos -= loopWidth;
        track.scrollLeft = pos;
      }
      requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  })();

});