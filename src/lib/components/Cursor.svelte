<script>
	import { onMount } from 'svelte';

	let el;

	onMount(() => {
		const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!fine || reduced) return;

		document.body.classList.add('has-cursor');

		// Ring lerps toward the pointer for a soft trailing feel.
		let targetX = window.innerWidth / 2;
		let targetY = window.innerHeight / 2;
		let x = targetX;
		let y = targetY;
		let frame;
		let label = '';

		function onMove(event) {
			targetX = event.clientX;
			targetY = event.clientY;
			el.classList.add('is-visible');

			const hit = event.target.closest?.('a, button, [data-cursor]');
			const next = hit?.dataset.cursor ?? '';

			el.classList.toggle('is-active', Boolean(hit));
			el.classList.toggle('has-label', Boolean(next));
			el.style.setProperty('--cs', hit ? (next ? '1.7' : '1.35') : '1');

			if (next !== label) {
				label = next;
				el.querySelector('.cursor__label').textContent = next;
			}
		}

		function onLeave() {
			el.classList.remove('is-visible');
		}

		function loop() {
			x += (targetX - x) * 0.18;
			y += (targetY - y) * 0.18;
			el.style.setProperty('--cx', `${x.toFixed(2)}px`);
			el.style.setProperty('--cy', `${y.toFixed(2)}px`);
			frame = requestAnimationFrame(loop);
		}

		window.addEventListener('pointermove', onMove, { passive: true });
		document.addEventListener('pointerleave', onLeave);
		frame = requestAnimationFrame(loop);

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener('pointermove', onMove);
			document.removeEventListener('pointerleave', onLeave);
			document.body.classList.remove('has-cursor');
		};
	});
</script>

<div class="cursor" bind:this={el} aria-hidden="true">
	<span class="cursor__dot"></span>
	<span class="cursor__label"></span>
</div>
