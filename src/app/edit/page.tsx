"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Calendar from "../@components/calendar/calendar";
import Input from "../@components/input/input";
import Select from "../@components/select/select";
/* import styles from "./page.module.scss"; */
import { recordsStore } from "../@state/records";
import { useEffect } from "react";

export default function Edit() {
  const {
    amount,
    setAmount,
    description,
    setDescription,
    date,
    setDate,
    addRecord,
    category,
    setCategory,
    deleteRecord,
  } = recordsStore();

  const searchParams = useSearchParams();
  const recordId = searchParams.get("id");

  useEffect(() => {}, []);

  return (
    <main>
      <h1>Edit</h1>
      <div>
        <Input
          placeholder="amount"
          value={amount}
          setValue={setAmount}
          type="number"
        />
        <Calendar label="purchase date" value={date} setValue={setDate} />
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
    </main>
  );
}
