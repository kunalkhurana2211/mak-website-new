from pathlib import Path
import html
import json
import re

from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent
PDF = Path(r"C:\Users\DELL\Desktop\JCB_Pricelist_MKclaude.pdf")

CATEGORIES = [
    ("bolts-fasteners", "Bolts & Fasteners", "bolts.html", "web-products/teeth-cutter-bolt-small.webp", "JCB, excavator and truck bolts for cutters, wheels, hubs, pins and high-load joints."),
    ("pins-bushes", "Pins & Bushes", "bushes.html", "web-products/catalogue/p02-04.jpg", "Steel, alloy steel and alloy bronze bushes for JCB loader, bucket and steering assemblies."),
    ("pivot-pins", "Pivot Pins", "pivot-pins.html", "web-products/catalogue/p03-23.jpg", "Nitrided and alloy steel pivot pins for bucket, loader, boom and centre linkage points."),
    ("pin-collars-stub-axle", "Pin Collars & Stub Axle", "pin-collars-stub-axle.html", "web-products/catalogue/p02-28.jpg", "Bucket pin collars, boom pin collars and stub axle parts for JCB backhoe loaders."),
    ("shims-washers", "Shims & Washers", "shims-washers.html", "web-products/catalogue/p02-43.jpg", "Bucket pin, king pin, boom pin and KPC washers in multiple sizes."),
    ("steering-tie-rod", "Steering & Tie Rod", "steering-tie-rod.html", "web-products/catalogue/p03-28.jpg", "Tie rod pins, steering bushes, check nuts, eye bolts and stabilizer hardware."),
    ("bucket-boss-sleeves", "Bucket Boss & Sleeves", "bucket-boss-sleeves.html", "web-products/catalogue/p02-06.jpg", "Bucket bosses, dipper sleeves, loader sleeve sets and heavy joint clamps."),
    ("grease-nipples", "Grease Nipples", "grease-nipples.html", "web-products/catalogue/p03-10.jpg", "Straight and bend grease nipples for boom, service and lubrication points."),
    ("gear-parts", "Gear Parts", "gears.html", "web-products/catalogue/p04-34.jpg", "Annulus rings, planet gears, sun gears, carrier annulus and planetary gear assemblies."),
    ("kits", "Kits & Overhauls", "kits.html", "web-products/catalogue/p04-21.jpg", "Bucket kits, king pin kits and KPC overhaul kits for JCB repairs."),
    ("rods-tubes-links", "Rods, Tubes & Links", "rods-tubes-links.html", "web-products/catalogue/p03-32.jpg", "Slew, stabilizer, bucket, dipper, boom, lift and shovel rods, tubes and links."),
    ("jcb-teeth-cutters", "JCB Teeth & Cutters", "jcb-teeth.html", "web-products/catalogue/p03-30.jpg", "JCB centre teeth, side cutters, crocodile cutters and plain bucket teeth."),
    ("filters", "Filters", "filters.html", "web-products/catalogue/p04-36.jpg", "Oil, air, fuel and service filter products for JCB and heavy machinery."),
    ("tyres", "Tyres", "tyres.html", "web-products/catalogue/p04-23.jpg", "Backhoe loader, excavator, forklift, grader and truck tyres for site work."),
    ("electricals-lighting", "Electricals & Lighting", "electricals.html", "web-products/catalogue/p03-51.jpg", "Headlamps, working lamps, tail lamps, switches and meters."),
    ("seals-gaskets", "Seals & Gaskets", "seals-gaskets.html", "web-products/catalogue/p04-18.jpg", "Gaskets, oil seals, washers, hub repair kits, O-rings and friction plates."),
    ("tools-accessories", "Tools & Accessories", "tools-accessories.html", "web-products/catalogue/p03-10.jpg", "Grease guns, nozzles, hydraulic jacks, wheel spanners and service accessories."),
    ("truck-car-parts", "Truck & Car Parts", "truck-car-parts.html", "web-products/jcb-spare-parts-catalogue.jpg", "Truck hub wheel parts, spring pins, battery terminals, disc rotors and brackets."),
]

CAT_BY_SLUG = {c[0]: c for c in CATEGORIES}


def category_for_sr(sr):
    if 1 <= sr <= 21:
        return "bolts-fasteners"
    if 22 <= sr <= 50:
        return "pins-bushes"
    if 51 <= sr <= 98:
        return "pivot-pins"
    if 99 <= sr <= 104:
        return "pin-collars-stub-axle"
    if 105 <= sr <= 130:
        return "shims-washers"
    if 131 <= sr <= 149:
        return "steering-tie-rod"
    if 150 <= sr <= 164:
        return "bucket-boss-sleeves"
    if 165 <= sr <= 176:
        return "grease-nipples"
    if 177 <= sr <= 182:
        return "gear-parts"
    if 183 <= sr <= 188:
        return "kits"
    return "rods-tubes-links"


