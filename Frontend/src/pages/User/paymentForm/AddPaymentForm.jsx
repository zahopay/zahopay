import axios from "axios";
import React, { useContext, useState } from "react";
import AppContext from "../../../context/AppContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiUpload,
  FiPlus,
  FiDollarSign,
  FiShoppingBag,
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
} from "react-icons/fi";

const AddPaymentForm = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const navigate = useNavigate();

  // State for all form inputs
  const [title, setTitle] = useState("");
  const [nameInput, setNameInput] = useState("disable");
  const [emailInput, setEmailInput] = useState("disable");
  const [phoneInput, setPhoneInput] = useState("disable");
  const [addressInput, setAddressInput] = useState("disable");
  const [storeName, setStoreName] = useState("");
  const [price, setPrice] = useState("");
  const [storeLogo, setStoreLogo] = useState(null);
  const [upiId, setUpiId] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("");
  const [facebookPixel, setFacebookPixel] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Handle image upload and preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setLogoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStoreLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", nameInput);
      formData.append("email", emailInput);
      formData.append("title", title);
      formData.append("phone", phoneInput);
      formData.append("address", addressInput);
      formData.append("storeName", storeName);
      formData.append("price", price);
      formData.append("upiId", upiId);
      formData.append("redirectUrl", redirectUrl);
      formData.append("facebookPixel", facebookPixel);
      formData.append("userId", userData?._id);

      console.log("userData  : ", userData)

      if (logoFile) {
        formData.append("logoImage", logoFile);
      }

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/create/add-payment-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/user/all-payment-form");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-xl shadow-2xl p-8 space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Form Title */}
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
            Create Payment Form
          </h1>
          <p className="text-center text-gray-500">
            Customize your payment collection page
          </p>
        </motion.div>

        {/* Page Title Input */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 items-center mb-1">
            <h1 className="text-lg font-semibold text-gray-700">Page Title</h1>
            <span className="text-red-500">*</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            (Internal reference only - customers won't see this)
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. Summer Sale Payment Page"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
            />
            <FiPlus className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </motion.div>

        {/* User Input Section */}
        <motion.div variants={itemVariants}>
          <h1 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <FiUser className="text-indigo-500" />
            Customer Information Fields
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name Input */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="name"
                className="text-gray-700 flex items-center gap-1"
              >
                <FiUser className="text-sm" /> Name
              </label>
              <select
                name="name"
                id="name"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="disable">Disabled</option>
                <option value="enable">Enabled</option>
              </select>
            </div>

            {/* Email Input */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-gray-700 flex items-center gap-1"
              >
                <FiMail className="text-sm" /> Email
              </label>
              <select
                name="email"
                id="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="disable">Disabled</option>
                <option value="enable">Enabled</option>
              </select>
            </div>

            {/* Phone Input */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="phone"
                className="text-gray-700 flex items-center gap-1"
              >
                <FiPhone className="text-sm" /> Phone
              </label>
              <select
                name="phone"
                id="phone"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="disable">Disabled</option>
                <option value="enable">Enabled</option>
              </select>
            </div>

            {/* Address Input */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="address"
                className="text-gray-700 flex items-center gap-1"
              >
                <FiMapPin className="text-sm" /> Address
              </label>
              <select
                name="address"
                id="address"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              >
                <option value="disable">Disabled</option>
                <option value="enable">Enabled</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Store Name Input */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 items-center mb-1">
            <h1 className="text-lg font-semibold text-gray-700 flex items-center gap-1">
              <FiShoppingBag className="text-indigo-500" /> Store Name
            </h1>
            <span className="text-red-500">*</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="e.g. My Awesome Store"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
            />
            <FiShoppingBag className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </motion.div>

        {/* Price Input */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 items-center mb-1">
            <h1 className="text-lg font-semibold text-gray-700 flex items-center gap-1">
              <FiDollarSign className="text-indigo-500" /> Price
            </h1>
            <span className="text-red-500">*</span>
          </div>
          <div className="relative">
            <input
              type="number"
              placeholder="0.00"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              required
            />
            <FiDollarSign className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </motion.div>

        {/* Store Logo Input */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 items-center mb-1">
            <h1 className="text-lg font-semibold text-gray-700">Store Logo</h1>
            <span className="text-red-500">*</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <label className="w-full">
              <div className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-all">
                <div className="text-center">
                  <FiUpload className="mx-auto text-2xl text-indigo-500 mb-2" />
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-indigo-600">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
              </div>
            </label>
            {storeLogo && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-32 h-32 border-2 border-dashed border-indigo-200 rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={storeLogo}
                  alt="Store Logo Preview"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* UPI ID Input */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 items-center mb-1">
            <h1 className="text-lg font-semibold text-gray-700">UPI ID</h1>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            placeholder="yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            required
          />
        </motion.div>

        {/* Redirect URL Input */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 items-center mb-1">
            <h1 className="text-lg font-semibold text-gray-700">
              Redirect URL After Payment
            </h1>
            <span className="text-red-500">*</span>
          </div>
          <input
            type="text"
            placeholder="https://yourwebsite.com/thank-you"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
            required
          />
        </motion.div>

        {/* Facebook Pixel Input */}
        <motion.div variants={itemVariants}>
          <div className="flex gap-2 items-center mb-1">
            <h1 className="text-lg font-semibold text-gray-700">
              Facebook Pixel ID (Optional)
            </h1>
          </div>
          <input
            type="text"
            placeholder="123456789012345"
            value={facebookPixel}
            onChange={(e) => setFacebookPixel(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
        </motion.div>

        {/* Submit Button */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center ${
              isSubmitting
                ? "opacity-70"
                : "hover:bg-indigo-700 hover:shadow-md"
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Create Payment Form"
            )}
          </button>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default AddPaymentForm;
