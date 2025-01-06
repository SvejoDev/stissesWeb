import type { PageLoad } from './$types';
import * as m from '$lib/paraglide/messages';

export const load: PageLoad = () => {
    return {
        metadata: {
            title: m.internship_title(),
            description: m.internship_intro()
        }
    };
};