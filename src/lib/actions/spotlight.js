/**
 * Publishes the cursor's position inside an element as `--spot-x` / `--spot-y`
 * so CSS can render a light that follows the pointer.
 *
 * @param {HTMLElement} node
 */
export function spotlight(node) {
	if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return {};

	let frame = 0;

	function move(event) {
		cancelAnimationFrame(frame);
		frame = requestAnimationFrame(() => {
			const rect = node.getBoundingClientRect();
			node.style.setProperty('--spot-x', `${event.clientX - rect.left}px`);
			node.style.setProperty('--spot-y', `${event.clientY - rect.top}px`);
		});
	}

	node.addEventListener('pointermove', move);

	return {
		destroy() {
			cancelAnimationFrame(frame);
			node.removeEventListener('pointermove', move);
		}
	};
}
