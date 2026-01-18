'use client';

import { usePlanner } from '@/context/PlannerContext';
import { NATIONALITIES, getVisaRequirement } from '@/lib/visa-logic';
import {
    ChevronRight,
    ArrowLeft,
    ShieldCheck,
    FileText,
    Upload,
    CheckCircle2,
    Info,
    FileText as PassportIcon,
    AlertCircle,
    Zap
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

type Step = 'NATIONALITY' | 'VISA_CHECK' | 'DOCUMENTS' | 'SUCCESS';

export default function CheckoutPage() {
    const { items, totalPrice } = usePlanner();
    const [step, setStep] = useState<Step>('NATIONALITY');
    const [nationality, setNationality] = useState('');
    const [hasVisa, setHasVisa] = useState<boolean | null>(null);
    const [files, setFiles] = useState<{ passport: boolean; visa: boolean }>({ passport: false, visa: false });

    const visaRequired = nationality ? getVisaRequirement(nationality) === 'REQUIRED' : false;

    const handleNext = () => {
        if (step === 'NATIONALITY') {
            if (visaRequired) setStep('VISA_CHECK');
            else setStep('DOCUMENTS');
        } else if (step === 'VISA_CHECK') {
            setStep('DOCUMENTS');
        } else if (step === 'DOCUMENTS') {
            setStep('SUCCESS');
        }
    };

    const handleBack = () => {
        if (step === 'VISA_CHECK') setStep('NATIONALITY');
        else if (step === 'DOCUMENTS') {
            if (visaRequired) setStep('VISA_CHECK');
            else setStep('NATIONALITY');
        }
    };

    if (items.length === 0 && step !== 'SUCCESS') {
        return (
            <div className="min-h-screen bg-[#0a0a0b] text-white pt-32 px-6 flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Your Planner is Empty</h1>
                <Link href="/marketplace" className="text-primary hover:underline">Go to Marketplace</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-slate-900 pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <Link
                        href="/planner"
                        className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-heading font-black tracking-tight">Sovereign Checkout</h1>
                        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">
                            Step {step === 'NATIONALITY' ? '1' : step === 'VISA_CHECK' ? '2' : step === 'DOCUMENTS' ? '3' : '4'} of 4
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Flow */}
                    <div className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {step === 'NATIONALITY' && (
                                <motion.div
                                    key="nationality"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-heading font-black text-slate-900">Declare Nationality</h2>
                                        <p className="text-slate-500 font-medium">Please select your primary passport nationality to determine visa requirements.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {NATIONALITIES.map((n) => (
                                            <button
                                                key={n.code}
                                                onClick={() => setNationality(n.code)}
                                                className={cn(
                                                    "p-6 rounded-2xl border text-left transition-all group relative overflow-hidden",
                                                    nationality === n.code
                                                        ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
                                                        : "border-slate-100 hover:border-primary/30 bg-white"
                                                )}
                                            >
                                                <div className="flex items-center justify-between relative z-10">
                                                    <div>
                                                        <div className="text-sm font-bold uppercase tracking-widest text-slate-400 group-hover:text-primary transition-colors mb-1">{n.code}</div>
                                                        <div className="text-xl font-heading font-bold text-slate-900">{n.name}</div>
                                                    </div>
                                                    {nationality === n.code && <CheckCircle2 className="w-6 h-6 text-primary" />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={!nationality}
                                        className="w-full bg-slate-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-slate-800 disabled:opacity-30 transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        Continue to Identity Verification
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 'VISA_CHECK' && (
                                <motion.div
                                    key="visa"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-3xl flex items-start gap-6">
                                        <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <Info className="w-7 h-7 text-primary" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-heading font-black mb-2">Visa Requirement Detected</h2>
                                            <p className="text-slate-500 font-medium leading-relaxed">
                                                Based on your {NATIONALITIES.find(n => n.code === nationality)?.name} citizenship, a valid entry visa is mandatory.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">Do you already possess a valid Egyptian Visa?</h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <button
                                                onClick={() => setHasVisa(true)}
                                                className={cn(
                                                    "p-8 rounded-3xl border text-center transition-all",
                                                    hasVisa === true ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-slate-100 hover:border-primary/20 bg-white"
                                                )}
                                            >
                                                <div className="text-xl font-heading font-bold mb-1">Yes, I have it</div>
                                                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Manual Upload</div>
                                            </button>
                                            <button
                                                onClick={() => setHasVisa(false)}
                                                className={cn(
                                                    "p-8 rounded-3xl border text-center transition-all",
                                                    hasVisa === false ? "border-primary bg-primary/5 shadow-lg shadow-primary/5" : "border-slate-100 hover:border-primary/20 bg-white"
                                                )}
                                            >
                                                <div className="text-xl font-heading font-bold mb-1">No, I need one</div>
                                                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">Automatic Application</div>
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={hasVisa === null}
                                        className="w-full bg-slate-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-slate-800 disabled:opacity-30 transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        Proceed to Documentation
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 'DOCUMENTS' && (
                                <motion.div
                                    key="docs"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-4">
                                        <h2 className="text-2xl font-heading font-black">Digital Repository Upload</h2>
                                        <p className="text-slate-500 font-medium font-sans">Official documents are secured via 256-bit sovereign encryption.</p>
                                    </div>

                                    <div className="space-y-4">
                                        {/* Passport Upload */}
                                        <div
                                            onClick={() => setFiles(f => ({ ...f, passport: !f.passport }))}
                                            className={cn(
                                                "p-8 rounded-3xl border cursor-pointer group transition-all",
                                                files.passport ? "border-accent bg-accent/5" : "border-slate-100 bg-white hover:border-primary/20"
                                            )}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-6">
                                                    <div className={cn(
                                                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                                                        files.passport ? "bg-accent/20 text-accent" : "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                                                    )}>
                                                        <PassportIcon className="w-7 h-7" />
                                                    </div>
                                                    <div>
                                                        <div className="text-xl font-heading font-bold">Passport Scan</div>
                                                        <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Bio-data Page (Required)</div>
                                                    </div>
                                                </div>
                                                {files.passport ? <CheckCircle2 className="w-7 h-7 text-accent" /> : <Upload className="w-6 h-6 text-slate-300 group-hover:text-primary" />}
                                            </div>
                                        </div>

                                        {/* Visa Upload (Conditional) */}
                                        {visaRequired && hasVisa === true && (
                                            <div
                                                onClick={() => setFiles(f => ({ ...f, visa: !f.visa }))}
                                                className={cn(
                                                    "p-8 rounded-3xl border cursor-pointer group transition-all",
                                                    files.visa ? "border-accent bg-accent/5" : "border-slate-100 bg-white hover:border-primary/20"
                                                )}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-6">
                                                        <div className={cn(
                                                            "w-14 h-14 rounded-2xl flex items-center justify-center transition-colors",
                                                            files.visa ? "bg-accent/20 text-accent" : "bg-slate-50 text-slate-400 group-hover:bg-primary/10 group-hover:text-primary"
                                                        )}>
                                                            <FileText className="w-7 h-7" />
                                                        </div>
                                                        <div>
                                                            <div className="text-xl font-heading font-bold">Existing Visa</div>
                                                            <div className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Current Entry Permit</div>
                                                        </div>
                                                    </div>
                                                    {files.visa ? <CheckCircle2 className="w-7 h-7 text-accent" /> : <Upload className="w-6 h-6 text-slate-300 group-hover:text-primary" />}
                                                </div>
                                            </div>
                                        )}

                                        {/* Dynamic Application Notice */}
                                        {visaRequired && hasVisa === false && (
                                            <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl flex gap-4">
                                                <Zap className="w-5 h-5 text-primary shrink-0" />
                                                <p className="text-xs font-bold text-primary/80 uppercase tracking-widest leading-relaxed">
                                                    Official Visa application will be automatically generated as part of this sequence. No manual upload required.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        onClick={handleNext}
                                        disabled={!files.passport || (visaRequired && hasVisa === true && !files.visa)}
                                        className="w-full bg-slate-900 text-white py-5 rounded-2xl flex items-center justify-center gap-3 font-bold uppercase tracking-widest hover:bg-slate-800 disabled:opacity-30 transition-all shadow-xl shadow-slate-900/10"
                                    >
                                        Finalize Sovereign Sequence
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </motion.div>
                            )}

                            {step === 'SUCCESS' && (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-20 bg-slate-50 border border-slate-100 rounded-4xl px-12"
                                >
                                    <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <CheckCircle2 className="w-12 h-12 text-accent" />
                                    </div>
                                    <h2 className="text-5xl font-heading font-black mb-6">Sequence Verified</h2>
                                    <p className="text-slate-500 font-medium mb-10 max-w-sm mx-auto">
                                        Your itinerary has been formally registered in the national digital repository.
                                        {visaRequired && hasVisa === false && <span className="block mt-4 text-primary font-bold uppercase tracking-widest text-[10px]">E-Visa Processing Initiated</span>}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <Link
                                            href="/profile"
                                            className="bg-slate-900 text-white px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                                        >
                                            View Portfolio
                                        </Link>
                                        <Link
                                            href="/marketplace"
                                            className="bg-white border border-slate-200 text-black px-10 py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all"
                                        >
                                            Exploration Hub
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Side Panel: Sumary */}
                    <div className="lg:col-span-4">
                        <div className="bg-slate-900 text-white rounded-3xl p-8 sticky top-32 shadow-2xl shadow-slate-900/20">
                            <h2 className="text-xl font-heading font-black uppercase tracking-[0.2em] mb-10 border-b border-white/10 pb-6 text-white/50">Itinerary Summary</h2>

                            <div className="space-y-6 mb-10">
                                {items.map(item => (
                                    <div key={item.uid} className="flex justify-between items-start">
                                        <div>
                                            <div className="font-heading font-black text-sm uppercase mb-1">{item.item.name}</div>
                                            <div className="text-[10px] text-slate-400 font-bold tracking-widest uppercase">{item.option.providerName}</div>
                                        </div>
                                        <div className="font-heading font-black">${item.option.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4 pt-10 border-t border-white/10 mb-8">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Sovereign Total</span>
                                    <span className="text-3xl font-heading font-black text-primary">${totalPrice}</span>
                                </div>
                            </div>

                            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex gap-4">
                                <ShieldCheck className="w-5 h-5 text-accent shrink-0" />
                                <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-widest">
                                    Transaction guaranteed by the Ministry of Tourism & SabbaqBDC Protocol.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
