<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import Footer from '../components/global/footer.svelte';
	import Navbar from '../components/global/navbar.svelte';
	import Toast from '../lib/toast';
	import type { ToastInterface, ToastOptions } from '../lib/toast';
	import { TetiEvents } from '../store/events';
	import Loading from '../components/UI/Loading.svelte';
	import SvelteNavigator from '../lib/SvelteNavigator.svelte';

	$: AppEvent = $TetiEvents;

	let toastManager: ToastInterface;

	$: if (AppEvent.type === 'alert' && toastManager) {
		const data = AppEvent.data as ToastOptions;
		toastManager.render(data);
	}

	onMount(() => {
		toastManager = new Toast();
	});
</script>

<SvelteNavigator styles={{ backgroundColor: '#18b918', height: 2 }} />

<Navbar />
<main class="w-full block h-full">
	<slot />

	<!-- <Loading /> -->
</main>

<Footer />

<style>
	@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;600;700&display=swap');
</style>
