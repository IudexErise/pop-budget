"use client";

import styles from "./lastRecords.module.scss";
import { recordsStore } from "@state/records";
import Record from "@components/record/record";

export default function LastRecords() {
  const { records } = recordsStore();

  return (
    <div className={styles.container}>
      {records.slice(0, 30).map((record) => {
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
