<script lang="ts">
	import { page } from '$app/state';
	import { menu, sitio } from '#lib/config.ts';

	let abierto = $state(false);

	const activo = (href: string) => page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);

	$effect(() => {
		// Cierra el menú móvil al navegar.
		void page.url.pathname;
		abierto = false;
	});
</script>

<a class="saltar" href="#contenido">Saltar al contenido</a>

<header class="encabezado">
	<div class="contenedor fila">
		<a class="marca" href="/" aria-label="{sitio.nombre}, inicio">
			<img src="/logo.webp" alt="" width="44" height="44" />
			<span>Fórmula <b>para Novatos</b></span>
		</a>

		<button
			class="hamburguesa"
			aria-expanded={abierto}
			aria-controls="menu-principal"
			onclick={() => (abierto = !abierto)}
		>
			<span class="visualmente-oculto">{abierto ? 'Cerrar menú' : 'Abrir menú'}</span>
			<span class="barras" aria-hidden="true"></span>
		</button>

		<nav id="menu-principal" class:abierto aria-label="Principal">
			<ul>
				{#each menu as item (item.href)}
					<li>
						<a href={item.href} aria-current={activo(item.href) ? 'page' : undefined}>{item.texto}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.saltar {
		position: absolute;
		left: -999px;
		top: 8px;
		z-index: 50;
		background: var(--texto);
		color: #111;
		padding: 8px 14px;
		border-radius: 8px;
	}
	.saltar:focus {
		left: 12px;
	}
	.encabezado {
		position: sticky;
		top: 0;
		z-index: 20;
		background: rgba(21, 23, 24, 0.86);
		backdrop-filter: saturate(140%) blur(10px);
		border-bottom: 1px solid var(--borde);
	}
	.fila {
		display: flex;
		align-items: center;
		justify-content: space-between;
		min-height: 68px;
		gap: 16px;
	}
	.marca {
		display: flex;
		align-items: center;
		gap: 10px;
		color: var(--texto);
		text-decoration: none;
		font-family: var(--f-titulo);
		font-weight: 700;
		font-size: 1.2rem;
		letter-spacing: -0.01em;
	}
	.marca b {
		color: var(--turq);
		font-weight: 700;
	}
	nav ul {
		display: flex;
		gap: 4px;
		list-style: none;
		margin: 0;
		padding: 0;
	}
	nav a {
		display: block;
		padding: 8px 14px;
		border-radius: 999px;
		color: var(--texto-2);
		text-decoration: none;
		font-family: var(--f-titulo);
		font-weight: 600;
		font-size: 1.02rem;
	}
	nav a:hover {
		color: var(--texto);
		background: var(--fondo-3);
	}
	nav a[aria-current='page'] {
		color: #111;
		background: var(--turq);
	}
	.hamburguesa {
		display: none;
		width: 44px;
		height: 44px;
		border: 1px solid var(--borde);
		border-radius: 10px;
		background: transparent;
		cursor: pointer;
		position: relative;
	}
	.barras,
	.barras::before,
	.barras::after {
		position: absolute;
		left: 11px;
		width: 20px;
		height: 2px;
		background: var(--texto);
		border-radius: 2px;
		transition: transform 0.2s;
	}
	.barras {
		top: 21px;
	}
	.barras::before,
	.barras::after {
		content: '';
		left: 0;
	}
	.barras::before {
		top: -6px;
	}
	.barras::after {
		top: 6px;
	}
	.hamburguesa[aria-expanded='true'] .barras {
		background: transparent;
	}
	.hamburguesa[aria-expanded='true'] .barras::before {
		transform: translateY(6px) rotate(45deg);
	}
	.hamburguesa[aria-expanded='true'] .barras::after {
		transform: translateY(-6px) rotate(-45deg);
	}

	@media (max-width: 760px) {
		.hamburguesa {
			display: block;
		}
		nav {
			display: none;
			position: absolute;
			left: 0;
			right: 0;
			top: 100%;
			background: var(--fondo);
			border-bottom: 1px solid var(--borde);
			padding: 8px 20px 18px;
		}
		nav.abierto {
			display: block;
		}
		nav ul {
			flex-direction: column;
		}
		nav a {
			padding: 12px 14px;
			font-size: 1.15rem;
		}
	}
</style>
