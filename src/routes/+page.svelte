<script lang="ts">
	import AboutUs from './components/aboutUs.svelte';
	import Courses from './components/courses.svelte';
	import Headers from './components/headers.svelte';
	import ProductsContainer from './components/productsContainer.svelte';

	import type { PageData } from './$types';
	import { changeActiveLink } from '$lib/helpers/links';
	import Services from './components/services.svelte';

	export let data: PageData;

	const { courses, products } = JSON.parse(data.payload);
</script>

<div class="">
	<Headers />
	<AboutUs />
	<!-- <Courses {courses} /> -->
	<Services  />
	<ProductsContainer {products} />
	<div class="text-center flex flex-col items-center justify-center">
		<a
			href="/products"
			on:click={() => changeActiveLink('products')}
			class="rounded-xl font-semibold text-secondary transition opacity-90 hover:opacity-100"
			>View More?</a
		>
		<p class="text-surface-text-muted text-xs pt-1">View more products of teti!</p>
	</div>
</div>
