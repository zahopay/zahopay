import axios from "axios";
import React, { useContext, useEffect, useState, useRef } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { toast } from "react-toastify";
import AppContext from "../../../context/AppContext";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { IoIosWarning } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { FaExternalLinkAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiFileOn } from "react-icons/ci";

const AllUserProducts = ({ setAllProductIsOpen, currentUser }) => {


  const { backendUrl, frontendUrl } = useContext(AppContext);
  const [allProducts, setAllProducts] = useState([]);
  const popupRef = useRef(null);
  const [productPopup, setProductPopup] = useState(null);

  useEffect(() => {
    const fetchAllUserProducts = async () => {
      try {
        axios.defaults.withCredentials = true;

        const { data } = await axios.post(
          backendUrl + "/admin/auth/get-user-individual-products",
          { userId: currentUser._id }
        );

        if (data.success) {
          setAllProducts(data.allUserProducts);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchAllUserProducts();
  }, [currentUser]);

  const truncateTitle = (title) => {
    return title.length > 30 ? title.substring(0, 30) + "..." : title;
  };

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

  const handleProductLinkClick = (productId) => {
    // navigate(`/view-product/${productId}`);

    const link = `${frontendUrl}/checkout/${productId}`;

    window.open(link, "_blank");
  };

  const handleProductFileClick = (productFile) => {
    window.open(productFile, "_blank");
  };

return (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
    {/* Popup Container */}
    <div className="relative w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
      {/* Close Button */}
      <button
        onClick={() => setAllProductIsOpen(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
      >
        <IoIosCloseCircle size={30} />
      </button>

      {/* Title */}
      <h2 className="text-2xl font-semibold mb-4 text-center">
        All User Products
      </h2>

      {/* Scrollable Table Container */}
      <div className="max-h-[500px] overflow-auto border border-gray-300 rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase border-r border-gray-200">
                Date
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase border-r border-gray-200">
                Image
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase border-r border-gray-200">
                Title
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase border-r border-gray-200">
                Product Details 
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {allProducts?.map((product, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-1/12">
                  {formatDateWithTime(product?.createdAt)}
                </td>
                <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-1/12">
                  <img
                    src={product?.logoImage}
                    alt={product?.title}
                    className="w-16 h-16 rounded-full shadow "
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-3/12">
                  <div className="flex flex-col gap-2">
                    <p className="">{truncateTitle(product?.title, 25)}</p>
                    <p className="text-[14px] font-bold">₹{product?.price}</p>
                    <p className="text-[14px] font-bold">{product?.upiId}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-2/12">
                  <div className="flex flex-col gap-2">
                    <p className="text-[12px]">
                      {"Product Id : "} {product?._id}
                    </p>
                    <div className="flex items-center justify-between ">
                        <p className="text-[12px]">{"FB Pixel : "} {product?.facebookPixel}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-1/12">
                  <div className="relative">
                    <CiMenuKebab
                      onClick={() =>
                        setProductPopup(productPopup === index ? null : index)
                      }
                      className="cursor-pointer hover:text-blue-400 transition-all duration-300"
                    />

                    {productPopup === index && (
                      <div
                        ref={popupRef}
                        className="absolute right-0 top-4 bg-white w-[150px] border border-gray-100"
                      >
                        <ul className="list-none flex flex-col gap-2 items-start px-2 py-2 rounded-xl shadow-md">
                          <li
                            className="cursor-pointer flex gap-2 items-center text-gray-600 hover:text-blue-400 transition-all duration-200"
                            onClick={() => handleProductLinkClick(product._id)}
                          >
                            <FaExternalLinkAlt /> Open Link
                          </li>
                          <hr className="h-[1px] border-none bg-gray-300 w-full" />
                          
                          <li className="cursor-pointer flex gap-2 items-center text-gray-600 hover:text-blue-400 transition-all duration-200"></li>
                        </ul>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default AllUserProducts;
