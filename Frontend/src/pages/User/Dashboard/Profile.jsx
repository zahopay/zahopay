import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../../context/AppContext";
import { toast } from "react-toastify";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import KYCDetailsPopup from "../../../components/kycDetails/KYCDetailsPopup";
import { getDaysRemaining } from "../../../utils/getDaysRemaining";



const Profile = () => {

  const { backendUrl, userData} = useContext(AppContext);
  const [userDetails, setUserDetails] = useState(null);
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isKycPopupOpen, setIsKycPopupOpen] = useState(false);

  const daysRemaining = getDaysRemaining(userData?.userPlanExpire);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(
          backendUrl + "/api/dashboard/get-user-profile"
        );

        if (data.success) {
          setUserDetails(data.user);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchUserProfile();
  }, [backendUrl]);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      const { data } = await axios.post(
        backendUrl + "/api/dashboard/user-change-password",
        {
          currentPassword,
          newPassword,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsPasswordPopupOpen(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to change password."
      );
    }
  };

  const handleKycSubmit = async (kycData) => {
    try {

      const formData = new FormData();
      formData.append("aadharFrontImage", kycData.aadharFrontImage);
      formData.append("aadharBackImage", kycData.aadharBackImage);
      formData.append("panImage", kycData.panImage);
      formData.append("userId", userData.userId);


      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/user/kyc/upload-user-kyc",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if(data.success){
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-6"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>

        <div className="space-y-6">
          {/* Created At */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">Created</h2>
            <h3 className="text-lg font-medium text-gray-800">
              {formatDate(userDetails?.createdAt)}
            </h3>
          </div>

          {/* Name */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">Name</h2>
            <h3 className="text-lg font-medium text-gray-800">
              {userDetails?.name}
            </h3>
          </div>

          {/* Email */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">Email</h2>
            <h3 className="text-lg font-medium text-gray-800">
              {userDetails?.email}
            </h3>
          </div>

          {/* Account Verified */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">
              Account Verified
            </h2>
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              {userDetails?.isAccountVerified ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              {userDetails?.isAccountVerified ? "Yes" : "No"}
            </h3>
          </div>

          {/* KYC Verified */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">
              KYC Verified
            </h2>
            <h3 className="text-lg font-medium text-gray-800 flex items-center">
              {userDetails?.kycDetails?.panImage &&
              userDetails?.kycDetails?.aadharBack &&
              userDetails?.kycDetails?.aadharFront ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              {userDetails?.kycDetails?.panImage &&
              userDetails?.kycDetails?.aadharBack &&
              userDetails?.kycDetails?.aadharFront
                ? "Yes"
                : "No"}
            </h3>
          </div>

          {/* User Plan */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">User Plan</h2>
            <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
              {userDetails?.userPlan !== "no-plan" ? (
                <FaCheckCircle className="text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="text-red-500 mr-2" />
              )}
              {userDetails?.userPlan === "no-plan" ? "No" : "Yes"}
              {"   "}
              <span className="text-[12px] text-purple-500">
                {userDetails?.userPlan === "no-plan"
                  ? ""
                  : userDetails?.userPlan}
              </span>
            </h3>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">
              Plan Expire In
            </h2>
            <h3 className="text-lg font-medium text-gray-800">
              {daysRemaining}{" "}{"Days"}
            </h3>
          </div>

          {/* upload kyc document */}

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">KYC Details</h2>
            <button
              onClick={() => setIsKycPopupOpen(true)}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Upload KYC
            </button>
          </div>

          {/* Password */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500">Password</h2>
            <button
              onClick={() => setIsPasswordPopupOpen(true)}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* kyc popup  */}

      {isKycPopupOpen && (
        <KYCDetailsPopup
          onClose={() => setIsKycPopupOpen(false)}
          onSubmit={handleKycSubmit}
        />
      )}

      {/* Password Change Popup */}
      {isPasswordPopupOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white rounded-lg p-6 w-96"
          >
            <h2 className="text-xl font-bold mb-4">Change Password</h2>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 mb-4 border rounded-lg"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsPasswordPopupOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handlePasswordChange}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Profile;
