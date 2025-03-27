import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiAlertTriangle,
  FiMail,
  FiPhone,
  FiExternalLink,
} from "react-icons/fi";

const TermsAndConditions = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms & Conditions
          </h1>
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
            {/* Important Notice */}
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Important Notice
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>
                      Zahopay is a payment facilitation platform only. We are
                      not responsible for any payments made between users.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms Content */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              1. Service Description
            </h2>
            <p className="mb-6 text-gray-700">
              Zahopay provides a platform for creating payment links and QR
              codes. We are web developers and payment facilitators only. All
              payments are processed directly between the payer and the payee's
              bank account. Zahopay does not hold or transfer funds at any
              point.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              2. No Responsibility for Transactions
            </h2>
            <p className="mb-6 text-gray-700">
              Zahopay is not responsible for:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                The quality, safety, or legality of any goods or services sold
              </li>
              <li>The accuracy of any listings or content provided by users</li>
              <li>
                The ability of sellers to sell items or buyers to pay for them
              </li>
              <li>Any payment disputes between users</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Prohibited Activities
            </h2>
            <p className="mb-4 text-gray-700">
              You agree not to use Zahopay for:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Any illegal activities or transactions</li>
              <li>Adult content or services</li>
              <li>Fraudulent or scam activities</li>
              <li>Counterfeit or stolen goods</li>
              <li>Drugs, narcotics, or controlled substances</li>
              <li>Weapons or ammunition</li>
              <li>Any activity that violates applicable laws</li>
            </ul>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiAlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Violation Reporting
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      If you encounter any illegal activities or violations of
                      these terms, please report immediately to:
                    </p>
                    <div className="mt-2 flex items-center">
                      <FiMail className="mr-2" />
                      <a
                        href="mailto:support@zahopay.com"
                        className="text-yellow-700 hover:text-yellow-600"
                      >
                        support@zahopay.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. User Responsibilities
            </h2>
            <p className="mb-4 text-gray-700">
              As a Zahopay user, you agree to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Provide accurate and complete information</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not engage in any fraudulent or deceptive practices</li>
              <li>
                Resolve any payment disputes directly with the other party
              </li>
              <li>Not hold Zahopay liable for any transaction issues</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Contact Information
            </h2>
            <p className="mb-4 text-gray-700">
              For any questions or concerns regarding these Terms & Conditions,
              please contact us:
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
                <FiExternalLink className="text-gray-500 mr-3" />
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
                By using Zahopay's services, you acknowledge that you have read,
                understood, and agree to be bound by these Terms & Conditions.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TermsAndConditions;
