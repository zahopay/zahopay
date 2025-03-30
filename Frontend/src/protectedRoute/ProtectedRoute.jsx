import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import {motion} from "framer-motion"



const ProtectedRoute = () => {
  const { setUserData, userData, setAuthState, backendUrl, authState } = useContext(AppContext);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  console.log("userData Protected Route : ", userData)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/auth/is-auth`,
          { 
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            }
          }
        );

        if (response.data.success) {
          setAuthState({
            isLoggedin: true,
            userData: response.data.userDetails,
            isLoading: false,
          });
          setUserData(response.data.userDetails);
        } else {
          throw new Error('Not authenticated');
        }
      } catch (error) {
        setAuthState({
          isLoggedin: false,
          userData: null,
          isLoading: false
        });
        navigate('/login');
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
