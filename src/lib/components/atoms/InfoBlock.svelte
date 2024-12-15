<script lang="ts">
	/*
      Copyright (c) 2024 Charly Schmidt aka Picorims<picorims.contact@gmail.com>,
    
      This Source Code Form is subject to the terms of the Mozilla Public
      License, v. 2.0. If a copy of the MPL was not distributed with this
      file, You can obtain one at http://mozilla.org/MPL/2.0/.
    */

	let { variant, message }: { variant: 'info' | 'success' | 'error' | 'warning'; message: string } =
		$props();
</script>

<div
	class="container"
	class:info={variant === 'info'}
	class:success={variant === 'success'}
	class:error={variant === 'error'}
	class:warning={variant === 'warning'}
>
	<strong>{variant}:</strong>
	{message}
</div>

<style>
	div.container {
		border-radius: var(--spacing-4);
		padding: var(--spacing-8);
	}
	div.container.success {
		color: var(--success-50);
		background-color: (--success-950);
		border: 1px solid var(--success-500);
	}
	div.container.error {
		color: var(--error-50);
		background-color: (--error-950);
		border: 1px solid var(--error-500);
	}
	div.container.warning {
		color: var(--warning-50);
		background-color: (--warning-950);
		border: 1px solid var(--warning-500);
	}
	div.container.info {
		color: var(--info-50);
		background-color: (--info-950);
		border: 1px solid var(--info-500);
	}
</style>
