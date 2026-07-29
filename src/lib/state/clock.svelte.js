const formatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: 'Africa/Lagos',
	hour: '2-digit',
	minute: '2-digit'
});

// Rendered on the server before any tick, so start with a neutral placeholder
// rather than a server timestamp that would mismatch on hydration.
let time = $state('--:--');
let listeners = 0;
let timer;

export const clock = {
	get time() {
		return time;
	}
};

/**
 * Starts the shared ticker. Multiple components can subscribe; only one
 * interval ever runs. Call the returned function to unsubscribe.
 */
export function subscribeClock() {
	const tick = () => (time = formatter.format(new Date()));

	if (++listeners === 1) {
		tick();
		timer = setInterval(tick, 20000);
	}

	return () => {
		if (--listeners === 0) clearInterval(timer);
	};
}
