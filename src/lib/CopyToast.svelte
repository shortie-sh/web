<script lang="ts" type="module">
    import { blur } from 'svelte/transition';
    export { show };
    let show: boolean;
</script>

{#if show}
    <div transition:blur="{{amount: 2}}" id="copy-toast" class="absolute top-5 right-10 border-2 dark:border-kindawhite border-kindablack w-80 h-[4.5rem] pt-[0.5rem] pl-2 dark:bg-black z-50">
        <h1 class="text-xl font-semibold text-kindablack dark:text-kindawhite">copied to clipboard</h1>
        <p class="text-kindablack dark:text-kindawhite">copied redirect url to clipboard</p>
    </div>
{/if}