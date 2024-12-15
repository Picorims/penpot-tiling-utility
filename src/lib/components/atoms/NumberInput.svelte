<script lang="ts">
	import { error } from '@sveltejs/kit';

	/*
      Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
    
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	let {
		value = $bindable(),
		id,
		label,
		min,
		max,
		step
	}: {
		value: number;
		id: string;
		label: string;
		min?: number;
		max?: number;
		step?: number;
	} = $props();

	let invalidBounds = $state(false);

	function checkBounds() {
		invalidBounds = false;
		if (min && value < min) {
			invalidBounds = true;
		}
		if (max && value > max) {
			invalidBounds = true;
		}
	}
</script>

<div class="input-container">
	<label class="input-label" for={id}>{label}</label>
	<input
		class="input"
		class:error={invalidBounds}
		type="number"
		{id}
		{min}
		{max}
		{step}
		bind:value
		oninput={checkBounds}
	/>
</div>

<style>
	div.input-container {
		margin-bottom: var(--spacing-16);
	}

	label.input-label {
		display: block;
		margin-bottom: var(--spacing-4);
		color: var(--df-secondary);
	}
</style>
