import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { Pool } from 'pg'
import multer from 'multer'
import { parseGpx } from './utils'
import authRoutes from './routes/authRoutes';


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

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use('/auth', authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Alive');
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


app.put("/escursioni", upload.single('gpxFile'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No GPX file uploaded' })
    }
    
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
    
    // insert new escursione into database and keep its id
    let escursioneId: number;
    const { title, description, difficulty } = req.body;
    // parse GPX for metrics
    const gpxParsedData = await parseGpx(req.file.buffer.toString('utf-8'));
    // destructure and sanitize GPX metrics once
    const {
      totalDistanceKm: rawDistanceKm,
      totalElevationGainM: rawGainM,
      totalElevationLossM: rawLossM,
      minElevationM: rawMinEle,
      maxElevationM: rawMaxEle,
      totalTimeSeconds: rawTimeSec,
      avgSpeedKmh: rawAvgSpeed,
      maxSpeedKmh: rawMaxSpeed,
      trackPointsCount: rawCountPoints,
      startLatitude: rawStartLat,
      startLongitude: rawStartLon,
      endLatitude: rawEndLat,
      endLongitude: rawEndLon,
      trackPoints: rawTrackPoints
    } = gpxParsedData;
    const totalDistance = parseFloat(rawDistanceKm.toFixed(3));
    const totalElevationGain = Math.round(rawGainM);
    const totalElevationLoss = Math.round(rawLossM);
    const minElevation = Math.round(rawMinEle);
    const maxElevation = Math.round(rawMaxEle);
    const totalTime = Math.round(rawTimeSec);
    const avgSpeed = parseFloat(rawAvgSpeed.toFixed(2));
    const maxSpeed = parseFloat(rawMaxSpeed.toFixed(2));
    const trackPointsJson = JSON.stringify(rawTrackPoints);
    // preserve other metrics
    const countPoints = rawCountPoints;
    const startLat = rawStartLat;
    const startLon = rawStartLon;
    const endLat = rawEndLat;
    const endLon = rawEndLon;
    // derive escursione fields from parsed data and request
    const durationHours = Math.round(gpxParsedData.totalTimeSeconds / 3600);
    const distanceKm = parseFloat(gpxParsedData.totalDistanceKm.toFixed(2));
    const elevationGainM = Math.round(gpxParsedData.totalElevationGainM);
    const dateEscursione = req.body.date_escursione || new Date().toISOString().split('T')[0];
    const story = req.body.story || '';
    const location = req.body.location || '';
    
    // insert escursione with full schema
    const escResult = await pool.query(
      `INSERT INTO escursioni
         (name, description, story, difficulty, location, duration_hours, distance_km, elevation_gain_m, date_escursione)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [title, description, story, difficulty, location, durationHours, distanceKm, elevationGainM, dateEscursione]
    );
    escursioneId = escResult.rows[0].id;
    
    // insert GPX file into database with full metrics
    if (req.file) {

      const filename = req.file.originalname;
      const fileSizeBytes = req.file.size;
      const gpxData = req.file.buffer.toString('utf-8');

      await pool.query(
        `INSERT INTO gpx_files (
           escursione_id, filename, file_size_bytes,
           total_distance_km, total_elevation_gain_m, total_elevation_loss_m,
           min_elevation_m, max_elevation_m, total_time_seconds,
           avg_speed_kmh, max_speed_kmh, track_points_count,
           start_latitude, start_longitude, end_latitude, end_longitude,
           gpx_data, track_points_json
         ) VALUES (
           $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18
         )`,
        [
          escursioneId,
          filename,
          fileSizeBytes,
          totalDistance,
          totalElevationGain,
          totalElevationLoss,
          minElevation,
          maxElevation,
          totalTime,
          avgSpeed,
          maxSpeed,
          countPoints,
          startLat,
          startLon,
          endLat,
          endLon,
          gpxData,
          trackPointsJson
        ]
      );
    }
    // Respond with success and IDs
    res.json({ success: true, escursioneId });
    

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


app.delete("/escursioni/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Validate that id is a number
    const escursioneId = parseInt(id);
    if (isNaN(escursioneId)) {
      return res.status(400).json({ error: 'Invalid escursione ID' });
    }
    
    // Start a transaction to ensure both deletions succeed or fail together
    const client = await pool.connect();
    
    try {
      await client.query('BEGIN');
      
      // First, delete related GPX files
      const gpxDeleteResult = await client.query(
        'DELETE FROM gpx_files WHERE escursione_id = $1',
        [escursioneId]
      );
      
      // Then, delete the escursione
      const escursioneDeleteResult = await client.query(
        'DELETE FROM escursioni WHERE id = $1',
        [escursioneId]
      );
      
      // Check if the escursione existed
      if (escursioneDeleteResult.rowCount === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ error: 'Escursione not found' });
      }
      
      await client.query('COMMIT');
      
      console.log(`Successfully deleted escursione ${escursioneId} and ${gpxDeleteResult.rowCount} related GPX files`);
      
      res.json({ 
        success: true, 
        message: 'Escursione deleted successfully',
        deletedEscursioneId: escursioneId,
        deletedGpxFiles: gpxDeleteResult.rowCount
      });
      
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
    
  } catch (error) {
    console.error('Error deleting escursione:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


app.get("/escursioni/locations", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT escursione_id, start_latitude, start_longitude FROM gpx_files'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching escursioni locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


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