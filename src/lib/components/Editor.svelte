<script lang="ts">
	import { onMount } from 'svelte';
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { emoji } from '@milkdown/plugin-emoji';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { gfm } from '@milkdown/preset-gfm';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { prism } from '@milkdown/plugin-prism';

	export let defaultValue: string;

	function editor(dom: any) {
		Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, defaultValue);
			})
			.use(commonmark)
			.use(gfm)
			.use(emoji)
			.use(clipboard)
			.use(prism)
			.create();
	}
</script>

<div use:editor class="prose mx-auto my-12 max-w-6xl p-5" spellcheck="false" />

<style></style>
