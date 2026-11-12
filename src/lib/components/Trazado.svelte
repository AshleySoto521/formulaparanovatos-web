<script lang="ts">
	import type { Trazado } from '#lib/calendario.ts';

	let {
		trazado,
		titulo,
		grosor = 14
	}: { trazado: Trazado; titulo: string; grosor?: number } = $props();

	const m = 40;
</script>

<svg
	class="trazado"
	viewBox="{-m} {-m} {trazado.ancho + m * 2} {trazado.alto + m * 2}"
	role="img"
	aria-label="Trazado del {titulo}"
>
	<path class="sombra" d={trazado.d} stroke-width={grosor * 2.2} />
	<path class="linea" d={trazado.d} stroke-width={grosor} />
	<circle class="salida" cx={trazado.salida[0]} cy={trazado.salida[1]} r={grosor * 1.4} />
</svg>

<style>
	.trazado {
		display: block;
		width: 100%;
		height: 100%;
		overflow: visible;
	}
	path {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
	}
	.sombra {
		stroke: rgba(0, 224, 223, 0.14);
	}
	.linea {
		stroke: var(--turq);
	}
	.salida {
		fill: var(--coral);
		stroke: var(--fondo);
		stroke-width: 6;
	}
</style>
