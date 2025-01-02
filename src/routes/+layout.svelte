<script lang="ts">
	import { ParaglideJS } from '@inlang/paraglide-sveltekit'
	import { i18n } from '$lib/i18n'

	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>
<ParaglideJS {i18n}>


<ParaglideJS {i18n}>
	<Navbar />
	{@render children()}
</ParaglideJS>

<slot/>
</ParaglideJS>