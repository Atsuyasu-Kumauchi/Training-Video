import { SidebarContext } from "@/contexts/studentLayout";
import { useContext } from "react";

export function useStudentRightBar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useStudentRightBar must be used within a SidebarProvider');
    }
    return context;
}