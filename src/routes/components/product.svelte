<script lang="ts">
	import { enhance } from '$app/forms';

	import { addItem } from '$store/basket';

	import type { ProductInterface } from '$db/products';
	import { changeActiveLink } from '$lib/helpers/links';
	import { TetiEvents } from '../../store/events';

	export let data: ProductInterface;

	$: product = {
		...data,
		qty: 1
	};

	function changeQty(action: 'inc' | 'dec') {
		if (action === 'inc') {
			product.qty++;
		}
		if (product.qty === 1) return;
		if (action === 'dec' && product.qty > 0) {
			product.qty--;
		}
	}

	function addToBasket() {
		addItem({
			_id: product._id,
			name: product.name,
			imgUrl: product.imgUrl,
			hint: product.hint,
			price: Number(product.price),
			qty: product.qty
		});
		let pronoun = product.qty < 2 ? 'item' : 'items';
		TetiEvents.update(() => ({
			type: 'alert',
			data: {
				text: `Added ${product.qty} ${pronoun} to your cart`,
				position: 'bottom-center',
				duration: 3000
			}
		}));
	}

	function enhanceRequest({ form, data, action, cancel, submitter }: any) {
		// `form` is the `<form>` element
		// `data` is its `FormData` object
		// `action` is the URL to which the form is posted
		// `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted

		return async ({ result, update }: any) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the logic that would be
			// triggered if this callback wasn't set

			update();
		};
	}
</script>

<div
	class="product tt-card shadow-lg rounded-lg p-1 md:p-3 basis-[150px] min-w-[100px] md:basis-[200px]"
>
	<a
		on:click={() => changeActiveLink('products')}
		href={`/products/${product._id}`}
		class="product-img w-full h-[110px] sm:h-[150px]"
	>
		<img
			src={`/assets${product.imgUrl}`}
			alt={product.altText}
			class="max-w-[100px] sm:max-w-[140px] max-h-[100px] sm:max-h-[140px] h-auto w-full"
		/>
	</a>
	<a href={`/products/${product._id}`} class="product-name">
		<p
			title={product.name}
			class="py-1 mt-1 font-semibold text-sm sm:text-base text-center sm:max-w-[180px] truncate px-1 sm:p-0"
		>
			{product.name}
		</p>
	</a>
	<div class="product-desc mb-1 sm:mb-2 w-full flex-1">
		<p
			title={product.hint}
			class="text-sm w-full dark:text-slate-400 text-center px-2 sm:px-0 max-w-full"
		>
			{product.hint}
		</p>
	</div>
	<!-- <a href="/#" class="text-center text-sm tracking-wide text-green-500 hover:text-green-600 transition">More details!</a> -->

	<form
		use:enhance={enhanceRequest}
		method="POST"
		class="product-add flex items-center justify-between flex-wrap gap-1 sm:gap-2 px-2 sm:px-1 mt-2"
	>
		<input type="hidden" value={product.qty} name="qty" />
		<input type="hidden" value={product._id} name="pid" />
		<input type="hidden" value={product.price} name="price" />
		<div
			class="qty shadow-md dark:shadow-surface-text dark:shadow rounded-md overflow-hidden flex items-center gap[1px] p-[1px]"
		>
			<button
				type="button"
				on:click={() => changeQty('dec')}
				class="increment px-2 transition tt-surface opacity-90 hover:opacity-100 m-[1px]
				
					
				">-</button
			>
			<span class="min-w-[30px] text-center inline-block bg-slate-200 dark:bg-slate-600"
				>{product.qty}</span
			>
			<button
				type="button"
				on:click={() => changeQty('inc')}
				class="decrement px-2 transition hover:bg-surface opacity-90 hover:opacity-100 m-[1px]"
				>+</button
			>
		</div>
		<div class="w-max">
			<button
				formaction="/?/addItem"
				on:click={addToBasket}
				class="h-8 w-8  tt-surface shadow-md dark:shadow-surface-text rounded-full dark:shadow hover:bg-opacity-30
				transition inline-flex items-center justify-center hover:text-green-primary"
			>
				<svg
					class="sm:w-[18px] sm:h-[18px] w-4 h-4"
					xmlns="http://www.w3.org/2000/svg"
					fill-opacity=".8"
					fill="currentColor"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					><path
						d="M11 9h2V6h3V4h-3V1h-2v3H8v2h3v3zm-4 9c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2zm-9.83-3.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.86-7.01L19.42 4h-.01l-1.1 2-2.76 5H8.53l-.13-.27L6.16 6l-.95-2-.94-2H1v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.13 0-.25-.11-.25-.25z"
					/></svg
				>
			</button>
		</div>
	</form>
</div>

<style>
	.product {
		display: flex;
		justify-content: center;
		flex-direction: column;
	}
	.product-img {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.product-desc p {
		max-height: 110px;

		font-family: 'Poppins', 'Arial', sans-serif;
		overflow: hidden;
		display: block;
		/* max-height: 4.4rem; */
		-webkit-line-clamp: 3;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		text-overflow: ellipsis;
		white-space: normal;
	}
</style>
