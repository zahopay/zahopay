import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "../../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowLeft,
  FiExternalLink,
  FiClock,
  FiDollarSign,
  FiUser,
  FiCreditCard,
  FiLoader,
} from "react-icons/fi";
import { formatDistanceToNow } from "date-fns";

const AllUserPlanHistory = ({ setUserPlanHistoryIsOpen, currentUser }) => {
  const { backendUrl } = useContext(AppContext);
  const [planHistory, setPlanHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserPlanHistory = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;

        const { data } = await axios.post(
          backendUrl + "/admin/auth/user-plan-history",
          { userId: currentUser._id }
        );

        if (data.success) {
          setPlanHistory(data.userPlanHistory);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserPlanHistory();
  }, [currentUser, backendUrl]);

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleViewScreenshot = (screenshot) => {
    window.open(screenshot, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-100 dark:bg-gray-900 p-4 md:p-6"
    >
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 md:p-6 text-white">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setUserPlanHistoryIsOpen(false)}
              className="flex items-center gap-2 hover:bg-blue-700 rounded-full p-2 transition-colors"
            >
              <FiArrowLeft className="text-xl" />
              <span className="hidden md:inline">Back</span>
            </button>
            <h2 className="text-xl md:text-2xl font-bold">
              Plan History for {currentUser?.name || currentUser?.email}
            </h2>
            <div className="w-8"></div> {/* Spacer for alignment */}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <FiLoader className="text-4xl text-blue-500" />
              </motion.div>
            </div>
          ) : planHistory.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
                No plan history found for this user
              </h3>
            </div>
          ) : (
            <div className="space-y-4">
              {planHistory.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                    <div className="md:col-span-3 flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                        <FiClock className="text-blue-600 dark:text-blue-300 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Date
                        </p>
                        <p className="font-medium">
                          {formatDateWithTime(plan?.createdAt)}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDistanceToNow(new Date(plan?.createdAt))} ago
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-3 flex items-center gap-3">
                      <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                        <FiDollarSign className="text-green-600 dark:text-green-300 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Plan
                        </p>
                        <p className="font-medium">{plan?.plan}</p>
                      </div>
                    </div>

                    <div className="md:col-span-3 flex items-center gap-3">
                      <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                        <FiCreditCard className="text-purple-600 dark:text-purple-300 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Transaction ID
                        </p>
                        <p className="font-mono text-sm truncate">
                          {plan?.transactionId}
                        </p>
                      </div>
                    </div>

                    <div className="md:col-span-3 flex items-center justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          handleViewScreenshot(plan?.screenshotPath)
                        }
                        className="flex items-center gap-2 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
                        disabled={!plan?.screenshotPath}
                      >
                        <FiExternalLink />
                        <span>View Proof</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AllUserPlanHistory;
