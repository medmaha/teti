<script lang="ts">
	import ApplicationForm from '../components/ApplicationForm.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ course } = data);

	$: applyCourse = false;

	function applyForCourse() {
		applyCourse = !applyCourse;
	}
</script>

{#if applyCourse}
	<ApplicationForm {applyForCourse} />
{/if}

<div class="max-w-[1200px] mx-auto">
	<script
		src="https://www.paypal.com/sdk/js?client-id=Ac8Y26JD9Wu3rgUW7rsiPNtYFgSD7mgAq3KRXzK3cbxKY7jJ1KKQhsrMSshJPuz0SeRseQSdpvTpUFef&currency=USD"
	></script>

	<div id="courses" class="w-full px-1 sm:p-0">
		<div class="p-4">
			<h5 class="text-center font-semibold text-lg md:text-2xl">{course.name}</h5>
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
							<label for="level" class=" inline-block">Level:</label>
							<b>
								<select
									id="level"
									class="bg-transparent dark:focus:bg-slate-600 inline-block cursor-pointer"
								>
									<option value="Certificate">Certificate</option>
									<option value="Diploma">Diploma</option>
									<option value="Advance">Advance</option>
								</select>
							</b>
						</div>
						<div class="flex items-center gap-[.5em]">
							<span>Price:</span>
							<span class="font-semibold">D6,700.00</span>
						</div>
					</div>
					<div class="flex items-center pl-4">
						<button
							on:click={applyForCourse}
							class="bg-primary opacity-90 transition hover:opacity-100 rounded-md px-6 py-2 text-white shadow"
							>Apply Now!</button
						>
					</div>
				</div>
			</div>

			<div class="grid grid-cols-[1fr] sm:grid-cols-[1fr,1fr] lg:grid-cols-[1fr,1fr,1fr] gap-4 p-4">
				<div class="w-full flex justify-center flex-col items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Objectives</h3>
					<ul class="mobile:pl-6">
						{#each course.objectives as objective}
							<li class="list-disc text-sm max-w-full">{objective}</li>
						{/each}
					</ul>
				</div>
				<div class="w-full flex flex-col sm:items-start items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Prerequisites</h3>
					<ul class="mobile:pl-6">
						<li class="list-disc text-sm max-w-full">Adequate english language</li>
						<li class="list-disc text-sm max-w-full">At least grade 9 certificate</li>
						<li class="list-disc text-sm max-w-full">Familiarity with mathematics</li>
						<li class="list-disc text-sm max-w-full">Commitment to completion</li>
					</ul>
				</div>

				<div class="w-full flex justify-center flex-col items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Topics</h3>
					<ul class="mobile:pl-6">
						{#each course.objectives as objective}
							<li class="list-disc text-sm max-w-full ">{objective}</li>
						{/each}
					</ul>
				</div>
				<div class="w-full flex justify-center flex-col items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Price</h3>
					<ul class="mobile:pl-6">
						{#each course.objectives as objective}
							<li class="list-disc text-sm max-w-full">{objective}</li>
						{/each}
					</ul>
				</div>
				<div class="w-full flex flex-col sm:items-start items-center">
					<h3 class="font-semibold tracking-wide self-center sm:self-start">Duration</h3>
					<ul class="mobile:pl-6">
						<li class="list-disc text-sm max-w-full">
							3 months <span class="text-xs pl-2 dark:text-gray-400 text-gray-700"
								>3 lessons a week</span
							>
						</li>
						<li class="list-disc text-sm max-w-full sm:max-w-[30ch] md:max-w-[35ch]">
							6 months <span class="text-xs pl-2 dark:text-gray-400 text-gray-700"
								>3/4 lessons a week</span
							>
						</li>
						<li class="list-disc text-sm max-w-full sm:max-w-[30ch] md:max-w-[35ch]">
							9 months <span class="text-xs pl-2 dark:text-gray-400 text-gray-700"
								>3/5 lessons a week</span
							>
						</li>
					</ul>
				</div>
			</div>
			<div class="flex justify-center p-2 pb-4">
				<button
					on:click={applyForCourse}
					class="bg-primary opacity-90 transition hover:opacity-100 rounded-md px-6 py-2 text-white shadow"
					>Apply Now!</button
				>
			</div>
		</div>
	</div>
</div>
