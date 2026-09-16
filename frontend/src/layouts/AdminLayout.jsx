import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import { AdminDataProvider } from '../context/AdminDataContext';

const AdminLayout = () => {
  return (
    <AdminDataProvider>
      <div className="h-screen w-full bg-[#F8F9FB] font-geist flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar / Bottom Nav */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative p-4 md:p-10 lg:p-12">
          <Outlet />
        </div>
      </div>
    </AdminDataProvider>
  );
};

export default AdminLayout;

