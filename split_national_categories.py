from pathlib import Path
from io import BytesIO
import html
import json
import re

from PIL import Image, ImageOps
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent
RAW_ROOT = ROOT / "web-products" / "national-traders"
OPT_ROOT = RAW_ROOT / "optimized"
OPT_ROOT.mkdir(parents=True, exist_ok=True)

PDFS = [
    ("nt-parts", Path(r"C:\Users\DELL\Downloads\National Traders .pdf.pdf")),
    ("nt-jacks", Path(r"C:\Users\DELL\Downloads\National Traders jacks .pdf")),
]

CATEGORIES = [
    ("national-spring-pins", "Spring Pins", "national-spring-pins.html", "web-products/national-traders/optimized/spring-pin.webp", "Spring pins, centre bolts, balance rod bolts, hub bolts, nuts and related National Sales fasteners."),
    ("national-shackle-assembly", "Shackle Assembly", "national-shackle-assembly.html", "web-products/national-traders/optimized/shackle-assembly.webp", "Pick-up, Maxi-Truck, Ace, Dost and fixed type shackle assemblies from National Sales Corporation."),
    ("national-shackle-plate", "Shackle Plate", "national-shackle-plate.html", "web-products/national-traders/optimized/shackle-plate.webp", "Shackle plates, hanger plates, shocker plates, tube brackets and related suspension plates."),
    ("national-u-bolts", "U Bolts", "national-u-bolts.html", "web-products/national-traders/optimized/u-bolt.webp", "U bolts and U bolt sets for pickup, Ace, Dost, Maxi-Truck and commercial vehicle suspension applications."),
    ("national-bushes", "Bushes", "national-bushes.html", "web-products/national-traders/optimized/spring-bush.webp", "Spring bushes and rear spring bushes from the National Sales catalogue."),
    ("national-steel-jacks", "Steel Jacks", "national-steel-jacks.html", "web-products/national-traders/optimized/steel-bottle-screw-jack-35-ton.webp", "Steel bottle screw jacks, double lift steel jacks and cast iron bottle screw jacks."),
    ("national-hydraulic-jacks", "Hydraulic Jacks", "national-hydraulic-jacks.html", "web-products/national-traders/optimized/hydraulic-jack-35-ton.webp", "Hydraulic bottle jacks, trolley jacks, scissor jacks, high lift jacks and Chinese hydraulic jacks."),
]

