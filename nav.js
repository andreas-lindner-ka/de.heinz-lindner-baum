/**
 * Shared Navigation Web Component – heinz-lindner-baum.de
 * Verwendung: <hlb-nav lang="de" context="home|blog|legal"></hlb-nav>
 * lang: "de" | "en" | "es"
 * context: "home" (default) | "blog" | "legal"
 */

class HlbNav extends HTMLElement {
  connectedCallback() {
    const lang    = this.getAttribute('lang')    || 'de';
    const context = this.getAttribute('context') || 'home';

    const labels = {
      de: { story: 'Geschichte', impact: 'Wirkung', tree: 'Mammutbaum', location: 'Standort', blog: 'Blog' },
      en: { story: 'Story',      impact: 'Impact',  tree: 'The Tree',    location: 'Location', blog: 'Blog' },
      es: { story: 'Historia',   impact: 'Impacto', tree: 'El Árbol',    location: 'Ubicación',blog: 'Blog' }
    };
    const t = labels[lang] || labels.de;

    // Absolute Pfade – funktionieren auf jeder Seite
    const homeLinks = {
      de: '/',
      en: '/en/',
      es: '/es/'
    };
    const blogLinks = {
      de: '/blog/',
      en: '/en/blog/',
      es: '/es/blog/'
    };

    // Auf der Hauptseite: Anker-Links; auf anderen Seiten: zurück zur Hauptseite + Anker
    const home = homeLinks[lang];
    const anchorLinks = {
      story:    context === 'home' ? '#geschichte' : `${home}#geschichte`,
      impact:   context === 'home' ? '#wirkung'    : `${home}#wirkung`,
      tree:     context === 'home' ? '#mammutbaum' : `${home}#mammutbaum`,
      location: context === 'home' ? '#fotos'      : `${home}#fotos`,
    };

    // Eindeutige ID für diese Instanz (mehrere navs auf einer Seite möglich)
    const uid = 'hlb-menu-' + Math.random().toString(36).slice(2, 7);

    this.innerHTML = `
      <style>
        hlb-nav nav {
          position: sticky;
          top: 0;
          z-index: 100;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(8px);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 56px;
          box-sizing: border-box;
        }
        hlb-nav .nav-logo {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 15px;
          font-weight: 500;
          color: #0a3d2b;
          text-decoration: none;
          white-space: nowrap;
        }
        hlb-nav .nav-center {
          display: flex;
          gap: 1.75rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        hlb-nav .nav-center a {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 13px;
          color: #5a5a5a;
          text-decoration: none;
          letter-spacing: 0.03em;
          transition: color 0.2s;
        }
        hlb-nav .nav-center a:hover { color: #1D9E75; }
        hlb-nav .nav-center a.active { color: #0a3d2b; font-weight: 500; }
        hlb-nav .nav-right {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        hlb-nav .lang-btn {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 12px;
          color: #8a8a8a;
          text-decoration: none;
          padding: 3px 6px;
          border-radius: 4px;
          letter-spacing: 0.05em;
          transition: all 0.2s;
        }
        hlb-nav .lang-btn:hover { color: #1D9E75; }
        hlb-nav .lang-btn.active {
          color: #0a3d2b;
          font-weight: 500;
          background: #E1F5EE;
        }
        hlb-nav .lang-sep { color: rgba(0,0,0,0.15); font-size: 11px; }

        /* ── Hamburger-Button ── */
        hlb-nav .nav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          gap: 5px;
          width: 36px;
          height: 36px;
          padding: 6px;
          background: none;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.2s;
          margin-left: 8px;
        }
        hlb-nav .nav-burger:hover { background: #E1F5EE; }
        hlb-nav .nav-burger span {
          display: block;
          height: 1.5px;
          background: #0a3d2b;
          border-radius: 2px;
          transition: transform 0.25s, opacity 0.25s;
          transform-origin: center;
        }
        /* Offener Zustand: X */
        hlb-nav .nav-burger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
        hlb-nav .nav-burger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        hlb-nav .nav-burger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

        /* ── Mobile Drawer ── */
        hlb-nav .nav-drawer {
          display: none; /* wird per JS eingeblendet */
          position: fixed;
          top: 56px;
          left: 0;
          right: 0;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(0,0,0,0.08);
          z-index: 99;
          padding: 1.25rem 1.5rem 1.5rem;
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
          transform: translateY(-8px);
          opacity: 0;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        hlb-nav .nav-drawer.open {
          transform: translateY(0);
          opacity: 1;
        }
        hlb-nav .nav-drawer ul {
          list-style: none;
          margin: 0 0 1.25rem;
          padding: 0;
        }
        hlb-nav .nav-drawer ul li a {
          display: block;
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 15px;
          color: #1a1a1a;
          text-decoration: none;
          padding: 0.65rem 0;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          letter-spacing: 0.02em;
          transition: color 0.15s;
        }
        hlb-nav .nav-drawer ul li:last-child a { border-bottom: none; }
        hlb-nav .nav-drawer ul li a:hover,
        hlb-nav .nav-drawer ul li a.active { color: #1D9E75; }
        hlb-nav .nav-drawer .drawer-lang {
          display: flex;
          gap: 6px;
          align-items: center;
          padding-top: 0.25rem;
        }
        hlb-nav .nav-drawer .drawer-lang a {
          font-family: 'Source Serif 4', Georgia, serif;
          font-size: 12px;
          color: #8a8a8a;
          text-decoration: none;
          padding: 4px 8px;
          border-radius: 4px;
          letter-spacing: 0.05em;
          transition: all 0.15s;
        }
        hlb-nav .nav-drawer .drawer-lang a:hover { color: #1D9E75; }
        hlb-nav .nav-drawer .drawer-lang a.active {
          color: #0a3d2b;
          font-weight: 500;
          background: #E1F5EE;
        }
        hlb-nav .nav-drawer .drawer-lang .sep {
          color: rgba(0,0,0,0.15);
          font-size: 11px;
        }

        @media (max-width: 700px) {
          hlb-nav .nav-center { display: none; }
          hlb-nav .nav-right   { display: none; }
          hlb-nav nav          { padding: 0 1rem; }
          hlb-nav .nav-burger  { display: flex; }
          hlb-nav .nav-drawer  { display: block; } /* sichtbar per JS gesteuert */
        }
      </style>

      <nav>
        <a href="${home}" class="nav-logo">Der Heinz-Lindner-Baum</a>
        <ul class="nav-center">
          <li><a href="${anchorLinks.story}">${t.story}</a></li>
          <li><a href="${anchorLinks.impact}">${t.impact}</a></li>
          <li><a href="${anchorLinks.tree}">${t.tree}</a></li>
          <li><a href="${anchorLinks.location}">${t.location}</a></li>
          <li><a href="${blogLinks[lang]}" ${context === 'blog' ? 'class="active"' : ''}>${t.blog}</a></li>
        </ul>
        <div class="nav-right">
          <a href="${homeLinks.de}" class="lang-btn ${lang === 'de' ? 'active' : ''}">DE</a>
          <span class="lang-sep">|</span>
          <a href="${homeLinks.en}" class="lang-btn ${lang === 'en' ? 'active' : ''}">EN</a>
          <span class="lang-sep">|</span>
          <a href="${homeLinks.es}" class="lang-btn ${lang === 'es' ? 'active' : ''}">ES</a>
        </div>
        <button class="nav-burger" id="${uid}-btn" aria-label="Menü öffnen" aria-expanded="false" aria-controls="${uid}-drawer">
          <span></span><span></span><span></span>
        </button>
      </nav>

      <div class="nav-drawer" id="${uid}-drawer" role="dialog" aria-label="Navigation">
        <ul>
          <li><a href="${anchorLinks.story}">${t.story}</a></li>
          <li><a href="${anchorLinks.impact}">${t.impact}</a></li>
          <li><a href="${anchorLinks.tree}">${t.tree}</a></li>
          <li><a href="${anchorLinks.location}">${t.location}</a></li>
          <li><a href="${blogLinks[lang]}" ${context === 'blog' ? 'class="active"' : ''}>${t.blog}</a></li>
        </ul>
        <div class="drawer-lang">
          <a href="${homeLinks.de}" class="${lang === 'de' ? 'active' : ''}">DE</a>
          <span class="sep">|</span>
          <a href="${homeLinks.en}" class="${lang === 'en' ? 'active' : ''}">EN</a>
          <span class="sep">|</span>
          <a href="${homeLinks.es}" class="${lang === 'es' ? 'active' : ''}">ES</a>
        </div>
      </div>
    `;

    // ── Toggle-Logik ──
    const btn    = this.querySelector(`#${uid}-btn`);
    const drawer = this.querySelector(`#${uid}-drawer`);

    // Startzustand: Drawer versteckt, aber display:block damit CSS-Transition greift
    drawer.style.pointerEvents = 'none';
    drawer.style.visibility    = 'hidden';

    const openDrawer = () => {
      drawer.style.visibility    = 'visible';
      drawer.style.pointerEvents = 'auto';
      requestAnimationFrame(() => drawer.classList.add('open'));
      btn.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    };

    const closeDrawer = () => {
      drawer.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      drawer.addEventListener('transitionend', () => {
        if (!drawer.classList.contains('open')) {
          drawer.style.visibility    = 'hidden';
          drawer.style.pointerEvents = 'none';
        }
      }, { once: true });
    };

    btn.addEventListener('click', () => {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    // Drawer schließen bei Klick auf einen Link
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', closeDrawer);
    });

    // Drawer schließen bei Klick außerhalb
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target) && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Drawer schließen bei Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
        btn.focus();
      }
    });
  }
}
customElements.define('hlb-nav', HlbNav);
