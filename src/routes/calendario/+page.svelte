<script lang="ts">
	import { onMount } from 'svelte';
	import Seo from '#lib/components/Seo.svelte';
	import Trazado from '#lib/components/Trazado.svelte';
	import Bandera from '#lib/components/Bandera.svelte';
	import ProximaCarrera from '#lib/components/ProximaCarrera.svelte';
	import {
		carreras,
		temporada,
		actualizado,
		proximaCarrera,
		rangoFechas,
		colorEquipo
	} from '#lib/calendario.ts';
	import { sitio, absoluta } from '#lib/config.ts';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	let ahora = $state<number | null>(null);
	onMount(() => {
		ahora = Date.now();
		const t = setInterval(() => (ahora = Date.now()), 60_000);
		return () => clearInterval(t);
	});
	const proxima = $derived(proximaCarrera(ahora ?? data.generado));
	const corridas = carreras.filter((c) => c.podio).length;
	const medalla = ['🥇', '🥈', '🥉'];

	const fechaActualizado = new Intl.DateTimeFormat('es-MX', {
		dateStyle: 'long',
		timeZone: 'America/Mexico_City'
	}).format(new Date(actualizado));

	const jsonLd = {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		name: `Calendario de Fórmula 1 ${temporada}`,
		itemListElement: carreras.map((c, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: {
				'@type': 'SportsEvent',
				name: `${c.nombre} ${temporada}`,
				startDate: c.inicio,
				sport: 'Fórmula 1',
				eventStatus: 'https://schema.org/EventScheduled',
				location: { '@type': 'Place', name: c.circuito, address: `${c.ciudad}, ${c.pais}` },
				organizer: { '@type': 'Organization', name: 'Formula 1' }
			}
		})),
		url: absoluta('/calendario'),
		publisher: { '@id': `${sitio.url}/#org` }
	};
</script>

<Seo
	titulo="Calendario F1 {temporada}"
	descripcion="Calendario completo de la Fórmula 1 {temporada}: fechas y horarios de cada Gran Premio en hora del centro de México, carreras corridas y podios."
	{jsonLd}
/>

