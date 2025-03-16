import { axiosInstance } from "@/apis/axiosInstance";
import { create } from "zustand";

interface AuthState {
  isLoggedIn: boolean | null;
  name: string | null;
  email: string | null;
  setUser: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: null,
  name: null,
  email: null,

  setUser: async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_DOMAIN}/auth/me`
      );

      const userData = response?.data?.result;

      set({
        isLoggedIn: true,
        name: userData.name,
        email: userData.email,
      });
    } catch (e) {
      console.log(e);
      set({ isLoggedIn: false, name: null, email: null });
    }
  },
}));

export default useAuthStore;
