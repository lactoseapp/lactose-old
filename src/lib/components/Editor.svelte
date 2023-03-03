<script lang="ts">
	import Footer from './Footer.svelte';

	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { gfm } from '@milkdown/preset-gfm';
	import { history } from '@milkdown/plugin-history';
	import { emoji } from '@milkdown/plugin-emoji';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { EditorInstance, EditorJSON, EditorMarkdown } from '../stores';
	import { prism, prismConfig } from '@milkdown/plugin-prism';
	import { refractor } from 'refractor/lib/common';

	function editor(dom: any) {
		const makeEditor = Editor.make()
			.config((ctx) => {
				const listener = ctx.get(listenerCtx);
				ctx.set(prismConfig.key, {
					configureRefractor: () => {
						return refractor;
					}
				});
				listener.updated((ctx, doc, prevDoc) => {
					if (doc !== prevDoc) {
						EditorJSON.set(doc);
					}
				});
				listener.markdownUpdated((ctx, markdown, prevMarkdown) => {
					if (markdown !== prevMarkdown) {
						EditorMarkdown.set(markdown);
					}
				});
				ctx.set(rootCtx, dom);
			})
			.use(commonmark)
			.use(gfm)
			.use(history)
			.use(emoji)
			.use(clipboard)
			.use(prism)
			.use(listener)
			.create();
		makeEditor.then((editor) => {
			dom.spellcheck = false;
			EditorInstance.set(editor);
		});
	}
</script>

<div class="editor" use:editor />
