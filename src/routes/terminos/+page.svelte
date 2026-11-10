<script lang="ts">
	import Seo from '#lib/components/Seo.svelte';
	import Legal from '#lib/components/Legal.svelte';
	import { sitio } from '#lib/config.ts';
</script>

<Seo
	titulo="Términos de uso"
	descripcion="Condiciones de uso del sitio de Fórmula para Novatos: contenido, imágenes de terceros, enlaces y responsabilidad."
/>

<Legal titulo="Términos de uso" actualizado="10 de noviembre de 2026">
	<p>
		Al usar <strong>formulaparanovatos.com</strong> aceptas estas condiciones. Si no estás de acuerdo,
		por favor no uses el sitio.
	</p>

	<h2>1. Quiénes somos</h2>
	<p>
		{sitio.nombre} es un proyecto independiente de aficionados, hecho en México. <strong>No tenemos
		relación oficial</strong> con la Fórmula 1, la FIA, Formula One Management ni con ningún equipo o
		piloto. «Fórmula 1», «F1» y los nombres y logotipos de equipos son marcas de sus respectivos
		dueños y se mencionan solo con fines informativos.
	</p>

	<h2>2. Nuestro contenido</h2>
	<p>
		Los textos, el logotipo, los diseños y los episodios del podcast son de {sitio.nombre}. Puedes
		compartir los enlaces y citar fragmentos breves mencionando la fuente con un enlace a la nota.
		No está permitido copiar notas completas ni usar el contenido con fines comerciales sin
		autorización por escrito.
	</p>

	<h2>3. Imágenes de terceros</h2>
	<p>
		Algunas fotos pertenecen a otros autores (por ejemplo, Pirelli o fotógrafos de Wikimedia
		Commons) y se usan con su licencia o permiso editorial; el crédito aparece junto a cada imagen.
		Esas fotos <strong>no se pueden reutilizar</strong> desde este sitio: consulta la licencia en su
		fuente original.
	</p>

	<h2>4. Exactitud de la información</h2>
	<p>
		Basamos nuestras notas en fuentes oficiales (documentos de la FIA, formula1.com y comunicados
		de los equipos) y las citamos al final de cada nota. Aun así pueden existir errores o datos que
		cambien después de publicados. Si encuentras uno, avísanos a
		<a href="mailto:{sitio.correo}">{sitio.correo}</a> y lo corregimos.
	</p>

	<h2>5. Enlaces externos</h2>
	<p>
		El sitio enlaza a páginas y redes de terceros (YouTube, TikTok, Instagram, Facebook, FIA, etc.).
		No controlamos su contenido ni sus políticas de privacidad.
	</p>

	<h2>6. Boletín</h2>
	<p>
		La suscripción es gratuita y voluntaria, y puedes darte de baja en cualquier momento. El trato de
		tu correo se explica en el <a href="/privacidad">Aviso de Privacidad</a>.
	</p>

	<h2>7. Responsabilidad</h2>
	<p>
		El sitio se ofrece «tal cual», con fines informativos y de entretenimiento. No nos hacemos
		responsables por decisiones tomadas con base en su contenido ni por interrupciones del servicio.
	</p>

	<h2>8. Cambios y ley aplicable</h2>
	<p>
		Podemos actualizar estos términos; la versión vigente es la publicada en esta página. Se rigen por
		las leyes de los Estados Unidos Mexicanos.
	</p>
</Legal>
