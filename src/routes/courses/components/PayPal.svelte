<script lang="ts">
	import { error } from '@sveltejs/kit';
	import { onDestroy, onMount, createEventDispatcher } from 'svelte';

	import { TetiEvents } from '../../../store/events';
	import { scale } from 'svelte/transition';

	interface Cart {
		_id: string;
		product: string;
		price: number;
		quantity: string;
	}
	type PayloadData = Cart[];

	const dispatch = createEventDispatcher();

	export let data: PayloadData;
	export let onCheckoutComplete: () => void;
	export let onClosePayment: () => void;

	localStorage.setItem('form', JSON.stringify(data));

	let destroy = false;

	function handleCheckoutComplete() {
		const alertMsg = 'Thank you for your business!';
		if (!destroy) onCheckoutComplete();

		onClosePayment();
		TetiEvents.update(() => {
			return {
				data: { text: alertMsg, position: 'top-center', type: 'info' },
				type: 'alert'
			};
		});
		dispatch('message', {
			text: 'Hello!'
		});
		modal.close();
	}

	let modal: HTMLDialogElement;

	onMount(() => {
		modal.showModal();
		document.addEventListener('form-checkout-complete', handleCheckoutComplete);
	});
	onDestroy(() => {
		destroy = true;
		document.removeEventListener('form-checkout-complete', handleCheckoutComplete);
	});
</script>

<dialog
	bind:this={modal}
	transition:scale|local
	class="tt-surface rounded-lg outline-0 focus:outline-0 border-0 focus:border-0 max-w-[400px] w-full p-0 backdrop:backdrop-blur-[1px] backdrop:bg-black backdrop:bg-opacity-20"
>
	<div class="p-4 h-max flex justify-center items-start w-full">
		<div class="flex justify-center items-center w-full h-full flex-col min-h-[350px]">
			<h2 class="text-gray-700 dark:text-white font-semibold pb-10 text-xl">Pay With?</h2>
			<div id="paypal-button-container" class="min-w-full h-full" />
			<div class="flex-1 flex items-end font-semibold pb-6">
				<button
					on:click={onClosePayment}
					class="bg-error text-white shadow py-2 px-6 rounded-xl text-lg opacity-90 hover:opacity-100"
					>Cancel</button
				>
			</div>
		</div>
		<script>
			var paypalButton = paypal.Buttons({
				// Order is created on the server and the order id is returned
				createOrder: function () {
					return fetch('/api/checkout/?order=create', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						// use the "body" param to optionally pass additional order information
						// like product skus and quantities
						body: JSON.stringify({
							cart: JSON.parse(localStorage.getItem('form'))
						})
					})
						.then(function (response) {
							return response.json();
						})
						.then(function (order) {
							console.log(order);
							localStorage.removeItem('form');
							return order.id;
						});
				},
				// Finalize the transaction on the server after payer approval
				onApprove(data) {
					return fetch('/api/checkout/?order=capture', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							orderID: data.orderID
						})
					})
						.then(function (response) {
							return response.json();
						})
						.then(function (orderData) {
							const payer = orderData.payer;
							console.log(payer);
							const transaction = orderData.purchase_units[0].payments.captures[0];
							console.log(transaction);
							// const element = document.getElementById('paypal-button-container');
							// element.innerHTML = '<h3>Thank you for your payment!</h3>';
							// Or go to another URL:  window.location.href = 'thank_you.html';
							var customEvent = new Event('form-checkout-complete');
							document.dispatchEvent(customEvent);
							paypalButton.close();
						})
						.catch(function (err) {
							console.log(err.message);
							alert(err.message);
						});
				},
				onCancel: function (data) {
					console.log('user cancelled:', data);
				},
				onError: function (err) {
					console.log('An occurred:', err);
				}
			});
			paypalButton.render('#paypal-button-container');
		</script>
	</div>
</dialog>
