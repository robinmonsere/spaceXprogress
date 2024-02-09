import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv, defineConfig } from 'vite';
import dotenvExpand from 'dotenv-expand';

export default defineConfig(({ mode }) => {
	// Load environment variables only in development mode
	if (mode === 'development') {
		const env = loadEnv(mode, process.cwd(), '');
		// Optionally expand environment variables using dotenv-expand
		dotenvExpand.expand({ parsed: env });
	}

	return {
		// Your configuration options here
		plugins: [sveltekit()]
	};
});
