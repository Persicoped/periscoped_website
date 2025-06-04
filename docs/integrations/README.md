# Periscoped.io Website Integrations

This directory contains all third-party service integrations, user stories, and configuration documentation for the Periscoped.io website.

## Integration Strategy

The website follows a modular integration approach, where each service integration is:
- Self-contained with its own documentation
- Independently configurable
- Following security best practices
- Properly tested and validated

## Current Integrations

### Google Workspace (`google_workspace/`)
- Gmail API for email sending
- OAuth 2.0 authentication
- Future: Drive, Calendar, Analytics

### Planned Integrations

- **AWS Services** - SES, S3, Lambda integration
- **Stripe** - Payment processing for future paid services
- **Slack** - Team notifications and webhooks
- **Analytics** - Google Analytics 4, Mixpanel
- **CRM** - HubSpot or Salesforce integration
- **Monitoring** - Sentry error tracking, LogRocket

## User Stories

User stories are organized by integration type in their respective folders:
- Each integration has its own folder
- Stories are numbered sequentially (001, 002, etc.)
- Stories follow standard agile format with acceptance criteria

## Integration Standards

### Security Requirements
- All API keys stored in environment variables
- OAuth tokens properly refreshed
- Rate limiting implemented
- Error handling and fallbacks

### Documentation Requirements
- Setup instructions in each integration folder
- Environment variable documentation
- Testing procedures
- Troubleshooting guides

### Code Standards
- TypeScript types for all integrations
- Proper error handling
- Logging for debugging
- Unit tests where applicable

## Directory Structure

```
integrations/
├── README.md                    # This file
├── user_stories/               # General integration user stories
├── google_workspace/           # Google services integration
│   ├── README.md
│   └── 001-google-oauth-email-configuration.md
└── [future integration folders]
```

## Getting Started

1. Choose the integration you want to implement
2. Read the integration-specific README
3. Follow the user story acceptance criteria
4. Configure environment variables
5. Test in development before production deployment

## Environment Configuration

Each integration requires specific environment variables. See individual integration READMEs for details.

## Support and Troubleshooting

For integration issues:
1. Check the specific integration's README
2. Verify environment variables are correctly set
3. Check API quotas and rate limits
4. Review error logs for specific error messages

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

## Vercel Integration

- **deploy-to-vercel.sh** - Script for deploying the site to Vercel
- All Vercel-related documentation and scripts should be placed in this folder for easy access and organization.

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
vercel/
├── deploy-to-vercel.sh                    # Vercel deployment script
└── [future Vercel integration files]
``` 