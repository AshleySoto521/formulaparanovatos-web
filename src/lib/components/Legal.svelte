<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		titulo,
		actualizado,
		children
	}: { titulo: string; actualizado: string; children: Snippet } = $props();
</script>

<div class="contenedor legal">
	<header>
		<p class="etiqueta">Legal</p>
		<h1>{titulo}</h1>
		<p class="fecha">Última actualización: {actualizado}</p>
	</header>
	<div class="texto">
		{@render children()}
	</div>
</div>

<style>
	.legal {
		max-width: calc(var(--ancho-texto) + 40px);
		padding-top: 48px;
	}
	h1 {
		font-size: clamp(2.1rem, 5vw, 3.2rem);
		font-weight: 900;
		margin: 8px 0 6px;
	}
	.fecha {
		color: var(--texto-3);
		margin: 0 0 32px;
	}
	.texto {
		color: var(--texto-2);
		font-size: 1.05rem;
		line-height: 1.7;
	}
	.texto :global(h2) {
		color: var(--texto);
		font-size: 1.4rem;
		margin: 36px 0 10px;
	}
	.texto :global(strong) {
		color: var(--texto);
	}
	.texto :global(li) {
		margin-bottom: 6px;
	}
</style>
