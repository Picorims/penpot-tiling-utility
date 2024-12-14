<script lang="ts">
	/*
      Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
    
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	import { getDefaultRule, pattern } from '$lib/stores/pattern_store.svelte';
	import type { OffsetRule, RandomRule, Rule, RuleKind } from '$lib/types/pattern';
	import Checkbox from './atoms/Checkbox.svelte';
	import NumberInput from './atoms/NumberInput.svelte';
	import StringInput from './atoms/StringInput.svelte';

	let selectedRule: RuleKind = $state('randomize');

	function addRule() {
		pattern.proxy.rules.push(getDefaultRule(selectedRule));
	}
</script>

<div class="add-rule-container">
	<p>
		<strong>Note:</strong> The plugin is currently unable to adjust the frame size based on rules. Disabling
		clipping might be necessary to see the full pattern. You can also manually resize the frame, although
		currently this will be overridden every time you apply changes.
	</p>
	<select id="pattern-type" class="select" bind:value={selectedRule}>
		<option value="randomize">Randomize</option>
		<option value="offset">Offset</option>
	</select>
	<button type="button" data-appearance="primary" onclick={addRule}>Add Rule</button>
</div>

<div class="rule-list">
	{#each pattern.proxy.rules as rule, i}
		<details class="rule">
			<summary>
				<span class="headline-m">{rule.type}</span>
				<span class="body-m">{rule.name}</span>
			</summary>

			<div class="details-content">
				<Checkbox id={`rule-${i}-enabled`} label="Enabled" bind:checked={rule.enabled} />

				<button
					type="button"
					data-appearance="primary"
					onclick={() => {
						if (i === 0) return;
						const temp = pattern.proxy.rules[i];
						pattern.proxy.rules[i] = pattern.proxy.rules[i - 1];
						pattern.proxy.rules[i - 1] = temp;
					}}
					disabled={i === 0}>Move Up</button
				>
				<button
					type="button"
					data-appearance="primary"
					onclick={() => {
						if (i === pattern.proxy.rules.length - 1) return;
						const temp = pattern.proxy.rules[i];
						pattern.proxy.rules[i] = pattern.proxy.rules[i + 1];
						pattern.proxy.rules[i + 1] = temp;
					}}
					disabled={i === pattern.proxy.rules.length - 1}>Move Down</button
				>
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

				<StringInput
					id={`rule-${i}-name`}
					label="Name"
					regex={new RegExp(/^[-A-Za-z0-9 _]+$/g)}
					bind:value={rule.name}
				/>

				{#if rule.type === 'randomize'}
					{@render randomizeRule(rule, i)}
				{:else if rule.type === 'offset'}
					{@render offsetRule(rule, i)}
				{/if}
			</div>
		</details>
	{/each}
</div>

{#snippet randomizeRule(rule: RandomRule, i: number)}
	<select id={`rule-${i}-property`} class="select" bind:value={rule.property}>
		<option value="x">X</option>
		<option value="y">Y</option>
		<option value="width">Width</option>
		<option value="height">Height</option>
		<option value="rotation">Rotation</option>
	</select>
	<p>
		A negative value allow to go below the initial value, while a positive value allows to go above
		the initial value. Min and Max are determined by the lowest and highest value provided below.
	</p>
	<NumberInput id={`rule-${i}-from`} label="From" bind:value={rule.from} />
	<NumberInput id={`rule-${i}-to`} label="To" bind:value={rule.to} />
{/snippet}

{#snippet offsetRule(rule: OffsetRule, i: number)}
	<p>
		<strong>Note:</strong> This rule currently has no effect on revolution mode.
	</p>
	<label for={`rule-${i}-property`}>Property</label>
	<select id={`rule-${i}-property`} class="select" bind:value={rule.property}>
		<option value="x">X</option>
		<option value="y">Y</option>
	</select>
	<p>
		A negative value will move the element to the left or up, while a positive value will move the
		element to the right or down.
	</p>
	<NumberInput id={`rule-${i}-offset`} label="Offset" bind:value={rule.offset} />
	<p>
		Accumulation means that all previous offsets are added to the current offset. Disable this
		option if you want consistent offsets (applied by this rule).
	</p>
	<Checkbox id={`rule-${i}-accumulate`} label="Accumulate" bind:checked={rule.accumulate} />
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
