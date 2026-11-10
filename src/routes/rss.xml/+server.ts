import { posts } from '#lib/posts.ts';
import { sitio, absoluta } from '#lib/config.ts';

export const prerender = true;

const esc = (s: string) =>
	s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function GET() {
	const items = posts
		.map((p) => {
			const url = absoluta(`/noticias/${p.slug}`);
			return `
		<item>
			<title>${esc(p.titulo)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<description>${esc(p.descripcion)}</description>
			<category>${esc(p.seccionInfo.nombre)}</category>
			<pubDate>${new Date(`${p.fecha}T12:00:00Z`).toUTCString()}</pubDate>
			<enclosure url="${absoluta(p.portadaOg ?? p.portada)}" type="image/${(p.portadaOg ?? p.portada).endsWith('.webp') ? 'webp' : 'jpeg'}" length="0" />
		</item>`;
		})
		.join('');

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${esc(sitio.nombre)}</title>
		<link>${sitio.url}/</link>
		<description>${esc(sitio.descripcion)}</description>
		<language>es-mx</language>
		<atom:link href="${sitio.url}/rss.xml" rel="self" type="application/rss+xml" />${items}
	</channel>
</rss>`;

	return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
