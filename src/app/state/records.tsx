import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Record {
  id: number;
  amount: string;
  convertedAmount: string;
  currency: string;
  category: string;
  description: string;
  date: string;
}

interface StoreState {
  amount: string;
  convertedAmount: string;
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
  addRecord: () => Promise<void>;
}

function formatDate(date: string) {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year}`;
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

async function convertCurrency(currency: string, amount: string) {
  try {
    const res = await axios.get(
      `https://v6.exchangerate-api.com/v6/abb89f23a483485679372e28/latest/${currency}`
    );
    return (res.data.conversion_rates.USD * Number(amount)).toFixed(2);
  } catch {
    alert("Convert failed");
    return 0;
  }
}

export const recordsStore = create<StoreState>()(
  persist(
    (set) => ({
      amount: "",
      convertedAmount: "",
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

      addRecord: async () => {
        const state = recordsStore.getState();

        const convertedAmount =
          state.currency === "USD"
            ? state.amount
            : await convertCurrency(state.currency, state.amount);

        const newRecord: Record = {
          id: Date.now(),
          amount: state.amount,
          convertedAmount: convertedAmount.toString(),
          currency: state.currency,
          category: state.category,
          description: state.description,
          date: formatDate(state.date),
        };

        set({
          records: [...state.records, newRecord],
          amount: "",
          convertedAmount: "",
          currency: "",
          category: "",
          description: "",
          date: getToday(),
        });
      },
    }),
    {
      name: "MyRecords",
    }
  )
);
