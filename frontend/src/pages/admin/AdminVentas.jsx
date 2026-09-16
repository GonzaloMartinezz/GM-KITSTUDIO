import React, { useState } from 'react';
import AdminTopbar from '../../components/admin/AdminTopbar';
import { 
  Briefcase, 
  Wallet, 
  Trophy, 
  Target, 
  Search, 
  Download, 
  Plus, 
  Filter, 
  ChevronDown, 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  MoreHorizontal,
  X,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const AdminVentas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStage, setSelectedStage] = useState('Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [selectedOwner, setSelectedOwner] = useState('Todos');
  const [sortBy, setSortBy] = useState('recent');
  const [currentPage, setCurrentPage] = useState(1);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);

  // New Deal Form State
  const [newDeal, setNewDeal] = useState({
    dealName: '',
    company: '',
    value: '',
    stage: 'Propuesta',
    owner: 'Gonzalo M.',
    expectedClose: '24 Sep, 2026',
    status: 'Activo',
  });

  // Initial Deals list matching reference mockup structure
  const [deals, setDeals] = useState([
    {
      id: 1,
      dealName: 'Lote Kits Odontológicos x50',
      company: 'Centro Odontológico San Miguel',
      value: 725000,
      stage: 'Propuesta',
      owner: 'Gonzalo M.',
      ownerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
      expectedClose: '18 Sep, 2026',
      status: 'Activo',
    },
    {
      id: 2,
      dealName: 'Camisolines SMS Quirúrgicos x100',
      company: 'Clínica Quirúrgica Norte',
      value: 420000,
      stage: 'Negociación',
      owner: 'Elena Sánchez',
      ownerImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80',
      expectedClose: '22 Sep, 2026',
      status: 'Pendiente',
    },
    {
      id: 3,
      dealName: 'Kit Cirugía e Implantes x20',
      company: 'Implantes Tucumán (Yerba Buena)',
      value: 290000,
      stage: 'Calificado',
      owner: 'Carlos Ruiz',
      ownerImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80',
      expectedClose: '25 Sep, 2026',
      status: 'Cerrado',
    },
    {
      id: 4,
      dealName: 'Campos Quirúrgicos 100x100 x80',
      company: 'Instituto Odontológico NOA',
      value: 304000,
      stage: 'Concretado',
      owner: 'Gonzalo M.',
      ownerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
      expectedClose: '15 Sep, 2026',
      status: 'Cerrado',
    },
    {
      id: 5,
      dealName: 'Kits Odontológicos Completos x15',
      company: 'Consultorios Av. Aconquija',
      value: 217500,
      stage: 'Lead',
      owner: 'Elena Sánchez',
      ownerImg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&q=80',
      expectedClose: '28 Sep, 2026',
      status: 'Activo',
    },
    {
      id: 6,
      dealName: 'Kit Descartable Integral x30',
      company: 'Sanatorio Regional del Norte',
      value: 435000,
      stage: 'Propuesta',
      owner: 'Gonzalo M.',
      ownerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
      expectedClose: '30 Sep, 2026',
      status: 'Activo',
    },
    {
      id: 7,
      dealName: 'Cofias y Cubrecalzados x500',
      company: 'Odontología Integral Barrio Sur',
      value: 125000,
      stage: 'Calificado',
      owner: 'Carlos Ruiz',
      ownerImg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&q=80',
      expectedClose: '02 Oct, 2026',
      status: 'Pendiente',
    },
  ]);

  // Stage dot colors matching reference image
  const getStageBadge = (stage) => {
    switch (stage) {
      case 'Propuesta':
        return (
          <span className="flex items-center gap-1.5 font-medium text-xs text-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#EA580C]"></span>
            Propuesta
          </span>
        );
      case 'Negociación':
        return (
          <span className="flex items-center gap-1.5 font-medium text-xs text-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#D97706]"></span>
            Negociación
          </span>
        );
      case 'Calificado':
        return (
          <span className="flex items-center gap-1.5 font-medium text-xs text-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]"></span>
            Calificado
          </span>
        );
      case 'Concretado':
        return (
          <span className="flex items-center gap-1.5 font-medium text-xs text-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#10B981]"></span>
            Concretado
          </span>
        );
      case 'Lead':
      default:
        return (
          <span className="flex items-center gap-1.5 font-medium text-xs text-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#64748B]"></span>
            Lead
          </span>
        );
    }
  };

  // Status pill colors
  const getStatusPill = (status) => {
    switch (status) {
      case 'Activo':
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#ECFDF5] text-[#059669]">
            Activo
          </span>
        );
      case 'Pendiente':
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FFFBEB] text-[#D97706]">
            Pendiente
          </span>
        );
      case 'Cerrado':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F1F5F9] text-[#475569]">
            Cerrado
          </span>
        );
    }
  };

  // Filter & Sort logic
  const filteredDeals = deals
    .filter((d) => {
      const matchesSearch =
        d.dealName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.owner.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStage = selectedStage === 'Todos' || d.stage === selectedStage;
      const matchesStatus = selectedStatus === 'Todos' || d.status === selectedStatus;
      const matchesOwner = selectedOwner === 'Todos' || d.owner === selectedOwner;

      return matchesSearch && matchesStage && matchesStatus && matchesOwner;
    })
    .sort((a, b) => {
      if (sortBy === 'value-high') return b.value - a.value;
      if (sortBy === 'value-low') return a.value - b.value;
      return b.id - a.id; // recent
    });

  // Export CSV
  const handleExportCSV = () => {
    let csv = "ID,Pedido / Oportunidad,Clinica,Valor,Etapa,Responsable,Fecha Entrega,Estado\n";
    filteredDeals.forEach((d) => {
      csv += `"${d.id}","${d.dealName}","${d.company}","${d.value}","${d.stage}","${d.owner}","${d.expectedClose}","${d.status}"\n`;
    });
    const encodedUri = encodeURI("data:text/csv;charset=utf-8," + csv);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `gm_ventas_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Add Deal
  const handleCreateDeal = (e) => {
    e.preventDefault();
    if (!newDeal.dealName || !newDeal.company || !newDeal.value) return;

    const dealToAdd = {
      id: Date.now(),
      dealName: newDeal.dealName,
      company: newDeal.company,
      value: parseFloat(newDeal.value.replace(/[^0-9.]/g, '')) || 150000,
      stage: newDeal.stage,
      owner: newDeal.owner,
      ownerImg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&q=80',
      expectedClose: newDeal.expectedClose || 'Próxima semana',
      status: newDeal.status,
    };

    setDeals([dealToAdd, ...deals]);
    setIsNewModalOpen(false);
    setNewDeal({
      dealName: '',
      company: '',
      value: '',
      stage: 'Propuesta',
      owner: 'Gonzalo M.',
      expectedClose: '24 Sep, 2026',
      status: 'Activo',
    });
  };

  // Calculate dynamic metrics
  const totalPipeline = deals.reduce((acc, curr) => acc + curr.value, 0);
  const wonDealsCount = deals.filter((d) => d.stage === 'Concretado' || d.status === 'Cerrado').length;

  return (
    <div className="w-full h-full font-geist flex flex-col relative pb-12">
      
      {/* Top Bar Navigation */}
      <AdminTopbar />

      {/* Header matching reference mockup */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
            Ventas y Oportunidades
          </h1>
          <p className="text-[#64748B] text-xs sm:text-sm mt-0.5">
            Monitoreo en tiempo real de cotizaciones, pedidos y acuerdos comerciales.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Export Button */}
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#E2E8F0] px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Download size={14} />
            <span>Exportar</span>
          </button>

          {/* Add Deal Button */}
          <button
            onClick={() => setIsNewModalOpen(true)}
            className="flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all cursor-pointer"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>+ Nuevo Pedido</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards matching reference mockup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5 mb-6">
        
        {/* Card 1: Total Deals */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#64748B]">Total Pedidos</span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
              <Briefcase size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              {deals.length * 18}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#10B981] flex items-center gap-0.5">
                <TrendingUp size={12} /> +12.5%
              </span>
              <span className="text-[#64748B]">vs mes anterior</span>
            </div>
          </div>
        </div>

        {/* Card 2: Pipeline Value */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#64748B]">Valor en Pipeline</span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
              <Wallet size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              ${totalPipeline.toLocaleString('es-AR')}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#10B981] flex items-center gap-0.5">
                <TrendingUp size={12} /> +$142.800
              </span>
              <span className="text-[#64748B]">vs mes anterior</span>
            </div>
          </div>
        </div>

        {/* Card 3: Won Deals */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#64748B]">Ventas Concretadas</span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
              <Trophy size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              {wonDealsCount * 12 + 14}
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#10B981] flex items-center gap-0.5">
                <TrendingUp size={12} /> +6 ventas
              </span>
              <span className="text-[#64748B]">vs mes anterior</span>
            </div>
          </div>
        </div>

        {/* Card 4: Win Rate */}
        <div className="bg-white rounded-2xl p-5 border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] flex flex-col justify-between hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-[#64748B]">Tasa de Conversión</span>
            <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] text-[#10B981] flex items-center justify-center">
              <Target size={16} />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold text-[#0F172A] tracking-tight mb-2">
              34.8%
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-bold text-[#10B981] flex items-center gap-0.5">
                <TrendingUp size={12} /> +2.4%
              </span>
              <span className="text-[#64748B]">vs mes anterior</span>
            </div>
          </div>
        </div>

      </div>

      {/* Filter Toolbar matching reference mockup */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 mb-5">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar por pedido, clínica, producto..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-xl text-xs sm:text-sm text-[#0F172A] placeholder-[#94A3B8] shadow-xs focus:outline-none focus:border-[#0F172A] transition-all"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Stage Filter */}
          <div className="relative">
            <select
              value={selectedStage}
              onChange={(e) => setSelectedStage(e.target.value)}
              className="appearance-none bg-white border border-[#E2E8F0] text-[#0F172A] pl-3 pr-7 py-2 rounded-xl text-xs font-semibold shadow-xs hover:border-[#CBD5E1] transition-all cursor-pointer outline-none"
            >
              <option value="Todos">Etapa: Todas</option>
              <option value="Propuesta">Propuesta</option>
              <option value="Negociación">Negociación</option>
              <option value="Calificado">Calificado</option>
              <option value="Concretado">Concretado</option>
              <option value="Lead">Lead</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          {/* Owner Filter */}
          <div className="relative">
            <select
              value={selectedOwner}
              onChange={(e) => setSelectedOwner(e.target.value)}
              className="appearance-none bg-white border border-[#E2E8F0] text-[#0F172A] pl-3 pr-7 py-2 rounded-xl text-xs font-semibold shadow-xs hover:border-[#CBD5E1] transition-all cursor-pointer outline-none"
            >
              <option value="Todos">Vendedor: Todos</option>
              <option value="Gonzalo M.">Gonzalo M.</option>
              <option value="Elena Sánchez">Elena Sánchez</option>
              <option value="Carlos Ruiz">Carlos Ruiz</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="appearance-none bg-white border border-[#E2E8F0] text-[#0F172A] pl-3 pr-7 py-2 rounded-xl text-xs font-semibold shadow-xs hover:border-[#CBD5E1] transition-all cursor-pointer outline-none"
            >
              <option value="Todos">Estado: Todos</option>
              <option value="Activo">Activo</option>
              <option value="Pendiente">Pendiente</option>
              <option value="Cerrado">Cerrado</option>
            </select>
            <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" />
          </div>

          <button
            onClick={() => {
              setSelectedStage('Todos');
              setSelectedStatus('Todos');
              setSelectedOwner('Todos');
              setSearchQuery('');
            }}
            title="Resetear filtros"
            className="p-2 bg-white border border-[#E2E8F0] rounded-xl text-[#64748B] hover:text-[#0F172A] shadow-xs cursor-pointer"
          >
            <Filter size={14} />
          </button>
        </div>
      </div>

      {/* Main Table Card matching reference mockup */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-[0_4px_16px_rgba(0,0,0,0.02)] overflow-hidden">
        
        {/* Table Header Row with Total & Sort */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-[#0F172A] tracking-tight">
              Todos los Pedidos y Oportunidades
            </h3>
            <span className="text-xs font-medium text-[#64748B]">
              ({filteredDeals.length} resultados)
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-[#64748B]">
            <span>Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-[#0F172A] border-none outline-none cursor-pointer"
            >
              <option value="recent">Más recientes</option>
              <option value="value-high">Mayor valor</option>
              <option value="value-low">Menor valor</option>
            </select>
          </div>
        </div>

        {/* Table content with scrollable wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-[#F1F5F9] text-[11px] font-bold text-[#64748B] uppercase tracking-wider bg-[#F8FAFC]">
                <th className="py-3.5 pl-6 pr-3">Pedido / Solicitud</th>
                <th className="py-3.5 px-3">Clínica / Empresa</th>
                <th className="py-3.5 px-3">Valor</th>
                <th className="py-3.5 px-3">Etapa</th>
                <th className="py-3.5 px-3">Responsable</th>
                <th className="py-3.5 px-3">Entrega Estimada</th>
                <th className="py-3.5 px-3 text-center">Estado</th>
                <th className="py-3.5 pr-6 pl-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] text-xs">
              {filteredDeals.map((deal) => (
                <tr
                  key={deal.id}
                  className="hover:bg-[#F8FAFC] transition-colors group cursor-default"
                >
                  {/* Deal Name */}
                  <td className="py-4 pl-6 pr-3 font-semibold text-[#0F172A]">
                    {deal.dealName}
                  </td>

                  {/* Company */}
                  <td className="py-4 px-3 text-[#475569] font-medium">
                    {deal.company}
                  </td>

                  {/* Value */}
                  <td className="py-4 px-3 font-extrabold text-[#0F172A]">
                    ${deal.value.toLocaleString('es-AR')}
                  </td>

                  {/* Stage with colored dot */}
                  <td className="py-4 px-3">
                    {getStageBadge(deal.stage)}
                  </td>

                  {/* Owner with avatar */}
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <img
                        src={deal.ownerImg}
                        alt={deal.owner}
                        className="w-6 h-6 rounded-full object-cover border border-[#E2E8F0]"
                      />
                      <span className="text-[#334155] font-medium">{deal.owner}</span>
                    </div>
                  </td>

                  {/* Expected Close */}
                  <td className="py-4 px-3 text-[#64748B] font-medium">
                    {deal.expectedClose}
                  </td>

                  {/* Status Pill */}
                  <td className="py-4 px-3 text-center">
                    {getStatusPill(deal.status)}
                  </td>

                  {/* Actions */}
                  <td className="py-4 pr-6 pl-3 text-right">
                    <button
                      type="button"
                      title="Opciones"
                      className="p-1.5 text-[#94A3B8] hover:text-[#0F172A] hover:bg-[#F1F5F9] rounded-lg transition-all cursor-pointer"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar matching reference mockup */}
        <div className="px-6 py-4 border-t border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
          <span className="text-[#64748B]">
            Mostrando <strong>{filteredDeals.length}</strong> de <strong>{deals.length}</strong> ventas
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-40 cursor-pointer"
            >
              <ChevronsLeft size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft size={14} />
            </button>

            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-7 h-7 rounded-lg font-semibold transition-all cursor-pointer ${
                  currentPage === page
                    ? 'bg-[#10B981] text-white shadow-xs'
                    : 'text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(Math.min(5, currentPage + 1))}
              disabled={currentPage === 5}
              className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setCurrentPage(5)}
              disabled={currentPage === 5}
              className="p-1.5 rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] disabled:opacity-40 cursor-pointer"
            >
              <ChevronsRight size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* Modal: + Nuevo Pedido / Venta */}
      {isNewModalOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            onClick={() => setIsNewModalOpen(false)}
            className="fixed inset-0 bg-[#0F172A]/50 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-[#E2E8F0] p-6 z-10 animate-scaleUp">
            
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">Registrar Nueva Venta / Pedido</h3>
                <p className="text-xs text-[#64748B]">Ingresa los datos de la cotización o compra</p>
              </div>
              <button
                onClick={() => setIsNewModalOpen(false)}
                className="p-1 text-[#94A3B8] hover:text-[#0F172A] rounded-lg cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateDeal} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-bold text-[#334155] mb-1">Nombre del Pedido / Producto</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Kit Odontológico Completo x25"
                  value={newDeal.dealName}
                  onChange={(e) => setNewDeal({ ...newDeal, dealName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F172A] focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-[#334155] mb-1">Clínica / Profesional</label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Centro Quirúrgico Tucumán"
                  value={newDeal.company}
                  onChange={(e) => setNewDeal({ ...newDeal, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F172A] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#334155] mb-1">Monto Total ($ ARS)</label>
                  <input
                    type="number"
                    required
                    placeholder="362500"
                    value={newDeal.value}
                    onChange={(e) => setNewDeal({ ...newDeal, value: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:border-[#0F172A] focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Etapa de la Venta</label>
                  <select
                    value={newDeal.stage}
                    onChange={(e) => setNewDeal({ ...newDeal, stage: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  >
                    <option value="Propuesta">Propuesta</option>
                    <option value="Negociación">Negociación</option>
                    <option value="Calificado">Calificado</option>
                    <option value="Concretado">Concretado</option>
                    <option value="Lead">Lead</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#334155] mb-1">Responsable</label>
                  <select
                    value={newDeal.owner}
                    onChange={(e) => setNewDeal({ ...newDeal, owner: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  >
                    <option value="Gonzalo M.">Gonzalo M.</option>
                    <option value="Elena Sánchez">Elena Sánchez</option>
                    <option value="Carlos Ruiz">Carlos Ruiz</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#334155] mb-1">Estado</label>
                  <select
                    value={newDeal.status}
                    onChange={(e) => setNewDeal({ ...newDeal, status: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-[#0F172A] focus:outline-none focus:border-[#0F172A]"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Cerrado">Cerrado</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsNewModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC] font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-semibold shadow-xs cursor-pointer"
                >
                  Guardar Venta
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminVentas;
