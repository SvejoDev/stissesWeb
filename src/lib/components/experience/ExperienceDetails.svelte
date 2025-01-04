<script lang="ts">
	import type { Experience } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import PriceTable from './PriceTable.svelte';
	import BookingRules from './BookingRules.svelte';
	import ExtraOptions from './ExtraOptions.svelte';
	import * as m from '$lib/paraglide/messages';
	import PaddlingMaps from '$lib/components/experience/PaddlingMaps.svelte';

	export let experience: Experience;

	function getDifficultyColor(difficulty: Experience['difficulty']) {
		switch (difficulty) {
			case 'easy':
				return 'bg-green-100 text-green-800';
			case 'medium':
				return 'bg-yellow-100 text-yellow-800';
			case 'hard':
				return 'bg-red-100 text-red-800';
			default:
				return 'bg-gray-100 text-gray-800';
		}
	}

	// hjälpfunktion för att hantera både strängar och funktioner som returnerar strängar
	function getValue(value: string | (() => string)): string {
		return typeof value === 'function' ? value() : value;
	}
</script>

<div class="mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg">
	<div class="relative h-[400px]">
		<img
			src={experience.image}
			alt={getValue(experience.title)}
			class="h-full w-full object-cover"
		/>
		<div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
			<h1 class="mb-2 text-3xl font-bold text-white">{getValue(experience.title)}</h1>
			<p class="text-white/90">{getValue(experience.subTitle)}</p>
		</div>
	</div>

	<div class="p-8">
		<!-- Basic Info -->
		<div class="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4">
			<div>
				<h3 class="text-sm font-medium text-gray-500">{m.keen_topical_wren_radiate()}</h3>
				<p class="mt-1 font-semibold">{getValue(experience.duration)}</p>
			</div>
			<div>
				<h3 class="text-sm font-medium text-gray-500">{m.heavy_heavy_swallow_snip()}</h3>
				<p class="mt-1 font-semibold">{getValue(experience.startLocation)}</p>
			</div>
			<div>
				<h3 class="text-sm font-medium text-gray-500">{m.table_header_goal()}</h3>
				<p class="mt-1 font-semibold">{getValue(experience.endLocation)}</p>
			</div>
			<div>
				<h3 class="text-sm font-medium text-gray-500">{m.misty_happy_herring_jump()}</h3>
				<Badge class={`mt-1 ${getDifficultyColor(experience.difficulty)}`}>
					{experience.difficulty === 'easy'
						? m.common_difficulty_easy()
						: experience.difficulty === 'medium'
							? m.common_difficulty_medium()
							: m.common_difficulty_hard()}
				</Badge>
			</div>
		</div>

		<!-- Description -->
		<div class="prose mb-8 max-w-none">
			<p>{getValue(experience.longDescription)}</p>
		</div>

		<!-- Included Items -->
		<div class="mb-8">
			<h2 class="mb-4 text-xl font-semibold">{m.green_flat_wren_enrich()}</h2>
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
						{getValue(item)}
					</li>
				{/each}
			</ul>
		</div>

		<!-- Price -->
		{#if typeof experience.price === 'string' || typeof experience.price === 'function'}
			<div class="mb-8 text-2xl font-bold">{getValue(experience.price)}</div>
		{:else}
			<PriceTable priceData={experience.price} />
		{/if}

		<PaddlingMaps />

		<!-- Extras if available -->
		{#if experience.extras}
			<ExtraOptions {experience} />
		{/if}

		<!-- Booking Rules -->
		<BookingRules
			rules={typeof experience.bookingRules === 'function'
				? experience.bookingRules()
				: experience.bookingRules}
		/>
		<!-- Book Button -->
		<div class="fixed bottom-6 right-6 z-50">
			<a
				href="/boka"
				class="group flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg ring-1 ring-black/5 transition-all duration-300 hover:scale-105 hover:bg-primary/90 hover:shadow-xl active:scale-95"
			>
				{m.ornate_dark_eagle_promise()}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="transition-transform duration-300 group-hover:translate-x-1"
				>
					<path d="M5 12h14" />
					<path d="m12 5 7 7-7 7" />
				</svg>
			</a>
		</div>
	</div>
</div>
