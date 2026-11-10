<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import { sitio } from '#lib/config.ts';
	import { secciones } from '#lib/data/secciones.ts';
</script>

<Seo
	titulo="Nosotros"
	descripcion="Fórmula para Novatos es una escudería de contenido de Fórmula 1 hecha en México, con dos pilotos: el creador y Stig."
/>

<header class="cabecera">
	<div class="contenedor angosto">
		<p class="etiqueta">La escudería</p>
		<h1>Una escudería de contenido sobre F1</h1>
		<p class="bajada">
			{sitio.nombre} es un proyecto independiente hecho en México. Explicamos por qué importa lo que
			pasa en la pista, con rigor, humor y la perspectiva de alguien que sigue la F1 desde el año 2000.
			Si apenas empiezas o llevas décadas viéndola, aquí tienes lugar.
		</p>
	</div>
</header>

<div class="contenedor angosto">
	<section aria-labelledby="t-pilotos">
		<h2 id="t-pilotos">La alineación de pilotos</h2>
		<div class="pilotos">
			<article class="piloto">
				<div class="foto uno"><img src="/logo.webp" alt="" width="140" height="140" loading="lazy" /></div>
				<div>
					<span class="num">#01</span>
					<h3>El creador</h3>
					<p>
						Piloto titular, voz y alma del proyecto. Sigue la F1 desde el año 2000 y la cuenta con
						análisis, historias y mucho contexto.
					</p>
				</div>
			</article>
			<article class="piloto dos">
				<div class="foto"><img src="/img/stig.webp" alt="Retrato de Stig, segundo piloto de Fórmula para Novatos" width="140" height="140" loading="lazy" /></div>
				<div>
					<span class="num">#02</span>
					<h3>Stig</h3>
					<p>Segundo piloto de la escudería: explica, pregunta, debate y pone el humor.</p>
					<span class="ia">Personaje creado con IA</span>
				</div>
			</article>
		</div>
	</section>

	<section aria-labelledby="t-principios">
		<h2 id="t-principios">Cómo trabajamos</h2>
		<ul class="principios">
			<li><strong>Hechos, análisis y opinión, por separado.</strong> Te decimos qué es dato, qué es lectura nuestra y qué es rumor.</li>
			<li><strong>Contexto antes que prisa.</strong> No competimos por publicar primero, sino por explicar por qué importa.</li>
			<li><strong>Sin elitismo.</strong> La F1 es para quien llega hoy y para quien la ve desde hace décadas.</li>
			<li><strong>Transparencia con la IA.</strong> Todo contenido donde aparece Stig se marca como generado con IA.</li>
		</ul>
	</section>

	<section aria-labelledby="t-secciones">
		<h2 id="t-secciones">Nuestras secciones</h2>
		<ul class="secciones">
			{#each secciones as s (s.slug)}
				<li style="--color: {s.color}">
					<a href="/seccion/{s.slug}">{s.nombre}</a>
					<span>{s.descripcion}</span>
				</li>
			{/each}
		</ul>
	</section>
</div>

<style>
	.angosto {
		max-width: 880px;
	}
	.cabecera {
		background: linear-gradient(180deg, rgba(0, 224, 223, 0.15), transparent);
		border-bottom: 1px solid var(--borde);
		padding-block: 48px 36px;
	}
	h1 {
		font-size: clamp(2.2rem, 5vw, 3.4rem);
		font-weight: 900;
		margin: 8px 0 14px;
	}
	.bajada {
		color: var(--texto-2);
		font-size: 1.15rem;
		margin: 0;
	}
	section {
		margin-top: 52px;
	}
	h2 {
		font-size: 1.8rem;
		margin-bottom: 20px;
	}
	.pilotos {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 18px;
	}
	.piloto {
		display: flex;
		gap: 18px;
		align-items: flex-start;
		background: var(--fondo-2);
		border: 1px solid var(--borde);
		border-radius: var(--radio);
		padding: 20px;
	}
	.foto {
		flex: 0 0 110px;
		width: 110px;
		height: 110px;
		border-radius: 50%;
		overflow: hidden;
		border: 3px solid var(--turq);
		display: grid;
		place-items: center;
		background: var(--fondo);
	}
	.foto img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.foto.uno img {
		width: 82%;
		height: 82%;
		object-fit: contain;
	}
	.dos .foto {
		border-color: var(--coral);
	}
	.num {
		font-family: var(--f-titulo);
		font-weight: 900;
		font-size: 2.2rem;
		line-height: 1;
		color: var(--turq);
	}
	.dos .num {
		color: var(--coral);
	}
	.piloto h3 {
		font-size: 1.3rem;
		margin: 4px 0 6px;
	}
	.piloto p {
		margin: 0;
		color: var(--texto-2);
	}
	.ia {
		display: inline-block;
		margin-top: 10px;
		font-size: 0.78rem;
		padding: 2px 10px;
		border-radius: 999px;
		border: 1px solid var(--coral);
	}
	.principios,
	.secciones {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 12px;
	}
	.principios li {
		padding: 16px 18px;
		background: var(--fondo-2);
		border-radius: 12px;
		border-left: 4px solid var(--turq);
		color: var(--texto-2);
	}
	.principios strong {
		color: var(--texto);
	}
	.secciones li {
		display: grid;
		gap: 2px;
		padding: 14px 18px;
		border-radius: 12px;
		background: var(--fondo-2);
		border-left: 4px solid var(--color);
	}
	.secciones a {
		font-family: var(--f-titulo);
		font-weight: 700;
		font-size: 1.2rem;
		color: var(--color);
		text-decoration: none;
	}
	.secciones span {
		color: var(--texto-2);
		font-size: 0.96rem;
	}
	@media (max-width: 420px) {
		.piloto {
			flex-direction: column;
			align-items: center;
			text-align: center;
		}
	}
</style>
