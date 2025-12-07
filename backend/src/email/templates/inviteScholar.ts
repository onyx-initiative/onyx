interface InviteScholarEmailProps {
    scholarEmail: string;
    scholarFirstName?: string;
}

export const getInviteScholarEmailHtml = ({ scholarEmail, scholarFirstName }: InviteScholarEmailProps): string => {
    const greeting = scholarFirstName ? `Hi ${scholarFirstName},` : 'Hi,';
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>You're Invited to Join Onyx Initiative</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; background-color: #FAFAFA;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td align="center" style="padding: 40px 20px;">
                <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);">
                    <!-- Header -->
                    <tr>
                        <td style="padding: 40px 40px 30px; background-color: #806E54; text-align: center;">
                            <h1 style="margin: 0 0 8px; color: #ffffff; font-size: 32px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
                                ONYX INITIATIVE
                            </h1>
                        </td>
                    </tr>

                    <!-- Body -->
                    <tr>
                        <td style="padding: 40px;">
                            <p style="margin: 0 0 24px; color: #2C2C2C; font-size: 18px; line-height: 1.6; font-weight: 500;">
                                ${greeting}
                            </p>

                            <p style="margin: 0 0 24px; color: #4A4A4A; font-size: 16px; line-height: 1.7;">
                                Congratulations on becoming an Onyx Scholar! You've now been invited to join the Onyx job board - an exclusive platform giving you access to career opportunities from our partners.
                            </p>

                            <div style="margin: 32px 0; padding: 24px; background-color: #F9F8F6; border-left: 4px solid #806E54; border-radius: 4px;">
                                <h3 style="margin: 0 0 16px; color: #806E54; font-size: 18px; font-weight: 600;">As part of the platform, you can:</h3>
                                <ul style="margin: 0; padding-left: 20px; color: #4A4A4A; font-size: 15px; line-height: 1.9;">
                                    <li style="margin-bottom: 8px;">Access exclusive job postings from top employers</li>
                                    <li style="margin-bottom: 8px;">Set custom views based on types of jobs you're interested in</li>
                                    <li>Bookmark and track opportunities that interest you</li>
                                </ul>
                            </div>

                            <p style="margin: 0 0 24px; color: #4A4A4A; font-size: 16px; line-height: 1.7;">
                                To get started, please create your account at the link below:
                            </p>

                            <div style="text-align: center; margin: 36px 0;">
                                <a href="${process.env.FRONTEND_URL || 'https://onyx-jobs.vercel.app//'}"
                                   style="display: inline-block; padding: 16px 40px; background-color: #806E54; color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 16px; letter-spacing: 0.5px; text-transform: uppercase; transition: background-color 0.3s;">
                                    Create Your Account
                                </a>
                            </div>

                            <p style="margin: 0 0 24px; color: #4A4A4A; font-size: 16px; line-height: 1.7;">
                                Please reach out to us if you have any questions!
                            </p>

                            <p style="margin: 32px 0 0; color: #4A4A4A; font-size: 16px; line-height: 1.7;">
                                Best regards,<br><br>
                                <strong style="color: #806E54;">The Onyx Initiative Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="padding: 32px 40px; background-color: #F9F8F6; text-align: center; border-top: 1px solid #E8E5E0;">
                            <p style="margin: 0; color: #999999; font-size: 12px;">
                                © ${new Date().getFullYear()} Onyx Initiative. All rights reserved.
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `.trim();
};

export const getInviteScholarEmailText = ({ scholarEmail, scholarFirstName }: InviteScholarEmailProps): string => {
    const greeting = scholarFirstName ? `Hi ${scholarFirstName},` : 'Hi,';
    return `
ONYX INITIATIVE - JOB BOARD INVITATION

${greeting}

Congratulations on becoming an Onyx Scholar! You've now been invited to join the Onyx job board - an exclusive platform giving you access to exclusive career opportunities from our partners.

As part of the platform, you will get:
• Access exclusive job postings from top employers
• Set custom views based on types of jobs you're interested in
• Bookmark and track opportunities that interest you

To get started, please create your account at the link below:
${process.env.FRONTEND_URL || 'https://jobs.onyxinitiative.org/'}

Please reach out to us if you have any questions!

Best regards,

The Onyx Initiative Team

© ${new Date().getFullYear()} Onyx Initiative. All rights reserved.
    `.trim();
};
