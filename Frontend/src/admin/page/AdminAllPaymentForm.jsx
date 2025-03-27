import React, {useContext, useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import AppContext from '../../context/AppContext';
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { PulseLoader } from "react-spinners";


const AdminAllPaymentForm = () => {

    const [AllPaymentForm, setAllPaymentForm] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const { backendUrl, frontendUrl } = useContext(AppContext);
    useEffect(() => {
      const fetchGetPaymentForm = async () => {
        try {
            setIsLoading(true)
          axios.defaults.withCredentials = true;

          const { data } = await axios.get(
            backendUrl + "/admin/auth/get-all-payment-form"
          );

          if (data.success) {
            setAllPaymentForm(data.allPaymentForm);
          } else {
            setAllPaymentForm([]);
          }
        } catch (error) {
          toast.error(error.message);
        }finally{
            setIsLoading(false);
        }
      };

      fetchGetPaymentForm();
    }, []);

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

    const handlePaymentFormView = (id) => {
      window.open(`${frontendUrl}/checkout/${id}`, "_blank");
    }
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {isLoading && (
        <div className="flex justify-center items-center p-6">
          <PulseLoader color="#3B82F6" size={15} /> {/* Blue spinner */}
        </div>
      )}

      {/* Table with horizontal scroll */}
      {!isLoading && (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-1/12">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-1/12 hidden md:table-cell">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-3/12">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-2/12">
                  Product Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-1/12">
                  Kyc Verify
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                  Account Verify
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {AllPaymentForm?.map((product, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-1/12">
                    {formatDateWithTime(product?.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200 w-1/12 hidden md:table-cell">
                    <img
                      src={product?.logoImage}
                      alt={product?.title}
                      className="rounded-full shadow"
                    />
                  </td>
                  <td className="flex flex-col gap-1 px-6 py-4 whitespace-nowrap text-sm text-gray-900  w-3/12">
                    <p>{product?.title}</p>
                    <p className='font-bold'>₹{product?.price}</p>
                    <p>{product?.upiId}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-2/12">
                    <p className="mt-2 text-[12px]">
                      {"FB Pixel : "}
                      {product?.facebookPixel || "-"}
                    </p>
                    <p className="text-[12px] mt-2">
                      {"Product Id : "}
                      {product?._id || "-"}
                    </p>

                    <p className="text-[12px] mt-2">
                      {"User Id : "}
                      {product?.userId || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-1/12">
                    {product?.customerForm?.name ? (
                      <div className="text-[12px] flex items-center gap-2 justify-between">
                        Name :{" "}
                        <FaCheckCircle className="text-green-500 text-[12px]" />
                      </div>
                    ) : (
                      <div className="text-[12px] flex items-center gap-2 justify-between">
                        Name : <MdCancel className="text-red-500 text-[12px]" />
                      </div>
                    )}

                    {product?.customerForm?.email ? (
                      <div className="text-[12px] flex items-center gap-2 justify-between">
                        Email :{" "}
                        <FaCheckCircle className="text-green-500 text-[12px]" />
                      </div>
                    ) : (
                      <div className="text-[12px] flex items-center gap-2 justify-between">
                        Email :{" "}
                        <MdCancel className="text-red-500 text-[12px]" />
                      </div>
                    )}

                    {product?.customerForm?.address ? (
                      <div className="text-[12px] flex items-center gap-2 justify-between">
                        Address :{" "}
                        <FaCheckCircle className="text-green-500 text-[12px]" />
                      </div>
                    ) : (
                      <div className="text-[12px] flex items-center gap-2 justify-between">
                        Address :{" "}
                        <MdCancel className="text-red-500 text-[12px]" />
                      </div>
                    )}

                    {product?.customerForm?.phone ? (
                      <div className="text-[12px] flex items-center gap-2 justify-between">
                        Phone :{" "}
                        <FaCheckCircle className="text-green-500 text-[12px]" />
                      </div>
                    ) : (
                      <div className="text-[12px] flex items-center gap-2 justify-between">
                        Phone :{" "}
                        <MdCancel className="text-red-500 text-[12px]" />
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900  flex flex-col gap-2 w-full ">
                    <button className='px-4 py-2 shadow rounded-md bg-white text-blakc border-2 border-black hover:shadow-lg' onClick={() => handlePaymentFormView(product._id)}>View</button>
                    <button className='px-4 py-2 rounded-md shadow bg-red-500 text-white'>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminAllPaymentForm
