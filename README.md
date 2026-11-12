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

   Para una foto con crédito (obligatorio en imágenes Creative Commons, por ejemplo de Wikimedia Commons):

   ```svelte
   <script>
   	import Foto from '#lib/components/Foto.svelte';
   </script>

   <Foto src="/img/noticias/<slug>/foto.webp" alt="Descripción" pie="Texto del pie"
   	autor="Nombre del autor" licencia="CC BY 4.0" fuente="https://commons.wikimedia.org/wiki/File:..." />
   ```

   Si la portada es una foto con licencia, agrega `portadaCredito: 'Autor, CC BY-SA 4.0'` y `portadaCreditoUrl` al encabezado.

   Para un recuadro destacado usa `<div class="dato">…</div>` (deja una línea en blanco dentro).

   Evita escribir llaves `{ }` sueltas en el texto: Svelte las interpreta como código.

## Cambiar una imagen que ya está publicada

Las imágenes se guardan en caché hasta 1 día (navegadores y Cloudflare). Si reemplazas una imagen
por otra, **ponle un nombre nuevo** (por ejemplo `portada-v2.webp`) y actualiza la ruta en la nota;
así el cambio se ve de inmediato. Si conservas el nombre, puede tardar hasta un día en verse o hay
que purgar esa URL en Cloudflare (Almacenamiento en caché → Configuración → Purga personalizada).

## Boletín (MailerLite)

La caja «Suscribirme» (pie de página, portada y final de cada nota) manda el correo directo a MailerLite;
el sitio no guarda datos. Para conectarla, llena `boletin.cuenta` y `boletin.formulario` en
`src/lib/config.ts` con los números de la URL del formulario incrustado de MailerLite
(`https://assets.mailerlite.com/jsonp/<cuenta>/forms/<formulario>/subscribe`). Mientras estén vacíos,
la caja solo se ve con `npm run dev`. El Aviso de Privacidad (`/privacidad`) y los Términos (`/terminos`)
usan los datos de `responsable` en el mismo archivo.

## Calendario y próxima carrera

`/calendario` y el bloque «Próxima carrera» de la portada usan `src/lib/data/calendario-2026.json`
(fechas, horarios, podios y trazado de cada circuito). Se actualiza solo en cada build
(`prebuild`); si la API no responde, se usa el archivo guardado. Para actualizarlo a mano
después de una carrera y subirlo:

```bash
npm run calendario
```

Fuentes: API pública Jolpica (calendario y resultados), trazados de
[bacinger/f1-circuits](https://github.com/bacinger/f1-circuits) (MIT) y banderas de flag-icons (MIT).
La cuenta regresiva y la siguiente carrera se calculan en el navegador con la hora real.

## Episodios (YouTube)

La lista de videos y Shorts se toma del feed público del canal en cada build, y las miniaturas
se guardan en `static/img/episodios/`. Para actualizarla a mano: `npm run episodios`.
Si quieres que un video tenga otro título en el sitio, agrégale `"tituloSitio": "..."` en
`src/lib/data/episodios.json`.

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
