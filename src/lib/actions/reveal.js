const REDUCED = '(prefers-reduced-motion: reduce)';

/**
 * Adds `.in` to a `.reveal` element once it scrolls into view.
 *
 * @param {HTMLElement} node
 * @param {{ delay?: number, threshold?: number }} [options]
 *   delay — stagger in seconds, exposed to CSS as `--reveal-delay`.
 */
export function reveal(node, options = {}) {
	const { delay = 0, threshold = 0.15 } = options;

	if (delay) node.style.setProperty('--reveal-delay', `${delay}s`);

	const show = () => node.classList.add('in');

	if (window.matchMedia(REDUCED).matches || !('IntersectionObserver' in window)) {
		show();
		return {};
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add('in');
				observer.unobserve(entry.target);
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
