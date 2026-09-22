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

## Portfolio API

The editable portfolio backend runs inside the Next.js application. It uses
Prisma with MySQL, protects admin mutations with an HTTP-only cookie, and
supports local uploads or Azure Blob Storage.

### Local setup

```bash
docker compose up -d
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run prisma:seed
npm run dev
```

The public site and API are served by one Next.js process at
`http://localhost:3000`.

The local MySQL port is `3307` and is bound to `127.0.0.1`, so it is not
reachable from the network. The seeded development admin values come from the
root `.env`.

Public API routes are `GET /api/v1/projects` and
`GET /api/v1/projects/:slug`. Admin login is `POST /api/v1/auth/login`; project
creation, editing, deletion, and image upload require the admin cookie.

### Production configuration

Change environment variables only when deploying: use a managed MySQL
connection string, a long random `AUTH_SECRET`, and
`STORAGE_PROVIDER=azure` with Azure Blob credentials. Local disk
uploads are for development only and are not durable across server instances.
