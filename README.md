# formulaparanovatos.com

Sitio estático de **Fórmula para Novatos**, publicado con Cloudflare Pages.

- Carpeta publicada: `public/` (sin paso de compilación).
- Cada push a `main` se publica solo en https://formulaparanovatos.com.
- Cada rama distinta de `main` genera una vista previa en `*.formulaparanovatos.pages.dev` (con `noindex`).

## Agregar un episodio

1. Descarga la miniatura vertical `https://i.ytimg.com/vi/ID/oar2.jpg`, redúcela a 360×640 y guárdala como `public/img/ep-ID.webp`.
2. Copia un `<li class="ep">` en `public/index.html` (sección «Últimos episodios») y cambia el ID y el título.
