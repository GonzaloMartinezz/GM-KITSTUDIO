import React, { useState } from 'react';
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Target, Wallet, Package, Truck, ShoppingCart, LogOut, Menu, X, ChevronRight, ShieldCheck, ArrowLeft, Users, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: Target, path: '/admin', label: '00_Control Central' },
    { icon: ShoppingCart, path: '/admin/ventas', label: '01_Ventas' },
    { icon: Users, path: '/admin/clientes', label: '02_Clientes' },
    { icon: Wallet, path: '/admin/finanzas', label: '03_Finanzas' },
    { icon: Truck, path: '/admin/proveedores', label: '04_Proveedores' },
    { icon: Package, path: '/admin/inventario', label: '05_Inventario' },
    { icon: Settings, path: '/admin/configuracion', label: '06_Configuración' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  // --- MOBILE DRAWER ---
  const MobileDrawer = () => (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="md:hidden fixed inset-0 bg-[#1C1C1E]/40 backdrop-blur-sm z-100"
          />
          <motion.div
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed top-0 left-0 h-full w-70 bg-white z-101 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-[#EBEBEB]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1E5A9C] rounded-lg flex items-center justify-center">
                  <span className="font-bebas text-white text-xl">GM</span>
                </div>
                <span className="font-bebas text-2xl text-[#1E5A9C]">ADMIN</span>
              </div>
              <button onClick={() => setIsMobileOpen(false)} className="text-[#8E8E93] hover:text-[#1C1C1E]">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) => `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-[#1E5A9C]/10 text-[#1E5A9C] font-semibold' : 'text-[#8E8E93] hover:bg-[#F7F7F9] hover:text-[#1C1C1E]'}`}
                >
                  <item.icon size={20} strokeWidth={2.5} />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </div>

            {/* User Profile Card (Mobile) */}
            <div className="p-4 border-t border-[#EBEBEB] bg-[#F8FAFC]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="/images/GMKAIZER.png"
                    alt="Gonzalo Martínez"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#1E5A9C]"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full"></span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0F172A] leading-tight">{user?.name || 'Administrador'}</span>
                  <span className="text-[11px] font-semibold text-[#1E5A9C] flex items-center gap-1">
                    <ShieldCheck size={12} /> Administrador Único
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-[#EBEBEB] flex flex-col gap-2">
              <Link to="/" onClick={() => setIsMobileOpen(false)} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[#8E8E93] hover:text-[#1E5A9C] hover:bg-black/5 transition-all font-medium cursor-pointer">
                <ArrowLeft size={20} /> Volver a la App
              </Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all font-medium cursor-pointer">
                <LogOut size={20} /> Cerrar Sesión
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between bg-white border-b border-[#EBEBEB] p-4 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1E5A9C] rounded-lg flex items-center justify-center">
            <span className="font-bebas text-white">GM</span>
          </div>
          <span className="font-bebas text-xl text-[#1E5A9C]">ADMIN DASHBOARD</span>
        </div>
        <button onClick={() => setIsMobileOpen(true)} className="p-2 bg-[#F7F7F9] rounded-lg text-[#1C1C1E]">
          <Menu size={24} />
        </button>
      </div>

      <MobileDrawer />

      {/* Desktop Sidebar */}
      <motion.div
        animate={{ width: isExpanded ? 260 : 100 }}
        className="hidden md:flex h-full bg-[#F7F7F9] flex-col py-8 border-r border-[#EBEBEB] relative z-40 shrink-0 overflow-visible transition-all duration-300 ease-in-out"
      >
        {/* Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -right-3.5 top-10 w-7 h-7 bg-white border border-[#EBEBEB] rounded-full flex items-center justify-center text-[#1E5A9C] hover:scale-110 transition-transform shadow-sm z-50"
        >
          <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
            <ChevronRight size={16} strokeWidth={3} />
          </motion.div>
        </button>

        {/* Top section */}
        <div className={`flex flex-col gap-10 px-6 ${isExpanded ? 'items-start' : 'items-center'}`}>
          {/* Logo */}
          <div className="flex items-center gap-3 w-full">
            <div className="w-12 h-12 shrink-0 bg-[#1E5A9C] rounded-xl flex items-center justify-center shadow-lg">
              <span className="font-bebas text-white text-2xl">GM</span>
            </div>
            {isExpanded && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-bebas text-3xl text-[#1E5A9C] whitespace-nowrap">
                ADMIN
              </motion.span>
            )}
          </div>

          {/* Main Icons */}
          <div className="flex flex-col gap-4 w-full mt-4">
            {menuItems.map((item, index) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className={`h-12 rounded-xl flex items-center transition-all ${isExpanded ? 'px-4 gap-4' : 'justify-center w-12 mx-auto'} ${isActive ? 'bg-white shadow-sm text-[#1E5A9C]' : 'text-[#8E8E93] hover:text-[#1E5A9C] hover:bg-black/5'}`}
                  title={!isExpanded ? item.label : ''}
                >
                  <item.icon size={22} strokeWidth={2.5} className="shrink-0" />
                  {isExpanded && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-nowrap text-sm">
                      {item.label.split('_')[1] || item.label}
                    </motion.span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* Bottom section: Profile & Logout */}
        <div className={`flex flex-col gap-3 px-3 mt-auto border-t border-[#EBEBEB] pt-4 w-full ${isExpanded ? 'items-start' : 'items-center'}`}>
          {/* User Profile */}
          <div
            title={!isExpanded ? "Gonzalo Martínez - Administrador Único" : ""}
            className={`w-full flex items-center transition-all ${
              isExpanded
                ? 'p-2.5 rounded-xl bg-white border border-[#E5E7EB] shadow-xs gap-3'
                : 'justify-center py-1'
            }`}
          >
            <div className="relative shrink-0">
              <img
                src="/images/GMKAIZER.png"
                alt="Gonzalo Martínez"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#1E5A9C] bg-[#F8F9FA]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#10B981] border-2 border-white rounded-full"></span>
            </div>
            {isExpanded && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col overflow-hidden">
                <span className="text-xs font-bold text-[#0F172A] truncate">Gonzalo Martínez</span>
                <span className="text-[10px] font-semibold text-[#1E5A9C] flex items-center gap-1">
                  <ShieldCheck size={11} className="shrink-0" /> Admin Único
                </span>
              </motion.div>
            )}
          </div>

          {/* Return to App Button */}
          <Link
            to="/"
            className={`h-11 rounded-xl flex items-center text-[#8E8E93] hover:text-[#1E5A9C] hover:bg-black/5 transition-all cursor-pointer ${
              isExpanded ? 'px-3 gap-3 w-full' : 'justify-center w-11 mx-auto'
            }`}
            title={!isExpanded ? "Volver a la App" : ""}
          >
            <ArrowLeft size={20} strokeWidth={2.5} className="shrink-0" />
            {isExpanded && <span className="font-medium whitespace-nowrap text-xs">Volver a la App</span>}
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`h-11 rounded-xl flex items-center text-[#8E8E93] hover:text-[#FF3B30] hover:bg-[#FF3B30]/10 transition-all cursor-pointer ${
              isExpanded ? 'px-3 gap-3 w-full' : 'justify-center w-11 mx-auto'
            }`}
          >
            <LogOut size={20} strokeWidth={2.5} className="shrink-0" />
            {isExpanded && <span className="font-medium whitespace-nowrap text-xs">Cerrar Sesión</span>}
          </button>
        </div>

      </motion.div>
    </>
  );
};

export default AdminSidebar;
