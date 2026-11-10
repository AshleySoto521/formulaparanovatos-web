import type { Component } from 'svelte';
import { seccionPorSlug, type Seccion } from './data/secciones.ts';

/** Campos que van en el encabezado (frontmatter) de cada artículo `.md`. */
export type Frontmatter = {
	titulo: string;
	descripcion: string;
	/** Fecha de publicación, formato AAAA-MM-DD. */
	fecha: string;
	actualizado?: string;
	seccion: string;
	/** Ruta dentro de `static/`, por ejemplo `/img/noticias/mi-nota.webp`. */
	portada: string;
	/** Versión .jpg 1200×630 para redes sociales (opcional; si falta se usa la general). */
	portadaOg?: string;
	portadaAlt: string;
	/** Crédito de la portada si es una foto con licencia, p. ej. "Nombre, CC BY-SA 4.0". */
	portadaCredito?: string;
	portadaCreditoUrl?: string;
	autor?: string;
	etiquetas?: string[];
	destacado?: boolean;
	borrador?: boolean;
};

export type Post = Frontmatter & {
	slug: string;
	seccionInfo: Seccion;
	minutosLectura: number;
};

type ModuloMd = { metadata: Frontmatter; default: Component };

const modulos = import.meta.glob<ModuloMd>('/src/content/noticias/*.md', { eager: true });
const crudos = import.meta.glob<string>('/src/content/noticias/*.md', {
	eager: true,
	query: '?raw',
	import: 'default'
});

const slugDe = (ruta: string) => ruta.split('/').pop()!.replace(/\.md$/, '');

function minutosDeLectura(texto: string) {
	const cuerpo = texto.replace(/^---[\s\S]*?---/, '').replace(/<[^>]+>/g, ' ');
	const palabras = cuerpo.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(palabras / 220));
}

const todos: Post[] = Object.entries(modulos)
	.map(([ruta, mod]) => {
		const m = mod.metadata;
		const seccionInfo = seccionPorSlug(m.seccion);
		if (!seccionInfo) throw new Error(`Sección desconocida «${m.seccion}» en ${ruta}`);
		for (const campo of ['titulo', 'descripcion', 'fecha', 'portada', 'portadaAlt'] as const) {
			if (!m[campo]) throw new Error(`Falta «${campo}» en ${ruta}`);
		}
		return {
			...m,
			slug: slugDe(ruta),
			seccionInfo,
			minutosLectura: minutosDeLectura(crudos[ruta] ?? '')
		};
	})
	.sort((a, b) => b.fecha.localeCompare(a.fecha));

/** Artículos publicados (los borradores solo se ven con `npm run dev`). */
export const posts: Post[] = import.meta.env.DEV ? todos : todos.filter((p) => !p.borrador);

export const postPorSlug = (slug: string) => posts.find((p) => p.slug === slug);

export const componentePorSlug = (slug: string) =>
	modulos[`/src/content/noticias/${slug}.md`]?.default;

export const postsDeSeccion = (seccion: string) => posts.filter((p) => p.seccion === seccion);

export function relacionados(post: Post, cuantos = 3) {
	const misma = posts.filter((p) => p.slug !== post.slug && p.seccion === post.seccion);
	const otras = posts.filter((p) => p.slug !== post.slug && p.seccion !== post.seccion);
	return [...misma, ...otras].slice(0, cuantos);
}

const formato = new Intl.DateTimeFormat('es-MX', {
	day: 'numeric',
	month: 'long',
	year: 'numeric',
	timeZone: 'UTC'
});

export const fechaLarga = (iso: string) => formato.format(new Date(`${iso}T12:00:00Z`));
