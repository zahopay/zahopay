import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import AppContext from "../../context/AppContext";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import AllUserProducts from "../components/AllUsers/AllUserProducts";
import AllUserProfile from "../components/AllUsers/AllUserProfile";
import AllUserPlanHistory from "../components/AllUsers/AllUserPlanHistory";

const AdminAllUsers = () => {
  const { backendUrl } = useContext(AppContext);

  const [allUsersDara, setAllUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    //toggle

    const [allProductIsOpen, setAllProductIsOpen] = useState(false);
    const [allOrdersIsOpen, setAllOrdersIsOpen] = useState(false);
    const [userProfileIsOpen, setUserProfileIsOpen] = useState(false);
    const [userPlanHistoryIsOpen, setUserPlanHistoryIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);


  useEffect(() => {
    const fetchGetAllUsers = async () => {
      try {
        setIsLoading(true)
        axios.defaults.withCredentials = true;

        const { data } = await axios.get(
          backendUrl + "/admin/auth/get-all-users"
        );

        if (data.success) {
          setAllUserData(data.allUsers);
        } else {
          setAllUserData([]);
        }
      } catch (error) {
        toast.error(error.message);
      }finally{
        setIsLoading(false);

      }
    };

    fetchGetAllUsers();
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
                  Premium
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-3/12">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 w-2/12">
                  User Details
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
              {allUsersDara?.map((user, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-1/12">
                    {formatDateWithTime(user?.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border-r border-gray-200 w-1/12 hidden md:table-cell">
                    <p>
                      {user?.userPlan !== "no-plan" ? (
                        <span className="text-green-600">Paid</span>
                      ) : (
                        <span className="text-red-600">Not Paid</span>
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-3/12">
                    <div className="mt-3 flex flex-wrap justify-between items-center">
                      {/* all product Button to open modal */}
                      <button
                        onClick={() => {setAllProductIsOpen(true) 
                                       setSelectedUser(user)}
                        }
                        className="px-5 py-2 rounded-3xl border-2 shadow transition-all duration-300 
                        bg-green-500 text-white border-gray-200 hover:bg-green-300"
                      >
                        All Products
                      </button>

                      {/* all orders Button to open modal */}
                      <button
                        // onClick={() => setAllOrdersIsOpen(true)}
                        className="px-5 py-2 rounded-3xl border-2 shadow transition-all duration-300 
                  bg-green-500 text-white border-gray-200 hover:bg-green-300"
                      >
                        All Orders
                      </button>

                      <button
                        onClick={() => {setUserProfileIsOpen(true)
                                       setSelectedUser(user)}
                        }
                        className="px-5 py-2 rounded-3xl border-2 shadow transition-all duration-300 
                  bg-green-500 text-white border-gray-200 hover:bg-green-300"
                      >
                        Profile
                      </button>

                      <button
                        onClick={() => {setUserPlanHistoryIsOpen(true)
                                       setSelectedUser(user)}
                        }
                        className="px-5 py-2 rounded-3xl border-2 shadow transition-all duration-300 
                  bg-green-500 text-white border-gray-200 hover:bg-green-300"
                      >
                        Plan History
                      </button>

                      {allProductIsOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                          <div className="bg-white text-black p-6 rounded-lg shadow-lg relative w-96">
                            {/* Close Button */}
                            <AllUserProducts
                              setAllProductIsOpen={setAllProductIsOpen}
                              currentUser={selectedUser}
                            />
                          </div>
                        </div>
                      )}

                      {userProfileIsOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                          <div className="bg-white text-black p-6 rounded-lg shadow-lg relative w-96">
                            {/* Close Button */}
                            <AllUserProfile
                              setUserProfileIsOpen={setUserProfileIsOpen}
                              currentUser={selectedUser}
                            />
                          </div>
                        </div>
                      )}

                      {userPlanHistoryIsOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                          <div className="bg-white text-black p-6 rounded-lg shadow-lg relative w-96">
                            {/* Close Button */}
                            <AllUserPlanHistory
                              setUserPlanHistoryIsOpen={
                                setUserPlanHistoryIsOpen
                              }
                              currentUser={selectedUser}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* end  */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-2/12">
                    <p className="">{user?.email || "-"}</p>
                    <p className="mt-2">{user?.mobile || "-"}</p>
                    <p className="text-[12px] mt-2">
                      {"User Id : "}
                      {user?._id || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 border-r border-gray-200 w-1/12">
                    {user?.kycDetails?.aadharFront &&
                    user?.kycDetails?.aadharBack &&
                    user?.kycDetails?.panImage ? (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <MdCancel className="text-red-500 text-xl" />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 w-1/12">
                    {user?.isAccountVerified ? (
                      <FaCheckCircle className="text-green-500 text-xl" />
                    ) : (
                      <MdCancel className="text-red-500 text-xl" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminAllUsers;
