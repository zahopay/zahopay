import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import api from '../utils/api.js';


const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const { backendUrl, setAdminAuthState, verifyAdmin } =
    useContext(AppContext);

  const navigate = useNavigate();

  const location = useLocation()
  

  const onFormSubmit = async (e) => {
  e.preventDefault();
  
  try {
    // 1. Clear existing cookies
    document.cookie = 'admin_token=; domain=.onrender.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    
    // 2. Make login request
    const { data } = await api.post('/admin/auth/login', {
      adminEmail,
      adminPassword
    });

    if (data.success) {
      // 3. Wait for cookie to be processed (critical)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 4. Verify session with retry logic
      let attempts = 0;
      const maxAttempts = 3;
      
      while (attempts < maxAttempts) {
        try {
          const verifyRes = await api.get('/admin/auth/verify');
          
          if (verifyRes.data.success) {
            // Update state and redirect
            setAdminAuthState({
              isLoggedin: true,
              adminData: verifyRes.data.admin,
              isLoading: false
            });
            return navigate('/administrator/auth/dashboard');
          }
        } catch (verifyError) {
          attempts++;
          if (attempts >= maxAttempts) {
            throw new Error('Max verification attempts reached');
          }
          await new Promise(resolve => setTimeout(resolve, 500 * attempts));
        }
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    toast.error(error.response?.data?.message || 'Session verification failed. Please try again.');
  }
};


  return (
    <div className="h-lvh">
      <div className="w-[100%] flex justify-center items-center bg-blue-900 h-full">
        <form
          className="border w-[400px] bg-white px-8 py-6 rounded-md flex flex-col gap-4"
          onSubmit={onFormSubmit}
        >
          <div>
            <h1 className="text-2xl text-center">Welcome Back Admin </h1>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="border rounded px-3 py-1 outline-none"
              onChange={(e) => setAdminEmail(e.target.value)}
              value={adminEmail}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border rounded px-3 py-1 outline-none"
              onChange={(e) => setAdminPassword(e.target.value)}
              value={adminPassword}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 hover:bg-blue-400 transition-all duration-200"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
