#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

compose() {
  docker compose -f "$ROOT/docker-compose.yml" --project-directory "$ROOT" "$@"
}

echo "==> Starting MySQL (Docker)"
if compose up -d; then
  :
else
  echo "Docker is not available for this user (permission denied on docker.sock)."
  echo "Fix once with:"
  echo "  sudo usermod -aG docker \"\$USER\""
  echo "  newgrp docker"
  echo "Then re-run: npm run setup:admin"
  exit 1
fi

echo "==> Waiting for MySQL on 127.0.0.1:3307"
for i in $(seq 1 60); do
  if compose exec -T mysql mysqladmin ping -h localhost -u tiecodes -ptiecodes_dev_password --silent 2>/dev/null; then
    break
  fi
  sleep 1
  if [[ "$i" -eq 60 ]]; then
    echo "MySQL did not become ready in time."
    exit 1
  fi
done

echo "==> Prisma generate + migrate + seed"
npm run prisma:generate
npx prisma migrate deploy
npm run prisma:seed

echo
echo "Admin ready."
echo "  Login:  http://localhost:3000/admin/login"
echo "  Manage: http://localhost:3000/admin/projects"
echo "  Use ADMIN_EMAIL / ADMIN_PASSWORD from .env"
