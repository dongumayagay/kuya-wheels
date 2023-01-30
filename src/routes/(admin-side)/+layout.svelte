<script>
    import { userStore } from '$lib/store.js'
</script>

{#if $userStore === undefined}
    <div>
        <h1>loading</h1>
    </div>
    {:else if $userStore !== undefined && $userStore !== null}
    <slot></slot>
{/if}