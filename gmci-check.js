/**
 * hlb-gmci-check
 * PLZ-Eingabe -> Grün-Feucht-Kühl-Index (Näherungswert) aus /data/gmci-daten.json
 *
 * Nutzung:
 *   <hlb-gmci-check lang="de"></hlb-gmci-check>
 *
 * Erwartet gmci-daten.json im Format:
 *   {"01067":{"gmci":0.377,"jahre":7}, ...}
 */

const GMCI_TEXTS = {
  de: {
    title: "Wie grün, feucht und kühl ist deine Umgebung?",
    subtitle: "Näherung an den Grün-Feucht-Kühl-Index, berechnet aus Satellitendaten 2018–2024.",
    deOnlyNote: "",
    placeholder: "PLZ eingeben, z. B. 76133",
    button: "Prüfen",
    notFound: "Für diese PLZ liegen leider keine Daten vor.",
    invalid: "Bitte eine gültige 5-stellige PLZ eingeben.",
    loading: "Daten werden geladen …",
    error: "Die Daten konnten nicht geladen werden. Bitte später erneut versuchen.",
    avgLabel: "Bundesweiter Durchschnitt",
    aboveAvg: "über dem bundesweiten Durchschnitt",
    belowAvg: "unter dem bundesweiten Durchschnitt",
    bestLabel: "Bester Wert deutschlandweit",
    worstLabel: "Schlechtester Wert deutschlandweit",
    yearsLabel: j => `Basiert auf ${j} Jahren Satellitendaten`,
    hlbBox: "Bäume wie der Heinz-Lindner-Baum tragen aktiv dazu bei, diesen Wert in ihrer Umgebung zu verbessern – durch Verdunstungskühlung, Schatten und Wasserrückhalt.",
    methodTitle: "Wie wird dieser Wert berechnet?",
    methodBody: `
      <p>Der angezeigte Wert ist eine <strong>eigene Näherung</strong> an den offiziellen Grün-Feucht-Kühl-Index (GFKI/GMCI), berechnet nach der in Adhikari et al. (2026, <em>Ecological Solutions and Evidence</em>) beschriebenen Methodik – jedoch mit eigener Datenverarbeitung, nicht mit den offiziellen Referenzwerten.</p>
      <ol>
        <li><strong>Grün</strong> – Vegetationsindex (NDVI) am Ende der Vegetationsperiode (September)</li>
        <li><strong>Feucht</strong> – jährliche Niederschlagssumme (Deutscher Wetterdienst)</li>
        <li><strong>Kühl</strong> – Landoberflächentemperatur an Hitzetagen (Landsat 8/9), invertiert</li>
      </ol>
      <p>Alle drei Werte werden deutschlandweit linear auf eine Skala von 0 bis 1 normiert und zu einem einfachen Mittelwert zusammengeführt. Grundlage sind die offenen Rasterdaten von Adhikari &amp; Ibisch (Zenodo, CC-BY-4.0), gemittelt über die Jahre 2018–2024.</p>
      <p><strong>Wichtiger Hinweis:</strong> Dies ist keine offizielle Kennzahl von NABU/ECONICS Institute, sondern eine eigenständige, methodisch angelehnte Berechnung auf Basis derselben offenen Datenquellen. Die exakten Referenz-Normierungswerte der Originalstudie sind nicht öffentlich dokumentiert.</p>
    `,
    sources: "Quellen: Adhikari et al. (2026), DOI 10.1002/2688-8319.70270 · Datensatz: Zenodo 10.5281/zenodo.17081072",
    fullMethodLink: "Vollständige technische Dokumentation →",
    fullMethodUrl: "/gmci-methodik.html",
    tiers: [
      { max: 0.30, label: "Sehr kritisch", desc: "Sehr geringe Vegetation, Hitze- und Trockenstress hoch" },
      { max: 0.40, label: "Kritisch", desc: "Eingeschränkte Kühlleistung, Handlungsbedarf" },
      { max: 0.50, label: "Mittel", desc: "Durchschnittliche Funktionsfähigkeit" },
      { max: 0.60, label: "Gut", desc: "Überdurchschnittlich grün, feucht und kühl" },
      { max: 1.01, label: "Sehr gut", desc: "Hohe ökologische Funktionsfähigkeit" },
    ],
  },
  en: {
    title: "How green, moist and cool is your area?",
    subtitle: "Approximation of the Green-Moist-Cool Index, calculated from 2018–2024 satellite data.",
    deOnlyNote: "This tool currently only works for German postal codes (5-digit PLZ).",
    placeholder: "Enter postal code, e.g. 76133",
    button: "Check",
    notFound: "No data available for this postal code.",
    invalid: "Please enter a valid 5-digit German postal code.",
    loading: "Loading data …",
    error: "Data could not be loaded. Please try again later.",
    avgLabel: "National average",
    aboveAvg: "above the national average",
    belowAvg: "below the national average",
    bestLabel: "Best value nationwide",
    worstLabel: "Worst value nationwide",
    yearsLabel: j => `Based on ${j} years of satellite data`,
    hlbBox: "Trees like the Heinz Lindner Tree actively help improve this value in their surroundings — through evaporative cooling, shade, and water retention.",
    methodTitle: "How is this value calculated?",
    methodBody: `
      <p>The value shown is an <strong>independent approximation</strong> of the official Green-Moist-Cool Index (GMCI), following the methodology described in Adhikari et al. (2026, <em>Ecological Solutions and Evidence</em>) — but using our own data processing, not the official reference values.</p>
      <ol>
        <li><strong>Green</strong> — vegetation index (NDVI) at the end of the growing season (September)</li>
        <li><strong>Moist</strong> — annual precipitation total (German Weather Service)</li>
        <li><strong>Cool</strong> — land surface temperature on hot days (Landsat 8/9), inverted</li>
      </ol>
      <p>All three values are linearly normalized to a 0–1 scale across Germany and combined as a simple average. Based on the open raster datasets by Adhikari &amp; Ibisch (Zenodo, CC-BY-4.0), averaged over 2018–2024.</p>
      <p><strong>Note:</strong> This is not an official metric from NABU/ECONICS Institute, but an independent calculation following the same methodology, based on the same open data sources. The exact reference normalization values of the original study are not publicly documented.</p>
    `,
    sources: "Sources: Adhikari et al. (2026), DOI 10.1002/2688-8319.70270 · Dataset: Zenodo 10.5281/zenodo.17081072",
    fullMethodLink: "Full technical documentation →",
    fullMethodUrl: "/en/gmci-methodik.html",
    tiers: [
      { max: 0.30, label: "Very critical", desc: "Very low vegetation, high heat and drought stress" },
      { max: 0.40, label: "Critical", desc: "Limited cooling capacity, action needed" },
      { max: 0.50, label: "Moderate", desc: "Average functionality" },
      { max: 0.60, label: "Good", desc: "Above-average green, moist and cool" },
      { max: 1.01, label: "Very good", desc: "High ecological functionality" },
    ],
  },
  es: {
    title: "¿Qué tan verde, húmedo y fresco es tu entorno?",
    subtitle: "Aproximación al Índice Verde-Húmedo-Fresco, calculada a partir de datos satelitales 2018–2024.",
    deOnlyNote: "Esta herramienta solo funciona actualmente con códigos postales alemanes (5 dígitos).",
    placeholder: "Introduce el código postal, p. ej. 76133",
    button: "Comprobar",
    notFound: "No hay datos disponibles para este código postal.",
    invalid: "Introduce un código postal alemán válido de 5 dígitos.",
    loading: "Cargando datos …",
    error: "No se pudieron cargar los datos. Inténtalo de nuevo más tarde.",
    avgLabel: "Promedio nacional",
    aboveAvg: "por encima del promedio nacional",
    belowAvg: "por debajo del promedio nacional",
    bestLabel: "Mejor valor a nivel nacional",
    worstLabel: "Peor valor a nivel nacional",
    yearsLabel: j => `Basado en ${j} años de datos satelitales`,
    hlbBox: "Árboles como el Árbol Heinz Lindner contribuyen activamente a mejorar este valor en su entorno, mediante el enfriamiento por evapotranspiración, la sombra y la retención de agua.",
    methodTitle: "¿Cómo se calcula este valor?",
    methodBody: `
      <p>El valor mostrado es una <strong>aproximación propia</strong> al Índice Verde-Húmedo-Fresco oficial (GMCI), siguiendo la metodología descrita en Adhikari et al. (2026, <em>Ecological Solutions and Evidence</em>) — pero con procesamiento de datos propio, no con los valores de referencia oficiales.</p>
      <ol>
        <li><strong>Verde</strong> — índice de vegetación (NDVI) al final de la temporada de crecimiento (septiembre)</li>
        <li><strong>Húmedo</strong> — precipitación anual total (Servicio Meteorológico Alemán)</li>
        <li><strong>Fresco</strong> — temperatura de la superficie terrestre en días calurosos (Landsat 8/9), invertida</li>
      </ol>
      <p>Los tres valores se normalizan linealmente a una escala de 0 a 1 en toda Alemania y se combinan como un promedio simple. Basado en los conjuntos de datos ráster abiertos de Adhikari &amp; Ibisch (Zenodo, CC-BY-4.0), promediados entre 2018 y 2024.</p>
      <p><strong>Nota importante:</strong> Esta no es una métrica oficial de NABU/ECONICS Institute, sino un cálculo propio basado en la misma metodología y las mismas fuentes de datos abiertas. Los valores exactos de normalización de referencia del estudio original no están documentados públicamente.</p>
    `,
    sources: "Fuentes: Adhikari et al. (2026), DOI 10.1002/2688-8319.70270 · Conjunto de datos: Zenodo 10.5281/zenodo.17081072",
    fullMethodLink: "Documentación técnica completa →",
    fullMethodUrl: "/es/gmci-methodik.html",
    tiers: [
      { max: 0.30, label: "Muy crítico", desc: "Vegetación muy baja, alto estrés por calor y sequía" },
      { max: 0.40, label: "Crítico", desc: "Capacidad de enfriamiento limitada, se requiere acción" },
      { max: 0.50, label: "Moderado", desc: "Funcionalidad media" },
      { max: 0.60, label: "Bueno", desc: "Verde, húmedo y fresco por encima de la media" },
      { max: 1.01, label: "Muy bueno", desc: "Alta funcionalidad ecológica" },
    ],
  },
};

