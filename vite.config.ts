import { createRequire } from "node:module"
import { defineConfig } from "vite"
import type { ServerOptions } from 'vite'

const require = createRequire(import.meta.url)
const buffer = require('node:buffer') as typeof import('node:buffer') & {
	SlowBuffer?: typeof Buffer
}

// Compatibility for transitive dependencies that still expect SlowBuffer on
// newer Node versions while Vite loads the Paraglide plugin.
buffer.SlowBuffer ??= buffer.Buffer

declare module 'vite' {
	interface ServerOptions {
		allowedHosts?: string[]
	}
}

export default defineConfig(async () => {
	const [{ sveltekit }, { paraglide }] = await Promise.all([
		import("@sveltejs/kit/vite"),
		import("@inlang/paraglide-sveltekit/vite")
	])

	return {
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
	}
})
