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
        @media (max-width: 700px) {
          hlb-nav .nav-center { display: none; }
          hlb-nav nav { padding: 0 1rem; }
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
      </nav>
    `;
  }
}
customElements.define('hlb-nav', HlbNav);
