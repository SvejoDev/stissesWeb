import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
const handleParaglide: Handle = i18n.handle();
export const handle: Handle = async ({ event, resolve }) => {
    // sätt max filstorlek till 50MB (justera efter behov)
    const maxPayloadSize = 50 * 1024 * 1024;

    // kontrollera content-length
    const contentLength = Number(event.request.headers.get('content-length'));

    if (contentLength > maxPayloadSize) {
        return new Response('Payload Too Large', { status: 413 });
    }

    return await resolve(event);
};
