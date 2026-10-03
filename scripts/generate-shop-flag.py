#!/usr/bin/env python3
"""Extract the lockup flag from the shop logo and upscale it as PNG.

Keeps the photo artwork (no procedural SVG). Prefer Real-ESRGAN when available;
falls back to LANCZOS. Source: assets logo photo (or shared/public/logo.png).
"""
from __future__ import annotations

import shutil
import subprocess
from collections import deque
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "shared" / "public"
ASSET = Path.home() / ".cursor/projects/Users-jamesnelson-Code-All-American-Meat-Shop/assets"
CANDIDATES = [
    ASSET / "image-931207b5-dc27-4439-9186-adc2025a581e.png",
    PUB / "logo.png",
]
REALESRGAN = Path("/tmp/realesrgan-up/realesrgan-ncnn-vulkan")


def is_ink(r, g, b) -> bool:
    if r > 95 and r > g + 18 and r > b + 12 and g < 140:
        return True
    if b > 50 and b >= r - 8 and r < 140 and g < 130:
        return True
    return False


def is_bg_like(r, g, b) -> bool:
    return r > 200 and g > 185 and b > 155 and (r - b) >= 12


def extract(im: Image.Image, crop_box: tuple[int, int, int, int]) -> Image.Image:
    region = im.crop(crop_box)
    rw, rh = region.size
    px = region.load()
    exterior = [[False] * rw for _ in range(rh)]
    q = deque()
    for x in range(rw):
        for y in (0, rh - 1):
            r, g, b, a = px[x, y]
            if not is_ink(r, g, b):
                exterior[y][x] = True
                q.append((x, y))
    for y in range(rh):
        for x in (0, rw - 1):
            r, g, b, a = px[x, y]
            if not is_ink(r, g, b) and not exterior[y][x]:
                exterior[y][x] = True
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < rw and 0 <= ny < rh and not exterior[ny][nx]:
                r, g, b, a = px[nx, ny]
                if is_ink(r, g, b):
                    continue
                if is_bg_like(r, g, b) or (r > 180 and g > 160 and b > 140):
                    exterior[ny][nx] = True
                    q.append((nx, ny))
    out = Image.new("RGBA", (rw, rh), (0, 0, 0, 0))
    op = out.load()
    for y in range(rh):
        for x in range(rw):
            if exterior[y][x]:
                continue
            r, g, b, a = px[x, y]
            op[x, y] = (r, g, b, 255)
    return out.crop(out.getbbox())


def upscale(src: Path, dest: Path) -> Image.Image:
    if REALESRGAN.exists():
        tmp = dest.with_name("shop-flag-up-tmp.png")
        subprocess.run(
            [
                str(REALESRGAN),
                "-i",
                str(src),
                "-o",
                str(tmp),
                "-n",
                "realesrgan-x4plus",
                "-s",
                "4",
                "-f",
                "png",
            ],
            check=True,
        )
        shutil.move(tmp, dest)
        return Image.open(dest)
    flag = Image.open(src)
    hi = flag.resize((flag.width * 4, flag.height * 4), Image.Resampling.LANCZOS)
    hi.save(dest, optimize=True)
    return hi


def main() -> None:
    src_path = next(p for p in CANDIDATES if p.exists())
    im = Image.open(src_path).convert("RGBA")
    w, h = im.size
    if w >= 500:
        box = (168, 18, 408, 92)
    else:
        box = (int(w * 0.29), int(h * 0.04), int(w * 0.71), int(h * 0.21))
    flag = extract(im, box)
    base = PUB / "shop-flag-base.png"
    flag.save(base, optimize=True)
    out = PUB / "shop-flag.png"
    hi = upscale(base, out)
    base.unlink(missing_ok=True)
    svg = PUB / "shop-flag.svg"
    svg.unlink(missing_ok=True)
    print(f"source={src_path.name} extracted={flag.size} png={hi.size}")


if __name__ == "__main__":
    main()
