import { create } from "zustand";

interface StoreState {
  date: number;
  minusMonth: () => void;
  plusMonth: () => void;
}

export const filterByMonth = create<StoreState>()((set, get) => ({
  date: Date.now(),

  minusMonth: () => {
    const currentDate = new Date(get().date);
    currentDate.setMonth(currentDate.getMonth() - 1);
    set({ date: currentDate.getTime() });
  },

  plusMonth: () => {
    const currentDate = new Date(get().date);
    currentDate.setMonth(currentDate.getMonth() + 1);
    set({ date: currentDate.getTime() });
  },
}));
