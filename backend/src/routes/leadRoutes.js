import express from 'express';
import { auth, adminOnly } from '../middleware/auth.js';
import {
  getLeads,
  createLead,
  updateLead,
  updateLeadStatus,
  deleteLead,
  exportLeadsCSV,
} from '../controllers/leadController.js';

const router = express.Router();

router.use(auth, adminOnly);

router.route('/').get(getLeads).post(createLead);
router.get('/export', exportLeadsCSV);
router.put('/:id', updateLead);
router.patch('/:id/status', updateLeadStatus);
router.delete('/:id', deleteLead);

export default router;