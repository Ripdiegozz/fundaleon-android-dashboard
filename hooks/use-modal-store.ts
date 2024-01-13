import { create } from "zustand";

export type ModalType = "wrongCredentials" | "wrongSetUp" | "searchBook" | "editBook" | "deleteBook";

interface ModalStore {
    type: ModalType | null;
    data: any;
    isOpen: boolean;
    onOpen: (type: ModalType, data?: any) => void;
    onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
    type: null,
    data: null,
    isOpen: false,
    onOpen: (type, data) => set({ type, data, isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));
