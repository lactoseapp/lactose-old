import { writable } from "svelte/store";

export const Editor_Markdown = writable("");
export const Editor_Document = writable({});
export const Editor_Instance = writable({});
export const App_Theme = writable("light");