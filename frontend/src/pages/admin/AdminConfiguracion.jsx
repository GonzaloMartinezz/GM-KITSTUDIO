import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  AlertCircle,
  CheckCircle2,
  Truck,
  CreditCard,
  Plus,
  Edit3,
  X,
  Lock,
  Eye,
  EyeOff,
  Power,
  Loader2,
} from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { paymentMethodsAPI, authAPI } from '../../lib/api';

/* ─── Helpers ──────────────────────────────────────── */
const slugify = (text) => {
  const slug = (text || '')
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return slug || `metodo_${Date.now()}`;
};

const SectionCard = ({ icon: Icon, title, subtitle, children }) => (
  <div className="bg-[#16272B] border border-white/10 rounded-2xl p-6 shadow-xl">
    <div className="mb-5 pb-4 border-b border-white/10">
      <h3 className="text-xl font-bebas text-white flex items-center gap-2">
        <Icon className="w-5 h-5 text-[#88C9C4]" />
        {title}
      </h3>
      {subtitle && <p className="text-brand-1/60 text-xs mt-1">{subtitle}</p>}
    </div>
    {children}
  </div>
);

const FieldLabel = ({ children }) => (
  <label className="block text-sm text-brand-1/70 font-semibold mb-2">{children}</label>
);

const inputClass =
  'w-full bg-[#0C1517] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#88C9C4] transition-colors';

const FeedbackBanner = ({ type, children }) => (
  <div
    className={`p-3 flex items-center gap-2 rounded-xl border text-sm ${
      type === 'error'
        ? 'bg-red-500/10 text-red-400 border-red-500/30'
        : 'bg-green-500/20 text-green-400 border-green-500/30'
    }`}
  >
    {type === 'error' ? <AlertCircle className="w-5 h-5 shrink-0" /> : <CheckCircle2 className="w-5 h-5 shrink-0" />}
    <span>{children}</span>
  </div>
);

