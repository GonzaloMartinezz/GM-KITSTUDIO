import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ShieldPlus, BriefcaseMedical, UserPlus, MapPin, Truck, MessagesSquare, Mail } from 'lucide-react';

const ProductModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  
  // Form State
  const [selectedProduct, setSelectedProduct] = useState(0);
  const [selectedQty, setSelectedQty] = useState(0);
  const [selectedShipping, setSelectedShipping] = useState(0);
  const [address, setAddress] = useState('');

  const products = [
    { icon: Package, title: "Kit Básico", desc: "Ideal para intervenciones menores y rápidas." },
    { icon: ShieldPlus, title: "Bioseguridad Completo", desc: "Protección total y barrera para dos profesionales." },
    { icon: BriefcaseMedical, title: "Implante Premium", desc: "Máxima barrera bacteriológica para cirugías." },
    { icon: UserPlus, title: "Armado Personalizado", desc: "Armá el kit a la medida de tu clínica o consultorio." }
  ];

  const quantities = [
    { title: "1 Kit", desc: "Precio regular por unidad." },
    { title: "5 Kits", desc: "10% de descuento en el total." },
    { title: "10 Kits o más", desc: "20% de descuento y envío prioritario." },
    { title: "Personalizado", desc: "Consultar cantidad específica." }
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
    const product = products[selectedProduct].title;
    const qty = quantities[selectedQty].title;
    const shipping = shippings[selectedShipping].title;
    const addr = selectedShipping === 0 ? ` a: ${address}` : '';
    
    return `Hola GM KIT STUDIO! Quiero hacer un pedido:%0A- Producto: *${product}*%0A- Cantidad: *${qty}*%0A- Envío: *${shipping}*${addr}`;
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/5493815000000?text=${generateMessage()}`;
    window.open(url, '_blank');
  };

  const handleEmail = () => {
    const url = `mailto:contacto@gmkitstudio.com?subject=Nuevo Pedido de Kits Quirúrgicos&body=${generateMessage().replace(/%0A/g, '%0D%0A')}`;
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-geist">
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
            className="bg-[#F5F2EB] w-full max-w-[28rem] rounded-3xl p-8 relative z-10 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto overflow-x-hidden"
          >
            {/* Header / Progress */}
            <div className="flex justify-between items-center mb-6">
              <button onClick={handleBack} className="text-[#1E293B]/50 hover:text-[#1E293B] font-medium transition-colors text-sm">
                Volver
              </button>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div key={s} className={`w-7 h-[3px] rounded-full transition-colors ${s <= step ? 'bg-[#1E293B]' : 'bg-gray-200'}`}></div>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              
              {/* STEP 1: PRODUCT */}
              {step === 1 && (
                <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                  <h2 className="text-[28px] font-medium tracking-tight text-[#1E293B] mb-2 leading-tight">¿Qué producto buscas?</h2>
                  <p className="text-[#1E293B]/50 text-[13px] mb-6 leading-relaxed max-w-[90%]">Especifica el tipo de kit que necesitas. Esto nos ayudará a ofrecerte la mejor opción para tu clínica.</p>
                  <div className="flex flex-col gap-3 mb-6">
                    {products.map((opt, idx) => {
                      const isSelected = selectedProduct === idx;
                      const Icon = opt.icon;
                      return (
                        <div key={idx} onClick={() => setSelectedProduct(idx)} className={`flex gap-4 p-4 rounded-[1.25rem] border-[1.5px] cursor-pointer transition-all ${isSelected ? 'border-[#1E293B] bg-[#1E293B]' : 'border-[#1E293B]/10 bg-white hover:border-[#1E293B]/20'}`}>
                          <div className={`mt-0.5 transition-colors ${isSelected ? 'text-white' : 'text-[#1E293B]/60'}`}>
                            <Icon size={22} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className={`font-medium text-[15px] ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>{opt.title}</h4>
                            <p className={`text-[13px] mt-0.5 leading-snug ${isSelected ? 'text-white/80' : 'text-[#1E293B]/50'}`}>{opt.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  <button onClick={handleNext} className="w-full bg-[#1E293B] text-white py-4 rounded-2xl font-medium text-[15px] hover:bg-black transition-colors shadow-lg shadow-black/10">Continuar</button>
                </motion.div>
              )}

              {/* STEP 2: QUANTITY */}
              {step === 2 && (
                <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                  <h2 className="text-[28px] font-medium tracking-tight text-[#1E293B] mb-2 leading-tight">¿Cuántos kits necesitas?</h2>
                  <p className="text-[#1E293B]/50 text-[13px] mb-6 leading-relaxed max-w-[90%]">Seleccioná la cantidad para ver nuestras promociones por volumen.</p>
                  <div className="flex flex-col gap-3 mb-6">
                    {quantities.map((opt, idx) => {
                      const isSelected = selectedQty === idx;
                      return (
                        <div key={idx} onClick={() => setSelectedQty(idx)} className={`flex flex-col p-4 rounded-[1.25rem] border-[1.5px] cursor-pointer transition-all ${isSelected ? 'border-[#1E293B] bg-[#1E293B]' : 'border-[#1E293B]/10 bg-white hover:border-[#1E293B]/20'}`}>
                          <h4 className={`font-medium text-[15px] ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>{opt.title}</h4>
                          <p className={`text-[13px] mt-0.5 leading-snug ${isSelected ? 'text-white/80' : 'text-[#1E293B]/50'}`}>{opt.desc}</p>
                        </div>
                      )
                    })}
                  </div>
                  <button onClick={handleNext} className="w-full bg-[#1E293B] text-white py-4 rounded-2xl font-medium text-[15px] hover:bg-black transition-colors shadow-lg shadow-black/10">Continuar</button>
                </motion.div>
              )}

              {/* STEP 3: SHIPPING */}
              {step === 3 && (
                <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                  <h2 className="text-[28px] font-medium tracking-tight text-[#1E293B] mb-2 leading-tight">Opciones de Envío</h2>
                  <p className="text-[#1E293B]/50 text-[13px] mb-6 leading-relaxed max-w-[90%]">¿Cómo te gustaría recibir tus kits?</p>
                  <div className="flex flex-col gap-3 mb-6">
                    {shippings.map((opt, idx) => {
                      const isSelected = selectedShipping === idx;
                      const Icon = opt.icon;
                      return (
                        <div key={idx} onClick={() => setSelectedShipping(idx)} className={`flex gap-4 p-4 rounded-[1.25rem] border-[1.5px] cursor-pointer transition-all ${isSelected ? 'border-[#1E293B] bg-[#1E293B]' : 'border-[#1E293B]/10 bg-white hover:border-[#1E293B]/20'}`}>
                          <div className={`mt-0.5 transition-colors ${isSelected ? 'text-white' : 'text-[#1E293B]/60'}`}>
                            <Icon size={22} strokeWidth={1.5} />
                          </div>
                          <div>
                            <h4 className={`font-medium text-[15px] ${isSelected ? 'text-white' : 'text-[#1E293B]'}`}>{opt.title}</h4>
                            <p className={`text-[13px] mt-0.5 leading-snug ${isSelected ? 'text-white/80' : 'text-[#1E293B]/50'}`}>{opt.desc}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {selectedShipping === 0 && (
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-2 text-[#1E293B]">Dirección de entrega <span className="text-red-500">*</span></label>
                      <input 
                        type="text" 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Ej. San Martín 123, Tucumán"
                        className="w-full bg-[#F8F9FA] border border-transparent rounded-2xl px-5 py-4 focus:outline-none focus:bg-white focus:border-[#1C1C1C] transition-all text-[#1E293B] placeholder-gray-400"
                      />
                    </div>
                  )}

                  <button onClick={handleNext} disabled={selectedShipping === 0 && address.trim() === ''} className="w-full bg-[#1E293B] text-white py-4 rounded-2xl font-medium text-[15px] hover:bg-black transition-colors shadow-lg shadow-black/10 disabled:opacity-50 disabled:cursor-not-allowed">Continuar</button>
                </motion.div>
              )}

              {/* STEP 4: SUMMARY & SEND */}
              {step === 4 && (
                <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col">
                  <h2 className="text-[28px] font-medium tracking-tight text-[#1E293B] mb-2 leading-tight">Resumen de tu pedido</h2>
                  <p className="text-[#1E293B]/50 text-[13px] mb-6 leading-relaxed max-w-[90%]">Revisá los datos antes de enviarnos un mensaje para finalizar la compra.</p>
                  
                  <div className="bg-[#F8F9FA] rounded-[1.25rem] p-5 mb-8 border border-gray-100 flex flex-col gap-3 text-[14px]">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-[#1E293B]/60">Producto</span>
                      <span className="font-medium text-[#1E293B] text-right">{products[selectedProduct].title}</span>
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

                  <div className="flex flex-col gap-3">
                    <button onClick={handleWhatsApp} className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-medium text-[15px] hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-3">
                      <MessagesSquare size={20} />
                      Enviar pedido por WhatsApp
                    </button>
                    <button onClick={handleEmail} className="w-full bg-transparent border-2 border-[#1E293B] text-[#1E293B] py-3.5 rounded-2xl font-medium text-[15px] hover:bg-[#1E293B] hover:text-white transition-colors flex items-center justify-center gap-3">
                      <Mail size={20} />
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
