import type { Load } from '@sveltejs/kit';
import * as m from '$lib/paraglide/messages';

export const load: Load = () => {
    return {
        metadata: {
            title: m.contact_title(),
            description: m.contact_subtitle()
        }
    };
};