<script lang="ts">
	import { page } from '$app/state';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo titulo={page.status === 404 ? 'Página no encontrada' : 'Error'} noIndex />

<div class="contenedor error">
	<img src="/logo.webp" alt="" width="120" height="120" />
	<p class="codigo">{page.status}</p>
	<h1>{page.status === 404 ? 'Te saliste de la pista 🏁' : 'Bandera roja'}</h1>
	<p>
		{page.status === 404
			? 'Esta página no existe o cambió de lugar.'
			: 'Algo falló de nuestro lado. Inténtalo de nuevo en un momento.'}
	</p>
	<div class="acciones">
		<a class="boton" href="/">Volver a boxes</a>
		<a class="boton secundario" href="/noticias">Ver noticias</a>
	</div>
</div>

<style>
	.error {
		text-align: center;
		padding-block: 64px 24px;
		display: grid;
		justify-items: center;
		gap: 4px;
	}
	.codigo {
		font-family: var(--f-titulo);
		font-weight: 900;
		font-size: 4rem;
		line-height: 1;
		margin: 16px 0 0;
		color: var(--coral);
	}
	h1 {
		font-size: clamp(1.8rem, 4vw, 2.6rem);
	}
	p {
		color: var(--texto-2);
	}
	.acciones {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		justify-content: center;
		margin-top: 12px;
	}
</style>
