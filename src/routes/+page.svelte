<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';

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
	});
</script>

<main class="relative min-h-screen dark:bg-stone-900">
	<CommandPalette />
	<Header />
	<Editor />
	<Footer />
</main>
