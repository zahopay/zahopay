import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaArrowLeft } from "react-icons/fa";

const NoUserPlan = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="bg-red-500 p-4 flex items-center">
          <FaExclamationTriangle className="text-white text-2xl mr-3" />
          <h1 className="text-xl font-bold text-white">No Active Plan</h1>
        </div>

        <div className="p-6">
          <motion.p
            className="text-gray-600 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            The merchant account currently has no active plan. If you are the
            owner of the account, please log in to your dashboard and subscribe
            to a plan to restore services.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link
              to="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <FaArrowLeft className="mr-2" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default NoUserPlan;
