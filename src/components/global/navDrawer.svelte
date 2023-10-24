<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, scale } from 'svelte/transition';

	import { BasketCart } from '$store/basket';
	import { enhance } from '$app/forms';

	export let toggleDrawer: () => void;

	let element: HTMLDivElement;

	function handleOuterClick(ev: any) {
		const drawerElm =
			ev.target === element ||
			!!ev.target.closest('.nav-drawer') ||
			!!ev.target.closest('[data-drawer-toggler]') ||
			ev.target.hasAttribute('data-drawer-toggler');

		if (!drawerElm) {
			toggleDrawer();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleOuterClick);
		return () => {
			document.removeEventListener('click', handleOuterClick);
		};
	});

	function getCartQty(qty: number): string {
		return qty.toString();
	}

	let timeout: any;

	function handleLinkClick() {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			toggleDrawer();
		}, 250);
	}

	let darkMode: null | boolean = null;

	onMount(() => {
		darkMode = document.querySelector('html')?.dataset.mode === 'dark';
	});

	function toggleTheme() {
		darkMode = !darkMode;
		document.documentElement?.setAttribute('data-mode', darkMode ? 'dark' : 'light');
		setTimeout(() => toggleDrawer(), 500);
	}

	function enhanceThemeSwitcher(event: any) {
		return ({ update }: any) => {
			update();
		};
	}
</script>

<div
	bind:this={element}
	in:fade
	out:scale
	class="md:hidden absolute left-0 top-full h-[calc(100vh-60px)] w-[90%] max-w-[450px] shadow-lg tt-card"
>
	<div class="nav-drawer block w-full h-full border-gray-400 border-r-[2px]">
		<div class="flex w-full justify-center h-full p-2 sm:p-4">
			<ul class=" flex-1 flex flex-col gap-2 w-full dark:text-white">
				<li
					class="active rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/">Home</a>
				</li>
				<li
					class="rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/services">Services</a>
				</li>
				<li
					class="rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/courses">Courses</a>
				</li>
				<li
					class="rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/products">Products</a>
				</li>
				<li
					class="rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/#aboutUs">About</a>
				</li>
				<li
					class="rounded-md relative inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/basket" class="relative inline-flex items-center">
						<span class="pr-4"> Shopping Cart </span>
						<span class="pl-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								width="18"
								height="18"
								viewBox="0 0 24 24"
								><path
									d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
								/></svg
							>
						</span>
						{#if $BasketCart.total > 0}
							<span
								style="transform:translateY(-100%)"
								class="inline-flex min-w-[15px] h-[15px] text-xs rounded-full text-white bg-red-400 p-[5px] justify-center items-center"
							>
								{getCartQty($BasketCart.total)}
							</span>
						{/if}
					</a>
				</li>
				<li class="w-full bg-gray-400 h-[1px] px-8 leading-none" style="padding:0 2em;" />
				<li
					class="rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/blog">Blog</a>
				</li>
				<li
					class="rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/services">Services</a>
				</li>
				<li
					class="rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<a on:click={handleLinkClick} href="/contact">Contact</a>
				</li>
				<li
					class="rounded-md inline-block gap-2 w-full bg-green-500 bg-opacity-0 hover:bg-opacity-80 hover:text-white transition"
				>
					<form method="POST" use:enhance={enhanceThemeSwitcher}>
						<button
							formaction={`/?/theme&theme=${darkMode ? 'dark' : 'light'}`}
							on:click={toggleTheme}
							class="inline-flex items-center gap-4 rounded-full transition w-full"
							>{darkMode ? 'Light Mode' : 'Dark Mode'}<button />
							{#if darkMode !== null}
								<span
									class="w-8 h-8 rounded-full bg-green-500 bg-opacity-10 hover:bg-opacity-20 transition inline-flex justify-center items-center"
								>
									{#if darkMode}
										<svg
											in:scale|local
											xmlns="http://www.w3.org/2000/svg"
											width="20"
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
											width="20"
											fill="currentColor"
											viewBox="0 96 960 960"
											><path
												d="M480 936q-150 0-255-105T120 576q0-150 105-255t255-105q8 0 17 .5t23 1.5q-36 32-56 79t-20 99q0 90 63 153t153 63q52 0 99-18.5t79-51.5q1 12 1.5 19.5t.5 14.5q0 150-105 255T480 936Zm0-60q109 0 190-67.5T771 650q-25 11-53.667 16.5Q688.667 672 660 672q-114.689 0-195.345-80.655Q384 510.689 384 396q0-24 5-51.5t18-62.5q-98 27-162.5 109.5T180 576q0 125 87.5 212.5T480 876Zm-4-297Z"
											/></svg
										>
									{/if}
								</span>
							{/if}
						</button>
					</form>
				</li>
			</ul>
		</div>
	</div>
</div>

<style>
	li > * {
		width: 100%;
		height: 100%;
		display: inline-flex;
		justify-content: flex-start;
		gap: 0.5em;
		align-items: center;
		padding: 0 1em;
	}

	li:hover {
		--tw-bg-opacity: 1;
		color: white;
		box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.3);
	}

	ul li {
		cursor: pointer;
		font-size: large;
		padding: 0.25em 0.5em;
	}

	.nav-drawer {
		transition: background-color 300ms ease;
		/* background-color: rgb(255 255 255 / var(--tw-bg-opacity)); */
		color: #333;
	}
</style>
