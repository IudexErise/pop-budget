import { create } from "zustand";

interface StoreState {
  filterDate: number;
  canPlusMonth: () => boolean;
  minusMonth: () => void;
  plusMonth: () => void;
}

export const filterByTimeStore = create<StoreState>()((set, get) => ({
  filterDate: Date.now(),

  canPlusMonth: () => {
    const current = new Date(get().filterDate);
    const today = new Date();

    return (
      current.getFullYear() < today.getFullYear() ||
      (current.getFullYear() === today.getFullYear() &&
        current.getMonth() < today.getMonth())
    );
  },

  minusMonth: () => {
    const currentDate = new Date(get().filterDate);
    currentDate.setMonth(currentDate.getMonth() - 1);
    set({ filterDate: currentDate.getTime() });
  },

  plusMonth: () => {
    if (!get().canPlusMonth()) return;

    const currentDate = new Date(get().filterDate);
    currentDate.setMonth(currentDate.getMonth() + 1);
    set({ filterDate: currentDate.getTime() });
  },
}));
