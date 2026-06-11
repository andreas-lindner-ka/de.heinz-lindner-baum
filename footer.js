/**
 * Shared Footer Web Component – heinz-lindner-baum.de
 * Verwendung: <hlb-footer lang="de"></hlb-footer>
 * lang: "de" | "en" | "es"
 */

class HlbFooter extends HTMLElement {
  connectedCallback() {
    const lang = this.getAttribute('lang') || 'de';

    const year = new Date().getFullYear();

    const content = {
      de: {
        legal: 'Impressum & Datenschutz',
        legalLink: '/impressum.html',
        location: 'Karlsruhe, Baden-Württemberg'
      },
      en: {
        legal: 'Legal Notice & Privacy',
        legalLink: '/en/legal.html',
        location: 'Karlsruhe, Baden-Württemberg, Germany'
      },
      es: {
        legal: 'Aviso Legal & Privacidad',
        legalLink: '/es/aviso-legal.html',
        location: 'Karlsruhe, Baden-Württemberg, Alemania'
      }
    };

    const langLinks = {
      de: '/',
      en: '/en/',
      es: '/es/'
    };

    const t = content[lang] || content.de;

    this.innerHTML = `
      <style>
        hlb-footer footer {
          background: #0a3d2b;
          padding: 2rem;
          text-align: center;
          font-family: 'Source Serif 4', Georgia, serif;
          font-weight: 300;
          line-height: 2;
        }
        hlb-footer .footer-line-1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.03em;
        }
        hlb-footer .footer-line-2 {
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          letter-spacing: 0.05em;
        }
        hlb-footer .footer-links {
          margin-top: 0.25rem;
          font-size: 12px;
          color: rgba(255,255,255,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        hlb-footer .footer-links a {
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          transition: color 0.2s;
        }
        hlb-footer .footer-links a:hover { color: rgba(255,255,255,0.8); }
        hlb-footer .footer-links .sep { color: rgba(255,255,255,0.15); }
        hlb-footer .lang-switch a {
          color: rgba(255,255,255,0.3);
          text-decoration: none;
          font-size: 11px;
          letter-spacing: 0.08em;
          transition: color 0.2s;
          padding: 0 2px;
        }
        hlb-footer .lang-switch a:hover { color: rgba(255,255,255,0.7); }
        hlb-footer .lang-switch a.active { color: rgba(255,255,255,0.6); }
        hlb-footer .lang-switch .sep { color: rgba(255,255,255,0.15); font-size: 10px; }
      </style>
      <footer>
        <div class="footer-line-1">Der Heinz-Lindner-Baum · Sequoiadendron giganteum</div>
        <div class="footer-line-2">${t.location}</div>
        <div class="footer-links">
          <span>© ${year} heinz-lindner-baum.de</span>
          <span class="sep">·</span>
          <a href="${t.legalLink}">${t.legal}</a>
          <span class="sep">·</span>
          <span class="lang-switch">
            <a href="${langLinks.de}" class="${lang === 'de' ? 'active' : ''}">DE</a>
            <span class="sep">|</span>
            <a href="${langLinks.en}" class="${lang === 'en' ? 'active' : ''}">EN</a>
            <span class="sep">|</span>
            <a href="${langLinks.es}" class="${lang === 'es' ? 'active' : ''}">ES</a>
          </span>
        </div>
      </footer>
    `;
  }
}
customElements.define('hlb-footer', HlbFooter);
