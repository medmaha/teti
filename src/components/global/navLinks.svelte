<script lang="ts">
	import { BasketCart } from '$store/basket';
	import { onMount } from 'svelte';
	import { changeActiveLink, type TargetLinkHref } from '$lib/helpers/links';

	import ShoppingCart from './ShoppingCart.svelte';
	import { fade, scale } from 'svelte/transition';
	import { enhance } from '$app/forms';

	export let navDrawer: boolean;

	onMount(() => {
		const activateLink = (localStorage.getItem('activeLink') || 'home') as TargetLinkHref;
		changeActiveLink(activateLink, false);
	});

	let timeout: any;
	let activeHref: string = '';

	const navigate = (ev: any) => {
		const href: string = ev.currentTarget.href;

		const pathName = window.location.pathname;
		activeHref = href;

		if (pathName === '/' && href.match(/#/)) {
			ev.preventDefault();
			activeHref = href.split('#')[1];

			const targetElement = document.getElementById(activeHref);
			targetElement?.scrollIntoView({ behavior: 'smooth' });
			sleepNavigate(ev);
		} else if (href.match(/#/)) {
			// activeHref = href.split('#')[1];
			_changeActiveLink(ev);
		} else {
			window.location.href = href;
		}
	};

	function sleepNavigate(ev: any, ms = 500) {
		if (timeout) clearTimeout(timeout);

		const targetLink = _changeActiveLink(ev, false);

		timeout = setTimeout(() => {
			window.history.pushState({}, '', activeHref);
			targetLink.classList.add('activeLink');
			if (navDrawer) {
				navDrawer = !navDrawer;
			}
		}, ms);
	}

	function _changeActiveLink(ev: any, activate: boolean = true) {
		const links = ev.currentTarget.closest('ul');
		const activeLink = links?.querySelector('.activeLink');

		if (activeLink) activeLink.classList.remove('activeLink');

		const targetLink = ev.currentTarget.closest('li');

		if (targetLink && activate) {
			targetLink.classList.add('activeLink');
			localStorage.setItem('activeLink', targetLink.dataset.href);
		} else return targetLink;
	}

	let darkMode: null | boolean = null;

	onMount(() => {
		darkMode = document.querySelector('html')?.dataset.mode === 'dark';
	});

	function enhanceThemeSwitcher(event: any) {
		return ({ update }: any) => {
			update();
		};
	}
</script>

<div class={`flex h-full items-center pl-2 lg:pl-8 relative ${$BasketCart.total > 0 && 'pr-2'}`}>
	<div class="h-full hidden md:block">
		<ul class="h-[95%] flex items-center justify-between lg:ml-2">
			<li data-href="home" class="h-full flex items-center">
				<a on:click={_changeActiveLink} href="/" class="px-1 md:px-2 lg:px-4 text-sm">Home</a>
			</li>

			<li data-href="courses" class="h-full flex items-center">
				<a on:click={_changeActiveLink} href="/courses" class="px-1 md:px-2 lg:px-4 text-sm"
					>Courses</a
				>
			</li>

			<li data-href="products" class="h-full flex items-center">
				<a on:click={_changeActiveLink} href="/products" class="px-1 md:px-2 lg:px-4 text-sm"
					>Products</a
				>
			</li>

			<li data-href="aboutUs" class="h-full flex items-center">
				<a on:click={_changeActiveLink} href="/contact" class="px-1 md:px-2 lg:px-4 text-sm"
					>Contact</a
				>
			</li>
			<li data-href="aboutUs" class="h-full flex items-center">
				<a on:click={navigate} href="/#aboutUs" class="px-1 md:px-2 lg:px-4 text-sm">About</a>
			</li>
		</ul>
	</div>

	<ShoppingCart />

	<form use:enhance={enhanceThemeSwitcher} method="POST" class="pl-4 lg:pl-8 hidden md:flex">
		<input type="hidden" name="darkMode" value={darkMode} />
		{#if darkMode !== null}
			<button
				formaction={`/?/theme&theme=${darkMode ? 'dark' : 'light'}`}
				on:click={() => {
					darkMode = !darkMode;
					document.documentElement?.setAttribute('data-mode', darkMode ? 'dark' : 'light');
				}}
				title={darkMode ? 'Light Mode' : 'Night Mode'}
				class="w-8 h-8 rounded-full bg-green-500 bg-opacity-10 hover:bg-opacity-20 transition inline-flex justify-center items-center"
			>
				{#if darkMode}
					<svg
						in:scale|local
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						fill="currentColor"
						viewBox="0 0 24 24"
						><path
							d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"
						/></svg
					>
				{:else}
					<svg
						in:scale|local
						xmlns="http://www.w3.org/2000/svg"
						height="18"
						width="18"
						fill="currentColor"
						viewBox="0 96 960 960"
						><path
							d="M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480 936Zm0-60q109 0 190-67.5T771 650q-25 11-53.667 16.5Q688.667 672 660 672q-114.689 0-195.345-80.655Q384 510.689 384 396q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180 576q0 125 87.5 212.5T480 876Zm-4-297Z"
						/></svg
					>
				{/if}
			</button>
		{/if}
	</form>
</div>

<style>
	li {
		position: relative;
		justify-content: center;
		transition: color 300ms;
	}

	li::after {
		position: absolute;
		content: '';
		width: 100%;
		bottom: 0;
		height: 10px;
		border-bottom-left-radius: 1em;
		border-bottom-right-radius: 1em;
		opacity: 0;
		pointer-events: none;
		transition: opacity 300ms;
	}
	:global(ul .activeLink::after) {
		background: var(--primary);
		opacity: 1;
	}
</style>
