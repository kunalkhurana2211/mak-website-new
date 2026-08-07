from pathlib import Path
import html
import json
import re

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent
DATA = ROOT / "product-data.js"
PRODUCT_PAGE_DIR = ROOT / "product-pages"
WATERMARK_DIR = ROOT / "web-products" / "watermarked"
PRODUCT_PAGE_DIR.mkdir(exist_ok=True)
WATERMARK_DIR.mkdir(parents=True, exist_ok=True)


def slugify(value):
    return re.sub(r"[^a-z0-9]+", "-", str(value).lower()).strip("-") or "product"


def load_font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibrib.ttf" if bold else r"C:\Windows\Fonts\calibri.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def load_data():
    text = DATA.read_text(encoding="utf-8")
    categories = json.loads(re.search(r"window.MAK_CATEGORIES = (.*?);\n\nwindow.MAK_PRODUCTS", text, re.S).group(1))
    products = json.loads(re.search(r"window.MAK_PRODUCTS = (.*);\s*$", text, re.S).group(1))
    return categories, products


def write_data(categories, products):
    DATA.write_text(
        "window.MAK_CATEGORIES = "
        + json.dumps(categories, ensure_ascii=False, indent=2)
        + ";\n\nwindow.MAK_PRODUCTS = "
        + json.dumps(products, ensure_ascii=False, indent=2)
        + ";\n",
        encoding="utf-8",
    )


def text_size(draw, text, font):
    box = draw.textbbox((0, 0), text, font=font)
    return box[2] - box[0], box[3] - box[1]


