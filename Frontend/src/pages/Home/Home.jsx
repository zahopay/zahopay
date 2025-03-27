import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck, FiStar } from "react-icons/fi";
import { Link } from "react-router-dom";
import assets from "../../assets/asset";

const Home = () => {
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const features = [
    "instant settlement",
    "0% transaction fee",
    "UPI intent support",
    "risk mitigation",
  ];

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
        "2 Payment Forms",
      ],
      bestValue: false,
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
        "5 Payment Forms",
      ],
      bestValue: false,
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
        "2 Payment Forms",
      ],
      bestValue: true,
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
        "5 Payment Forms",
      ],
      bestValue: true,
    },
  ];

  const reviews = [
    {
      name: "Rajesh Kumar",
      role: "E-commerce Store Owner",
      content:
        "I am thrilled to have discovered Zahopay. Since my profit margin is quite slim, the fact that Zahopay UPI charges 0% commission and provides instant settlements has been a game-changer for my business.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Freelance Designer",
      content:
        "The payment links feature has simplified my invoicing process. My clients can now pay me instantly without any hassle. The instant settlement is what I love the most!",
      rating: 5,
    },
    {
      name: "Vikram Patel",
      role: "Small Business Owner",
      content:
        "Zahopay's QR code solution helped me go cashless in my shop. The setup was easy and now I receive payments directly to my bank account with zero transaction fees.",
      rating: 5,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeatureIndex((prevIndex) =>
        prevIndex === features.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <img
                  src={assets.zahoPayLogo}
                  alt="Zahopay Logo"
                  className="h-16 w-auto"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
              >
                Home
              </Link>

              <Link
                to="/contact"
                className="text-gray-700 hover:text-purple-600 px-3 py-2 text-sm font-medium"
              >
                Contact Us
              </Link>
              <Link
                to="/login"
                className="text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md text-sm font-medium"
              >
                Register
              </Link>
            </div>
            <div className="md:hidden flex items-center">
              {/* Mobile menu button */}
              <button className="text-gray-500 hover:text-gray-600 focus:outline-none">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-purple-50 to-indigo-50 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              >
                Accept unlimited payments with <br />
                <span className="text-purple-600">
                  {features.map((feature, index) => (
                    <motion.span
                      key={feature}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: index === currentFeatureIndex ? 1 : 0,
                        y: index === currentFeatureIndex ? 0 : 20,
                      }}
                      transition={{ duration: 0.5 }}
                      className="absolute"
                    >
                      {feature}
                    </motion.span>
                  ))}
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg text-gray-600 mb-8 mt-16"
              >
                Zahopay helps businesses of all sizes accept payments seamlessly
                with our powerful payment solutions. Get started today and
                experience the future of payments.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              >
                <Link
                  to="/register"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium text-center transition duration-300"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/login"
                  className="border border-purple-600 text-purple-600 hover:bg-purple-50 px-6 py-3 rounded-lg font-medium text-center transition duration-300"
                >
                  Login to Dashboard
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-4 rounded-xl shadow-lg"
            >
              {/* Placeholder for hero image */}
              <div className="bg-gray-200 h-64 md:h-80 w-full rounded-lg flex items-center justify-center">
                {/* <span className="text-gray-500">Hero Image Placeholder</span> */}
                <img src={assets.heroHomeImage} alt="" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Payment Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Powerful features designed to help you accept payments
              effortlessly and grow your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Payment Links",
                description:
                  "Generate and share payment links on social media platforms, WhatsApp, SMS and receive instant payments.",
              },
              {
                title: "QR Code",
                description:
                  "Share the QR code of your payment handle on social media platforms, WhatsApp, SMS and receive instant payments.",
              },
              {
                title: "Instant Settlement",
                description:
                  "Forget about settlement issues. All payments are processed and settled in real-time to ensure trust and improve cash flow.",
              },
              {
                title: "Checkout Ads",
                description:
                  "Present advertisements to your customers on the checkout page to promote your affiliate brands or your own business.",
              },
              {
                title: "Multiple Themes",
                description:
                  "Choose from our beautifully designed checkout themes to match your brand identity and create a seamless payment experience.",
              },
              {
                title: "WhatsApp Automation",
                description:
                  "Automate payment reminders and receipts via WhatsApp to improve customer experience and reduce manual work.",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition duration-300"
              >
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <FiCheck className="text-purple-600 text-xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Pricing Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pricing Plans
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Simple, transparent pricing that grows with your business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-sm overflow-hidden ${
                  plan.bestValue ? "ring-2 ring-purple-500" : ""
                }`}
              >
                {plan.bestValue && (
                  <div className="bg-purple-600 text-white text-center py-1 text-sm font-medium">
                    Best Value
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {plan.name}
                  </h3>
                  <div className="flex items-end mb-6">
                    <span className="text-3xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 ml-1">/{plan.duration}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <FiCheck className="text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`block w-full py-3 px-4 text-center rounded-lg font-medium transition duration-300 ${
                      plan.bestValue
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "border border-purple-600 text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-purple-600 text-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { number: "500+", label: "Merchants" },
              { number: "2+", label: "Themes" },
              { number: "Unlimited", label: "Payments" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="p-6"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-xl">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Merchant Reviews
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what our customers say
              about us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{review.content}"</p>
                <div className="flex items-center">
                  <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center text-purple-600 font-bold mr-3">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      {review.name}
                    </div>
                    <div className="text-sm text-gray-500">{review.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 md:py-24 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Join thousands of businesses already using Zahopay to accept
            payments effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-medium transition duration-300"
            >
              Create Free Account
            </Link>
            <Link
              to="/contact"
              className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 px-8 py-4 rounded-lg font-medium transition duration-300"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <img
                  src={assets.zahoPayLogo}
                  alt="Zahopay Logo"
                  className="h-12 w-auto"
                />
              </div>
              <p className="text-gray-400">
                Accept payments effortlessly with our powerful payment
                solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-400 hover:text-white transition"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/terms"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-400">support@zahopay.com</li>
                <li className="text-gray-400">+91 9876543210</li>
                <li className="text-gray-400">Bangalore, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 Zahopay Solutions. All rights reserved.
            </div>
            <div className="text-gray-400 flex items-center">
              Made with <span className="text-red-500 mx-1">❤️</span> in India
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
