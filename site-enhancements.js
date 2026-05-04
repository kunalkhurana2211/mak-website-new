
(() => {
  const PRODUCTS = [{"title": "Centre Bolts", "image": "images/catalogue/p03-15-Im70.jpg", "page": "bolts.html", "category": "Bolts & Fasteners"}, {"title": "Hub Wheel Bolt", "image": "images/catalogue/p02-08-Im27.jpg", "page": "bolts.html", "category": "Bolts & Fasteners"}, {"title": "Hydra Clamp Bolt", "image": "images/catalogue/p02-16-Im35.jpg", "page": "bolts.html", "category": "Bolts & Fasteners"}, {"title": "Lock Bolt", "image": "images/catalogue/p02-09-Im28.jpg", "page": "bolts.html", "category": "Bolts & Fasteners"}, {"title": "Teeth Cutter Bolt", "image": "images/catalogue/p02-37-Im56.jpg", "page": "bolts.html", "category": "Bolts & Fasteners"}, {"title": "Tooth Lock Pin", "image": "images/catalogue/p02-22-Im41.jpg", "page": "bolts.html", "category": "Bolts & Fasteners"}, {"title": "Track Shoe Bolts All Sizes", "image": "images/catalogue/p02-10-Im29.jpg", "page": "bolts.html", "category": "Bolts & Fasteners"}, {"title": "U-Bolts All Sizes", "image": "images/catalogue/p03-16-Im71.jpg", "page": "bolts.html", "category": "Bolts & Fasteners"}, {"title": "Air Filter Element", "image": "images/catalogue/p04-24-Im116.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Annulus Gear Ring", "image": "images/catalogue/p03-28-Im83.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Banjo Tee Eye Bolts &amp; Overflow Valves", "image": "images/catalogue/p03-17-Im72.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Battery Terminals", "image": "images/catalogue/p02-23-Im42.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Bell Crank Washers", "image": "images/catalogue/p02-33-Im52.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Brass Bush", "image": "images/catalogue/p02-28-Im47.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Carrier Plate", "image": "images/catalogue/p04-03-Im95.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Chassis Bracket", "image": "images/catalogue/p03-18-Im73.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Construction Tyres", "image": "images/catalogue/p04-20-Im112.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Container Lock", "image": "images/catalogue/p03-08-Im63.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Crocodile Type Tooth", "image": "images/jcb-crocodile-tooth.png", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Disc Rotor", "image": "images/catalogue/p03-07-Im62.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Excavator Tyres", "image": "images/catalogue/p04-15-Im107.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Forklift Tyres", "image": "images/catalogue/p04-16-Im108.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Forward and Reverse Switch", "image": "images/catalogue/p03-26-Im81.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Front Carrier Set", "image": "images/catalogue/p04-21-Im113.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Gaskets", "image": "images/catalogue/p03-27-Im82.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Grease Bucket", "image": "images/catalogue/p04-27-Im119.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Grease Gun", "image": "images/catalogue/p04-28-Im120.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Grease Gun Nozzle", "image": "images/catalogue/p04-29-Im121.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Grease Nipples", "image": "images/catalogue/p02-25-Im44.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Hand Primers", "image": "images/catalogue/p02-30-Im49.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Heavy Duty Tyres", "image": "images/catalogue/p04-18-Im110.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Hub Repair Kit", "image": "images/catalogue/p04-13-Im105.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Hydraulic Jack", "image": "images/catalogue/p03-09-Im64.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Industrial Tyres", "image": "images/catalogue/p04-19-Im111.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Air Filter Kit", "image": "images/catalogue/p04-23-Im115.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Friction Plates", "image": "images/catalogue/p04-02-Im94.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Headlamps All Types", "image": "images/catalogue/p03-33-Im88.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Oil Filters All Types", "image": "images/catalogue/p04-26-Im118.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Side Cutter", "image": "images/catalogue/p03-21-Im76.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Side Cutter Crocodile", "image": "images/catalogue/p03-24-Im79.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Side Cutter Terex", "image": "images/catalogue/p03-23-Im78.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Steel Bushes Sleeve", "image": "images/catalogue/p02-05-Im24.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Tail Lamps", "image": "images/catalogue/p03-35-Im90.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Tail Lamps All Sizes", "image": "images/catalogue/p03-36-Im91.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Teeth Center", "image": "images/catalogue/p03-19-Im74.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "JCB Working Lamps", "image": "images/catalogue/p03-31-Im86.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Leaf Spring", "image": "images/catalogue/p02-34-Im53.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Oil &amp; Air Filters", "image": "images/catalogue/p04-14-Im106.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Oil Seal &amp; Washers All Sizes", "image": "images/catalogue/p04-30-Im46.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Pivot Pin", "image": "images/catalogue/p02-21-Im40.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Plain Type Tooth", "image": "images/jcb-plain-tooth.png", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Planetary Gear", "image": "images/catalogue/p03-29-Im84.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Planetary Hub 10 Hole", "image": "images/catalogue/p04-04-Im96.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Plug Bolts", "image": "images/catalogue/p02-24-Im43.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Rear Drive Shaft Full Male Female", "image": "images/catalogue/p03-20-Im75.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Spring Pins &amp; Bushes", "image": "images/catalogue/p03-14-Im69.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Sprocket", "image": "images/catalogue/p04-11-Im103.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Sun Gear", "image": "images/catalogue/p03-30-Im85.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Truck Tyres", "image": "images/catalogue/p04-17-Im109.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Washers", "image": "images/catalogue/p02-27-Im46.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Wheel Lock Kit", "image": "images/catalogue/p02-32-Im51.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Wheel Spanner L-Type &amp; Cross", "image": "images/catalogue/p03-04-Im59.jpg", "page": "catalogue-products.html", "category": "Catalogue Products"}, {"title": "Air Filter Element Heavy Duty", "image": "images/catalogue/p04-22-Im114.jpg", "page": "filters.html", "category": "Filters"}, {"title": "Oil & Air Filters", "image": "images/catalogue/p04-14-Im106.jpg", "page": "filters.html", "category": "Filters"}, {"title": "Oil Seal & Washers All Sizes", "image": "images/catalogue/p04-30-Im46.jpg", "page": "filters.html", "category": "Filters"}, {"title": "Boom Dipper Joint Sleeve", "image": "images/catalogue/p02-12-Im31.jpg", "page": "bushes.html", "category": "Pins & Bushes"}, {"title": "Bucket Kit", "image": "images/catalogue/p02-18-Im37.jpg", "page": "bushes.html", "category": "Pins & Bushes"}, {"title": "Bucket Sleeve", "image": "images/catalogue/p02-11-Im30.jpg", "page": "bushes.html", "category": "Pins & Bushes"}, {"title": "Center Pin", "image": "images/catalogue/p02-02-Im21.jpg", "page": "bushes.html", "category": "Pins & Bushes"}, {"title": "JCB Steel Bushes", "image": "images/catalogue/p02-04-Im23.jpg", "page": "bushes.html", "category": "Pins & Bushes"}, {"title": "KPC Pin Bush Kit", "image": "images/catalogue/p02-19-Im38.jpg", "page": "bushes.html", "category": "Pins & Bushes"}, {"title": "Sleeve Bronze Bush", "image": "images/catalogue/p02-03-Im22.jpg", "page": "bushes.html", "category": "Pins & Bushes"}, {"title": "Spring Pins & Bushes", "image": "images/catalogue/p03-14-Im69.jpg", "page": "bushes.html", "category": "Pins & Bushes"}];
  const PHONE = '919465263877';

  const getCart = () => JSON.parse(localStorage.getItem('makCart') || '[]');
  const setCart = (cart) => {
    localStorage.setItem('makCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  };
  const productByTitle = (title) => PRODUCTS.find(p => p.title === title) || {
    title,
    image: 'images/mak-overseas-logo.jpg',
    page: 'catalogue-products.html',
    category: 'Catalogue'
  };

  function addToCart(title) {
    const product = productByTitle(title);
    const cart = getCart();
    const existing = cart.find(item => item.title === title);
    if (existing) existing.qty += 1;
    else cart.push({ ...product, qty: 1 });
    setCart(cart);
    showToast(`${title} added to enquiry cart`);
  }

  function updateQty(title, delta) {
    const cart = getCart()
      .map(item => item.title === title ? { ...item, qty: item.qty + delta } : item)
      .filter(item => item.qty > 0);
    setCart(cart);
  }

  function removeItem(title) {
    setCart(getCart().filter(item => item.title !== title));
  }

  function updateCartCount() {
    const count = getCart().reduce((sum, item) => sum + item.qty, 0);
    document.querySelectorAll('.cart-count').forEach(el => el.textContent = count);
  }

  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  }

  function injectActions() {
    document.querySelectorAll('nav').forEach(nav => {
      if (nav.querySelector('.site-actions')) return;
      const actions = document.createElement('div');
      actions.className = 'site-actions';
      actions.innerHTML = `
        <button class="icon-btn site-search-open" type="button" aria-label="Search products" title="Search products">&#128269;</button>
        <button class="icon-btn site-cart-open" type="button" aria-label="Open enquiry cart" title="Open enquiry cart">&#128722;<span class="cart-count">0</span></button>
      `;
      nav.appendChild(actions);
    });
  }

  function injectSearch() {
    if (document.querySelector('.search-overlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.innerHTML = `
      <div class="search-panel" role="dialog" aria-modal="true" aria-label="Search products">
        <div class="search-header">
          <input id="siteSearchInput" type="search" placeholder="Search products, parts, JCB teeth, filters...">
          <button class="close-btn site-search-close" type="button" aria-label="Close search">&times;</button>
        </div>
        <div class="search-results"></div>
      </div>
    `;
    document.body.appendChild(overlay);
    const input = overlay.querySelector('#siteSearchInput');
    input.addEventListener('input', () => renderSearch(input.value));
    overlay.addEventListener('click', event => {
      if (event.target === overlay || event.target.closest('.site-search-close')) closeSearch();
    });
  }

  function renderSearch(term = '') {
    const results = document.querySelector('.search-results');
    if (!results) return;
    const normalized = term.trim().toLowerCase();
    const matches = PRODUCTS
      .filter(p => !normalized || `${p.title} ${p.category}`.toLowerCase().includes(normalized))
      .slice(0, 28);
    results.innerHTML = matches.map(p => `
      <div class="search-result">
        <a href="${p.page}"><img src="${p.image}" alt="${p.title}"></a>
        <a href="${p.page}" style="color:inherit;text-decoration:none"><strong>${p.title}</strong><small>${p.category}</small></a>
        <div class="result-actions">
          <button class="buy-btn" type="button" data-add-cart="${escapeAttr(p.title)}">Add</button>
          <a class="ghost-btn" href="${p.page}">View</a>
        </div>
      </div>
    `).join('') || '<p class="empty-cart">No products found</p>';
  }

  function openSearch() {
    injectSearch();
    document.querySelector('.search-overlay').classList.add('open');
    renderSearch('');
    setTimeout(() => document.querySelector('#siteSearchInput')?.focus(), 40);
  }
  function closeSearch() {
    document.querySelector('.search-overlay')?.classList.remove('open');
  }

  function injectCart() {
    if (document.querySelector('.cart-drawer')) return;
    const backdrop = document.createElement('div');
    backdrop.className = 'cart-drawer-backdrop';
    const drawer = document.createElement('aside');
    drawer.className = 'cart-drawer';
    drawer.innerHTML = `
      <div class="cart-head">
        <div><strong>Enquiry Cart</strong><br><small style="color:#aaa">Send product list on WhatsApp</small></div>
        <button class="close-btn site-cart-close" type="button">&times;</button>
      </div>
      <div class="cart-items"></div>
      <div class="cart-foot"><button class="checkout-btn" type="button">Send Enquiry on WhatsApp</button></div>
    `;
    document.body.appendChild(backdrop);
    document.body.appendChild(drawer);
    backdrop.addEventListener('click', closeCart);
    drawer.querySelector('.site-cart-close').addEventListener('click', closeCart);
    drawer.querySelector('.checkout-btn').addEventListener('click', checkout);
    renderCart();
  }

  function openCart() {
    injectCart();
    document.querySelector('.cart-drawer-backdrop').classList.add('open');
    document.querySelector('.cart-drawer').classList.add('open');
  }
  function closeCart() {
    document.querySelector('.cart-drawer-backdrop')?.classList.remove('open');
    document.querySelector('.cart-drawer')?.classList.remove('open');
  }

  function renderCart() {
    const box = document.querySelector('.cart-items');
    if (!box) return;
    const cart = getCart();
    if (!cart.length) {
      box.innerHTML = '<p class="empty-cart">Your enquiry cart is empty.</p>';
      return;
    }
    box.innerHTML = cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.title}">
        <div>
          <strong>${item.title}</strong><br><small style="color:#aaa">${item.category}</small>
          <div class="qty-controls">
            <button type="button" data-qty="-1" data-title="${escapeAttr(item.title)}">-</button>
            <span>${item.qty}</span>
            <button type="button" data-qty="1" data-title="${escapeAttr(item.title)}">+</button>
          </div>
        </div>
        <button class="remove-item" type="button" data-remove="${escapeAttr(item.title)}">&times;</button>
      </div>
    `).join('');
  }

  function checkout() {
    const cart = getCart();
    if (!cart.length) {
      showToast('Add products first');
      return;
    }
    const lines = cart.map((item, index) => `${index + 1}. ${item.title} x ${item.qty}`);
    const message = `Hello MAK Overseas, I want to enquire about:%0A%0A${encodeURIComponent(lines.join('\n'))}`;
    window.open(`https://wa.me/${PHONE}?text=${message}`, '_blank');
  }

  function enhanceProductCards() {
    const path = location.pathname.toLowerCase();
    if (path.endsWith('index.html') || path.endsWith('/') || path.endsWith('catalogue-products.html')) return;
    document.querySelectorAll('.products .card').forEach(card => {
      if (card.querySelector('.shop-actions')) return;
      const title = card.querySelector('h3')?.textContent.trim();
      const enquire = card.querySelector('a.btn');
      if (!title) return;
      if (enquire) enquire.remove();
      const actions = document.createElement('div');
      actions.className = 'shop-actions';
      actions.innerHTML = `<button class="buy-btn" type="button" data-add-cart="${escapeAttr(title)}">Add to Cart</button><a class="ghost-btn" href="https://wa.me/${PHONE}?text=I want ${encodeURIComponent(title)}">Enquire</a>`;
      card.appendChild(actions);
    });
  }

  function enhanceRail() {
    const showcase = document.querySelector('.product-showcase');
    const rail = document.querySelector('.photo-rail');
    const heading = showcase?.querySelector('h2');
    if (!showcase || !rail || showcase.querySelector('.showcase-head')) return;
    const head = document.createElement('div');
    head.className = 'showcase-head';
    head.innerHTML = `<div><div class="showcase-kicker">Featured Inventory</div><h2>${heading?.textContent || 'Product Highlights'}</h2></div><div class="rail-controls"><button type="button" data-rail="prev" aria-label="Previous products">&#8592;</button><button type="button" data-rail="next" aria-label="Next products">&#8594;</button></div>`;
    heading?.remove();
    showcase.insertBefore(head, rail);
    head.addEventListener('click', event => {
      const btn = event.target.closest('[data-rail]');
      if (!btn) return;
      rail.scrollBy({ left: btn.dataset.rail === 'next' ? 310 : -310, behavior: 'smooth' });
    });
  }

  function escapeAttr(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;');
  }

  document.addEventListener('click', event => {
    const searchBtn = event.target.closest('.site-search-open');
    const cartBtn = event.target.closest('.site-cart-open');
    const addBtn = event.target.closest('[data-add-cart]');
    const qtyBtn = event.target.closest('[data-qty]');
    const removeBtn = event.target.closest('[data-remove]');
    if (searchBtn) openSearch();
    if (cartBtn) openCart();
    if (addBtn) addToCart(addBtn.dataset.addCart);
    if (qtyBtn) updateQty(qtyBtn.dataset.title, Number(qtyBtn.dataset.qty));
    if (removeBtn) removeItem(removeBtn.dataset.remove);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeSearch();
      closeCart();
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    injectActions();
    injectSearch();
    injectCart();
    enhanceProductCards();
    enhanceRail();
    updateCartCount();
  });
})();
