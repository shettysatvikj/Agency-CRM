import { NavLink } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import { LayoutDashboard, LogOut, X } from 'lucide-react';

const Sidebar = ({ closeSidebar }) => {
  const { logout } = useAuth();

  return (
    <aside className="w-64 h-dvh bg-white border-r shadow-sm flex flex-col">

      {/* Top */}
      <div className="px-6 py-5 border-b flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-indigo-600">
            🇮🇳 Agency CRM
          </h2>
          <p className="text-xs text-gray-500">
            Lead Pipeline Manager
          </p>
        </div>

        <button
          onClick={closeSidebar}
          className="lg:hidden p-2 rounded hover:bg-gray-100"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
        <NavLink
          to="/"
          end
          onClick={closeSidebar}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
              isActive
                ? 'bg-indigo-100 text-indigo-700'
                : 'text-gray-600 hover:bg-indigo-50'
            }`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>
      </nav>

      {/* Logout */}
      <div className="px-4 py-6 border-t">
        <button
          onClick={() => {
            closeSidebar?.();
            logout();
          }}
          className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;