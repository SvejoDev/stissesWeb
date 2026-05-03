<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import BoendeKarta from '$lib/components/BoendeKarta.svelte';
</script>

<svelte:head>
	<title>{m.accommodations_meta_title()}</title>
	<meta name="description" content={m.accommodations_meta_description()} />
</svelte:head>

<div class="flex min-h-screen flex-col bg-gray-50 pt-16">
	<header class="px-4 pb-3 pt-5 sm:px-6 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<h1 class="text-2xl font-bold text-gray-900 md:text-3xl">
				{m.accommodations_page_title()}
			</h1>
			<p class="mt-1 max-w-2xl text-sm text-gray-600 md:text-base">
				{m.accommodations_page_subtitle()}
			</p>
		</div>
	</header>

	<div class="flex-1 px-4 pb-6 sm:px-6 lg:px-8">
		<BoendeKarta />
	</div>
</div>
