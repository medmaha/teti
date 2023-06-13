import { startMongo } from '$db/mongo';

import type { Handle } from '@sveltejs/kit';
import type { Basket } from './store/basket';
('./database/products');

startMongo()
	.then(() => {
		console.log('db connected');
	})
	.catch((error: Error) => {
		console.log(error.message);
	});

interface Locals {
	$basket?: Basket;
	// Add other properties as needed
}

export const handle = (async ({ event, resolve }) => {
	const theme = event.cookies.get('theme') || null;

	const newTheme = event.url.searchParams.get('theme');

	let themeColor: string | null = null;

	if (newTheme && ['dark', 'light'].includes(newTheme)) {
		themeColor = newTheme;
	} else if (theme && ['dark', 'light'].includes(theme)) {
		themeColor = theme;
	}

	if (themeColor) {
		return await resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('data-mode=""', `data-mode="${themeColor}"`);
			}
		});
	}

	return await resolve(event);
}) satisfies Handle;
