<!--
	Reproductor ligero: muestra la miniatura y solo carga YouTube al hacer clic.
	Uso en un artículo .md:  <YouTube id="6WSW4xwnlC8" titulo="..." vertical />
-->
<script lang="ts">
	type Props = { id: string; titulo: string; vertical?: boolean };
	let { id, titulo, vertical = false }: Props = $props();

	let activo = $state(false);
	const miniatura = $derived(
		vertical ? `/img/ep-${id}.webp` : `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
	);
</script>

<figure class="yt" class:vertical>
	{#if activo}
		<iframe
			src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1&rel=0"
			title={titulo}
			allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		></iframe>
	{:else}
		<button type="button" onclick={() => (activo = true)}>
			<img src={miniatura} alt="" loading="lazy" />
			<span class="play" aria-hidden="true"></span>
			<span class="visualmente-oculto">Reproducir video: {titulo}</span>
		</button>
	{/if}
	<figcaption>{titulo}</figcaption>
</figure>

<style>
	.yt {
		margin: 32px auto;
		max-width: 100%;
	}
	.yt.vertical {
		max-width: 340px;
	}
	button,
	iframe {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		border: 0;
		border-radius: var(--radio);
		overflow: hidden;
		background: #000;
	}
	.vertical button,
	.vertical iframe {
		aspect-ratio: 9 / 16;
	}
	button {
		position: relative;
		padding: 0;
		cursor: pointer;
	}
	button img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.play {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 68px;
		height: 68px;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: var(--coral);
		box-shadow: 0 6px 24px rgba(0, 0, 0, 0.4);
	}
	.play::after {
		content: '';
		position: absolute;
		left: 27px;
		top: 21px;
		border-left: 20px solid #fff;
		border-top: 13px solid transparent;
		border-bottom: 13px solid transparent;
	}
	figcaption {
		color: var(--texto-3);
		font-size: 0.88rem;
		text-align: center;
		margin-top: 10px;
	}
</style>
