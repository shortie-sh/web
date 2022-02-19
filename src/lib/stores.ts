 import { writable } from 'svelte/store';

const instanceUrl = writable(localStorage.getItem("instance") || "https://www.shortie.sh")

instanceUrl.subscribe((val) => { console.log("saving instance url"); 
localStorage.setItem("instance", val)})

export { instanceUrl }