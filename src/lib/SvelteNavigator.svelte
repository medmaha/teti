<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	interface SvelteNavigatorStyles {
		height?: number;
		backgroundColor?: string;
		startPosition?: number;
	}

	export let styles: SvelteNavigatorStyles = {};

	const __style: SvelteNavigatorStyles = {
		height: 3,
		backgroundColor: '#ea580c',
		startPosition: undefined,
		...styles
	};

	const time = [500, 200, 350, 50, 10, 750, 300, 500];
	const startPosition = [10, 5, 20, 30, 25, 8, 15];
	const progressPlus = [10, 5, 8, 2, 1];
	const progressNeg = [-5, -8, -2, -1];

	let progress = 0;
	let navigated = false;

	beforeNavigate((navigator) => {
		let timeout: ReturnType<typeof setTimeout>;

		navigated = true;

		function recursiveProgress() {
			console.log(progress);
			clearTimeout(timeout);
			if (!navigated) {
				progress = 0;
				return;
			}
			if (progress === 0) return;

			const duration = time[Math.floor(Math.random() * time.length)];

			timeout = setTimeout(() => {
				if (progress >= 100) {
					progress = 100;
					return;
				}

				if (progress >= 90) {
					progress = progressNeg[Math.floor(Math.random() * progressNeg.length)];
					return recursiveProgress();
				}

				const _time = [
					progressPlus[Math.floor(Math.random() * progressPlus.length)],
					progressPlus[Math.floor(Math.random() * progressPlus.length)]
				];

				if (progress > 45) {
					_time.push(progressNeg[Math.floor(Math.random() * progressNeg.length)]);
				}

				progress += _time[Math.floor(Math.random() * _time.length)];
				recursiveProgress();
			}, duration);
		}

		progress =
			__style.startPosition || startPosition[Math.floor(Math.random() * startPosition.length)];
		recursiveProgress();
	});

	afterNavigate((navigator) => {
		progress = 100;
		setTimeout(() => {
			progress = 0;
			navigated = false;
		}, 300);
	});
</script>

{#if progress}
	<div class="__sn-navigator">
		<div
			class="__sn-progress"
			style={`width: ${progress}%; background-color: ${__style.backgroundColor}; height: ${__style.height}px;`}
		/>
	</div>
{/if}
<slot />

<style>
	.__sn-navigator {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 120;
		pointer-events: none;
	}

	.__sn-navigator .__sn-progress {
		display: inline-block;
		margin: 0;
		padding: 0;
		transition: width 130ms cubic-bezier(0.4, 0, 0.2, 1);
	}
</style>
