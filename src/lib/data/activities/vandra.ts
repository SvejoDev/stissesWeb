import type { Activity } from '$lib/types';
import * as m from '$lib/paraglide/messages';

export const activities: { vandra: Activity } = {
    vandra: {
        title: () => m.activity_hike_title(),
        description: () => m.activity_hike_description(),
        heroImage: '/images/hiking-hero.jpg',
        experiences: []
    }
};