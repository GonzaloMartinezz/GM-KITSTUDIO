import React from 'react';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';

const FeatureEvents = () => {
  const events = [
    {
      title: '📁 00_Planificación',
      desc: 'Accede a la estructura del negocio, ideas y modelo de negocio.',
      time: 'Drive',
      date: 'Estratégico',
      bgClass: 'bg-[#1E5A9C]/10',
      textClass: 'text-[#1E5A9C]',
    },
    {
      title: '📁 03_Proveedores',
      desc: 'Listas de precios actualizadas, catálogos y comprobantes de compra.',
      time: 'Drive',
      date: 'Operativo',
      bgClass: 'bg-[#00C2CB]/10',
      textClass: 'text-[#1E5A9C]',
    },
    {
      title: '⚠️ Registro ANMAT',
      desc: 'Verificar números "PM" de productos médicos antes de comprar.',
      time: 'Regulatorio',
      date: 'Crítico',
      bgClass: 'bg-[#F6E2B3]/60',
      textClass: 'text-[#1E5A9C]',
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm w-full h-full border border-[#F0F0F3]/50">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-[#1E5A9C]">Accesos Rápidos</h2>
        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1E5A9C]/10 transition-colors text-[#00C2CB]">
          <ArrowUpRight size={20} />
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {events.map((ev, index) => (
          <div key={index} className={`p-5 rounded-2xl ${ev.bgClass} flex flex-col gap-3 hover:scale-[1.02] transition-transform cursor-pointer border border-white/50`}>
            <h4 className={`font-bold text-[15px] ${ev.textClass}`}>{ev.title}</h4>
            <p className={`${ev.textClass} text-xs leading-relaxed font-medium opacity-80`}>
              {ev.desc}
            </p>
            <div className={`flex items-center gap-4 mt-2 ${ev.textClass} opacity-70`}>
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <Clock size={14} /> {ev.time}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold">
                <Calendar size={14} /> {ev.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureEvents;
