import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminErrorBoundary from '../components/admin/AdminErrorBoundary';
import { AdminDataProvider } from '../context/AdminDataContext';

const AdminLayout = () => {
  const location = useLocation();
  return (
    <AdminDataProvider>
      <div className="h-screen h-dvh w-full bg-[#F8F9FB] font-geist flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar / Bottom Nav */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden relative p-4 md:p-10 lg:p-12">
          {/* key=pathname: si cambiás de sección después de un error, el
              boundary se resetea solo en vez de quedar roto para siempre */}
          <AdminErrorBoundary key={location.pathname}>
            <Outlet />
          </AdminErrorBoundary>
        </div>
      </div>
    </AdminDataProvider>
  );
};

export default AdminLayout;

