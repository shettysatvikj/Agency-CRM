import { motion } from 'framer-motion';

const KPICard = ({ label, value, accent = 'blue', isCurrency = false }) => {
  const styles = {
    blue: {
      bg: 'from-blue-50 to-white border-blue-100',
      text: 'text-blue-700',
      glow: 'shadow-blue-100',
    },
    green: {
      bg: 'from-green-50 to-white border-green-100',
      text: 'text-green-700',
      glow: 'shadow-green-100',
    },
    purple: {
      bg: 'from-purple-50 to-white border-purple-100',
      text: 'text-purple-700',
      glow: 'shadow-purple-100',
    },
    yellow: {
      bg: 'from-yellow-50 to-white border-yellow-100',
      text: 'text-yellow-700',
      glow: 'shadow-yellow-100',
    },
  };

  const selected = styles[accent];

  const formattedValue =
    isCurrency && typeof value === 'number'
      ? `₹${value.toLocaleString('en-IN')}`
      : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className={`rounded-2xl bg-gradient-to-br ${selected.bg} border p-6 shadow-md hover:shadow-xl transition-all duration-300`}
    >
      <p className="text-xs font-semibold text-gray-500 tracking-wide uppercase mb-2">
        {label}
      </p>

      <p className={`text-3xl font-bold ${selected.text}`}>
        {formattedValue}
      </p>
    </motion.div>
  );
};

export default KPICard;