<div class="contenedor">
	<header class="cabecera">
		<p class="etiqueta">Temporada {temporada}</p>
		<h1>Calendario de la F1 {temporada}</h1>
		<p class="bajada">
			{carreras.length} Grandes Premios · {corridas} corridos · {carreras.length - corridas} por correr.
			Horarios en hora del centro de México.
		</p>
	</header>

	<div class="destacada"><ProximaCarrera generado={data.generado} /></div>

	<ol class="lista">
		{#each carreras as c (c.ronda)}
			{@const hecha = Boolean(c.podio)}
			<li class="gp" class:hecha class:proxima={c === proxima}>
				<div class="ronda">
					{#if hecha}
						<span class="check" aria-label="Carrera corrida">✓</span>
					{:else}
						<span class="num">{String(c.ronda).padStart(2, '0')}</span>
					{/if}
				</div>
				<div class="datos">
					<p class="fecha">
						{rangoFechas(c)}
						{#if c.sprint}<span class="sprint">Sprint</span>{/if}
						{#if c === proxima}<span class="sig">Próxima</span>{/if}
					</p>
					<h2><Bandera codigo={c.codigoPais} pais={c.pais} /> {c.nombre}</h2>
					<p class="lugar">{c.circuito} · {c.ciudad}</p>
				</div>
				{#if c.podio}
					<ol class="podio" aria-label="Podio">
						{#each c.podio as p (p.pos)}
							<li style="--equipo: {colorEquipo[p.equipo] ?? 'var(--texto-3)'}">
								<span class="medalla" aria-hidden="true">{medalla[p.pos - 1]}</span>
								<span class="piloto">{p.piloto}</span>
								<span class="equipo">{p.equipo}</span>
							</li>
						{/each}
					</ol>
				{:else}
					<div class="podio pendiente">
						<span>Por correr</span>
					</div>
				{/if}
				{#if c.trazado}
					<div class="mini"><Trazado trazado={c.trazado} titulo={c.circuito} grosor={22} /></div>
				{/if}
			</li>
		{/each}
	</ol>

	<p class="fuentes">
		Actualizado el {fechaActualizado}. Calendario y resultados: Fórmula 1 / FIA (vía la API pública
		Jolpica). Trazados de los circuitos:
		<a href="https://github.com/bacinger/f1-circuits" target="_blank" rel="noopener">f1-circuits</a>
		© Tomislav Bacinger (licencia MIT). Banderas:
		<a href="https://github.com/lipis/flag-icons" target="_blank" rel="noopener">flag-icons</a> (MIT). Los horarios pueden cambiar; consulta la fuente oficial antes
		de cada sesión.
	</p>
</div>

<style>
	.cabecera {
		max-width: 820px;
		padding-top: 48px;
	}
	h1 {
		font-size: clamp(2.3rem, 5.5vw, 3.6rem);
		font-weight: 900;
		margin: 8px 0 12px;
	}
	.bajada {
		color: var(--texto-2);
		font-size: 1.1rem;
		margin: 0;
	}
	.destacada {
		margin-top: 36px;
	}
	.lista {
		list-style: none;
		margin: 48px 0 0;
		padding: 0;
		display: grid;
		gap: 12px;
	}
	.gp {
		display: grid;
		grid-template-columns: 56px 1.3fr 1.4fr 96px;
		gap: 20px;
		align-items: center;
		padding: 16px 20px;
		border-radius: 14px;
		background: var(--fondo-2);
		border: 1px solid var(--borde);
	}
	.gp.proxima {
		border-color: var(--turq);
		box-shadow: 0 0 0 1px var(--turq) inset;
	}
	.ronda {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border-radius: 50%;
		background: var(--fondo);
		border: 1px solid var(--borde);
		font-family: var(--f-titulo);
		font-weight: 800;
	}
	.hecha .ronda {
		background: rgba(0, 224, 223, 0.14);
		border-color: var(--borde-turq);
	}
	.check {
		color: var(--turq);
		font-size: 1.3rem;
	}
	.num {
		color: var(--texto-2);
	}
	.fecha {
		margin: 0;
		font-size: 0.85rem;
		color: var(--texto-3);
		text-transform: uppercase;
		letter-spacing: 0.05em;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		align-items: center;
	}
	.sprint,
	.sig {
		font-size: 0.7rem;
		font-weight: 700;
		padding: 2px 8px;
		border-radius: 999px;
		background: rgba(255, 96, 85, 0.15);
		color: var(--coral);
	}
	.sig {
		background: var(--turq);
		color: #111;
	}
	h2 {
		font-size: 1.3rem;
		margin: 4px 0 2px;
	}
	.lugar {
		margin: 0;
		color: var(--texto-2);
		font-size: 0.92rem;
	}
	.podio {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 3px;
	}
	.podio li {
		display: grid;
		grid-template-columns: 1.5rem 1fr auto;
		gap: 8px;
		align-items: center;
		font-size: 0.95rem;
	}
	.piloto {
		font-weight: 600;
	}
	.equipo {
		font-size: 0.8rem;
		color: var(--texto-3);
		padding-left: 8px;
		border-left: 3px solid var(--equipo);
	}
	.pendiente {
		color: var(--texto-3);
		font-size: 0.9rem;
		font-style: italic;
	}
	.mini {
		width: 96px;
		height: 72px;
	}
	.fuentes {
		margin-top: 32px;
		font-size: 0.85rem;
		color: var(--texto-3);
	}
	.fuentes a {
		color: var(--texto-2);
	}
	@media (max-width: 860px) {
		.gp {
			grid-template-columns: 44px 1fr 72px;
			gap: 12px 14px;
			padding: 14px;
		}
		.ronda {
			width: 40px;
			height: 40px;
		}
		.podio {
			grid-column: 1 / -1;
			grid-row: 2;
		}
		.mini {
			grid-column: 3;
			grid-row: 1;
			width: 72px;
			height: 56px;
		}
	}
</style>
