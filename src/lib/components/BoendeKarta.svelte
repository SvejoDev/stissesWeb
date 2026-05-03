<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as m from '$lib/paraglide/messages';
	import { accommodations, STISSES_LOCATION } from '$lib/data/accommodations';
	import type {
		Map as LeafletMap,
		Marker as LeafletMarker,
		LatLngTuple
	} from 'leaflet';

	let mapEl: HTMLDivElement;
	let map: LeafletMap | null = null;
	let leaflet: typeof import('leaflet') | null = null;
	const markerById: Record<string, LeafletMarker> = {};
	let stissesMarker: LeafletMarker | null = null;
	// Spårar pågående popup-timeout så att vi kan rensa den i onDestroy och
	// undvika att openPopup() anropas på en marker vars karta redan tagits bort.
	let pendingPopupTimeout: ReturnType<typeof setTimeout> | null = null;

	let hoveredId: string | null = $state(null);
	let activeId: string | null = $state(null);

	function escapeHtml(value: string): string {
		return value
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}

	/**
	 * Returnerar en escape:ad URL endast om dess scheme är http(s).
	 * Skyddar mot XSS via `javascript:`/`data:`-URLer i href-attribut.
	 * Faller tillbaka till '#' om URL:en är ogiltig eller har förbjudet scheme.
	 */
	function safeHttpUrl(url: string): string {
		try {
			const parsed = new URL(url);
			if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
				return escapeHtml(url);
			}
		} catch {
			// ogiltig URL — falla genom till '#'
		}
		return '#';
	}

	function buildPopupHtml(acc: (typeof accommodations)[number]): string {
		const safeName = escapeHtml(acc.name);
		const safeDesc = escapeHtml(acc.description());
		const safeAlt = escapeHtml(acc.imageAlt);
		const safeImage = escapeHtml(acc.image);
		const safeWebsite = safeHttpUrl(acc.website);
		const visit = escapeHtml(m.accommodations_visit_website());
		return `
			<div class="boende-popup">
				<img src="${safeImage}" alt="${safeAlt}" loading="lazy" />
				<div class="boende-popup-body">
					<h3>${safeName}</h3>
					<p>${safeDesc}</p>
					<a href="${safeWebsite}" target="_blank" rel="noopener noreferrer">
						${visit}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0 0 1.5H12.19l-6.97 6.97a.75.75 0 1 0 1.06 1.06L13.25 8.06V16a.75.75 0 0 0 1.5 0V5.75a.75.75 0 0 0-.75-.75H4.25Z" clip-rule="evenodd" />
						</svg>
					</a>
				</div>
			</div>
		`;
	}

	function buildAccommodationIcon(L: typeof import('leaflet'), highlighted = false) {
		return L.divIcon({
			className: 'boende-marker',
			html: `<span class="boende-marker-pin${highlighted ? ' boende-marker-pin--active' : ''}">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path d="M11.47 3.84a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 1-1.06 1.06l-.22-.22V19.5a2.25 2.25 0 0 1-2.25 2.25H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 1-.75.75H5.25A2.25 2.25 0 0 1 3 19.5v-6.13l-.22.22a.75.75 0 0 1-1.06-1.06l8.75-8.69Z" />
				</svg>
			</span>`,
			iconSize: [36, 44],
			iconAnchor: [18, 40],
			popupAnchor: [0, -36]
		});
	}

	function buildStissesIcon(L: typeof import('leaflet')) {
		return L.divIcon({
			className: 'boende-marker boende-marker--stisses',
			html: `<span class="boende-marker-pin boende-marker-pin--stisses">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
					<path fill-rule="evenodd" d="M11.54 22.351a.75.75 0 0 0 .92 0c5.21-3.913 8.04-7.62 8.04-11.75A8.5 8.5 0 0 0 3.5 10.6c0 4.13 2.83 7.838 8.04 11.75ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
				</svg>
			</span>`,
			iconSize: [44, 52],
			iconAnchor: [22, 48],
			popupAnchor: [0, -44]
		});
	}

	onMount(async () => {
		leaflet = (await import('leaflet')).default;
		await import('leaflet/dist/leaflet.css');

		map = leaflet
			.map(mapEl, {
				scrollWheelZoom: true,
				zoomControl: true
			})
			.setView(STISSES_LOCATION.coordinates as LatLngTuple, 11);

		leaflet
			.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution:
					'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',
				maxZoom: 19
			})
			.addTo(map);

		// Stisses-markör med rik popup (bild + beskrivning + länk)
		const stissesPopupHtml = `
			<div class="boende-popup boende-popup--stisses">
				<img src="${escapeHtml(STISSES_LOCATION.image)}" alt="${escapeHtml(STISSES_LOCATION.imageAlt)}" loading="lazy" />
				<div class="boende-popup-body">
					<h3>${escapeHtml(STISSES_LOCATION.name)}</h3>
					<p>${escapeHtml(STISSES_LOCATION.description())}</p>
					<a href="${safeHttpUrl(STISSES_LOCATION.website)}" target="_blank" rel="noopener noreferrer">
						${escapeHtml(m.accommodations_visit_website())}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
							<path fill-rule="evenodd" d="M4.25 5.5a.75.75 0 0 0 0 1.5H12.19l-6.97 6.97a.75.75 0 1 0 1.06 1.06L13.25 8.06V16a.75.75 0 0 0 1.5 0V5.75a.75.75 0 0 0-.75-.75H4.25Z" clip-rule="evenodd" />
						</svg>
					</a>
				</div>
			</div>
		`;
		stissesMarker = leaflet
			.marker(STISSES_LOCATION.coordinates as LatLngTuple, {
				icon: buildStissesIcon(leaflet),
				zIndexOffset: 1000
			})
			.addTo(map)
			.bindPopup(stissesPopupHtml, {
				maxWidth: 280,
				minWidth: 240,
				autoPan: true,
				autoPanPaddingTopLeft: leaflet.point(20, 20),
				autoPanPaddingBottomRight: leaflet.point(20, 20)
			});

		stissesMarker.on('popupopen', () => {
			activeId = STISSES_LOCATION.id;
		});
		stissesMarker.on('popupclose', () => {
			if (activeId === STISSES_LOCATION.id) activeId = null;
		});
		stissesMarker.on('mouseover', () => {
			hoveredId = STISSES_LOCATION.id;
		});
		stissesMarker.on('mouseout', () => {
			if (hoveredId === STISSES_LOCATION.id) hoveredId = null;
		});

		// Boende-markörer
		const allCoords: LatLngTuple[] = [STISSES_LOCATION.coordinates as LatLngTuple];
		for (const acc of accommodations) {
			const marker = leaflet
				.marker(acc.coordinates as LatLngTuple, { icon: buildAccommodationIcon(leaflet) })
				.addTo(map)
				.bindPopup(buildPopupHtml(acc), {
					maxWidth: 280,
					minWidth: 240,
					autoPan: true,
					// Säkerställ att popup-kortet aldrig kapas av kartans kanter.
					autoPanPaddingTopLeft: leaflet.point(20, 20),
					autoPanPaddingBottomRight: leaflet.point(20, 20)
				});

			marker.on('popupopen', () => {
				activeId = acc.id;
			});
			marker.on('popupclose', () => {
				if (activeId === acc.id) activeId = null;
			});
			marker.on('mouseover', () => {
				hoveredId = acc.id;
			});
			marker.on('mouseout', () => {
				if (hoveredId === acc.id) hoveredId = null;
			});

			markerById[acc.id] = marker;
			allCoords.push(acc.coordinates as LatLngTuple);
		}

		// Anpassa zoom så alla markörer syns
		const bounds = leaflet.latLngBounds(allCoords);
		map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
	});

	onDestroy(() => {
		// Rensa eventuell pågående popup-timeout — utan detta skulle callbacken
		// kunna anropa openPopup() på en marker vars karta redan är borta,
		// vilket kastar ett ohanterat Leaflet-fel.
		if (pendingPopupTimeout !== null) {
			clearTimeout(pendingPopupTimeout);
			pendingPopupTimeout = null;
		}
		if (map) {
			map.remove();
			map = null;
		}
	});

	function focusLocation(coordinates: [number, number], marker: LeafletMarker | null) {
		if (!map || !leaflet || !marker) return;

		// Avbryt eventuell tidigare väntande popup-öppning innan vi schemalägger en ny.
		if (pendingPopupTimeout !== null) {
			clearTimeout(pendingPopupTimeout);
			pendingPopupTimeout = null;
		}

		const targetZoom = 14;
		// Förskjut kartans centrum uppåt i pixel-rummet så markören hamnar i nedre
		// delen av kartan. Då får popup-kortet (som öppnas ovanför markören) plats
		// utan att kapas av kartans överkant.
		const POPUP_OFFSET_PX = 140;
		const targetPoint = map.project(coordinates as LatLngTuple, targetZoom);
		const offsetPoint = targetPoint.subtract([0, POPUP_OFFSET_PX]);
		const offsetLatLng = map.unproject(offsetPoint, targetZoom);

		map.flyTo(offsetLatLng, targetZoom, { duration: 0.8 });
		pendingPopupTimeout = setTimeout(() => {
			pendingPopupTimeout = null;
			// Komponenten kan ha avmonterats medan flyTo pågick.
			if (!map) return;
			marker.openPopup();
		}, 800);
	}

	function focusAccommodation(id: string) {
		const acc = accommodations.find((a) => a.id === id);
		if (!acc) return;
		focusLocation(acc.coordinates, markerById[id]);
	}

	function focusStisses() {
		focusLocation(STISSES_LOCATION.coordinates, stissesMarker);
	}

	// Höjdmarkera markör på hover
	$effect(() => {
		if (!leaflet) return;
		for (const acc of accommodations) {
			const marker = markerById[acc.id];
			if (!marker) continue;
			const highlighted = hoveredId === acc.id || activeId === acc.id;
			marker.setIcon(buildAccommodationIcon(leaflet, highlighted));
		}
	});
