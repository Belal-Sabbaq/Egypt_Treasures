'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Item, BookingOption } from '@/lib/data';

export interface PlannerItem {
    uid: string;
    item: Item;
    option: BookingOption;
    addedAt: number;
}

interface PlannerContextType {
    items: PlannerItem[];
    addToPlanner: (item: Item, option: BookingOption) => void;
    removeFromPlanner: (uid: string) => void;
    clearPlanner: () => void;
    totalPrice: number;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export function PlannerProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<PlannerItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('treasures_planner');
        if (saved) {
            try {
                setItems(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to load planner', e);
            }
        }
    }, []);

    // Sync to localStorage
    useEffect(() => {
        localStorage.setItem('treasures_planner', JSON.stringify(items));
    }, [items]);

    const addToPlanner = (item: Item, option: BookingOption) => {
        const newItem: PlannerItem = {
            uid: Math.random().toString(36).substr(2, 9),
            item,
            option,
            addedAt: Date.now(),
        };
        setItems((prev) => [...prev, newItem]);
    };

    const removeFromPlanner = (uid: string) => {
        setItems((prev) => prev.filter((i) => i.uid !== uid));
    };

    const clearPlanner = () => {
        setItems([]);
    };

    const totalPrice = items.reduce((acc, curr) => acc + curr.option.price, 0);

    return (
        <PlannerContext.Provider value={{ items, addToPlanner, removeFromPlanner, clearPlanner, totalPrice }}>
            {children}
        </PlannerContext.Provider>
    );
}

export function usePlanner() {
    const context = useContext(PlannerContext);
    if (context === undefined) {
        throw new Error('usePlanner must be used within a PlannerProvider');
    }
    return context;
}
