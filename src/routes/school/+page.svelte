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
   <h3 class="text-xl sm:text-2xl text-center font-bold py-2 mb-4 pt-20">About (TETI) <br> Tec Electrical Training Institude</h3>
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
    </div>
</div> 