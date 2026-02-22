import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';

const LeadFilters = ({ status, source, search, onChange }) => {
  const handleChange = (field) => (e) => {
    onChange({ [field]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-wrap gap-4 items-center mb-6 bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-md border border-gray-100"
    >
      {/* Search Input */}
      <div className="relative w-full md:w-72">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search leads by name or email..."
          value={search}
          onChange={handleChange('search')}
          className="w-full rounded-xl border border-gray-200 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-300 transition-all"
        />
      </div>

      {/* Status Filter */}
      <div className="relative">
        <Filter
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <select
          value={status}
          onChange={handleChange('status')}
          className="rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-all hover:border-blue-300"
        >
          <option value="">All Statuses</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Qualified</option>
          <option>Closed</option>
          <option>Lost</option>
        </select>
      </div>

      {/* Source Filter */}
      <div className="relative">
        <Filter
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <select
          value={source}
          onChange={handleChange('source')}
          className="rounded-xl border border-gray-200 bg-white pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-300 transition-all hover:border-purple-300"
        >
          <option value="">All Sources</option>
          <option>Google</option>
          <option>Meta</option>
          <option>Organic</option>
          <option>Referral</option>
          <option>Other</option>
        </select>
      </div>
    </motion.div>
  );
};

export default LeadFilters;