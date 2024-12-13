<script lang="ts">
	/*
      Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
    
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import { getDefaultRule, pattern } from '$lib/stores/pattern_store.svelte';
	import type { Rule, RuleKind } from '$lib/types/pattern';
	import Checkbox from './atoms/Checkbox.svelte';
	import NumberInput from './atoms/NumberInput.svelte';

	let selectedRule: RuleKind = $state('randomize');

	function addRule() {
		pattern.proxy.rules.push(getDefaultRule(selectedRule));
	}
</script>

<div class="add-rule-container">
	<select id="pattern-type" class="select" bind:value={selectedRule}>
		<option value="randomize">Randomize</option>
	</select>
	<button type="button" data-appearance="primary" onclick={addRule}>Add Rule</button>
</div>

<div class="rule-list">
	{#each pattern.proxy.rules as rule, i}
		<details class="rule">
			<summary>
				<span class="headline-m">{rule.type}</span>
			</summary>

			<div class="details-content">
				<Checkbox id={`rule-${i}-enabled`} label="Enabled" bind:checked={rule.enabled} />

				<button
					type="button"
					data-appearance="primary"
					data-variant="destructive"
					onclick={() => {
						const confirm = window.confirm('Are you sure you want to remove this rule?');
						if (confirm) {
							pattern.proxy.rules.splice(i, 1);
						}
					}}>Remove</button
				>

				{#if rule.type === 'randomize'}
					{@render randomizeRule(rule, i)}
				{/if}
			</div>
		</details>
	{/each}
</div>

{#snippet randomizeRule(rule: Rule, i: number)}
	<select id={`rule-${i}-property`} class="select" bind:value={rule.property}>
		<option value="x">X</option>
		<option value="y">Y</option>
		<option value="width">Width</option>
		<option value="height">Height</option>
		<option value="rotation">Rotation</option>
		<option value="opacity">Opacity</option>
	</select>
	<p>
		A negative value allow to go below the initial value, while a positive value allows to go above
		the initial value. Min and Max are determined by the lowest and highest value provided below.
	</p>
	<NumberInput id={`rule-${i}-from`} label="From" bind:value={rule.from} />
	<NumberInput id={`rule-${i}-to`} label="To" bind:value={rule.to} />
{/snippet}

<style>
	div.add-rule-container {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-16);
		margin-bottom: var(--spacing-16);
	}
	div.rule-list {
		margin-bottom: var(--spacing-16);
	}
	details.rule > summary {
		cursor: pointer;
		> span {
			margin: 0;
			max-width: 80%;
		}
	}
	details.rule > div.details-content {
        padding-left: var(--spacing-16);
        padding-top: var(--spacing-8);
        border-left: 1px solid var(--df-secondary);
	}
</style>
