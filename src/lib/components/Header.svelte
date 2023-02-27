<script lang="ts">
	import { Menu, Terminal } from 'lucide-svelte';
	import { Header_Title, View_Document } from '$lib/stores';
	import { getNoteById, updateTitle, type Note } from '$lib/db';
	import { onMount } from 'svelte';

	const setTitle = async (title: string) => {
		await updateTitle($View_Document, title);
	};
	onMount(async () => {
		const currentNote = await getNoteById($View_Document);
		Header_Title.set((currentNote as Note).title);
	});
</script>

<nav
	class="fixed top-0 flex w-full items-center gap-5 bg-white p-5 text-stone-800 dark:bg-stone-900 dark:text-stone-500"
>
	<Menu class="flex-shrink-0" />
	<div class="note-title flex-grow text-sm text-stone-500">
		<input
			type="text"
			name="note-title"
			id="note-title"
			class="w-full bg-transparent outline-stone-300 focus:outline-dashed dark:outline-stone-700"
			bind:value={$Header_Title}
			on:blur={() => setTitle($Header_Title)}
		/>
	</div>
	<div class="shortcut hidden text-xs lg:block">
		<span class="shortcut-key rounded bg-stone-200 p-1 text-xs font-medium dark:bg-stone-800"
			>Ctrl</span
		>
		/
		<span class="shortcut-key rounded bg-stone-200 p-1 text-xs font-medium dark:bg-stone-800"
			>Cmd</span
		>
		+
		<span class="shortcut-key rounded bg-stone-200 p-1 text-xs font-medium dark:bg-stone-800"
			>K</span
		>
	</div>
	<Terminal class="flex-shrink-0 dark:text-stone-300" />
</nav>
