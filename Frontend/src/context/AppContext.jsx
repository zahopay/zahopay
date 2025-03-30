import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {

  const backendUrl = "https://api.zahopay.in"
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

  //get user data

    const getUserData = async () => {
        try {
        axios.defaults.withCredentials = true;
        const { data } = await axios.get(backendUrl + "/api/user/data", {
            withCredentials: true,
        });

        if (data.success) {
            setUserData(data.userDetials);
          setAuthState({
            isLoggedin: true,
            userData: data.userDetails,
            isLoading: false,
          })
          return true
        } else {
            toast.error(data.message);
           setAuthState({
            isLoggedin: false,
            userData: null,
            isLoading: false,
          })
          return false
        }
        } catch (error) {
            setAuthState({
            isLoggedin: false,
            userData: null,
            isLoading: false,
          })
        toast.error(error.message);
          return false
        }
    };



  const verifyAuth = async () => {
        try {
        const response = await axios.get(`${backendUrl}/api/auth/is-auth`, {
            withCredentials: true,
        });

        if (response.data.success) {
           const isAuth = await getUserData()
          if(isAuth){
            return true
          }
        } else {
          return false
        }
    } catch (error) {
          console.log(error.message);
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
        const response = await axios.get(`${backendUrl}/admin/auth/verify`, {
            withCredentials: true,
        });

        if (response.data.success) {
            return { success: true, admin: response.data.admin };
        } else {
            return { success: false };
        }
    } catch (error) {
        return { success: false };
    }
};



  const api = axios.create({
  baseURL: backendUrl,
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

