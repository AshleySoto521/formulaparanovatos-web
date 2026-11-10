export type Seccion = {
	slug: string;
	nombre: string;
	etiqueta: string;
	descripcion: string;
	/** Color de acento de la sección (CSS). */
	color: string;
};

export const secciones: Seccion[] = [
	{
		slug: 'aprende',
		nombre: 'Aprende',
		etiqueta: 'Para empezar',
		descripcion:
			'Reglas, estrategias, neumáticos, clasificación, tecnología y términos, explicados para que nadie se quede fuera.',
		color: '#00E0DF'
	},
	{
		slug: 'radio-paddock',
		nombre: 'Radio Paddock',
		etiqueta: 'Actualidad',
		descripcion: 'Análisis de carreras, decisiones y polémicas, con contexto y sin vivir del rumor.',
		color: '#FF6055'
	},
	{
		slug: 'retrovisor',
		nombre: 'Retrovisor',
		etiqueta: 'Historia',
		descripcion:
			'Temporadas, rivalidades y pilotos que marcaron época, y por qué siguen importando hoy.',
		color: '#F5B841'
	},
	{
		slug: 'rumbo-mexico-2027',
		nombre: 'Rumbo al México GP 2027',
		etiqueta: 'El camino',
		descripcion:
			'La historia del proyecto y de su comunidad camino al Autódromo Hermanos Rodríguez.',
		color: '#7BD88F'
	}
];

export const seccionPorSlug = (slug: string) => secciones.find((s) => s.slug === slug);
