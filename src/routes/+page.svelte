<script>
	import { onMount, onDestroy } from 'svelte';

	let navOpen = false;
	let theme = 'dark';
	let roleText = '';
	let lagosTime = 'Lagos, Nigeria';
	let heroTerminal;

	const roles = [
		'Software Engineer.',
		'Building Polyclone.',
		'Learning Go.',
		'Shipping for Nigeria.'
	];

	function applyTheme(next) {
		theme = next;
		if (typeof document !== 'undefined') {
			document.body.setAttribute('data-theme', next);
			localStorage.setItem('theme', next);
		}
	}

	function toggleTheme() {
		applyTheme(theme === 'dark' ? 'light' : 'dark');
	}

	function toggleNav() {
		navOpen = !navOpen;
	}

	function closeNav() {
		navOpen = false;
	}

	let clockInterval;
	let typingTimeout;
	let cleanupTilt = () => {};

	onMount(() => {
		// ---- Theme: default to saved choice, else system preference ----
		const saved = localStorage.getItem('theme');
		if (saved) {
			applyTheme(saved);
		} else {
			const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
			applyTheme(prefersLight ? 'light' : 'dark');
		}

		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// ---- Rotating role line, typed out in the hero ----
		if (reduceMotion) {
			roleText = roles[0];
		} else {
			let roleIndex = 0;
			let charIndex = 0;
			let deleting = false;

			const tick = () => {
				const current = roles[roleIndex];

				if (!deleting) {
					charIndex++;
					roleText = current.slice(0, charIndex);
					if (charIndex === current.length) {
						deleting = true;
						typingTimeout = setTimeout(tick, 1400);
						return;
					}
				} else {
					charIndex--;
					roleText = current.slice(0, charIndex);
					if (charIndex === 0) {
						deleting = false;
						roleIndex = (roleIndex + 1) % roles.length;
					}
				}
				typingTimeout = setTimeout(tick, deleting ? 35 : 55);
			};

			tick();
		}

		// ---- Reveal-on-scroll (adds .in, which also triggers the
		// terminal's line-by-line type-in and stagger animations) ----
		const revealEls = document.querySelectorAll('.reveal');

		if ('IntersectionObserver' in window && !reduceMotion) {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach((entry) => {
						if (entry.isIntersecting) {
							entry.target.classList.add('in');
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.2 }
			);
			revealEls.forEach((el) => observer.observe(el));
		} else {
			revealEls.forEach((el) => el.classList.add('in'));
		}

		// ---- Subtle 3D tilt on the hero terminal, following the pointer ----
		if (heroTerminal && window.matchMedia('(hover: hover)').matches && !reduceMotion) {
			const handleMove = (e) => {
				const rect = heroTerminal.getBoundingClientRect();
				const x = (e.clientX - rect.left) / rect.width - 0.5;
				const y = (e.clientY - rect.top) / rect.height - 0.5;
				heroTerminal.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${
					y * -6
				}deg) translateY(-2px)`;
			};

			const handleLeave = () => {
				heroTerminal.style.transform =
					'perspective(900px) rotateY(0deg) rotateX(0deg) translateY(0)';
			};

			heroTerminal.addEventListener('mousemove', handleMove);
			heroTerminal.addEventListener('mouseleave', handleLeave);

			cleanupTilt = () => {
				heroTerminal.removeEventListener('mousemove', handleMove);
				heroTerminal.removeEventListener('mouseleave', handleLeave);
			};
		}

		// ---- Live Lagos time, ticking in the footer ----
		function updateClock() {
			const now = new Date();
			const time = new Intl.DateTimeFormat('en-GB', {
				timeZone: 'Africa/Lagos',
				hour: '2-digit',
				minute: '2-digit'
			}).format(now);
			lagosTime = `Lagos, Nigeria — ${time} WAT`;
		}
		updateClock();
		clockInterval = setInterval(updateClock, 15000);
	});

	onDestroy(() => {
		if (clockInterval) clearInterval(clockInterval);
		if (typingTimeout) clearTimeout(typingTimeout);
		cleanupTilt();
	});
</script>

<svelte:head>
	<title>Nelson Wey — Software Engineer</title>
	<meta
		name="description"
		content="Nelson Wey — software engineer in Lagos, Nigeria, building fintech and developer tools for African markets."
	/>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<nav class="site-nav">
	<div class="wrap nav-bar">
		<a href="#top" class="logo" aria-label="Nelson Wey, home">
			<b>nelson</b>.wey
		</a>
		<div class="nav-right">
			<button
				class="theme-toggle"
				type="button"
				aria-label="Toggle light and dark mode"
				on:click={toggleTheme}
			>
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
					stroke-linejoin="round"
				>
					<path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.7 6.7 0 0 0 10.5 10.5z" />
				</svg>
			</button>
			<button
				class="menu-toggle"
				type="button"
				aria-label="Toggle menu"
				aria-expanded={navOpen ? 'true' : 'false'}
				aria-controls="navMenu"
				on:click={toggleNav}
			>
				<svg
					class="icon-burger"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				>
					<path d="M4 7h16M4 12h16M4 17h16" />
				</svg>
				<svg
					class="icon-close"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				>
					<path d="M5 5l14 14M19 5L5 19" />
				</svg>
			</button>
		</div>
	</div>
	<div class="nav-menu" id="navMenu" class:open={navOpen}>
		<a href="#stack" on:click={closeNav}>Stack</a>
		<a href="#projects" on:click={closeNav}>Projects</a>
		<a href="#about" on:click={closeNav}>About</a>
		<a href="resume.pdf" target="_blank" class="nav-resume" on:click={closeNav}>Résumé</a>
	</div>
</nav>

<main id="top">
	<!-- ============ HERO ============ -->
	<section class="hero">
		<div class="ambient" aria-hidden="true"></div>
		<div class="wrap">
			<div>
				<h1>
					Nelson Wey builds<br />
					<span class="accent">software that ships.</span>
				</h1>
				<p class="role-line">
					<span class="prompt">&gt;</span>
					<span>{roleText}</span><span class="cursor">&nbsp;</span>
				</p>
				<p class="bio">
					A <strong>software engineer</strong> based in Lagos, Nigeria, building fintech and developer
					tools for African markets — with a soft spot for prediction markets, banking infrastructure,
					and anything that ships fast.
				</p>
				<div class="hero-ctas">
					<a href="resume.pdf" target="_blank" class="btn btn-primary">View résumé</a>
					<a href="#contact" class="btn btn-ghost">Get in touch</a>
				</div>
			</div>

			<div class="terminal reveal" bind:this={heroTerminal} aria-hidden="true">
				<div class="terminal-bar">
					<span></span><span></span><span></span>
					<span class="title">nelson@lagos — current-builds</span>
					<span class="live-dot">live</span>
				</div>
				<div class="terminal-body">
					<p class="tline">
						<span class="prompt">$</span> <span class="path">ls</span>
						current-builds/ <span class="muted">--status</span>
					</p>
					<p class="tline build-item">
						<span class="name">polyclone/</span>
						<span class="status">building</span>
						<span class="desc">micro prediction markets</span>
					</p>
					<p class="tline build-item">
						<span class="name">wordhunt-solver/</span>
						<span class="status">building</span>
						<span class="desc">iMessage game solver, Python</span>
					</p>
					<p class="tline" style="margin-top: 0.6rem">
						<span class="prompt">$</span>
						<span class="path">go</span> version
					</p>
					<p class="tline muted">go1.22 — still learning, still shipping</p>
					<p class="tline"><span class="prompt">$</span> <span class="final-cursor"></span></p>
				</div>
			</div>
		</div>
	</section>

	<!-- ============ STACK ============ -->
	<section id="stack">
		<div class="wrap">
			<p class="eyebrow reveal">Tech Stack</p>
			<h2 class="section-title reveal">Tools I build with</h2>
			<div class="stack-grid reveal stagger">
				<div class="stack-chip">
					<svg
						aria-hidden="true"
						focusable="false"
						fill="currentColor"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="800px"
						height="800px"
						viewBox="0 0 512 512"
						enable-background="new 0 0 512 512"
						xml:space="preserve"
					>
						<g id="c133de6af664cd4f011a55de6b000d0b">
							<path
								display="inline"
								d="M108.669,0.501h23.032v22.756h21.069V0.501h23.034V69.41h-23.032V46.334h-21.069V69.41h-23.032V0.501
		H108.669z M206.091,23.353h-20.275V0.501h63.594v22.852h-20.285V69.41h-23.032V23.353H206.091z M259.502,0.501h24.02l14.771,24.213
		l14.759-24.213h24.023V69.41h-22.938V35.256l-15.845,24.5h-0.395l-15.856-24.5V69.41h-22.539V0.501z M348.54,0.501h23.038v46.133
		h32.391V69.41H348.54V0.501z M74.987,100.926l32.946,369.533l147.844,41.04L404.031,470.4l32.981-369.475H74.987z M368.289,188.62
		l-2.063,22.977l-0.906,10.188h-0.149H256h-0.158h-63.956l4.142,46.407h59.814H256h92.98h12.214l-1.106,12.172l-10.65,119.32
		l-0.682,7.652L256,433.045v0.008l-0.208,0.059l-92.839-25.774l-6.351-71.161h20.97h24.527l3.227,36.146l50.474,13.632l0.042-0.013
		v-0.004l50.551-13.64l5.257-58.781H256h-0.158H154.578L143.439,188.62l-1.085-12.157h113.488H256h113.374L368.289,188.62z"
							>
							</path>
						</g>
					</svg>
					<span class="label">HTML5</span>
				</div>
				<div class="stack-chip">
					<svg
						aria-hidden="true"
						focusable="false"
						fill="currentColor"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="800px"
						height="800px"
						viewBox="0 0 512 512"
						enable-background="new 0 0 512 512"
						xml:space="preserve"
					>
						<g id="c133de6af664cd4f011a55de6b001a2b">
							<path
								display="inline"
								d="M204.064,46.682v22.018h-56.302V0.501h56.302v24.13h-32.172v22.051H204.064z M261.941,24.631h22.492
		V0.501h-56.308c0,0,0,12.112,0,24.13c7.533,7.533,11.461,11.139,22.356,22.034c-6.369,0-22.356,0.022-22.356,0.021v22.014h56.308
		V46.682L261.941,24.631z M341.746,24.631h22.49V0.501H307.93c0,0,0,12.112,0,24.13c7.531,7.533,11.461,11.139,22.355,22.034
		c-6.365,0-22.355,0.022-22.355,0.021v22.014h56.307V46.682L341.746,24.631z M438.395,101.112l-34.203,370.486l-148.193,39.9
		l-148.196-39.9L73.605,101.112H438.395z M369.477,176.444H255.865h-115.62l5.529,44.739h110.091h6.184l-6.184,2.574
		l-106.067,44.177l3.518,43.73l102.549,0.333l54.963,0.175l-3.521,58.311l-51.442,14.484v-0.046l-0.422,0.116l-49.684-12.542
		l-3.015-36.195h-0.164h-46.085h-0.162l6.032,69.876l93.5,27.649v-0.05l0.168,0.05l93-27.146L361.1,267.935H255.865h-0.26
		l0.26-0.112l109.086-46.639L369.477,176.444z"
							>
							</path>
						</g>
					</svg>
					<span class="label">CSS3</span>
				</div>
				<div class="stack-chip">
					<svg
						aria-hidden="true"
						focusable="false"
						width="800px"
						height="800px"
						viewBox="0 0 20 20"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
					>
						<title>javascript [#155]</title>
						<desc>Created with Sketch.</desc>
						<defs> </defs>
						<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g
								id="Dribbble-Light-Preview"
								transform="translate(-420.000000, -7479.000000)"
								fill="currentColor"
							>
								<g id="icons" transform="translate(56.000000, 160.000000)">
									<path
										d="M379.328,7337.432 C377.583,7337.432 376.455,7336.6 375.905,7335.512 L375.905,7335.512 L377.435,7334.626 C377.838,7335.284 378.361,7335.767 379.288,7335.767 C380.066,7335.767 380.563,7335.378 380.563,7334.841 C380.563,7334.033 379.485,7333.717 378.724,7333.391 C377.368,7332.814 376.468,7332.089 376.468,7330.558 C376.468,7329.149 377.542,7328.075 379.221,7328.075 C380.415,7328.075 381.275,7328.491 381.892,7329.578 L380.429,7330.518 C380.107,7329.941 379.758,7329.713 379.221,7329.713 C378.67,7329.713 378.321,7330.062 378.321,7330.518 C378.321,7331.082 378.67,7331.31 379.476,7331.659 C381.165,7332.383 382.443,7332.952 382.443,7334.814 C382.443,7336.506 381.114,7337.432 379.328,7337.432 L379.328,7337.432 Z M375,7334.599 C375,7336.546 373.801,7337.575 372.136,7337.575 C370.632,7337.575 369.731,7337 369.288,7336 L369.273,7336 L369.266,7336 L369.262,7336 L370.791,7334.931 C371.086,7335.454 371.352,7335.825 371.996,7335.825 C372.614,7335.825 373,7335.512 373,7334.573 L373,7328 L375,7328 L375,7334.599 Z M364,7339 L384,7339 L384,7319 L364,7319 L364,7339 Z"
										id="javascript-[#155]"
									>
									</path>
								</g>
							</g>
						</g>
					</svg>
					<span class="label">JavaScript</span>
				</div>
				<div class="stack-chip">
					<svg
						aria-hidden="true"
						focusable="false"
						width="800px"
						height="800px"
						viewBox="0 0 48 48"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>react</title>
						<g id="Layer_2" data-name="Layer 2">
							<g id="invisible_box" data-name="invisible box">
								<rect width="48" height="48" fill="none" />
							</g>
							<g id="Q3_icons" data-name="Q3 icons">
								<g>
									<path
										d="M45.9,24c0-2.8-3-5.4-8-7.2l-.9-.3v-.4c1.1-5.5.3-9.6-2.2-11.1s-6.2-.1-10.2,3.4L24,9l-.2-.2h-.2C19.5,5,15.5,3.7,13,5.1s-3.2,5.3-2.2,10.4a4.4,4.4,0,0,1,.2,1l-1.1.4C5,18.6,2.1,21.2,2.1,24s3.2,5.6,8.2,7.4l.7.2a3.6,3.6,0,0,0-.2,1.1c-1,5-.1,8.8,2.2,10.2s6.5.1,10.5-3.4l.6-.5.8.8c2.8,2.4,5.6,3.7,7.8,3.7a4,4,0,0,0,2.2-.6c2.5-1.4,3.4-5.5,2.3-10.7V32a4.3,4.3,0,0,1-.1-.5h.3C42.7,29.6,45.9,26.9,45.9,24ZM43,24c0,1.2-2.2,3.3-6.5,4.7h-.2A36.7,36.7,0,0,0,34.4,24c.7-1.6,1.3-3.2,1.8-4.7l.8.2C41,20.9,43,22.8,43,24ZM26.8,37.6,26,37a43.1,43.1,0,0,0,3.2-4l5.1-.8c.1.2.1.4.2.5a17.5,17.5,0,0,1,.2,5.5h0a4.1,4.1,0,0,1-1.2,2.3C32.5,41.1,29.8,40.3,26.8,37.6Zm-1.3-4.4L24.1,35l-1.6-1.8Zm-13.7-14A31.9,31.9,0,0,0,13.7,24a33,33,0,0,0-1.9,4.9l-.6-.2a14.4,14.4,0,0,1-4.8-2.6A3.1,3.1,0,0,1,5,24c0-1.2,2-3.1,5.8-4.4Zm10.7-4.4L24,13.1l1.5,1.7h-3Zm11-7.3c1.1.6,1.7,3.6.8,8a.4.4,0,0,1-.1.3l-5-.8A43.1,43.1,0,0,0,26,11l.6-.5C29.8,7.7,32.4,6.9,33.5,7.5ZM16.8,18.1,16,19.4l-.7,1.3c-.3-.7-.5-1.4-.8-2.2ZM14.5,29.5c.3-.7.5-1.4.8-2.2l.7,1.3.8,1.3ZM31.2,24a33.7,33.7,0,0,1-1.7,3.2c-.6,1.1-1.3,2.1-1.9,3.1H20.4c-.7-1.1-1.4-2.1-1.9-3.1A31,31,0,0,1,16.8,24a24,24,0,0,1,1.7-3.2,30.5,30.5,0,0,1,1.9-3,43.3,43.3,0,0,1,7.2,0c.7,1,1.3,2,1.9,3A24,24,0,0,1,31.2,24Zm.8-4.6-.8-1.3,2.3.5a18,18,0,0,1-.8,2.1Zm-.8,10.5.8-1.3.7-1.4.9,2.3Zm-9.3-19H22l-3.2,4-5,.8c-.1-.3-.1-.5-.2-.8-.8-4.1-.2-6.9.8-7.4h0a1.3,1.3,0,0,1,.9-.2c1.4,0,3.8,1,6.5,3.4ZM13.6,33.2a2.9,2.9,0,0,1,.2-.9l5.1.7a33,33,0,0,0,3.2,4l-.2.2-.2.2A14.3,14.3,0,0,1,17,40.3a3.2,3.2,0,0,1-2.5.2C13.4,39.9,12.8,37.2,13.6,33.2Z"
										fill="currentColor"
									/>
									<path
										d="M24,19.6A4.4,4.4,0,1,0,28.3,24,4.4,4.4,0,0,0,24,19.6Z"
										fill="currentColor"
									/>
								</g>
							</g>
						</g>
					</svg>
					<span class="label">React Native</span>
				</div>
				<div class="stack-chip">
					<svg
						aria-hidden="true"
						focusable="false"
						fill="currentColor"
						width="800px"
						height="800px"
						viewBox="0 0 32 32"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>python</title>
						<path
							d="M19.212 26.447l-0.287 0.412-0.1 0.512 0.1 0.512 0.287 0.412 0.412 0.287 0.512 0.1 0.512-0.1 0.412-0.287 0.287-0.412 0.1-0.512-0.1-0.512-0.287-0.412-0.412-0.287-0.512-0.1-0.512 0.1zM27.297 8.64l0.35 0.075 0.4 0.15 0.437 0.225 0.45 0.337 0.45 0.437 0.437 0.587 0.4 0.737 0.35 0.912 0.262 1.1 0.175 1.3 0.062 1.537-0.075 1.537-0.2 1.3-0.3 1.075-0.4 0.887-0.45 0.712-0.5 0.562-0.525 0.412-0.525 0.3-0.5 0.2-0.45 0.112-0.4 0.062-0.3 0.025-0.2-0.012h-10.272v1.025h7.298l0.012 3.449 0.025 0.45-0.062 0.425-0.137 0.387-0.212 0.362-0.312 0.312-0.387 0.3-0.475 0.25-0.55 0.212-0.637 0.187-0.725 0.162-0.8 0.112-0.887 0.087-0.962 0.050-1.050 0.012-1.587-0.050-1.337-0.175-1.125-0.25-0.912-0.312-0.737-0.375-0.562-0.412-0.425-0.425-0.312-0.425-0.2-0.412-0.125-0.375-0.050-0.312-0.025-0.25 0.012-0.162v-6.673l0.063-0.8 0.162-0.675 0.262-0.575 0.325-0.475 0.375-0.4 0.412-0.3 0.437-0.25 0.437-0.175 0.412-0.125 0.375-0.075 0.325-0.050 0.262-0.025 0.162-0.012h7.298l0.862-0.062 0.737-0.175 0.625-0.262 0.512-0.35 0.412-0.4 0.337-0.437 0.25-0.45 0.187-0.45 0.125-0.437 0.087-0.4 0.050-0.35 0.025-0.262v-3.824h2.612l0.175 0.012zM10.939 3.704l-0.287 0.412-0.1 0.512 0.1 0.512 0.287 0.425 0.412 0.275 0.512 0.112 0.512-0.113 0.412-0.275 0.287-0.425 0.1-0.512-0.1-0.512-0.287-0.412-0.412-0.275-0.512-0.112-0.512 0.112zM18.812 1.229l1.125 0.25 0.912 0.325 0.737 0.375 0.562 0.4 0.425 0.425 0.312 0.425 0.2 0.412 0.125 0.375 0.050 0.325 0.025 0.25-0.012 0.162v6.673l-0.062 0.787-0.162 0.687-0.262 0.575-0.325 0.475-0.375 0.387-0.412 0.312-0.437 0.237-0.437 0.175-0.412 0.125-0.375 0.087-0.325 0.050-0.263 0.025h-7.46l-0.862 0.062-0.737 0.175-0.625 0.275-0.512 0.337-0.412 0.4-0.337 0.437-0.25 0.45-0.187 0.462-0.125 0.437-0.087 0.4-0.050 0.337-0.025 0.262v3.824h-2.787l-0.262-0.037-0.35-0.087-0.4-0.15-0.437-0.225-0.45-0.325-0.45-0.45-0.437-0.575-0.4-0.737-0.35-0.912-0.262-1.1-0.175-1.312-0.062-1.537 0.075-1.524 0.2-1.3 0.3-1.087 0.4-0.887 0.45-0.712 0.5-0.55 0.525-0.412 0.525-0.3 0.5-0.2 0.45-0.125 0.4-0.062 0.3-0.012h0.2l0.075 0.012h10.197v-1.037h-7.298l-0.012-3.436-0.025-0.462 0.062-0.425 0.137-0.387 0.212-0.35 0.312-0.325 0.387-0.287 0.475-0.25 0.55-0.225 0.637-0.187 0.725-0.15 0.8-0.125 0.887-0.075 0.962-0.050 1.050-0.025 1.587 0.063z"
						></path>
					</svg>
					<span class="label">Python</span>
				</div>
				<div class="stack-chip new">
					<svg
						aria-hidden="true"
						focusable="false"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M5.5 7.2C5.5 6 6.3 5 7.7 5C8.6 5 9.2 5.4 9.6 6"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M18.5 7.2C18.5 6 17.7 5 16.3 5C15.4 5 14.8 5.4 14.4 6"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<ellipse cx="12" cy="13.2" rx="7.2" ry="6" stroke="currentColor" stroke-width="1.5" />
						<circle cx="9.3" cy="12" r="1.9" stroke="currentColor" stroke-width="1.3" />
						<circle cx="14.7" cy="12" r="1.9" stroke="currentColor" stroke-width="1.3" />
						<circle cx="9.7" cy="12.3" r="0.6" fill="currentColor" />
						<circle cx="15.1" cy="12.3" r="0.6" fill="currentColor" />
						<path
							d="M9.5 16.6C10.2 17.1 11 17.4 12 17.4C13 17.4 13.8 17.1 14.5 16.6"
							stroke="currentColor"
							stroke-width="1.3"
							stroke-linecap="round"
						/>
					</svg>
					<span class="label">Go</span>
				</div>
				<div class="stack-chip">
					<svg
						aria-hidden="true"
						focusable="false"
						width="800px"
						height="800px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M0.228341 8.36915C0.228341 8.36915 -0.356212 7.94324 0.345251 7.37453L1.97956 5.89736C1.97956 5.89736 2.44721 5.40004 2.94164 5.83334L18.0231 17.375V22.9094C18.0231 22.9094 18.0158 23.7785 16.9124 23.6825L0.228341 8.36915Z"
							fill="currentColor"
						/>
						<path
							d="M4.11555 11.9367L0.228273 15.5089C0.228273 15.5089 -0.171172 15.8093 0.228273 16.346L2.03308 18.0053C2.03308 18.0053 2.46175 18.4706 3.09502 17.9413L7.21611 14.7827L4.11555 11.9367Z"
							fill="currentColor"
						/>
						<path
							d="M10.94 11.9661L18.0691 6.46362L18.0228 0.95865C18.0228 0.95865 17.7183 -0.242793 16.7027 0.382548L7.21589 9.11025L10.94 11.9661Z"
							fill="currentColor"
						/>
						<path
							d="M16.9121 23.69C17.3261 24.1183 17.8279 23.978 17.8279 23.978L23.3838 21.2108C24.0951 20.7208 23.9952 20.1127 23.9952 20.1127V3.58803C23.9952 2.86175 23.2596 2.61063 23.2596 2.61063L18.4441 0.264377C17.3919 -0.392968 16.7027 0.382548 16.7027 0.382548C16.7027 0.382548 17.5892 -0.262484 18.0228 0.95865L18.0228 22.8086C18.0228 22.9588 17.9911 23.1065 17.9278 23.2394C17.8011 23.4979 17.5259 23.7392 16.8658 23.6383L16.9121 23.69Z"
							fill="currentColor"
						/>
					</svg>
					<span class="label">VS Code</span>
				</div>
				<div class="stack-chip">
					<svg
						aria-hidden="true"
						focusable="false"
						width="800px"
						height="800px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M12 3H9C7.34315 3 6 4.34315 6 6C6 7.65685 7.34315 9 9 9M12 3V9M12 3H15C16.6569 3 18 4.34315 18 6C18 7.65685 16.6569 9 15 9M12 9H9M12 9H15M12 9V15M9 9C7.34315 9 6 10.3431 6 12C6 13.6569 7.34315 15 9 15M15 9C16.6569 9 18 10.3431 18 12C18 13.6569 16.6569 15 15 15C13.3431 15 12 13.6569 12 12C12 10.3431 13.3431 9 15 9ZM12 15H9M12 15V18C12 19.6569 10.6569 21 9 21C7.34315 21 6 19.6569 6 18C6 16.3431 7.34315 15 9 15"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<span class="label">Figma</span>
				</div>
				<div class="stack-chip">
					<svg
						aria-hidden="true"
						focusable="false"
						fill="currentColor"
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						xmlns:xlink="http://www.w3.org/1999/xlink"
						width="800px"
						height="800px"
						viewBox="0 0 512 512"
						enable-background="new 0 0 512 512"
						xml:space="preserve"
					>
						<g id="2069a460dcf28295e231f3111e037552">
							<path
								display="inline"
								d="M426.333,0.5H85.667C38.825,0.5,0.5,38.825,0.5,85.667v340.667c0,46.842,38.325,85.167,85.167,85.167
		h340.667c46.842,0,85.167-38.325,85.167-85.167V85.667C511.5,38.825,473.175,0.5,426.333,0.5z M245.329,260.524
		c-17.736,17.736-45.611,26.065-77.103,26.065c-8.326,0-15.927-0.365-21.72-1.451v91.945h-44.159V136.363
		c15.927-2.895,38.009-5.069,68.05-5.069c32.582,0,56.473,6.878,72.039,19.911c14.48,11.947,23.89,31.131,23.89,53.936
		C266.325,228.309,259.086,247.492,245.329,260.524z M337.981,380.706c-21.358,0-40.542-5.069-53.574-12.31l8.687-32.216
		c10.135,6.154,29.322,12.671,45.249,12.671c19.545,0,28.236-7.964,28.236-19.549c0-11.943-7.239-18.099-28.96-25.7
		c-34.391-11.947-48.866-30.769-48.505-51.403c0-31.131,25.7-55.383,66.604-55.383c19.549,0,36.562,5.069,46.695,10.496
		l-8.687,31.493c-7.602-4.342-21.721-10.135-37.285-10.135c-15.928,0-24.615,7.602-24.615,18.46c0,11.224,8.326,16.655,30.77,24.618
		c31.854,11.582,46.696,27.871,47.058,53.937C409.653,357.539,384.678,380.706,337.981,380.706z M221.8,206.95
		c0,28.598-20.273,44.887-53.574,44.887c-9.049,0-16.289-0.362-21.72-1.809v-82.534c4.708-1.085,13.395-2.171,25.704-2.171
		C202.979,165.323,221.8,179.803,221.8,206.95z"
							>
							</path>
						</g>
					</svg>
					<span class="label">Photoshop</span>
				</div>
			</div>
		</div>
	</section>

	<!-- ============ PROJECTS ============ -->
	<section id="projects">
		<div class="wrap">
			<p class="eyebrow reveal">Projects</p>
			<h2 class="section-title reveal">Shipped projects</h2>
			<div class="projects-grid">
				<article class="project-card reveal">
					<span class="project-tag">HTML · CSS · Bootstrap · JS</span>
					<h3>Ticketing platform</h3>
					<p>
						A <strong>responsive ticketing site</strong> for events, built from scratch with Bootstrap
						and vanilla JavaScript.
					</p>
					<a
						href="https://unleashthebeast.netlify.app/"
						target="_blank"
						rel="noopener"
						class="project-link">View project →</a
					>
				</article>

				<article class="project-card reveal">
					<span class="project-tag">HTML · CSS · Flutterwave API</span>
					<h3>Bank verification flow</h3>
					<p>
						A <strong>bank account verification</strong> tool powered by Flutterwave's API, handling real-time
						lookups and validation.
					</p>
					<a
						href="https://waya-onboarding.netlify.app/"
						target="_blank"
						rel="noopener"
						class="project-link">View project →</a
					>
				</article>

				<article class="project-card reveal">
					<span class="project-tag">HTML · CSS · JavaScript</span>
					<h3>KudiPlay</h3>
					<p>
						A collection of <strong>browser-based games</strong> playable directly in-browser, no installs
						required.
					</p>
					<a
						href="https://kudiplay.netlify.app/"
						target="_blank"
						rel="noopener"
						class="project-link">View project →</a
					>
				</article>

				<article class="project-card reveal">
					<span class="project-tag">HTML · CSS · JavaScript</span>
					<h3>UseWaya</h3>
					<p>
						Marketing site for <strong>Waya</strong>, an AI-powered banking assistant concept for
						Nigerian users.
					</p>
					<a
						href="https://usewaya.netlify.app/#contact"
						target="_blank"
						rel="noopener"
						class="project-link">View project →</a
					>
				</article>
			</div>
		</div>
	</section>

	<!-- ============ ABOUT ============ -->
	<section id="about">
		<div class="wrap about-grid">
			<div class="reveal">
				<p class="eyebrow">About</p>
				<h2 class="section-title">A bit more about me</h2>
				<p>
					I'm a <strong>Computer Science student at the University of Lagos</strong> and an
					early-stage solo developer. Most of my time goes into building products for Nigerian and
					African markets — right now that means <strong>Polyclone</strong>, a micro prediction
					market platform, alongside smaller experiments like a Python-based Word Hunt solver.
				</p>
				<p>
					I care about <strong>fintech and developer tools</strong> — anything that makes money move
					or code ship a little faster. I hold a
					<strong>Meta Front-End Developer Certificate</strong>
					from Coursera, and I'm currently teaching myself
					<strong>Go</strong> for backend work.
				</p>
			</div>
			<div class="timeline reveal">
				<div class="timeline-item">
					<p class="when">2024 — Present</p>
					<p class="what">B.Sc. Computer Science</p>
					<p class="where">University of Lagos</p>
				</div>
				<div class="timeline-item">
					<p class="when">Mar 2024 — Jun 2024</p>
					<p class="what">Junior Frontend Intern (Remote)</p>
					<p class="where">
						Freelance project with Tech Haven Studio — built reusable UI components for a React
						Native MVP.
					</p>
				</div>
				<div class="timeline-item">
					<p class="when">Ongoing</p>
					<p class="what">Meta Front-End Developer Certificate</p>
					<p class="where">Coursera</p>
				</div>
			</div>
		</div>
	</section>
</main>

<!-- ============ FOOTER / CONTACT ============ -->
<footer class="site-footer" id="contact">
	<div class="footer-glow" aria-hidden="true"></div>
	<div class="wrap footer-main reveal">
		<div>
			<p class="eyebrow">Contact</p>
			<h2>Let's build<br /><span class="accent">something worth shipping.</span></h2>
			<p>Got a project, an idea, or just want to talk shop? My inbox is open.</p>
			<a href="mailto:oluwademiladewey@gmail.com" class="btn btn-primary"
				>oluwademiladewey@gmail.com</a
			>
		</div>
		<div class="footer-side">
			<p class="footer-status">{lagosTime}</p>
			<div class="footer-links">
				<a href="mailto:oluwademiladewey@gmail.com" class="footer-icon" title="Email">
					<svg
						aria-hidden="true"
						focusable="false"
						width="800px"
						height="800px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<g id="style=linear">
							<g id="email">
								<path
									id="vector"
									d="M17 20.5H7C4 20.5 2 19 2 15.5V8.5C2 5 4 3.5 7 3.5H17C20 3.5 22 5 22 8.5V15.5C22 19 20 20.5 17 20.5Z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-miterlimit="10"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									id="vector_2"
									d="M18.7698 7.7688L13.2228 12.0551C12.5025 12.6116 11.4973 12.6116 10.777 12.0551L5.22998 7.7688"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
								/>
							</g>
						</g>
					</svg>
				</a>
				<a
					href="https://github.com/yourgithub"
					class="footer-icon"
					title="GitHub"
					target="_blank"
					rel="noopener"
				>
					<svg
						aria-hidden="true"
						focusable="false"
						width="800px"
						height="800px"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z"
							fill="currentColor"
						/>
						<path
							d="M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z"
							fill="currentColor"
						/>
					</svg>
				</a>
				<a
					href="https://twitter.com/trxpznxl"
					class="footer-icon"
					title="Twitter / X"
					target="_blank"
					rel="noopener"
				>
					<svg
						aria-hidden="true"
						focusable="false"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 50 50"
						width="50px"
						height="50px"
						><path
							d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"
						/></svg
					>
				</a>
			</div>
		</div>
	</div>
	<div class="wrap footer-bottom">
		<span>© 2026 Nelson Wey</span>
		<a href="#top" class="back-to-top">↑ Back to top</a>
	</div>
</footer>
