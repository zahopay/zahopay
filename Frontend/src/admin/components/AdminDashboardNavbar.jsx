import React, { useState, useEffect } from "react";
import assets from "../../assets/asset";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiHome,
  FiDollarSign,
  FiShoppingBag,
  FiUsers,
  FiPackage,
  FiUser,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const AdminDashboardNavbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    {
      path: "dashboard",
      label: "Dashboard",
      icon: <FiHome className="text-lg" />,
    },
    {
      path: "all-payment-form",
      label: "All Payment Form",
      icon: <FiDollarSign className="text-lg" />,
    },
    {
      path: "all-purchase",
      label: "All Purchase",
      icon: <FiShoppingBag className="text-lg" />,
    },
    {
      path: "all-users",
      label: "All Users",
      icon: <FiUsers className="text-lg" />,
    },
    { path: "plan", label: "Plan", icon: <FiPackage className="text-lg" /> },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Header */}
      {isMobileView && (
        <div className="sticky top-0 z-50 w-full bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
          <div
            onClick={() => navigate("/administrator/auth/dashboard")}
            className="cursor-pointer"
          >
            <img src={assets.zahoPayLogo} alt="Logo" className="h-8" />
          </div>
          <button
            onClick={toggleMobileMenu}
            className="text-gray-700 dark:text-gray-200 focus:outline-none"
          >
            {isMobileMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      )}

      {/* Desktop Sidebar */}
      {!isMobileView && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="sticky top-0 w-64 h-screen bg-white dark:bg-gray-800 px-6 py-8 select-none shadow-lg flex flex-col border-r border-gray-200 dark:border-gray-700"
        >
          <div
            className="select-none cursor-pointer mb-10"
            onClick={() => navigate("/administrator/auth/dashboard")}
          >
            <img src={assets.zahoPayLogo} alt="Logo" className="h-10" />
          </div>

          <ul className="flex flex-col gap-2">
            {navItems.map((item) => (
              <motion.li
                key={item.path}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to={item.path}
                  className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileView && isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 w-64 h-full bg-white dark:bg-gray-800 shadow-xl pt-4"
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <img src={assets.zahoPayLogo} alt="Logo" className="h-8" />
            </div>
            <ul className="flex flex-col gap-1 p-2">
              {navItems.map((item) => (
                <motion.li
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700"
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      {isMobileView && isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default AdminDashboardNavbar;
