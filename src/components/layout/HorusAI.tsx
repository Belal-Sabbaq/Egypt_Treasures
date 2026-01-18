"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Video, Sparkles, User, Bot } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
    role: "user" | "bot";
    content: string;
}

export function HorusAI({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>([
        { role: "bot", content: "Greetings, traveler. I am Horus, your sovereign guide. How may I assist your journey through the legacy of Egypt today?" }
    ]);
    const [input, setInput] = useState("");
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages: Message[] = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");

        // RAG Simulation
        setTimeout(() => {
            let botResponse = "That sounds wonderful. I am checking the sovereign database for the best options.";

            if (input.toLowerCase().includes("siwa")) {
                botResponse = "Siwa is a sanctuary of serenity. I recommend the Adrère Amellal Eco-Lodge for a deep connection with nature, and a visit to the Salt Lakes for their healing properties. Shall I add these to your itinerary?";
            }

            setMessages([...newMessages, { role: "bot", content: botResponse }]);
        }, 1000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
                    />

                    {/* Sheet */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-slate-100 shadow-2xl z-[70] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-900">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                                    <Sparkles className="text-white w-6 h-6 fill-white" />
                                </div>
                                <div className="space-y-0.5">
                                    <h2 className="text-white font-heading font-black text-xl tracking-tight leading-none uppercase">Horus Alpha</h2>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">National AI Concierge</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2.5 hover:bg-white/10 rounded-full transition-colors group"
                            >
                                <X className="text-white/40 group-hover:text-white w-6 h-6" />
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-8 space-y-8 scroll-smooth"
                        >
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "flex flex-col max-w-[90%]",
                                        msg.role === "user" ? "ml-auto items-end" : "items-start"
                                    )}
                                >
                                    <div className={cn(
                                        "p-6 rounded-[2rem] text-sm leading-relaxed shadow-sm",
                                        msg.role === "user"
                                            ? "bg-slate-900 text-white font-medium rounded-tr-none"
                                            : "bg-slate-50 border border-slate-100 text-slate-600 rounded-tl-none"
                                    )}>
                                        {msg.content}
                                    </div>
                                    <span className="text-[9px] font-black text-slate-300 mt-2 px-1 uppercase tracking-[0.2em]">
                                        {msg.role === "bot" ? "Sequence Processor" : "Verified Citizen"}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Actions/Footer */}
                        <div className="p-8 border-t border-slate-100 space-y-6 bg-slate-50/50">
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Type your query..."
                                    className="flex-1 bg-white border border-slate-200 rounded-2xl px-6 py-4 text-sm outline-none focus:border-primary/50 transition-all font-medium placeholder:text-slate-300 shadow-inner"
                                />
                                <button
                                    onClick={handleSend}
                                    className="p-4 bg-slate-900 rounded-2xl text-white hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="flex items-center gap-3 pt-2">
                                <button className="flex-1 flex items-center justify-center gap-3 bg-white border border-slate-100 hover:bg-slate-50 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-sm group">
                                    <Video className="w-4 h-4 text-primary" />
                                    Bridge To Human Agent
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
