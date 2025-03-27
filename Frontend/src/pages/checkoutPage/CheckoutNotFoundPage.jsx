import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const CheckOutNotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden text-center"
      >
        <div className="bg-red-500 p-6 flex flex-col items-center">
          <FaExclamationTriangle className="text-white text-5xl mb-4" />
          <h1 className="text-2xl font-bold text-white">
            404 - Page Not Found
          </h1>
        </div>

        <div className="p-8">
          <p className="text-gray-600 mb-8 text-lg">
            The payment link you're trying to access doesn't exist or has
            expired.
          </p>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            <FaHome className="mr-2" />
            Return to Home
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CheckOutNotFoundPage;
