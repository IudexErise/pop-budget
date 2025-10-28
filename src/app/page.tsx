"use client";

import Calendar from "./components/calendar/calendar";
import Input from "./components/input/input";
/* import Select from "./components/select/select"; */
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
  } = recordsStore();

  return (
    <>
      <header className={styles.header}>Header</header>
      <main>
        <h1>App</h1>
        <div>
          <Input placeholder="amount" value={amount} setValue={setAmount} />
          <Calendar label="purchase date" value={date} setValue={setDate} />
          {/*<Select label="currency" options={["USD", "RUB", "THB"]} />
        <Select label="category" options={["food", "drink", "delivery"]} /> */}
          <Input
            placeholder="comment"
            value={description}
            setValue={setDescription}
          />
          <button onClick={addRecord}>Save</button>
          <button onClick={() => console.log(records)}>Show in cosole</button>
          <button onClick={() => recordsStore.persist.clearStorage()}>
            Delete all
          </button>
        </div>
      </main>
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}
