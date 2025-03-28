import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const backendUrl = "https://zahopay.onrender.com"
  const frontendUrl = "https://zahopay.in";


  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();



    const [adminAuthState, setAdminAuthState] = useState({
      isLoggedin: false,
      adminData: null,
      isLoading: true,
    });


  const [authState, setAuthState] = useState({
    isLoggedin: false,
    userData: null,
    isLoading: true,
  });


  const verifyAuth = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
      });

      if (data.success) {
        setAuthState({
          isLoggedin: true,
          userData: data.userDetails,
          isLoading: false,
        });
        setUserData(data.userDetails);
        setIsLoggedin(true)
        return true
      } else {
        setAuthState({
          isLoggedin: false,
          userData: null,
          isLoading: false,
        });
        setIsLoggedin(false)
        setUserData(null);
        return false
      }
    } catch (error) {
      setAuthState({
        isLoggedin: false,
        userData: null,
        isLoading: false,
      });
      setUserData(null);
      setIsLoggedin(false);
      return false
    }
  };

    const logoutAdmin = async () => {
      try {
        await axios.get(`${backendUrl}/admin/auth/logout`, {
          withCredentials: true,
        });
      } catch (error) {
        console.error("Logout failed:", error);
      } finally {
        setAdminAuthState({
          isLoggedin: false,
          adminData: null,
          isLoading: false,
        });
        navigate("/administrator/adminlogin");
      }
    };


const verifyAdmin = async () => {
  try {
    const response = await axios.get(
      `${backendUrl}/admin/auth/verify`,
      { 
        withCredentials: true,
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    if (response.data.success) {
      setAdminAuthState({
        isLoggedin: true,
        adminData: response.data.admin,
        isLoading: false
      });
      return true;
    }
    throw new Error("Verification failed");
  } catch (error) {
    setAdminAuthState({
      isLoggedin: false,
      adminData: null,
      isLoading: false
    });
    return false;
  }
};
  

  useEffect(() => {
    if (window.location.pathname.startsWith('/administrator')) {
      verifyAdmin();
    }
  }, []);


  useEffect(() => {
    verifyAuth();
  }, []);

  const api = axios.create({
  baseURL: 'https://zahopay.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/administrator/adminlogin';
    }
    return Promise.reject(error);
  }
);
  // logout

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(backendUrl + "/api/auth/logout");
      if (data.success) {
        setIsLoggedin(false);
        setUserData(null);
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //otp verification for registeration

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        toast.success(data.message);
        return true
      } else {
        toast.error(data.message);
        return false
      }
    } catch (error) {
      toast.error(error.message);
      return false
    }
  };


  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    logout,
    sendVerificationOtp,
    authState,
    verifyAuth,
    adminAuthState,
    setAdminAuthState,
    frontendUrl,
    api,
    verifyAdmin,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

