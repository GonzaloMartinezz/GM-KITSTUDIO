import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * Si algo se rompe adentro de una pantalla del admin (un error de JS que
 * antes dejaba la pagina completamente en blanco sin ninguna explicacion),
 * esto lo agarra y muestra un mensaje con un boton para reintentar en vez
 * de una pantalla en blanco.
 */
class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Error en el panel de administrador:', error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (this.props.onReset) this.props.onReset();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center text-center p-8 font-geist">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mb-4">
            <AlertTriangle size={28} />
          </div>
          <h2 className="text-lg font-bold text-[#0F172A] mb-1">Ocurrió un error en esta pantalla</h2>
          <p className="text-sm text-[#64748B] max-w-md mb-5">
            Algo falló al mostrar esta sección del panel. Tus datos en la base no se perdieron — probá recargar. Si el problema sigue, avisale a soporte con el detalle de abajo.
          </p>
          <button
            onClick={this.handleReset}
            className="flex items-center gap-2 bg-[#1E5A9C] hover:bg-[#16487D] text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all cursor-pointer"
          >
            <RefreshCw size={16} />
            Reintentar
          </button>
          {this.state.error?.message && (
            <pre className="mt-5 max-w-lg text-[11px] text-left text-[#94A3B8] bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3 overflow-x-auto">
              {this.state.error.message}
            </pre>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default AdminErrorBoundary;
