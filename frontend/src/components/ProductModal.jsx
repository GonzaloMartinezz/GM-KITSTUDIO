import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, MapPin, Truck, MessagesSquare, Mail } from 'lucide-react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const libraries = ['places'];

const ProductModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);

  // Form State
  const [selectedQty, setSelectedQty] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [address, setAddress] = useState('');
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const onLoad = (autoC) => setAutocomplete(autoC);
  
  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setAddress(place.formatted_address);
      } else if (place.name) {
        setAddress(place.name);
      }
    }
  };

  const kitItems = [
    { icon: Package, title: "Batas con Puños", desc: "Batas quirúrgicas con puños elastizados (Cant. 2)." },
    { icon: Package, title: "Compresa 1x1 mt", desc: "Compresa estéril impermeable de 1x1 mt (Cant. 1)." },
    { icon: Package, title: "Compresa 50x50 cm", desc: "Compresa estéril impermeable de 50x50 cm (Cant. 1)." },
    { icon: Package, title: "Campo Fenestrado", desc: "Campo fenestrado para paciente (Cant. 1)." },
    { icon: Package, title: "Cubre Suctores", desc: "Fundas protectoras para suctores (Cant. 2)." },
    { icon: Package, title: "Gorros Clásicos", desc: "Gorros quirúrgicos clásicos descartables (Cant. 2)." },
    { icon: Package, title: "Barbijos", desc: "Barbijos descartables termosellados (Cant. 2)." },
    { icon: Package, title: "Cubrecalzados Elastizados", desc: "Protección descartable elastizada (Cant. 2)." }
  ];

  const quantities = [
    { title: "1 a 9 Kits", desc: "$9.500 por kit completo." },
    { title: "10 Kits o más", desc: "$9.500 por kit + Envío Gratis 100% Bonificado." },
    { title: "Personalizado", desc: "Consultar volumen mayor." }
  ];

  const shippings = [
    { icon: Truck, title: "Envío a Domicilio", desc: "Recibí tu pedido directamente en tu clínica." },
    { icon: MapPin, title: "Coordinar Lugar", desc: "Retiro en sucursal o punto de encuentro." }
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onClose();
  };

  const generateMessage = () => {
    const qty = quantities[selectedQty].title;
    const shipping = shippings[selectedShipping].title;
    const addr = selectedShipping === 0 && address ? ` (${address})` : '';

    let msg = `¡Hola GM Kit Studio! 👋\nQuiero confirmar mi pedido desde la web:\n\n`;
    msg += `📦 *Producto:* Kit Odontológico Completo (8 Insumos)\n`;
    msg += `🔢 *Cantidad:* ${qty}\n`;
    msg += `🚚 *Entrega:* ${shipping}${addr}\n\n`;
    msg += `💰 *TOTAL DE COMPRA:* A confirmar según escala\n\n`;
    msg += `Quedo a la espera de su confirmación para coordinar la entrega. ¡Muchas gracias!`;
    return encodeURIComponent(msg);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/5493816242482?text=${generateMessage()}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const url = `mailto:gonnnchimartinez9@gmail.com?subject=Nuevo Pedido de Kits Quirúrgicos&body=${generateMessage().replace(/%0A/g, '%0D%0A')}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-4 font-geist">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-5/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-[#F5F2EB] w-full max-w-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 relative z-10 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto overflow-x-hidden"
          >
            {/* Header / Progress */}
            <div className="flex justify-between items-center mb-5 sm:mb-6">
              <button onClick={handleBack} className="text-[#1E293B]/60 hover:text-[#1E293B] font-medium transition-colors text-xs sm:text-sm cursor-pointer">
                Volver
              </button>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`w-6 sm:w-7 h-0.75 rounded-full transition-colors ${s <= step ? 'bg-[#1E293B]' : 'bg-gray-200'}`}></div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">

              {/* STEP 1: PRODUCT */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                  <h2 className="text-xl sm:text-[28px] font-medium tracking-tight text-[#1E293B] mb-1.5 sm:mb-2 leading-tight">Kit Odontológico Completo</h2>
                  <p className="text-[#1E293B]/50 text-xs sm:text-[13px] mb-4 sm:mb-6 leading-relaxed max-w-[95%]">El kit incluye todo lo necesario para garantizar la máxima bioseguridad. (No se vende por separado).</p>
                  <div className="flex flex-col gap-2 mb-5 sm:mb-6 max-h-[38vh] overflow-y-auto pr-1 sm:pr-2 custom-scrollbar">
                    {kitItems.map((opt, idx) => {
                      const Icon = opt.icon;
                      return (
                        <div key={idx} className="flex gap-3 sm:gap-4 p-2.5 sm:p-3 rounded-xl border border-gray-200 bg-white items-center">
                          <div className="text-[#1E293B]/60 shrink-0">
                            <Icon size={18} strokeWidth={2} />
                          </div>
                          <div>
                            <h4 className="font-medium text-xs sm:text-[14px] text-[#1E293B]">{opt.title}</h4>
                            <p className="text-[11px] sm:text-[12px] mt-0.5 leading-snug text-[#1E293B]/50">{opt.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <button onClick={handleNext} className="w-full bg-[#1E293B] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-[15px] hover:bg-black transition-colors shadow-lg shadow-black/10 cursor-pointer">Continuar a Cantidad</button>
                </motion.div>
              )}

              {/* STEP 2: QUANTITY */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                  <h2 className="text-xl sm:text-[28px] font-medium tracking-tight text-[#1E293B] mb-1.5 sm:mb-2 leading-tight">¿Cuántos kits necesitas?</h2>
                  <p className="text-[#1E293B]/50 text-xs sm:text-[13px] mb-4 sm:mb-6 leading-relaxed max-w-[95%]">Seleccioná la cantidad para ver nuestras promociones por volumen.</p>
                  <div className="flex flex-col gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                    {quantities.map((opt, idx) => {
                      const isSelected = selectedQty === idx;
                      return (
                        <div key={idx} onClick={() => setSelectedQty(idx)} className={`flex flex-col p-3 sm:p-4 rounded-xl sm:rounded-[1.25rem] border-[1.5px] cursor-pointer transition-all ${isSelected ? 'border-[#1E293B] bg-[#1E293B]' : 'border-[#1E293B]/10 bg-white hover:border-[#1E293B]/20'}`}>
                          <h4 className={`font-medium text-sm sm:text-[15px] ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>{opt.title}</h4>
                          <p className={`text-xs sm:text-[13px] mt-0.5 leading-snug ${isSelected ? 'text-white/80' : 'text-[#1E293B]/50'}`}>{opt.desc}</p>
                        </div>
                      )
                    })}
                  </div>
                  <button onClick={handleNext} className="w-full bg-[#1E293B] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-[15px] hover:bg-black transition-colors shadow-lg shadow-black/10 cursor-pointer">Continuar</button>
                </motion.div>
              )}

              {/* STEP 3: SHIPPING */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                  <h2 className="text-xl sm:text-[28px] font-medium tracking-tight text-[#1E293B] mb-1.5 sm:mb-2 leading-tight">Opciones de Envío</h2>
                  <p className="text-[#1E293B]/50 text-xs sm:text-[13px] mb-4 sm:mb-6 leading-relaxed max-w-[95%]">¿Cómo te gustaría recibir tus kits?</p>
                  <div className="flex flex-col gap-2.5 sm:gap-3 mb-5 sm:mb-6">
                    {shippings.map((opt, idx) => {
                      const isSelected = selectedShipping === idx;
                      const Icon = opt.icon;
                      return (
                        <div key={idx} onClick={() => setSelectedShipping(idx)} className={`flex gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl sm:rounded-[1.25rem] border-[1.5px] cursor-pointer transition-all ${isSelected ? 'border-[#1E293B] bg-[#1E293B]' : 'border-[#1E293B]/10 bg-white hover:border-[#1E293B]/20'}`}>
                          <div className={`mt-0.5 transition-colors shrink-0 ${isSelected ? 'text-white' : 'text-[#1E293B]/60'}`}>
                            <Icon size={20} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className={`font-medium text-sm sm:text-[15px] ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>{opt.title}</h4>
                            <p className={`text-xs sm:text-[13px] mt-0.5 leading-snug ${isSelected ? 'text-white/80' : 'text-[#1E293B]/50'}`}>{opt.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {selectedShipping === 0 && (
                    <div className="mb-5 sm:mb-6">
                      <label className="block text-xs sm:text-sm font-medium mb-1.5 sm:mb-2 text-[#1E293B]">Dirección de entrega <span className="text-red-500">*</span></label>
                      {isLoaded ? (
                        <Autocomplete
                          onLoad={onLoad}
                          onPlaceChanged={onPlaceChanged}
                          options={{ componentRestrictions: { country: "ar" } }}
                        >
                          <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Ej. San Martín 123, Tucumán"
                            className="w-full bg-[#F8F9FA] border border-transparent rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:bg-white focus:border-[#1C1C1C] transition-all text-xs sm:text-sm text-[#1E293B] placeholder-gray-400"
                          />
                        </Autocomplete>
                      ) : (
                        <input
                          type="text"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Cargando mapa... Ej. San Martín 123"
                          className="w-full bg-[#F8F9FA] border border-transparent rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 focus:outline-none focus:bg-white focus:border-[#1C1C1C] transition-all text-xs sm:text-sm text-[#1E293B] placeholder-gray-400"
                        />
                      )}
                    </div>
                  )}

                  <button onClick={handleNext} disabled={selectedShipping === 0 && address.trim() === ''} className="w-full bg-[#1E293B] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-[15px] hover:bg-black transition-colors shadow-lg shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">Continuar</button>
                </motion.div>
              )}

              {/* STEP 4: SUMMARY & SEND */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                  <h2 className="text-xl sm:text-[28px] font-medium tracking-tight text-[#1E293B] mb-1.5 sm:mb-2 leading-tight">Resumen de tu pedido</h2>
                  <p className="text-[#1E293B]/50 text-xs sm:text-[13px] mb-4 sm:mb-6 leading-relaxed max-w-[95%]">Revisá los datos antes de enviarnos un mensaje para finalizar la compra.</p>

                  <div className="bg-[#F8F9FA] rounded-xl sm:rounded-[1.25rem] p-4 sm:p-5 mb-5 sm:mb-8 border border-gray-100 flex flex-col gap-2.5 sm:gap-3 text-xs sm:text-[14px]">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-[#1E293B]/60">Producto</span>
                      <span className="font-medium text-[#1E293B] text-right">Kit Completo</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-[#1E293B]/60">Cantidad</span>
                      <span className="font-medium text-[#1E293B] text-right">{quantities[selectedQty].title}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-[#1E293B]/60">Envío</span>
                      <span className="font-medium text-[#1E293B] text-right">
                        {shippings[selectedShipping].title}
                        {selectedShipping === 0 && <span className="block text-xs text-[#1E293B]/60 font-normal mt-0.5">{address}</span>}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:gap-3">
                    <button onClick={handleWhatsApp} className="w-full bg-[#25D366] text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-[15px] hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer">
                      <MessagesSquare size={18} />
                      Enviar pedido por WhatsApp
                    </button>
                    <button onClick={handleEmail} className="w-full bg-transparent border-2 border-[#1E293B] text-[#1E293B] py-3 sm:py-3.5 rounded-xl sm:rounded-2xl font-medium text-sm sm:text-[15px] hover:bg-[#1E293B] hover:text-white transition-colors flex items-center justify-center gap-2.5 sm:gap-3 cursor-pointer">
                      <Mail size={18} />
                      Enviar por Email
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
