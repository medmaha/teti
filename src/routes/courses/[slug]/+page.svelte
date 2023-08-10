<script lang="ts">
	import type { CourseInterface } from '../../../database/courses';
	import ApplicationForm from '../components/ApplicationForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const course: CourseInterface = JSON.parse(data.payload);

	$: applyCourse = false;
	console.log(course);

	function applyForCourse() {
		applyCourse = !applyCourse;
	}
</script>

{#if applyCourse}
	<ApplicationForm {applyForCourse} title={course.name} price={course.formPrice} />
{/if}

<div class="max-w-[1200px] mx-auto">
	<script
		src="https://www.paypal.com/sdk/js?client-id=Ac8Y26JD9Wu3rgUW7rsiPNtYFgSD7mgAq3KRXzK3cbxKY7jJ1KKQhsrMSshJPuz0SeRseQSdpvTpUFef&currency=USD"
	></script>

	<div id="courses" class="w-full px-1 sm:p-0">
		<div class="p-4">
			<h2 class="text-center font-semibold text-lg md:text-2xl">{course.name}</h2>
			<div class="flex justify-center flex-wrap px-2 sm:px-0">
				<div
					class="flex gap-4 flex-col sm:flex-row items-center justify-center w-full max-w-[1200px]"
				>
					<div class="flex items-start justify-center">
						<img src={`/assets${course?.imgUrl}`} width="150px" alt="courses" />
					</div>
					<div class="h-full flex-1 max-w-max flex items-center justify-center flex-col">
						<p class="text-sm sm:text-base text-center sm:text-left w-full max-w-[60ch]">
							{course?.description}
						</p>
					</div>
				</div>
			</div>
		</div>
		<div class="sm:px-4 px-2">
			<div class="w-full tt-card shadow-lg py-2  mb-2">
				<div
					class="flex max-w-[700px] mobile:gap-2 gap-8 justify-center mx-auto flex-wrap items-center"
				>
					<div class="inline-flex gap-8 justify-around flex-wrap items-center">
						<div class="flex items-center gap-[.5em]">
							<span>Price:</span>
							<span class="font-semibold"
								>D{course.price[course.price.length - 2].amount.toFixed(2)}</span
							>
						</div>
					</div>
					<div class="flex items-center pl-4">
						<button
							on:click={applyForCourse}
							class="bg-primary opacity-90 transition hover:opacity-100 rounded-md px-6 py-2 text-white shadow font-semibold tracking-wide"
							>Apply Now!</button
						>
					</div>
				</div>
			</div>

			<div
				class="grid grid-cols-[1fr] sm:grid-cols-[1fr,1fr] md:grid-cols-[1fr,1fr,1fr] gap-4 md:gap-6 p-4"
			>
				<div class="w-max flex flex-col sm:items-start items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Prerequisites</h3>
					<ul class="mobile:pl-6">
						{#each course.prerequisites as pre}
							<li class="list-disc text-sm max-w-full">{pre}</li>
						{/each}
					</ul>
				</div>

				<div class="w-max flex flex-col sm:items-start items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Certification</h3>
					<ul class="mobile:pl-6">
						{#each course.certification as certificate}
							<li class="list-disc text-sm max-w-full">{certificate}</li>
						{/each}
					</ul>
				</div>
				<div class="w-max flex flex-col sm:items-start items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Price</h3>
					<ul class="mobile:pl-6">
						{#each course.price as price}
							<li class="list-disc text-sm max-w-full">
								<span>D{price.amount.toFixed(2)}</span>
								<span class="text-xs pl-2 dark:text-gray-400 text-gray-700">{price.durable}</span>
							</li>
						{/each}
					</ul>
				</div>
				<div class="w-max flex flex-col sm:items-start items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Duration</h3>
					<ul class="mobile:pl-6">
						{#each course.duration as duration}
							<li class="list-disc text-sm max-w-full">
								<span>{duration.time}</span>
								<span class="text-xs pl-2 dark:text-gray-400 text-gray-700">{duration.lessons}</span
								>
							</li>
						{/each}
					</ul>
				</div>
				<div class="w-max flex flex-col sm:items-start items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Objectives</h3>
					<ul class="mobile:pl-6">
						{#each course.objectives as objective}
							<li class="list-disc text-sm max-w-[40ch]">{objective}</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	h3,
	h2,
	p,
	li,
	span {
		letter-spacing: 0.025em;
	}
</style>
