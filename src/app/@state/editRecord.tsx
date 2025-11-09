import { create } from "zustand";
import { recordsStore } from "./records";
import { convertCurrency } from "app/@functions/convertCurrency";

interface StoreState {
  recordId: number;
  amount: string;
  convertedAmount: string;
  currency: string;
  category: string;
  description: string;
  date: number;

  setRecordId: (value: number) => void;
  setAmount: (value: string) => void;
  setConvertedAmount: (value: string) => void;
  setCurrency: (value: string) => void;
  setCategory: (value: string) => void;
  setDescription: (value: string) => void;
  setDate: (value: number) => void;
  saveChanges: () => Promise<void>;
}

export const editRecordStore = create<StoreState>()((set) => ({
  recordId: 0,
  amount: "",
  convertedAmount: "",
  currency: "",
  category: "",
  description: "",
  date: 0,

  setRecordId: (value) => set({ recordId: value }),
  setAmount: (value) => set({ amount: value }),
  setConvertedAmount: (value) => set({ convertedAmount: value }),
  setCurrency: (value) => set({ currency: value }),
  setCategory: (value) => set({ category: value }),
  setDescription: (value) => set({ description: value }),
  setDate: (value) => set({ date: value }),

  saveChanges: async () => {
    const state = editRecordStore.getState();
    const { records } = recordsStore.getState();

    const recordToEdit = records.find((record) => record.id === state.recordId);

    if (!recordToEdit) return;

    let converted = state.convertedAmount;

    if (
      recordToEdit.amount !== state.amount ||
      recordToEdit.date !== state.date
    ) {
      converted = await convertCurrency(
        state.currency,
        state.amount,
        state.date
      );
    }

    const updatedRecords = records.map((record) =>
      record.id === state.recordId
        ? {
            ...record,
            amount: state.amount,
            convertedAmount: converted,
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