const AdminConfiguracion = () => {
  const { settings, updateSettings, loading } = useSettings();

  /* ── Datos de Contacto (ya existente, sin cambios) ── */
  const [formData, setFormData] = useState({ whatsappNumber: '', contactEmail: '', instagramUrl: '' });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  /* ── Envío y Promociones ── */
  const [shippingForm, setShippingForm] = useState({ freeShippingMinKits: '', shippingDiscountAmount: '' });
  const [shippingSaving, setShippingSaving] = useState(false);
  const [shippingSuccess, setShippingSuccess] = useState(false);
  const [shippingError, setShippingError] = useState('');

  useEffect(() => {
    if (settings) {
      setFormData({
        whatsappNumber: settings.whatsappNumber || '',
        contactEmail: settings.contactEmail || '',
        instagramUrl: settings.instagramUrl || '',
      });
      setShippingForm({
        freeShippingMinKits: settings.freeShippingMinKits ?? '',
        shippingDiscountAmount: settings.shippingDiscountAmount ?? '',
      });
    }
  }, [settings]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value === '' ? '' : value }));
  };

  const handleSaveShipping = async (e) => {
    e.preventDefault();
    setShippingSaving(true);
    setShippingSuccess(false);
    setShippingError('');
    try {
      await updateSettings({
        freeShippingMinKits: Number(shippingForm.freeShippingMinKits) || 0,
        shippingDiscountAmount: Number(shippingForm.shippingDiscountAmount) || 0,
      });
      setShippingSuccess(true);
      setTimeout(() => setShippingSuccess(false), 3000);
    } catch (err) {
      setShippingError(err?.response?.data?.message || 'No se pudo guardar la configuración de envío.');
    } finally {
      setShippingSaving(false);
    }
  };

  /* ── Métodos de Pago ── */
  const [methods, setMethods] = useState([]);
  const [methodsLoading, setMethodsLoading] = useState(true);
  const [methodsError, setMethodsError] = useState('');
  const [editingId, setEditingId] = useState(null); // null | 'new' | <id>
  const [methodForm, setMethodForm] = useState({ name: '', description: '', color: '#364B5D', secondaryColor: '#546A7E' });
  const [methodSaving, setMethodSaving] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  const fetchMethods = async () => {
    setMethodsLoading(true);
    try {
      const { data } = await paymentMethodsAPI.list({ all: true });
      setMethods(data || []);
    } catch {
      setMethodsError('No se pudieron cargar los métodos de pago.');
    } finally {
      setMethodsLoading(false);
    }
  };

  useEffect(() => {
    fetchMethods();
  }, []);

  const openNewMethodForm = () => {
    setMethodsError('');
    setEditingId('new');
    setMethodForm({ name: '', description: '', color: '#364B5D', secondaryColor: '#546A7E' });
  };

  const openEditMethodForm = (pm) => {
    setMethodsError('');
    setEditingId(pm._id);
    setMethodForm({
      name: pm.name,
      description: pm.description || '',
      color: pm.color || '#364B5D',
      secondaryColor: pm.secondaryColor || '#546A7E',
    });
  };

  const closeMethodForm = () => {
    setEditingId(null);
    setMethodsError('');
  };

  const handleMethodFieldChange = (e) => {
    const { name, value } = e.target;
    setMethodForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveMethod = async (e) => {
    e.preventDefault();
    if (!methodForm.name.trim()) return;
    setMethodSaving(true);
    setMethodsError('');
    try {
      if (editingId === 'new') {
        await paymentMethodsAPI.create({
          key: slugify(methodForm.name),
          name: methodForm.name.trim(),
          description: methodForm.description.trim(),
          color: methodForm.color,
          secondaryColor: methodForm.secondaryColor,
        });
      } else {
        await paymentMethodsAPI.update(editingId, {
          name: methodForm.name.trim(),
          description: methodForm.description.trim(),
          color: methodForm.color,
          secondaryColor: methodForm.secondaryColor,
        });
      }
      await fetchMethods();
      closeMethodForm();
    } catch (err) {
      setMethodsError(err?.response?.data?.message || 'No se pudo guardar el método de pago.');
    } finally {
      setMethodSaving(false);
    }
  };

  const handleToggleActive = async (pm) => {
    setMethodsError('');
    setTogglingId(pm._id);
    try {
      await paymentMethodsAPI.update(pm._id, { isActive: !pm.isActive });
      await fetchMethods();
    } catch {
      setMethodsError('No se pudo cambiar el estado del método de pago.');
    } finally {
      setTogglingId(null);
    }
  };

  /* ── Seguridad de la Cuenta ── */
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [pwSaving, setPwSaving] = useState(false);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwError, setPwError] = useState('');
  const [showPw, setShowPw] = useState(false);

  const handlePwChange = (e) => {
    const { name, value } = e.target;
    setPwForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (pwForm.newPassword !== pwForm.confirmPassword) {
      setPwError('La confirmación no coincide con la nueva contraseña.');
      return;
    }
    if (pwForm.newPassword.length < 6) {
      setPwError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setPwSaving(true);
    try {
      await authAPI.changePassword({
        currentPassword: pwForm.currentPassword,
        newPassword: pwForm.newPassword,
      });
      setPwSuccess(true);
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPwSuccess(false), 3000);
    } catch (err) {
      setPwError(err?.response?.data?.message || 'No se pudo actualizar la contraseña.');
    } finally {
      setPwSaving(false);
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
            <SettingsIcon className="w-8 h-8 text-[#88C9C4]" />
            Configuración
          </h1>
          <p className="text-brand-1/70 text-sm mt-1">
            Envío, métodos de pago y seguridad de la cuenta.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

        {/* ───────── ENVÍO Y PROMOCIONES ───────── */}
        <SectionCard
          icon={Truck}
          title="Envío y Promociones"
          subtitle="Controla el umbral de envío bonificado y el ahorro que se muestra en la web."
        >
          <form onSubmit={handleSaveShipping} className="space-y-4">
            <div>
              <FieldLabel>Mínimo de kits para envío bonificado</FieldLabel>
              <input
                type="number"
                min="1"
                name="freeShippingMinKits"
                value={shippingForm.freeShippingMinKits}
                onChange={handleShippingChange}
                placeholder="Ej: 30"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel>Monto de ahorro a mostrar (escalonado, $)</FieldLabel>
              <input
                type="number"
                min="0"
                name="shippingDiscountAmount"
                value={shippingForm.shippingDiscountAmount}
                onChange={handleShippingChange}
                placeholder="Ej: 15000"
                className={inputClass}
              />
            </div>

            {shippingError && <FeedbackBanner type="error">{shippingError}</FeedbackBanner>}
            {shippingSuccess && <FeedbackBanner type="success">Guardado correctamente.</FeedbackBanner>}

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                type="submit"
                disabled={shippingSaving}
                className="flex items-center gap-2 bg-[#88C9C4] text-[#0C1517] font-bold px-5 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {shippingSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {shippingSaving ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </form>
        </SectionCard>

        {/* ───────── SEGURIDAD DE LA CUENTA ───────── */}
        <SectionCard
          icon={Lock}
          title="Seguridad de la Cuenta"
          subtitle="Cambiá la contraseña con la que ingresás al panel de administración."
        >
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div>
              <FieldLabel>Contraseña Actual</FieldLabel>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  name="currentPassword"
                  value={pwForm.currentPassword}
                  onChange={handlePwChange}
                  autoComplete="current-password"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-1/50 hover:text-white cursor-pointer"
                  tabIndex={-1}
                >
                  {showPw ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <FieldLabel>Nueva Contraseña</FieldLabel>
                <input
                  type={showPw ? 'text' : 'password'}
                  name="newPassword"
                  value={pwForm.newPassword}
                  onChange={handlePwChange}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>
              <div>
                <FieldLabel>Confirmar Nueva</FieldLabel>
                <input
                  type={showPw ? 'text' : 'password'}
                  name="confirmPassword"
                  value={pwForm.confirmPassword}
                  onChange={handlePwChange}
                  autoComplete="new-password"
                  className={inputClass}
                />
              </div>
            </div>

            {pwError && <FeedbackBanner type="error">{pwError}</FeedbackBanner>}
            {pwSuccess && <FeedbackBanner type="success">Contraseña actualizada correctamente.</FeedbackBanner>}

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                type="submit"
                disabled={pwSaving || !pwForm.currentPassword || !pwForm.newPassword}
                className="flex items-center gap-2 bg-[#88C9C4] text-[#0C1517] font-bold px-5 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {pwSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {pwSaving ? 'Actualizando...' : 'Cambiar Contraseña'}
              </button>
            </div>
          </form>
        </SectionCard>

        {/* ───────── MÉTODOS DE PAGO ───────── */}
        <SectionCard
          icon={CreditCard}
          title="Métodos de Pago"
          subtitle="Nombre, color y estado de cada método — esto alimenta los reportes de Finanzas, no cambia las opciones que ve el cliente al pagar."
        >
          <div className="space-y-3">
            {methodsError && <FeedbackBanner type="error">{methodsError}</FeedbackBanner>}

            {methodsLoading ? (
              <div className="flex items-center justify-center py-8 text-brand-1/50 gap-2">
                <Loader2 className="w-4 h-4 animate-spin" /> Cargando métodos...
              </div>
            ) : (
              <div className="space-y-2">
                {methods.map((pm) => (
                  <div key={pm._id}>
                    {editingId === pm._id ? (
                      <form
                        onSubmit={handleSaveMethod}
                        className="p-3.5 bg-[#0C1517] border border-[#88C9C4]/40 rounded-xl space-y-3 text-xs"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-brand-1/60 font-semibold mb-1">Nombre</label>
                            <input
                              type="text"
                              name="name"
                              value={methodForm.name}
                              onChange={handleMethodFieldChange}
                              required
                              className="w-full bg-[#16272B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#88C9C4]"
                            />
                          </div>
                          <div>
                            <label className="block text-brand-1/60 font-semibold mb-1">Descripción</label>
                            <input
                              type="text"
                              name="description"
                              value={methodForm.description}
                              onChange={handleMethodFieldChange}
                              className="w-full bg-[#16272B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#88C9C4]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-brand-1/60 font-semibold mb-1">Color Principal</label>
                            <input
                              type="color"
                              name="color"
                              value={methodForm.color}
                              onChange={handleMethodFieldChange}
                              className="w-full h-9 bg-[#16272B] border border-white/10 rounded-lg cursor-pointer"
                            />
                          </div>
                          <div>
                            <label className="block text-brand-1/60 font-semibold mb-1">Color Secundario</label>
                            <input
                              type="color"
                              name="secondaryColor"
                              value={methodForm.secondaryColor}
                              onChange={handleMethodFieldChange}
                              className="w-full h-9 bg-[#16272B] border border-white/10 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={closeMethodForm}
                            className="px-3.5 py-1.5 rounded-lg text-brand-1/70 hover:text-white border border-white/10 hover:bg-white/5 font-semibold cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            disabled={methodSaving}
                            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#88C9C4] text-[#0C1517] font-bold disabled:opacity-50 cursor-pointer"
                          >
                            {methodSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                            Guardar
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 text-xs transition-opacity ${
                          pm.isActive
                            ? 'bg-[#0C1517] border-white/10'
                            : 'bg-[#0C1517]/40 border-white/5 opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: pm.color }} />
                          <div className="min-w-0">
                            <div className="font-bold text-white truncate">{pm.name}</div>
                            {pm.description && (
                              <div className="text-brand-1/50 text-[11px] truncate">{pm.description}</div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <span
                            className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full mr-1 ${
                              pm.isActive ? 'bg-emerald-500/15 text-emerald-400' : 'bg-white/5 text-brand-1/40'
                            }`}
                          >
                            {pm.isActive ? 'Activo' : 'Inactivo'}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleToggleActive(pm)}
                            disabled={togglingId === pm._id}
                            title={pm.isActive ? 'Desactivar' : 'Activar'}
                            className="p-1.5 text-brand-1/60 hover:text-white hover:bg-white/5 rounded-lg disabled:opacity-40 cursor-pointer"
                          >
                            {togglingId === pm._id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Power className="w-3.5 h-3.5" />}
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditMethodForm(pm)}
                            title="Editar"
                            className="p-1.5 text-brand-1/60 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {methods.length === 0 && (
                  <p className="text-brand-1/40 text-xs text-center py-4">Todavía no hay métodos de pago cargados.</p>
                )}
              </div>
            )}

            {editingId === 'new' ? (
              <form
                onSubmit={handleSaveMethod}
                className="p-3.5 bg-[#0C1517] border border-[#88C9C4]/40 rounded-xl space-y-3 text-xs"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-brand-1/60 font-semibold mb-1">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={methodForm.name}
                      onChange={handleMethodFieldChange}
                      placeholder="Ej: Cheque"
                      required
                      autoFocus
                      className="w-full bg-[#16272B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#88C9C4]"
                    />
                  </div>
                  <div>
                    <label className="block text-brand-1/60 font-semibold mb-1">Descripción</label>
                    <input
                      type="text"
                      name="description"
                      value={methodForm.description}
                      onChange={handleMethodFieldChange}
                      className="w-full bg-[#16272B] border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#88C9C4]"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={closeMethodForm}
                    className="px-3.5 py-1.5 rounded-lg text-brand-1/70 hover:text-white border border-white/10 hover:bg-white/5 font-semibold cursor-pointer"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={methodSaving}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#88C9C4] text-[#0C1517] font-bold disabled:opacity-50 cursor-pointer"
                  >
                    {methodSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />}
                    Agregar
                  </button>
                </div>
              </form>
            ) : (
              <button
                type="button"
                onClick={openNewMethodForm}
                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-xl border border-dashed border-white/15 text-brand-1/60 hover:text-white hover:border-[#88C9C4]/50 text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Agregar Método de Pago
              </button>
            )}
          </div>
        </SectionCard>

        {/* ───────── DATOS DE CONTACTO (sin cambios) ───────── */}
        <SectionCard
          icon={SettingsIcon}
          title="Datos de Contacto"
          subtitle="Los datos que se muestran en la web."
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <FieldLabel>Número de WhatsApp (con código de país)</FieldLabel>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="Ej: 5493815555555"
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel>Email de Contacto</FieldLabel>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <FieldLabel>URL de Instagram</FieldLabel>
              <input
                type="url"
                name="instagramUrl"
                value={formData.instagramUrl}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            {success && <FeedbackBanner type="success">Configuración guardada correctamente.</FeedbackBanner>}

            <div className="flex justify-end pt-2 border-t border-white/10">
              <button
                type="submit"
                disabled={saving}
                className="flex items-center gap-2 bg-[#88C9C4] text-[#0C1517] font-bold px-5 py-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Guardando...' : 'Guardar Cambios'}
              </button>
            </div>
          </form>
        </SectionCard>

      </div>
    </div>
  );
};

export default AdminConfiguracion;
