"use client";

import dynamic from "next/dynamic";
import { BarChart3, TrendingUp, Users, Map as MapIcon, Layers, Download, CheckCircle, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const InvestmentMap = dynamic(() => import("@/components/map/InvestmentMap"), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-neutral-900 flex items-center justify-center"><p className="text-muted-foreground font-bold uppercase tracking-[0.3em]">Processing Satellite Data...</p></div>
});

export default function Investment() {
    return (
        <div className="w-full bg-slate-50 flex flex-col pt-24 min-h-screen">
            <div className="flex-1 flex flex-col lg:flex-row lg:h-[calc(100vh-96px)] lg:overflow-hidden">
                {/* Fixed sidebar height on desktop, naturally scrolls on mobile */}
                <div className="w-full lg:w-[450px] border-r border-slate-200 p-10 overflow-y-auto no-scrollbar bg-white z-20 shadow-2xl h-auto lg:h-full">
                    <header className="mb-12">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
                                <BarChart3 className="text-white w-5 h-5" />
                            </div>
                            <h1 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">National Analytics</h1>
                        </div>
                        <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden group">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black text-primary uppercase mb-2 tracking-widest">Selected Strategic Sector</p>
                                <h2 className="text-4xl font-heading font-black text-slate-900">Siwa Oasis</h2>
                            </div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                        </div>
                    </header>

                    <div className="space-y-10">
                        {/* Stat Cards */}
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                <div className="p-2 bg-white rounded-xl w-fit mb-4 shadow-sm">
                                    <Users className="w-4 h-4 text-slate-400" />
                                </div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Occupancy</p>
                                <p className="text-3xl font-heading font-black text-slate-900">98.2%</p>
                                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold mt-2">
                                    <TrendingUp className="w-3 h-3" /> +12.4%
                                </div>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                                <div className="p-2 bg-white rounded-xl w-fit mb-4 shadow-sm">
                                    <TrendingUp className="w-4 h-4 text-slate-400" />
                                </div>
                                <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-1">Growth Index</p>
                                <p className="text-3xl font-heading font-black text-slate-900">1.4x</p>
                                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold mt-2">
                                    <CheckCircle className="w-3 h-3" /> Target met
                                </div>
                            </div>
                        </div>

                        {/* Heatmap Insights */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-1">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Yield Projections</h3>
                                <Layers className="w-4 h-4 text-slate-300" />
                            </div>

                            <div className="space-y-4">
                                {[
                                    { label: "Eco-Lodge Zone B", value: 92, status: "High Demand", color: "bg-primary" },
                                    { label: "Safari Base Camp", value: 78, status: "Expanding", color: "bg-emerald-500" },
                                    { label: "Wellness Districts", value: 45, status: "Stabilized", color: "bg-slate-300" }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-3xl border border-slate-100 bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-xs font-black text-slate-900 uppercase tracking-widest">{item.label}</span>
                                            <span className={cn(
                                                "text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full border",
                                                i === 0 ? "bg-primary/10 border-primary/20 text-primary" : "bg-slate-50 border-slate-100 text-slate-400"
                                            )}>{item.status}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${item.value}%` }}
                                                className={cn("h-full transition-all duration-1000", item.color)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4 pt-4">
                            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                <Briefcase className="w-4 h-4 text-primary" />
                                Initiate License Application
                            </button>
                            <button className="w-full py-5 bg-white border border-slate-200 text-slate-500 font-bold uppercase tracking-[0.2em] text-[10px] rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                                <Download className="w-4 h-4" />
                                Portfolio Analysis PDF
                            </button>
                        </div>
                    </div>
                </div>

                {/* Map View */}
                <div className="flex-1 relative bg-slate-100 min-h-[500px] lg:min-h-0 flex flex-col z-0 isolation-isolate">
                    <InvestmentMap />

                    {/* Map Controls Overlay */}
                    <div className="absolute top-10 right-10 flex flex-col gap-4 z-20">
                        <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-2xl hover:bg-white text-slate-400 hover:text-primary transition-all group">
                            <Layers className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        </button>
                        <button className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-100 shadow-2xl hover:bg-white text-slate-400 hover:text-primary transition-all group">
                            <MapIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        </button>
                    </div>

                    <div className="absolute bottom-10 left-10 right-10 pointer-events-none">
                        <div className="bg-slate-900 text-white p-6 rounded-[2rem] border border-slate-800 flex items-center justify-between pointer-events-auto max-w-xl shadow-[0_20px_50px_rgba(15,23,42,0.3)]">
                            <div className="flex items-center gap-4">
                                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
                                <div className="space-y-0.5">
                                    <span className="block text-[10px] font-black uppercase tracking-[0.2em]">Real-Time Ecosystem Overlay</span>
                                    <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-widest">Source: Unified Sovereign Tourism Gateway</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
