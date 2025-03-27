import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL || ""
  const frontendUrl = import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";


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
      } else {
        setAuthState({
          isLoggedin: false,
          userData: null,
          isLoading: false,
        });
        setIsLoggedin(false)
        setUserData(null);

      }
    } catch (error) {
      setAuthState({
        isLoggedin: false,
        userData: null,
        isLoading: false,
      });
      setUserData(null);
      setIsLoggedin(false);
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
       const { data } = await axios.get(`${backendUrl}/admin/auth/verify`, {
         withCredentials: true,
       });
       if (data.success) {
         setAdminAuthState({
           isLoggedin: true,
           adminData: data.admin,
           isLoading: false,
         });
       } else {
         setAdminAuthState({
           isLoggedin: false,
           adminData: null,
           isLoading: false,
         });
       }
     } catch (error) {
       setAdminAuthState({
         isLoggedin: false,
         adminData: null,
         isLoading: false,
       });
     }
   };

   useEffect(() => {
     verifyAdmin();
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
          setAuthState({
            isLoggedin: false,
            userData: null,
            isLoading: false,
          });
        }
        return Promise.reject(error);
      }
    );

    verifyAuth();
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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;

