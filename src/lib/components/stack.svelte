<script>
	import { reveal } from '$lib/actions/reveal.js';

	const stack = [
		'Svelte',
		'JavaScript',
		'Go',
		'Python',
		'React Native',
		'Node.js',
		'Tailwind CSS',
		'SQLite',
		'Figma',
		'Git'
	];
</script>

<section id="stack">
	<div class="wrap">
		<p class="eyebrow reveal" use:reveal>Tech Stack</p>
		<h2 class="section-title reveal" use:reveal>Tools I build with</h2>

		<ul class="stack-list reveal" use:reveal>
			{#each stack as tool, i}
				<li class:learning={tool === 'Go'}>
					{tool}
					{#if tool === 'Go'}<span class="badge">learning</span>{/if}
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.stack-list {
		list-style: none;
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}

	.stack-list li {
		font-family: var(--font-mono);
		font-size: 0.86rem;
		color: var(--text-muted);
		padding: 0.65rem 1.1rem;
		border: 1px solid var(--border);
		border-radius: 999px;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		transition:
			border-color 0.25s var(--ease),
			color 0.25s ease,
			transform 0.25s var(--ease);
	}

	.stack-list li:hover {
		border-color: var(--accent);
		color: var(--text);
		transform: translateY(-2px);
	}

	.stack-list li.learning {
		border-style: dashed;
		border-color: var(--accent-2);
	}

	.badge {
		font-size: 0.66rem;
		color: var(--accent-2);
		background: var(--accent-2-soft);
		padding: 0.15rem 0.45rem;
		border-radius: 4px;
	}
</style>
