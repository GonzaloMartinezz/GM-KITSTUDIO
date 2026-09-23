import React, { useState, useEffect } from 'react';
import { Plus, Users, Search, Edit3, Trash2, Mail, Phone, Calendar, UserCheck } from 'lucide-react';
import { useAdminData } from '../../context/AdminDataContext';
import { adminAPI } from '../../lib/api';

const AdminLeads = () => {
  const { leads, addLead, updateLead, deleteLead } = useAdminData();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [formData, setFormData] = useState({
    name: '', clinic: '', phone: '', email: '', status: 'Contacto Inicial', probability: 'Media', nextFollowUp: '', notes: '',
    didBuy: 'No', kitsBought: 0, paymentMethod: '', shippingMethod: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Tab: prospectos (CRM de leads, arriba) vs clientes que ya se registraron
  // en la tienda pública (cuenta real, aunque nunca hayan comprado o hablado
  // con nosotros por WhatsApp).
  const [activeTab, setActiveTab] = useState('prospectos');
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [usersError, setUsersError] = useState('');
  const [usersLoaded, setUsersLoaded] = useState(false);

  useEffect(() => {
    if (activeTab !== 'registrados' || usersLoaded) return;
    setLoadingUsers(true);
    setUsersError('');
    adminAPI.users({ limit: 200 })
      .then(({ data }) => {
        setRegisteredUsers(data?.users || []);
        setUsersLoaded(true);
      })
      .catch((err) => setUsersError(err?.response?.data?.message || 'No se pudo cargar la lista de clientes registrados.'))
      .finally(() => setLoadingUsers(false));
  }, [activeTab, usersLoaded]);

  const filteredUsers = registeredUsers.filter((u) =>
    (u.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.clinicName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (lead = null) => {
    if (lead) {
      setEditingLead(lead);
      setFormData(lead);
    } else {
      setEditingLead(null);
      setFormData({ 
        name: '', clinic: '', phone: '', email: '', status: 'Contacto Inicial', probability: 'Media', nextFollowUp: '', notes: '',
        didBuy: 'No', kitsBought: 0, paymentMethod: '', shippingMethod: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingLead) {
        await updateLead(editingLead._id, formData);
      } else {
        await addLead(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Error al guardar cliente potencial:", error);
      alert("Hubo un error al guardar. Por favor, intenta de nuevo.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este cliente potencial?')) {
      try {
        await deleteLead(id);
      } catch (error) {
        console.error("Error al eliminar cliente potencial:", error);
        alert("Hubo un error al eliminar. Por favor, intenta de nuevo.");
      }
    }
  };

  const filteredLeads = leads.filter(l =>
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.clinic.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full font-geist flex flex-col relative pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
              Posibles Clientes
            </h1>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E5A9C]/10 text-[#1E5A9C] border border-[#1E5A9C]/20 flex items-center gap-1">
              <Users size={12} /> CRM
            </span>
          </div>
          <p className="text-[#64748B] text-sm mt-1">
            Gestioná y anotá posibles ventas, consultas y seguimiento de clientes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 bg-[#1E5A9C] hover:bg-[#16487D] text-white px-4 py-2.5 rounded-xl font-semibold shadow-xs transition-all"
          >
            <Plus size={18} />
            <span>Nuevo Lead</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] pb-3 mb-6">
        <button
          onClick={() => setActiveTab('prospectos')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'prospectos'
            ? 'bg-[#1E5A9C] text-white shadow-xs'
            : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
            }`}
        >
          <Users size={16} />
          <span>Prospectos (CRM) ({leads.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('registrados')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${activeTab === 'registrados'
            ? 'bg-[#1E5A9C] text-white shadow-xs'
            : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
            }`}
        >
          <UserCheck size={16} />
          <span>Clientes Registrados{usersLoaded ? ` (${registeredUsers.length})` : ''}</span>
        </button>
      </div>

      {activeTab === 'prospectos' && (
      <>
      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E2E8F0] shadow-xs mb-6 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="relative w-full sm:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar por nombre o clínica..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#1E5A9C] focus:ring-1 focus:ring-[#1E5A9C]/20 transition-all"
          />
        </div>
        <div className="text-sm text-[#64748B] font-medium">
          Total: <span className="text-[#0F172A]">{filteredLeads.length}</span> prospectos
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E2E8F0]">
              <tr>
                <th className="px-6 py-4 font-semibold">Cliente / Clínica</th>
                <th className="px-6 py-4 font-semibold">Contacto</th>
                <th className="px-6 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 font-semibold">Próx. Seguimiento</th>
                <th className="px-6 py-4 font-semibold text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead._id} className="hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-[#0F172A]">{lead.name}</span>
                        <span className="text-xs text-[#64748B]">{lead.clinic}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-xs text-[#64748B]">
                        <div className="flex items-center gap-1.5"><Phone size={12} /> {lead.phone}</div>
                        {lead.email && <div className="flex items-center gap-1.5"><Mail size={12} /> {lead.email}</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold w-fit ${lead.status === 'Presupuesto Enviado' ? 'bg-orange-100 text-orange-700' :
                          lead.status === 'Negociación' ? 'bg-blue-100 text-blue-700' :
                            lead.status === 'Convertido' ? 'bg-green-100 text-green-700' :
                              'bg-slate-100 text-slate-700'
                          }`}>
                          {lead.status}
                        </span>
                        <span className="text-[10px] text-[#64748B] font-medium">
                          Probabilidad: <strong className={
                            lead.probability === 'Alta' ? 'text-green-600' :
                              lead.probability === 'Media' ? 'text-orange-500' : 'text-red-500'
                          }>{lead.probability}</strong>
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm text-[#0F172A] font-medium">
                        <Calendar size={14} className="text-[#1E5A9C]" />
                        {lead.nextFollowUp || 'No definido'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => handleOpenModal(lead)} className="p-1.5 text-[#64748B] hover:text-[#1E5A9C] hover:bg-[#1E5A9C]/10 rounded-lg transition-colors" title="Editar">
                          <Edit3 size={16} />
                        </button>
                        <button onClick={() => handleDelete(lead._id)} className="p-1.5 text-[#64748B] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-[#64748B]">
                    No se encontraron clientes potenciales.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      </>
      )}

      {activeTab === 'registrados' && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-xs overflow-hidden">
          <div className="p-4 border-b border-[#F1F5F9] flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Buscar por nombre, clínica o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm outline-none focus:border-[#1E5A9C] focus:ring-1 focus:ring-[#1E5A9C]/20 transition-all"
              />
            </div>
            <div className="text-sm text-[#64748B] font-medium">
              Total: <span className="text-[#0F172A]">{filteredUsers.length}</span> clientes con cuenta
            </div>
          </div>

          {usersError && (
            <div className="m-4 px-3.5 py-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
              {usersError}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-[#F8FAFC] text-[#64748B] border-b border-[#E2E8F0]">
                <tr>
                  <th className="px-6 py-4 font-semibold">Nombre / Clínica</th>
                  <th className="px-6 py-4 font-semibold">Contacto</th>
                  <th className="px-6 py-4 font-semibold">Registrado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0]">
                {loadingUsers ? (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-[#64748B]">Cargando clientes registrados...</td>
                  </tr>
                ) : filteredUsers.length > 0 ? (
                  filteredUsers.map((u) => (
                    <tr key={u._id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-[#0F172A]">{u.name}</span>
                          <span className="text-xs text-[#64748B]">{u.clinicName || 'Sin clínica registrada'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1 text-xs text-[#64748B]">
                          {u.email && <div className="flex items-center gap-1.5"><Mail size={12} /> {u.email}</div>}
                          {u.phone && <div className="flex items-center gap-1.5"><Phone size={12} /> {u.phone}</div>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-[#64748B]">
                        {u.createdAt ? new Date(u.createdAt).toLocaleDateString('es-AR') : '—'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-[#64748B]">
                      Todavía no hay clientes registrados en la tienda pública.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Agregar/Editar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#0F172A]/40 backdrop-blur-sm z-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-5 border-b border-[#E2E8F0] flex justify-between items-center bg-[#F8FAFC]">
              <h2 className="text-lg font-bold text-[#0F172A]">
                {editingLead ? 'Editar Posible Cliente' : 'Nuevo Posible Cliente'}
              </h2>
              <button onClick={handleCloseModal} className="text-[#64748B] hover:text-[#0F172A]">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 overflow-y-auto flex-1 flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#64748B]">Nombre del Profesional <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C]" placeholder="Dr. Juan Pérez" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#64748B]">Clínica / Institución</label>
                  <input type="text" value={formData.clinic} onChange={e => setFormData({ ...formData, clinic: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C]" placeholder="OdontoNorte" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#64748B]">Teléfono / WhatsApp <span className="text-red-500">*</span></label>
                  <input required type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C]" placeholder="381..." />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#64748B]">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C]" placeholder="correo@ejemplo.com" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#64748B]">Estado</label>
                  <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C] bg-white">
                    <option value="Contacto Inicial">Contacto Inicial</option>
                    <option value="Presupuesto Enviado">Presupuesto Enviado</option>
                    <option value="Negociación">Negociación</option>
                    <option value="Convertido">Convertido</option>
                    <option value="Perdido">Perdido</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#64748B]">Probabilidad de Cierre</label>
                  <select value={formData.probability} onChange={e => setFormData({ ...formData, probability: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C] bg-white">
                    <option value="Alta">Alta</option>
                    <option value="Media">Media</option>
                    <option value="Baja">Baja</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#64748B]">Próximo Seguimiento (Fecha)</label>
                  <input type="date" value={formData.nextFollowUp} onChange={e => setFormData({ ...formData, nextFollowUp: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C]" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[#64748B]">¿Realizó Compra?</label>
                  <select value={formData.didBuy} onChange={e => setFormData({ ...formData, didBuy: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C] bg-white">
                    <option value="No">No</option>
                    <option value="Sí">Sí</option>
                  </select>
                </div>
                
                {formData.didBuy === 'Sí' && (
                  <>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#64748B]">Kits Comprados</label>
                      <input type="number" min="1" value={formData.kitsBought} onChange={e => setFormData({ ...formData, kitsBought: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C]" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-[#64748B]">Método de Pago</label>
                      <select value={formData.paymentMethod} onChange={e => setFormData({ ...formData, paymentMethod: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C] bg-white">
                        <option value="">Seleccionar...</option>
                        <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                        <option value="Mercado Pago / Tarjetas">Mercado Pago / Tarjetas</option>
                        <option value="Efectivo / Contra Entrega">Efectivo / Contra Entrega</option>
                      </select>
                    </div>
                    <div className="flex flex-col gap-1.5 sm:col-span-2">
                      <label className="text-xs font-semibold text-[#64748B]">Información de Envío</label>
                      <input type="text" value={formData.shippingMethod} onChange={e => setFormData({ ...formData, shippingMethod: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C]" placeholder="Ej: Envío a domicilio por OCA, Retira en sucursal..." />
                    </div>
                  </>
                )}

                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <label className="text-xs font-semibold text-[#64748B]">Notas / Intereses</label>
                  <textarea value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} className="border border-[#E2E8F0] rounded-lg px-3 py-2 text-sm outline-none focus:border-[#1E5A9C] min-h-20" placeholder="Interesado en..." />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 rounded-lg text-sm font-semibold text-[#64748B] hover:bg-[#F1F5F9] transition-colors">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#1E5A9C] hover:bg-[#16487D] transition-colors">
                  Guardar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeads;
