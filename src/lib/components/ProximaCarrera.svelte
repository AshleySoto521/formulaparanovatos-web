<script lang="ts">
	import { onMount } from 'svelte';
	import Trazado from './Trazado.svelte';
	import Bandera from './Bandera.svelte';
	import {
		proximaCarrera,
		enCurso,
		diaSesion,
		horaSesion,
		rangoFechas,
		temporada,
		ZONA_MX
	} from '#lib/calendario.ts';

	/** Momento de la compilación: sirve para el HTML inicial; en el navegador se usa el reloj real. */
	let { generado }: { generado: number } = $props();

	let ahora = $state<number | null>(null);
	let miZona = $state(false);
	let zonaLocal = $state('');

	onMount(() => {
		ahora = Date.now();
		zonaLocal = Intl.DateTimeFormat().resolvedOptions().timeZone;
		const t = setInterval(() => (ahora = Date.now()), 1000);
		return () => clearInterval(t);
	});

	const reloj = $derived(ahora ?? generado);
	const carrera = $derived(proximaCarrera(reloj));
	const zona = $derived(miZona && zonaLocal ? zonaLocal : ZONA_MX);
	const enVivo = $derived(carrera ? enCurso(carrera, reloj) : false);
	const siguiente = $derived(carrera?.sesiones.find((s) => Date.parse(s.inicio) > reloj));

	const faltan = $derived.by(() => {
		if (!carrera || ahora === null) return null;
		const ms = Math.max(0, Date.parse(carrera.inicio) - ahora);
		return {
			dias: Math.floor(ms / 86_400_000),
			horas: Math.floor(ms / 3_600_000) % 24,
			minutos: Math.floor(ms / 60_000) % 60,
			segundos: Math.floor(ms / 1000) % 60
		};
	});

	const dos = (n: number) => String(n).padStart(2, '0');
</script>

{#if carrera}
	<section class="proxima" aria-labelledby="t-proxima">
		<div class="info">
			<p class="etiqueta">
				{enVivo ? '🔴 En vivo' : 'Próxima carrera'} · Ronda {carrera.ronda} de {temporada}
			</p>
			<h2 id="t-proxima"><Bandera codigo={carrera.codigoPais} pais={carrera.pais} alto={26} /> {carrera.nombre}</h2>
			<p class="circuito">{carrera.circuito} · {carrera.ciudad} · {rangoFechas(carrera, zona)}</p>

			<div class="cuenta" aria-live="off">
				{#if enVivo}
					<p class="vivo">¡La carrera está en curso!</p>
				{:else}
					{#each [['dias', 'días'], ['horas', 'horas'], ['minutos', 'min'], ['segundos', 'seg']] as [k, t] (k)}
						<div class="unidad">
							<span class="num">{faltan ? dos(faltan[k as keyof typeof faltan]) : '--'}</span>
							<span class="txt">{t}</span>
						</div>
					{/each}
				{/if}
			</div>

			<ul class="sesiones">
				{#each carrera.sesiones as s (s.nombre)}
					{@const pasada = Date.parse(s.inicio) < reloj}
					<li class:pasada class:siguiente={s === siguiente} class:carrera={s.nombre === 'Carrera'}>
						<span class="nombre">{s.nombre}</span>
						<span class="dia">{diaSesion(s.inicio, zona)}</span>
						<span class="hora">{horaSesion(s.inicio, zona)}</span>
					</li>
				{/each}
			</ul>
			<p class="zona">
				Horario {miZona ? `de tu zona (${zonaLocal})` : 'del centro de México'}.
				{#if zonaLocal && zonaLocal !== ZONA_MX}
					<button type="button" onclick={() => (miZona = !miZona)}>
						{miZona ? 'Ver hora de CDMX' : 'Ver en mi hora local'}
					</button>
				{/if}
			</p>
			<a class="boton secundario" href="/calendario">Calendario completo</a>
		</div>

		{#if carrera.trazado}
			<div class="mapa">
				<Trazado trazado={carrera.trazado} titulo={carrera.circuito} />
			</div>
		{/if}
	</section>
{/if}

<style>
	.proxima {
		display: grid;
		grid-template-columns: 1.25fr 1fr;
		gap: 32px;
		align-items: center;
		padding: 34px 36px;
		border-radius: 20px;
		background:
			radial-gradient(600px 300px at 90% 10%, rgba(0, 224, 223, 0.16), transparent 70%),
			var(--fondo-2);
		border: 1px solid var(--borde);
	}
	h2 {
		font-size: clamp(1.8rem, 4vw, 2.6rem);
		margin: 6px 0 4px;
	}
	.circuito {
		color: var(--texto-2);
		margin: 0 0 20px;
	}
	.cuenta {
		display: flex;
		gap: 10px;
		margin-bottom: 22px;
	}
	.unidad {
		display: grid;
		justify-items: center;
		min-width: 74px;
		padding: 10px 6px;
		border-radius: 12px;
		background: var(--fondo);
		border: 1px solid var(--borde-turq);
	}
	.num {
		font-family: var(--f-titulo);
		font-weight: 900;
		font-size: clamp(1.7rem, 4vw, 2.3rem);
		line-height: 1.1;
		font-variant-numeric: tabular-nums;
		color: var(--turq);
	}
	.txt {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--texto-3);
	}
	.vivo {
		margin: 0;
		font-family: var(--f-titulo);
		font-weight: 800;
		font-size: 1.4rem;
		color: var(--coral);
	}
	.sesiones {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 4px;
	}
	.sesiones li {
		display: grid;
		grid-template-columns: 1fr auto 3.5rem;
		gap: 12px;
		padding: 7px 12px;
		border-radius: 8px;
		color: var(--texto-2);
		font-variant-numeric: tabular-nums;
	}
	.sesiones .dia {
		color: var(--texto-3);
	}
	.sesiones .hora {
		text-align: right;
		font-weight: 600;
		color: var(--texto);
	}
	.sesiones .carrera {
		background: rgba(255, 96, 85, 0.1);
	}
	.sesiones .carrera .nombre {
		color: var(--coral);
		font-weight: 700;
	}
	.sesiones .siguiente {
		outline: 1px solid var(--borde-turq);
	}
	.sesiones .pasada {
		opacity: 0.45;
		text-decoration: line-through;
	}
	.zona {
		font-size: 0.85rem;
		color: var(--texto-3);
		margin: 12px 0 20px;
	}
	.zona button {
		background: none;
		border: 0;
		padding: 0;
		margin-left: 4px;
		color: var(--turq);
		font: inherit;
		text-decoration: underline;
		cursor: pointer;
	}
	.mapa {
		aspect-ratio: 1;
		max-height: 380px;
		width: 100%;
		padding: 10px;
	}
	@media (max-width: 860px) {
		.proxima {
			grid-template-columns: 1fr;
			padding: 26px 20px;
		}
		.mapa {
			order: -1;
			max-height: 220px;
			aspect-ratio: auto;
			height: 220px;
		}
		.unidad {
			min-width: 0;
			flex: 1;
		}
	}
</style>
