import React from 'react';
import { Trophy, ChevronRight, User } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import CustomerProfileModal from './modals/CustomerProfileModal';
import { useState } from 'react';

const TopBuyers = () => {
  const { buyers } = useAdminData();
  const [selectedBuyer, setSelectedBuyer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get top 5 buyers by total spent
  const topBuyers = [...(buyers || [])]
    .sort((a, b) => (b.totalSpent || 0) - (a.totalSpent || 0))
    .slice(0, 5);

  const formatMoney = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);

  const handleSelect = (buyer) => {
    setSelectedBuyer(buyer);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs flex flex-col h-full font-geist">
      <div className="p-5 border-b border-[#F1F5F9] flex items-center justify-between bg-gradient-to-r from-[#F8FAFC] to-white rounded-t-2xl">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 shadow-xs">
            <Trophy size={16} />
          </div>
          <h2 className="text-base font-bold text-[#0F172A] tracking-tight">Mejores Clientes</h2>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        {topBuyers.length > 0 ? (
          <div className="space-y-4">
            {topBuyers.map((buyer, idx) => (
              <div 
                key={buyer._id} 
                onClick={() => handleSelect(buyer)}
                className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-[#E2E8F0] hover:bg-[#F8FAFC] cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-xs shrink-0
                    ${idx === 0 ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 
                      idx === 1 ? 'bg-slate-100 text-slate-700 border border-slate-200' : 
                      idx === 2 ? 'bg-orange-50 text-orange-700 border border-orange-200' : 
                      'bg-[#F1F5F9] text-[#64748B]'}`}
                  >
                    #{idx + 1}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0F172A] leading-tight">{buyer.name}</h3>
                    <p className="text-[11px] text-[#64748B] mt-0.5">{buyer.totalKits || 0} kits comprados</p>
                  </div>
                </div>
                <div className="text-right flex items-center gap-2">
                  <div className="text-sm font-bold text-[#1E5A9C]">{formatMoney(buyer.totalSpent || 0)}</div>
                  <ChevronRight size={14} className="text-[#94A3B8] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#E2E8F0] rounded-xl text-[#64748B]">
            <User size={24} className="mb-2 text-[#CBD5E1]" />
            <p className="text-sm">Aún no hay clientes registrados</p>
          </div>
        )}
      </div>

      <CustomerProfileModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        buyer={selectedBuyer} 
      />
    </div>
  );
};

export default TopBuyers;
