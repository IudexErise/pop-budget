"use client";

import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import HeadlineBlock from "@components/headlineBlock/headlineBlock";

export default function StatisticsPage() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <HeadlineBlock headline="Statistics" onClick={() => router.back()} />
      <FilterMonthSwitcher />
      <ExpensesPieChart />
    </div>
  );
}

import { PieChart, Pie, Tooltip } from "recharts";
import { useMemo } from "react";

import { recordsStore } from "@state/records";
import { categories } from "@const/categories";
import FilterMonthSwitcher from "@components/filterByTimeSwitcher/filterByTimeSwitcher";
import { filterByTimeStore } from "@state/filterByTime";

type PieDataItem = {
  name: string;
  value: number;
  fill: string;
};

export function ExpensesPieChart({
  isAnimationActive = true,
}: {
  isAnimationActive?: boolean;
}) {
  const records = recordsStore((state) => state.records);
  const { filterDate } = filterByTimeStore();

  const filteredRecords = records.filter(
    (record) =>
      new Date(record.date).getFullYear() ===
        new Date(filterDate).getFullYear() &&
      new Date(record.date).getMonth() === new Date(filterDate).getMonth(),
  );

  const { data, total } = useMemo(() => {
    const map = new Map<string, number>();

    for (const record of filteredRecords) {
      const amount = Number(record.convertedAmount);
      if (!amount) continue;

      map.set(record.category, (map.get(record.category) ?? 0) + amount);
    }

    const pieData: PieDataItem[] = Array.from(map.entries()).map(
      ([categoryName, value]) => {
        const category = categories.find((c) => c.name === categoryName);

        return {
          name: categoryName,
          value,
          fill: category?.color ?? "#ccc",
        };
      },
    );

    const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);

    return { data: pieData, total: totalValue };
  }, [filteredRecords]);

  if (!data.length) return null;

  return (
    <PieChart
      width={320}
      height={320}
      style={{ maxWidth: "100%", aspectRatio: 1 }}
    >
      <Pie
        data={data}
        dataKey="value"
        innerRadius="75%"
        outerRadius="100%"
        cornerRadius="50%"
        paddingAngle={5}
        isAnimationActive={isAnimationActive}
      />

      <Tooltip
        formatter={(value, name) => [
          value!.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          }),
          name,
        ]}
      />

      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          fontSize: 18,
          fontWeight: 600,
          fill: "#ffffff",
        }}
      >
        {total.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </text>
    </PieChart>
  );
}
