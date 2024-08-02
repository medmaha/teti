import type { RequestHandler } from './$types';

import { PAYPAL_CLIENT_SECRET, PAYPAL_CLIENT_ID } from '$env/static/private';
import { env } from '$env/dynamic/private';

const __baseURL = {
	sandbox: 'https://api-m.sandbox.paypal.com',
	production: 'https://api-m.paypal.com'
};

const baseURL = env.NODE_ENV === 'production' ? __baseURL.production : __baseURL.sandbox;

function queryParams(url: string) {
	const data = {} as { [x: string]: string };
	const _q = url.split('?')[1];

	const _queries = _q.split('&');

	for (const q of _queries) {
		const [key, value] = q.split('=');
		if (key && value) data[key] = value;
	}

	return data;
}

export const POST: RequestHandler = async ({ request }) => {
	const { order } = queryParams(request.url);

	if (order === 'create') {
		const { cart } = await request.json();
		const _order = JSON.stringify(await createOrder(cart));
		return new Response(_order, { headers: { 'content-type': 'application/json' } });
	}
	if (order === 'capture') {
		const { orderID } = await request.json();
		const captureData = await capturePayment(orderID);
		// TODO: store payment information such as the transaction ID
		return new Response(JSON.stringify(captureData), {
			headers: { 'content-type': 'application/json' }
		});
	}
	return new Response();
};

// use the orders api to create an order
async function createOrder(cart: any) {
	const accessToken = await generateAccessToken();
	const url = `${baseURL}/v2/checkout/orders`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		},
		body: JSON.stringify({
			intent: 'CAPTURE',
			purchase_units: cart.map((item: any) => ({
				reference_id: item._id,
				name: item.product,
				quantity: item.quantity,
				amount: { currency_code: 'USD', value: item.price }
			}))
		})
	});
	const data = await response.json();
	return data;
}

// use the orders api to capture payment for an order
async function capturePayment(orderId: string) {
	const accessToken = await generateAccessToken();
	const url = `${baseURL}/v2/checkout/orders/${orderId}/capture`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`
		}
	});
	const data = await response.json();
	return data;
}

// generate an access token using client id and app secret
async function generateAccessToken() {
	const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64');
	const response = await fetch(`${baseURL}/v1/oauth2/token`, {
		method: 'POST',
		body: 'grant_type=client_credentials',
		headers: {
			Authorization: `Basic ${auth}`
		}
	});
	const data = await response.json();
	return data.access_token;
}
