import type { RequestHandler } from '@sveltejs/kit';
import Products from '$db/products';
import type { Basket, BasketItem } from '$store/basket';

export const GET: RequestHandler = async (event) => {
	const basket = event.cookies.get('$basket');
	if (basket) {
		const $basket = JSON.parse(basket);
		const _ids = Object.keys($basket).map((id) => id);
		const products = await Products.find(
			{ _id: { $in: _ids } }
			// { projection: { outline: 0, _id: 0 } }
		);

		let totalPrice = 0;
		let totalQuantity = 0;

		const data = products.flatMap((item) => {
			const basketData: BasketItem = $basket[item.id];
			const _data = {
				_id: item.id as string,
				name: item.name,
				imgUrl: item.imgUrl,
				qty: Number(basketData.qty),
				price: Number(basketData.price)
			};

			totalQuantity += _data.qty;
			totalPrice += _data.price * _data.qty;

			return _data;
		});

		const $store = {
			items: data,
			total: totalQuantity,
			price: totalPrice
		} as Basket;

		return new Response(JSON.stringify({ basket: $store }));
	}
	return new Response(JSON.stringify({ basket: null }));
};
