import type { Escursione } from './types';

export const mapDifficulty = (difficulty: string = ""): "Facile" | "Medio" | "Difficile" => {
    switch (difficulty.trim().toLowerCase()) {
        case "bassa": return "Facile";
        case "media": return "Medio";
        case "alta": return "Difficile";
        default: return "Medio";
    }
};

export const formatDuration = (hours?: number | null): string | undefined => {
    if (hours == null) return undefined;
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
};

export interface FormattedEscursione {
    id: number;
    title: string;
    date: string;
    difficulty: "Facile" | "Medio" | "Difficile";
    distance?: string;
    elevation?: string;
    imageUrls: string[];
    duration?: string;
}

export const formatEscursioni = (
    data: Escursione[],
    imagesMap: Record<number, string[]>
): FormattedEscursione[] =>
    data
        .map(item => ({
            id: item.id,
            title: item.name,
            date: item.date_escursione ? new Date(item.date_escursione).toISOString().split("T")[0] : "Data non disponibile",
            difficulty: mapDifficulty(item.difficulty),
            distance: item.distance_km != null ? String(item.distance_km) : undefined,
            elevation: item.elevation_gain_m != null ? String(item.elevation_gain_m) : undefined,
            imageUrls: imagesMap[item.id] || [],
            duration: formatDuration(item.duration_hours),
        }))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
