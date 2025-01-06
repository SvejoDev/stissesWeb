import type { PageLoad } from './$types';
import * as m from '$lib/paraglide/messages';
export const load: PageLoad = () => {
    return {
        metadata: {
            title: m.about_us_title(),
            description: m.about_us_description()
        }
    };
};