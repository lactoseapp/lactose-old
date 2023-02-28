<script lang="ts">
	import { onMount } from 'svelte';
	import {
		CommandPalette,
		App_Theme,
		View_Document,
		Editor_Instance,
		Header_Title,
		App_Notes
	} from '$lib/stores';
	import { Search, Terminal, Palette, FilePlus2, File, Trash } from 'lucide-svelte';
	import { getNoteById, newNote, getAllNotes, deleteNote } from '$lib/db';
	import { replaceAll } from '@milkdown/utils';
	import CommandPaletteItem from './CommandPaletteItem.svelte';

	let query: string = '';
	let dialog: HTMLDialogElement;
	const setTheme = (theme: string) => {
		document.documentElement.classList.remove('light', 'dark');
		document.documentElement.classList.add(theme);
		localStorage.setItem('theme', theme);
		App_Theme.set(theme);
	};
	View_Document.subscribe(async () => App_Notes.set(await getAllNotes()));
	Editor_Instance.subscribe(async () => App_Notes.set(await getAllNotes()));
	Header_Title.subscribe(async () => App_Notes.set(await getAllNotes()));
	onMount(async () => {
		CommandPalette.set(dialog as any);
		App_Notes.set(await getAllNotes());
		dialog.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				dialog.close();
			}
		});
		dialog.addEventListener('click', (e) => {
			// detect clicks outside the dialog
			const rect = dialog.getBoundingClientRect();
			const isInDialog =
				rect.top <= e.clientY &&
				e.clientY <= rect.top + rect.height &&
				rect.left <= e.clientX &&
				e.clientX <= rect.left + rect.width;
			if (!isInDialog) {
				dialog.close();
			}
		});
	});
	const loadNote = (id: number) => {
		console.log(id);
		View_Document.set(id);
		localStorage.setItem('currentNote', id as any);
		getNoteById(id).then((note: any) => {
			($Editor_Instance as any).action(replaceAll(note.content));
			Header_Title.set(note.title);
		});
	};
	const createNote = async () => {
		const id = await newNote();
		loadNote(id as any);
	};
	const commands = [
		{
			title: 'Change Theme',
			icon: Palette,
			handler: () => {
				$App_Theme === 'light' ? setTheme('dark') : setTheme('light');
			}
		},
		{
			title: 'Create New Note',
			icon: FilePlus2,
			handler: () => {
				createNote();
			}
		},
		{
			title: 'Delete Current Note',
			icon: Trash,
			handler: () => {
				if (confirm('Are you sure you want to delete this note?')) {
					deleteNote($View_Document);
					loadNote(($App_Notes as any)[0].id);
				}
				if (($App_Notes as any).length === 1) {
					createNote();
				}
			}
		}
	];
</script>

<dialog
	bind:this={dialog}
	class="h-96 w-5/6 rounded bg-stone-50 shadow-md outline-stone-600 backdrop:bg-stone-900/50 dark:bg-stone-900 dark:outline dark:outline-1 lg:w-1/3"
>
	<form method="dialog">
		<div
			class="searchbar mb-4 flex items-center gap-4 rounded bg-stone-200 p-2 text-stone-500 dark:bg-stone-800"
		>
			<Search class="flex-shrink-0" size="20" />
			<input
				type="text"
				name="search"
				id="search"
				placeholder="search..."
				class="bg-transparent placeholder:text-stone-400 focus:outline-none dark:placeholder:text-stone-700"
				bind:value={query}
			/>
		</div>
		<div class="command-wrapper flex flex-col">
			{#each commands.filter((command) => command.title
					.toLowerCase()
					.includes(query.toLowerCase())) as command}
				<CommandPaletteItem {...command}>
					<svelte:fragment slot="icon">
						{#if command.icon}
							<svelte:component this={command.icon} size="20" />
						{:else}
							<Terminal size="20" />
						{/if}
					</svelte:fragment>
				</CommandPaletteItem>
			{/each}
			<span class="p-2 text-stone-400 dark:text-stone-500">Notes</span>
			{#if $App_Notes}
				{#each $App_Notes.filter((note) => note.title
						.toLowerCase()
						.includes(query.toLowerCase())) as note}
					<CommandPaletteItem
						title={note.title}
						handler={() => {
							loadNote(note.id);
						}}
					>
						<svelte:fragment slot="icon">
							<File size="20" />
						</svelte:fragment>
					</CommandPaletteItem>
				{/each}
			{/if}
		</div>
	</form>
</dialog>
