/**
 * Genera src/lib/data/calendario-2026.json con el calendario, los horarios de cada sesión,
 * el podio de las carreras ya corridas y el trazado 2D de cada circuito.
 *
 * Fuentes:
 *  - Calendario, horarios y resultados: API pública Jolpica (sucesora de Ergast) — https://api.jolpi.ca
 *  - Trazados: github.com/bacinger/f1-circuits (MIT, © Tomislav Bacinger)
 *
 * Uso:  npm run calendario            (actualiza el archivo; córrelo después de cada carrera)
 *       node scripts/calendario.mjs --si-falla-seguir   (lo usa el build: si la API no responde,
 *                                                        se queda el archivo que ya existe)
 */
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const TEMPORADA = 2026;
const SALIDA = fileURLToPath(new URL(`../src/lib/data/calendario-${TEMPORADA}.json`, import.meta.url));
const API = `https://api.jolpi.ca/ergast/f1/${TEMPORADA}`;
const TRAZADOS = 'https://raw.githubusercontent.com/bacinger/f1-circuits/master/circuits';
const tolerante = process.argv.includes('--si-falla-seguir');

/** Nombre en español, país, bandera y archivo del trazado por circuitId de Jolpica. */
const CIRCUITOS = {
	albert_park: ['GP de Australia', 'Australia', '🇦🇺', 'au-1953'],
	shanghai: ['GP de China', 'China', '🇨🇳', 'cn-2004'],
	suzuka: ['GP de Japón', 'Japón', '🇯🇵', 'jp-1962'],
	bahrain: ['GP de Baréin', 'Baréin', '🇧🇭', 'bh-2002'],
	jeddah: ['GP de Arabia Saudita', 'Arabia Saudita', '🇸🇦', 'sa-2021'],
	miami: ['GP de Miami', 'Estados Unidos', '🇺🇸', 'us-2022'],
	villeneuve: ['GP de Canadá', 'Canadá', '🇨🇦', 'ca-1978'],
	monaco: ['GP de Mónaco', 'Mónaco', '🇲🇨', 'mc-1929'],
	catalunya: ['GP de Barcelona-Cataluña', 'España', '🇪🇸', 'es-1991'],
	red_bull_ring: ['GP de Austria', 'Austria', '🇦🇹', 'at-1969'],
	silverstone: ['GP de Gran Bretaña', 'Gran Bretaña', '🇬🇧', 'gb-1948'],
	spa: ['GP de Bélgica', 'Bélgica', '🇧🇪', 'be-1925'],
	hungaroring: ['GP de Hungría', 'Hungría', '🇭🇺', 'hu-1986'],
	zandvoort: ['GP de Países Bajos', 'Países Bajos', '🇳🇱', 'nl-1948'],
	monza: ['GP de Italia', 'Italia', '🇮🇹', 'it-1922'],
	madring: ['GP de España', 'España', '🇪🇸', 'es-2026'],
	baku: ['GP de Azerbaiyán', 'Azerbaiyán', '🇦🇿', 'az-2016'],
	sepang: ['GP de Baréin (en Malasia)', 'Malasia', '🇲🇾', 'my-1999'],
	marina_bay: ['GP de Singapur', 'Singapur', '🇸🇬', 'sg-2008'],
	americas: ['GP de Estados Unidos', 'Estados Unidos', '🇺🇸', 'us-2012'],
	rodriguez: ['GP de la Ciudad de México', 'México', '🇲🇽', 'mx-1962'],
	interlagos: ['GP de São Paulo', 'Brasil', '🇧🇷', 'br-1940'],
	vegas: ['GP de Las Vegas', 'Estados Unidos', '🇺🇸', 'us-2023'],
	losail: ['GP de Qatar', 'Qatar', '🇶🇦', 'qa-2004'],
	yas_marina: ['GP de Abu Dabi', 'Emiratos Árabes Unidos', '🇦🇪', 'ae-2009']
};

const SESIONES = [
	['FirstPractice', 'Práctica 1'],
	['SecondPractice', 'Práctica 2'],
	['ThirdPractice', 'Práctica 3'],
	['SprintQualifying', 'Clasificación Sprint'],
	['Sprint', 'Sprint'],
	['Qualifying', 'Clasificación']
];

async function json(url) {
	for (let intento = 1; ; intento++) {
		const r = await fetch(url, { headers: { 'User-Agent': 'formulaparanovatos-calendario' } });
		if (r.ok) return r.json();
		if (intento >= 3) throw new Error(`${r.status} al pedir ${url}`);
		await new Promise((ok) => setTimeout(ok, 1500 * intento));
	}
}

const iso = (s) => (s?.date ? `${s.date}T${s.time ?? '00:00:00Z'}` : null);

