import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Record {
  id: number;
  amount: string;
  description: string;
  date: string;
}

interface StoreState {
  amount: string;
  description: string;
  date: string;
  records: Record[];

  setAmount: (value: string) => void;
  setDescription: (value: string) => void;
  setDate: (value: string) => void;
  addRecord: () => void;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

export const recordsStore = create<StoreState>()(
  persist(
    (set) => ({
      amount: "",
      description: "",
      date: getToday(),
      records: [],

      setAmount: (value) => set({ amount: value }),
      setDescription: (value) => set({ description: value }),
      setDate: (value) => set({ date: value }),

      addRecord: () =>
        set((state) => {
          if (!state.amount.trim() && !state.description.trim()) return state;

          const newItem: Record = {
            id: Date.now(),
            amount: state.amount,
            description: state.description,
            date: formatDate(state.date),
          };

          return {
            records: [...state.records, newItem],
            amount: "",
            description: "",
            date: getToday(),
          };
        }),
    }),
    {
      name: "MyRecords",
    }
  )
);
