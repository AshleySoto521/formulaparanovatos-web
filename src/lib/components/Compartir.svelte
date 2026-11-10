<script lang="ts">
	type Props = { url: string; titulo: string };
	let { url, titulo }: Props = $props();

	let copiado = $state(false);
	const u = $derived(encodeURIComponent(url));
	const t = $derived(encodeURIComponent(titulo));

	const destinos = $derived([
		{ nombre: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
		{ nombre: 'X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
		{ nombre: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` }
	]);

	async function copiar() {
		try {
			await navigator.clipboard.writeText(url);
			copiado = true;
			setTimeout(() => (copiado = false), 2000);
		} catch {
			/* sin permiso de portapapeles */
		}
	}
</script>

<div class="compartir">
	<span class="texto">Compartir</span>
	{#each destinos as d (d.nombre)}
		<a href={d.href} target="_blank" rel="noopener nofollow">{d.nombre}</a>
	{/each}
	<button type="button" onclick={copiar} aria-live="polite">{copiado ? '¡Copiado!' : 'Copiar enlace'}</button>
</div>

<style>
	.compartir {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px;
	}
	.texto {
		font-family: var(--f-titulo);
		font-weight: 700;
		color: var(--texto-3);
		text-transform: uppercase;
		font-size: 0.8rem;
		letter-spacing: 0.08em;
		margin-right: 4px;
	}
	a,
	button {
		font: inherit;
		font-size: 0.9rem;
		font-weight: 600;
		color: var(--texto);
		background: var(--fondo-3);
		border: 1px solid var(--borde);
		border-radius: 999px;
		padding: 6px 14px;
		text-decoration: none;
		cursor: pointer;
	}
	a:hover,
	button:hover {
		border-color: var(--turq);
		color: var(--turq);
	}
</style>