/** Ramer–Douglas–Peucker para reducir puntos sin perder la forma. */
function simplificar(pts, tol) {
	if (pts.length < 3) return pts;
	const [a, b] = [pts[0], pts.at(-1)];
	let max = 0;
	let idx = 0;
	for (let i = 1; i < pts.length - 1; i++) {
		const [x, y] = pts[i];
		const dx = b[0] - a[0];
		const dy = b[1] - a[1];
		const d = Math.abs(dy * x - dx * y + b[0] * a[1] - b[1] * a[0]) / (Math.hypot(dx, dy) || 1);
		if (d > max) [max, idx] = [d, i];
	}
	if (max <= tol) return [a, b];
	return [...simplificar(pts.slice(0, idx + 1), tol).slice(0, -1), ...simplificar(pts.slice(idx), tol)];
}

async function trazado(archivo) {
	const g = await json(`${TRAZADOS}/${archivo}.geojson`);
	const geom = g.features[0].geometry;
	const coords = geom.type === 'LineString' ? geom.coordinates : geom.coordinates.flat();
	const lat0 = (coords.reduce((s, c) => s + c[1], 0) / coords.length) * (Math.PI / 180);
	const pts = coords.map(([lon, lat]) => [lon * Math.cos(lat0), -lat]);
	const xs = pts.map((p) => p[0]);
	const ys = pts.map((p) => p[1]);
	const [minX, minY] = [Math.min(...xs), Math.min(...ys)];
	const escala = 1000 / Math.max(Math.max(...xs) - minX, Math.max(...ys) - minY);
	const norm = pts.map(([x, y]) => [(x - minX) * escala, (y - minY) * escala]);
	const ancho = Math.round(Math.max(...norm.map((p) => p[0])));
	const alto = Math.round(Math.max(...norm.map((p) => p[1])));
	// En un circuito cerrado el primer y último punto coinciden: se parte en el punto más lejano
	const lejos = norm.reduce(
		(m, p, i) => (Math.hypot(p[0] - norm[0][0], p[1] - norm[0][1]) > m.d ? { d: Math.hypot(p[0] - norm[0][0], p[1] - norm[0][1]), i } : m),
		{ d: 0, i: 0 }
	).i;
	const simple = [
		...simplificar(norm.slice(0, lejos + 1), 1.2).slice(0, -1),
		...simplificar(norm.slice(lejos), 1.2)
	];
	const d =
		'M' + simple.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L') + 'Z';
	return { d, ancho, alto, salida: simple[0].map((n) => +n.toFixed(1)) };
}

async function generar() {
	const calendario = (await json(`${API}.json`)).MRData.RaceTable.Races;
	// Podios: tres consultas (1.º, 2.º y 3.º lugar de toda la temporada) para no saturar la API
	const podios = {};
	for (const pos of [1, 2, 3]) {
		const races = (await json(`${API}/results/${pos}.json?limit=100`)).MRData.RaceTable.Races;
		for (const r of races) {
			const x = r.Results[0];
			(podios[r.round] ??= []).push({
				pos,
				piloto: `${x.Driver.givenName} ${x.Driver.familyName}`,
				codigo: x.Driver.code,
				equipo: x.Constructor.name
			});
		}
	}
	const carreras = [];
	for (const r of calendario) {
		const id = r.Circuit.circuitId;
		const [nombre, pais, bandera, archivo] = CIRCUITOS[id] ?? [r.raceName, r.Circuit.Location.country, '🏁', null];
		const inicio = iso(r);
		const sesiones = SESIONES.filter(([k]) => r[k]).map(([k, n]) => ({ nombre: n, inicio: iso(r[k]) }));
		sesiones.push({ nombre: 'Carrera', inicio });
		sesiones.sort((a, b) => a.inicio.localeCompare(b.inicio));

		const podio = podios[r.round]?.length === 3 ? podios[r.round] : null;
		carreras.push({
			ronda: +r.round,
			nombre,
			nombreOficial: r.raceName,
			pais,
			bandera,
			codigoPais: archivo ? archivo.slice(0, 2) : null,
			ciudad: r.Circuit.Location.locality,
			circuito: r.Circuit.circuitName,
			sprint: Boolean(r.Sprint),
			inicio,
			sesiones,
			podio,
			trazado: archivo ? await trazado(archivo) : null
		});
		process.stdout.write(`  ${r.round}. ${nombre}${podio ? ' ✓' : ''}\n`);
	}
	return { temporada: TEMPORADA, actualizado: new Date().toISOString(), carreras };
}

try {
	const datos = await generar();
	await writeFile(SALIDA, JSON.stringify(datos, null, '\t') + '\n', 'utf-8');
	console.log(`Listo: ${datos.carreras.length} carreras en src/lib/data/calendario-${TEMPORADA}.json`);
} catch (e) {
	if (!tolerante) throw e;
	await readFile(SALIDA).catch(() => {
		throw new Error(`No se pudo generar el calendario y no existe ${SALIDA}: ${e.message}`);
	});
	console.warn(`Aviso: no se pudo actualizar el calendario (${e.message}); se usa el archivo existente.`);
}
