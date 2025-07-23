#!/bin/zsh
set -o allexport
source .env
set +o allexport

# Stop and remove existing container if it exists
echo "Cleaning up existing container..."
docker stop photoplace-nowhere 2>/dev/null || true
docker rm photoplace-nowhere 2>/dev/null || true

echo "Starting new PostgreSQL container..."


docker run --name photoplace-nowhere \
    -d \
    -p "$DB_PORT":5432 \
    -e POSTGRES_USER="$DB_USER" \
    -e POSTGRES_PASSWORD="$DB_PASSWORD" \
    -e POSTGRES_DB="$DB_NAME" \
    postgres

echo "PostgreSQL instance started"
echo "Database: $DB_NAME"
echo "Port: $DB_PORT"
echo "User: $DB_USER"

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Function to check if PostgreSQL is ready
wait_for_postgres() {
    until docker exec photoplace-nowhere pg_isready -U "$DB_USER" -d "$DB_NAME"; do
        echo "PostgreSQL is not ready yet... waiting"
        sleep 2
    done
    echo "PostgreSQL is ready!"
}

# Wait for database to be ready
wait_for_postgres

# Execute the SQL setup file
echo "Setting up database schema and initial data..."
docker exec -i photoplace-nowhere psql -U "$DB_USER" -d "$DB_NAME" < database_setup.sql

echo "Database setup completed successfully!"
echo "You can now start your Node.js server with: npm run dev"