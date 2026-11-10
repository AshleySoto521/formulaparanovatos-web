<script lang="ts">
	import { redes, sitio, menu } from '#lib/config.ts';
	import { secciones } from '#lib/data/secciones.ts';
	import Boletin from './Boletin.svelte';
</script>

<footer class="pie">
	<div class="franja" aria-hidden="true"></div>
	<div class="contenedor rejilla">
		<div class="marca">
			<img src="/logo.webp" alt="" width="64" height="64" loading="lazy" />
			<p class="nombre">Fórmula <b>para Novatos</b></p>
			<p class="lema">{sitio.lema}</p>
			<p class="mini">Podcast y noticias de F1 en español, hechos en México 🇲🇽</p>
		</div>

		<nav aria-label="Secciones">
			<h2>Secciones</h2>
			<ul>
				{#each secciones as s (s.slug)}
					<li><a href="/seccion/{s.slug}">{s.nombre}</a></li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Sitio">
			<h2>Sitio</h2>
			<ul>
				{#each menu as m (m.href)}
					<li><a href={m.href}>{m.texto}</a></li>
				{/each}
				<li><a href="/rss.xml">RSS</a></li>
			</ul>
		</nav>

		<div>
			<h2>Síguenos</h2>
			<ul>
				{#each redes as r (r.nombre)}
					<li><a href={r.url} target="_blank" rel="me noopener">{r.nombre}</a></li>
				{/each}
			</ul>
			<p class="correo"><a href="mailto:{sitio.correo}">{sitio.correo}</a></p>
			<div class="suscribe"><Boletin compacto /></div>
		</div>
	</div>
	<div class="contenedor legal">
		<p>© {new Date().getFullYear()} {sitio.nombre}. Hecho en México.</p>
		<p>Proyecto independiente de aficionados, sin afiliación con la Fórmula 1, la FIA ni sus equipos.</p>
		<p class="enlaces-legales">
			<a href="/privacidad">Aviso de Privacidad</a> · <a href="/terminos">Términos de uso</a>
		</p>
	</div>
</footer>

<style>
	.pie {
		margin-top: 80px;
		background: var(--fondo-2);
		border-top: 1px solid var(--borde);
	}
	.rejilla {
		display: grid;
		grid-template-columns: 1.6fr 1fr 1fr 1.2fr;
		gap: 32px;
		padding-block: 48px 32px;
	}
	.marca img {
		width: 64px;
		height: 64px;
	}
	.nombre {
		font-family: var(--f-titulo);
		font-weight: 700;
		font-size: 1.35rem;
		margin: 12px 0 4px;
	}
	.nombre b {
		color: var(--turq);
	}
	.lema {
		margin: 0;
		font-weight: 600;
	}
	.mini {
		color: var(--texto-3);
		font-size: 0.92rem;
		margin: 6px 0 0;
	}
	h2 {
		font-size: 0.85rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--texto-3);
		margin-bottom: 12px;
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 6px;
	}
	ul a {
		color: var(--texto-2);
		text-decoration: none;
	}
	ul a:hover {
		color: var(--turq);
	}
	.correo {
		margin-top: 14px;
		font-size: 0.92rem;
		word-break: break-all;
	}
	.legal {
		border-top: 1px solid var(--borde);
		padding-block: 18px 28px;
		color: var(--texto-3);
		font-size: 0.85rem;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 4px 24px;
	}
	.legal p {
		margin: 0;
	}
	.enlaces-legales a {
		color: var(--texto-2);
	}
	.suscribe {
		margin-top: 22px;
	}
	@media (max-width: 860px) {
		.rejilla {
			grid-template-columns: 1fr 1fr;
		}
		.marca {
			grid-column: 1 / -1;
		}
	}
</style>