</script>

<div class="boende-grid">
	<aside class="boende-list">
		<button
			type="button"
			onclick={focusStisses}
			onmouseenter={() => (hoveredId = STISSES_LOCATION.id)}
			onmouseleave={() => {
				if (hoveredId === STISSES_LOCATION.id) hoveredId = null;
			}}
			class="stisses-card group mb-5 flex w-full gap-3 rounded-xl border-2 p-3 text-left transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
			class:is-active={activeId === STISSES_LOCATION.id}
		>
			<img
				src={STISSES_LOCATION.image}
				alt={STISSES_LOCATION.imageAlt}
				loading="lazy"
				class="h-20 w-24 flex-shrink-0 rounded-lg object-cover"
			/>
			<div class="min-w-0 flex-1">
				<h3 class="truncate text-base font-semibold text-green-900">
					{STISSES_LOCATION.name}
				</h3>
				<p class="mt-1 line-clamp-3 text-sm text-green-900/80">
					{STISSES_LOCATION.description()}
				</p>
			</div>
		</button>

		<h2 class="mb-4 px-1 text-lg font-semibold text-gray-800">
			{m.accommodations_list_title()}
		</h2>
		<ul class="space-y-3">
			{#each accommodations as acc (acc.id)}
				<li>
					<button
						type="button"
						onclick={() => focusAccommodation(acc.id)}
						onmouseenter={() => (hoveredId = acc.id)}
						onmouseleave={() => {
							if (hoveredId === acc.id) hoveredId = null;
						}}
						class="group flex w-full gap-3 rounded-xl border border-transparent bg-white p-3 text-left shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-green-200 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
						class:is-active={activeId === acc.id}
					>
						<img
							src={acc.image}
							alt={acc.imageAlt}
							loading="lazy"
							class="h-20 w-24 flex-shrink-0 rounded-lg object-cover"
						/>
						<div class="min-w-0 flex-1">
							<h3 class="truncate text-base font-semibold text-gray-900 group-hover:text-green-900">
								{acc.name}
							</h3>
							<p class="mt-1 line-clamp-3 text-sm text-gray-600">
								{acc.description()}
							</p>
						</div>
					</button>
				</li>
			{/each}
		</ul>
	</aside>

	<div class="boende-map">
		<div bind:this={mapEl} class="h-full w-full"></div>
	</div>
</div>

<style>
	.boende-grid {
		display: grid;
		grid-template-rows: minmax(60vh, 1fr) auto;
		height: 100%;
		min-height: 540px;
		gap: 0;
		border-radius: 1rem;
		overflow: hidden;
		background: #ffffff;
		box-shadow:
			0 10px 25px -8px rgba(0, 0, 0, 0.12),
			0 4px 10px -6px rgba(0, 0, 0, 0.08);
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.boende-list {
		order: 2;
		overflow-y: auto;
		padding: 1rem 1rem 1.5rem;
		background: #f9fafb;
		border-top: 1px solid #e5e7eb;
	}

	.boende-map {
		order: 1;
		position: relative;
		min-height: 0;
		/* Skapar en stacking context så Leaflet's z-index (upp till 1000) inte
		 * tränger ut och täcker den fixerade navbaren (z-50). */
		isolation: isolate;
		z-index: 0;
	}

	@media (min-width: 1024px) {
		.boende-grid {
			grid-template-rows: 1fr;
			grid-template-columns: minmax(320px, 1fr) 3fr;
		}
		.boende-list {
			order: 1;
			border-top: none;
			border-right: 1px solid #e5e7eb;
		}
		.boende-map {
			order: 2;
		}
	}

	.is-active {
		border-color: rgb(134 239 172) !important;
		box-shadow: 0 4px 14px -2px rgba(34, 197, 94, 0.25) !important;
	}

	.stisses-card {
		background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
		border-color: #86efac;
	}
	.stisses-card:hover {
		border-color: #4ade80;
	}

	/* Leaflet-popup-styling */
	:global(.leaflet-popup-content-wrapper) {
		border-radius: 14px;
		padding: 0;
		overflow: hidden;
		box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.25);
	}
	:global(.leaflet-popup-content) {
		margin: 0 !important;
		width: auto !important;
	}
	:global(.boende-popup) {
		width: 240px;
		font-family: inherit;
	}
	:global(.boende-popup img) {
		width: 100%;
		height: 130px;
		object-fit: cover;
		display: block;
	}
	:global(.boende-popup-body) {
		padding: 12px 14px 14px;
	}
	:global(.boende-popup h3) {
		margin: 0 0 4px;
		font-size: 1rem;
		font-weight: 700;
		color: #111827;
	}
	:global(.boende-popup p) {
		margin: 0 0 10px;
		font-size: 0.875rem;
		line-height: 1.4;
		color: #4b5563;
	}
	/* Leaflet sätter egna a-stilar med hög specificitet (.leaflet-popup-content a),
	 * därför matchar vi samma specificitet och tvingar vit textfärg. */
	:global(.leaflet-popup-content .boende-popup a),
	:global(.boende-popup a),
	:global(.boende-popup a:link),
	:global(.boende-popup a:visited),
	:global(.boende-popup a:hover),
	:global(.boende-popup a:focus),
	:global(.boende-popup a:active) {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 6px 12px;
		border-radius: 8px;
		background: #15803d;
		color: #ffffff !important;
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: background 0.15s ease;
	}
	:global(.leaflet-popup-content .boende-popup a:hover),
	:global(.boende-popup a:hover) {
		background: #166534;
		color: #ffffff !important;
	}
	:global(.boende-popup a svg) {
		width: 14px;
		height: 14px;
	}
	:global(.boende-popup--stisses) {
		width: 240px;
	}

	/* Markörer */
	:global(.boende-marker) {
		background: transparent !important;
		border: none !important;
	}
	:global(.boende-marker-pin) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		border-radius: 50% 50% 50% 0;
		background: #ef4444;
		color: white;
		transform: rotate(-45deg);
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
		transition:
			transform 0.2s ease,
			background-color 0.2s ease;
	}
	:global(.boende-marker-pin svg) {
		transform: rotate(45deg);
		width: 18px;
		height: 18px;
	}
	:global(.boende-marker-pin--active) {
		background: #b91c1c;
		transform: rotate(-45deg) scale(1.15);
	}
	:global(.boende-marker-pin--stisses) {
		width: 44px;
		height: 44px;
		background: #15803d;
	}
	:global(.boende-marker-pin--stisses svg) {
		width: 22px;
		height: 22px;
	}

	/* Popup-pilen ska vara vit */
	:global(.leaflet-popup-tip) {
		background: white;
	}
</style>
