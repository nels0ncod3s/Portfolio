<script>
	import { onMount, onDestroy } from 'svelte';
	import { magnetic } from '$lib/actions/magnetic.js';
	import { spotlight } from '$lib/actions/spotlight.js';
	import { clock, subscribeClock } from '$lib/state/clock.svelte.js';
	import { site } from '$lib/data/site.js';
	import { projects } from '$lib/data/projects.js';

	const roles = [
		'Software engineer.',
		'Building First Layer.',
		'Learning Go.',
		'Shipping for Nigeria.'
	];

	// Whatever is flagged `active` in the project list is what he's building now.
	const building = projects.filter((project) => project.active);

	let role = $state('');
	let typingTimeout;

	onMount(subscribeClock);

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
					typingTimeout = setTimeout(tick, 1600);
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

			typingTimeout = setTimeout(tick, deleting ? 28 : 55);
		}

		// Wait out the intro curtain so the first character lands with the headline.
		typingTimeout = setTimeout(tick, 1400);
	});

	onDestroy(() => clearTimeout(typingTimeout));
</script>

<section class="hero" id="top">
	<div class="hero-aura" aria-hidden="true"></div>

	<div class="wrap hero-grid">
		<div class="hero-copy">
			<p class="eyebrow fade-up" style="--i:0">{site.role} — {site.location}</p>

			<h1 class="display hero-title">
				<span class="line" style="--i:1"><span>Building products</span></span>
				<span class="line" style="--i:2"><span>that <em>ship</em>,</span></span>
				<span class="line" style="--i:3"><span>not just demo.</span></span>
			</h1>

			<!-- Decorative: the roles it types through are all stated elsewhere on the
			     page, and a half-typed word is noise for a screen reader. -->
			<p class="role-line fade-up" style="--i:4" aria-hidden="true">
				<span class="prompt">&gt;</span>{role}<span class="cursor-blink"></span>
			</p>

			<p class="bio fade-up" style="--i:5">
				I design and build fintech and developer tools for African markets — with a soft spot for
				prediction markets, payment infrastructure, and anything that gets out of the browser and
				into people's hands.
			</p>

			<div class="hero-ctas fade-up" style="--i:6">
				<a href="#work" class="btn btn-primary" use:magnetic>
					See the work <span class="arrow">→</span>
				</a>
				<a
					href="https://github.com/nels0ncod3s"
					target="_blank"
					rel="noopener"
					class="btn btn-ghost"
					use:magnetic
				>
					GitHub <span class="arrow">↗</span>
				</a>
			</div>
		</div>

		<aside class="panel fade-up" style="--i:5" use:spotlight>
			<div class="panel-head">
				<span class="panel-label"><span class="dot"></span> Currently building</span>
				<span class="panel-count">{String(building.length).padStart(2, '0')}</span>
			</div>

			<ul class="panel-list">
				{#each building as project}
					<li>
						<span class="panel-index">{project.index}</span>
						<div>
							<p class="panel-name">{project.title}</p>
							<p class="panel-desc">{project.domain}</p>
						</div>
					</li>
				{/each}
			</ul>

			<p class="panel-foot">go1.22 — still learning, still shipping</p>
		</aside>
	</div>

	<div class="wrap hero-foot fade-up" style="--i:8">
		<a href="#work" class="scroll-cue" aria-label="Scroll to selected work">
			<span class="mono">Scroll</span>
			<span class="scroll-track"><span class="scroll-thumb"></span></span>
		</a>
		<p class="mono hero-clock">{site.location} — {clock.time} WAT</p>
	</div>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		justify-content: center;
		/* Tied to vh, not just vw, so the whole hero — copy, panel, scroll cue —
		   comfortably fits one screen on short/laptop viewports, not just narrow ones. */
		gap: clamp(1.25rem, 3vh, 2.25rem);
		min-height: calc(100svh - var(--nav-h));
		padding-block: clamp(1.25rem, 3.5vh, 2.5rem) clamp(1rem, 2.5vh, 1.75rem);
		overflow: clip;
	}

	/* Two soft accent lights bleeding in from the edges. */
	.hero-aura {
		position: absolute;
		inset: -20% -10% auto -10%;
		height: 120%;
		pointer-events: none;
		background:
			radial-gradient(
				38rem 28rem at 78% 18%,
				color-mix(in srgb, var(--accent) calc(var(--glow) * 100%), transparent),
				transparent 70%
			),
			radial-gradient(
				30rem 24rem at 8% 72%,
				color-mix(in srgb, var(--accent-2) calc(var(--glow) * 60%), transparent),
				transparent 72%
			);
		filter: blur(28px);
		opacity: 0;
		animation: auraIn 1.8s var(--ease) calc(var(--intro) - 0.3s) forwards;
	}

	@keyframes auraIn {
		to {
			opacity: 1;
		}
	}

	.hero-grid {
		position: relative;
		display: grid;
		grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
		gap: clamp(2.5rem, 5vw, 4.5rem);
		align-items: center;
	}

	.hero-title {
		/* vw + vh so it shrinks on short screens, not just narrow ones. */
		font-size: clamp(2.1rem, 3vw + 3vh, 4.75rem);
		margin: clamp(0.75rem, 1.8vh, 1.25rem) 0 clamp(0.85rem, 1.8vh, 1.4rem);
	}

	/* ---------- Terminal line ---------- */
	.role-line {
		font-family: var(--font-mono);
		font-size: var(--step-0);
		color: var(--text-muted);
		margin-bottom: clamp(0.85rem, 1.8vh, 1.5rem);
		min-height: 1.6em;
	}

	.role-line .prompt {
		color: var(--accent-2);
		margin-right: 0.45em;
	}

	.cursor-blink {
		display: inline-block;
		width: 0.5em;
		height: 1.05em;
		margin-left: 2px;
		vertical-align: text-bottom;
		background: var(--accent);
		animation: blink 1.05s steps(1) infinite;
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
		max-width: 48ch;
		color: var(--text-muted);
		margin-bottom: clamp(1rem, 2.2vh, 1.8rem);
		text-wrap: pretty;
	}

	.hero-ctas {
		display: flex;
		gap: 0.9rem;
		flex-wrap: wrap;
	}

	/* ---------- Status panel ---------- */
	.panel {
		position: relative;
		padding: clamp(1.25rem, 2.4vh, 1.75rem);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: color-mix(in srgb, var(--bg-elevated) 78%, transparent);
		backdrop-filter: blur(14px);
		box-shadow: var(--shadow);
		overflow: hidden;
	}

	/* Gradient hairline across the top edge. */
	.panel::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--accent), var(--accent-2), transparent);
		opacity: 0.7;
	}

	/* Light that follows the cursor across the card. */
	.panel::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		background: radial-gradient(
			16rem 16rem at var(--spot-x, 50%) var(--spot-y, 0%),
			var(--accent-soft),
			transparent 70%
		);
		opacity: 0;
		transition: opacity 0.4s ease;
	}

	.panel:hover::after {
		opacity: 1;
	}

	.panel-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding-bottom: clamp(0.85rem, 1.6vh, 1.2rem);
		border-bottom: 1px solid var(--border);
	}

	.panel-label {
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		font-family: var(--font-mono);
		font-size: var(--step--2);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-dim);
	}

	.panel-count {
		font-family: var(--font-mono);
		font-size: var(--step--2);
		color: var(--accent);
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		box-shadow: 0 0 0 0 var(--accent-soft);
		animation: pulseDot 2s ease-out infinite;
	}

	@keyframes pulseDot {
		0% {
			box-shadow: 0 0 0 0 color-mix(in srgb, var(--accent) 45%, transparent);
		}
		70% {
			box-shadow: 0 0 0 9px transparent;
		}
		100% {
			box-shadow: 0 0 0 0 transparent;
		}
	}

	.panel-list {
		list-style: none;
		display: flex;
		flex-direction: column;
	}

	.panel-list li {
		display: flex;
		gap: 0.9rem;
		padding: clamp(0.7rem, 1.4vh, 1.15rem) 0;
		border-bottom: 1px solid var(--border);
	}

	.panel-index {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		color: var(--text-dim);
		padding-top: 0.42rem;
	}

	.panel-name {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--step-1);
		line-height: 1.2;
	}

	.panel-desc {
		font-size: var(--step--1);
		color: var(--text-muted);
	}

	.panel-foot {
		padding-top: clamp(0.85rem, 1.6vh, 1.2rem);
		font-family: var(--font-mono);
		font-size: var(--step--2);
		color: var(--text-dim);
	}

	/* ---------- Footer row ---------- */
	.hero-foot {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		flex-wrap: wrap;
		padding-top: clamp(0.85rem, 1.6vh, 1.25rem);
		border-top: 1px solid var(--border);
	}

	.scroll-cue {
		display: inline-flex;
		align-items: center;
		gap: 0.8rem;
		color: var(--text-dim);
		text-decoration: none;
		transition: color 0.25s ease;
	}

	.scroll-cue:hover {
		color: var(--accent);
	}

	.scroll-track {
		display: block;
		position: relative;
		width: 58px;
		height: 1px;
		background: var(--border);
		overflow: hidden;
	}

	.scroll-thumb {
		position: absolute;
		inset: 0;
		background: var(--accent);
		transform-origin: left;
		animation: sweep 2.2s var(--ease) infinite;
	}

	@keyframes sweep {
		0% {
			transform: translateX(-100%);
		}
		60%,
		100% {
			transform: translateX(100%);
		}
	}

	.hero-clock {
		color: var(--text-dim);
		font-variant-numeric: tabular-nums;
	}

	@media (max-width: 900px) {
		.hero-grid {
			grid-template-columns: 1fr;
		}

		.hero {
			min-height: 0;
		}
	}

	@media (max-width: 640px) {
		.hero-ctas .btn {
			flex: 1 1 auto;
			justify-content: center;
		}

		.hero-clock {
			display: none;
		}
	}
</style>
