<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import ListaNoticias from '#lib/components/ListaNoticias.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo
	titulo="Noticias de Fórmula 1"
	descripcion="Noticias, análisis, historia y guías de Fórmula 1 en español, explicadas claro y sin rollos desde México."
/>

<ListaNoticias
	titulo="Noticias"
	descripcion="Análisis, historia y guías de Fórmula 1, con contexto y sin vivir del rumor."
	posts={data.posts}
/>
