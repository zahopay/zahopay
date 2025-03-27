import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiZap, FiUsers, FiGlobe, FiAward, FiHeart } from "react-icons/fi";


const AboutUs = () => {
  const teamMembers = [
    {
      name: "Rahul Sharma",
      role: "Founder & CEO",
      bio: "Payment systems expert with 10+ years in fintech",
      img: "/team/rahul.jpg", // Replace with actual image path
    },
    {
      name: "Priya Patel",
      role: "CTO",
      bio: "Full-stack developer specializing in payment gateways",
      img: "/team/priya.jpg",
    },
    {
      name: "Arjun Gupta",
      role: "Head of Growth",
      bio: "Digital marketing specialist focused on fintech",
      img: "/team/arjun.jpg",
    },
  ];

  const stats = [
    { value: "500+", label: "Merchants" },
    { value: "10M+", label: "Transactions" },
    { value: "₹100Cr+", label: "Processed" },
    { value: "24/7", label: "Support" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Hero Section */}
      <div className="relative bg-purple-600 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto text-center relative z-10"
        >
          <div className="flex justify-center mb-4">
            <FiZap className="h-10 w-10 text-yellow-300 animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Powering India's Digital Payments
          </h1>
          <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
            Zahopay makes accepting payments simple, fast, and secure for
            businesses of all sizes.
          </p>
        </motion.div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-500 transform rotate-45"></div>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Story
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              Founded in 2022, Zahopay began with a simple mission: to help
              Indian businesses accept digital payments without the complexity
              and high fees of traditional payment processors.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team of fintech veterans saw an opportunity to create a
              payment solution that works seamlessly with UPI, offers instant
              settlements, and puts merchants first.
            </p>
            <p className="text-lg text-gray-600">
              Today, we're proud to serve hundreds of businesses across India,
              from small shops to growing enterprises.
            </p>
          </div>
        </motion.div>

        {/* Mission & Values */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FiHeart className="text-red-500 mr-3" />
                Our Mission
              </h3>
              <p className="text-gray-700">
                To democratize digital payments in India by providing
                affordable, accessible payment solutions that help businesses
                grow.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <FiAward className="text-yellow-500 mr-3" />
                Our Values
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Merchant-first approach</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Transparent pricing (0% transaction fees)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Instant settlements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-600 mr-2">✓</span>
                  <span>Secure by design</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-purple-50 rounded-2xl p-8 mb-20"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-700">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Join hundreds of businesses using Zahopay to simplify their
            payments.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700"
            >
              Create Free Account
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Contact Sales
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AboutUs;
