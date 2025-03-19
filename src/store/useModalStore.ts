import { create } from 'zustand';

type Store = {
  isNoticeModalOpen: boolean;
  setIsNoticeModalOpen: (value: boolean) => void;

  noticeModalText: string;
  setNoticeModalText: (value: string) => void;

  isAlertModalOpen: boolean;
  alertModalTitle: string;
  alertModalText: string;
  setIsAlertModalOpen: (value: boolean) => void;
  setAlertModalTitle: (value: string) => void;
  setAlertModalText: (value: string) => void;

  alertModalFn: () => void;
  setAlertModalFn: (value: () => void) => void;
}

const useModalStore = create<Store>((set) => ({
  isNoticeModalOpen: false,
  setIsNoticeModalOpen: (value: boolean) => set({isNoticeModalOpen: value}),
  noticeModalText: "",
  setNoticeModalText: (value: string) => set({noticeModalText: value}),

  isAlertModalOpen: false,
  alertModalTitle: "",
  alertModalText: "",
  setIsAlertModalOpen: (value: boolean) => set({isAlertModalOpen: value}),
  setAlertModalTitle: (value: string) => set({alertModalTitle: value}),
  setAlertModalText: (value: string) => set({alertModalText: value}),

  alertModalFn: () => {return null},
  setAlertModalFn: (value: () => void) => set({alertModalFn: value}),

}))

export default useModalStore;