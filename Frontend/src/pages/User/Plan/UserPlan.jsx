import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { toast } from "react-toastify";
import KYCDetailsPopup from "../../../components/kycDetails/KYCDetailsPopup";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheck,
  FiDollarSign,
  FiClock,
  FiUpload,
  FiMail,
  FiExternalLink,
  FiArrowRight,
} from "react-icons/fi";
import { FaPaypal } from "react-icons/fa";

const UserPlan = () => {
  const { backendUrl, userData } = useContext(AppContext);
  const [kycDetails, setKycDetails] = useState(null);
  const [isKycDetails, setIsKycDetails] = useState(false);
  const [isPaymentPopup, setIsPaymentPopup] = useState(false);
  const [activeState, setActiveState] = useState("payment-form");
  const [paymentScreenshotPreview, setPaymentScreenshotPreview] =
    useState(null);
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    fetchuserKYCDetails();
  }, []);

  const fetchuserKYCDetails = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          backendUrl + "/api/userplan/get-user-kyc-details"
        );

        if (data.success) {
          setKycDetails(data.kycDetails);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

  const handleKycSubmit = async (kycData) => {
    try {
      const formData = new FormData();
      formData.append("aadharFrontImage", kycData.aadharFrontImage);
      formData.append("aadharBackImage", kycData.aadharBackImage);
      formData.append("panImage", kycData.panImage);
      formData.append("userId", userData.userId);

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/user/kyc/upload-user-kyc",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsKycDetails(false);
        // Refresh KYC details
        fetchuserKYCDetails();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePlanInitiative = (plan) => {
    if (
      !kycDetails?.aadharBack ||
      !kycDetails?.aadharFront ||
      !kycDetails?.panImage
    ) {
      setIsKycDetails(true);
      return toast.error("KYC verification required");
    }
    setSelectedPlan(plan);
    setIsPaymentPopup(true);
  };

  const handlePaymentScreenshot = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPaymentScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInitiatePayment = () => {
    window.open(selectedPlan.link, "_blank");
    setActiveState("payment-success");
  };

  const handlePaymentSubmit = async () => {
    if (!transactionId || !paymentScreenshot) {
      return toast.error(
        "Please provide transaction ID and payment screenshot"
      );
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("transactionId", transactionId);
      formData.append("planPaymentScreenshot", paymentScreenshot);
      formData.append("plan", selectedPlan.name);
      formData.append("userId", userData.userId);

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/userplan/submit-plan",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsPaymentPopup(false);
          setActiveState("payment-form");
          setIsSuccess(false);
          setPaymentScreenshot(null);
          setPaymentScreenshotPreview(null);
          setTransactionId("");
        }, 3000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

const plans = [
  {
    name: "Individual",
    price: "₹399",
    duration: "30 days",
    features: [
      "0% Transaction Fee",
      "Instant Settlement",
      "UPI Intent Support",
      "Unlimited UPI Payments",
      "1 Checkout Theme",
    ],
    bestValue: false,
    link: "https://www.paypal.com/ncp/payment/PEHVTSYNYW8DY",
  },
  {
    name: "Enterprise",
    price: "₹499",
    duration: "30 days",
    features: [
      "0% Transaction Fee",
      "Instant Settlement",
      "UPI Intent Support",
      "Unlimited UPI Payments",
      "2 Checkout Theme",
      "Order Email",
      "Abandand Whatsapp Message",
    ],
    bestValue: false,
    link: "https://www.paypal.com/ncp/payment/ZPY6FLG7KFMT2",
  },
  {
    name: "Individual Plus",
    price: "₹2499",
    duration: "365 days",
    features: [
      "0% Transaction Fee",
      "Instant Settlement",
      "UPI Intent Support",
      "Unlimited UPI Payments",
      "1 Checkout Theme",
    ],
    bestValue: true,
    link: "https://www.paypal.com/ncp/payment/ATB7PZL2TLUD8",
  },
  {
    name: "Enterprise Plus",
    price: "₹2899",
    duration: "365 days",
    features: [
      "0% Transaction Fee",
      "Instant Settlement",
      "UPI Intent Support",
      "Unlimited UPI Payments",
      "2 Checkout Theme",
      "Order Email",
      "Abandand Whatsapp Message",
    ],
    bestValue: true,
    link: "https://www.paypal.com/ncp/payment/4536MDXP6E2H2",
  },
];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center text-gray-900 mb-8"
        >
          Choose Your Plan
        </motion.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.bestValue
                  ? "ring-2 ring-blue-500"
                  : "border border-gray-200"
              }`}
            >
              {/* Plan Header */}
              <div className="p-6 bg-gradient-to-r from-blue-600 to-purple-600">
                <h2 className="text-xl font-semibold text-white">
                  {plan.name}
                </h2>
                {plan.bestValue && (
                  <span className="inline-block mt-2 px-3 py-1 text-sm font-semibold bg-yellow-400 text-gray-900 rounded-full">
                    Best Value
                  </span>
                )}
              </div>

              {/* Plan Price */}
              <div className="p-6">
                <p className="text-4xl font-bold text-gray-900">{plan.price}</p>
                <p className="text-sm text-gray-500 mt-1">{plan.duration}</p>
              </div>

              {/* Plan Features */}
              <div className="p-6 border-t border-gray-200">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <FiCheck className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan CTA */}
              <div className="p-6">
                <button
                  className={`w-full flex items-center justify-center py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
                    plan.bestValue
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                  onClick={() => handlePlanInitiative(plan)}
                >
                  Get Started <FiArrowRight className="ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {isKycDetails && (
          <KYCDetailsPopup
            onClose={() => setIsKycDetails(false)}
            onSubmit={handleKycSubmit}
          />
        )}

        {/* Payment Popup */}
        <AnimatePresence>
          {isPaymentPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
              >
                {activeState === "payment-form" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <FiDollarSign className="text-blue-500 mr-2" />
                      {selectedPlan?.name} Plan
                    </h2>

                    <div className="mb-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Plan Price:</span>
                        <span className="font-semibold">
                          {selectedPlan?.price}
                        </span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-semibold">
                          {selectedPlan?.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method:</span>
                        <span className="font-semibold flex items-center">
                          <FaPaypal className="text-blue-500 mr-1" /> PayPal
                        </span>
                      </div>
                    </div>

                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded-r">
                      <div className="flex">
                        <FiClock className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-yellow-700">
                          We take 12 to 24 hours to verify your payment and
                          activate your plan.
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setIsPaymentPopup(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleInitiatePayment}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition"
                      >
                        <FaPaypal className="mr-2 text-xl" /> Pay with PayPal
                      </button>
                    </div>
                  </motion.div>
                )}

                {activeState === "payment-success" && !isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-6"
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <FiCheck className="text-green-500 mr-2" />
                      Payment Verification
                    </h2>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label
                          htmlFor="transactionId"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Transaction ID
                        </label>
                        <input
                          type="text"
                          id="transactionId"
                          placeholder="Enter PayPal Transaction ID"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Payment Screenshot
                        </label>
                        <div className="mt-1 flex items-center">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span className="flex items-center">
                              <FiUpload className="mr-2" />
                              Upload Screenshot
                            </span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handlePaymentScreenshot}
                            />
                          </label>
                        </div>
                        {paymentScreenshotPreview && (
                          <div className="mt-2">
                            <img
                              src={paymentScreenshotPreview}
                              alt="Payment screenshot preview"
                              className="h-32 rounded-lg border border-gray-200 object-contain"
                            />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6 rounded-r">
                      <div className="flex">
                        <FiMail className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                          Need help? Contact us at{" "}
                          <a
                            href="mailto:support@zahopay.com"
                            className="font-semibold hover:underline"
                          >
                            support@zahopay.com
                          </a>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => setActiveState("payment-form")}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePaymentSubmit}
                        disabled={isSubmitting}
                        className={`flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center transition ${
                          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                        }`}
                      >
                        {isSubmitting ? "Submitting..." : "Submit Verification"}
                      </button>
                    </div>
                  </motion.div>
                )}

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 20,
                      }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <FiCheck className="text-green-500 text-3xl" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Submitted Successfully!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      We'll verify your payment and get back to you within 12
                      hours.
                    </p>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm text-blue-700">
                        For any queries, email us at{" "}
                        <a
                          href="mailto:support@zahopay.com"
                          className="font-semibold hover:underline"
                        >
                          support@zahopay.com
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserPlan;
