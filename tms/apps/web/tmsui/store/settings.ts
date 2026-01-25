import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface SettingsState {
  isOpen: boolean;
  isSidebarOpen: boolean;
  user: {
    username: string;
  };
}

export interface SettingsActions {
  setIsOpen: (isOpen: boolean) => void;
  setIsSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
  setUser: (user: SettingsState["user"]) => void;
  removeUser: () => void;
}

export type TSettingsStore = SettingsState & SettingsActions;

export const initialSettingsState: SettingsState = {
  isOpen: false,
  isSidebarOpen: true,
  user: {
    username: "",
  },
};

export const useSettings = create<TSettingsStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialSettingsState,

        setIsOpen: (isOpen) => set({ isOpen }),
        setIsSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
        toggleSidebar: () =>
          set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

        setUser: (user) => set({ user }),
        removeUser: () => set(initialSettingsState),
      }),
      {
        name: "settings-store", // localStorage key
      }
    ),
    {
      enabled:
        typeof window !== "undefined" && process.env.NODE_ENV !== "production",
    }
  )
);
