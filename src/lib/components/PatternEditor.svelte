<script lang="ts">
	/*
      Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
    
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import { sendMessage } from '$lib/plugin_utils';
	import { locked, pattern } from '$lib/stores/pattern_store.svelte';
	import { UIEvents } from '$lib/types/plugin_events';
	import Checkbox from './atoms/Checkbox.svelte';
	import NumberInput from './atoms/NumberInput.svelte';

	function apply(e: Event) {
		e.preventDefault();
		const snapshot = $state.snapshot(pattern.proxy);
		console.log('pattern changed', snapshot);
		locked.value = true;
		sendMessage({ type: UIEvents.UPDATE_PATTERN, content: snapshot });
	}
</script>

<h2 class="title-m">Pattern editor</h2>

<p>
	<strong>Note:</strong> Changes take effect after pressing on the "Apply" button.
</p>

<form class="form-group container" onsubmit={apply}>
	<label class="select-label" for="pattern-type">Pattern type</label>
	<select id="pattern-type" class="select" bind:value={pattern.proxy.mode}>
		<option value="grid">Grid</option>
		<option value="revolution">Revolution</option>
	</select>
	<NumberInput id="pattern-rows" label="Rows" min={1} bind:value={pattern.proxy.rows} />
	<NumberInput id="pattern-columns" label="Columns" min={1} bind:value={pattern.proxy.columns} />
	{#if pattern.proxy.mode === 'revolution'}
		<NumberInput id="pattern-radius" label="Radius" min={1} bind:value={pattern.proxy.radius} />
		<Checkbox
			id="pattern-type"
			bind:checked={pattern.proxy.rotateAccordingToDirection}
			label={'Rotate according to direction'}
		/>
	{/if}
	<button type="submit" data-appearance="primary" disabled={locked.value}>Apply</button>
	{#if locked.value}
		<p>Loading...</p>
	{/if}
</form>
<pre>{JSON.stringify(pattern.proxy).replaceAll(',', ', ')}</pre>

<style>
	form.container {
		width: 100%;
	}
	h2 {
		margin-bottom: var(--spacing-16);
		font-weight: bold;
		color: var(--da-quaternary);
	}

	p,
	button,
	select {
		margin-bottom: var(--spacing-16);
	}

	label.select-label {
		display: block;
		margin-bottom: var(--spacing-4);
		color: var(--df-secondary);
	}

	pre {
		width: 100%;
		white-space: pre-wrap;
		word-break: keep-all;
		overflow: hidden;
		background-color: var(--db-secondary);
		border: 1px solid var(--db-tertiary);
		padding: var(--spacing-16);
	}
</style>
