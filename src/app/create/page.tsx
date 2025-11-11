"use client";

import Calendar from "../../@components/calendar/calendar";
import Input from "../../@components/input/input";
import Select from "../../@components/select/select";
/* import styles from "./page.module.scss"; */
import { recordsStore } from "../../@state/records";

export default function Create() {
  const {
    amount,
    setAmount,
    description,
    setDescription,
    date,
    setDate,
    addRecord,
    currency,
    setCurrency,
    category,
    setCategory,
  } = recordsStore();

  return (
    <main>
      <h1>Create</h1>
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
    </main>
  );
}
