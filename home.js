(function () {
  const products = window.MAK_PRODUCTS || [];
  const categories = window.MAK_CATEGORIES || [];
  const heads = window.MAK_HEAD_CATEGORIES || [];
  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s || "").replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]));
  const normalize = value => String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  const cleanParts = p => (p.partNumbers || []).filter(x => x && x !== "On request");

  function productText(p) {
    return [p.name, p.code, cleanParts(p).join(" "), p.material, p.headCategory, p.category, p.subcategory, p.brandGroup, p.application, p.desc].join(" ").toLowerCase();
  }

  function matches(p, q) {
    const raw = q.trim().toLowerCase();
    if (!raw) return false;
    const text = productText(p);
    const compact = normalize(text);
    return raw.split(/\s+/).every(term => text.includes(term) || compact.includes(normalize(term)));
  }

  function productUrl(p) {
    return p.detailPage || p.page || "search.html";
  }

  function productCard(p) {
    const parts = cleanParts(p).join(", ") || "Available on request";
    return `<article class="product-card reveal">
      <a class="media" href="${esc(productUrl(p))}"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"></a>
      <div class="body">
        <div class="tag">${esc(p.headCategory || p.category || "MAK Product")}</div>
        <h3>${esc(p.name)}</h3>
        <div class="pn"><b>OEM / Ref:</b> ${esc(parts)}</div>
        <div class="meta">${p.code ? `<b>MAK code:</b> ${esc(p.code)}<br>` : ""}${p.application ? `<b>Application:</b> ${esc(p.application)}` : esc(p.material || "Specification on request")}</div>
        <div class="card-actions">
          <button class="small-btn orange" data-add="${esc(p.id)}">Add to Cart</button>
          <a class="small-btn" href="${esc(productUrl(p))}">View Product</a>
        </div>
      </div>
    </article>`;
  }

  function renderCategories() {
    const box = $("#homeCategories");
    if (!box) return;
    const fallback = [
      { title: "MAK Filters", slug: "mak-filters", summary: "Filters for JCB, Komatsu, Tata and Ashok Leyland applications." },
      { title: "MAK Fasteners", slug: "mak-fasteners", summary: "Wheel bolts, hub bolts, tooth bolts, U-bolts and equipment fasteners." },
      { title: "MAK Bushes", slug: "mak-bushes", summary: "Bushes, pins, sleeves and precision wear components." },
      { title: "MAK Lights", slug: "mak-lights", summary: "Working lights, front lights, rear lights and electrical lighting parts." },
      { title: "MAK Truck Parts", slug: "mak-truck-parts", summary: "Commercial vehicle and truck aftermarket components." }
    ];
    const items = heads.length ? heads : fallback;
    box.innerHTML = items.map(head => {
      const sub = categories.find(c => c.headSlug === head.slug) || categories.find(c => (c.headCategory || c.headTitle) === head.title) || {};
      const href = head.slug === "mak-filters" ? "filters.html" : (head.slug === "mak-fasteners" ? "bolts.html" : (head.slug === "mak-bushes" ? "bushes.html" : (head.slug === "mak-lights" ? "electricals.html" : (head.slug === "mak-truck-parts" ? "truck-car-parts.html" : "products.html"))));
      return `<a class="category-card reveal" href="${href}">
        <img src="${esc(sub.image || "web-products/jcb-spare-parts-catalogue.jpg")}" alt="${esc(head.title)}" loading="lazy">
        <small class="tag">${esc(head.count || sub.count || "")} products</small>
        <h3>${esc(head.title)}</h3>
        <p>${esc(head.summary || sub.summary || "Browse MAK Overseas product division.")}</p>
        <span>Explore division</span>
      </a>`;
    }).join("");
  }

  function renderPopular() {
    const box = $("#popularProducts");
    if (!box) return;
    const wanted = ["filter", "bolt", "bush", "light", "hub", "jcb", "komatsu", "truck"];
    const picked = [];
    wanted.forEach(term => {
      const item = products.find(p => !picked.includes(p) && productText(p).includes(term));
      if (item) picked.push(item);
    });
    products.slice(0, 30).forEach(p => { if (picked.length < 8 && !picked.includes(p)) picked.push(p); });
    box.innerHTML = picked.slice(0, 8).map(productCard).join("");
  }

  function renderGallery() {
    const box = $("#galleryGrid");
    if (!box) return;
    const chosen = products.filter(p => p.image).slice(0, 8);
    box.innerHTML = chosen.map(p => `<a class="gallery-card reveal" href="${esc(productUrl(p))}"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"><strong>${esc(p.name)}</strong></a>`).join("");
  }

  function renderSearch(q) {
    const box = $("#homeResults");
    if (!box) return;
    if (!q.trim()) {
      box.innerHTML = "";
      return;
    }
    const found = products.filter(p => matches(p, q)).slice(0, 6);
    box.innerHTML = found.map(p => {
      const parts = cleanParts(p).join(", ") || p.code || "View details";
      return `<div class="home-result">
        <img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy">
        <div><strong>${esc(p.name)}</strong><small>${esc(parts)}</small></div>
        <a href="${esc(productUrl(p))}">Open</a>
      </div>`;
    }).join("") || '<div class="home-result"><div></div><div><strong>No exact result</strong><small>Open the full catalogue search and try product name, code or application.</small></div><a href="search.html">Search</a></div>';
  }

  function attachReveal() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
  }

  function initSearch() {
    const form = $("#heroSearchForm");
    const input = $("#heroSearch");
    input?.addEventListener("input", e => renderSearch(e.target.value));
    form?.addEventListener("submit", e => {
      e.preventDefault();
      const q = input.value.trim();
      location.href = q ? `search.html?q=${encodeURIComponent(q)}` : "search.html";
    });
    $("#openSearch")?.addEventListener("click", () => input?.focus());
  }

  function initMobileMenu() {
    $("#menuToggle")?.addEventListener("click", () => $("#navLinks")?.classList.toggle("open"));
  }

  function closeDropdowns(except) {
    document.querySelectorAll(".nav-drop.open").forEach(drop => {
      if (drop === except) return;
      drop.classList.remove("open");
      drop.querySelector(".nav-link")?.setAttribute("aria-expanded", "false");
    });
  }

  function initDropdowns() {
    document.querySelectorAll(".nav-drop > .nav-link").forEach(link => {
      const drop = link.closest(".nav-drop");
      if (!drop?.querySelector(".drop-panel")) return;
      link.setAttribute("aria-haspopup", "true");
      link.setAttribute("aria-expanded", "false");
      link.addEventListener("click", event => {
        event.preventDefault();
        const open = !drop.classList.contains("open");
        closeDropdowns(drop);
        drop.classList.toggle("open", open);
        link.setAttribute("aria-expanded", String(open));
      });
    });
    document.addEventListener("click", event => {
      if (!event.target.closest(".nav-drop")) closeDropdowns();
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeDropdowns();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderCategories();
    renderPopular();
    renderGallery();
    initSearch();
    initMobileMenu();
    initDropdowns();
    attachReveal();
    $("#homeHero")?.classList.add("visible");
  });
})();
