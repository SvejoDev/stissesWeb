<script lang="ts">
	import ExperienceCard from '$lib/components/experience/ExperienceCard.svelte';
	import ExperienceDetails from '$lib/components/experience/ExperienceDetails.svelte';
	import { activities } from '$lib/data/activities';
	import { page } from '$app/stores';

	const paddlingData = activities.paddla;

	// Hämta experience från URL-parametrar om den finns
	$: selectedExperience = $page.url.searchParams.get('experience');
	$: currentExperience = selectedExperience
		? paddlingData.experiences.find(
				(exp) => exp.title.toLowerCase().replace(/\s+/g, '-') === selectedExperience
			)
		: null;

	// lägg till en variabel för att hålla koll på aktiv filter
	let activeFilter: 'all' | 'guided' | 'corporate' | 'educational' = 'all';

	// filtrera upplevelserna baserat på vald filter
	$: filteredExperiences = paddlingData.experiences.filter((exp) => {
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
			Tillbaka till alla upplevelser
		</button>

		<ExperienceDetails experience={currentExperience} />
	</div>
{:else}
	<!-- Hero och översikt -->
	<div class="min-h-screen">
		<!-- Hero Section -->
		<div class="relative h-[50vh]">
			<img
				src={paddlingData.heroImage}
				alt={paddlingData.title}
				class="h-full w-full object-cover"
			/>
			<div class="absolute inset-0 flex items-center justify-center bg-black/40">
				<div class="text-center">
					<h1 class="mb-4 text-4xl font-bold text-white md:text-6xl">
						{paddlingData.title}
					</h1>
					<p class="mx-auto max-w-2xl px-4 text-xl text-white/90">
						{paddlingData.description}
					</p>
				</div>
			</div>
		</div>

		<!-- Main Content -->
		<div class="mx-auto max-w-7xl px-4 py-12">
			<!-- Filter Options (om det behövs) -->
			<div class="mb-8 flex flex-wrap gap-4">
				<button
					class="rounded-full px-4 py-2 transition-colors {activeFilter === 'all'
						? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
						: 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
					on:click={() => (activeFilter = 'all')}
				>
					Alla upplevelser
				</button>
				<button
					class="rounded-full px-4 py-2 transition-colors {activeFilter === 'guided'
						? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
						: 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
					on:click={() => (activeFilter = 'guided')}
				>
					Guidade turer
				</button>
				<button
					class="rounded-full px-4 py-2 transition-colors {activeFilter === 'corporate'
						? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
						: 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
					on:click={() => (activeFilter = 'corporate')}
				>
					Företag
				</button>
				<button
					class="rounded-full px-4 py-2 transition-colors {activeFilter === 'educational'
						? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
						: 'bg-gray-100 text-gray-800 hover:bg-gray-200'}"
					on:click={() => (activeFilter = 'educational')}
				>
					Skolor & föreningar
				</button>
			</div>

			<!-- Uppdatera grid-sektionen att använda de filtrerade upplevelserna -->
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each filteredExperiences as experience}
					<ExperienceCard {experience} />
				{/each}
			</div>
		</div>
	</div>
{/if}
