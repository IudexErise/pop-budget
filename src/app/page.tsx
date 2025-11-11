"use client";

import { recordsStore } from "../@state/records";
import { useRouter } from "next/navigation";
/* import styles from "./page.module.scss"; */

export default function Home() {
  const router = useRouter();
  const { records, deleteRecord } = recordsStore();
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
        <h2>Statistics</h2>
        <div>Total in USD: {totalMoney}</div>
        <div>USD: {filterByCurrency("USD")}</div>
        <div>RUB: {filterByCurrency("RUB")}</div>
        <div>GEL: {filterByCurrency("GEL")}</div>
      </div>
      <button onClick={() => router.push("/create")}>Create</button>
      <h2>All records</h2>
      <div>
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
    </main>
  );
}
