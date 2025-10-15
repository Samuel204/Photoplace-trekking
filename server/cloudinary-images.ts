import { v2 as cloudinary } from 'cloudinary';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

// Configura Cloudinary con i valori diretti per i test
dotenv.config();
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Interfacce per Cloudinary
interface CloudinaryResource {
    public_id: string;
    [key: string]: any;
}

export default async function handler(req: Request, res: Response) {
    const { escursioneId } = req.query;

    if (!escursioneId) {
        return res.status(400).json({ error: 'ID escursione mancante' });
    }

    try {
        // Usa Cloudinary Search API per trovare immagini con il tag specifico
        const result = await cloudinary.search
            .expression(`tags:escursione-${escursioneId}`)
            .sort_by('created_at', 'desc')
            .max_results(10)
            .execute() as any;

        // Estrai gli URL delle immagini
        const imageUrls = result.resources.map((resource: CloudinaryResource) =>
            cloudinary.url(resource.public_id, {
                quality: "auto:eco",
                width: 900,
                crop: "scale",
                fetch_format: "auto",
                secure: true
            })
        );
        return res.status(200).json({ imageUrls });
    } catch (error) {
        console.error('Errore nel recupero delle immagini da Cloudinary:', error);
        return res.status(500).json({ error: 'Errore nel recupero delle immagini' });
    }
}
