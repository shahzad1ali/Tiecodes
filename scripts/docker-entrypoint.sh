#!/bin/sh
set -eu

echo "==> Running database migrations"
npx prisma migrate deploy

echo "==> Seeding admin user"
npx tsx prisma/seed.ts

echo "==> Starting Next.js"
exec node server.js
