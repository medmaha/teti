<script lang="ts">
	import { onMount } from 'svelte';

	// let intersecting = false
	// let once = false
	// let container:HTMLElement
	// onMount(() => {
	// 	if (typeof IntersectionObserver !== 'undefined') {
	// 		const rootMargin = `${-200}px ${0}px ${0}px ${0}px`;

	// 		const observer = new IntersectionObserver(entries => {
	//             const navbar = document.querySelector('nav')!

	// 			intersecting = entries[0].isIntersecting;
	// 			if (intersecting && once) {
	// 				observer.unobserve(container);
	// 			}

	//             if (intersecting){
	//                 console.log('intersecting:',intersecting)
	//                 navbar.style.backdropFilter = 'blur(5px)'
	//             }else{
	//                 navbar.style.backdropFilter = ''

	//             }
	// 		}, {
	//             threshold:0.75
	// 			// rootMargin
	// 		});

	// 		observer.observe(container);
	// 		return () => observer.unobserve(container);
	// 	}

	// 	function handler() {
	// 		const bcr = container.getBoundingClientRect();
	// 		intersecting = (
	// 			(bcr.bottom + 0) > 0 &&
	// 			(bcr.right + 0) > 0 &&
	// 			(bcr.top - 0) < window.innerHeight &&
	// 			(bcr.left - 0) < window.innerWidth
	// 		);

	// 		if (intersecting && once) {
	// 			window.removeEventListener('scroll', handler);
	// 		}
	// 	}

	// 	// window.addEventListener('scroll', handler);
	// 	// return () => window.removeEventListener('scroll', handler);
	// });
</script>

<div class="max-w-[1200px] sm:px-2 px-0 flex w-full mx-auto h-full">
	<div
		id="aboutUs"
		class="w-full mt-[-50px] p-4 pt-[70px] pb-14 tt-card shadow-lg z-10 rounded-t-lg rounded-b-none sm:rounded-b-lg"
	>
		<!-- <h3 class="text-xl sm:text-2xl text-center font-bold py-2 mb-4">About TETI</h3>
		<div class="flex justify-center items-center">
			<div class="max-w-[600px]">
				<p class="text-lg leading-relaxed text-center mb-8">
					At TETI, we are more than just a training institute. We are a community of professionals
					who are passionate about sharing our knowledge and expertise with the next generation of
					skilled workers.
				</p>
				<p class="text-lg leading-relaxed text-center mb-8">
					Our courses are designed to be hands-on and practical, so students can gain the skills
					they need to succeed in their careers. Whether you are looking to start a new career in
					the electrical or solar industry, or you need to upgrade your skills to stay competitive,
					we have a course that will fit your needs.
				</p>
				<p class="text-lg leading-relaxed text-center mb-8">
					At TETI, we are committed to providing the highest quality training, using the latest
					technology and industry standards to ensure our students are prepared for success. Join us
					today and see why TETI is the premier training institute for electrical and solar,
					industrial automation, IT basics, sales, and installation of electrical and off-grid
					products.
				</p>
			</div>
		</div> -->
		<div  class="max-w-[600px] mx-auto py-8 px-4">
			<h2 class="text-3xl font-bold mb-6">About TEC Electrical</h2>
			
			<p class="leading-relaxed text-center mb-8">
				Welcome to TEC Electrical, your trusted partner in technical excellence. At TEC Electrical, we don't just offer services; we provide comprehensive solutions to power your projects and innovations.
			</p>

			<h3 class="text-xl font-semibold mb-2">Our Expertise:</h3>
			<p class="leading-relaxed text-center mb-8">
				Harness our technical prowess in electrical and solar solutions, industrial automation and sales expertise. We specialize in seamless installations of electrical and off-grid products, ensuring your projects are powered efficiently and sustainably.
			</p>

			<h3 class="text-xl font-semibold mb-2">Why Choose TEC Electrical:</h3>
			<ul class="list-disc ml-6 text-gray-700 mb-4">
				<li><strong>Cutting-Edge Training:</strong> Our hands-on training equips you with practical skills, enabling you to excel in technical fields.</li>
				<li><strong>Industry-Leading Standards:</strong> We adhere to the latest industry standards and employ cutting-edge technology to ensure top-notch quality in every service we provide.</li>
				<li><strong>Customized Solutions:</strong> Tailored to meet your unique needs, our services are designed to elevate your projects to new heights.</li>
			</ul>
			
			<p class="leading-relaxed text-center mb-8">
				Join us at TEC Electrical, where technical excellence meets innovation. Experience the power of precision and the strength of knowledge in every service we deliver. Power your future with TEC Electrical.
			</p>
		</div>

	</div>
</div>
