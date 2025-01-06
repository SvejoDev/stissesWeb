<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import * as m from '$lib/paraglide/messages';

  let isVisible = false;

  onMount(() => {
    isVisible = true;
  });
</script>

<div class="min-h-screen bg-white pt-24">
  {#if isVisible}
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Hero Section -->
      <section in:fly={{ y: 50, duration: 800 }} class="mb-16 text-center">
        <h1 class="mb-4 text-4xl font-bold text-gray-900">
          {m.internship_hero_title()}
        </h1>
        <p class="text-2xl font-semibold text-gray-600">
          {m.internship_hero_subtitle()}
        </p>
        <p class="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
          {m.internship_intro()}
        </p>
      </section>

      <!-- Vision Section -->
      <section in:fly={{ y: 50, duration: 800, delay: 200 }} class="mb-16">
        <div class="grid gap-12 lg:grid-cols-2">
          <div class="flex flex-col justify-center">
            <p class="text-lg text-gray-600">
              {m.internship_vision()}
            </p>
            <p class="mt-4 text-lg text-gray-600">
              {m.internship_description()}
            </p>
          </div>
          <div class="relative overflow-hidden rounded-2xl">
            <img
              src="/images/praktik-1.jpg"
              alt="Praktikanter i naturen"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <!-- Opportunities Section -->
      <section in:fly={{ y: 50, duration: 800, delay: 400 }} class="mb-16">
        <h2 class="mb-8 text-2xl font-bold text-gray-900">
          {m.internship_opportunities_title()}
        </h2>
        <div class="grid gap-8 md:grid-cols-3">
          <div class="rounded-lg bg-green-50 p-6">
            <p class="text-gray-800">{m.internship_opportunity_1()}</p>
          </div>
          <div class="rounded-lg bg-green-50 p-6">
            <p class="text-gray-800">{m.internship_opportunity_2()}</p>
          </div>
          <div class="rounded-lg bg-green-50 p-6">
            <p class="text-gray-800">{m.internship_opportunity_3()}</p>
          </div>
        </div>
      </section>

      <!-- Closing Section -->
      <section in:fly={{ y: 50, duration: 800, delay: 600 }} class="mb-16">
        <div class="grid gap-12 lg:grid-cols-2">
          <div class="relative overflow-hidden rounded-2xl">
            <img
              src="/images/praktik-2.jpg"
              alt="Praktikanter i arbete"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="flex flex-col justify-center">
            <p class="mb-6 text-lg text-gray-600">
              {m.internship_closing()}
            </p>
            <p class="text-lg text-gray-600">
              {m.internship_contact_info()}
            </p>
          </div>
        </div>
      </section>
    </div>
  {/if}
</div>