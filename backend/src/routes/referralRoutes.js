import express from 'express';
import {
  createReferral,
  getReferrals,
  updateReferral
} from '../controllers/referralController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public: Submit referral request
router.post('/', uploadResume.single('resume'), createReferral);

// Admin Protected: View & update referral statuses
router.get('/', protectAdmin, getReferrals);
router.patch('/:id', protectAdmin, updateReferral);

export default router;

