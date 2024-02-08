import { sveltekit } from '@sveltejs/kit/vite';
import { loadEnv, defineConfig } from 'vite';
import dotenvExpand from 'dotenv-expand';

export default defineConfig({
	plugins: [sveltekit()]
});
