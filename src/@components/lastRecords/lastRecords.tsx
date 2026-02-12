"use client";

import styles from "./lastRecords.module.scss";
import { recordsStore } from "@state/records";
import { filterByTimeStore } from "@state/filterByTime";
import Record from "@components/record/record";

export default function LastRecords() {
  const { records } = recordsStore();
  const { filterDate } = filterByTimeStore();

  const filteredRecords = records
    .filter(
      (record) =>
        new Date(record.date).getFullYear() ===
          new Date(filterDate).getFullYear() &&
        new Date(record.date).getMonth() === new Date(filterDate).getMonth(),
    )
    .sort((a, b) => b.date - a.date);

  return (
    <div className={styles.container}>
      {filteredRecords.map((record) => {
        return (
          <Record
            key={record.id}
            id={record.id}
            amount={record.amount}
            convertedAmount={record.convertedAmount}
            currency={record.currency}
            category={record.category}
            subCategory={record.subCategory}
            description={record.description}
            date={record.date}
          />
        );
      })}
    </div>
  );
}
