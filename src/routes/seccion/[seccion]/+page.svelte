<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import ListaNoticias from '#lib/components/ListaNoticias.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Seo titulo={data.seccion.nombre} descripcion={data.seccion.descripcion} />

<ListaNoticias
	titulo={data.seccion.nombre}
	descripcion={data.seccion.descripcion}
	posts={data.posts}
	activa={data.seccion.slug}
	color={data.seccion.color}
/>
