import { writable } from "svelte/store";

export const EditorMarkdown = writable("");
export const EditorDocument = writable({});
export const theme = writable("light");