// placeholder plugin for the milkdown editor.
// Copyright (c) Lactose 2023
// Milkdown is made by Mirone. https://milkdown.dev

import { Plugin, PluginKey } from '@milkdown/prose/state';
import type { EditorView } from '@milkdown/prose/view';
import { $prose } from '@milkdown/utils';

const getCaretPosition = (view: EditorView) => {
	const { from } = view.state.selection;
	const { top, bottom } = view.coordsAtPos(from);

	const y = (top + bottom) / 2 + window.scrollY;

	return Math.round(y);
};

const TypewriterPlugin = new Plugin({
	key: new PluginKey('milkdown-typewriter'),
	view: () => {
		return {
			update: (view: EditorView) => {
				const caretY = getCaretPosition(view);
				view.dom as HTMLElement;
				view.dom.style.paddingBlock = '50vh';
				window.scrollTo(0, caretY - window.innerHeight / 2);
			}
		};
	}
});
export const typewriter = $prose(() => TypewriterPlugin);
