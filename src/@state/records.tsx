import { convertCurrency } from "@functions/convertCurrency";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface RecordProps {
  id: number;
  amount: string;
  convertedAmount: string;
  currency: string;
  category: string;
  subCategory: string;
  description: string;
  date: number;
}

interface StoreState {
  amount: string;
  convertedAmount: string;
  currency: string;
  category: string;
  subCategory: string;
  description: string;
  date: number;
  records: RecordProps[];

  setAmount: (value: string) => void;
  setCurrency: (value: string) => void;
  setCategory: (value: string) => void;
  setSubCategory: (value: string) => void;
  setDescription: (value: string) => void;
  setDate: (value: number) => void;
  addRecord: () => Promise<void>;
  deleteRecord: (id: number) => void;
}

export const recordsStore = create<StoreState>()(
  persist(
    (set) => ({
      amount: "",
      convertedAmount: "",
      currency: "USD",
      category: "Other",
      subCategory: "Unexpected",
      description: "",
      date: Date.now(),
      records: [],

      setAmount: (value) => set({ amount: value }),
      setCurrency: (value) => set({ currency: value }),
      setCategory: (value) => set({ category: value }),
      setSubCategory: (value) => set({ subCategory: value }),
      setDescription: (value) => set({ description: value }),
      setDate: (value) => set({ date: new Date(value).getTime() }),

      addRecord: async () => {
        const state = recordsStore.getState();

        const convertedAmount =
          state.currency === "USD"
            ? state.amount
            : await convertCurrency(state.currency, state.amount, state.date);

        const newRecord: RecordProps = {
          id: Date.now(),
          amount: state.amount,
          convertedAmount: convertedAmount.toString(),
          currency: state.currency,
          category: state.category,
          subCategory: state.subCategory,
          description: state.description,
          date: state.date,
        };

        set({
          records: [...state.records, newRecord],
          amount: "",
          convertedAmount: "",
          currency: "USD",
          category: "Other",
          subCategory: "Unexpected",
          description: "",
          date: Date.now(),
        });
      },

      deleteRecord: (id: number) =>
        set((state) => ({
          records: state.records.filter((record) => record.id !== id),
        })),
    }),
    {
      name: "MyRecords",
      partialize: (state) => ({
        records: state.records,
      }),
    },
  ),
);
