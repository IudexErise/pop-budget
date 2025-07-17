"use client";

import { useEffect, useState } from "react";
import styles from "./calendar.module.scss";

interface CalendarTypes {
  label: string;
}

export default function Calendar({ label }: CalendarTypes) {
  const [calendarValue, setCalendarValue] = useState("");

  useEffect(() => {
    const currentDate = new Date();
    const parsedDate = currentDate.toISOString().split("T")[0];
    setCalendarValue(parsedDate);
  }, []);

  return (
    <div className={styles.container}>
      <label htmlFor="date">{label}</label>
      <input
        id="date"
        type="date"
        value={calendarValue}
        onChange={(e) => setCalendarValue(e.target.value)}
      />
    </div>
  );
}
