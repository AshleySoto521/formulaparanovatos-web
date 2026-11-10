<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import TarjetaNoticia from '#lib/components/TarjetaNoticia.svelte';
	import TarjetaEpisodio from '#lib/components/TarjetaEpisodio.svelte';
	import { sitio, redes, absoluta } from '#lib/config.ts';
	import { secciones } from '#lib/data/secciones.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'Organization',
			'@id': `${sitio.url}/#org`,
			name: sitio.nombre,
			url: `${sitio.url}/`,
			logo: absoluta('/icon-512.png'),
			slogan: sitio.lema,
			email: sitio.correo,
			sameAs: redes.map((r) => r.url)
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			'@id': `${sitio.url}/#web`,
			url: `${sitio.url}/`,
			name: sitio.nombre,
			inLanguage: sitio.idioma,
			publisher: { '@id': `${sitio.url}/#org` }
		},
		{
			'@context': 'https://schema.org',
			'@type': 'PodcastSeries',
			name: sitio.nombre,
			url: `${sitio.url}/`,
			description: sitio.descripcion,
			inLanguage: sitio.idioma,
			image: absoluta(sitio.imagenOg),
			publisher: { '@id': `${sitio.url}/#org` }
		}
	];
</script>

<Seo {jsonLd} />

<section class="portada">
	<div class="contenedor portada-fila">
		<div>
			<p class="etiqueta">Podcast · Noticias · Historia</p>
			<h1>La F1 explicada <span>claro y sin rollos</span></h1>
			<p class="intro">
				🏁 Podcast y noticias de Fórmula 1 en español, hechos en México 🇲🇽. Las carreras más
				épicas, la historia detrás de cada piloto y lo que pasa hoy en la F1.
			</p>
			<p class="lema">{sitio.lema}</p>
			<div class="acciones">
				<a class="boton" href="/noticias">Leer noticias</a>
				<a class="boton secundario" href={redes[0].url} target="_blank" rel="me noopener">Ver en YouTube</a>
			</div>
		</div>
		<img class="logo" src="/logo.webp" alt="Logo de Fórmula para Novatos" width="320" height="320" fetchpriority="high" />
	</div>
</section>

<div class="contenedor">
	{#if data.destacado}
		<section class="bloque" aria-labelledby="t-destacado">
			<h2 id="t-destacado" class="visualmente-oculto">Nota destacada</h2>
			<TarjetaNoticia post={data.destacado} grande />
		</section>
	{/if}

	{#if data.recientes.length}
		<section class="bloque" aria-labelledby="t-recientes">
			<div class="titulo-seccion">
				<h2 id="t-recientes">Lo más reciente</h2>
				<a href="/noticias">Todas las noticias →</a>
			</div>
			<div class="rejilla-noticias">
				{#each data.recientes as post (post.slug)}
					<TarjetaNoticia {post} />
				{/each}
			</div>
		</section>
	{/if}

	<section class="bloque" aria-labelledby="t-episodios">
		<div class="titulo-seccion">
			<h2 id="t-episodios">Últimos episodios</h2>
			<a href="/episodios">Ver todos →</a>
		</div>
		<div class="rejilla-episodios">
			{#each data.episodios as episodio (episodio.id)}
				<TarjetaEpisodio {episodio} />
			{/each}
		</div>
	</section>

	<section class="bloque" aria-labelledby="t-secciones">
		<div class="titulo-seccion">
			<h2 id="t-secciones">Nuestras secciones</h2>
		</div>
		<div class="rejilla-secciones">
			{#each secciones as s (s.slug)}
				<a class="seccion" href="/seccion/{s.slug}" style="--color: {s.color}">
					<span class="etiqueta">{s.etiqueta}</span>
					<h3>{s.nombre}</h3>
					<p>{s.descripcion}</p>
				</a>
			{/each}
		</div>
	</section>

	<section class="bloque cta" aria-labelledby="t-cta">
		<h2 id="t-cta">¿Hacemos equipo?</h2>
		<p>Marcas, medios y creadores: si quieren colaborar con {sitio.nombre}, escríbannos.</p>
		<a class="boton" href="/contacto">Contacto</a>
	</section>
</div>

<style>
	.portada {
		background:
			radial-gradient(1200px 500px at 85% -10%, rgba(0, 224, 223, 0.35), transparent 60%),
			linear-gradient(180deg, #0b5354 0%, var(--fondo) 100%);
		border-bottom: 1px solid var(--borde);
	}
	.portada-fila {
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		align-items: center;
		gap: 32px;
		padding-block: 56px 64px;
	}
	h1 {
		font-size: clamp(2.4rem, 6vw, 4.2rem);
		font-weight: 900;
		margin: 10px 0 16px;
	}
	h1 span {
		color: var(--turq);
		display: block;
	}
	.intro {
		color: var(--texto-2);
		font-size: 1.12rem;
		max-width: 560px;
		margin: 0;
	}
	.lema {
		font-family: var(--f-titulo);
		font-weight: 700;
		font-size: 1.2rem;
		margin: 18px 0 0;
	}
	.lema::before {
		content: '';
		display: block;
		width: 64px;
		height: 5px;
		background: var(--coral);
		border-radius: 3px;
		margin-bottom: 14px;
	}
	.acciones {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: 26px;
	}
	.logo {
		width: min(320px, 100%);
		justify-self: center;
		filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 0.45));
	}
	.bloque {
		margin-top: 56px;
	}
	.rejilla-noticias {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 22px;
	}
	.rejilla-episodios {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 16px;
	}
	.rejilla-secciones {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
		gap: 16px;
	}
	.seccion {
		display: block;
		padding: 22px;
		border-radius: var(--radio);
		background: var(--fondo-2);
		border: 1px solid var(--borde);
		border-top: 4px solid var(--color);
		color: var(--texto);
		text-decoration: none;
		transition: transform 0.2s;
	}
	.seccion:hover {
		transform: translateY(-2px);
	}
	.seccion h3 {
		font-size: 1.3rem;
		margin: 6px 0 8px;
		color: var(--color);
	}
	.seccion p {
		margin: 0;
		color: var(--texto-2);
		font-size: 0.96rem;
	}
	.cta {
		text-align: center;
		padding: 44px 24px;
		border-radius: 20px;
		background: linear-gradient(135deg, rgba(0, 224, 223, 0.14), rgba(255, 96, 85, 0.12));
		border: 1px solid var(--borde-turq);
	}
	.cta h2 {
		font-size: clamp(1.7rem, 4vw, 2.4rem);
	}
	.cta p {
		color: var(--texto-2);
		margin: 12px auto 22px;
		max-width: 560px;
	}
	@media (max-width: 860px) {
		.portada-fila {
			grid-template-columns: 1fr;
			padding-block: 36px 44px;
		}
		.logo {
			order: -1;
			width: 160px;
		}
		.rejilla-episodios {
			grid-template-columns: repeat(2, 1fr);
			gap: 12px;
		}
	}
</style>
