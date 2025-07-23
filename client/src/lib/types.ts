

export interface Escursione {
    id: number
    name: string
    description?: string | null
    story?: string | null
    difficulty: string
    location?: string | null
    duration_hours?: number | null
    distance_km?: number | null
    elevation_gain_m?: number | null
    date_escursione?: string | null  
    created_at: Date
    updated_at: Date
}
