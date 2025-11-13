"use client";

import FilterMonthSwitcher from "@components/filterMonthSwitcher/filterMonthSwitcher";
import { recordsStore } from "../@state/records";
import { useRouter } from "next/navigation";
import LastRecords from "@components/lastRecords/lastRecords";
/* import styles from "./page.module.scss"; */

export default function Home() {
  const router = useRouter();
  const { records } = recordsStore();
  const totalMoney = records.reduce(
    (sum, record) => sum + +record.convertedAmount,
    0
  );
  function filterByCurrency(currency: string) {
    const filteredAmount = records
      .filter((record) => record.currency === currency)
      .reduce((sum, record) => sum + +record.amount, 0);
    return filteredAmount;
  }

  return (
    <main>
      <h1>Main page</h1>
      <div>
        <h2>Filters</h2>
        <FilterMonthSwitcher />
      </div>
      <div>
        <h2>Statistics</h2>
        <div>Total in USD: {totalMoney}</div>
        <div>USD: {filterByCurrency("USD")}</div>
        <div>RUB: {filterByCurrency("RUB")}</div>
        <div>GEL: {filterByCurrency("GEL")}</div>
      </div>
      <div>
        <h2>All records</h2>
        <button onClick={() => router.push("/create")}>New</button>
        <LastRecords />
      </div>
    </main>
  );
}
