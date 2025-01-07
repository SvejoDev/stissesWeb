<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import * as m from '$lib/paraglide/messages';
	import JobForm from '$lib/components/jobs/JobForm.svelte';
	import JobRole from '$lib/components/jobs/JobRole.svelte';
	import { jobRoles } from '$lib/data/jobRoles';

	let isVisible = false;

	onMount(() => {
		isVisible = true;
	});
</script>

<div class="min-h-screen bg-white pt-24">
	{#if isVisible}
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<!-- Vision Section -->
			<section in:fly={{ y: 50, duration: 800 }} class="mb-16">
				<h1 class="mb-8 text-4xl font-bold text-gray-900">
					{m.work_with_us_title()}
				</h1>
				<div class="prose prose-lg max-w-none">
					<p class="text-lg text-gray-600">
						{m.work_with_us_vision()}
					</p>
				</div>
			</section>

			<!-- Job Roles Section -->
			<section class="mb-16">
				<div class="space-y-12">
					{#each jobRoles as role, index}
						<div in:fly={{ y: 50, duration: 800, delay: index * 200 }}>
							<JobRole {role} />
						</div>
					{/each}
				</div>
			</section>

			<!-- Application Form Section -->
			<section in:fly={{ y: 50, duration: 800, delay: 1000 }} class="mb-24">
				<JobForm />
			</section>
		</div>
	{/if}
</div>
