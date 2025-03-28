import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const { backendUrl, isLoggedin, setIsLoggedin, sendVerificationOtp } =
    useContext(AppContext);

  const navigate = useNavigate();

  async function onFormSubmit(e) {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/register", {
        name,
        email,
        mobile,
        password,
      });

      if (data.success) {
        toast.success(data.message);
        setIsLoggedin(true);
        if (sendVerificationOtp()) {
        navigate("/verify-account");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        {/* Left Section - Illustration or Branding */}
        <div className="w-full md:w-1/2 bg-blue-900 p-8 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4 animate-slide-in-left">
            Welcome to ZahoPay
          </h1>
          <p className="text-center text-lg animate-slide-in-left delay-100">
            Join us and experience seamless payments.
          </p>
          <div className="mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Illustration"
              className="w-48 h-48 animate-bounce"
            />
          </div>
        </div>

        {/* Right Section - Registration Form */}
        <div className="w-full md:w-1/2 p-8">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-6 animate-fade-in delay-200"
          >
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Sign Up
            </h1>

            {/* Name Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-gray-700">
                Full Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-gray-700">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>

            {/* Mobile Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="phone-number" className="text-gray-700">
                Mobile Number <span className="text-red-600">*</span>
              </label>
              <input
                type="number"
                name="mobile-number"
                placeholder="Mobile Number"
                className="border rounded-lg px-4 py-2 outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setMobile(e.target.value)}
                value={mobile}
                required
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-700">
                Create Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>

            {/* Terms and Conditions */}
            <p className="text-xs text-center text-gray-500">
              By signing up, you agree to our{" "}
              <Link to="/terms" className="text-blue-500 hover:underline">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-blue-500 hover:underline">
                Privacy Policy
              </Link>{" "}
              and to receive calls/SMS/WhatsApp messages from ZahoPay.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