const TIER_COLORS = ["#b23a2f", "#d97b3f", "#d4a53f", "#7a9d54", "#3f7a4f"];

class HlbGmciCheck extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this._data = null;
    this._avg = null;
  }

  connectedCallback() {
    const lang = this.getAttribute("lang") || "de";
    this._t = GMCI_TEXTS[lang] || GMCI_TEXTS.de;
    this._render();
  }

  async _loadData() {
    if (this._data) return this._data;
    const res = await fetch("/data/gmci-daten.json");
    if (!res.ok) throw new Error("fetch failed");
    this._data = await res.json();
    const entries = Object.entries(this._data);
    const vals = entries.map(([, v]) => v.gmci);
    this._avg = vals.reduce((a, b) => a + b, 0) / vals.length;

    let best = entries[0], worst = entries[0];
    for (const e of entries) {
      if (e[1].gmci > best[1].gmci) best = e;
      if (e[1].gmci < worst[1].gmci) worst = e;
    }
    this._best = { plz: best[0], gmci: best[1].gmci, ort: best[1].ort || "" };
    this._worst = { plz: worst[0], gmci: worst[1].gmci, ort: worst[1].ort || "" };

    return this._data;
  }

  _tierFor(value) {
    return this._t.tiers.find(t => value <= t.max) || this._t.tiers[this._t.tiers.length - 1];
  }

  _tierIndex(value) {
    return this._t.tiers.findIndex(t => value <= t.max);
  }

  _render() {
    const t = this._t;
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-body, "Source Serif 4", Georgia, serif);
          color: var(--text, #1a1a1a);
          max-width: 640px;
          margin: 2rem auto;
          padding: 2rem;
          background: var(--green-pale, #f0faf6);
          border: 1px solid var(--border, rgba(0,0,0,0.08));
          border-radius: 8px;
        }
        h2 {
          font-family: var(--font-heading, "Playfair Display", Georgia, serif);
          color: var(--green-dark, #0a3d2b);
          margin: 0 0 0.4rem;
          font-size: 1.5rem;
        }
        .subtitle {
          margin: 0 0 0.4rem;
          font-size: 0.95rem;
          color: var(--text-muted, #5a5a5a);
        }
        .de-only-note {
          margin: 0 0 1.5rem;
          font-size: 0.85rem;
          color: #7a6010;
          background: #fffbf0;
          border-left: 2px solid #d4a017;
          padding: 0.6rem 0.9rem;
          border-radius: 0 6px 6px 0;
        }
        form {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }
        input {
          flex: 1;
          padding: 0.6rem 0.8rem;
          border: 1px solid var(--border, rgba(0,0,0,0.08));
          border-radius: 4px;
          font-size: 1rem;
          font-family: inherit;
        }
        button {
          padding: 0.6rem 1.4rem;
          background: var(--green-dark, #0a3d2b);
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          font-family: inherit;
        }
        button:hover { opacity: 0.9; }
        button:disabled { opacity: 0.5; cursor: default; }

        .result { display: none; }
        .result.visible { display: block; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

        .value-row {
          display: flex;
          align-items: baseline;
          gap: 0.75rem;
          margin-bottom: 0.75rem;
        }
        .value-row .num {
          font-family: var(--font-heading, "Playfair Display", Georgia, serif);
          font-size: 2.4rem;
          font-weight: 700;
        }
        .value-row .tier-label {
          font-size: 1.1rem;
          font-weight: 600;
        }
        .ort-label {
          font-size: 0.88rem;
          color: var(--text-muted, #5a5a5a);
          margin: 0 0 1rem;
        }

        .gauge {
          position: relative;
          height: 14px;
          border-radius: 7px;
          background: linear-gradient(to right, ${TIER_COLORS.join(",")});
          margin-bottom: 0.4rem;
        }
        .gauge .marker {
          position: absolute;
          top: -5px;
          width: 4px;
          height: 24px;
          background: #1a1a1a;
          border-radius: 2px;
          transform: translateX(-2px);
        }
        .tier-desc {
          font-size: 0.9rem;
          opacity: 0.85;
          margin: 0 0 1rem;
        }
        .compare {
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        .extremes {
          font-size: 0.82rem;
          color: var(--text-muted, #5a5a5a);
          margin-bottom: 1rem;
          display: flex;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
        .extremes .ex-item strong {
          color: var(--text, #1a1a1a);
        }
        .years {
          font-size: 0.8rem;
          opacity: 0.7;
          margin-bottom: 1rem;
        }

        .hlb-box {
          background: var(--green-dark, #0a3d2b);
          color: #fff;
          padding: 1rem 1.2rem;
          border-radius: 6px;
          font-size: 0.92rem;
          margin-bottom: 1.2rem;
        }

        .msg { font-size: 0.95rem; opacity: 0.85; margin-bottom: 1rem; }
        .msg.error { color: #b23a2f; }

        details {
          border-top: 1px solid var(--border, rgba(0,0,0,0.08));
          padding-top: 0.8rem;
          font-size: 0.88rem;
        }
        summary {
          cursor: pointer;
          font-weight: 600;
          color: var(--green-dark, #0a3d2b);
          font-family: var(--font-heading, "Playfair Display", Georgia, serif);
        }
        details[open] summary { margin-bottom: 0.6rem; }
        .method-body ol { padding-left: 1.3rem; }
        .method-body p { margin: 0.6rem 0; }
        .full-method-link { margin: 0.8rem 0; }
        .full-method-link a {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--green-mid, #1D9E75);
          text-decoration: none;
        }
        .full-method-link a:hover { text-decoration: underline; }
        .sources { font-size: 0.78rem; opacity: 0.65; margin-top: 0.8rem; }
      </style>

      <h2>${t.title}</h2>
      <p class="subtitle">${t.subtitle}</p>
      ${t.deOnlyNote ? `<p class="de-only-note">${t.deOnlyNote}</p>` : ""}

      <form id="f">
        <input id="plz" type="text" inputmode="numeric" maxlength="5" placeholder="${t.placeholder}" />
        <button type="submit">${t.button}</button>
      </form>

      <p id="msg" class="msg" style="display:none;"></p>

      <div id="result" class="result">
        <div class="value-row">
          <span class="num" id="numVal"></span>
          <span class="tier-label" id="tierLabel"></span>
        </div>
        <p class="ort-label" id="ortLabel"></p>
        <div class="gauge"><div class="marker" id="marker"></div></div>
        <p class="tier-desc" id="tierDesc"></p>
        <p class="compare" id="compare"></p>
        <p class="extremes" id="extremes"></p>
        <p class="years" id="years"></p>
        <div class="hlb-box">${t.hlbBox}</div>
      </div>

      <details>
        <summary>${t.methodTitle}</summary>
        <div class="method-body">${t.methodBody}</div>
        <p class="full-method-link"><a href="${t.fullMethodUrl}">${t.fullMethodLink}</a></p>
        <p class="sources">${t.sources}</p>
      </details>
    `;

    const form = this.shadowRoot.getElementById("f");
    const input = this.shadowRoot.getElementById("plz");
    input.addEventListener("input", () => {
      input.value = input.value.replace(/\D/g, "").slice(0, 5);
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      this._handleSubmit(input.value.trim());
    });
  }

  async _handleSubmit(plz) {
    const t = this._t;
    const msg = this.shadowRoot.getElementById("msg");
    const result = this.shadowRoot.getElementById("result");
    result.classList.remove("visible");
    msg.style.display = "none";

    if (!/^\d{5}$/.test(plz)) {
      msg.textContent = t.invalid;
      msg.className = "msg error";
      msg.style.display = "block";
      return;
    }

    msg.textContent = t.loading;
    msg.className = "msg";
    msg.style.display = "block";

    let data;
    try {
      data = await this._loadData();
    } catch (err) {
      msg.textContent = t.error;
      msg.className = "msg error";
      return;
    }

    const entry = data[plz];
    if (!entry) {
      msg.textContent = t.notFound;
      msg.className = "msg error";
      return;
    }

    msg.style.display = "none";
    this._showResult(entry);
  }

  _showResult(entry) {
    const t = this._t;
    const val = entry.gmci;
    const tier = this._tierFor(val);
    const tierIdx = this._tierIndex(val);

    this.shadowRoot.getElementById("numVal").textContent = val.toFixed(2).replace(".", ",");
    this.shadowRoot.getElementById("numVal").style.color = TIER_COLORS[tierIdx];
    this.shadowRoot.getElementById("tierLabel").textContent = tier.label;
    this.shadowRoot.getElementById("tierLabel").style.color = TIER_COLORS[tierIdx];
    this.shadowRoot.getElementById("ortLabel").textContent = entry.ort || "";
    this.shadowRoot.getElementById("tierDesc").textContent = tier.desc;
    this.shadowRoot.getElementById("marker").style.left = `${Math.round(val * 100)}%`;

    const diff = val - this._avg;
    const diffPct = Math.abs(diff / this._avg * 100).toFixed(0);
    const dir = diff >= 0 ? t.aboveAvg : t.belowAvg;
    this.shadowRoot.getElementById("compare").textContent =
      `${t.avgLabel}: ${this._avg.toFixed(2).replace(".", ",")} (${diffPct}% ${dir})`;

    const fmt = v => v.toFixed(2).replace(".", ",");
    this.shadowRoot.getElementById("extremes").innerHTML =
      `<span class="ex-item">${t.bestLabel}: <strong>${fmt(this._best.gmci)}</strong> (${this._best.plz}${this._best.ort ? " " + this._best.ort : ""})</span>` +
      `<span class="ex-item">${t.worstLabel}: <strong>${fmt(this._worst.gmci)}</strong> (${this._worst.plz}${this._worst.ort ? " " + this._worst.ort : ""})</span>`;

    this.shadowRoot.getElementById("years").textContent = t.yearsLabel(entry.jahre);

    this.shadowRoot.getElementById("result").classList.add("visible");
  }
}

customElements.define("hlb-gmci-check", HlbGmciCheck);
