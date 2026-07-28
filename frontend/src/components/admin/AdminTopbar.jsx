import React from 'react';
import { NavLink } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

const AdminTopbar = () => {
  const topNav = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Employees', path: '/admin/employees' },
    { label: 'Reports', path: '/admin/reports' },
    { label: 'Schedule', path: '/admin/schedule' },
    { label: 'Company', path: '/admin/company' },
  ];

  return (
    <div className="flex items-center justify-between mb-10 mt-2">
      
      {/* Navigation Links */}
      <div className="flex items-center gap-2">
        {topNav.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            end={item.path === '/admin'}
            className={({ isActive }) => 
              `px-5 py-2.5 rounded-full text-[15px] font-medium transition-all ${
                isActive 
                ? 'bg-[#1C1C1E] text-white shadow-md' 
                : 'text-[#8E8E93] hover:text-[#1C1C1E] hover:bg-black/5'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-4">
        
        {/* Search */}
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] shadow-sm transition-all">
          <Search size={20} strokeWidth={2.5} />
        </button>

        {/* Notifications */}
        <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#8E8E93] hover:text-[#1C1C1E] shadow-sm relative transition-all">
          <Bell size={20} strokeWidth={2.5} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#FF3B30] border-2 border-white rounded-full"></span>
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
