import type { Load } from '@sveltejs/kit';
import * as m from '$lib/paraglide/messages';

export const load: Load = () => {
    return {
        metadata: {
            title: m.teambuilding_meta_title(),
            description: m.teambuilding_meta_description()
        }
    };
};
