<script lang="ts">
	import type { Experience } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import * as m from '$lib/paraglide/messages';

	export let experience: Experience;

	function getValue(value: string | (() => string)): string {
		return typeof value === 'function' ? value() : value;
	}

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
				return m.experience_type_guided();
			case 'corporate':
				return m.experience_type_corporate();
			case 'educational':
				return m.experience_type_educational();
			default:
				return m.experience_type_regular();
		}
	}

	function getDifficultyLabel(difficulty: Experience['difficulty']) {
		switch (difficulty) {
			case 'easy':
				return m.common_difficulty_easy();
			case 'medium':
				return m.common_difficulty_medium();
			case 'hard':
				return m.common_difficulty_hard();
			default:
				return m.common_difficulty_easy();
		}
	}
</script>

<div
	class="overflow-hidden rounded-lg bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
>
	<div class="relative">
		<img src={experience.image} alt={getValue(experience.title)} class="h-48 w-full object-cover" />
		{#if experience.experienceType !== 'regular'}
			<div class="absolute right-4 top-4">
				<Badge variant="secondary" class="text-xs">
					{getExperienceTypeLabel(experience.experienceType)}
				</Badge>
			</div>
		{/if}
	</div>

	<div class="p-6">
		<h3 class="mb-1 text-xl font-semibold">{getValue(experience.title)}</h3>
		<p class="mb-4 text-sm text-gray-500">{getValue(experience.subTitle)}</p>

		<div class="mb-4 flex items-center gap-2">
			<Badge class={getDifficultyColor(experience.difficulty)}>
				{getDifficultyLabel(experience.difficulty)}
			</Badge>
			<span class="text-sm text-gray-600">{getValue(experience.duration)}</span>
		</div>

		<p class="mb-4 line-clamp-3 text-gray-600">{getValue(experience.description)}</p>

		<div class="mt-4 flex items-center justify-between">
			<div class="text-lg font-semibold">
				{typeof experience.price === 'function'
					? getValue(experience.price)
					: typeof experience.price === 'string'
						? getValue(experience.price)
						: `${m.price_from()} ${experience.price.rows[0].price} kr`}
			</div>
			<a
				href={`?experience=${getValue(experience.title).toLowerCase().replace(/\s+/g, '-')}`}
				class="rounded bg-blue-600 px-4 py-2 text-white transition-colors duration-300 hover:bg-blue-700"
			>
				{m.such_awake_shad_inspire()}
			</a>
		</div>
	</div>
</div>
