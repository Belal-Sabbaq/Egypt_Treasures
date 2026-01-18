"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Landmark, Shield, BarChart3, ShoppingBag, Search, User, ClipboardList, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePlanner } from "@/context/PlannerContext";

export function Navbar() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const { items } = usePlanner();

    const mode = (pathname?.startsWith("/investment") || pathname?.startsWith("/investor")) ? "investor" : "tourist";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = mode === "tourist" ? [
        { name: "Explore", href: "/", icon: Landmark },
        { name: "Treasures", href: "/marketplace", icon: ShoppingBag },
        { name: "Guardian", href: "/guardian", icon: Shield },
        { name: "Experience Egypt", href: "https://www.experienceegypt.eg/en", icon: ExternalLink, external: true },
    ] : [
        { name: "Analytics", href: "/investment", icon: BarChart3 },
        { name: "Opportunities", href: "/investment/opportunities", icon: Landmark },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6",
                isScrolled ? "glass border-b py-3" : "bg-transparent py-4"
            )}
        >
            {/* Top Partner Bar (Optional but good for branding) */}
            <div className={cn(
                "max-w-7xl mx-auto flex justify-end items-center mb-2 overflow-hidden transition-all duration-500",
                isScrolled ? "h-0 opacity-0" : "h-12 opacity-100"
            )}>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground">This solution is powered by</span>
                    <div className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all">
                        <div className="relative h-10 w-10">
                            <Image src="/Sabbaq_Full_Logo.png" alt="Sabbaq" fill className="object-contain" />
                        </div>
                        <div className="relative h-10 w-10">
                            <Image src="/horus-bdc-logo.png" alt="Horus" fill className="object-contain" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center shrink-0" aria-label="Egypt Digital Treasures Home">
                    <div className="relative h-14 w-32 group-hover:scale-105 transition-transform">
                        <Image
                            src="/Egypt_Digital_Treasures.png"
                            alt="Egypt Digital Treasures"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                <div className="hidden lg:flex items-center gap-10">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            className={cn(
                                "flex items-center gap-2 text-sm font-bold transition-all hover:text-primary relative group py-2",
                                pathname === item.href ? "text-primary" : "text-slate-600"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            {item.name}
                            {pathname === item.href && (
                                <motion.div
                                    layoutId="nav-underline"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <Link
                        href="/planner"
                        className="relative p-2 hover:bg-slate-100 rounded-full transition-colors group"
                    >
                        <ClipboardList className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                        {items.length > 0 && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                                {items.length}
                            </span>
                        )}
                    </Link>

                    <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <Search className="w-5 h-5 text-slate-600" />
                    </button>

                    {/* Mode Switcher */}
                    <div className="hidden sm:flex items-center bg-slate-50 rounded-full p-1 border border-slate-200 shadow-sm">
                        <Link
                            href="/"
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold transition-all",
                                mode === "tourist" ? "bg-primary text-white shadow-md" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            Tourist
                        </Link>
                        <Link
                            href="/investment"
                            className={cn(
                                "px-3 py-1 rounded-full text-xs font-bold transition-all",
                                mode === "investor" ? "bg-primary text-white shadow-md" : "text-slate-500 hover:text-slate-900"
                            )}
                        >
                            Investor
                        </Link>
                    </div>

                    <Link href="/profile" className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-full px-4 py-1.5 hover:bg-slate-800 transition-colors shadow-lg">
                        <User className="w-4 h-4 text-white" />
                        <span className="text-xs font-bold text-white">Sarah</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
