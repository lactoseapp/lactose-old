<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { onMount } from 'svelte';
	import { newNote } from '$lib/db';

	onMount(async () => {
		const currentNote = localStorage.getItem('currentNote') as string;
		if (!currentNote) {
			const id = await newNote();
			localStorage.setItem('currentNote', id as string);
		}
	});
</script>

<main class="relative min-h-screen dark:bg-stone-900">
	<Header />
	<Editor />
	<Footer />
</main>
