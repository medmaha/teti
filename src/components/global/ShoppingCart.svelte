<script lang="ts">
	import { BasketCart } from '../../store/basket';

	let dropdown = false;
	$: basketStore = $BasketCart;

	import { fade, scale } from 'svelte/transition';

	function getCartQty(qty: number) {
		return qty.toString();
	}

	import Dropdown from '../UI/Dropdown.svelte';

	function toggleDropdown() {
		dropdown = !dropdown;
	}
</script>

<div class={`flex items-center lg:pl-6 md:pl-4 relative `}>
	<button on:click={toggleDropdown} class="relative dropdown-trigger">
		<svg
			class="w-[25px] md:w-[20px] h-[25px] md:h-[20px]"
			xmlns="http://www.w3.org/2000/svg"
			fill="currentColor"
			viewBox="0 0 24 24"
			><path
				d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
			/></svg
		>
		{#if dropdown}
			<Dropdown
				onCloseDropdown={(isOpen) => {
					toggleDropdown();
				}}
				contentCallback={() => {
					const p_s = basketStore.items.slice(0, 5).map((item) => {
						// prettier-ignore
						let temp = `
                            <a href=${'/products/'+ item._id} class="hover:scale-[1.08] hover:shadow-xl transition flex gap-1 justify-between items-center shadow-lg tt-surface p-2 mb-2 rounded-md">
                                <p title=${item.name} class="name text-left text-sm flex-1 max-w-[150px] truncate">
                                    ${item.name}
                                </p>
                                <span title=${item.name} class="px-2 min-w-[50px] inline-block">
                                    ${item.qty}x
                                </span>
                                <div>
                                    <img class='w-8 h-8 rounded-md' src=${`/assets${item.imgUrl}`} alt=${item.name}"/>
                                </div>
                            </a>
                        `;
						return temp;
					});

					let remainder = basketStore.items.slice(5);

					let remainingCount = '';

					if (remainder.length) {
						remainingCount = `plus ${remainder.length} more...`;
					}

					// prettier-ignore
					return `
                        <div class="p-2">
                            <div class="flex gap-4 justify-between items-center pb-3 mt-2 rounded-md font-bold">
                                ${basketStore.items.length?
                                    `
                                        <span class=' cursor-text'>
                                            ${basketStore.total} Items 
                                        </span>
                                          <a href='/basket' class="tt-primary text-sm hover:shadow-md rounded-xl bg-opacity-80 px-2 py-2 transition">
                                    View Cart
                                </a>
                                    `
                                        : 
                                    ''}
                              
                            </div>
                            ${p_s.join('')}
                            <span class="text-center text-sm">
                                ${remainingCount}
                            </span>

                            ${
                                                        basketStore.items.length
                                                            ? `
                                <div class="flex gap-1 justify-between items-center p-2 mt-2 rounded-md font-bold cursor-text">
                                    <span>
                                        Subtotal
                                    </span>
                                    <span>
                                        D${Number(basketStore.price).toFixed(2)}
                                    </span>
                            </div>
                                `
                                                            : ` <span class="text-center text-sm">
                            No items in your shopping cart
                            </span>`
                                                    }
                        </div>
                    `;
				}}
				options={{
					transition: { origin: 'top right' },
					position: { x: '.5rem', y: 'calc(100% + 15px)' }
				}}
			/>
		{/if}
		{#if $BasketCart.total > 0}
			<div class="absolute -top-4 left-[70%]" in:scale out:fade>
				<span
					class="inline-flex min-w-[15px] h-[15px] text-xs rounded-full text-white bg-red-400 p-[5px] justify-center items-center"
				>
					{getCartQty($BasketCart.total)}
				</span>
			</div>
		{/if}
	</button>
</div>
