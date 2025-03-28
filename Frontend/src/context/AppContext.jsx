import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const backendUrl = "https://zahopay.onrender.com"
  const frontendUrl = "https://zahopay-frontend.onrender.com";


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

    const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
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
  // Only run verification on admin routes
  if (!window.location.pathname.startsWith("/administrator")) {
    return;
  }

  try {
    const { data } = await axios.get(`${backendUrl}/admin/auth/verify`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    if (data.success) {
      setAdminAuthState({
        isLoggedin: true,
        adminData: data.admin,
        isLoading: false,
      });
      if (data.admin?.token) {
        localStorage.setItem("admin_token", data.admin.token);
      }
    } else {
      throw new Error(data.message || "Admin verification failed");
    }
  } catch (error) {
    setAdminAuthState({
      isLoggedin: false,
      adminData: null,
      isLoading: false,
    });
    // Only log errors if we're actually on an admin route
    if (window.location.pathname.startsWith("/administrator")) {
      console.error("Admin verification error:", error);
    }
  }
};
  

useEffect(() => {
  // Only verify admin status if on admin route
  if (window.location.pathname.startsWith("/administrator")) {
    verifyAdmin();
  }
}, []);


  useEffect(() => {
    verifyAuth();
  }, []);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.defaults.baseURL = backendUrl;

    // Add response interceptor
   axios.interceptors.response.use(
     (response) => response,
     (error) => {
       if (error.response?.status === 401) {
         // Handle admin and user auth separately
         if (error.config.url.includes("/admin/")) {
           setAdminAuthState({
             isLoggedin: false,
             adminData: null,
             isLoading: false,
           });
           localStorage.removeItem("admin_token");
         } else {
           setAuthState({
             isLoggedin: false,
             userData: null,
             isLoading: false,
           });
         }
       }
       return Promise.reject(error);
     }
   );
  }, []);

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
        navigate("/verify-account");
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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

