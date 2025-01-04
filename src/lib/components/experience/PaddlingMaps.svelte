<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Tabs, TabsList, TabsTrigger } from '$lib/components/ui/tabs/index.js';
	import * as m from '$lib/paraglide/messages';
	// state för att hålla koll på kartan
	let isFullscreen = $state(false);
	let mapType = $state<'short' | 'long'>('short');
	let mapLanguage = $state<'sv' | 'en'>('sv');

	// funktion för att växla mellan fullskärm
	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
	}

	// funktion för att ladda ner kartan
	function downloadMap() {
		const filename = getMapPath().split('/').pop() || '';
		const link = document.createElement('a');
		link.href = getMapPath();
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	// funktion för att hämta rätt kartfil
	function getMapPath(): string {
		if (mapType === 'short') {
			return '/maps/kartaAngelholm.svg';
		}
		return mapLanguage === 'sv' ? '/maps/angeltoklipp_sv.svg' : '/maps/angeltoklipp_en.svg';
	}
</script>

<div class="space-y-6 rounded-lg bg-card p-6">
	<div class="flex flex-col gap-2">
		<h2 class="text-2xl font-semibold">{m.maps_section_title()}</h2>
		<p class="text-muted-foreground">{m.maps_section_description()}</p>
	</div>

	<Tabs
		value={mapType}
		onValueChange={(value: string | undefined) => value && (mapType = value as 'short' | 'long')}
	>
		<TabsList class="grid w-full grid-cols-2">
			<TabsTrigger value="short">{m.maps_type_short()}</TabsTrigger>
			<TabsTrigger value="long">{m.maps_type_long()}</TabsTrigger>
		</TabsList>

		<div class="mt-4">
			{#if mapType === 'long'}
				<div class="mb-4 flex justify-end gap-2">
					<Button
						variant={mapLanguage === 'sv' ? 'default' : 'outline'}
						size="sm"
						onclick={() => (mapLanguage = 'sv')}
					>
						{m.maps_language_sv()}
					</Button>
					<Button
						variant={mapLanguage === 'en' ? 'default' : 'outline'}
						size="sm"
						onclick={() => (mapLanguage = 'en')}
					>
						{m.maps_language_en()}
					</Button>
				</div>
			{/if}

			<div>
				<!-- Map container -->
				<div class="relative aspect-[16/9] overflow-hidden rounded-lg">
					<img
						src={getMapPath()}
						alt={mapType === 'short' ? m.maps_alt_short() : m.maps_alt_long()}
						class="h-full w-full object-contain"
					/>

					<!-- Desktop controls (hidden on mobile) -->
					<div class="absolute bottom-4 right-4 hidden gap-2 sm:flex">
						<Button variant="secondary" size="sm" onclick={toggleFullscreen}>
							{isFullscreen ? m.maps_exit_fullscreen() : m.maps_fullscreen()}
						</Button>
						<Button variant="secondary" size="sm" onclick={downloadMap}>
							{m.maps_download()}
						</Button>
					</div>
				</div>

				<!-- Mobile controls (hidden on desktop) -->
				<div class="mt-2 flex flex-col gap-2 sm:hidden">
					<Button variant="secondary" size="sm" onclick={toggleFullscreen}>
						{isFullscreen ? m.maps_exit_fullscreen() : m.maps_fullscreen()}
					</Button>
					<Button variant="secondary" size="sm" onclick={downloadMap}>
						{m.maps_download()}
					</Button>
				</div>
			</div>

			<p class="mt-4 text-sm text-muted-foreground">
				{mapType === 'short' ? m.maps_short_description() : m.maps_long_description()}
			</p>
		</div>
	</Tabs>
</div>

{#if isFullscreen}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
		onclick={toggleFullscreen}
		onkeydown={(e) => e.key === 'Escape' && toggleFullscreen()}
		role="button"
		tabindex="0"
	>
		<div class="relative h-[90vh] w-[90vw]">
			<img
				src={getMapPath()}
				alt={mapType === 'short' ? m.maps_alt_short() : m.maps_alt_long()}
				class="h-full w-full object-contain"
			/>
			<Button
				variant="secondary"
				size="icon"
				class="absolute right-4 top-4"
				on:click={(e) => {
					e.stopPropagation();
					toggleFullscreen();
				}}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24">
					<path
						d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					/>
				</svg>
			</Button>
		</div>
	</div>
{/if}
