<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';

	let isVisible = $state(false);

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

	const checkoutUrl =
		'https://app.outventures.se/widget/v2/dialog/new-order?key=e288265c8bfe259e7865c7fabcf1e99ff0c75de6f7a548cb667e7ed453381ac6&productTypes=products,vouchers&listView=products&categories=884';
</script>

<div class="min-h-screen bg-gradient-to-b from-gray-50 to-white py-24">
	<div class="container mx-auto px-4">
		<div class="grid grid-cols-1 gap-8 pb-24 md:grid-cols-3 md:pb-0">
			{#each giftCards as card}
				{#if isVisible}
					<div
						class="overflow-hidden rounded-xl bg-white shadow-lg transition-transform hover:scale-105"
						transition:fly={{ y: 20, duration: 600 }}
					>
						<img src={card.image} alt="Gift Card" class="h-48 w-full object-cover" />
						<div class="space-y-4 p-6">
							<h3 class="text-2xl font-bold text-gray-800">{card.price} kr</h3>
							<p class="text-gray-600">{card.description}</p>
							<div class="space-y-2 text-sm text-gray-500">
								<p>{card.validity}</p>
								<p>{card.booking}</p>
							</div>
						</div>
					</div>
				{/if}
			{/each}
		</div>

		<div class="md:mt-12 md:text-center">
			<a
				href={checkoutUrl}
				class="fixed bottom-4 right-4 z-50 rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-colors duration-200 hover:bg-blue-700 md:static md:inline-block md:px-8 md:py-4 md:shadow-none"
				target="_blank"
				rel="noopener noreferrer"
			>
				Köp presentkort
			</a>
		</div>
	</div>
</div>
