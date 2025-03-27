import React from "react";
import AdminDashboardNavbar from "../components/AdminDashboardNavbar";
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
      <div className="w-full md:w-1/5 md:h-screen h-auto">
        <AdminDashboardNavbar />
      </div>

      <div className="flex-1 h-full overflow-y-auto p-4 md:p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
