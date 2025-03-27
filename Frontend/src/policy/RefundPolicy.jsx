import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiDollarSign, FiClock, FiAlertCircle, FiMail } from "react-icons/fi";

const RefundPolicy = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <FiDollarSign className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          </div>
          <p className="text-lg text-gray-600">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="prose max-w-none">
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Important Notice
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Zahopay is a payment facilitation platform only. All
                      refund requests must be handled directly between the buyer
                      and seller.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiClock className="mr-2 text-purple-600" />
              1. General Refund Policy
            </h2>
            <p className="mb-4 text-gray-700">
              Since Zahopay facilitates direct bank-to-bank payments:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                We <strong>do not process refunds</strong> directly through our
                platform
              </li>
              <li>
                All refund requests must be initiated by the seller/merchant
              </li>
              <li>
                Refunds will be processed directly from the seller's bank
                account to the buyer's bank account
              </li>
              <li>
                Zahopay cannot guarantee refunds as we don't control the funds
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. Subscription Refunds
            </h2>
            <p className="mb-4 text-gray-700">
              For Zahopay service subscriptions:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                Subscription fees are <strong>non-refundable</strong> after 24
                hours of purchase
              </li>
              <li>
                Refund requests within 24 hours may be considered on a
                case-by-case basis
              </li>
              <li>
                To request a subscription refund, contact{" "}
                <a
                  href="mailto:support@zahopay.com"
                  className="text-purple-600 hover:underline"
                >
                  support@zahopay.com
                </a>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Dispute Resolution
            </h2>
            <p className="mb-4 text-gray-700">If you have payment disputes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                First attempt to resolve directly with the seller/merchant
              </li>
              <li>
                For unresolved disputes, you may contact your bank for
                chargeback options
              </li>
              <li>
                Zahopay can provide transaction records to assist in dispute
                resolution
              </li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertCircle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    No Liability for Transactions
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Zahopay is not responsible for refunds or disputes between
                      buyers and sellers. We only provide the payment
                      infrastructure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Processing Time
            </h2>
            <p className="mb-6 text-gray-700">
              If a seller agrees to issue a refund:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Bank processing times apply (typically 3-7 business days)</li>
              <li>International transactions may take longer</li>
              <li>Zahopay cannot expedite bank processing times</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Contact Information
            </h2>
            <p className="mb-6 text-gray-700">
              For questions about this policy or assistance with transactions:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="flex items-center mb-3">
                <FiMail className="text-gray-500 mr-3" />
                <a
                  href="mailto:support@zahopay.com"
                  className="text-gray-700 hover:text-purple-600"
                >
                  support@zahopay.com
                </a>
              </div>
              <div className="flex items-center">
                <FiMail className="text-gray-500 mr-3" />
                <a
                  href="https://support.zahopay.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-purple-600"
                >
                  support.zahopay.com
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-500">
                By using Zahopay's services, you acknowledge that you have read
                and understood this Refund Policy.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/terms"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View Terms & Conditions
          </Link>
          <Link
            to="/privacy"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            View Privacy Policy
          </Link>
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RefundPolicy;
