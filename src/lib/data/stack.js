/** Flat list used by the marquee ticker. */
export const marquee = [
	'Svelte',
	'JavaScript',
	'Go',
	'Python',
	'React Native',
	'Node.js',
	'Tailwind CSS',
	'SQLite',
	'Figma',
	'Git'
];

/** Grouped view — the same tools, organised for scanning. */
export const groups = [
	{
		index: '01',
		label: 'Languages',
		items: [{ name: 'JavaScript' }, { name: 'Go', note: 'learning' }, { name: 'Python' }]
	},
	{
		index: '02',
		label: 'Frameworks',
		items: [
			{ name: 'Svelte' },
			{ name: 'React Native' },
			{ name: 'Node.js' },
			{ name: 'Tailwind CSS' }
		]
	},
	{
		index: '03',
		label: 'Tooling',
		items: [{ name: 'Git' }, { name: 'SQLite' }, { name: 'Figma' }]
	}
];
