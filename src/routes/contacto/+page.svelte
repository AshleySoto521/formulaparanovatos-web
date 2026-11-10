<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { sitio, redes } from '#lib/config.ts';
</script>

<Seo
	titulo="Contacto"
	descripcion="Colaboraciones, medios y marcas: escríbele a Fórmula para Novatos, podcast y noticias de F1 en español hechos en México."
/>

<div class="contenedor angosto">
	<header>
		<p class="etiqueta">Contacto</p>
		<h1>¿Hacemos equipo?</h1>
		<p class="bajada">
			Marcas, medios, organizadores y otros creadores: si quieren colaborar con {sitio.nombre},
			escríbannos. También leemos ideas, correcciones y sugerencias de la comunidad.
		</p>
	</header>

	<a class="correo" href="mailto:{sitio.correo}">
		<span class="etiqueta">Correo</span>
		<strong>{sitio.correo}</strong>
	</a>

	<section aria-labelledby="t-redes">
		<h2 id="t-redes">También estamos en</h2>
		<ul>
			{#each redes as r (r.nombre)}
				<li>
					<a href={r.url} target="_blank" rel="me noopener">
						<strong>{r.nombre}</strong>
						<span>{r.usuario}</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.angosto {
		max-width: 820px;
		padding-top: 48px;
	}
	h1 {
		font-size: clamp(2.3rem, 5.5vw, 3.6rem);
		font-weight: 900;
		margin: 8px 0 14px;
	}
	.bajada {
		color: var(--texto-2);
		font-size: 1.15rem;
	}
	.correo {
		display: grid;
		gap: 4px;
		margin-top: 28px;
		padding: 26px 28px;
		border-radius: 18px;
		background: linear-gradient(135deg, rgba(0, 224, 223, 0.16), rgba(255, 96, 85, 0.12));
		border: 1px solid var(--borde-turq);
		text-decoration: none;
		color: var(--texto);
	}
	.correo strong {
		font-family: var(--f-titulo);
		font-size: clamp(1.2rem, 4vw, 1.9rem);
		word-break: break-all;
	}
	.correo:hover strong {
		color: var(--turq);
	}
	section {
		margin-top: 44px;
	}
	h2 {
		font-size: 1.5rem;
		margin-bottom: 16px;
	}
	ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
		gap: 12px;
	}
	ul a {
		display: grid;
		gap: 2px;
		padding: 16px 18px;
		border-radius: 12px;
		background: var(--fondo-2);
		border: 1px solid var(--borde);
		color: var(--texto);
		text-decoration: none;
	}
	ul a:hover {
		border-color: var(--turq);
	}
	ul span {
		color: var(--texto-3);
		font-size: 0.9rem;
	}
</style>
