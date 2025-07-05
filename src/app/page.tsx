"use client";

import Input from "./components/input/input";
import Select from "./components/select/select";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <header className={styles.header}>Header</header>
      <main>
        <h1>App</h1>
        <Input placeholder="amount" />
        <Select label="currency" options={["USD", "RUB", "THB"]} />
        <Select label="category" options={["food", "drink", "delivery"]} />
        <Input placeholder="comment" />
      </main>
      <footer className={styles.footer}>Footer</footer>
    </>
  );
}
