#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

// Load environment variables from .env.local
function loadEnvFile() {
  try {
    const envPath = path.join(process.cwd(), '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    
    envFile.split('\n').forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        process.env[key.trim()] = value.trim();
      }
    });
  } catch (error) {
    console.log('No .env.local file found, using existing environment variables');
  }
}

// Load environment variables
loadEnvFile();

async function sendCostReportEmail(toEmail, subject, htmlFilePath) {
  try {
    // Read HTML content
    const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

    // OAuth2 client setup (using existing credentials)
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      'http://localhost:3000'
    );

    // Set credentials
    oauth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });

    // Initialize Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Create raw email message with HTML
    const rawMessage = [
      `From: ${process.env.FROM_EMAIL}`,
      `To: ${toEmail}`,
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=UTF-8',
      '',
      htmlContent
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

    console.log('AWS Cost Report email sent successfully via Gmail API');
    return true;

  } catch (error) {
    console.error('Error sending AWS cost report email:', error);
    return false;
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length !== 3) {
    console.error('Usage: node send_aws_report.js <to_email> <subject> <html_file>');
    process.exit(1);
  }

  const [toEmail, subject, htmlFile] = args;
  
  sendCostReportEmail(toEmail, subject, htmlFile)
    .then(success => {
      process.exit(success ? 0 : 1);
    })
    .catch(error => {
      console.error('Unexpected error:', error);
      process.exit(1);
    });
} 