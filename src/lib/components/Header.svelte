<script lang="ts">
	import { Menu, Terminal } from 'lucide-svelte';
	export let title = 'Untitled';
</script>

<nav class="header-nav">
	<Menu />
	<input type="text" name="note-title" id="note-title" bind:value={title} />
	<div class="shortcut-wrapper">
		<div>
			<kbd>Ctrl</kbd>
			+
			<kbd>K</kbd>
		</div>
		<Terminal />
	</div>
</nav>

<style lang="scss">
	.header-nav {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		position: fixed;
		top: 0;
		background-color: var(--color-bg);
		box-sizing: border-box;
		input {
			appearance: none;
			border: none;
			background-color: transparent;
			flex: 1;
			margin: 0 1rem;
			padding: 0.5rem;
			color: var(--color-paragraph);
			text-align: center;

			&:focus {
				outline: 1px dashed var(--color-paragraph);
			}
			&::placeholder {
				color: var(--color-paragraph);
			}
			&:autofill {
				background-color: transparent;
				border: none;
			}
		}
		.shortcut-wrapper {
			display: flex;
			align-items: center;
			div {
				display: none;
				align-items: center;
				gap: 0.25rem;
				color: var(--color-paragraph);

				@media (min-width: 768px) {
					display: flex;
				}
			}
			gap: 1rem;
			kbd {
				background-color: var(--color-primary);
				padding: 0.25rem 0.5rem;
				border-radius: 0.25rem;
				font-size: 0.8rem;
				color: var(--color-button-text);
				font-family: 'Roboto', sans-serif;
			}
		}
	}
</style>
