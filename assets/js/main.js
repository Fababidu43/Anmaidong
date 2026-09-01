// ANMAIDONG — shared interactions
document.addEventListener('DOMContentLoaded', () => {

  /* Scroll progress bar */
  const progress = document.querySelector('.scroll-progress');
  function updateProgress(){
    if(!progress) return;
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    progress.style.width = scrolled + '%';
  }
  document.addEventListener('scroll', updateProgress, {passive:true});
  updateProgress();

  /* Header scroll state */
  const header = document.getElementById('site-header');
  function headerState(){ if(header) header.classList.toggle('scrolled', window.scrollY > 16); }
  document.addEventListener('scroll', headerState, {passive:true});
  headerState();

  /* Mobile menu */
  const burger = document.querySelector('.burger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if(burger && mobileMenu){
    burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
  }

  /* Active nav link by current page */
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href');
    if(href === path || (href === 'index.html' && path === '')) a.classList.add('active');
  });

  /* Split-text headline reveal — wraps words for a staggered rise-in on scroll */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-split]').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map((w, i) => `<span class="split-word" style="transition-delay:${reduceMotion ? 0 : i * 45}ms"><span>${w}</span></span>`).join(' ');
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach((el,i) => {
      el.style.setProperty('--i', i % 8);
      io.observe(el);
    });
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* Animated counters */
  const counters = document.querySelectorAll('[data-count]');
  const countIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const decimals = el.dataset.count.includes('.') ? el.dataset.count.split('.')[1].length : 0;
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();
        function tick(now){
          const p = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = (target * eased).toFixed(decimals);
          el.textContent = val + suffix;
          if(p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        countIO.unobserve(el);
      }
    });
  }, {threshold:0.5});
  counters.forEach(el => countIO.observe(el));

  /* 3D tilt cards */
  const tiltCards = document.querySelectorAll('.tilt');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      item.parentElement.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if(!wasOpen) item.classList.add('open');
    });
  });

  /* Timeline scrollytelling — fills progress line and highlights active step */
  const timelineWrap = document.querySelector('.timeline-wrap');
  if(timelineWrap){
    const fill = timelineWrap.querySelector('.timeline-fill');
    const rows = timelineWrap.querySelectorAll('.t-row');
    function updateTimeline(){
      const rect = timelineWrap.getBoundingClientRect();
      const vh = window.innerHeight;
      const totalH = timelineWrap.offsetHeight;
      const start = vh * 0.75;
      const progressPx = Math.min(Math.max(start - rect.top, 0), totalH);
      const pct = (progressPx / totalH) * 100;
      if(fill) fill.style.height = pct + '%';
      rows.forEach(row => {
        const rowTop = row.offsetTop;
        row.classList.toggle('active', progressPx >= rowTop + 10);
      });
    }
    document.addEventListener('scroll', updateTimeline, {passive:true});
    window.addEventListener('resize', updateTimeline);
    updateTimeline();
  }

  /* Console typewriter log (hero) */
  const consoleBody = document.querySelector('.console-body');
  if(consoleBody){
    const lines = Array.from(consoleBody.querySelectorAll('.console-line'));
    let i = 0;
    function playLine(){
      if(i >= lines.length){
        setTimeout(() => {
          lines.forEach(l => { l.style.opacity = 0; l.innerHTML = l.innerHTML; });
          i = 0;
          setTimeout(playLine, 500);
        }, 2200);
        return;
      }
      const line = lines[i];
      line.style.opacity = 1;
      i++;
      setTimeout(playLine, 650);
    }
    const consoleIO = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){ playLine(); consoleIO.disconnect(); }
      });
    }, {threshold:0.3});
    consoleIO.observe(consoleBody);
  }

  /* Scan tags (controle-qualite illustration) */
  document.querySelectorAll('.scan-tag').forEach((tag, idx) => {
    tag.style.animationDelay = (0.4 + idx * 0.35) + 's';
  });

  /* Magnetic buttons — subtle cursor-follow on primary CTAs, pointer devices only */
  if(window.matchMedia('(pointer: fine)').matches && !reduceMotion){
    document.querySelectorAll('.magnetic').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.35}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* Cursor spotlight — radial glow follows pointer on dark panels */
  if(window.matchMedia('(pointer: fine)').matches){
    document.querySelectorAll('.spotlight').forEach(panel => {
      panel.addEventListener('mousemove', (e) => {
        const r = panel.getBoundingClientRect();
        panel.style.setProperty('--sx', ((e.clientX - r.left) / r.width * 100) + '%');
        panel.style.setProperty('--sy', ((e.clientY - r.top) / r.height * 100) + '%');
      });
    });
  }

  /* Parallax — lightweight scroll-linked drift on decorative elements */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if(parallaxEls.length && !reduceMotion){
    let ticking = false;
    function applyParallax(){
      const y = window.scrollY;
      parallaxEls.forEach(el => {
        const speed = parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${(y - (el.dataset.parallaxOrigin || 0)) * speed}px, 0)`;
      });
      ticking = false;
    }
    document.addEventListener('scroll', () => {
      if(!ticking){ requestAnimationFrame(applyParallax); ticking = true; }
    }, {passive:true});
    applyParallax();
  }

});
