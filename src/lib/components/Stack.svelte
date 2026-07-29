<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { marquee, groups } from '$lib/data/stack.js';

	// Each track carries the list twice so the loop stays seamless on wide screens.
	const track = [...marquee, ...marquee];
</script>

<section id="stack" aria-labelledby="stack-title">
	<div class="wrap">
		<div class="section-head">
			<div class="reveal" use:reveal>
				<p class="eyebrow">Tech stack</p>
				<h2 class="section-title" id="stack-title">Tools I <em>build</em> with</h2>
			</div>
			<p class="section-index reveal" use:reveal={{ delay: 0.1 }}>
				(02) — pragmatic over fashionable
			</p>
		</div>
	</div>

	<div class="ticker" aria-hidden="true">
		<div class="marquee">
			<div class="marquee__track">
				{#each track as tool}
					<span class="tick">{tool}<i></i></span>
				{/each}
			</div>
			<div class="marquee__track">
				{#each track as tool}
					<span class="tick">{tool}<i></i></span>
				{/each}
			</div>
		</div>
	</div>

	<div class="wrap">
		<div class="groups">
			{#each groups as group, i}
				<div class="group reveal" use:reveal={{ delay: i * 0.1 }}>
					<p class="group-head">
						<span class="group-index">{group.index}</span>
						{group.label}
					</p>
					<ul>
						{#each group.items as item}
							<li class:learning={item.note}>
								<span>{item.name}</span>
								{#if item.note}<span class="badge">{item.note}</span>{/if}
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.ticker {
		padding-block: clamp(2rem, 5vw, 3.75rem);
		border-block: 1px solid var(--border);
		margin-bottom: clamp(2.5rem, 5vw, 4rem);
	}

	.tick {
		display: inline-flex;
		align-items: center;
		gap: clamp(1.5rem, 4vw, 3.5rem);
		font-family: var(--font-display);
		font-size: clamp(1.8rem, 5vw, 3.4rem);
		font-weight: 600;
		font-variation-settings: 'opsz' 144;
		letter-spacing: -0.02em;
		white-space: nowrap;
		color: var(--text);
	}

	.tick i {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background: var(--accent);
		flex-shrink: 0;
	}

	/* ---------- Grouped list ---------- */
	.groups {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(240px, 100%), 1fr));
		gap: clamp(2rem, 4vw, 3.5rem);
	}

	.group-head {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		font-family: var(--font-mono);
		font-size: var(--step--2);
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--text-dim);
		padding-bottom: 1rem;
		border-bottom: 1px solid var(--border);
	}

	.group-index {
		color: var(--accent);
	}

	.group ul {
		list-style: none;
	}

	.group li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.75rem 0;
		font-size: var(--step-1);
		font-family: var(--font-display);
		font-weight: 500;
		color: var(--text-muted);
		border-bottom: 1px solid color-mix(in srgb, var(--border) 55%, transparent);
		transition:
			color 0.3s ease,
			padding-left 0.4s var(--ease);
	}

	.group li:hover {
		color: var(--text);
		padding-left: 0.5rem;
	}

	.badge {
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: var(--accent-2);
		background: var(--accent-2-soft);
		border: 1px dashed color-mix(in srgb, var(--accent-2) 45%, transparent);
		border-radius: 999px;
		padding: 0.15rem 0.55rem;
	}
</style>
