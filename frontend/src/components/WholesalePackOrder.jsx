import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

const WholesalePackOrder = () => {
  const navigate = useNavigate();
  const { settings } = useSettings();

  // Pack x10 is 'MÁS ELEGIDO' by default as requested
  const [selectedPackId, setSelectedPackId] = useState('x10');

  const packs = [
    {
      id: 'x10',
      qty: 10,
      title: 'Pack x10 Kits Quirúrgicos',
      subtitle: '$9.500 por procedimiento • Lista oficial',
      price: 95000,
      isCustomQuote: false,
      savingsBadge: 'Tarifa Oficial',
      topBadge: {
        text: 'MÁS ELEGIDO',
        className: 'bg-[#0B1E22] text-[#34D399]',
      },
    },
    {
      id: 'x20',
      qty: 20,
      title: 'Pack x20 Kits Quirúrgicos',
      subtitle: '$9.500 por procedimiento • Abastecimiento para clínicas',
      price: 190000,
      isCustomQuote: false,
      savingsBadge: 'Pack Clínico',
      topBadge: {
        text: 'IDEAL CLÍNICAS',
        className: 'bg-[#0D9488] text-white',
      },
    },
    {
      id: 'x30',
      qty: 30,
      title: 'Pack x30 Kits Quirúrgicos',
      subtitle: 'Consultar promoción descuento mayorista',
      price: null,
      priceLabel: 'Consultar Promo',
      isCustomQuote: true,
      savingsBadge: 'Mayorista',
      topBadge: {
        text: 'DESCUENTO MAYORISTA',
        className: 'bg-[#059669] text-white',
      },
    },
  ];

  const currentPack = packs.find(p => p.id === selectedPackId) || packs[0];

  const formatCurrency = (val) => '$' + Number(val).toLocaleString('es-AR');

  // Subtotal calculation (direct price per pack)
  const isCustom = currentPack.isCustomQuote;
  const subtotal = isCustom ? null : currentPack.price;

  const handleOrder = () => {
    navigate('/cargarproductos', {
      state: {
        quantity: currentPack.qty || 10,
        packId: currentPack.id,
        step: 3, // Paso 3: 'Cantidad'
      },
    });
  };

  return (
    <section
      className="wholesale-order-container relative w-full rounded-3xl sm:rounded-[2.5rem] bg-[#FAF8F5] text-[#1E293B] p-5 sm:p-8 md:p-12 lg:p-14 mb-14 sm:mb-20 shadow-2xl border border-[#E9E4D9] overflow-hidden"
      style={{ fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        .wholesale-order-container,
        .wholesale-order-container * {
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif !important;
          letter-spacing: normal;
        }
      `}</style>

      {/* Decorative subtle ambient lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#88C9C4]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#3E9B94]/8 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 relative z-10">
        <span className="text-[#0D9488] font-bold text-xs sm:text-sm tracking-widest uppercase mb-2 sm:mb-3 block">
          ESCALA PARA CLÍNICAS E INSTITUCIONES
        </span>
        <h2 className="font-extrabold text-2xl sm:text-4xl md:text-[2.65rem] text-[#111827] tracking-tight leading-tight mb-2 sm:mb-3">
          Elegí tu pack quirúrgico con descuento mayorista
        </h2>
        <p className="text-xs sm:text-base text-[#4B5563] font-normal max-w-xl mx-auto leading-relaxed">
          Equipá tu sala de cirugía con la mejor tarifa unitaria y stock garantizado.
        </p>
      </div>

      {/* TWO COLUMNS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start relative z-10">

        {/* LEFT COLUMN: Visual & Features */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-4 sm:p-5 shadow-sm border border-[#EAE5DA] flex flex-col">
          {/* Main Kit Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/11 bg-slate-100 group">
            <img
              src="/images/IMAGEN6.webp"
              alt="Kit quirúrgico desplegado en quirófano"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
            />
            {/* Pill bottom-left */}
            <div className="absolute bottom-3 left-3 sm:bottom-3.5 sm:left-3.5 bg-[#0B1E22]/85 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-semibold px-3 py-1 rounded-full shadow-md">
              Contenido desplegado en quirófano
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-5 sm:mt-6 space-y-3.5 px-1 sm:px-2 pb-1">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#E0F2FE]/80 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5 border border-[#99F6E4]/50">
                <Check className="w-3.5 h-3.5 stroke-3" />
              </div>
              <p className="text-xs sm:text-sm text-[#374151] leading-snug">
                <strong className="text-[#111827] font-semibold">Batas SMS 45g de alta densidad:</strong> Repelentes a fluidos y transpirables.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#E0F2FE]/80 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5 border border-[#99F6E4]/50">
                <Check className="w-3.5 h-3.5 stroke-3" />
              </div>
              <p className="text-xs sm:text-sm text-[#374151] leading-snug">
                <strong className="text-[#111827] font-semibold">Campos Impermeables bilaminados:</strong> Máxima esterilidad del área operatoria.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#E0F2FE]/80 text-[#0D9488] flex items-center justify-center shrink-0 mt-0.5 border border-[#99F6E4]/50">
                <Check className="w-3.5 h-3.5 stroke-3" />
              </div>
              <p className="text-xs sm:text-sm text-[#374151] leading-snug">
                <strong className="text-[#111827] font-semibold">Envasado doble termosellado:</strong> Garantiza 2 años de esterilidad.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Pack Options & Checkout Action */}
        <div className="lg:col-span-7 flex flex-col gap-3.5 sm:gap-4">

          {/* PACK OPTIONS */}
          <div className="space-y-3.5">
            {packs.map((pack) => {
              const isSelected = selectedPackId === pack.id;

              return (
                <div
                  key={pack.id}
                  onClick={() => setSelectedPackId(pack.id)}
                  className={`relative rounded-2xl transition-all duration-200 cursor-pointer select-none bg-white ${
                    isSelected
                      ? 'border-2 border-[#10B981] shadow-md ring-2 ring-[#10B981]/15'
                      : 'border border-[#E5E7EB] hover:border-[#10B981]/50 shadow-xs'
                  }`}
                >
                  {/* Top Floating Badge */}
                  {pack.topBadge && (
                    <div
                      className={`absolute -top-3 right-4 sm:right-6 text-[10px] sm:text-[11px] font-extrabold uppercase px-3 py-0.5 rounded-full shadow-md tracking-wider ${pack.topBadge.className}`}
                    >
                      {pack.topBadge.text}
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-3.5 sm:p-4">
                    <div className="flex items-center justify-between gap-3">

                      {/* Left: Thumbnail + Title & Subtitle */}
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Thumbnail */}
                        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-xl bg-slate-50 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                          <img
                            src="/images/IMAGEN6.webp"
                            alt={pack.title}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>

                        {/* Text info */}
                        <div className="min-w-0">
                          <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                            <h3 className="font-bold text-sm sm:text-[15px] text-[#111827] leading-snug">
                              {pack.title}
                            </h3>
                            {pack.savingsBadge && (
                              <span className="bg-[#DCFCE7] text-[#15803D] text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md">
                                {pack.savingsBadge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#6B7280] font-normal truncate mt-0.5">
                            {pack.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Right: Prices */}
                      <div className="text-right shrink-0">
                        {pack.price !== null ? (
                          <div
                            className={`font-extrabold text-base sm:text-xl leading-none ${
                              isSelected ? 'text-[#059669]' : 'text-[#111827]'
                            }`}
                          >
                            {formatCurrency(pack.price)}
                          </div>
                        ) : (
                          <div
                            className={`font-bold text-xs sm:text-sm leading-none px-2.5 py-1 rounded-lg ${
                              isSelected ? 'bg-[#059669] text-white' : 'bg-slate-100 text-[#059669]'
                            }`}
                          >
                            {pack.priceLabel}
                          </div>
                        )}
                        <div className="text-[10.5px] sm:text-[11px] text-[#9CA3AF] mt-0.5 font-medium">
                          {pack.isCustomQuote ? 'Consultar precio' : `$9.500 / kit`}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Subtotal Bar */}
          <div className="bg-[#EAE4D9]/80 border border-[#DDD5C7] rounded-2xl p-4 sm:p-4.5 flex items-center justify-between mt-1">
            <span className="text-xs sm:text-sm font-semibold text-[#4B5563]">
              Subtotal estimado:
            </span>
            <span className="font-extrabold text-xl sm:text-2xl text-[#111827]">
              {subtotal !== null ? formatCurrency(subtotal) : 'Consultar Descuento'}
            </span>
          </div>

          {/* Main CTA Button: COMPRAR AHORA */}
          <button
            onClick={handleOrder}
            className="w-full py-4 px-6 rounded-2xl bg-[#059669] hover:bg-[#047857] active:scale-[0.99] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#059669]/30 transition-all cursor-pointer"
          >
            <Check className="w-5 h-5 stroke-[2.5]" />
            <span>Comprar ahora</span>
          </button>

          {/* Footer Guarantee Info */}
          <p className="text-center text-[10.5px] sm:text-xs text-[#6B7280] font-medium leading-relaxed">
            Factura A o B inmediata • Despacho en el día para pedidos confirmados antes de las 13:00hs
          </p>

        </div>
      </div>
    </section>
  );
};

export default WholesalePackOrder;
