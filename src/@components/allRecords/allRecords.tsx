"use client";

import { useMemo } from "react";
import styles from "./allRecords.module.scss";
import { recordsStore } from "@state/records";
import Record from "@components/record/record";
import { formatDay } from "@utils/date";
import { formatAmount } from "../../@functions/convertCurrency";

const getDayStartTs = (timestamp: number) => {
  const d = new Date(timestamp);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export default function AllRecords() {
  const { records } = recordsStore();

  const groupedRecords = useMemo(() => {
    if (!records.length) return [];

    const grouped = records.reduce<Record<number, typeof records>>(
      (acc, record) => {
        const dayTs = getDayStartTs(record.date);

        if (!acc[dayTs]) {
          acc[dayTs] = [];
        }

        acc[dayTs].push(record);
        return acc;
      },
      {},
    );

    return Object.entries(grouped)
      .sort(([dayA], [dayB]) => Number(dayB) - Number(dayA))
      .map(([dayTs, dayRecords]) => ({
        dayTs: Number(dayTs),
        formattedDay: formatDay(Number(dayTs)),
        total: dayRecords.reduce(
          (sum, record) => sum + Number(record.convertedAmount),
          0,
        ),
        records: [...dayRecords].sort((a, b) => b.date - a.date),
      }));
  }, [records]);

  return (
    <div className={styles.container}>
      {groupedRecords.map((group) => (
        <section key={group.dayTs} className={styles.dayBlock}>
          <div className={styles.headerBlock}>
            <h2 className={styles.dayTitle}>{group.formattedDay}</h2>
            <span className={styles.dayTotal}>
              ${formatAmount(group.total)}
            </span>
          </div>

          {group.records.map((record) => (
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
          ))}
        </section>
      ))}
    </div>
  );
}
