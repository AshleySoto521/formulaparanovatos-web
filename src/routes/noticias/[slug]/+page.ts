import { error } from '@sveltejs/kit';
import { posts, postPorSlug, componentePorSlug, relacionados } from '#lib/posts.ts';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => posts.map((p) => ({ slug: p.slug }));

export function load({ params }) {
	const post = postPorSlug(params.slug);
	const Contenido = componentePorSlug(params.slug);
	if (!post || !Contenido) error(404, 'Nota no encontrada');
	return { post, Contenido, relacionados: relacionados(post) };
}
