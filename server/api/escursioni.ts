import { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from 'pg'

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
})

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM escursioni ORDER BY id')
      res.json(result.rows)
    } catch (error) {
      console.error('Error fetching escursioni:', error)
      res.status(500).json({ error: 'Failed to fetch escursioni' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
