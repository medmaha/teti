<script lang="ts">
	import NavLinks from './navLinks.svelte';

	let d = false;
</script>

<div class="nav z-50 sticky top-[-35px] bg-black bg-opacity-50 backdrop-blur-[2px] hidden md:block">
	<div class="container px-2 md:pr-[.7rem]">
		<a href="/blog" class={`${d ? 'active' : ''}`}> blog </a>
		<a href="/services" class=""> services </a>
		<a href="/contact" class=""> Contact </a>
	</div>
</div>

<style>
	.nav {
		/* background-color: rgba(0,0,0,.5); */
		height: 35px;
		width: 100%;
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		height: 100%;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		gap: 1rem;
	}

	a {
		font-size: small;
		color: #eee;
		text-transform: capitalize;
		padding: 0.15em 0.35em;
		transition: 250ms ease;
	}

	a:hover {
		color: hsl(142, 76%, 46%);
	}
	a.active {
		color: hsl(142, 76%, 55%);
	}
</style>
