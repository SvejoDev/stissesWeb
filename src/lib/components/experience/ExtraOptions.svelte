<script lang="ts">
	import type { Experience } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import * as m from '$lib/paraglide/messages';

	let { experience }: { experience: Experience } = $props();

	// hjälpfunktion för att hantera både strängar och funktioner som returnerar strängar
	function getValue(value: string | (() => string)): string {
		return typeof value === 'function' ? value() : value;
	}
</script>

<div class="mb-8 space-y-8">
	{#if experience.extras?.food}
		<div>
			<h2 class="mb-4 text-xl font-semibold">{m.smart_tough_beetle_bump()}</h2>
			<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
				{#each experience.extras.food as option}
					<div class="rounded-lg bg-white p-4 shadow">
						<div class="mb-2 flex items-start justify-between">
							<h3 class="font-semibold">{getValue(option.title)}</h3>
							<Badge variant="secondary">{option.price} {m.spare_grassy_bird_lend()}</Badge>
						</div>
						<p class="text-sm text-gray-600">{getValue(option.description)}</p>
					</div>
				{/each}
			</div>
		</div>
	{/if}

	{#if experience.extras?.teambuilding}
		<div>
			<h2 class="mb-4 text-xl font-semibold">Teambuilding</h2>
			<div class="rounded-lg bg-white p-6 shadow">
				<div class="mb-4 flex items-start justify-between">
					<h3 class="font-semibold">{m.civil_silly_hare_offer()}</h3>
					<Badge variant="secondary"
						>{experience.extras.teambuilding.price} {m.spare_grassy_bird_lend()}</Badge
					>
				</div>
				<p class="text-gray-600">{getValue(experience.extras.teambuilding.description)}</p>
			</div>
		</div>
	{/if}

	{#if experience.recommendations}
		<div>
			<h2 class="mb-4 text-xl font-semibold">{m.moving_zesty_bullock_pause()}</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
				{#if experience.recommendations.clothing}
					<div>
						<h3 class="mb-2 font-semibold">Klädsel</h3>
						<ul class="space-y-2">
							{#each experience.recommendations.clothing as item}
								<li class="flex items-center gap-2 text-gray-600">
									<svg class="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
										<path
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										/>
									</svg>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/if}

				{#if experience.recommendations.bring}
					<div>
						<h3 class="mb-2 font-semibold">Ta med</h3>
						<ul class="space-y-2">
							{#each experience.recommendations.bring as item}
								<li class="flex items-center gap-2 text-gray-600">
									<svg class="h-4 w-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
										<path
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										/>
									</svg>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
