import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';

const CONSENT_KEY = 'gm_cookie_consent_v1';

/**
 * Banner simple de consentimiento de cookies (sesión vía cookies HttpOnly).
 * Solo guarda un flag local — no maneja datos personales.
 */
const SiteNotice = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(CONSENT_KEY);
      if (!consent) setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(CONSENT_KEY, 'accepted');
    } catch {
      /* noop */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-999 p-0 sm:p-4 flex justify-center pointer-events-none">
      <div className="pointer-events-auto max-w-2xl w-full bg-[#1e2f3e] text-white sm:rounded-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] px-4 py-3.5 sm:px-5 sm:py-4 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 border-t border-white/10 sm:border-none">
        <ShieldCheck className="hidden sm:block w-6 h-6 text-[#88C9C4] shrink-0" />
        <p className="text-[11px] leading-tight sm:text-sm text-white/90 flex-1 text-center sm:text-left">
          Usamos cookies para mantener tu sesión segura. Al navegar aceptás su uso.
        </p>
        <button
          onClick={accept}
          className="w-full sm:w-auto shrink-0 bg-[#88C9C4] text-[#0C3B45] text-[10px] sm:text-xs font-bold uppercase tracking-wide px-5 py-2 rounded-lg sm:rounded-full hover:bg-white transition-colors"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default SiteNotice;
