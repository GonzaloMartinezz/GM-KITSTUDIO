import React, { useState, useEffect } from 'react';
import { Settings, Save, AlertCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const AdminConfiguracion = () => {
  const { settings, updateSettings, loading } = useSettings();
  const [formData, setFormData] = useState({
    whatsappNumber: '',
    contactEmail: '',
    instagramUrl: ''
  });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
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
      [name]: value
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
            Gestiona los datos de contacto que se muestran en la web.
          </p>
        </div>
      </header>

      <div className="bg-[#16272B] border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4 max-w-md">
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
