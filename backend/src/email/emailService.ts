import { Resend } from 'resend';
import { getInviteScholarEmailHtml, getInviteScholarEmailText } from './templates/inviteScholar';

let resendInstance: Resend | null = null;

const getResendInstance = (): Resend => {
    if (!resendInstance) {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            throw new Error('RESEND_API_KEY environment variable is not set');
        }
        resendInstance = new Resend(apiKey);
    }
    return resendInstance;
};

interface SendInviteEmailParams {
    to: string;
    firstName?: string;
}

/**
 * Send invitation email to a scholar being added to the allow-list
 * @param to - Scholar's email address
 * @param firstName - Scholar's first name (optional)
 * @returns Promise with send result
 */
export const sendInviteEmail = async ({ to, firstName }: SendInviteEmailParams) => {
    try {
        const resend = getResendInstance();

        const emailHtml = getInviteScholarEmailHtml({
            scholarEmail: to,
            scholarFirstName: firstName
        });

        const emailText = getInviteScholarEmailText({
            scholarEmail: to,
            scholarFirstName: firstName
        });

        const result = await resend.emails.send({
            from: process.env.FROM_EMAIL || 'Onyx Initiative <mike@joinaerium.com>',
            to: [to],
            subject: 'You\'re Invited to Join the Onyx Initiative Job Board!',
            html: emailHtml,
            text: emailText,
        });

        console.log(`Invitation email sent successfully to ${to}:`, result);
        return { success: true, data: result };
    } catch (error) {
        console.error(`Error sending invitation email to ${to}:`, error);
        return { success: false, error };
    }
};

/**
 * Send invitation emails to multiple scholars
 * @param scholars - Array of scholars with firstName and email
 * @returns Promise with results for all emails
 */
export const sendBulkInviteEmails = async (scholars: Array<{ firstName: string; email: string }>) => {
    const results = await Promise.allSettled(
        scholars.map(scholar =>
            sendInviteEmail({ to: scholar.email, firstName: scholar.firstName })
        )
    );

    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    console.log(`Bulk invitation email send complete: ${successful} successful, ${failed} failed`);

    return {
        total: scholars.length,
        successful,
        failed,
        results
    };
};
