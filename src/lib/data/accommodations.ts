import * as m from '$lib/paraglide/messages';

export type Accommodation = {
	id: string;
	name: string; // statiskt egennamn — översätts inte
	description: () => string;
	coordinates: [number, number]; // [lat, lng]
	website: string;
	image: string; // sökväg från /static
	imageAlt: string;
};

// Stisses bas vid Tullakrok i Hembygdsparken, Ängelholm.
// Adress (enligt hitta.se / Bolagsverket): "Tullakrok, 262 33 Ängelholm".
// Koordinater: Tullakrok-platsen i Hembygdsparken via Nominatim/OpenStreetMap.
export const STISSES_LOCATION: {
	id: 'stisses';
	coordinates: [number, number];
	name: string;
	website: string;
	image: string;
	imageAlt: string;
	description: () => string;
} = {
	id: 'stisses',
	coordinates: [56.254346, 12.8583],
	name: 'Stisses Sport & Fritid',
	website: 'https://www.stisses.se/',
	image: '/images/family-kayaking.jpg',
	imageAlt: 'Familj som paddlar kajak vid Stisses Sport & Fritid',
	description: () => m.accommodations_stisses_card_description()
};

// Koordinater verifierade via Nominatim (OpenStreetMap). Justera vid behov.
export const accommodations: Accommodation[] = [
	{
		id: 'hotell-erikslund',
		name: 'Hotell Erikslund',
		description: () => m.accommodation_erikslund_description(),
		coordinates: [56.1940291, 12.8557669],
		website: 'https://www.hotellerikslund.se/',
		image: '/images/boende/HotellErikslund.jpg',
		imageAlt: 'Hotell Erikslund i Ängelholm'
	},
	{
		id: 'hus57',
		name: 'Best Western Plus Hus 57',
		description: () => m.accommodation_hus57_description(),
		coordinates: [56.2465461, 12.8664127],
		website: 'https://www.hus57.se/',
		image: '/images/boende/Hus57.jpg',
		imageAlt: 'Best Western Plus Hus 57 i centrala Ängelholm'
	},
	{
		id: 'klitterhus',
		name: 'Klitterhus Havsbadshotell',
		description: () => m.accommodation_klitterhus_description(),
		coordinates: [56.2641494, 12.8359974],
		website: 'https://www.klitterhus.nu/',
		image: '/images/boende/klitterhus.jpg',
		imageAlt: 'Klitterhus Havsbadshotell vid Skäldervikens strand'
	},
	{
		id: 'margretetorp',
		name: 'Margretetorps Gästgifvaregård',
		description: () => m.accommodation_margretetorp_description(),
		coordinates: [56.3357540755345, 12.8890657424927],
		website: 'https://www.margretetorp.se/',
		image: '/images/boende/Margretetorp.webp',
		imageAlt: 'Margretetorps Gästgifvaregård vid Hallandsåsen'
	}
];
