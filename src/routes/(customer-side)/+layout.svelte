<script>
    import Header from './Header.svelte';
    import Footer from './Footer.svelte';
    import Navbar from './Navbar.svelte';
    
        // import '../app.postcss';
</script>
    
    <svelte:head>
        <title>
            Kuya Wheels Driving School
        </title>
    </svelte:head>
    <main>
        <Header />
        <Navbar />
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
            background-color:  #ff944d;
        }
    </style>
    