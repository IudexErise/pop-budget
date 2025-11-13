"use client";

import { useRouter } from "next/navigation";
import styles from "./allRecords.module.scss";
import { recordsStore } from "@state/records";

export default function AllRecords() {
  const router = useRouter();
  const { records, deleteRecord } = recordsStore();

  return (
    <div className={styles.container}>
      {records.map((record) => {
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
