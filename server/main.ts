
import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Pool } from 'pg'

const app = express()
const port = process.env.PORT || 3000

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'photoplace_trekking',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
})

// Test database connection
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack)
  } else {
    console.log('Connected to PostgreSQL database')
    release()
  }
})

// Enable CORS for all origins
app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.get("/escursioni", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM escursioni ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching escursioni:', error)
    // Fallback to mock data if database query fails
    res.json([
      {
        id: 1,
        name: "Escursione al Monte Bianco",
        description: "Una splendida escursione al Monte Bianco.",
        difficulty: "Alta"
      },
      {
        id: 2,
        name: "Escursione al Lago di Como",
        description: "Un'escursione panoramica attorno al Lago di Como.",
        difficulty: "Media"
      }
    ])
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\nShutting down gracefully...')
  await pool.end()
  console.log('Database connection closed.')
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('\nShutting down gracefully...')
  await pool.end()
  console.log('Database connection closed.')
  process.exit(0)
})