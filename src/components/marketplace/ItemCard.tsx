"use client";

import { Item } from "@/lib/data";
import { motion } from "framer-motion";
import { Star, Shield, ArrowUpRight, Landmark, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ItemCard({ item }: { item: Item }) {
    const getTag = () => {
        switch (item.category) {
            case 'STAY': return { text: "Official Alliance", icon: Shield, color: "bg-slate-900 text-white border-slate-900" };
            case 'EXPERIENCE': return { text: "Verified Heritage", icon: Shield, color: "bg-accent text-white border-accent" };
            case 'CULTURE': return { text: "National Asset", icon: Landmark, color: "bg-primary text-white border-primary" };
            default: return { text: "Verified", icon: Shield, color: "bg-slate-100 text-slate-500 border-slate-200" };
        }
    };

    const tag = getTag();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -8 }}
            className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden hover:border-primary/30 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
        >
            <Link href={`/marketplace/${item.id}`} className="block">
                <div className="relative h-72 w-full overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />

                    {/* Verification Tag */}
                    <div className={`absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full border text-[9px] font-black uppercase tracking-[0.2em] shadow-xl ${tag.color}`}>
                        <tag.icon className="w-3 h-3" />
                        {tag.text}
                    </div>

                    {/* Gradient Overlay for visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <div className="p-8 pb-4">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{item.location}</span>
                        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
                            <Star className="w-3 h-3 text-primary fill-primary" />
                            <span className="text-xs font-black text-slate-900">{item.rating}</span>
                        </div>
                    </div>

                    <h3 className="text-2xl font-heading font-black text-slate-900 mb-4 group-hover:text-primary transition-colors line-clamp-1">
                        {item.name}
                    </h3>

                    <div className="flex items-end justify-between">
                        <div className="space-y-1">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Sequence from</p>
                            <p className="text-3xl font-heading font-black text-slate-900 leading-none">
                                ${item.price}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 bg-accent/10 px-3 py-1.5 rounded-xl">
                            <Zap className="w-3 h-3 text-accent fill-accent" />
                            <span className="text-[9px] font-black text-accent uppercase tracking-widest">Instant</span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="p-8 pt-0">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/marketplace/${item.id}`}
                        className="flex-1 bg-slate-900 text-white font-black py-4 rounded-xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 group/btn"
                    >
                        Explore Sequence
                        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
