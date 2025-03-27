import React, { useContext, useEffect, useRef } from "react";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const { isLoggedin, setIsLoggedin, backendUrl, getUserData, userData } =
    useContext(AppContext);

  const navigate = useNavigate();

  const inputRefs = useRef([]);

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
    try {
      e.preventDefault();
      const OtpArray = inputRefs.current.map((e) => e.value);
      const otp = OtpArray.join("");

      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      if (data.success) {
        toast.success(data.message);
        getUserData();
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
            Verify Your Email
          </h1>
          <p className="text-center text-lg animate-slide-in-left delay-100">
            Secure your account with a 6-digit OTP.
          </p>
          <div className="mt-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Illustration"
              className="w-48 h-48 animate-bounce"
            />
          </div>
        </div>

        {/* Right Section - Verification Form */}
        <div className="w-full md:w-1/2 p-8">
          <form
            onSubmit={onFormSubmit}
            className="flex flex-col gap-6 animate-fade-in delay-200"
          >
            <h1 className="text-3xl font-bold text-center text-gray-800">
              Email Verification
            </h1>
            <p className="text-center text-gray-600">
              Verify your email with the 6-digit OTP sent to your mail ID.
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

            {/* Verify Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 transform hover:scale-105"
            >
              Verify Email
            </button>

            {/* Resend OTP Link */}
            <p className="text-center text-gray-600">
              Didn't receive the OTP?{" "}
              <button
                type="button"
                className="text-blue-600 hover:underline"
                onClick={() => toast.info("OTP resent!")}
              >
                Resend OTP
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;
