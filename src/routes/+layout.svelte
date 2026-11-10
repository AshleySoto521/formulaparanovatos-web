<script lang="ts">
	import '@fontsource-variable/inter';
	import '@fontsource/titillium-web/400.css';
	import '@fontsource/titillium-web/600.css';
	import '@fontsource/titillium-web/700.css';
	import '@fontsource/titillium-web/900.css';
	import '../app.css';
	import Encabezado from '#lib/components/Encabezado.svelte';
	import Pie from '#lib/components/Pie.svelte';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();
</script>

<Encabezado />
<main id="contenido">
	{@render children()}
</main>
<Pie />
