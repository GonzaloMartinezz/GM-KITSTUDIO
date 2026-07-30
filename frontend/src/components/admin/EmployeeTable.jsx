import React from 'react';

const EmployeeTable = () => {
  const employees = [
    {
      name: 'Carrizo Dental',
      role: 'Venta',
      email: 'Kit Cirugía (x10)',
      joinDate: '+$74.500',
      status: 'Completado',
      img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&h=100&fit=crop&q=80'
    },
    {
      name: 'Prov. Norte Med',
      role: 'Compra',
      email: 'Insumos estériles',
      joinDate: '-$42.000',
      status: 'Pendiente',
      img: 'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=100&h=100&fit=crop&q=80'
    },
    {
      name: 'Dr. López',
      role: 'Venta',
      email: 'Kit Odontológico (x2)',
      joinDate: '+$14.900',
      status: 'Completado',
      img: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=100&h=100&fit=crop&q=80'
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm w-full overflow-x-auto">
      <h2 className="text-xl font-bold text-[#1E5A9C] mb-6">Transacciones Recientes</h2>

      <table className="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr className="border-b border-[#F0F0F3]">
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist">Entidad</th>
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist">Tipo</th>
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist">Detalle</th>
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist">Monto</th>
            <th className="py-4 text-sm font-medium text-[#8E8E93] font-geist text-right pr-4">Estado</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp, index) => (
            <tr key={index} className="border-b border-[#F0F0F3] last:border-0 hover:bg-[#F8F9FB] transition-colors">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <img src={emp.img} alt="" className="w-10 h-10 rounded-full object-cover border border-[#F0F0F3]" />
                  <span className="font-bold text-sm text-[#1E5A9C]">{emp.name}</span>
                </div>
              </td>
              <td className="py-4 text-sm text-[#8E8E93] font-medium">{emp.role}</td>
              <td className="py-4 text-sm text-[#8E8E93] font-medium">{emp.email}</td>
              <td className="py-4 text-sm text-[#8E8E93] font-medium">{emp.joinDate}</td>
              <td className="py-4 text-right pr-4">
                <span className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-xs font-bold ${emp.status === 'Completado'
                    ? 'bg-[#1E5A9C]/10 text-[#1E5A9C]'
                    : 'bg-[#00C2CB]/10 text-[#00C2CB]'
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
