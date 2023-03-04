import { Theme } from '$lib/stores';
import { Sun, Moon, Palette } from 'lucide-svelte';

export const themes = [
	{
		title: 'light',
		handler: () => Theme.set('light'),
		icon: Sun
	},
	{
		title: 'dark',
		handler: () => Theme.set('dark'),
		icon: Moon
	},
	{
		title: 'latte',
		handler: () => Theme.set('latte'),
		icon: Palette
	},
	{
		title: 'pink',
		handler: () => Theme.set('pink'),
		icon: Palette
	}
];
