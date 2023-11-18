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

<div class="container mx-auto my-8">
	<h1 class="text-4xl font-bold mb-6 text-center pb-8">Our Services</h1>
	<div class="max-w-[700px] mx-auto border my-8">
		<Carousel />
	</div>
	<div class="max-w-[800px] mx-auto grid md:grid-cols-2 gap-4 pt-6 my-4">
		{#each services as service (service.title)}
			<div class="tt-card rounded-lg p-4 shadow-md">
				<h2 class="text-xl font-semibold">{service.title}</h2>
				<p class="text-sm">{service.description}</p>
			</div>
		{/each}
	</div>
</div>
