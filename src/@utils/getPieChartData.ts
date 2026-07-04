import { categories } from "@const/categories";
import { RecordProps } from "@state/records";

export interface PieChartItem {
  name: string;
  value: number;
  fill: string;
}

export function getPieChartData(records: RecordProps[]): PieChartItem[] {
  const map = new Map<string, number>();

  for (const record of records) {
    const amount = Number(record.convertedAmount);
    if (!amount) continue;

    map.set(record.category, (map.get(record.category) ?? 0) + amount);
  }

  return Array.from(map.entries()).map(([categoryName, total]) => {
    const category = categories.find((c) => c.name === categoryName);

    return {
      name: categoryName,
      value: total,
      fill: category?.color ?? "#ccc",
    };
  });
}
