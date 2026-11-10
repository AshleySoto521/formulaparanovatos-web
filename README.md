# formulaparanovatos.com

Sitio de noticias y podcast de **Fórmula para Novatos**, hecho con [SvelteKit](https://svelte.dev/docs/kit) + TypeScript y publicado en Cloudflare Pages.
Todas las páginas se generan como HTML estático al compilar (rápidas y fáciles de indexar).

## Comandos

```bash
npm install       # una sola vez
npm run dev       # vista previa local en http://localhost:5173 (muestra borradores)
npm run build     # compila el sitio en .svelte-kit/cloudflare
npm run check     # revisa tipos y errores
```

Cada push a `main` se publica solo en https://formulaparanovatos.com. Las demás ramas generan una vista previa en `<rama>.formulaparanovatos-web.pages.dev` (con `noindex`).

## Publicar una noticia

1. Crea `src/content/noticias/<slug>.md`. El nombre del archivo será la URL: `/noticias/<slug>`.
2. Copia este encabezado y llénalo:

   ```yaml
   ---
   titulo: 'Título de la nota'
   descripcion: 'Resumen de 1 o 2 líneas (también es la meta descripción para Google).'
   fecha: '2026-11-09'
   seccion: aprende # aprende | radio-paddock | retrovisor | rumbo-mexico-2027
   portada: /img/noticias/<slug>.webp
   portadaOg: /img/noticias/<slug>.jpg
   portadaAlt: 'Descripción de la imagen'
   etiquetas: [etiqueta1, etiqueta2]
   destacado: false # true = aparece grande en la portada
   borrador: false # true = solo se ve con npm run dev
   ---
   ```

3. Genera la portada (requiere Python y `pip install pillow`):

   ```bash
   python scripts/portada.py <slug> "Título de la nota" <seccion>
   ```

   Opcionalmente agrega una foto de fondo propia o con licencia: `python scripts/portada.py <slug> "Título" <seccion> foto.jpg`.

4. Escribe la nota en Markdown. Para insertar un video de YouTube:

   ```svelte
   <script>
   	import YouTube from '#lib/components/YouTube.svelte';
   </script>

   <YouTube id="ID_DEL_VIDEO" titulo="Título del video" vertical />
   ```

   Para un recuadro destacado usa `<div class="dato">…</div>` (deja una línea en blanco dentro).

   Evita escribir llaves `{ }` sueltas en el texto: Svelte las interpreta como código.

## Agregar un episodio

1. Agrega `{ id, titulo, formato }` hasta arriba en `src/lib/data/episodios.ts`.
2. Guarda la miniatura vertical (360×640, .webp) en `static/img/ep-<ID>.webp`. La original está en `https://i.ytimg.com/vi/<ID>/oar2.jpg`.

## Estructura

```
src/content/noticias/   artículos en Markdown
src/lib/config.ts       nombre, URL, correo y redes sociales
src/lib/data/           secciones y episodios
src/lib/components/     componentes (encabezado, tarjetas, SEO, YouTube…)
src/routes/             páginas, RSS (/rss.xml) y sitemap (/sitemap.xml)
static/                 imágenes, íconos y robots.txt
_headers                cabeceras de seguridad y caché de Cloudflare
```
