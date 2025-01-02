<script lang="ts">
	import type { Experience } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';

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

	function getExperienceTypeLabel(type: Experience['experienceType']) {
		switch (type) {
			case 'guided':
				return 'Guidad tur';
			case 'corporate':
				return 'Företag';
			case 'educational':
				return 'Skolor & föreningar';
			default:
				return 'Regular';
		}
	}
</script>

<div
	class="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
>
	<div class="relative">
		<img
			src={experience.image}
			alt={typeof experience.title === 'function' ? experience.title() : experience.title}
			class="h-48 w-full object-cover"
		/>
		{#if experience.experienceType !== 'regular'}
			<div class="absolute right-4 top-4">
				<Badge variant="secondary" class="text-xs">
					{getExperienceTypeLabel(experience.experienceType)}
				</Badge>
			</div>
		{/if}
	</div>

	<div class="p-6">
		<h3 class="mb-1 text-xl font-semibold">{experience.title}</h3>
		<p class="mb-4 text-sm text-gray-500">{experience.subTitle}</p>

		<div class="mb-4 flex items-center gap-2">
			<Badge class={getDifficultyColor(experience.difficulty)}>
				{experience.difficulty === 'easy'
					? 'Lätt'
					: experience.difficulty === 'medium'
						? 'Medel'
						: 'Svår'}
			</Badge>
			<span class="text-sm text-gray-600">{experience.duration}</span>
		</div>

		<p class="mb-4 line-clamp-3 text-gray-600">{experience.description}</p>

		<div class="mt-4 flex items-center justify-between">
			<div class="text-lg font-semibold">
				{typeof experience.price === 'string'
					? experience.price
					: 'Från ' + experience.price.rows[0].price + ' kr'}
			</div>
			<a
				href={`?experience=${(typeof experience.title === 'function' ? experience.title() : experience.title).toLowerCase().replace(/\s+/g, '-')}`}
				class="rounded bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
			>
				Läs mer
			</a>
		</div>
	</div>
</div>
