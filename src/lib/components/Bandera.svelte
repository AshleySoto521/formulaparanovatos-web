<script lang="ts" module>
	// Solo las banderas de los países del calendario (flag-icons, licencia MIT)
	const banderas = import.meta.glob(
		'/node_modules/flag-icons/flags/4x3/{ae,at,au,az,be,bh,br,ca,cn,es,gb,hu,it,jp,mc,mx,my,nl,qa,sa,sg,us}.svg',
		{ query: '?url', import: 'default', eager: true }
	) as Record<string, string>;
</script>

<script lang="ts">
	let { codigo, pais, alto = 18 }: { codigo: string | null; pais: string; alto?: number } = $props();
	const src = $derived(codigo ? banderas[`/node_modules/flag-icons/flags/4x3/${codigo}.svg`] : undefined);
</script>

{#if src}
	<img class="bandera" {src} alt="Bandera de {pais}" width={Math.round((alto * 4) / 3)} height={alto} loading="lazy" />
{/if}

<style>
	.bandera {
		display: inline-block;
		vertical-align: -0.08em;
		border-radius: 3px;
		box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12);
	}
</style>
