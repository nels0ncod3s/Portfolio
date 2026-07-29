export const site = {
	name: 'Nelson Wey',
	role: 'Software Engineer',
	location: 'Lagos, Nigeria',
	timezone: 'Africa/Lagos',
	email: 'oluwademiladewey@gmail.com',
	description:
		'Nelson Wey — software engineer in Lagos, Nigeria, building fintech and developer tools for African markets.',

	// Drop a resume.pdf into /static and set this to '/resume.pdf' to show the
	// Résumé link in the nav. Left null so we never ship a dead 404 link.
	resume: null
};

export const socials = [
	{ label: 'GitHub', href: 'https://github.com/nels0ncod3s', handle: '@nels0ncod3s' },
	{ label: 'Twitter / X', href: 'https://twitter.com/trxpznxl', handle: '@trxpznxl' },
	{ label: 'Email', href: `mailto:${site.email}`, handle: site.email }
];

export const navLinks = [
	{ label: 'Work', href: '#work', index: '01' },
	{ label: 'Stack', href: '#stack', index: '02' },
	{ label: 'About', href: '#about', index: '03' },
	{ label: 'Contact', href: '#contact', index: '04' }
];
