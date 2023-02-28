<script lang="ts">
	export let title: string = 'Untitled';
	export let icon: any = undefined;
	export let handler: (() => any) | undefined = undefined;
	export let keyboardShortcut: string = '';
</script>

<button
	class="flex w-full items-center gap-4 rounded p-2 text-stone-600 focus:bg-stone-200 focus:outline-none dark:text-stone-300 dark:focus:bg-stone-800"
	on:click={handler}
>
	<slot name="icon">fallback</slot>
	<span>{title}</span>
	{#if keyboardShortcut}
		<span class="ml-auto text-xs text-stone-400">{keyboardShortcut}</span>
	{/if}
</button>
