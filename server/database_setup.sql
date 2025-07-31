-- Create database schema for Photoplace Trekking
-- Run this script in your PostgreSQL database
-- Create escursioni table
CREATE TABLE IF NOT EXISTS escursioni (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    story TEXT,
    difficulty VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    duration_hours INTEGER,
    distance_km DECIMAL(5,2),
    elevation_gain_m INTEGER,
    date_escursione DATE, -- Date when the escursion was made
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO escursioni (
    name,
    description,
    story,
    difficulty,
    location,
    duration_hours,
    distance_km,
    elevation_gain_m,
    date_escursione
) VALUES
(
    'Escursione al Monte Bianco',
    'Una splendida escursione al Monte Bianco con vista panoramica sulle Alpi.',
    'Mi sono svegliato alle 5:30 del mattino, dopo una colazione veloce ho guidato per 2 ore fino al punto di partenza. Il sentiero inizia dolcemente attraverso boschi di pini, ma dopo le prime ore diventa sempre più ripido. Arrivato al rifugio a metà percorso, ho fatto una pausa per ammirare il panorama mozzafiato. La salita finale è stata impegnativa ma la vista dalla cima ha ripagato ogni sforzo. Il tramonto sulle Alpi è stato indimenticabile.',
    'Alta',
    'Monte Bianco, Italia',
    8,
    15.5,
    1200,
    '2024-07-15'
),
(
    'Escursione al Lago di Como',
    'Un''escursione panoramica attorno al Lago di Como attraverso sentieri storici.',
    'Partenza alle 8:00 dal parcheggio di Bellagio. Il sentiero costeggia il lago offrendo viste spettacolari sui borghi pittoreschi. Ho attraversato antichi terrazzamenti e piccoli paesi dove ho assaggiato prodotti locali. La sosta pranzo in una trattoria tipica con vista lago è stata perfetta. Nel pomeriggio ho visitato Villa del Balbianello e i suoi giardini. Il rientro al tramonto con i riflessi dorati sull''acqua è stato magico.',
    'Media',
    'Lago di Como, Italia',
    6,
    12.0,
    600,
    '2024-07-16'
),
(
    'Sentiero delle Cinque Terre',
    'Percorso costiero tra i pittoreschi borghi delle Cinque Terre.',
    'Alzata alle 6:30 per prendere il primo treno per Monterosso. Il sentiero dell''amore è stato il primo tratto, facile e panoramico. Ho attraversato i vigneti terrazzati di Corniglia fermandomi a degustare il vino locale. La discesa verso Vernazza è stata spettacolare con il mare cristallino sotto di me. Pranzo con focaccia e pesto fresco sul porto. Il tratto finale verso Riomaggiore attraverso i sentieri rocciosi mi ha regalato tramonti indimenticabili sui borghi colorati.',
    'Media',
    'Cinque Terre, Italia',
    7,
    11.0,
    400,
    '2024-07-17'
),
(
    'Trekking in Val d''Orcia',
    'Escursione attraverso i paesaggi iconici della Val d''Orcia.',
    'Sveglia alle 7:00 con colazione in un agriturismo locale. Ho guidato attraverso le colline dorate fino a Pienza, punto di partenza del trekking. Il sentiero serpeggia tra campi di grano e cipressi secolari, proprio come nelle cartoline. Sosta a San Quirico d''Orcia per visitare i Horti Leonini. Il pranzo in una fattoria biologica con vista sulle colline è stato un''esperienza autentica. Nel pomeriggio ho raggiunto la famosa Cappella della Madonna di Vitaleta per le foto al tramonto.',
    'Bassa',
    'Val d''Orcia, Toscana',
    4,
    8.5,
    300,
    '2024-07-18'
);

-- Create gpx_files table to store GPS track data
CREATE TABLE IF NOT EXISTS gpx_files (
    id SERIAL PRIMARY KEY,
    escursione_id INTEGER REFERENCES escursioni(id) ON DELETE CASCADE,
    filename VARCHAR(255) NOT NULL,
    file_size_bytes INTEGER,
    total_distance_km DECIMAL(8,3),
    total_elevation_gain_m INTEGER,
    total_elevation_loss_m INTEGER,
    min_elevation_m INTEGER,
    max_elevation_m INTEGER,
    total_time_seconds INTEGER,
    avg_speed_kmh DECIMAL(5,2),
    max_speed_kmh DECIMAL(5,2),
    track_points_count INTEGER,
    start_latitude DECIMAL(10,8),
    start_longitude DECIMAL(11,8),
    end_latitude DECIMAL(10,8),
    end_longitude DECIMAL(11,8),
    gpx_data TEXT NOT NULL, -- Store the actual GPX XML content
    track_points_json JSONB, -- Store simplified track points as JSON for quick access
    waypoints_json JSONB, -- Store waypoints (points of interest) as JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(escursione_id, filename)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_gpx_files_escursione_id ON gpx_files(escursione_id);
CREATE INDEX IF NOT EXISTS idx_gpx_files_track_points_json ON gpx_files USING GIN(track_points_json);
CREATE INDEX IF NOT EXISTS idx_gpx_files_waypoints_json ON gpx_files USING GIN(waypoints_json);

-- Insert sample GPX data
INSERT INTO gpx_files (
    escursione_id,
    filename,
    file_size_bytes,
    total_distance_km,
    total_elevation_gain_m,
    total_elevation_loss_m,
    min_elevation_m,
    max_elevation_m,
    total_time_seconds,
    avg_speed_kmh,
    max_speed_kmh,
    track_points_count,
    start_latitude,
    start_longitude,
    end_latitude,
    end_longitude,
    gpx_data,
    track_points_json,
    waypoints_json
) VALUES
(
    1, -- Monte Bianco
    'monte_bianco_track.gpx',
    45600,
    15.5,
    1200,
    1200,
    1035,
    2807,
    28800, -- 8 hours
    1.9,
    4.2,
    1248,
    45.8326,
    6.8652,
    45.8326,
    6.8652,
    '<?xml version="1.0"?><gpx version="1.1" creator="Photoplace-Trekking"><trk><name>Monte Bianco</name><trkseg><trkpt lat="45.8326" lon="6.8652"><ele>1035</ele><time>2024-07-15T06:00:00Z</time></trkpt></trkseg></trk></gpx>',
    '[{"lat": 45.8326, "lng": 6.8652, "ele": 1035, "time": "06:00"}, {"lat": 45.8342, "lng": 6.8668, "ele": 1156, "time": "07:30"}, {"lat": 45.8365, "lng": 6.8701, "ele": 2807, "time": "14:00"}]',
    '[{"name": "Rifugio Torino", "lat": 45.8342, "lng": 6.8668, "description": "Punto di sosta panoramico"}, {"name": "Vetta Monte Bianco", "lat": 45.8365, "lng": 6.8701, "description": "Punto più alto dell''escursione"}]'
),
(
    2, -- Lago di Como
    'lago_como_track.gpx',
    32400,
    12.0,
    600,
    600,
    198,
    798,
    21600, -- 6 hours
    2.0,
    3.5,
    892,
    45.9618,
    9.2577,
    45.9618,
    9.2577,
    '<?xml version="1.0"?><gpx version="1.1" creator="Photoplace-Trekking"><trk><name>Lago di Como</name><trkseg><trkpt lat="45.9618" lon="9.2577"><ele>198</ele><time>2024-07-16T08:00:00Z</time></trkpt></trkseg></trk></gpx>',
    '[{"lat": 45.9618, "lng": 9.2577, "ele": 198, "time": "08:00"}, {"lat": 45.9652, "lng": 9.2601, "ele": 456, "time": "10:30"}, {"lat": 45.9618, "lng": 9.2577, "ele": 198, "time": "14:00"}]',
    '[{"name": "Villa del Balbianello", "lat": 45.9652, "lng": 9.2601, "description": "Villa storica con giardini"}, {"name": "Bellagio", "lat": 45.9618, "lng": 9.2577, "description": "Borgo pittoresco"}]'
),
(
    3, -- Cinque Terre
    'cinque_terre_track.gpx',
    38200,
    11.0,
    400,
    400,
    5,
    340,
    25200, -- 7 hours
    1.6,
    3.8,
    1056,
    44.1457,
    9.7044,
    44.1010,
    9.7598,
    '<?xml version="1.0"?><gpx version="1.1" creator="Photoplace-Trekking"><trk><name>Cinque Terre</name><trkseg><trkpt lat="44.1457" lon="9.7044"><ele>5</ele><time>2024-07-17T06:30:00Z</time></trkpt></trkseg></trk></gpx>',
    '[{"lat": 44.1457, "lng": 9.7044, "ele": 5, "time": "06:30"}, {"lat": 44.1186, "lng": 9.7134, "ele": 340, "time": "09:15"}, {"lat": 44.1010, "lng": 9.7598, "ele": 70, "time": "13:30"}]',
    '[{"name": "Monterosso al Mare", "lat": 44.1457, "lng": 9.7044, "description": "Partenza del sentiero"}, {"name": "Corniglia", "lat": 44.1186, "lng": 9.7134, "description": "Borgo sui vigneti"}, {"name": "Riomaggiore", "lat": 44.1010, "lng": 9.7598, "description": "Arrivo del trekking"}]'
),
(
    4, -- Val d'Orcia
    'val_orcia_track.gpx',
    21800,
    8.5,
    300,
    300,
    280,
    580,
    14400, -- 4 hours
    2.1,
    4.0,
    654,
    43.0547,
    11.6094,
    43.0547,
    11.6094,
    '<?xml version="1.0"?><gpx version="1.1" creator="Photoplace-Trekking"><trk><name>Val d''Orcia</name><trkseg><trkpt lat="43.0547" lon="11.6094"><ele>280</ele><time>2024-07-18T07:00:00Z</time></trkpt></trkseg></trk></gpx>',
    '[{"lat": 43.0547, "lng": 11.6094, "ele": 280, "time": "07:00"}, {"lat": 43.0586, "lng": 11.6123, "ele": 580, "time": "09:00"}, {"lat": 43.0547, "lng": 11.6094, "ele": 280, "time": "11:00"}]',
    '[{"name": "Pienza", "lat": 43.0547, "lng": 11.6094, "description": "Punto di partenza"}, {"name": "Cappella Madonna di Vitaleta", "lat": 43.0586, "lng": 11.6123, "description": "Cappella famosa per le foto"}, {"name": "San Quirico d''Orcia", "lat": 43.0586, "lng": 11.6099, "description": "Borgo medievale"}]'
);

-- Create images table to store photos for each escursione
CREATE TABLE IF NOT EXISTS immagini_escursione (
    id SERIAL PRIMARY KEY,
    escursione_id INTEGER REFERENCES escursioni(id) ON DELETE CASCADE,
    src TEXT NOT NULL,
    caption TEXT,
    mime_type VARCHAR(50), -- Store image type (image/jpeg, image/png, etc.)
    file_size INTEGER, -- Store file size in bytes
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_immagini_escursione_escursione_id ON immagini_escursione(escursione_id);

-- Insert sample image data
INSERT INTO immagini_escursione (escursione_id, src, caption, mime_type, file_size) VALUES
(1, '/images/monte-bianco-1.jpg', 'Vista panoramica del Monte Bianco', 'image/jpeg', 2048576),
(1, '/images/monte-bianco-2.jpg', 'Rifugio alpino con vista sulle Alpi', 'image/jpeg', 1856742),
(2, '/images/lago-como-1.jpg', 'Villa del Balbianello dal lago', 'image/jpeg', 1920384),
(2, '/images/lago-como-2.jpg', 'Borgo di Bellagio al tramonto', 'image/jpeg', 1679872),
(3, '/images/cinque-terre-1.jpg', 'Vernazza con case colorate', 'image/jpeg', 2156032),
(3, '/images/cinque-terre-2.jpg', 'Sentiero dell''amore panoramico', 'image/jpeg', 1623040),
(4, '/images/val-orcia-1.jpg', 'Cappella Madonna di Vitaleta', 'image/jpeg', 1845248),
(4, '/images/val-orcia-2.jpg', 'Colline dorate della Val d''Orcia', 'image/jpeg', 1567744);
