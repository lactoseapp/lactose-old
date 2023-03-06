import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface UserSettings {
	typingMode: 'Normal' | 'Typewriter';
}
export const createUserSettings = () => {
	let settings = {
		typingMode: 'Normal'
	};
	const { subscribe, set } = writable(settings);
	if (browser) {
		const storedSettings = localStorage.getItem('settings');
		if (storedSettings) {
			settings = JSON.parse(storedSettings);
			set(settings);
		}
	}
	return {
		subscribe,
		set: (newSettings: UserSettings) => {
			set(newSettings);
			localStorage.setItem('settings', JSON.stringify(newSettings));
		}
	};
};
