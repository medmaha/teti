import { redirect } from '@sveltejs/kit';
import Products, { type ProductInterface } from '../../../database/products';
import type { PageServerLoad } from './$types';
import type { Basket } from '../../../store/basket';

export const load = (async ({ params }) => {
	const { pid } = params;

	const product = (await Products.findById(pid))?.toJSON() as ProductInterface;

	if (product) {
		product._id = product.id;
		return { product };
	}

	throw redirect(307, '/');
}) satisfies PageServerLoad;
