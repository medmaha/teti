<!-- src/routes/services.svelte -->
<script>
	import Carousel from './components/Carousel.svelte';

	let services = [
		{
			title: 'Electrical Installations',
			description: 'Expert electrical installations for homes and businesses.'
		},
		{
			title: 'Solar Solutions',
			description: 'Cutting-edge solar solutions for sustainable energy.'
		},
		{
			title: 'Off-Grid Systems',
			description: 'Customized off-grid systems for reliable power anywhere.'
		},
		{
			title: 'Electrical Repairs',
			description: 'Swift and efficient electrical repair services for issues big or small.'
		},
		{
			title: 'Wiring and Rewiring',
			description: 'Professional wiring and rewiring services to ensure safety and functionality.'
		},
		{
			title: 'Energy Efficiency Consultation',
			description: 'Expert advice on optimizing energy use and reducing costs.'
		}
	];
</script>

<!-- <div class="max-w-[1200px] mx-auto py-[20px]">
	<div class="flex flex-col justify-center items-center p-4">
		<p class="leading-none">
			<span title="Under development">
				<svg
					fill="currentColor"
					fill-opacity={0.5}
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					><path
						d="M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z"
					/></svg
				>
			</span>
		</p>
		<p class="text-sm text-gray-700 dark:text-gray-400 font-semibold tracking-wide text-center">
			This page is currently under development!
		</p>
	</div>
</div> -->

<div class="container mx-auto my-8">
	<h1 class="text-4xl font-bold mb-6 text-center pb-8">Our Services</h1>
	<div class="max-w-[800px] mx-auto grid md:grid-cols-2 gap-4 pb-6 mb-4">
		{#each services as service (service.title)}
			<div class="tt-card rounded-lg p-4 shadow-md">
				<h2 class="text-xl font-semibold">{service.title}</h2>
				<p class="text-sm">{service.description}</p>
			</div>
		{/each}
	</div>

	<div class="max-w-[700px] mx-auto border mt-8">
		<Carousel />
	</div>
	<!-- Rest of your component content -->
</div>
