import React, { useState, useEffect } from 'react';
import AdminTopbar from '../../components/admin/AdminTopbar';
import StatCards from '../../components/admin/StatCards';
import SalesTrendChart from '../../components/admin/SalesTrendChart';
import CategoryBreakdown from '../../components/admin/CategoryBreakdown';
import RecentTransactionsTable from '../../components/admin/RecentTransactionsTable';
import { Download, Calendar, ChevronDown } from 'lucide-react';

const AdminDashboard = () => {
  const [userName, setUserName] = useState('Gonzalo');
  const [period, setPeriod] = useState('Diario');

  useEffect(() => {
    const savedName = localStorage.getItem('currentUser');
    if (savedName) {
      setUserName(savedName.split(' ')[0]);
    }
  }, []);

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "ID,Cliente,Producto,Estado,Cantidad,PrecioUnit,Total\n" +
      "#GM-04910,Dr. Roberto Sanchez,Kit Odontologico Completo,Completado,12,$14500,$174000\n" +
      "#GM-04911,Dra. Maria Gomez,Camisolines SMS Quirurgicos,Completado,20,$4200,$84000\n" +
      "#GM-04912,Dr. Carlos Ruiz,Kit Odontologico Completo,Enviado,5,$14500,$72500\n" +
      "#GM-04913,Instituto Odontologico NOA,Campos Quirurgicos 100x100,En Preparacion,22,$3800,$83600\n" +
      "#GM-04914,Dra. Valentina Paz,Kit Odontologico Completo,Completado,14,$14500,$203000\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gm_kit_studio_metricas_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full h-full font-geist flex flex-col relative pb-12">

      {/* Top Header / Navigation */}
      <AdminTopbar />

      {/* Welcome Banner matching reference mockup */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Bienvenido de nuevo, <span className="text-[#1E5A9C]">{userName}</span>
          </h1>
          <p className="text-[#64748B] text-xs sm:text-sm mt-0.5">
            Panel de Control Central de GM KIT STUDIO (Tucumán y NOA)
          </p>
        </div>

        {/* Action Controls: Period, Date, Export */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Period Selector */}
          <div className="relative inline-block">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none bg-white border border-[#E2E8F0] text-[#0F172A] pl-3 pr-8 py-2 rounded-xl text-xs font-semibold shadow-xs hover:border-[#CBD5E1] transition-all cursor-pointer outline-none"
            >
              <option value="Diario">Diario</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
              <option value="Anual">Anual</option>
            </select>
            <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          {/* Current Date Badge */}
          <div className="flex items-center gap-1.5 bg-white border border-[#E2E8F0] text-[#0F172A] px-3 py-2 rounded-xl text-xs font-semibold shadow-xs">
            <Calendar size={13} className="text-[#64748B]" />
            <span>14 Sep 2026</span>
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-[#0F172A] hover:bg-[#1E293B] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download size={14} strokeWidth={2.5} />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* 1. Statistics Cards (4 Key Metrics) */}
      <StatCards />

      {/* 2. Middle Grid: Sales Trend + Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Trend de Ventas (60% width on desktop) */}
        <div className="lg:col-span-7 flex flex-col">
          <SalesTrendChart />
        </div>

        {/* Vista por Categoría por Mes (40% width on desktop) */}
        <div className="lg:col-span-5 flex flex-col">
          <CategoryBreakdown />
        </div>
      </div>

      {/* 3. Bottom Section: Últimas Transacciones (5 últimas) */}
      <div className="w-full">
        <RecentTransactionsTable />
      </div>

    </div>
  );
};

export default AdminDashboard;
