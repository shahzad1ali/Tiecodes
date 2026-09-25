# TieCodes Website

Marketing site + portfolio admin for **TieCodes** (fleet, GPS, drivers, logistics).

## Stack

- Next.js 16 (App Router) + TypeScript
- Prisma + MySQL
- Tailwind CSS + shadcn/ui
- Framer Motion

## Local development

```bash
cp .env.example .env
# set ADMIN_EMAIL, ADMIN_PASSWORD, AUTH_SECRET

docker compose up -d          # MySQL on 127.0.0.1:3307
npm install
npm run db:deploy             # migrate + seed admin
npm run dev
```

- Site: http://localhost:3000  
- Admin: http://localhost:3000/admin/login  

Or one-shot local DB setup: `npm run setup:admin` (requires Docker access).

## Production (server)

### Option A — Docker Compose (recommended on a VPS)

1. Clone the repo on the server.
2. `cp .env.example .env` and set real values:

```env
MYSQL_PASSWORD=strong-db-password
MYSQL_ROOT_PASSWORD=strong-root-password
AUTH_SECRET=at-least-32-random-characters-here
ADMIN_EMAIL=you@company.com
ADMIN_PASSWORD=strong-admin-password
STORAGE_PROVIDER=local
APP_PORT=3000
```

3. Start:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

On boot the container runs migrations, seeds the admin user, then starts the app.  
Open `https://your-domain/admin/login`.

### Option B — Node on the server (managed MySQL)

```bash
cp .env.example .env   # set DATABASE_URL, AUTH_SECRET, ADMIN_*
npm ci
npm run build
npm run db:deploy
npm start
```

Use a process manager (systemd / PM2) and put Nginx/Caddy in front for HTTPS.

### Required production env

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | MySQL connection string |
| `AUTH_SECRET` | 32+ char secret for admin cookies |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Seeded admin login |
| `STORAGE_PROVIDER` | `local` (single VPS + volume) or `azure` |

Never commit `.env`. Only `.env.example` is in git.

## Scripts

| Script | Use |
|--------|-----|
| `npm run dev` | Local Next.js |
| `npm run build` | Production build |
| `npm start` | Serve build |
| `npm run db:deploy` | `prisma migrate deploy` + seed admin |
| `npm run setup:admin` | Local Docker MySQL + migrate + seed |

## Admin & API

- Login UI: `/admin` or `/admin/login`
- Manage projects: `/admin/projects` (auth cookie required)
- Health: `GET /api/v1/health`
- Public projects: `GET /api/v1/projects`

`/admin` is disallowed in `robots.txt`.
