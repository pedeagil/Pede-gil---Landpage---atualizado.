import React, { useEffect, useState, useRef } from 'react';
import { IconStore, IconMoto, IconReceipt, IconChart, IconCheck, IconBot, IconSparkles, IconLogo, IconZap, IconPrinter, IconWhatsApp, IconMenu, IconUser, IconAlert, IconBuilding, IconStar, IconIFood } from './Icons';

interface LandingPageProps {
  onLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLogin }) => {
  // Dynamic Text State
  const [aiTextIndex, setAiTextIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const aiPhrases = [
    "Analisando pedidos do iFood...",
    "Otimizando rotas de entrega...",
    "Calculando lucro em tempo real...",
    "Sincronizando cardápio..."
  ];

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setAiTextIndex((prev) => (prev + 1) % aiPhrases.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        whatsapp: formData.get('whatsapp'),
        restaurant: formData.get('restaurant'),
        orders_volume: formData.get('orders_volume')
    };

    try {
        const response = await fetch('https://hook.us2.make.com/x6rqd0hodzsdtuix8ncmtc7z7lkmeuga', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            window.location.href = '/obrigado.html';
        } else {
            alert('Ocorreu um erro ao enviar sua solicitação. Por favor, tente novamente.');
            setIsSubmitting(false);
        }
    } catch (error) {
        console.error('Erro no envio:', error);
        alert('Erro de conexão. Verifique sua internet e tente novamente.');
        setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#020617] text-slate-300 overflow-x-hidden selection:bg-indigo-500/30">
      
      {/* Deep Space Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="stars absolute inset-0"></div>
        <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-indigo-900/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[100px] mix-blend-screen"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#020617]/70 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
             <div className="w-10 h-10 bg-indigo-600/20 border border-indigo-500/30 rounded-xl flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(79,70,229,0.2)] group-hover:scale-105 transition-transform duration-300 backdrop-blur-sm">
                <IconLogo className="w-6 h-6" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight font-['Space_Grotesk']">PedeÁgil</span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (CENTERED) */}
      <header className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden reveal active">
        <div className="container mx-auto px-6 z-20 relative text-center">
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_10px_#6366f1]"></span>
                Gemini 3.0 Pro Intelligence
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-[0.95] mb-8 tracking-tighter font-['Space_Grotesk'] max-w-6xl mx-auto">
                PARE DE SER <br/>
                <span className="text-kinetic relative inline-block mt-2">
                    REFÉM DO CAOS
                </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed font-light">
                Substitua o Gestor de Pedidos padrão por um gestor integrado ao Ifood que usa Inteligência artificial para abrir a loja, e responder clientes e auxilia na emissão de notas fiscais enquanto você foca em crescer.
            </p>

            <div className="mb-12 flex justify-center">
                <button
                    onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
                    className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-[0_0_30px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_50px_-10px_rgba(79,70,229,0.7)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                    <span>Agende uma consultoria gratuita com nossa equipe</span>
                    <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            </div>
            
            <div className="flex flex-col items-center justify-center gap-6">
                 <div className="h-6 flex items-center gap-2 text-sm font-mono text-indigo-400/80">
                   <IconSparkles className="w-4 h-4 animate-spin-slow" />
                   <span className="typing-effect">🤖 IA: {aiPhrases[aiTextIndex]}</span>
                </div>
            </div>
        </div>

        {/* Decorative ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-indigo-500/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
      </header>

      {/* PROBLEM SECTION: THE CHAOS (VIDEO BACKGROUND) */}
      <section className="py-24 relative bg-[#020617] overflow-hidden reveal">
         <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-16">
                
                {/* Chaos Image Side */}
                <div className="flex-1 relative w-full max-w-lg md:max-w-none">
                    <div className="relative rounded-3xl overflow-hidden shadow-[0_0_50px_-10px_rgba(239,68,68,0.3)] group border border-red-500/30 transform hover:scale-[1.01] transition-transform duration-500">
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10 pointer-events-none"></div>
                        
                        {/* Image */}
                        <img 
                             src="https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=1000&auto=format&fit=crop"
                             alt="Stressed Chef in Chaos"
                             className="w-full h-[500px] object-cover opacity-80 grayscale-[30%] hover:grayscale-0 transition-all duration-700"
                        />
                        
                        {/* Floating "Chaos" Notifications - STACKED */}
                        <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end pointer-events-none space-y-3 pb-8">
                            
                            {/* 1. Critical iFood Cancel (Top) */}
                            <div className="bg-[#EA1D2C] text-white p-3 rounded-xl shadow-2xl flex items-center gap-3 animate-float transform translate-x-4 border border-red-400/30">
                                <div className="bg-white/20 p-2 rounded-lg shrink-0"><IconAlert className="w-5 h-5 text-white" /></div>
                                <div>
                                    <div className="text-[10px] font-bold opacity-90 uppercase tracking-wider">iFood • Crítico</div>
                                    <div className="font-bold text-sm leading-tight">Pedido #392 Cancelado (Atraso &gt; 90min)</div>
                                </div>
                            </div>

                            {/* 2. Customer Rage (Middle) */}
                            <div className="bg-[#128C7E] text-white p-3 rounded-xl shadow-2xl flex items-center gap-3 animate-float transform -translate-x-2 border border-green-400/30" style={{animationDelay: '1s'}}>
                                <div className="bg-white/20 p-2 rounded-lg shrink-0"><IconWhatsApp className="w-5 h-5 text-white" /></div>
                                <div>
                                    <div className="text-[10px] font-bold opacity-90 uppercase tracking-wider">Cliente (5 msgs não lidas)</div>
                                    <div className="font-bold text-sm leading-tight">"Cadê meu lanche??? Vou cancelar!"</div>
                                </div>
                            </div>

                             {/* 3. System Failure (Bottom) */}
                             <div className="bg-amber-500 text-slate-900 p-3 rounded-xl shadow-2xl flex items-center gap-3 animate-float transform translate-x-2 border border-amber-400/30" style={{animationDelay: '2s'}}>
                                <div className="bg-black/10 p-2 rounded-lg shrink-0"><IconPrinter className="w-5 h-5 text-slate-900" /></div>
                                <div>
                                    <div className="text-[10px] font-bold opacity-70 uppercase tracking-wider text-slate-900">Sistema</div>
                                    <div className="font-bold text-sm leading-tight">Impressora Offline: Falha de Rede</div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                {/* Text Side */}
                <div className="flex-1 space-y-8">
                    <div className="inline-block px-3 py-1 rounded bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-widest border border-red-500/20">
                        A Realidade Atual
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white font-['Space_Grotesk'] leading-tight">
                        Você trabalha ou apenas <span className="text-red-500">apaga incêndios</span>?
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed">
                        Aquela sensação de terminar a noite exausto, mas sem saber se teve lucro. 
                        Pedidos perdidos no tablet, motoboys parados na porta e clientes reclamando no WhatsApp.
                    </p>
                    <div className="pl-6 border-l-2 border-red-500/30 space-y-4">
                        <div className="flex items-center gap-3 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Gestão fragmentada em 3 telas diferentes</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Erros manuais que comem sua margem</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                            <span>Atendimento lento que perde cliente</span>
                        </div>
                    </div>
                    
                    <p className="text-xl text-white font-medium pt-4">
                        Não precisa ser assim.
                    </p>
                </div>
            </div>
         </div>
      </section>

      {/* NEW SECTION: JOURNEY FROM ORDER TO DELIVERY (3D INTERACTIVE) */}
      <section className="py-24 relative bg-[#020617] overflow-hidden reveal">
         <div className="container mx-auto px-6 relative z-10">
            <div className="text-center mb-20">
                 <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 font-['Space_Grotesk']">
                    A Paz do "Plim" à Entrega
                 </h2>
                 <p className="text-slate-400 max-w-2xl mx-auto">Deixe a IA assumir o controle operacional.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
               {/* Left: Steps Timeline */}
               <div className="space-y-16 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-8 top-8 bottom-8 w-px bg-gradient-to-b from-indigo-500/50 via-purple-500/50 to-transparent z-0"></div>
                  
                  {[
                    {
                      id: '01',
                      title: "Captura Instantânea",
                      desc: "O pedido aparece na nossa tela antes mesmo de tocar no gestor padrão. Sem delay.",
                      icon: <IconZap className="w-6 h-6 text-yellow-400" />
                    },
                    {
                      id: '02',
                      title: "Validação e Aceite",
                      desc: "A IA verifica itens, valida pagamento e aceita automaticamente. Zero perda de vendas.",
                      icon: <IconBot className="w-6 h-6 text-indigo-400" />
                    },
                    {
                      id: '03',
                      title: "Impressão Inteligente",
                      desc: "Formatação limpa com observações em negrito (SEM CEBOLA) para evitar erros na cozinha.",
                      icon: <IconPrinter className="w-6 h-6 text-cyan-400" />
                    },
                    {
                      id: '04',
                      title: "Despacho Flexível",
                      desc: "Com 1 clique: Chamar iFood ou Motoboy Próprio com cálculo automático de taxa.",
                      icon: <IconMoto className="w-6 h-6 text-orange-400" />
                    },
                    {
                      id: '05',
                      title: "Notificação Proativa",
                      desc: "Mensagem automática no WhatsApp do cliente: 'Seu pedido saiu!'. Reduz ansiedade e chamadas.",
                      icon: <IconWhatsApp className="w-6 h-6 text-green-400" />
                    }
                  ].map((step, idx) => (
                    <div key={idx} className="relative z-10 pl-24 group">
                       {/* Icon Bubble */}
                       <div className="absolute left-0 top-0 w-16 h-16 rounded-2xl bg-[#0B0F19] border border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.15)] group-hover:scale-110 group-hover:border-indigo-500 transition-all duration-300">
                          {step.icon}
                       </div>
                       <span className="text-xs font-bold text-indigo-500 tracking-widest mb-1 block">PASSO {step.id}</span>
                       <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">{step.title}</h3>
                       <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  ))}
               </div>

               {/* Right: Sticky Monitor Simulation */}
               <div className="hidden lg:block sticky top-32">
                   <SystemSimulation />
                   
                   {/* Decorative elements behind monitor */}
                   <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -z-10"></div>
                   <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px] -z-10"></div>
               </div>
            </div>
         </div>
      </section>

      {/* SCROLL-TELLING SECTION - 4 Pillars */}
      <section className="py-32 relative bg-[#020617] z-20 reveal">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">
                 Controle Total em <span className="text-indigo-500">4 Dimensões</span>
             </h2>
             <p className="text-slate-400 max-w-2xl mx-auto text-lg">Tecnologia completa para blindar sua operação de delivery.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 auto-rows-[minmax(180px,auto)]">
            
            {/* Bento Item 1 - Integration (Large - Interactive) */}
            <div className="md:col-span-4 bg-[#0B0F19]/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/5 hover:border-indigo-500/50 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 h-full">
                    <div className="flex-1">
                        <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 text-red-500 border border-red-500/20 shadow-[0_0_30px_-10px_rgba(239,68,68,0.3)]">
                            <IconIFood className="w-8 h-8" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Integração Profunda iFood ⚡</h3>
                        <p className="text-slate-400 leading-relaxed">Esqueça o portal lento. Abra e feche a loja, sincronize cardápios e responda ao chat do cliente diretamente pelo PedeÁgil. Tudo em uma tela só.</p>
                    </div>
                    {/* Interactive Widget */}
                    <InteractiveStoreWidget />
                </div>
            </div>

            {/* Bento Item 2 - Fiscal (Tall) - INTERACTIVE REPLACEMENT */}
            <div className="md:col-span-2 md:row-span-2 bg-[#0B0F19]/50 backdrop-blur-2xl rounded-3xl p-8 border border-white/5 hover:border-blue-500/50 transition-all duration-500 group relative overflow-hidden flex flex-col">
                 <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 
                 <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-500 border border-blue-500/20 shadow-[0_0_30px_-10px_rgba(59,130,246,0.3)]">
                        <IconReceipt className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Fiscal Automático</h3>
                    <p className="text-slate-400 mb-6">Emita o Cupom Fiscal em 1 clique. O sistema preenche os dados via CPF automaticamente.</p>
                    
                    {/* Interactive Fiscal Widget */}
                    <div className="mt-auto w-full">
                        <FiscalWidget />
                    </div>
                 </div>
            </div>

            {/* Bento Item 3 - Menu Sync (Interactive) */}
            <div className="md:col-span-2 bg-[#0B0F19]/50 backdrop-blur-2xl rounded-3xl p-6 border border-white/5 hover:border-orange-500/50 transition-all duration-500 group relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mb-4 text-orange-500 border border-orange-500/20 shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)]">
                        <IconMenu className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Sincronização de Cardápio</h3>
                    <p className="text-slate-400 text-sm mb-6">Atualize preços e disponibilidade em 1 clique.</p>

                    <div className="mt-auto">
                        <MenuSyncWidget />
                    </div>
                </div>
            </div>

            {/* Bento Item 4 - Logistics Selection (Interactive) */}
            <div className="md:col-span-2 bg-[#0B0F19]/50 backdrop-blur-2xl rounded-3xl p-6 border border-white/5 hover:border-green-500/50 transition-all duration-500 group relative overflow-hidden flex flex-col">
                <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 flex-1 flex flex-col">
                    <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center mb-4 text-green-500 border border-green-500/20 shadow-[0_0_20px_-5px_rgba(34,197,94,0.3)]">
                        <IconMoto className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Despacho Inteligente</h3>
                    <p className="text-slate-400 text-sm mb-6">Com 1 clique: Chamar entregadores do iFood ou Motoboy Próprio.</p>

                    <div className="mt-auto">
                         <LogisticsWidget />
                    </div>
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* NEW SECTION: POWER USER FEATURES */}
      <section className="py-24 bg-[#0B0F19] border-t border-white/5 reveal">
        <div className="container mx-auto px-6">
            <div className="mb-16">
                <h2 className="text-3xl font-bold text-white font-['Space_Grotesk'] mb-2">Muito Mais que Delivery</h2>
                <p className="text-slate-400">Uma Central de Comando Completa.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Feature 1 */}
                <div className="bg-[#020617] p-6 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-all group">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center mb-4 text-indigo-400 group-hover:text-indigo-300">
                        <IconMenu className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Engenharia de Cardápio</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Atualize preços em massa e pause produtos com comando de voz. Sincronia instantânea.</p>
                </div>
                 {/* Feature 2 */}
                <div className="bg-[#020617] p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-all group">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 text-purple-400 group-hover:text-purple-300">
                        <IconUser className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">CRM & Raio-X</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Identifique VIPs, clientes novos e clientes problema. Mande mimos automatizados.</p>
                </div>
                 {/* Feature 3 */}
                <div className="bg-[#020617] p-6 rounded-2xl border border-white/5 hover:border-red-500/30 transition-all group">
                    <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 text-red-400 group-hover:text-red-300">
                        <IconAlert className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Auditoria de Cancelamento</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Relatórios de perdas para contestar cobranças indevidas do iFood e recuperar dinheiro.</p>
                </div>
                 {/* Feature 4 */}
                <div className="bg-[#020617] p-6 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all group">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4 text-cyan-400 group-hover:text-cyan-300">
                        <IconBuilding className="w-5 h-5" />
                    </div>
                    <h3 className="text-white font-bold mb-2">Gestão Multi-Loja</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">Controle todas as filiais em uma tela. Compare faturamento e desempenho em tempo real.</p>
                </div>
            </div>
        </div>
      </section>

      {/* NEW SECTION: RECOMMENDATIONS (INFINITE SCROLL "VIDEO EFFECT") */}
      <section className="py-24 bg-[#020617] border-t border-white/5 overflow-hidden reveal">
         <div className="container mx-auto px-6 mb-12 text-center">
             <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-['Space_Grotesk']">
                Amada pelos usuários, recomendada pelos <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">líderes do setor</span>
             </h2>
             <p className="text-slate-400">Veja o que alguns deles têm a dizer.</p>
         </div>

         <div className="relative w-full">
            {/* Gradient Masks for edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#020617] to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#020617] to-transparent z-10 pointer-events-none"></div>
            
            <div className="flex gap-6 w-max animate-marquee group hover:pause-animation">
                {/* Duplicated for infinite loop effect */}
                {[...testimonials, ...testimonials].map((t, i) => (
                    <div key={i} className="w-[350px] md:w-[450px] p-6 rounded-2xl bg-[#0B0F19] border border-white/5 flex flex-col gap-4 hover:border-indigo-500/30 transition-colors">
                        <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-full bg-slate-800 overflow-hidden relative border-2 border-slate-700/50 shrink-0">
                                {/* Use Image or Initial if fails */}
                                {t.image ? (
                                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-500">{t.initials}</div>
                                )}
                             </div>
                             <div>
                                 <h4 className="text-white font-bold text-sm md:text-base">{t.name}</h4>
                                 <p className="text-xs text-slate-400">{t.role}</p>
                             </div>
                             <div className="ml-auto flex gap-0.5">
                                 {[1,2,3,4,5].map(s => (
                                    <React.Fragment key={s}>
                                        <IconStar className="w-4 h-4 text-yellow-500" />
                                    </React.Fragment>
                                 ))}
                             </div>
                        </div>
                        <p className="text-slate-300 text-sm leading-relaxed italic">"{t.text}"</p>
                    </div>
                ))}
            </div>
         </div>
      </section>

      {/* FOOTER & CONTACT FORM */}
      <footer id="contact-form" className="bg-[#020617] text-slate-300 py-24 border-t border-white/5 relative overflow-hidden reveal">
        {/* Glow effect for footer */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
            
            <div className="w-full max-w-5xl bg-[#0B0F19]/80 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
                 {/* Left Side - Sales Copy */}
                 <div className="flex-1 p-10 md:p-12 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
                    {/* Badge Removed */}
                    
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-['Space_Grotesk'] leading-tight">
                        Pronto para escalar <br/>
                        <span className="text-indigo-500">sua operação?</span>
                    </h3>
                    <p className="text-slate-400 mb-8 leading-relaxed">
                        Entre para o seleto grupo de restaurantes que estão automatizando 90% da gestão com IA. Solicite uma análise de ROI personalizada.
                    </p>
                    
                    {/* Pain Points Section - Touching the wound */}
                    <div className="space-y-4">
                         <div className="flex items-start gap-3 text-sm text-slate-300">
                             <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 mt-0.5"><IconAlert className="w-3.5 h-3.5" /></div>
                             <span>Cansado de pagar taxas abusivas e ver seu lucro sumir no final do mês?</span>
                         </div>
                         <div className="flex items-start gap-3 text-sm text-slate-300">
                             <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 mt-0.5"><IconAlert className="w-3.5 h-3.5" /></div>
                             <span>Sua cozinha vira um caos absoluto nos horários de pico e pedidos saem errados?</span>
                         </div>
                         <div className="flex items-start gap-3 text-sm text-slate-300">
                             <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 shrink-0 mt-0.5"><IconAlert className="w-3.5 h-3.5" /></div>
                             <span>Você sente que é escravo da sua operação e não consegue tirar folga?</span>
                         </div>
                    </div>
                 </div>

                 {/* Right Side - Form */}
                 <div className="flex-1 p-10 md:p-12 bg-[#020617]/50">
                     <form className="space-y-4" onSubmit={handleFormSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Seu Nome</label>
                                <div className="relative">
                                    <IconUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <input type="text" name="name" placeholder="João Silva" className="w-full bg-[#0F172A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-700" required />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">WhatsApp</label>
                                <div className="relative">
                                    <IconWhatsApp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                    <input type="tel" name="whatsapp" placeholder="(11) 99999-9999" className="w-full bg-[#0F172A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-700" required />
                                </div>
                            </div>
                        </div>

                        <div>
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Nome do Restaurante</label>
                             <div className="relative">
                                <IconStore className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                <input type="text" name="restaurant" placeholder="Ex: Burger King da Silva" className="w-full bg-[#0F172A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors placeholder:text-slate-700" required />
                             </div>
                        </div>

                        <div>
                             <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Média de Pedidos / Mês</label>
                             <div className="relative">
                                <IconChart className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600" />
                                <select name="orders_volume" className="w-full bg-[#0F172A] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-indigo-500 transition-colors appearance-none cursor-pointer text-slate-400">
                                    <option>Até 500 pedidos</option>
                                    <option>500 - 1.500 pedidos</option>
                                    <option>1.500 - 3.000 pedidos</option>
                                    <option>+ 3.000 pedidos (Enterprise)</option>
                                </select>
                                <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-600 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                             </div>
                        </div>
                        
                        <div className="pt-2">
                            <button 
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_0_30px_-5px_rgba(79,70,229,0.7)] hover:scale-[1.02] flex items-center justify-center gap-2 group ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                            >
                                {isSubmitting ? (
                                    <>
                                        <IconSparkles className="w-5 h-5 animate-spin" />
                                        <span>ENVIANDO...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="tracking-wide">SOLICITAR ANÁLISE GRATUITA</span>
                                        <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                    </>
                                )}
                            </button>
                            <p className="text-center text-[10px] text-slate-500 mt-3">
                                Seus dados estão seguros. Responderemos em até 2 horas úteis.
                            </p>
                        </div>
                     </form>
                 </div>
            </div>


            <div className="border-t border-white/5 mt-20 pt-8 w-full flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 uppercase tracking-widest">
                <p>© 2025 PedeÁgil. Todos os direitos reservados.</p>
                <div className="flex gap-8 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Termos</a>
                    <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  );
};

