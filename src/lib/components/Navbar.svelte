<script>
	import { onMount } from 'svelte';

	let theme = 'dark';
	let menuOpen = false;

	function applyTheme(value) {
		theme = value;
		document.body.dataset.theme = value;
		localStorage.setItem('theme', value);
	}

	function toggleTheme() {
		applyTheme(theme === 'dark' ? 'light' : 'dark');
	}

	function toggleMenu() {
		menuOpen = !menuOpen;
	}

	function closeMenu() {
		menuOpen = false;
	}

	onMount(() => {
		const saved = localStorage.getItem('theme');

		if (saved) {
			applyTheme(saved);
		} else {
			const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

			applyTheme(prefersLight ? 'light' : 'dark');
		}
	});
</script>

<nav class="site-nav">
	<div class="wrap nav-bar">
		<a href="#top" class="logo" aria-label="Nelson Wey Home">
			<b>nelson</b>.wey
		</a>

		<div class="nav-right">
			<button class="theme-toggle" type="button" aria-label="Toggle theme" on:click={toggleTheme}>
				<!-- Sun -->
				<svg
					class="icon-sun"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				>
					<circle cx="12" cy="12" r="4.5" />
					<path
						d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
					/>
				</svg>

				<!-- Moon -->
				<svg
					class="icon-moon"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				>
					<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5z" />
				</svg>
			</button>

			<button
				class="menu-toggle"
				type="button"
				aria-expanded={menuOpen}
				aria-controls="navMenu"
				aria-label="Toggle Menu"
				on:click={toggleMenu}
			>
				<!-- Burger -->
				<svg
					class="icon-burger"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M4 7h16M4 12h16M4 17h16" />
				</svg>

				<!-- Close -->
				<svg
					class="icon-close"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M5 5l14 14M19 5L5 19" />
				</svg>
			</button>
		</div>
	</div>

	<div id="navMenu" class:open={menuOpen} class="nav-menu">
		<a href="#stack" on:click={closeMenu}> Stack </a>

		<a href="#projects" on:click={closeMenu}> Projects </a>

		<a href="#about" on:click={closeMenu}> About </a>

		<a href="/resume.pdf" target="_blank" class="nav-resume" on:click={closeMenu}> Résumé </a>
	</div>
</nav>
