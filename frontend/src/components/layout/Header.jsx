import { useAuth } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { UserCircle } from 'lucide-react';

const Header = () => {
  const { user } = useAuth();

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-8 py-5 bg-gradient-to-r from-white to-indigo-50 border-b border-gray-100 shadow-sm"
    >
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          📊 Dashboard
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Track leads, revenue & performance
        </p>
      </div>

      {/* Right - User Info */}
      <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all">
        <UserCircle className="text-indigo-500" size={28} />
        <div className="text-sm">
          <div className="font-medium text-gray-800">
            {user?.email}
          </div>
          <div className="text-xs text-gray-400 capitalize">
            {user?.role}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;