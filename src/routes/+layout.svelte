<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	import Analytics from '$lib/components/Analytics.svelte';
	import CookieConsent from '$lib/components/CookieConsent.svelte';
	let { children } = $props();
</script>

<ParaglideJS {i18n}>
	<Analytics />
	<div class="flex min-h-screen flex-col">
		<Navbar />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
	<CookieConsent />
</ParaglideJS>
