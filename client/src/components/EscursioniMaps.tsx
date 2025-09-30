import { useState, useEffect, useRef } from "react";
import { apiConfig } from "../lib/apiConfig";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_API_KEY = import.meta.env.VITE_MAPBOX_API_KEY || '';

interface LocationData {
    id: number;
    name: string;
    start_latitude: string;
    start_longitude: string;
}

export default function EscursioniMaps() {
    const [locations, setLocations] = useState<LocationData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const response = await fetch(apiConfig.endpoints.escursioni.locations);
                if (!response.ok) {
                    throw new Error("Errore nel caricamento delle posizioni");
                }
                const data = await response.json();
                setLocations(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Errore sconosciuto");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    useEffect(() => {
        if (!loading && !error && locations.length > 0 && mapRef.current) {
            // inizializzare la mappa con i dati caricati
            initializeMap();
        }
    }, [loading, error, locations]);

    const initializeMap = () => {
        const mapContainer = document.getElementById("map") as HTMLDivElement;

        function getCenter(points: LocationData[]) {
            let sumLat = 0;
            let sumLng = 0;
            points.forEach(p => {
                sumLat += parseFloat(p.start_latitude);
                sumLng += parseFloat(p.start_longitude);
            });
            return {
                latitude: sumLat / points.length,
                longitude: sumLng / points.length
            };
        }

        const centerPoint = getCenter(locations);

        mapboxgl.accessToken = MAPBOX_API_KEY;
        const map = new mapboxgl.Map({
        container: mapContainer, // your container ID
        style: 'mapbox://styles/mapbox/satellite-v9', // map style
        center: [centerPoint.longitude, centerPoint.latitude], // starting position [lng, lat]
        zoom: 4 // starting zoom
        });

        // Fore every location, add a marker
        locations.forEach(loc => {
            new mapboxgl.Marker()
            .setLngLat([parseFloat(loc.start_longitude), parseFloat(loc.start_latitude)])
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div style="font-family: Arial, sans-serif; font-size: 14px;">
                    <strong style="color: #2c7a7b;">${loc.name}</strong><br>
                </div>
            `))
            .addTo(map);
        });
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 z-20 mt-10">
            <div className="overflow-hidden rounded-lg bg-white border border-gray-100">
                <div className="p-6">
                    <h3 className="font-semibold tracking-tight flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                             strokeLinejoin="round" className="w-5 h-5 text-emerald-600">
                            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        Mappa delle Escursioni
                    </h3>
                </div>
                <div className="p-0">
                    <div className="h-96 bg-gradient-to-br from-emerald-100 to-sky-100 flex items-center justify-center">
                        {loading && <p>Caricamento della mappa...</p>}
                        {error && <p className="text-red-600">Errore: {error}</p>}
                        <div id="map" ref={mapRef} className="w-full h-full"></div>
                    </div>
                    <link href='https://api.mapbox.com/mapbox-gl-js/v3.15.0/mapbox-gl.css' rel='stylesheet' />
                </div>
            </div>
        </section>
    );
}