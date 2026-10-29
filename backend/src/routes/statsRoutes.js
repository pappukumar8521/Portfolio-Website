import express from 'express';
import { getDashboardStats, getPublicData } from '../controllers/statsController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', protectAdmin, getDashboardStats);
router.get('/public', getPublicData);

export default router;

