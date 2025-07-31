#!/bin/bash

# Photoplace Trekking Deployment Script
# This script prepares the project for Vercel deployment

echo "🚀 Preparing Photoplace Trekking for Vercel deployment..."

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install API dependencies
echo "📦 Installing API dependencies..."
cd api && npm install && cd ..

# Install client dependencies and build
echo "📦 Installing client dependencies..."
cd client && npm install

echo "🏗️  Building client..."
npm run build

cd ..

echo "✅ Build completed successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Make sure your database is set up and accessible"
echo "2. Set environment variables in Vercel dashboard:"
echo "   - DB_USER"
echo "   - DB_HOST" 
echo "   - DB_NAME"
echo "   - DB_PASSWORD"
echo "   - DB_PORT"
echo "   - NODE_ENV=production"
echo "3. Deploy using: vercel --prod"
echo ""
echo "🎉 Ready for deployment!"
