<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import TarjetaEpisodio from '#lib/components/TarjetaEpisodio.svelte';
	import { videos, shorts } from '#lib/data/episodios.ts';
	import { redes } from '#lib/config.ts';
</script>

<Seo
	titulo="Episodios"
	descripcion="Todos los episodios y Shorts de Fórmula para Novatos: carreras épicas, historias de pilotos y la F1 de hoy, en español."
/>

<header class="cabecera">
	<div class="contenedor">
		<h1>Episodios</h1>
		<p>Videos cortos y episodios del podcast. Toca uno para verlo en YouTube.</p>
		<div class="acciones">
			{#each redes.filter((r) => r.nombre !== 'Facebook') as r (r.nombre)}
				<a class="boton secundario" href={r.url} target="_blank" rel="me noopener">{r.nombre}</a>
			{/each}
		</div>
	</div>
</header>

<div class="contenedor">
	{#if videos.length}
		<section aria-labelledby="t-videos">
			<h2 id="t-videos">Videos</h2>
			<div class="rejilla-videos">
				{#each videos as episodio (episodio.id)}
					<TarjetaEpisodio {episodio} />
				{/each}
			</div>
		</section>
	{/if}
	{#if shorts.length}
		<section aria-labelledby="t-shorts">
			<h2 id="t-shorts">Shorts</h2>
			<div class="rejilla">
				{#each shorts as episodio (episodio.id)}
					<TarjetaEpisodio {episodio} />
				{/each}
			</div>
		</section>
	{/if}
</div>

<style>
	.cabecera {
		border-bottom: 1px solid var(--borde);
		background: linear-gradient(180deg, rgba(0, 224, 223, 0.15), transparent);
		padding-block: 44px 32px;
		margin-bottom: 36px;
	}
	h1 {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		font-weight: 900;
	}
	p {
		color: var(--texto-2);
		font-size: 1.08rem;
	}
	.acciones {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	section + section {
		margin-top: 44px;
	}
	h2 {
		font-size: 1.6rem;
		margin-bottom: 16px;
	}
	.rejilla-videos {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 18px;
	}
	.rejilla {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 18px;
	}
	@media (max-width: 480px) {
		.rejilla {
			grid-template-columns: repeat(2, 1fr);
			gap: 12px;
		}
	}
</style>
