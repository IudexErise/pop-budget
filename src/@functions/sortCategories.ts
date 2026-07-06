import { RecordProps } from "@state/records";

export type CategoryStatistics = {
  category: string;
  total: number;
  subCategories: {
    name: string;
    total: number;
  }[];
};

export function getCategoryStatistics(
  records: RecordProps[],
): CategoryStatistics[] {
  const grouped = new Map<
    string,
    {
      total: number;
      subCategories: Map<string, number>;
    }
  >();

  for (const record of records) {
    const amount = Number(record.convertedAmount);
    if (!amount) continue;

    if (!grouped.has(record.category)) {
      grouped.set(record.category, {
        total: 0,
        subCategories: new Map(),
      });
    }

    const category = grouped.get(record.category)!;

    category.total += amount;

    category.subCategories.set(
      record.subCategory,
      (category.subCategories.get(record.subCategory) ?? 0) + amount,
    );
  }

  return Array.from(grouped.entries())
    .map(([category, data]) => ({
      category,
      total: data.total,
      subCategories: Array.from(data.subCategories.entries())
        .map(([name, total]) => ({
          name,
          total,
        }))
        .sort((a, b) => b.total - a.total),
    }))
    .sort((a, b) => b.total - a.total);
}
