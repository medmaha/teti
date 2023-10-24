<!-- src/components/ServiceLayout.svelte -->
<script>
</script>

<div class="max-w-[1200px] mx-auto pt-[50px]">
	<h3 class="text-xl sm:text-2xl text-center font-bold py-2 mb-4">Our Services</h3>

	<div
		class="grid md:grid-cols-[600px,300px] lg:grid-cols-[600px,400px] w-max mx-auto gap-4 md:gap-8 lg:gap-12 items-center py-4"
	>
		<div class="order-first md:order-none service">
			<img
				class="w-full h-auto border rounded-md shadow"
				src={'/assets/services/onsite-work-1.jpg'}
				alt={'Services Image'}
			/>
		</div>
		<div class="order-first md:order-none w-full ">
			<p class="text-left dark:text-gray-300 text-gray-800 leading-relaxed text-sm max-w-[45ch]">
				<b>Tec Electrical Company Ltd</b> establishes a prominent industry standard. Whether the project
				is residential, commercial, or industrial, we provide innovative and sustainable electrical services.
				Opting for Tec Electrical Company means selecting excellence in electrical solutions.
			</p>
		</div>
	</div>
	<div
		class="grid mt-4 md:grid-cols-[300px,600px] lg:grid-cols-[400px,600px] w-max mx-auto gap-4 md:gap-8 lg:gap-12 items-center py-4"
	>
		<div class="order-first md:order-none w-full ">
			<p class="text-left dark:text-gray-300 text-gray-800 leading-relaxed text-sm max-w-[45ch]">
				We recognize the importance of clean and renewable energy, which positions us as the
				preferred choice for solar projects in residential, commercial, and industrial settings.
				<b>Tec Electrical Company Ltd</b> is dedicated to efficient and eco-friendly solar installations,
				enabling clients to harness the sun's power for a more sustainable and brighter future.
			</p>
		</div>
		<div class="order-first md:order-none service">
			<img
				class="w-full h-auto border rounded-md shadow  dark:border-gray-600"
				src={'/assets/services/onsite-work-4.jpg'}
				alt={'Services Image'}
			/>
		</div>
	</div>
	<div
		class="grid mt-4 md:grid-cols-[600px,300px] lg:grid-cols-[600px,400px] w-max mx-auto gap-4 md:gap-8 lg:gap-12 items-center py-4"
	>
		<div class="order-first md:order-none service">
			<img
				class="w-full h-auto border rounded-md shadowd dark:border-gray-600"
				src={'/assets/services/surcase-1.jpg'}
				alt={'Services Image'}
			/>
		</div>
		<div class="order-first md:order-none w-full ">
			<p class="text-left dark:text-gray-300 text-gray-800 leading-relaxed text-sm max-w-[45ch]">
				Our dedication to sustainable energy extends to off-grid systems that provide homes and
				businesses with dependable power, no matter where they are located. We offer tailored
				off-grid solutions, guaranteeing uninterrupted access to electricity, even in remote areas.
				If you're looking to gain independence from traditional power sources, <b
					>Tec Electrical Company Ltd</b
				> is your ideal choice
			</p>
		</div>
	</div>

	<div class="flex items-center justify-center pt-8">
		<a href="/services" class="text-primary underline-offset-4 px-1 underline"
			>Explore Our Services Further</a
		>
	</div>
</div>

<style>
	.service {
		position: relative;
	}

	.service::before {
		position: absolute;
		content: '';
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
	}
</style>
