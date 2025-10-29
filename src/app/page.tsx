"use client";

import Calendar from "./components/calendar/calendar";
import Input from "./components/input/input";
import Select from "./components/select/select";
import styles from "./page.module.scss";
import { recordsStore } from "./state/records";

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
  } = recordsStore();

  return (
    <>
      <header className={styles.header}>Header</header>
      <main>
        <h1>App</h1>
        <div>
          <Input
            placeholder="amount"
            value={amount}
            setValue={setAmount}
            type="number"
          />
          <Calendar label="purchase date" value={date} setValue={setDate} />
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
          <button onClick={() => recordsStore.persist.clearStorage()}>
            Delete all
          </button>
        </div>
        <div>
          {records.map((record) => {
            return (
              <div key={record.id}>
                <span>Amount :{record.amount}/</span>
                <span>USD amount :{record.convertedAmount}/</span>
                <span>Currency :{record.currency}/</span>
                <span>Category :{record.category}/</span>
                <span>Date :{record.date}/</span>
                <span>Description :{record.description}</span>
              </div>
            );
          })}
        </div>
      </main>
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}
