<script lang="ts" type="module">
import { fly } from 'svelte/transition';
import { circOut } from 'svelte/easing';
import { instanceUrl } from '$lib/stores'
export { modalOpen };

let modalOpen: boolean;
let ephemeralInstanceUrl: string = $instanceUrl;

function saveUrl() {
    $instanceUrl = ephemeralInstanceUrl;
    modalOpen = false;
}

function cancelUrl() {
    ephemeralInstanceUrl = $instanceUrl;
    modalOpen = false;
}

</script>

{#if modalOpen}
    <div id="settingsModal"  transition:fly="{{delay: 0, duration: 450, x: 1000, y: 500, opacity: 0.25, easing: circOut}}" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
        <div class="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white border-2 border-solid rounded-lg dark:bg-black border-opacity-20z border-kindablack dark:border-kindawhite shadow-x sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="px-4 pt-5 pb-4 bg-kindawhite dark:bg-kindablack sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg font-medium leading-6 text-kindablack dark:text-kindawhite" id="modal-title">
                    Change instance
                </h3>
                <div class="mt-2">
                    <p class="text-sm text-kindablack dark:text-kindawhite">
                    Set your default instance of shortie
                    </p>
                    <input id="settingsModalUrl" class="px-1 py-0.5 mt-3 bg-transparent border-2 border-solid rounded border-kindablack text-kindablack dark:border-kindawhite dark:text-kindawhite" autocomplete="off" bind:value={ephemeralInstanceUrl}>
                </div>
                </div>
            </div>
            </div>
            <div class="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" id="settingsModalSave" class="inline-flex justify-center w-full px-4 py-2 text-base font-medium bg-red-600 border border-transparent rounded-md shadow-sm text-kindawhite dark:text-kindablack bg-kindablack dark:bg-kindawhite hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm" on:click={saveUrl}>
                Save
            </button>
            <button type="button" class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium rounded-md shadow-sm text-kindablack dark:text-kindawhite dark:bg-kindablack bg-kindawhite hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" on:click={cancelUrl}>
                Cancel
            </button>
            </div>
        </div>
        </div>
    </div>
{/if}