# TieCodes Website

Marketing site for **TieCodes** — fleet management, GPS tracking, driver apps, taxi dispatch, and custom load boards.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Theme: *Tie Signal* (LinkedIn-aligned cyan `#2EB7E5` + navy `#0A1628`)

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — local development
- `npm run build` — production build
- `npm run start` — serve production build

## Pages

- `/` — Home
- `/solutions` — Product lines
- `/solutions/[slug]` — Fleet, GPS, Drivers, Taxi, Load Board
- `/services` — Services
- `/about` — Company
- `/contact` — Contact form (mailto)

Content lives in `lib/content.ts`.
