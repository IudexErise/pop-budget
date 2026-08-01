"use client";

import styles from "./lastRecords.module.scss";
import { RecordProps, recordsStore } from "@state/records";
import Record from "@components/record/record";
import { useMemo } from "react";

export default function LastRecords() {
  const { records } = recordsStore();
  const lastRecords = useMemo(() => {
    return [...records].sort((a, b) => b.date - a.date).slice(0, 30);
  }, [records]);

  return (
    <div className={styles.container}>
      {lastRecords.map((record: RecordProps) => {
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
