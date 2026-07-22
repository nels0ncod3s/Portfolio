<script>
	import { onMount, onDestroy } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';

	const roles = [
		'Software engineer.',
		'Building Polyclone.',
		'Learning Go.',
		'Shipping for Nigeria.'
	];

	let role = $state('');
	let typingTimeout;

	onMount(() => {
		const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduceMotion) {
			role = roles[0];
			return;
		}

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
					typingTimeout = setTimeout(tick, 1500);
					return;
				}
			} else {
				charIndex--;
				role = current.slice(0, charIndex);

				if (charIndex === 0) {
					deleting = false;
					roleIndex = (roleIndex + 1) % roles.length;
				}
			}

			typingTimeout = setTimeout(tick, deleting ? 30 : 55);
		}

		tick();
	});

	onDestroy(() => {
		if (typingTimeout) clearTimeout(typingTimeout);
	});
</script>

<section class="hero" id="top">
	<div class="wrap hero-grid">
		<div class="hero-copy">
			<p class="eyebrow">Software Engineer — Lagos, Nigeria</p>

			<h1>
				Building products that <em>ship</em>, not just demo.
			</h1>

			<p class="role-line">
				<span class="prompt">&gt;</span>
				{role}<span class="cursor"></span>
			</p>

			<p class="bio">
				I design and build fintech and developer tools for African markets — with a soft spot for
				prediction markets, payment infrastructure, and anything that gets out of the browser and
				into people's hands.
			</p>

			<div class="hero-ctas">
				<a href="#work" class="btn btn-primary">See the work</a>
				<a
					href="https://github.com/nels0ncod3s"
					target="_blank"
					rel="noopener"
					class="btn btn-ghost">GitHub ↗</a
				>
			</div>
		</div>

		<aside class="building-card reveal" use:reveal>
			<p class="building-label">Currently building</p>
			<ul class="building-list">
				<li>
					<span class="dot"></span>
					<div>
						<p class="name">Polyclone</p>
						<p class="desc">micro prediction markets</p>
					</div>
				</li>
				<li>
					<span class="dot"></span>
					<div>
						<p class="name">Wharf</p>
						<p class="desc">webhook debugging dashboard</p>
					</div>
				</li>
			</ul>
			<p class="building-footnote">go1.22 — still learning, still shipping</p>
		</aside>
	</div>
</section>

<style>
	.hero {
		padding: 6rem 0 4.5rem;
	}

	.hero-grid {
		display: grid;
		grid-template-columns: 1.15fr 0.85fr;
		gap: 4rem;
		align-items: center;
	}

	.hero h1 {
		font-family: var(--font-display);
		font-size: clamp(2.4rem, 5vw, 3.8rem);
		font-weight: 600;
		line-height: 1.08;
		letter-spacing: -0.01em;
		margin-bottom: 1.4rem;
	}

	.hero h1 em {
		font-style: italic;
		color: var(--accent);
	}

	.role-line {
		font-family: var(--font-mono);
		font-size: 1.02rem;
		color: var(--text-muted);
		margin-bottom: 1.7rem;
		min-height: 1.6em;
	}

	.role-line .prompt {
		color: var(--accent-2);
		margin-right: 0.3em;
	}

	.role-line .cursor {
		display: inline-block;
		width: 0.5em;
		height: 1em;
		background: var(--text-muted);
		margin-left: 2px;
		vertical-align: text-bottom;
		animation: blink 1s steps(1) infinite;
	}

	@keyframes blink {
		0%,
		49% {
			opacity: 1;
		}
		50%,
		100% {
			opacity: 0;
		}
	}

	.bio {
		max-width: 46ch;
		color: var(--text-muted);
		margin-bottom: 2.2rem;
		font-size: 1.03rem;
	}

	.hero-ctas {
		display: flex;
		gap: 0.9rem;
		flex-wrap: wrap;
	}

	.building-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: 1.8rem;
		box-shadow: var(--shadow);
	}

	.building-label {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--text-dim);
		margin-bottom: 1.2rem;
	}

	.building-list {
		list-style: none;
		display: flex;
		flex-direction: column;
		gap: 1.1rem;
	}

	.building-list li {
		display: flex;
		align-items: flex-start;
		gap: 0.8rem;
	}

	.building-list .dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
		margin-top: 0.5rem;
		flex-shrink: 0;
		box-shadow: 0 0 0 0 var(--accent-soft);
		animation: pulseDot 1.8s ease-out infinite;
	}

	@keyframes pulseDot {
		0% {
			box-shadow: 0 0 0 0 var(--accent-soft);
		}
		70% {
			box-shadow: 0 0 0 8px transparent;
		}
		100% {
			box-shadow: 0 0 0 0 transparent;
		}
	}

	.building-list .name {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.05rem;
	}

	.building-list .desc {
		color: var(--text-muted);
		font-size: 0.9rem;
	}

	.building-footnote {
		margin-top: 1.6rem;
		padding-top: 1.2rem;
		border-top: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--text-dim);
	}

	@media (max-width: 900px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}
	}

	@media (max-width: 640px) {
		.hero {
			padding: 3.5rem 0 3rem;
		}
		.hero-ctas .btn {
			flex: 1 1 auto;
			justify-content: center;
		}
	}
</style>
