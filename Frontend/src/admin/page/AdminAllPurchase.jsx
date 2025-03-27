import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import {
  FaEye,
  FaRupeeSign,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaReceipt,
} from "react-icons/fa";

const AdminAllPurchase = () => {
  const { backendUrl, frontendUrl } = useContext(AppContext);
  const [allPurchase, setAllPurchase] = useState([]);

  useEffect(() => {
    const fetchAllPurchase = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          backendUrl + "/admin/auth/fetch-all-purchase"
        );

        if (data.success) {
          setAllPurchase(data.allPurchase);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchAllPurchase();
  }, [backendUrl]);

  const handleScreenshotView = (screenshot) => {
    window.open(screenshot, "_blank");
  };

  const handleProductView = (id) => {
    window.open(`${frontendUrl}/checkout/${id}`, "_blank");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">All Purchases</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Details
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UTR Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Screenshot
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {allPurchase.map((order, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                {/* Customer Details */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="flex items-center">
                      <FaUser className="text-purple-600 mr-2" />
                      <p className="text-sm text-gray-700">
                        {order?.name || "-"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaEnvelope className="text-purple-600 mr-2" />
                      <p className="text-sm text-gray-700">
                        {order?.email || "-"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-purple-600 mr-2" />
                      <p className="text-sm text-gray-700">
                        {order?.phone || "-"}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-purple-600 mr-2" />
                      <p className="text-sm text-gray-700">
                        {order?.address || "-"}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Price */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaRupeeSign className="text-purple-600 mr-1" />
                    <p className="text-sm text-gray-700">{order?.price}</p>
                  </div>
                </td>

                {/* UTR Number */}
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <FaReceipt className="text-purple-600 mr-2" />
                    <p className="text-sm text-gray-700">
                      {order?.utrNumber || "-"}
                    </p>
                  </div>
                </td>

                {/* Payment Screenshot */}
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      handleScreenshotView(order?.paymentScreenshot)
                    }
                    className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <FaEye className="mr-1" />
                    View Screenshot
                  </button>
                </td>

                {/* Product */}
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleProductView(order?.productId)}
                    className="flex items-center px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <FaEye className="mr-1" />
                    View Product
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAllPurchase;
