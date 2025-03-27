import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { toast } from "react-toastify";
import {
  FaRupeeSign,
  FaCheckCircle,
  FaTimesCircle,
  FaEye,
  FaSearch,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn, MdPerson } from "react-icons/md";
import { format } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";
import ReactPaginate from "react-paginate";

const AllPurchase = () => {
  const { backendUrl } = useContext(AppContext);
  const [allPurchase, setAllPurchase] = useState([]);
  const [filteredPurchase, setFilteredPurchase] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 50;

  useEffect(() => {
    const fetchAllUserPurchase = async () => {
      try {
        setIsLoading(true);
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          backendUrl + "/api/user/get-all-user-purchase"
        );

        if (data.success) {
          setAllPurchase(data.allPurchase);
          setFilteredPurchase(data.allPurchase);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllUserPurchase();
  }, [backendUrl]);

  useEffect(() => {
    let result = allPurchase;

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.utrNumber?.toLowerCase().includes(term) ||
          order.email?.toLowerCase().includes(term) ||
          order.phone?.toLowerCase().includes(term) ||
          order.productDetails?.title?.toLowerCase().includes(term)
      );
    }

    // Apply tab filter
    if (activeTab === "completed") {
      result = result.filter(
        (order) => order.utrNumber && order.paymentScreenshot
      );
    } else if (activeTab === "failed") {
      result = result.filter(
        (order) => !order.utrNumber || !order.paymentScreenshot
      );
    }

    setFilteredPurchase(result);
    setCurrentPage(0); // Reset to first page when filters change
  }, [searchTerm, activeTab, allPurchase]);

  const handleViewScreenshot = (order) => {
    window.open(order.paymentScreenshot, "_blank");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, "dd/MM/yy hh:mm a");
  };

  // Pagination logic
  const pageCount = Math.ceil(filteredPurchase.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredPurchase.slice(offset, offset + itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-3xl font-bold text-purple-800 mb-6 text-center"
        >
          Purchase Management
        </motion.h1>

        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-md p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by UTR, Email, Phone or Product..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {["all", "completed", "failed"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    activeTab === tab
                      ? "bg-white shadow text-purple-700"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-purple-500">
            <h3 className="text-gray-500 text-sm font-medium">Total Orders</h3>
            <p className="text-2xl font-bold text-gray-800">
              {allPurchase.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-medium">Completed</h3>
            <p className="text-2xl font-bold text-gray-800">
              {
                allPurchase.filter((o) => o.utrNumber && o.paymentScreenshot)
                  .length
              }
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md border-l-4 border-red-500">
            <h3 className="text-gray-500 text-sm font-medium">Failed</h3>
            <p className="text-2xl font-bold text-gray-800">
              {
                allPurchase.filter((o) => !o.utrNumber || !o.paymentScreenshot)
                  .length
              }
            </p>
          </div>
        </motion.div>

        {/* Table Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
        >
          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-purple-600">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Customer
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        UTR
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Proof
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence>
                      {currentItems.length > 0 ? (
                        currentItems.map((order, index) => (
                          <motion.tr
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.03 }}
                            className="hover:bg-gray-50"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {formatDate(order?.createdAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-purple-700">
                              {order?.productDetails?.title || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                              <div className="flex items-center">
                                <FaRupeeSign className="mr-1" />
                                {order?.price || "0"}
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-700">
                              <div className="space-y-1">
                                <div className="flex items-center">
                                  <MdPerson className="text-purple-600 mr-2" />
                                  <p>{order?.name || "-"}</p>
                                </div>
                                <div className="flex items-center">
                                  <MdEmail className="text-purple-600 mr-2" />
                                  <p>{order?.email || "-"}</p>
                                </div>
                                <div className="flex items-center">
                                  <MdPhone className="text-purple-600 mr-2" />
                                  <p>{order?.phone || "-"}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                              {order?.utrNumber || "-"}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {order?.utrNumber && order?.paymentScreenshot ? (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  <FaCheckCircle className="mr-1" />
                                  Completed
                                </span>
                              ) : (
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                  <FaTimesCircle className="mr-1" />
                                  Failed
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {order?.paymentScreenshot ? (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                  onClick={() => handleViewScreenshot(order)}
                                >
                                  <FaEye className="mr-1" />
                                  View
                                </motion.button>
                              ) : (
                                "-"
                              )}
                            </td>
                          </motion.tr>
                        ))
                      ) : (
                        <motion.tr
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-gray-50"
                        >
                          <td
                            colSpan="7"
                            className="px-6 py-4 text-center text-sm text-gray-500"
                          >
                            No purchases found matching your criteria
                          </td>
                        </motion.tr>
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredPurchase.length > itemsPerPage && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="text-sm text-gray-700">
                    Showing <span className="font-medium">{offset + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(offset + itemsPerPage, filteredPurchase.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-medium">
                      {filteredPurchase.length}
                    </span>{" "}
                    results
                  </div>
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName="flex space-x-1"
                    pageLinkClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                    previousLinkClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                    nextLinkClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
                    breakLinkClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700"
                    activeLinkClassName="px-3 py-1 rounded-md bg-purple-600 text-white border-purple-600"
                    disabledLinkClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-400 cursor-not-allowed"
                  />
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AllPurchase;
