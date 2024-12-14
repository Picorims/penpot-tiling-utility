<script lang="ts">
	import { error } from "@sveltejs/kit";

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
		regex
	}: {
		value: string;
		id: string;
		label: string;
		regex?: RegExp;
	} = $props();

    let invalidBounds = $state(false);

    function checkBounds() {
		if (!regex) {
			invalidBounds = false;
			return;
		}
		if (value === null) { // TODO refactor if optional strings should be supported
			invalidBounds = true;
			return;
		}
		const regexInstance = new RegExp(regex);
		if (!regexInstance.test(value.toString())) {
			invalidBounds = true;
		} else {
			invalidBounds = false;
		}
    }
</script>

<div class="input-container">
	<label class="input-label" for={id}>{label}</label>
	<input
		class="input"
        class:error={invalidBounds}
		type="text"
		{id}
		pattern={regex?.source}
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
