from pathlib import Path
from io import BytesIO
import json
import re
import zipfile

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont, ImageOps
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parent
ZIP_PATH = Path(r"C:\Users\DELL\Desktop\JCB LIGHTS PHOTOS.zip")
OUT_DIR = ROOT / "web-products" / "jcb-lights"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def slugify(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def product_name(filename):
    stem = Path(filename).stem.replace("_", " ").replace(":", " ").replace(".", " ")
    stem = re.sub(r"\s+", " ", stem).strip()
    return stem.title().replace("Jcb", "JCB").replace("Om", "O/M").replace("N M", "N/M").replace("Sq", "Square")


def load_font(size, bold=False):
    candidates = [
        r"C:\Windows\Fonts\arialbd.ttf" if bold else r"C:\Windows\Fonts\arial.ttf",
        r"C:\Windows\Fonts\calibrib.ttf" if bold else r"C:\Windows\Fonts\calibri.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def add_watermark(canvas):
    overlay = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(overlay)
    main_font = load_font(36, bold=True)
    small_font = load_font(18, bold=True)
    text = "MAK OVERSEAS"
    bbox = draw.textbbox((0, 0), text, font=main_font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    x = canvas.width - w - 34
    y = canvas.height - h - 34
    draw.rounded_rectangle((x - 18, y - 12, x + w + 18, y + h + 14), radius=8, fill=(0, 0, 0, 150), outline=(212, 137, 10, 210), width=2)
    draw.text((x, y), text, font=main_font, fill=(255, 222, 150, 235))

    faint = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    faint_draw = ImageDraw.Draw(faint)
    faint_draw.text((canvas.width // 2 - w // 2, canvas.height // 2 - h // 2), text, font=main_font, fill=(255, 255, 255, 34))
    faint = faint.rotate(-24, resample=Image.Resampling.BICUBIC, center=(canvas.width // 2, canvas.height // 2))
    overlay.alpha_composite(faint)

    draw.text((34, canvas.height - 54), "Genuine & OE-Compatible Spare Parts", font=small_font, fill=(210, 218, 224, 180))
    canvas.alpha_composite(overlay)


def process_image(image, out_path):
    image = ImageOps.exif_transpose(image).convert("RGBA")
    image = ImageEnhance.Contrast(image).enhance(1.08)
    image = ImageEnhance.Sharpness(image).enhance(1.18)
    image.thumbnail((880, 560), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (1000, 750), (242, 242, 238, 255))
    bg = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    bg_draw.rectangle((0, 0, 1000, 750), fill=(238, 238, 232, 255))
    bg_draw.ellipse((-160, -120, 430, 280), fill=(245, 207, 126, 70))
    bg_draw.ellipse((640, 500, 1180, 900), fill=(20, 20, 20, 38))
    canvas.alpha_composite(bg)

    shadow = Image.new("RGBA", image.size, (0, 0, 0, 150))
    shadow = shadow.filter(ImageFilter.GaussianBlur(18))
    x = (canvas.width - image.width) // 2
    y = (canvas.height - image.height) // 2 - 28
    canvas.alpha_composite(shadow, (x + 14, y + 18))
    canvas.alpha_composite(image, (x, y))
    add_watermark(canvas)
    canvas.convert("RGB").save(out_path, "WEBP", quality=84, method=6)


def extract_images_from_zip():
    records = []
    with zipfile.ZipFile(ZIP_PATH) as archive:
        for entry in archive.infolist():
            name = entry.filename
            if entry.is_dir() or "__MACOSX" in name or Path(name).name.startswith("."):
                continue
            suffix = Path(name).suffix.lower()
            original = Path(name).name
            data = archive.read(entry)
            if suffix in {".jpg", ".jpeg", ".png"}:
                image = Image.open(BytesIO(data))
                records.append((original, image))
            elif suffix == ".pdf":
                reader = PdfReader(BytesIO(data))
                for page in reader.pages:
                    for idx, pdf_image in enumerate(page.images, 1):
                        image = Image.open(BytesIO(pdf_image.data))
                        records.append((original, image))
    return records


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


def main():
    categories, products = load_data()
    records = extract_images_from_zip()
    by_original = {}
    for original, image in records:
        name = product_name(original)
        out_name = f"{slugify(name)}.webp"
        out_path = OUT_DIR / out_name
        process_image(image, out_path)
        image.close()
        by_original[original] = {
            "name": name,
            "image": f"web-products/jcb-lights/{out_name}",
            "filename": original,
        }

    category = next(c for c in categories if c["slug"] == "electricals-lighting")
    category["image"] = by_original["JCB HEADLAMP NEW.jpg"]["image"]
    category["summary"] = "JCB and Bobcat headlamps, tail lamps, lenses, working lamps, switches and meters."

    product_by_id = {p["id"]: p for p in products}
    replacements = {
        "jcb-working-lamp": "WORKING LAMP SQ..jpg",
        "jcb-headlamp": "JCB HEADLAMP NEW.jpg",
        "jcb-tail-lamp": "JCB TAIL LAMP OVAL BIG.jpg",
    }
    for product_id, original in replacements.items():
        if product_id in product_by_id:
            product_by_id[product_id]["image"] = by_original[original]["image"]
            product_by_id[product_id]["notes"] = f"Photo file: {original}"

    for original, data in sorted(by_original.items(), key=lambda item: item[1]["name"]):
        pid = "light-" + slugify(data["name"])
        product_by_id[pid] = {
            "id": pid,
            "sr": None,
            "code": "",
            "name": data["name"],
            "category": "Electricals & Lighting",
            "categorySlug": "electricals-lighting",
            "page": "electricals.html",
            "image": data["image"],
            "partNumbers": ["On request"],
            "material": "Electrical assembly / lens component",
            "notes": f"Photo file: {original}",
            "desc": f"JCB/Bobcat lighting product from supplied light photo file: {original}.",
            "source": "JCB lights photo folder",
        }

    products = list(product_by_id.values())
    for cat in categories:
        cat["count"] = sum(1 for p in products if p["categorySlug"] == cat["slug"])
    write_data(categories, products)
    print(json.dumps({"processed_photos": len(by_original), "electrical_count": category["count"], "total_products": len(products)}, indent=2))


if __name__ == "__main__":
    main()
