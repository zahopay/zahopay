import { useContext , useEffect, useState} from "react";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";
import axios from "axios";
import {motion} from "framer-motion"


const AdminProtectedRoute = () => {
const { backendUrl, adminAuthState, setAdminAuthState, verifyAdmin } = useContext(AppContext);
const [loading, setLoading] = useState(true);

  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await verifyAdmin();
      setAuthChecked(true);
      
      if (!isAuthenticated && window.location.pathname.startsWith('/administrator')) {
        navigate('/administrator/adminlogin');
      }
    };
    
    checkAuth();
  }, [navigate, verifyAdmin]);


if (!authChecked || adminAuthState.isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen min-w-full bg-white flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-12 w-12 border-t-4 border-b-4 border-purple-500 rounded-full"
        ></motion.div>
      </motion.div>
    );
  }

  return adminAuthState.isLoggedin ? (
    <Outlet />
  ) : (
    <Navigate to="/administrator/adminlogin" replace />
  );
};

export default AdminProtectedRoute;