// --- INTERACTIVE STORE WIDGET ---
const InteractiveStoreWidget = () => {
    const [storeState, setStoreState] = useState<'closed' | 'opening' | 'open'>('closed');
    const [notifications, setNotifications] = useState<string[]>([]);
    
    // Auto-remove notification after 5s
    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                setNotifications(prev => prev.slice(1));
            }, 6000);
            return () => clearTimeout(timer);
        }
    }, [notifications]);

    const handleToggle = () => {
        if (storeState === 'closed') {
            setStoreState('opening');
            setTimeout(() => {
                setStoreState('open');
                setNotifications(prev => [...prev, "System: Loja Aberta com Sucesso"]);
                // Simulate incoming order shortly after opening
                setTimeout(() => {
                    setNotifications(prev => [...prev, "iFood: Novo Pedido #8821 - R$ 45,90"]);
                }, 1500);
            }, 1000);
        } else if (storeState === 'open') {
            setStoreState('closed');
            setNotifications([]);
        }
    };

    return (
        <div className="flex-1 w-full bg-[#0F172A] rounded-xl border border-white/10 p-4 transform group-hover:scale-105 transition-transform duration-500 flex flex-col justify-between overflow-hidden relative min-h-[160px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-2 relative z-10">
                <div className="flex items-center gap-2">
                    <IconIFood className={`w-5 h-5 ${storeState === 'open' ? 'text-[#EA1D2C]' : 'text-slate-600'}`} />
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Status da Conexão</span>
                </div>
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase border transition-all duration-300
                    ${storeState === 'open' ? 'bg-green-500/10 border-green-500/20 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]' : 
                      storeState === 'opening' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                      'bg-slate-800 border-slate-700 text-slate-500'}
                `}>
                    {storeState === 'open' ? 'ONLINE' : storeState === 'opening' ? 'CONECTANDO...' : 'OFFLINE'}
                </div>
            </div>

            {/* Main Action Area */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10">
                <button 
                    onClick={handleToggle}
                    disabled={storeState === 'opening'}
                    className={`w-full py-3 rounded-lg font-bold text-sm tracking-wider transition-all duration-300 flex items-center justify-center gap-2
                        ${storeState === 'open' 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' 
                            : storeState === 'opening'
                                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 cursor-wait'
                                : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/50'
                        }
                    `}
                >
                    {storeState === 'opening' ? (
                        <>
                             <IconSparkles className="w-4 h-4 animate-spin" />
                             <span className="animate-pulse">SINCRONIZANDO</span>
                        </>
                    ) : storeState === 'open' ? (
                        "FECHAR LOJA"
                    ) : (
                        "ABRIR LOJA AGORA"
                    )}
                </button>
            </div>

            {/* Notification Stream Overlay */}
            <div className="absolute bottom-2 left-2 right-2 flex flex-col gap-2 pointer-events-none">
                {notifications.map((note, idx) => (
                    <div key={idx} className="bg-slate-800/90 backdrop-blur-md border border-white/10 p-2 rounded-lg shadow-xl animate-fade-in-up flex items-center gap-3">
                        {note.includes("iFood") ? (
                             <div className="w-8 h-8 rounded-full bg-[#EA1D2C]/20 flex items-center justify-center text-[#EA1D2C] shrink-0 animate-wiggle">
                                 <IconIFood className="w-5 h-5" />
                             </div>
                        ) : (
                             <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 shrink-0">
                                 <IconCheck className="w-5 h-5" />
                             </div>
                        )}
                        <div className="flex-1">
                            <div className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">{note.includes("iFood") ? "Nova Entrega" : "Sistema"}</div>
                            <div className="text-xs text-white font-medium">{note.split(": ")[1] || note}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Background Tech Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0"></div>
        </div>
    );
};

// --- MENU SYNC WIDGET ---
const MenuSyncWidget = () => {
    const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'success'>('idle');
    const [notification, setNotification] = useState<{type: 'ifood' | 'system', text: string} | null>(null);

    const handleSync = () => {
        if (syncState !== 'idle') return;
        setSyncState('syncing');
        setNotification({ type: 'ifood', text: "Sincronizando cardápio..." });
        
        setTimeout(() => {
            setNotification({ type: 'system', text: "58 produtos atualizados com sucesso." });
            setSyncState('success');
            setTimeout(() => {
                setNotification(null);
                setSyncState('idle');
            }, 3500);
        }, 2000);
    };

    return (
        <div className="w-full bg-[#0F172A] rounded-xl border border-white/10 p-4 flex flex-col relative overflow-hidden h-[120px]">
             {/* Background Tech */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-0"></div>

             <div className="relative z-10 flex-1 flex flex-col justify-center">
                 {notification ? (
                    <div className="bg-slate-800/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl animate-fade-in-up flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notification.type === 'ifood' ? 'bg-[#EA1D2C]/20 text-[#EA1D2C] animate-spin-slow' : 'bg-green-500/20 text-green-500'}`}>
                            {notification.type === 'ifood' ? <IconZap className="w-5 h-5" /> : <IconCheck className="w-5 h-5" />}
                        </div>
                        <div>
                             <div className="text-[10px] text-slate-400 uppercase font-bold">{notification.type === 'ifood' ? 'iFood API' : 'Sistema'}</div>
                             <div className="text-xs text-white font-medium">{notification.text}</div>
                        </div>
                    </div>
                 ) : (
                    <button 
                        onClick={handleSync}
                        className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-lg font-bold text-sm tracking-wider transition-all shadow-lg shadow-orange-900/50 flex items-center justify-center gap-2"
                    >
                        <IconZap className="w-4 h-4" />
                        SINCRONIZAR AGORA
                    </button>
                 )}
             </div>
        </div>
    );
};

