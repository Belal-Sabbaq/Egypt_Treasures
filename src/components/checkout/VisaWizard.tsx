"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Scan, CheckCircle2, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

export function VisaWizard({ isOpen, onClose, onComplete }: { isOpen: boolean, onClose: () => void, onComplete: () => void }) {
    const [step, setStep] = useState<'idle' | 'uploading' | 'scanning' | 'complete'>('idle');

    const handleStart = () => {
        setStep('uploading');
        setTimeout(() => setStep('scanning'), 1500);
        setTimeout(() => setStep('complete'), 3500);
        setTimeout(() => onComplete(), 5000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg glass border border-white/20 rounded-[2.5rem] overflow-hidden z-[110] shadow-[0_0_50px_rgba(255,215,0,0.15)]"
                    >
                        <div className="p-10 flex flex-col items-center text-center">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-20 h-20 gold-gradient rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
                                <FileText className="text-black w-10 h-10" />
                            </div>

                            <h2 className="text-3xl font-extrabold mb-4">Visa <span className="gold-text">Wizard</span></h2>
                            <p className="text-muted-foreground mb-10 max-w-xs">Drag and drop your passport image to initiate sovereign background verification.</p>

                            <div className="w-full relative">
                                {step === 'idle' && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="border-2 border-dashed border-white/20 rounded-[2rem] p-12 hover:border-primary/50 transition-all group cursor-pointer"
                                        onClick={handleStart}
                                    >
                                        <Upload className="w-12 h-12 text-muted-foreground group-hover:text-primary transition-colors mx-auto mb-4" />
                                        <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-white">Drop Passport JPEG</p>
                                    </motion.div>
                                )}

                                {(step === 'uploading' || step === 'scanning') && (
                                    <div className="relative border border-white/10 rounded-[2rem] p-12 bg-white/5 overflow-hidden">
                                        <div className="relative z-10">
                                            {step === 'uploading' ? (
                                                <div className="flex flex-col items-center">
                                                    <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                                                    <p className="text-sm font-bold uppercase tracking-widest text-primary">Uploading to Secure Core...</p>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center">
                                                    <Scan className="w-12 h-12 text-primary animate-pulse mb-4" />
                                                    <p className="text-sm font-bold uppercase tracking-widest text-primary">AI Pattern Recognition...</p>
                                                </div>
                                            )}
                                        </div>
                                        {step === 'scanning' && (
                                            <motion.div
                                                initial={{ top: 0 }}
                                                animate={{ top: "100%" }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-x-0 h-1 gold-gradient shadow-[0_0_15px_rgba(255,215,0,0.8)] z-20"
                                            />
                                        )}
                                    </div>
                                )}

                                {step === 'complete' && (
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="border border-green-500/30 bg-green-500/10 rounded-[2rem] p-12 flex flex-col items-center"
                                    >
                                        <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />
                                        <p className="text-xl font-bold text-green-500 mb-2">Verified Successfully</p>
                                        <p className="text-xs text-green-500/70 font-bold uppercase tracking-widest">Digital Visa ID: EGY-VX-9921</p>
                                    </motion.div>
                                )}
                            </div>

                            <div className="mt-10 flex items-center justify-center gap-6 text-[10px] text-muted-foreground uppercase font-bold tracking-[0.2em]">
                                <span className="flex items-center gap-2"><Scan className="w-3 h-3" /> Biometric Sync</span>
                                <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3" /> Interpol Checked</span>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
