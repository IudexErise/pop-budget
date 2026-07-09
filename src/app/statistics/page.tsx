"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";
import FilterMonthSwitcher from "@components/filterByTimeSwitcher/filterByTimeSwitcher";
import { ExpensesPieChart } from "@components/expensesPieChart/expensesPieChart";
import ExpensesByCategory from "@components/expensesByCategory/expensesByCategory";

export default function StatisticsPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Statistics" onClick={() => router.back()} />
      <FilterMonthSwitcher />
      <ExpensesPieChart />
      <ExpensesByCategory />
    </div>
  );
}