PRODUCTS = [
    ("nt-spring-pin", "Spring Pin", "national-spring-pins", "nt-parts-p01-16.png", "Steel", "National Sales spring pin from Indian company catalogue."),
    ("nt-centre-bolt", "Centre Bolt", "national-spring-pins", "nt-parts-p02-05.png", "Steel", "Centre bolt for pickup, TATA and Mahindra applications."),
    ("nt-balance-rod-bolt", "Balance Rod Bolt", "national-spring-pins", "nt-parts-p02-16.png", "Steel", "Balance rod bolt for commercial vehicle suspension applications."),
    ("nt-maxi-truck-bolt", "Maxi-Truck Bolt", "national-spring-pins", "nt-parts-p02-08.png", "Steel", "Maxi-Truck bolt from National Sales catalogue."),
    ("nt-ace-single-nut", "Ace Single Nut", "national-spring-pins", "nt-parts-p02-20.png", "Steel", "Ace single nut from National Sales catalogue."),
    ("nt-sumo-207-single-nut", "Sumo/207 Single Nut", "national-spring-pins", "nt-parts-p03-07.png", "Steel", "Sumo and 207 single nut from catalogue range."),
    ("nt-eye-bolt-dost", "Eye Bolt Dost", "national-spring-pins", "nt-parts-p01-19.png", "Steel", "Eye bolt for Dost applications."),
    ("nt-407-om-bolt", "407 O/M Bolt", "national-spring-pins", "nt-parts-p02-04.png", "Steel", "407 old model bolt from National Sales catalogue."),
    ("nt-407-long-bolt", "407 Long Bolt", "national-spring-pins", "nt-parts-p02-09.png", "Steel", "407 long bolt from auto parts range."),
    ("nt-608-rear-bolt", "608 Rear Bolt", "national-spring-pins", "nt-parts-p02-14.png", "Steel", "608 rear bolt from National Sales range."),
    ("nt-608-front-bolt", "608 Front Bolt", "national-spring-pins", "nt-parts-p02-15.png", "Steel", "608 front bolt from National Sales range."),
    ("nt-407-turbo-bolt", "407 Turbo Bolt", "national-spring-pins", "nt-parts-p02-11.png", "Steel", "407 Turbo bolt from catalogue range."),
    ("nt-ace-double-nut", "Ace Double Nut", "national-spring-pins", "nt-parts-p02-06.png", "Steel", "Ace double nut from commercial vehicle range."),
    ("nt-sumo-207-double-nut", "Sumo/207 Double Nut", "national-spring-pins", "nt-parts-p02-07.png", "Steel", "Sumo and 207 double nut from catalogue range."),
    ("nt-hub-bolt", "Hub Bolt", "national-spring-pins", "nt-parts-p02-05.png", "Steel", "Hub bolt for commercial vehicle wheel and hub applications."),
    ("nt-hub-nut", "Hub Nut", "national-spring-pins", "nt-parts-p04-02.png", "Steel", "Hub nut from National Sales Corporation range."),
    ("nt-spindle-check-nut", "Spindle Check Nut", "national-spring-pins", "nt-parts-p04-02.png", "Steel", "Spindle check nut from National Sales auto parts range."),
    ("nt-washer", "Washer", "national-spring-pins", "nt-parts-p04-16.png", "Steel", "Washer product from National Sales auto parts catalogue."),

    ("nt-shackle-assembly", "Shackle Assembly", "national-shackle-assembly", "nt-parts-p03-02.png", "Steel", "Shackle assembly for pickup, Maxi-Truck, Ace and Dost applications."),
    ("nt-pickup-shackle-assembly", "Pick-Up Shackle Assembly", "national-shackle-assembly", "nt-parts-p03-03.png", "Steel", "Pick-up shackle assembly from National Sales catalogue."),
    ("nt-ace-fixed-shackle", "Ace Fixed Type Shackle Assembly", "national-shackle-assembly", "nt-parts-p03-04.png", "Steel", "Ace fixed type shackle assembly."),
    ("nt-pickup-shackle-bolt", "Pick-Up Shackle Bolt", "national-shackle-assembly", "nt-parts-p01-13.png", "Steel", "Pick-up shackle bolt from National Sales Corporation range."),

    ("nt-shackle-plate", "Shackle Plate", "national-shackle-plate", "nt-parts-p03-13.png", "Steel", "Shackle plate including solid and Ace Super style variants."),
    ("nt-maxx-buffer", "Maxx Buffer", "national-shackle-plate", "nt-parts-p04-09.png", "Rubber / metal", "Maxx buffer from the Indian company catalogue."),
    ("nt-tube-bracket", "Maxx Tube Bracket", "national-shackle-plate", "nt-parts-p04-10.png", "Steel", "Tube bracket for Maxx vehicle applications."),
    ("nt-pickup-hanger", "Pickup Hanger", "national-shackle-plate", "nt-parts-p04-12.png", "Steel", "Pickup hanger from National Sales catalogue."),
    ("nt-spring-clamp", "Spring Clamp", "national-shackle-plate", "nt-parts-p04-05.png", "Steel", "Spring clamp range from commercial vehicle parts catalogue."),
    ("nt-shocker-plate-front", "Shocker Plate Front", "national-shackle-plate", "nt-parts-p04-17.png", "Steel", "Front shocker plate from catalogue range."),
    ("nt-shocker-plate-rear", "Shocker Plate Rear 6/12mm", "national-shackle-plate", "nt-parts-p04-18.png", "Steel", "Rear shocker plate in 6/12mm range."),

    ("nt-u-bolt", "U Bolt", "national-u-bolts", "nt-parts-p01-08.png", "Steel", "U bolt from National Sales catalogue."),
    ("nt-u-bolt-set", "U Bolt Set", "national-u-bolts", "nt-parts-p01-09.png", "Steel", "U bolt set in multiple sizes."),
    ("nt-pickup-u-bolt", "Pick-Up U Bolt", "national-u-bolts", "nt-parts-p03-09.png", "Steel", "Pick-up U bolt for suspension fitment."),
    ("nt-square-u-bolt", "Square U Bolt", "national-u-bolts", "nt-parts-p03-08.png", "Steel", "Square U bolt set from National Sales range."),
    ("nt-long-u-bolt", "Long U Bolt", "national-u-bolts", "nt-parts-p03-10.png", "Steel", "Long U bolt from commercial vehicle suspension range."),

    ("nt-spring-bush", "Spring Bush", "national-bushes", "nt-parts-p03-06.png", "Bush material as per catalogue", "Spring bush for commercial vehicle suspension service."),
    ("nt-rear-spring-bush", "Marshal Rear Spring Bush", "national-bushes", "nt-parts-p03-07.png", "Bush material as per catalogue", "Marshal rear spring bush from National Sales range."),

    ("nt-steel-screw-jack-25-ton", "Steel Bottle Screw Jack 25 Ton", "national-steel-jacks", "nt-jacks-p04-05.jp2", "Steel", "25 ton steel bottle screw jack."),
    ("nt-steel-screw-jack-35-ton", "Steel Bottle Screw Jack 35 Ton", "national-steel-jacks", "nt-jacks-p04-07.jp2", "Steel", "35 ton steel bottle screw jack."),
    ("nt-steel-screw-jack-45-ton", "Steel Bottle Screw Jack 45 Ton", "national-steel-jacks", "nt-jacks-p04-09.jp2", "Steel", "45 ton steel bottle screw jack."),
    ("nt-steel-screw-jack-50-ton", "Steel Bottle Screw Jack 50 Ton", "national-steel-jacks", "nt-jacks-p04-11.jp2", "Steel", "50 ton steel bottle screw jack."),
    ("nt-steel-screw-jack-75-ton", "Steel Bottle Screw Jack 75 Ton", "national-steel-jacks", "nt-jacks-p04-15.jp2", "Steel", "75 ton steel bottle screw jack."),
    ("nt-steel-screw-jack-100-ton", "Steel Bottle Screw Jack 100 Ton", "national-steel-jacks", "nt-jacks-p04-13.jp2", "Steel", "100 ton steel bottle screw jack."),
    ("nt-double-lift-steel-jack", "Double Lift Steel Jack", "national-steel-jacks", "nt-parts-p04-07.png", "Steel", "Double lift steel jack from catalogue range."),
    ("nt-cast-iron-screw-jack", "Cast Iron Bottle Screw Jack", "national-steel-jacks", "nt-jacks-p04-17.jp2", "Cast iron", "Cast iron bottle screw jack from National Traders range."),

    ("nt-hydraulic-jack-10-ton", "Hydraulic Jack 10 Ton", "national-hydraulic-jacks", "nt-jacks-p03-16.jp2", "Steel hydraulic assembly", "10 ton hydraulic bottle jack from National Traders catalogue."),
    ("nt-hydraulic-jack-35-ton", "Hydraulic Jack 35 Ton", "national-hydraulic-jacks", "nt-jacks-p03-08.jp2", "Steel hydraulic assembly", "35 ton hydraulic bottle jack."),
    ("nt-hydraulic-jack-75-ton", "Hydraulic Jack 75 Ton", "national-hydraulic-jacks", "nt-jacks-p03-10.jp2", "Steel hydraulic assembly", "75 ton hydraulic bottle jack."),
    ("nt-hydraulic-jack-100-ton", "Hydraulic Jack 100 Ton", "national-hydraulic-jacks", "nt-jacks-p03-13.jp2", "Steel hydraulic assembly", "100 ton hydraulic jack."),
    ("nt-hydraulic-jack-150-ton", "Hydraulic Jack 150 Ton", "national-hydraulic-jacks", "nt-jacks-p03-03.jp2", "Steel hydraulic assembly", "150 ton hydraulic jack from National Traders range."),
    ("nt-high-lift-jack", "High Lift Hydraulic Jack 1.5/2/2.5 Foot", "national-hydraulic-jacks", "nt-jacks-p05-05.jp2", "Steel hydraulic assembly", "High lift hydraulic jack in 1.5, 2 and 2.5 foot options."),
    ("nt-trolley-jack", "Trolley Jack", "national-hydraulic-jacks", "nt-jacks-p03-28.jp2", "Steel hydraulic assembly", "Trolley jack from National Traders catalogue."),
    ("nt-gearbox-scissor-jack", "Gear Box Scissor Jack", "national-hydraulic-jacks", "nt-jacks-p01-13.jp2", "Steel", "Gear box scissor jack from National Traders range."),
    ("nt-car-scissor-jack-rod", "Car Scissor Jack With Rod", "national-hydraulic-jacks", "nt-jacks-p05-09.jp2", "Steel", "Car scissor jack with rod."),
    ("nt-chinese-hydraulic-jack", "Chinese Hydraulic Jack 2/3/5/8/10/12 Ton", "national-hydraulic-jacks", "nt-parts-p04-23.png", "Steel hydraulic assembly", "Chinese hydraulic jack range in 2, 3, 5, 8, 10 and 12 ton options."),
]


