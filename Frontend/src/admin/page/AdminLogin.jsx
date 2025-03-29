import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";
import api from '../../utils/api.js'; 


const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const { backendUrl, setAdminAuthState, verifyAdmin } =
    useContext(AppContext);

  const navigate = useNavigate();

  const location = useLocation()
  

  const onFormSubmit = async (e) => {
  e.preventDefault();
  console.log('Login form submitted'); // Debug log

  try {
    // 1. Clear existing cookies
    document.cookie = 'admin_token=; domain=.onrender.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    console.log('Cookies cleared'); // Debug log

    // 2. Make login request
    console.log('Making login request...'); // Debug log
    const { data } = await api.post('/admin/auth/login', {
      adminEmail,
      adminPassword
    });
    console.log('Login response:', data); // Debug log

    if (data.success) {
      toast.success('Login successful! Verifying session...');
      console.log('Login successful, waiting for cookie...'); // Debug log

      // 3. Wait for cookie to be processed with increasing delays
      const verifySession = async (attempt = 1) => {
        const delay = 300 * attempt; // Exponential backoff
        console.log(`Verification attempt ${attempt}, waiting ${delay}ms`); // Debug log
        
        await new Promise(resolve => setTimeout(resolve, delay));
        
        try {
          console.log('Making verification request...'); // Debug log
          const verifyRes = await api.get('/admin/auth/verify');
          console.log('Verification response:', verifyRes.data); // Debug log

          if (verifyRes.data.success) {
            console.log('Verification successful!'); // Debug log
            setAdminAuthState({
              isLoggedin: true,
              adminData: verifyRes.data.admin,
              isLoading: false
            });
            navigate('/administrator/auth/dashboard', { replace: true });
            return true;
          }
        } catch (verifyError) {
          console.error(`Verification attempt ${attempt} failed:`, verifyError); // Debug log
          if (attempt >= 3) {
            throw new Error('Maximum verification attempts reached');
          }
          return verifySession(attempt + 1);
        }
      };

      await verifySession();
    } else {
      throw new Error(data.message || 'Login failed');
    }
  } catch (error) {
    console.error('Login process error:', error); // Debug log
    toast.error(error.response?.data?.message || error.message || 'Authentication failed. Please try again.');
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
