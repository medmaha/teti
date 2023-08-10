<script lang="ts">
	import Product from '../components/product.svelte';

	import type { PageData } from './$types';

	const heading = 'Teti Sale Products';
	export let data: PageData;
	$: ({ products } = data);
</script>

<div class="max-w-[1200px] mx-auto pt-[20px]">
	<!-- Products -->
	<div class="max-w-[1200px] mx-auto">
		<div id="products" class="w-full rounded-t-lg">
			<h3 class="text-xl sm:text-2xl text-center font-bold py-2 mb-4 text-opacity-80">{heading}</h3>

			<div class="py-8 sm:px-0">
				<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-2">
					{#each products as product (product._id)}
						<Product data={product} />
					{/each}
					{#each products as product (product._id)}
						<Product data={product} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
