import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = ({ toggleSidebar }) => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        h-16 
        bg-white 
        border-b border-gray-100 
        flex items-center justify-between 
        px-4 sm:px-6
        shadow-sm
      "
    >
      {/* Left Section */}
      <div className="flex items-center gap-3">

        {/* Hamburger (Mobile Only) */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
          Dashboard
        </h1>
      </div>

      {/* Right Section */}
      <div className="text-sm text-gray-500 hidden sm:block">
        Welcome back 👋
      </div>
    </motion.header>
  );
};

export default Header;