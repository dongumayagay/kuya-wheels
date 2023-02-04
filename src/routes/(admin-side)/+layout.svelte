<script>
    import Navbar from './aNavbar.svelte';
    import { userStore } from '$lib/store.js'
    import { goto } from '$app/navigation'

    $:if( $userStore === null)
    goto("/")

</script>

<svelte:head>
        <title>
            Admin: Kuya Wheels Driving School
        </title>
</svelte:head>
<main>
    <Navbar />

    {#if $userStore === undefined}
        <div>
            <h1>loading</h1>
        </div>
        {:else if $userStore !== undefined && $userStore !== null}
        <slot></slot>
    {/if}
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
</style>