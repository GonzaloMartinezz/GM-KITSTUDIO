import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminErrorBoundary from '../components/admin/AdminErrorBoundary';
import { AdminDataProvider, useAdminData } from '../context/AdminDataContext';

// El banner de "no se pudieron cargar los datos" antes solo se mostraba
// en AdminDashboard.jsx. Si el fetch inicial (producto, dashboard, etc.)
// fallaba (sesión vencida, Render "dormido", etc.) y el admin estaba en
// cualquier OTRA sección (Inventario, Ventas...), no se enteraba de nada:
// solo veía datos en blanco/default y botones deshabilitados, sin ninguna
// pista de qué estaba pasando. Lo subimos acá para que se vea en todas
// las secciones del panel.
const AdminErrorBanner = () => {
  const { error, loading, resetToDefaults } = useAdminData();
  if (!error) return null;
  return (
    <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-2.5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold">
      <AlertTriangle size={16} className="shrink-0" />
      <span className="flex-1">{error}</span>
      <button
        onClick={resetToDefaults}
        disabled={loading}
        className="shrink-0 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-colors"
      >
        {loading ? 'Reintentando...' : 'Reintentar'}
      </button>
    </div>
  );
};

const AdminLayout = () => {
  const location = useLocation();
  return (
    <AdminDataProvider>
      <div className="h-dvh w-full bg-[#F8F9FB] font-geist flex flex-col md:flex-row overflow-hidden">
        {/* Left Sidebar / Bottom Nav */}
        <AdminSidebar />

        {/* Main Content Area */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden relative p-4 pb-24 md:p-10 lg:p-12">
          <AdminErrorBanner />
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

