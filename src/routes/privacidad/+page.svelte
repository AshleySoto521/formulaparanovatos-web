<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Legal from '#lib/components/Legal.svelte';
	import { sitio, responsable } from '#lib/config.ts';
</script>

<Seo
	titulo="Aviso de Privacidad"
	descripcion="Cómo trata Fórmula para Novatos tus datos personales: qué recabamos, para qué y cómo ejercer tus derechos ARCO."
/>

<Legal titulo="Aviso de Privacidad" actualizado="10 de noviembre de 2026">
	<h2>1. Responsable</h2>
	<p>
		<strong>{responsable.nombre}</strong>, con domicilio en {responsable.domicilio}, es responsable
		del tratamiento de tus datos personales conforme a la Ley Federal de Protección de Datos
		Personales en Posesión de los Particulares. Para cualquier asunto relacionado con este aviso
		escríbenos a <a href="mailto:{sitio.correo}">{sitio.correo}</a>.
	</p>

	<h2>2. Datos que recabamos</h2>
	<p>
		Solo pedimos tu <strong>correo electrónico</strong> cuando te suscribes al boletín, y los datos
		que tú decidas incluir si nos escribes por correo (por ejemplo, tu nombre). No recabamos datos
		sensibles ni financieros.
	</p>

	<h2>3. Para qué los usamos</h2>
	<ul>
		<li>Enviarte el boletín: notas nuevas, resúmenes de carreras y avisos del podcast.</li>
		<li>Responder los mensajes que nos envíes.</li>
	</ul>
	<p>
		No vendemos, rentamos ni compartimos tus datos con terceros para fines publicitarios.
	</p>

	<h2>4. Quién nos ayuda a tratarlos</h2>
	<p>
		El boletín se administra con <strong>MailerLite</strong>, que guarda la lista de suscriptores y
		envía los correos por nuestra cuenta, con sus propias medidas de seguridad. El sitio se aloja en
		<strong>Cloudflare</strong>. Ambos servicios pueden procesar datos fuera de México.
	</p>

	<h2>5. Cookies</h2>
	<p>
		Este sitio no usa cookies de publicidad ni de rastreo. Nuestro proveedor de alojamiento puede
		usar cookies técnicas indispensables para proteger el sitio contra tráfico automatizado. Los
		videos de YouTube se cargan desde <em>youtube-nocookie.com</em> y solo cuando tú les das clic.
	</p>

	<h2>6. Tus derechos (ARCO) y cómo darte de baja</h2>
	<p>
		Puedes <strong>acceder, rectificar, cancelar u oponerte</strong> al uso de tus datos, o revocar tu
		consentimiento, escribiendo a <a href="mailto:{sitio.correo}">{sitio.correo}</a> con tu nombre, el
		correo registrado y lo que solicitas. Te responderemos en un plazo máximo de 20 días hábiles.
	</p>
	<p>
		Para dejar de recibir el boletín basta con usar el enlace <strong>«Darse de baja»</strong> que
		viene al final de cada correo; tu dirección se elimina de la lista.
	</p>

	<h2>7. Cambios a este aviso</h2>
	<p>
		Cualquier cambio se publicará en esta misma página, con su fecha de actualización.
	</p>
</Legal>
