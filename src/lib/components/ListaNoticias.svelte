<script lang="ts">
	import TarjetaNoticia from './TarjetaNoticia.svelte';
	import { secciones } from '#lib/data/secciones.ts';
	import type { Post } from '#lib/posts.ts';

	type Props = {
		titulo: string;
		descripcion: string;
		posts: Post[];
		activa?: string;
		color?: string;
	};
	let { titulo, descripcion, posts, activa, color = 'var(--coral)' }: Props = $props();
</script>

<header class="cabecera" style="--color: {color}">
	<div class="contenedor">
		<h1>{titulo}</h1>
		<p>{descripcion}</p>
		<nav aria-label="Filtrar por sección">
			<a href="/noticias" aria-current={!activa ? 'page' : undefined}>Todas</a>
			{#each secciones as s (s.slug)}
				<a
					href="/seccion/{s.slug}"
					style="--c: {s.color}"
					aria-current={activa === s.slug ? 'page' : undefined}>{s.nombre}</a
				>
			{/each}
		</nav>
	</div>
</header>

<div class="contenedor">
	{#if posts.length}
		<div class="rejilla">
			{#each posts as post, i (post.slug)}
				<TarjetaNoticia {post} nivel={2} grande={i === 0 && posts.length > 2} />
			{/each}
		</div>
	{:else}
		<div class="vacio">
			<p class="etiqueta">En boxes</p>
			<p>Todavía no hay notas en esta sección. Muy pronto salimos a pista.</p>
			<a class="boton secundario" href="/noticias">Ver todas las noticias</a>
		</div>
	{/if}
</div>

<style>
	.cabecera {
		border-bottom: 1px solid var(--borde);
		background: linear-gradient(180deg, color-mix(in srgb, var(--color) 18%, transparent), transparent);
		padding-block: 44px 28px;
		margin-bottom: 36px;
	}
	h1 {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		font-weight: 900;
	}
	h1::after {
		content: '';
		display: block;
		width: 56px;
		height: 5px;
		margin-top: 12px;
		background: var(--color);
		border-radius: 3px;
	}
	.cabecera p {
		color: var(--texto-2);
		max-width: 640px;
		font-size: 1.08rem;
	}
	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		margin-top: 18px;
	}
	nav a {
		--c: var(--turq);
		padding: 7px 16px;
		border-radius: 999px;
		border: 1px solid var(--borde);
		background: var(--fondo-2);
		color: var(--texto-2);
		text-decoration: none;
		font-family: var(--f-titulo);
		font-weight: 600;
	}
	nav a:hover {
		border-color: var(--c);
		color: var(--texto);
	}
	nav a[aria-current='page'] {
		background: var(--c);
		border-color: var(--c);
		color: #111;
	}
	.rejilla {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 22px;
	}
	.rejilla > :global(.grande) {
		grid-column: 1 / -1;
	}
	.vacio {
		text-align: center;
		padding: 56px 20px;
		border: 1px dashed var(--borde);
		border-radius: var(--radio);
		color: var(--texto-2);
	}
</style>
