import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import {motion} from "framer-motion"



const ProtectedRoute = () => {

  const { setAuthState, backendUrl, authState, setUserData, userData } = useContext(AppContext);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

   console.log("userData Protected Route : ", userData)

  useEffect(() => {
    let isMounted = true;

    const verifySession = async () => {
      try {
        const { data } = await axios.get(
          `${backendUrl}/api/auth/is-auth`,
          { withCredentials: true }
        );

        if (isMounted) {
          if (data?.isAuthenticated) {
            setAuthState({
              isLoggedin: true,
              userData: data.userDetails,
              isLoading: false
            });
            setUserData(data.userDetails)
          } else {
            throw new Error(data?.message || 'Not authenticated');
          }
        }
      } catch (error) {
        if (isMounted) {
          setAuthState({
            isLoggedin: false,
            userData: null,
            isLoading: false
          });
          setUserData(null)
          navigate('/login');
        }
      } finally {
        if (isMounted) setAuthChecked(true);
      }
    };

    verifySession();

    return () => { isMounted = false };
  }, [navigate, backendUrl, setAuthState]);

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
