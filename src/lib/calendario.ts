import datos from '#lib/data/calendario-2026.json';

export type Sesion = { nombre: string; inicio: string };
export type Podio = { pos: number; piloto: string; codigo: string; equipo: string };
export type Trazado = { d: string; ancho: number; alto: number; salida: number[] };
export type Carrera = {
	ronda: number;
	nombre: string;
	nombreOficial: string;
	pais: string;
	bandera: string;
	codigoPais: string | null;
	ciudad: string;
	circuito: string;
	sprint: boolean;
	inicio: string;
	sesiones: Sesion[];
	podio: Podio[] | null;
	trazado: Trazado | null;
};

export const temporada: number = datos.temporada;
export const actualizado: string = datos.actualizado;
const CIUDADES: Record<string, string> = {
	'Mexico City': 'Ciudad de México',
	'Monte-Carlo': 'Montecarlo',
	'Monte Carlo': 'Montecarlo',
	Singapore: 'Singapur',
	'Abu Dhabi': 'Abu Dabi',
	Montreal: 'Montreal',
	London: 'Londres',
	Brussels: 'Bruselas',
	Shanghai: 'Shanghái',
	Baku: 'Bakú',
	'Kuala Lumpur': 'Kuala Lumpur'
};

export const carreras = (datos.carreras as Carrera[]).map((c) => ({
	...c,
	ciudad: CIUDADES[c.ciudad] ?? c.ciudad
}));

/** Zona horaria de referencia del sitio (centro de México, sin horario de verano). */
export const ZONA_MX = 'America/Mexico_City';

/** Una carrera se considera "en curso" hasta 2 h después de la bandera verde. */
const DURACION_CARRERA = 2 * 60 * 60 * 1000;

/** La próxima carrera (o la que está en curso) a partir de `ahora`. */
export function proximaCarrera(ahora: number): Carrera | undefined {
	return carreras.find((c) => Date.parse(c.inicio) + DURACION_CARRERA > ahora);
}

export const enCurso = (c: Carrera, ahora: number) =>
	ahora >= Date.parse(c.inicio) && ahora < Date.parse(c.inicio) + DURACION_CARRERA;

/** Colores aproximados de cada equipo para los podios. */
export const colorEquipo: Record<string, string> = {
	Mercedes: '#27F4D2',
	Ferrari: '#E8002D',
	McLaren: '#FF8000',
	'Red Bull': '#3671C6',
	'Aston Martin': '#229971',
	Alpine: '#FF87BC',
	Williams: '#64C4FF',
	'RB F1 Team': '#6692FF',
	'Racing Bulls': '#6692FF',
	Audi: '#F50537',
	'Sauber': '#52E252',
	'Haas F1 Team': '#B6BABD',
	Cadillac: '#C9A227'
};

const fmt = (opciones: Intl.DateTimeFormatOptions, zona?: string) =>
	new Intl.DateTimeFormat('es-MX', { ...opciones, timeZone: zona });

/** "6 – 8 mar" con el día de la primera sesión y el de la carrera. */
export function rangoFechas(c: Carrera, zona = ZONA_MX) {
	const d = fmt({ day: 'numeric' }, zona);
	const dm = fmt({ day: 'numeric', month: 'short' }, zona);
	const ini = new Date(c.sesiones[0].inicio);
	const fin = new Date(c.inicio);
	const mismoMes =
		fmt({ month: 'numeric' }, zona).format(ini) === fmt({ month: 'numeric' }, zona).format(fin);
	return `${mismoMes ? d.format(ini) : dm.format(ini)} – ${dm.format(fin)}`.replace(/\./g, '');
}

/** "vie 20 nov" */
export function diaSesion(iso: string, zona = ZONA_MX) {
	const t = fmt({ weekday: 'short', day: 'numeric', month: 'short' }, zona)
		.format(new Date(iso))
		.replace(/\./g, '')
		.replace(/,/g, '')
		.replace(' de ', ' ');
	return t.charAt(0).toUpperCase() + t.slice(1);
}

/** "18:30" */
export const horaSesion = (iso: string, zona = ZONA_MX) =>
	fmt({ hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }, zona).format(new Date(iso));
