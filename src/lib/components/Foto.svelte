<!--
	Foto con pie y crédito (obligatorio para imágenes con licencia Creative Commons).
	Uso en un .md:
	<Foto src="/img/noticias/x/foto.webp" alt="..." pie="..." autor="Nombre" licencia="CC BY 4.0"
	      fuente="https://commons.wikimedia.org/wiki/File:..." />
-->
<script lang="ts">
	type Props = {
		src: string;
		alt: string;
		pie?: string;
		autor?: string;
		licencia?: string;
		fuente?: string;
		ancho?: number;
		alto?: number;
	};
	let { src, alt, pie, autor, licencia, fuente, ancho = 1200, alto = 800 }: Props = $props();
</script>

<figure>
	<img {src} {alt} width={ancho} height={alto} loading="lazy" />
	{#if pie || autor}
		<figcaption>
			{#if pie}<span>{pie}</span>{/if}
			{#if autor}
				<small>
					Foto: {#if fuente}<a href={fuente} target="_blank" rel="noopener">{autor}</a>{:else}{autor}{/if}{#if licencia}, {licencia}{/if}
				</small>
			{/if}
		</figcaption>
	{/if}
</figure>

<style>
	figure {
		margin: 2em 0;
	}
	img {
		width: 100%;
		border-radius: 12px;
	}
	figcaption {
		display: grid;
		gap: 2px;
		margin-top: 8px;
		font-size: 0.88rem;
		color: var(--texto-2);
		line-height: 1.45;
	}
	small {
		color: var(--texto-3);
		font-size: 0.8rem;
	}
	small a {
		color: inherit;
	}
</style>
