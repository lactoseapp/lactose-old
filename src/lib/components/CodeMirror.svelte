<script lang="ts">
	import CodeMirror from 'svelte-codemirror-editor';
	import { markdown } from '@codemirror/lang-markdown';

	let value = '';
</script>

<CodeMirror
	bind:value
	lang={markdown()}
	styles={{
		'&': {
			width: '500px',
			maxWidth: '100%',
			height: '50rem'
		}
	}}
/>
