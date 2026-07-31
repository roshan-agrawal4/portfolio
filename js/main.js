/* ---------------------------------------------------------------------------
   Site behaviour: theme, navigation, reveal animations, counters, tech grid.
   No dependencies, no build step.
--------------------------------------------------------------------------- */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ---------- */
  const root = document.documentElement;
  const stored = localStorage.getItem('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  root.setAttribute('data-theme', stored || (prefersLight ? 'light' : 'dark'));

  $('#themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- Navbar: shadow, mobile menu, active section ---------- */
  const nav = $('#nav');
  const navLinks = $('#navLinks');
  const menuBtn = $('#menuBtn');
  const progress = $('#scrollProgress');

  menuBtn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 12);
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const sections = $$('main section[id]');
  const linkFor = (id) => $(`.nav-links a[href="#${id}"]`);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const link = linkFor(entry.target.id);
        if (!link) return;
        if (entry.isIntersecting) {
          $$('.nav-links a').forEach((a) => a.classList.remove('active'));
          link.classList.add('active');
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );
  sections.forEach((s) => spy.observe(s));

  /* ---------- Reveal on scroll ---------- */
  const revealer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  $$('.reveal').forEach((el) => revealer.observe(el));

  // Safety net: never leave content invisible if the observer misbehaves
  setTimeout(() => {
    $$('.reveal').forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
    });
  }, 2500);

  /* ---------- Hero role rotator ---------- */
  // The phrases that complete "I build backends that ___"
  const PHRASES = ['scale', 'keep their order', 'stay observable', "don't drop events"];
  const rotator = $('#rotator');
  const rotatorText = $('.rotator-text', rotator);

  if (!reduceMotion) {
    let phraseIndex = 0;
    let charIndex = PHRASES[0].length;
    let deleting = false;

    const tick = () => {
      const word = PHRASES[phraseIndex];
      charIndex += deleting ? -1 : 1;
      rotatorText.textContent = word.slice(0, charIndex);

      let delay = deleting ? 45 : 85;
      if (!deleting && charIndex === word.length) {
        deleting = true;
        delay = 1900;
      } else if (deleting && charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % PHRASES.length;
        delay = 320;
      }
      setTimeout(tick, delay);
    };
    setTimeout(tick, 2200);
  }

  /* ---------- Animated stat counters ---------- */
  const counters = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        obs.unobserve(entry.target);
        const el = entry.target;
        const target = Number(el.dataset.count);
        const prefix = el.dataset.prefix || '';
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const start = performance.now();

        const step = (now) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = prefix + Math.round(target * eased) + suffix;
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    },
    { threshold: 0.5 }
  );
  $$('.stat-num').forEach((el) => counters.observe(el));

  /* ---------- Tech stack grid ---------- */
  const stack = window.TECH_STACK || [];
  const grid = $('#stackGrid');

  const iconMarkup = (item) =>
    `<img src="${item.icon}" alt="" loading="lazy" class="${item.mono ? 'mono' : ''}"
       onerror="this.outerHTML='<span class=\\'tech-fallback\\'>${item.name.slice(0, 2)}</span>'" />`;

  grid.innerHTML = stack
    .map(
      (item, i) => `
      <div class="tech" data-cat="${item.cat}" title="${item.name}" style="animation-delay:${Math.min(i * 18, 520)}ms">
        ${iconMarkup(item)}
        <span>${item.name}</span>
      </div>`
    )
    .join('');

  $$('.stack-tabs .tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      $$('.stack-tabs .tab').forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      const filter = tab.dataset.filter;
      $$('.tech', grid).forEach((card, i) => {
        const show = filter === 'all' || card.dataset.cat === filter;
        card.classList.toggle('hidden', !show);
        if (show) {
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = `pop .35s var(--ease) ${Math.min(i * 16, 300)}ms both`;
        }
      });
    });
  });

  /* ---------- Marquee (built from the same stack list) ---------- */
  // Names listed here scroll in the band under the hero.
  const MARQUEE = ['Java', 'Spring Boot', 'Kubernetes', 'GKE', 'Docker', 'Helm', 'RabbitMQ',
                   'PostgreSQL', 'Redis', 'ClickHouse', 'Milvus', 'Qdrant', 'Prometheus',
                   'Grafana', 'Python', 'Go'];
  const track = $('#marqueeTrack');
  const marqueeItems = MARQUEE.map((name) => stack.find((t) => t.name === name)).filter(Boolean);
  const row = marqueeItems
    .map(
      (t) =>
        `<span class="marquee-item"><img src="${t.icon}" alt="" loading="lazy" class="${t.mono ? 'mono' : ''}" onerror="this.remove()" />${t.name}</span>`
    )
    .join('');
  track.innerHTML = row + row; // duplicated so the loop is seamless

  /* ---------- Subtle tilt on the hero code card ---------- */
  const card = $('.tilt');
  if (card && !reduceMotion && window.matchMedia('(hover: hover)').matches) {
    const wrap = card.parentElement;
    wrap.addEventListener('mousemove', (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateZ(0)`;
    });
    wrap.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  }

  /* ---------- Footer year ---------- */
  $('#year').textContent = String(new Date().getFullYear());
})();
