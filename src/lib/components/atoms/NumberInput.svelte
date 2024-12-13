<script lang="ts">
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

	function enforceBounds() {
		if (min && value < min) {
			value = min;
		}
		if (max && value > max) {
			value = max;
		}
	}
</script>

<div class="input-container">
	<label class="input-label" for={id}>{label}</label>
	<input
		class="input"
		type="number"
		{id}
		{min}
		{max}
		{step}
		bind:value
		onfocusout={enforceBounds}
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
