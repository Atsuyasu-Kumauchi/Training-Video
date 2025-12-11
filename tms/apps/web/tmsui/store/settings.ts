import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface SettingsState {
  isOpen: boolean; // for modal
  isSidebarOpen: boolean; // for sidebar
}

export interface SettingsActions {
  setIsOpen: (isOpen: boolean) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export type TSettingsStore = SettingsState & SettingsActions;

export const initialSettingsState: SettingsState = {
  isOpen: false,
  isSidebarOpen: true,
};

export const useSettings = create<TSettingsStore>()(
  devtools(
    (set) => ({
      ...initialSettingsState,
      setIsOpen: (isOpen: boolean) => set(() => ({ isOpen })),
      setIsSidebarOpen: (isOpen: boolean) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: "settings-store",
      enabled:
        typeof window !== "undefined" && process.env.NODE_ENV !== "production",
    }
  )
);
