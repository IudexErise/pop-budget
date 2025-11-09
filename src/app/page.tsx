"use client";

import { useRouter } from "next/navigation";
import Calendar from "./@components/calendar/calendar";
import Input from "./@components/input/input";
import Select from "./@components/select/select";
/* import styles from "./page.module.scss"; */
import { recordsStore } from "./@state/records";

export default function Home() {
  const {
    amount,
    setAmount,
    description,
    setDescription,
    date,
    setDate,
    records,
    addRecord,
    currency,
    setCurrency,
    category,
    setCategory,
    deleteRecord,
  } = recordsStore();

  const router = useRouter();

  return (
    <main>
      <h1>App</h1>
      <div>
        <Input
          placeholder="amount"
          value={amount}
          setValue={setAmount}
          type="number"
        />
        <Calendar
          label="purchase date"
          value={date}
          setValue={setDate}
          max={new Date().toISOString().split("T")[0]}
        />
        <Select
          label="currency"
          options={["", "USD", "RUB", "GEL"]}
          value={currency}
          setValue={setCurrency}
        />
        <Select
          label="category"
          options={["", "food", "drink", "delivery"]}
          value={category}
          setValue={setCategory}
        />
        <Input
          placeholder="comment"
          value={description}
          setValue={setDescription}
          type="text"
        />
        <button onClick={addRecord}>Save</button>
      </div>
      <div>
        {records.map((record) => {
          return (
            <div key={record.id}>
              <span>Amount :{record.amount}/</span>
              <span>USD amount :{record.convertedAmount}/</span>
              <span>Currency :{record.currency}/</span>
              <span>Category :{record.category}/</span>
              <span>Date :{new Date(record.date).toLocaleDateString()}/</span>
              <span>Description :{record.description}/</span>
              <button onClick={() => deleteRecord(record.id)}>
                Delete record
              </button>
              <button onClick={() => router.push(`/edit?id=${record.id}`)}>
                Edit record
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
