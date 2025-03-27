import React, { useState } from "react";

const KYCDetailsPopup = ({ onClose, onSubmit }) => {

  const [aadharFrontImage, setAadharFrontImage] = useState(null);
  const [aadharBackImage, setAadharBackImage] = useState(null);
  const [panImage, setPanImage] = useState(null);

  const [aadharFrontPreview, setAadharFrontPreview] = useState(null)
  const [aadharBackPreview, setAadharBackPreview] = useState(null);
  const [panPreview, setPanPreview] = useState(null);


  const handleAadharFrontChange = (e) => {
    const file = e.target.files[0];
    
    if (file) {
      setAadharFrontImage(file)
      setAadharFrontPreview(URL.createObjectURL(file));
    }
  };

  const handleAadharBackChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAadharBackImage(file)
      setAadharBackPreview(URL.createObjectURL(file));
    }
  };

  const handlePanChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPanImage(file)
      setPanPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    const kycData = {
      aadharFrontImage,
      aadharBackImage,
      panImage,
    };
    onSubmit(kycData); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold text-purple-800 mb-4">
          Upload KYC Documents
        </h2>

        {/* Aadhar Front Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Front Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAadharFrontChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {aadharFrontImage && (
            <div className="mt-2">
              <img
                src={aadharFrontPreview}
                alt="Aadhar Front Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Aadhar Back Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Aadhar Back Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAadharBackChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {aadharBackPreview && (
            <div className="mt-2">
              <img
                src={aadharBackPreview}
                alt="Aadhar Back Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* PAN Image */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            PAN Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePanChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {panPreview && (
            <div className="mt-2">
              <img
                src={panPreview}
                alt="PAN Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default KYCDetailsPopup;
