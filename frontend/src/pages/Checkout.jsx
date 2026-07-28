import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, MessageCircle, ArrowLeft, CheckCircle, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  });

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const submitWhatsApp = () => {
    const text = `Hola GM Kit Studio! Mi nombre es ${formData.name}. Me interesa hacer un pedido a la dirección ${formData.address}. Mi teléfono es ${formData.phone}.`;
    window.open(`https://wa.me/5493815000000?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-brand-5 text-brand-1 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center gap-2 text-brand-3 hover:text-brand-2 mb-8 transition-colors font-changa">
          <ArrowLeft className="w-5 h-5" />
          Volver al catálogo
        </Link>

        <div className="bg-brand-4 rounded-3xl shadow-2xl p-8 border border-brand-3/20">
          <h1 className="text-4xl font-bebas text-brand-2 mb-8 text-center">FINALIZAR COMPRA</h1>

          {/* Progress Steps */}
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bebas text-xl ${step >= 1 ? 'bg-brand-3 text-brand-5' : 'bg-brand-5 text-brand-1/50'}`}>1</div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-brand-3' : 'bg-brand-5'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bebas text-xl ${step >= 2 ? 'bg-brand-3 text-brand-5' : 'bg-brand-5 text-brand-1/50'}`}>2</div>
              <div className={`w-16 h-1 ${step >= 3 ? 'bg-brand-3' : 'bg-brand-5'}`}></div>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bebas text-xl ${step >= 3 ? 'bg-brand-3 text-brand-5' : 'bg-brand-5 text-brand-1/50'}`}>3</div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-changa mb-6 text-center">Mis Datos de Envío</h2>
                <div className="space-y-4 max-w-lg mx-auto font-geist">
                  <div>
                    <label className="block text-sm mb-1 text-brand-1/70">Nombre Completo</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-brand-5 border border-brand-3/30 rounded-xl p-3 focus:outline-none focus:border-brand-2" placeholder="Dr. Juan Pérez" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-brand-1/70">Teléfono</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-brand-5 border border-brand-3/30 rounded-xl p-3 focus:outline-none focus:border-brand-2" placeholder="381..." />
                  </div>
                  <div>
                    <label className="block text-sm mb-1 text-brand-1/70">Dirección de Entrega</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full bg-brand-5 border border-brand-3/30 rounded-xl p-3 focus:outline-none focus:border-brand-2" placeholder="Calle Falsa 123, Tucumán" />
                  </div>
                  <button onClick={() => setStep(2)} disabled={!formData.name || !formData.phone || !formData.address} className="w-full mt-6 bg-brand-3 hover:bg-brand-2 text-brand-5 py-4 rounded-xl font-bebas text-2xl transition-colors disabled:opacity-50">
                    CONTINUAR
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-changa mb-6 text-center">Método de Pago</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`cursor-pointer p-6 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${paymentMethod === 'whatsapp' ? 'border-brand-2 bg-brand-5' : 'border-brand-3/30 hover:border-brand-3'}`}
                  >
                    <MessageCircle className={`w-12 h-12 mb-4 ${paymentMethod === 'whatsapp' ? 'text-brand-2' : 'text-brand-1/50'}`} />
                    <h3 className="font-bebas text-xl">Coordinar por WhatsApp</h3>
                    <p className="font-geist text-xs mt-2 text-brand-1/70">Transferencia o Efectivo contra entrega</p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setPaymentMethod('card')}
                    className={`cursor-pointer p-6 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${paymentMethod === 'card' ? 'border-brand-2 bg-brand-5' : 'border-brand-3/30 hover:border-brand-3'}`}
                  >
                    <CreditCard className={`w-12 h-12 mb-4 ${paymentMethod === 'card' ? 'text-brand-2' : 'text-brand-1/50'}`} />
                    <h3 className="font-bebas text-xl">Tarjeta de Crédito / Débito</h3>
                    <p className="font-geist text-xs mt-2 text-brand-1/70">Pago seguro online</p>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setPaymentMethod('mercadopago')}
                    className={`cursor-pointer p-6 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${paymentMethod === 'mercadopago' ? 'border-brand-2 bg-brand-5' : 'border-brand-3/30 hover:border-brand-3'}`}
                  >
                    <Smartphone className={`w-12 h-12 mb-4 ${paymentMethod === 'mercadopago' ? 'text-brand-2' : 'text-brand-1/50'}`} />
                    <h3 className="font-bebas text-xl">Mercado Pago</h3>
                    <p className="font-geist text-xs mt-2 text-brand-1/70">Dinero en cuenta</p>
                  </motion.div>
                </div>

                <div className="flex justify-between max-w-3xl mx-auto mt-10">
                  <button onClick={() => setStep(1)} className="text-brand-1/70 hover:text-brand-1 font-changa px-6 py-2">Atrás</button>
                  <button onClick={() => setStep(3)} disabled={!paymentMethod} className="bg-brand-3 hover:bg-brand-2 text-brand-5 px-10 py-3 rounded-xl font-bebas text-xl transition-colors disabled:opacity-50">
                    SIGUIENTE
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-lg mx-auto"
              >
                <div className="bg-brand-5 rounded-2xl p-8 border-2 border-brand-2/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-2/10 rounded-full blur-3xl"></div>
                  
                  <h2 className="text-3xl font-bebas mb-6 text-brand-2 flex items-center gap-3">
                    <CheckCircle className="w-8 h-8" />
                    VERIFICACIÓN DE DATOS
                  </h2>
                  
                  <div className="space-y-4 font-geist mb-8">
                    <p><strong className="text-brand-3">Nombre:</strong> {formData.name}</p>
                    <p><strong className="text-brand-3">Teléfono:</strong> {formData.phone}</p>
                    <p><strong className="text-brand-3">Entrega:</strong> {formData.address}</p>
                    <p><strong className="text-brand-3">Método:</strong> {paymentMethod === 'whatsapp' ? 'Coordinar WhatsApp' : paymentMethod === 'card' ? 'Tarjeta' : 'Mercado Pago'}</p>
                  </div>

                  {paymentMethod === 'card' && (
                    <div className="mb-8 p-4 bg-brand-4 rounded-xl border border-brand-3/30 font-geist">
                      <h4 className="font-bebas text-xl mb-4 text-brand-2">Datos de Tarjeta</h4>
                      <input type="text" placeholder="Número de Tarjeta" className="w-full mb-3 bg-brand-5 border border-brand-3/30 rounded-lg p-2 focus:outline-none" />
                      <div className="flex gap-3">
                        <input type="text" placeholder="MM/AA" className="w-1/2 bg-brand-5 border border-brand-3/30 rounded-lg p-2 focus:outline-none" />
                        <input type="text" placeholder="CVC" className="w-1/2 bg-brand-5 border border-brand-3/30 rounded-lg p-2 focus:outline-none" />
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4">
                    <p className="text-sm text-center text-brand-1/70 mb-2">¿Estás seguro que los datos ingresados son correctos?</p>
                    
                    {paymentMethod === 'whatsapp' ? (
                      <button onClick={submitWhatsApp} className="w-full bg-[#25D366] hover:bg-[#20b858] text-white py-4 rounded-xl font-bebas text-2xl transition-colors shadow-lg shadow-[#25D366]/20 flex items-center justify-center gap-2">
                        <MessageCircle className="w-6 h-6" /> ENVIAR PEDIDO POR WHATSAPP
                      </button>
                    ) : (
                      <button className="w-full bg-brand-3 hover:bg-brand-2 text-brand-5 py-4 rounded-xl font-bebas text-2xl transition-colors shadow-lg shadow-brand-3/20">
                        CONFIRMAR PAGO SEGURO
                      </button>
                    )}
                    
                    <button onClick={() => setStep(2)} className="text-brand-1/50 hover:text-brand-1 font-changa mt-2">
                      No, quiero corregir algo
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
