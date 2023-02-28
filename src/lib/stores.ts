import { writable } from "svelte/store";

export const Editor_Markdown = writable("");
export const Editor_Document = writable({});
export const Editor_Instance = writable({});
export const Header_Title = writable("Lactose");
export const App_Theme = writable("light");
export const View_Document = writable(1);
export const CommandPalette = writable([]);
export const App_Notes = writable();