REPLACEMENTS = {
    "MKde": "Teeth",
    "HouMKng": "Housing",
    "Streering": "Steering",
    "Tipping Liver": "Tipping Lever",
    "Self flock": "Self lock",
    "self flock": "self lock",
    "Clump": "Clamp",
    "Shoval": "Shovel",
    "Road Extra": "Rod Extra",
    "Ass.": "Assembly",
    "COLLER": "COLLAR",
}

MATERIAL_PATTERNS = [
    (r"\bA/S\s+NTD\.?\b", "Alloy Steel with nitrided surface treatment"),
    (r"\bA/S\s+Nitrated\b", "Alloy Steel with nitrided surface treatment"),
    (r"\bA/S\s+Nitrided\b", "Alloy Steel with nitrided surface treatment"),
    (r"\bA/STEEL\s+NTD\.?\b", "Alloy Steel with nitrided surface treatment"),
    (r"\bA/Steel\s+NTD\.?\b", "Alloy Steel with nitrided surface treatment"),
    (r"\bALL\.?/BNZ\b", "Alloy Bronze"),
    (r"\bA/STEEL\b", "Alloy Steel"),
    (r"\bA/Steel\b", "Alloy Steel"),
    (r"\bA/S\b", "Alloy Steel"),
    (r"\bNTD\.?\b", "Nitrided surface treatment"),
    (r"\bNitrated\b", "Nitrided surface treatment"),
    (r"\bNitrided\b", "Nitrided surface treatment"),
    (r"\bTempered\b", "Tempered"),
    (r"\bSteel\b", "Steel"),
]

PART_PATTERNS = [
    r"\b(?:MK|SL|Sl)/?[A-Z0-9]+/[A-Z0-9./-]+\b",
    r"\b\d{3,4}/[A-Z0-9./-]+\b",
    r"\b\d{5,}/[A-Z0-9./-]+\b",
    r"\b\d{5,}\b",
    r"\b[A-Z]-\d{4}/\d{4}\b",
]


def clean_text(value):
    value = value.replace("–", "-").replace("—", "-")
    for old, new in REPLACEMENTS.items():
        value = value.replace(old, new)
    return re.sub(r"\s+", " ", value).strip()


def add_unique(items, value):
    if value and value not in items:
        items.append(value)


def extract_material(rest):
    materials = []
    work = rest
    for pattern, label in MATERIAL_PATTERNS:
        if re.search(pattern, work, flags=re.I):
            add_unique(materials, label)
            work = re.sub(pattern, " ", work, flags=re.I)
    work = re.sub(r"\(\s*\)", " ", work)
    return clean_text(work), materials


def extract_model(rest):
    notes = []
    work = rest
    for pattern, label in [(r"\bN/M\b", "New Model"), (r"\bO/M\b", "Old Model")]:
        if re.search(pattern, work, flags=re.I):
            add_unique(notes, label)
            work = re.sub(pattern, " ", work, flags=re.I)
    return clean_text(work), notes


def extract_parts(rest):
    parts = []
    for pattern in PART_PATTERNS:
        for match in re.finditer(pattern, rest, flags=re.I):
            part = match.group(0).strip(".,")
            if re.match(r"^\d{5,}$", part) and len(part) > 7:
                continue
            add_unique(parts, part)
    parts = [
        part for part in parts
        if not any(other != part and other.lower().endswith(part.lower()) for other in parts)
    ]
    work = rest
    for part in sorted(parts, key=len, reverse=True):
        work = re.sub(re.escape(part), " ", work, flags=re.I)
    return clean_text(work).strip(" -.,"), parts


