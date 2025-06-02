import { google } from 'googleapis';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

export async function sendContactEmail(formData: ContactFormData): Promise<boolean> {
  try {
    // OAuth2 client setup
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000' // This doesn't matter for server-side use
    );

    // Set credentials
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // Initialize Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Create email content
    const emailSubject = `New Partnership Inquiry from ${formData.name}`;
    const emailBody = `New partnership inquiry received from the Periscoped.io website:

Name: ${formData.name}
Email: ${formData.email}
Company: ${formData.company || 'Not provided'}

Message:
${formData.message}

---
Sent from Periscoped.io Contact Form`;

    // Create raw email message
    const rawMessage = [
      `From: ${process.env.FROM_EMAIL}`,
      `To: ${process.env.FROM_EMAIL}`,
      `Reply-To: ${formData.email}`,
      `Subject: ${emailSubject}`,
      '',
      emailBody
    ].join('\n');

    // Encode the email in base64url format
    const encodedMessage = Buffer.from(rawMessage)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send email using Gmail API
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });

    console.log('Email sent successfully via Gmail API');
    return true;

  } catch (error) {
    console.error('Error sending email via Gmail API:', error);
    return false;
  }
} 