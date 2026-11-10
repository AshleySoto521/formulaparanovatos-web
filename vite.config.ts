import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// mdsvex todavía genera `<script context="module">`; el aviso es inofensivo.
			onwarn: (warning, handler) => {
				if (warning.code === 'script_context_deprecated') return;
				handler(warning);
			},
			adapter: adapter(),
			preprocess: [mdsvex({ extensions: ['.svx', '.md'] })],
			extensions: ['.svelte', '.svx', '.md']
		})
	]
});
