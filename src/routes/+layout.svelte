<script>
import Header from './Header.svelte';
import Footer from './Footer.svelte';
import Navbar from './Navbar.svelte';

	// import '../app.postcss';
</script>


<!-- <Header />
<Navbar />
<slot />
<Footer /> -->

<main>
	<Navbar />
	<Header />
	<!-- <hr> -->
	<slot />
	<Footer />
</main>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@300;400&display=swap');

	*{
		font-family: 'Oswald';
		font-weight: 400;
	}

	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		/* background-color: #ff8533; */
		background-color:  #ff944d;
	}
	/* hr{
		width: 95%;
		border-radius: 100%;
		border-color: black;
	} */
</style>
