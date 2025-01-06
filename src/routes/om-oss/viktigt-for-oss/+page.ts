import type { Load } from '@sveltejs/kit';
import * as m from '$lib/paraglide/messages';

export const load: Load = () => {
    return {
        metadata: {
            title: m.important_title(),
            description: m.important_description()
        }
    };
};