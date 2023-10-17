<!-- src/routes/schools.svelte -->

<script lang="ts">
    import type { PageData } from './$types';
  
    const title = "Tec Electrical Training Institude"

	const heading = 'Courses We Offer';

	export let data: PageData;
	const courses = JSON.parse(data.courses).filter((course:any)=>course.name.replace(/[\s]/, '-').toLowerCase() !== "deutsche-language");

    
</script>

    <div class="pt-10">
        <h3 class="text-3xl text-center font-bold">{title}</h3>
        <p class="text-xl sm:text-2xl text-center py-2 font-semibold text-opacity-80">{heading}</p>
    </div>

<div class="max-w-[1200px] mx-auto pt-[20px]">
	<div id="courses" class="w-full p-4 rounded-t-lg">
		<div class="sm:flex flex-wrap md:gap-10 justify-evenly">
			{#each courses as course}
                <div>
                    <a
                        href={`/courses/${course.name.replace(/[\s]/, '-').toLowerCase()}`}
                        class="flex flex-col max-w-[600px] mt-10"
                    >
                        <div class="flex items-center justify-center  h-[100px]">
                            <img src={`/assets${course.imgUrl}`} width="100px" height="100px" alt="" />
                        </div>
                        <div class="flex flex-col items-center justify-center gap-1">
                            <h5 class="text-center font-semibold">{course.name}</h5>
                            <p class="text-sm text-center max-w-[45ch] dark:text-slate-300 tracking-wide">
                                {course.description}
                            </p>
                        </div>
                    </a>
                </div>
			{/each}
		</div>
	</div>
</div>