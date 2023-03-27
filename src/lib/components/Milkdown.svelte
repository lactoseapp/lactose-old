<script lang="ts">
	import { Editor, rootCtx } from '@milkdown/core';
	import { commonmark } from '@milkdown/preset-commonmark';
	import { gfm } from '@milkdown/preset-gfm';

	function editor(dom: HTMLDivElement) {
		Editor.make()
			.config((ctx: any) => {
				ctx.set(rootCtx, dom);
			})
			.use(commonmark)
			.use(gfm)
			.create();
	}
</script>

<div class="editor" use:editor />
