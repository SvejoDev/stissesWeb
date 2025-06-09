<script lang="ts">
	import type { Experience } from '$lib/types';
	import { Badge } from '$lib/components/ui/badge';
	import * as m from '$lib/paraglide/messages';

	let { experience }: { experience: Experience } = $props();

	// State för vald video
	let selectedVideo = $state('video1');

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
				<p class="mb-4 text-gray-600">{getValue(experience.extras.teambuilding.description)}</p>

				{#if experience.extras.teambuilding.videoUrl || experience.extras.teambuilding.videos}
					<div class="mt-4">
						{#if experience.extras.teambuilding.videos && experience.extras.teambuilding.videos.length > 0}
							<!-- Multiple videos selector -->
							{@const videos = experience.extras.teambuilding.videos}
							{@const firstVideo = videos[0]}

							<!-- Video selector buttons -->
							<div class="mb-4 flex flex-wrap gap-2">
								{#each videos as video, index}
									<button
										onclick={() => (selectedVideo = video.id)}
										class="rounded-lg px-4 py-2 text-sm font-medium transition-colors
											{selectedVideo === video.id
											? 'bg-blue-600 text-white'
											: 'bg-gray-100 text-gray-700 hover:bg-gray-200'}"
									>
										{getValue(video.title)}
									</button>
								{/each}
							</div>

							<!-- Video description -->
							{@const currentVideo = videos.find((v) => v.id === selectedVideo) || firstVideo}
							{#if currentVideo.description}
								<p class="mb-3 text-sm text-gray-600">
									{getValue(currentVideo.description)}
								</p>
							{/if}

							<!-- Video player -->
							<div class="relative aspect-video overflow-hidden rounded-lg">
								<iframe
									src={currentVideo.videoUrl}
									title={getValue(currentVideo.title)}
									class="absolute inset-0 h-full w-full"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
							</div>
						{:else if experience.extras.teambuilding.videoUrl}
							<!-- Single video (legacy support) -->
							<h4 class="mb-2 text-sm font-medium text-gray-700">
								Se teambuilding-aktiviteter i aktion
							</h4>
							<div class="relative aspect-video overflow-hidden rounded-lg">
								<iframe
									src={experience.extras.teambuilding.videoUrl}
									title="Teambuilding video"
									class="absolute inset-0 h-full w-full"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
							</div>
						{/if}
					</div>
				{/if}
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
