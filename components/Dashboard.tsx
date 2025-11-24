import React from 'react';
import { ChatInterface } from './ChatInterface';
import { IconStore, IconMoto, IconReceipt, IconChart, IconLogo } from './Icons';

interface DashboardProps {
    onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-col hidden md:flex sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 text-white">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <IconLogo className="w-5 h-5 text-white" />
             </div>
             <span className="font-bold text-lg">PedeÁgil</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
            <SidebarItem active icon={<IconStore className="w-5 h-5"/>} label="Painel de Controle" />
            <SidebarItem icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>} label="Pedidos (Live)" />
            <SidebarItem icon={<IconReceipt className="w-5 h-5"/>} label="Notas Fiscais" />
            <SidebarItem icon={<IconMoto className="w-5 h-5"/>} label="Entregadores" />
            <SidebarItem icon={<IconChart className="w-5 h-5"/>} label="Relatórios" />
        </nav>
        <div className="p-4 border-t border-slate-800">
            <button onClick={onLogout} className="flex items-center gap-2 text-sm hover:text-white transition-colors w-full">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                Sair do Sistema
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white h-16 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-30">
            <h1 className="font-bold text-xl text-slate-800">Visão Geral</h1>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Loja Aberta
                </div>
                <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold">
                    BR
                </div>
            </div>
        </header>

        <div className="p-8 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Vendas Hoje" value="R$ 1.240,50" trend="+12%" icon={<span className="text-green-500">💰</span>} />
                <StatCard title="Pedidos" value="48" trend="+5" icon={<span className="text-blue-500">🛍️</span>} />
                <StatCard title="Ticket Médio" value="R$ 25,84" trend="0%" icon={<span className="text-purple-500">💳</span>} />
                <StatCard title="Entregas Ativas" value="3" trend="" icon={<span className="text-orange-500">🛵</span>} />
            </div>

            {/* Active Orders Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h2 className="font-bold text-lg text-slate-800">Pedidos em Andamento</h2>
                    <button className="text-sm text-blue-600 font-medium hover:underline">Ver todos</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500">
                            <tr>
                                <th className="p-4">#ID</th>
                                <th className="p-4">Cliente</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Tempo</th>
                                <th className="p-4">Valor</th>
                                <th className="p-4 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <OrderRow id="1045" client="Ana Silva" status="Na Cozinha" statusColor="bg-yellow-100 text-yellow-700" time="12 min" value="R$ 45,90" />
                            <OrderRow id="1044" client="João Pedro" status="Saiu p/ Entrega" statusColor="bg-blue-100 text-blue-700" time="35 min" value="R$ 82,00" />
                            <OrderRow id="1043" client="Mariana L." status="Entregue" statusColor="bg-green-100 text-green-700" time="58 min" value="R$ 32,50" />
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty state filler */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 h-64 flex items-center justify-center text-slate-400">
                    Gráfico de Vendas (Simulação)
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-200 h-64 flex items-center justify-center text-slate-400">
                    Mapa de Calor Entregas (Simulação)
                </div>
            </div>
        </div>

        {/* The Chat Interface lives here, overlaying the dashboard */}
        <ChatInterface />
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'hover:bg-slate-800'}`}>
        {icon}
        <span className="font-medium text-sm">{label}</span>
    </div>
);

const StatCard = ({ title, value, trend, icon }: any) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-slate-50 rounded-lg text-xl">{icon}</span>
            {trend && <span className={`text-xs font-bold px-2 py-1 rounded-full ${trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'}`}>{trend}</span>}
        </div>
        <h3 className="text-slate-500 text-sm font-medium mb-1">{title}</h3>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
);

const OrderRow = ({ id, client, status, statusColor, time, value }: any) => (
    <tr className="hover:bg-slate-50 transition-colors">
        <td className="p-4 font-mono font-medium text-slate-500">#{id}</td>
        <td className="p-4 font-medium text-slate-900">{client}</td>
        <td className="p-4"><span className={`px-2 py-1 rounded-full text-xs font-bold ${statusColor}`}>{status}</span></td>
        <td className="p-4">{time}</td>
        <td className="p-4 font-medium">{value}</td>
        <td className="p-4 text-right">
            <button className="text-slate-400 hover:text-blue-600">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" /></svg>
            </button>
        </td>
    </tr>
);