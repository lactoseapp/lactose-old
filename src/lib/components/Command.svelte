<script lang="ts">
	export let title: string;
	export let keybinding = '';
	export let handler: () => void;
</script>

<button class="command" on:click={handler}>
	<div class="command__description">
		<div class="command__icon">
			<slot />
		</div>
		<div class="command__title">
			{title}
		</div>
		{#if keybinding}
			<div class="command__keybinding">
				{keybinding}
			</div>
		{/if}
	</div>
</button>

<style lang="scss">
	.command {
		display: flex;
		align-items: center;
		padding: 0.5rem;
		border: none;
		background: transparent;
		width: 100%;
		cursor: pointer;
		border-radius: 0.25rem;
		color: var(--color-paragraph);
		&:focus,
		&:active,
		&:hover {
			outline: none;
			background: var(--color-primary);
			color: var(--color-button-text);
		}
		.command__description {
			display: flex;
			align-items: center;
			gap: 1rem;
			width: 100%;
			.command__icon {
				display: flex;
				align-items: center;
			}
			.command__title {
				flex: 1;
				text-align: left;
				font-size: 1rem;
			}
			.command__keybinding {
				font-size: 0.7rem;
			}
		}
	}
</style>
