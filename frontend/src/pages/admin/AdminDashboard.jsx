import React from 'react';
import AdminTopbar from '../../components/admin/AdminTopbar';
import StatCards from '../../components/admin/StatCards';
import MeetingGrid from '../../components/admin/MeetingGrid';
import EmployeeTable from '../../components/admin/EmployeeTable';
import FeatureEvents from '../../components/admin/FeatureEvents';
import { Plus, Calendar, Filter } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="w-full h-full font-geist flex flex-col relative">
      
      {/* Top Navigation */}
      <AdminTopbar />

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-normal text-[#1E5A9C] mb-2 font-geist tracking-tight">Panel de <span className="font-medium">Control Central</span></h1>
          <p className="text-[#8E8E93] text-sm">Resumen operativo de inventario, finanzas y ventas (San Miguel de Tucumán)</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2 md:gap-3 w-full md:w-auto">
          <button className="bg-[#1E5A9C] text-white px-5 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1E5A9C]/90 transition-colors shadow-md flex-1 md:flex-none">
            <Plus size={16} strokeWidth={3} /> Nueva Operación
          </button>
          <button className="bg-white border border-[#F0F0F3] text-[#1E5A9C] px-4 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1E5A9C]/5 transition-colors shadow-sm flex-1 md:flex-none">
            <Calendar size={16} strokeWidth={2.5} /> 28 Apr, 2026
          </button>
          <button className="bg-white border border-[#F0F0F3] text-[#1E5A9C] px-4 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-[#1E5A9C]/5 transition-colors shadow-sm flex-1 md:flex-none">
            <Filter size={16} strokeWidth={2.5} /> Filter
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <StatCards />

      {/* Lower Dashboard Grid */}
      <div className="flex flex-col lg:flex-row gap-8 pb-10">
        
        {/* Left Column (Meetings & Employees) */}
        <div className="flex-1 flex flex-col">
          <MeetingGrid />
          <EmployeeTable />
        </div>

        {/* Right Column (Events) */}
        <div className="w-full lg:w-[350px] shrink-0">
          <FeatureEvents />
        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;
