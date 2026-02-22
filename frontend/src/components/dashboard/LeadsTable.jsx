const LeadsTable = ({
  leads,
  onEdit,
  onDelete,
  onStatusChange,
  onOpenNotes,
}) => {
  const statusOptions = ['New', 'Contacted', 'Qualified', 'Closed', 'Lost'];

  const statusColors = {
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    Contacted: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    Qualified: 'bg-purple-50 text-purple-700 border-purple-200',
    Closed: 'bg-green-50 text-green-700 border-green-200',
    Lost: 'bg-red-50 text-red-700 border-red-200',
  };

  return (
    <div className="w-full overflow-hidden mt-6">
      <div className="w-full overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
        <table className="w-full text-sm">
          
          {/* Header */}
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
            <tr>
              <th className="px-4 py-4">Name</th>
              <th className="px-4 py-4">Email</th>
              <th className="px-4 py-4">Phone</th>
              <th className="px-4 py-4">Source</th>
              <th className="px-4 py-4">Status</th>
              <th className="px-4 py-4">Budget</th>
              <th className="px-4 py-4">Created</th>
              <th className="px-4 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y text-gray-700 whitespace-nowrap">
            {leads.map((lead) => (
              <tr
                key={lead._id}
                className="hover:bg-indigo-50/40 transition-colors duration-200"
              >
                {/* Name */}
                <td className="px-4 py-4 font-medium text-gray-800">
                  {lead.name}
                </td>

                {/* Email */}
                <td className="px-4 py-4 text-gray-600 truncate max-w-[160px]">
                  {lead.email || '-'}
                </td>

                {/* Phone */}
                <td className="px-4 py-4 text-gray-600">
                  {lead.phone || '-'}
                </td>

                {/* Source */}
                <td className="px-4 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-slate-100 text-slate-600">
                    {lead.source}
                  </span>
                </td>

                {/* Status */}
                <td className="px-4 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead._id, e.target.value)}
                    className={`text-xs rounded-full border px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all ${statusColors[lead.status]}`}
                  >
                    {statusOptions.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </td>

                {/* Budget */}
                <td className="px-4 py-4 font-medium text-gray-700">
                  {lead.budget
                    ? `₹${Number(lead.budget).toLocaleString('en-IN')}`
                    : '-'}
                </td>

                {/* Created */}
                <td className="px-4 py-4 text-gray-500">
                  {new Date(lead.createdAt).toLocaleDateString('en-IN')}
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-right space-x-2">
                  <button
                    onClick={() => onOpenNotes(lead)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                  >
                    Notes
                  </button>

                  <button
                    onClick={() => onEdit(lead)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(lead._id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* Empty State */}
            {leads.length === 0 && (
              <tr>
                <td
                  colSpan="8"
                  className="px-4 py-10 text-center text-sm text-gray-500 italic"
                >
                  No leads found. Start by adding your first lead 🚀
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;