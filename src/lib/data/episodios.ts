export type Episodio = {
	/** ID del video de YouTube. */
	id: string;
	titulo: string;
	/** `short` (vertical) o `video` (horizontal). */
	formato: 'short' | 'video';
};

/**
 * Episodios del canal, del más reciente al más antiguo.
 * Para agregar uno: pon su ID y título hasta arriba y guarda su miniatura
 * vertical (360×640, .webp) en `static/img/ep-ID.webp`.
 */
export const episodios: Episodio[] = [
	{
		id: 'zs6ZUul6YPU',
		titulo: '3 carreras de F1 que NO puedes perderte: Checo, Alonso y Button',
		formato: 'short'
	},
	{
		id: '6WSW4xwnlC8',
		titulo: '¿Schumacher fue el mejor o Ferrari tenía el mejor equipo?',
		formato: 'short'
	},
	{ id: 'Kuv6pKUKRvQ', titulo: 'Gran Premio de México 2026', formato: 'short' },
	{ id: 'RzyT7Ua1lUc', titulo: '¿Qué es la Fórmula 1?', formato: 'short' }
];

export const urlEpisodio = (e: Episodio) =>
	e.formato === 'short' ? `https://www.youtube.com/shorts/${e.id}` : `https://www.youtube.com/watch?v=${e.id}`;