// --- LOGISTICS SELECTION WIDGET ---
const LogisticsWidget = () => {
    const [selected, setSelected] = useState<'proprio' | 'ifood' | null>(null);
    const [notification, setNotification] = useState<string | null>(null);

    const handleSelect = (type: 'proprio' | 'ifood') => {
        setSelected(type);
        setNotification(type === 'proprio' ? 'Chamando Frota Própria...' : 'Chamando Entregador Parceiro...');
        setTimeout(() => {
            setSelected(null);
            setNotification(null);
        }, 3000);
    }

    return (
        <div className="w-full bg-[#0F172A] rounded-xl border border-white/10 p-4 relative overflow-hidden h-[120px] flex items-center justify-center">
             {/* Background Tech */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-0"></div>

             {notification ? (
                <div className="relative z-10 w-full bg-slate-800/90 backdrop-blur-md border border-white/10 p-3 rounded-lg shadow-xl animate-fade-in-up flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center shrink-0 animate-pulse">
                        <IconMoto className="w-5 h-5" />
                    </div>
                    <div>
                         <div className="text-[10px] text-slate-400 uppercase font-bold">Logística Definida</div>
                         <div className="text-xs text-white font-medium">{notification}</div>
                    </div>
                </div>
             ) : (
                 <div className="relative z-10 w-full flex gap-3">
                    <button 
                        onClick={() => handleSelect('proprio')}
                        className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-green-500/50 rounded-lg flex flex-col items-center justify-center gap-1 transition-all group"
                    >
                        <IconMoto className="w-5 h-5 text-slate-400 group-hover:text-green-500 transition-colors" />
                        <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">MOTOBOY PRÓPRIO</span>
                    </button>
                    <button 
                        onClick={() => handleSelect('ifood')}
                        className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-[#EA1D2C]/50 rounded-lg flex flex-col items-center justify-center gap-1 transition-all group"
                    >
                        <IconIFood className="w-5 h-5 text-slate-400 group-hover:text-[#EA1D2C] transition-colors" />
                        <span className="text-[10px] font-bold text-slate-300 group-hover:text-white">ENTREGADOR IFOOD</span>
                    </button>
                 </div>
             )}
        </div>
    );
};

// --- FISCAL WIDGET ---
const FiscalWidget = () => {
    const [state, setState] = useState<'idle' | 'emitting' | 'success'>('idle');
    const [notifications, setNotifications] = useState<string[]>([]);

    useEffect(() => {
        if (notifications.length > 0) {
            const timer = setTimeout(() => {
                setNotifications(prev => prev.slice(1));
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [notifications]);

    const handleEmit = () => {
        if (state !== 'idle') return;
        setState('emitting');
        
        // Step 1: Request
        setTimeout(() => {
            setNotifications(prev => [...prev, "SEFAZ: Autorizando Emissão..."]);
        }, 500);

        // Step 2: Success
        setTimeout(() => {
             setNotifications(prev => [...prev, "SEFAZ: Nota Fiscal Emitida ✅"]);
             setState('success');
        }, 2000);

        // Step 3: Printing
        setTimeout(() => {
             setNotifications(prev => [...prev, "Impressora: Imprimindo DANFE 🖨️"]);
        }, 3000);

        // Reset
        setTimeout(() => {
            setState('idle');
            setNotifications([]);
        }, 8000);
    };

    return (
        <div className="relative w-full flex flex-col">
            {/* Action Button */}
            <button 
                onClick={handleEmit}
                disabled={state !== 'idle'}
                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider transition-all shadow-lg flex items-center justify-center gap-2 mb-8 relative z-20
                    ${state === 'idle' 
                        ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/50 hover:scale-[1.02]' 
                        : 'bg-slate-800 border border-slate-700 text-slate-400 cursor-default'}
                `}
            >
                {state === 'idle' ? (
                    <>EMITIR NOTA FISCAL</>
                ) : state === 'emitting' ? (
                    <><IconSparkles className="w-4 h-4 animate-spin" /> EMITINDO...</>
                ) : (
                    <><IconCheck className="w-4 h-4" /> EMITIDA</>
                )}
            </button>

            {/* Notifications Container (Absolute to not shift layout) */}
            <div className="absolute top-16 left-0 right-0 z-30 flex flex-col gap-2 pointer-events-none">
                {notifications.map((note, idx) => (
                    <div key={idx} className="bg-slate-900/95 backdrop-blur border border-white/10 p-3 rounded-lg shadow-2xl animate-fade-in-up flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${note.includes("SEFAZ") ? "bg-blue-500/20 text-blue-500" : "bg-yellow-500/20 text-yellow-500"}`}>
                             {note.includes("SEFAZ") ? <IconReceipt className="w-4 h-4" /> : <IconPrinter className="w-4 h-4" />}
                        </div>
                        <div className="text-xs font-medium text-white">{note}</div>
                    </div>
                ))}
            </div>

            {/* Receipt Animation */}
            <div className="relative h-48 bg-slate-900/50 rounded-xl border border-white/5 overflow-hidden flex items-end justify-center">
                 {/* The Receipt Paper */}
                 <div className={`w-64 bg-white p-4 text-slate-900 font-mono text-[10px] shadow-2xl transition-transform duration-[2000ms] cubic-bezier(0.2, 0.8, 0.2, 1)
                    ${state === 'success' ? 'translate-y-4' : 'translate-y-[120%]'}
                 `}>
                     <div className="text-center font-bold mb-2 border-b border-dashed border-slate-300 pb-2">DANFE NFC-e - VIA CONSUMIDOR</div>
                     <div className="flex justify-between mb-1"><span>X-BURGER SPECIAL</span><span>R$ 28,90</span></div>
                     <div className="flex justify-between mb-1"><span>COCA-COLA LATA</span><span>R$ 6,50</span></div>
                     <div className="flex justify-between mb-1"><span>BATATA FRITA P</span><span>R$ 12,00</span></div>
                     <div className="flex justify-between font-bold mt-2 pt-2 border-t border-dashed border-slate-300 text-xs"><span>TOTAL</span><span>R$ 47,40</span></div>
                     <div className="mt-4 pt-2 border-t border-dashed border-slate-300 text-center text-[8px] text-slate-400">
                         EMISSÃO: {new Date().toLocaleDateString()} - 20:42:15<br/>
                         PROT: 3422340029321
                     </div>
                     {/* Jagged Edge */}
                     <div className="absolute -top-2 left-0 w-full h-2 bg-[#0F172A] [mask-image:radial-gradient(circle,transparent_4px,#000_4.5px)] [mask-size:10px_10px] [mask-repeat:repeat-x]"></div>
                 </div>
            </div>
        </div>
    );
};

// --- SIMULATION COMPONENT FOR DASHBOARD ANIMATION ---
const SystemSimulation = () => {
  const [orders, setOrders] = useState<{id: string, name: string, items: string, status: string, time: number}[]>([]);
  const orderIdCounter = useRef(1050);

  // Status Lifecycle: Novo -> Analisando -> Preparando -> Entrega -> Finalizado
  const statusFlow = ['NOVO', 'ANALISANDO', 'PREPARO', 'ENTREGA', 'ENTREGUE'];

  // Add new order periodically
  useEffect(() => {
    const addOrder = () => {
      const names = ['Pedro S.', 'Ana C.', 'João M.', 'Maria L.', 'Carlos F.', 'Bia R.'];
      const itemsList = ['2x X-Burger', '1x Pizza G', '3x Açaí', '1x Combo Família', '2x Sushi Box'];
      
      const newOrder = {
        id: '#' + orderIdCounter.current++,
        name: names[Math.floor(Math.random() * names.length)],
        items: itemsList[Math.floor(Math.random() * itemsList.length)],
        status: 'NOVO',
        time: Date.now()
      };
      
      setOrders(prev => [newOrder, ...prev].slice(0, 5)); // Keep last 5
    };

    const interval = setInterval(addOrder, 3500); // New order every 3.5s
    addOrder(); // Initial

    return () => clearInterval(interval);
  }, []);

  // Update statuses periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => {
          const currentIndex = statusFlow.indexOf(order.status);
          // 30% chance to advance status if not finished
          if (currentIndex < statusFlow.length - 1 && Math.random() > 0.6) {
             return { ...order, status: statusFlow[currentIndex + 1] };
          }
          return order;
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[600px] bg-[#0F172A] rounded-2xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col relative transform hover:scale-[1.02] transition-transform duration-500">
       {/* Window Controls */}
       <div className="h-10 bg-slate-800 flex items-center px-4 gap-2 border-b border-slate-700 shrink-0">
         <div className="w-3 h-3 rounded-full bg-red-500"></div>
         <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
         <div className="w-3 h-3 rounded-full bg-green-500"></div>
         <div className="ml-auto text-xs text-slate-500 font-mono">pedeagil-dashboard.exe</div>
       </div>

       {/* App Content */}
       <div className="flex-1 p-6 overflow-hidden relative font-sans">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
             <div>
                <div className="text-xl font-bold text-white tracking-tight">Monitor de Pedidos</div>
                <div className="text-xs text-slate-400">Tempo Real • Loja Aberta</div>
             </div>
             <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-xs font-bold text-indigo-400">IA ATIVA</span>
             </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
             <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400 mb-1">Pedidos</div>
                <div className="text-lg font-bold text-white">{140 + orders.length}</div>
             </div>
             <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400 mb-1">Faturamento</div>
                <div className="text-lg font-bold text-green-400">R$ 4.2k</div>
             </div>
             <div className="bg-slate-800/50 p-3 rounded-lg border border-slate-700">
                <div className="text-xs text-slate-400 mb-1">Tempo Médio</div>
                <div className="text-lg font-bold text-white">28m</div>
             </div>
          </div>

          {/* Order List */}
          <div className="space-y-3">
             <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Últimos Pedidos</div>
             {orders.map(order => (
                <div key={order.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between animate-fade-in transition-all">
                    <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs
                            ${order.status === 'NOVO' ? 'bg-yellow-500/20 text-yellow-500 animate-pulse' : 
                              order.status === 'ANALISANDO' ? 'bg-purple-500/20 text-purple-500' :
                              order.status === 'ENTREGA' ? 'bg-blue-500/20 text-blue-500' :
                              'bg-green-500/20 text-green-500'
                            }
                        `}>
                            {order.status === 'NOVO' ? '!' : 
                             order.status === 'ANALISANDO' ? 'IA' :
                             order.status === 'ENTREGA' ? 'GO' : 'OK'}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm">{order.id}</span>
                                <span className="text-sm text-slate-300">{order.name}</span>
                            </div>
                            <div className="text-xs text-slate-500">{order.items}</div>
                        </div>
                    </div>
                    <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase border
                        ${order.status === 'NOVO' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 
                          order.status === 'ANALISANDO' ? 'bg-purple-500/10 border-purple-500/20 text-purple-500' :
                          order.status === 'PREPARO' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                          order.status === 'ENTREGA' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                          'bg-green-500/10 border-green-500/20 text-green-500'
                        }
                    `}>
                        {order.status}
                    </div>
                </div>
             ))}
          </div>

          {/* Toast Notification Simulation */}
          <div className="absolute bottom-6 left-6 right-6">
              {orders.find(o => o.status === 'ANALISANDO') && (
                 <div className="bg-purple-600 text-white p-3 rounded-lg shadow-lg text-xs flex items-center gap-2 animate-bounce">
                     <IconBot className="w-4 h-4" />
                     <span>IA: Validando itens e aceitando pedido...</span>
                 </div>
              )}
               {orders.find(o => o.status === 'ENTREGA') && (
                 <div className="bg-green-600 text-white p-3 rounded-lg shadow-lg text-xs flex items-center gap-2 mt-2 animate-bounce">
                     <IconWhatsApp className="w-4 h-4" />
                     <span>Mensagem enviada: "Seu pedido saiu!"</span>
                 </div>
              )}
          </div>
       </div>
    </div>
  );
};

// Data for Testimonials
const testimonials = [
    {
        name: "Roberto Mendes",
        role: "Dono da Dom Forneria & Pizza",
        text: "Eu achava que essa história de 'Inteligência Artificial' era coisa complicada, mas quebrei a cara. Hoje eu digito 'Abre a loja' ou 'Quanto vendi?' no chat e o sistema me responde na hora. É como ter um gerente que não dorme e não cobra hora extra. Surreal.",
        initials: "RM",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Mariana Costa",
        role: "Proprietária do Brasa Burguer Artesanal",
        text: "Só a função de escolher entre Entregador Próprio vs. Parceiro iFood já pagou a assinatura do ano todo. Em dia de chuva uso o iFood, em dia normal uso minha frota. Reduzi minhas taxas em uns 20% logo no primeiro mês. O controle financeiro é exato.",
        initials: "MC",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Sérgio Viana",
        role: "Sócio do Kizen Sushi Delivery",
        text: "Sexta à noite era um pesadelo para emitir nota fiscal. O cliente pedia e travava tudo. Com o PedeÁgil, a NFC-e sai automática na impressora térmica junto com o pedido da cozinha. Meu contador parou de reclamar e meu motoboy não fica mais esperando papel.",
        initials: "SV",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Renata Lins",
        role: "Fundadora da Grão & Sabor Fit",
        text: "Antes eu tinha 3 abas abertas e perdia mensagem de cliente no iFood toda hora. A centralização do chat salvou minha operação. Agora respondo o cliente, vejo o pedido e altero o status numa tela só. A paz reinou na minha cozinha.",
        initials: "RL",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Cadu Oliveira",
        role: "Proprietário da Rota 66 Smash Burger",
        text: "Minha operação é Dark Kitchen, só entrega. O volume é insano e eu perdia muito tempo aceitando pedido na tela. A IA aceitar e imprimir sozinha economizou uns 3 minutos por pedido. No final da noite, isso é a diferença entre entregar no prazo ou atrasar.",
        initials: "CO",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Elvira Matos",
        role: "Dona da Cantina da Nonna Massas",
        text: "Confesso que sou péssima com tecnologia, tinha medo de não saber mexer e travar minha loja. Mas a equipe configurou tudo na reunião e hoje é só digitar no chat. Se até eu consegui dominar o sistema em um dia, qualquer um consegue.",
        initials: "EM",
        image: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Felipe Andrade",
        role: "Sócio do Açaí do Porto",
        text: "Eu vendia muito no iFood e não via a cor do dinheiro. O relatório do PedeÁgil me mostrou exatamente onde as taxas estavam comendo minha margem. Ajustei os preços pela ferramenta e, pela primeira vez em dois anos, vi lucro real sobrar no fim do mês.",
        initials: "FA",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
    },
    {
        name: "Juliana Paiva",
        role: "Fundadora da Green Bowl Saladeria",
        text: "Aquela mensagem automática no WhatsApp avisando que o pedido 'Saiu para Entrega' é genial. Zerou as ligações de cliente ansioso no meu balcão perguntando 'cadê meu lanche?'. O cliente se sente VIP e minha equipe trabalha em paz.",
        initials: "JP",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80"
    }
];