def parse_line(line):
    match = re.match(r"^(\d+)\s+(.*)$", line)
    sr = int(match.group(1))
    rest = clean_text(match.group(2))
    code = ""
    tokens = rest.split()
    if tokens and re.match(r"^MK\d+[A-Z]?$", tokens[0], flags=re.I):
        code = tokens[0].upper()
        rest = " ".join(tokens[1:])
    rest, materials = extract_material(rest)
    rest, model_notes = extract_model(rest)
    rest, part_numbers = extract_parts(rest)
    name = clean_text(rest)
    if sr == 173:
        name = "Grease Nipple No. 15"
    if sr == 174:
        name = "Grease Nipple No. 18"
    if sr == 175:
        name = "Grease Nipple No. 23"
    if sr == 176:
        name = "Grease Nipple No. 31"
    if sr == 62:
        name = "Thrust Bearing"
    if not name:
        name = "JCB Spare Part"
    slug = category_for_sr(sr)
    category = CAT_BY_SLUG[slug]
    if not materials:
        if slug == "pivot-pins":
            materials = ["Alloy Steel with nitrided surface treatment"]
        elif slug == "pins-bushes" and "bush" in name.lower():
            materials = ["As per catalogue / available on request"]
        else:
            materials = ["Available on request"]
    return {
        "id": f"mk-{sr:03d}",
        "sr": sr,
        "code": code,
        "name": name,
        "category": category[1],
        "categorySlug": slug,
        "page": category[2],
        "image": category[3],
        "partNumbers": part_numbers,
        "material": ", ".join(materials),
        "notes": ", ".join(model_notes),
        "desc": f"{category[1]} item from MAK JCB pricelist.",
        "source": "JCB pricelist",
    }


EXTRAS = [
    ("jcb-teeth-center", "JCB Teeth Center", "jcb-teeth-cutters", ["On request"], "Cast alloy steel", "Center bucket tooth for JCB digging and loading buckets.", "web-products/catalogue/p03-30.jpg"),
    ("plain-type-tooth", "Plain Type Bucket Tooth", "jcb-teeth-cutters", ["On request"], "Cast alloy steel", "Plain type JCB bucket tooth for regular site work.", "web-products/catalogue/p03-30.jpg"),
    ("crocodile-side-cutter", "Crocodile Type Side Cutter", "jcb-teeth-cutters", ["On request"], "Cast alloy steel", "Aggressive crocodile side cutter profile for bucket edge protection.", "web-products/catalogue/p03-30.jpg"),
    ("jcb-side-cutter", "JCB Side Cutter Teeth", "jcb-teeth-cutters", ["On request"], "Cast alloy steel", "Left and right side cutter teeth for JCB buckets.", "web-products/catalogue/p03-30.jpg"),
    ("terex-side-cutter", "Terex Side Cutter", "jcb-teeth-cutters", ["On request"], "Cast alloy steel", "Terex style side cutter for bucket applications.", "web-products/catalogue/p03-30.jpg"),
    ("jcb-oil-filter", "JCB Oil Filter", "filters", ["On request"], "Filter media / metal casing", "Oil filter for JCB routine service.", "web-products/catalogue/p04-36.jpg"),
    ("jcb-air-filter-kit", "JCB Air Filter Kit", "filters", ["On request"], "Filter media / rubber seal", "Air filter kit for dusty site operation.", "web-products/catalogue/p04-36.jpg"),
    ("air-filter-element", "Air Filter Element", "filters", ["On request"], "Filter media", "Replacement air filter element.", "web-products/catalogue/p04-36.jpg"),
    ("fuel-filter", "Fuel Filter", "filters", ["On request"], "Filter media / metal casing", "Fuel filtration product for heavy machinery.", "web-products/catalogue/p04-36.jpg"),
    ("backhoe-loader-tyre", "Backhoe Loader Tyre", "tyres", ["On request"], "Rubber compound", "Backhoe loader tyre for JCB and site machines.", "web-products/catalogue/p04-23.jpg"),
    ("excavator-tyre", "Excavator Tyre", "tyres", ["On request"], "Rubber compound", "Industrial tyre for excavator/site equipment enquiries.", "web-products/catalogue/p04-23.jpg"),
    ("forklift-tyre", "Forklift Tyre", "tyres", ["On request"], "Rubber compound", "Forklift tyre for yards and warehouses.", "web-products/catalogue/p04-23.jpg"),
    ("jcb-working-lamp", "JCB Working Lamp", "electricals-lighting", ["On request"], "Electrical assembly", "Working lamp for JCB and construction equipment.", "web-products/catalogue/p03-51.jpg"),
    ("jcb-headlamp", "JCB Headlamp", "electricals-lighting", ["On request"], "Electrical assembly", "Headlamp for JCB machines.", "web-products/catalogue/p03-51.jpg"),
    ("jcb-tail-lamp", "JCB Tail Lamp", "electricals-lighting", ["On request"], "Electrical assembly", "Tail lamp for JCB machines.", "web-products/catalogue/p03-51.jpg"),
    ("forward-reverse-switch", "Forward & Reverse Switch", "electricals-lighting", ["On request"], "Electrical assembly", "Forward and reverse switch for JCB applications.", "web-products/catalogue/p03-51.jpg"),
    ("water-temperature-meter", "Water Temperature Meter", "electricals-lighting", ["On request"], "Electrical assembly", "Temperature meter for machine monitoring.", "web-products/catalogue/p03-51.jpg"),
    ("gaskets", "Gaskets", "seals-gaskets", ["On request"], "Gasket material", "Gaskets for JCB and heavy machinery repairs.", "web-products/catalogue/p04-18.jpg"),
    ("oil-seal-washers", "Oil Seal & Washers", "seals-gaskets", ["On request"], "Rubber / steel", "Oil seals and washers in multiple sizes.", "web-products/catalogue/p04-18.jpg"),
    ("hub-repair-kit", "Hub Repair Kit", "seals-gaskets", ["On request"], "Mixed kit", "Hub repair kit for maintenance and rebuild work.", "web-products/catalogue/p04-18.jpg"),
    ("friction-plates", "JCB Friction Plates", "seals-gaskets", ["On request"], "Friction material / steel", "Friction plates for drivetrain and brake systems.", "web-products/catalogue/p04-18.jpg"),
    ("grease-gun", "Grease Gun", "tools-accessories", ["On request"], "Steel assembly", "Grease gun for workshop and site lubrication.", "web-products/catalogue/p03-10.jpg"),
    ("grease-bucket", "Grease Bucket", "tools-accessories", ["On request"], "Lubricant product", "Grease bucket for service teams and machinery maintenance.", "web-products/catalogue/p03-10.jpg"),
    ("hydraulic-jack", "Hydraulic Jack", "tools-accessories", ["On request"], "Steel hydraulic assembly", "Hydraulic jack for site and workshop support.", "web-products/catalogue/p03-10.jpg"),
    ("wheel-spanner", "Wheel Spanner", "tools-accessories", ["On request"], "Steel", "L-type and cross wheel spanners.", "web-products/catalogue/p03-10.jpg"),
    ("truck-hub-wheel-bolts", "Truck Hub Wheel Centre Bolts", "truck-car-parts", ["On request"], "Steel", "Centre bolts and hub wheel fasteners for trucks.", "web-products/jcb-spare-parts-catalogue.jpg"),
    ("u-bolts", "U-Bolts All Sizes", "truck-car-parts", ["On request"], "Steel", "U-bolts in multiple sizes.", "web-products/jcb-spare-parts-catalogue.jpg"),
    ("battery-terminals", "Battery Terminals", "truck-car-parts", ["On request"], "Metal electrical terminal", "Battery terminals for truck and machinery electrical work.", "web-products/jcb-spare-parts-catalogue.jpg"),
    ("disc-rotor", "Disc Rotor", "truck-car-parts", ["On request"], "Cast iron / steel", "Disc rotor from truck and car parts range.", "web-products/jcb-spare-parts-catalogue.jpg"),
]


