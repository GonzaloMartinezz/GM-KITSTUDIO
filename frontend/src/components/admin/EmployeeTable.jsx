import React from 'react';

const EmployeeTable = () => {
  const employees = [
    {
      name: 'James Anderson',
      role: 'UX/UI Designer',
      email: 'james76@gamil.com',
      joinDate: 'Ari 16, 2025',
      status: 'Active',
      img: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop&q=80'
    },
    {
      name: 'Alex Mika',
      role: 'UX/UI Designer',
      email: 'alex55@gamil.com',
      joinDate: 'Ari 17, 2025',
      status: 'Inactive',
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80'
    },
    {
      name: 'Allison Baker',
      role: 'UX/UI Designer',
      email: 'allison34@gamil.com',
      joinDate: 'Ari 18, 2025',
      status: 'Active',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&q=80'
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm w-full overflow-x-auto">
      <h2 className="text-xl font-bold text-[#1C1C1E] mb-6">Employee List</h2>

      <table className="w-full text-left border-collapse min-w-175">
        <thead>
          <tr className="border-b border-[#F0F0F3]">
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist">Name</th>
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist">Role</th>
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist">Email</th>
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist">Join Date</th>
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist text-right pr-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index} className="border-b border-[#F0F0F3] last:border-0 hover:bg-[#F8F9FB] transition-colors">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <img src={emp.img} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <span className="font-bold text-sm text-[#1C1C1E]">{emp.name}</span>
                </div>
              </td>
              <td className="py-4 text-sm text-[#8E8E93] font-medium">{emp.role}</td>
              <td className="py-4 text-sm text-[#8E8E93] font-medium">{emp.email}</td>
              <td className="py-4 text-sm text-[#8E8E93] font-medium">{emp.joinDate}</td>
              <td className="py-4 text-right pr-4">
                <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold ${emp.status === 'Active'
                    ? 'bg-[#34C759]/10 text-[#34C759]'
                    : 'bg-[#FF3B30]/10 text-[#FF3B30]'
                  }`}>
                  {emp.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
