import { create } from "zustand";

interface StoreState {
  filterDate: number;
  minusMonth: () => void;
  plusMonth: () => void;
}

export const filterByMonthStore = create<StoreState>()((set, get) => ({
  filterDate: Date.now(),

  minusMonth: () => {
    const currentDate = new Date(get().filterDate);
    currentDate.setMonth(currentDate.getMonth() - 1);
    set({ filterDate: currentDate.getTime() });
  },

  plusMonth: () => {
    const currentDate = new Date(get().filterDate);
    currentDate.setMonth(currentDate.getMonth() + 1);
    set({ filterDate: currentDate.getTime() });
  },
}));
