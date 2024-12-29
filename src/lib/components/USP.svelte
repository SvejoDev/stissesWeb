<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';

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

		const section = document.querySelector('.usp-section');
		if (section) observer.observe(section);

		return () => {
			if (section) observer.unobserve(section);
		};
	});

	const usps = [
		{
			title: m.fuzzy_active_butterfly_sing(),
			description: m.equal_large_beetle_tap(),
			image: '/images/happy-customers.jpg',
			alt: 'Glada kanotister på sjön'
		},
		{
			title: m.plain_any_zebra_bloom(),
			description: m.chunky_true_reindeer_jest(),
			image: '/images/family-kayaking.jpg',
			alt: 'Familj som paddlar tillsammans'
		},
		{
			title: m.quick_bright_cat_support(),
			description: m.caring_brave_warbler_yell(),
			image: '/images/sustainable-nature.jpg',
			alt: 'Vacker naturvy med solnedgång över sjön'
		}
	];
</script>

<section class="usp-section relative bg-white py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<!-- Huvudrubrik -->
		{#if isVisible}
			<div in:fade={{ duration: 800 }} class="mb-20 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">
					{m.same_helpful_monkey_jolt()}
				</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					{m.suave_good_hound_borrow()}
				</p>
			</div>

			<!-- USP Grid -->
			<div class="grid gap-12 lg:grid-cols-3">
				{#each usps as usp, index}
					<div in:fly={{ y: 50, duration: 800, delay: index * 200 }} class="group">
						<!-- Bildcontainer -->
						<div class="relative mb-6 overflow-hidden rounded-2xl">
							<div class="aspect-w-16 aspect-h-9">
								<img
									src={usp.image}
									alt={usp.alt}
									class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
								/>
							</div>
							<!-- Gradient overlay -->
							<div
								class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
							></div>
						</div>

						<!-- Text content -->
						<div class="relative">
							<h3 class="mb-3 text-xl font-bold text-gray-900">
								{usp.title}
							</h3>
							<p class="text-gray-600">
								{usp.description}
							</p>

							<!-- Dekorativ linje som animeras på hover -->
							<div
								class="mt-4 h-0.5 w-12 bg-green-500 transition-all duration-300 group-hover:w-full"
							></div>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>

<style>
	/* För att hantera bildaspekt-ratio */
	.aspect-w-16 {
		position: relative;
		padding-bottom: 56.25%; /* 16:9 */
	}

	.aspect-w-16 > * {
		position: absolute;
		height: 100%;
		width: 100%;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
</style>
