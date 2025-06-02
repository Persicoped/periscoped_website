# Google Workspace Integration

This folder contains all documentation, user stories, and configuration files related to integrating Periscoped.io website with Google Workspace services.

## Overview

Google Workspace integration enables the website to:
- Send emails through Gmail API
- Authenticate users via Google OAuth
- Access Google Drive for file storage (future)
- Integrate with Google Calendar (future)
- Use Google Analytics for tracking (future)

## Current Features

### Email Integration
- **001-google-oauth-email-configuration.md** - User story for setting up Gmail API to send emails from contact forms

## Planned Integrations

- Google Drive API for file attachments
- Google Calendar API for scheduling
- Google Analytics 4 for website tracking
- Google Tag Manager for marketing
- Google Workspace Admin for user management

## Security Considerations

All Google Workspace integrations must follow:
- OAuth 2.0 best practices
- Minimal required scopes
- Secure credential storage
- Regular token refresh
- Rate limiting compliance

## Environment Variables

Google Workspace integrations require these environment variables:
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
FROM_EMAIL=your-gmail-address
```

## Setup Prerequisites

1. Google Cloud Project with appropriate APIs enabled
2. OAuth 2.0 consent screen configured
3. Service account or OAuth credentials created
4. Environment variables configured in development and production

## Documentation Structure

```
google_workspace/
├── README.md                              # This file
├── 001-google-oauth-email-configuration.md # Email setup user story
└── [future integration files]
``` 