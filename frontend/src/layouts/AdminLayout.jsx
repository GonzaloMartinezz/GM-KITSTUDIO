import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="h-screen w-full bg-[#F8F9FB] font-geist flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Sidebar / Bottom Nav */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden relative p-4 pb-24 md:p-10 lg:p-12 md:pb-10 lg:pb-12">
          <Outlet />
        </div>
    </div>
  );
};

export default AdminLayout;
