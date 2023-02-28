<script lang="ts">
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { emoji } from '@milkdown/plugin-emoji';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { gfm } from '@milkdown/preset-gfm';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { prism } from '@milkdown/plugin-prism';
	import { history } from '@milkdown/plugin-history';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { Editor_Markdown, Editor_Document, Editor_Instance, View_Document } from '$lib/stores';
	import { updateContent, getNoteById } from '$lib/db';
	import { replaceAll } from '@milkdown/utils';

	function editor(dom: any) {
		const makeEditor = Editor.make()
			.config((ctx) => {
				const listener = ctx.get(listenerCtx);
				listener.markdownUpdated(async (ctx, md, prev) => {
					Editor_Markdown.set(md);
					await updateContent($View_Document, md);
				});
				listener.updated((ctx, doc, prev) => {
					Editor_Document.set(doc);
				});
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, 'Hello World!');
			})
			.use(commonmark)
			.use(gfm)
			.use(emoji)
			.use(clipboard)
			.use(prism)
			.use(history)
			.use(listener)
			.create();

		makeEditor.then((editor) => {
			getNoteById($View_Document).then((note: any) => {
				Editor_Instance.set(editor);
				if (note) {
					editor.action(replaceAll(note.content));
				}
			});
		});
	}
</script>

<div use:editor class="prose dark:prose-invert mx-auto my-12 max-w-6xl p-5" spellcheck="false" />

<style></style>