def slugify(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def ensure_raw(source_name):
    target = RAW_ROOT / source_name
    if target.exists():
        return
    for prefix, pdf in PDFS:
        if not source_name.startswith(prefix):
            continue
        match = re.search(r"-p(\d+)-(\d+)\.", source_name)
        page_no = int(match.group(1))
        image_no = int(match.group(2))
        page = PdfReader(str(pdf)).pages[page_no - 1]
        image = page.images[image_no - 1]
        target.write_bytes(image.data)
        return
    raise FileNotFoundError(source_name)


def optimize_image(source_name, product_name):
    out = OPT_ROOT / f"{slugify(product_name)}.webp"
    if out.exists():
        return f"web-products/national-traders/optimized/{out.name}"
    ensure_raw(source_name)
    img = Image.open(RAW_ROOT / source_name)
    img = ImageOps.exif_transpose(img).convert("RGBA")
    img.thumbnail((900, 700), Image.Resampling.LANCZOS)
    img.save(out, "WEBP", quality=78, method=6)
    return f"web-products/national-traders/optimized/{out.name}"


def load_data():
    text = (ROOT / "product-data.js").read_text(encoding="utf-8")
    categories = json.loads(re.search(r"window.MAK_CATEGORIES = (.*?);\n\nwindow.MAK_PRODUCTS", text, re.S).group(1))
    products = json.loads(re.search(r"window.MAK_PRODUCTS = (.*);\s*$", text, re.S).group(1))
    return categories, products


def write_data(categories, products):
    (ROOT / "product-data.js").write_text(
        "window.MAK_CATEGORIES = "
        + json.dumps(categories, ensure_ascii=False, indent=2)
        + ";\n\nwindow.MAK_PRODUCTS = "
        + json.dumps(products, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )


def page_html(title, summary, image, slug):
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{html.escape(title)} - MAK Overseas</title><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="catalogue.css"></head><body><nav>
  <a class="brand-lockup" href="index.html"><img class="nav-logo" src="web-products/mak-logo-small.webp" alt="MAK Overseas logo"></a>
  <div class="nav-links"><a href="products.html">Products</a><a href="search.html">Search</a><a href="brands.html">Brands</a><a href="why-us.html">Why Us</a><a href="contact.html">Contact</a><a href="quote.html">Quote</a></div>
  <button class="icon-btn" id="openCart" aria-label="Open enquiry cart">&#128722;<span class="cart-count">0</span></button>
</nav><main><section class="hero"><div><a class="back" href="index.html">Back to Home</a><h1>{html.escape(title)}</h1><p>{html.escape(summary)}</p></div><div class="hero-img reveal"><img src="{html.escape(image)}" alt="{html.escape(title)}" loading="lazy"></div></section><div class="toolbar"><div><strong>{html.escape(title)}</strong><br><small id="itemCount">Loading products</small></div><input id="filterInput" type="search" placeholder="Search within {html.escape(title)}..."></div><section class="grid" id="productGrid" data-category="{html.escape(slug)}"></section><div class="notice">National Sales / National Traders catalogue category with product photos and names.</div></main><div class="cart-panel" id="cartPanel"><div class="cart-drawer"><div class="drawer-head"><h3>Enquiry Cart</h3><button class="close" data-close-cart>&times;</button></div><div class="cart-items" id="cartItems"></div><button class="checkout" id="checkoutBtn">Send Enquiry on WhatsApp</button></div></div><footer><div>MAK OVERSEAS</div><div>Head Office: GT Road, Miller Ganj, Ludhiana | +91 94652 63877 | Dubai: +971 52 535 5917</div></footer><script src="product-data.js"></script><script src="catalogue-ui.js"></script><script src="language.js"></script><script src="whatsapp-widget.js"></script></body></html>
"""


def main():
    categories, products = load_data()
    old_national_slugs = {c["slug"] for c in categories if c["slug"].startswith("national-")}
    categories = [c for c in categories if not c["slug"].startswith("national-")]
    products = [p for p in products if p.get("categorySlug") not in old_national_slugs and p.get("source") != "National Traders catalogue"]

    new_categories = []
    category_map = {}
    for slug, title, page, image, summary in CATEGORIES:
        category = {"slug": slug, "title": title, "page": page, "image": image, "summary": summary, "count": 0}
        new_categories.append(category)
        category_map[slug] = category

    for pid, name, slug, source_image, material, desc in PRODUCTS:
        category = category_map[slug]
        products.append({
            "id": pid,
            "sr": None,
            "code": "",
            "name": name,
            "category": category["title"],
            "categorySlug": slug,
            "page": category["page"],
            "image": optimize_image(source_image, name),
            "partNumbers": ["On request"],
            "material": material,
            "notes": "National Traders / National Sales Corporation",
            "desc": desc,
            "source": "National Traders catalogue",
        })

    categories.extend(new_categories)
    for category in categories:
        category["count"] = sum(1 for product in products if product["categorySlug"] == category["slug"])
    write_data(categories, products)

    old_pages = [
        "national-auto-parts.html",
        "national-screw-jacks.html",
        "national-wheel-spanners.html",
    ]
    for old_page in old_pages:
        path = ROOT / old_page
        if path.exists():
            path.unlink()

    for slug, title, page, image, summary in CATEGORIES:
        (ROOT / page).write_text(page_html(title, summary, image, slug), encoding="utf-8")

    for raw in RAW_ROOT.glob("nt-*"):
        if raw.is_file():
            raw.unlink()

    print(json.dumps({"national_categories": len(new_categories), "national_products": len(PRODUCTS), "total_products": len(products)}, indent=2))


if __name__ == "__main__":
    main()
