import { writable } from 'svelte/store';

import type { ToastOptions } from '../lib/toast';

export interface TetiEventsInterface {
	type: 'alert' | null;
	data: ToastOptions;
}

const data = {
	type: null,
	data: {} as ToastOptions
};

export const TetiEvents = writable<TetiEventsInterface>(data);
