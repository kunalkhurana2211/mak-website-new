(function () {
  const site = window.MAK_SITE || {};
  const PHONE = site.phones?.indiaWhatsapp || "919465263877";
  const DUBAI_PHONE = site.phones?.dubaiWhatsapp || "971525355917";
  const EMAIL = site.emails?.primary || "kunalkhurana@makoverseas.com";
  const products = window.MAK_PRODUCTS || [];
  const categories = window.MAK_CATEGORIES || [];
  const headCategories = window.MAK_HEAD_CATEGORIES || [];
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = s => String(s || "").replace(/[&<>'"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[c]));
  const storageKey = "makClaudeCart";
  const inSubdir = /\/(product-pages|brands)\//.test(location.pathname.replace(/\\/g, "/"));
  const rootPrefix = inSubdir ? "../" : "";

  let cart = normalizeCart(JSON.parse(localStorage.getItem(storageKey) || "[]"));

  function rootUrl(url) {
    if (!url || /^(https?:|mailto:|tel:|#|\/)/i.test(url) || url.startsWith("../")) return url;
    return rootPrefix + url;
  }

  function langText(item, field) {
    return window.MAKLanguage?.productText?.(item, field) || item?.[field] || "";
  }

  function categoryText(item, field) {
    return window.MAKLanguage?.categoryText?.(item, field) || item?.[field] || "";
  }

  function cleanPartNumbers(parts) {
    return (parts || []).filter(x => x && x !== "On request");
  }

  function productLabel(p) {
    const pn = cleanPartNumbers(p.partNumbers).join(", ");
    const name = langText(p, "name") || p.name;
    return pn ? `${name} (${pn})` : name;
  }

  function productFromId(id) {
    return products.find(x => x.id === id);
  }

  function normalizeCart(rawCart) {
    return (rawCart || []).map(item => {
      const p = item.id ? productFromId(item.id) : null;
      return {
        id: item.id || "",
        title: item.title || (p ? langText(p, "name") || p.name : "Product"),
        image: item.image || p?.image || "",
        code: item.code || p?.code || "",
        partNumbers: item.partNumbers || p?.partNumbers || [],
        qty: Math.max(1, Number(item.qty) || 1),
        notes: item.notes || ""
      };
    });
  }

  function cartItemFromProduct(p) {
    return {
      id: p.id,
      title: langText(p, "name") || p.name,
      image: p.image || "",
      code: p.code || "",
      partNumbers: p.partNumbers || [],
      qty: 1,
      notes: ""
    };
  }

  function save() {
    localStorage.setItem(storageKey, JSON.stringify(cart));
    renderCart();
    updateCount();
  }

  function updateCount() {
    const count = cart.reduce((s, i) => s + (Number(i.qty) || 0), 0);
    $$(".cart-count").forEach(el => { el.textContent = count; });
  }

  function openCart() {
    $("#cartPanel")?.classList.add("open");
  }

  function addToCart(id) {
    const p = productFromId(id) || { id, name: id, partNumbers: [] };
    const item = cart.find(i => i.id === id);
    if (item) item.qty += 1;
    else cart.push(cartItemFromProduct(p));
    save();
    openCart();
  }

  function enquiryMessageForProduct(id) {
    const p = productFromId(id);
    const title = p ? langText(p, "name") || p.name : id;
    const parts = p ? cleanPartNumbers(p.partNumbers).join(", ") : "";
    const code = p?.code || "";
    return [
      "Hello MAK Overseas, I need a B2B quotation for:",
      `Product: ${title}`,
      parts ? `OEM/reference part number: ${parts}` : "",
      code ? `MAK code: ${code}` : "",
      "Quantity:",
      "Machine / application:",
      "Delivery country:",
      `Page: ${location.href}`
    ].filter(Boolean).join("\n");
  }

  function enquire(id) {
    window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(enquiryMessageForProduct(id))}`, "_blank", "noopener");
  }

  function emailEnquire(id) {
    const p = productFromId(id);
    const title = p ? langText(p, "name") || p.name : id;
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("B2B product enquiry - " + title)}&body=${encodeURIComponent(enquiryMessageForProduct(id))}`;
  }

  function cartLines() {
    return cart.map((item, n) => {
      const parts = cleanPartNumbers(item.partNumbers).join(", ") || "Available on request";
      return [
        `${n + 1}. ${item.title}`,
        `   OEM/reference part number: ${parts}`,
        item.code ? `   MAK code: ${item.code}` : "",
        `   Quantity: ${item.qty}`,
        item.notes ? `   Notes: ${item.notes}` : ""
      ].filter(Boolean).join("\n");
    }).join("\n\n");
  }

  function sendCartWhatsApp(phone = PHONE) {
    if (!cart.length) return;
    const msg = [
      "Hello MAK Overseas, please quote the following cart requirements:",
      "",
      cartLines(),
      "",
      "Company name:",
      "Contact person:",
      "Country / delivery location:",
      "WhatsApp / phone:",
      "Email:"
    ].join("\n");
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  function requestQuotation() {
    sessionStorage.setItem("makQuoteCart", JSON.stringify(cart));
    location.href = rootUrl("quote.html");
  }

  function sendCartEmail() {
    if (!cart.length) return;
    const body = [
      "Hello MAK Overseas,",
      "",
      "Please quote the following cart requirements:",
      "",
      cartLines(),
      "",
      "Company name:",
      "Contact person:",
      "Country / delivery location:",
      "WhatsApp / phone:",
      "Email:"
    ].join("\n");
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("MAK Overseas B2B cart quotation")}&body=${encodeURIComponent(body)}`;
  }

  function renderCart() {
    const box = $("#cartItems");
    if (!box) return;
    box.innerHTML = cart.length ? cart.map((i, idx) => {
      const parts = cleanPartNumbers(i.partNumbers).join(", ") || "Available on request";
      return `<div class="cart-item b2b-cart-item">
        <img class="cart-thumb" src="${esc(rootUrl(i.image || "web-products/mak-logo-small.webp"))}" alt="${esc(i.title)}" loading="lazy">
        <div class="cart-copy">
          <strong>${esc(i.title)}</strong>
          <small><b>Part No:</b> ${esc(parts)}</small>
          ${i.code ? `<small><b>MAK code:</b> ${esc(i.code)}</small>` : ""}
          <div class="qty" aria-label="Quantity">
            <button data-qty="down" data-index="${idx}" aria-label="Decrease quantity">-</button>
            <input class="cart-qty-input" data-cart-qty="${idx}" value="${esc(i.qty)}" inputmode="numeric" aria-label="Quantity">
            <button data-qty="up" data-index="${idx}" aria-label="Increase quantity">+</button>
          </div>
          <textarea class="cart-note" data-note="${idx}" placeholder="Buyer notes: grade, finish, packing, delivery..." aria-label="Notes">${esc(i.notes)}</textarea>
        </div>
        <button class="close cart-remove" data-remove="${idx}" aria-label="Remove product">&times;</button>
      </div>`;
    }).join("") : '<p class="notice" style="margin:1rem">Your cart is empty. Add products to build a B2B quotation requirement.</p>';
  }

  function normalizeSearch(value) {
    return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  }

  function searchableText(p) {
    return [
      p.name,
      p.code,
      (p.partNumbers || []).join(" "),
      p.material,
      p.category,
      p.headCategory,
      p.subcategory,
      p.brandGroup,
      p.filterType,
      p.application,
      p.boxDimension,
      p.notes,
      p.desc,
      p.source,
      window.MAKLanguage?.searchText?.(p)
    ].join(" ").toLowerCase();
  }

  function searchMatches(p, query) {
    const raw = query.trim().toLowerCase();
    if (!raw) return true;
    const text = searchableText(p);
    const compact = normalizeSearch(text);
    return raw.split(/\s+/).every(term => {
      const compactTerm = normalizeSearch(term);
      return text.includes(term) || (compactTerm && compact.includes(compactTerm));
    });
  }

  function searchText(p) {
    const base = searchableText(p);
    const extra = window.MAKLanguage?.searchText?.(p) || "";
    return `${base} ${extra} ${normalizeSearch(base)} ${normalizeSearch(extra)}`;
  }

  function partLine(p) {
    const parts = cleanPartNumbers(p.partNumbers).join(", ");
    return `<div class="part-line"><b>OEM / Ref No:</b> ${esc(parts || "Available on request")}</div>`;
  }

  function detailPage(p) {
    return rootUrl(p.detailPage || p.page || "search.html");
  }

  function productGroupLabel(p) {
    const head = p.headCategory || p.category || "";
    const sub = p.subcategory || "";
    return head && sub && head !== sub ? `${head} / ${sub}` : (head || sub || langText(p, "category"));
  }

  function categorySearchText(c) {
    return [c.title, c.summary, c.headTitle, c.headCategory, c.titleTh, c.summaryTh].join(" ").toLowerCase();
  }

  function productCard(p) {
    const code = p.code ? `<div><b>MAK code:</b> ${esc(p.code)}</div>` : "";
    const notes = p.notes ? `<div><b>Note:</b> ${esc(langText(p, "notes"))}</div>` : "";
    const subcategory = p.subcategory ? `<div><b>Subcategory:</b> ${esc(p.subcategory)}</div>` : "";
    const brand = p.brandGroup ? `<div><b>Brand / group:</b> ${esc(p.brandGroup)}</div>` : "";
    const application = p.application ? `<div><b>Application:</b> ${esc(p.application)}</div>` : "";
    const box = p.boxDimension ? `<div><b>Box / dimensions:</b> ${esc(p.boxDimension)}</div>` : "";
    return `<article class="card reveal" data-search="${esc(searchText(p))}">
      <a class="imgbox" href="${esc(detailPage(p))}"><img src="${esc(rootUrl(p.image))}" alt="${esc(langText(p, "name"))}" loading="lazy"></a>
      <div class="body">
        <div class="tag">${esc(productGroupLabel(p))}</div>
        <a class="name" href="${esc(detailPage(p))}">${esc(langText(p, "name"))}</a>
        ${partLine(p)}
        <div class="meta">${code}<div><b>Material:</b> ${esc(langText(p, "material") || "Available on request")}</div>${brand}${application}${box}${subcategory}${notes}</div>
        <p class="desc">${esc(langText(p, "desc"))}</p>
        <div class="actions">
          <button class="buy" data-add="${esc(p.id)}">Add to Cart</button>
          <a class="ghost" href="${esc(detailPage(p))}">View Product</a>
          <button class="whatsapp" data-enquire="${esc(p.id)}">WhatsApp</button>
          <button class="email" data-email="${esc(p.id)}">Email</button>
        </div>
      </div>
    </article>`;
  }

  function filterLogo(group) {
    if (/JCB/i.test(group)) return '<span class="brand-logo brand-logo-jcb">JCB</span>';
    if (/Komatsu/i.test(group)) return '<span class="brand-logo brand-logo-komatsu">KOMATSU</span>';
    if (/Tata|Ashok|Leyland|AL/i.test(group)) return '<span class="brand-logo brand-logo-tata">TATA</span><span class="brand-logo brand-logo-al">AL</span>';
    return '<span class="brand-logo brand-logo-mak">MAK</span>';
  }

  function filterGroupPage(group) {
    if (/JCB/i.test(group)) return rootUrl("jcb-filters.html");
    if (/Komatsu/i.test(group)) return rootUrl("komatsu-filters.html");
    if (/Tata|Ashok|Leyland/i.test(group)) return rootUrl("tata-leyland-filters.html");
    return rootUrl(`search.html?q=${encodeURIComponent(group)}`);
  }

  function filterGroupSection(group, list) {
    return `<section class="filter-brand-section reveal">
      <div class="filter-brand-head"><div><div class="filter-brand-logos">${filterLogo(group)}</div><h2>${esc(group)}</h2><p>${list.length} filter references. Search by part number, application, filter type or brand.</p></div><a class="ghost" href="${esc(filterGroupPage(group))}">Open ${esc(group)}</a></div>
      <div class="filter-product-grid">${list.map(productCard).join("")}</div>
    </section>`;
  }

  function categoryCard(c) {
    return `<article class="card category-card reveal" data-search="${esc(categorySearchText(c))}">
      <a class="imgbox" href="${esc(rootUrl(c.page))}"><img src="${esc(rootUrl(c.image))}" alt="${esc(categoryText(c, "title"))}" loading="lazy"></a>
      <div class="body"><div class="tag">${esc(c.headTitle || c.headCategory || "MAK Category")} - ${c.count} products</div><div class="name">${esc(categoryText(c, "title"))}</div><p class="desc">${esc(categoryText(c, "summary"))}</p><div class="actions"><a class="ghost" href="${esc(rootUrl(c.page))}">View Products</a></div></div>
    </article>`;
  }

  function headCategorySection(head) {
    const subs = categories.filter(c => c.headSlug === head.slug);
    return `<section class="head-category-section reveal" id="${esc(head.slug)}" data-search="${esc((head.title + " " + head.summary + " " + subs.map(categorySearchText).join(" ")).toLowerCase())}">
      <div class="head-card"><div><div class="tag">${esc(head.count || 0)} products - ${esc(head.subcategoryCount || subs.length)} subcategories</div><h2>${esc(head.title)}</h2><p>${esc(head.summary)}</p></div><a class="ghost" href="${rootUrl("search.html")}?q=${encodeURIComponent(head.title)}">Search ${esc(head.title)}</a></div>
      <div class="subcategory-grid">${subs.map(categoryCard).join("")}</div>
    </section>`;
  }

  function attachReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(el => el.classList.add("visible"));
      return;
    }
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }), { threshold: 0.12 });
    $$(".reveal").forEach(el => obs.observe(el));
  }

  function filterCards(q) {
    const raw = q.trim().toLowerCase();
    const compactTerm = normalizeSearch(raw);
    $$("[data-search]").forEach(card => {
      const text = card.dataset.search || "";
      const compact = normalizeSearch(text);
      card.style.display = !raw || text.includes(raw) || (compactTerm && compact.includes(compactTerm)) ? "flex" : "none";
    });
  }

  function drawProductsPage() {
    const grid = $("#categoryGrid");
    if (!grid) return;
    grid.classList.toggle("head-grid", !!headCategories.length);
    grid.innerHTML = (headCategories.length ? headCategories.map(headCategorySection).join("") : categories.map(categoryCard).join(""));
    const all = $("#allProductGrid");
    if (all) all.innerHTML = products.map(productCard).join("");
    $("#filterInput")?.addEventListener("input", e => filterCards(e.target.value));
    attachReveal();
    if (location.hash) setTimeout(() => $(location.hash)?.scrollIntoView({ block: "start" }), 80);
  }

  function drawCategoryPage() {
    const grid = $("#productGrid");
    if (!grid) return;
    const slug = grid.dataset.category;
    const brandGroup = grid.dataset.brandGroup;
    let list = products.filter(p => p.categorySlug === slug);
    if (brandGroup) list = list.filter(p => (p.brandGroup || "General Filters") === brandGroup);
    if ($("#itemCount")) $("#itemCount").textContent = `${list.length} products`;
    grid.classList.toggle("filter-grouped-grid", slug === "filters" && !brandGroup);
    if (slug === "filters" && !brandGroup) {
      const preferred = ["JCB Filters", "Komatsu Filters", "Tata & Ashok Leyland Filters", "General Filters"];
      const order = group => {
        const idx = preferred.indexOf(group);
        return idx === -1 ? preferred.length : idx;
      };
      const groups = [...new Set(list.map(p => p.brandGroup || "General Filters"))].sort((a, b) => order(a) - order(b) || a.localeCompare(b));
      grid.innerHTML = groups.map(group => filterGroupSection(group, list.filter(p => (p.brandGroup || "General Filters") === group))).join("") || '<p class="notice">No products found.</p>';
    } else {
      grid.innerHTML = list.map(productCard).join("") || '<p class="notice">No products found.</p>';
    }
    $("#filterInput")?.addEventListener("input", e => filterCards(e.target.value));
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-filter-query]");
      if (!btn) return;
      const input = $("#filterInput");
      if (input) {
        input.value = btn.dataset.filterQuery;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.focus();
      }
    });
    attachReveal();
  }

  function drawSearchPage() {
    const grid = $("#searchGrid");
    if (!grid) return;
    const input = $("#searchAll");
    const initial = new URLSearchParams(location.search).get("q") || "";
    if (input) input.value = initial;
    function draw(q) {
      const list = products.filter(p => searchMatches(p, q));
      if ($("#itemCount")) $("#itemCount").textContent = `${list.length} results`;
      grid.innerHTML = list.map(productCard).join("") || '<p class="notice">No products found. Try a product name, code, material, or part number like 990/14900, 99014900, or 990-14900.</p>';
      attachReveal();
    }
    input?.addEventListener("input", e => draw(e.target.value));
    draw(initial);
  }

  function drawBrandPage() {
    const grid = $("#brandProductGrid");
    if (!grid) return;
    const brand = grid.dataset.brand || "";
    const aliases = (grid.dataset.aliases || brand).split(",").map(x => x.trim()).filter(Boolean);
    const list = products.filter(p => aliases.some(alias => searchMatches(p, alias)));
    if ($("#brandItemCount")) $("#brandItemCount").textContent = `${list.length} reference products`;
    grid.innerHTML = list.slice(0, 120).map(productCard).join("") || '<p class="notice">No products found for this brand yet.</p>';
    $("#filterInput")?.addEventListener("input", e => filterCards(e.target.value));
    attachReveal();
  }

  function injectMobileActionBar() {
    if ($("#mobileActionBar")) return;
    const bar = document.createElement("div");
    bar.className = "mobile-action-bar";
    bar.id = "mobileActionBar";
    bar.innerHTML = `
      <a href="https://wa.me/${PHONE}?text=${encodeURIComponent("Hello MAK Overseas, I need help with a spare part.")}" aria-label="WhatsApp MAK Overseas">WhatsApp</a>
      <a href="${rootUrl("search.html")}" aria-label="Search products">Search</a>
      <button type="button" data-mobile-cart aria-label="Open cart">Cart <span class="cart-count">0</span></button>`;
    document.body.appendChild(bar);
  }

  function injectSeoForProduct() {
    const addBtn = $("[data-add]");
    if (!addBtn) return;
    const p = productFromId(addBtn.dataset.add);
    if (!p || $("#productJsonLd")) return;
    const json = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      image: rootUrl(p.image),
      brand: { "@type": "Brand", name: "MAK Overseas" },
      manufacturer: { "@type": "Organization", name: "MAK Overseas" },
      countryOfOrigin: "IN",
      category: p.headCategory || p.category,
      sku: p.code || undefined,
      mpn: cleanPartNumbers(p.partNumbers)[0] || undefined,
      description: p.desc || "Heavy machinery and commercial vehicle spare part manufactured or supplied by MAK Overseas."
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.id = "productJsonLd";
    script.textContent = JSON.stringify(json);
    document.head.appendChild(script);
    const info = $(".product-info");
    if (info && !$("#productDisclaimer")) {
      const meta = $(".detail-meta", info);
      if (meta && !meta.textContent.includes("Manufacturer")) {
        meta.insertAdjacentHTML("beforeend", '<div class="detail-row"><b>Manufacturer</b>MAK Overseas</div><div class="detail-row"><b>Country of Manufacture</b>India</div>');
      }
      info.insertAdjacentHTML("beforeend", '<p class="product-disclaimer" id="productDisclaimer">OEM/reference part numbers and equipment brand names are used for identification and application reference. Products are suitable replacement parts unless specifically stated as genuine OEM.</p>');
      const related = products.filter(item => item.id !== p.id && (item.categorySlug === p.categorySlug || item.headCategorySlug === p.headCategorySlug)).slice(0, 4);
      if (related.length) {
        info.closest("main")?.insertAdjacentHTML("beforeend", `<section class="content related-products" id="relatedProducts"><div class="tag">Related Products</div><h2 class="section-title">Same Category</h2><div class="grid" style="margin:1.5rem 0 0">${related.map(productCard).join("")}</div></section>`);
      }
    }
  }

  function initCart() {
    const panel = $("#cartPanel");
    const checkout = $("#checkoutBtn");
    if (checkout) checkout.textContent = "Send Cart on WhatsApp";
    if (checkout && !$("#quoteCartBtn")) checkout.insertAdjacentHTML("beforebegin", '<button class="checkout quote-checkout" id="quoteCartBtn">Request Quotation</button>');
    if (checkout && !$("#emailCheckoutBtn")) checkout.insertAdjacentHTML("afterend", '<button class="checkout email-checkout" id="emailCheckoutBtn">Send Cart by Email</button>');
    $("#openCart")?.addEventListener("click", openCart);
    $("[data-mobile-cart]")?.addEventListener("click", openCart);
    $("[data-close-cart]")?.addEventListener("click", () => panel?.classList.remove("open"));
    panel?.addEventListener("click", e => { if (e.target.id === "cartPanel") panel.classList.remove("open"); });
    checkout?.addEventListener("click", () => sendCartWhatsApp(PHONE));
    $("#quoteCartBtn")?.addEventListener("click", requestQuotation);
    $("#emailCheckoutBtn")?.addEventListener("click", sendCartEmail);
    document.addEventListener("click", e => {
      const add = e.target.closest("[data-add]");
      if (add) { addToCart(add.dataset.add); return; }
      const en = e.target.closest("[data-enquire]");
      if (en) { enquire(en.dataset.enquire); return; }
      const em = e.target.closest("[data-email]");
      if (em) { emailEnquire(em.dataset.email); return; }
      const rm = e.target.closest("[data-remove]");
      if (rm) { cart.splice(Number(rm.dataset.remove), 1); save(); return; }
      const qty = e.target.closest("[data-qty]");
      if (qty) {
        const idx = Number(qty.dataset.index);
        if (!cart[idx]) return;
        cart[idx].qty += qty.dataset.qty === "up" ? 1 : -1;
        if (cart[idx].qty < 1) cart.splice(idx, 1);
        save();
      }
    });
    document.addEventListener("input", e => {
      const qtyInput = e.target.closest("[data-cart-qty]");
      if (qtyInput) {
        const idx = Number(qtyInput.dataset.cartQty);
        if (cart[idx]) {
          cart[idx].qty = Math.max(1, Number(qtyInput.value.replace(/\D+/g, "")) || 1);
          localStorage.setItem(storageKey, JSON.stringify(cart));
          updateCount();
        }
      }
      const note = e.target.closest("[data-note]");
      if (note) {
        const idx = Number(note.dataset.note);
        if (cart[idx]) {
          cart[idx].notes = note.value;
          localStorage.setItem(storageKey, JSON.stringify(cart));
        }
      }
    });
    renderCart();
    updateCount();
  }

  window.MAKCatalogue = {
    addToCart,
    enquire,
    emailEnquire,
    productLabel,
    productCard,
    searchMatches,
    rootUrl
  };

  function redrawLanguageAware() {
    window.MAKLanguage?.enhanceProductDatabase?.();
    drawProductsPage();
    drawCategoryPage();
    drawSearchPage();
    drawBrandPage();
  }

  document.addEventListener("DOMContentLoaded", () => {
    redrawLanguageAware();
    injectMobileActionBar();
    initCart();
    injectSeoForProduct();
    attachReveal();
  });

  window.addEventListener("mak-language-change", () => {
    redrawLanguageAware();
    renderCart();
    updateCount();
  });
})();
