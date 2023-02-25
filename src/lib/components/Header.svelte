<script lang="ts">
	import { Menu, Loader2, MoreVertical, CheckCircle2 } from 'lucide-svelte';
</script>

<nav class="fixed top-0 flex w-full items-center gap-5 bg-white p-5 text-stone-800">
	<Menu class="flex-shrink-0" />
	<div class="note-title flex-grow text-sm text-stone-500">
		<input
			type="text"
			name="note-title"
			id="note-title"
			value="Hello World!"
			class="w-full bg-transparent"
		/>
	</div>
	<CheckCircle2 class="flex-shrink-0" />
	<MoreVertical class="flex-shrink-0" />
</nav>
