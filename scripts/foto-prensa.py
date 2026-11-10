"""
Prepara fotos de portales de prensa (Red Bull Content Pool, Audi MediaCenter, Pirelli…)
para el sitio: las reduce a 1200 px de ancho y las guarda en .webp. Es un ajuste de
tamaño normal (Pillow), sin inteligencia artificial.

Uso (desde la carpeta del proyecto), tú mismo, con las fotos que descargaste:
  python scripts/foto-prensa.py <slug-de-la-nota> <foto1.jpg> [foto2.jpg ...]

Ejemplo:
  python scripts/foto-prensa.py gp-sao-paulo-2026 "C:/Users/Ashley/Downloads/verstappen-rebase.jpg"

Resultado: static/img/noticias/<slug>/<nombre-del-archivo>.webp
También puedes crear la portada de la nota (1200x630 .webp y .jpg para redes) con:
  python scripts/foto-prensa.py --portada <slug> <foto.jpg>

Requiere: pip install pillow
"""
import sys
import re
import unicodedata
from pathlib import Path
from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
NOTICIAS = RAIZ / "static" / "img" / "noticias"


def limpio(nombre: str) -> str:
    n = unicodedata.normalize("NFKD", nombre).encode("ascii", "ignore").decode()
    return re.sub(r"[^a-z0-9]+", "-", n.lower()).strip("-") or "foto"


def abrir(ruta: str) -> Image.Image:
    return ImageOps.exif_transpose(Image.open(ruta)).convert("RGB")


def recorte(im: Image.Image, w: int, h: int) -> Image.Image:
    e = max(w / im.width, h / im.height)
    im = im.resize((round(im.width * e), round(im.height * e)), Image.LANCZOS)
    x, y = (im.width - w) // 2, (im.height - h) // 2
    return im.crop((x, y, x + w, y + h))


def main(args):
    if len(args) >= 3 and args[0] == "--portada":
        slug, foto = args[1], args[2]
        im = recorte(abrir(foto), 1200, 630)
        NOTICIAS.mkdir(parents=True, exist_ok=True)
        im.save(NOTICIAS / f"{slug}.webp", quality=80)
        im.save(NOTICIAS / f"{slug}.jpg", quality=84, optimize=True, progressive=True)
        print(f"Portada: static/img/noticias/{slug}.webp y .jpg")
        return
    if len(args) < 2:
        print(__doc__)
        sys.exit(1)
    slug, fotos = args[0], args[1:]
    destino = NOTICIAS / slug
    destino.mkdir(parents=True, exist_ok=True)
    for f in fotos:
        im = abrir(f)
        im.thumbnail((1200, 1200), Image.LANCZOS)
        salida = destino / f"{limpio(Path(f).stem)}.webp"
        im.save(salida, quality=80)
        print(f"Lista: {salida.relative_to(RAIZ).as_posix()}  ({im.width}x{im.height})")


if __name__ == "__main__":
    main(sys.argv[1:])
