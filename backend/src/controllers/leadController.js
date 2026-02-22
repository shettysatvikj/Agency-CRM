import { Lead } from '../models/Lead.js';
import { leadsToCSV } from '../utils/csvExporter.js';

/**
 * GET /api/leads
 * Query: status, source, search
 */
export const getLeads = async (req, res) => {
  const { status, source, search } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (source) filter.source = source;
  if (search) {
    filter.$text = { $search: search };
  }

  const leads = await Lead.find(filter).sort({ createdAt: -1 });
  res.json(leads);
};

/**
 * POST /api/leads
 */
export const createLead = async (req, res) => {
  const { name, email, phone, source, status, budget, notes } = req.body;
  const lead = await Lead.create({
    name,
    email,
    phone,
    source,
    status,
    budget,
    notes,
  });
  res.status(201).json(lead);
};

/**
 * PUT /api/leads/:id
 */
export const updateLead = async (req, res) => {
  const { id } = req.params;
  const updated = await Lead.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updated) return res.status(404).json({ message: 'Lead not found' });
  res.json(updated);
};

/**
 * PATCH /api/leads/:id/status
 */
export const updateLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await Lead.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );
  if (!updated) return res.status(404).json({ message: 'Lead not found' });
  res.json(updated);
};

/**
 * DELETE /api/leads/:id
 */
export const deleteLead = async (req, res) => {
  const { id } = req.params;
  const lead = await Lead.findByIdAndDelete(id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json({ message: 'Lead deleted' });
};

/**
 * GET /api/leads/export
 */
export const exportLeadsCSV = async (req, res) => {
  const leads = await Lead.find({}).lean();
  const csv = leadsToCSV(leads);
  res.header('Content-Type', 'text/csv');
  res.attachment('leads.csv');
  res.send(csv);
};