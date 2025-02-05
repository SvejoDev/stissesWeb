import { fail } from '@sveltejs/kit';
import sgMail from '@sendgrid/mail';
import type { Actions } from './$types';
import { SENDGRID_API_KEY } from '$env/static/private';

// kontrollera att api-nyckeln finns och är korrekt formaterad
if (!SENDGRID_API_KEY) {
    console.error('SendGrid API-nyckel saknas');
} else {
    console.log('API-nyckel hittad, börjar med:', SENDGRID_API_KEY.substring(0, 5));
}

sgMail.setApiKey(SENDGRID_API_KEY);

export const actions = {
    default: async ({ request }) => {
        try {
            const formData = await request.formData();

            // kontrollera honeypot-fältet
            const website = formData.get('website');
            if (website) {
                return fail(400, { success: false });
            }

            // hämta formulärdata
            const firstName = formData.get('firstName');
            const lastName = formData.get('lastName');
            const email = formData.get('email');
            const phone = formData.get('phone');
            const personalNumber = formData.get('personalNumber');
            const driversLicense = formData.get('driversLicense');
            const preferredRole = formData.get('preferredRole');

            // hantera filuppladdningar
            const cv = formData.get('cv') as File;
            const coverLetter = formData.get('coverLetter') as File;

            // konvertera filer till base64
            const cvBase64 = Buffer.from(await cv.arrayBuffer()).toString('base64');
            const coverLetterBase64 = Buffer.from(await coverLetter.arrayBuffer()).toString('base64');

            // skapa e-postmeddelandet
            const msg = {
                to: 'johan.svensson@stisses.se',
                from: 'info@stisses.se',
                replyTo: email as string,
                subject: `Ny jobbansökan: ${preferredRole} - ${firstName} ${lastName}`,
                text: `Ny jobbansökan mottagen...`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h1 style="color: #166534; border-bottom: 2px solid #166534; padding-bottom: 10px;">
                            Ny jobbansökan mottagen
                        </h1>
                        
                        <h2 style="color: #374151; margin-top: 20px;">Personuppgifter</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #6B7280;">Namn:</td>
                                <td style="padding: 8px 0;">${firstName} ${lastName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #6B7280;">E-post:</td>
                                <td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #6B7280;">Telefon:</td>
                                <td style="padding: 8px 0;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #6B7280;">Personnummer:</td>
                                <td style="padding: 8px 0;">${personalNumber}</td>
                            </tr>
                        </table>

                        <h2 style="color: #374151; margin-top: 20px;">Ansökan</h2>
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #6B7280;">Önskad roll:</td>
                                <td style="padding: 8px 0;">${preferredRole}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #6B7280;">Körkort:</td>
                                <td style="padding: 8px 0;">${driversLicense}</td>
                            </tr>
                        </table>

                        <p style="margin-top: 20px; color: #6B7280;">Bilagor: CV och personligt brev bifogas.</p>

                        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E5E7EB; font-size: 0.875rem; color: #6B7280;">
                            <p>Detta mail skickades via jobbansökningsformuläret på stisses.se</p>
                            <p>För att svara, klicka bara på svara i din e-postklient så går svaret direkt till ${firstName} ${lastName} (${email})</p>
                        </div>
                    </div>
                `,
                attachments: [
                    {
                        content: cvBase64,
                        filename: cv.name,
                        type: cv.type,
                        disposition: 'attachment'
                    },
                    {
                        content: coverLetterBase64,
                        filename: coverLetter.name,
                        type: coverLetter.type,
                        disposition: 'attachment'
                    }
                ]
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