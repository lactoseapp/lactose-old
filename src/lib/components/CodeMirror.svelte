<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { markdown } from '@codemirror/lang-markdown';
	import { MarkdownContent } from '$lib/stores';
	let editor: CodeMirror;

	MarkdownContent.subscribe((value) => {
		console.log({ editor });
		if (editor) {
			editor.$set({ value: value.markdown });
		}
	});
</script>

<CodeMirror
	bind:this={editor}
	on:change={(e) => {
		MarkdownContent.set({ markdown: e.detail, author: 'codemirror' });
	}}
	lang={markdown()}
	styles={{
		'&': {
			width: '500px',
			maxWidth: '100%',
			height: '50rem'
		}
	}}
/>
