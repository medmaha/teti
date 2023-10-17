<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let headlines = [
		"Discover Your Ultimate Off-Grid Solution with Tec Electrical",
		"Transform Your Career with Tec Electrical and Solar Training",
		"Become a Skilled Electrician with Tec Electrical's Industry-Leading Courses",
		"Get Ahead in the Solar Industry with Tec Electrical's Hands-On Training",
		"Learn the Basics of Electrical Engineering with Tec Electrical's Expert Instructors",
		"Elevate Your Sales Skills with Tec Electrical's Sales and Marketing Courses",
		"Empower Your Career with Tec Electrical's Comprehensive Off-Grid Products Training"
	];


	let interval:any;
	let timeout:any;
	let idx = 0;

	$: headline = headlines[idx];

	function changeHeadline() {
		idx = idx + 1;
		let next = headlines[idx + 1];

		if (!!next) {
			headline = next;
		} else {
			idx = 0;
			headline = headlines[idx];
		}
	}

	
	let intersecting = false;
	let container: HTMLElement;

	onMount(() => {
		timeout = setTimeout(()=>{
			interval = setInterval(changeHeadline, 5000);
		},4000)
		if (typeof IntersectionObserver !== 'undefined') {
			const observer = new IntersectionObserver(
				(entries) => {
					const navbar = document.querySelector('nav')!;
					intersecting = entries[0].isIntersecting;

					if (intersecting) {
						navbar.style.backdropFilter = '';
						navbar.classList.replace('bg-opacity-70', 'bg-opacity-50');
					} else {
						navbar.style.backdropFilter = 'blur(5px)';

						navbar.classList.replace('bg-opacity-50', 'bg-opacity-70');
					}
				},
				{
					threshold: 0.2
				}
			);

			observer.observe(container);
			return () => observer.unobserve(container);
		}
	});
	onDestroy(()=>{
		clearInterval(interval)
		clearTimeout(timeout)
	})
</script>

<div
	bind:this={container}
	id="header"
	class="h-[calc(100vh)] relative w-full overflow-hidden "
	style="margin-top: -105px; z-index: 0;"
>
	<div class="absolute w-full h-full" style="z-index: 0;">
		<img
			src="/headline.jpeg"
			alt=""
			class="w-full min-w-[100vw] min-h-[100vh] h-full object-cover"
		/>
	</div>
	<div
		class="absolute w-full h-full bg-black bg-opacity-60 dark:bg-opacity-30"
		style="z-index: 0;"
	/>
	<div class="flex h-full w-full bg-black bg-opacity-60 dark:bg-opacity-30 px-2 text-white">
		<div
			class="max-w-[700px] bg-black bg-opacity-70 shadow-lg rounded-3xl p-2 max-h-[300px] m-auto h-full w-full flex items-center justify-center flex-col gap-2"
			style="z-index: 1;"
		>
			<div class="w-full text-center">
				<!-- <h2 class="md:text-3xl lg:text-[40px] leading- text-xl font-bold text-green-400">Tec Electrical Training Institute</h2> -->

				<h2
					class=" font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-centerbtext-white"
				>
					Tec Electrical
				</h2>
			</div>
			<div class="md:text-lg lg:text-xl font-base">
				<p
					class="tracking-wide text-center px-1 mt-4 mx-auto max-w-[90%] text-green-500"
					transition:fade
				>
					{headline}
				</p>
			</div>
		</div>
	</div>
</div>
