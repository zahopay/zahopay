import { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";
import {motion} from "framer-motion"
import axios from "axios"



const ProtectedRoute = () => {

  const { setAuthState, backendUrl, authState, setUserData, userData } = useContext(AppContext);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

   console.log("userData Protected Route : ", userData)



  useEffect(() => {
    let isMounted = true;
    console.log('ProtectedRoute mounting - checking auth...');

    const verifyAuth = async () => {
      try {
        console.log('Making is-auth request to:', `${backendUrl}/api/auth/is-auth`);
        const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
          withCredentials: true,
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache'
          }
        });

        
        if (isMounted) {
          if (data?.isAuthenticated) {
            console.log('Authentication successful, updating state');
            setAuthState({
              isLoggedin: true,
              userData: data.userDetails,
              isLoading: false
            });
            setUserData(data.userDetails)
          } else {
            console.log('Authentication failed, redirecting to login');
            throw new Error(data?.message || 'Not authenticated');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        if (isMounted) {
          setAuthState({
            isLoggedin: false,
            userData: null,
            isLoading: false
          });
          setUserData(null)
          navigate('/login', { state: { from: location.pathname } });
        }
      } finally {
        if (isMounted) {
          console.log('Auth check complete');
          setAuthChecked(true);
        }
      }
    };

    verifyAuth();

    return () => {
      console.log('ProtectedRoute unmounting');
      isMounted = false;
    };
  }, [navigate, backendUrl, setAuthState, location]);
  

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
