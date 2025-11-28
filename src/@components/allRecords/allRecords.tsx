"use client";

import styles from "./allRecords.module.scss";
import { recordsStore } from "@state/records";
import Record from "@components/record/record";

export default function AllRecords() {
  const { records } = recordsStore();

  const filteredRecords = records.sort((a, b) => b.date - a.date);

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
            description={record.description}
            date={record.date}
          />
        );
      })}
    </div>
  );
}
