<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const heading = 'Courses We Offer';
	$: ({ courses } = data);
</script>

<div class="max-w-[1200px] mx-auto pt-[20px]">
	<div id="courses" class="w-full p-4 rounded-t-lg">
		<h3 class="text-xl sm:text-2xl text-center font-semibold py-2 text-opacity-80">{heading}</h3>
		<div class="flex justify-evenly items-center flex-wrap">
			{#each courses as course}
				<a
					href={`/courses/${course.name.replace(/[\s]/, '-').toLowerCase()}`}
					class="flex flex-col max-w-[600px] mt-10"
				>
					<div class="flex items-center justify-center  h-[100px]">
						<img src={`/assets${course.imgUrl}`} width="100px" height="100px" alt="" />
					</div>
					<h5 class="text-center font-semibold">{course.name}</h5>
					<p
						class="text-sm text-center max-w-[45ch] sm:max-w-[35ch] dark:text-slate-300 tracking-wide"
					>
						{course.description}
					</p>
				</a>
			{/each}
		</div>
	</div>
</div>
