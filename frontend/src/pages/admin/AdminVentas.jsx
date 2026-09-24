import React from 'react';
import { useAdminData } from '../../context/AdminDataContext';
import RecentTransactionsTable from '../../components/admin/RecentTransactionsTable';
import TopBuyers from '../../components/admin/TopBuyers';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminVentas = () => {
  const { timeframe } = useAdminData();
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-full font-geist flex flex-col relative pb-12">
      
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Gestión de Ventas
          </h1>
          <p className="text-sm text-[#64748B] mt-1">
            Visualiza el historial completo de tus transacciones y la curva de crecimiento.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('.', { state: { openNewTransactionModal: true } })}
            className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-5 py-3 rounded-xl text-sm font-bold shadow-sm transition-colors cursor-pointer"
          >
            <Plus size={18} strokeWidth={2.5} />
            Nueva Venta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* Left Column: Informative Panel */}
        <div className="xl:col-span-8 bg-white rounded-2xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0F172A] mb-2">Información sobre las Ventas</h2>
            <p className="text-sm text-[#64748B] leading-relaxed mb-4">
              Este módulo muestra las transacciones reales guardadas en la base de datos. Para ver la curva de tendencia de ventas por período, andá al Dashboard (Control Central).
            </p>
            <ul className="text-sm text-[#64748B] space-y-3">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full mt-1.5 shrink-0" />
                Registrar una nueva venta restará stock automáticamente del inventario.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#2644B2] rounded-full mt-1.5 shrink-0" />
                Cambiar el estado de un pedido a "Completado" marcará el pago como efectivo.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full mt-1.5 shrink-0" />
                Podés editar o eliminar cualquier venta desde la tabla de abajo; los cambios impactan al instante en el inventario y en los reportes financieros.
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Top Buyers ranking */}
        <div className="xl:col-span-4">
          <TopBuyers />
        </div>
      </div>

      {/* Bottom Full Width: Transaction Table */}
      <div className="mt-8">
        <RecentTransactionsTable />
      </div>

    </div>
  );
};

export default AdminVentas;
