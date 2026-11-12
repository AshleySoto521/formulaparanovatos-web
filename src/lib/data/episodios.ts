import lista from './episodios.json';

export type Episodio = {
	/** ID del video de YouTube. */
	id: string;
	/** Título tal como está en YouTube (sin hashtags). */
	titulo: string;
	/** Título propio para el sitio (opcional, en episodios.json). */
	tituloSitio?: string;
	/** `short` (vertical) o `video` (horizontal). */
	formato: 'short' | 'video';
	fecha: string;
	miniatura: string;
};

/**
 * Episodios del canal, del más reciente al más antiguo. Se actualizan solos en cada build
 * desde el feed de YouTube (scripts/episodios.mjs); para hacerlo a mano: `npm run episodios`.
 */
export const episodios = lista as Episodio[];
export const videos = episodios.filter((e) => e.formato === 'video');
export const shorts = episodios.filter((e) => e.formato === 'short');

export const tituloDe = (e: Episodio) => e.tituloSitio || e.titulo;

export const urlEpisodio = (e: Episodio) =>
	e.formato === 'short' ? `https://www.youtube.com/shorts/${e.id}` : `https://www.youtube.com/watch?v=${e.id}`;
