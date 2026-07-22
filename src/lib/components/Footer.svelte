<script>
	import { onMount, onDestroy } from 'svelte';
	import { reveal } from '$lib/actions/reveal.js';

	let lagosTime = $state('Lagos, Nigeria');
	let clockInterval;

	function updateClock() {
		const now = new Date();
		const time = new Intl.DateTimeFormat('en-GB', {
			timeZone: 'Africa/Lagos',
			hour: '2-digit',
			minute: '2-digit'
		}).format(now);
		lagosTime = `Lagos, Nigeria — ${time} WAT`;
	}

	onMount(() => {
		updateClock();
		clockInterval = setInterval(updateClock, 15000);
	});

	onDestroy(() => {
		if (clockInterval) clearInterval(clockInterval);
	});
</script>

<footer class="site-footer" id="contact">
	<div class="wrap footer-main reveal" use:reveal>
		<div>
			<p class="eyebrow">Contact</p>
			<h2>Let's build <em>something worth shipping.</em></h2>
			<p>Got a project, an idea, or just want to talk shop? My inbox is open.</p>
			<a href="mailto:oluwademiladewey@gmail.com" class="btn btn-primary"
				>oluwademiladewey@gmail.com</a
			>
		</div>

		<div class="footer-side">
			<p class="footer-status">{lagosTime}</p>
			<div class="footer-links">
				<a href="mailto:oluwademiladewey@gmail.com" class="text-link">Email</a>
				<a href="https://github.com/nels0ncod3s" target="_blank" rel="noopener" class="text-link"
					>GitHub</a
				>
				<a href="https://twitter.com/trxpznxl" target="_blank" rel="noopener" class="text-link"
					>Twitter / X</a
				>
			</div>
		</div>
	</div>

	<div class="wrap footer-bottom">
		<span>© 2026 Nelson Wey</span>
		<a href="#top" class="back-to-top">↑ Back to top</a>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid var(--border);
	}

	.footer-main {
		padding: 6rem 0 3rem;
		display: grid;
		grid-template-columns: 1.3fr 1fr;
		gap: 3rem;
		align-items: end;
	}

	.footer-main h2 {
		font-family: var(--font-display);
		font-size: clamp(2rem, 4.2vw, 3rem);
		font-weight: 600;
		line-height: 1.14;
		margin-bottom: 1rem;
	}

	.footer-main h2 em {
		font-style: italic;
		color: var(--accent);
	}

	.footer-main > div:first-child p {
		color: var(--text-muted);
		max-width: 42ch;
		margin-bottom: 1.8rem;
	}

	.footer-side {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 1.4rem;
	}

	.footer-status {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--text-muted);
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.footer-status::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
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

	.footer-links {
		display: flex;
		gap: 1.4rem;
		font-family: var(--font-mono);
		font-size: 0.88rem;
	}

	.footer-bottom {
		border-top: 1px solid var(--border);
		padding: 1.4rem 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-family: var(--font-mono);
		font-size: 0.76rem;
		color: var(--text-dim);
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	.back-to-top {
		text-decoration: none;
		color: var(--text-dim);
		transition:
			color 0.2s ease,
			transform 0.2s ease;
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
	}

	.back-to-top:hover {
		color: var(--accent);
		transform: translateY(-2px);
	}

	@media (max-width: 800px) {
		.footer-main {
			grid-template-columns: 1fr;
			align-items: start;
		}
	}

	@media (max-width: 640px) {
		.footer-main {
			padding: 3.5rem 0 2.5rem;
			gap: 2rem;
		}
		.footer-main .btn {
			width: 100%;
			justify-content: center;
			word-break: break-all;
			white-space: normal;
			text-align: center;
		}
		.footer-bottom {
			justify-content: center;
			text-align: center;
		}
	}
</style>
