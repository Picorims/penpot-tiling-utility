import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// retrieve vite mode
let mode = "unknown";
for (const arg of process.argv) {
	if (arg === "--mode") {
		const index = process.argv.indexOf(arg);
		if (index !== -1) {
			mode = process.argv[index + 1];
			console.log("Vite mode: " + mode);
			break;
		}
	}
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter({
			pages: mode === "dev" ? "dev_out" : "docs",
			paths: {
				base: mode === "dev" ? "" : "/penpot-tiling-utility"
			}
		})
	}
};

export default config;
