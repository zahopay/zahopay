import React, { useState, useEffect, useRef, useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import { GrSecure } from "react-icons/gr";
import { IoLanguageOutline } from "react-icons/io5";
import { IoIosCloseCircle, IoIosArrowDown } from "react-icons/io";
import { MdArrowBackIos } from "react-icons/md";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";
import { RiQrCodeLine } from "react-icons/ri";
import assets from "../../assets/asset";
import axios from "axios";
import InputFields from "../../components/InputFields";
import AppContext from "../../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const PaymentCheckout = ({ paymentForm }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [showInputSheet, setShowInputSheet] = useState(false);
  const [activeStatus, setActiveStatus] = useState("UPI-field");
  const [isQrVisible, setIsQrVisible] = useState(true);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isPaymentFailed, setIsPaymentFailed] = useState(false);
  const [showInputPopup, setShowInputPopup] = useState(false);
  const [utrNumber, setUtrNumber] = useState("");
  const [paymentScreenshot, setPaymentScreenshot] = useState(null);
  const [fileName, setFileName] = useState("");
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const [customerDetails, setCustomerDetails] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const fileInputRef = useRef(null);

  const facebookPixel = paymentForm?.facebookPixel;
  const { backendUrl } = useContext(AppContext);

  const isNameEnabled = paymentForm?.customerForm?.name === "enable";
  const isPhoneEnabled = paymentForm?.customerForm?.phone === "enable";
  const isEmailEnabled = paymentForm?.customerForm?.email === "enable";
  const isAddressEnabled = paymentForm?.customerForm?.address === "enable";

  // Generate UPI payment links
  const generateUpiLink = (app) => {
    const amount = paymentForm?.price;
    const upiId = paymentForm?.upiId;

    switch (app) {
      case "Google Pay":
        return `tez://upi/pay?pa=${upiId}&pn=${paymentForm?.storeName}&am=${amount}&cu=INR`;
      case "PhonePe":
        return `phonepe://pay?pa=${upiId}&pn=${paymentForm?.storeName}&am=${amount}&cu=INR`;
      case "Paytm":
        return `paytmmp://pay?pa=${upiId}&pn=${paymentForm?.storeName}&am=${amount}&cu=INR`;
      case "WhatsApp":
        return `whatsapp://pay?pa=${upiId}&pn=${paymentForm?.storeName}&am=${amount}&cu=INR`;
      case "BHIM UPI":
        return `upi://pay?pa=${upiId}&pn=${paymentForm?.storeName}&am=${amount}&cu=INR`;
      default:
        return `upi://pay?pa=${upiId}&pn=${paymentForm?.storeName}&am=${amount}&cu=INR`;
    }
  };

  const openUpiApp = (app) => {
    const link = generateUpiLink(app);
    window.location.href = link;
  };

  useEffect(() => {
    if (isNameEnabled || isPhoneEnabled || isEmailEnabled || isAddressEnabled) {
      setShowInputSheet(true);
    }
  }, [isNameEnabled, isPhoneEnabled, isEmailEnabled, isAddressEnabled]);

  useEffect(() => {
    if (activeStatus === "form-field" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && activeStatus !== "payment-failed") {
      setIsPaymentFailed(true);
      setActiveStatus("payment-failed");
    }
  }, [activeStatus, timeLeft]);

  useEffect(() => {
    if (facebookPixel) {
      const script = document.createElement("script");
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${facebookPixel}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    }
  }, [facebookPixel]);

  useEffect(() => {
    if (facebookPixel) {
      window.fbq("track", "ViewContent", {
        content_name: paymentForm?.storeName,
        content_ids: [paymentForm?._id],
        content_type: "product",
        value: paymentForm?.price,
        currency: "INR",
      });
    }
  }, [facebookPixel, paymentForm]);

  const toggleQrVisibility = () => {
    setIsQrVisible(!isQrVisible);
  };

  const downloadQrCode = () => {
    const qrCode = document.getElementById("qr-code");
    if (qrCode) {
      const canvas = qrCode.querySelector("canvas");
      if (canvas) {
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = `${paymentForm?.storeName}-qr-code.png`;
        link.click();
        setSuccessMessage("QR Code downloaded successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  };

  const handleFormSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsFormSubmitted(true);

      const formData = new FormData();
      if (isNameEnabled) formData.append("name", name);
      if (isEmailEnabled) formData.append("email", email);
      if (isPhoneEnabled) formData.append("phone", phone);
      if (isAddressEnabled) formData.append("address", address);
      formData.append("productId", paymentForm._id);
      formData.append("price", paymentForm.price);
      formData.append("userId", paymentForm.userId);

      const { data } = await axios.post(
        `${backendUrl}/customer/checkout/submit-user-details`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        setShowInputSheet(false);
        setSuccessMessage("Details submitted successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        setCustomerDetails(data.newuserDetails);

        if (facebookPixel) {
          window.fbq("track", "InitiateCheckout", {
            content_name: paymentForm?.storeName,
            content_ids: [paymentForm?._id],
            content_type: "product",
            value: paymentForm?.price,
            currency: "INR",
          });
        }
      } else {
        setErrorMessage(data.message || "Form submission failed");
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrorMessage("File size should be less than 5MB");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }
      setPaymentScreenshot(file);
      setFileName(file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handlePaymentSuccess = async () => {
    try {
      if (!utrNumber && !paymentScreenshot) {
        setErrorMessage("Please provide UTR number or payment screenshot");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      const formData = new FormData();
      formData.append("utrNumber", utrNumber);
      formData.append("price", paymentForm.price);
      formData.append("productId", paymentForm._id);
      formData.append("paymentScreenshot", paymentScreenshot);
      formData.append("userId", paymentForm.userId);

      if (customerDetails) {
        formData.append("customerId", customerDetails?._id);
      }

      const { data } = await axios.post(
        `${backendUrl}/customer/checkout/submit-customer-purchase`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        setShowInputPopup(false);
        setOrderId(
          data.orderId ||
            `ORD${Math.random().toString(36).substring(2, 10).toUpperCase()}`
        );
        setShowSuccessAnimation(true);

        if (facebookPixel) {
          window.fbq("track", "Purchase", {
            content_name: paymentForm?.storeName,
            content_ids: [paymentForm?._id],
            content_type: "product",
            value: paymentForm?.price,
            currency: "INR",
          });
        }

        setTimeout(() => {
          if (paymentForm.redirectUrl) {
            window.location.href = paymentForm.redirectUrl;
          }
        }, 3500);
      } else {
        setErrorMessage(data.message);
        setTimeout(() => setErrorMessage(""), 3000);
      }
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (showSuccessAnimation) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-50 to-blue-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center p-8 max-w-md"
        >
          <div className="success-animation mx-auto mb-6">
            <svg className="checkmark" viewBox="0 0 52 52">
              <circle className="checkmark__circle" cx="26" cy="26" r="25" />
              <path
                className="checkmark__check"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>

          <motion.h1
            className="text-3xl font-bold text-gray-800 mt-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            className="text-gray-600 mt-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Your order has been placed successfully.
          </motion.p>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full">
              <FaCheckCircle className="text-green-500 mr-2" />
              <span className="text-green-700">Order ID: {orderId}</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Success/Error Messages */}
      {successMessage && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-700 px-4 py-2 rounded-lg shadow-lg z-50"
        >
          {successMessage}
        </motion.div>
      )}

      {errorMessage && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-red-100 text-red-700 px-4 py-2 rounded-lg shadow-lg z-50"
        >
          {errorMessage}
        </motion.div>
      )}

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-3">
            <img
              src={paymentForm?.logoImage || assets.defaultLogo}
              alt="Store Logo"
              className="w-12 h-12 rounded-full object-cover shadow-md"
            />
            <h1 className="text-xl font-bold text-gray-800">
              {paymentForm?.storeName}
            </h1>
          </div>
          <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
            <IoLanguageOutline className="text-lg" />
            <span className="text-sm hidden md:inline">English</span>
          </button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Order Summary */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-6"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{paymentForm?.price}</span>
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total</span>
                <span className="text-xl font-bold">₹{paymentForm?.price}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-gray-500">
              <GrSecure className="text-green-500" />
              <span>Secure SSL Encryption</span>
            </div>
          </motion.div>

          {/* Right Column - Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {activeStatus === "UPI-field" && (
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Select Payment Method
                </h2>

                <div className="space-y-4">
                  <motion.div
                    className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveStatus("form-field")}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">UPI Payment</h3>
                        <p className="text-sm text-gray-500">
                          Pay via any UPI app
                        </p>
                      </div>
                      <div className="flex -space-x-2">
                        <img
                          src={assets.googlepayLogo}
                          alt="Google Pay"
                          className="w-8 h-8"
                        />
                        <img
                          src={assets.phonepeLogo}
                          alt="PhonePe"
                          className="w-8 h-8"
                        />
                        <img
                          src={assets.paytmLogo}
                          alt="Paytm"
                          className="w-8 h-8"
                        />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {activeStatus === "form-field" && (
              <motion.div
                className="bg-white rounded-xl shadow-md p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="flex items-center gap-2 mb-6 cursor-pointer text-purple-600"
                  onClick={() => setActiveStatus("UPI-field")}
                >
                  <MdArrowBackIos size={14} />
                  <span className="text-sm font-medium">
                    Change payment method
                  </span>
                </div>

                <div className="text-center mb-6">
                  <img
                    src={assets.bhimUpiPaymentForm}
                    alt="UPI"
                    className="h-12 mx-auto"
                  />
                  <h2 className="text-xl font-bold text-gray-800 mt-2">
                    Pay with UPI
                  </h2>
                </div>

                {/* QR Code Section */}
                <motion.div
                  className="bg-gray-50 rounded-xl p-6 mb-6"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800">Scan QR Code</h3>
                    <button
                      onClick={toggleQrVisibility}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {isQrVisible ? (
                        <IoIosCloseCircle size={20} />
                      ) : (
                        <IoIosArrowDown size={20} />
                      )}
                    </button>
                  </div>

                  {isQrVisible && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <div className="p-4 bg-white rounded-lg shadow-inner mb-4">
                        <QRCodeSVG
                          value={`upi://pay?pa=${
                            paymentForm.upiId
                          }&pn=${encodeURIComponent(
                            paymentForm.storeName
                          )}&am=${paymentForm.price}&cu=INR`}
                          size={180}
                          id="qr-code"
                        />
                      </div>

                      <div className="bg-red-50 px-4 py-2 rounded-full mb-4">
                        <p className="text-red-600 text-sm font-medium">
                          Time remaining: {formatTime(timeLeft)}
                        </p>
                      </div>

                      <button
                        onClick={downloadQrCode}
                        className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
                      >
                        <RiQrCodeLine />
                        <span>Download QR Code</span>
                      </button>
                    </motion.div>
                  )}
                </motion.div>

                {/* UPI Apps Section */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-px bg-gray-200 flex-1"></div>
                    <span className="text-sm text-gray-500">OR</span>
                    <div className="h-px bg-gray-200 flex-1"></div>
                  </div>

                  <h3 className="text-sm font-semibold text-gray-500 mb-3">
                    PAY WITH UPI APPS
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { name: "Google Pay", icon: assets.googlePayPaymentForm },
                      { name: "PhonePe", icon: assets.phonePePaymentForm },
                      { name: "Paytm", icon: assets.paytmPaymentForm },
                      { name: "WhatsApp", icon: assets.whatsappPaymentForm },
                      { name: "BHIM UPI", icon: assets.UpiPaymentLogo },
                      { name: "Other UPI Apps", icon: assets.upiLogoGeneric },
                    ].map((app, index) => (
                      <motion.div
                        key={index}
                        className="border border-gray-200 rounded-lg p-3 flex flex-col items-center cursor-pointer hover:border-purple-500 hover:shadow-md transition-all"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => openUpiApp(app.name)}
                      >
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="h-10 mb-2"
                        />
                        <span className="text-xs text-center">{app.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <motion.button
                  className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-all font-medium"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => setShowInputPopup(true)}
                >
                  I've Made the Payment
                </motion.button>
              </motion.div>
            )}

            {activeStatus === "payment-failed" && (
              <motion.div
                className="bg-white rounded-xl shadow-md p-8 text-center"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaTimes className="text-red-500 text-3xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Payment Session Expired
                </h2>
                <p className="text-gray-600 mb-6">
                  Your payment session has timed out. Please initiate a new
                  payment.
                </p>

                <motion.button
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all font-medium"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setActiveStatus("UPI-field");
                    setTimeLeft(300);
                    setIsPaymentFailed(false);
                  }}
                >
                  Try Again
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Details Form */}
      <AnimatePresence>
        {showInputSheet && !isFormSubmitted && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-md bg-white rounded-t-2xl p-6"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                  Your Details
                </h2>

              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                {isNameEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <InputFields
                      id={"name"}
                      label={"Full Name"}
                      type={"text"}
                      name={"name"}
                      setValue={setName}
                    />
                  </motion.div>
                )}

                {isPhoneEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <InputFields
                      id={"phone"}
                      label={"Mobile Number"}
                      type={"tel"}
                      name={"mobile-number"}
                      setValue={setPhone}
                    />
                  </motion.div>
                )}

                {isEmailEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <InputFields
                      id={"email"}
                      label={"Email Address"}
                      type={"email"}
                      name={"email"}
                      setValue={setEmail}
                    />
                  </motion.div>
                )}

                {isAddressEnabled && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <InputFields
                      id={"address"}
                      label={"Delivery Address"}
                      type={"text"}
                      name={"address"}
                      setValue={setAddress}
                      textarea
                    />
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-all font-medium mt-6"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Continue to Payment
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Confirmation Popup */}
      <AnimatePresence>
        {showInputPopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  Payment Confirmation
                </h2>
                <button
                  onClick={() => setShowInputPopup(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>

              <p className="text-sm text-gray-600 mb-6">
                Please provide the UTR number or upload payment screenshot to
                confirm your payment.
              </p>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="utr-number"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    UTR Number{" "}
                    <span className="text-gray-400">(12 digits)</span>
                  </label>
                  <input
                    type="text"
                    id="utr-number"
                    placeholder="Enter UTR number from your bank"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    value={utrNumber}
                    onChange={(e) => setUtrNumber(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Payment Screenshot
                  </label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*"
                  />
                  <motion.div
                    className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-purple-500 transition-all"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={triggerFileInput}
                  >
                    {fileName ? (
                      <div className="flex items-center justify-center gap-2 text-purple-600">
                        <FiUpload />
                        <span className="truncate max-w-xs">{fileName}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2 text-gray-500">
                        <FiUpload className="text-2xl" />
                        <p className="text-sm">Click to upload screenshot</p>
                        <p className="text-xs text-gray-400">
                          Supports JPG, PNG (Max 5MB)
                        </p>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <motion.button
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowInputPopup(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handlePaymentSuccess}
                >
                  Confirm Payment
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PaymentCheckout;
