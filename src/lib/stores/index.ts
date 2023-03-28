import { writable } from 'svelte/store';

export const MarkdownContent = writable({ author: '', markdown: '' });
