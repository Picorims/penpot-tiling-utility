<script lang="ts">
	/*
      Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
    
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	let {
		checked = $bindable(),
		id,
		label
	}: { checked: boolean; id: string; label: string } = $props();
</script>

<div class="checkbox-container">
	<input class="checkbox-input" type="checkbox" {id} value={id} bind:checked />
	<label for={id} class="body-small">{label}</label>
</div>

<style>
    .checkbox-container {
        margin-bottom: var(--spacing-16);
    }
</style>