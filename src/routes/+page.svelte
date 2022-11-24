<script>
    import ExampleComponent from "$lib/components/ExampleComponent.svelte"
    let show = false

    function toggle(){
        show = !show
    }
</script>

<h1>Home page</h1>
<button on:click={toggle}>toggle</button>
<h1>{show}</h1>
{#if show == true}
    <ExampleComponent></ExampleComponent>
    {:else}
    <h1>Esample</h1>
{/if}

