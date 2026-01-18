"use client";

import Link from "next/link";
import Image from "next/image";
import { Landmark, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = [
        {
            title: "Platform",
            links: [
                { name: "About", href: "/about" },
                { name: "Marketplace", href: "/marketplace" },
                { name: "Guardian Mode", href: "/guardian" },
                { name: "FAQs", href: "/faqs" },
            ],
        },
        {
            title: "Compliance",
            links: [
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms & Conditions", href: "/terms" },
                { name: "Accessibility", href: "/accessibility" },
                { name: "Security", href: "/security" },
            ],
        },
        {
            title: "Support",
            links: [
                { name: "Contact", href: "/contact" },
                { name: "Official Resources", href: "https://www.experienceegypt.eg/en" },
                { name: "Tourism Portal", href: "#" },
            ],
        },
    ];

    return (
        <footer className="bg-slate-900 border-t border-slate-800 pt-20 pb-10 px-6 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center" aria-label="Egypt Digital Treasures Home">
                            <div className="relative h-12 w-28 group-hover:scale-110 transition-transform">
                                <Image
                                    src="/Egypt_Digital_Treasures.png"
                                    alt="Egypt Digital Treasures"
                                    fill
                                    className="object-contain object-left"
                                />
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed font-medium">
                            The official sovereign gateway for exploring Egypt's national treasures, verified experiences, and sustainable tourism ecosystem.
                        </p>
                        <div className="flex gap-4">
                            <Facebook className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Twitter className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Instagram className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                            <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h4 className="font-heading font-black text-xs uppercase tracking-[0.2em] mb-8 text-white">{section.title}</h4>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="text-sm text-slate-400 hover:text-primary transition-colors font-medium"
                                            target={link.href.startsWith("http") ? "_blank" : undefined}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Partner Branding Section */}
                <div className="border-t border-white/5 pt-12 mb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        <div className="space-y-8 text-center lg:text-left">
                            <h4 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground">
                                Strategic Partners & Oversight
                            </h4>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-12">
                                <div className="relative h-20 w-48 grayscale hover:grayscale-0 transition-all duration-500">
                                    <Image
                                        src="/Ministry_of_tourism.jpg"
                                        alt="Ministry of Tourism"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="relative h-16 w-16 grayscale hover:grayscale-0 transition-all duration-500">
                                    <Image
                                        src="/Sabbaq_Full_Logo.png"
                                        alt="SabbaqBDC"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div className="relative h-16 w-16 grayscale hover:grayscale-0 transition-all duration-500">
                                    <Image
                                        src="/horus-bdc-logo.png"
                                        alt="HorusBDC"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-center lg:items-end gap-3 shrink-0">
                            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                                <Mail className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">support@egypttreasures.gov.eg</span>
                            </div>
                            <div className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
                                <Phone className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium">+20 (0) 2 1234 5678</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                        © {currentYear} Egypt Treasures. All sovereign rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-muted-foreground font-medium">
                        <span>Made with ❤️ in Cairo</span>
                        <span>•</span>
                        <span>Powered by SabbaqBDC & HorusBDC</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
