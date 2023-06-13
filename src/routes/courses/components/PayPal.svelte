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
	}

	let modal: HTMLDivElement;

	onMount(() => {
		document.addEventListener('form-checkout-complete', handleCheckoutComplete);
		modal.focus();
	});
	onDestroy(() => {
		destroy = true;
		document.removeEventListener('form-checkout-complete', handleCheckoutComplete);
	});
</script>

<div
	class="fixed top-0 p-1 left-0 w-full h-[100vh] flex justify-center items-center backdrop-blur-[5px] z-50"
>
	<div
		bind:this={modal}
		transition:scale|local
		class="max-w-[400px] tt-surface  dark:bg-gray-_900 shadow-2xl rounded-lg outline outline-2 dark:outline-gray-600 outline-slate-200 p-4 h-max flex justify-center items-start mx-auto w-full"
	>
		<div
			class="flex justify-center items-center w-full h-full flex-col min-h-[400px] overflow-hidden overflow-y-auto max-h-[70vh]"
		>
			<h2 class="text-gray-700 dark:text-white font-semibold pb-10 text-xl">Pay With?</h2>
			<div id="paypal-button-container" class="min-w-full h-full" style="height: 100%;" />
			<div class="flex-1 flex items-end font-semibold pb-10">
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
</div>
