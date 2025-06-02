# User Story #001: Configure Google OAuth App for Email Sending

## Story Overview

**As a** website administrator  
**I want** to configure a Google authorized application  
**So that** the Periscoped.io website can send emails through Gmail API for contact form submissions and notifications

## Epic

Email Integration and Notifications

## Priority

High

## Story Points

8

## Acceptance Criteria

### Primary Requirements

1. **Google Cloud Project Setup**
   - [ ] Create a new Google Cloud Project for Periscoped.io
   - [ ] Enable Gmail API for the project
   - [ ] Configure OAuth 2.0 consent screen with appropriate scopes

2. **OAuth Application Configuration**
   - [ ] Create OAuth 2.0 client credentials (Client ID and Client Secret)
   - [ ] Configure authorized redirect URIs for development and production
   - [ ] Set up appropriate OAuth scopes for sending emails (`https://www.googleapis.com/auth/gmail.send`)

3. **Security and Authentication**
   - [ ] Implement secure storage of OAuth credentials in environment variables
   - [ ] Set up refresh token mechanism for long-term access
   - [ ] Configure proper error handling for authentication failures

4. **Integration with Website**
   - [ ] Install and configure Google APIs client library for Node.js
   - [ ] Create email service module that uses Gmail API
   - [ ] Update contact form to use Gmail API instead of default form handler

### Technical Requirements

1. **Environment Configuration**
   - [ ] Add Google OAuth credentials to `.env.sample`
   - [ ] Document required environment variables in README
   - [ ] Configure Vercel environment variables for production

2. **Code Implementation**
   - [ ] Create `lib/email-service.ts` for Gmail API integration
   - [ ] Update `app/actions.ts` to use new email service
   - [ ] Add appropriate TypeScript types for email functionality

3. **Testing and Validation**
   - [ ] Test email sending in development environment
   - [ ] Verify email delivery and formatting
   - [ ] Test error handling for failed email attempts

### Compliance and Security

1. **OAuth Compliance**
   - [ ] Configure OAuth consent screen with proper app information
   - [ ] Add privacy policy and terms of service links
   - [ ] Ensure minimal required scopes are requested

2. **Data Protection**
   - [ ] Implement secure handling of email data
   - [ ] Ensure no sensitive information is logged
   - [ ] Configure proper rate limiting for email sending

## Definition of Done

- [ ] Google Cloud Project is created and configured
- [ ] OAuth 2.0 application is set up with proper credentials
- [ ] Gmail API is successfully integrated into the website
- [ ] Contact form submissions trigger emails through Gmail API
- [ ] All environment variables are properly documented
- [ ] Code is tested in both development and production environments
- [ ] Security best practices are implemented
- [ ] Documentation is updated with setup instructions

## Technical Notes

### Required Environment Variables
```
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
GOOGLE_REFRESH_TOKEN=your-refresh-token
FROM_EMAIL=your-gmail-address
```

### Dependencies to Add
```json
{
  "googleapis": "^131.0.0",
  "nodemailer": "^6.9.8"
}
```

### API Scopes Required
- `https://www.googleapis.com/auth/gmail.send` - Send emails on behalf of the user

## Risks and Considerations

1. **Rate Limiting**: Gmail API has usage limits that need to be considered
2. **OAuth Refresh**: Need to handle token refresh for long-term operation
3. **Deliverability**: Emails sent via API may have different deliverability than SMTP
4. **Security**: OAuth credentials must be securely stored and managed

## Related Stories

- Story #002: Email Template System
- Story #003: Email Analytics and Tracking
- Story #004: Automated Email Responses

## Resources

- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [Google OAuth 2.0 Setup](https://developers.google.com/identity/protocols/oauth2)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables) 