<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Compartir from '#lib/components/Compartir.svelte';
	import TarjetaNoticia from '#lib/components/TarjetaNoticia.svelte';
	import { sitio, absoluta, redes } from '#lib/config.ts';
	import { fechaLarga } from '#lib/posts.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const post = $derived(data.post);
	const Contenido = $derived(data.Contenido);
	const url = $derived(absoluta(`/noticias/${post.slug}`));

	const jsonLd = $derived([
		{
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			mainEntityOfPage: url,
			headline: post.titulo,
			description: post.descripcion,
			image: [absoluta(post.portadaOg ?? post.portada)],
			datePublished: post.fecha,
			dateModified: post.actualizado ?? post.fecha,
			inLanguage: sitio.idioma,
			articleSection: post.seccionInfo.nombre,
			keywords: post.etiquetas?.join(', '),
			author: { '@type': 'Organization', name: post.autor ?? sitio.autor, url: `${sitio.url}/nosotros` },
			publisher: {
				'@type': 'Organization',
				name: sitio.nombre,
				logo: { '@type': 'ImageObject', url: absoluta('/icon-512.png') }
			}
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Inicio', item: `${sitio.url}/` },
				{ '@type': 'ListItem', position: 2, name: 'Noticias', item: absoluta('/noticias') },
				{ '@type': 'ListItem', position: 3, name: post.seccionInfo.nombre, item: absoluta(`/seccion/${post.seccion}`) },
				{ '@type': 'ListItem', position: 4, name: post.titulo, item: url }
			]
		}
	]);
</script>

<Seo
	titulo={post.titulo}
	descripcion={post.descripcion}
	imagen={post.portadaOg ?? sitio.imagenOg}
	imagenAlt={post.portadaAlt}
	tipo="article"
	publicado={post.fecha}
	actualizado={post.actualizado}
	seccion={post.seccionInfo.nombre}
	etiquetas={post.etiquetas}
	noIndex={post.borrador}
	{jsonLd}
/>

