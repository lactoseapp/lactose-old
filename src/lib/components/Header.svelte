<script lang="ts">
	import { Terminal } from 'lucide-svelte';
	import { CommandPaletteOpen } from '$lib/stores';
	export let title = '';
</script>

<nav class="header-nav">
	<input type="text" name="note-title" id="note-title" bind:value={title} placeholder="Untitled" />
	<div class="shortcut-wrapper">
		<div>
			<kbd>Ctrl</kbd>
			+
			<kbd>K</kbd>
		</div>
		<button
			on:click={() => {
				CommandPaletteOpen.set(true);
			}}
		>
			<Terminal />
		</button>
	</div>
</nav>

<style lang="scss">
	.header-nav {
		display: flex;
		z-index: 1;
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
			color: var(--color-base);
			text-align: center;

			&::placeholder {
				color: var(--color-base);
				opacity: 0.5;
			}

			&:focus {
				outline: none;
			}
			&::placeholder {
				color: var(--color-base);
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
				color: var(--color-base);

				@media (min-width: 768px) {
					display: flex;
				}
			}
			gap: 1rem;
			kbd {
				background-color: var(--color-button-contrast);
				padding: 0.25rem 0.5rem;
				border-radius: 0.25rem;
				font-size: 0.8rem;
				color: var(--color-button-base);
				font-family: 'Roboto', sans-serif;
			}
			button {
				appearance: none;
				border: none;
				background-color: transparent;
				cursor: pointer;
				color: var(--color-base-contrast);
				&:focus {
					outline: none;
				}
			}
		}
	}
</style>
