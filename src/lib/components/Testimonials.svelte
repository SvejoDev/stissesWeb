<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let isVisible = false;

	const reviews = [
		{
			name: 'Stephan Dobberkau',
			text: 'Perfekt, snyggt och okomplicerat. Bokade online och fick en fantastisk kanadensare för hela familjen. Det fanns även paddlar för de minsta. Vi hade väldigt roligt och kan varmt rekommendera turnén och hyrfolket.',
			rating: 5,
			image: '/images/stephan.png',
			nationality: 'DE'
		},
		{
			name: 'Hampus Edström',
			text: 'Mycket trevlig kontakt med personalen, ordning och reda, fick tips på sträckor och upplägg. Hit återkommer vi!',
			rating: 5,
			image: '/images/hampus.png',
			nationality: 'SE'
		},
		{
			name: 'Mariella Lindemann',
			text: 'Vilket äventyr! Kanotturen var fantastisk för att uppleva svensk natur, allt var väl förberett, kommunikationen var bra och super trevlig personal. Tack :-)',
			rating: 5,
			image: '/images/marielle.png',
			nationality: 'GB'
		}
	];

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					isVisible = true;
				}
			},
			{ threshold: 0.1 }
		);

		const section = document.querySelector('.testimonials-section');
		if (section) observer.observe(section);

		return () => {
			if (section) observer.unobserve(section);
		};
	});
</script>

<section class="testimonials-section relative overflow-hidden bg-gray-50 py-24">
	<!-- Naturlig bakgrundsbild med overlay -->
	<div class="absolute inset-0 z-0">
		<img src="/images/nature-bg.jpg" alt="" class="h-full w-full object-cover opacity-40" />
		<div class="absolute inset-0 bg-gradient-to-r from-green-50/50 to-blue-50/50"></div>
	</div>

	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		{#if isVisible}
			<!-- Huvudrubrik -->
			<div in:fade={{ duration: 800 }} class="mb-16 text-center">
				<h2 class="mb-4 text-4xl font-bold text-gray-900">Vad våra kunder säger</h2>
				<div class="mx-auto h-1 w-24 rounded bg-green-500"></div>
			</div>

			<!-- Recensionsgrid -->
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each reviews as review, index}
					<div
						in:fly={{ y: 20, duration: 600, delay: index * 100 }}
						class="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:shadow-xl"
					>
						<div class="relative">
							<!-- Header med bild och namn -->
							<div class="mb-4 flex items-center gap-4">
								<div class="h-14 w-14 overflow-hidden rounded-full ring-4 ring-green-500/20">
									<img src={review.image} alt={review.name} class="h-full w-full object-cover" />
								</div>
								<div>
									<h3 class="font-bold text-gray-900">
										{review.name}
										<span class="ml-2">
											{review.nationality === 'SE'
												? '🇸🇪'
												: review.nationality === 'DE'
													? '🇩🇪'
													: review.nationality === 'GB'
														? '🇬🇧'
														: ''}
										</span>
									</h3>
								</div>
							</div>

							<!-- Stjärnrating -->
							<div class="mb-3 flex gap-1">
								{#each Array(5) as _}
									<svg class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
										<path
											d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
										/>
									</svg>
								{/each}
							</div>

							<!-- Recensionstext -->
							<p class="text-gray-600">
								"{review.text}"
							</p>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</section>
