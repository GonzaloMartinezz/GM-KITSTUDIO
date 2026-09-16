import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle, ArrowUpRight, Code2 } from 'lucide-react';

const InstagramIcon = ({ size = 18, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-brand-4 text-brand-1 py-12 sm:py-16 border-t border-brand-3/20 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#88C9C4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#0C3B45]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-center">

          {/* ── COLUMNA 1 (IZQUIERDA): LOGO OFICIAL GM KIT STUDIO ── */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link
              to="/"
              className="group inline-flex items-center gap-3.5 transition-transform duration-300 hover:scale-[1.02]"
              title="GM Kit Studio - Inicio"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-black/60 border-2 border-brand-3/30 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.3)] group-hover:border-[#88C9C4] group-hover:shadow-[0_0_25px_rgba(136,201,196,0.3)] transition-all duration-300 flex items-center justify-center shrink-0">
                <img
                  src="/images/LOGOia.png"
                  alt="GM Kit Studio Logo"
                  className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
                />
              </div>

              <div>
                <span className="font-bebas text-2xl sm:text-3xl text-brand-1 tracking-wider block leading-none">
                  GM KIT <span className="text-brand-2">STUDIO</span>
                </span>
                <span className="text-[11px] font-geist text-brand-1/70 font-semibold tracking-wider uppercase mt-1 block">
                  Bioseguridad Quirúrgica
                </span>
                <span className="inline-block mt-1.5 text-[10px] bg-brand-1/10 text-brand-2 px-2.5 py-0.5 rounded-full border border-brand-2/20 font-bold uppercase tracking-wider">
                  Tucumán & NOA
                </span>
              </div>
            </Link>

            <p className="font-geist text-xs text-brand-1/60 mt-3.5 max-w-xs leading-relaxed">
              Distribución oficial de kits odontológicos descartables estériles de alta barrera para cirugías y consultorios.
            </p>
          </div>

          {/* ── COLUMNA 2 (MEDIO): MARCA, DESCRIPCIÓN & DESARROLLADO POR ── */}
          <div className="flex flex-col items-center justify-center text-center px-2">
            <h2 className="font-bebas text-3xl sm:text-4xl text-brand-2 tracking-wider mb-2">
              GM KIT STUDIO
            </h2>
            <p className="font-geist text-xs sm:text-sm text-brand-1/75 max-w-md mx-auto mb-4 leading-relaxed">
              El aliado estratégico en bioseguridad para consultorios odontológicos y cirujanos en Tucumán.
            </p>

            {/* Crédito: Desarrollado por GonzaloMartinezDev */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-1/10 border border-brand-1/15 text-xs text-brand-1/90 mb-3 shadow-2xs hover:bg-brand-1/15 transition-all">
              <Code2 size={13} className="text-[#88C9C4]" />
              <span className="text-brand-1/70">Desarrollado por</span>
              <a
                href="https://github.com/GonzaloMartinezz"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#88C9C4] hover:text-white hover:underline transition-colors tracking-wide"
                title="Perfil de GonzaloMartinezDev"
              >
                GonzaloMartinezDev
              </a>
            </div>

            <p className="font-changa text-xs text-brand-1/40 tracking-wider">
              &copy; 2026 Todos los derechos reservados.
            </p>
          </div>

          {/* ── COLUMNA 3 (DERECHA): 4 BOTONES RECTÁNGULOS REDONDEADOS ── */}
          <div className="flex flex-col gap-2.5 items-center md:items-end w-full">

            {/* 1. WHATSAPP (VERDE) */}
            <a
              href="https://wa.me/5493816242482?text=¡Hola!%20Quiero%20más%20información%20sobre%20los%20kits%20quirúrgicos%20de%20GM%20Kit%20Studio."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs px-4 py-2.5 rounded-2xl bg-[#25D366]/15 hover:bg-[#25D366] text-white border border-[#25D366]/40 hover:border-[#25D366] transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-[0_4px_20px_rgba(37,211,102,0.4)] active:scale-[0.98] cursor-pointer"
              title="Contactar por WhatsApp Oficial"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <MessageCircle size={17} />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block leading-tight text-white">WhatsApp</span>
                  <span className="text-[10px] text-white/70 block leading-tight">+54 9 381 624-2482</span>
                </div>
              </div>
              <ArrowUpRight size={15} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* 2. INSTAGRAM PERSONAL */}
            <a
              href="https://www.instagram.com/gonchi_martinezz/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs px-4 py-2.5 rounded-2xl bg-linear-to-r from-[#833ab4]/15 via-[#fd1d1d]/15 to-[#fcb045]/15 hover:from-[#833ab4] hover:via-[#fd1d1d] hover:to-[#fcb045] text-white border border-pink-500/35 hover:border-transparent transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-[0_4px_20px_rgba(225,48,108,0.4)] active:scale-[0.98] cursor-pointer"
              title="Instagram Personal: @gonchi_martinezz"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <InstagramIcon size={17} />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block leading-tight text-white">Instagram Personal</span>
                  <span className="text-[10px] text-white/70 block leading-tight">@gonchi_martinezz</span>
                </div>
              </div>
              <ArrowUpRight size={15} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* 3. INSTAGRAM STUDIO DENTAL */}
            <a
              href="https://www.instagram.com/studiodentalcarcaramartinez/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full max-w-xs px-4 py-2.5 rounded-2xl bg-[#88C9C4]/15 hover:bg-[#88C9C4] text-white hover:text-[#0C3B45] border border-[#88C9C4]/40 hover:border-[#88C9C4] transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-[0_4px_20px_rgba(136,201,196,0.35)] active:scale-[0.98] cursor-pointer"
              title="Instagram Studio Dental Carcara Martinez"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#88C9C4] text-[#0C3B45] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <InstagramIcon size={17} />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block leading-tight text-white group-hover:text-[#0C3B45] transition-colors">
                    Instagram Studio Dental
                  </span>
                  <span className="text-[10px] text-white/70 group-hover:text-[#0C3B45]/80 block leading-tight transition-colors">
                    @studiodentalcarcaramartinez
                  </span>
                </div>
              </div>
              <ArrowUpRight size={15} className="text-white/60 group-hover:text-[#0C3B45] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

            {/* 4. GMAIL (ROJO) */}
            <a
              href="mailto:gonchimartinez9@gmail.com?subject=Consulta%20GM%20Kit%20Studio"
              className="w-full max-w-xs px-4 py-2.5 rounded-2xl bg-[#EA4335]/15 hover:bg-[#EA4335] text-white border border-[#EA4335]/40 hover:border-[#EA4335] transition-all duration-300 flex items-center justify-between group shadow-sm hover:shadow-[0_4px_20px_rgba(234,67,53,0.4)] active:scale-[0.98] cursor-pointer"
              title="Enviar correo a gonchimartinez9@gmail.com"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#EA4335] text-white flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-sm">
                  <Mail size={17} />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block leading-tight text-white">Gmail</span>
                  <span className="text-[10px] text-white/70 block leading-tight">gonchimartinez9@gmail.com</span>
                </div>
              </div>
              <ArrowUpRight size={15} className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>

          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