def add_mak_watermark(canvas):
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    main_font = load_font(34, True)
    small_font = load_font(15, True)
    text = "MAK OVERSEAS"
    w, h = text_size(draw, text, main_font)
    x = canvas.width - w - 34
    y = canvas.height - h - 34

    draw.rounded_rectangle(
        (x - 16, y - 12, x + w + 16, y + h + 14),
        radius=8,
        fill=(0, 0, 0, 155),
        outline=(212, 137, 10, 220),
        width=2,
    )
    draw.text((x, y), text, font=main_font, fill=(255, 222, 150, 238))

    faint = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    faint_draw = ImageDraw.Draw(faint)
    fw, fh = text_size(faint_draw, text, main_font)
    faint_draw.text(
        ((canvas.width - fw) // 2, (canvas.height - fh) // 2),
        text,
        font=main_font,
        fill=(255, 255, 255, 30),
    )
    faint = faint.rotate(-24, resample=Image.Resampling.BICUBIC, center=(canvas.width // 2, canvas.height // 2))
    overlay.alpha_composite(faint)
    draw.text((32, canvas.height - 50), "Heavy Machinery Spare Parts", font=small_font, fill=(210, 218, 224, 180))
    canvas.alpha_composite(overlay)


def make_watermarked_image(src_rel):
    src_rel = src_rel.replace("\\", "/")
    if src_rel.startswith("web-products/watermarked/"):
        return src_rel
    src = ROOT / src_rel
    if not src.exists():
        return src_rel
    out = WATERMARK_DIR / f"{slugify(src_rel)}.webp"
    if out.exists():
        return f"web-products/watermarked/{out.name}"

    image = Image.open(src)
    image = ImageOps.exif_transpose(image).convert("RGBA")
    image = ImageEnhance.Contrast(image).enhance(1.05)
    image = ImageEnhance.Sharpness(image).enhance(1.12)
    image.thumbnail((900, 600), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (1000, 750), (18, 17, 14, 255))
    bg = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    bg_draw.rectangle((0, 0, canvas.width, canvas.height), fill=(18, 17, 14, 255))
    bg_draw.ellipse((-170, -140, 470, 285), fill=(212, 137, 10, 64))
    bg_draw.ellipse((650, 500, 1200, 940), fill=(224, 90, 0, 34))
    bg_draw.rectangle((34, 34, canvas.width - 34, canvas.height - 34), outline=(212, 137, 10, 70), width=2)
    canvas.alpha_composite(bg)

    shadow = Image.new("RGBA", image.size, (0, 0, 0, 135)).filter(ImageFilter.GaussianBlur(18))
    x = (canvas.width - image.width) // 2
    y = (canvas.height - image.height) // 2 - 24
    canvas.alpha_composite(shadow, (x + 12, y + 18))
    canvas.alpha_composite(image, (x, y))
    add_mak_watermark(canvas)
    canvas.convert("RGB").save(out, "WEBP", quality=82, method=6)
    image.close()
    return f"web-products/watermarked/{out.name}"


def rel_from_product_page(path):
    if path.startswith(("http://", "https://", "mailto:", "tel:")):
        return path
    return "../" + path


def product_page(product, categories):
    parts = ", ".join(product.get("partNumbers") or []) or "Available on request"
    category = next((c for c in categories if c["slug"] == product["categorySlug"]), None)
    category_page = category["page"] if category else product.get("page", "products.html")
    image = rel_from_product_page(product["image"])
    title = product["name"]
    safe_title = html.escape(title)
    code = product.get("code") or "Available on request"
    notes = product.get("notes") or "Send machine model/photo for confirmation"
    source = product.get("source") or "MAK catalogue"
    desc = product.get("desc") or f"{title} from MAK Overseas product catalogue."
    message = f"Hello MAK Overseas, I want to enquire about: {title}"
    if parts and parts != "On request":
        message += f" | Part No: {parts}"
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>{safe_title} - MAK Overseas</title><link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800;900&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet"><link rel="stylesheet" href="../catalogue.css"><style>
.product-detail{{display:grid;grid-template-columns:minmax(280px,.92fr) 1.08fr;gap:1px;background:#2b2b2b;margin:2.5rem}}
.product-media,.product-info{{background:var(--dark2);padding:2rem}}
.product-media{{display:flex;align-items:center;justify-content:center;background:linear-gradient(145deg,#efefeb,#d9d9d3)}}
.product-media img{{width:100%;max-height:620px;object-fit:contain}}
.detail-title{{font-family:var(--H);font-size:clamp(2.2rem,5vw,4.5rem);line-height:.9;text-transform:uppercase;margin:.8rem 0 1rem}}
.detail-meta{{display:grid;gap:.65rem;margin:1.3rem 0}}
.detail-row{{border:1px solid #303030;background:#151515;padding:.85rem 1rem;color:var(--steel)}}
.detail-row b{{color:#fff;text-transform:uppercase;font-size:.72rem;letter-spacing:1.4px;margin-right:.5rem}}
.detail-actions{{display:flex;flex-wrap:wrap;gap:.75rem;margin-top:1.35rem}}
.detail-actions .buy,.detail-actions .whatsapp,.detail-actions .email,.detail-actions .ghost{{width:auto}}
@media(max-width:820px){{.product-detail{{grid-template-columns:1fr;margin:1.25rem}}.product-media,.product-info{{padding:1.25rem}}}}
</style></head><body><nav>
  <a class="brand-lockup" href="../index.html"><img class="nav-logo" src="../web-products/mak-logo-small.webp" alt="MAK Overseas logo"></a>
  <div class="nav-links"><a href="../products.html">Products</a><a href="../search.html">Search</a><a href="../brands.html">Brands</a><a href="../why-us.html">Why Us</a><a href="../contact.html">Contact</a><a href="../quote.html">Quote</a></div>
  <button class="icon-btn" id="openCart" aria-label="Open enquiry cart">&#128722;<span class="cart-count">0</span></button>
</nav><main><section class="hero"><div><a class="back" href="../{html.escape(category_page)}">Back to {html.escape(product['category'])}</a><h1>{safe_title}</h1><p>{html.escape(desc)}</p></div><div class="hero-img reveal"><img src="{html.escape(image)}" alt="{safe_title}" loading="eager"></div></section>
<section class="product-detail reveal">
  <div class="product-media"><img src="{html.escape(image)}" alt="{safe_title}"></div>
  <div class="product-info">
    <div class="tag">{html.escape(product['category'])}</div>
    <h2 class="detail-title">{safe_title}</h2>
    <p class="desc">{html.escape(desc)}</p>
    <div class="detail-meta">
      <div class="detail-row"><b>Part No</b>{html.escape(parts)}</div>
      <div class="detail-row"><b>Code</b>{html.escape(code)}</div>
      <div class="detail-row"><b>Material</b>{html.escape(product.get('material') or 'Available on request')}</div>
      <div class="detail-row"><b>Notes</b>{html.escape(notes)}</div>
      <div class="detail-row"><b>Source</b>{html.escape(source)}</div>
    </div>
    <div class="detail-actions">
      <button class="buy" data-add="{html.escape(product['id'])}">Add to Cart</button>
      <button class="whatsapp" data-enquire="{html.escape(product['id'])}">WhatsApp Enquiry</button>
      <button class="email" data-email="{html.escape(product['id'])}">Email Enquiry</button>
      <a class="ghost" href="../{html.escape(category_page)}">View Category</a>
    </div>
  </div>
</section></main><div class="cart-panel" id="cartPanel"><div class="cart-drawer"><div class="drawer-head"><h3>Enquiry Cart</h3><button class="close" data-close-cart>&times;</button></div><div class="cart-items" id="cartItems"></div><button class="checkout" id="checkoutBtn">Send Enquiry on WhatsApp</button></div></div><footer><div>MAK OVERSEAS</div><div>Head Office: GT Road, Miller Ganj, Ludhiana | +91 94652 63877 | Dubai: +971 52 535 5917 | Email: kunalkhurana@makoverseas.com</div></footer><script src="../product-data.js"></script><script src="../catalogue-ui.js"></script><script src="../language.js"></script><script src="../whatsapp-widget.js"></script></body></html>
"""


def main():
    categories, products = load_data()
    image_map = {}
    for path in sorted({p["image"] for p in products} | {c["image"] for c in categories}):
        image_map[path] = make_watermarked_image(path)

    seen_pages = set()
    for product in products:
        product["image"] = image_map.get(product["image"], product["image"])
        base = slugify(product["name"])
        part = slugify("-".join(product.get("partNumbers") or []))
        filename = f"{base}-{part}.html" if part and part != "on-request" else f"{base}-{product['id']}.html"
        if filename in seen_pages:
            filename = f"{base}-{product['id']}.html"
        seen_pages.add(filename)
        product["detailPage"] = f"product-pages/{filename}"
        (PRODUCT_PAGE_DIR / filename).write_text(product_page(product, categories), encoding="utf-8")

    for category in categories:
        category["image"] = image_map.get(category["image"], category["image"])

    write_data(categories, products)
    print(json.dumps({"products": len(products), "product_pages": len(seen_pages), "watermarked_images": len(list(WATERMARK_DIR.glob('*.webp')))}, indent=2))


if __name__ == "__main__":
    main()
