import type { Activity } from '$lib/types';
import * as m from '$lib/paraglide/messages';

export const activities: { fiska: Activity } = {
    fiska: {
        title: () => m.activity_fish_title(),
        description: () => m.activity_fish_description(),
        heroImage: '/images/fishing-hero.jpg',
        experiences: []
    }
};