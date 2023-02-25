<script lang="ts">
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { emoji } from '@milkdown/plugin-emoji';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { gfm } from '@milkdown/preset-gfm';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { prism } from '@milkdown/plugin-prism';
	import { history } from '@milkdown/plugin-history';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { EditorMarkdown, EditorDocument } from '$lib/stores';

	function editor(dom: any) {
		Editor.make()
			.config((ctx) => {
				const listener = ctx.get(listenerCtx);
				listener.markdownUpdated((ctx, md, prev) => {
					EditorMarkdown.set(md);
					localStorage.setItem('markdown', md);
				});
				listener.updated((ctx, doc, prev) => {
					EditorDocument.set(doc);
					localStorage.setItem('document', JSON.stringify(doc));
				});
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, localStorage.getItem('markdown') as string);
			})
			.use(commonmark)
			.use(gfm)
			.use(emoji)
			.use(clipboard)
			.use(prism)
			.use(history)
			.use(listener)
			.create();
	}
</script>

<div use:editor class="prose dark:prose-invert mx-auto my-12 max-w-6xl p-5" spellcheck="false" />

<style></style>
