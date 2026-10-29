import express from 'express';
import {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate
} from '../controllers/candidateController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public: Submit candidate assessment
router.post('/', uploadResume.single('resume'), createCandidate);

// Admin Protected: Query & Manage candidates
router.get('/', protectAdmin, getCandidates);
router.get('/:id', protectAdmin, getCandidateById);
router.patch('/:id', protectAdmin, updateCandidate);
router.delete('/:id', protectAdmin, deleteCandidate);

export default router;

