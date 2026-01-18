"use client";

import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HorusAI } from "@/components/layout/HorusAI";

export default function Home() {
  const [isHorusOpen, setIsHorusOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (searchValue.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push('/marketplace');
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-20 pointer-events-none"
          poster="https://images.unsplash.com/photo-1544111326-7ad1b695be24?auto=format&fit=crop&q=80&w=2000"
        >
          <source src="https://www.experienceegypt.eg/files/MOT_AC_Final_1.mp4" type="video/mp4" />
        </video>
        {/* Sovereign Golden Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-white/60 to-white" />
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-primary/5 opacity-40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Official Sovereign Portal • Arab Republic of Egypt
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tighter leading-[0.9] text-slate-900">
            The <span className="text-primary italic">Immortal</span> <br />
            Legacy
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            Experience the eternal presence of the Pharaohs through a unified national ecosystem of discovery and protection.
          </p>
        </motion.div>

        {/* Search Bar - Premium Light Design */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="group relative bg-white border border-slate-100 p-3 rounded-[2.5rem] shadow-2xl shadow-slate-200/60 flex items-center transition-all hover:border-primary/30">
            <div className="flex-1 flex items-center px-6">
              <Search className="w-6 h-6 text-slate-300 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search by destination or heritage sequence..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="bg-transparent border-none outline-none text-slate-900 w-full py-5 px-4 text-xl font-heading font-bold placeholder:text-slate-200"
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-slate-900 text-white px-12 py-5 rounded-[1.8rem] text-sm font-black uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
            >
              Explore Hub
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-3 opacity-60">
            {['Great Pyramids', 'Luxor', 'Siwa Oasis', 'Official Visas'].map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSearchValue(tag);
                  router.push(`/marketplace?search=${encodeURIComponent(tag)}`);
                }}
                className="px-4 py-2 bg-slate-50 text-[10px] font-bold text-slate-500 rounded-full border border-slate-100 hover:text-primary hover:border-primary/20 transition-all uppercase tracking-widest"
              >
                {tag}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Horus AI Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1, y: -4 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsHorusOpen(true)}
        className="fixed bottom-12 right-12 z-40 px-8 py-5 rounded-[2rem] bg-slate-900 text-white shadow-2xl shadow-slate-900/30 flex items-center gap-4 group"
      >
        <div className="relative">
          <Sparkles className="text-primary w-6 h-6 group-hover:rotate-12 transition-transform fill-primary" />
          <span className="absolute -top-3 -right-3 bg-red-500 text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-slate-900">
            1
          </span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Query Horus</span>
      </motion.button>

      {/* Horus AI Overlay */}
      <HorusAI isOpen={isHorusOpen} onClose={() => setIsHorusOpen(false)} />

    </div>
  );
}
