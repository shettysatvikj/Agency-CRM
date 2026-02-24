import { useEffect, useState } from 'react';
import api from '../../service/api';
import KPICard from '../dashboard/KPICard';
import LeadFilters from '../dashboard/LeadFilters';
import LeadsTable from '../dashboard/LeadsTable';
import LeadFormModal from '../dashboard/LeadFormModal';
import NotesModal from '../dashboard/NotesModal';
import KanbanBoard from '../dashboard/KanbanBoard';
import ChartsPanel from '../dashboard/ChartsPanel';
import { motion } from 'framer-motion';
import { Download, Plus } from 'lucide-react';

const DashboardPage = () => {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({ status: '', source: '', search: '' });
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [notesModalOpen, setNotesModalOpen] = useState(false);
  const [notesLead, setNotesLead] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    const [leadsRes, analyticsRes] = await Promise.all([
      api.get('/leads', { params: filters }),
      api.get('/analytics/summary'),
    ]);
    setLeads(leadsRes.data);
    setAnalytics(analyticsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData().catch((err) => console.error(err));
  }, [filters]);

  const handleFilterChange = (partial) =>
    setFilters((f) => ({ ...f, ...partial }));

  const handleCreateOrUpdateLead = async (form) => {
    if (editingLead) {
      await api.put(`/leads/${editingLead._id}`, form);
    } else {
      await api.post('/leads', form);
    }
    setLeadFormOpen(false);
    setEditingLead(null);
    fetchData();
  };

  const handleDeleteLead = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    await api.delete(`/leads/${id}`);
    fetchData();
  };

  const handleStatusChange = async (id, status) => {
    await api.patch(`/leads/${id}/status`, { status });
    fetchData();
  };

  const handleSaveNotes = async (id, notes) => {
    await api.put(`/leads/${id}`, { notes });
    setNotesModalOpen(false);
    setNotesLead(null);
    fetchData();
  };

  const handleExportCSV = async () => {
    const res = await api.get('/leads/export', { responseType: 'blob' });
    const blob = new Blob([res.data], { type: 'text/csv;charset=utf-8;' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'leads.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const kpis = analytics?.kpis || {};

  return (
    <div className="min-h-full bg-gradient-to-br from-indigo-50 via-white to-blue-50">

      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              Welcome back 👋
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here’s your agency performance overview
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg border bg-white shadow-sm hover:shadow transition"
            >
              <Download size={16} />
              Export CSV
            </button>

            <button
              onClick={() => {
                setEditingLead(null);
                setLeadFormOpen(true);
              }}
              className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <Plus size={16} />
              Add Lead
            </button>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <KPICard label="Total Leads" value={kpis.totalLeads ?? '-'} accent="blue" />
          <KPICard label="Qualified Leads" value={kpis.qualifiedLeads ?? '-'} accent="green" />
          <KPICard label="Closed Deals" value={kpis.closedDeals ?? '-'} accent="purple" />
          <KPICard
            label="Conversion Rate"
            value={kpis.conversionRate != null ? `${kpis.conversionRate}%` : '-'}
            accent="yellow"
          />
        </motion.div>

        {/* Filters */}
        <LeadFilters
          status={filters.status}
          source={filters.source}
          search={filters.search}
          onChange={handleFilterChange}
        />

        {/* Content Section */}
        {loading ? (
          <div className="bg-white rounded-xl p-10 text-center text-gray-500 shadow-sm">
            Loading your leads...
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-10"
          >
            <LeadsTable
              leads={leads}
              onEdit={(lead) => {
                setEditingLead(lead);
                setLeadFormOpen(true);
              }}
              onDelete={handleDeleteLead}
              onStatusChange={handleStatusChange}
              onOpenNotes={(lead) => {
                setNotesLead(lead);
                setNotesModalOpen(true);
              }}
            />

            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Kanban View
              </h3>
              <KanbanBoard
                leads={leads}
                onStatusChange={handleStatusChange}
              />
            </div>

            <ChartsPanel analytics={analytics} />
          </motion.div>
        )}
      </div>

      {/* Modals */}
      <LeadFormModal
        open={leadFormOpen}
        onClose={() => {
          setLeadFormOpen(false);
          setEditingLead(null);
        }}
        onSubmit={handleCreateOrUpdateLead}
        initial={editingLead}
      />

      <NotesModal
        open={notesModalOpen}
        onClose={() => {
          setNotesModalOpen(false);
          setNotesLead(null);
        }}
        lead={notesLead}
        onSave={handleSaveNotes}
      />
    </div>
  );
};

export default DashboardPage;