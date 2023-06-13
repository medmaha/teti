<script lang="ts">
	import { onMount } from 'svelte';

	export let options = {
		text: 'New alert!',
		type: 'error',
		position: 'top-center',
		closeButton: true,
		animationDuration: 0
	};
	let alert: HTMLDivElement | undefined;

	let animationtimeout: NodeJS.Timeout;

	onMount(() => {
		if (alert) {
			switch (options.position) {
				case 'center':
					alert.style.top = '50%';
					alert.style.left = '50%';
					alert.style.transform = 'translate(-50%)';
					break;
				case 'top-center':
					alert.style.top = '1em';
					alert.style.left = '50%';
					alert.style.transform = 'translateX(-50%)';
					break;
				case 'top-left':
					alert.style.top = '1em';
					alert.style.left = '1em';
					break;
				case 'top-right':
					alert.style.top = '1em';
					alert.style.right = '1em';
					break;
				case 'bottom-center':
					alert.style.bottom = '1em';
					alert.style.left = '50%';
					alert.style.transform = 'translateX(-50%)';
					break;
				case 'bottom-left':
					alert.style.bottom = '1em';
					alert.style.left = '1em';
					break;
				case 'bottom-right':
					alert.style.bottom = '1em';
					alert.style.right = '1em';
					break;
				default:
					break;
			}
			clearTimeout(animationtimeout);
			animationtimeout = setTimeout(() => {
				if (alert) {
					alert.style.opacity = '1';
					alert.style.pointerEvents = 'auto';
				}
			}, 2000 + options.animationDuration);
		}
	});
</script>

<div bind:this={alert} class="fixed opacity-0 pointer-events-none transition p-1">
	<div class="flex flex-col gap-4">
		<div
			class={`content px-4 py-2 max-w-[400px] max-h-[400px] min-w-[100px] rounded-lg tt-${options.type} flex gap-2`}
		>
			<div class="min-h-[35px] flex items-center">
				<p class="">
					{options.text}
				</p>
			</div>
			{#if options.closeButton}
				<div class="pl-8">
					<button
						class="w-8 h-8 rounded-full tt-error border-[2px] hover:opacity-100 opacity-90 text-lg transition active:scale-95"
						>&times;</button
					>
				</div>
			{/if}
		</div>
		<div
			class={`content px-4 py-2 max-w-[400px] max-h-[400px] min-w-[100px] rounded-lg tt-${options.type} flex gap-2`}
		>
			<div class="min-h-[35px] flex items-center">
				<p class="">
					{options.text}
				</p>
			</div>
			{#if options.closeButton}
				<div class="pl-8">
					<button
						class="w-8 h-8 rounded-full tt-error border-[2px] hover:opacity-100 opacity-90 text-lg transition active:scale-95"
						>&times;</button
					>
				</div>
			{/if}
		</div>
	</div>
</div>
