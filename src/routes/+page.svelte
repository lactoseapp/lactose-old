<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { CommandPalette as Palette } from '$lib/stores';

	import { onMount } from 'svelte';
	import { newNote } from '$lib/db';
	import { View_Document } from '$lib/stores';

	onMount(async () => {
		const currentNote = localStorage.getItem('currentNote') as string;
		if (!currentNote) {
			const id = await newNote();
			localStorage.setItem('currentNote', id as string);
			View_Document.set(parseInt(localStorage.getItem('currentNote') as string));
		}
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === 'k') {
				e.preventDefault();
				e.stopPropagation();
				($Palette as HTMLDialogElement).showModal();
			}
		});
	});
</script>

<main class="relative min-h-screen dark:bg-stone-900">
	<Header />
	<Editor />
	<CommandPalette />
	<Footer />
</main>
