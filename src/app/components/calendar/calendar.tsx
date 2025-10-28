"use client";

import styles from "./calendar.module.scss";

interface CalendarTypes {
  label: string;
  value: string;
  setValue: (value: string) => void;
}

export default function Calendar({ label, value, setValue }: CalendarTypes) {
  return (
    <div className={styles.container}>
      <label htmlFor="date">{label}</label>
      <input
        id="date"
        type="date"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
