'use client';

import { useParams } from 'next/navigation';
import { INVENTORY, BookingOption } from '@/lib/data';
import {
    Star,
    MapPin,
    ShieldCheck,
    Landmark,
    ArrowLeft,
    ChevronRight,
    Info,
    CheckCircle2,
    ExternalLink,
    Shield,
    Zap,
    Globe
} from 'lucide-react';
import { usePlanner } from '@/context/PlannerContext';
import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ItemDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const item = INVENTORY.find((i) => i.id === id);
    const [activeImage, setActiveImage] = useState(0);
    const { addToPlanner, items } = usePlanner();
    const [isAdded, setIsAdded] = useState<string | null>(null);

    const handleAddToPlanner = (option: BookingOption) => {
        if (!item) return;
        addToPlanner(item, option);
        setIsAdded(option.id);
        setTimeout(() => setIsAdded(null), 2000);
    };

    if (!item) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center pt-24">
                <h1 className="text-2xl font-bold mb-4">Treasure Not Found</h1>
                <Link href="/marketplace" className="text-primary hover:underline">Return to Marketplace</Link>
            </div>
        );
    }

    const getProviderIcon = (type: string) => {
        switch (type) {
            case 'DIRECT': return Zap;
            case 'AGENCY': return Globe;
            default: return Shield;
        }
    };

    const getProviderColor = (type: string) => {
        switch (type) {
            case 'DIRECT': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            case 'AGENCY': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
            default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0b] text-white pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumbs */}
                <Link
                    href="/marketplace"
                    className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-semibold uppercase tracking-widest">Back to Marketplace</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
                    {/* Left: Gallery & Content */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative aspect-[16/9] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-slate-200 border border-slate-100"
                            >
                                <img
                                    src={item.gallery?.[activeImage] || item.image}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-6 left-6 flex gap-2">
                                    {item.isGovAsset && (
                                        <div className="bg-primary text-white text-[10px] font-black px-4 py-2 rounded-full border border-white/20 shadow-xl backdrop-blur-md uppercase tracking-widest">
                                            Official Asset
                                        </div>
                                    )}
                                </div>
                            </motion.div>

                            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
                                {item.gallery?.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={cn(
                                            "relative w-24 h-24 rounded-2xl overflow-hidden shrink-0 transition-all duration-300 border-2",
                                            activeImage === idx ? "border-primary scale-105 shadow-lg shadow-primary/20" : "border-slate-100 hover:border-slate-300"
                                        )}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-6xl font-heading font-black tracking-tight text-slate-900 leading-[1.1]">
                                    {item.name}
                                </h1>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                                        <Star className="w-4 h-4 text-primary fill-primary" />
                                        <span className="text-sm font-bold text-slate-900">{item.rating}</span>
                                        <span className="text-xs text-slate-400 font-medium ml-1">AuthentiScore™</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-500">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-bold uppercase tracking-widest">{item.location}, Egypt</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xl text-slate-500 leading-relaxed font-normal">
                                {item.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {item.tags?.map(tag => (
                                    <span key={tag} className="px-5 py-2 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-bold uppercase tracking-widest border border-slate-100">
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Booking Options */}
                    <div className="lg:col-span-5">
                        <div className="sticky top-32 space-y-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-primary">
                                    <ShieldCheck className="w-6 h-6" />
                                    <h2 className="text-xs font-bold uppercase tracking-[0.3em]">Sovereign Verification</h2>
                                </div>
                                <h3 className="text-3xl font-heading font-black text-slate-900">Secure Availability</h3>
                            </div>

                            <div className="space-y-6">
                                {item.bookingOptions?.map((option) => (
                                    <div
                                        key={option.id}
                                        className={cn(
                                            "bg-white border-2 rounded-[2.5rem] p-8 transition-all duration-500",
                                            isAdded === option.id
                                                ? "border-accent bg-accent/5"
                                                : "border-slate-100 hover:border-primary/30"
                                        )}
                                    >
                                        <div className="flex justify-between items-start mb-8">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Official Provider</span>
                                                    {option.type === 'DIRECT' && <Zap className="w-3 h-3 text-primary fill-primary" />}
                                                </div>
                                                <h4 className="text-2xl font-heading font-black text-slate-900 leading-tight">{option.providerName}</h4>
                                                <div className="flex items-center gap-3">
                                                    <span className={cn(
                                                        "text-[8px] font-black px-2 py-0.5 rounded-md border uppercase tracking-widest",
                                                        option.type === 'DIRECT' ? "bg-primary/10 border-primary/20 text-primary" : "bg-slate-100 border-slate-200 text-slate-500"
                                                    )}>
                                                        {option.type} Access
                                                    </span>
                                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{option.method} Booking</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-3xl font-heading font-black text-slate-900">${option.price}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">USD</div>
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-8">
                                            {option.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-3 text-slate-600">
                                                    <CheckCircle2 className="w-4 h-4 text-accent" />
                                                    <span className="text-sm font-medium">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={() => handleAddToPlanner(option)}
                                            disabled={items.some(i => i.option.id === option.id)}
                                            className={cn(
                                                "w-full py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest transition-all",
                                                isAdded === option.id
                                                    ? "bg-accent text-white"
                                                    : items.some(i => i.option.id === option.id)
                                                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                                        : "bg-slate-900 text-white hover:bg-slate-800 shadow-xl shadow-slate-900/10"
                                            )}
                                        >
                                            {isAdded === option.id ? (
                                                <>
                                                    <CheckCircle2 className="w-5 h-5" />
                                                    Added to Sequence
                                                </>
                                            ) : items.some(i => i.option.id === option.id) ? (
                                                "In Itinerary"
                                            ) : (
                                                "Add to Sovereign Itinerary"
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-4">
                                <div className="flex items-center gap-3 font-heading font-bold text-lg">
                                    <Shield className="w-6 h-6 text-primary" />
                                    National Heritage Promise
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">
                                    Your booking contributes directly to the National Antiquities Fund of the Arab Republic of Egypt.
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Official Government Channel</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
