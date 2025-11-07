import { create } from "zustand";
import { recordsStore } from "./records";

interface StoreState {
  recordId: number;
  amount: string;
  convertedAmount: string;
  currency: string;
  category: string;
  description: string;
  date: string;

  setRecordId: (value: number) => void;
  setAmount: (value: string) => void;
  setConvertedAmount: (value: string) => void;
  setCurrency: (value: string) => void;
  setCategory: (value: string) => void;
  setDescription: (value: string) => void;
  setDate: (value: string) => void;
  saveChanges: () => void;
}

export const editRecordStore = create<StoreState>()((set) => ({
  recordId: 0,
  amount: "",
  convertedAmount: "",
  currency: "",
  category: "",
  description: "",
  date: "",

  setRecordId: (value) => set({ recordId: value }),
  setAmount: (value) => set({ amount: value }),
  setConvertedAmount: (value) => set({ convertedAmount: value }),
  setCurrency: (value) => set({ currency: value }),
  setCategory: (value) => set({ category: value }),
  setDescription: (value) => set({ description: value }),
  setDate: (value) => set({ date: value }),

  saveChanges: () => {
    const state = editRecordStore.getState();
    const { records } = recordsStore.getState();

    const updatedRecords = records.map((record) =>
      record.id === state.recordId
        ? {
            ...record,
            amount: state.amount,
            convertedAmount: state.convertedAmount,
            currency: state.currency,
            category: state.category,
            description: state.description,
            date: state.date,
          }
        : record
    );

    recordsStore.setState({ records: updatedRecords });
  },
}));
