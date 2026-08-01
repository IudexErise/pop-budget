"use client";

import FilterMonthSwitcher from "@components/filterByTimeSwitcher/filterByTimeSwitcher";
import { recordsStore } from "../@state/records";
import LastRecords from "@components/lastRecords/lastRecords";
import styles from "./page.module.scss";
import { filterByTimeStore } from "@state/filterByTime";
import { currenciesList } from "@const/currencies";

export default function Home() {
  const { records } = recordsStore();
  const { filterDate } = filterByTimeStore();

  const filteredRecords = records.filter(
    (record) =>
      new Date(record.date).getFullYear() ===
        new Date(filterDate).getFullYear() &&
      new Date(record.date).getMonth() === new Date(filterDate).getMonth(),
  );

  const totalMoney = filteredRecords
    .reduce((sum, record) => sum + +record.convertedAmount, 0)
    .toLocaleString("ru-RU", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  function filterByCurrency(currency: string) {
    const filteredAmount = filteredRecords
      .filter((record) => record.currency === currency)
      .reduce((sum, record) => sum + +record.amount, 0);
    return filteredAmount;
  }

  return (
    <div className={styles.container}>
      <FilterMonthSwitcher />
      <div className={styles.total}>
        <div className={styles.subText}>Total expenses</div>
        <div className={styles.number}>{totalMoney} $</div>
      </div>
      {currenciesList
        .filter((currency) => filterByCurrency(currency.name) > 0)
        .map((currency) => (
          <div key={currency.name} className={styles.total}>
            <div className={styles.subText}>Total {currency.name}</div>
            <div className={styles.number}>
              {filterByCurrency(currency.name).toLocaleString("ru-RU", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}{" "}
              {currency.icon}
            </div>
          </div>
        ))}
      <div>
        <div className={styles.lastRecords}>Last Records</div>
        <LastRecords />
      </div>
    </div>
  );
}
