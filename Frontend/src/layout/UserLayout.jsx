import React from 'react'
import { Outlet } from "react-router-dom";
import DashboardNavbar from '../components/Dashboard/DashboardNavbar';

const UserLayout = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Navbar */}
      <div className="w-full md:w-1/5 md:h-screen h-auto">
        <DashboardNavbar />
      </div>

      {/* Outlet Content */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-6 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

export default UserLayout
