<script lang="ts">
	import { PluginEvents } from '$lib/types/plugin_events';
	/*
  Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
  
  This Source Code Form is subject to the terms of the Mozilla Public
  License, v. 2.0. If a copy of the MPL was not distributed with this
  file, You can obtain one at http://mozilla.org/MPL/2.0/.
  */

	import { onMount } from 'svelte';

	let selectionKind: "one" | "none" | "multiple" | "pattern" = $state("none");

	function sendPing() {
		parent.postMessage('ping', '*');
	}

	function messageHandler(event: MessageEvent) {
		if (event.data === PluginEvents.MULTIPLE_SELECTION) {
			selectionKind = "multiple";
		} else if (event.data === PluginEvents.ONE_SELECTION) {
      selectionKind = "one";
    } else if (event.data === PluginEvents.NO_SELECTION) {
      selectionKind = "none";
    } else if (event.data === PluginEvents.PATTERN_SELECTED) {
      selectionKind = "pattern";
    } else {
      throw new Error("Unknown event type: " + event.data);
    }
	}
	onMount(() => {
		window.addEventListener('message', messageHandler);
	});
</script>

<div class="container">
  <h1 class="title-l">Tiling Utility</h1>
	{#if selectionKind === "none"}
		<p class="body-l">To begin, select an element from which you would like to create a tiling.</p>
		<p class="body-l">Alternatively, select an existing pattern to modify it.</p>
  {:else if selectionKind === "multiple"}
    <p class="body-l">Please only select one element at a time.</p>
  {:else if selectionKind === "one"}
    <p class="body-l">This element can be a pattern source (a copy will be made).</p>
    <button type="button" data-appearance="primary">Create pattern</button>
  {:else if selectionKind === "pattern"}
    <p>TODO!</p>
	{/if}
</div>

<style>
  div.container {
    width: 100vw;
    height: 100vh;
    padding: var(--spacing-24) 0;
    background-color: var(--db-primary);
    color: var(--df-primary);
  }

  h1 {
    margin-bottom: var(--spacing-16);
    font-weight: bold;
    color: var(--da-tertiary);
  }
  p {
    margin-bottom: var(--spacing-16);
  }
</style>