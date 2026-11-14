"""Shrinks big gallery photos for fast web loading without visible quality loss.
Long side max 2560px, JPEG quality 88, EXIF kept (so photo dates survive), rotation fixed.
Originals are copied to ../gallery-originals first. Called by update-gallery.ps1.
Usage: python optimize-gallery.py [folder]"""
import shutil, sys
from pathlib import Path
from PIL import Image, ImageOps

MAX_SIDE, QUALITY, MIN_BYTES = 2560, 88, 900 * 1024
here = Path(__file__).resolve().parent
folder = Path(sys.argv[1]) if len(sys.argv) > 1 else here / "assets" / "images" / "gallery"
backup = here.parent / "gallery-originals"
backup.mkdir(exist_ok=True)

for f in sorted(folder.iterdir()):
    if f.suffix.lower() not in (".jpg", ".jpeg") or f.stat().st_size <= MIN_BYTES:
        continue
    if not (backup / f.name).exists():
        shutil.copy2(f, backup / f.name)
    before = f.stat().st_size
    with Image.open(f) as im:
        exif = im.getexif()
        im = ImageOps.exif_transpose(im)
        exif[0x0112] = 1  # already rotated
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        tmp = f.with_name(f.name + ".tmp")
        im.convert("RGB").save(tmp, "JPEG", quality=QUALITY, subsampling=0, optimize=True, progressive=True, exif=exif.tobytes())
    if tmp.stat().st_size < 20 * 1024 or tmp.stat().st_size >= before:
        tmp.unlink(); print(f"Skipped {f.name}"); continue
    tmp.replace(f)
    print(f"Optimized {f.name}: {before/1e6:.1f} MB -> {f.stat().st_size/1e6:.2f} MB")
