<script lang="ts">
	import { type Episodio, urlEpisodio, tituloDe } from '#lib/data/episodios.ts';

	let { episodio }: { episodio: Episodio } = $props();
</script>

<a class="ep" class:horizontal={episodio.formato === 'video'} href={urlEpisodio(episodio)} target="_blank" rel="noopener">
	<div class="miniatura">
		<img
			src={episodio.miniatura}
			width={episodio.formato === 'video' ? 640 : 360}
			height={episodio.formato === 'video' ? 360 : 640}
			loading="lazy"
			alt=""
		/>
		<span class="play" aria-hidden="true"></span>
	</div>
	<h3>{tituloDe(episodio)}</h3>
	<span class="visualmente-oculto">(se abre YouTube en una pestaña nueva)</span>
</a>

<style>
	.ep {
		display: flex;
		flex-direction: column;
		height: 100%;
		color: var(--texto);
		text-decoration: none;
		border-radius: var(--radio);
		overflow: hidden;
		background: var(--fondo-2);
		border: 1px solid var(--borde);
		transition:
			transform 0.2s,
			border-color 0.2s;
	}
	.ep:hover {
		transform: translateY(-3px);
		border-color: var(--turq);
	}
	.miniatura {
		position: relative;
		aspect-ratio: 9 / 16;
		background: #0c0d0e;
	}
	.horizontal .miniatura {
		aspect-ratio: 16 / 9;
	}
	.miniatura {
		overflow: hidden;
	}
	.miniatura img {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.play {
		position: absolute;
		left: 50%;
		top: 50%;
		width: 54px;
		height: 54px;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background: rgba(21, 23, 24, 0.75);
		border: 2px solid var(--turq);
	}
	.play::after {
		content: '';
		position: absolute;
		left: 21px;
		top: 16px;
		border-left: 16px solid var(--turq);
		border-top: 10px solid transparent;
		border-bottom: 10px solid transparent;
	}
	h3 {
		font-size: 1rem;
		line-height: 1.3;
		padding: 12px 14px 14px;
	}
	@media (max-width: 480px) {
		h3 {
			font-size: 0.88rem;
			padding: 10px;
		}
		.play {
			transform: translate(-50%, -50%) scale(0.8);
		}
	}
</style>
