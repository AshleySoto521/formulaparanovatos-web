export const sitio = {
	nombre: 'Fórmula para Novatos',
	url: 'https://formulaparanovatos.com',
	lema: 'Para los nuevos. Para los de siempre.',
	descripcion:
		'Podcast y noticias de Fórmula 1 en español, hechos en México. Las carreras más épicas, la historia detrás de cada piloto y lo que pasa hoy en la F1, explicado claro y sin rollos.',
	idioma: 'es-MX',
	locale: 'es_MX',
	correo: 'contacto@formulaparanovatos.com',
	imagenOg: '/og-image.jpg',
	autor: 'Fórmula para Novatos'
} as const;

/**
 * Boletín (MailerLite). Ambos datos salen del formulario incrustado de MailerLite:
 * Forms → Embedded forms → el formulario → HTML code, en la URL
 * https://assets.mailerlite.com/jsonp/<cuenta>/forms/<formulario>/subscribe
 * Mientras estén vacíos, la caja de suscripción no se muestra en el sitio publicado.
 */
export const boletin = {
	cuenta: '2785516',
	formulario: '203782905382569004'
};

/** Responsable de los datos personales (Aviso de Privacidad). */
export const responsable = {
	nombre: 'Fórmula para Novatos',
	domicilio: 'Ciudad de México, México'
};

export type Red ={ nombre: string; url: string; usuario: string };

export const redes: Red[] = [
	{ nombre: 'YouTube', url: 'https://www.youtube.com/@FormulaparaNovatos', usuario: '@FormulaparaNovatos' },
	{ nombre: 'TikTok', url: 'https://www.tiktok.com/@formulaparanovatos', usuario: '@formulaparanovatos' },
	{ nombre: 'Instagram', url: 'https://www.instagram.com/formulaparanovatos', usuario: '@formulaparanovatos' },
	{ nombre: 'Facebook', url: 'https://www.facebook.com/formulaparanovatos/', usuario: 'Fórmula para Novatos' }
];

export const menu = [
	{ href: '/noticias', texto: 'Noticias' },
	{ href: '/episodios', texto: 'Episodios' },
	{ href: '/nosotros', texto: 'Nosotros' },
	{ href: '/contacto', texto: 'Contacto' }
];

/** Convierte una ruta relativa en URL absoluta del sitio. */
export const absoluta = (ruta: string) =>
	ruta.startsWith('http') ? ruta : `${sitio.url}${ruta.startsWith('/') ? '' : '/'}${ruta}`;
