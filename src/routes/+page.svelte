<script>
	import Nav from '$lib/components/Nav.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Work from '$lib/components/Work.svelte';
	import Stack from '$lib/components/Stack.svelte';
	import About from '$lib/components/About.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { site } from '$lib/data/site.js';

	const title = `${site.name} — ${site.role}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={site.description} />
	<meta name="author" content={site.name} />
	<meta name="theme-color" content="#0b0b0c" media="(prefers-color-scheme: dark)" />
	<meta name="theme-color" content="#faf8f4" media="(prefers-color-scheme: light)" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={site.description} />
	<meta property="og:locale" content="en_NG" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={site.description} />
</svelte:head>

<a class="skip-link" href="#work">Skip to content</a>

<Nav />

<main>
	<Hero />
	<Work />
	<Stack />
	<About />
</main>

<Footer />
