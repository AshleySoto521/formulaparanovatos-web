<script lang="ts">
	import { boletin } from '#lib/config.ts';

	let { compacto = false }: { compacto?: boolean } = $props();

	const listo = Boolean(boletin.cuenta && boletin.formulario);
	const accion = `https://assets.mailerlite.com/jsonp/${boletin.cuenta}/forms/${boletin.formulario}/subscribe`;
	const uid = $props.id();
	const id = `boletin-${uid}`;
	const dev = import.meta.env.DEV;

	let correo = $state('');
	let estado = $state<'inicio' | 'enviando' | 'ok' | 'error'>('inicio');

	async function enviar(e: SubmitEvent) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const datos = new FormData(form);
		if (datos.get('sitio_web')) return; // trampa para bots
		datos.delete('sitio_web');
		if (!listo) {
			estado = 'error';
			return;
		}
		estado = 'enviando';
		try {
			const r = await fetch(accion, { method: 'POST', body: datos });
			const j = (await r.json().catch(() => ({}))) as { success?: boolean };
			estado = r.ok && j.success !== false ? 'ok' : 'error';
		} catch {
			estado = 'error';
		}
	}
</script>

{#if listo || dev}
	<section class="boletin" class:compacto aria-labelledby="{id}-t">
		{#if !compacto}<span class="etiqueta">Boletín</span>{/if}
		<h2 id="{id}-t">{compacto ? 'Recibe las noticias' : 'La F1, directo a tu correo'}</h2>
		{#if estado === 'ok'}
			<p class="aviso ok" role="status">
				¡Casi listo! Revisa tu correo y confirma tu suscripción (si no lo ves, busca en spam o
				promociones).
			</p>
		{:else}
			<p class="bajada">
				{compacto
					? 'Las notas nuevas en tu correo. Sin spam.'
					: 'Resúmenes de cada Gran Premio y las notas nuevas, explicadas sin rollos. Sin spam; te das de baja cuando quieras.'}
			</p>
			<form method="post" action={accion} onsubmit={enviar}>
				<label class="oculto" for="{id}-correo">Tu correo</label>
				<input
					id="{id}-correo"
					type="email"
					name="fields[email]"
					bind:value={correo}
					placeholder="tu@correo.com"
					autocomplete="email"
					required
				/>
				<input type="hidden" name="ml-submit" value="1" />
				<input type="hidden" name="anticsrf" value="true" />
				<input class="trampa" type="text" name="sitio_web" tabindex="-1" autocomplete="off" aria-hidden="true" />
				<button class="boton" type="submit" disabled={estado === 'enviando'}>
					{estado === 'enviando' ? 'Enviando…' : 'Suscribirme'}
				</button>
			</form>
			{#if estado === 'error'}
				<p class="aviso error" role="alert">
					{listo
						? 'No se pudo completar. Inténtalo de nuevo en un momento.'
						: 'Vista previa: falta conectar MailerLite en src/lib/config.ts.'}
				</p>
			{/if}
			<p class="legal">
				Al suscribirte aceptas el <a href="/privacidad">Aviso de Privacidad</a>.
			</p>
		{/if}
	</section>
{/if}

<style>
	.boletin {
		padding: 30px 32px;
		border-radius: 18px;
		background: linear-gradient(135deg, rgba(0, 224, 223, 0.14), rgba(255, 96, 85, 0.1));
		border: 1px solid var(--borde-turq);
	}
	h2 {
		font-size: clamp(1.5rem, 3.5vw, 2rem);
		margin: 6px 0 8px;
	}
	.bajada {
		color: var(--texto-2);
		margin: 0 0 16px;
	}
	form {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}
	input[type='email'] {
		flex: 1 1 220px;
		min-width: 0;
		padding: 11px 18px;
		border-radius: 999px;
		border: 1px solid var(--borde);
		background: var(--fondo);
		color: var(--texto);
		font: inherit;
	}
	input[type='email']:focus {
		outline: 2px solid var(--turq);
		outline-offset: 1px;
	}
	button:disabled {
		opacity: 0.7;
		cursor: wait;
	}
	.trampa {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		opacity: 0;
	}
	.oculto {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
	}
	.aviso {
		margin: 12px 0 0;
		font-weight: 600;
	}
	.ok {
		color: var(--turq);
		margin: 0;
	}
	.error {
		color: var(--coral);
	}
	.legal {
		margin: 12px 0 0;
		font-size: 0.82rem;
		color: var(--texto-3);
	}
	.legal a {
		color: var(--texto-2);
	}

	.compacto {
		padding: 0;
		background: none;
		border: 0;
		border-radius: 0;
	}
	.compacto h2 {
		font-size: 0.85rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--texto-3);
		margin: 0 0 8px;
	}
	.compacto .bajada {
		font-size: 0.92rem;
		margin-bottom: 10px;
	}
	.compacto input[type='email'] {
		flex-basis: 100%;
	}
	.compacto .boton {
		padding: 8px 18px;
		font-size: 0.92rem;
	}
	@media (max-width: 560px) {
		.boletin:not(.compacto) {
			padding: 24px 20px;
		}
	}
</style>
