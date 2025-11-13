"use client";

import { filterByMonthStore } from "@state/filterByMonth";
import styles from "./filterMonthSwitcher.module.scss";

export default function FilterMonthSwitcher() {
  const { filterDate, minusMonth, plusMonth } = filterByMonthStore();

  const formatted = new Date(filterDate).toLocaleDateString("en-EN", {
    year: "numeric",
    month: "short",
  });

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={minusMonth}>
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.78033 10.2803C6.07322 9.98744 6.07322 9.51256 5.78033 9.21967L1.81066 5.25L5.78033 1.28033C6.07322 0.987437 6.07322 0.512563 5.78033 0.21967C5.48744 -0.0732236 5.01256 -0.0732236 4.71967 0.21967L0.21967 4.71967C-0.073223 5.01256 -0.073223 5.48744 0.21967 5.78033L4.71967 10.2803C5.01256 10.5732 5.48744 10.5732 5.78033 10.2803Z"
            fill="white"
          />
        </svg>
      </button>
      <div className={styles.date}>{formatted}</div>
      <button className={styles.button} onClick={plusMonth}>
        <svg
          width="6"
          height="11"
          viewBox="0 0 6 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0.21967 10.2803C-0.0732233 9.98744 -0.0732234 9.51256 0.21967 9.21967L4.18934 5.25L0.21967 1.28033C-0.0732237 0.987437 -0.0732238 0.512563 0.219669 0.21967C0.512563 -0.0732236 0.987436 -0.0732236 1.28033 0.21967L5.78033 4.71967C6.07322 5.01256 6.07322 5.48744 5.78033 5.78033L1.28033 10.2803C0.987437 10.5732 0.512563 10.5732 0.21967 10.2803Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
}
