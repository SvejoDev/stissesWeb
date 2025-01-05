import type { Activity } from '$lib/types';
import * as m from '$lib/paraglide/messages';

export const activities: { cykla: Activity } = {
    cykla: {
        title: () => m.activity_bike_title(),
        description: () => m.activity_bike_description(),
        heroImage: '/images/cycling-hero.jpg',
        experiences: []
    }
};