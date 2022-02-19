<script lang="ts" type="module">
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';
    const dispatch = createEventDispatcher();
    
    let status: string;
    
    export { status }
</script>

{#if status == "default"}
    <p in:fade="{{delay: 250, duration: 300}}" out:fade="{{delay: 250, duration: 300}}" on:click="{() => dispatch('click')}" id="below-newurl" class="text-center dark:text-kindawhite">or use our command line tool <a class="bg-kindablack dark:bg-kindawhite text-kindawhite dark:text-kindablack px-0.5 underline cursor-pointer cli-font" href="https://github.com/shortie-sh/cli" target="blank">shortie</a></p>
{:else if status == "created"}
    <p in:fade="{{delay: 250, duration: 300}}" out:fade="{{delay: 250, duration: 300}}" on:click="{() => dispatch('click')}" id="below-newurl" class="text-center underline cursor-pointer dark:text-kindawhite">create another redirect?</p>
{/if}