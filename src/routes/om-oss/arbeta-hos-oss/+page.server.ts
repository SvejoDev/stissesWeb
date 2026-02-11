import { fail } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import type { Actions } from './$types';
import { SENDGRID_API_KEY } from '$env/static/private';


sgMail.setApiKey(SENDGRID_API_KEY);

export const actions = {
    default: async ({ request }) => {
        try {
            const IP = request.headers.get('x-forwarded-for') || 'unknown';
            const rateLimitKey = `job-application:${IP}`;
            // implementera rate limiting logik här

            const formData = await request.formData();

            // kontrollera honeypot-fältet
            const website = formData.get('website');
            if (website) {
                return fail(400, { success: false });
            }

            // hämta formulärdata
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email')?.toString();
            const personalNumber = formData.get('personalNumber');
            const driversLicense = formData.get('driversLicense');
            const preferredRole = formData.get('preferredRole');

            // hantera filuppladdningar
            const cv = formData.get('cv') as File;
            const coverLetter = formData.get('coverLetter') as File;

            // konvertera filer till base64
            const cvBase64 = Buffer.from(await cv.arrayBuffer()).toString('base64');
            const coverLetterBase64 = Buffer.from(await coverLetter.arrayBuffer()).toString('base64');

            // kontrollera e-postadressen
            if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                return fail(400, {
                    success: false,
                    message: 'Ogiltig e-postadress'
                });
            }

            // skapa e-postmeddelandet
            const msg = {
                to: [
                    'johan.svensson@stisses.se',
                    'info@stisses.se'
                ],
                from: {
                    email: 'info@stisses.se',
                    name: 'Stisses Rekrytering'
                },
                replyTo: email as string,
                subject: `Jobbansökan: ${preferredRole} från ${firstName} ${lastName}`,
                headers: {
                    'List-Unsubscribe': '<mailto:rekrytering@stisses.se>',
                    'Precedence': 'bulk',
                    'X-Entity-Ref-ID': `job-application-${Date.now()}`,
                    'X-Priority': '3',
                    'Message-ID': `<${Date.now()}.${Math.random().toString(36).substring(2)}@stisses.se>`,
                    'X-Mailer': 'Stisses Application System'
                },
                categories: ['job-application'],
                customArgs: {
                    application_type: 'job',
                    role: preferredRole
                },
                text: `Ny jobbansökan från ${firstName} ${lastName} för position: ${preferredRole}`,
                html: `
                    <!DOCTYPE html>
                    <html lang="sv">
                    <head>
                        <meta charset="utf-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <meta name="x-apple-disable-message-reformatting">
                        <title>Jobbansökan</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
                            <h1 style="color: #166534; margin-bottom: 20px;">Ny Jobbansökan</h1>
                            
                            <div style="background-color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
                                <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Personuppgifter</h2>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #6B7280; width: 140px;">Namn:</td>
                                        <td style="padding: 8px 0;">${firstName} ${lastName}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6B7280;">E-post:</td>
                                        <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #166534;">${email}</a></td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6B7280;">Personnummer:</td>
                                        <td style="padding: 8px 0;">${personalNumber}</td>
                                    </tr>
                                </table>
                            </div>

                            <div style="background-color: white; padding: 20px; border-radius: 4px;">
                                <h2 style="color: #374151; font-size: 18px; margin-bottom: 15px;">Ansökningsdetaljer</h2>
                                <table style="width: 100%; border-collapse: collapse;">
                                    <tr>
                                        <td style="padding: 8px 0; color: #6B7280; width: 140px;">Sökt tjänst:</td>
                                        <td style="padding: 8px 0;">${preferredRole}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 8px 0; color: #6B7280;">Körkort:</td>
                                        <td style="padding: 8px 0;">${driversLicense === 'yes' ? 'Ja' : 'Nej'}</td>
                                    </tr>
                                </table>
                            </div>

                            <p style="margin-top: 20px; color: #6B7280; font-size: 14px;">
                                CV och personligt brev finns bifogade som bilagor.
                            </p>
                        </div>
                    </body>
                    </html>
                `,
                trackingSettings: {
                    clickTracking: {
                        enable: true
                    },
                    openTracking: {
                        enable: true
                    }
                },
                attachments: [
                    {
                        content: cvBase64,
                        filename: cv.name,
                        type: cv.type,
                        disposition: 'attachment',
                        content_id: 'cv'
                    },
                    {
                        content: coverLetterBase64,
                        filename: coverLetter.name,
                        type: coverLetter.type,
                        disposition: 'attachment',
                        content_id: 'coverLetter'
                    }
                ],
                mail_settings: {
                    sandbox_mode: {
                        enable: false
                    }
                }
            };

            // skicka e-postmeddelandet
            await sgMail.send(msg);

            return {
                success: true,
                message: 'Din ansökan har skickats!'
            };

        } catch (error) {
            console.error('Error:', error);
            return fail(500, {
                success: false,
                message: 'Ett fel uppstod när ansökan skulle skickas. Försök igen senare.'
            });
        }
    }
} satisfies Actions; 