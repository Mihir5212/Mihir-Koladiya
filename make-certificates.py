"""Turns certificate PDFs into watermarked preview images for the website.

Put the real PDFs in  ..\certificate-originals\  (outside the website, never uploaded),
using the file names listed in js/data.js (e.g. tipce-2025.pdf), then run:
    python make-certificates.py
Images are written to assets/images/certificates/<name>.jpg (first page only,
~1400px wide, diagonal "Mihir Koladiya · Portfolio copy" watermark).
"""
import os, sys, math
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont
import pymupdf

HERE = Path(__file__).resolve().parent
SRC = HERE.parent / "certificate-originals"
OUT = HERE / "assets" / "images" / "certificates"
MARK = "Mihir Koladiya · Portfolio copy"
WIDTH = 1400

def font(size):
    for f in ("C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/arial.ttf"):
        if os.path.exists(f): return ImageFont.truetype(f, size)
    return ImageFont.load_default()

def watermark(im):
    w, h = im.size
    layer = Image.new("RGBA", (w * 2, h * 2), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer); f = font(max(28, w // 32))
    step_x, step_y = int(d.textlength(MARK, font=f) + w // 8), max(120, h // 6)
    for y in range(0, h * 2, step_y):
        off = (y // step_y % 2) * step_x // 2
        for x in range(-step_x, w * 2, step_x):
            d.text((x + off, y), MARK, font=f, fill=(20, 24, 43, 38))
    layer = layer.rotate(28, resample=Image.BICUBIC)
    l = layer.crop(((layer.width - w) // 2, (layer.height - h) // 2, (layer.width - w) // 2 + w, (layer.height - h) // 2 + h))
    return Image.alpha_composite(im.convert("RGBA"), l).convert("RGB")

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    pdfs = sorted(SRC.glob("*.pdf"))
    if not pdfs: print(f"No PDFs in {SRC}"); return
    for p in pdfs:
        doc = pymupdf.open(p); page = doc[0]
        zoom = WIDTH / page.rect.width
        pix = page.get_pixmap(matrix=pymupdf.Matrix(zoom, zoom), alpha=False)
        im = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        im = watermark(im)
        dst = OUT / (p.stem + ".jpg")
        im.save(dst, "JPEG", quality=78, optimize=True, progressive=True)
        print(f"{p.name} -> {dst.relative_to(HERE)} ({dst.stat().st_size // 1024} KB)")

if __name__ == "__main__":
    main()
