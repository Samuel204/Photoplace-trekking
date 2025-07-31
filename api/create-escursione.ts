import { VercelRequest, VercelResponse } from '@vercel/node'
import { Pool } from 'pg'
import multer from 'multer'

// Configure multer for memory storage
const storage = multer.memoryStorage()
const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/gpx+xml' || file.originalname.toLowerCase().endsWith('.gpx')) {
      cb(null, true)
    } else {
      cb(new Error('Only GPX files are allowed!'))
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
})

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

  if (req.method === 'POST') {
    try {
      // Handle multipart form data
      const uploadSingle = upload.single('gpxFile')
      
      await new Promise<void>((resolve, reject) => {
        uploadSingle(req as any, res as any, (err) => {
          if (err) reject(err)
          else resolve()
        })
      })

      console.log('Request body:', req.body)
      
      if ((req as any).file) {
        const file = (req as any).file
        console.log('File uploaded:', {
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size
        })
      }
      
      res.json({
        message: "Escursione data received successfully",
        data: {
          ...req.body,
          file: (req as any).file ? {
            originalname: (req as any).file.originalname,
            mimetype: (req as any).file.mimetype,
            size: (req as any).file.size,
            contentPreview: (req as any).file.buffer.toString('utf-8').substring(0, 100) + '...'
          } : null
        }
      })
    } catch (error) {
      console.error('Error processing request:', error)
      res.status(500).json({ error: 'Internal server error' })
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' })
  }
}
