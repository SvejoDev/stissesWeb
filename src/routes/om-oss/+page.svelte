<script lang="ts">
	import * as m from '$lib/paraglide/messages';
	import { fade, fly } from 'svelte/transition';
	import { onMount } from 'svelte';

	let isVisible = false;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
				}
			},
			{ threshold: 0.1 }
		);

		const section = document.querySelector('.about-section');
		if (section) observer.observe(section);

		return () => {
			if (section) observer.unobserve(section);
		};
	});
</script>

<div class="about-section min-h-screen pt-24">
	{#if isVisible}
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Previous Owner Section -->
			<div in:fly={{ y: 50, duration: 800 }} class="mb-24">
				<h2 class="mb-12 text-center text-4xl font-bold text-gray-900">
					{m.about_previous_owner_title()}
				</h2>
				<div class="grid gap-12 lg:grid-cols-2">
					<div class="flex flex-col justify-center">
						<p class="mb-6 text-lg text-gray-600">
							{m.about_previous_owner_text()}
						</p>
						<p class="text-lg font-semibold text-gray-900">
							{m.about_previous_owner_name()}
						</p>
					</div>
					<div class="relative overflow-hidden rounded-2xl">
						<img
							src="/images/per-stisse.jpg"
							alt={m.about_previous_owner_name()}
							class="h-full w-full object-cover"
						/>
					</div>
				</div>
			</div>

			<!-- New Owners Section -->
			<div in:fly={{ y: 50, duration: 800, delay: 200 }} class="mb-24">
				<h2 class="mb-12 text-center text-4xl font-bold text-gray-900">
					{m.about_new_owners_title()}
				</h2>
				<div class="grid gap-12 lg:grid-cols-2">
					<div class="relative order-2 overflow-hidden rounded-2xl lg:order-1">
						<img
							src="/images/new-owners.jpg"
							alt={m.about_new_owners_names()}
							class="h-full w-full object-cover"
						/>
					</div>
					<div class="order-1 flex flex-col justify-center lg:order-2">
						<p class="mb-6 text-lg text-gray-600">
							{m.about_new_owners_text()}
						</p>
						<p class="text-lg font-semibold text-gray-900">
							{m.about_new_owners_names()}
						</p>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
