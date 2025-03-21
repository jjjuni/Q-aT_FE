import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
}

const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: true,

  setIsSidebarOpen: (value: boolean) => set({isSidebarOpen: value})
}))

export default useSidebarStore;