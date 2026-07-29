<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { site } from '$lib/data/site.js';

	const timeline = [
		{
			when: '2024 — Present',
			what: 'B.Sc. Computer Science',
			where: 'University of Lagos'
		},
		{
			when: 'Mar 2024 — Jun 2024',
			what: 'Junior Frontend Intern (Remote)',
			where:
				'Freelance project with Tech Haven Studio — built reusable UI components for a React Native MVP.'
		},
		{
			when: 'Ongoing',
			what: 'Meta Front-End Developer Certificate',
			where: 'Coursera'
		}
	];

	const facts = [
		{ key: 'Based', value: site.location },
		{ key: 'Focus', value: 'Fintech & developer tools' },
		{ key: 'Studying', value: 'B.Sc. Computer Science' },
		{ key: 'Learning', value: 'Go' }
	];
</script>

<section id="about" aria-labelledby="about-title">
	<div class="wrap about-grid">
		<div class="about-side">
			<div class="about-sticky reveal" use:reveal>
				<p class="eyebrow">About</p>
				<h2 class="section-title" id="about-title">A bit more <em>about me</em></h2>

				<dl class="facts">
					{#each facts as fact}
						<div>
							<dt>{fact.key}</dt>
							<dd>{fact.value}</dd>
						</div>
					{/each}
				</dl>
			</div>
		</div>

		<div class="about-body">
			<div class="prose reveal" use:reveal={{ delay: 0.08 }}>
				<p class="lead">
					I'm a <strong>Computer Science student at the University of Lagos</strong> and an
					early-stage solo developer. Most of my time goes into building products for Nigerian and
					African markets — right now that means <strong>Polyclone</strong>, a micro
					prediction-market platform, and <strong>Wharf</strong>, a debugging dashboard for payment
					webhooks.
				</p>
				<p>
					I care about <strong>fintech and developer tools</strong> — anything that makes money move
					or code ship a little faster. I hold a
					<strong>Meta Front-End Developer Certificate</strong> from Coursera, and I'm currently
					teaching myself <strong>Go</strong> for backend work.
				</p>
			</div>

			<ol class="timeline reveal" use:reveal={{ delay: 0.14 }}>
				{#each timeline as item, i}
					<li style="--i:{i}">
						<p class="when">{item.when}</p>
						<p class="what">{item.what}</p>
						<p class="where">{item.where}</p>
					</li>
				{/each}
			</ol>
		</div>
	</div>
</section>

<style>
	.about-grid {
		display: grid;
		grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		gap: clamp(2.5rem, 6vw, 5rem);
	}

	.about-sticky {
		position: sticky;
		top: calc(var(--nav-h) + 3rem);
	}

	/* ---------- Facts ---------- */
	.facts {
		margin-top: 2.5rem;
		border-top: 1px solid var(--border);
	}

	.facts > div {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 0.85rem 0;
		border-bottom: 1px solid var(--border);
	}

	.facts dt {
		font-family: var(--font-mono);
		font-size: var(--step--2);
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-dim);
	}

	.facts dd {
		font-size: var(--step--1);
		color: var(--text);
		text-align: right;
	}

	/* ---------- Prose ---------- */
	.prose p {
		color: var(--text-muted);
		margin-bottom: 1.2rem;
		max-width: 60ch;
		text-wrap: pretty;
	}

	.prose .lead {
		font-size: var(--step-1);
		line-height: 1.55;
		color: var(--text);
	}

	.prose strong {
		color: var(--text);
		font-weight: 600;
	}

	/* ---------- Timeline ---------- */
	.timeline {
		position: relative;
		list-style: none;
		margin-top: clamp(2.5rem, 5vw, 4rem);
		padding-left: 1.75rem;
	}

	.timeline::before,
	.timeline::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5rem;
		bottom: 0.5rem;
		width: 1px;
	}

	.timeline::before {
		background: var(--border);
	}

	/* Accent line draws downward once the block is revealed. */
	.timeline::after {
		background: var(--accent-grad);
		transform: scaleY(0);
		transform-origin: top;
		transition: transform 1.4s var(--ease) 0.2s;
	}

	/* `.in` is added at runtime by the reveal action, so it needs :global. */
	.timeline:global(.in)::after {
		transform: scaleY(1);
	}

	.timeline li {
		position: relative;
		padding-bottom: 2rem;
	}

	.timeline li:last-child {
		padding-bottom: 0;
	}

	.timeline li::before {
		content: '';
		position: absolute;
		left: -1.75rem;
		top: 0.45rem;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--bg);
		border: 2px solid var(--accent);
		transform: translateX(-4px) scale(0);
		transition: transform 0.6s var(--ease-spring);
		transition-delay: calc(0.35s + var(--i) * 0.18s);
	}

	.timeline:global(.in) li::before {
		transform: translateX(-4px) scale(1);
	}

	.timeline .when {
		font-family: var(--font-mono);
		font-size: var(--step--2);
		letter-spacing: 0.06em;
		color: var(--text-dim);
	}

	.timeline .what {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: var(--step-1);
		line-height: 1.25;
		margin: 0.25rem 0 0.3rem;
	}

	.timeline .where {
		color: var(--text-muted);
		font-size: var(--step--1);
		max-width: 54ch;
		text-wrap: pretty;
	}

	@media (max-width: 860px) {
		.about-grid {
			grid-template-columns: 1fr;
		}

		.about-sticky {
			position: static;
		}
	}
</style>
