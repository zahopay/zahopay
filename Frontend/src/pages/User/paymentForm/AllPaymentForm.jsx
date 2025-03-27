import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import AppContext from "../../../context/AppContext";
import { FaEllipsisV } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllPaymentForm = () => {
  const [allPaymentFormData, setAllPaymentFormData] = useState([]);
  const [actionMenuOpen, setActionMenuOpen] = useState(null); 
  const { backendUrl, frontendUrl } = useContext(AppContext);

  // Fetch all payment forms
  useEffect(() => {
    const fetchAllPaymentForm = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          backendUrl + "/api/create/get-all-payment-form"
        );

        if (data.success) {
          setAllPaymentFormData(data.allPaymentForm);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchAllPaymentForm();
  }, [backendUrl]);

  // Handle delete payment form
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/create/delete-payment-form/${id}`
      );

      if (data.success) {
        toast.success(data.message);
        setAllPaymentFormData((prevData) =>
          prevData.filter((form) => form._id !== id)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleViewForm = (productId) => {
    window.open(`${frontendUrl}/checkout/${productId}`, "_blank");
  }

  // Toggle action menu
  const toggleActionMenu = (index) => {
    setActionMenuOpen(actionMenuOpen === index ? null : index);
  };

  return (
    <div className="w-full p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          All Payment Forms
        </h1>

        <Link
          to="/user/add-payment-form"
          className="bg-purple-500 text-white rounded-lg hover:shadow-lg px-4 py-2"
        >
          Add Payment Form
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Logo
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Store Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                UPI ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer Form
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {allPaymentFormData.length > 0 ? (
          <tbody className="divide-y divide-gray-200">
            {allPaymentFormData.map((form, index) => (
              <tr key={form._id} className="hover:bg-gray-50 transition-all">
                {/* Title */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {form.title}
                </td>

                {/* Logo */}
                <td className="px-6 py-4 whitespace-nowrap ">
                  <img
                    src={form.logoImage}
                    alt={form.title}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>

                {/* Store Name */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {form.storeName}
                </td>

                {/* UPI ID */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  UPI : {form.upiId} <br />
                  Pixel : {form.facebookPixel}
                </td>

                {/* Price */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ₹{form.price}
                </td>

                {/* Customer Details */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <div className="space-y-1">
                    <p>Name: {form.customerForm.name || "-"}</p>
                    <p>Phone: {form.customerForm.phone || "-"}</p>
                    <p>Email: {form.customerForm.email || "-"}</p>
                    <p>Address: {form.customerForm.address || "-"}</p>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative">
                  <button
                    onClick={() => toggleActionMenu(index)}
                    className="p-2 hover:bg-gray-200 rounded-full transition-all"
                  >
                    <FaEllipsisV className="text-gray-600" />
                  </button>

                  {/* Action Menu Popup */}
                  {actionMenuOpen === index && (
                    <div className="absolute right-10 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                      <button
                        onClick={() => handleViewForm(form._id)}
                        className="w-full px-4 py-2 text-sm text-black hover:bg-purple-50 rounded-lg text-left"
                      >
                        View Payment Form
                      </button>

                      <hr />

                      <button
                        onClick={() => handleDelete(form._id)}
                        className="w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg text-left"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>) : <tbody><tr><td colSpan={"7"} className="w-full text-center py-5">No Product Found</td></tr></tbody>}
        </table>
      </div>
    </div>
  );
};

export default AllPaymentForm;
