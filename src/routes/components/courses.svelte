<script lang="ts">
	import { changeActiveLink } from '$lib/helpers/links';

	export let courses: any = [];

	function handleCourseLinkClick() {
		changeActiveLink('courses');
	}
</script>

<div class="max-w-[1200px] mx-auto pt-[50px]">
	<div id="courses" class="w-full pt-[70px] px-2 rounded-t-lg">
		<h3 class="text-xl sm:text-2xl text-center font-bold py-2 mb-4">Our Courses</h3>
		<div class="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4">
			{#each courses as course}
				<div class="text-center">
					<a
						on:click={handleCourseLinkClick}
						href={`/courses/${course.name.replace(/[\s]/, '-').toLowerCase()}`}
						class="block tt-card shadow-xl hover:shadow-2xl p-8 rounded-xl mt-10 text-center"
					>
						<div class="flex items-center justify-center mb-2 h-[70px] mx-auto">
							<img
								class="max-w-[80px]"
								src={`/assets${course.imgUrl}`}
								height="80px"
								alt={'course ' + course.name}
							/>
						</div>
						<div class="flex flex-col items-center gap-1">
							<p class="text-sm font-semibold max-w-[10ch]">{course.name}</p>
							<p
								class="text-sm font-light text-surface-text-muted dark:text-surface-dark-text-muted pt-1"
							>
								+500 students
							</p>
						</div>
						<!-- <p class="texts-sm text-center max-w-[35ch]">
                    {course.description}
                </p> -->
					</a>
				</div>
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
