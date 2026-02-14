"use client";

import { useRouter } from "next/navigation";
import styles from "./record.module.scss";
import { RecordProps, recordsStore } from "@state/records";
import { getSelectedCategory } from "@const/categories";

export default function Record({
  id,
  amount,
  convertedAmount,
  currency,
  category,
  date,
  description,
}: RecordProps) {
  const router = useRouter();

  const selectedCategory = getSelectedCategory(category);

  const { startEdit } = recordsStore();

  function handleClick() {
    startEdit(id);
    router.push("/record");
  }

  return (
    <div className={styles.container} onClick={() => handleClick()}>
      {selectedCategory && (
        <selectedCategory.icon color={selectedCategory.color} size={44} />
      )}
      <div className={styles.textBlock}>
        <div className={styles.text}>{category}</div>
        <div className={styles.subText}>{description || <>&nbsp;</>}</div>
      </div>
      <div className={styles.numbersBlock}>
        <div>
          <span className={styles.subText}>-{convertedAmount} USD </span>
          <span> </span>
          <span className={styles.amount}>
            -{amount} {currency}
          </span>
        </div>
        <div className={styles.subText}>
          {new Date(date).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
