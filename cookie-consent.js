/**
 * DSGVO-konformer Cookie-Consent für heinz-lindner-baum.de
 * Verwaltet Einwilligung für Google AdSense (Werbe-Cookies)
 * Keine externen Abhängigkeiten – reines Vanilla JS
 */

(function () {
  const CONSENT_KEY = 'hlb_cookie_consent';
  const CONSENT_VERSION = '1';

  function getConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }

  function setConsent(decision) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify({
        version: CONSENT_VERSION,
        decision: decision,
        timestamp: new Date().toISOString()
      }));
    } catch {}
  }

  function loadAdSense() {
    if (document.getElementById('adsense-script')) return;
    const s = document.createElement('script');
    s.id = 'adsense-script';
    s.async = true;
    // Ersetze ca-pub-XXXXXXXXXXXXXXXX mit deiner echten AdSense Publisher-ID
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7359766601419930';
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }

  function removeBanner() {
    const banner = document.getElementById('hlb-cookie-banner');
    if (banner) {
      banner.style.transform = 'translateY(100%)';
      banner.style.opacity = '0';
      setTimeout(() => banner.remove(), 400);
    }
  }

  function showSettings() {
    document.getElementById('hlb-consent-simple').style.display = 'none';
    document.getElementById('hlb-consent-detail').style.display = 'block';
  }

  function hideSettings() {
    document.getElementById('hlb-consent-simple').style.display = 'block';
    document.getElementById('hlb-consent-detail').style.display = 'none';
  }

  function acceptAll() {
    setConsent('all');
    loadAdSense();
    removeBanner();
  }

  function acceptNecessary() {
    setConsent('necessary');
    removeBanner();
  }

  function injectBanner() {
    const banner = document.createElement('div');
    banner.id = 'hlb-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Cookie-Einstellungen');
    banner.innerHTML = `
      <style>
        #hlb-cookie-banner {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          z-index: 9999;
          background: #0a3d2b;
          color: rgba(255,255,255,0.9);
          font-family: 'Source Serif 4', Georgia, serif;
          font-weight: 300;
          font-size: 14px;
          line-height: 1.6;
          padding: 1.25rem 1.5rem;
          box-shadow: 0 -4px 24px rgba(0,0,0,0.2);
          transition: transform 0.4s ease, opacity 0.4s ease;
        }
        #hlb-cookie-banner .cb-inner {
          max-width: 900px;
          margin: 0 auto;
        }
        #hlb-consent-simple {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        #hlb-consent-simple .cb-text { flex: 1; min-width: 260px; }
        #hlb-consent-simple .cb-text strong {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 2px;
        }
        #hlb-consent-simple .cb-text a {
          color: #5DCAA5;
          text-decoration: none;
        }
        #hlb-consent-simple .cb-text a:hover { text-decoration: underline; }
        .cb-buttons { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; }
        .cb-btn-accept {
          background: #1D9E75;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 8px 18px;
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          font-weight: 400;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .cb-btn-accept:hover { background: #0F6E56; }
        .cb-btn-necessary {
          background: transparent;
          color: rgba(255,255,255,0.6);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 6px;
          padding: 8px 18px;
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s;
        }
        .cb-btn-necessary:hover { color: #fff; border-color: rgba(255,255,255,0.5); }
        .cb-btn-settings {
          background: transparent;
          color: rgba(255,255,255,0.4);
          border: none;
          font-size: 12px;
          font-family: inherit;
          cursor: pointer;
          padding: 0;
          text-decoration: underline;
        }
        .cb-btn-settings:hover { color: rgba(255,255,255,0.8); }

        #hlb-consent-detail { display: none; }
        #hlb-consent-detail h3 {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          margin-bottom: 1rem;
        }
        .cb-detail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 12px;
          margin-bottom: 1rem;
        }
        .cb-detail-item {
          background: rgba(255,255,255,0.06);
          border-radius: 6px;
          padding: 0.75rem 1rem;
        }
        .cb-detail-item .cb-di-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .cb-detail-item strong {
          font-size: 13px;
          color: #fff;
          font-weight: 500;
        }
        .cb-detail-item p {
          font-size: 12px;
          color: rgba(255,255,255,0.5);
          margin: 0;
          line-height: 1.5;
        }
        .cb-toggle {
          position: relative;
          width: 36px;
          height: 20px;
          flex-shrink: 0;
        }
        .cb-toggle input { opacity: 0; width: 0; height: 0; }
        .cb-toggle-slider {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(255,255,255,0.2);
          border-radius: 20px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .cb-toggle input:checked + .cb-toggle-slider { background: #1D9E75; }
        .cb-toggle-slider::before {
          content: '';
          position: absolute;
          width: 14px; height: 14px;
          left: 3px; top: 3px;
          background: #fff;
          border-radius: 50%;
          transition: transform 0.2s;
        }
        .cb-toggle input:checked + .cb-toggle-slider::before { transform: translateX(16px); }
        .cb-toggle input:disabled + .cb-toggle-slider { cursor: not-allowed; opacity: 0.6; }
        .cb-detail-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
      </style>

      <div class="cb-inner">
        <div id="hlb-consent-simple">
          <div class="cb-text">
            <strong>Diese Webseite verwendet Cookies</strong>
            Wir nutzen Google AdSense für Werbeanzeigen. Dabei werden Cookies gesetzt und Daten an Google übertragen.
            Weitere Infos in unserem <a href="impressum.html">Impressum & Disclaimer</a>.
          </div>
          <div class="cb-buttons">
            <button class="cb-btn-accept" onclick="window.hlbAcceptAll()">Alle akzeptieren</button>
            <button class="cb-btn-necessary" onclick="window.hlbAcceptNecessary()">Nur notwendige</button>
            <button class="cb-btn-settings" onclick="window.hlbShowSettings()">Einstellungen ▾</button>
          </div>
        </div>

        <div id="hlb-consent-detail">
          <h3>Cookie-Einstellungen</h3>
          <div class="cb-detail-grid">
            <div class="cb-detail-item">
              <div class="cb-di-header">
                <strong>Notwendig</strong>
                <label class="cb-toggle">
                  <input type="checkbox" checked disabled>
                  <span class="cb-toggle-slider"></span>
                </label>
              </div>
              <p>Technisch erforderlich für den Betrieb der Seite. Kein Opt-out möglich.</p>
            </div>
            <div class="cb-detail-item">
              <div class="cb-di-header">
                <strong>Google AdSense (Werbung)</strong>
                <label class="cb-toggle">
                  <input type="checkbox" id="cb-toggle-ads">
                  <span class="cb-toggle-slider"></span>
                </label>
              </div>
              <p>Google setzt Cookies für personalisierte Werbeanzeigen. Daten werden an Google LLC, USA übertragen. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" style="color:#5DCAA5;">Google Datenschutz</a></p>
            </div>
          </div>
          <div class="cb-detail-actions">
            <button class="cb-btn-accept" onclick="window.hlbSaveSettings()">Auswahl speichern</button>
            <button class="cb-btn-accept" onclick="window.hlbAcceptAll()">Alle akzeptieren</button>
            <button class="cb-btn-settings" onclick="window.hlbHideSettings()">← Zurück</button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(banner);
  }

  // Öffentliche API
  window.hlbAcceptAll = acceptAll;
  window.hlbAcceptNecessary = acceptNecessary;
  window.hlbShowSettings = showSettings;
  window.hlbHideSettings = hideSettings;
  window.hlbSaveSettings = function () {
    const adsChecked = document.getElementById('cb-toggle-ads')?.checked;
    if (adsChecked) {
      setConsent('all');
      loadAdSense();
    } else {
      setConsent('necessary');
    }
    removeBanner();
  };

  // Initialisierung
  document.addEventListener('DOMContentLoaded', function () {
    const consent = getConsent();
    if (!consent) {
      injectBanner();
    } else if (consent.decision === 'all') {
      loadAdSense();
    }
  });

})();
