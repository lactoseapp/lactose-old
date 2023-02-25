<script lang="ts">
	import { ChevronLeft, ChevronRight, PlusSquare, GitCompare } from 'lucide-svelte';
</script>

<nav
	class="fixed bottom-0 flex w-screen items-center gap-5 bg-white p-5 text-stone-800 dark:bg-stone-900 dark:text-stone-300"
>
	<ChevronLeft />
	<span class="spacer" />
	<ChevronRight />
	<PlusSquare class="flex-grow" />
	<GitCompare />
</nav>
