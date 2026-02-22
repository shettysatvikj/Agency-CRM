import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut } from 'lucide-react';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-gradient-to-b from-white to-indigo-50 border-r border-gray-100 flex flex-col shadow-sm"
    >
      {/* Logo / Title */}
      <div className="px-6 py-6 border-b border-gray-100">
        <h2 className="text-xl font-bold text-indigo-600">
          🇮🇳 Agency CRM
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Lead Pipeline Manager
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t border-gray-100">
        <button
          onClick={logout}
          className="w-full flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-all"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;