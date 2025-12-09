
'use client';
import { createContext, ReactNode, useState } from 'react';

type SidebarContextType = {
    sidebarContent: ReactNode;
    setSidebarContent: (content: ReactNode) => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [sidebarContent, setSidebarContent] = useState<ReactNode>(null);

    return (
        <SidebarContext.Provider value={{ sidebarContent, setSidebarContent }}>
            {children}
        </SidebarContext.Provider>
    );
}
