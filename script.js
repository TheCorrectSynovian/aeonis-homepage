/**
 * Aeonis: Command Master v2.0.0 — Remastered Website Scripts
 * Particle system, scroll-driven animations, tab system,
 * counter animation, and interactive elements.
 */

(() => {
    'use strict';

    // ── DOM Cache ──────────────────────────────────────────
    const $ = (s, p = document) => p.querySelector(s);
    const $$ = (s, p = document) => [...p.querySelectorAll(s)];

    const navbar      = $('#navbar');
    const navToggle   = $('#navToggle');
    const navMenu     = $('#navMenu');
    const navLinks    = $$('.nav-link');
    const scrollBar   = $('#scrollProgress');
    const backToTop   = $('#backToTop');
    const canvas      = $('#particleCanvas');

    // ── Particle System ────────────────────────────────────
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w, h;
        const PARTICLE_COUNT = 60;
        const COLORS = ['rgba(0,217,255,', 'rgba(168,85,247,', 'rgba(236,72,153,'];

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        function createParticle() {
            const color = COLORS[Math.floor(Math.random() * COLORS.length)];
            return {
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.5 + 0.5,
                dx: (Math.random() - 0.5) * 0.3,
                dy: (Math.random() - 0.5) * 0.3,
                color,
                alpha: Math.random() * 0.5 + 0.1,
                alphaDir: Math.random() > 0.5 ? 1 : -1,
            };
        }

        function initParticles() {
            particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
        }

        function drawParticles() {
            ctx.clearRect(0, 0, w, h);
            for (const p of particles) {
                p.x += p.dx;
                p.y += p.dy;
                p.alpha += p.alphaDir * 0.003;
                if (p.alpha <= 0.05 || p.alpha >= 0.55) p.alphaDir *= -1;

                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `${p.color}${p.alpha.toFixed(2)})`;
                ctx.fill();
            }
            requestAnimationFrame(drawParticles);
        }

        resize();
        initParticles();
        drawParticles();
        window.addEventListener('resize', () => { resize(); initParticles(); });
    }

    // ── Mobile Navigation ──────────────────────────────────
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ── Smooth Scroll ──────────────────────────────────────
    $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = $(anchor.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = navbar ? navbar.offsetHeight : 0;
            window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        });
    });

    // ── Scroll Events ──────────────────────────────────────
    function onScroll() {
        const scrollY = window.scrollY;
        const docH = document.documentElement.scrollHeight - window.innerHeight;

        // Scroll progress bar
        if (scrollBar) {
            scrollBar.style.width = `${(scrollY / docH) * 100}%`;
        }

        // Navbar
        if (navbar) {
            navbar.classList.toggle('scrolled', scrollY > 60);
        }

        // Back to top
        if (backToTop) {
            backToTop.classList.toggle('visible', scrollY > 500);
        }

        // Active nav link highlight
        const sections = $$('section[id], header[id]');
        let current = '';
        for (const sec of sections) {
            if (scrollY >= sec.offsetTop - 200) {
                current = sec.id;
            }
        }
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Back to top click
    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ── Intersection Observer — Reveal on Scroll ───────────
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    $$('.reveal').forEach(el => revealObserver.observe(el));

    // ── Counter Animation ──────────────────────────────────
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    $$('[data-count]').forEach(el => counterObserver.observe(el));

    function animateCounter(el) {
        const target = parseInt(el.dataset.count, 10);
        const duration = 1800;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out quart
            const ease = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.round(ease * target);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // ── Attack Bar Animation ───────────────────────────────
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target.querySelector('.bar-fill');
                if (fill) {
                    fill.style.width = getComputedStyle(entry.target).getPropertyValue('--bar-width');
                }
            }
        });
    }, { threshold: 0.3 });

    $$('.attack-bar').forEach(bar => {
        const fill = bar.querySelector('.bar-fill');
        if (fill) fill.style.width = '0%';
        barObserver.observe(bar);
    });

    // ── Tab System ─────────────────────────────────────────
    const tabBtns = $$('.tab-btn');
    const tabContents = $$('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = $(`#tab-${tabId}`);
            if (target) target.classList.add('active');
        });
    });

    // ── Tilt Effect on Cards ───────────────────────────────
    if (window.matchMedia('(hover: hover)').matches) {
        $$('[data-tilt]').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateY(-6px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ── Console Branding ───────────────────────────────────
    console.log(
        '%c⚡ Aeonis: Command Master v2.0.0 ⚡',
        'color: #00d9ff; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px rgba(0,217,255,.5);'
    );
    console.log(
        '%cTransform. Attack. Dominate.',
        'color: #a855f7; font-size: 14px;'
    );
    console.log(
        '%cMade with ❤️ by QuantumCreeper',
        'color: #facc15; font-size: 12px;'
    );

})();
