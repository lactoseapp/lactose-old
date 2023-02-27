<script lang="ts">
	import Command from './Command.svelte';
	import { getAllNotes, getNoteById, newNote, deleteNote } from '$lib/db';
	import { Search } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { View_Document, Editor_Instance, Header_Title } from '$lib/stores';
	import { replaceAll } from '@milkdown/utils';

	let notes: any = [];
	const loadNote = (id: number) => {
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

	const fetchNotes = async () => {
		let notes = (await getAllNotes()) as any;
		notes = notes.map((note: any) => {
			return {
				title: note.title,
				command: () => loadNote(note.id)
			};
		});
		return notes;
	};
	onMount(async () => {
		notes = await fetchNotes();
	});
	View_Document.subscribe(async (id) => {
		notes = await fetchNotes();
	});
	let query: string = '';
	const commands = [
		{
			title: 'Create new note',
			modifier: 'Ctrl',
			key: 'N',
			command: () => createNote()
		},
		{
			title: 'Delete current note',
			command: () => {
				if ($View_Document !== 1) {
					deleteNote($View_Document);
					View_Document.set(1);
					loadNote(1);
				}
			}
		}
	];
</script>

<dialog
	class="border-1 fixed top-1/3 mx-auto flex max-h-60 w-5/6 flex-col rounded border border-stone-400 p-4 text-stone-600 shadow-md dark:bg-stone-900 dark:text-stone-300 lg:w-1/3"
>
	<div class="searchbar border-box mb-2 flex items-center gap-4 border-stone-400">
		<Search class="flex-shrink-0" />
		<input
			type="text"
			name="search"
			id="search"
			class="flex w-full items-center bg-transparent focus:outline-none"
			placeholder="search..."
			bind:value={query}
		/>
	</div>
	<div class="spacer my-2">
		<hr class="border-stone-400 dark:border-stone-700" />
	</div>
	<div class="command-list h-full max-h-40 overflow-auto">
		<span class="my-2 block py-2 font-bold">Notes</span>
		{#each notes.filter((note) => note.title.toLowerCase().includes(query.toLowerCase())) as note}
			<Command
				title={note.title}
				modifier={note.modifier}
				key={note.key}
				command={note.command}
				icon="Document"
			/>
		{/each}
		<span class="my-2 block py-2 font-bold">Commands</span>
		{#each commands.filter((command) => command.title
				.toLowerCase()
				.includes(query.toLowerCase())) as command}
			<Command
				title={command.title}
				modifier={command.modifier}
				key={command.key}
				command={command.command}
			/>
		{/each}
	</div>
</dialog>
