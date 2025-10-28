import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Record {
  id: number;
  amount: string;
  currency: string;
  category: string;
  description: string;
  date: string;
}

interface StoreState {
  amount: string;
  currency: string;
  category: string;
  description: string;
  date: string;
  records: Record[];

  setAmount: (value: string) => void;
  setCurrency: (value: string) => void;
  setCategory: (value: string) => void;
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
      currency: "",
      category: "",
      description: "",
      date: getToday(),
      records: [],

      setAmount: (value) => set({ amount: value }),
      setCurrency: (value) => set({ currency: value }),
      setCategory: (value) => set({ category: value }),
      setDescription: (value) => set({ description: value }),
      setDate: (value) => set({ date: value }),

      addRecord: () =>
        set((state) => {
          const newRecord: Record = {
            id: Date.now(),
            amount: state.amount,
            currency: state.currency,
            category: state.category,
            description: state.description,
            date: formatDate(state.date),
          };

          return {
            records: [...state.records, newRecord],
            currency: "",
            category: "",
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
