<!-- src/components/Carousel.svelte -->

<script>
  let currentIndex = 0;

  const nextSlide = () => {
    currentIndex = (currentIndex + 1) % images.length;
  };

  const prevSlide = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  };

  let images = [
    'https://thumbs.dreamstime.com/z/portrait-girl-making-photoes-close-up-smiling-hipster-wooden-pier-71862133.jpg?w=992',
    'https://images.unsplash.com/photo-1566275529824-cca6d008f3da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGhvdG98ZW58MHx8MHx8fDA%3D&w=1000&q=80',
    'https://www.shutterstock.com/shutterstock/photos/1094128427/display_1500/stock-photo-the-asian-woman-taking-the-photoes-in-the-public-park-1094128427.jpg',
		
   
    // Add more images as needed
  ];
</script>

<div class="relative w-full h-[300px] overflow-hidden">
  {#each images as image, index (image)}
    <img
      src={`${image}`}
      alt={`Slide ${index + 1}`}
      class="{`absolute w-full h-full transition-opacity duration-500 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}"
    />
  {/each}
  <button class="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 cursor-pointer" on:click={prevSlide}>
    &#9001;
  </button>
  <button class="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 cursor-pointer" on:click={nextSlide}>
    &#9002;
  </button>
</div>
