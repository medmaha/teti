<script lang="ts">
	import { changeActiveLink } from '$lib/helpers/links';

	export let courses: any = [];

	function handleCourseLinkClick() {
		changeActiveLink('courses');
	}
</script>

<div class="max-w-[1200px] mx-auto pt-[50px]">
	<div id="courses" class="w-full pt-[70px] p-4 rounded-t-lg">
		<h3 class="text-xl sm:text-2xl text-center font-bold py-2 mb-4">Our Courses</h3>
		<div class="flex justify-center gap-4 md:gap-6 items-center flex-wrap max-w-[750px] mx-auto">
			{#each courses as course}
				<a
					on:click={handleCourseLinkClick}
					href={`/courses/${course.name.replace(/[\s]/, '-').toLowerCase()}`}
					class="block tt-card shadow-xl hover:shadow-2xl p-8 rounded-xl max-w-[600px] mt-10"
				>
					<div class="flex items-center justify-center mb-1 h-[70px]">
						<img
							class="max-w-[80px]"
							src={`/assets${course.imgUrl}`}
							height="80px"
							alt={'course ' + course.name}
						/>
					</div>
					<h5 class="text-center text-sm font-semibold max-w-[10ch]">{course.name}</h5>
					<p
						class="text-sm font-light text-surface-text-muted dark:text-surface-dark-text-muted pt-1"
					>
						+500 students
					</p>
					<!-- <p class="texts-sm text-center max-w-[35ch]">
                    {course.description}
                </p> -->
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	a {
		transition: transform 500ms;
	}

	a:hover {
		transform: scale(1.1);
	}
</style>
