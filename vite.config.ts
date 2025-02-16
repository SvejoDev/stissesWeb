import { sveltekit } from "@sveltejs/kit/vite"
import { paraglide } from "@inlang/paraglide-sveltekit/vite"
import { defineConfig } from "vite"
import type { ServerOptions } from 'vite'

declare module 'vite' {
	interface ServerOptions {
		allowedHosts?: string[]
	}
}

export default defineConfig({
	plugins: [
		paraglide({
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
		}),
		sveltekit(),
	],
	server: {
		port: 3000,
		host: true,
		strictPort: true,
		allowedHosts: ['stisses.se', 'localhost']
	},
	preview: {
		port: 3000,
		host: true,
		strictPort: true
	}
})