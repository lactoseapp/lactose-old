export const downloadAsFile = (filename: string, markdown: string) => {
	const tempLink = document.createElement('a');
	tempLink.href = `data:text/markdown;charset=utf-8,${encodeURIComponent(markdown)}`;
	tempLink.setAttribute('download', filename);
	tempLink.click();
};
export const loadFile = (callback: (content: string) => void) => {
	const tempLink = document.createElement('input');
	tempLink.type = 'file';
	tempLink.addEventListener('change', (e: Event) => {
		const files = (e.target as HTMLInputElement).files;
		if (files?.length === 0 || !files) return;
		if (!files[0].type.includes('text/markdown')) {
			return;
		}
		const file = (e.target as HTMLInputElement).files?.[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			if (!e.target?.result) return;
			callback(e.target.result as string);
		};
		reader.readAsText(file as Blob);
	});
	tempLink.click();
};
