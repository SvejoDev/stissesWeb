<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';

	let isVisible = false;

	onMount(() => {
		isVisible = true;
	});

	const partners = [
		{
			name: 'Kullamust',
			description: m.kullamust_description,
			image: '/images/kullamust.jpg',
			url: 'https://kullamust.se/'
		},
		{
			name: 'Ängelholms Näringsliv',
			description: m.angelholm_description,
			image: '/images/angelholm.jpg',
			url: 'https://naringsliv.engelholm.com/'
		},
		{
			name: 'Paloma',
			description: m.spry_inclusive_cockroach_gasp,
			image: '/images/paloma-logo-lighter.png',
			url: 'https://www.paloma.se/'
		}
	];
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
	{#if isVisible}
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- header sektion -->
			<section in:fly={{ y: 50, duration: 800 }} class="mb-16 text-center">
				<h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
					{m.partners_title()}
				</h1>
				<p class="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
					{m.partners_description()}
				</p>
			</section>

			<!-- partners sektion -->
			<section in:fly={{ y: 50, duration: 800, delay: 200 }} class="mb-24">
				<div class="grid gap-12 md:grid-cols-2">
					{#each partners as partner}
						<div
							class="overflow-hidden rounded-lg bg-white shadow-lg transition-transform duration-300 hover:-translate-y-1"
						>
							<img src={partner.image} alt={partner.name} class="h-64 w-full object-cover" />
							<div class="p-6">
								<h2 class="mb-4 text-2xl font-bold text-gray-900">
									{partner.name}
								</h2>
								<p class="mb-6 text-gray-600">
									{partner.description()}
								</p>
								<a
									href={partner.url}
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition duration-300 hover:bg-green-700"
								>
									{m.visit_website()}
									<svg class="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
										/>
									</svg>
								</a>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>
