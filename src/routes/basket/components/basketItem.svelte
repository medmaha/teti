<script lang="ts">
	import { type BasketItem, addItem, removeItem } from '$store/basket';
	import { flip } from 'svelte/animate';
	import { enhance } from '$app/forms';

	export let item: BasketItem;
	export let idx: number;
	export let enhanceRequest: any;

	$: data = {
		...item
	};

	function changeQty(action: 'inc' | 'dec') {
		if (action === 'inc') {
			data.qty++;
			func();
		} else if (data.qty > 1) {
			data.qty--;
			func();
		}

		function func() {
			addItem({
				_id: data._id,
				name: data.name,
				imgUrl: data.imgUrl,
				hint: data.hint,
				price: data.price,
				qty: data.qty
			});
		}
	}

	function remove() {
		removeItem(item._id);
	}
</script>

<div
	class="tt-surface mb-1 p-2 py-4 shadow-xl rounded-md mx-1 outline outline-gray-200 outline-1 dark:outline-0"
>
	<form
		method="POST"
		action="/?/addItem"
		use:enhance={enhanceRequest}
		class="container flex gap-1 justify-between items-center"
	>
		<input type="hidden" value={data.price} name="price" />
		<input type="hidden" value={data.qty} name="qty" />
		<input type="hidden" value={data._id} name="pid" />
		<span class="idx hidden sm:inline-block">{(idx + 1).toString()}.</span>
		<p
			title={data.name}
			style="overflow: hidden;
					display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			"
			class="name w-full sm:max-w-[30ch]"
		>
			{data.name}
		</p>
		<p class="price"><b>${(data.price * data.qty).toFixed(2).toString()}</b></p>
		<div
			class="qty border-[1px] border-slate-400 dark:border-slate-700 rounded-md overflow-hidden flex items-center gap[1px] p-[1px]"
		>
			<button
				on:click={() => changeQty('dec')}
				class="increment px-2 transition hover:bg-[var(--surface)] opacity-90 hover:opacity-100 m-[1px]"
				>-</button
			>
			<span class="min-w-[30px] text-center inline-block bg-slate-200 dark:bg-slate-600"
				>{data.qty}</span
			>
			<button
				on:click={() => changeQty('inc')}
				class="decrement px-2 transition hover:bg-[var(--surface)] opacity-90 hover:opacity-100 m-[1px]"
				>+</button
			>
		</div>
		<button
			formaction="/?/removeItem"
			on:click={remove}
			class="sm:min-w-[30px] min-w-[20px] text-white h-[20px] sm:h-[30px] inline-flex items-center justify-center rounded-full bg-red-400 bg-opacity-20 dark:bg-opacity-50 dark:hover:bg-opacity-75 hover:bg-opacity-60 transition"
		>
			&times;
		</button>
	</form>
</div>

<style>
	.qty button:focus {
		outline: 2px solid var(--secondary);
	}
</style>
