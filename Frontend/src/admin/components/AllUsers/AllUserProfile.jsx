import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";

const AllUserProfile = ({ setUserProfileIsOpen, currentUser }) => {


  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleKYCImage = (aadharFrontImage) => {
    window.open(aadharFrontImage, "_blank");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 p-4">
      {/* Popup Container */}
      <div className="relative w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={() => setUserProfileIsOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
        >
          <IoIosCloseCircle size={30} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          User Profile
        </h2>

        {/* Bank Account Section */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Basic Details
          </h3>
          <div className="space-y-3">
            <p className="text-gray-600">
              <span className="font-medium">Created At : </span>{" "}
              {formatDateWithTime(currentUser?.createdAt) || "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">Name : </span>{" "}
              {currentUser?.userProfile?.name || "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">Address : </span>{" "}
              {currentUser?.userProfile?.address || "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">Email : </span>{" "}
              {currentUser?.email || "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">Phone Number : </span>{" "}
              {currentUser?.mobile || "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">User Earnings : </span>{" "}
              {currentUser?.userEarnings || "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">Total Sales : </span>{" "}
              {currentUser?.totalSales || "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">User Plan : </span>{" "}
              {currentUser?.userPlan || "N/A"}
            </p>

            <p className="text-gray-600">
              <span className="font-medium">User Expired : </span>{" "}
              {currentUser?.userPlanExpire || "N/A"}
            </p>

            <p className="text-gray-600 flex gap-4">
              <span className="font-medium">Aadhar Front Image : </span>{" "}
              <p
                onClick={() =>
                  handleKYCImage(currentUser?.kycDetails?.aadharFront)
                }
                className="underline cursor-pointer text-blue-700 "
              >
                View Image
              </p>
            </p>

            <p className="text-gray-600 flex gap-4">
              <span className="font-medium">Aadhar Back Image : </span>{" "}
              <p
                onClick={() =>
                  handleKYCImage(currentUser?.kycDetails?.aadharBack)
                }
                className="underline cursor-pointer text-blue-700 "
              >
                View Image
              </p>
            </p>

            <p className="text-gray-600 flex gap-4">
              <span className="font-medium">Pan Image : </span>{" "}
              <p
                onClick={() =>
                  handleKYCImage(currentUser?.kycDetails?.panImage)
                }
                className="underline cursor-pointer text-blue-700 "
              >
                View Image
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUserProfile
