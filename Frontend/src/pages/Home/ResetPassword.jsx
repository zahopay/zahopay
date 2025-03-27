import React, { useState, useRef, useContext, useEffect } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const inputRefs = useRef([]);

  const navigate = useNavigate();

  const [resetInput, setResetInput] = useState(true);

  const [newPassword, setNewPassword] = useState("");

  const { isLoggedin, setIsLoggedIn, backendUrl, getUserData, userData } =
    useContext(AppContext);

  const [email, setEmail] = useState("");

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");

    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  async function onFormSubmit(e) {
    e.preventDefault();
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );

      if (data.success) {
        setResetInput(false);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  async function onOtpSubmit(e) {
    try {
      e.preventDefault();
      const OtpArray = inputRefs.current.map((e) => e.value);
      const otp = OtpArray.join("");

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        { otp, newPassword, email }
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate("/");
  }, [isLoggedin, userData]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
        {/* Left Section - Illustration or Branding */}
        <div className="w-full md:w-1/2 bg-blue-900 p-8 flex flex-col justify-center items-center text-white">
          <h1 className="text-4xl font-bold mb-4 animate-slide-in-left">
            Reset Password
          </h1>
          <p className="text-center text-lg animate-slide-in-left delay-100">
            Secure your account with a new password.
          </p>
          <div className="mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Illustration"
              className="w-48 h-48 animate-bounce"
            />
          </div>
        </div>

        {/* Right Section - Reset Password Form */}
        <div className="w-full md:w-1/2 p-8">
          {resetInput ? (
            <form
              onSubmit={onFormSubmit}
              className="flex flex-col gap-6 animate-fade-in delay-200"
            >
              <h1 className="text-3xl font-bold text-center text-gray-800">
                Reset Password
              </h1>
              <p className="text-center text-gray-600">
                Enter your email to receive a verification OTP.
              </p>

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

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form
              onSubmit={onOtpSubmit}
              className="flex flex-col gap-6 animate-fade-in delay-200"
            >
              <h1 className="text-3xl font-bold text-center text-gray-800">
                Verify OTP
              </h1>
              <p className="text-center text-gray-600">
                Enter the 6-digit OTP sent to your email.
              </p>

              {/* OTP Input Fields */}
              <div
                className="flex justify-between gap-4 mb-8"
                onPaste={handlePaste}
              >
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <input
                      type="text"
                      maxLength="1"
                      key={index}
                      required
                      className="w-12 h-12 bg-slate-100 text-gray-800 text-xl text-center rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 transition-all"
                      ref={(e) => (inputRefs.current[index] = e)}
                      onInput={(e) => handleInput(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                  ))}
              </div>

              {/* New Password Field */}
              <div className="flex flex-col gap-2">
                <label htmlFor="new-password" className="text-gray-700">
                  New Password <span className="text-red-600">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="New Password"
                  className="border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  required
                />
              </div>

              {/* Verify OTP Button */}
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
              >
                Verify OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
