(function () {
  const INDIA = "919465263877";
  const DUBAI = "971525355917";
  const categories = [
    { keys: ["bolt", "fastener", "hub", "wheel", "track", "cutter bolt", "teeth bolt"], page: "bolts.html", label: "Bolts & Fasteners" },
    { keys: ["bush", "pin", "sleeve", "pivot"], page: "bushes.html", label: "Pins & Bushes" },
    { keys: ["tooth", "teeth", "cutter", "bucket", "side cutter", "crocodile"], page: "jcb-teeth.html", label: "JCB Teeth & Cutters" },
    { keys: ["filter", "oil filter", "air filter", "fuel"], page: "filters.html", label: "Filters" },
    { keys: ["gear", "planetary", "sun gear", "sprocket", "shaft", "carrier"], page: "gears.html", label: "Gear Components" },
    { keys: ["tyre", "tire", "forklift", "backhoe tyre"], page: "tyres.html", label: "Tyres" },
    { keys: ["lamp", "light", "switch", "meter", "headlamp", "tail"], page: "electricals.html", label: "Electricals & Lighting" },
    { keys: ["seal", "gasket", "washer", "friction", "hub repair"], page: "seals-gaskets.html", label: "Seals & Gaskets" },
    { keys: ["grease", "jack", "spanner", "tool", "nozzle"], page: "tools-accessories.html", label: "Tools & Accessories" },
    { keys: ["truck", "canter", "car", "bracket", "rotor", "battery"], page: "truck-car-parts.html", label: "Truck & Car Parts" }
  ];

  function matchCategory(text) {
    const q = text.toLowerCase();
    return categories.find(c => c.keys.some(k => q.includes(k))) || categories[0];
  }

  function phoneFor(text) {
    return /dubai|uae|gulf|deira|export|international/i.test(text) ? DUBAI : INDIA;
  }

  function addStyles() {
    if (document.getElementById("partfinder-style")) return;
    const style = document.createElement("style");
    style.id = "partfinder-style";
    style.textContent = `
      .partfinder-launch{position:fixed;left:1.5rem;bottom:1.5rem;z-index:190;border:1px solid rgba(212,137,10,.55);background:#111;color:#fff;border-radius:999px;padding:.82rem 1rem;font-family:var(--H,Arial);font-weight:900;letter-spacing:1px;text-transform:uppercase;box-shadow:0 14px 36px rgba(0,0,0,.38);cursor:pointer}
      .partfinder-launch span{color:var(--gold,#D4890A)}
      .partfinder-panel{position:fixed;left:1.5rem;bottom:5rem;z-index:280;width:min(380px,calc(100% - 2rem));background:#111;border:1px solid #333;box-shadow:0 22px 60px rgba(0,0,0,.5);display:none}
      .partfinder-panel.open{display:block}
      .pf-head{display:flex;align-items:center;justify-content:space-between;padding:1rem;border-bottom:1px solid #2b2b2b}
      .pf-head strong{font-family:var(--H,Arial);font-size:1.25rem;text-transform:uppercase;letter-spacing:1px}
      .pf-close{background:transparent;border:0;color:#fff;font-size:1.5rem;cursor:pointer}
      .pf-body{padding:1rem;display:grid;gap:.75rem}.pf-body label{font-size:.74rem;text-transform:uppercase;letter-spacing:1.5px;color:#aaa;font-weight:800}
      .pf-body input,.pf-body textarea{width:100%;padding:.8rem;background:#fff;color:#111;border:0}.pf-body textarea{min-height:92px;resize:vertical}
      .pf-result{display:none;background:#1b1b1b;border:1px solid #303030;padding:.85rem;color:#c8d0d8;font-size:.86rem}.pf-result strong{color:var(--gold,#D4890A)}
      .pf-actions{display:flex;gap:.5rem;flex-wrap:wrap}.pf-actions a,.pf-actions button{flex:1;border:0;padding:.78rem .8rem;font-family:var(--H,Arial);font-weight:900;letter-spacing:1px;text-transform:uppercase;cursor:pointer;text-align:center}
      .pf-primary{background:#25D366;color:#fff}.pf-secondary{background:transparent;color:#fff;border:1px solid #444!important}
      html[dir="rtl"] .partfinder-launch{left:auto;right:1.5rem}html[dir="rtl"] .partfinder-panel{left:auto;right:1.5rem}
      @media(max-width:820px){.partfinder-launch{left:1rem;bottom:1rem;padding:.75rem .9rem}.partfinder-panel{left:1rem;bottom:4.5rem}}
    `;
    document.head.appendChild(style);
  }

  function build() {
    if (document.getElementById("partfinderPanel")) return;
    const launch = document.createElement("button");
    launch.className = "partfinder-launch";
    launch.innerHTML = '<span>Part</span> Finder';
    launch.type = "button";
    launch.id = "partfinderLaunch";
    const panel = document.createElement("div");
    panel.className = "partfinder-panel";
    panel.id = "partfinderPanel";
    panel.innerHTML = `
      <div class="pf-head"><strong>WhatsApp Part Finder</strong><button class="pf-close" type="button" aria-label="Close">&times;</button></div>
      <div class="pf-body">
        <label for="pfMachine">Machine model</label>
        <input id="pfMachine" placeholder="Example: JCB 3CX, CAT 320D">
        <label for="pfNeed">Part needed</label>
        <textarea id="pfNeed" placeholder="Example: rear hub bolt, teeth cutter bolt, air filter"></textarea>
        <div class="pf-result" id="pfResult"></div>
        <div class="pf-actions">
          <a class="pf-primary" id="pfWhatsApp" href="https://wa.me/${INDIA}" target="_blank" rel="noopener">WhatsApp</a>
          <a class="pf-secondary" id="pfCategory" href="products.html">View Category</a>
        </div>
      </div>`;
    document.body.append(launch, panel);
    const machine = panel.querySelector("#pfMachine");
    const need = panel.querySelector("#pfNeed");
    const result = panel.querySelector("#pfResult");
    const wa = panel.querySelector("#pfWhatsApp");
    const cat = panel.querySelector("#pfCategory");
    function update() {
      const text = `${machine.value} ${need.value}`;
      const matched = matchCategory(text);
      const phone = phoneFor(text);
      const msg = `Hello MAK Overseas, I need help finding a part.%0A%0AMachine model: ${encodeURIComponent(machine.value || "Not specified")}%0APart needed: ${encodeURIComponent(need.value || "Not specified")}%0ASuggested category: ${encodeURIComponent(matched.label)}`;
      wa.href = `https://wa.me/${phone}?text=${msg}`;
      cat.href = matched.page;
      result.style.display = "block";
      result.innerHTML = `Suggested: <strong>${matched.label}</strong><br>Routing to: <strong>${phone === DUBAI ? "Dubai Office" : "India Office"}</strong>`;
    }
    machine.addEventListener("input", update);
    need.addEventListener("input", update);
    launch.addEventListener("click", () => { panel.classList.toggle("open"); update(); });
    panel.querySelector(".pf-close").addEventListener("click", () => panel.classList.remove("open"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    addStyles();
    build();
  });
})();
