import { create } from "zustand";

interface PageInfoState {
    title: string;
    setTitle: (data: string) => void;
}

const usePageInfoStore = create<PageInfoState>((set) => ({
    title: '',

    setTitle: (data) => {
        set({title: data})
    }
}))

export default usePageInfoStore;