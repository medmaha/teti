import { redirect } from '@sveltejs/kit';
import Products, { type ProductInterface } from '../../database/products';
import type { PageServerLoad } from './$types';

export const load = (async (ev) => {
	const products = (await Products.find({})).flatMap((product) => {
		const __data = product.toJSON();
		__data['_id'] = product.id;
		const data = __data as ProductInterface;
		return data;
	});

	return { products };
}) satisfies PageServerLoad;
