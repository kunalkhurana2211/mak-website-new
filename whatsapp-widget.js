(function () {
  const INDIA = "919465263877";
  const DUBAI = "971525355917";

  function isArabic() {
    return document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";
  }

  function t(en, ar) {
    return isArabic() ? ar : en;
  }

  function pageTitle() {
    const h1 = document.querySelector("h1");
    return (h1 ? h1.textContent : document.title).replace(/\s+/g, " ").trim();
  }

  function pageMessage() {
    return [
      "Hello MAK Overseas, I am interested in this page/product:",
      pageTitle(),
      window.location.href
    ].join("\n");
  }

  function quoteMessage() {
    const name = document.getElementById("waName")?.value || "";
    const phone = document.getElementById("waPhone")?.value || "";
    const text = document.getElementById("waMessage")?.value || "";
    return [
      "Hello MAK Overseas, I need help with a spare part.",
      name ? `Name: ${name}` : "",
      phone ? `Phone: ${phone}` : "",
      text ? `Message: ${text}` : "",
      `Page: ${pageTitle()}`
    ].filter(Boolean).join("\n");
  }

  function waUrl(phone, message) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  }

  function addStyles() {
    if (document.getElementById("whatsapp-widget-style")) return;
    const style = document.createElement("style");
    style.id = "whatsapp-widget-style";
    style.textContent = `
      .wa-float{display:none!important}
      .wa-widget{position:fixed;right:1.35rem;bottom:1.35rem;z-index:310;font-family:var(--B,Arial),sans-serif}
      .wa-widget::before{content:"";position:absolute;inset:-7px;border-radius:999px;background:rgba(37,211,102,.18);animation:waPulse 2.2s infinite;pointer-events:none}
      .wa-main{height:62px;min-width:62px;max-width:62px;border:2px solid rgba(255,255,255,.82);border-radius:999px;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:flex-start;gap:.7rem;padding:0 18px;overflow:hidden;box-shadow:0 18px 48px rgba(0,0,0,.44);cursor:pointer;transition:max-width .28s ease,background .2s,transform .2s,border-color .2s;position:relative}
      .wa-widget:hover .wa-main,.wa-main:focus-visible{max-width:250px;background:#128C7E;transform:translateY(-2px);border-color:#25D366}
      .wa-main svg{min-width:30px;width:30px;height:30px;fill:#fff}
      .wa-main span{white-space:nowrap;font-family:var(--H,Arial);font-size:.95rem;font-weight:900;letter-spacing:1px;text-transform:uppercase;opacity:0;transform:translateX(8px);transition:.22s}
      .wa-widget:hover .wa-main span,.wa-main:focus-visible span{opacity:1;transform:translateX(0)}
      .wa-status{position:absolute;right:0;bottom:67px;background:#111;color:#dfe8ee;border:1px solid #303030;padding:.5rem .68rem;box-shadow:0 12px 30px rgba(0,0,0,.34);font-size:.78rem;white-space:nowrap}
      .wa-status b{color:#25D366}
      .wa-panel{position:absolute;right:0;bottom:4.35rem;width:min(390px,calc(100vw - 2rem));background:#111;border:1px solid #303030;box-shadow:0 24px 70px rgba(0,0,0,.55);opacity:0;pointer-events:none;transform:translateY(12px) scale(.98);transition:.22s}
      .wa-panel.open{opacity:1;pointer-events:auto;transform:translateY(0) scale(1)}
      .wa-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:1rem;border-bottom:1px solid #292929;background:linear-gradient(135deg,#111,#171717)}
      .wa-head strong{display:block;font-family:var(--H,Arial);font-size:1.28rem;text-transform:uppercase;letter-spacing:1px;color:#fff;line-height:1}
      .wa-head small{display:block;color:#9da7af;margin-top:.35rem;line-height:1.35}
      .wa-close{background:transparent;color:#fff;border:0;font-size:1.5rem;line-height:1;cursor:pointer}
      .wa-body{padding:1rem;display:grid;gap:.75rem}
      .wa-actions{display:grid;grid-template-columns:1fr 1fr;gap:.55rem}
      .wa-action{border:1px solid #333;background:#1b1b1b;color:#fff;padding:.8rem .75rem;text-align:left;cursor:pointer;transition:.2s;text-decoration:none}
      .wa-action:hover{border-color:#25D366;background:#202820;transform:translateY(-1px)}
      .wa-action b{display:block;font-family:var(--H,Arial);font-size:1rem;letter-spacing:1px;text-transform:uppercase}
      .wa-action small{color:#9da7af;display:block;margin-top:.15rem;line-height:1.25}
      .wa-action.green{background:#25D366;color:#fff;border-color:#25D366}.wa-action.green small{color:rgba(255,255,255,.86)}
      .wa-form{display:grid;gap:.55rem;padding-top:.3rem}
      .wa-form input,.wa-form textarea{width:100%;border:0;background:#fff;color:#111;padding:.78rem;font-family:var(--B,Arial)}
      .wa-form textarea{min-height:82px;resize:vertical}
      .wa-send{border:0;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;padding:.85rem;font-family:var(--H,Arial);font-weight:900;letter-spacing:1px;text-transform:uppercase;cursor:pointer}
      .wa-note{display:none;color:#25D366;font-size:.82rem}
      html[dir="rtl"] .wa-widget{right:auto;left:1.35rem}
      html[dir="rtl"] .wa-panel{right:auto;left:0}
      html[dir="rtl"] .wa-action{text-align:right}
      @keyframes waPulse{0%,100%{transform:scale(.96);opacity:.65}50%{transform:scale(1.12);opacity:.15}}
      @media(max-width:820px){.wa-widget{right:1rem;bottom:1rem}.wa-panel{bottom:4.35rem}.wa-actions{grid-template-columns:1fr}.wa-main span{opacity:1;transform:none}.wa-main{max-width:190px}.wa-status{display:none}}
    `;
    document.head.appendChild(style);
  }

  function build() {
    document.querySelectorAll(".wa-float").forEach(el => el.remove());
    if (document.getElementById("waWidget")) return;
    const wrap = document.createElement("div");
    wrap.className = "wa-widget";
    wrap.id = "waWidget";
    wrap.innerHTML = `
      <button class="wa-main" id="waMain" type="button" aria-label="Open WhatsApp options">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.99 2C6.473 2 2 6.473 2 11.99c0 1.89.522 3.657 1.432 5.17L2 22l4.967-1.41A9.94 9.94 0 0011.99 22C17.507 22 22 17.527 22 12.01 22 6.493 17.507 2 11.99 2z"/></svg>
        <span data-wa-label>Message Us</span>
      </button>
      <div class="wa-status"><b>Online</b> - Quick part help</div>
      <div class="wa-panel" id="waPanel">
        <div class="wa-head">
          <div><strong data-wa-title>How can we help?</strong><small data-wa-subtitle>Choose a quick action or send a short enquiry.</small></div>
          <button class="wa-close" id="waClose" type="button" aria-label="Close">&times;</button>
        </div>
        <div class="wa-body">
          <div class="wa-actions">
            <a class="wa-action green" id="waIndia" target="_blank" rel="noopener"><b>India WhatsApp</b><small>Head office, Ludhiana</small></a>
            <a class="wa-action green" id="waDubai" target="_blank" rel="noopener"><b>Dubai WhatsApp</b><small>Deira office, UAE</small></a>
            <button class="wa-action" id="waPartFinder" type="button"><b>Part Finder</b><small>Machine model to right category</small></button>
            <a class="wa-action" href="quote.html"><b>Quote Form</b><small>Name, phone, machine model</small></a>
            <a class="wa-action" id="waCurrent" target="_blank" rel="noopener"><b>Send This Page</b><small>Ask about current product/page</small></a>
            <button class="wa-action" id="waCopy" type="button"><b>Copy Numbers</b><small>India and Dubai contacts</small></button>
          </div>
          <div class="wa-form">
            <input id="waName" placeholder="Your name">
            <input id="waPhone" placeholder="Phone number">
            <textarea id="waMessage" placeholder="Machine model and part needed"></textarea>
            <button class="wa-send" id="waSend" type="button">Send Message on WhatsApp</button>
            <div class="wa-note" id="waNote">Numbers copied.</div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(wrap);

    const panel = wrap.querySelector("#waPanel");
    const main = wrap.querySelector("#waMain");
    const close = wrap.querySelector("#waClose");
    const india = wrap.querySelector("#waIndia");
    const dubai = wrap.querySelector("#waDubai");
    const current = wrap.querySelector("#waCurrent");
    const send = wrap.querySelector("#waSend");
    const copy = wrap.querySelector("#waCopy");
    const note = wrap.querySelector("#waNote");
    const partFinder = wrap.querySelector("#waPartFinder");

    function refreshLinks() {
      india.href = waUrl(INDIA, "Hello MAK Overseas India, I need spare parts support.");
      dubai.href = waUrl(DUBAI, "Hello MAK Overseas Dubai, I need spare parts support.");
      current.href = waUrl(INDIA, pageMessage());
    }

    function applyLanguage() {
      wrap.querySelector("[data-wa-label]").textContent = t("Message Us", "راسلنا");
      wrap.querySelector("[data-wa-title]").textContent = t("How can we help?", "كيف نساعدك؟");
      wrap.querySelector("[data-wa-subtitle]").textContent = t("Choose a quick action or send a short enquiry.", "اختر إجراء سريعاً أو أرسل استفساراً قصيراً.");
    }

    main.addEventListener("click", () => {
      panel.classList.toggle("open");
      refreshLinks();
      applyLanguage();
    });
    close.addEventListener("click", () => panel.classList.remove("open"));
    send.addEventListener("click", () => {
      const text = quoteMessage();
      const target = /dubai|uae|gulf|deira|export|international/i.test(text) ? DUBAI : INDIA;
      window.open(waUrl(target, text), "_blank", "noopener");
    });
    current.addEventListener("click", refreshLinks);
    partFinder.addEventListener("click", () => {
      panel.classList.remove("open");
      const finder = document.getElementById("partfinderLaunch");
      if (finder) finder.click();
      else window.location.href = "search.html";
    });
    copy.addEventListener("click", async () => {
      const text = `India: +91 94652 63877\nDubai: +971 52 535 5917`;
      try {
        await navigator.clipboard.writeText(text);
        note.style.display = "block";
        setTimeout(() => { note.style.display = "none"; }, 1800);
      } catch {
        window.prompt("Copy numbers", text);
      }
    });

    refreshLinks();
    applyLanguage();
    new MutationObserver(applyLanguage).observe(document.documentElement, { attributes: true, attributeFilter: ["lang", "dir"] });
  }

  document.addEventListener("DOMContentLoaded", () => {
    addStyles();
    build();
  });
})();
