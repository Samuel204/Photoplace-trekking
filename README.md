# Photoplace Trekking - Vercel Deployment Guide

This project has been adapted to deploy on Vercel with serverless functions for the backend API.

## Project Structure

```
/
├── client/          # React frontend (Vite)
├── server/          # Express backend (adapted for serverless)
│   └── api/         # Vercel serverless functions
├── vercel.json      # Vercel deployment configuration
└── package.json     # Root package.json for deployment
```

## Local Development

1. **Install dependencies:**
   ```bash
   npm run install:all
   ```

2. **Set up environment variables:**
   ```bash
   cp server/.env.example server/.env
   # Edit server/.env with your local database credentials
   ```

3. **Start development servers:**
   ```bash
   npm run dev
   ```

This will start:
- Client on http://localhost:5173
- Server on http://localhost:3000

## Database Setup

1. **Create PostgreSQL database:**
   ```bash
   createdb photoplace_trekking
   ```

2. **Run the database setup script:**
   ```bash
   psql -d photoplace_trekking -f server/database_setup.sql
   ```

## Vercel Deployment

### 1. Database Setup (Choose one option)

**Option A: Vercel Postgres**
1. Go to your Vercel dashboard
2. Create a new Postgres storage
3. Copy the connection details

**Option B: External PostgreSQL (Railway, Supabase, etc.)**
1. Create a PostgreSQL database on your preferred service
2. Get the connection string/details

### 2. Deploy to Vercel

**Option A: Via Vercel CLI**
```bash
npm install -g vercel
vercel
```

**Option B: Via Git Integration**
1. Push your code to GitHub
2. Connect the repository to Vercel
3. Vercel will automatically deploy

### 3. Environment Variables

In your Vercel dashboard, add these environment variables:

```
DB_USER=your_postgres_user
DB_HOST=your_postgres_host  
DB_NAME=your_database_name
DB_PASSWORD=your_postgres_password
DB_PORT=5432
NODE_ENV=production
```

### 4. Initialize Database

After deployment, you need to run the database setup script on your production database:

```bash
# Connect to your production database and run:
psql -h your_host -U your_user -d your_database -f server/database_setup.sql
```

## API Endpoints

The API endpoints are now available at:

**Production:**
- `https://your-app.vercel.app/api/escursioni` - Get all escursioni
- `https://your-app.vercel.app/api/create-escursione` - Create new escursione

**Development:**
- `http://localhost:3000/escursioni/all` - Get all escursioni  
- `http://localhost:3000/escursioni` - Create new escursione

## Key Changes Made for Vercel

1. **Serverless Functions**: Converted Express routes to Vercel serverless functions in `server/api/`
2. **API Configuration**: Added `client/src/lib/api.ts` to handle different API URLs for development/production
3. **Build Configuration**: Updated `vercel.json` for proper routing
4. **Environment Handling**: Configured for production database connections

## Troubleshooting

**Database Connection Issues:**
- Ensure your database allows connections from Vercel's IP ranges
- For production databases, make sure SSL is properly configured
- Check that all environment variables are set correctly in Vercel

**Build Issues:**
- Make sure all dependencies are listed in package.json files
- Check that TypeScript compiles without errors
- Verify that API endpoints are accessible

**CORS Issues:**
- The serverless functions include CORS headers
- If you have custom domains, update the CORS configuration accordingly

## File Upload Considerations

The current implementation uses memory storage for file uploads. For production, consider:
- Using cloud storage (AWS S3, Vercel Blob, etc.)
- Implementing proper file size limits
- Adding file type validation

## Monitoring

- Use Vercel's dashboard to monitor function execution
- Check logs for any runtime errors
- Monitor database performance and connections
