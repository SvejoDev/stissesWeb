<script lang="ts">
	import type { Activity } from '$lib/types';
	import ExperienceCard from '$lib/components/experience/ExperienceCard.svelte';
	import ExperienceDetails from '$lib/components/experience/ExperienceDetails.svelte';
	import { page } from '$app/stores';
	import ComingSoon from '$lib/components/ComingSoon.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import * as m from '$lib/paraglide/messages';

	export let activity: Activity;

	export let imagePosition: 'top' | 'center' | 'bottom' = 'center';

	function getValue(value: string | (() => string)): string {
		return typeof value === 'function' ? value() : value;
	}

	// hämta experience från URL-parametrar om den finns
	$: selectedExperience = $page.url.searchParams.get('experience');
	$: currentExperience = selectedExperience
		? activity.experiences.find(
				(exp) =>
					(typeof exp.title === 'function' ? exp.title() : exp.title)
						.toLowerCase()
						.replace(/\s+/g, '-') === selectedExperience
			)
		: null;

	// lägg till en variabel för att hålla koll på aktiv filter
	let activeFilter: 'all' | 'guided' | 'corporate' | 'educational' = 'all';

	// filtrera upplevelserna baserat på vald filter
	$: filteredExperiences = activity.experiences.filter((exp) => {
		if (activeFilter === 'all') return true;
		return exp.experienceType === activeFilter;
	});
</script>

{#if currentExperience}
	<div class="mx-auto max-w-7xl px-4 py-8">
		<button
			class="mb-8 flex items-center text-blue-600 hover:text-blue-800"
			on:click={() => history.back()}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mr-2 h-5 w-5"
				viewBox="0 0 20 20"
				fill="currentColor"
			>
				<path
					fill-rule="evenodd"
					d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z"
					clip-rule="evenodd"
				/>
			</svg>
			{m.cute_fit_ibex_dust()}
		</button>

		<ExperienceDetails experience={currentExperience} />
	</div>
{:else}
	<!-- Hero och översikt -->
	<div class="min-h-screen">
		<!-- Hero Section -->
		<div class="relative h-[50vh]">
			<img
				src={activity.heroImage}
				alt={getValue(activity.title)}
				class="absolute h-full w-full object-cover"
				style="object-position: {imagePosition};"
			/>
			<div class="absolute inset-0 flex items-center justify-center bg-black/40">
				<div class="text-center">
					<h1 class="mb-4 text-4xl font-bold text-white md:text-6xl">
						{getValue(activity.title)}
					</h1>
					<p class="mx-auto max-w-2xl px-4 text-xl text-white/90">
						{getValue(activity.description)}
					</p>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		{#if activity.experiences.length > 0}
			<div class="mx-auto max-w-7xl px-4 py-12">
				<!-- Filter Options -->
				<div class="mb-8 flex flex-wrap gap-4">
					<button
						class="rounded-full px-4 py-2 transition-colors {activeFilter === 'all'
							? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
							: 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
						on:click={() => (activeFilter = 'all')}
					>
						{m.mad_inclusive_raven_talk()}
					</button>
					<button
						class="rounded-full px-4 py-2 transition-colors {activeFilter === 'guided'
							? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
							: 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
						on:click={() => (activeFilter = 'guided')}
					>
						{m.short_stout_rabbit_renew()}
					</button>
					<button
						class="rounded-full px-4 py-2 transition-colors {activeFilter === 'corporate'
							? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
							: 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
						on:click={() => (activeFilter = 'corporate')}
					>
						{m.maroon_bad_capybara_read()}
					</button>
					<button
						class="rounded-full px-4 py-2 transition-colors {activeFilter === 'educational'
							? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
							: 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
						on:click={() => (activeFilter = 'educational')}
					>
						{m.misty_drab_samuel_aid()}
					</button>
				</div>

				<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each filteredExperiences as experience}
						<ExperienceCard {experience} />
					{/each}
				</div>
			</div>
		{:else}
			<ComingSoon />
		{/if}
	</div>
{/if}

<Footer />
