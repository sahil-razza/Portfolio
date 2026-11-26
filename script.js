/**
 * =============================================================================
 * SAHIL RAZZA PORTFOLIO — CORE ANIMATION & INTERACTIVE ENGINE
 * =============================================================================
 *
 * GLOBAL MOTION SYSTEM:
 * -----------------------------------------------------------------------------
 * 1. Durations:
 *    - Fast (0.3s):   Micro-interactions, magnetic pulls, glare highlights.
 *    - Base (0.7s):   Component reveals, timeline progress, photo switches.
 *    - Slow (1.2s):   Signature stage transitions, curtain lifts, hero entrance.
 *
 * 2. Easings:
 *    - Entrance:  cubic-bezier(0.16, 1, 0.3, 1) [expo.out] - decisive arrival.
 *    - Transit:   cubic-bezier(0.45, 0, 0.55, 1) [power2.inOut] - smooth state shift.
 *
 * 3. Stagger:
 *    - Letter/Char: 0.035s
 *    - UI Nodes:    0.08s
 *    - Sections:    0.14s
 *
 * SIGNATURE MOMENT: "Neural Genesis"
 * -----------------------------------------------------------------------------
 * Following the terminal boot, the hero portrait does not simply pop into view.
 * It synthesizes through a real-time matrix terminal stream overlay on the canvas,
 * resolving from raw neural code and byte streams into the crisp developer portrait,
 * firmly uniting Sahil's AI/ML focus with software craftsmanship.
 * =============================================================================
 */

