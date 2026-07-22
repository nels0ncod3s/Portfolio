<script>
	import { reveal } from '$lib/actions/reveal.js';

	const timeline = [
		{ when: '2024 — Present', what: 'B.Sc. Computer Science', where: 'University of Lagos' },
		{
			when: 'Mar 2024 — Jun 2024',
			what: 'Junior Frontend Intern (Remote)',
			where:
				'Freelance project with Tech Haven Studio — built reusable UI components for a React Native MVP.'
		},
		{ when: 'Ongoing', what: 'Meta Front-End Developer Certificate', where: 'Coursera' }
	];
</script>

<section id="about">
	<div class="wrap about-grid">
		<div class="reveal" use:reveal>
			<p class="eyebrow">About</p>
			<h2 class="section-title">A bit more <em>about me</em></h2>
			<p>
				I'm a <strong>Computer Science student at the University of Lagos</strong> and an
				early-stage solo developer. Most of my time goes into building products for Nigerian and
				African markets — right now that means <strong>Polyclone</strong>, a micro prediction-market
				platform, and
				<strong>Wharf</strong>, a debugging dashboard for payment webhooks.
			</p>
			<p>
				I care about <strong>fintech and developer tools</strong> — anything that makes money move
				or code ship a little faster. I hold a <strong>Meta Front-End Developer Certificate</strong>
				from Coursera, and I'm currently teaching myself <strong>Go</strong> for backend work.
			</p>
		</div>

		<div class="timeline reveal" use:reveal>
			{#each timeline as item}
				<div class="timeline-item">
					<p class="when">{item.when}</p>
					<p class="what">{item.what}</p>
					<p class="where">{item.where}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.about-grid {
		display: grid;
		grid-template-columns: 1.1fr 0.9fr;
		gap: 3.5rem;
	}

	.about-grid p {
		color: var(--text-muted);
		margin-bottom: 1.1rem;
		max-width: 60ch;
	}

	.about-grid strong {
		color: var(--text);
		font-weight: 600;
	}

	.timeline {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		border-left: 1px solid var(--border);
		padding-left: 1.5rem;
	}

	.timeline-item {
		position: relative;
	}

	.timeline-item::before {
		content: '';
		position: absolute;
		left: -1.59rem;
		top: 0.4rem;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--accent);
	}

	.timeline-item .when {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--text-dim);
	}

	.timeline-item .what {
		font-family: var(--font-display);
		font-weight: 600;
		font-size: 1.05rem;
		margin: 0.2rem 0 0.25rem;
	}

	.timeline-item .where {
		color: var(--text-muted);
		font-size: 0.92rem;
	}

	@media (max-width: 800px) {
		.about-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
