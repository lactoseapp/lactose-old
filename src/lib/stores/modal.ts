import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export const createModal = () => {
  let onWindowKeyDown: (arg0: KeyboardEvent) => void;
	const { subscribe, set } = writable(false, (set) => {
		if (!onWindowKeyDown) {
			onWindowKeyDown = (e: KeyboardEvent) => {
				if (e.ctrlKey && e.key === 'k') {
          e.preventDefault()
					set(true);
				}
				if (e.key === 'Escape') {
          set(false);
				}
			};
		}

		if (browser) {
			// Reset the window keydown even lister so we don't over populate the event on each subscribe
			window.removeEventListener('keydown', onWindowKeyDown);
			window.addEventListener('keydown', onWindowKeyDown);
		}
	});

	return {
		subscribe,
    set,
	};
};
