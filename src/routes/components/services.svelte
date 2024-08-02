<!-- src/components/ServiceLayout.svelte -->
<script>
</script>

<div class="max-w-[1000px] mx-auto pt-[50px]">
	<h3 class="text-xl sm:text-2xl text-center font-bold py-2 mb-4">Our Services</h3>

	<div
		class="grid grid-cols-1 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px] gap-4 md:gap-8 lg:gap-12 items-center p-4"
	>
		<div class="block service">
			<img
				class="h-auto w-full border rounded-md shadow object-cover dark:border-gray-600"
				src={'/assets/services/onsite-work-1.jpg'}
				alt={'Services Image'}
			/>
		</div>

		<p class="text-left dark:text-gray-300 text-gray-800 leading-relaxed max-w-[45ch] pt-4 md:pt-0">
			<b>Tec Electrical Company Ltd</b> establishes a prominent industry standard. Whether the project
			is residential, commercial, or industrial, we provide innovative and sustainable electrical services.
			Opting for Tec Electrical Company means selecting excellence in electrical solutions.
		</p>
	</div>
	<div
		class="grid grid-cols-1 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px] gap-4 md:gap-8 lg:gap-12 items-center p-4"
	>
		<p
			class="text-left dark:text-gray-300 text-gray-800 leading-relaxed text-sm max-w-[45ch] pt-4 md:pt-0"
		>
			We recognize the importance of clean and renewable energy, which positions us as the preferred
			choice for solar projects in residential, commercial, and industrial settings.
			<b>Tec Electrical Company Ltd</b> is dedicated to efficient and eco-friendly solar installations,
			enabling clients to harness the sun's power for a more sustainable and brighter future.
		</p>

		<div class="block service order-first md:order-last">
			<img
				class="w-full h-auto border rounded-md shadow block dark:border-gray-600 object-cover "
				src={'/assets/services/onsite-work-4.jpg'}
				alt={'Services Image'}
			/>
		</div>
	</div>

	<div
		class="grid grid-cols-1 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px] gap-4 md:gap-8 lg:gap-12 items-center p-4"
	>
		<div class="block service">
			<img
				class="h-auto w-full border rounded-md shadow object-cover dark:border-gray-600"
				src={'/assets/services/teti-work-2.jpg'}
				alt={'Services Image'}
			/>
		</div>

		<p class="text-left dark:text-gray-300 text-gray-800 leading-relaxed max-w-[45ch] pt-4 md:pt-0">
			Our team of experienced technicians will ensure your electrical
			systems are always operating at their best. From routine maintenance to emergency repairs, we have the expertise
			and equipment to get the job done quickly and efficiently.
		</p>
	</div>
	<div
	class="grid grid-cols-1 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px] gap-4 md:gap-8 lg:gap-12 items-center p-4"
>
	<p
		class="text-left dark:text-gray-300 text-gray-800 leading-relaxed text-sm max-w-[45ch] pt-4 md:pt-0"
	>
		<b>Tec Electrical Company Ltd</b> is committed to providing reliable and cost-effective electrical
		solutions to our clients. We strive to exceed our clients' expectations, providing them with
		the highest quality of service.
	</p>

	<div class="block service order-first md:order-last">
		<img
			class="w-full h-auto border rounded-md shadow block dark:border-gray-600 object-cover "
			src={'/assets/services/teti-work-1.jpg'}
			alt={'Services Image'}
		/>
	</div>
</div>
	<div
		class="grid grid-cols-1 md:grid-cols-[1fr,300px] lg:grid-cols-[1fr,400px] gap-4 md:gap-8 lg:gap-12 items-center p-4"
	>
		<div class="block service">
			<img
				class="w-full h-auto border rounded-md block shadowd dark:border-gray-600 object-cover"
				src={'/assets/services/surcase-1.jpg'}
				alt={'Services Image'}
			/>
		</div>
		<p
			class="text-left dark:text-gray-300 text-gray-800 leading-relaxed text-sm max-w-[45ch] pt-4 md:pt-0"
		>
			Our dedication to sustainable energy extends to off-grid systems that provide homes and
			businesses with dependable power, no matter where they are located. We offer tailored off-grid
			solutions, guaranteeing uninterrupted access to electricity, even in remote areas. If you're
			looking to gain independence from traditional power sources, <b>Tec Electrical Company Ltd</b>
			is your ideal choice
		</p>
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
