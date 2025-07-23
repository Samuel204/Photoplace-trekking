-- Create database schema for Photoplace Trekking
-- Run this script in your PostgreSQL database

-- Create escursioni table
CREATE TABLE IF NOT EXISTS escursioni (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty VARCHAR(50) NOT NULL,
    location VARCHAR(255),
    duration_hours INTEGER,
    distance_km DECIMAL(5,2),
    elevation_gain_m INTEGER,
    max_participants INTEGER,
    price DECIMAL(8,2),
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO escursioni (name, description, difficulty, location, duration_hours, distance_km, elevation_gain_m, max_participants, price) VALUES
('Escursione al Monte Bianco', 'Una splendida escursione al Monte Bianco con vista panoramica sulle Alpi.', 'Alta', 'Monte Bianco, Italia', 8, 15.5, 1200, 12, 85.00),
('Escursione al Lago di Como', 'Un''escursione panoramica attorno al Lago di Como attraverso sentieri storici.', 'Media', 'Lago di Como, Italia', 6, 12.0, 600, 20, 55.00),
('Sentiero delle Cinque Terre', 'Percorso costiero tra i pittoreschi borghi delle Cinque Terre.', 'Media', 'Cinque Terre, Italia', 7, 11.0, 400, 15, 65.00),
('Trekking in Val d''Orcia', 'Escursione attraverso i paesaggi iconici della Val d''Orcia.', 'Bassa', 'Val d''Orcia, Toscana', 4, 8.5, 300, 25, 45.00);

-- Create users table for future authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create bookings table for future booking system
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    escursione_id INTEGER REFERENCES escursioni(id),
    booking_date DATE NOT NULL,
    participants INTEGER NOT NULL,
    total_price DECIMAL(8,2),
    status VARCHAR(20) DEFAULT 'pending',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
