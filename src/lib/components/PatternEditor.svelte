<script lang="ts">
	import { sendMessage } from '$lib/plugin_utils';
	/*
      Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
    
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import { pattern } from '$lib/stores/pattern_store.svelte';
	import { UIEvents } from '$lib/types/plugin_events';

	function apply() {
		const snapshot = $state.snapshot(pattern.proxy);
		console.log('pattern changed', snapshot);
		sendMessage({ type: UIEvents.UPDATE_PATTERN, content: snapshot });
	}
</script>

<div class="form-group">
	<label class="select-label" for="pattern-type">Pattern type</label>
	<select id="pattern-type" class="select" bind:value={pattern.proxy.mode}>
		<option value="grid">Grid</option>
		<option value="revolution">Revolution</option>
	</select>
    <button type="button" data-appearance="primary" onclick={apply}>Apply</button>
</div>
<pre>{JSON.stringify(pattern)}</pre>
