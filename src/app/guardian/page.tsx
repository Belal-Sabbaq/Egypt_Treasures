"use client";

import dynamic from "next/dynamic";
import { Shield, MapPin, Radio, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const GuardianMap = dynamic(() => import("@/components/map/GuardianMap"), {
    ssr: false,
    loading: () => <div className="h-[calc(100vh-96px)] w-full bg-slate-900 animate-pulse flex items-center justify-center"><p className="text-muted-foreground font-bold uppercase tracking-[0.3em]">Establishing sovereign link...</p></div>
});

export default function Guardian() {
    const [status, setStatus] = useState<'CONNECTED' | 'SOS'>('CONNECTED');

    return (
        <div className="relative min-h-screen w-full bg-slate-50 flex flex-col pt-24">
            {/* Map Layer - Takes up remaining viewport height */}
            <div className="flex-1 relative h-[calc(100vh-96px)] overflow-hidden flex flex-col">
                <GuardianMap />

                {/* Overlay UI */}
                <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-12">
                    {/* Top Bar */}
                    <div className="flex justify-between items-start pointer-events-auto">
                        <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200/50 flex items-center gap-8 shadow-2xl shadow-slate-900/5">
                            <div className="relative">
                                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-primary shadow-lg">
                                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150" alt="Sarah" className="w-full h-full object-cover" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white animate-pulse" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-xl font-heading font-black text-slate-900 leading-none">Sarah Henderson</h3>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-100 rounded-full">
                                        <Radio className="w-3 h-3 text-primary" />
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Beacon: 99x-A</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">En route to Siwa</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 border border-slate-800 p-6 rounded-[2rem] flex flex-col items-end gap-3 text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl">
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500">Signal Integrity</span>
                                <span className="text-emerald-500">Perfect (99%)</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-slate-500">Response Matrix</span>
                                <span className="text-primary">Optimized</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="flex justify-between items-end pointer-events-auto">
                        <div className="max-w-sm space-y-6">
                            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-200/50 shadow-2xl shadow-slate-900/5">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 bg-primary/10 rounded-xl">
                                        <Shield className="w-6 h-6 text-primary" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">National Command Link</span>
                                </div>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                                    Synchronized with the Ministry of Interior Command Center (Western Sector). All sovereign checkpoints are verified and alerted of your transit sequence.
                                </p>
                            </div>

                            <div className="bg-white/90 backdrop-blur-xl p-6 rounded-3xl border border-slate-200/50 flex items-center justify-between shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-900">Geofence: Operational</span>
                                </div>
                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Radius: 5.0km</span>
                            </div>
                        </div>

                        <button
                            onClick={() => setStatus(status === 'SOS' ? 'CONNECTED' : 'SOS')}
                            className={cn(
                                "relative w-32 h-32 rounded-full flex flex-col items-center justify-center transition-all duration-500 shadow-2xl overflow-hidden group",
                                status === 'SOS'
                                    ? "bg-red-600 scale-110 shadow-red-500/40"
                                    : "bg-white border-2 border-slate-100 hover:border-red-100"
                            )}
                        >
                            <div className="relative z-10 flex flex-col items-center">
                                <AlertTriangle className={cn(
                                    "w-10 h-10 mb-2 transition-all group-hover:scale-110",
                                    status === 'SOS' ? "text-white" : "text-slate-200 group-hover:text-red-500"
                                )} />
                                <span className={cn(
                                    "text-xs font-black uppercase tracking-[0.3em]",
                                    status === 'SOS' ? "text-white" : "text-slate-300 group-hover:text-red-600"
                                )}>
                                    {status === 'SOS' ? 'Active' : 'SOS'}
                                </span>
                            </div>
                            {status === 'SOS' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: [0.1, 0.3, 0.1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-white"
                                />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
