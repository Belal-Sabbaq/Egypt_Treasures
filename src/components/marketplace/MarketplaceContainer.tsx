"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { INVENTORY, Category } from "@/lib/data";
import { ItemCard } from "@/components/marketplace/ItemCard";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export function MarketplaceContainer() {
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState<Category | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const query = searchParams.get("search");
        if (query) {
            setSearchQuery(query);
        }
    }, [searchParams]);

    const filteredItems = INVENTORY.filter(item => {
        const matchesTab = activeTab === 'ALL' || item.category === activeTab;
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesTab && matchesSearch;
    });

    const tabs: { label: string, value: Category | 'ALL' }[] = [
        { label: "All Treasures", value: 'ALL' },
        { label: "Stays", value: 'STAY' },
        { label: "Experiences", value: 'EXPERIENCE' },
        { label: "National Treasures", value: 'CULTURE' },
    ];

    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-white text-slate-900">
            <div className="max-w-7xl mx-auto">
                <header className="mb-16">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-6">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <span className="text-slate-200">/</span>
                        <span className="text-slate-900">Sovereign Marketplace</span>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <div className="space-y-4">
                            <h1 className="text-6xl font-heading font-black tracking-tight text-slate-900">
                                Unified <span className="text-primary italic">Marketplace</span>
                            </h1>
                            <p className="text-slate-500 max-w-xl font-medium leading-relaxed">
                                Curated official stays and verified experiences, directly connected to the sovereign service network and heritage conservation ecosystem.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search treasures..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all w-72 font-medium"
                                />
                            </div>
                            <button className="p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                                <SlidersHorizontal className="w-4 h-4 text-slate-400 group-hover:text-primary" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Ecosystem Tabs */}
                <div className="flex items-center gap-2 mb-12 overflow-x-auto no-scrollbar pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={`
                                px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all duration-500 border
                                ${activeTab === tab.value
                                    ? "bg-slate-900 text-white border-slate-900 shadow-xl shadow-slate-900/20"
                                    : "bg-white text-slate-400 border-slate-100 hover:border-primary/30 hover:text-primary"}
                            `}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                >
                    {filteredItems.map((item) => (
                        <ItemCard key={item.id} item={item} />
                    ))}
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <div className="text-slate-200 font-heading text-8xl font-black">404</div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No treasures found matching your query</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export function MarketplaceLoading() {
    return (
        <div className="pt-32 pb-20 px-6 min-h-screen bg-white flex items-center justify-center">
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] animate-pulse">Syncing Marketplace...</p>
        </div>
    );
}
