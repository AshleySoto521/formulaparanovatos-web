"""
Genera la portada de una noticia en dos formatos:
  static/img/noticias/<slug>.webp  (para la página)
  static/img/noticias/<slug>.jpg   (para redes sociales, 1200x630)

Uso (desde la carpeta del proyecto):
  python scripts/portada.py <slug> "<Título>" <seccion> [ruta/a/foto-de-fondo.jpg]

Secciones: aprende, radio-paddock, retrovisor, rumbo-mexico-2027
Requiere: pip install pillow
"""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
SALIDA = RAIZ / "static" / "img" / "noticias"
LOGO = RAIZ / "static" / "icon-512.png"

SECCIONES = {
    "aprende": ("APRENDE", (0, 224, 223)),
    "radio-paddock": ("RADIO PADDOCK", (255, 96, 85)),
    "retrovisor": ("RETROVISOR", (245, 184, 65)),
    "rumbo-mexico-2027": ("RUMBO AL MÉXICO GP 2027", (123, 216, 143)),
}

FUENTES_TITULO = ["C:/Windows/Fonts/seguibl.ttf", "C:/Windows/Fonts/arialbd.ttf",
                  "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
                  "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]
FUENTES_TEXTO = ["C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/arialbd.ttf",
                 "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
                 "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"]


def fuente(rutas, tam):
    for r in rutas:
        try:
            return ImageFont.truetype(r, tam)
        except OSError:
            pass
    return ImageFont.load_default()


def partir(draw, texto, f, ancho):
    lineas, actual = [], ""
    for palabra in texto.split():
        prueba = f"{actual} {palabra}".strip()
        if draw.textlength(prueba, font=f) <= ancho:
            actual = prueba
        else:
            lineas.append(actual)
            actual = palabra
    lineas.append(actual)
    return lineas


def generar(slug, titulo, seccion, fondo=None):
    SALIDA.mkdir(parents=True, exist_ok=True)
    # Página: sin texto (el título ya aparece junto a la imagen).
    dibujar(None, seccion, fondo).save(SALIDA / f"{slug}.webp", quality=82)
    # Redes sociales: con título.
    dibujar(titulo, seccion, fondo).save(SALIDA / f"{slug}.jpg", quality=84, optimize=True, progressive=True)
    print(f"Listo: static/img/noticias/{slug}.webp y .jpg")


def dibujar(titulo, seccion, fondo=None):
    nombre, color = SECCIONES[seccion]
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (21, 23, 24))
    d = ImageDraw.Draw(img)

    if fondo:
        f = Image.open(fondo).convert("RGB")
        esc = max(W / f.width, H / f.height)
        f = f.resize((int(f.width * esc), int(f.height * esc)), Image.LANCZOS)
        f = f.crop(((f.width - W) // 2, (f.height - H) // 2, (f.width - W) // 2 + W, (f.height - H) // 2 + H))
        img.paste(f)
        velo = Image.new("RGBA", (W, H))
        dv = ImageDraw.Draw(velo)
        for x in range(W):
            a = int(235 - 150 * (x / W))
            dv.line([(x, 0), (x, H)], fill=(21, 23, 24, a))
        img = Image.alpha_composite(img.convert("RGBA"), velo).convert("RGB")
        d = ImageDraw.Draw(img)
    else:
        for y in range(H):
            t = y / H
            c = tuple(int(color[i] * 0.28 * (1 - t) + 21 * (0.72 + 0.28 * t)) for i in range(3))
            d.line([(0, y), (W, y)], fill=c)
        # Líneas diagonales de "velocidad"
        for k in range(-H, W, 46):
            d.line([(k, H), (k + H * 0.6, 0)], fill=tuple(min(255, int(c * 0.35 + 30)) for c in color), width=2)
        tam_logo = 520 if titulo else 470
        logo = Image.open(LOGO).convert("RGBA").resize((tam_logo, tam_logo), Image.LANCZOS)
        sombra = logo.copy()
        sombra.putalpha(logo.getchannel("A").point(lambda a: a * (0.18 if titulo else 0.9)))
        pos = (W - 430, 150) if titulo else ((W - tam_logo) // 2 + 220, (H - tam_logo) // 2)
        img.paste(sombra, pos, sombra)

    # Franja tipo bandera a cuadros
    for i in range(0, W, 24):
        d.rectangle([i, H - 10, i + 11, H], fill=(240, 240, 240))
    d.rectangle([0, 0, 10, H], fill=color)

    if titulo is None:
        fg = fuente(FUENTES_TITULO, 64)
        partes = partir(d, nombre, fg, 520)
        y = (H - len(partes) * 72) // 2
        for ln in partes:
            d.text((70, y), ln, font=fg, fill=color)
            y += 72
        return img

    fs = fuente(FUENTES_TEXTO, 26)
    d.text((70, 70), nombre, font=fs, fill=color)

    tam = 72
    while tam > 40:
        ft = fuente(FUENTES_TITULO, tam)
        lineas = partir(d, titulo, ft, 860)
        if len(lineas) <= 4:
            break
        tam -= 4
    y = 120
    for ln in lineas:
        d.text((70, y), ln, font=ft, fill=(255, 255, 255))
        y += int(tam * 1.12)

    fm = fuente(FUENTES_TEXTO, 26)
    d.text((70, H - 70), "formulaparanovatos.com", font=fm, fill=(0, 224, 223))
    logo_p = Image.open(LOGO).convert("RGBA").resize((70, 70), Image.LANCZOS)
    img.paste(logo_p, (W - 110, H - 100), logo_p)
    return img


if __name__ == "__main__":
    if len(sys.argv) < 4:
        print(__doc__)
        sys.exit(1)
    generar(sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4] if len(sys.argv) > 4 else None)
