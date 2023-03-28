<script lang="ts">
	import { Editor, rootCtx } from '@milkdown/core';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { gfm } from '@milkdown/preset-gfm';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { MarkdownContent } from '$lib/stores';
	import { replaceAll } from '@milkdown/utils';

	function editor(dom: HTMLDivElement) {
		const editor = Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				const listener = ctx.get(listenerCtx);
				listener.focus((ctx) => {
					MarkdownContent.set({ author: 'milkdown', markdown: $MarkdownContent.markdown });
				});
				listener.markdownUpdated((ctx, markdown, prevmarkdown) => {
					if ($MarkdownContent.author === 'milkdown' && markdown !== prevmarkdown) {
						MarkdownContent.set({ markdown, author: 'milkdown' });
					}
				});
			})
			.use(listener)
			.use(commonmark)
			.use(gfm)
			.create();

		editor.then((editor) => {
			MarkdownContent.subscribe((value) => {
				if (value.author === 'milkdown') return;
				editor.action(replaceAll(value.markdown));
			});
		});
	}
</script>

<div class="editor" use:editor />
