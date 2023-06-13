import { writable } from 'svelte/store';

export interface BasketItem {
	_id: string;
	name: string;
	imgUrl: string;
	hint: string;
	price: number;
	qty: number;
}

export interface Basket {
	total: number;
	price: number;
	items: BasketItem[];
}

export const BasketCart = writable<Basket>({ total: 0, price: 0, items: [] });

export function addItem(item: BasketItem) {
	let s: Basket;
	const cartId = generateCartId(16);
	document.cookie = `cardId=${cartId};httpOnly=true;sameSite=strick;`;
	document.cookie = 'username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC';
	BasketCart.update((store) => {
		let foundMatched = false;
		let totalQuantity = 0;
		let totalPrice = 0;

		const basketItems = store.items.map((current) => {
			if (current._id === item._id) {
				foundMatched = true;
				totalQuantity += item.qty;
				totalPrice += item.qty * item.price;
				return { ...current, ...item };
			}
			totalQuantity += current.qty;
			totalPrice += current.qty * current.price;
			return current;
		});

		if (!foundMatched) {
			basketItems.unshift(item);
			totalQuantity += item.qty;
			totalPrice += item.qty * item.price;
		}

		s = {
			total: totalQuantity,
			price: totalPrice,
			items: basketItems
		};
		return s;
	});
}

export function removeItem(itemId: string) {
	BasketCart.update((store) => {
		const $basketItems = store.items.filter((item) => item._id !== itemId);

		const { sum, count } = $basketItems.reduce(
			(total, item) => {
				return { sum: (total.sum += item.price * item.qty), count: (total.count += item.qty) };
			},
			{ sum: 0, count: 0 }
		);

		return {
			price: sum,
			total: count,
			items: $basketItems
		};
	});
}

function generateCartId(length: number) {
	let result = '';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

	function shuffleArray(array: string[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	const data = shuffleArray(characters.split(' ')).join('');
	for (let i = 0; i < length; i++) {
		result += data.charAt(Math.floor(Math.random() * data.length));
	}
	return result;
}
