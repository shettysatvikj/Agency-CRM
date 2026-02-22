import express from 'express';
import { login, seedAdmin } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);

// Only for first-time seeding; remove or protect in production
router.post('/seed-admin', seedAdmin);

export default router;