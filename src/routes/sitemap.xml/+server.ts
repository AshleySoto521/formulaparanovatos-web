import { posts } from '#lib/posts.ts';
import { secciones } from '#lib/data/secciones.ts';
import { sitio } from '#lib/config.ts';

export const prerender = true;

export function GET() {
	const ultima = posts[0]?.actualizado ?? posts[0]?.fecha;
	const urls: { loc: string; lastmod?: string }[] = [
		{ loc: '/', lastmod: ultima },
		{ loc: '/noticias', lastmod: ultima },
		{ loc: '/episodios' },
		{ loc: '/nosotros' },
		{ loc: '/contacto' },
		{ loc: '/privacidad' },
		{ loc: '/terminos' },
		...secciones.map((s) => {
			const p = posts.find((x) => x.seccion === s.slug);
			return { loc: `/seccion/${s.slug}`, lastmod: p?.actualizado ?? p?.fecha };
		}),
		...posts.map((p) => ({ loc: `/noticias/${p.slug}`, lastmod: p.actualizado ?? p.fecha }))
	];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) =>
			`	<url><loc>${sitio.url}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
}
