// server/routes/authRoutes.ts
import express from 'express';
import { login, verify } from '../controllers/authController';

const router = express.Router();

router.post('/login', login);
router.get('/verify', verify);

export default router;
