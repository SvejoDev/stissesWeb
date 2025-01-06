<script lang="ts">
	import Icon from '@iconify/svelte';
	import * as m from '$lib/paraglide/messages';

	const socialLinks = [
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/Stisses/',
			icon: 'mdi:facebook' // använder material design icons
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/stissesfritid/',
			icon: 'mdi:instagram'
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@stisses',
			icon: 'ic:baseline-tiktok'
		}
	];

	const reviewPlatforms = [
		{
			name: 'Google Reviews',
			url: 'https://g.page/r/CUraahjzuKDqEBM/review',
			icon: 'mdi:google'
		},
		{
			name: 'TripAdvisor',
			url: 'https://www.tripadvisor.se/UserReviewEdit-g189835-d14930712-Stisses-Angelholm_Skane_County.html',
			icon: 'la:tripadvisor' // ändrar från mdi till line awesome (la) för tripadvisor
		}
	];

	const companyInfo = [
		{
			icon: 'mdi:map-marker',
			text: 'Reningsverksvägen 2, Ängelholm',
			url: 'https://maps.google.com/?q=Reningsverksvägen+2+Ängelholm'
		},
		{
			icon: 'mdi:phone',
			text: '(+46) 70-325 96 38'
		},
		{
			icon: 'mdi:email',
			text: 'info@stisses.se'
		}
	];
</script>

<footer class="bg-gray-900 text-white">
	<!-- Hero-liknande bild i toppen av footern -->
	<div class="relative h-48 overflow-hidden sm:h-64">
		<img
			src="/images/footer-hero.jpg"
			alt="Naturvy över Ängelholm"
			class="h-full w-full object-cover"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
	</div>

	<div class="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="grid gap-8 lg:grid-cols-4">
			<!-- Företagsinfo -->
			<div class="space-y-2 text-gray-400">
				<h3 class="mb-6 text-lg font-semibold text-white">{m.busy_sweet_swallow_launch()}</h3>
				{#each companyInfo as info}
					{#if info.url}
						<a
							href={info.url}
							target="_blank"
							rel="noopener noreferrer"
							class="flex items-center hover:text-white"
						>
							<Icon icon={info.icon} class="mr-2" width="24" />
							{info.text}
						</a>
					{:else}
						<p class="flex items-center">
							<Icon icon={info.icon} class="mr-2" width="24" />
							{info.text}
						</p>
					{/if}
				{/each}
			</div>

			<!-- Snabblänkar -->
			<div>
				<h3 class="mb-6 text-lg font-semibold">{m.funny_tidy_dingo_gasp()}</h3>
				<ul class="space-y-4">
					<li>
						<a href="/paddla" class="text-gray-400 transition-colors hover:text-white"
							>{m.brief_steep_cougar_laugh()}</a
						>
					</li>
					<li>
						<a href="/fiska" class="text-gray-400 transition-colors hover:text-white"
							>{m.sour_careful_pug_nail()}</a
						>
					</li>
					<li>
						<a href="/cykla" class="text-gray-400 transition-colors hover:text-white"
							>{m.heroic_tough_bear_mop()}</a
						>
					</li>
					<li>
						<a href="/vandra" class="text-gray-400 transition-colors hover:text-white"
							>{m.grand_cool_jan_persist()}</a
						>
					</li>
				</ul>
			</div>

			<!-- Sociala medier och recensioner -->
			<div>
				<!-- Sociala medier -->
				<p class="mb-4 text-sm text-gray-400">{m.polite_cozy_quail_gleam()}</p>
				<div class="mb-6 flex space-x-4">
					{#each socialLinks as social}
						<a
							href={social.url}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-full bg-gray-800 p-2 text-gray-400 transition-all hover:bg-gray-700 hover:text-white"
						>
							<Icon icon={social.icon} width="24" />
						</a>
					{/each}
				</div>

				<!-- Recensionsplattformar -->
				<p class="mb-4 text-sm text-gray-400">{m.quick_fine_eel_exhale()}</p>
				<div class="flex space-x-4">
					{#each reviewPlatforms as platform}
						<a
							href={platform.url}
							target="_blank"
							rel="noopener noreferrer"
							class="rounded-full bg-gray-800 p-2 text-gray-400 transition-all hover:bg-gray-700 hover:text-white"
						>
							<Icon icon={platform.icon} width="24" />
						</a>
					{/each}
				</div>

				<!-- Copyright -->
				<div class="mt-12 border-t border-gray-800 pt-8 text-center">
					<p class="text-sm text-gray-400">
						© {new Date().getFullYear()} Stisses Sport & Fritid. All rights reserved.
					</p>
				</div>
			</div>
		</div>
	</div>
</footer>
