# Stars Academy Karaikal — Coaching Center Website

A complete, production-ready coaching institute website for **Stars Academy Karaikal**, an education center and tutoring service for Classes 9–12, focusing on CBSE and Tamil Nadu State Board exam preparation.

**Tagline:** Learn • Practice • Score • Succeed

## Features

- **Home Page** — Hero banner, announcements, upcoming tests, popular courses, question of the day, weekly/monthly challenges, top rankers, testimonials, faculty section, why choose us, statistics counter, gallery, latest news, contact CTA
- **Online Test System** — Real quiz engine with timer, auto-submit, question palette, bookmarking, review later, negative marking, instant results with explanations
- **Question Bank** — 60+ questions across CBSE & State Board, Classes 9–12, with MCQ, True/False, Fill in the Blanks, and Assertion & Reason types
- **Student Dashboard** — Test history, progress charts (Chart.js), bookmarks, certificates, profile management
- **Leaderboard** — Overall, subject-wise, weekly, monthly, and class rankings
- **Study Materials** — Notes, PDFs, videos, question banks, sample papers, previous year papers
- **Authentication** — Student registration, login, protected routes (Supabase Auth)
- **Dark Mode** — Full light/dark theme support
- **Responsive** — Mobile-first design for all viewport sizes
- **SEO** — Meta tags, Open Graph, Twitter Cards, structured data, robots.txt, sitemap.xml

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — Build tool
- **Tailwind CSS** — Styling
- **React Router** — Routing (lazy-loaded pages)
- **Supabase** — Authentication & database
- **Chart.js + react-chartjs-2** — Progress analytics
- **Lucide React** — Icons

## Getting Started

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment (Netlify)

The project is configured for Netlify deployment with `netlify.toml` and `public/_redirects`.

1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Environment variables are pre-configured

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer, Layout, FloatingButtons
│   └── ui/              # SectionHeader, Card, Badge
├── context/             # ThemeContext, AuthContext
├── data/                # Questions, tests, courses, faculty, etc.
├── lib/                 # Supabase client
├── pages/               # All page components
├── App.tsx              # Router + providers
├── main.tsx             # Entry point
└── index.css            # Global styles + Tailwind
```

## Contact

- **Address:** MGJ Nagar, Near New Bus Stand, Karaikal Bazaar, Karaikal, Puducherry 609602
- **Phone:** +91 96555 16285
- **Email:** info@starsacademy.org
- **Hours:** Mon–Sat 9:00 AM – 8:00 PM, Sunday Closed
