"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Landmark, Building2, ShieldCheck, Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Success() {
    const [showFlows, setShowFlows] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowFlows(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="pt-24 pb-20 px-6 min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="max-w-4xl w-full text-center">
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-200"
                >
                    <CheckCircle2 className="text-white w-12 h-12" />
                </motion.div>

                <h1 className="text-6xl md:text-8xl font-heading font-black mb-6 tracking-tight text-slate-900 leading-none">
                    Sequence <span className="text-primary italic">Authorized</span>
                </h1>
                <p className="text-slate-400 text-xl mb-20 max-w-lg mx-auto font-medium leading-relaxed">
                    Your sovereign transaction has been successfully processed and verified through the National Gateway.
                </p>

                {/* Split Payment Animation Area */}
                <div className="relative h-[30rem] w-full max-w-3xl mx-auto mb-20">
                    {/* Main Receipt Node */}
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: 0 }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-72 bg-white p-8 rounded-[2rem] border border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
                    >
                        <p className="text-[10px] font-black uppercase text-slate-300 tracking-[0.2em] mb-2">Master Receipt #ET-883921</p>
                        <p className="text-4xl font-heading font-black text-slate-900 mb-6">$415.00</p>
                        <div className="flex items-center justify-between text-[10px] font-black text-primary border-t border-slate-50 pt-6 uppercase tracking-widest">
                            <span>Sovereign Verified</span>
                            <ShieldCheck className="w-4 h-4 fill-primary/10" />
                        </div>
                    </motion.div>

                    {/* Connection Lines (Flows) */}
                    <div className="absolute top-32 left-1/2 -translate-x-1/2 w-full h-full">
                        <svg className="w-full h-full" viewBox="0 0 400 300" fill="none">
                            {/* Left Path: Private Sector */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: showFlows ? 1 : 0, opacity: showFlows ? 0.3 : 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                                d="M200 10 C 200 120, 50 120, 50 250"
                                stroke="#10b981"
                                strokeWidth="3"
                                strokeDasharray="12 12"
                            />
                            {/* Right Path: Treasury */}
                            <motion.path
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: showFlows ? 1 : 0, opacity: showFlows ? 0.3 : 0 }}
                                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                                d="M200 10 C 200 120, 350 120, 350 250"
                                stroke="#c5a059"
                                strokeWidth="3"
                                strokeDasharray="12 12"
                            />
                        </svg>
                    </div>

                    {/* Recipients */}
                    <AnimatePresence>
                        {showFlows && (
                            <div className="absolute bottom-4 w-full flex justify-between px-2 sm:px-8">
                                {/* Private Sector */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    className="w-48 bg-emerald-50/50 p-6 rounded-[2rem] border border-emerald-100 flex flex-col items-center shadow-lg shadow-emerald-200/20"
                                >
                                    <div className="w-14 h-14 bg-white rounded-2xl border border-emerald-100 flex items-center justify-center mb-4 shadow-sm">
                                        <Building2 className="text-emerald-500 w-7 h-7" />
                                    </div>
                                    <p className="text-[10px] font-black text-emerald-600 uppercase mb-2 tracking-widest">Provider Credit</p>
                                    <p className="text-3xl font-heading font-black text-slate-900">$350.00</p>
                                    <p className="text-[9px] text-slate-400 mt-2 font-bold uppercase tracking-wider">Adrère Amellal</p>
                                </motion.div>

                                {/* State Treasury */}
                                <motion.div
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                    className="w-48 bg-slate-900 p-6 rounded-[2rem] border border-slate-800 flex flex-col items-center shadow-2xl shadow-slate-900/30"
                                >
                                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
                                        <Landmark className="text-primary w-7 h-7" />
                                    </div>
                                    <p className="text-[10px] font-black text-slate-500 uppercase mb-2 tracking-widest">State Revenue</p>
                                    <p className="text-3xl font-heading font-black text-white">$65.00</p>
                                    <p className="text-[9px] text-slate-600 mt-2 font-bold uppercase tracking-wider">National Fees</p>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/guardian"
                        className="w-full sm:w-auto px-12 py-5 bg-slate-900 text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 uppercase tracking-[0.2em] text-[10px] active:scale-[0.98]"
                    >
                        Initialize Guardian Mode
                        <ArrowRight className="w-4 h-4 text-primary" />
                    </Link>
                    <button className="w-full sm:w-auto px-12 py-5 bg-white border border-slate-200 text-slate-400 font-black rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 transition-all uppercase tracking-[0.2em] text-[10px]">
                        Download National E-Pass
                        <Download className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
