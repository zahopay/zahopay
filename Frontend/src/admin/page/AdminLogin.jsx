import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AppContext from "../../context/AppContext";


const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const { backendUrl, setAdminAuthState } =
    useContext(AppContext);

  const navigate = useNavigate();

  const location = useLocation()


const onFormSubmit = async (e) => {
  e.preventDefault();

  try {
    const { data } = await axios.post(
      `${backendUrl}/admin/auth/login`,
      { adminEmail, adminPassword },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (data?.success) {
      setAdminAuthState({
        isLoggedin: true,
        adminData: data.admin,
        isLoading: false,
      });
      navigate("/administrator/auth/dashboard");
    } else {
      toast.error(data?.message || "Authentication failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error(
      error.response?.data?.message ||
        error.message ||
        "Login failed. Please check your credentials and try again."
    );
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
