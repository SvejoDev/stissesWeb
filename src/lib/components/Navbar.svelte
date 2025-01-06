<script lang="ts">
	import { i18n } from '$lib/i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import type { AvailableLanguageTag } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
	import { onMount } from 'svelte';

	function switchLanguage(newLang: AvailableLanguageTag) {
		// tar bort alla språkprefix från den nuvarande sökvägen
		const pathWithoutLang = i18n.route($page.url.pathname);
		// skapar en ny sökväg med det nya språket
		const newPath = i18n.resolveRoute(pathWithoutLang, newLang);
		// navigerar till den nya sökvägen
		goto(newPath, { replaceState: true });
	}

	let isAboutUsOpen = false;
	let isMobileMenuOpen = false;

	// Stäng dropdown när man klickar utanför
	let aboutUsRef: HTMLDivElement;
	onMount(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (aboutUsRef && !aboutUsRef.contains(event.target as Node)) {
				isAboutUsOpen = false;
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});

	const navItems = [
		{ href: '/paddla', label: m.polite_legal_panther_fold() },
		{ href: '/fiska', label: m.novel_male_wasp_pinch() },
		{ href: '/cykla', label: m.spare_civil_jay_hush() },
		{ href: '/vandra', label: m.wacky_mad_raven_gulp() }
	];

	const aboutUsItems = [
		{ href: '/om-oss', label: m.sleek_day_martin_reside() },
		{ href: '/viktigt-for-oss', label: m.awful_witty_owl_lock() },
		{ href: '/vart-team', label: m.same_bad_warbler_boil() },
		{ href: '/arbeta-hos-oss', label: m.sound_grassy_guppy_clip() },
		{ href: '/praktik', label: m.key_noble_meerkat_radiate() },
		{ href: '/presentkort', label: m.round_simple_skunk_hunt() },
		{ href: '/partners', label: m.weary_keen_dingo_amuse() }
	];

	const languages = [
		{ code: 'sv', name: 'Svenska', flag: '/flags/sv.svg' },
		{ code: 'en', name: 'English', flag: '/flags/en.svg' },
		{ code: 'da', name: 'Dansk', flag: '/flags/da.svg' },
		{ code: 'de', name: 'Deutsch', flag: '/flags/de.svg' }
	];
</script>

<nav class="fixed z-50 w-full bg-green-50 shadow-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex items-center">
				<a href="/" class="flex-shrink-0">
					<img class="h-8 w-auto" src="/images/logo.png" alt="Company Logo" />
				</a>
				<div class="hidden md:block">
					<div class="ml-10 flex items-baseline space-x-4">
						{#each navItems as item}
							<a
								href={item.href}
								class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-green-100 hover:text-green-900"
							>
								{item.label}
							</a>
						{/each}
						<div class="relative" bind:this={aboutUsRef}>
							<button
								on:click|stopPropagation={() => (isAboutUsOpen = !isAboutUsOpen)}
								class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-green-100 hover:text-green-900 focus:outline-none"
							>
								{m.sleek_day_martin_reside()}
								<svg
									class="ml-1 inline-block h-4 w-4 transition-transform duration-200 ease-in-out"
									class:rotate-180={isAboutUsOpen}
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
										clip-rule="evenodd"
									/>
								</svg>
							</button>
							{#if isAboutUsOpen}
								<div
									class="absolute left-0 z-50 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
								>
									{#each aboutUsItems as item}
										<a
											href={item.href}
											class="block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-green-100 hover:text-green-900"
											>{item.label}</a
										>
									{/each}
								</div>
							{/if}
						</div>
						<a
							href="/kontakt"
							class="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition duration-150 ease-in-out hover:bg-green-100 hover:text-green-900"
						>
							{m.ago_careful_alpaca_intend()}
						</a>
					</div>
				</div>
			</div>
			<div class="hidden md:block">
				<div class="ml-4 flex items-center md:ml-6">
					{#each languages as lang}
						<button
							on:click={() => switchLanguage(lang.code as AvailableLanguageTag)}
							class="ml-3 rounded-full p-1 transition duration-150 ease-in-out hover:bg-green-100"
						>
							<img src={lang.flag} alt={lang.name} class="h-6 w-6 rounded-full object-cover" />
						</button>
					{/each}
				</div>
			</div>
			<div class="-mr-2 flex md:hidden">
				<button
					on:click={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					type="button"
					class="inline-flex items-center justify-center rounded-md bg-green-50 p-2 text-gray-700 hover:bg-green-100 hover:text-green-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-50"
				>
					<span class="sr-only">Open main menu</span>
					<svg
						class="h-6 w-6"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>

	{#if isMobileMenuOpen}
		<div class="md:hidden">
			<div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
				{#each navItems as item}
					<a
						href={item.href}
						class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-100 hover:text-green-900"
						>{item.label}</a
					>
				{/each}
				<button
					on:click|stopPropagation={() => (isAboutUsOpen = !isAboutUsOpen)}
					class="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 hover:bg-green-100 hover:text-green-900"
				>
					<span>{m.sleek_day_martin_reside()}</span>
					<svg
						class="h-5 w-5 transition-transform duration-200 ease-in-out"
						class:rotate-180={isAboutUsOpen}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
				{#if isAboutUsOpen}
					<div class="mt-1 space-y-1 rounded-md bg-green-50/50 px-2">
						{#each aboutUsItems as item}
							<a
								href={item.href}
								class="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition-colors duration-150 hover:bg-green-100 hover:text-green-900"
							>
								{item.label}
							</a>
						{/each}
					</div>
				{/if}
				<a
					href="/kontakt"
					class="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-green-100 hover:text-green-900"
					>{m.busy_sweet_swallow_launch()}</a
				>
			</div>
			<div class="border-t border-gray-200 pb-3 pt-4">
				<div class="flex items-center px-5">
					{#each languages as lang}
						<button
							on:click={() => switchLanguage(lang.code as AvailableLanguageTag)}
							class="ml-3 rounded-full p-1 transition duration-150 ease-in-out hover:bg-green-100"
						>
							<img src={lang.flag} alt={lang.name} class="h-6 w-6 rounded-full object-cover" />
						</button>
					{/each}
				</div>
			</div>
		</div>
	{/if}
</nav>