def read_pdf_products():
    reader = PdfReader(str(PDF))
    lines = []
    image_count = 0
    for page in reader.pages:
        image_count += len(getattr(page, "images", []))
        for line in (page.extract_text() or "").splitlines():
            line = line.strip()
            if re.match(r"^\d+\s+", line):
                lines.append(line)
    return [parse_line(line) for line in lines], len(lines), image_count


def make_data(products):
    categories = []
    for slug, title, page, image, summary in CATEGORIES:
        categories.append({
            "slug": slug,
            "title": title,
            "page": page,
            "image": image,
            "summary": summary,
            "count": sum(1 for product in products if product["categorySlug"] == slug),
        })
    return categories


def write_data(categories, products):
    data = (
        "window.MAK_CATEGORIES = "
        + json.dumps(categories, ensure_ascii=False, indent=2)
        + ";\n\nwindow.MAK_PRODUCTS = "
        + json.dumps(products, ensure_ascii=False, indent=2)
        + ";\n"
    )
    (ROOT / "product-data.js").write_text(data, encoding="utf-8")


CSS = r"""
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{--gold:#D4890A;--gold2:#F2A72B;--orange:#E05A00;--dark:#101010;--dark2:#171717;--dark3:#222;--steel:#93A0AA;--light:#F2EDE4;--green:#25D366;--H:'Barlow Condensed',sans-serif;--B:'Barlow',sans-serif}
html{scroll-behavior:smooth}body{font-family:var(--B);background:var(--dark);color:var(--light);line-height:1.55;overflow-x:hidden}a{text-decoration:none;color:inherit}button,input{font-family:inherit}
nav{position:sticky;top:0;z-index:50;min-height:64px;padding:.7rem 2rem;display:flex;align-items:center;justify-content:space-between;gap:1rem;background:rgba(10,10,10,.84);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.08)}
.brand-lockup{display:flex;align-items:center}.nav-logo{width:130px;height:46px;object-fit:contain;filter:invert(1) brightness(1.24)}.nav-links{display:flex;gap:1.1rem;align-items:center}.nav-links a{font-size:.76rem;letter-spacing:1.5px;text-transform:uppercase;color:var(--steel);font-weight:800}.nav-links a:hover{color:var(--gold)}
.icon-btn{width:40px;height:40px;border-radius:50%;border:1px solid rgba(255,255,255,.16);background:rgba(255,255,255,.06);color:#fff;display:grid;place-items:center;cursor:pointer;position:relative}.icon-btn:hover{background:var(--gold);color:#111}.cart-count{position:absolute;right:-4px;top:-5px;min-width:18px;height:18px;border-radius:20px;background:var(--orange);font-size:11px;font-weight:900;display:grid;place-items:center;padding:0 4px}
.hero{min-height:42vh;display:grid;grid-template-columns:1.05fr .95fr;align-items:end;gap:2rem;padding:5.5rem 2.5rem 3rem;background:radial-gradient(circle at 82% 16%,rgba(212,137,10,.22),transparent 30%),linear-gradient(135deg,#090909,#171717)}.hero h1{font-family:var(--H);font-size:clamp(3rem,7vw,5.8rem);line-height:.9;text-transform:uppercase;font-weight:900}.hero p{max-width:720px;color:#bdc7cf;margin-top:1rem}.hero-img{height:300px;background:linear-gradient(145deg,#f4f4f4,#d6d6d6);display:flex;align-items:center;justify-content:center;padding:2rem;overflow:hidden}.hero-img img{max-width:100%;max-height:100%;object-fit:contain}.back{font-family:var(--H);font-weight:900;letter-spacing:1px;color:var(--gold);text-transform:uppercase}
.toolbar{display:flex;justify-content:space-between;gap:1rem;align-items:center;padding:1.4rem 2.5rem;background:#131313;border-top:1px solid #242424;border-bottom:1px solid #242424}.toolbar input{min-width:min(520px,100%);padding:.9rem 1rem;border:1px solid #333;background:#fff;color:#111}.toolbar strong{font-family:var(--H);font-size:1.2rem;text-transform:uppercase;letter-spacing:1px}.toolbar small{color:var(--steel)}
.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1px;background:#2b2b2b;margin:2.5rem}.card{background:var(--dark2);min-height:420px;display:flex;flex-direction:column;transition:.25s;overflow:hidden}.card:hover{transform:translateY(-5px);background:#202020}.imgbox{height:190px;background:linear-gradient(145deg,#f4f4f4,#d8d8d8);display:flex;align-items:center;justify-content:center;padding:18px}.imgbox img{width:100%;height:100%;object-fit:contain}.body{padding:1.35rem;display:flex;flex:1;flex-direction:column;gap:.65rem}.tag{font-size:.65rem;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:900}.name{font-family:var(--H);font-size:1.28rem;text-transform:uppercase;font-weight:900;line-height:1.05}.part-line{font-size:.78rem;color:#fff;background:rgba(212,137,10,.12);border:1px solid rgba(212,137,10,.25);padding:.45rem .55rem;line-height:1.45}.meta{display:grid;gap:.35rem;font-size:.78rem;color:var(--steel)}.meta b{color:#d7dee4;font-weight:800}.desc{color:var(--steel);font-size:.86rem}.actions{display:flex;gap:.55rem;flex-wrap:wrap;margin-top:auto}.buy,.ghost,.whatsapp{border:0;cursor:pointer;padding:.7rem .9rem;font-family:var(--H);font-weight:900;letter-spacing:1px;text-transform:uppercase;transition:.2s}.buy{background:linear-gradient(135deg,var(--gold),var(--gold2));color:#111}.ghost{background:transparent;color:#fff;border:1px solid #444}.whatsapp{background:var(--green);color:#fff;width:100%}.buy:hover,.ghost:hover,.whatsapp:hover{transform:translateY(-2px)}
.category-card{min-height:390px}.notice{margin:0 2.5rem 2.5rem;padding:1.2rem 1.4rem;background:#151515;border:1px solid #2a2a2a;color:#aab4bc}.content{padding:3rem 2.5rem;max-width:1180px}.section-title{font-family:var(--H);font-size:2rem;text-transform:uppercase}
.cart-panel{position:fixed;inset:0;z-index:100;background:rgba(0,0,0,.72);opacity:0;pointer-events:none;transition:.25s}.cart-panel.open{opacity:1;pointer-events:auto}.cart-drawer{position:absolute;right:0;top:0;height:100%;width:min(440px,100%);background:#111;border-left:1px solid #333;transform:translateX(100%);transition:.28s;display:flex;flex-direction:column}.cart-panel.open .cart-drawer{transform:translateX(0)}.drawer-head{padding:1.25rem;border-bottom:1px solid #333;display:flex;justify-content:space-between}.drawer-head h3{font-family:var(--H);font-size:1.35rem;text-transform:uppercase}.close{background:transparent;color:#fff;border:0;font-size:1.7rem;cursor:pointer}.cart-items{padding:1rem;overflow:auto;flex:1}.cart-item{display:grid;grid-template-columns:1fr auto;gap:.75rem;padding:.9rem 0;border-bottom:1px solid #252525}.cart-item small{display:block;color:var(--steel);margin-top:.25rem}.qty{display:flex;align-items:center;gap:.45rem;margin-top:.45rem}.qty button{width:26px;height:26px;background:#222;color:#fff;border:1px solid #444}.checkout{margin:1rem;background:var(--green);color:#fff;border:0;padding:.9rem;font-weight:900;text-transform:uppercase;cursor:pointer}
footer{padding:1.5rem 2.5rem;background:#0a0a0a;color:#555;font-size:.78rem;display:flex;justify-content:space-between;gap:1rem;flex-wrap:wrap}.reveal{opacity:0;transform:translateY(24px);transition:.7s}.reveal.visible{opacity:1;transform:translateY(0)}
@media(max-width:820px){nav{padding:.85rem 1rem;flex-wrap:wrap}.nav-links{order:3;width:100%;overflow:auto}.hero{grid-template-columns:1fr;padding:3.5rem 1.25rem 2rem}.hero-img{height:220px}.toolbar{padding:1rem 1.25rem;flex-direction:column;align-items:stretch}.grid{margin:1.25rem;grid-template-columns:1fr}.content{padding:2rem 1.25rem}footer{padding:1.25rem;flex-direction:column}.card{min-height:0}}
"""


