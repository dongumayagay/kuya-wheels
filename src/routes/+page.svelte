<script>
    import ExampleComponent from "$lib/components/ExampleComponent.svelte"
    let show = false

    function toggle(){
        show = !show
    }
</script>

<h1>Home page</h1>

<div>
    <button on:click={toggle}>toggle</button>
</div>

<h1>{show}</h1>
{#if show == true}
    <ExampleComponent></ExampleComponent>
    {:else}
    <h1>Esample</h1>
{/if}

<div id="heighttest">
    <p>
        Kyle Deinyel Basquena Kyle Deinyel Basquena Kyle Deinyel Basquena Kyle Deinyel Basquena
    </p>
    
</div>

<style>
    #heighttest {
        border: 1px red solid;
        height: 500px;
    }
</style>