<script lang="ts">
	import { Menu, Sun, MoreVertical, Moon } from 'lucide-svelte';
	import { theme } from '$lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		const t = localStorage.getItem('theme') || 'light';
		setTheme(t);
	});

	const setTheme = (t: string) => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(t);
		localStorage.setItem('theme', t);
		theme.set(t);
	};
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
			value="Hello World!"
			class="w-full bg-transparent outline-stone-300 focus:outline-dashed dark:outline-stone-700"
		/>
	</div>
	{#if $theme === 'light'}
		<button on:click={() => setTheme('dark')}>
			<Sun class="flex-shrink-0" />
		</button>
	{:else}
		<button on:click={() => setTheme('light')}>
			<Moon class="flex-shrink-0" />
		</button>
	{/if}
	<MoreVertical class="flex-shrink-0" />
</nav>
