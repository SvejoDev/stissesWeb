<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { GA_MEASUREMENT_ID } from '$lib/analytics/ga';

	// spåra sidvisningar när sidan ändras
	$: if (typeof gtag !== 'undefined') {
		$page.url.pathname;
		gtag('config', GA_MEASUREMENT_ID, {
			page_path: $page.url.pathname
		});
	}
</script>
