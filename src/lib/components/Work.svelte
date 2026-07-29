<script>
	import { reveal } from '$lib/actions/reveal.js';
	import { projects } from '$lib/data/projects.js';
</script>

<section id="work" aria-labelledby="work-title">
	<div class="wrap">
		<div class="section-head">
			<div class="reveal" use:reveal>
				<p class="eyebrow">Selected work</p>
				<h2 class="section-title" id="work-title">Things I've <em>shipped</em></h2>
			</div>
			<p class="section-index reveal" use:reveal={{ delay: 0.1 }}>
				({String(projects.length).padStart(2, '0')}) — open source on GitHub
			</p>
		</div>

		<ul class="work-list">
			{#each projects as project, i}
				<li class="reveal" use:reveal={{ delay: i * 0.06 }}>
					<a
						class="row"
						href={project.repo}
						target="_blank"
						rel="noopener"
						data-cursor="view"
						aria-label="{project.title} — view on GitHub"
					>
						<span class="row-ghost" aria-hidden="true">{project.index}</span>

						<span class="row-num">{project.index}</span>

						<!-- Flag sits beside the heading, not inside it, so the accessible
						     name of the heading stays just the project title. -->
						<div class="row-head">
							<h3 class="row-title">{project.title}</h3>
							{#if project.active}
								<span class="row-flag">live</span>
							{/if}
						</div>

						<span class="row-domain">{project.domain}</span>

						<span class="row-arrow" aria-hidden="true">
							<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6">
								<path d="M5 15L15 5M7 5h8v8" stroke-linecap="round" stroke-linejoin="round" />
							</svg>
						</span>

						<div class="row-more">
							<div>
								<p class="row-desc">{project.description}</p>
								<ul class="row-tech">
									{#each project.tech as tech}
										<li>{tech}</li>
									{/each}
								</ul>
							</div>
						</div>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>

<style>
	.work-list {
		list-style: none;
		border-top: 1px solid var(--border);
	}

	.work-list li {
		border-bottom: 1px solid var(--border);
	}

	/* Everything but the hovered row recedes. */
	.work-list:hover .row:not(:hover) {
		opacity: 0.38;
	}

	.row {
		position: relative;
		display: grid;
		grid-template-columns: 3.5rem minmax(0, 1fr) auto 2.2rem;
		align-items: center;
		column-gap: clamp(1rem, 3vw, 2.5rem);
		padding: clamp(1.4rem, 2.6vw, 2rem) 0;
		text-decoration: none;
		isolation: isolate;
		transition:
			opacity 0.4s ease,
			padding 0.5s var(--ease);
	}

	/* Accent wash sweeping in from the left. */
	.row::before {
		content: '';
		position: absolute;
		inset: 0 calc(var(--gutter) * -0.5);
		z-index: -1;
		background: linear-gradient(90deg, var(--accent-soft), transparent 65%);
		transform: scaleX(0);
		transform-origin: left;
		transition: transform 0.6s var(--ease);
	}

	.row:hover::before,
	.row:focus-visible::before {
		transform: scaleX(1);
	}

	/* Oversized index that fades up behind the row. */
	.row-ghost {
		position: absolute;
		right: 3.5rem;
		top: 50%;
		z-index: -1;
		font-family: var(--font-display);
		font-size: 6rem;
		font-weight: 700;
		font-style: italic;
		line-height: 1;
		color: var(--text);
		opacity: 0;
		transform: translateY(-30%);
		transition:
			opacity 0.5s var(--ease),
			transform 0.7s var(--ease);
		pointer-events: none;
	}

	.row:hover .row-ghost {
		opacity: 0.05;
		transform: translateY(-50%);
	}

	.row-num {
		font-family: var(--font-mono);
		font-size: var(--step--2);
		color: var(--text-dim);
		align-self: start;
		padding-top: 0.55em;
		transition: color 0.3s ease;
	}

	.row:hover .row-num {
		color: var(--accent);
	}

	.row-head {
		display: flex;
		align-items: center;
		gap: 0.7rem;
		transition: transform 0.5s var(--ease);
	}

	.row:hover .row-head {
		transform: translateX(0.6rem);
	}

	.row-title {
		font-family: var(--font-display);
		font-size: var(--step-3);
		font-weight: 600;
		line-height: 1.1;
		letter-spacing: -0.02em;
		color: var(--text);
	}

	.row-flag {
		font-family: var(--font-mono);
		font-size: 0.6rem;
		font-weight: 500;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: var(--accent-2);
		background: var(--accent-2-soft);
		border: 1px solid color-mix(in srgb, var(--accent-2) 35%, transparent);
		border-radius: 999px;
		padding: 0.2rem 0.55rem;
		transform: translateY(-0.15em);
	}

	.row-domain {
		font-family: var(--font-mono);
		font-size: var(--step--1);
		color: var(--text-muted);
		white-space: nowrap;
	}

	.row-arrow {
		display: grid;
		place-items: center;
		width: 2.2rem;
		height: 2.2rem;
		border-radius: 50%;
		border: 1px solid var(--border);
		color: var(--text-dim);
		transition:
			transform 0.5s var(--ease),
			color 0.3s ease,
			border-color 0.3s ease,
			background 0.3s ease;
	}

	.row-arrow svg {
		width: 14px;
		height: 14px;
	}

	.row:hover .row-arrow {
		color: var(--on-accent);
		background: var(--accent);
		border-color: var(--accent);
		transform: rotate(45deg);
	}

	/* Description drawer — 0fr → 1fr keeps the transition smooth without JS. */
	.row-more {
		grid-column: 2 / -1;
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.6s var(--ease);
	}

	.row-more > div {
		overflow: hidden;
	}

	.row:hover .row-more,
	.row:focus-visible .row-more {
		grid-template-rows: 1fr;
	}

	.row-desc {
		max-width: 62ch;
		padding-top: 0.9rem;
		color: var(--text-muted);
		font-size: var(--step--1);
		text-wrap: pretty;
	}

	.row-tech {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		list-style: none;
		padding-top: 0.9rem;
	}

	.row-tech li {
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.04em;
		color: var(--text-dim);
		border: 1px solid var(--border);
		border-radius: 999px;
		padding: 0.2rem 0.65rem;
	}

	@media (max-width: 760px) {
		.row {
			grid-template-columns: 2.5rem minmax(0, 1fr) 2rem;
			row-gap: 0.35rem;
		}

		.row-ghost {
			display: none;
		}

		/* No hover on touch — show the detail permanently, stacked. */
		.row-domain {
			grid-column: 2 / -1;
			order: 3;
		}

		.row-more {
			grid-column: 2 / -1;
			order: 4;
			grid-template-rows: 1fr;
		}

		.row-arrow {
			width: 2rem;
			height: 2rem;
			align-self: start;
		}

		.row-title {
			font-size: var(--step-2);
		}

		.row:hover .row-head {
			transform: none;
		}

		.row-desc,
		.row-tech {
			padding-top: 0.6rem;
		}

		.work-list:hover .row:not(:hover) {
			opacity: 1;
		}
	}
</style>
