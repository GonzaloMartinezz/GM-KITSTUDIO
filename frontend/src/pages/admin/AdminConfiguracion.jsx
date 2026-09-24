import React, { useState, useEffect } from 'react';
import { Settings, Save, AlertCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const AdminConfiguracion = () => {
  const { settings, updateSettings, loading } = useSettings();
  const [formData, setFormData] = useState({
    freeShippingMinKits: 30,
    shippingDiscountAmount: 15000,
    whatsappNumber: '',
    contactEmail: '',
    instagramUrl: ''
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        freeShippingMinKits: settings.freeShippingMinKits || 30,
        shippingDiscountAmount: settings.shippingDiscountAmount || 15000,
        whatsappNumber: settings.whatsappNumber || '',
        contactEmail: settings.contactEmail || '',
        instagramUrl: settings.instagramUrl || ''
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name.includes('Amount') || name.includes('MinKits') ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      await updateSettings(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-brand-1">Cargando configuración...</div>;
  }

  return (
    <div className="p-4 sm:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bebas text-white flex items-center gap-2">
            <Settings className="w-8 h-8 text-[#88C9C4]" />
            Configuración Global
          </h1>
          <p className="text-brand-1/70 text-sm mt-1">
            Gestiona los textos públicos, costos de envío y datos de contacto que se muestran en la web.
          </p>
        </div>
      </header>

      <div className="bg-[#16272B] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bebas text-white mb-4 border-b border-white/10 pb-2">Envío Bonificado</h3>
              
              <div>
                <label className="block text-sm text-brand-1/70 font-semibold mb-2">Cantidad mínima de kits para envío gratis</label>
                <input
                  type="number"
                  name="freeShippingMinKits"
                  value={formData.freeShippingMinKits}
                  onChange={handleChange}
                  className="w-full bg-[#0C1517] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#88C9C4]"
                  required
                />
                <p className="text-xs text-brand-1/50 mt-1">Reemplaza el texto "Desde X Kits" en la tarjeta de envíos.</p>
              </div>
              
              <div>
                <label className="block text-sm text-brand-1/70 font-semibold mb-2">Ahorro escalonado (Monto en $)</label>
                <input
                  type="number"
                  name="shippingDiscountAmount"
                  value={formData.shippingDiscountAmount}
                  onChange={handleChange}
                  className="w-full bg-[#0C1517] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#88C9C4]"
                  required
                />
                <p className="text-xs text-brand-1/50 mt-1">Se muestra en "Ahorro escalonado de hasta $X.XXX"</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bebas text-white mb-4 border-b border-white/10 pb-2">Datos de Contacto</h3>
              
              <div>
                <label className="block text-sm text-brand-1/70 font-semibold mb-2">Número de WhatsApp (con código de país)</label>
                <input
                  type="text"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  placeholder="Ej: 5493815555555"
                  className="w-full bg-[#0C1517] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#88C9C4]"
                />
              </div>

              <div>
                <label className="block text-sm text-brand-1/70 font-semibold mb-2">Email de Contacto</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full bg-[#0C1517] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#88C9C4]"
                />
              </div>

              <div>
                <label className="block text-sm text-brand-1/70 font-semibold mb-2">URL de Instagram</label>
                <input
                  type="url"
                  name="instagramUrl"
                  value={formData.instagramUrl}
                  onChange={handleChange}
                  className="w-full bg-[#0C1517] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#88C9C4]"
                />
              </div>
            </div>
          </div>

          {success && (
            <div className="bg-green-500/20 text-green-400 p-3 flex items-center gap-2 rounded-xl border border-green-500/30">
              <AlertCircle className="w-5 h-5" />
              <span>Configuración guardada correctamente. La web se actualizó al instante.</span>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-[#88C9C4] text-[#0C1517] font-bold px-6 py-3 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              {saving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminConfiguracion;
