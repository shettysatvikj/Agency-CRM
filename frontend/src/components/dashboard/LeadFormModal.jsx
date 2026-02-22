import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { motion } from 'framer-motion';

const defaultForm = {
  name: '',
  email: '',
  phone: '',
  source: 'Organic',
  status: 'New',
  budget: '',
  notes: '',
};

const LeadFormModal = ({ open, onClose, onSubmit, initial }) => {
  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (initial) {
      setForm({
        ...defaultForm,
        ...initial,
        budget: initial.budget ?? '',
      });
    } else {
      setForm(defaultForm);
    }
  }, [initial, open]);

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === 'budget') value = value ? Number(value) : '';
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initial ? '✏️ Edit Lead' : '➕ Add New Lead'}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-5 text-sm w-full"
      >
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Name *
          </label>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
            placeholder="Enter full name"
          />
        </div>

        {/* Email + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Email
            </label>
            <input
              value={form.email}
              onChange={handleChange('email')}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all"
              placeholder="example@email.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Phone
            </label>
            <input
              value={form.phone}
              onChange={handleChange('phone')}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>

        {/* Source + Status + Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Source
            </label>
            <select
              value={form.source}
              onChange={handleChange('source')}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
            >
              <option>Google</option>
              <option>Meta</option>
              <option>Organic</option>
              <option>Referral</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Status
            </label>
            <select
              value={form.status}
              onChange={handleChange('status')}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all"
            >
              <option>New</option>
              <option>Contacted</option>
              <option>Qualified</option>
              <option>Closed</option>
              <option>Lost</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Budget (₹)
            </label>
            <input
              type="number"
              value={form.budget}
              onChange={handleChange('budget')}
              className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
              placeholder="Enter amount in ₹"
            />
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            Notes
          </label>
          <textarea
            rows="3"
            value={form.notes}
            onChange={handleChange('notes')}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-200 transition-all resize-none"
            placeholder="Add conversation notes, follow-ups, etc."
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all text-xs font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all"
          >
            {initial ? 'Update Lead' : 'Create Lead'}
          </button>
        </div>
      </motion.form>
    </Modal>
  );
};

export default LeadFormModal;