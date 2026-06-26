#!/bin/sh

set -e

echo "--------------------------------------------------------"
echo "Executing automated Drizzle Schema Migrations..."
echo "--------------------------------------------------------"

pnpm run db:migrate:prod

echo "Database synchronized successfully. Booting server..."
echo "--------------------------------------------------------"

exec "$@"