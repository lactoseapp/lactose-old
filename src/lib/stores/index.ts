import { writable } from "svelte/store";
import { createTheme } from "$lib/stores/theme"
import { createModal } from "./modal";

export const EditorInstance = writable({});
export const EditorMarkdown = writable("");
export const EditorJSON = writable({});
export const Theme = createTheme();
export const CommandPaletteOpen = createModal()
