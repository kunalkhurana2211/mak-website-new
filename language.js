(function () {
  const translations = {
    "Products": "المنتجات",
    "Search": "بحث",
    "Search Products": "بحث المنتجات",
    "Brands": "العلامات التجارية",
    "Why Us": "لماذا نحن",
    "Contact": "اتصل بنا",
    "Catalogue": "الكتالوج",
    "Home": "الرئيسية",
    "Back to Home": "العودة للرئيسية",
    "Product Categories": "فئات المنتجات",
    "Products in this category": "المنتجات في هذه الفئة",
    "Catalogue Search": "بحث الكتالوج",
    "Full Product Range": "مجموعة المنتجات الكاملة",
    "What We Supply": "ما نوفره",
    "Need a Part? Let's Talk.": "تحتاج قطعة؟ تواصل معنا.",
    "Request a Quote": "اطلب عرض سعر",
    "Browse Catalogue": "تصفح الكتالوج",
    "Get a Quote": "اطلب عرض سعر",
    "Quote": "طلب سعر",
    "Quote Request": "طلب عرض سعر",
    "Name": "الاسم",
    "Phone": "الهاتف",
    "Machine Model": "موديل المعدة",
    "Location": "الموقع",
    "Part Needed": "القطعة المطلوبة",
    "Extra Details": "تفاصيل إضافية",
    "Prepare Email": "تحضير البريد",
    "Send on WhatsApp": "إرسال عبر واتساب",
    "What to include": "ماذا تذكر في الطلب",
    "Your quote summary will appear here.": "سيظهر ملخص طلب السعر هنا.",
    "Fill the form first. We will receive a clear product enquiry with your machine model, phone number and required part details.": "املأ النموذج أولاً لنستلم استفساراً واضحاً يتضمن موديل المعدة ورقم الهاتف وتفاصيل القطعة المطلوبة.",
    "For faster quote response, mention machine model, part name, size, quantity and whether you need India or Dubai supply.": "للحصول على رد أسرع، اذكر موديل المعدة واسم القطعة والمقاس والكمية وهل تحتاج التوريد من الهند أو دبي.",
    "WhatsApp Part Finder": "مساعد قطع الغيار واتساب",
    "Machine model": "موديل المعدة",
    "Part needed": "القطعة المطلوبة",
    "Add to Cart": "أضف إلى السلة",
    "View Details": "عرض التفاصيل",
    "View": "عرض",
    "Category": "الفئة",
    "WhatsApp": "واتساب",
    "WhatsApp Enquiry": "استفسار واتساب",
    "Send Enquiry on WhatsApp": "إرسال الاستفسار عبر واتساب",
    "Enquiry Cart": "سلة الاستفسار",
    "Your enquiry cart is empty.": "سلة الاستفسار فارغة.",
    "No products found.": "لم يتم العثور على منتجات.",
    "Back to Home": "العودة للرئيسية",
    "MAK OVERSEAS": "ماك أوفرسيز",

    "Machinery": "قطع غيار",
    "Spare Parts": "المعدات",
    "Engineering Precision,": "دقة هندسية،",
    "Securing Performance": "وأداء موثوق",
    "India & Gulf - Importers & Exporters": "الهند والخليج - مستوردون ومصدرون",
    "Genuine and OE-compatible spares for CAT, JCB, Komatsu, Cummins, Volvo, Hyundai, trucks, forklifts, buses, and construction equipment.": "قطع غيار أصلية ومتوافقة مع OE لآلات CAT و JCB و Komatsu و Cummins و Volvo و Hyundai والشاحنات والرافعات والحافلات ومعدات البناء.",
    "Browse our main product lines, open the detailed pages from the older website, or add items to an enquiry cart and send the complete list on WhatsApp.": "تصفح خطوط المنتجات الرئيسية، وافتح الصفحات التفصيلية، أو أضف المنتجات إلى سلة الاستفسار وأرسل القائمة عبر واتساب.",
    "Genuine & OE-compatible parts for": "قطع أصلية ومتوافقة مع OE لـ",
    "Built on Trust,": "الثقة أساسنا،",
    "Backed by Stock": "والمخزون دعمنا",
    "More than a supplier - the team provides economical guidance and solutions for service, maintenance, and breakdowns.": "لسنا مجرد مورد، بل نقدم إرشادات وحلولاً اقتصادية للصيانة والخدمة والأعطال.",
    "India & Gulf Coverage": "تغطية الهند والخليج",
    "Genuine & OE Quality": "جودة أصلية ومتوافقة مع OE",
    "Technical Expertise": "خبرة فنية",
    "Fast WhatsApp Quotes": "عروض سريعة عبر واتساب",
    "Low Costs": "تكلفة منخفضة",
    "High Quality & Perfect Fit": "جودة عالية وملاءمة مثالية",
    "Worldwide Shipping": "شحن عالمي",
    "Worldwide": "عالمي",
    "Shipping": "الشحن",
    "Direct manufacturer and supplier connections help us offer competitive pricing without adding unnecessary middle layers.": "علاقاتنا المباشرة مع المصنعين والموردين تساعدنا على تقديم أسعار تنافسية بدون طبقات وسيطة غير ضرورية.",
    "We focus on durable, OE-compatible parts that fit correctly and perform reliably in tough machinery applications.": "نركز على قطع متينة ومتوافقة مع OE، تركب بشكل صحيح وتعمل بثبات في تطبيقات المعدات الشاقة.",
    "From Ludhiana and Dubai, we support customers across India, the Gulf and international markets with export-ready supply.": "من لوديانا ودبي، نخدم العملاء في الهند والخليج والأسواق العالمية بتوريد جاهز للتصدير.",
    "Our Offices": "مكاتبنا",
    "Find Us": "مواقعنا",
    "Head Office": "المكتب الرئيسي",
    "National Traders": "ناشيونال تريدزر",
    "National Sales Corporation": "ناشيونال سيلز كوربوريشن",
    "Dubai - Deira": "دبي - ديرة",
    "Dubai Office": "مكتب دبي",
    "Local parts counter and support": "مبيعات قطع الغيار والدعم المحلي",
    "Stock, sales, and dealer enquiries": "استفسارات المخزون والمبيعات والوكلاء",
    "UAE office": "مكتب الإمارات",
    "WhatsApp India ->": "واتساب الهند ->",
    "WhatsApp Dubai ->": "واتساب دبي ->",
    "WhatsApp us your part number, machine model, or photo - we will respond fast.": "أرسل لنا رقم القطعة أو موديل المعدة أو صورة عبر واتساب وسنرد بسرعة.",

    "Bolts & Fasteners": "المسامير والمثبتات",
    "Pins & Bushes": "الدبابيس والجلب",
    "JCB Teeth & Cutters": "أسنان وقواطع JCB",
    "Filters": "الفلاتر",
    "Gear Components": "مكونات التروس",
    "Tyres": "الإطارات",
    "Full Catalogue": "الكتالوج الكامل",
    "Electricals & Lighting": "الكهرباء والإضاءة",
    "Seals & Gaskets": "الصوف والجوانات",
    "Tools & Accessories": "الأدوات والإكسسوارات",
    "Truck & Car Parts": "قطع الشاحنات والسيارات",
    "Product Category": "فئة المنتج",

    "JCB Rear Hub Wheel Bolt": "مسمار هب خلفي لعجلة JCB",
    "Teeth Cutter Bolt": "مسمار قاطع الأسنان",
    "Track Shoe Bolts": "مسامير الجنزير",
    "Lock Bolt": "مسمار قفل",
    "Hydra Clamp Bolt": "مسمار مشبك هيدرا",
    "T Bolts & D Bolts": "مسامير T و D",
    "JCB Steel Bushes": "جلب حديد JCB",
    "Bronze Bush": "جلبة برونز",
    "Center Pin Sleeve": "جلبة دبوس الوسط",
    "Bucket Sleeve": "جلبة البكت",
    "Boom Dipper Joint Sleeve": "جلبة مفصل البوم والديبر",
    "Spring Pins & Bushes": "دبابيس وجلب السبرنج",
    "JCB Teeth Center": "سن وسط JCB",
    "Plain Type Tooth": "سن عادي",
    "Crocodile Type Side Cutter": "قاطع جانبي نوع كروكودايل",
    "JCB Side Cutter": "قاطع جانبي JCB",
    "Terex Side Cutter": "قاطع جانبي تيريكس",
    "JCB Oil Filters": "فلاتر زيت JCB",
    "JCB Air Filter Kit": "طقم فلتر هواء JCB",
    "Air Filter Element": "عنصر فلتر الهواء",
    "Oil & Air Filters": "فلاتر الزيت والهواء",
    "Planetary Gear": "ترس بلانتري",
    "Sun Gear": "ترس صن",
    "Annulus Gear Ring": "حلقة ترس أنيولس",
    "Sprocket": "سبروكت",
    "Front Carrier Set": "طقم كارير أمامي",
    "Rear Drive Shaft": "عمود دفع خلفي",
    "Backhoe Loader Tyre": "إطار باكهو لودر",
    "Excavator Tyre": "إطار حفار",
    "Forklift Tyre": "إطار رافعة شوكية",
    "Truck Tyres": "إطارات شاحنات",
    "JCB Working Lamps": "كشافات عمل JCB",
    "JCB Headlamps": "مصابيح أمامية JCB",
    "JCB Tail Lamps": "مصابيح خلفية JCB",
    "Forward & Reverse Switch": "سويتش أمامي وخلفي",
    "Water Temperature Meter": "عداد حرارة الماء",
    "Gaskets": "جوانات",
    "Oil Seal & Washers": "صوف زيت وواشرات",
    "Hub Repair Kit": "طقم إصلاح الهب",
    "Planetary Hub 10 Hole": "هب بلانتري 10 فتحات",
    "JCB Friction Plates": "صفائح احتكاك JCB",
    "Grease Gun": "مسدس شحم",
    "Grease Bucket": "دلو شحم",
    "Grease Gun Nozzle": "فوهة مسدس الشحم",
    "Hydraulic Jack": "جاك هيدروليك",
    "Wheel Spanner": "مفتاح عجلات",
    "Truck Hub Wheel Centre Bolts": "مسامير مركز هب الشاحنة",
    "U-Bolts All Sizes": "مسامير U بجميع المقاسات",
    "Battery Terminals": "أطراف البطارية",
    "Disc Rotor": "دسك روتور",
    "Chassis Bracket": "حامل الشاسيه",

    "JCB, excavator, truck and backhoe loader fasteners for hubs, tracks, cutters and high-load joints.": "مثبتات JCB والحفارات والشاحنات والباكهو للهبات والجنازير والقواطع والوصلات الثقيلة.",
    "Heavy teeth cutter bolt and nut for bucket tooth and side cutter fitment.": "مسمار وصامولة قاطع أسنان ثقيل لتركيب أسنان البكت والقواطع الجانبية.",
    "Rear hub and wheel fastening for JCB backhoe and construction equipment.": "تثبيت الهب الخلفي والعجلة لباكهو JCB ومعدات البناء.",
    "Search all current MAK Overseas product entries. Add products to the enquiry cart, open the category, or send a direct WhatsApp enquiry.": "ابحث في جميع منتجات ماك أوفرسيز الحالية. أضف المنتجات إلى سلة الاستفسار أو افتح الفئة أو أرسل استفسار واتساب مباشر.",
    "Search the full product list seeded from the catalogue and current product pages.": "ابحث في قائمة المنتجات الكاملة المأخوذة من الكتالوج وصفحات المنتجات الحالية.",
    "All MAK Overseas product categories in one place. Open a category page, add items to enquiry cart, or search the full catalogue.": "كل فئات منتجات ماك أوفرسيز في مكان واحد. افتح صفحة الفئة أو أضف المنتجات للسلة أو ابحث في الكتالوج.",
    "Reach MAK Overseas in Ludhiana or Dubai for product availability and quotation.": "تواصل مع ماك أوفرسيز في لوديانا أو دبي لمعرفة التوفر والحصول على عرض سعر.",
    "Genuine and OE-compatible parts for major heavy machinery, truck and forklift brands.": "قطع أصلية ومتوافقة مع OE لأهم علامات المعدات الثقيلة والشاحنات والرافعات الشوكية.",
    "A practical supplier for heavy equipment parts, service guidance and fast enquiry response.": "مورد عملي لقطع المعدات الثقيلة مع إرشاد فني ورد سريع على الاستفسارات."
  };

  const placeholders = {
    "Search products, filters, JCB teeth, bolts...": "ابحث عن منتجات، فلاتر، أسنان JCB، مسامير...",
    "Search bolts, bushes, filters, JCB teeth, tyres...": "ابحث عن مسامير، جلب، فلاتر، أسنان JCB، إطارات...",
    "Search categories...": "ابحث في الفئات...",
    "Search inside Bolts & Fasteners...": "ابحث داخل المسامير والمثبتات...",
    "Search inside Pins & Bushes...": "ابحث داخل الدبابيس والجلب...",
    "Search inside JCB Teeth & Cutters...": "ابحث داخل أسنان وقواطع JCB...",
    "Search inside Filters...": "ابحث داخل الفلاتر...",
    "Search inside Gear Components...": "ابحث داخل مكونات التروس...",
    "Search inside Tyres...": "ابحث داخل الإطارات...",
    "Search inside Electricals & Lighting...": "ابحث داخل الكهرباء والإضاءة...",
    "Search inside Seals & Gaskets...": "ابحث داخل الصوف والجوانات...",
    "Search inside Tools & Accessories...": "ابحث داخل الأدوات والإكسسوارات...",
    "Search inside Truck & Car Parts...": "ابحث داخل قطع الشاحنات والسيارات..."
    ,"JCB 3CX, CAT 320D, Komatsu...": "مثال: JCB 3CX، CAT 320D، Komatsu..."
    ,"City / Country": "المدينة / الدولة"
    ,"Part name, part number, size, quantity, or upload/photo note": "اسم القطعة أو رقمها أو المقاس أو الكمية أو ملاحظة عن الصورة"
    ,"Urgency, shipping requirement, old part photo available, etc.": "الاستعجال، متطلبات الشحن، توفر صورة للقطعة القديمة، إلخ"
    ,"Example: JCB 3CX, CAT 320D": "مثال: JCB 3CX، CAT 320D"
    ,"Example: rear hub bolt, teeth cutter bolt, air filter": "مثال: مسمار هب خلفي، مسمار قاطع الأسنان، فلتر هواء"
  };

  function directTranslate(text) {
    const trimmed = text.trim();
    if (!trimmed) return text;
    return translations[trimmed] || null;
  }

  function translateTextNodes(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE", "TEXTAREA"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(node => {
      if (!node.__enText) node.__enText = node.nodeValue;
      const ar = directTranslate(node.__enText);
      node.nodeValue = document.documentElement.lang === "ar" && ar ? node.__enText.replace(node.__enText.trim(), ar) : node.__enText;
    });
  }

  function translateAttributes(root) {
    root.querySelectorAll("[placeholder]").forEach(input => {
      if (!input.dataset.enPlaceholder) input.dataset.enPlaceholder = input.getAttribute("placeholder");
      const ar = placeholders[input.dataset.enPlaceholder];
      input.setAttribute("placeholder", document.documentElement.lang === "ar" && ar ? ar : input.dataset.enPlaceholder);
    });
    root.querySelectorAll("[title],[aria-label],[alt]").forEach(el => {
      ["title", "aria-label", "alt"].forEach(attr => {
        if (!el.hasAttribute(attr)) return;
        const key = "en" + attr.replace(/(^.|-.)/g, s => s.replace("-", "").toUpperCase());
        if (!el.dataset[key]) el.dataset[key] = el.getAttribute(attr);
        const ar = translations[el.dataset[key]];
        el.setAttribute(attr, document.documentElement.lang === "ar" && ar ? ar : el.dataset[key]);
      });
    });
  }

  function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.classList.toggle("lang-ar", lang === "ar");
    translateTextNodes(document.body);
    translateAttributes(document.body);
    document.querySelectorAll("[data-lang-toggle]").forEach(btn => {
      btn.textContent = lang === "ar" ? "EN" : "عربي";
      btn.setAttribute("aria-label", lang === "ar" ? "Switch to English" : "Switch to Arabic");
    });
  }

  function ensureToggle() {
    if (document.querySelector("[data-lang-toggle]")) return;
    const nav = document.querySelector("nav");
    if (!nav) return;
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "lang-toggle";
    btn.dataset.langToggle = "true";
    btn.addEventListener("click", () => {
      const next = document.documentElement.lang === "ar" ? "en" : "ar";
      localStorage.setItem("makLang", next);
      applyLanguage(next);
    });
    const cartButton = nav.querySelector("#openCart");
    if (cartButton) nav.insertBefore(btn, cartButton);
    else nav.appendChild(btn);
  }

  function addStyles() {
    if (document.getElementById("mak-language-style")) return;
    const style = document.createElement("style");
    style.id = "mak-language-style";
    style.textContent = `
      .lang-toggle{border:1px solid rgba(212,137,10,.55);border-radius:999px;background:rgba(212,137,10,.12);color:var(--gold,#D4890A);min-width:54px;height:38px;padding:0 .9rem;font-family:var(--H,Arial);font-weight:900;letter-spacing:1px;text-transform:uppercase;cursor:pointer;transition:.2s;display:inline-flex;align-items:center;justify-content:center}
      .lang-toggle:hover{background:var(--gold,#D4890A);color:#111;border-color:var(--gold,#D4890A);transform:translateY(-1px);box-shadow:0 12px 28px rgba(0,0,0,.26)}
      html[dir="rtl"] body{font-family:var(--B,Arial),Tahoma,sans-serif}
      html[dir="rtl"] .nav-links,html[dir="rtl"] .actions,html[dir="rtl"] .hero-actions,html[dir="rtl"] .cta-btns,html[dir="rtl"] .brand-lockup{direction:rtl}
      html[dir="rtl"] .logo-text{letter-spacing:1px}
      html[dir="rtl"] .hero h1,html[dir="rtl"] .s-title,html[dir="rtl"] .name,html[dir="rtl"] .office-c,html[dir="rtl"] .panel h3{text-align:right}
      html[dir="rtl"] .cart-drawer{right:auto;left:0;transform:translateX(-100%);border-left:0;border-right:1px solid #333}
      html[dir="rtl"] .cart-panel.open .cart-drawer{transform:translateX(0)}
      @media(max-width:820px){.lang-toggle{padding:.5rem .7rem;font-size:.8rem}}
    `;
    document.head.appendChild(style);
  }

  document.addEventListener("DOMContentLoaded", () => {
    addStyles();
    ensureToggle();
    applyLanguage(localStorage.getItem("makLang") || "en");
    const observer = new MutationObserver(() => {
      if (observer._busy) return;
      observer._busy = true;
      requestAnimationFrame(() => {
        applyLanguage(localStorage.getItem("makLang") || "en");
        observer._busy = false;
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
