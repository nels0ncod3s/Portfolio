<script>
	import '../app.css';
	import Cursor from '$lib/components/Cursor.svelte';
	import Grain from '$lib/components/Grain.svelte';
	import Intro from '$lib/components/Intro.svelte';

	let { children } = $props();
</script>

<Intro />
<Grain />
<Cursor />

{@render children()}
