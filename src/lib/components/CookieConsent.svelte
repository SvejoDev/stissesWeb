<script lang="ts">
	import { onMount } from 'svelte';
	import * as m from '$lib/paraglide/messages';

	let showBanner = false;

	onMount(() => {
		// kontrollera om användaren redan har accepterat cookies
		const consent = localStorage.getItem('cookie-consent');
		if (!consent) {
			showBanner = true;
		}
	});

	function acceptCookies() {
		localStorage.setItem('cookie-consent', 'accepted');
		showBanner = false;
		// aktivera analytics efter godkännande
		window.location.reload();
	}

	function declineCookies() {
		localStorage.setItem('cookie-consent', 'declined');
		showBanner = false;
	}
</script>

{#if showBanner}
	<div class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
		<div class="mx-auto flex max-w-7xl items-center justify-between">
			<p class="text-sm text-gray-600">
				Vi använder cookies för att analysera trafik och förbättra din upplevelse.
			</p>
			<div class="flex gap-4">
				<button
					on:click={acceptCookies}
					class="rounded bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
				>
					Acceptera
				</button>
				<button
					on:click={declineCookies}
					class="rounded bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
				>
					Avböj
				</button>
			</div>
		</div>
	</div>
{/if}
