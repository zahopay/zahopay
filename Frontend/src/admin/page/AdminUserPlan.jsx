import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiCheck,
  FiClock,
  FiX,
  FiUser,
  FiDollarSign,
  FiCalendar,
  FiPhone,
  FiMail,
  FiCreditCard,
  FiEdit,
  FiSave,
  FiLoader,
} from "react-icons/fi";
import { FaSearch } from "react-icons/fa";

const AdminUserPlan = () => {
  const { backendUrl } = useContext(AppContext);
  const [allPlanPayment, setAllPlanPayment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchAllPlanPayment();
  }, []);

  const fetchAllPlanPayment = async () => {
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const { data } = await axios.get(backendUrl + "/admin/auth/user-plan");

      if (data.success) {
        setAllPlanPayment(data.allPlanPayments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScreenshotView = (paymentScreenshot) => {
    window.open(paymentScreenshot, "_blank");
  };

  const startEditing = (id, currentStatus) => {
    setEditingId(id);
    setStatusValue(currentStatus);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setStatusValue("");
  };

  const handleStatusChange = async (paymentId, userId) => {
    if (!statusValue) {
      toast.error("Please select a status");
      return;
    }

    try {
      setIsUpdating(true);
      axios.defaults.withCredentials = true;

      // First update the payment status
      const { data } = await axios.put(
        `${backendUrl}/admin/auth/update-plan-status`,
        {
          paymentId,
          status: statusValue,
          userId,
        }
      );

      if (data.success) {
        toast.success("Payment status updated successfully");

        // If status is approved, update user plan
        if (statusValue.toLowerCase() === "approved") {
          const plan = allPlanPayment.find((p) => p._id === paymentId)?.plan;
          const durationDays = plan?.toLowerCase().includes("plus") ? 365 : 30;

          await axios.put(`${backendUrl}/admin/auth/update-user-plan`, {
            userId,
            plan,
            durationDays,
          });
        }

        // Refresh data
        await fetchAllPlanPayment();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update status");
    } finally {
      setIsUpdating(false);
      setEditingId(null);
    }
  };

  const filteredPayments = allPlanPayment.filter((payment) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      payment?.transactionId?.toLowerCase().includes(searchLower) ||
      payment?.userDetails?.email?.toLowerCase().includes(searchLower) ||
      payment?.userDetails?.mobile?.toString().includes(searchLower) ||
      payment?.plan?.toLowerCase().includes(searchLower) ||
      payment?.status?.toLowerCase().includes(searchLower)
    );
  });

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <FiCheck className="mr-1" /> Approved
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <FiClock className="mr-1" /> Pending
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <FiX className="mr-1" /> Rejected
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            Unknown
          </span>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center">
          <FiDollarSign className="mr-2 text-purple-600" />
          User Plan Payments
        </h1>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search payments..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <FiCalendar className="mr-2" /> Date
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <FiUser className="mr-2" /> User
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <FiCreditCard className="mr-2" /> Plan
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex items-center">
                        <FiDollarSign className="mr-2" /> Transaction
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredPayments.map((payment) => (
                      <motion.tr
                        key={payment._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(payment?.createdAt)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {payment?.userDetails?.email}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <FiPhone className="mr-1" />{" "}
                                {payment?.userDetails?.mobile}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment?.plan}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment?.transactionId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {editingId === payment._id ? (
                            <select
                              value={statusValue}
                              onChange={(e) => setStatusValue(e.target.value)}
                              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                          ) : (
                            getStatusBadge(payment?.status)
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                          {editingId === payment._id ? (
                            <>
                              <button
                                onClick={() =>
                                  handleStatusChange(
                                    payment._id,
                                    payment.userId
                                  )
                                }
                                disabled={isUpdating}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                {isUpdating ? (
                                  <FiLoader className="mr-1 animate-spin" />
                                ) : (
                                  <FiSave className="mr-1" />
                                )}
                                Save
                              </button>
                              <button
                                onClick={cancelEditing}
                                className="text-gray-600 hover:text-gray-900 flex items-center"
                              >
                                <FiX className="mr-1" /> Cancel
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                onClick={() =>
                                  startEditing(payment._id, payment.status)
                                }
                                className="text-blue-600 hover:text-blue-900 flex items-center"
                              >
                                <FiEdit className="mr-1" /> Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleScreenshotView(payment?.screenshotPath)
                                }
                                className="text-purple-600 hover:text-purple-900 flex items-center"
                              >
                                <FiEye className="mr-1" /> View
                              </button>
                            </>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4 p-4">
              <AnimatePresence>
                {filteredPayments.map((payment) => (
                  <motion.div
                    key={payment._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white border border-gray-200 rounded-lg shadow-sm p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {payment?.plan}
                        </h3>
                        <p className="text-sm text-gray-500 flex items-center mb-2">
                          <FiCalendar className="mr-1" />{" "}
                          {formatDate(payment?.createdAt)}
                        </p>
                        {editingId === payment._id ? (
                          <select
                            value={statusValue}
                            onChange={(e) => setStatusValue(e.target.value)}
                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        ) : (
                          getStatusBadge(payment?.status)
                        )}
                      </div>
                      <div className="flex space-x-2">
                        {editingId === payment._id ? (
                          <>
                            <button
                              onClick={() =>
                                handleStatusChange(payment._id, payment.userId)
                              }
                              disabled={isUpdating}
                              className="text-green-600 hover:text-green-900 flex items-center text-sm"
                            >
                              {isUpdating ? (
                                <FiLoader className="mr-1 animate-spin" />
                              ) : (
                                <FiSave className="mr-1" />
                              )}
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="text-gray-600 hover:text-gray-900 flex items-center text-sm"
                            >
                              <FiX className="mr-1" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                startEditing(payment._id, payment.status)
                              }
                              className="text-blue-600 hover:text-blue-900 flex items-center text-sm"
                            >
                              <FiEdit className="mr-1" />
                            </button>
                            <button
                              onClick={() =>
                                handleScreenshotView(payment?.screenshotPath)
                              }
                              className="text-purple-600 hover:text-purple-900 flex items-center text-sm"
                            >
                              <FiEye className="mr-1" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <FiMail className="mr-2 flex-shrink-0" />
                        <span>{payment?.userDetails?.email}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiPhone className="mr-2 flex-shrink-0" />
                        <span>{payment?.userDetails?.mobile}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <FiCreditCard className="mr-2 flex-shrink-0" />
                        <span className="truncate">
                          {payment?.transactionId}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredPayments.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-8 text-center"
              >
                <div className="text-gray-400 mb-4">
                  <FiDollarSign className="mx-auto h-12 w-12" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">
                  No payments found
                </h3>
                <p className="text-gray-500">
                  {searchTerm
                    ? "Try a different search term"
                    : "No payment records available"}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminUserPlan;
