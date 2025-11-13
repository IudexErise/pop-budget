"use client";

import { useRouter } from "next/navigation";
import styles from "./lastRecords.module.scss";
import { recordsStore } from "@state/records";
import { filterByMonthStore } from "@state/filterByMonth";

export default function LastRecords() {
  const router = useRouter();
  const { records, deleteRecord } = recordsStore();
  const { filterDate } = filterByMonthStore();

  const filteredRecords = records.filter(
    (record) =>
      new Date(record.date).getFullYear() ===
        new Date(filterDate).getFullYear() &&
      new Date(record.date).getMonth() === new Date(filterDate).getMonth()
  );

  return (
    <div className={styles.container}>
      {filteredRecords.map((record) => {
        return (
          <div key={record.id}>
            <span>Amount :{record.amount}/</span>
            <span>USD amount :{record.convertedAmount}/</span>
            <span>Currency :{record.currency}/</span>
            <span>Category :{record.category}/</span>
            <span>Date :{new Date(record.date).toLocaleDateString()}/</span>
            <span>Description :{record.description}/</span>
            <button onClick={() => deleteRecord(record.id)}>
              Delete record
            </button>
            <button onClick={() => router.push(`/edit?id=${record.id}`)}>
              Edit record
            </button>
          </div>
        );
      })}
    </div>
  );
}
