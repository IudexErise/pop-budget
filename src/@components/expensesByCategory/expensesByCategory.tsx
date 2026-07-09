import { useMemo } from "react";

import { recordsStore } from "@state/records";
import { filterByTimeStore } from "@state/filterByTime";
import { getCategoryStatistics } from "@functions/sortCategories";
import { categoriesList } from "@const/categories";
import styles from "./expensesByCategory.module.scss";

export default function ExpensesByCategory() {
  const records = recordsStore((state) => state.records);
  const filterDate = filterByTimeStore((state) => state.filterDate);

  const filteredRecords = useMemo(
    () =>
      records.filter((record) => {
        const date = new Date(record.date);
        const filter = new Date(filterDate);

        return (
          date.getFullYear() === filter.getFullYear() &&
          date.getMonth() === filter.getMonth()
        );
      }),
    [records, filterDate],
  );

  const statistics = useMemo(
    () => getCategoryStatistics(filteredRecords),
    [filteredRecords],
  );

  const total = useMemo(
    () => statistics.reduce((sum, category) => sum + category.total, 0),
    [statistics],
  );

  if (!statistics.length) return null;

  return (
    <div>
      {statistics.map((category) => {
        const color =
          categoriesList.find((c) => c.name === category.category)?.color ??
          "#ccc";
        const categoryPercent = (category.total / total) * 100;
        const Icon = categoriesList.find(
          (c) => c.name === category.category,
        )?.icon;

        return (
          <div
            key={category.category}
            className={styles.container}
            style={
              {
                "--category-color": color,
              } as React.CSSProperties
            }
          >
            <div className={styles.icon}>
              {Icon && <Icon color={color} size={50} />}
            </div>
            <div className={styles.numbers}>
              <div className={styles.category}>
                <span className={styles.categoryName}>{category.category}</span>
                <span className={styles.categoryValue}>
                  {category.total.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}{" "}
                  <span>({categoryPercent.toFixed(1)}%)</span>
                </span>
              </div>

              {category.subCategories.map((subCategory) => {
                const percent = (subCategory.total / category.total) * 100;

                return (
                  <div key={subCategory.name} className={styles.subCategory}>
                    <span className={styles.subCategoryName}>
                      {subCategory.name}{" "}
                    </span>

                    <span className={styles.subCategoryValue}>
                      {subCategory.total.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}{" "}
                      ({percent.toFixed(1)}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
