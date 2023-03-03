<script lang="ts">
	import { Theme } from '$lib/stores';
</script>

<nav class="footer-nav">
	<button
		class="color-swatch"
		style="background-color: #fffffe;"
		data-theme="light"
		data-active={$Theme === 'light'}
		on:click={() => Theme.set('light')}
	/>
	<button
		class="color-swatch"
		style="background-color: #222;"
		data-theme="dark"
		data-active={$Theme === 'dark'}
		on:click={() => Theme.set('dark')}
	/>
	<button
		class="color-swatch"
		style="background-color: #55423d;"
		data-theme="beige"
		data-active={$Theme === 'latte'}
		on:click={() => Theme.set('latte')}
	/>
	<button
		class="color-swatch"
		style="background-color: #fec7d7;"
		data-theme="black"
		data-active={$Theme === 'pink'}
		on:click={() => Theme.set('pink')}
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

			&:hover {
				background-color: var(--color-tertiary);
			}
			&[data-active='true'] {
				border: 2px solid var(--color-primary);
			}
		}
	}
</style>