<article style="--color: {post.seccionInfo.color}">
	<header class="contenedor cabecera">
		<nav class="migas" aria-label="Ruta">
			<a href="/noticias">Noticias</a>
			<span aria-hidden="true">/</span>
			<a class="etiqueta" href="/seccion/{post.seccion}">{post.seccionInfo.nombre}</a>
		</nav>
		<h1>{post.titulo}</h1>
		<p class="bajada">{post.descripcion}</p>
		<p class="meta">
			Por <a href="/nosotros">{post.autor ?? sitio.autor}</a>
			<span aria-hidden="true">·</span>
			<time datetime={post.fecha}>{fechaLarga(post.fecha)}</time>
			{#if post.actualizado}
				<span aria-hidden="true">·</span>
				Actualizado el <time datetime={post.actualizado}>{fechaLarga(post.actualizado)}</time>
			{/if}
			<span aria-hidden="true">·</span>
			{post.minutosLectura} min de lectura
		</p>
	</header>

	<figure class="contenedor portada">
		<img src={post.portada} alt={post.portadaAlt} width="1200" height="630" fetchpriority="high" />
	</figure>

	<div class="contenedor">
		<div class="prosa">
			<Contenido />
		</div>

		<footer class="cierre">
			{#if post.etiquetas?.length}
				<ul class="etiquetas" aria-label="Etiquetas">
					{#each post.etiquetas as e (e)}<li>#{e}</li>{/each}
				</ul>
			{/if}
			<Compartir {url} titulo={post.titulo} />
			<aside class="sigue">
				<p><strong>¿Te gustó?</strong> Síguenos para más historias de F1 explicadas sin rollos:</p>
				<p class="redes">
					{#each redes as r (r.nombre)}
						<a href={r.url} target="_blank" rel="me noopener">{r.nombre}</a>
					{/each}
				</p>
			</aside>
		</footer>
	</div>
</article>

{#if data.relacionados.length}
	<section class="contenedor relacionados" aria-labelledby="t-rel">
		<div class="titulo-seccion"><h2 id="t-rel">Sigue leyendo</h2></div>
		<div class="rejilla">
			{#each data.relacionados as p (p.slug)}
				<TarjetaNoticia post={p} />
			{/each}
		</div>
	</section>
{/if}

<style>
	.cabecera {
		max-width: calc(var(--ancho-texto) + 40px);
		padding-top: 40px;
	}
	.migas {
		display: flex;
		gap: 8px;
		align-items: center;
		font-size: 0.9rem;
		color: var(--texto-3);
	}
	.migas a:first-child {
		color: var(--texto-2);
		text-decoration: none;
	}
	h1 {
		font-size: clamp(2.1rem, 5.2vw, 3.3rem);
		font-weight: 900;
		margin: 14px 0 14px;
	}
	.bajada {
		font-size: 1.22rem;
		color: var(--texto-2);
		margin: 0;
		line-height: 1.5;
	}
	.meta {
		color: var(--texto-3);
		font-size: 0.92rem;
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
		margin: 18px 0 0;
		padding-bottom: 22px;
		border-bottom: 1px solid var(--borde);
	}
	.meta a {
		color: var(--texto-2);
	}
	.portada {
		margin-block: 28px 8px;
		max-width: 1000px;
	}
	.portada img {
		width: 100%;
		border-radius: var(--radio);
		border-bottom: 4px solid var(--color);
	}

	.prosa {
		max-width: var(--ancho-texto);
		margin: 24px auto 0;
		font-size: 1.12rem;
		line-height: 1.78;
	}
	.prosa :global(h2) {
		font-size: 1.75rem;
		margin: 2.2em 0 0.6em;
	}
	.prosa :global(h3) {
		font-size: 1.35rem;
		margin: 1.8em 0 0.5em;
		color: var(--color);
	}
	.prosa :global(p),
	.prosa :global(ul),
	.prosa :global(ol) {
		margin: 0 0 1.15em;
	}
	.prosa :global(li) {
		margin-bottom: 0.45em;
	}
	.prosa :global(li::marker) {
		color: var(--color);
	}
	.prosa :global(strong) {
		color: #fff;
	}
	.prosa :global(blockquote) {
		margin: 1.6em 0;
		padding: 6px 0 6px 22px;
		border-left: 4px solid var(--coral);
		font-family: var(--f-titulo);
		font-size: 1.35rem;
		line-height: 1.4;
		color: var(--texto);
	}
	.prosa :global(blockquote p) {
		margin: 0;
	}
	.prosa :global(table) {
		width: 100%;
		border-collapse: collapse;
		margin: 1.4em 0;
		font-size: 0.98rem;
		display: block;
		overflow-x: auto;
	}
	.prosa :global(th),
	.prosa :global(td) {
		text-align: left;
		padding: 10px 12px;
		border-bottom: 1px solid var(--borde);
	}
	.prosa :global(th) {
		font-family: var(--f-titulo);
		color: var(--texto-2);
	}
	.prosa :global(hr) {
		border: 0;
		height: 6px;
		margin: 2.4em 0;
		background: repeating-linear-gradient(90deg, #fff 0 10px, #111 10px 20px);
		opacity: 0.6;
		border-radius: 2px;
	}
	.prosa :global(.dato) {
		background: var(--fondo-2);
		border: 1px solid var(--borde);
		border-left: 4px solid var(--color);
		border-radius: 10px;
		padding: 16px 20px;
		margin: 1.6em 0;
		font-size: 1rem;
	}

	.cierre {
		max-width: var(--ancho-texto);
		margin: 40px auto 0;
		padding-top: 24px;
		border-top: 1px solid var(--borde);
		display: grid;
		gap: 22px;
	}
	.etiquetas {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		list-style: none;
		padding: 0;
		margin: 0;
		color: var(--texto-3);
		font-size: 0.92rem;
	}
	.sigue {
		background: var(--fondo-2);
		border: 1px solid var(--borde-turq);
		border-radius: var(--radio);
		padding: 18px 20px;
	}
	.sigue p {
		margin: 0;
	}
	.redes {
		display: flex;
		flex-wrap: wrap;
		gap: 6px 16px;
		margin-top: 8px !important;
		font-weight: 600;
	}
	.relacionados {
		margin-top: 64px;
	}
	.rejilla {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		gap: 22px;
	}
</style>
