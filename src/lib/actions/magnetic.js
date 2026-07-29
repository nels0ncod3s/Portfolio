/**
 * Pulls an element gently toward the cursor while it hovers.
 * No-ops on touch devices and when reduced motion is requested.
 *
 * @param {HTMLElement} node
 * @param {{ strength?: number }} [options]
 */
export function magnetic(node, options = {}) {
	const { strength = 0.28 } = options;

	const inert =
		window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
		!window.matchMedia('(hover: hover) and (pointer: fine)').matches;

	if (inert) return {};

	let frame = 0;

	function move(event) {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			const rect = node.getBoundingClientRect();
			const x = (event.clientX - (rect.left + rect.width / 2)) * strength;
			const y = (event.clientY - (rect.top + rect.height / 2)) * strength;
			node.style.setProperty('--magnet-x', `${x.toFixed(2)}px`);
			node.style.setProperty('--magnet-y', `${y.toFixed(2)}px`);
		});
	}

	function reset() {
		cancelAnimationFrame(frame);
		node.style.setProperty('--magnet-x', '0px');
		node.style.setProperty('--magnet-y', '0px');
	}

	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', reset);

	return {
		destroy() {
			cancelAnimationFrame(frame);
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', reset);
		}
	};
}
