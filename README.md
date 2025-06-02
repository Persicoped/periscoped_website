# Periscoped.io Website

## Overview

The official website for Periscoped.io - an AI-first development team that builds market-disrupting software and operational systems with unparalleled speed and quality.

## Tech Stack

- **Framework**: Next.js 15.2.4 with TypeScript
- **Styling**: Tailwind CSS with custom configurations
- **UI Components**: Radix UI components with custom styling
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Animations**: Tailwind CSS animations
- **Development**: TypeScript, ESLint, PostCSS

## Features

- Modern, responsive design with dark theme
- Interactive typewriter headline animation
- Partnership inquiry contact form
- Smooth scrolling navigation
- Mobile-first responsive layout
- SEO-optimized single-page application
- Gradient backgrounds and modern UI elements

## Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd periscoped_website
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
pnpm build
pnpm start
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main landing page
│   ├── layout.tsx         # Root layout
│   ├── globals.css        # Global styles
│   └── actions.ts         # Server actions
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/ui components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Additional stylesheets
└── tailwind.config.ts    # Tailwind configuration
```

## Development

- Run `pnpm dev` for development server
- Run `pnpm lint` to check for linting errors
- Run `pnpm build` to create production build

## Deployment

This Next.js application can be deployed on Vercel, Netlify, or any platform supporting Node.js applications.

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

All rights reserved - Periscoped.io 