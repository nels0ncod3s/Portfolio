<script>
	import { onMount } from 'svelte';

	const roles = [
		'Software Engineer.',
		'Building Polyclone.',
		'Learning Go.',
		'Shipping for Nigeria.'
	];

	let role = '';

	let terminal;
	let reduceMotion = false;

	onMount(() => {
		reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (!reduceMotion) {
			startTyping();
			enableTilt();
		} else {
			role = roles[0];
		}
	});

	function startTyping() {
		let roleIndex = 0;
		let charIndex = 0;
		let deleting = false;

		function tick() {
			const current = roles[roleIndex];

			if (!deleting) {
				charIndex++;
				role = current.slice(0, charIndex);

				if (charIndex === current.length) {
					deleting = true;
					return setTimeout(tick, 1400);
				}
			} else {
				charIndex--;
				role = current.slice(0, charIndex);

				if (charIndex === 0) {
					deleting = false;
					roleIndex = (roleIndex + 1) % roles.length;
				}
			}

			setTimeout(tick, deleting ? 35 : 55);
		}

		tick();
	}

	function enableTilt() {
		if (!window.matchMedia('(hover:hover)').matches) return;

		terminal.addEventListener('mousemove', (e) => {
			const rect = terminal.getBoundingClientRect();

			const x = (e.clientX - rect.left) / rect.width - 0.5;
			const y = (e.clientY - rect.top) / rect.height - 0.5;

			terminal.style.transform = `
				perspective(900px)
				rotateY(${x * 6}deg)
				rotateX(${y * -6}deg)
				translateY(-2px)
			`;
		});

		terminal.addEventListener('mouseleave', () => {
			terminal.style.transform = 'perspective(900px) rotateY(0) rotateX(0)';
		});
	}
</script>

<section class="hero">
	<div class="ambient" aria-hidden="true"></div>

	<div class="wrap">
		<div>
			<h1>
				Nelson Wey builds<br />
				<span class="accent"> software that ships. </span>
			</h1>

			<p class="role-line">
				<span class="prompt">&gt;</span>

				{role}

				<span class="cursor"></span>
			</p>

			<p class="bio">
				A <strong>software engineer</strong>
				based in Lagos, Nigeria, building fintech and developer tools for African markets with a soft
				spot for banking infrastructure, prediction markets and products that ship fast.
			</p>

			<div class="hero-ctas">
				<a href="/resume.pdf" target="_blank" class="btn btn-primary"> View Résumé </a>

				<a href="#contact" class="btn btn-ghost"> Get in touch </a>
			</div>
		</div>

		<div class="terminal reveal" bind:this={terminal}>
			<div class="terminal-bar">
				<span></span>
				<span></span>
				<span></span>

				<span class="title"> nelson@lagos — current-builds </span>

				<span class="live-dot"> live </span>
			</div>

			<div class="terminal-body">
				<p class="tline">
					<span class="prompt">$</span>

					<span class="path"> ls </span>

					current-builds/

					<span class="muted"> --status </span>
				</p>

				<p class="tline build-item">
					<span class="name"> polyclone/ </span>

					<span class="status"> building </span>

					<span class="desc"> micro prediction markets </span>
				</p>

				<p class="tline build-item">
					<span class="name"> wordhunt-solver/ </span>

					<span class="status"> building </span>

					<span class="desc"> iMessage solver • Python </span>
				</p>

				<p class="tline" style="margin-top:.7rem">
					<span class="prompt">$</span>

					<span class="path"> go </span>

					version
				</p>

				<p class="tline muted">go1.22 — still learning, still shipping</p>

				<p class="tline">
					<span class="prompt">$</span>

					<span class="final-cursor"></span>
				</p>
			</div>
		</div>
	</div>
</section>
