import { writable } from 'svelte/store';

import type { ToastOptions } from '../lib/toast';

type Currency = { label: string; toDalasis: number; symbol: string };

export interface AppSettingsInterface {
	currency: Currency;
	currencies: Currency[];
}

const data = {
	currency: { label: 'Dalasi', toDalasis: 1, symbol: 'D' },
	currencies: [
		{ label: 'USD', toDalasis: 57, symbol: '$' },
		{ label: 'Euro', toDalasis: 65, symbol: '€' },
		{ label: 'Pound', toDalasis: 70, symbol: '#' },
		{ label: 'Dalasi', toDalasis: 1, symbol: 'D' }
	]
};

export function calculateCurrency(currency: Currency, amount: number | string) {
	amount = Number(amount);
	let sum = 0.0;
	switch (currency.label) {
		case 'Dalasi':
			sum = amount;
			break;

		case 'USD':
		case 'Euro':
		case 'Pound':
			sum = amount * currency.toDalasis;
			break;

		default:
			break;
	}
	return sum.toFixed(2);
}

export const AppSettings = writable<AppSettingsInterface>(data);
