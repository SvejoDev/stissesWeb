<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';

	let isVisible = false;

	onMount(() => {
		isVisible = true;
	});

	const giftCards = [
		{
			price: 200,
			description: m.gift_card_200_description(),
			validity: m.gift_card_validity(),
			booking: m.gift_card_booking(),
			image: '/images/gift-card.webp',
			bgColor: 'bg-blue-600',
			hoverColor: 'hover:bg-blue-700'
		},
		{
			price: 500,
			description: m.gift_card_500_description(),
			validity: m.gift_card_validity(),
			booking: m.gift_card_booking(),
			image: '/images/gift-card.webp',
			bgColor: 'bg-blue-600',
			hoverColor: 'hover:bg-blue-700'
		},
		{
			price: 1000,
			description: m.gift_card_1000_description(),
			validity: m.gift_card_validity(),
			booking: m.gift_card_booking(),
			image: '/images/gift-card.webp',
			bgColor: 'bg-blue-600',
			hoverColor: 'hover:bg-blue-700'
		}
	];
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
	{#if isVisible}
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<section in:fly={{ y: 50, duration: 800 }} class="mb-16 text-center">
				<h1 class="mb-6 text-4xl font-bold text-gray-900 md:text-5xl lg:text-6xl">
					{m.gift_card_title()}
				</h1>
				<p class="mx-auto max-w-2xl text-lg text-gray-600 md:text-xl">
					{m.gift_card_description()}
				</p>
			</section>

			<section class="mb-24">
				<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
					{#each giftCards as card, index}
						<div
							in:fly={{ y: 50, duration: 800, delay: index * 200 }}
							class="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
						>
							<!-- presentkortsbild med hover-effekt -->
							<div class="mb-6 overflow-hidden rounded-xl">
								<img
									src={card.image}
									alt="Presentkort"
									class="h-48 w-full transform object-cover transition-transform duration-500 group-hover:scale-110"
								/>
							</div>

							<!-- pris med tydligare design -->
							<div class="mb-6 flex items-center justify-between">
								<h3 class="text-2xl font-bold text-gray-900">{card.price} kr</h3>
								<button
									class="transform rounded-full bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-lg"
								>
									{m.gift_card_buy()}
								</button>
							</div>

							<!-- beskrivning -->
							<div class="mb-6">
								<p class="text-lg leading-relaxed text-gray-600">{card.description}</p>
							</div>

							<!-- fördelar med ikoner -->
							<div class="space-y-4">
								<div class="flex items-center text-gray-600">
									<svg
										class="mr-3 h-5 w-5 text-blue-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									<span>{card.validity}</span>
								</div>
								<div class="flex items-center text-gray-600">
									<svg
										class="mr-3 h-5 w-5 text-blue-500"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
										/>
									</svg>
									<span>{card.booking}</span>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</div>
	{/if}
</div>
