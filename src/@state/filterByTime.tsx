import { create } from "zustand";

interface StoreState {
  filterDate: number;
  filterYear: number;
  minusMonth: () => void;
  plusMonth: () => void;
  minusYear: () => void;
  plusYear: () => void;
}

export const filterByTimeStore = create<StoreState>()((set, get) => ({
  filterDate: Date.now(),
  filterYear: new Date().getFullYear(),

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

  minusYear: () => {
    set({ filterYear: get().filterYear - 1 });
  },

  plusYear: () => {
    set({ filterYear: get().filterYear - 1 });
  },
}));
