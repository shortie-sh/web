<script lang="ts">
    import { createRedirect, genEnding } from "$lib/Api";
    import SettingsModal from '$lib/SettingsModal.svelte'
    import CopyToast from '$lib/CopyToast.svelte';
    import UnderInputInfo from "$lib/underInputInfo.svelte";
    import { fade } from 'svelte/transition';
    import { instanceUrl } from '$lib/stores';
    import { typewriter } from '$lib/typewriter'
    import { onMount } from "svelte";
    import Head from '$lib/Head.svelte'

    $: apiUrl = $instanceUrl + "/api/graphql"
    
    let instanceObj;
    let inTransitions = {};
    onMount(() => {
        inTransitions = {};
    })
    
    $: {
        try {
            instanceObj = new URL($instanceUrl);
        } catch(e) {}
    }

    $: fullUrl = `${$instanceUrl}/${ending}`
    
    let stage: string = "waiting";
    
    let ending: string = genEnding(6)
    let url: string = null
    let error: Error = null;
    
    let copyToast = false;
    let modalOpen = false;

    function reset() {
        ending = genEnding(6)
        url = null;
        stage = "waiting";
    }
    function sleep(time){
      return new Promise((resolve)=>setTimeout(resolve,time))
    }
    
    function copyUrl() {
        navigator.clipboard.writeText(fullUrl)
        copyToast = true;
        sleep(1000).then(() => {copyToast = false })
    }
    

    async function createRedirectWrapper() {
        const data = await createRedirect(url, ending, apiUrl)
        if(data instanceof Error) {
            error = data;
            stage = "errored";
            throw data;
        } else {
            console.log(data)
            stage = "created";
            return;
        }
    }

    let createRedirectPromise;

    function handleCreateRedirect() {
        createRedirectPromise = createRedirectWrapper()
    }
    
    function handleSubmit() {
        switch(stage) {
            case "waiting":
                stage = "urlSubmitted"
                break;
            case "urlSubmitted":
                stage = "doneSubmitting"
                handleCreateRedirect()
                break;
        }
    }
</script>

<div on:click={() => modalOpen = !modalOpen} id="settings" class="absolute z-50 transition ease-out hover:animate-shortspin dark:fill-kindawhite fill-kindablack bottom-4 right-4">
    <svg xmlns="http://www.w3.org/2000/svg" height="32px" viewBox="0 0 24 24" width="32px">
    <path d="M0 0h24v24H0V0z" fill="none"></path>
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
    </svg>
</div>

<CopyToast show={copyToast}></CopyToast>
<SettingsModal modalOpen={modalOpen} />

<section class="relative flex flex-col items-center justify-center w-screen h-screen overflow-x-hidden bg-kindawhite dark:bg-kindablack ">
    <div class="mb-5 text-center justify-self-center">
        <h1 class="mb-3 text-7xl dark:text-kindawhite"><span class="font-semibold">shortie</span>.sh</h1>
        {#key inTransitions}
            <h2 class="text-xl dark:text-kindawhite" in:typewriter>a very nerdy url shortener</h2>
        {/key}
    </div>
    <div class="flex flex-col w-full h-10 mx-5 md:w-96 justify-self-center">
        <form id="newredirect" class="pb-2 w-full flex-grow " on:submit|preventDefault={handleSubmit}>
            <div class="h-full w-max min-w-full border-2 border-solid border-black dark:border-kindawhite p-1.5 drop-shadow-xl bg-kindawhite dark:bg-black dark:text-kindawhite text-kindablack flex flex-row justify-center flex-grow">
                {#if stage == "waiting"}
                    <input in:fade="{{delay: 250, duration: 300}}" class="inline w-full h-full text-center bg-transparent outline-none" id="url" type="text" placeholder="enter url here" autocomplete="off" bind:value={url}>
                {:else if stage == "urlSubmitted"}
                    {#key instanceObj}
                        <span in:fade="{{delay: 250, duration: 300}}" id="shortie-url" class="w-fit text-opacity-70 opacity-70 ml-2 self-center justify-self-center">{instanceObj.host}/</span>
                        <input in:fade="{{delay: 250, duration: 300}}" bind:value={ending} class="inline h-full text-left bg-transparent outline-none w-min pr-1" id="url" placeholder="enter custom ending" autocomplete="off" data-ending="false" size="14">
                        <input in:fade="{{delay: 250, duration: 300}}" type="submit" value="->" class="px-2 border-2 border-white cli-font hover:bg-kindawhite hover:bg-opacity-25 mr-2">
                    {/key}
                {:else if stage == 'doneSubmitting' || stage == "created" || stage == "errored"}
                    {#await createRedirectPromise}
                        <input in:fade="{{delay: 250, duration: 300}}" class="inline w-full h-full text-center bg-transparent outline-none" id="url" type="text" placeholder="enter url here" autocomplete="off"  disabled={true} value="creating...">
                    {:then data}
                        <label in:fade="{{delay: 250, duration: 300}}" class="w-full h-full underline cursor-pointer"> <input class="inline w-full h-full text-center underline bg-transparent outline-none cursor-pointer" id="url" type="text" placeholder="enter url here" autocomplete="off" readonly={true} value="{fullUrl}" on:click={copyUrl}></label>
                    {:catch error}
                        <input in:fade="{{delay: 250, duration: 300}}" class="inline w-full h-full text-center bg-transparent outline-none text-red" id="url" type="text" placeholder="enter url here" autocomplete="off" disabled={true} value={error}>
                    {/await}
                {/if}
            </div>
        </form>
        {#if stage == "created" || stage == "errored"}
            <UnderInputInfo status="created" on:click={reset} />  
        {:else}
            <UnderInputInfo status="default" />
        {/if}
        <p class="absolute bottom-0 block text-center -translate-x-1/2 -translate-y-1/2 left-1/2 dark:text-kindawhite">also check out our amazing <a id="graphql" target="_blank" class="underline cli-font" href="https://shortie.sh/api/graphql">GraphQL</a> and <a id="rest" target="_blank" class="underline cli-font" href="https://shortie.sh/api/rest/openapi.yml">REST</a> APIs! </p>
    </div>
</section>

<style>
    * {
        font-family: 'NHG'
    }

    h2, .cli-font, a {
        font-family: 'Roboto Mono'
    }
</style>