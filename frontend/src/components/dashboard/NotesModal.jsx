import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { motion } from 'framer-motion';

const NotesModal = ({ open, onClose, lead, onSave }) => {
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setNotes(lead?.notes || '');
  }, [lead, open]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(lead._id, notes);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`📝 Notes for ${lead?.name || ''}`}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-5 text-sm px-1 sm:px-2"
      >
        <div>
          <label className="block text-xs font-semibold text-gray-600 mb-2">
            Conversation Notes
          </label>
          <textarea
            rows="6"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all resize-none"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all text-xs font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Save Notes
          </button>
        </div>
      </motion.form>
    </Modal>
  );
};

export default NotesModal;