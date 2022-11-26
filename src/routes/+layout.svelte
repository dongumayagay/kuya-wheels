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
	<Header />
	<Navbar />
	<slot />
	<Footer />
</main>

<style>
	main {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
</style>
