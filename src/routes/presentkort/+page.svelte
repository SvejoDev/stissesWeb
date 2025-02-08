<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';
	import ComingSoon from '$lib/components/ComingSoon.svelte';

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
	<ComingSoon />
</div>
