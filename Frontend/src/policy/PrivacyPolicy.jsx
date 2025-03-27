import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiShield, FiLock, FiDatabase, FiMail } from "react-icons/fi";

const PrivacyPolicy = () => {
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
            <FiShield className="h-8 w-8 text-purple-600 mr-2" />
            <h1 className="text-4xl font-bold text-gray-900">Privacy Policy</h1>
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
            <div className="bg-purple-50 border-l-4 border-purple-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiLock className="h-5 w-5 text-purple-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-purple-800">
                    Your Privacy Matters
                  </h3>
                  <div className="mt-2 text-sm text-purple-700">
                    <p>
                      Zahopay is committed to protecting your personal
                      information while providing a seamless payment experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiDatabase className="mr-2 text-purple-600" />
              1. Information We Collect
            </h2>
            <p className="mb-4 text-gray-700">
              When you use Zahopay, we may collect:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                <strong>Account Information:</strong> Name, email, phone number
                when you register
              </li>
              <li>
                <strong>Payment Information:</strong> UPI IDs, bank account
                details (processed directly by banking partners)
              </li>
              <li>
                <strong>Transaction Data:</strong> Payment amounts, dates, and
                recipient information
              </li>
              <li>
                <strong>Technical Data:</strong> IP address, device information,
                browser type
              </li>
              <li>
                <strong>Usage Data:</strong> How you interact with our platform
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
              <FiShield className="mr-2 text-purple-600" />
              2. How We Use Your Information
            </h2>
            <p className="mb-4 text-gray-700">
              We use collected information to:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Provide and maintain our services</li>
              <li>
                Process transactions (payments are handled directly between
                banks)
              </li>
              <li>Improve and personalize user experience</li>
              <li>Communicate with you about services and updates</li>
              <li>Prevent fraud and ensure platform security</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              3. Data Sharing and Disclosure
            </h2>
            <p className="mb-4 text-gray-700">
              We do not sell your personal data. We may share information with:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>
                <strong>Banking Partners:</strong> Only to facilitate payments
                (data is encrypted)
              </li>
              <li>
                <strong>Service Providers:</strong> For hosting, analytics, and
                customer support
              </li>
              <li>
                <strong>Legal Authorities:</strong> When required by law or to
                protect our rights
              </li>
            </ul>
            <p className="mb-6 text-gray-700">
              Note: Zahopay acts as a facilitator only. Payment transactions
              occur directly between users' bank accounts.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <p className="mb-6 text-gray-700">
              We implement industry-standard security measures including:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>SSL/TLS encryption for all data transmissions</li>
              <li>Regular security audits and monitoring</li>
              <li>Limited access to personal data</li>
              <li>Secure server infrastructure</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              5. Your Rights
            </h2>
            <p className="mb-4 text-gray-700">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
              <li>Access and request a copy of your personal data</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt-out of marketing communications</li>
            </ul>

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 rounded-r-lg">
              <div className="flex">
                <div className="flex-shrink-0">
                  <FiMail className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Contact Us
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>For privacy-related requests or questions:</p>
                    <div className="mt-2">
                      <a
                        href="mailto:privacy@zahopay.com"
                        className="font-medium hover:text-blue-600"
                      >
                        privacy@zahopay.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              6. Changes to This Policy
            </h2>
            <p className="mb-6 text-gray-700">
              We may update this Privacy Policy periodically. We'll notify you
              of significant changes through our platform or via email.
            </p>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <p className="text-sm text-gray-500">
                By using Zahopay's services, you acknowledge you have read and
                understood this Privacy Policy.
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

export default PrivacyPolicy;