UI = r"""
(function(){
const PHONE='919465263877',products=window.MAK_PRODUCTS||[],categories=window.MAK_CATEGORIES||[],$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const esc=s=>String(s||'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
let cart=JSON.parse(localStorage.getItem('makClaudeCart')||'[]');
function productLabel(p){const pn=(p.partNumbers||[]).filter(x=>x&&x!=='On request').join(', ');return pn?`${p.name} (${pn})`:p.name}
function save(){localStorage.setItem('makClaudeCart',JSON.stringify(cart));renderCart();updateCount()}
function updateCount(){$$('.cart-count').forEach(el=>el.textContent=cart.reduce((s,i)=>s+i.qty,0))}
function addToCart(id){const p=products.find(x=>x.id===id)||{id,name:id,partNumbers:[]},title=productLabel(p),item=cart.find(i=>i.id===id);if(item)item.qty++;else cart.push({id,title,qty:1,partNumbers:p.partNumbers||[]});save();$('#cartPanel')?.classList.add('open')}
function enquire(id){const p=products.find(x=>x.id===id),title=p?productLabel(p):id,msg=`Hello MAK Overseas, I want to enquire about:\n${title}\n\nMachine model:\nQuantity:\nLocation:`;window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent(msg)}`,'_blank')}
function renderCart(){const box=$('#cartItems');if(!box)return;box.innerHTML=cart.length?cart.map((i,idx)=>`<div class="cart-item"><div><strong>${esc(i.title)}</strong><small>${esc((i.partNumbers||[]).join(', '))}</small><div class="qty"><button data-qty="down" data-index="${idx}">-</button><span>${i.qty}</span><button data-qty="up" data-index="${idx}">+</button></div></div><button class="close" data-remove="${idx}">&times;</button></div>`).join(''):'<p style="color:#999;padding:1rem">Your enquiry cart is empty.</p>'}
function searchText(p){return [p.name,p.code,(p.partNumbers||[]).join(' '),p.material,p.category,p.notes,p.desc,p.source].join(' ').toLowerCase()}
function partLine(p){const parts=(p.partNumbers||[]).join(', ');return `<div class="part-line"><b>Part No:</b> ${esc(parts||'Available on request')}</div>`}
function productCard(p){const code=p.code?`<div><b>Code:</b> ${esc(p.code)}</div>`:'',notes=p.notes?`<div><b>Note:</b> ${esc(p.notes)}</div>`:'';return `<article class="card reveal" data-search="${esc(searchText(p))}"><a class="imgbox" href="${esc(p.page)}"><img src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy"></a><div class="body"><div class="tag">${esc(p.category)}</div><div class="name">${esc(p.name)}</div>${partLine(p)}<div class="meta">${code}<div><b>Material:</b> ${esc(p.material||'Available on request')}</div>${notes}</div><p class="desc">${esc(p.desc)}</p><div class="actions"><button class="buy" data-add="${esc(p.id)}">Add to Cart</button><a class="ghost" href="${esc(p.page)}">Category</a><button class="whatsapp" data-enquire="${esc(p.id)}">WhatsApp Enquiry</button></div></div></article>`}
function categoryCard(c){return `<article class="card category-card reveal" data-search="${esc((c.title+' '+c.summary).toLowerCase())}"><a class="imgbox" href="${esc(c.page)}"><img src="${esc(c.image)}" alt="${esc(c.title)}" loading="lazy"></a><div class="body"><div class="tag">${c.count} products</div><div class="name">${esc(c.title)}</div><p class="desc">${esc(c.summary)}</p><div class="actions"><a class="ghost" href="${esc(c.page)}">View Products</a></div></div></article>`}
function attachReveal(){const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});$$('.reveal').forEach(el=>obs.observe(el))}
function filterCards(q){const term=q.trim().toLowerCase();$$('[data-search]').forEach(card=>{card.style.display=card.dataset.search.includes(term)?'flex':'none'})}
function drawProductsPage(){const grid=$('#categoryGrid');if(!grid)return;grid.innerHTML=categories.map(categoryCard).join('');const all=$('#allProductGrid');if(all)all.innerHTML=products.map(productCard).join('');$('#filterInput')?.addEventListener('input',e=>filterCards(e.target.value));attachReveal()}
function drawCategoryPage(){const grid=$('#productGrid');if(!grid)return;const slug=grid.dataset.category,list=products.filter(p=>p.categorySlug===slug);$('#itemCount')&&( $('#itemCount').textContent=`${list.length} products` );grid.innerHTML=list.map(productCard).join('')||'<p class="notice">No products found.</p>';$('#filterInput')?.addEventListener('input',e=>filterCards(e.target.value));attachReveal()}
function drawSearchPage(){const grid=$('#searchGrid');if(!grid)return;const input=$('#searchAll'),initial=new URLSearchParams(location.search).get('q')||'';if(input)input.value=initial;function draw(q){const term=q.trim().toLowerCase(),list=term?products.filter(p=>searchText(p).includes(term)):products;$('#itemCount')&&( $('#itemCount').textContent=`${list.length} results` );grid.innerHTML=list.map(productCard).join('')||'<p class="notice">No products found. Try a product name, code, material, or part number like 990/14900.</p>';attachReveal()}input?.addEventListener('input',e=>draw(e.target.value));draw(initial)}
function initCart(){const panel=$('#cartPanel');$('#openCart')?.addEventListener('click',()=>panel?.classList.add('open'));$('[data-close-cart]')?.addEventListener('click',()=>panel?.classList.remove('open'));panel?.addEventListener('click',e=>{if(e.target.id==='cartPanel')panel.classList.remove('open')});$('#checkoutBtn')?.addEventListener('click',()=>{if(!cart.length)return;const lines=cart.map((i,n)=>`${n+1}. ${i.title} x ${i.qty}`).join('\n');window.open(`https://wa.me/${PHONE}?text=${encodeURIComponent('Hello MAK Overseas, I want to enquire about:\n\n'+lines+'\n\nName:\nPhone:\nMachine model:\nLocation:')}`,'_blank')});document.addEventListener('click',e=>{const add=e.target.closest('[data-add]');if(add){addToCart(add.dataset.add);return}const en=e.target.closest('[data-enquire]');if(en){enquire(en.dataset.enquire);return}const rm=e.target.closest('[data-remove]');if(rm){cart.splice(Number(rm.dataset.remove),1);save();return}const qty=e.target.closest('[data-qty]');if(qty){const idx=Number(qty.dataset.index);if(qty.dataset.qty==='up')cart[idx].qty++;else cart[idx].qty--;if(cart[idx]?.qty<1)cart.splice(idx,1);save();return}});renderCart();updateCount()}
window.MAKCatalogue={addToCart,enquire,productLabel};
document.addEventListener('DOMContentLoaded',()=>{drawProductsPage();drawCategoryPage();drawSearchPage();initCart();attachReveal()});
})();
"""


