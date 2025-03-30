import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import {motion} from "framer-motion"



const ProtectedRoute = () => {
const { setUserData, setAuthState, backendUrl,authState } = useContext(AppContext);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // First check if authenticated
        const authResponse = await axios.get(`${backendUrl}/api/auth/is-auth`, {
          withCredentials: true,
        });

        if (authResponse.data.success) {
          // Then get user data
          const userDataResponse = await axios.get(`${backendUrl}/api/user/data`, {
            withCredentials: true,
          });

          if (userDataResponse.data.success) {
            setAuthState({
              isLoggedin: true,
              isLoading: false,
              userData: userDataResponse.data.userDetails, // Fixed typo here
            });
            setUserData(userDataResponse.data.userDetails); // Fixed typo here
          } else {
            throw new Error("Failed to get user data");
          }
        } else {
          throw new Error("Not authenticated");
        }
      } catch (error) {
        setAuthState({
          isLoggedin: false,
          isLoading: false,
          userData: null,
        });
        setUserData(null);
        navigate("/login");
      } finally {
        setAuthChecked(true);
      }
    };

    checkAuth();
  }, [navigate, backendUrl, setAuthState, setUserData]);

  if (!authChecked) {
    return (
      <div className="min-h-screen min-w-full bg-white flex items-center justify-center">
        <div className="h-12 w-12 border-t-4 border-b-4 border-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return authState.isLoggedin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
