<script lang="ts">
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

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
			title: 'Begeistrade Kunder',
			description:
				'För oss räcker det inte med nöjda kunder - vi strävar efter att överträffa förväntningar och skapa upplevelser som får dig att vilja komma tillbaka, om och om igen.',
			image: '/images/happy-customers.jpg',
			alt: 'Glada kanotister på sjön'
		},
		{
			title: 'Barn & Ungas Hälsa',
			description:
				'Vi tror på kraften i utomhusaktiviteter för hela familjen. Därför paddlar alla barn under 10 år gratis hos oss - för en aktiv och hälsosam framtid.',
			image: '/images/family-kayaking.jpg',
			alt: 'Familj som paddlar tillsammans'
		},
		{
			title: 'Hållbar Turism',
			description:
				'Vi tar ansvar för framtiden genom social, ekologisk och ekonomisk hållbarhet. Från miljövänlig rengöring till eldrivna transporter - varje detalj räknas.',
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
				<h2 class="mb-4 text-4xl font-bold text-gray-900 sm:text-5xl">Det här gör oss unika</h2>
				<p class="mx-auto max-w-2xl text-lg text-gray-600">
					Upptäck varför våra kunder väljer att uppleva naturen med oss
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
