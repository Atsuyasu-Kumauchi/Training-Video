import { SidebarProvider } from '@/contexts/studentLayout';
import { StudentLayout } from '@/tmsui';
import React from 'react';


export default function StudentsRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <StudentLayout>
                {children}
            </StudentLayout>
        </SidebarProvider>
    )
}
