# Deployment Guide - Periscoped.io Website

## Vercel Deployment

This guide covers deploying the Periscoped.io website to Vercel using the provided deployment script.

### Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Git repository connected to your Vercel account
- Vercel account (free tier available)

### Quick Deployment

1. **Run the deployment script:**
   ```bash
   ./docs/deploy-to-vercel.sh
   ```

   The script will automatically:
   - Install Vercel CLI if not present
   - Install project dependencies
   - Run linting checks
   - Build the production version
   - Deploy to Vercel

### Manual Deployment Steps

If you prefer manual deployment:

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel --prod
   ```

### Environment Variables

The website currently doesn't require environment variables, but if you add any:

1. Go to your Vercel dashboard
2. Select your project
3. Navigate to Settings → Environment Variables
4. Add your variables for Production, Preview, and Development

### Custom Domain Setup

1. In Vercel dashboard, go to your project
2. Navigate to Settings → Domains
3. Add your custom domain (e.g., periscoped.io)
4. Follow Vercel's DNS configuration instructions

### Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to the `main` branch
- **Preview**: When you push to any other branch or open a PR

### Build Configuration

The project uses Next.js default build settings. If you need custom configuration, create a `vercel.json` file in the project root:

```json
{
  "framework": "nextjs",
  "buildCommand": "pnpm build",
  "installCommand": "pnpm install"
}
```

### Troubleshooting

**Build Failures:**
- Check that all dependencies are in `package.json`
- Ensure TypeScript types are correct
- Run `pnpm build` locally to test

**Deployment Issues:**
- Verify Vercel CLI is authenticated: `vercel whoami`
- Check project settings in Vercel dashboard
- Review build logs in Vercel dashboard

### Performance Optimizations

The website is optimized for Vercel with:
- Next.js 15 App Router
- Automatic code splitting
- Image optimization
- Static generation where possible
- Edge runtime support 