import type { PageLoad } from './$types';

export const load: PageLoad = () => {
    return {
        metadata: {
            title: 'Kartor | Stisses Sport & Fritid',
            description: 'Utforska våra paddlingleder med detaljerade kartor för korta turer och längre äventyr. Perfekt för planering av ditt nästa paddlings-äventyr.'
        }
    };
}; 