import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	build: {
		sourcemap: true,
		rollupOptions: {
			input: {
				plugin: 'src/plugin.ts' // makes the corresponding chunk available.
			},
		}
	}
});