(function () {
  'use strict';

  // ===========================================================================
  // 1. CONFIGURATION OBJECT (Easily customizable for developer info & links)
  // ===========================================================================
  const CONFIG = {
    personal: {
      name: 'Sahil Razza',
      role: 'AI/ML Student & Developer',
      tagline: 'Building practical digital solutions with code, creativity, and curiosity.',
      education: {
        degree: 'B.Tech, Artificial Intelligence and Machine Learning',
        institution: 'Ambalika Institute of Management and Technology',
        graduationYear: 2029
      },
      email: 'sahilrazza670@gmail.com',
      github: 'https://github.com/sahil-razza',
      linkedin: 'https://www.linkedin.com/in/sahil-razza-9a473a382'
    },
    projects: [
      {
        title: 'YURIEL',
        repo: 'yuriel',
        desc: 'A repair-service platform connecting users with mechanics and repair professionals.',
        tech: ['Python', 'FastAPI', 'SQLAlchemy', 'JavaScript', 'HTML', 'CSS'],
        url: 'https://github.com/sahil-razza'
      },
      {
        title: 'Personal Portfolio',
        repo: 'portfolio',
        desc: 'A professional portfolio showcasing projects, skills, education and my development journey.',
        tech: ['HTML', 'CSS', 'JavaScript'],
        url: 'https://github.com/sahil-razza'
      },
      {
        title: 'Python Projects',
        repo: 'python-projects',
        desc: 'A collection of Python programming projects.',
        tech: ['Python'],
        url: 'https://github.com/sahil-razza'
      },
      {
        title: 'DSA Practice',
        repo: 'dsa-practice',
        desc: 'Data structures and algorithms practice with programming solutions.',
        tech: ['C', 'Python'],
        url: 'https://github.com/sahil-razza'
      }
    ],
    skills: [
      {
        file: 'languages.json',
        items: [
          { name: 'C', learning: false },
          { name: 'Python', learning: true },
          { name: 'Java', learning: true },
          { name: 'JavaScript', learning: false }
        ]
      },
      {
        file: 'web.config',
        items: [
          { name: 'HTML', learning: false },
          { name: 'CSS', learning: false },
          { name: 'JavaScript', learning: false },
          { name: 'FastAPI', learning: false }
        ]
      },
      {
        file: 'tools.sh',
        items: [
          { name: 'Git', learning: false },
          { name: 'GitHub', learning: false },
          { name: 'VS Code', learning: false }
        ]
      },
      {
        file: 'focus.md',
        items: [
          { name: 'Full-stack', learning: false },
          { name: 'AI/ML', learning: false },
          { name: 'Problem solving', learning: false },
          { name: 'DSA', learning: false }
        ]
      }
    ],
    images: [
      'assets/photo1.jpg',
      'assets/photo2.jpg',
      'assets/photo3.jpg',
      'assets/photo4.jpg',
      'assets/photo5.jpg'
    ]
  };

  // Environment checks
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);

  // ===========================================================================
  // 2. DOM CACHE
  // ===========================================================================
  const dom = {
    // Loader elements
    loader:        document.getElementById('loader'),
    loaderTop:     document.getElementById('loader-top'),
    loaderBottom:  document.getElementById('loader-bottom'),
    loaderBox:     document.getElementById('loader-box'),
    loaderLog:     document.getElementById('loader-log'),
    loaderBar:     document.getElementById('loader-bar'),
    loaderStatus:  document.getElementById('loader-status'),
    loaderPercent: document.getElementById('loader-percent'),

    mainNav: document.getElementById('main-nav'),
    scrollProgressBar: document.getElementById('scroll-progress-bar'),
    navPill: document.getElementById('nav-active-pill'),
    navLinks: Array.from(document.querySelectorAll('.nav-item-link')),
    themeToggleBtn: document.getElementById('theme-toggle'),

    heroSpot: document.getElementById('hero-spot'),
    heroRig: document.getElementById('hero-rig'),
    typewriterText: document.getElementById('typewriter-text'),

    // Signature Moment elements
    neuralOverlay: document.getElementById('neural-overlay'),
    matrixCodeStream: document.getElementById('matrix-code-stream'),
    neuralBarInner: document.getElementById('neural-bar-inner'),
    neuralStreamStatus: document.getElementById('neural-stream-status'),
    neuralStreamPercent: document.getElementById('neural-stream-percent'),
    neuralStateBadge: document.getElementById('neural-state-badge'),

    photoStack: document.getElementById('photo-stack'),
    profileCode: document.getElementById('profile-code'),
    statNums: Array.from(document.querySelectorAll('.stat-num')),

    projectsContainer: document.getElementById('projects-container'),
    projectsGrid: document.getElementById('projects-grid'),
    projectCursorPill: document.getElementById('project-cursor-pill'),

    skillsGrid: document.getElementById('skills-grid'),

    timelineProgress: document.getElementById('timeline-progress'),
    timelineItems: Array.from(document.querySelectorAll('.timeline-item')),

    contactPortraitCard: document.getElementById('contact-portrait-card'),
    copyEmailBtn: document.getElementById('copy-email-btn'),
    copyEmailTxt: document.getElementById('copy-email-txt'),
    toast: document.getElementById('toast'),
    topBtn: document.getElementById('top-btn'),

    threeCanvas: document.getElementById('three-canvas')
  };

  // ===========================================================================
  // 3. THEME SYSTEM (Dark / Light with LocalStorage)
  // ===========================================================================
  function initTheme() {
    const savedTheme = localStorage.getItem('sahil_theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', initialTheme);

    if (dom.themeToggleBtn) {
      dom.themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('sahil_theme', newTheme);
      });
    }
  }

  // ===========================================================================
  // 4. SMOOTH SCROLL (Lenis + GSAP Sync)
  // ===========================================================================
  let lenisInstance = null;

  function initSmoothScroll() {
    if (prefersReducedMotion || typeof Lenis === 'undefined') {
      document.documentElement.style.scrollBehavior = 'smooth';
      return;
    }

    try {
      lenisInstance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5
      });

      if (typeof ScrollTrigger !== 'undefined') {
        lenisInstance.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => {
          lenisInstance.raf(time * 1000);
        });
        gsap.ticker.lagSmoothing(0);
      } else {
        function raf(time) {
          lenisInstance.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
      }

      // Smooth in-page anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId && targetId !== '#') {
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
              e.preventDefault();
              lenisInstance.scrollTo(targetEl, { offset: -60, duration: 1.1 });
            }
          }
        });
      });
    } catch (err) {
      console.warn('Lenis smooth-scroll notice:', err);
    }
  }

  // ===========================================================================
  // 5. CONTENT POPULATION (Dynamic, Data-Driven)
  // ===========================================================================
  function populateContent() {
    // 1. Profile Code Block
    if (dom.profileCode) {
      const codeLines = [
        '<span style="color:var(--syn-keyword)">const</span> <span style="color:var(--syn-func)">sahil</span> = {',
        `  name: <span style="color:var(--syn-string)">"${CONFIG.personal.name}"</span>,`,
        `  role: <span style="color:var(--syn-string)">"${CONFIG.personal.role}"</span>,`,
        '  stack: [<span style="color:var(--syn-string)">"Python"</span>, <span style="color:var(--syn-string)">"FastAPI"</span>, <span style="color:var(--syn-string)">"JavaScript"</span>],',
        '  building: <span style="color:var(--syn-string)">"YURIEL"</span>,',
        '  goal: <span style="color:var(--syn-string)">"AI/ML Engineer"</span>,',
        `  education: <span style="color:var(--syn-string)">"B.Tech AI & ML (${CONFIG.personal.education.graduationYear})"</span>,`,
        '};'
      ];
      dom.profileCode.innerHTML = codeLines.map(
        (l, idx) => `<span class="cl-line" style="transition-delay:${0.1 + idx * 0.07}s">${l}</span>`
      ).join('');
    }

    // 2. Projects Grid (with keyboard focus & glare)
    if (dom.projectsGrid) {
      dom.projectsGrid.innerHTML = CONFIG.projects.map((proj) => `
        <a class="project-card" href="${proj.url}" target="_blank" rel="noopener noreferrer" data-tilt="9" aria-label="${proj.title}: ${proj.desc}">
          <div class="card-glare" aria-hidden="true"></div>
          <div class="project-card-header">
            <span>sahil-razza / <span class="repo-name">${proj.repo}</span></span>
            <span class="project-arrow" aria-hidden="true">↗</span>
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">${proj.desc}</p>
          <div class="project-tech">
            ${proj.tech.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
        </a>
      `).join('');
    }

    // 3. Skills Grid
    if (dom.skillsGrid) {
      dom.skillsGrid.innerHTML = CONFIG.skills.map((group) => `
        <div class="skill-panel" data-tilt="7">
          <div class="window-header">
            <div class="window-dots" aria-hidden="true">
              <span class="dot-red"></span>
              <span class="dot-yellow"></span>
              <span class="dot-green"></span>
            </div>
            <span class="window-title">${group.file}</span>
            <span></span>
          </div>
          <div class="skill-panel-body">
            ${group.items.map((s) => `
              <span class="skill-pill ${s.learning ? 'is-learning' : ''}">
                ${s.name}
              </span>
            `).join('')}
          </div>
        </div>
      `).join('');
    }

    // 4. Photo Stack
    if (dom.photoStack) {
      const stackIndices = [2, 3, 4];
      dom.photoStack.innerHTML = stackIndices.map((idx, pos) => `
        <div class="stack-card" data-index="${idx}" style="z-index:${10 - pos}">
          <img src="${CONFIG.images[idx]}" alt="Sahil Razza portfolio visual ${idx + 1}" loading="lazy">
        </div>
      `).join('');
    }
  }

  // ===========================================================================
  // 6. SPLIT-HEADLINE CHARACTER PREPARATION
  // ===========================================================================
  function prepareSplitHeadline() {
    const charWraps = document.querySelectorAll('.char-wrap');
    charWraps.forEach((wrap) => {
      const text = wrap.textContent.trim();
      wrap.innerHTML = '';
      text.split('').forEach((char) => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? '\u00A0' : char;
        wrap.appendChild(span);
      });
    });
  }

  // ===========================================================================
  // 7. TERMINAL BOOT LOADER (Split Curtain Reveal)
  // ===========================================================================
  function runTerminalLoader(onComplete) {
    // Failsafe timeout in case of any loading hitch
    const failsafe = setTimeout(() => {
      if (dom.loader) dom.loader.remove();
      if (onComplete) onComplete();
    }, 4500);

    if (prefersReducedMotion || !dom.loader) {
      clearTimeout(failsafe);
      if (dom.loader) dom.loader.remove();
      if (onComplete) onComplete();
      return;
    }

    const bootLogs = [
      { text: '$ boot sahil.dev --fast-init', cls: 'log-muted' },
      { text: '[ok] system kernel v2.5 initialized', cls: 'log-ok' },
      { text: `[ok] loaded profile: ${CONFIG.personal.role}`, cls: 'log-accent' },
      { text: '[ok] stack: Python · FastAPI · JavaScript · C', cls: 'log-ok' },
      { text: '[ok] 4 production repositories indexed', cls: 'log-accent' },
      { text: '[ok] rendering WebGL ambient background', cls: 'log-ok' },
      { text: '> portfolio ready. launching experience...', cls: 'log-muted' }
    ];

    const statusSteps = [
      'initializing system core...',
      'loading developer profile...',
      'mounting tech stack...',
      'indexing project repositories...',
      'compiling WebGL shaders...',
      'system ready'
    ];

    let logIndex = 0;
    const total = bootLogs.length;

    function step() {
      if (logIndex >= total) {
        clearTimeout(failsafe);
        setTimeout(() => {
          if (typeof gsap !== 'undefined') {
            const tl = gsap.timeline({
              onComplete: () => {
                dom.loader.remove();
                if (onComplete) onComplete();
              }
            });

            tl.to(dom.loaderBox, {
              scale: 0.96,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.inOut'
            })
            .to(dom.loaderTop, {
              yPercent: -100,
              duration: 0.7,
              ease: 'expo.inOut'
            }, '-=0.15')
            .to(dom.loaderBottom, {
              yPercent: 100,
              duration: 0.7,
              ease: 'expo.inOut'
            }, '<');
          } else {
            dom.loader.style.opacity = '0';
            setTimeout(() => {
              dom.loader.remove();
              if (onComplete) onComplete();
            }, 500);
          }
        }, 180);
        return;
      }

      const item = bootLogs[logIndex];
      const logLine = document.createElement('div');
      logLine.className = item.cls;
      logLine.textContent = item.text;
      dom.loaderLog.appendChild(logLine);
      dom.loaderLog.scrollTop = dom.loaderLog.scrollHeight;

      const progress = Math.round(((logIndex + 1) / total) * 100);
      dom.loaderBar.style.width = `${progress}%`;
      dom.loaderPercent.textContent = `${progress}%`;
      dom.loaderStatus.textContent = statusSteps[Math.min(logIndex, statusSteps.length - 1)];

      logIndex++;
      setTimeout(step, 170);
    }

    setTimeout(step, 120);
  }

  // ===========================================================================
  // 8. SIGNATURE MOMENT: "Neural Genesis" Portrait Stream Reveal
  // ===========================================================================
  function triggerSignatureNeuralGenesis() {
    if (!dom.neuralOverlay || prefersReducedMotion) {
      if (dom.neuralOverlay) dom.neuralOverlay.classList.add('resolved');
      return;
    }

    const neuralSnippets = [
      'import torch.nn as nn',
      'class NeuralVision(nn.Module):',
      '    def __init__(self):',
      '        super().__init__()',
      '        self.conv1 = nn.Conv2d(3, 64, 3)',
      '        self.weights = weights.load()',
      'tensor_shape = [1, 3, 512, 512]',
      'matrix_op: GEMM 0x7ffd19b2',
      'optimizing latent space...',
      'rendering developer portrait...',
      'weights converged. READY.'
    ];

    let lineIndex = 0;
    const streamInterval = setInterval(() => {
      if (lineIndex < neuralSnippets.length) {
        dom.matrixCodeStream.textContent += neuralSnippets[lineIndex] + '\n';
        const pct = Math.round(((lineIndex + 1) / neuralSnippets.length) * 100);
        if (dom.neuralBarInner) dom.neuralBarInner.style.width = `${pct}%`;
        if (dom.neuralStreamPercent) dom.neuralStreamPercent.textContent = `${pct}%`;
        if (dom.neuralStreamStatus) {
          dom.neuralStreamStatus.textContent = lineIndex < 5 ? 'COMPUTING_WEIGHTS' : 'SYNAPSE_RESOLVED';
        }
        lineIndex++;
      } else {
        clearInterval(streamInterval);
        setTimeout(() => {
          dom.neuralOverlay.classList.add('resolved');
          if (dom.neuralStateBadge) {
            dom.neuralStateBadge.textContent = 'ONLINE';
            dom.neuralStateBadge.style.color = 'var(--syn-func)';
          }
        }, 300);
      }
    }, 75);
  }

  // ===========================================================================
  // 9. CHOREOGRAPHED HERO ENTRANCE TIMELINE
  // ===========================================================================
  function triggerHeroEntrance() {
    if (typeof gsap === 'undefined') {
      document.querySelectorAll('.char').forEach((c) => (c.style.transform = 'none'));
      triggerSignatureNeuralGenesis();
      return;
    }

    const chars = document.querySelectorAll('.hero-title .char');
    const badge = document.querySelector('[data-animate="hero-badge"]');
    const role = document.querySelector('[data-animate="hero-role"]');
    const type = document.querySelector('[data-animate="hero-type"]');
    const tag = document.querySelector('[data-animate="hero-tag"]');
    const actions = document.querySelector('[data-animate="hero-actions"]');
    const socials = document.querySelector('[data-animate="hero-socials"]');
    const stage = document.querySelector('[data-animate="hero-stage"]');

    const heroTl = gsap.timeline({
      defaults: { ease: 'expo.out' },
      onStart: () => {
        // Launch signature moment handoff
        triggerSignatureNeuralGenesis();
      }
    });

    // 1. Status badge
    if (badge) {
      heroTl.fromTo(badge, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65 });
    }

    // 2. Split character name reveal
    heroTl.to(chars, {
      y: '0%',
      duration: 1.1,
      stagger: 0.035,
      ease: 'expo.out'
    }, '-=0.4');

    // 3. Stage 3D photo entrance
    if (stage) {
      heroTl.fromTo(
        stage,
        { scale: 0.92, opacity: 0, y: 26 },
        { scale: 1, opacity: 1, y: 0, duration: 1.15, ease: 'expo.out' },
        '-=0.9'
      );
    }

    // 4. Role, typewriter & tagline
    heroTl.fromTo([role, type, tag],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.09 },
      '-=0.8'
    );

    // 5. Actions & Social links
    heroTl.fromTo([actions, socials],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.09 },
      '-=0.6'
    );
  }

  // ===========================================================================
  // 10. TYPEWRITER EFFECT
  // ===========================================================================
  function initTypewriter() {
    const roles = ['"AI/ML";', '"Full-stack web";', '"Python & FastAPI";', '"Problem solving";'];
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
      if (!dom.typewriterText) return;
      const currentRole = roles[roleIdx];

      dom.typewriterText.textContent = currentRole.slice(0, charIdx);

      if (!isDeleting && charIdx === currentRole.length) {
        isDeleting = true;
        setTimeout(type, 1600);
        return;
      }

      if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }

      charIdx += isDeleting ? -1 : 1;
      setTimeout(type, isDeleting ? 30 : 65);
    }

    setTimeout(type, 800);
  }

  // ===========================================================================
  // 11. PHOTO STACK INTERACTIVE FAN-OUT
  // ===========================================================================
  let stackOrder = [2, 3, 4];

  function layoutStack() {
    if (!dom.photoStack) return;
    const cards = Array.from(dom.photoStack.querySelectorAll('.stack-card'));
    cards.forEach((card) => {
      const photoIdx = parseInt(card.dataset.index, 10);
      const pos = stackOrder.indexOf(photoIdx);
      card.style.zIndex = `${10 - pos}`;

      if (pos === 0) {
        card.style.transform = 'translate3d(0, 0, 0) rotate(0deg)';
      } else if (pos === 1) {
        card.style.transform = 'translate3d(24px, -14px, -50px) rotate(3.5deg)';
      } else {
        card.style.transform = 'translate3d(48px, -28px, -100px) rotate(7deg)';
      }
    });
  }

  function nextPhotoInStack() {
    stackOrder.push(stackOrder.shift());
    layoutStack();
  }

  function initPhotoStack() {
    if (!dom.photoStack) return;
    layoutStack();
    dom.photoStack.addEventListener('click', nextPhotoInStack);

    if (!prefersReducedMotion) {
      let stackTimer = setInterval(nextPhotoInStack, 4500);
      dom.photoStack.addEventListener('mouseenter', () => clearInterval(stackTimer));
      dom.photoStack.addEventListener('mouseleave', () => {
        clearInterval(stackTimer);
        stackTimer = setInterval(nextPhotoInStack, 4500);
      });
    }
  }

  // ===========================================================================
  // 12. 3D TILT & LIGHT-SWEEP GLARE (Desktop only)
  // ===========================================================================
  function initTiltElements() {
    if (isTouchDevice || prefersReducedMotion) return;

    // Project cards & skill panels
    document.querySelectorAll('[data-tilt]').forEach((card) => {
      const maxTilt = parseFloat(card.dataset.tilt) || 8;

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        const rotateY = (x - 0.5) * maxTilt;
        const rotateX = (0.5 - y) * maxTilt;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;

        const glare = card.querySelector('.card-glare');
        if (glare) {
          glare.style.setProperty('--glare-x', `${(x * 100).toFixed(1)}%`);
          glare.style.setProperty('--glare-y', `${(y * 100).toFixed(1)}%`);
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });

    // Hero stage tilt
    if (dom.heroRig && dom.heroRig.parentElement) {
      const stage = dom.heroRig.parentElement;
      stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        dom.heroRig.style.transform = `rotateY(${(x * 16).toFixed(2)}deg) rotateX(${(-y * 16).toFixed(2)}deg)`;
      });

      stage.addEventListener('mouseleave', () => {
        dom.heroRig.style.transform = '';
      });
    }

    // Contact portrait card tilt
    if (dom.contactPortraitCard) {
      dom.contactPortraitCard.addEventListener('mousemove', (e) => {
        const rect = dom.contactPortraitCard.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        dom.contactPortraitCard.style.transform = `rotateY(${(x * 12).toFixed(2)}deg) rotateX(${(-y * 12).toFixed(2)}deg)`;
      });

      dom.contactPortraitCard.addEventListener('mouseleave', () => {
        dom.contactPortraitCard.style.transform = '';
      });
    }
  }

  // ===========================================================================
  // 13. PROJECT AREA CURSOR-FOLLOW PILL (Strictly #projects area)
  // ===========================================================================
  function initProjectCursor() {
    if (isTouchDevice || prefersReducedMotion || !dom.projectsContainer || !dom.projectCursorPill) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let isInside = false;

    dom.projectsContainer.addEventListener('mouseenter', () => {
      isInside = true;
      dom.projectCursorPill.classList.add('is-active');
    });

    dom.projectsContainer.addEventListener('mouseleave', () => {
      isInside = false;
      dom.projectCursorPill.classList.remove('is-active');
    });

    dom.projectsContainer.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    function renderCursor() {
      if (isInside) {
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
        dom.projectCursorPill.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) translate(-50%, -50%)`;
      }
      requestAnimationFrame(renderCursor);
    }

    requestAnimationFrame(renderCursor);
  }

  // ===========================================================================
  // 14. MAGNETIC BUTTONS (Restrained Micro-interaction)
  // ===========================================================================
  function initMagneticButtons() {
    if (isTouchDevice || prefersReducedMotion) return;

    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ===========================================================================
  // 15. SCROLLTRIGGER ANIMATIONS & JOURNEY SCRUB
  // ===========================================================================
  function initScrollTriggers() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    if (prefersReducedMotion) {
      document.querySelectorAll('[data-animate]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    // Generic Section element reveals (using global base duration 0.7s, expo.out)
    const animElements = document.querySelectorAll(
      'section:not(#home) [data-animate="fade-up"]'
    );

    animElements.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Stat counter animation on trigger
    if (dom.statNums.length > 0) {
      ScrollTrigger.create({
        trigger: '.about-stats',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          dom.statNums.forEach((numEl) => {
            const target = parseInt(numEl.dataset.target, 10);
            gsap.to(numEl, {
              innerText: target,
              duration: 1.6,
              snap: { innerText: 1 },
              ease: 'power2.out'
            });
          });
        }
      });
    }

    // Journey Timeline scrub animation
    if (dom.timelineProgress && dom.timelineItems.length > 0) {
      gsap.to(dom.timelineProgress, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#timeline-wrap',
          start: 'top 70%',
          end: 'bottom 80%',
          scrub: 0.4,
          onUpdate: (self) => {
            const progress = self.progress;
            dom.timelineItems.forEach((item, idx) => {
              const itemThreshold = (idx + 0.3) / dom.timelineItems.length;
              item.classList.toggle('is-active', progress >= itemThreshold);
            });
          }
        }
      });
    }

    // Hero section scroll parallax & subtle fade-out
    gsap.to('#home .hero-grid', {
      y: 50,
      opacity: 0.15,
      ease: 'none',
      scrollTrigger: {
        trigger: '#home',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // ===========================================================================
  // 16. SCROLL-AWARE NAVIGATION & ACTIVE PILL INDICATOR
  // ===========================================================================
  function updateNavPill(activeLink) {
    if (!dom.navPill || !activeLink) return;
    const parentRect = activeLink.parentElement.parentElement.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();

    dom.navPill.style.width = `${linkRect.width}px`;
    dom.navPill.style.transform = `translateX(${linkRect.left - parentRect.left}px)`;
    dom.navPill.style.opacity = '1';
  }

  function initScrollAwareNav() {
    let lastScrollY = window.scrollY;
    const sections = Array.from(document.querySelectorAll('section'));

    function onScroll() {
      const currentScrollY = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = Math.min(1, Math.max(0, currentScrollY / (scrollHeight || 1)));

      // Top progress bar
      if (dom.scrollProgressBar) {
        dom.scrollProgressBar.style.width = `${scrollFraction * 100}%`;
      }

      // Back to top button
      if (dom.topBtn) {
        dom.topBtn.classList.toggle('is-visible', currentScrollY > 600);
      }

      // Scroll-aware nav auto-hide on scroll down, show on scroll up
      if (dom.mainNav && currentScrollY > 150) {
        if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 6) {
          dom.mainNav.classList.add('nav-hidden');
        } else if (lastScrollY - currentScrollY > 6) {
          dom.mainNav.classList.remove('nav-hidden');
        }
      } else if (dom.mainNav) {
        dom.mainNav.classList.remove('nav-hidden');
      }

      lastScrollY = currentScrollY;

      // Active Section Tracker
      const viewportMid = currentScrollY + window.innerHeight * 0.38;
      let currentSectionId = 'home';

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (viewportMid >= top && viewportMid < top + height) {
          currentSectionId = sec.id;
          break;
        }
      }

      dom.navLinks.forEach((link) => {
        const isMatch = link.getAttribute('href') === `#${currentSectionId}`;
        link.classList.toggle('is-active', isMatch);
        if (isMatch) {
          updateNavPill(link);
        }
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      const activeLink = document.querySelector('.nav-item-link.is-active');
      if (activeLink) updateNavPill(activeLink);
    });

    onScroll();
  }

  // ===========================================================================
  // 17. COPY EMAIL WITH CONFIRMATION STATE
  // ===========================================================================
  function initCopyEmail() {
    if (!dom.copyEmailBtn) return;

    dom.copyEmailBtn.addEventListener('click', async () => {
      const email = CONFIG.personal.email;
      try {
        await navigator.clipboard.writeText(email);
      } catch (e) {
        const textarea = document.createElement('textarea');
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      // Button confirmation state
      if (dom.copyEmailTxt) dom.copyEmailTxt.textContent = 'Copied ✓';
      if (dom.toast) {
        dom.toast.classList.add('is-active');
        setTimeout(() => {
          dom.toast.classList.remove('is-active');
        }, 2200);
      }

      setTimeout(() => {
        if (dom.copyEmailTxt) dom.copyEmailTxt.textContent = 'Copy email';
      }, 2500);
    });
  }

  // ===========================================================================
  // 18. THREE.JS WIREFRAME & INSTANCED PARTICLES (GPU-Paused)
  // ===========================================================================
  function initThreeHero() {
    if (!dom.threeCanvas || typeof THREE === 'undefined' || prefersReducedMotion) return;

    try {
      const canvas = dom.threeCanvas;
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(canvas.parentElement.clientWidth, canvas.parentElement.clientHeight, false);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        48,
        canvas.parentElement.clientWidth / canvas.parentElement.clientHeight,
        0.1,
        100
      );
      camera.position.z = 15;

      const createWireMat = (colorHex, opacity) =>
        new THREE.MeshBasicMaterial({
          color: colorHex,
          wireframe: true,
          transparent: true,
          opacity: opacity
        });

      // Geometric Nodes
      const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(3.2, 1), createWireMat(0xc2204f, 0.22));
      icosa.position.set(6, 0.5, -4);
      scene.add(icosa);

      const torus = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.45, 12, 36), createWireMat(0xffcb6b, 0.12));
      torus.position.set(-7.5, -3, -5);
      scene.add(torus);

      const octa = new THREE.Mesh(new THREE.OctahedronGeometry(1.5, 0), createWireMat(0x82aaff, 0.15));
      octa.position.set(-4.5, 4.2, -3);
      scene.add(octa);

      // Instanced Particle Field
      const particleCount = 420;
      const positions = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 36;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;
      }

      const particleGeo = new THREE.BufferGeometry();
      particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

      const particleMat = new THREE.PointsMaterial({
        color: 0xe0446f,
        size: 0.055,
        transparent: true,
        opacity: 0.38
      });

      const particleSystem = new THREE.Points(particleGeo, particleMat);
      scene.add(particleSystem);

      function onWindowResize() {
        const parent = canvas.parentElement;
        if (!parent) return;
        renderer.setSize(parent.clientWidth, parent.clientHeight, false);
        camera.aspect = parent.clientWidth / parent.clientHeight;
        camera.updateProjectionMatrix();
      }
      window.addEventListener('resize', onWindowResize);

      let targetMouseX = 0;
      let targetMouseY = 0;
      let currentMouseX = 0;
      let currentMouseY = 0;
      let isHeroVisible = true;

      window.addEventListener('mousemove', (e) => {
        targetMouseX = e.clientX / window.innerWidth - 0.5;
        targetMouseY = e.clientY / window.innerHeight - 0.5;
      });

      // Pause render loop when off-screen
      const heroObserver = new IntersectionObserver(
        (entries) => {
          isHeroVisible = entries[0].isIntersecting;
        },
        { threshold: 0.05 }
      );
      heroObserver.observe(canvas.parentElement);

      function animate() {
        if (isHeroVisible) {
          icosa.rotation.x += 0.0014;
          icosa.rotation.y += 0.0022;

          torus.rotation.x += 0.0025;
          torus.rotation.y += 0.0018;

          octa.rotation.y += 0.0035;
          octa.rotation.z += 0.0018;

          particleSystem.rotation.y += 0.0005;

          currentMouseX += (targetMouseX * 1.5 - currentMouseX) * 0.04;
          currentMouseY += (-targetMouseY * 1.2 - currentMouseY) * 0.04;

          camera.position.x = currentMouseX;
          camera.position.y = currentMouseY;
          camera.lookAt(0, 0, 0);

          renderer.render(scene, camera);
        }
        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    } catch (err) {
      console.warn('Three.js initialization notice:', err);
    }
  }

  // ===========================================================================
  // 19. MASTER BOOTSTRAP
  // ===========================================================================
  function init() {
    initTheme();
    populateContent();
    prepareSplitHeadline();
    initSmoothScroll();
    initPhotoStack();
    initTiltElements();
    initProjectCursor();
    initMagneticButtons();
    initCopyEmail();
    initThreeHero();

    // Terminal Boot loader seamlessly hands off to hero entrance
    runTerminalLoader(() => {
      triggerHeroEntrance();
      initTypewriter();
      initScrollTriggers();
      initScrollAwareNav();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
