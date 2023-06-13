import type { RequestHandler } from './$types';

import { PAYPAL_CLIENT_SECRET, PAYPAL_CLIENT_ID } from '$env/static/private';

export const GET: RequestHandler = async () => {
	console.log('PAYPAL_CLIENT_ID:', PAYPAL_CLIENT_ID);
	console.log('PAYPAL_CLIENT_SECRET:', PAYPAL_CLIENT_SECRET);
	return new Response();
};
