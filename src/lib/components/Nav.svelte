<script>
	import { onMount } from 'svelte';
	import { site, navLinks } from '$lib/data/site.js';

	let theme = $state('dark');
	let menuOpen = $state(false);
	let scrolled = $state(false);
	let progress = $state(0);

	const nextTheme = $derived(theme === 'dark' ? 'light' : 'dark');

	function applyTheme(value) {
		theme = value;
		document.documentElement.dataset.theme = value;
		try {
			localStorage.setItem('theme', value);
		} catch {
			// Private mode / storage disabled — the theme still applies for this session.
		}
	}

	function closeMenu() {
		menuOpen = false;
	}

	function onKeydown(event) {
		if (event.key === 'Escape') closeMenu();
	}

	onMount(() => {
		// app.html already resolved the theme before first paint; mirror it into state.
		theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';

		let ticking = false;

		function readScroll() {
			const max = document.documentElement.scrollHeight - window.innerHeight;
			progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
			scrolled = window.scrollY > 24;
			ticking = false;
		}

		function onScroll() {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(readScroll);
		}

		// Desktop layout has no drawer — make sure it can't stay "open" across a resize.
		const wide = window.matchMedia('(min-width: 721px)');
		const onWide = (event) => event.matches && closeMenu();

		readScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		wide.addEventListener('change', onWide);

		return () => {
			window.removeEventListener('scroll', onScroll);
			wide.removeEventListener('change', onWide);
		};
	});

	$effect(() => {
		// Lock the page behind the open drawer.
		document.body.style.overflow = menuOpen ? 'hidden' : '';
	});
</script>

<svelte:window onkeydown={onKeydown} />

