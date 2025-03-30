import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const {
    backendUrl,
    userData,
    setUserData,
    setIsLoggedin,
    verifyAuth,
    setAuthState,
    authState
  } = useContext(AppContext);


 async function onFormSubmit(e) {
  e.preventDefault();


  try {
    console.log('Making login request...');
    const { data } = await axios.post(
      `${backendUrl}/api/auth/login`,
      { email, password },
      { 
        withCredentials: true,
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        } 
      }
    );

    if (data.success) {
      toast.success(data.message);

      
      // Update state immediately with received data
      setAuthState({
        isLoggedin: true,
        userData: data.userDetails,
        isLoading: false
      });
      setUserData(data.userDetails)


      navigate("/user/dashboard");
      
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {

    toast.error(error.response?.data?.message || error.message || "Login failed");
    setAuthState({
      isLoggedin: false,
      userData: null,
      isLoading: false
    });
    setUserData(null)
  }
}

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        {/* Left Section - Illustration or Branding */}
        <div className="w-full md:w-1/2 bg-blue-900 p-8 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4 animate-slide-in-left">
            Welcome Back!
          </h1>
          <p className="text-center text-lg animate-slide-in-left delay-100">
            Login to access your account.
          </p>
          <div className="mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Illustration"
              className="w-48 h-48 animate-bounce"
            />
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-6 animate-fade-in delay-200"
          >
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Login
            </h1>

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

            {/* Password Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-gray-700">
                Password <span className="text-red-600">*</span>
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

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/reset-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Log In
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
