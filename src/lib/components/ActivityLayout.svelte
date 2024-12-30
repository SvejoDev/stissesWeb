<script lang="ts">
	export let title: string;
	export let description: string;
	export let heroImage: string;
	export let experiences: {
		title: string;
		description: string;
		image: string;
		price: string;
		duration: string;
		difficulty: string;
	}[];
</script>

<div class="min-h-screen">
	<!-- Hero Section -->
	<div class="relative h-[50vh]">
		<img src={heroImage} alt={title} class="h-full w-full object-cover" />
		<div class="absolute inset-0 flex items-center justify-center bg-black/40">
			<h1 class="text-4xl font-bold text-white md:text-6xl">{title}</h1>
		</div>
	</div>

	<!-- Description Section -->
	<div class="mx-auto max-w-7xl px-4 py-12">
		<p class="text-lg text-gray-700">{description}</p>
	</div>

	<!-- Experiences Grid -->
	<div class="mx-auto max-w-7xl px-4 py-12">
		<h2 class="mb-8 text-3xl font-bold">Våra upplevelser</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each experiences as experience}
				<div class="overflow-hidden rounded-lg bg-white shadow-lg">
					<img src={experience.image} alt={experience.title} class="h-48 w-full object-cover" />
					<div class="p-6">
						<h3 class="mb-2 text-xl font-semibold">{experience.title}</h3>
						<p class="mb-4 text-gray-600">{experience.description}</p>
						<div class="mb-4 flex items-center justify-between">
							<span class="text-lg font-bold">{experience.price}</span>
							<span class="text-gray-500">{experience.duration}</span>
						</div>
						<div class="flex items-center justify-between">
							<span class="text-sm text-gray-500">
								Svårighetsgrad:
								<span
									class={`font-medium ${
										experience.difficulty === 'easy'
											? 'text-green-500'
											: experience.difficulty === 'medium'
												? 'text-yellow-500'
												: 'text-red-500'
									}`}
								>
									{experience.difficulty === 'easy'
										? 'Lätt'
										: experience.difficulty === 'medium'
											? 'Medel'
											: 'Svår'}
								</span>
							</span>
							<button class="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
								Boka nu
							</button>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
