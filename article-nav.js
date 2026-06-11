/**
 * article-nav.js – heinz-lindner-baum.de
 *
 * Definiert den <hlb-article-nav> Web Component.
 * Lädt /blog/nav.json, findet den aktuellen Artikel anhand
 * window.location.pathname und rendert Vor/Zurück-Navigation.
 *
 * Verwendung: direkt vor </article> in jeder Artikel-HTML-Datei.
 *   <hlb-article-nav lang="de"></hlb-article-nav>
 *
 * Einbinden im <head>:
 *   <script src="/article-nav.js"></script>
 *
 * Keine data-Attribute nötig – Navigation wird zur Laufzeit
 * aus nav.json berechnet. Alte Artikel müssen nie angefasst werden.
 */

class HlbArticleNav extends HTMLElement {
  connectedCallback() {
    const lang = this.getAttribute('lang') || 'de';
    fetch('/blog/nav.json')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(nav => this.render(lang, nav))
      .catch(() => { /* Fehler still ignorieren – Navigation ist nice-to-have */ });
  }

  findCurrent(nav, lang) {
    const path = window.location.pathname.replace(/\/$/, '');
    return nav.findIndex(entry => {
      for (const l of ['de', 'en', 'es']) {
        if (entry[l] && entry[l].url.replace(/\/$/, '') === path) return true;
      }
      return false;
    });
  }

  render(lang, nav) {
    const idx = this.findCurrent(nav, lang);
    if (idx === -1) return;

    // nav[] sortiert: Index 0 = neuester Artikel
    const newerEntry = idx > 0           ? nav[idx - 1] : null;
    const olderEntry = idx < nav.length - 1 ? nav[idx + 1] : null;

    if (!newerEntry && !olderEntry) return;

    const l = {
      newer:    { de: 'Neuerer Artikel',  en: 'Newer article',  es: 'Artículo más reciente' }[lang],
      older:    { de: 'Älterer Artikel',  en: 'Older article',  es: 'Artículo anterior'      }[lang],
      allPosts: { de: '← Alle Artikel',   en: '← All articles', es: '← Todos los artículos'  }[lang],
      blogUrl:  { de: '/blog/',           en: '/en/blog/',       es: '/es/blog/'               }[lang],
    };

    const newerUrl   = newerEntry?.[lang]?.url   || newerEntry?.de?.url   || '';
    const newerTitle = newerEntry?.[lang]?.title || newerEntry?.de?.title || '';
    const olderUrl   = olderEntry?.[lang]?.url   || olderEntry?.de?.url   || '';
    const olderTitle = olderEntry?.[lang]?.title || olderEntry?.de?.title || '';

    const newerHtml = newerUrl
      ? `<a href="${newerUrl}" class="hlb-nav-card hlb-nav-newer">
           <span class="hlb-nav-label">← ${l.newer}</span>
           <span class="hlb-nav-title">${newerTitle}</span>
         </a>`
      : `<div class="hlb-nav-placeholder"></div>`;

    const olderHtml = olderUrl
      ? `<a href="${olderUrl}" class="hlb-nav-card hlb-nav-older">
           <span class="hlb-nav-label">${l.older} →</span>
           <span class="hlb-nav-title">${olderTitle}</span>
         </a>`
      : `<div class="hlb-nav-placeholder"></div>`;

    this.innerHTML = `
      <style>
        hlb-article-nav { display: block; margin-top: 3rem; }
        hlb-article-nav .hlb-nav-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 1.5rem;
        }
        hlb-article-nav .hlb-nav-card {
          background: var(--green-pale, #f0faf6);
          border: 1px solid rgba(29,158,117,0.15);
          border-radius: 8px;
          padding: 1.25rem;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          transition: border-color 0.2s, background 0.2s;
        }
        hlb-article-nav .hlb-nav-card:hover {
          border-color: rgba(29,158,117,0.4);
          background: #e4f7f0;
        }
        hlb-article-nav .hlb-nav-older { text-align: right; }
        hlb-article-nav .hlb-nav-placeholder { /* leere Zelle */ }
        hlb-article-nav .hlb-nav-label {
          font-size: 10px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--green-mid, #1D9E75);
        }
        hlb-article-nav .hlb-nav-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 0.95rem;
          font-weight: 500;
          color: var(--green-dark, #0a3d2b);
          line-height: 1.35;
        }
        hlb-article-nav .hlb-nav-back {
          display: block;
          text-align: center;
          font-size: 13px;
          color: var(--text-subtle, #8a8a8a);
          text-decoration: none;
          transition: color 0.2s;
        }
        hlb-article-nav .hlb-nav-back:hover { color: var(--green-mid, #1D9E75); }
        @media (max-width: 600px) {
          hlb-article-nav .hlb-nav-grid { grid-template-columns: 1fr; }
          hlb-article-nav .hlb-nav-older { text-align: left; }
        }
      </style>
      <div class="hlb-nav-grid">
        ${newerHtml}
        ${olderHtml}
      </div>
      <a href="${l.blogUrl}" class="hlb-nav-back">${l.allPosts}</a>
    `;
  }
}

customElements.define('hlb-article-nav', HlbArticleNav);
