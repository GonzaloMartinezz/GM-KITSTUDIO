import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, FileText, Calendar, Mail, Folder, BarChart2, Settings, HelpCircle, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const menuItems = [
    { icon: FileText, path: '/admin/reports', label: 'Reports' },
    { icon: Calendar, path: '/admin/calendar', label: 'Calendar' },
    { icon: Mail, path: '/admin/messages', label: 'Messages' },
    { icon: Users, path: '/admin/employees', label: 'Employees' },
    { icon: Folder, path: '/admin/files', label: 'Files' },
    { icon: BarChart2, path: '/admin/analytics', label: 'Analytics' },
  ];

  return (
    <div className="w-25 h-full bg-[#F7F7F9] flex flex-col items-center py-8 justify-between shrink-0">

      {/* Top section */}
      <div className="flex flex-col items-center gap-10">

        {/* Logo */}
        <div className="w-12 h-12 bg-[#1C1C1E] rounded-xl flex items-center justify-center cursor-pointer shadow-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 16L12 21L20 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 3V21" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 8L12 3L20 8" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Floating Action Button (Blue user group) */}
        <div className="w-14 h-14 bg-[#7A73FF] rounded-2xl flex items-center justify-center cursor-pointer shadow-[0_10px_20px_rgba(122,115,255,0.3)] hover:scale-105 transition-transform">
          <Users size={24} color="white" />
          <div className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full border-2 border-[#7A73FF] flex items-center justify-center">
            <span className="text-[#7A73FF] text-[8px] font-bold">+</span>
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
                  ? 'bg-white shadow-sm text-[#1C1C1E]'
                  : 'text-[#8E8E93] hover:text-[#1C1C1E] hover:bg-black/5'
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
  );
};

export default AdminSidebar;
