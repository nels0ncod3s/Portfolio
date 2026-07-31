<script>
	import { onMount } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';
	import { magnetic } from '$lib/actions/magnetic.js';
	import { clock, subscribeClock } from '$lib/state/clock.svelte.js';
	import { site, socials } from '$lib/data/site.js';

	const year = new Date().getFullYear();

	onMount(subscribeClock);
</script>

<footer class="site-footer" id="contact" aria-labelledby="contact-title">
	<div class="wrap">
		<div class="section-head">
			<div class="reveal" use:reveal>
				<p class="eyebrow">Contact</p>
			</div>
			<p class="section-index reveal" use:reveal={{ delay: 0.1 }}>(04) — my inbox is open</p>
		</div>

		<h2 class="display footer-title reveal" id="contact-title" use:reveal={{ delay: 0.05 }}>
			Let's build <em>something</em> worth shipping.
		</h2>

		<p class="footer-lead reveal" use:reveal={{ delay: 0.12 }}>
			Got a project, an idea, or just want to talk shop? My inbox is open.
		</p>

		<a
			href="mailto:{site.email}"
			class="mail reveal"
			use:reveal={{ delay: 0.16 }}
			use:magnetic={{ strength: 0.12 }}
		>
			<span class="mail-text">{site.email}</span>
			<span class="mail-arrow" aria-hidden="true">
				<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
					<path d="M5 15L15 5M7 5h8v8" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</span>
		</a>

		<div class="footer-meta reveal" use:reveal={{ delay: 0.2 }}>
			<ul class="socials">
				{#each socials as social}
					<li>
						<a
							href={social.href}
							class="text-link"
							target={social.href.startsWith('mailto:') ? null : '_blank'}
							rel="noopener"
						>
							{social.label}
						</a>
						<span class="handle">{social.handle}</span>
					</li>
				{/each}
			</ul>

			<p class="status mono">
				<span class="status-dot"></span>
				{site.location} — {clock.time} WAT
			</p>
		</div>
	</div>

	<div class="wrap footer-bottom">
		<span>© {year} {site.name}</span>
		<span class="built">Built with SvelteKit</span>
		<a href="#top" class="back-to-top">
			<span class="back-arrow" aria-hidden="true">↑</span> Back to top
		</a>
	</div>
</footer>

<style>
	.site-footer {
		position: relative;
		border-top: 1px solid var(--border);
		padding-top: var(--section-y);
		overflow: clip;
	}

	.footer-title {
		font-size: var(--step-5);
		max-width: 16ch;
		margin-bottom: 1.5rem;
	}

	.footer-lead {
		color: var(--text-muted);
		max-width: 44ch;
		margin-bottom: 2.5rem;
	}

	/* ---------- Oversized mail link ---------- */
	.mail {
		--magnet-x: 0px;
		--magnet-y: 0px;
		display: inline-flex;
		align-items: center;
		gap: clamp(0.8rem, 2vw, 1.5rem);
		text-decoration: none;
		color: var(--text);
		translate: var(--magnet-x) var(--magnet-y);
		transition:
			translate 0.4s var(--ease),
			color 0.3s ease;
	}

	.mail:hover {
		color: var(--accent);
	}

	.mail-text {
		position: relative;
		font-family: var(--font-mono);
		font-size: clamp(0.95rem, 2.6vw, 1.6rem);
		letter-spacing: -0.02em;
		word-break: break-word;
		background-image: linear-gradient(currentColor, currentColor);
		background-repeat: no-repeat;
		background-size: 100% 1px;
		background-position: 0 100%;
		padding-bottom: 0.35em;
		transition: background-size 0.5s var(--ease);
	}

	.mail:hover .mail-text {
		background-size: 0 1px;
		background-position: 100% 100%;
	}

	.mail-arrow {
		display: grid;
		place-items: center;
		flex-shrink: 0;
		width: clamp(2.4rem, 5vw, 3.4rem);
		aspect-ratio: 1;
		border: 1px solid var(--border);
		border-radius: 50%;
		transition:
			background 0.35s ease,
			border-color 0.35s ease,
			color 0.35s ease,
			transform 0.5s var(--ease);
	}

	.mail-arrow svg {
		width: 40%;
		height: 40%;
	}

	.mail:hover .mail-arrow {
		background: var(--accent);
		border-color: var(--accent);
		color: var(--on-accent);
		transform: rotate(45deg);
	}

	/* ---------- Meta row ---------- */
	.footer-meta {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 2rem;
		flex-wrap: wrap;
		margin-top: clamp(3rem, 7vw, 5rem);
	}

	.socials {
		display: flex;
		gap: clamp(1.5rem, 4vw, 3rem);
		list-style: none;
		flex-wrap: wrap;
	}

	.socials li {
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
		font-family: var(--font-mono);
		font-size: var(--step--1);
	}

	.handle {
		font-size: var(--step--2);
		color: var(--text-dim);
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 0.55rem;
		color: var(--text-muted);
		font-variant-numeric: tabular-nums;
	}

	.status-dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
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

	/* ---------- Bottom bar ---------- */
	.footer-bottom {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem 2rem;
		flex-wrap: wrap;
		padding: 1.4rem 0;
		margin-top: clamp(1.5rem, 4vw, 3rem);
		border-top: 1px solid var(--border);
		font-family: var(--font-mono);
		font-size: var(--step--2);
		color: var(--text-dim);
	}

	.back-to-top {
		display: inline-flex;
		align-items: center;
		gap: 0.4rem;
		text-decoration: none;
		color: var(--text-dim);
		transition: color 0.25s ease;
	}

	.back-to-top:hover {
		color: var(--accent);
	}

	.back-arrow {
		display: inline-block;
		transition: transform 0.4s var(--ease);
	}

	.back-to-top:hover .back-arrow {
		transform: translateY(-4px);
	}

	@media (max-width: 640px) {
		.built {
			display: none;
		}

		.footer-meta {
			align-items: flex-start;
		}
	}
</style>
