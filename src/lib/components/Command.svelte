<script lang="ts">
	export let title: string;
	export let modifier: string | undefined = undefined;
	export let key: string | undefined = undefined;
	export let icon: 'Terminal' | 'Document' = 'Terminal';
	export let command: any = null;
	export let shift: boolean = false;
	import { Terminal, StickyNote } from 'lucide-svelte';
</script>

<button
	class="command flex w-full gap-4 rounded p-2 focus:bg-stone-100 dark:focus:bg-stone-700"
	on:click={command}
>
	<div class="command-description flex w-full items-center gap-4">
		{#if icon === 'Terminal'}
			<Terminal class="flex-shrink-0" size="16" />
		{/if}
		{#if icon === 'Document'}
			<StickyNote class="flex-shrink-0" size="16" />
		{/if}
		<div class="command-title flex-grow text-left">{title}</div>
		{#if modifier !== undefined && key !== undefined}
			<div class="command-key hidden lg:block">
				<span class="shortcut-key rounded bg-stone-200 p-1 text-xs font-medium dark:bg-stone-800"
					>{modifier}</span
				>
				{#if modifier == 'Ctrl'}
					/
					<span class="shortcut-key rounded bg-stone-200 p-1 text-xs font-medium dark:bg-stone-800"
						>Cmd</span
					>
				{/if}
				+
				{#if shift}
					<span class="shortcut-key rounded bg-stone-200 p-1 text-xs font-medium dark:bg-stone-800"
						>Shift</span
					>
					+
				{/if}
				<span class="shortcut-key rounded bg-stone-200 p-1 text-xs font-medium dark:bg-stone-800"
					>{key}</span
				>
			</div>
		{/if}
	</div>
</button>
