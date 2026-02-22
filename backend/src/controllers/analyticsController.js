import { Lead } from '../models/Lead.js';

/**
 * GET /api/analytics/summary
 */
export const getSummary = async (req, res) => {
  const totalLeads = await Lead.countDocuments({});
  const qualifiedLeads = await Lead.countDocuments({ status: 'Qualified' });
  const closedDeals = await Lead.countDocuments({ status: 'Closed' });
  const lostDeals = await Lead.countDocuments({ status: 'Lost' });

  const conversionRate =
    totalLeads > 0 ? Number(((closedDeals / totalLeads) * 100).toFixed(1)) : 0;

  // Leads by source
  const bySourceAgg = await Lead.aggregate([
    { $group: { _id: '$source', count: { $sum: 1 } } },
  ]);

  // Leads by status
  const byStatusAgg = await Lead.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  // Leads over time (last 30 days)
  const since = new Date();
  since.setDate(since.getDate() - 30);
  const byDateAgg = await Lead.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    kpis: {
      totalLeads,
      qualifiedLeads,
      closedDeals,
      conversionRate,
      lostDeals,
    },
    charts: {
      bySource: bySourceAgg,
      byStatus: byStatusAgg,
      byDate: byDateAgg,
    },
  });
};