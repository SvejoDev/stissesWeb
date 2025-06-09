<script lang="ts">
	import PaddlingMaps from '$lib/components/experience/PaddlingMaps.svelte';
	import * as m from '$lib/paraglide/messages';
</script>

<svelte:head>
	<title>Kartor | Stisses Sport & Fritid</title>
	<meta
		name="description"
		content="Utforska våra paddlingleder med detaljerade kartor för korta turer och längre äventyr."
	/>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
	<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
		<!-- Header -->
		<div class="mb-8 text-center">
			<h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
				{m.maps_section_title()}
			</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-600">
				{m.maps_section_description()}
			</p>
		</div>

		<!-- Maps Component -->
		<PaddlingMaps />
	</div>

	<!-- Extra spacing at bottom -->
	<div class="pb-16"></div>
</div>
