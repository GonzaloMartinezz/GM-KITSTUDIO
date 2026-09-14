import React from 'react';
import { ChevronDown, Video, CheckCircle2, AlertCircle, Truck, PackageCheck, Clock } from 'lucide-react';

const MeetingGrid = () => {
  const employees = [
    { name: 'Carrizo Dental', role: 'Centro, Tucumán', img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&h=100&fit=crop&q=80' },
    { name: 'El Pasaje Dental', role: 'Barrio Sur', img: 'https://images.unsplash.com/photo-1537368910025-702800faa86b?w=100&h=100&fit=crop&q=80' },
    { name: 'ByA Dental', role: 'Yerba Buena', img: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=100&h=100&fit=crop&q=80' },
    { name: 'Odontología Norte', role: 'Tafí Viejo', img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=100&h=100&fit=crop&q=80' },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm mb-8 w-full overflow-x-auto">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-bold text-[#1E5A9C]">Logística y Entregas</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#F8F9FB] rounded-full text-sm font-semibold text-[#1E5A9C] hover:bg-black/5 transition-colors border border-[#F0F0F3]">
          Esta Semana <ChevronDown size={16} />
        </button>
      </div>

      {/* Grid Container */}
      <div className="min-w-200">
        {/* Days Header */}
        <div className="flex mb-4 px-2">
          <div className="w-48 shrink-0 text-sm font-medium text-[#8E8E93]">Clientes</div>
          <div className="flex-1 flex justify-between text-sm font-medium text-[#8E8E93]">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
          </div>
        </div>

        {/* Grid Rows */}
        <div className="flex flex-col gap-4">

          {/* Row 1: James */}
          <div className="flex items-center group relative">
            <div className="w-48 shrink-0 flex items-center gap-3">
              <img src={employees[0].img} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-sm font-bold text-[#1C1C1E]">{employees[0].name}</h4>
                <p className="text-[11px] text-[#8E8E93]">{employees[0].role}</p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-11 gap-2">
              {Array(11).fill(null).map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-[#F8F9FB] border border-[#F0F0F3]/50"></div>
              ))}
            </div>
          </div>

          {/* Row 2: Alex */}
          <div className="flex items-center group relative">
            <div className="w-48 shrink-0 flex items-center gap-3">
              <img src={employees[1].img} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-sm font-bold text-[#1C1C1E]">{employees[1].name}</h4>
                <p className="text-[11px] text-[#8E8E93]">{employees[1].role}</p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-11 gap-2 relative">
              {Array(11).fill(null).map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-[#F8F9FB] border border-[#F0F0F3]/50"></div>
              ))}

              {/* Event block: Meeting */}
              <div className="absolute top-0 left-[18.18%] w-[27.27%] h-full z-10 px-1 py-1">
                <div className="w-full h-full bg-[#00C2CB]/20 rounded-xl border border-[#00C2CB]/30 flex items-center px-2 gap-2 shadow-sm">
                  <div className="w-6 h-6 rounded-lg bg-[#00C2CB] flex items-center justify-center text-white shrink-0">
                    <Truck size={12} />
                  </div>
                  <span className="text-xs font-bold text-[#00C2CB] flex-1 truncate">Envío en camino</span>
                  <span className="text-[10px] font-bold text-white bg-white/50 px-2 py-0.5 rounded-full">Andreani</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Allison */}
          <div className="flex items-center group relative">
            <div className="w-48 shrink-0 flex items-center gap-3">
              <img src={employees[2].img} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-sm font-bold text-[#1C1C1E]">{employees[2].name}</h4>
                <p className="text-[11px] text-[#8E8E93]">{employees[2].role}</p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-11 gap-2 relative">
              {Array(11).fill(null).map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-[#F8F9FB] border border-[#F0F0F3]/50"></div>
              ))}

              {/* Event block: Sick Leave */}
              <div className="absolute top-0 left-[63.63%] w-[27.27%] h-full z-10 px-1 py-1">
                <div className="w-full h-full bg-[#F6E2B3]/60 rounded-xl border border-[#F6E2B3] flex items-center px-2 gap-2 shadow-sm">
                  <div className="w-6 h-6 rounded-lg bg-[#1E5A9C] flex items-center justify-center text-white shrink-0">
                    <AlertCircle size={12} />
                  </div>
                  <span className="text-xs font-bold text-[#1E5A9C] flex-1 truncate">Retrasado</span>
                  <span className="text-[10px] font-bold text-white bg-[#1E5A9C] px-2 py-0.5 rounded-full shadow-sm">Atención</span>
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Rafio */}
          <div className="flex items-center group relative">
            <div className="w-48 shrink-0 flex items-center gap-3">
              <img src={employees[3].img} alt="" className="w-10 h-10 rounded-full object-cover" />
              <div>
                <h4 className="text-sm font-bold text-[#1C1C1E]">{employees[3].name}</h4>
                <p className="text-[11px] text-[#8E8E93]">{employees[3].role}</p>
              </div>
            </div>
            <div className="flex-1 grid grid-cols-11 gap-2 relative">
              {Array(11).fill(null).map((_, i) => (
                <div key={i} className="h-10 rounded-xl bg-[#F8F9FB] border border-[#F0F0F3]/50"></div>
              ))}

              {/* Event block: Paid Leave */}
              <div className="absolute top-0 left-[0%] w-[27.27%] h-full z-10 px-1 py-1">
                <div className="w-full h-full bg-[#1E5A9C]/10 rounded-xl border border-[#1E5A9C]/20 flex items-center px-2 gap-2 shadow-sm">
                  <div className="w-6 h-6 rounded-lg bg-[#1E5A9C] flex items-center justify-center text-white shrink-0">
                    <PackageCheck size={12} />
                  </div>
                  <span className="text-xs font-bold text-[#1E5A9C] flex-1 truncate">Entregado</span>
                  <span className="text-[10px] font-bold text-[#1E5A9C] bg-white px-2 py-0.5 rounded-full shadow-sm">Completado</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MeetingGrid;
