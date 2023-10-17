<!-- src/components/ServiceLayout.svelte -->

<script>
 
</script>

<div class="max-w-[1200px] mx-auto pt-[50px]">
    
    <img src={"/headline.jpeg"} alt={"Services Image"} class="mx-auto w-20  mb-4" />
    
    <h3 class="text-xl sm:text-2xl text-center font-bold py-2 mb-4">Our Courses</h3>    

    <div class="grid md:grid-cols-[600px,300px] lg:grid-cols-[600px,400px] w-max mx-auto gap-4 md:gap-8 lg:gap-12 items-center py-4">
        <div class="order-first md:order-none">
            <img class="w-full h-auto border rounded-md shadow" src={"/headline.jpeg"} alt={"Services Image"} />
        </div>
        <div class="order-first md:order-none">
            <p class="text-gray-800 mb-4 text-left">Tec Electrical offers a veriety of technical services</p>   
           <p class="text-left text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni commodi mollitia, voluptatum rerum veritatis quis blanditiis laudantium tempora enim necessitatibus iure iste illum explicabo architecto, dicta repellat aspernatur in quisquam similique distinctio iusto molestiae! Veritatis eius adipisci saepe voluptates cum atque inventore facere tempore molestiae, dolorem placeat, alias repellat autem.
           </p>
        </div>
    </div>
    <div class="grid mt-4 md:grid-cols-[300px,600px] lg:grid-cols-[400px,600px] w-max mx-auto gap-4 md:gap-8 lg:gap-12 items-center py-4">
        <div class="order-first md:order-none">
            <p class="text-gray-800 mb-4 text-left">Tec Electrical offers a veriety of technical services</p>   
           <p class="text-left text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni commodi mollitia, voluptatum rerum veritatis quis blanditiis laudantium tempora enim necessitatibus iure iste illum explicabo architecto, dicta repellat aspernatur in quisquam similique distinctio iusto molestiae! Veritatis eius adipisci saepe voluptates cum atque inventore facere tempore molestiae, dolorem placeat, alias repellat autem.
           </p>
        </div>
        <div class="order-first md:order-none">
            <img class="w-full h-auto border rounded-md shadow" src={"/headline.jpeg"} alt={"Services Image"} />
        </div>
    </div>
    <div class="grid mt-4 md:grid-cols-[600px,300px] lg:grid-cols-[600px,400px] w-max mx-auto gap-4 md:gap-8 lg:gap-12 items-center py-4">
         <div class="order-first md:order-none">
            <img class="w-full h-auto border rounded-md shadow" src={"/headline.jpeg"} alt={"Services Image"} />
        </div>
        <div class="order-first md:order-none">
            <p class="text-gray-800 mb-4 text-left">Tec Electrical offers a veriety of technical services</p>   
           <p class="text-left text-gray-600">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni commodi mollitia, voluptatum rerum veritatis quis blanditiis laudantium tempora enim necessitatibus iure iste illum explicabo architecto, dicta repellat aspernatur in quisquam similique distinctio iusto molestiae! Veritatis eius adipisci saepe voluptates cum atque inventore facere tempore molestiae, dolorem placeat, alias repellat autem.
           </p>
        </div>
       
    </div>

    <div class="flex items-center justify-center pt-4">
         <a href="/services" class="text-primary  hover:underline">Learn More About Our Services</a>
    </div>
</div>
