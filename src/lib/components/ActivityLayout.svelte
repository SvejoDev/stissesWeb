<script lang="ts">
	import type { Activity } from '$lib/types';
	import ExperienceCard from './experience/ExperienceCard.svelte';

	export let activity: Activity;

	function getValue(value: string | (() => string)): string {
		return typeof value === 'function' ? value() : value;
	}
</script>

<div class="min-h-screen">
	<!-- Hero Section -->
	<div class="relative h-[50vh]">
		<img
			src={activity.heroImage}
			alt={getValue(activity.title)}
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 flex items-center justify-center bg-black/40">
			<h1 class="text-4xl font-bold text-white md:text-6xl">{getValue(activity.title)}</h1>
		</div>
	</div>

	<!-- Main Content -->
	<div class="mx-auto max-w-7xl px-4 py-12">
		<div class="prose prose-lg mb-12">
			<p>{activity.description}</p>
		</div>

		<!-- Experiences Grid -->
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each activity.experiences as experience}
				<ExperienceCard {experience} />
			{/each}
		</div>
	</div>
</div>
