<script>
	import { onMount } from 'svelte';

	let theme = $state('dark');
	let menuOpen = $state(false);

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
		<a href="#top" class="logo" aria-label="Nelson Wey, home">Nelson Wey</a>

		<div class="nav-right">
			<div class="nav-links">
				<a href="#work" on:click={closeMenu}>Work</a>
				<a href="#stack" on:click={closeMenu}>Stack</a>
				<a href="#about" on:click={closeMenu}>About</a>
				<a href="/resume.pdf" target="_blank" class="nav-resume" on:click={closeMenu}>Résumé</a>
			</div>

			<button class="theme-toggle" type="button" aria-label="Toggle theme" on:click={toggleTheme}>
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
				aria-label="Toggle menu"
				on:click={toggleMenu}
			>
				<svg
					class="icon-burger"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M4 7h16M4 12h16M4 17h16" />
				</svg>
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
		<a href="#work" on:click={closeMenu}>Work</a>
		<a href="#stack" on:click={closeMenu}>Stack</a>
		<a href="#about" on:click={closeMenu}>About</a>
		<a href="/resume.pdf" target="_blank" on:click={closeMenu}>Résumé</a>
	</div>
</nav>

<style>
	.site-nav {
		position: sticky;
		top: 0;
		z-index: 50;
		backdrop-filter: blur(14px);
		background: color-mix(in srgb, var(--bg) 80%, transparent);
		border-bottom: 1px solid var(--border);
	}

	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 4.4rem;
	}

	.logo {
		font-family: var(--font-display);
		font-weight: 600;
		font-style: italic;
		font-size: 1.15rem;
		text-decoration: none;
		color: var(--text);
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 1.2rem;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 2rem;
		font-family: var(--font-mono);
		font-size: 0.85rem;
	}

	.nav-links a {
		text-decoration: none;
		color: var(--text-muted);
		transition: color 0.2s ease;
	}

	.nav-links a:hover {
		color: var(--text);
	}

	.nav-resume {
		border: 1px solid var(--border);
		padding: 0.45rem 1rem;
		border-radius: var(--radius-sm);
		color: var(--text) !important;
		transition:
			border-color 0.2s ease,
			background 0.2s ease;
	}

	.nav-resume:hover {
		border-color: var(--accent);
		background: var(--accent-soft);
	}

	.theme-toggle {
		appearance: none;
		border: 1px solid var(--border);
		background: var(--bg-elevated);
		width: 36px;
		height: 36px;
		border-radius: 50%;
		display: grid;
		place-items: center;
		cursor: pointer;
		position: relative;
		transition:
			border-color 0.25s ease,
			transform 0.25s ease;
		flex-shrink: 0;
	}

	.theme-toggle:hover {
		border-color: var(--accent);
		transform: rotate(-8deg);
	}

	.theme-toggle svg {
		width: 16px;
		height: 16px;
		position: absolute;
		color: var(--text);
		transition:
			opacity 0.3s ease,
			transform 0.45s var(--ease);
	}

	.theme-toggle .icon-sun {
		opacity: 0;
		transform: rotate(-90deg) scale(0.5);
	}

	.theme-toggle .icon-moon {
		opacity: 1;
		transform: rotate(0) scale(1);
	}

	:global([data-theme='light']) .theme-toggle .icon-sun {
		opacity: 1;
		transform: rotate(0) scale(1);
	}

	:global([data-theme='light']) .theme-toggle .icon-moon {
		opacity: 0;
		transform: rotate(90deg) scale(0.5);
	}

	.menu-toggle {
		display: none;
		appearance: none;
		border: 1px solid var(--border);
		background: var(--bg-elevated);
		width: 36px;
		height: 36px;
		border-radius: 50%;
		cursor: pointer;
		position: relative;
		flex-shrink: 0;
	}

	.menu-toggle svg {
		width: 16px;
		height: 16px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: var(--text);
		transition:
			opacity 0.25s ease,
			transform 0.25s ease;
	}

	.menu-toggle .icon-close {
		opacity: 0;
		transform: translate(-50%, -50%) rotate(-45deg) scale(0.6);
	}

	.menu-toggle[aria-expanded='true'] .icon-burger {
		opacity: 0;
		transform: translate(-50%, -50%) rotate(45deg) scale(0.6);
	}

	.menu-toggle[aria-expanded='true'] .icon-close {
		opacity: 1;
		transform: translate(-50%, -50%) rotate(0) scale(1);
	}

	@media (max-width: 720px) {
		.nav-links {
			display: none;
		}

		.menu-toggle {
			display: block;
		}

		.nav-menu {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			display: flex;
			flex-direction: column;
			background: var(--bg-elevated);
			border-bottom: 1px solid var(--border);
			max-height: 0;
			overflow: hidden;
			opacity: 0;
			transition:
				max-height 0.35s var(--ease),
				opacity 0.25s ease;
		}

		.nav-menu.open {
			max-height: 280px;
			opacity: 1;
		}

		.nav-menu a {
			font-family: var(--font-mono);
			font-size: 0.9rem;
			text-decoration: none;
			color: var(--text-muted);
			padding: 0.9rem 1.5rem;
			border-bottom: 1px solid var(--border);
		}

		.nav-menu a:last-child {
			border-bottom: none;
		}
	}
</style>
