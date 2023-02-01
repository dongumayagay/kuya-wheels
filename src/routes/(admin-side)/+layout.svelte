<script>
    import { userStore } from '$lib/store.js'
    import { goto } from '$app/navigation'

    $:if( $userStore === null)
    goto("/")

</script>

{#if $userStore === undefined}
    <div>
        <h1>loading</h1>
    </div>
    {:else if $userStore !== undefined && $userStore !== null}
    <slot></slot>
{/if}