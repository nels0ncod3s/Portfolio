<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { projects } from '$lib/data/projects.js';
</script>

<section id="work">
	<div class="wrap">
		<p class="eyebrow reveal" use:reveal>Selected work</p>
		<h2 class="section-title reveal" use:reveal>Things I've <em>shipped</em></h2>

		<div class="work-grid">
			{#each projects as project}
				<article class="work-card reveal" use:reveal>
					<span class="work-index">{project.index}</span>
					<span class="work-tag">{project.tag}</span>
					<h3>{project.title}</h3>
					<p>{project.description}</p>
					<a href={project.repo} target="_blank" rel="noopener" class="text-link work-link"
						>View on GitHub →</a
					>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.work-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
		gap: 1.4rem;
	}

	.work-card {
		background: var(--bg-elevated);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: 1.9rem;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
		position: relative;
		overflow: hidden;
		transition:
			border-color 0.25s ease,
			transform 0.3s var(--ease),
			box-shadow 0.3s var(--ease);
	}

	.work-card::before {
		content: '';
		position: absolute;
		inset: 0 0 auto 0;
		height: 3px;
		background: linear-gradient(110deg, var(--accent), var(--accent-2));
		opacity: 0;
		transition: opacity 0.25s ease;
	}

	.work-card:hover {
		transform: translateY(-5px);
		box-shadow: var(--shadow);
		border-color: var(--border);
	}

	.work-card:hover::before {
		opacity: 1;
	}

	.work-index {
		font-family: var(--font-mono);
		font-size: 0.78rem;
		color: var(--text-dim);
	}

	.work-tag {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		color: var(--accent);
		letter-spacing: 0.02em;
	}

	.work-card h3 {
		font-family: var(--font-display);
		font-size: 1.35rem;
		font-weight: 600;
	}

	.work-card p {
		color: var(--text-muted);
		font-size: 0.94rem;
		flex-grow: 1;
	}

	.work-link {
		align-self: flex-start;
		font-family: var(--font-mono);
		font-size: 0.85rem;
		margin-top: 0.4rem;
	}
</style>
