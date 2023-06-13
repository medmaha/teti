<script>
</script>

<div class="block w-full h-full">
	<div class="flex justify-center items-center h-full w-full min-w-[100px] min-h-[100px]">
		<span class="loader" />
		<span class="loader" />
		<span class="loader" />
	</div>
</div>

<style>
	.loader {
		width: 16px;
		height: 16px;
		display: inline-block;
		border-radius: 9999px;
		background-color: var(--secondary);
		animation-name: loader;
		animation-iteration-count: infinite;
		animation-duration: 2s;
		animation-timing-function: ease-in-out;
		margin: 0 2px;
	}

	.loader:nth-child(2) {
		animation-delay: 350ms;
	}
	.loader:nth-child(3) {
		animation-delay: 700ms;
	}
	@keyframes loader {
		50% {
			transform: scale(0.7);
			opacity: 0;
		}
	}
</style>
