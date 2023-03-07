<script lang="ts">
	import { Download, Palette, Search, Terminal, Upload } from 'lucide-svelte';
	import { CommandPaletteOpen } from '$lib/stores';
	import Command from './Command.svelte';
	import { themes } from '$lib/constants/themes';
	import { clickOutside } from 'svelte-use-click-outside';
	import { EditorInstance, EditorMarkdown, NoteTitle } from '$lib/stores';
	import { typewriter } from '$lib/plugins/typewriter';
	import { replaceAll } from '@milkdown/utils';
	import type { Editor } from '@milkdown/core';
	import { UserSettings } from '$lib/stores';
	import { downloadAsFile, loadFile } from '$lib/constants/commands';
	let searchbar: HTMLInputElement;
	let query = '';
	let mode = 'command';

	const setEditorMode = () => {
		const content = $EditorMarkdown;
		if ($UserSettings.typingMode !== 'Typewriter') {
			($EditorInstance as Editor).use(typewriter);
			UserSettings.set({ ...$UserSettings, typingMode: 'Typewriter' });
		} else {
			($EditorInstance as Editor).remove(typewriter);
			UserSettings.set({ ...$UserSettings, typingMode: 'Normal' });
		}
		($EditorInstance as Editor).create().then((editor) => {
			editor.action(replaceAll(content));
		});
	};

	let commands = [
		{
			title: 'Themes',
			handler: () => (mode = 'theme'),
			icon: Palette
		},
		{
			title: `Toggle Typewriter Mode`,
			handler: () => {
				setEditorMode();
			},
			icon: Terminal
		},
		{
			title: 'Download Markdown',
			handler: () => downloadAsFile(`${$NoteTitle}.md`, $EditorMarkdown),
			icon: Download
		},
		{
			title: 'Upload Markdown',
			handler: () => {
				loadFile((markdown: string) => {
					($EditorInstance as Editor).action(replaceAll(markdown));
					$CommandPaletteOpen = false;
				});
			},
			icon: Upload
		}
	];

	const onDialogClickOutside = () => ($CommandPaletteOpen = false);
	$: if (!$CommandPaletteOpen) mode = 'command';

	const onKeyDown = (e: KeyboardEvent) => {
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
	};
</script>

<svelte:window on:keydown={onKeyDown} />

{#if $CommandPaletteOpen}
	<section class="modal">
		<div use:clickOutside={onDialogClickOutside} class="dialog">
			<div class="search-wrapper">
				<Search size="20" />
				<!-- svelte-ignore a11y-autofocus -->
				<input
					type="text"
					placeholder="Search"
					autofocus
					bind:value={query}
					bind:this={searchbar}
				/>
			</div>
			<hr />
			<div class="palette-content">
				{#if mode == 'command'}
					{#each commands.filter((command) => {
						return command.title.toLowerCase().includes(query.toLowerCase());
					}) as command}
						<Command title={command.title} handler={command.handler}>
							<svelte:component this={command.icon} />
						</Command>
					{/each}
				{/if}
				{#if mode == 'theme'}
					{#each themes.filter((theme) => {
						return theme.title.toLowerCase().includes(query.toLowerCase());
					}) as theme, i}
						<Command title={theme.title} handler={theme.handler}>
							<svelte:component this={theme.icon} />
						</Command>
					{/each}
				{/if}
			</div>
		</div>
	</section>
{/if}

<style lang="scss">
	.modal {
		display: grid;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 3;
		background: #0000001e;
		animation: growIn 0.25s ease-in-out;
	}

	.dialog {
		place-self: center;
		border: none;
		border-radius: 0.5rem;
		background: var(--color-bg);
		color: var(--color-paragraph);
		max-width: 640px;
		padding: 1rem;
		width: 80%;
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
	@keyframes growIn {
		0% {
			transform: scale(0);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
