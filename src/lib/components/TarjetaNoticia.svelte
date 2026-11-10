<script lang="ts">
	import type { Post } from '#lib/posts.ts';
	import { fechaLarga } from '#lib/posts.ts';

	type Props = { post: Post; grande?: boolean; nivel?: 2 | 3 };
	let { post, grande = false, nivel = 3 }: Props = $props();
</script>

<article class="tarjeta" class:grande style="--color: {post.seccionInfo.color}">
	<a class="imagen" href="/noticias/{post.slug}" tabindex="-1" aria-hidden="true">
		<img
			src={post.portada}
			alt=""
			width="1200"
			height="630"
			loading={grande ? 'eager' : 'lazy'}
			fetchpriority={grande ? 'high' : undefined}
		/>
	</a>
	<div class="cuerpo">
		<a class="etiqueta" href="/seccion/{post.seccion}">{post.seccionInfo.nombre}</a>
		<svelte:element this={`h${nivel}`} class="titulo">
			<a href="/noticias/{post.slug}">{post.titulo}</a>
		</svelte:element>
		<p class="resumen">{post.descripcion}</p>
		<p class="meta">
			<time datetime={post.fecha}>{fechaLarga(post.fecha)}</time>
			<span aria-hidden="true">·</span>
			{post.minutosLectura} min de lectura
			{#if post.borrador}<span class="borrador">Borrador</span>{/if}
		</p>
	</div>
</article>

<style>
	.tarjeta {
		display: flex;
		flex-direction: column;
		background: var(--fondo-2);
		border: 1px solid var(--borde);
		border-radius: var(--radio);
		overflow: hidden;
		transition:
			border-color 0.2s,
			transform 0.2s;
		position: relative;
	}
	.tarjeta:hover {
		border-color: var(--color);
		transform: translateY(-2px);
	}
	.imagen {
		display: block;
		aspect-ratio: 1200 / 630;
		overflow: hidden;
		background: var(--fondo-3);
	}
	.imagen img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s;
	}
	.tarjeta:hover .imagen img {
		transform: scale(1.03);
	}
	.cuerpo {
		padding: 18px 20px 20px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		flex: 1;
	}
	.titulo {
		font-size: 1.3rem;
	}
	.titulo a {
		color: var(--texto);
		text-decoration: none;
	}
	.titulo a:hover {
		color: var(--color);
	}
	.resumen {
		color: var(--texto-2);
		margin: 0;
		font-size: 0.98rem;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
	.meta {
		margin: auto 0 0;
		padding-top: 6px;
		color: var(--texto-3);
		font-size: 0.85rem;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		align-items: center;
	}
	.borrador {
		background: var(--coral);
		color: #111;
		font-weight: 700;
		border-radius: 6px;
		padding: 0 6px;
	}

	.grande {
		display: grid;
		grid-template-columns: 1.35fr 1fr;
	}
	.grande .imagen {
		aspect-ratio: auto;
		min-height: 100%;
	}
	.grande .cuerpo {
		padding: 32px;
		justify-content: center;
		gap: 12px;
	}
	.grande .titulo {
		font-size: clamp(1.7rem, 3.2vw, 2.5rem);
	}
	.grande .resumen {
		font-size: 1.08rem;
		-webkit-line-clamp: 4;
		line-clamp: 4;
	}
	.grande .meta {
		margin-top: 8px;
	}
	@media (max-width: 860px) {
		.grande {
			display: flex;
		}
		.grande .imagen {
			aspect-ratio: 1200 / 630;
		}
		.grande .cuerpo {
			padding: 20px;
		}
	}
</style>
