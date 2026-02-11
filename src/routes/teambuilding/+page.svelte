<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	import * as m from '$lib/paraglide/messages';
	import { activities } from '$lib/data/activities';

	let isVisible = $state(false);

	onMount(() => {
		isVisible = true;
	});

	// hämta teambuilding-data från företagsupplevelsen
	const corporateExperience = activities.paddla.experiences.find(
		(exp) => exp.experienceType === 'corporate'
	);
	const teambuilding = corporateExperience?.extras?.teambuilding;

	function getValue(value: string | (() => string)): string {
		return typeof value === 'function' ? value() : value;
	}

	// State för vald video
	let selectedVideo = $state('video1');
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24">
	{#if isVisible}
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<section in:fly={{ y: 50, duration: 800 }} class="mb-16 text-center">
				<h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
					{m.teambuilding_page_title()}
				</h1>
				<p class="mx-auto max-w-3xl text-lg text-gray-600 md:text-xl">
					{m.teambuilding_page_subtitle()}
				</p>
			</section>

			{#if teambuilding}
				<!-- Teambuilding Details -->
				<section in:fly={{ y: 50, duration: 800, delay: 200 }} class="mb-16">
					<div class="rounded-2xl bg-white p-8 shadow-lg">
						<div class="mb-6 flex items-start justify-between">
							<h2 class="text-2xl font-bold text-gray-900">
								{m.civil_silly_hare_offer()}
							</h2>
							<Badge variant="secondary" class="text-lg">
								{teambuilding.price} {m.spare_grassy_bird_lend()}
							</Badge>
						</div>

						<p class="mb-8 text-lg text-gray-600">
							{getValue(teambuilding.description)}
						</p>

						<!-- Videos -->
						{#if teambuilding.videos && teambuilding.videos.length > 0}
							{@const videos = teambuilding.videos}
							{@const firstVideo = videos[0]}

							<div class="mb-4 flex flex-wrap gap-2">
								{#each videos as video}
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

							{@const currentVideo = videos.find((v) => v.id === selectedVideo) || firstVideo}
							{#if currentVideo.description}
								<p class="mb-3 text-sm text-gray-600">
									{getValue(currentVideo.description)}
								</p>
							{/if}

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
						{:else if teambuilding.videoUrl}
							<div class="relative aspect-video overflow-hidden rounded-lg">
								<iframe
									src={teambuilding.videoUrl}
									title="Teambuilding video"
									class="absolute inset-0 h-full w-full"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe>
							</div>
						{/if}
					</div>
				</section>

			{/if}
		</div>
	{/if}
</div>
