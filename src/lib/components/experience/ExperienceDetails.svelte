<script lang="ts">
	import type { Experience } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import PriceTable from './PriceTable.svelte';
	import BookingRules from './BookingRules.svelte';
	import ExtraOptions from './ExtraOptions.svelte';

	export let experience: Experience;
</script>

<div class="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
	<div class="relative h-[400px]">
		<img src={experience.image} alt={experience.title} class="h-full w-full object-cover" />
		<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
			<h1 class="mb-2 text-3xl font-bold text-white">{experience.title}</h1>
			<p class="text-white/90">{experience.subTitle}</p>
		</div>
	</div>

	<div class="p-8">
		<!-- Basic Info -->
		<div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
			<div>
				<h3 class="text-sm font-medium text-gray-500">Varaktighet</h3>
				<p class="mt-1 font-semibold">{experience.duration}</p>
			</div>
			<div>
				<h3 class="text-sm font-medium text-gray-500">Start</h3>
				<p class="mt-1 font-semibold">{experience.startLocation}</p>
			</div>
			<div>
				<h3 class="text-sm font-medium text-gray-500">Mål</h3>
				<p class="mt-1 font-semibold">{experience.endLocation}</p>
			</div>
			<div>
				<h3 class="text-sm font-medium text-gray-500">Svårighetsgrad</h3>
				<Badge class="mt-1">
					{experience.difficulty === 'easy'
						? 'Lätt'
						: experience.difficulty === 'medium'
							? 'Medel'
							: 'Svår'}
				</Badge>
			</div>
		</div>

		<!-- Description -->
		<div class="prose mb-8 max-w-none">
			<p>{experience.longDescription}</p>
		</div>

		<!-- Included Items -->
		<div class="mb-8">
			<h2 class="mb-4 text-xl font-semibold">Detta ingår</h2>
			<ul class="grid grid-cols-1 gap-2 md:grid-cols-2">
				{#each experience.includedItems as item}
					<li class="flex items-center gap-2">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-green-500"
							viewBox="0 0 20 20"
							fill="currentColor"
						>
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
						{item}
					</li>
				{/each}
			</ul>
		</div>

		<!-- Price -->
		{#if typeof experience.price === 'string'}
			<div class="mb-8 text-2xl font-bold">{experience.price}</div>
		{:else}
			<PriceTable priceData={experience.price} />
		{/if}

		<!-- Extras if available -->
		{#if experience.extras}
			<ExtraOptions {experience} />
		{/if}

		<!-- Booking Rules -->
		<BookingRules rules={experience.bookingRules} />

		<!-- Book Button -->
		<div class="mt-8">
			<a
				href="/boka"
				class="block w-full rounded-lg bg-blue-600 px-6 py-3 text-center text-white transition-colors duration-300 hover:bg-blue-700"
			>
				Boka denna upplevelse
			</a>
		</div>
	</div>
</div>
