<script lang="ts">
	import { page } from '$app/state';
	import { sitio, absoluta } from '#lib/config.ts';

	type Props = {
		titulo?: string;
		descripcion?: string;
		imagen?: string;
		imagenAlt?: string;
		tipo?: 'website' | 'article';
		publicado?: string;
		actualizado?: string;
		seccion?: string;
		etiquetas?: string[];
		noIndex?: boolean;
		jsonLd?: Record<string, unknown> | Record<string, unknown>[];
	};

	let {
		titulo,
		descripcion = sitio.descripcion,
		imagen = sitio.imagenOg,
		imagenAlt = 'Logo de Fórmula para Novatos: casco de piloto dentro de un escudo turquesa y coral',
		tipo = 'website',
		publicado,
		actualizado,
		seccion,
		etiquetas = [],
		noIndex = false,
		jsonLd
	}: Props = $props();

	const tituloCompleto = $derived(titulo ? `${titulo} | ${sitio.nombre}` : `${sitio.nombre} | Podcast y noticias de F1 en español`);
	const canonica = $derived(absoluta(page.url.pathname === '/' ? '/' : page.url.pathname.replace(/\/$/, '')));
	const imagenAbs = $derived(absoluta(imagen));
	const ld = $derived(
		jsonLd
			? `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</` + 'script>'
			: ''
	);
</script>

<svelte:head>
	<title>{tituloCompleto}</title>
	<meta name="description" content={descripcion} />
	<link rel="canonical" href={canonica} />
	{#if noIndex}
		<meta name="robots" content="noindex" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large" />
	{/if}

	<meta property="og:site_name" content={sitio.nombre} />
	<meta property="og:locale" content={sitio.locale} />
	<meta property="og:type" content={tipo} />
	<meta property="og:url" content={canonica} />
	<meta property="og:title" content={titulo ?? sitio.nombre} />
	<meta property="og:description" content={descripcion} />
	<meta property="og:image" content={imagenAbs} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imagenAlt} />
	{#if tipo === 'article'}
		{#if publicado}<meta property="article:published_time" content={publicado} />{/if}
		{#if actualizado}<meta property="article:modified_time" content={actualizado} />{/if}
		{#if seccion}<meta property="article:section" content={seccion} />{/if}
		{#each etiquetas as e (e)}<meta property="article:tag" content={e} />{/each}
	{/if}

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={titulo ?? sitio.nombre} />
	<meta name="twitter:description" content={descripcion} />
	<meta name="twitter:image" content={imagenAbs} />

	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	{@html ld}
</svelte:head>
