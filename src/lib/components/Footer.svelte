<script lang="ts">
	import { Theme } from '$lib/stores';
</script>

<nav class="footer-nav">
	<button
		class="color-swatch"
		style="background-color: #d8d7d9;"
		data-theme="light"
		data-active={$Theme === 'light'}
		on:click={() => Theme.set('light')}
	/>
	<button
		class="color-swatch"
		style="background-color: #191818;"
		data-theme="dark"
		data-active={$Theme === 'dark'}
		on:click={() => Theme.set('dark')}
	/>
	<button
		class="color-swatch"
		style="background-color: #2d1626;"
		data-theme="purple-void"
		data-active={$Theme === 'purple-void'}
		on:click={() => Theme.set('purple-void')}
	/>
</nav>

<style lang="scss">
	.footer-nav {
		display: flex;
		width: 100%;
		flex-direction: row-reverse;
		align-items: center;
		padding: 1rem;
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		background-color: var(--color-bg);

		.color-swatch {
			appearance: none;
			border: none;
			background-color: transparent;
			width: 1.5rem;
			height: 1.5rem;
			border-radius: 50%;
			margin: 0 0.25rem;
			cursor: pointer;
			transition: background-color 0.2s ease-in-out;
			&[data-active='true'] {
				border: 2px solid var(--color-bg-contrast);
			}
		}
	}
</style>
