<script lang="ts">
	import { onMount } from 'svelte';

	type DropdownInterface = {
		transition: {
			origin?:
				| 'top left'
				| 'center'
				| 'top'
				| 'bottom'
				| 'left'
				| 'right'
				| 'top center'
				| 'bottom center'
				| 'bottom left'
				| 'bottom right'
				| 'top right';
			delay?: number;
			duration?: number;
		};
		position: {
			y?: string;
			x?: string;
		};
	};

	type AnimateInArgs = {
		delay?: number;
		duration?: number;
	};

	function animateIn(node: Element, { duration = 60, delay = 0 }: AnimateInArgs) {
		return {
			delay,
			duration,
			css: (time: number) => `transform: scale(${time * 1})`
		};
	}

	function animateOut(node: Element, { duration = 60, delay = 0 }: AnimateInArgs) {
		const s = +getComputedStyle(node).opacity;
		return {
			delay,
			duration,
			css: (time: number, u: number) => {
				return `transform: scale(${time});`;
			}
		};
	}

	let element: HTMLDivElement;
	let ready = false;

	export let options: DropdownInterface;
	export let content: string = 'Hello world!';
	export let onCloseDropdown: (open: boolean) => void;
	export let contentCallback: undefined | (() => string);

	function handleOuterClick({ target }: any) {
		if (target === element) return;
		if (target.closest('.tt-dropdown')) return;

		if (target === element.parentElement) return;
		if (target.closest('.dropdown-trigger')) return;

		onCloseDropdown(false);
	}

	onMount(() => {
		document.addEventListener('click', handleOuterClick);
		return () => document.removeEventListener('click', handleOuterClick);
	});

	const styles = {
		transition: {
			origin: 'top center',
			duration: 100,
			delay: 0,
			...options.transition
		},
		position: {
			y: '100%',
			x: '0',
			...options.position
		}
	};
</script>

<div
	bind:this={element}
	in:animateIn={{ duration: styles.transition.duration, delay: styles.transition.delay }}
	out:animateOut={{ duration: styles.transition.duration, delay: styles.transition.delay }}
	class="tt-dropdown absolute min-w-[100px] min-h-[100px] tt-card shadow-lg rounded-b-md p-2 border-[1px] w-max"
	style={`top:${styles.position.y}; right:${styles.position.x}; transform-origin:${styles.transition.origin};`}
>
	{#if contentCallback}
		{@html contentCallback()}
	{:else}
		{@html content}
	{/if}
</div>
