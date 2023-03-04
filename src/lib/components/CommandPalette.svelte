<script lang="ts">
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { CommandPaletteOpen } from '$lib/stores';
	import Command from './Command.svelte';
	import { Terminal, Sun, Moon, Palette } from 'lucide-svelte';
	import { Theme } from '$lib/stores';

	let palette: HTMLDialogElement;
	let searchbar: HTMLInputElement;
	let query: string = '';
	let mode = 'command';
	let commands = [
		{
			title: 'change theme',
			handler: () => (mode = 'theme'),
			icon: Terminal
		}
	];
	let themes = [
		{
			title: 'light',
			handler: () => Theme.set('light'),
			icon: Sun
		},
		{
			title: 'dark',
			handler: () => Theme.set('dark'),
			icon: Moon
		},
		{
			title: 'latte',
			handler: () => Theme.set('latte'),
			icon: Palette
		},
		{
			title: 'pink',
			handler: () => Theme.set('pink'),
			icon: Palette
		}
	];
	CommandPaletteOpen.subscribe((value) => {
		if (value) {
			palette.showModal();
		}
	});
	onMount(() => {
		window.addEventListener('keydown', (e) => {
			if (e.ctrlKey && e.key === 'k') {
				e.preventDefault();
				e.stopPropagation();
				e.stopImmediatePropagation();
				CommandPaletteOpen.set(true);
			}
			if (e.key === 'Escape') {
				CommandPaletteOpen.set(false);
				mode = 'command';
			}
			if (e.key === 'Tab') {
				const paletteContent = document.querySelector('.palette-content');
				const lastElement = paletteContent?.lastElementChild;
				if (document.activeElement === lastElement) {
					e.preventDefault();
					e.stopPropagation();
					e.stopImmediatePropagation();
					searchbar.focus();
				}
			}
		});
		palette.addEventListener('close', () => {
			palette.close();
			CommandPaletteOpen.set(false);
			mode = 'command';
		});
		palette.addEventListener('click', (e) => {
			const rect = palette.getBoundingClientRect();
			const isInDialog =
				rect.top < e.clientY &&
				e.clientY < rect.top + rect.height &&
				rect.left < e.clientX &&
				e.clientX < rect.left + rect.width;
			// check if event target is inside dialog

			if (!isInDialog && !e.currentTarget.classList.contains('command')) {
				palette.close();
				CommandPaletteOpen.set(false);
				mode = 'command';
			}
		});
	});
</script>

{#if $CommandPaletteOpen}
	<div class="backdrop" />
{/if}
<dialog class="dialog" bind:this={palette}>
	<div class="search-wrapper">
		<Search size="20" />
		<input type="text" placeholder="Search" bind:value={query} bind:this={searchbar} />
	</div>
	<hr />
	<div class="palette-content">
		{#if mode == 'command'}
			{#each commands.filter((command) => {
				return command.title.toLowerCase().includes(query.toLowerCase());
			}) as command}
				<Command title={command.title} keybinding={command.keybinding} handler={command.handler}>
					<svelte:component this={command.icon} size="20" />
				</Command>
			{/each}
		{/if}
		{#if mode == 'theme'}
			{#each themes.filter((theme) => {
				return theme.title.toLowerCase().includes(query.toLowerCase());
			}) as theme, i}
				<Command title={theme.title} handler={theme.handler}>
					<svelte:component this={theme.icon} size="20" />
				</Command>
			{/each}
		{/if}
	</div>
</dialog>

<style lang="scss">
	dialog {
		border: none;
		border-radius: 0.5rem;
		background: var(--code);
		color: var(--color-paragraph);
		width: 100%;
		max-width: 640px;
		padding: 1rem;
		height: 320px;
		z-index: 2;
		overflow: hidden;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
		.search-wrapper {
			display: flex;
			align-items: center;
			gap: 0.5rem;
			input {
				border: none;
				color: var(--color-paragraph);
				background: transparent;
				width: 100%;
				&:focus {
					outline: none;
				}
				&::placeholder {
					color: var(--color-paragraph);
					opacity: 0.95;
				}
			}
			color: var(--color-paragraph);
		}
		.palette-content {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			height: calc(100% - 56px);
			overflow: auto;
			padding: 0.5rem;
		}
		hr {
			width: 100%;
			border-style: solid;
			opacity: 0.2;
			border-color: var(--color-paragraph);
		}
	}
</style>
