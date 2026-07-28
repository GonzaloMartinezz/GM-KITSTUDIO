import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EAE6F9] via-[#F5EDF6] to-[#FCAFB4] p-4 md:p-8 font-geist flex items-center justify-center">
      {/* Outer tablet frame */}
      <div className="w-full max-w-[1600px] h-[90vh] bg-[#F7F7F9] rounded-[2.5rem] border-[16px] border-[#1C1C1E] shadow-2xl overflow-hidden flex relative">
        
        {/* Left Sidebar */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-[#F8F9FB] rounded-l-3xl shadow-[-10px_0_30px_rgba(0,0,0,0.02)]">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
