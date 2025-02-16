import { sveltekit } from "@sveltejs/kit/vite"
import { paraglide } from "@inlang/paraglide-sveltekit/vite"
import { defineConfig } from "vite"

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
		proxy: {
			'/': {
				target: 'https://stisses.se',
				changeOrigin: true,
				secure: false
			}
		},
		hmr: {
			protocol: 'wss',
			host: 'stisses.se'
		}
	},
	preview: {
		port: 3000,
		host: true,
		strictPort: true
	}
})