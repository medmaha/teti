<script lang="ts">
	import { BasketCart } from '$store/basket';
	import BasketItem from './components/basketItem.svelte';

	import { fade, scale, slide } from 'svelte/transition';
	import PayPal from '../courses/components/PayPal.svelte';
	import { onMount } from 'svelte';
	import { changeActiveLink } from '$lib/helpers/links';

	let checkout = false;

	function enhanceRequest({ form, data, action, cancel, submitter }: any) {
		// `form` is the `<form>` element
		// `data` is its `FormData` object
		// `action` is the URL to which the form is posted
		// `cancel()` will prevent the submission
		// `submitter` is the `HTMLElement` that caused the form to be submitted

		console.log(data);

		return async ({ result, update }: any) => {
			// `result` is an `ActionResult` object
			// `update` is a function which triggers the logic that would be
			// triggered if this callback wasn't set

			update();
		};
	}

	onMount(() => {
		changeActiveLink('basket');
		localStorage.setItem('activeLink', 'basket');
	});
</script>

<div in:fade class="max-w-[1000px] mx-auto">
	<script
		src="https://www.paypal.com/sdk/js?client-id=Ac8Y26JD9Wu3rgUW7rsiPNtYFgSD7mgAq3KRXzK3cbxKY7jJ1KKQhsrMSshJPuz0SeRseQSdpvTpUFef&currency=USD"
	></script>
	{#if checkout}
		<PayPal
			data={$BasketCart.items.map((item) => ({
				_id: item._id,
				product: item.name,
				price: item.price,
				quantity: String(item.qty)
			}))}
			onClosePayment={() => {
				checkout = false;
			}}
			onCheckoutComplete={() => {
				checkout = false;
			}}
		/>
	{/if}
	<div class="tt-card my-4 px-2 -w-full sticky top-[80px]">
		<div
			class="shadow-xl outline outline-gray-200 outline-1 dark:outline-0 rounded-md p-4 flex gap-2 md:gap-4 justify-between items-center w-full flex-wrap"
		>
			<div class="inline-flex justify-center w-full sm:w-max">
				<button
					on:click={() => {
						checkout = !checkout;
					}}
					class="idx px-4 py-2 bg-primary text-white font-semibold hover:shadow-md transition opacity-90 hover:opacity-100 rounded-md"
					>Checkout</button
				>
			</div>
			<div class="new-letter inline-flex w-full sm:w-max justify-center px-2 sm:px-4">
				<input
					type="text"
					placeholder="Join our newsletter"
					class="min-w-[220px] p-2 rounded-md dark:bg-transparent border-none focus:border-none focus:outline-3 transition focus:outline-[var(--primary)] outline outline-2 outline-gray-400"
				/>
			</div>
			<div
				class="price w-full inline-flex flex-col items-center sm:items-end px-2 flex-1 justify-end"
			>
				<span> Total sum </span> <b>${$BasketCart.price.toFixed(2).toString()}</b>
			</div>
		</div>
	</div>

	<div
		class="tt-card outline outline-gray-200 outline-1 dark:outline-0 my-4 p-2 py-4 shadow-xl rounded-lg w-full max-w-[600px] mx-auto min-h-[200px]"
	>
		<div
			class="sm:p-4 p-1 flex flex-col w-full gap-4 h-full max-h-[400px] overflow-hidden overflow-y-auto"
		>
			{#each $BasketCart.items as item, i (item._id)}
				<div in:scale|local out:slide|local>
					<BasketItem {item} idx={i} {enhanceRequest} />
				</div>
			{/each}
			{#if !$BasketCart.items.length}
				<div class="flex flex-col items-center justify-center w-full gap-4 mt-5">
					<p class="text-center px-2 max-w-[30ch]">
						You haven&apos;t added items to your shopping cart
					</p>

					<a
						href="/products"
						class="tt-secondary px-4 py-2 rounded-lg opacity-90 text-lg hover:opacity-100 hover:shadow-md transition"
						>Start Shopping Now!</a
					>
				</div>
			{/if}
		</div>
	</div>
</div>
