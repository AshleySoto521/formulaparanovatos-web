import { error } from '@sveltejs/kit';
import { secciones, seccionPorSlug } from '#lib/data/secciones.ts';
import { postsDeSeccion } from '#lib/posts.ts';
import type { EntryGenerator } from './$types';

export const entries: EntryGenerator = () => secciones.map((s) => ({ seccion: s.slug }));

export function load({ params }) {
	const seccion = seccionPorSlug(params.seccion);
	if (!seccion) error(404, 'Sección no encontrada');
	return { seccion, posts: postsDeSeccion(seccion.slug) };
}
