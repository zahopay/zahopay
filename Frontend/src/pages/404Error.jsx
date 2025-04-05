import React from "react";
import { motion } from "framer-motion";
import { FiAlertTriangle, FiHome, FiMail, FiRefreshCw } from "react-icons/fi";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full bg-white rounded-xl shadow-2xl overflow-hidden"
      >
        {/* Illustration Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-center">
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="inline-block"
          >
            <FiAlertTriangle className="text-white text-5xl mx-auto" />
          </motion.div>
          <h1 className="text-4xl font-bold text-white mt-4">404</h1>
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Page Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          {/* Animated floating elements */}
          <div className="flex justify-center space-x-8 mb-8">
            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3 + item,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-3 h-3 bg-purple-400 rounded-full"
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/"
                className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition"
              >
                <FiHome className="mr-2" />
                Go Home
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button
                onClick={() => window.location.reload()}
                className="flex items-center justify-center w-full px-6 py-3 border border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition"
              >
                <FiRefreshCw className="mr-2" />
                Refresh
              </button>
            </motion.div>
          </div>

          {/* Contact Support */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 mb-3">Need help?</p>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="mailto:zahopay@gmail.com"
              className="inline-flex items-center px-4 py-2 bg-gray-100 rounded-lg text-gray-800 hover:bg-gray-200 transition"
            >
              <FiMail className="mr-2" />
              Contact Support
            </motion.a>
          </div>
        </div>

        {/* Floating decorative elements */}
        <motion.div
          animate={{
            x: [0, 10, 0],
            y: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-4 left-4 w-8 h-8 bg-purple-200 rounded-full opacity-30"
        />
        <motion.div
          animate={{
            x: [0, -15, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          className="absolute top-10 right-6 w-6 h-6 bg-indigo-200 rounded-full opacity-30"
        />
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
