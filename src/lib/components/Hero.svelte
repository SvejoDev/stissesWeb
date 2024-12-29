<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';

	let isVideoLoaded = false;

	onMount(() => {
		setTimeout(() => {
			isVideoLoaded = true;
		}, 100);
	});

	const activities = [
		{
			name: m.polite_legal_panther_fold(),
			href: '/paddla',
			icon: `<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />`
		},
		{
			name: m.novel_male_wasp_pinch(),
			href: '/fiska',
			icon: `<path d="M12 20.94c1.5 0 2.75 1.06 4 0l8-4c-1.5-1.5-3-3-8-3s-6.5 1.5-8 3l8 4c1.25 1.06 2.5 0 4 0z" /><path d="M20 14c-3-2-6-3-8-3s-5 1-8 3" />`
		},
		{
			name: m.spare_civil_jay_hush(),
			href: '/cykla',
			icon: `<circle cx="12" cy="12" r="9" /><path d="M14 15a3 3 0 1 0 6 0 3 3 0 1 0-6 0z M4 15a3 3 0 1 0 6 0 3 3 0 1 0-6 0z" />`
		},
		{
			name: m.wacky_mad_raven_gulp(),
			href: '/vandra',
			icon: `<path d="M13 4v16M7 4v16M17 4v16" /><path d="M3 8h18M3 16h18" />`
		}
	];
</script>

<div class="relative h-full w-full overflow-hidden">
	<!-- bild bakgrund -->
	<div class="absolute inset-0 z-0">
		<img
			src="/images/hero-background.jpg"
			alt="Ängelholm natur"
			class="h-full w-full object-cover"
		/>
		<!-- gradient overlay -->
		<div class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
	</div>

	<!-- Hero content -->
	{#if isVideoLoaded}
		<div
			class="relative z-10 flex h-full flex-col items-center justify-center px-4 pt-16 text-white"
		>
			<!-- Huvudrubrik -->
			<h1
				in:fly={{ y: 50, duration: 1000 }}
				class="mb-6 text-center font-sans text-5xl font-extrabold leading-normal tracking-tight sm:text-6xl md:text-7xl"
			>
				<span class="block py-1">{m.due_simple_shad_read()}</span>
				<span
					class="mt-2 block bg-gradient-to-r from-green-300 to-blue-300 bg-clip-text py-1 font-extrabold text-transparent"
				>
					Ängelholm
				</span>
			</h1>

			<!-- Scroll indicator -->
			<div
				in:fade={{ duration: 1000, delay: 800 }}
				class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
			>
				<svg
					class="h-6 w-6 text-white opacity-70"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M19 14l-7 7m0 0l-7-7m7 7V3"
					/>
				</svg>
			</div>
		</div>
	{/if}
</div>

<style>
	/* Optional: Lägg till custom fonts om det behövs */
	@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

	/* Animations för scroll indicator */
	@keyframes bounce {
		0%,
		100% {
			transform: translateY(-25%);
			animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
		}
		50% {
			transform: translateY(0);
			animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
		}
	}
</style>
