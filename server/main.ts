import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Pool } from 'pg'
import multer from 'multer'

const app = express()
const port = process.env.PORT || 3000

// Configure multer for file uploads (memory storage - no filesystem save)
const storage = multer.memoryStorage()

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only allow GPX files
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
  user: process.env.DB_USER || 'user',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'photoplace_trekking',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT || '5432'),
  ssl: true
  
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

// Configure CORS to reflect request origin and allow credentials
const corsOptions = {
  origin: true,          // reflect origin header
  credentials: true,     // allow cookies and credentials
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // enable pre-flight for all routes

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
})

app.get("/escursioni/all", async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM escursioni ORDER BY id')
    res.json(result.rows)
  } catch (error) {
    console.error('Error fetching escursioni:', error)
    // Fallback to mock data if database query fails
    res.json([])
  }
})


app.post("/escursioni", upload.single('gpxFile'), async (req: Request, res: Response) => {
  try {
    // Log the entire request body
    console.log('Request body:', req.body);
    
    // Log file information if uploaded
    if (req.file) {
      console.log('File uploaded:');
      console.log('- Original name:', req.file.originalname);
      console.log('- Mimetype:', req.file.mimetype);
      console.log('- Size:', req.file.size, 'bytes');
      console.log('- Buffer length:', req.file.buffer.length);
      
      // Print first 200 characters of the GPX file content for verification
      const fileContent = req.file.buffer.toString('utf-8');
      console.log('- File content preview (first 200 chars):');
      console.log(fileContent.substring(0, 200) + '...');
      
      // You can access the full file content with: req.file.buffer
      console.log('- Full file content available in req.file.buffer for future DB storage');
    }
    
    // Log specific form fields
    console.log('Form data received:');
    console.log('- Title:', req.body.title);
    console.log('- Description:', req.body.description);
    console.log('- Difficulty:', req.body.difficulty);
    
    // Log headers for debugging
    console.log('Content-Type:', req.headers['content-type']);
    
    // Return the received data for verification
    res.json({
      message: "Escursione data received successfully",
      data: {
        ...req.body,
        file: req.file ? {
          originalname: req.file.originalname,
          mimetype: req.file.mimetype,
          size: req.file.size,
          contentPreview: req.file.buffer.toString('utf-8').substring(0, 100) + '...'
        } : null
      }
    });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
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