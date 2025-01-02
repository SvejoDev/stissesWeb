// src/routes/paddla/+page.ts
import type { PageLoad } from './$types';
import { activities } from '$lib/data/activities';

export const load: PageLoad = ({ url }) => {
    const experience = url.searchParams.get('experience');
    const paddlingData = activities.paddla;

    const selectedExperience = experience
        ? paddlingData.experiences.find(
            exp => (typeof exp.title === 'function' ? exp.title() : exp.title).toLowerCase().replace(/\s+/g, '-') === experience
        )
        : null;

    return {
        metadata: {
            title: selectedExperience
                ? `${selectedExperience.title} | Stisses Sport & Fritid`
                : 'Paddling i Ängelholm | Stisses Sport & Fritid',
            description: selectedExperience
                ? selectedExperience.description
                : paddlingData.description
        }
    };
};