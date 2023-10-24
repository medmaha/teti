<!-- src/components/Carousel.svelte -->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';

	let currentIndex = 0;

	const nextSlide = () => {
		const index = (currentIndex + 1) % images.length;
		if (index === images.length - 1) currentIndex = 0;
		else currentIndex = index;

		clearTimeout(timeout);
		timeout = setTimeout(() => nextSlide(), 5500);
	};

	const prevSlide = () => {
		const index = (currentIndex - 1 + images.length) % images.length;
		if (index === 0) currentIndex = images.length - 1;
		else currentIndex = index;
		clearTimeout(timeout);
		timeout = setTimeout(() => nextSlide(), 5500);
	};

	let images = [
		'/assets/services/onsite-work-2.jpg',
		'/assets/services/surcase-2.jpg',
		'/assets/services/graduation-1.jpg',
		'/assets/services/graduation-2.jpg',
		'/assets/services/surcase-3.jpg',
		'/assets/services/onsite-work-3.jpg',
		'/assets/services/graduation-1.jpg',
		'/assets/services/graduation-1.jpg'
		// Add more images as needed
	];

	let timeout: any;

	onMount(() => {
		timeout = setTimeout(() => nextSlide(), 100);
	});

	onDestroy(() => clearTimeout(timeout));
</script>

<div class="relative w-full h-[300px] overflow-hidden service">
	{#each images as image, index (index)}
		<img
			src={`${image}`}
			alt={`Slide ${index + 1}`}
			class={`absolute w-full object-cover h-full transition-opacity duration-[750ms] ease-in-out ${
				index === currentIndex ? 'opacity-100' : 'opacity-0'
			}`}
		/>
	{/each}
	<button
		class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 cursor-pointer"
		on:click={prevSlide}
	>
		&#9001;
	</button>
	<button
		class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 cursor-pointer"
		on:click={nextSlide}
	>
		&#9002;
	</button>
</div>

<style>
	.service {
		position: relative;
	}

	.service::before {
		pointer-events: none;
		z-index: 1;
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.slick-prev,
	.slick-next {
		font-size: 24px;
		color: #333;
	}

	.slick-prev:hover,
	.slick-next:hover {
		color: #000;
		z-index: 3;
	}

	.slick-prev {
		left: -30px;
		z-index: 1;
	}

	.slick-next {
		right: -30px;
		z-index: 1;
	}
</style>
