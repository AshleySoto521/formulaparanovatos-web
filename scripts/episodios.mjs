/**
 * Actualiza src/lib/data/episodios.json con los videos del canal de YouTube y baja sus
 * miniaturas a static/img/episodios/. Usa el feed RSS público del canal (sin clave de API),
 * que trae los 15 más recientes; los anteriores se conservan en el JSON.
 *
 * Uso:  npm run episodios
 *       node scripts/episodios.mjs --si-falla-seguir   (lo usa el build)
 */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const CANAL = 'UCmRj-a0ndvvXFzIGA5mhtwA'; // @FormulaparaNovatos
const RAIZ = new URL('..', import.meta.url);
const SALIDA = fileURLToPath(new URL('src/lib/data/episodios.json', RAIZ));
const MINIATURAS = fileURLToPath(new URL('static/img/episodios/', RAIZ));
const tolerante = process.argv.includes('--si-falla-seguir');

const existe = (ruta) => access(ruta).then(() => true, () => false);

const entidades = (s) =>
	s
		.replace(/&amp;/g, '&')
		.replace(/&quot;/g, '"')
		.replace(/&#39;/g, "'")
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>');

/** Quita hashtags y separadores sueltos del título de YouTube. */
const limpiar = (t) =>
	entidades(t)
		.replace(/#[\p{L}\p{N}_]+/gu, '')
		.replace(/\s*\|\s*$/u, '')
		.replace(/\s{2,}/g, ' ')
		.trim();

async function bajar(id, formato) {
	await mkdir(MINIATURAS, { recursive: true });
	const destino = `${MINIATURAS}${id}.jpg`;
	if (await existe(destino)) return `/img/episodios/${id}.jpg`;
	const opciones = formato === 'short' ? ['oar2.jpg', 'hqdefault.jpg'] : ['maxresdefault.jpg', 'sddefault.jpg', 'hqdefault.jpg'];
	for (const archivo of opciones) {
		const r = await fetch(`https://i.ytimg.com/vi/${id}/${archivo}`);
		if (r.ok) {
			await writeFile(destino, Buffer.from(await r.arrayBuffer()));
			return `/img/episodios/${id}.jpg`;
		}
	}
	return null;
}

async function actualizar() {
	const anteriores = JSON.parse(await readFile(SALIDA, 'utf-8').catch(() => '[]'));
	const porId = new Map(anteriores.map((e) => [e.id, e]));

	const r = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CANAL}`);
	if (!r.ok) throw new Error(`${r.status} al leer el feed de YouTube`);
	const xml = await r.text();
	const entradas = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((m) => m[1]);
	if (!entradas.length) throw new Error('El feed de YouTube no trajo videos');

	for (const e of entradas) {
		const id = e.match(/<yt:videoId>(.*?)</)[1];
		const enlace = e.match(/<link rel="alternate" href="(.*?)"/)[1];
		const formato = enlace.includes('/shorts/') ? 'short' : 'video';
		const previo = porId.get(id);
		porId.set(id, {
			id,
			titulo: limpiar(e.match(/<title>(.*?)<\/title>/)[1]),
			// Título propio para el sitio (opcional): si existe, se respeta
			...(previo?.tituloSitio ? { tituloSitio: previo.tituloSitio } : {}),
			formato,
			fecha: e.match(/<published>(.*?)</)[1],
			miniatura: previo?.miniatura ?? (await bajar(id, formato))
		});
	}

	const lista = [...porId.values()]
		.filter((e) => e.miniatura)
		.sort((a, b) => b.fecha.localeCompare(a.fecha));
	await writeFile(SALIDA, JSON.stringify(lista, null, '\t') + '\n', 'utf-8');
	const nuevos = lista.filter((e) => !anteriores.some((a) => a.id === e.id));
	console.log(`Listo: ${lista.length} episodios (${nuevos.length} nuevos)`);
	for (const e of nuevos) console.log(`  + [${e.formato}] ${e.titulo}`);
}

try {
	await actualizar();
} catch (e) {
	if (!tolerante) throw e;
	console.warn(`Aviso: no se pudieron actualizar los episodios (${e.message}); se usa la lista guardada.`);
}
