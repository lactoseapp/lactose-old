// placeholder plugin for the milkdown editor.
// Copyright (c) Lactose 2023
// Milkdown is made by Mirone. https://milkdown.dev

import { Plugin, EditorState, PluginKey } from '@milkdown/prose/state';
import { Decoration, DecorationSet } from '@milkdown/prose/view';
import { $prose } from '@milkdown/utils';

const PlaceholderPlugin = new Plugin({
	key: new PluginKey('milkdown-placeholder'),
	props: {
		decorations: (state: EditorState) => {
			const element = document.createElement('span');

			element.classList.add('milkdown-placeholder');
			element.style.position = 'absolute';
			element.innerText = 'Write something...';

			const placeholderDecoration = Decoration.widget(0, element, {
				key: 'milkdown-placeholder',
				side: 0
			});
			if (
				state.doc.textContent.trim().length === 0 &&
				state.doc.firstChild?.type.name === 'paragraph'
			) {
				return DecorationSet.create(state.doc, [placeholderDecoration]);
			} else {
				return DecorationSet.empty;
			}
		}
	}
});
export const placeholder = $prose(() => PlaceholderPlugin);
