<script lang="ts">
	import { PlusSquare, Sun, Moon } from 'lucide-svelte';
	import { App_Theme } from '$lib/stores';
	import { onMount } from 'svelte';
	import { newNote, getNoteById } from '$lib/db';
	import { View_Document, Editor_Instance, Header_Title } from '$lib/stores';
	import { replaceAll } from '@milkdown/utils';

	const setTheme = (theme: string) => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
		localStorage.setItem('theme', theme);
		App_Theme.set(theme);
	};
	onMount(async () => {
		const local_theme = localStorage.getItem('theme') || 'light';
		setTheme(local_theme);
	});
	const loadNote = (id: number) => {
		View_Document.set(id);
		localStorage.setItem('currentNote', id as any);
		getNoteById(id).then((note: any) => {
			($Editor_Instance as any).action(replaceAll(note.content));
			Header_Title.set(note.title);
		});
	};
	const createNote = async () => {
		const id = await newNote();
		loadNote(id as any);
	};
</script>

<nav
	class="fixed bottom-0 flex w-full items-center gap-5 bg-white p-5 text-stone-800 dark:bg-stone-900 dark:text-stone-300"
>
	<button class="flex flex-grow justify-center" on:click={() => createNote()}>
		<PlusSquare />
	</button>
	{#if $App_Theme === 'light'}
		<button on:click={() => setTheme('dark')}>
			<Sun class="flex-shrink-0" />
		</button>
	{:else}
		<button on:click={() => setTheme('light')}>
			<Moon class="flex-shrink-0" />
		</button>
	{/if}
</nav>
