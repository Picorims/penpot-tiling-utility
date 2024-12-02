import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [sveltekit()],

	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	},

	build: {
		rollupOptions: {
			input: {
				plugin: 'src/plugin.ts',
				index: 'src/app.html'
			},
			output: {
				entryFileNames: "[name].js",
			}
		}
	},

});