<nav class="site-nav" class:scrolled>
	<div class="wrap nav-bar">
		<a href="#top" class="logo" aria-label="{site.name} — back to top" onclick={closeMenu}>
			<span class="logo-mark" aria-hidden="true">
				<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="3">
					<path d="M10 23V9l12 14V9" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</span>
			<span class="logo-text">{site.name}</span>
		</a>

		<div class="nav-right">
			<ul class="nav-links">
				{#each navLinks as link}
					<li>
						<a href={link.href} onclick={closeMenu}>
							<span class="link-index">{link.index}</span>
							<span class="link-swap">
								<span>{link.label}</span>
								<span aria-hidden="true">{link.label}</span>
							</span>
						</a>
					</li>
				{/each}
				{#if site.resume}
					<li>
						<a href={site.resume} target="_blank" rel="noopener" class="nav-resume">Résumé</a>
					</li>
				{/if}
			</ul>

			<button
				class="icon-btn theme-toggle"
				type="button"
				aria-label="Switch to {nextTheme} theme"
				onclick={() => applyTheme(nextTheme)}
			>
				<svg
					class="icon-sun"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					aria-hidden="true"
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
					aria-hidden="true"
				>
					<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5z" />
				</svg>
			</button>

			<button
				class="icon-btn menu-toggle"
				type="button"
				aria-expanded={menuOpen}
				aria-controls="navMenu"
				aria-label={menuOpen ? 'Close menu' : 'Open menu'}
				onclick={() => (menuOpen = !menuOpen)}
			>
				<span class="bar"></span>
				<span class="bar"></span>
			</button>
		</div>
	</div>

	<span class="nav-progress" style="--p:{progress}" aria-hidden="true"></span>
</nav>

<div id="navMenu" class="nav-menu" class:open={menuOpen} inert={!menuOpen}>
	<ul>
		{#each navLinks as link, i}
			<li style="--i:{i}">
				<a href={link.href} onclick={closeMenu}>
					<span class="link-index">{link.index}</span>
					{link.label}
				</a>
			</li>
		{/each}
		{#if site.resume}
			<li style="--i:{navLinks.length}">
				<a href={site.resume} target="_blank" rel="noopener" onclick={closeMenu}>
					<span class="link-index">05</span>
					Résumé
				</a>
			</li>
		{/if}
	</ul>

	<p class="nav-menu-foot mono">{site.location}</p>
</div>

<style>
	.site-nav {
		position: sticky;
		top: 0;
		z-index: 100;
		backdrop-filter: blur(16px) saturate(140%);
		background: color-mix(in srgb, var(--bg) 68%, transparent);
		border-bottom: 1px solid transparent;
		transition:
			border-color 0.4s ease,
			background 0.4s ease;
	}

	.site-nav.scrolled {
		border-bottom-color: var(--border);
		background: color-mix(in srgb, var(--bg) 88%, transparent);
	}

	.nav-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: var(--nav-h);
	}

	/* ---------- Progress ---------- */
	.nav-progress {
		position: absolute;
		left: 0;
		bottom: -1px;
		height: 1px;
		width: 100%;
		transform-origin: left;
		transform: scaleX(var(--p, 0));
		background: var(--accent-grad);
	}

	/* ---------- Logo ---------- */
	.logo {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		text-decoration: none;
		color: var(--text);
	}

	.logo-mark {
		display: grid;
		place-items: center;
		width: 26px;
		height: 26px;
		color: var(--accent);
		transition: transform 0.5s var(--ease-spring);
	}

	.logo:hover .logo-mark {
		transform: rotate(-12deg) scale(1.08);
	}

	.logo-text {
		font-family: var(--font-display);
		font-weight: 600;
		font-style: italic;
		font-size: 1.1rem;
		letter-spacing: -0.01em;
	}

	/* ---------- Desktop links ---------- */
	.nav-right {
		display: flex;
		align-items: center;
		gap: 1rem;
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 1.9rem;
		list-style: none;
		font-family: var(--font-mono);
		font-size: var(--step--1);
	}

	.nav-links a {
		display: inline-flex;
		align-items: baseline;
		gap: 0.4rem;
		text-decoration: none;
		color: var(--text-muted);
		transition: color 0.25s ease;
	}

	.nav-links a:hover {
		color: var(--text);
	}

	.link-index {
		font-size: 0.62rem;
		color: var(--accent);
		opacity: 0.75;
	}

	/* Label slides up and its clone takes its place. */
	.link-swap {
		display: block;
		position: relative;
		overflow: hidden;
		height: 1.35em;
	}

	.link-swap > span {
		display: block;
		transition: transform 0.45s var(--ease);
	}

	.nav-links a:hover .link-swap > span {
		transform: translateY(-100%);
	}

	.nav-resume {
		border: 1px solid var(--border);
		padding: 0.45rem 1rem;
		border-radius: 999px;
		color: var(--text) !important;
		transition:
			border-color 0.25s ease,
			background 0.25s ease;
	}

	.nav-resume:hover {
		border-color: var(--accent);
		background: var(--accent-soft);
	}

	/* ---------- Icon buttons ---------- */
	.icon-btn {
		appearance: none;
		display: grid;
		place-items: center;
		width: 38px;
		height: 38px;
		flex-shrink: 0;
		border: 1px solid var(--border);
		border-radius: 50%;
		background: var(--bg-elevated);
		cursor: pointer;
		position: relative;
		transition:
			border-color 0.25s ease,
			transform 0.4s var(--ease-spring);
	}

	.icon-btn:hover {
		border-color: var(--accent);
	}

	.theme-toggle:hover {
		transform: rotate(-15deg);
	}

	.theme-toggle svg {
		position: absolute;
		width: 16px;
		height: 16px;
		color: var(--text);
		transition:
			opacity 0.3s ease,
			transform 0.5s var(--ease);
	}

	.theme-toggle .icon-sun {
		opacity: 0;
		transform: rotate(-90deg) scale(0.5);
	}

	:global([data-theme='light']) .theme-toggle .icon-sun {
		opacity: 1;
		transform: none;
	}

	:global([data-theme='light']) .theme-toggle .icon-moon {
		opacity: 0;
		transform: rotate(90deg) scale(0.5);
	}

	/* ---------- Burger ---------- */
	.menu-toggle {
		display: none;
		gap: 4px;
		align-content: center;
	}

	.menu-toggle .bar {
		display: block;
		width: 15px;
		height: 1.5px;
		border-radius: 2px;
		background: var(--text);
		transition: transform 0.4s var(--ease);
	}

	.menu-toggle[aria-expanded='true'] .bar:first-child {
		transform: translateY(2.75px) rotate(45deg);
	}

	.menu-toggle[aria-expanded='true'] .bar:last-child {
		transform: translateY(-2.75px) rotate(-45deg);
	}

	/* ---------- Drawer ----------
	   Fixed + fully hidden by default, so it can never leak into the desktop
	   layout the way an unstyled block would. */
	.nav-menu {
		position: fixed;
		inset: var(--nav-h) 0 auto 0;
		z-index: 99;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 2rem;
		padding: 2.5rem var(--gutter) 2rem;
		background: var(--bg);
		border-bottom: 1px solid var(--border);
		visibility: hidden;
		opacity: 0;
		transform: translateY(-8px);
		pointer-events: none;
		transition:
			opacity 0.35s var(--ease),
			transform 0.45s var(--ease),
			visibility 0s linear 0.4s;
	}

	.nav-menu.open {
		visibility: visible;
		opacity: 1;
		transform: none;
		pointer-events: auto;
		transition-delay: 0s;
	}

	.nav-menu ul {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.nav-menu li {
		border-bottom: 1px solid var(--border);
		opacity: 0;
		transform: translateY(12px);
		transition:
			opacity 0.4s var(--ease),
			transform 0.5s var(--ease);
	}

	.nav-menu.open li {
		opacity: 1;
		transform: none;
		transition-delay: calc(0.06s * var(--i, 0) + 0.08s);
	}

	.nav-menu a {
		display: flex;
		align-items: baseline;
		gap: 0.8rem;
		padding: 1rem 0;
		font-family: var(--font-display);
		font-size: var(--step-2);
		font-weight: 600;
		text-decoration: none;
		color: var(--text);
	}

	.nav-menu-foot {
		color: var(--text-dim);
	}

	@media (max-width: 720px) {
		.nav-links {
			display: none;
		}

		.menu-toggle {
			display: grid;
		}
	}
</style>
