'use client';

import { usePlanner } from '@/context/PlannerContext';
import { Trash2, ArrowRight, ShoppingBag, MapPin, Calendar, Clock, Landmark, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlannerPage() {
    const { items, removeFromPlanner, totalPrice, clearPlanner } = usePlanner();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white text-slate-900 pt-32 px-6 flex flex-col items-center justify-center">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
                    <ShoppingBag className="w-10 h-10 text-slate-300" />
                </div>
                <h1 className="text-4xl font-heading font-black mb-4">Your Planner is Empty</h1>
                <p className="text-slate-500 mb-8 text-center max-w-md font-medium">Start your adventure by exploring the marketplace and adding treasures to your itinerary.</p>
                <Link
                    href="/marketplace"
                    className="bg-primary text-white px-10 py-4 rounded-xl font-bold hover:shadow-xl transition-all shadow-primary/20"
                >
                    Explore Marketplace
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-slate-100 pb-12">
                    <div>
                        <h1 className="text-6xl font-heading font-black mb-4 tracking-tight text-slate-900">Your <span className="text-primary italic">Sovereign</span> Itinerary</h1>
                        <p className="text-slate-500 font-bold uppercase tracking-[0.2em] text-xs">Review and refine your selected treasures before final checkout.</p>
                    </div>
                    <button
                        onClick={clearPlanner}
                        className="text-xs font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-[0.3em] flex items-center gap-2"
                    >
                        Clear All Sequence
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* List */}
                    <div className="lg:col-span-8 space-y-6">
                        <AnimatePresence mode="popLayout">
                            {items.map((plannerItem) => (
                                <motion.div
                                    key={plannerItem.uid}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="bg-white border border-slate-100 rounded-3xl p-6 flex gap-6 group hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500"
                                >
                                    <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-sm">
                                        <img src={plannerItem.item.image} alt="" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-grow flex flex-col justify-between py-1">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="text-2xl font-heading font-black text-slate-900">{plannerItem.item.name}</h3>
                                                <div className="text-2xl font-black text-primary font-heading">${plannerItem.option.price}</div>
                                            </div>

                                            <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-3.5 h-3.5 text-primary" />
                                                    {plannerItem.item.location}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <ShoppingBag className="w-3.5 h-3.5 text-accent" />
                                                    {plannerItem.option.providerName}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-2">
                                                {plannerItem.item.isGovAsset && (
                                                    <div className="bg-primary/10 text-primary text-[8px] font-black px-3 py-1.5 rounded-full border border-primary/20 tracking-widest uppercase">
                                                        OFFICIAL
                                                    </div>
                                                )}
                                                {plannerItem.item.isVerifiedPartner && (
                                                    <div className="bg-accent/10 text-accent text-[8px] font-black px-3 py-1.5 rounded-full border border-accent/20 tracking-widest uppercase">
                                                        SECURE
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                onClick={() => removeFromPlanner(plannerItem.uid)}
                                                className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all rounded-full"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-slate-900 text-white rounded-4xl p-10 sticky top-32 shadow-2xl shadow-slate-900/20">
                            <h2 className="text-2xl font-heading font-black uppercase tracking-[0.2em] mb-10 border-b border-white/10 pb-6">Summary</h2>

                            <div className="space-y-6 mb-10">
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Total Treasures</span>
                                    <span className="font-bold">{items.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Processing Fee</span>
                                    <span className="font-bold text-accent">FREE</span>
                                </div>
                                <div className="pt-8 border-t border-white/10 flex justify-between items-end">
                                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Sovereign Total</span>
                                    <span className="text-4xl font-heading font-black text-primary">${totalPrice}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="w-full bg-primary text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-primary/90 shadow-xl shadow-primary/20 transition-all group"
                            >
                                Proceed to Sequence
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="mt-10 p-5 bg-white/5 border border-white/10 rounded-2xl">
                                <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em] leading-relaxed">
                                    Visa status and documentation will be evaluated in the next step based on your nationality.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
