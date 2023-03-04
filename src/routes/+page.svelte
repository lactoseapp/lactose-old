<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import CommandPalette from '$lib/components/CommandPalette.svelte';
	import { CommandPaletteOpen } from '$lib/stores';
</script>

<main>
	<Header />
	<Editor />
	<Footer />
	<CommandPalette />
</main>
