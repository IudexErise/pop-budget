import { PieChart, Pie, Tooltip } from "recharts";
import { useMemo } from "react";

import { recordsStore } from "@state/records";
import { categoriesList } from "@const/categories";
import { filterByTimeStore } from "@state/filterByTime";
import { getCategoryStatistics } from "@functions/sortCategories";

type PieDataItem = {
  name: string;
  value: number;
  fill: string;
};

export function ExpensesPieChart() {
  const records = recordsStore((state) => state.records);
  const { filterDate } = filterByTimeStore();

  const filteredRecords = records.filter(
    (record) =>
      new Date(record.date).getFullYear() ===
        new Date(filterDate).getFullYear() &&
      new Date(record.date).getMonth() === new Date(filterDate).getMonth(),
  );

  const statistics = useMemo(
    () => getCategoryStatistics(filteredRecords),
    [filteredRecords],
  );

  const data: PieDataItem[] = useMemo(
    () =>
      statistics.map((category) => ({
        name: category.category,
        value: category.total,
        fill:
          categoriesList.find((c) => c.name === category.category)?.color ??
          "#ccc",
      })),
    [statistics],
  );

  const total = useMemo(
    () => statistics.reduce((sum, category) => sum + category.total, 0),
    [statistics],
  );

  if (!data.length) return null;

  return (
    <PieChart
      width={250}
      height={250}
      style={{ maxWidth: "100%", aspectRatio: 1, alignSelf: "center" }}
    >
      <Pie
        data={data}
        dataKey="value"
        innerRadius="80%"
        outerRadius="100%"
        cornerRadius="20%"
        paddingAngle={10}
        isAnimationActive
      />

      <Tooltip
        formatter={(value, name) => [
          Number(value).toLocaleString("en-US", {
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
