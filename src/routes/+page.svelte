<script lang="ts">
	import { onMount } from "svelte";

    /*
      Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
    
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

   function sendPing() {
    parent.postMessage("ping", "*");
   }

   function messageHandler(event: MessageEvent) {
    if (event.data === "pong") {
      console.log("pong received");
    }
   }
   onMount(() => {
    window.addEventListener("message", messageHandler);
   });
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<button onclick={sendPing}>hello world</button>