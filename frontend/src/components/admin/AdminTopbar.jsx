import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

const AdminTopbar = () => {
  const topNav = [
    { label: 'Control Central', path: '/admin' },
    { label: '00_Planificación', path: '/admin/planificacion' },
    { label: '01_Finanzas', path: '/admin/finanzas' },
    { label: '02_Inventario', path: '/admin/inventario' },
    { label: '03_Proveedores', path: '/admin/proveedores' },
    { label: '04_Ventas', path: '/admin/ventas' },
  ];

  return (
    <div className="flex flex-col-reverse xl:flex-row xl:items-center justify-between mb-6 md:mb-10 mt-2 gap-4">

      {/* Navigation Links */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 w-full xl:w-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
        {topNav.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) =>
              `px-5 py-2.5 rounded-full text-[14px] md:text-[15px] font-medium transition-all whitespace-nowrap shrink-0 ${isActive
                ? 'bg-[#1E5A9C] text-white shadow-md'
                : 'text-[#8E8E93] hover:text-[#1E5A9C] hover:bg-[#1E5A9C]/5'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Right Tools */}
      <div className="flex items-center justify-end gap-2 md:gap-4 w-full xl:w-auto">

        {/* Search */}
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8E8E93] hover:text-[#00C2CB] hover:bg-[#00C2CB]/5 shadow-sm transition-all">
          <Search size={20} strokeWidth={2.5} />
        </button>

        {/* Notifications */}
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8E8E93] hover:text-[#00C2CB] hover:bg-[#00C2CB]/5 shadow-sm relative transition-all">
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#00C2CB] border-2 border-white rounded-full"></span>
        </button>

        {/* Profile */}
        <button className="w-12 h-12 rounded-full overflow-hidden shadow-sm border-2 border-white ml-2 hover:scale-105 transition-transform">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80"
            alt="User profile"
            className="w-full h-full object-cover"
          />
        </button>

      </div>

    </div>
  );
};

export default AdminTopbar;
