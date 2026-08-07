(function () {
  const INDIA = "919465263877";
  const DUBAI = "971525355917";
  const EMAIL = "kunalkhurana@makoverseas.com";

  const intents = [
    { id: "price", label: "Request Quote", ar: "طلب عرض سعر", keys: ["quote", "enquiry", "availability", "amount", "rs", "aed"] },
    { id: "machine", label: "Search by Machine", ar: "بحث حسب المعدة", keys: ["jcb", "cat", "komatsu", "volvo", "hyundai", "machine", "model", "3cx", "320d"] },
    { id: "photo", label: "Send Photo Enquiry", ar: "استفسار بالصورة", keys: ["photo", "image", "picture", "identify", "old part"] },
    { id: "bulk", label: "Bulk / Dealer Inquiry", ar: "جملة / تاجر", keys: ["bulk", "dealer", "wholesale", "export", "container", "quantity", "distributor"] }
  ];

  const categories = [
    { label: "Bolts & Fasteners", page: "bolts.html", keys: ["bolt", "fastener", "hub", "wheel", "track shoe", "cutter bolt", "teeth bolt", "u-bolt"] },
    { label: "Pins & Bushes", page: "bushes.html", keys: ["bush", "pin", "sleeve", "pivot", "bronze"] },
    { label: "JCB Teeth & Cutters", page: "jcb-teeth.html", keys: ["tooth", "teeth", "bucket", "cutter", "side cutter", "crocodile"] },
    { label: "Filters", page: "filters.html", keys: ["filter", "oil filter", "air filter", "fuel filter"] },
    { label: "Gear Components", page: "gears.html", keys: ["gear", "planetary", "sun gear", "sprocket", "shaft", "carrier"] },
    { label: "Tyres", page: "tyres.html", keys: ["tyre", "tire", "forklift", "backhoe tyre", "truck tyre"] },
    { label: "Electricals & Lighting", page: "electricals.html", keys: ["lamp", "light", "switch", "meter", "headlamp", "tail lamp"] },
    { label: "Seals & Gaskets", page: "seals-gaskets.html", keys: ["seal", "gasket", "washer", "friction", "hub repair"] },
    { label: "Tools & Accessories", page: "tools-accessories.html", keys: ["grease", "jack", "spanner", "tool", "nozzle"] },
    { label: "Truck & Car Parts", page: "truck-car-parts.html", keys: ["truck", "canter", "car", "rotor", "battery", "bracket"] }
  ];

  function isArabic() {
    return document.documentElement.lang === "ar" || document.documentElement.dir === "rtl";
  }

  function t(en, ar) {
    return isArabic() ? ar : en;
  }

  function normalize(value) {
    return (value || "").toLowerCase();
  }

  function clean(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function pageProduct() {
    const card = document.querySelector(".name")?.textContent;
    const h1 = document.querySelector("h1")?.textContent;
    const title = document.title.replace(/\s*[-|]\s*MAK Overseas.*/i, "");
    return clean(card || h1 || title || "spare part");
  }

  function detectIntent(text) {
    const q = normalize(text);
    return intents.find(intent => intent.keys.some(key => q.includes(key))) || intents[0];
  }

  function detectCategory(text) {
    const q = normalize(text);
    return categories.find(cat => cat.keys.some(key => q.includes(key))) || categories.find(cat => q.includes("jcb")) || categories[0];
  }

  function phoneFor(text, intent) {
    const q = normalize(`${text} ${intent.id}`);
    return /dubai|uae|gulf|deira|export|international|bulk|dealer|wholesale|container/.test(q) ? DUBAI : INDIA;
  }

  function waUrl(phone, message) {
    return `https://wa.me/${phone}?text=${encodeURIComponent(message || "Hello MAK Overseas, I need help with heavy machinery spare parts.")}`;
  }

  function emailUrl(message) {
    return `mailto:${EMAIL}?subject=${encodeURIComponent("MAK Overseas product enquiry")}&body=${encodeURIComponent(message || "Hello MAK Overseas, I need help with heavy machinery spare parts.")}`;
  }

  function buildMessage(intent, category, form) {
    const product = form.part || pageProduct() || "[product name]";
    const lines = [];
    if (intent.id === "price") lines.push(`Hello MAK Overseas, I want a quote for ${product}.`);
    if (intent.id === "machine") lines.push("Hello MAK Overseas, I want to search parts by machine.");
    if (intent.id === "photo") lines.push("Hello MAK Overseas, I want to send a photo enquiry for a spare part.");
    if (intent.id === "bulk") lines.push("Hello MAK Overseas, I want to discuss a bulk / dealer inquiry.");
    lines.push(`Suggested category: ${category.label}`);
    if (form.machine) lines.push(`Machine model: ${form.machine}`);
    if (form.part && intent.id !== "price") lines.push(`Part needed: ${form.part}`);
    if (form.qty) lines.push(`Quantity: ${form.qty}`);
    if (form.location) lines.push(`Location: ${form.location}`);
    if (form.notes) lines.push(`Details: ${form.notes}`);
    if (intent.id === "photo") lines.push("I will share the part photo here on WhatsApp.");
    lines.push(`Page: ${window.location.href}`);
    return lines.filter(Boolean).join("\n");
  }

  function addStyles() {
    if (document.getElementById("wa-ai-style")) return;
    const style = document.createElement("style");
    style.id = "wa-ai-style";
    style.textContent = `
      .wa-float{display:none!important}
      .wa-ai{position:fixed;right:1.35rem;bottom:1.35rem;z-index:330;font-family:var(--B,Arial),sans-serif}
      .wa-ai::before{content:"";position:absolute;inset:-7px;border-radius:999px;background:rgba(37,211,102,.2);animation:waPulse 2.2s infinite;pointer-events:none}
      .wa-ai-main{height:62px;min-width:62px;max-width:62px;border:2px solid rgba(255,255,255,.82);border-radius:999px;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:flex-start;gap:.7rem;padding:0 18px;overflow:hidden;box-shadow:0 18px 48px rgba(0,0,0,.44);cursor:pointer;transition:max-width .28s ease,background .2s,transform .2s,border-color .2s;position:relative}
      .wa-ai:hover .wa-ai-main,.wa-ai-main:focus-visible{max-width:270px;background:#128C7E;transform:translateY(-2px);border-color:#25D366}
      .wa-ai-main svg{min-width:30px;width:30px;height:30px;fill:#fff}.wa-ai-main span{white-space:nowrap;font-family:var(--H,Arial);font-size:.95rem;font-weight:900;letter-spacing:1px;text-transform:uppercase;opacity:0;transform:translateX(8px);transition:.22s}
      .wa-ai:hover .wa-ai-main span,.wa-ai-main:focus-visible span{opacity:1;transform:translateX(0)}
      .wa-ai-chip{position:absolute;right:0;bottom:67px;background:#111;color:#dfe8ee;border:1px solid #303030;padding:.5rem .68rem;box-shadow:0 12px 30px rgba(0,0,0,.34);font-size:.78rem;white-space:nowrap}.wa-ai-chip b{color:#25D366}
      .wa-ai-panel{position:absolute;right:0;bottom:4.55rem;width:min(430px,calc(100vw - 2rem));background:#101010;border:1px solid #303030;box-shadow:0 24px 70px rgba(0,0,0,.55);opacity:0;pointer-events:none;transform:translateY(12px) scale(.98);transition:.22s}
      .wa-ai-panel.open{opacity:1;pointer-events:auto;transform:translateY(0) scale(1)}
      .wa-ai-head{display:flex;justify-content:space-between;gap:1rem;padding:1rem;border-bottom:1px solid #292929;background:linear-gradient(135deg,#111,#171717)}
      .wa-ai-head strong{display:block;font-family:var(--H,Arial);font-size:1.32rem;line-height:1;text-transform:uppercase;letter-spacing:1px;color:#fff}.wa-ai-head small{display:block;color:#9da7af;margin-top:.38rem;line-height:1.35}.wa-ai-close{background:transparent;color:#fff;border:0;font-size:1.5rem;line-height:1;cursor:pointer}
      .wa-ai-body{padding:1rem;display:grid;gap:.75rem}.wa-ai-chips{display:grid;grid-template-columns:1fr 1fr;gap:.5rem}.wa-ai-option{border:1px solid #333;background:#1a1a1a;color:#fff;padding:.72rem;text-align:left;cursor:pointer;transition:.2s}.wa-ai-option:hover,.wa-ai-option.active{border-color:#25D366;background:#202820;transform:translateY(-1px)}.wa-ai-option b{display:block;font-family:var(--H,Arial);font-size:.98rem;text-transform:uppercase;letter-spacing:1px}.wa-ai-option small{display:block;color:#9da7af;margin-top:.15rem;line-height:1.25}
      .wa-ai-grid{display:grid;grid-template-columns:1fr 1fr;gap:.55rem}.wa-ai-grid .full{grid-column:1/-1}.wa-ai input,.wa-ai textarea{width:100%;border:0;background:#fff;color:#111;padding:.78rem;font-family:var(--B,Arial)}.wa-ai textarea{min-height:76px;resize:vertical}
      .wa-ai-result{background:#181818;border:1px solid #303030;color:#cfd7dd;padding:.78rem;font-size:.86rem}.wa-ai-result strong{color:#25D366}.wa-ai-actions{display:grid;grid-template-columns:1fr 1fr 1fr;gap:.55rem}.wa-ai-send,.wa-ai-link{border:0;padding:.82rem;font-family:var(--H,Arial);font-weight:900;letter-spacing:1px;text-transform:uppercase;cursor:pointer;text-align:center}.wa-ai-send{background:#25D366;color:#fff}.wa-ai-link{background:rgba(212,137,10,.13);border:1px solid rgba(212,137,10,.45);color:var(--gold,#D4890A)}.wa-ai-email{background:#fff;color:#111;border-color:#fff}
      html[dir="rtl"] .wa-ai{right:auto;left:1.35rem}html[dir="rtl"] .wa-ai-panel{right:auto;left:0}html[dir="rtl"] .wa-ai-chip{right:auto;left:0}html[dir="rtl"] .wa-ai-option{text-align:right}
      @keyframes waPulse{0%,100%{transform:scale(.96);opacity:.65}50%{transform:scale(1.12);opacity:.15}}
      @media(max-width:820px){.wa-ai{right:1rem;bottom:1rem}.wa-ai-panel{bottom:4.4rem}.wa-ai-main{max-width:210px}.wa-ai-main span{opacity:1;transform:none}.wa-ai-chip{display:none}.wa-ai-chips,.wa-ai-grid,.wa-ai-actions{grid-template-columns:1fr}}
    `;
    document.head.appendChild(style);
  }

  function build() {
    document.querySelectorAll(".wa-float").forEach(el => el.remove());
    if (document.getElementById("waAiWidget")) return;
    const wrap = document.createElement("div");
    wrap.className = "wa-ai";
    wrap.id = "waAiWidget";
    wrap.innerHTML = `
      <button class="wa-ai-main" id="waAiMain" type="button" aria-label="Open WhatsApp assistant">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.99 2C6.473 2 2 6.473 2 11.99c0 1.89.522 3.657 1.432 5.17L2 22l4.967-1.41A9.94 9.94 0 0011.99 22C17.507 22 22 17.527 22 12.01 22 6.493 17.507 2 11.99 2z"/></svg>
        <span>AI WhatsApp Help</span>
      </button>
      <div class="wa-ai-chip"><b>Online</b> - Quick part help</div>
      <div class="wa-ai-panel" id="waAiPanel">
        <div class="wa-ai-head"><div><strong>AI WhatsApp assistant</strong><small>Type machine or part details. We prepare the right WhatsApp enquiry.</small></div><button class="wa-ai-close" id="waAiClose" type="button">&times;</button></div>
        <div class="wa-ai-body">
          <div class="wa-ai-chips" id="waAiOptions"></div>
          <div class="wa-ai-grid">
            <input id="aiMachine" placeholder="Machine model: JCB 3CX, CAT 320D">
            <input id="aiPart" placeholder="Product / part name">
            <input id="aiQty" placeholder="Quantity">
            <input id="aiLocation" placeholder="City / country">
            <textarea class="full" id="aiNotes" placeholder="Part number, old part details, bulk/dealer need, photo note..."></textarea>
          </div>
          <div class="wa-ai-result" id="waAiResult"></div>
          <div class="wa-ai-actions">
            <button class="wa-ai-send" id="waAiSend" type="button">Send to WhatsApp</button>
            <a class="wa-ai-link wa-ai-email" id="waAiEmail" href="mailto:kunalkhurana@makoverseas.com">Email</a>
            <a class="wa-ai-link" id="waAiCategory" href="search.html">Open category</a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(wrap);

    const panel = wrap.querySelector("#waAiPanel");
    const main = wrap.querySelector("#waAiMain");
    const close = wrap.querySelector("#waAiClose");
    const optionsBox = wrap.querySelector("#waAiOptions");
    const result = wrap.querySelector("#waAiResult");
    const send = wrap.querySelector("#waAiSend");
    const email = wrap.querySelector("#waAiEmail");
    const categoryLink = wrap.querySelector("#waAiCategory");
    let activeIntent = intents[0];

    function form() {
      return {
        machine: clean(wrap.querySelector("#aiMachine").value),
        part: clean(wrap.querySelector("#aiPart").value),
        qty: clean(wrap.querySelector("#aiQty").value),
        location: clean(wrap.querySelector("#aiLocation").value),
        notes: clean(wrap.querySelector("#aiNotes").value)
      };
    }

    function allText() {
      const f = form();
      return `${activeIntent.id} ${f.machine} ${f.part} ${f.qty} ${f.location} ${f.notes} ${pageProduct()}`;
    }

    function update() {
      const f = form();
      const guessedIntent = detectIntent(allText());
      if (!optionsBox.querySelector(".active")) activeIntent = guessedIntent;
      const cat = detectCategory(allText());
      const phone = phoneFor(allText(), activeIntent);
      categoryLink.href = cat.page;
      email.href = emailUrl(buildMessage(activeIntent, cat, f));
      result.innerHTML = `Suggested: <strong>${cat.label}</strong><br>Intent: <strong>${activeIntent.label}</strong><br>Routing: <strong>${phone === DUBAI ? "Dubai Office" : "India Office"}</strong>`;
    }

    function drawOptions() {
      optionsBox.innerHTML = intents.map(intent => `<button class="wa-ai-option ${intent.id === activeIntent.id ? "active" : ""}" type="button" data-intent="${intent.id}"><b>${t(intent.label, intent.ar)}</b><small>${hint(intent.id)}</small></button>`).join("");
      optionsBox.querySelectorAll("[data-intent]").forEach(btn => {
        btn.addEventListener("click", () => {
          activeIntent = intents.find(intent => intent.id === btn.dataset.intent) || intents[0];
          drawOptions();
          update();
        });
      });
    }

    function hint(id) {
      if (id === "price") return t("Quote for selected product", "عرض للمنتج المحدد");
      if (id === "machine") return t("JCB, CAT, Komatsu search", "بحث JCB و CAT و Komatsu");
      if (id === "photo") return t("Open WhatsApp for photo", "فتح واتساب للصورة");
      return t("Dealer, export, quantity", "تاجر، تصدير، كمية");
    }

    function openPanel() {
      panel.classList.toggle("open");
      if (panel.classList.contains("open")) {
        const part = wrap.querySelector("#aiPart");
        if (!part.value) part.value = pageProduct();
        drawOptions();
        update();
      }
    }

    main.addEventListener("click", openPanel);
    close.addEventListener("click", () => panel.classList.remove("open"));
    wrap.querySelectorAll("input,textarea").forEach(el => el.addEventListener("input", update));
    send.addEventListener("click", () => {
      const cat = detectCategory(allText());
      const msg = buildMessage(activeIntent, cat, form());
      window.open(waUrl(phoneFor(allText(), activeIntent), msg), "_blank", "noopener");
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") panel.classList.remove("open"); });
    drawOptions();
    update();
  }

  document.addEventListener("DOMContentLoaded", () => {
    addStyles();
    build();
  });
})();
