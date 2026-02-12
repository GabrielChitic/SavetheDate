# Wedding Save the Date

A beautiful and responsive wedding "Save the Date" website built with Next.js, TypeScript, and Tailwind CSS.

## Prerequisites

- Node.js LTS (v18 or higher)
- npm (comes with Node.js)

## Getting Started

### Installation

1. Clone or navigate to this directory:
   ```bash
   cd wedding-save-the-date
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Stopping the Server

Press `Ctrl + C` in the terminal where the dev server is running.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm start` - Start the production server (after building)
- `npm run lint` - Run ESLint to check code quality

## Project Structure

```
wedding-save-the-date/
├── app/
│   ├── page.tsx          # Main homepage
│   ├── layout.tsx        # Root layout with metadata
│   └── globals.css       # Global styles with Tailwind
├── public/
│   └── images/           # Wedding photos and assets
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── next.config.ts        # Next.js configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Images

All wedding photos and visual assets should be placed in the `/public/images` directory.

### Recommended Filenames

Place your real photos in `/public/images/` with these filenames:

- **hero.jpg** - Main hero/background image for the welcome section (recommended: 1920x1080 or larger)
- **couple-1.jpg** - First couple photo for additional sections
- **couple-2.jpg** - Second couple photo for additional sections
- **floral-left.png** - Decorative floral element (left side, transparent PNG)
- **floral-right.png** - Decorative floral element (right side, transparent PNG)

### How to Reference Images in Code

All images in `/public/` can be referenced directly from the root path:

```tsx
// Example in JSX/TSX
<img src="/images/hero.jpg" alt="Hero" />

// Example with Next.js Image component
import Image from 'next/image';
<Image src="/images/couple-1.jpg" alt="Couple" width={800} height={600} />

// Example as CSS background
<div style={{ backgroundImage: "url('/images/hero.jpg')" }}>

// Example with Tailwind CSS
<div className="bg-[url('/images/hero.jpg')]">
```

### Tips

- Use JPEG format for photos (smaller file size)
- Use PNG format for graphics with transparency (florals, decorative elements)
- Optimize images before uploading (compress to reduce load times)
- Keep original aspect ratios to avoid distortion

## Features

- Responsive design that works on all devices
- Smooth scrolling navigation
- Four main sections:
  - **Acasă (Home)** - Hero section with Save the Date announcement
  - **Când? (When?)** - Event date information
  - **Unde? (Where?)** - Venue location details
  - **Confirmare (RSVP)** - Placeholder for RSVP form (to be implemented)

## Next Steps

- [ ] Replace `/public/hero.jpg` with your actual wedding photo
- [ ] Update couple names (Ana & Mihai) in `app/page.tsx`
- [ ] Update wedding date and location details
- [ ] Add RSVP form integration
- [ ] Add Google Maps integration for venue location
- [ ] Customize colors and styling to match your theme
- [ ] Add additional sections (e.g., Our Story, Wedding Party, Accommodation)

## Publishing to GitHub

When you're ready to publish this project to GitHub:

1. Create a new repository on GitHub (don't initialize with README)
2. Add the remote:
   ```bash
   git remote add origin https://github.com/yourusername/wedding-save-the-date.git
   ```
3. Push your code:
   ```bash
   git push -u origin main
   ```

## Deployment

This Next.js app can be easily deployed to:
- [Vercel](https://vercel.com) (recommended, made by Next.js creators)
- [Netlify](https://netlify.com)
- Any hosting service that supports Node.js

## Customization

### Updating Content

Edit `app/page.tsx` to update:
- Couple names
- Wedding date
- Venue information
- Contact email

### Styling

- Global styles: `app/globals.css`
- Tailwind configuration is built into the CSS using Tailwind v4
- Component styles are inline using Tailwind utility classes

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Fonts**: Geist Sans & Geist Mono (via next/font)
- **Package Manager**: npm

## Support

For questions or issues with Next.js, refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

Made with ❤️ for your special day
