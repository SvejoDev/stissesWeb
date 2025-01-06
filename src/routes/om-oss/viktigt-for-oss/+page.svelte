<script lang="ts">
    import { onMount } from 'svelte';
    import { fly, fade } from 'svelte/transition';
    import * as m from '$lib/paraglide/messages';

    let isVisible = false;
    
    onMount(() => {
        isVisible = true;
    });
</script>

<div class="min-h-screen bg-white pt-24">
    {#if isVisible}
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <!-- Delighted Customers Section -->
            <section in:fly={{ y: 50, duration: 800 }} class="mb-24">
                <h1 class="mb-12 text-center text-4xl font-bold text-gray-900">
                    {m.important_delighted_title()}
                </h1>
                <p class="mx-auto max-w-3xl text-lg text-gray-600">
                    {m.important_delighted_text()}
                </p>
            </section>

            <!-- Health Section -->
            <section in:fly={{ y: 50, duration: 800, delay: 200 }} class="mb-24">
                <div class="grid gap-12 lg:grid-cols-2">
                    <div class="flex flex-col justify-center">
                        <h2 class="mb-6 text-3xl font-bold text-gray-900">
                            {m.important_health_title()}
                        </h2>
                        <p class="text-lg text-gray-600">
                            {m.important_health_text()}
                        </p>
                    </div>
                    <div class="relative overflow-hidden rounded-2xl">
                        <img
                            src="/images/barn-paddlar.jpg"
                            alt={m.important_health_title()}
                            class="h-full w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            <!-- Sustainability Section -->
            <section in:fly={{ y: 50, duration: 800, delay: 400 }} class="mb-24">
                <h2 class="mb-12 text-center text-3xl font-bold text-gray-900">
                    {m.important_sustainability_title()}
                </h2>
                <p class="mb-12 text-lg text-gray-600">
                    {m.important_sustainability_intro()}
                </p>

                <div class="grid gap-8 md:grid-cols-3">
                    <div class="rounded-lg bg-green-50 p-6">
                        <h3 class="mb-4 text-xl font-semibold text-gray-900">
                            {m.important_social_title()}
                        </h3>
                        <p class="text-gray-600">{m.important_social_text()}</p>
                    </div>
                    <div class="rounded-lg bg-green-50 p-6">
                        <h3 class="mb-4 text-xl font-semibold text-gray-900">
                            {m.important_ecological_title()}
                        </h3>
                        <p class="text-gray-600">{m.important_ecological_text()}</p>
                    </div>
                    <div class="rounded-lg bg-green-50 p-6">
                        <h3 class="mb-4 text-xl font-semibold text-gray-900">
                            {m.important_economic_title()}
                        </h3>
                        <p class="text-gray-600">{m.important_economic_text()}</p>
                    </div>
                </div>

                <div class="mt-16">
                    <h3 class="mb-6 text-2xl font-bold text-gray-900">
                        {m.important_current_title()}
                    </h3>
                    <ul class="mb-12 list-inside list-disc space-y-4 text-gray-600">
                        <li>{m.important_current_1()}</li>
                        <li>{m.important_current_2()}</li>
                        <li>{m.important_current_3()}</li>
                        <li>{m.important_current_4()}</li>
                    </ul>

                    <h3 class="mb-6 text-2xl font-bold text-gray-900">
                        {m.important_future_title()}
                    </h3>
                    <ul class="list-inside list-disc space-y-4 text-gray-600">
                        <li>{m.important_future_1()}</li>
                        <li>{m.important_future_2()}</li>
                        <li>{m.important_future_3()}</li>
                        <li>{m.important_future_4()}</li>
                    </ul>
                </div>
            </section>
        </div>
    {/if}
</div>