def base_page(title, subtitle, hero_image, main_html):
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{html.escape(title)} - MAK Overseas</title><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="catalogue.css"></head><body><nav>
  <a class="brand-lockup" href="index.html"><img class="nav-logo" src="web-products/mak-logo-small.webp" alt="MAK Overseas logo"></a>
  <div class="nav-links"><a href="products.html">Products</a><a href="search.html">Search</a><a href="brands.html">Brands</a><a href="why-us.html">Why Us</a><a href="contact.html">Contact</a><a href="quote.html">Quote</a></div>
  <button class="icon-btn" id="openCart" aria-label="Open enquiry cart">&#128722;<span class="cart-count">0</span></button>
</nav><main><section class="hero"><div><a class="back" href="index.html">Back to Home</a><h1>{html.escape(title)}</h1><p>{html.escape(subtitle)}</p></div><div class="hero-img reveal"><img src="{html.escape(hero_image)}" alt="{html.escape(title)}" loading="lazy"></div></section>{main_html}</main><div class="cart-panel" id="cartPanel"><div class="cart-drawer"><div class="drawer-head"><h3>Enquiry Cart</h3><button class="close" data-close-cart>&times;</button></div><div class="cart-items" id="cartItems"></div><button class="checkout" id="checkoutBtn">Send Enquiry on WhatsApp</button></div></div><footer><div>MAK OVERSEAS</div><div>Head Office: GT Road, Miller Ganj, Ludhiana | +91 94652 63877 | Dubai: +971 52 535 5917</div></footer><script src="product-data.js"></script><script src="catalogue-ui.js"></script><script src="language.js"></script><script src="whatsapp-widget.js"></script></body></html>
"""


def write_pages():
    (ROOT / "catalogue.css").write_text(CSS.strip() + "\n", encoding="utf-8")
    (ROOT / "catalogue-ui.js").write_text(UI.strip() + "\n", encoding="utf-8")
    products_main = """<div class="toolbar"><div><strong>Product Categories</strong><br><small>All categories from MAK catalogue and pricelist</small></div><input id="filterInput" type="search" placeholder="Search categories, products, code or part number..."></div><section class="grid" id="categoryGrid"></section><div class="content"><div class="tag">Complete Pricelist</div><h2 class="section-title">All Products With Part Numbers</h2><p class="desc">This list includes the JCB pricelist items plus the older MAK product categories. Search by product name, MAK code, material, or part number.</p></div><section class="grid" id="allProductGrid"></section>"""
    (ROOT / "products.html").write_text(base_page("Products", "Complete MAK Overseas product range with categories, part numbers, materials and WhatsApp enquiry cart.", "web-products/jcb-spare-parts-catalogue.jpg", products_main), encoding="utf-8")
    search_main = """<div class="toolbar"><div><strong>Catalogue Search</strong><br><small id="itemCount">Search name, MAK code, material or part number</small></div><input id="searchAll" type="search" placeholder="Try 990/14900, MK001, pivot pin, alloy bronze..."></div><section class="grid" id="searchGrid"></section><div class="notice">Search now supports part numbers such as 990/14900, catalogue codes such as MK001, material names such as alloy bronze, and product categories.</div>"""
    (ROOT / "search.html").write_text(base_page("Search Products", "Find parts by product name, category, MAK code, part number, machine type, or material.", "web-products/jcb-spare-parts-catalogue.jpg", search_main), encoding="utf-8")
    for slug, title, page, image, summary in CATEGORIES:
        main = f"""<div class="toolbar"><div><strong>{html.escape(title)}</strong><br><small id="itemCount">Loading products</small></div><input id="filterInput" type="search" placeholder="Search within {html.escape(title)} by name, code or part number..."></div><section class="grid" id="productGrid" data-category="{html.escape(slug)}"></section><div class="notice">Every item can be added to the enquiry cart or sent directly on WhatsApp with its product name and part number.</div>"""
        (ROOT / page).write_text(base_page(title, summary, image, main), encoding="utf-8")


def main():
    products, line_count, image_count = read_pdf_products()
    for pid, name, slug, parts, material, desc, image in EXTRAS:
        category = CAT_BY_SLUG[slug]
        products.append({
            "id": pid,
            "sr": None,
            "code": "",
            "name": name,
            "category": category[1],
            "categorySlug": slug,
            "page": category[2],
            "image": image,
            "partNumbers": parts,
            "material": material,
            "notes": "",
            "desc": desc,
            "source": "Existing MAK list",
        })
    categories = make_data(products)
    write_data(categories, products)
    write_pages()
    print(json.dumps({"pdf_lines": line_count, "pdf_images": image_count, "products": len(products), "categories": len(categories)}, indent=2))


if __name__ == "__main__":
    main()
