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
  subCategory,
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

  const formattedAmount = Number(amount).toLocaleString("en-EN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const formattedConvertedAmount = Number(convertedAmount).toLocaleString(
    "en-EN",
    {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  );

  return (
    <div className={styles.container} onClick={() => handleClick()}>
      {selectedCategory && (
        <selectedCategory.icon color={selectedCategory.color} size={44} />
      )}
      <div className={styles.textBlock}>
        <div className={styles.text}>{category}</div>
        <div className={styles.subText}>{`• ${subCategory}`}</div>
        <div className={styles.subText__white}>{description}</div>
      </div>
      <div className={styles.numbersBlock}>
        <div className={styles.amount}>
          {formattedAmount} {currency}
        </div>
        <div className={styles.subText}>{formattedConvertedAmount} USD</div>
        <div className={styles.subText__white}>
          {new Date(date).toLocaleDateString("ru-RU")}
        </div>
      </div>
    </div>
  );
}
