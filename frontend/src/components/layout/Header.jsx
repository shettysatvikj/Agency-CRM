import { Menu } from 'lucide-react';

const Header = ({ toggleSidebar }) => {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-4 sm:px-6 shadow-sm">

      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded hover:bg-gray-100"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      <div className="hidden sm:block text-sm text-gray-500">
        Welcome back 👋
      </div>
    </header>
  );
};

export default Header;