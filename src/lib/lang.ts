import { readable } from 'svelte/store';
import { onSetLanguageTag, languageTag } from '$lib/paraglide/runtime';

export const lang = readable<string>(languageTag, (set) => {
    onSetLanguageTag(set);
});