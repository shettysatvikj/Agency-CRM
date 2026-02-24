import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { motion } from 'framer-motion';
import { LayoutDashboard, LogOut, X } from 'lucide-react';

const Sidebar = ({ closeSidebar }) => {
  const { logout } = useAuth();

  return (
    <motion.aside
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="
        w-64 
        h-dvh
        bg-gradient-to-b from-white to-indigo-50 
        border-r border-gray-100 
        flex flex-col 
        shadow-sm
      "
    >
      {/* Top Section */}
      <div className="px-6 py-6 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-indigo-600">
            🇮🇳 Agency CRM
          </h2>
          <p className="text-xs text-gray-500 mt-1">
            Lead Pipeline Manager
          </p>
        </div>

        {/* Close Button (Mobile Only) */}
        <button
          onClick={closeSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
        <NavLink
          to="/"
          end
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all ${
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
          onClick={() => {
            closeSidebar?.();
            logout();
          }}
          className="
            w-full 
            flex items-center gap-2 
            text-sm 
            px-4 py-3 
            rounded-xl 
            bg-red-50 
            text-red-600 
            hover:bg-red-100 
            transition-all
          "
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;