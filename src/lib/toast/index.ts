import { toastContainer, toastTemplate } from './template';

export interface ToastOptions {
	text?: string;
	type?: 'warning' | 'info' | 'success' | 'error' | 'surface';
	position?:
		| 'top-center'
		| 'top-left'
		| 'top-right'
		| 'center'
		| 'bottom-center'
		| 'bottom-left'
		| 'bottom-right';
	closeButton?: boolean;
	duration?: number;
	autoClose?: boolean;
	animationDuration?: number;
}

export interface ToastInterface {
	defaultOptions: () => ToastOptions;
	render: (options: ToastOptions) => void;
	adjustPosition: (options: ToastOptions) => HTMLDivElement;
	makeContainer: () => HTMLDivElement;
}

export default class Toast implements ToastInterface {
	private container: undefined | HTMLDivElement;
	private animationTimeout: undefined | NodeJS.Timeout;

	constructor() {
		this.makeContainer();
	}

	defaultOptions() {
		return {
			text: 'New alert!',
			type: 'info' as ToastOptions['type'],
			position: 'top-center' as ToastOptions['position'],
			duration: 10000,
			autoClose: true,
			closeButton: true,
			animationDuration: 0
		};
	}

	render(options: ToastOptions) {
		const defaultData = this.defaultOptions();
		const data = { ...defaultData, ...options };

		const $toast = document.createElement('div');
		$toast.classList.add(
			...`tt-toast z-[100] px-4 py-2 max-w-[400px] max-h-[400px] rounded-lg tt-${
				data.type === 'info'
					? 'dark:bg-secondary-surface shadow-xl tt-info border-[2px]'
					: ` tt-${data.type} shadow-xl`
			} flex justify-between gap-1`.split(' ')
		);

		$toast.append(toastTemplate(data.text, data.closeButton));

		this.container = this.adjustPosition(data);
		this.container;

		const toastWrapper = document.getElementById('toastElementWrapper');

		if (toastWrapper && toastWrapper?.firstChild)
			toastWrapper.insertBefore($toast, toastWrapper.firstChild);
		else if (toastWrapper) toastWrapper.appendChild($toast);

		$toast.classList.add('open');
		this.autoCloseToast($toast, data);
	}

	autoCloseToast(toast: HTMLDivElement, options: ToastOptions) {
		function remove() {
			toast.classList.remove('open');
			setTimeout(() => {
				if (toast) toast.remove();
			}, 250);
		}

		if (options.autoClose) setTimeout(remove, options.duration as number);

		if (options.closeButton) {
			toast.querySelector('.close-btn')?.addEventListener('click', () => toast.remove());
		}
	}

	adjustPosition(options: ToastOptions) {
		this.container = this.makeContainer();

		console.log(options);
		this.container.removeAttribute('style');

		switch (options.position) {
			case 'center':
				this.container.style.top = '50%';
				this.container.style.left = '50%';
				this.container.style.transform = 'translate(-50%)';
				break;
			case 'top-center':
				this.container.style.top = '100px';
				this.container.style.left = '50%';
				this.container.style.transform = 'translateX(-50%)';
				break;
			case 'top-left':
				this.container.style.top = '100px';
				this.container.style.left = '1em';
				break;
			case 'top-right':
				this.container.style.top = '100px';
				this.container.style.right = '1em';
				break;
			case 'bottom-center':
				this.container.style.bottom = '1em';
				this.container.style.left = '50%';
				this.container.style.transform = 'translateX(-50%)';
				break;
			case 'bottom-left':
				this.container.style.bottom = '1em';
				this.container.style.left = '1em';
				break;
			case 'bottom-right':
				this.container.style.bottom = '1em';
				this.container.style.right = '1em';
				break;
			default:
				break;
		}
		this.container.style.opacity = '1';
		this.container.style.pointerEvents = 'auto';

		return this.container;
	}

	makeContainer(): HTMLDivElement {
		this.container = document.getElementById('toastElementContainer') as HTMLDivElement | undefined;

		if (this.container) return this.container;

		clearTimeout(this.animationTimeout);

		const __container = toastContainer();
		document.body.appendChild(__container);

		this.container = document.getElementById('toastElementContainer') as HTMLDivElement;

		return this.container;
	}
}
