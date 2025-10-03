import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { pool } from '../database';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET non impostata nelle variabili d\'ambiente');
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    try {
        const validUsername = process.env.ADMIN_USERNAME;
        const validPasswordHash = process.env.ADMIN_PASSWORD_HASH || '$2b$10$xGe9KIl55fg9D2cirTE9lOjrFTpvC9YJYSXLcpXbNuQ232ZNHKAPu';

        if (username !== validUsername) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        // Verifica la password con bcrypt
        const passwordMatch = await bcrypt.compare(password, validPasswordHash);
        console.log("Password match:", passwordMatch);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        // Genera un token JWT
        const token = jwt.sign(
            { username: validUsername },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token });
    } catch (error) {
        console.error('Errore durante il login:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
};

export const verify = (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token non fornito' });
    }

    const token = authHeader.split(' ')[1];

    try {
        jwt.verify(token, JWT_SECRET);
        res.status(200).json({ valid: true });
    } catch (error) {
        res.status(401).json({ valid: false, message: 'Token non valido' });
    }
};
