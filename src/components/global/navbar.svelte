<script lang="ts">
	import NavDrawer from './navDrawer.svelte';

	import NavLinks from './navLinks.svelte';
	import { changeActiveLink } from '../../lib/helpers/links';
	import { beforeNavigate } from '$app/navigation';
	import type { BeforeNavigate } from '@sveltejs/kit';
	import { BasketCart } from '$store/basket';
	import { TetiEvents } from '$store/events';
	import { onMount } from 'svelte';

	$: navDrawer = false;

	function toggleNavDrawer() {
		navDrawer = !navDrawer;
	}

	async function onNavigationChange(router?: BeforeNavigate, navigation = false) {
		if (navigation && !router?.to) return;
		try {
			const res = await fetch('/api/store', { credentials: 'include' });
			const data = await res.json();
			if (data.basket) BasketCart.update(() => data.basket);
		} catch (error: any) {
			console.error(error?.message);
			TetiEvents.update(() => ({
				type: 'alert',
				data: {
					text: error.message,
					type: 'error',
					position: 'top-center',
					duration: 1000
				}
			}));
		}
	}
	beforeNavigate((router) => {
		if (router) onNavigationChange(router, true);
	});
	onMount(() => {
		onNavigationChange();
	});
</script>

<nav class="h-[60px] sticky top-0 tt-card z-50 shadow-md mb-1">
	<div class="container gap-2 sm:gap-4  px-2">
		<div class="flex gap-2 items-center">
			<a on:click={() => changeActiveLink('home')} href="/" class="inline-flex gap-1 items-center">
				<img
					src="/teti.png"
					width="45px"
					height="45px"
					class="rounded-full"
					alt="TETI (Tec Electrical) logo"
				/>
				<h1 class="text-xl md:text-2xl font-bold tracking-wide">Tec Electrical</h1>
			</a>
		</div>

		<!-- Search bar -->
		<!-- <div class="w-full h-full mobile:flex items-center flex-1 max-w-[350px] hidden">
			<form action="" class="w-full relative">
				<label for="searchBar" class="absolute bottom-0 left-0 h-full inline-block cursor-pointer">
					<span class="inline-flex h-full items-center px-[3px] rounded-bl-md tt-primary">
						<svg
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							><path
								d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
							/></svg
						>
					</span>
				</label>
				<input
					id="searchBar"
					placeholder="Search teti..."
					type="text"
					class="w-full p-1 pl-9 rounded-md bg-transparent rounded-tl-none sm:font-semibold border-[3px] focus:bg-surface dark:focus:bg-surface-dark
					focus:outline-none border-primary focus:border-primary border-t-transparent border-r-transparent transition placeholder:text-surface-text"
				/>
			</form>
		</div> -->

		<div class="flex items-center h-full gap-4">
			<div class="mobile:hidden flex">
				<button title="search" class="hover:text-green-500 transition">
					<svg
						fill="currentColor"
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						><path
							d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
						/></svg
					>
				</button>
			</div>

			<div class="md:hidden relative flex items-center">
				<button
					data-drawer-toggler
					on:click={toggleNavDrawer}
					class={`z-10 ${navDrawer ? 'active' : ''} 
					inline-flex flex-col justify-right items-end gap-[2px] cursor-pointer`}
				>
					<span class="inline-block w-6 h-1 bg-black dark:bg-secondary-text opacity-80" />
					<span class="inline-block w-6 h-1 bg-black dark:bg-secondary-text opacity-80" />
					<span class="inline-block w-6 h-1 bg-black dark:bg-secondary-text opacity-80" />
				</button>
			</div>
			<NavLinks {navDrawer} />
		</div>

		{#if navDrawer}
			<NavDrawer toggleDrawer={toggleNavDrawer} />
		{/if}
	</div>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		width: 100%;
	}
	.container {
		max-width: 1200px;
		margin: 0 auto;
		height: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	#searchBar::placeholder {
		color: var(--on-surface);
		opacity: 0.5;
	}

	[data-drawer-toggler] span {
		transition: 250ms ease-out;
	}

	[data-drawer-toggler].active span {
		background-color: hsl(142, 76%, 46%);
	}
</style>
