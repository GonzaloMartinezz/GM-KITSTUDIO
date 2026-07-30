import React from 'react';
import { NavLink } from 'react-router-dom';
import { Target, Wallet, Package, Truck, ShoppingCart, Settings, HelpCircle, LogOut, PackageSearch } from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { icon: Target, path: '/admin/planificacion', label: '00_Planificación' },
    { icon: Wallet, path: '/admin/finanzas', label: '01_Finanzas' },
    { icon: Package, path: '/admin/inventario', label: '02_Inventario' },
    { icon: Truck, path: '/admin/proveedores', label: '03_Proveedores' },
    { icon: ShoppingCart, path: '/admin/ventas', label: '04_Ventas' },
  ];

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white border-t border-[#EBEBEB] z-50 flex items-center justify-around px-1 pb-safe shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 w-16 h-14 rounded-xl transition-all ${
                isActive ? 'text-[#00C2CB]' : 'text-[#8E8E93] hover:text-[#1E5A9C]'
              }`
            }
          >
            <item.icon size={22} strokeWidth={2} />
            <span className="text-[10px] font-semibold truncate w-full text-center px-1">
              {item.label.split('_')[1] || item.label}
            </span>
          </NavLink>
        ))}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-[100px] h-full bg-[#F7F7F9] flex-col items-center py-8 justify-between shrink-0 border-r border-[#EBEBEB]">

        {/* Top section */}
        <div className="flex flex-col items-center gap-10">

          {/* Logo */}
          <div className="w-12 h-12 bg-[#1E5A9C] rounded-xl flex items-center justify-center cursor-pointer shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 16L12 21L20 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 3V21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 8L12 3L20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Floating Action Button */}
          <div className="w-14 h-14 bg-[#00C2CB] rounded-2xl flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(0,194,203,0.3)] hover:scale-105 transition-transform">
            <PackageSearch size={24} color="white" />
            <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full border-2 border-[#00C2CB] flex items-center justify-center">
              <span className="text-[#00C2CB] text-[8px] font-bold">+</span>
            </div>
          </div>

          {/* Main Icons */}
          <div className="flex flex-col gap-6 mt-4">
            {menuItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.path}
                className={({ isActive }) =>
                  `w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isActive
                    ? 'bg-white shadow-sm text-[#1E5A9C]'
                    : 'text-[#8E8E93] hover:text-[#1E5A9C] hover:bg-black/5'
                  }`
                }
                title={item.label}
              >
                <item.icon size={22} strokeWidth={2} />
              </NavLink>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="flex flex-col gap-6">
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] hover:bg-black/5 transition-all">
            <Settings size={22} strokeWidth={2} />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] hover:bg-black/5 transition-all">
            <HelpCircle size={22} strokeWidth={2} />
          </button>
          <button className="w-12 h-12 rounded-xl flex items-center justify-center text-[#8E8E93] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all">
            <LogOut size={22} strokeWidth={2} />
          </button>
        </div>

      </div>
    </>
  );
};

export default AdminSidebar;
