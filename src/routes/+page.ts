import { posts } from '#lib/posts.ts';
import { videos, shorts } from '#lib/data/episodios.ts';

export function load() {
	const destacado = posts.find((p) => p.destacado) ?? posts[0];
	const recientes = posts.filter((p) => p !== destacado).slice(0, 6);
	return { destacado, recientes, videos: videos.slice(0, 2), shorts: shorts.slice(0, 4), generado: Date.now() };
}
