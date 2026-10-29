import express from 'express';
import {
  createContact,
  getContacts,
  updateContact
} from '../controllers/contactController.js';
import { protectAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: Submit contact inquiry
router.post('/', createContact);

// Admin Protected: View & update contact status
router.get('/', protectAdmin, getContacts);
router.patch('/:id', protectAdmin, updateContact);

export default router;
