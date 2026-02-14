import { create } from "zustand";
import { persist } from "zustand/middleware";
import { convertCurrency } from "@functions/convertCurrency";

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

type Mode = "create" | "edit";

interface StoreState {
  amount: string;
  currency: string;
  category: string;
  subCategory: string;
  description: string;
  date: number;
  records: RecordProps[];

  mode: Mode;
  editedRecordId: number | null;

  setAmount: (v: string) => void;
  setCurrency: (v: string) => void;
  setCategory: (v: string) => void;
  setSubCategory: (v: string) => void;
  setDescription: (v: string) => void;
  setDate: (v: number) => void;

  startEdit: (id: number) => void;
  cancelEdit: () => void;
  saveRecord: () => Promise<void>;
  deleteRecord: (id: number) => void;
}

export const recordsStore = create<StoreState>()(
  persist(
    (set, get) => ({
      amount: "",
      currency: "USD",
      category: "Other",
      subCategory: "Unexpected",
      description: "",
      date: Date.now(),

      records: [],

      mode: "create",
      editedRecordId: null,

      setAmount: (v) => set({ amount: v }),
      setCurrency: (v) => set({ currency: v }),
      setCategory: (v) => set({ category: v }),
      setSubCategory: (v) => set({ subCategory: v }),
      setDescription: (v) => set({ description: v }),
      setDate: (v) => set({ date: new Date(v).getTime() }),

      startEdit: (id) => {
        const record = get().records.find((r) => r.id === id);
        if (!record) return;

        set({
          mode: "edit",
          editedRecordId: id,
          amount: record.amount,
          currency: record.currency,
          category: record.category,
          subCategory: record.subCategory,
          description: record.description,
          date: record.date,
        });
      },

      cancelEdit: () =>
        set({
          mode: "create",
          editedRecordId: null,
          amount: "",
          currency: "USD",
          category: "Other",
          subCategory: "Unexpected",
          description: "",
          date: Date.now(),
        }),

      saveRecord: async () => {
        const state = get();

        const convertedAmount =
          state.currency === "USD"
            ? state.amount
            : await convertCurrency(state.currency, state.amount, state.date);

        if (state.mode === "create") {
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
          });
        }

        if (state.mode === "edit" && state.editedRecordId) {
          set({
            records: state.records.map((r) =>
              r.id === state.editedRecordId
                ? {
                    ...r,
                    amount: state.amount,
                    convertedAmount: convertedAmount.toString(),
                    currency: state.currency,
                    category: state.category,
                    subCategory: state.subCategory,
                    description: state.description,
                    date: state.date,
                  }
                : r,
            ),
          });
        }

        set({
          mode: "create",
          editedRecordId: null,
          amount: "",
          currency: "USD",
          category: "Other",
          subCategory: "Unexpected",
          description: "",
          date: Date.now(),
        });
      },

      deleteRecord: (id) =>
        set((state) => ({
          records: state.records.filter((r) => r.id !== id),
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
