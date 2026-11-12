import { posts } from '#lib/posts.ts';
import { episodios } from '#lib/data/episodios.ts';

export function load() {
	const destacado = posts.find((p) => p.destacado) ?? posts[0];
	const recientes = posts.filter((p) => p !== destacado).slice(0, 6);
	return { destacado, recientes, episodios: episodios.slice(0, 4), generado: Date.now() };
}
