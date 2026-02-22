import express from 'express';
import { auth, adminOnly } from '../middleware/auth.js';
import { getSummary } from '../controllers/analyticsController.js';

const router = express.Router();

router.use(auth, adminOnly);
router.get('/summary', getSummary);

export default router;